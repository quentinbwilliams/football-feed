const axios = require("axios").default;
const db = require("../db/db");
const headers = require("../headers/api-football");

class Country {
	constructor(code, name) {
		this.code = code;
		this.name = name;
	}

	static async getCountries() {
		const options = {
			headers: headers
		}
		const request = await axios.get(
			"https://api-football-v1.p.rapidapi.com/v3/countries",
			options
		);
		const countries = request.data.response;
		return countries;
	}

	async initCountryData() {
		const options = {
			params: {
				code: this.code
			},
			headers: headers,
		};
		const request = await axios.get(
			"https://api-football-v1.p.rapidapi.com/v3/countries",
			options
		);
		const info = request.data.response;
		this.info = info;
	}

	async insertCountryData(next) {
		for (let i = 0; i < this.info.length; i++) {
			try {
				const insert = await db.query(
					`INSERT INTO countries (name, code, flag) VALUES ($1,$2,$3) RETURNING name, code, flag`,
					[this.info[0].name, this.info[0].code, this.info[0].flag]
				);
			} catch (e) {
				return next(e);
			}
		}
	}


	getLeagues() {
		// CALL API TO OBTAIN LEAGUES & UPDATE VALUE OF LEAGUES ON COUNTRY INSTANCE
	}

	getNationalTeam() {
		// CALL API FOR INFO ON COUNTRIES NATIONAL TEAMS
	}
}

module.exports = Country;