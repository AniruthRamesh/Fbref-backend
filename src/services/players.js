import Person from "../models/Person.js";

/**
 * Asynchronously retrieves all players from the database, selecting only their names and birth dates.
 * This function is designed to abstract away the database query logic, making it reusable across
 * different parts of the application. In case of a failure during the database operation, it throws
 * a generic error to be handled by the caller.
 *
 * @memberof module:Services
 * 
 * @async
 * @function PlayerInfo
 * @returns {Promise<Array>} A promise that resolves to an array of objects, each representing a player
 * with their name and birth date. If the database query fails, the promise rejects with an error.
 * 
 * @example
 * // Example of data returned by this function:
 * [
 *   { name: "Lionel Messi", birth_date: "1987-06-24" },
 *   { name: "Cristiano Ronaldo", birth_date: "1985-02-05" }
 * ]
 * 
 * @throws {Error} Throws an error with the message "Something went wrong" if the database query fails.
 * 
 * @see {@link module:Models.Person} - for getting info about Player model
 * @see {@link module:Controller.playerController} - PlayerInfo is utilized by the playerController.
 * 
 */
const PlayerInfo = async ()=> {
  try{
    const players = await Person.findAll({
      attributes : ['name', 'birth_date']
    });

    return players;
  } catch(error){
    throw new Error("Something went wrong");
  }
}

export default PlayerInfo;