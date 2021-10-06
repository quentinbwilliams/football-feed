const db = require("../db/db");

const seedCountriesLeagues = async () => {
  try {
    let query = await db.query(`SELECT code FROM COUNTRIES`);
    const codes = query.rows;
    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      let query = await db.query(
        `SELECT api_football_id FROM leagues WHERE country_code = $1`,
        [code]
      );
      const leagueIDs = query.rows;
      for (let j = 0; j < leagueIDs.length; j++) {
        const league = leagueIDs[j];
        let insert = await db.query(
          `INSERT INTO countries_leagues (country_code, league_id) VALUES ($1,$2)`,
          [code, league]
        );
      }
    }
  } catch (err) {
    console.log("ERROR", err);
  }
};
