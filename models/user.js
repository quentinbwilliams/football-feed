const db = require("../db/db");

class User {
	constructor(username, email, password, favoriteLeagues, favoriteTeams) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.favoriteLeagues = favoriteLeagues;
		this.favoriteTeams = favoriteTeams;
	}

	async getLeagues() {
		const query = db.query(
			`SELECT `
		)
	}

	async getTeams() {
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

	authenticate() {
		// AUTHENTICATE USER
	}
}

module.exports = User;