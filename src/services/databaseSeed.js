// @ts-check

/**
 * Orchestrates the database seeding process by populating the database with data from various file types.
 * Utilizes a data conversion factory to obtain the appropriate parser function based on the specified file type
 * and then populates the database models for Persons, Teams, Competitions, and Statistics with the parsed data.
 * 
 * Although the current implementation primarily supports CSV files, the architecture is designed to easily extend
 * support for additional file types in the future by enhancing the data conversion factory.
 * 
 * Limitations:
 * During the database seeding process, the following data integrity checks are not currently captured:
 *  Data type mismatches with the schema
 *  Invalid or non-existent foreign keys
 *  Unhandled NULL values and missing data for minutes, goals, and matches. (For assists, it is handled by considering NULL as 0 - this implementation depends on type of the query).
 * 
 * Although exceptions are handled during querying, these bugs do not crash the server. The server will continue to run.
 * 
 * An additional and more robust Anti corruption layer will be implemented in the future.
 * 
 * @module DatabaseSeed
 * 
 * @requires Relationships - The Sequelize model relationships.
 * @requires DataConversionFactory - The factory function to obtain data parsers.
 * @see {@link convertData} for details on obtaining a parser function for different data source types.
 * @see {@link Person}, {@link Stats}, {@link Team}, {@link Competition} for model details.
 */
import {Person, Stats, Team, Competition} from "../models/Relationship.js"
import convertData from "../scripts/dataConversion/convertData.js"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsDataPath = path.join(__dirname, "..","lib",  'sr_dev_teams.csv');
const statsDataPath = path.join(__dirname, "..","lib", 'sr_dev_stats.csv');
const personsDataPath = path.join(__dirname, "..","lib", 'sr_dev_people.csv');
const competitionDataPath = path.join(__dirname, "..","lib",'sr_dev_competitions.csv');

/**
 * Populates the specified model from a data file using a provided converter function.
 * The converter function is determined by the data conversion factory based on file type.
 * @async
 * @function populateModel
 * @param {string} path - Path to the data file.
 * @param {Function} converter - The parsing function returned by convertData for the specific file type.
 * @param {string[]} updateFields - An array of fields that should be updated if a duplicate key is found during the bulk creation process.
 */
const populateModel = async (path, converter, model, updateFields) => {
  try {
    const data = await converter(path);
    await model.bulkCreate(data, { updateOnDuplicate: updateFields });
    console.log(`${model.name} populated successfully.`);
  } catch (error) {
    console.error(`Error in populating ${model.name}:`, error);
  }
};

/**
 * Initiates the database seeding process for all models.
 * Determines the appropriate parser for the current file type (defaulting to CSV) and
 * invokes population functions for each model.
 * @async
 * @function databaseSeed
 * 
 */
const databaseSeed = async () => {
  const converter = convertData("csv");

   // Populate each model with its respective data
   await populateModel(personsDataPath, converter, Person, ['name', 'birth_date']);
   await populateModel(teamsDataPath, converter, Team, ['name', 'country', 'team_type']);
   await populateModel(competitionDataPath, converter, Competition, ['name', 'team_type', 'scope', 'competition_format', 'country']);
   await populateModel(statsDataPath, converter, Stats, ['games', 'minutes', 'goals', 'assists']);
}

export default databaseSeed;