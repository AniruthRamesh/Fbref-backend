/**
 * Defines the Person model schema using Sequelize. This model represents
 * individuals in the database, detailing attributes like `person_id`, `name`,
 * and `birth_date`. The `person_id` serves as the unique identifier and primary key.
 * Both `name` and `birth_date` are required fields.
 *
 * @memberof module:Models
 * 
 * @typedef {Object} Person
 * @property {string} person_id - Unique identifier and primary key for the person.
 * @property {string} name - Name of the person.
 * @property {Date} birth_date - Birth date of the person.
 */
import {DataTypes} from "sequelize" 
import database from "../db/connection.js";

const Person = database.define('Person', {
  person_id : {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name : {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_date : {
    type: DataTypes.DATE,
    allowNull: false
  }
})

export default Person;