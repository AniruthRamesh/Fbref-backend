/**
 * Defines the Stats model schema with Sequelize. This model represents
 * statistical data for individuals, including attributes such as games played,
 * minutes played, goals, and assists, among others. The `stat_id` serves as the
 * unique identifier and primary key and is auto-incremented.
 *
 * Relationships should be defined externally to link `Stats` with corresponding
 * `Person`, `Competition`, and `Team` entities based on `person_id`, `comp_id`, and
 * `team_id` respectively.
 * 
 * @memberof module:Models
 * 
 * @typedef {Object} Stats
 * @property {number} stat_id - Unique identifier and primary key, auto-incremented.
 * @property {string} person_id - Identifier linking to a `Person`.
 * @property {string} season - The season during which the statistics were recorded.
 * @property {number} comp_id - Identifier linking to a `Competition`.
 * @property {string} team_id - Identifier linking to a `Team`.
 * @property {number} games - Number of games played.
 * @property {number} minutes - Total minutes played.
 * @property {number} goals - Total goals scored.
 * @property {number} [assists] - Total assists made. This field can be null.
 */
import {DataTypes} from "sequelize"
import database from "../db/connection.js";

const Stats = database.define('Stats',{
  stat_id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  person_id : {
    type: DataTypes.STRING,
    allowNull: false
  },
  season : {
    type: DataTypes.STRING,
    allowNull: false
  },
  comp_id : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  team_id : {
    type: DataTypes.STRING,
    allowNull: false
  },
  games : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  minutes : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  goals : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assists : {
    type: DataTypes.INTEGER,
    allowNull: true
  },
});

export default Stats;