const axios = require("axios").default;
const db = require("../db/db");
const headers = require("../headers/api-football");
const ExpressError = require("../error");

class Country {
	/************************************************
	 * STATIC METHODS:
	 * .dbGetCountries()
	 * .apiGetAllCountries()
	 *
	 * INSTANCE METHODS:
	 * .apiGetCountryData()
	 * .dbInsertCountryData()
	 * .apiGetLeaguesInCountry()
	 * .apiGetTeamsInCountry()
	 * .dbGetAllNationalTeams()
	 * .dbGetAllLeagues()
	 ************************************************/

	constructor(code, name, flag) {
		this.code = code || "WF";
		this.name = name;
		this.flag = flag || "N/A";
	}

	static async dbGetCountryByCode(code) {
		try {
			const query = await db.query(
				`SELECT id, name, code, flag
				FROM countries
				WHERE code = $1`,
				[code]
			);
			const data = query.rows[0];
			const country = new Country(data.code, data.name, data.flag);
			return country;
		} catch (e) {
			return new ExpressError("Unable to get country data with code");
		}
	}

	static async dbGetCountryByName(name) {
		try {
			const query = await db.query(
				`SELECT id, name, code, flag
				FROM countries
				WHERE name = $1`,
				[name]
			);
			const data = query.rows[0];
			const country = new Country(data.code, data.name, data.flag);
			return country;
		} catch (e) {
			console.log(e);
		}
	}

	// GET ALL COUNTRIES IN DATABASE
	static async dbGetCountries() {
		// QUERY DATABASE FOR ALL COUNTRIES, RETURNING ARRAY WITH CODE, NAME, FLAG.
		try {
			const query = await db.query(
				`SELECT code, name, flag
				FROM countries`
			);
			const countries = query.rows;
			return countries;
		} catch (e) {
			console.log(e);
		}
	}

	// GET ALL COUNTRIES FROM API FOOTBALL
	static async apiGetAllCountries() {
		// REQUEST API FOR ALL COUNTRIES, RETURNING ARRAY WITH COUNTRY JSON.
		try {
			const options = {
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/countries",
				options
			);
			const countries = request.data.response;
			return countries;
		} catch (e) {
			console.log(e);
		}
	}

	async apiGetCountryData() {
		// REQUEST API FOR COUNTRY DATA (CODE, NAME, FLAG), SETTING THE INFO ATTRIBUTE ON INSTANCE AS RESULT OF REQUEST.
		try {
			const options = {
				params: {
					code: this.code,
				},
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/countries",
				options
			);
			const info = request.data.response;
			this.info = info;
		} catch (e) {
			console.log(e);
		}
	}

	async dbInsertCountryData() {
		// INSERT ROW WITH COUNTRY DATA INTO DATABASE.
		try {
			const insert = await db.query(
				`INSERT INTO countries (code, name, flag) VALUES ($1,$2,$3) RETURNING code, name, flag`,
				[this.code, this.name, this.flag]
			);
		} catch (e) {
			console.log(e);
		}
	}

	async apiGetLeaguesInCountry() {
		// REQUEST API FOR ALL LEAGUES IN COUNTRY, RETURNS ARRAY WITH JSON CONTAINING LEAGUE, COUNTRY, SEASONS OBJECTS. LEAGUES ATTRIBUTE ON INSTANCE IS SET TO RESULT OF REQUEST.
		try {
			const options = {
				params: {
					country: this.name,
				},
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/leagues",
				options
			);
			this.leagues = request.data.response;
		} catch (e) {
			console.log(e);
		}
	}

	async apiGetTeamsInCountry() {
		// REQUEST API FOR ALL TEAMS IN COUNTRY, RETURNS ARRAY WITH JSON CONTAINING TEAM AND VENUE OBJECTS. TEAMS ATTRIBUTE ON INSTANCE IS SET TO RESULT OF REQUEST.
		try {
			const options = {
				params: {
					country: `${this.name}`,
				},
				headers: headers,
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/teams",
				options
			);
			this.teams = request.data.response;
		} catch (e) {
			console.log(e);
		}
	}

	async dbGetAllLeagues() {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country_name, type, logo, country_code
				FROM leagues
				WHERE country_code = $1`,
				[this.code]
			);
			const data = query.rows;
			this.leagues = data;
			return data;
		} catch (e) {
			return new ExpressError("Unable to find leagues in country");
		}
	}

	async dbGetAllNationalTeams() {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country, founded, national, logo, city
				FROM teams
				WHERE national = true AND country = $1`,
				[this.name]
			);
			const data = query.rows;
			this.teams = data;
			return data;
		} catch (e) {
			return new ExpressError("Unable to find teams for country");
		}
	}

	async dbGetAllTeams() {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country, founded, national, logo, city
				FROM teams
				WHERE country = $1`,
				[this.name]
			);
			const data = query.rows;
			this.nationalTeams = data;
			return data;
		} catch (e) {
			return new ExpressError("Unable to find teams for country");
		}
	}
}

module.exports = Country;
