const db = require("../db");

class Country {
  static async getCountryWithCode(countryCode) {
    // RETURN COUNTRY ROW FROM DB
    const res = await db.query(
      `SELECT name, code, flag
			FROM countries
			WHERE code = $1`,
      []
    );
  }
}
