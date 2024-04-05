/**
 * @module Models
 * @description This module encapsulates the data models of the application, defining the structure and relationships of the data stored in the database. It utilizes Sequelize, an ORM for Node.js, for model definitions and database interactions. 
 * Each model represents a table in the database and is defined with specific attributes that map to the columns of the table.
 * 
 * The models included in this module are:
 * - {@link module:Models.Person} for individuals participating in or related to the competitions.
 * - {@link module:Models.Team} for teams participating in competitions.
 * - {@link module:Models.Competition} for the various competitions in which teams and individuals participate.
 * - {@link module:Models.Stats} for the statistical data associated with individuals' performances in competitions.
 * 
 * Besides defining the structure of each table, this module also establishes relationships between the models to reflect the associations and dependencies that exist among the different entities in the application domain.
 * 
 * The relationships defined here are:
 * - A `Competition` can have many `Stats`, and each `Stat` entry belongs to a single `Competition`.
 * - A `Team` can have many `Stats`, and each `Stat` entry belongs to a single `Team`.
 * - A `Person` can have many `Stats`, and each `Stat` entry is associated with a single `Person`.
 * 
 * These relationships are crucial for querying related data efficiently and maintaining the integrity of the database. {@link module:Relationships}
 * 
 * @see {@link module:Models.Team} for the Team model definition.
 * @see {@link module:Models.Stats} for the Stats model definition.
 * @see {@link module:Models.Person} for the Person model definition.
 * @see {@link module:Models.Competition} for the Competition model definition.
 * @see {@link module:Database} for the Sequelize database instance configuration.
 */