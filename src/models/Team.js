/**
 * Defines the Team model schema using Sequelize. This model encapsulates data for sports teams,
 * including their ID, name, country, and team type. The `team_id` acts as a unique identifier and
 * is marked as the primary key.
 * 
 * @memberof module:Models
 * 
 * @typedef {Object} Team
 * @property {string} team_id - Unique identifier for the team, serving as the primary key.
 * @property {string} name - The name of the team.
 * @property {string} country - The country the team represents or is located in. Alias - Team Country
 * @property {string} team_type - The type of team (e.g., club, national team).
 */
import {DataTypes} from "sequelize" 
import database from "../db/connection.js";

const Team = database.define('Team', {
  team_id : {
    type: DataTypes.STRING,
    primaryKey: true      
  },
  name : {
    type: DataTypes.TEXT,
    allowNull: false
  },
  country : {
    type: DataTypes.TEXT,
    allowNull: false
  },
  team_type : {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

export default Team;