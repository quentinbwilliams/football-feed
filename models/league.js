const db = require("../db/db");
const season = require("../season/season");
const headers = require("../headers/api-football");
const axios = require("axios").default;

class League {
  // CREATE LEAGUE OBJECT WITH ID FROM API FOOTBALL
  constructor(apiFootballID) {
    this.apiFootballID = apiFootballID;
  }

  static async dbGetAllLeagues() {
    // RETURNS ALL LEAGUES IN DB
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues;`
    );
    return res.rows;
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
      } else {
        this.teams = standings;
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  async dbInsertLeagueData() {
    if ((this.name & this.country & this.logo & this.flag) !== null) {
      try {
        const insert = await db.query(
          `INSERT INTO leagues (name, country, logo, flag, api_football_id) VALUES ($1,$2,$3,$4,$5)`,
          [this.name, this.country, this.logo, this.flag, this.apiFootballID]
        );
      } catch (e) {
        console.log("error", e);
      }
    }
  }

  async dbQueryLeague() {
    try {
      const query = await db.query(
        `SELECT name, api_football_id, id,
				FROM leauges
				WHERE api_fooball_id = $1`,
        [this.apiFootballID]
      );
      const league = query.rows[0];
      return league;
    } catch (e) {
      console.log("error", e);
    }
  }

  async dbGetLeaguesByTypeInCountry() {
    // RETURNS ALL LEAGUES OF A SPECIFIC TYPE IN A CERTAIN COUNTRY
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leauges
			WHERE country_name = $1
			AND type = $2`,
      [this.country, this.type]
    );
    return res.rows;
  }

  async dbGetLeagueByApiId() {
    const res = await db.query(
      `SELECT name, api_football_id, type, country_code
			FROM leagues
			WHERE api_football_id = $1`,
      [this.apiFootballID]
    );
    return res.rows[0];
  }

  async apiGetLiveMatches(leagueID) {
    // CALL API FOOTBALL LIVE MATCHES, OTHERWISE RETURN FALSE
  }

  async getMatchweek(leagueID) {
    // CALL API FOOTBALL AND RETURN THE MATCH SCHEDULE FOR THE UPCOMING MATCHWEEK
  }

  async getScorers(leagueID) {
    // CALL API FOOTBALL AND RETURN THE TOP SCORERS FOR THE LEAGUE
  }

  async getCompletedMatches(leagueID) {
    // CALL FOOTBALL API RETURN THE MATCHES THAT HAVE BEEN PLAYED SO FAR IN THE SEASON
  }
}

module.exports = League;
