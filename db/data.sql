\c footy_db;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;
DROP TABLE IF EXISTS users_leagues CASCADE;
DROP TABLE IF EXISTS users_teams CASCADE;
DROP TABLE IF EXISTS users_countries CASCADE;
DROP TABLE IF EXISTS countries_leagues CASCADE;
DROP TABLE IF EXISTS teams_players CASCADE;
DROP TABLE IF EXISTS teams_coaches CASCADE;
 
CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	email UNIQUE VARCHAR(320),
	password TEXT NOT NULL,
	admin BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE countries
(
	id SERIAL PRIMARY KEY,
	name TEXT UNIQUE NOT NULL,
	code TEXT NOT NULL,
	flag TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE leagues
(
	api_football_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	country_name TEXT,
	type TEXT NOT NULL,
	logo TEXT,
	country_code TEXT,
	season INTEGER,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE teams
(
	api_football_id INTEGER PRIMARY KEY,
	name TEXT,
	country TEXT,
	founded INTEGER,
	national BOOLEAN,
	logo TEXT NOT NULL,
	city TEXT,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE players
(
	api_football_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	photo TEXT,
	nationality TEXT,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE coaches
(
	api_football_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	photo TEXT,
	nationality TEXT,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE matches
(
	api_football_id INTEGER PRIMARY KEY,
	league TEXT NOT NULL,
	league_id INTEGER NOT NULL,
	season INTEGER,
	round TEXT NOT NULL,
	date TEXT,
	referee TEXT,
	home TEXT NOT NULL,
	home_id INTEGER NOT NULL,
	away TEXT NOT NULL,
	away_id INTEGER NOT NULL,
	ht_home INTEGER,
	ht_away INTEGER,
	ft_home INTEGER,
	ft_away INTEGER,
	et_home INTEGER,
	et_away INTEGER,
	pen_home INTEGER,
	pen_away INTEGER,
	home_win BOOLEAN,
	away_win BOOLEAN,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE highlights
(
	id SERIAL PRIMARY KEY,
	home TEXT NOT NULL,
	away TEXT NOT NULL,
	competition TEXT NOT NULL,
	date TEXT,
	highlight_url TEXT NOT NULL,
	competition_url TEXT NOT NULL,
	highlight_embedded TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
)

CREATE TABLE IF NOT EXISTS users_countries
(	
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	country_id INTEGER REFERENCES countries (id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE IF NOT EXISTS users_leagues
(
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	league_id INTEGER REFERENCES leagues (api_football_id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE IF NOT EXISTS users_teams
(
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
	team_id INTEGER REFERENCES teams (api_football_id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE countries_leagues
(
	id SERIAL PRIMARY KEY,
	country_id INTEGER REFERENCES countries (id) ON DELETE CASCADE,
	league_id INTEGER REFERENCES leagues (api_football_id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABlE teams_players
(
	id SERIAL PRIMARY KEY,
	team_id INTEGER REFERENCES teams (api_football_id) ON DELETE CASCADE,
	player_id INTEGER REFERENCES players (api_football_id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE teams_coaches
(
	id SERIAL PRIMARY KEY,
	team_id INTEGER REFERENCES teams (api_football_id) ON DELETE CASCADE,
	coach_id INTEGER REFERENCES coaches (api_football_id) ON DELETE CASCADE,
	created_at TIMESTAMPTZ DEFAULT Now()
);