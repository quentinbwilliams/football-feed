const db = require("../db/db");
const ExpressError = require("../error");
const headers = require("../headers/api-football");
const axios = require("axios").default;

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
			return query;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	static async dbUpdateMatchData(
		date,
		referee,
		htHome,
		htAway,
		ftHome,
		ftAway,
		etHome,
		etAway,
		penHome,
		penAway,
		homeWin,
		awayWin,
		id
	) {
		try {
			// UPDATE MATCH DATE, REFEREE, HT_HOME, HT_AWAY, FT_HOME, FT_AWAY, ET_HOME, ET_AWAY, PEN_HOME, PEN_AWAY, HOME_WIN, AWAY_WIN
			const update = await db.query(
				`UPDATE matches
				SET date = $1,
				referee = $2,
				ht_home = $3,
				ht_away = $4,
				ft_home = $5,
				ft_away = $6,
				et_home = $7,
				et_away = $8,
				pen_home = $9,
				pen_away = $10,
				home_win = $11,
				away_win = $12
				WHERE api_football_id = $13`,
				[
					date,
					referee,
					htHome,
					htAway,
					ftHome,
					ftAway,
					etHome,
					etAway,
					penHome,
					penAway,
					homeWin,
					awayWin,
					id,
				]
			);
			console.log(`UPDATED`);
		} catch (e) {
			return new ExpressError(e);
		}
	}

	static async dbGetMatchByID(apiFootballID) {
		try {
			const query = await db.query(
				`SELECT
				api_football_id,
				league,
				league_id,
				season,
				round,
				date,
				referee,
				home,
				home_id,
				away,
				away_id,
				ht_home,
				ht_away,
				ft_home,
				ft_away,
				et_home,
				et_away,
				pen_home,
				pen_away,
				home_win,
				away_win
				FROM matches
				WHERE api_football_id = $1`,
				[apiFootballID]
			);
			const data = query.rows[0];
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async init() {
		const data = await Match.dbGetMatchByID(this.apiFootballID);
		console.log(data);
		this.league = data.league;
		this.leagueID = data.league_id;
		this.season = data.season;
		this.round = data.round;
		this.date = data.date;
		this.referee = data.referee;
		this.home = data.home;
		this.homeID = data.home_id;
		this.away = data.away;
		this.awayID = data.away_id;
		this.htHome = data.ht_home;
		this.htAway = data.ht_away;
		this.ftHome = data.ft_home;
		this.ftAway = data.ft_away;
		this.etHome = data.et_home;
		this.etAway = data.et_away;
		this.penHome = data.pen_home;
		this.penAway = data.pen_away;
		this.homeWin = data.home_win;
		this.awayWin = data.away_win;
	}

	static async dbInsertMatchData(
		id,
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
		try {
			const insert = await db.query(
				`INSERT INTO matches (
				api_football_id,
				league,
				league_id,
				season,
				round,
				date,
				referee,
				home,
				home_id,
				away,
				away_id,
				ht_home,
				ht_away,
				ft_home,
				ft_away,
				et_home,
				et_away,
				pen_home,
				pen_away,
				home_win,
				away_win)
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
			console.log(
				`CREATED ${this.apiFootballID}, ${this.home} vs ${this.away}, in ${this.league}, on ${this.date}`
			);
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetLineups() {
		try {
			const options = {
				headers: headers,
				params: {
					fixture: this.apiFootballID,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups",
				options
			);
			const data = request.data.response;
			this.lineups = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = Match;
