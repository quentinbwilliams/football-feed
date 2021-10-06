/c footy_db;

-- DROP TABLES

-- DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;
DROP TABLE IF EXISTS users_leagues CASCADE;
DROP TABLE IF EXISTS users_teams CASCADE;
DROP TABLE IF EXISTS users_countries CASCADE;
DROP TABLE IF EXISTS countries_leagues CASCADE;
DROP TABLE IF EXISTS leagues_teams CASCADE;
DROP TABLE IF EXISTS teams_players CASCADE;
DROP TABLE IF EXISTS teams_coaches CASCADE;

-- CREATE TABLES
 
-- CREATE TABLE users
-- (
--   id SERIAL PRIMARY KEY,
--   username UNIQUE TEXT NOT NULL,
--   password TEXT NOT NULL,
--   type TEXT NOT NULL
-- );

CREATE TABLE countries
(
  code UNIQUE TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT NOT NULL
);

CREATE TABLE leagues
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
	type TEXT NOT NULL,
	logo TEXT,
  api_football_id UNIQUE INTEGER,
	country_code TEXT,
	country_name TEXT
);

CREATE TABLE teams
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  api_football_id UNIQUE INTEGER,
	logo TEXT NOT NULL
);

CREATE TABLE players
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
	photo TEXT,
  nationality TEXT,
  api_football_id UNIQUE INTEGER
);

CREATE TABLE coaches
(
  id SERIAL PRIMARY KEY,
	api_football_id UNIQUE INTEGER
  name TEXT NOT NULL,
	photo TEXT,
  nationality TEXT
);

-- JOIN TABLES

CREATE TABLE users_leagues
(id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  league_id INTEGER REFERENCES leagues (api_football_id) ON DELETE CASCADE
);

CREATE TABLE users_teams
(id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE
);

CREATE TABLE countries_leagues
(
  id SERIAL PRIMARY KEY,
  country_code TEXT REFERENCES countries (code) ON DELETE CASCADE,
  league_id INTEGER REFERENCES leagues (api_football_id) ON DELETE CASCADE
);

CREATE TABLE leagues_teams
(
  id SERIAL PRIMARY KEY,
  league_id INTEGER REFERENCES leagues (api_football_id) ON DELETE CASCADE,
  team_id INTEGER REFERENCES teams (api_football_id) ON DELETE CASCADE
);

CREATE TABlE teams_players
(
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE,
  player_id INTEGER REFERENCES players (id) ON DELETE CASCADE
);

CREATE TABLE teams_coaches
(
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE,
  coach_id INTEGER REFERENCES coaches (id) ON DELETE CASCADE
);