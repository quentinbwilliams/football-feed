const axios = require("axios").default;
const db = require("../db/db");
const headers = require("../headers/api-football");

class Country {
	constructor(code, name, flag) {
		this.code = code || "WF";
		this.name = name;
		this.flag = flag || "N/A";
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

	async dbSetLeaguesInCountry() {
		// INSERT ROWS INTO COUNTRIES_LEAGUES
	}

	async apiGetNationalTeam() {
		// CALL API FOR INFO ON COUNTRIES NATIONAL TEAMS
	}
}

module.exports = Country;
