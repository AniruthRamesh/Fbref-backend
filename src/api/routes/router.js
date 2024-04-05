/**
 * 
 * Initializes and configures the main routes for the Express application. 
 * Each route is associated with a specific controller that handles incoming requests and responses for different segments of the application.
 * This setup acts as the central hub for directing API traffic to the appropriate controllers.
 * 
 * @module Routes
 * @requires module:Controller.statsController - Controller for handling player statistics requests.
 * @requires module:Controller.playerController - Controller for handling player information requests.
 * @requires module:Controller.competitionController - Controller for handling competition information requests.
 * @requires module:Controller.teamsController - Controller for handling team information requests.
 */
import express from "express"
import statsController from "../controllers/stats.js";
import playerController from "../controllers/players.js";
import competitionController from "../controllers/competition.js";
import teamsController from "../controllers/teams.js";

const router = express.Router();

// Define routes and associate them with their respective controllers
router.get("/stats/v1", statsController);
router.get("/players/v1", playerController);
router.get("/competitions/v1", competitionController);
router.get("/teams/v1", teamsController);

export default router;