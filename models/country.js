const db = require("../db/db");

class Country {
  constructor(name, code, leagues) {
    this.name = name;
    this.code = code;
    this.leagues = leagues;
  }
  static async getCountryWithCode(countryCode) {
    // RETURN COUNTRY ROW FROM DB
    const res = await db.query(
      `SELECT name, code, flag
			FROM countries
			WHERE code = $1`,
      [countryCode]
    );
  }
  getLeagues() {
    // CALL API TO OBTAIN LEAGUES & UPDATE VALUE OF LEAGUES ON COUNTRY INSTANCE
  }

  getNationalTeam() {
    // CALL API FOR INFO ON COUNTRIES NATIONAL TEAMS
  }
}

module.exports = Country;
