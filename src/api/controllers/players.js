//@ts-check
import PlayerInfo from "../../services/players.js";
import CError from "../../scripts/CError.js";

/**
 * Controller for fetching and formatting player information from the database.
 * It utilizes the `PlayerInfo` service to retrieve all players and then formats
 * each player's information, including converting the `birth_date` to a more
 * readable format.
 * 
 * Any errors encountered during the retrieval or formatting process are handled by forwarding a custom error object to the next middleware.
 *
 * @memberof module:Controller
 * @async
 * @function playerController
 * 
 * @see {@link module:Services.PlayerInfo} - The service used for retrieving player data.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object. This is used to send the formatted list of players back to the client.
 * @param {Object} next - The next middleware in the Express stack, used for error handling.
 * 
 * @example
 * Example response sent to client:
 * [
 *   {
 *     "Player Name": "Lionel Messi",
 *     "Date of Birth": "June 23, 1987"
 *   },
 *   {
 *     "Player Name": "Cristiano Ronaldo",
 *     "Date of Birth": "February 4, 1985"
 *   },
 *   ....
 * ]
 * 
 * @throws {CError} - Custom error with a 500 status code if fetching or formatting player information fails.
 */
const playerController = async (req,res,next) =>{
  try{
    const players = await PlayerInfo();
  
    const playerInfo = players.map(player => {
      // @ts-ignore
      const birth_date = new Date(player.birth_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      return {
        // @ts-ignore
        "Player Name" : player.name,
        "Date of Birth" : birth_date
      };
    })

    res.send(playerInfo)
  } catch(error){
    next(new CError(500, "Failed to retrieve player information."));
  }
}

export default playerController;