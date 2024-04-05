/**
 * Defines the Competition model schema with Sequelize.
 * Represents competitions in the database, detailing their
 * specific attributes and constraints.
 * 
 * The model is defined with attributes: `comp_id`, `name`, `team_type`, 
 * `scope`, `competition_format`, and `country`. `comp_id` is used as the
 * primary key. The `country` attribute is optional (`allowNull: true`),
 * while all other attributes are required.
 * 
 * @memberof module:Models
 * 
 * @typedef {Object} Competition
 * @property {number} comp_id - The primary key and unique identifier for the competition.
 * @property {string} name - The name of the competition.
 * @property {string} team_type - Indicates the type of team (e.g., club, national team).
 * @property {string} scope - Defines the scope of the competition (e.g., domestic, international).
 * @property {string} competition_format - Specifies the format of the competition (e.g., league, cup).
 * @property {string} [country] - Alias for this is Venue, The country associated with the competition. This field can be null. 
 */
import {DataTypes} from "sequelize"
import database from "../db/connection.js";

const Competition =  database.define('Competition',{
  comp_id : {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name : {
    type : DataTypes.STRING,
    allowNull: false
  },
  team_type : {
    type : DataTypes.STRING,
    allowNull: false
  },
  scope : {
    type : DataTypes.STRING,
    allowNull: false
  },
  competition_format : {
    type : DataTypes.STRING,
    allowNull: false
  },
  country : {
    type : DataTypes.STRING,
    allowNull: true
  },
})

export default Competition;