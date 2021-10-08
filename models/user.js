const db = require("../db/db");

class User {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static async authenticate()

	async dbSetLeagues(leagueID) {
		const insert = await db.query(
			`INSERT INTO users_leagues (username, league_id)
			VALUES ($1,$2)`, [this.username, leagueID]
		)
	}

	//! Join on user id not username

	async dbGetLeagues() {
		// QUERY USERS_LEAGUES WITH USERNAME 
		const leaguesArr = [];
		const joinQuery = await db.query(
			`SELECT league_id
			FROM users_leagues
			WHERE username = $1`, [this.username]
		);
		const leagueIDs = joinQuery.rows;
		for (let i = 0; i < leagueIDs.length; i++) {
			const leagueID = leagueIDs[i];
			const leagueQuery = await db.query(
				`SELECT api_football_id, name, country_name, type, logo, country_code
				FROM leagues WHERE api_football_id = $1`, [leagueID]
			);
			const league = leagueQuery.rows[0];
			leaguesArr.push(league);
		}
		this.leagues = leaguesArr;
	}

	async dbSetTeams() {

	}

	async dbGetTeams() {
		const
	}

	async addLeague() {
		const
	}

	async addTeam() {
		const
	}

	async deleteLeague() {
		const
	}

	async deleteTeam() {
		const
	}

	register() {
		// REGISTER USER
	}

}

module.exports = User;