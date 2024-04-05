// @ts-check
import CError from "../../scripts/CError.js";
import CompetitionInfo from "../../services/competition.js";

/**
 * Controller for fetching and format information about all competitions.
 * It transforms the raw competition data into a more readable format for the response.
 * 
 * Any errors encountered during data retrieval or processing are forwarded to the next error handling middleware with a custom error message.
 * 
 * @memberof module:Controller
 * @async
 * @function competitionController
 * 
 * @see {@link module:Services.CompetitionInfo} - The service used for retrieving Competition data.
 * 
 * @param {Object} req - Represents Express request.
 * @param {Object} res - Represents Express response.
 * @param {Object} next - The next middleware function in the stack, used for error handling. Represents Express NextFunction.
 * 
 * @example
 * Expected response sent to client
 * res.send([
 *   { "Competition": "World Cup", "Team Type": "Natl Team", "Scope": "International", "Format": "Cup", "Country": "N/A" },
 *   { "Competition": "UEFA Champions League", "Team Type": "Club", "Scope": "International", "Format": "Cup", "Country": "N/A" },
 *   ...
 * ]);
 * 
 * @throws {CError} - Custom error with status 500 if retrieving competition information fails.
 */
const competitionController = async (req,res,next) =>{
  try{
    const competitions = await CompetitionInfo();

    const competitionInfo = competitions.map(competition => {
      return {
        // @ts-ignore
        "Competition": competition.name,
        // @ts-ignore
        //National Team -> Natl Team
        "Team Type": competition.team_type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        // @ts-ignore
        "Scope": competition.scope.charAt(0).toUpperCase() + competition.scope.slice(1),
        // @ts-ignore
        "Format": competition.competition_format.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        // @ts-ignore
        "Country": competition.country === 'NULL' ? 'N/A': competition.country.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      };
    });

    res.send(competitionInfo);

  } catch(error){
    next(new CError(500, "Failed to retrieve Competition information."));
  }
  
}

export default competitionController;