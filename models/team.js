const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");

class Team {
	constructor(apiFootballTeamID) {
		this.apiFootballTeamID = apiFootballTeamID;
	}

	async initTeamData() {
		try {
			const options = {
				params: {
					id: `${this.apiFootballTeamID}`
				},
				headers: headers
			};
			const request = await axios.get(
				"https://api-football-v1.p.rapidapi.com/v3/teams", options
			);
			const data = request.data.response[0];
			this.name = data.team.name;
			this.data = data;
		} catch (e) {
			console.log(e)
		}
	}

	async insertTeamData() {
		try {
			const insert = await db.query(
				`INSERT INTO teams (name, api_football_id, city, country, founded, national, logo, stadium_name, stadium_id, stadium_capacity, stadium_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11) RETURNING name, api_football_id, city, country, founded, national, logo, stadium_name, stadium_id, stadium_capacity, stadium_image`, [this.data.team.name, this.data.team.id, this.data.venue.city, this.data.team.country, this.data.team.founded, this.data.team.national, this.data.team.logo, this.data.venue.name, this.data.venue.id, this.data.venue.capacity, this.data.venue.image]
			);
		} catch (e) {
			console.log(e)
		}
	}
}

	module.exports = Team;