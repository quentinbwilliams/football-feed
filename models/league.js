const db = require("../db/db");
const season = require("../season/season");
const headers = require("../headers/api-football");
const axios = require("axios").default;
const Country = require("./country");
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
	 * .dbGetAllMatches()
	 * .apiGetCurrentRound()
	 * .apiGetLiveMatches()
	 * .apiGetTopGoals()
	 * .apiGetTopAssists()
	 * .apiGetTopRedCards()
	 * .apiGetTopYellowCards()
	 * .apiGetStandings()
	 * .dbGetTeamsInLeague()
	 ************************************************/

	constructor(apiFootballID) {
		// CREATE LEAGUE OBJECT WITH ID FROM API FOOTBALL
		this.apiFootballID = apiFootballID;
	}

	// INIT FUNCTION CALLS dgGetLeague() with league id.
	async init() {
		// CALL .init() ON A LEAGUE INSTANCE WITH API ID TO SET LEAGUE INFO
		try {
			const data = await League.dbGetLeague(this.apiFootballID);
			this.name = data.name;
			this.countryName = data.country_name;
			this.type = data.type;
			this.logo = data.logo;
			this.countryCode = data.country_code;
		} catch (e) {
			return new ExpressError(e);
		}
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
			return new ExpressError(e);
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
			return new ExpressError(e);
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
			return new ExpressError(e);
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
				return standings[0];
			} else {
				this.teams = standings;
				return standings;
			}
		} catch (e) {
			return new ExpressError(e);
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
				return new ExpressError(e);
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
			return new ExpressError(e);
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
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetAllMatches() {
		try {
			const query = await db.query(
				`SELECT api_football_id, league, league_id, season, round,date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win, created_at 
				FROM matches
				WHERE league_id = $1`,
				[this.apiFootballID]
			);
			const data = query.rows;
			this.allMatches = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
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
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetCurrentRoundMatches() {
		try {
			const currentRound = await this.apiGetCurrentRound();
			const query = await db.query(
				`SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
				FROM matches WHERE league_id = $1
				AND round = $2`,
				[this.apiFootballID, currentRound[0]]
			);
			const data = query.rows;
			this.currentRoundMatches = data;
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
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetGoals() {
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
			this.goals = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetAssists() {
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
			this.assists = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetRedCards() {
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
			this.redCards = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async apiGetYellowCards() {
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
			this.yellowCards = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
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
			if (this.type === "League") {
				this.standings = leagueStandings[0];
				return leagueStandings[0];
			} else {
				this.standings = leagueStandings;
				return leagueStandings;
			}
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbGetTeamsInLeague() {
		try {
			const query = await db.query(
				`SELECT DISTINCT home_id FROM matches WHERE league_id = $1`,
				[this.apiFootballID]
			);
			const data = query.rows.map((team) => team.home_id);
			this.teamsInLeague = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = League;
