const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season");
const ExpressError = require("../error");

class Team {
	/************************************************
	 * STATIC METHODS:
	 * .dbGetTeamByID(apiFootballID)
	 *
	 * INSTANCE METHODS:
	 * .init()
	 * .dbInsertTeam()
	 * .apiGetAllMatches()
	 * .apiGetLiveMatches()
	 * .apiGetInjuryList()
	 * .apiGetSquadStats()
	 * .dbGetAllMatches()
	 * .dbGetTeamLeagues()
	 ************************************************/
	constructor(apiFootballID) {
		this.apiFootballID = apiFootballID;
	}

	static async dbGetTeamByID(apiFootballID) {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country, founded, national, logo, city
				FROM teams
				WHERE api_football_id = $1`,
				[apiFootballID]
			);
			const team = query.rows[0];
			return team;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async init() {
		const data = await Team.dbGetTeamByID(this.apiFootballID);
		this.name = data.name;
		this.logo = data.logo;
		this.country = data.country;
		this.city = data.city;
		this.founded = data.founded;
		this.national = data.national;
	}

	async dbInsertTeam() {
		try {
			const insert = await db.query(
				`INSERT INTO teams (api_football_id, name, country, founded, national, logo, city)
				VALUES ($1,$2,$3,$4,$5,$6,$7)`,
				[
					this.apiFootballID,
					this.name,
					this.country,
					this.founded,
					this.national,
					this.logo,
					this.city,
				]
			);
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetAllMatches() {
		try {
			const options = {
				headers: headers,
				params: {
					team: this.apiFootballID,
					season: season,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/fixtures",
				options
			);
			const data = request.data.response;
			this.allMatches = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetLiveMatches() {
		try {
			const options = {
				headers: headers,
				params: {
					team: this.apiFootballID,
					live: "all",
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/fixtures",
				options
			);
			const data = request.data.response;
			this.liveMatches = data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetInjuryList() {
		try {
			const options = {
				headers: headers,
				params: {
					season: season,
					team: this.apiFootballID,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/injuries",
				options
			);
			const data = request.data.response;
			this.injuryList = data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetSquadStats() {
		// MAY RETURN OUTDATED INFO
		try {
			const options = {
				headers: headers,
				params: {
					team: this.apiFootballID,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/players/squads",
				options
			);
			const data = request.data.response[0].players;
			this.squadStats = data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetAllMatches() {
		try {
			const query = await db.query(
				`
			SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
			FROM matches
			WHERE home_id = $1
			OR away_id = $1`,
				[this.apiFootballID]
			);
			const data = query.rows;
			this.allMatches = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetCompletedMatches() {
		try {
			const query = await db.query(
				`SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
				FROM matches
				WHERE (home_id = $1 AND ft_home >= 0) OR (away_id = $1 AND ft_home >= 0)
				ORDER BY date DESC`,
				[this.apiFootballID]
			);
			const data = query.rows;
			this.completedMatches = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetUpcomingMatches() {
		try {
			const query = await db.query(
				`SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
				FROM matches
				WHERE (home_id = $1 AND ft_home is null) OR (away_id = $1 AND ft_home is null)
				ORDER BY date
				LIMIT 5`,
				[this.apiFootballID]
			);
			const data = query.rows;
			this.completedMatches = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetTeamLeagues() {
		try {
			const query = await db.query(
				`SELECT
				leagues_teams.league_id,
				leagues_teams.team_id,
				leagues.name,
				leagues.type,
				leagues.logo
				FROM leagues_teams
				JOIN leagues ON leagues_teams.league_id=leagues.api_football_id
				WHERE leagues_teams.team_id = $1`,
				[this.apiFootballID]
			);
			const data = query.rows;
			this.leagues = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = Team;
