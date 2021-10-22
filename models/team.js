const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");

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
			next(e);
		}
	}

	async init() {
		const data = await Team.dbGetTeam(this.apiFootballID);
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
			console.log(e);
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
		} catch (e) {
			console.log(e);
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
			console.log(e);
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
			console.log(e);
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
			console.log(e);
		}
	}
}

module.exports = Team;
