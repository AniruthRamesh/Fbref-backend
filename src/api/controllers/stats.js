import playerStats from "../../services/playerStats.js";
import CError from "../../scripts/CError.js";

/**
 * Controller to handle requests for retrieving and formatting player statistics based on specific filters.
 * Utilizes the `playerStats` service to fetch statistics for a specified player within a given team type,
 * competition scope, and competition format.
 * The resulting data includes detailed statistics such as games played,
 * minutes, goals, assists, and calculates goals per 90 minutes for each season. 
 * 
 * Errors during the retrieval or processing phase are managed by forwarding a custom error to the next error handling middleware.
 *
 * @memberof module:Controller
 * @async
 * @function statsController
 * 
 * @see {@link module:Services.playerStats} - The service used for retrieving player statistics.
 * 
 * @param {Object} req - The Express request object, containing query parameters for player, team, scope, and competition.
 * @param {Object} res - The Express response object used to send the formatted statistics back to the client.
 * @param {Object} next - The next middleware function in the Express stack, utilized here for error handling.
 * 
 * @example
 * Example response sent to client:
 * {
 *   "StatsSummary": {
 *     "Seasons": "21 Seasons",
 *     "Teams": "4 clubs",
 *     "Competitions": "4 Competitions",
 *     "Games": "647",
 *     "Minutes": "51809",
 *     "Goals": "497",
 *     "Assists": "138",
 *     "Goals/90": "0.86"
 *   },
 *   "Stats": [
 *     {
 *       "Seasons": "2002-2003",
 *       "Age": 17,
 *       // Additional details for each season...
 *     },
 *     // ...
 *   ]
 * }
 * 
 * @throws {CError} - Custom error with a 500 status code if fetching or formatting stats information fails.
 * 
 */
const statsController = async (req,res,next) => {

  try{
    let player = String(req.query.player || "ronaldo")
    let team = String(req.query.team || "club")
    let scope = String(req.query.scope || "domestic")
    let competition = String(req.query.competition || "league")

    const stats = await playerStats(player,team,scope,competition);

    const refinedStats = stats.map(stat => {
      const seasonStartYear = parseInt(stat.season.split('-')[0]); 
      const playerBirthYear = new Date(stat.Person.birth_date).getFullYear();
      const playerAgeAtSeasonStart = seasonStartYear - playerBirthYear;
      const goalsPer90 = parseFloat(((stat.goals / stat.minutes) * 90).toFixed(2));
      const assists = isNaN(stat.assists) ? 0 : Number(stat.assists)

      return {
        "Seasons" : stat.season,
        "Age" : playerAgeAtSeasonStart,
        "Teams" : stat.Team.name,
        "Country" : stat.Team.country,
        "Competitions" : stat.Competition.name,
        "Games" : stat.games,
        "Minutes" : stat.minutes,
        "Goals" : stat.goals,
        "Assists" : assists,
        "Goals/90" : goalsPer90
      };
    });

    //Since the dataset is small, performing the calculations in the server.
    const seasons = new Set();
    const teams = new Set();
    const competitions = new Set();
    let totalMinutes = 0, totalGames = 0, totalGoals = 0, totalAssists = 0;

    refinedStats.forEach(stat => {
      seasons.add(stat.Seasons);
      teams.add(stat.Teams);
      competitions.add(stat.Competitions);
      totalMinutes += stat.Minutes;
      totalGames += stat.Games;
      totalGoals += stat.Goals;
      totalAssists += stat.Assists;
    });

    const averageGoalsPer90 = totalMinutes > 0 ? parseFloat(((totalGoals / totalMinutes) * 90).toFixed(2)) : 0;
    const playerStatsSummary = {
      "Seasons" : `${seasons.size} Seasons`,
      "Teams" : `${teams.size} ${team}`,
      "Competitions" : `${competitions.size} Competitions`,
      "Games" : `${totalGames}`,
      "Minutes" : `${totalMinutes}`,
      "Goals" : `${totalGoals}`,
      "Assists" : `${totalAssists}`,
      "Goals/90" : `${averageGoalsPer90}`,
    }
    
    const statsCollection = {
      "StatsSummary" : playerStatsSummary,
      "Stats" : refinedStats
    }

    res.send(statsCollection);
  } catch(error){
    next(new CError(500, "Failed to retrieve player stats information."));
  }
}

export default statsController;