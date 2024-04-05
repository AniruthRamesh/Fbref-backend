import Team from "../models/Team.js";

/**
 * Retrieves all teams from the database, including their name, country, and team type.
 * If the database query fails, it throws an error.
 * 
 * @memberof module:Services
 *
 * @async
 * @function TeamInfo
 * @returns {Promise<Array>} A promise that resolves to an array of teams.
 * 
 * @example
 * // Example of data returned by this function:
 * [
 *   { name: "Sporting CP", country: "Portugal", team_type: "club" },
 *   { name: "Real Madrid", country: "Spain", team_type: "club" },
 *   { name: "Argentina", country: "Argentina", team_type: "national_team" },
 *   { name: "Barcelona", country: "Spain", team_type: "club" },
 *   // Additional teams...
 * ]
 * 
 * @throws {Error} When the database query fails.
 * 
 * @see {@link module:Models.Team} - for getting info about the Team Model 
 * @see {@link module:Controller.teamsController} - TeamInfo is utilized by the teamsController.
 */
const TeamInfo = async () => {
  try{
    const teamInfo = await Team.findAll({
      attributes : ['name','country','team_type']
    });
    return teamInfo;
  } catch(error){
    throw new Error("Something went wrong")
  }
}

export default TeamInfo;