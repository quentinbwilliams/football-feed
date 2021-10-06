const db = require("../db/db");

class League {
  constructor(name, country, standings) {
    this.name = name;
    this.country = country;
    this.standings = standings;
  }

  static async getAllLeagues() {
    // RETURNS ALL LEAGUES IN DB
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues;`
    );
    return res.rows;
  }

  static async getLeaguesInCountry(countryCode) {
    // RETURNS ALL LEAGUES IN A COUNTRY GIVEN A COUNTRY CODE
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues
			WHERE country_code = $1`,
      [countryCode]
    );
    return res.rows;
  }

  static async getLeaguesByTypeInCountry(countryCode, leagueType) {
    // RETURNS ALL LEAGUES OF A SPECIFIC TYPE IN A CERTAIN COUNTRY
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leauges
			WHERE country_code = $1
			AND type = $2`,
      [countryCode, leagueType]
    );
    return res.rows;
  }

  static async getLeagueByApiId(apiFootballID) {
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues
			WHERE api_football_id = $1`,
      [apiFootballID]
    );
    return res.row[0];
  }

  static async getStandings(leagueID) {
    //CALL API FOOTBALL FOR CURRENT STANDINGS. RESULT FROM API WILL  CONTAIN A LIST OF ALL TEAMS AND THEIR DATA
  }

  static async getLiveMatches(leagueID) {
    // CALL API FOOTBALL LIVE MATCHES, OTHERWISE RETURN FALSE
  }

  static async getMatchweek(leagueID) {
    // CALL API FOOTBALL AND RETURN THE MATCH SCHEDULE FOR THE UPCOMING MATCHWEEK
  }

  static async getScorers(leagueID) {
    // CALL API FOOTBALL AND RETURN THE TOP SCORERS FOR THE LEAGUE
  }

  static async getCompletedMatches(leagueID) {
    // CALL FOOTBALL API RETURN THE MATCHES THAT HAVE BEEN PLAYED SO FAR IN THE SEASON
  }
}

module.exports = League;
