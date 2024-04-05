/**
 * @module Router
 * @description Acts as API Gateway by Setting up and configuring routes for the Express application. 
 * Each route is associated with a specific controller that handles the incoming requests. 
 * The routes defined here allow clients to retrieve various pieces of information
 * related to player statistics, player profiles, competitions, and teams.
 * 
 * `/players/v1` - Fetches and formats information about all players, converting birth dates to a readable format and
 * including player names. Utilizes the {@link module:Controller.playerController}.
 * 
 * `/competitions/v1` - Retrieves and formats information about all competitions, adjusting the presentation of attributes
 * like team type, scope, competition format, and country. Utilizes the {@link module:Controller.competitionController}.
 * 
 * `/teams/v1` - Fetches and formats information about all teams, including their names, countries, and team types. Utilizes
 * the {@link module:Controller.teamsController}.
 * 
 * `/stats/v1` - Retrieves and formats statistics for a specified player based on filters like team type, competition scope, 
 * and competition format. Utilizes the {@link module:Controller.statsController}.
 * By default this API retrieves Ronaldo's club domestic league statistics and it is sorted by seasons from earliest to recent.
 * Additionally, It can also handle queries, where users can filter the info they need, 
 * @example 
 * To filter based on Player, team, club, scope : 
 * `/stats/v1?player=messi&team=club&scope=domestic&competition=league`
 * 
 * @see {@link module:Controller} - for more details about controller used in the application.
 * @see {@link module:Routes} - to see how we are using Express routes to handle the API
 */