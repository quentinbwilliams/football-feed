const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");

class Team {
	/************************************************
	 * STATIC METHODS:
	 * .dbGetTeam(apiFootballID)
	 * 
	 * INSTANCE METHODS:
	 * .init()
	 * .dbInsertTeam()
	 ************************************************/
	constructor(apiFootballID) {
		this.apiFootballID = apiFootballID;
	}

	static async dbGetTeam(apiFootballID) {
		try {
			const query = await db.query(
				`SELECT api_football_id, name, country, founded, national, logo, city
				FROM teams
				WHERE api_football_id = $1`,
				[apiFootballID]
			);
			const team = query.rows[0];
			return team;
		} catch (e) {
			next(e);
		}
	}

	async init() {
		const data = await Team.dbGetTeam(this.apiFootballID);
		this.name = data.name;
		this.logo = data.logo;
		this.country = data.country;
		this.city = data.city;
		this.founded = data.founded;
		this.national = data.national;
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
}

module.exports = Team;
