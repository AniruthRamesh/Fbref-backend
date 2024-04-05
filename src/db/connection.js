/**
 * Initializes and exports an instance of Sequelize configured for SQLite.
 * The database is set to use in-memory storage, meaning the data is lost
 * when the process ends.
 * 
 * This approach is taken because of the lightweight dataset we currently have. 
 * 
 * @module Database
 * @type {Sequelize}
 */
import { Sequelize } from "sequelize";

const database = new Sequelize({
  dialect : 'sqlite',
  storage : ':memory:'
});

export default database;