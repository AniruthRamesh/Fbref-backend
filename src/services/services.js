/**
 * @module Services
 * @description This module contains all the service layer logic of the application. The services encapsulate the business logic required to interact with the data models and perform operations such as retrieval, transformation, and population of data.
 * 
 * The services abstract away the complexities of direct database manipulation from the controllers, providing a clean API for performing operations on the database. This includes fetching data from the database, applying business rules, and preparing data to be sent to the client.
 * 
 * Services in this module include:
 * - {@link module:Services.TeamInfo} for fetching information about teams.
 * - {@link module:Services.CompetitionInfo} for retrieving competition details.
 * - {@link module:DatabaseSeed} for seeding the database with initial data.
 * - {@link module:Services.PlayerInfo} for getting information about players.
 * - {@link module:Services.playerStats} for fetching statistics of players based on various filters.
 * 
 * Each service function is designed to be asynchronous, returning promises that resolve with the data needed or reject with an error in case of failure. This design allows for non-blocking operations and efficient handling of I/O-bound tasks.
 * 
 * The services rely on the Sequelize ORM for database interactions, utilizing models defined in the {@link module:Models} module. Relationships between models are leveraged to fetch related data efficiently.
 * 
 * @see {@link module:Models} for the data model definitions used by the services.
 * @see {@link module:Database} for the database configuration and connection details.
 */