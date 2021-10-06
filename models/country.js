axios = require("axios").default;
const db = require("../db/db");
const headers = require("../headers/api-football");

class Country {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
  static async getCountryWithCode(countryCode) {
    // RETURN COUNTRY ROW FROM DB
    const query = await db.query(
      `SELECT name, code, flag
			FROM countries
			WHERE code = $1`,
      [countryCode]
    );
    return query;
  }

  static async getCountries() {
    const request = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/countries",
      headers
    );
    const countries = request.data.response;
    return countries;
  }

  async createCountryRow(next) {
    try {
      const insert = await db.query(
        `INSERT INTO countries (name, code, flag) VALUES ($1,$2,$3) RETURNING name, code, flag`,
        [this.name, this.code, this.flag]
      );
    } catch (e) {
      return next(e);
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
