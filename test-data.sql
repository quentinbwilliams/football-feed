/c footy_test;

-- DROP TABLES

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;
DROP TABLE IF EXISTS users_leagues CASCADE;
DROP TABLE IF EXISTS countries_leagues CASCADE;

-- CREATE TABLES
 
CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
	type TEXT NOT NULL
);

CREATE TABLE countries
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	code TEXT NOT NULL,
	flag TEXT NOT NULL
);

CREATE TABLE leagues
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	api_football_id INTEGER NOT NULL
);

CREATE TABLE teams
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	api_football_id INTEGER
);

CREATE TABLE players
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	nationality TEXT,
	api_football_id INTEGER
);

CREATE TABLE coaches
(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	nationality TEXT
);

-- JOIN TABLES

CREATE TABLE users_leagues
(id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	league_id INTEGER REFERENCES leagues (id) ON DELETE CASCADE
);

CREATE TABLE user_teams
(id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE
);

CREATE TABLE countries_leagues
(
	id SERIAL PRIMARY KEY,
	country_id INTEGER REFERENCES countries (id) ON DELETE CASCADE,
	league_id INTEGER REFERENCES leagues (id) ON DELETE CASCADE
);

CREATE TABLE leaugues_teams
(
	id SERIAL PRIMARY KEY,
	league_id INTEGER REFERENCES leagues (id) ON DELETE CASCADE,
	team_id INTEGER REFERENCES teams (id) ON DELETE CASCADE
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
	coach_id INTEGER REFERENCES coachs (id) ON DELETE CASCADE
);

-- INSERTIONS

-- -- PRIMARY TABLES FIRST 

INSERT INTO users (username, password, type) VALUES
('Q', 'test', 'admin'),
('John', 'test', 'user'),
('Teddy', 'teddy', 'user'),
('Jurgen', 'lfc', 'admin');

INSERT INTO countries (name, code, flag) VALUES
('England', 'GB', 'https://media.api-sports.io/flags/gb.svg'),
('Germany', 'DE', 'https://media.api-sports.io/flags/de.svg');

INSERT INTO leagues (name, api_football_id) VALUES 
('Premier League', 39),
('Bundesliga', 78);

INSERT INTO teams (name, api_football_id) VALUES 
('Liverpool', 40),
('Manchester United', 33),
('Tottenham', 47),
('Borussia Dortmund', 0),
('Bayern Munich', 0);

INSERT INTO players (name) VALUES 
('Mohamed Salah'),
('Christiano Ronaldo'),
('Harry Kane'),
('Jordan Henderson');

-- -- JOIN TABLES

INSERT INTO users_leagues (user_id, league_id) VALUES
(1,1),
(2,1),
(3,1),
(4, 2);

INSERT INTO users_teams (user_id, team_id) VALUES
(1,1),
(2,3),
(3,2),
(4,1);

INSERT INTO countries_leagues (country_id, league_id) VALUES
(1,1),
(2,2);

INSERT INTO leagues_teams (league_id, team_id) VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,4);

INSERT INTO teams_players (team_id, player_id) VALUES
(1,1),
(2,2),
(3,3),
(4,1);

--! NEED TEAMS_COACHES