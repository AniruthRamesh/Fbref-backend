/**
 * @module Controller
 * @description This module contains all the controllers used in the application. Controllers are responsible for handling incoming requests,
 * executing the appropriate logic, and sending back the responses to the client. They act as an intermediary between the models,
 * which interact with the database, and the views, which present the data to the user.
 *
 * Controllers utilize services to perform operations on the data fetched from or to be stored in the database. They also handle
 * any errors that occur during the processing of requests and delegate error handling to middleware where necessary.
 *
 * Each controller is designed to manage requests for a specific area of the application, such as players, teams, competitions,
 * or player statistics. This modular approach allows for clear separation of concerns and makes the application easier to manage and scale.
 *
 * @see {@link module:Services} for services utilized by the controller.
 * @see {@link module:Controller.playerController} for handling player information requests.
 * @see {@link module:Controller.teamsController} for handling team information requests.
 * @see {@link module:Controller.competitionController} for handling competition information requests.
 * @see {@link module:Controller.statsController} for handling player statistics requests.
 */