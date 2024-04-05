import Competition from "../models/Competition.js";

/**
 * Asynchronously retrieves information about all competitions from the database.
 * This includes details such as the competition's name, the type of teams that participate
 * (e.g., club, national team), the scope (e.g., domestic, international), the format of the competition,
 * and the country it is associated with.
 * 
 * The function aims to abstract the query logic, making the data retrieval process reusable and
 * manageable across different parts of the application. If an error occurs during the database
 * operation, it throws a generic error to be caught and handled by the caller.
 * 
 * @memberof module:Services
 * 
 * @async
 * @function CompetitionInfo
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of objects, each representing detailed information about a competition.
 * 
 * @example
 * // Example of returned data:
 * [
 *   { "name": "World Cup", "team_type": "nat'l Team", "scope": "international", "competition_format": "cup", "country": null },
 *   { "name": "UEFA Champions League", "team_type": "club", "scope": "international", "competition_format": "cup", "country": null },
 *   // More competitions...
 * ]
 * 
 * @throws {Error} Indicates a failure in retrieving competition information from the database.
 * 
 * @see {@link module:Models.Competition} - for getting info about Competition model
 * @see {@link module:Controller.competitionController} - CompetitionInfo is utilized by the competitionController.
 */
const CompetitionInfo = async () => {
  try{
    const competitions = await Competition.findAll({
      attributes : ['name','team_type','scope','competition_format','country']
    });

    return competitions;
  } catch(error){
    throw new Error("Something went wrong")
  }
}

export default CompetitionInfo;