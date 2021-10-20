const db = require("../db/db");
const season = require("../season/season");
const headers = require("../headers/api-football");
const axios = require("axios").default;
const Country = require("./country");

class League {
	// CREATE LEAGUE OBJECT WITH ID FROM API FOOTBALL
	constructor(apiFootballID) {
		this.apiFootballID = apiFootballID;
	}

	async init() {
		// CALL .init() ON A LEAGUE OBJ WITH API ID TO SET LEAGUE INFO
		const data = await League.dbGetLeague(this.apiFootballID);
		this.name = data.name;
		this.countryName = data.country_name;
		this.type = data.type;
		this.logo = data.logo;
		this.countryCode = data.country_code;
	}

	static async dbGetLeague(apiFootballID) {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country_name, type, logo, country_code
				FROM leagues
				WHERE api_football_id = $1`,
				[apiFootballID]
			);
			const league = query.rows[0];
			return league;
		} catch (e) {
			console.log("error", e);
		}
	}

	static async apiGetAllLeagues() {
		// RETURNS ALL LEAGUES IN API
		try {
			const options = {
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/leagues",
				options
			);
			const leagues = request.data.response;
			return leagues;
		} catch (e) {
			console.log(e);
		}
	}

	static async dbGetAllLeagues() {
		// RETURNS ALL LEAGUES IN DB
		const res = await db.query(
			`SELECT name, api_football_id, type, country_code
			FROM leagues;`
		);
		return res.rows;
	}

	async apiGetLeagueData() {
		// SETS PROPERTY OF LEAGUE WITH RESULTS PROVIDED BY CALLING API FOOTBALL
		try {
			const options = {
				params: {
					season: `${season}`,
					league: `${this.apiFootballID}`,
				},
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/standings",
				options
			);
			const leagueData = request.data.response[0].league;
			const standings = leagueData.standings;
			// set object properties
			this.name = leagueData.name;
			this.country = leagueData.country;
			this.logo = leagueData.logo;
			this.flag = leagueData.flag;
			this.type = leagueData.type;
			if (standings.length <= 1) {
				this.teams = standings[0];
			} else {
				this.teams = standings;
			}
		} catch (e) {
			console.log("error", e);
		}
	}

	async dbInsertLeagueData() {
		if (
			(this.apiFootballID &
				this.name &
				this.countryName &
				this.type &
				this.logo &
				this.countryCode) !==
			null
		) {
			try {
				const insert = await db.query(
					`INSERT INTO leagues (api_football_id, name, country_name, type, logo, country_code) VALUES ($1,$2,$3,$4,$5,$6)`,
					[
						this.apiFootballID,
						this.name,
						this.countryName,
						this.type,
						this.logo,
						this.countryCode,
					]
				);
			} catch (e) {
				console.log("error", e);
			}
		}
	}

	async dbGetLeaguesByTypeInCountry() {
		// RETURNS ALL LEAGUES OF A SPECIFIC TYPE IN A CERTAIN COUNTRY
		const res = await db.query(
			`SELECT name, api_football_id, type, country_code
			FROM leauges
			WHERE country_name = $1
			AND type = $2`,
			[this.country, this.type]
		);
		return res.rows;
	}

	async apiGetLiveMatches(leagueID) {
		// CALL API FOOTBALL LIVE MATCHES, OTHERWISE RETURN FALSE
	}

	async getMatchweek(leagueID) {
		// CALL API FOOTBALL AND RETURN THE MATCH SCHEDULE FOR THE UPCOMING MATCHWEEK
	}

	async getScorers(leagueID) {
		// CALL API FOOTBALL AND RETURN THE TOP SCORERS FOR THE LEAGUE
	}

	async getCompletedMatches(leagueID) {
		// CALL FOOTBALL API RETURN THE MATCHES THAT HAVE BEEN PLAYED SO FAR IN THE SEASON
	}
}

module.exports = League;
