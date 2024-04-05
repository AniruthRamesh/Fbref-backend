import {Competition, Stats, Team, Person} from "../models/Relationship.js";
import { lookup } from "./lookupTable.js";

/**
 * Retrieves statistics for a player in a specific team, competition scope, and competition format.
 * 
 * @memberof module:Services
 * 
 * @async
 * @function playerStats
 * @param {string} player - The name or partial name of the player to search for.
 * @param {string} team - The team type to filter the results by (e.g., 'Club', 'National Team').
 * @param {string} scope - The competition scope to filter the results by (e.g., 'Domestic', 'International').
 * @param {string} competition - The competition format to filter the results by (e.g., 'League', 'Cup').
 * 
 * @returns {Promise<Object[]>} An array of objects containing the player's statistics, including season, games, minutes, goals, and assists.
 *
 * @example
 * Example output
 * [
 *  {
        season: '2004-2005',
        games: 7,
        minutes: 70,
        goals: 1,
        assists: 0,
        Person: {
          name: 'Lionel Messi',
          birth_date: '1987-06-24 00:00:00.000 +00:00'
        },
        Team: { name: 'Barcelona', country: 'Spain' },
        Competition: { name: 'La Liga' }
      },....
    ]
 * 
 * @throws {Error} Throws an error with the message "Something went wrong" if the database query fails.
 * 
 * @see {@link module:Models.Stats} - for getting info about Stats model
 * @see {@link module:Controller.statsController} - PlayerStats is utilized by statsController.
 * 
 */
const playerStats = async (player, team, scope, competition) =>{

  try{
    const data = await Stats.findAll({
      include: [
        {
          model: Person,
          where: { name: lookup(player), },
          attributes: ['name', 'birth_date'], 
        },
        {
          model: Team,
          where: { team_type: lookup(team) },
          attributes: ['name', 'country'],
        },
        {
          model: Competition,
          where: { 
            scope: lookup(scope),
            competition_format: lookup(competition), 
          },
          attributes: ['name'],
        }, 
      ],
      attributes: ['season', 'games', 'minutes', 'goals', 'assists'],
      order: [['season', 'ASC']],
      raw: true,
      nest: true 
    });
  
    return data;
  } catch(error){
    throw new Error("Something went wrong");
  }
}

export default playerStats;
