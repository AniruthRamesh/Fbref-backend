/**
 * Establishes relationships between models: Competition, Stats, Team, and Person.
 * 
 * - A `Competition` can have many `Stats` entries, and each `Stat` entry belongs to a single `Competition`.
 * - A `Team` can have many `Stats` entries, and each `Stat` entry belongs to a single `Team`.
 * - A `Person` can have many `Stats` entries, and each `Stat` entry is associated with a single `Person`.
 * 
 * These relationships are defined using Sequelize's association methods, specifying foreign keys
 * and target keys to maintain referential integrity among the related data.
 * 
 * Limitation : Invalid or non-existent foreign keys is not identified, In future more robust Anti-Corruption layer will be implemented.
 * 
 * @module Relationships
 * 
 * @see {@link module:Database} for the database this application currently uses. 
 * @see {@link module:Models.Team} for the Team model definition.
 * @see {@link module:Models.Stats} for the Stats model definition.
 * @see {@link module:Models.Person} for the Person model definition.
 * @see {@link module:Models.Competition} for the Competition model definition.
 */
import Team from './Team.js';
import Stats from './Stat.js';
import Person from './Person.js';
import Competition from './Competition.js';

// Define the relationship between Competition and Stats
Competition.hasMany(Stats, { foreignKey: 'comp_id' });
Stats.belongsTo(Competition, { foreignKey: 'comp_id', targetKey: 'comp_id' });

// Define the relationship between Team and Stats
Team.hasMany(Stats, { foreignKey: 'team_id' });
Stats.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'team_id' });

// Define the relationship between Person and Stats
Person.hasMany(Stats, { foreignKey: 'person_id' });
Stats.belongsTo(Person, { foreignKey: 'person_id', targetKey: 'person_id' });


export {Competition, Stats, Team, Person};