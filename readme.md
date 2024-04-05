# Player Statistics Service Backend

## Introduction

The Player Statistics Service Backend is a Node.js application that provides an API for retrieving and displaying football player statistics based on various criteria such as team type, competition scope, and format. It is designed to work in conjunction with a front-end client application.

## Features

- Default access to Cristiano Ronaldo's club domestic league statistics.
- Flexible criteria selection for filtering statistics (player, team type, competition scope, and format).
- Comprehensive documentation for APIs and code.

## Usage

Users can interact with the Player Statistics Service Backend through the front-end client application, which can be found at https://github.com/AniruthRamesh/Fbref-client.

## Running the application Locally

### Prerequisites

- Ensure you have the following installed on your system:
  - Node.js (version specified in package.json)
  - npm (Node Package Manager)

### Installation

- Clone the repository

```
  git clone https://github.com/AniruthRamesh/Fbref-backend.git
```

- Navigate to the project directory

```
  cd Fbref-backend
```

- Install Dependencies

```
  npm install
```

- Start the server

```
  npm start
```

## Limitations

During the database seeding process, the following data integrity checks are not currently captured:

- Data type mismatches with the schema
- Invalid or non-existent foreign keys
- Unhandled NULL values and missing data for minutes, goals, and matches (For assists, it is handled by considering NULL as 0 - this implementation depends on the type of the query).

Although exceptions are handled during querying, these bugs do not crash the server. The server will continue to run. An additional and more robust Anti-corruption layer will be implemented in the future.

## Assumptions

Based on the data and the service, the following assumptions have been made:

- If there are `NULL` values in the Games, Minutes, Goals, or Assists columns in the Stats table, they will be considered as 0 (the current implementation is only done for Assists). The reason for this assumption is that, given the context of fetching player statistics for seasons, it is assumed that a NULL value represents 0. If the context were different, such as finding the number of matches played by a player or the goals scored, then the NULL value would be ignored.
- Inconsistency in the `team_type` field (`natl_team` and `national_team`) between the Competition table and the Team table. The current implementation does not use the `team_type` from the Competition table, and lookup tables are used to solve this issue.
- Handling `NULL` values for the `country` field in the Competition table. As the current implementation is only concerned with the player statistics service, these cases will be handled in the future.

## Detailed Documentation

Detailed Documentation for the code and implementation details can be accessed from `backend/docs/index.html`.
