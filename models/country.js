const axios = require("axios").default;
const db = require("../db/db");
const headers = require("../headers/api-football");

class Country {
  constructor(code, name, flag) {
    this.code = code || 'WF';
    this.name = name;
    this.flag = flag;
  }

  static async dbGetCountries() {
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

  static async apiGetAllCountries() {
    const options = {
      headers: headers,
    };
    const request = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/countries",
      options
    );
    const countries = request.data.response;
    return countries;
  }

  async apiGetCountryData() {
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
  }

  async dbInsertCountryData() {
    try {
      const insert = await db.query(
        `INSERT INTO countries (code, name, flag) VALUES ($1,$2,$3) RETURNING code, name, flag`,
        [this.code, this.name, this.flag]
      );
    } catch (e) {
      console.log(e);
    }
  }

  async dbGetLeaguesInCountry() {
    // RETURNS ALL LEAGUES IN A COUNTRY GIVEN A COUNTRY CODE
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues
			WHERE country_code = $1`,
      [this.code]
    );
    const leauges = res.rows;
    this.leauges = leauges;
    return leauges;
  }

  async apiGetNationalTeam() {
    // CALL API FOR INFO ON COUNTRIES NATIONAL TEAMS
  }
}

module.exports = Country;
