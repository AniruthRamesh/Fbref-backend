/**
 * The entry point for the Express application. It sets up the middleware, routes, and database connection,
 * then starts the server on a specified port. This script also includes error handling middleware and
 * initiates the database seeding process.
 * 
 * The application uses `body-parser` middleware for parsing JSON request bodies, sets up API routes through
 * a centralized router module, and handles errors using a custom error handling middleware. It establishes a
 * connection to the database and syncs the models with the database, ensuring the database schema is up to date.
 * Additionally, it seeds the database with initial data to facilitate development and testing.
 * 
 * @module Server
 * @requires express - For creating and managing the Express application.
 * @requires bodyParser - Middleware for parsing request bodies into JSON.
 * @requires module:Database - The Sequelize database instance for managing database connections.
 * @requires module:Router - Centralized routing module defining API endpoints.
 * @requires module:Middlewares.errorHandler - Middleware for handling errors and sending standardized error responses.
 * @requires module:DatabaseSeed - Function to seed the database with initial data.
 */
import express from "express"
import bodyParser from "body-parser";
import database from "./db/connection.js"
import router from "./api/routes/router.js";
import errorHandler from "./middlewares/errorHandler.js";
import databaseSeed from "./services/databaseSeed.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

//Allowed from any origin 
app.use(cors());

//use ENV variables for the port
const PORT = process.env.PORT || 4000

// Setup routes and error handling middleware
app.use("/",router);
app.use(errorHandler);

// Start the server and initialize the database
app.listen(PORT, async () => {
  try{

    /* Establish a connection to the database - For now the server is coupled with the
      Sequelize structure, this will be abstracted in the future.
    */
    await database.authenticate(); 
    console.log("Connection Successful");

    await database.sync({force : true}); 
    await databaseSeed();

  } catch(error){
    console.log(error)
  }
})