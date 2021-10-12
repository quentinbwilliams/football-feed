const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");

class Team {
  constructor(apiFootballID, name, country, founded, national, logo, city) {
    this.apiFootballID = apiFootballID;
    this.name = name;
    this.country = country;
    this.founded = founded;
    this.national = national;
    this.logo = logo;
    this.city = city || "NA";
  }

  async dbInsertTeam() {
    try {
      const insert = await db.query(
        `INSERT INTO teams (api_football_id, name, country, founded, national, logo, city)
				VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          this.apiFootballID,
          this.name,
          this.country,
          this.founded,
          this.national,
          this.logo,
          this.city,
        ]
      );
    } catch (e) {
      console.log(e);
    }
  }

  async apiGetTeamData() {
    try {
      const options = {
        params: {
          id: `${this.apiFootballTeamID}`,
        },
        headers: headers,
      };
      const request = await axios.get(
        "https://api-football-v1.p.rapidapi.com/v3/teams",
        options
      );
      const data = request.data.response[0];
      this.name = data.team.name;
      this.data = data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Team;
