const db = require("../db/db");
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
			return query;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	static async dbHasMatch(apiFootballID) {
		try {
			const query = await db.query(
				`SELECT api_football_id
				FROM matches
				WHERE api_football_id = $1`,
				[apiFootballID]
			);
			const match = query.rows[0];
			if (match.length === 0) {
				return false;
			} else {
				return true;
			}
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbInsertMatchData() {
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

	// async dbUpdateMatchData() {
	// 	try {
	// 		// UPDATE MATCH DATE, REFEREE, HT_HOME, HT_AWAY, FT_HOME, FT_AWAY, ET_HOME, ET_AWAY, PEN_HOME, PEN_AWAY, HOME_WIN, AWAY_WIN
	// 		const update = await db.query(
	// 			`UPDATE matches
	// 			SET date = $1,
	// 			referee = $2,
	// 			ht_home = $3,
	// 			ht_away = $4,
	// 			ft_home = $5,
	// 			ft_away = $6,
	// 			et_home = $7,
	// 			et_away = $8,
	// 			pen_home = $9,
	// 			pen_away = $10,
	// 			home_win = $11,
	// 			away_win = $12
	// 			WHERE api_football_id = $13`,
	// 			[
	// 				this.date,
	// 				this.referee,
	// 				this.htHome,
	// 				this.htAway,
	// 				this.ftHome,
	// 				this.ftAway,
	// 				this.etHome,
	// 				this.etAway,
	// 				this.penHome,
	// 				this.penAway,
	// 				this.homeWin,
	// 				this.awayWin,
	// 				this.api_football_id
	// 			]
	// 		);
	// 		console.log(
	// 			`UPDATED ${this.home} ${this.ftHome} vs ${this.away} ${this.ftAway}, in ${this.league}`
	// 		);
	// 	} catch (e) {
	// 		return new ExpressError(e);
	// 	}
	// }
}

module.exports = Match;
