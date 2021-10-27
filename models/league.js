const db = require("../db/db");
const season = require("../season/season");
const headers = require("../headers/api-football");
const axios = require("axios").default;
const Country = require("./country");
const { head } = require("../routes/user");
const ExpressError = require("../error");

class League {
	/************************************************
	 * STATIC METHODS:
	 * .dbGetLeague(apiFootballID)
	 * .apiGetAllLeagues()
	 * .dbGetAllLeagues()
	 *
	 * INSTANCE METHODS:
	 * .init()
	 * .apiGetLeagueData()
	 * .dbInsertLeagueData()
	 * .dbGetLeaguesByTypeInCountry()
	 * .apiGetAllMatches()
	 * .apiGetCurrentRound()
	 * .apiGetLiveMatches()
	 * .apiGetTopGoals()
	 * .apiGetTopAssists()
	 * .apiGetTopRedCards()
	 * .apiGetTopYellowCards()
	 * .apiGetStandings()
	 ************************************************/

	constructor(apiFootballID) {
		// CREATE LEAGUE OBJECT WITH ID FROM API FOOTBALL
		this.apiFootballID = apiFootballID;
	}

	// INIT FUNCTION CALLS dgGetLeague() with league id.
	async init() {
		// CALL .init() ON A LEAGUE INSTANCE WITH API ID TO SET LEAGUE INFO
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
		try {
			const res = await db.query(
				`SELECT name, api_football_id, type, country_code
				FROM leagues;`
			);
			return res.rows;
		} catch (e) {
			return new ExpressError("Unable to get all leagues from database");
		}
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
			return new ExpressError("Unable to get league data from api");
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
				return new ExpressError("Unable to insert league data");
			}
		}
	}

	async dbGetLeaguesByTypeInCountry() {
		// RETURNS ALL LEAGUES OF A SPECIFIC TYPE IN A CERTAIN COUNTRY
		try {
			const res = await db.query(
				`SELECT name, api_football_id, type, country_code
				FROM leauges
				WHERE country_name = $1
				AND type = $2`,
				[this.country, this.type]
			);
			return res.rows;
		} catch (e) {
			return new ExpressError("Unable to get leagues by type in country");
		}
	}

	async apiGetAllMatches() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
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
			return new ExpressError("Unable to get all match data");
		}
	}

	async apiGetCurrentRound() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
					season: season,
					current: true,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds",
				options
			);
			const data = request.data.response;
			this.currentRound = data;
		} catch (e) {
			return new ExpressError("Unable to get current round data");
		}
	}

	async apiGetLiveMatches() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
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
			return new ExpressError("Unable to get live match data");
		}
	}

	async apiGetTopGoals() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
					season: season,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
				options
			);
			const data = request.data.response;
			this.topGoals = data;
		} catch (e) {
			return new ExpressError("Unable to get goals data");
		}
	}

	async apiGetTopAssists() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
					season: season,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/players/topassists",
				options
			);
			const data = request.data.response;
			this.topAssists = data;
		} catch (e) {
			return new ExpressError("Unable to get assists data");
		}
	}

	async apiGetTopRedCards() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
					season: season,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/players/topredcards",
				options
			);
			const data = request.data.response;
			this.topRedCards = data;
		} catch (e) {
			return new ExpressError("Unable to get red card data");
		}
	}

	async apiGetTopYellowCards() {
		try {
			const options = {
				headers: headers,
				params: {
					league: this.apiFootballID,
					season: season,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/players/topyellowcards",
				options
			);
			const data = request.data.response;
			this.topYellowCards = data;
		} catch (e) {
			return new ExpressError("Unable to get yellow card data");
		}
	}

	async apiGetStandings() {
		try {
			const options = {
				headers: headers,
				params: {
					season: season,
					league: this.apiFootballID,
				},
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/standings",
				options
			);
			const leagueStandings = request.data.response[0].league.standings;
			if (this.type === 'League') {
				this.standings = leagueStandings[0];
			} else {
				this.standings = leagueStandings;
			}
		} catch (e) {
			return new ExpressError("Unable to get standings data");
		}
	}
}

module.exports = League;
