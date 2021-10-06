const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");
const league = require("./league");

class Team {
  constructor(apiFootballTeamID) {
    this.apiFootballTeamID = apiFootballTeamID;
	}
	
	async initTeamData() {
		const options = {
			params: {id: `${this.apiFootballTeamID}`},
			headers: headers
		}
		const request = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/teams", options
		);
		console.log(request); 
	}
}

module.exports = Team;
