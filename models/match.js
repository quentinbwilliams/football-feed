const db = require("../db/db");
const season = require("../season/season");
const headers = require("../headers/api-football");
const axios = require("axios").default;
const Country = require("./country");
const Team = require("./team");
const ExpressError = require("../error");

class Match {
	constructor(
		apiFootballID,
		league,
		leagueID,
		season,
		round,
		date,
		referee,
		home,
		homeID,
		away,
		awayID,
		htHome,
		htAway,
		ftHome,
		ftAway,
		etHome,
		etAway,
		penHome,
		penAway,
		homeWin,
		awayWin
	) {
		this.apiFootballID = apiFootballID;
		this.league = league;
		this.leagueID = leagueID;
		this.season = season;
		this.round = round;
		this.date = date;
		this.referee = referee;
		this.home = home;
		this.homeID = homeID;
		this.away = away;
		this.awayID = awayID;
		this.htHome = htHome;
		this.htAway = htAway;
		this.ftHome = ftHome;
		this.ftAway = ftAway;
		this.etHome = etHome;
		this.etAway = etAway;
		this.penHome = penHome;
		this.penAway = penAway;
		this.homeWin = homeWin;
		this.awayWin = awayWin;
	}

	static async dbGetLeaguesTeams() {
		try {
			const query = await db.query(
				`SELECT DISTINCT league_id, home_id FROM matches`
			);
			const data = query.rows;
			return data;
		} catch {
			return new ExpressError(e);
		}
	}

	static async dbCreateTable() {
		try {
			const query = await db.query(
				`CREATE TABLE matches
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
				)`
			);
			return query
		} catch (e) {
			return new ExpressError(e);
		}
	}

	static async dbDropTable() {
		try {
			const query = await db.query(`DROP TABLE matches`);
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbInsertMatchData() {
		try {
			const insert = await db.query(
				`INSERT INTO matches (api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win)
				VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`,
				[
					this.apiFootballID,
					this.league,
					this.leagueID,
					this.season,
					this.round,
					this.date,
					this.referee,
					this.home,
					this.homeID,
					this.away,
					this.awayID,
					this.htHome,
					this.htAway,
					this.ftHome,
					this.ftAway,
					this.etHome,
					this.etAway,
					this.penHome,
					this.penAway,
					this.homeWin,
					this.awayWin,
				]
			);
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = Match;
