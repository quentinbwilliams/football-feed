const db = require("../db/db");
const bcrypt = require("bcrypt")
const BCRYPT_WORK_FACTOR = require("../config");
const SECRET_KEY = require("../config");
const ExpressError = require("../error");
const jwt = require("jsonwebtoken");



class User {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	async authenticate() {
		try {
			const hashedPassword = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);
			const insert = await db.query(`
			INSERT INTO users (username, email, password)
			VALUES ($1,$2,$3)
			RETURNING username, id` [this.username, this.email, hashedPassword])
			return query.rows[0];
		} catch (e) {
			if (e.code === '23505') {
				return next(new ExpressError("Username taken", 400));
			}
			return next(e)
		}
	}

	async login() {
		try {
			const query = await db.query(`
			SELECT id, username, password
			FROM users
			WHERE username = $1`, [this.username])
			const user = query.rows[0];
			if (user) {
				if (await bcrypt.compare(password, user.password)) {
					const token = jwt.sign(this.username, SECRET_KEY);
					return token
				}
			} else {
				throw new ExpressError("Invalid username/password", 400);
			}
		} catch (e) {
			return next(e);
		}
	}



	async dbSetLeagues(leagueID) {
		const insert = await db.query(
			`INSERT INTO users_leagues (user_id, league_id)
			VALUES ($1,$2)`, [this.username, leagueID]
		)
	}


	async dbGetLeagues() {
		// QUERY USERS_LEAGUES WITH USER ID 
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