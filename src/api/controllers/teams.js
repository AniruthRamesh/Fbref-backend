// @ts-check
import CError from "../../scripts/CError.js";
import TeamInfo from "../../services/teams.js";

/**
 * Controller function to handle requests for retrieving and formatting information
 * about all teams. It leverages the `TeamInfo` service to fetch teams from the database
 * and formats the data before sending it as a response. 
 * The team type (e.g., 'club', 'national team') is formatted for readability.
 * 
 * Errors during data retrieval or processing are caught and handled by passing a custom error object to the next error handling middleware.
 *
 * @memberof module:Controller
 * @async
 * @function teamsController
 * 
 * @see {@link module:Services.TeamInfo} - The service used for retrieving team data.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object used to send the formatted team data back to the client.
 * @param {Object} next - The next middleware function in the Express stack, used here for error handling.
 * 
 * @example
 * Example response sent to client:
 * [
 *   {
 *     "Team Name": "Sporting CP",
 *     "Team Country": "Portugal",
 *     "Team Type": "Club"
 *   },
 *   {
 *     "Team Name": "Real Madrid",
 *     "Team Country": "Spain",
 *     "Team Type": "Club"
 *   },
 *   ...
 * ]
 * 
 * @throws {CError} - Custom error with a status code of 500 if an error occurs while retrieving or formatting team information.
 */
const teamsController = async (req,res,next) => {
  try{
    const teams = await TeamInfo();
  
    const teamInfo = teams.map(team => {
      //This might change in the future.
      // @ts-ignore
      const team_type = team.team_type === 'club' ? 'Club' : 'National Team';
      return {
        // @ts-ignore
        "Team Name" : team.name,
        // @ts-ignore
        "Team Country" : team.country,
        "Team Type" : team_type
      };
    })
    res.send(teamInfo);
  } catch(error){
    next(new CError(500, "Failed to retrieve Team information."));
  }
}

export default teamsController;