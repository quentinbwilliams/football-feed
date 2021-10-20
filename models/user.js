const db = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SECRET_KEY = require("../config");
const ExpressError = require("../error");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const validator = require("validator");

class User {
	constructor(username, email, id) {
		this.username = username;
		this.email = email;
		this.id = id;
	}

	static async register(username, email, password) {
		// IF USERNAME AND EMAIL ARE VALID STRINGS:
		// HASH PASSWORD,
		// INSERT USERNAME, EMAIL, HASHED PASSWORD INTO DB
		// RETURN USER OBJECT WITH VALUES
		try {
			if (validator.isEmail(email) & validator.isAlphanumeric(username)) {
				const hashedPassword = await bcrypt.hash(password, saltRounds);
				const insert = await db.query(
					`INSERT INTO users (username, email, password)
					VALUES ($1,$2,$3)
					RETURNING username, email, id`,
					[username, email, hashedPassword]
				);
				const data = insert.rows[0];
				const user = new User(data.username, data.email, data.id);
				return user;
			} else {
				throw new ExpressError("Invalid username or password");
			}
		} catch (e) {
			console.log(e);
		}
	}

	static async login(email, password) {
		// QUERY DB FOR USER,
		// IF USER EXISTS:
		// COMPARE INPUT PASSWORD WITH SAVED PASSWORD;
		// IF PASSWORDS MATCH:
		// RETURN USER OBJECT WITH EMAIL, USERNAME, ID.
		const userArr = [];
		try {
			const query = await db.query(
				`SELECT id, email, username, password
				FROM users
				WHERE email = $1`,
				[email]
			);
			const userData = query.rows[0];
			if (userData) {
				const compare = await bcrypt.compare(password, userData.password);
				if (compare) {
					const user = new User(userData.username, userData.email, userData.id);
					userArr.push(user);
				} else {
					throw new ExpressError("Invalid password", 400);
				}
			} else {
				throw new ExpressError("Invalid username", 400);
			}
		} catch (e) {
			console.log(e);
		}
		return userArr[0];
	}

	async init() {
		try {
			if (this.loginUser()) {
				this.dbGetUserLeagues;
				this.dbGetUserTeams;
			} else {
				return "login failed";
			}
		} catch (e) {
			next(e);
		}
	}

	async dbAddUserLeague(leagueID) {
		try {
			const insert = await db.query(
				`INSERT INTO users_leagues (user_id, league_id)
			VALUES ($1,$2)`,
				[this.id, leagueID]
			);
		} catch (e) {
			next(e);
		}
	}

	async dbRemoveUserLeague(leagueID) {
		try {
			const remove = await db.query(
				`DELETE FROM users_leagues
			WHERE user_id = $1 AND league_id = $2`,
				[this.id, leagueID]
			);
			return remove.rows[0];
		} catch (e) {
			next(e);
		}
	}

	async dbAddUserTeam(teamID) {
		try {
			const insert = await db.query(
				`INSERT INTO users_teams (user_id, team_id)
			VALUES ($1, $2)`,
				[this.id, teamID]
			);
			return insert.rows[0];
		} catch (e) {
			next(e);
		}
	}

	async dbRemoveUserTeam(teamID) {
		try {
			const remove = await db.query(
				`DELETE FROM users_teams
				WHERE user_id = $1 AND team_id = $2`,
				[this.id, teamID]
			);
			return remove.rows[0];
		} catch (e) {
			next(e);
		}
	}

	async dbGetUserLeagues() {
		// QUERY USERS_LEAGUES WITH USER ID
		const leaguesArray = [];
		const getLeagueIDs = await db.query(
			`SELECT league_id
			FROM users_leagues
			WHERE user_id = $1`,
			[this.id]
		);
		const leagueIDs = getLeagueIDs.rows;
		for (let i = 0; i < leagueIDs.length; i++) {
			const leagueID = leagueIDs[i];
			const leagueQuery = await db.query(
				`SELECT api_football_id, name, country_name, type, logo, country_code
				FROM leagues WHERE api_football_id = $1`,
				[leagueID]
			);
			const league = leagueQuery.rows[0];
			leaguesArray.push(league);
		}
		this.leagues = leaguesArray;
	}

	async dbGetUserTeams() {
		const teamsArray = [];
		const getTeamIDs = await db.query(
			`SELECT team_id
			FROM users_teams
			WHERE user_id = $1`,
			[this.id]
		);
		const teamIDs = getTeamIDs.rows;
		for (let i = 0; i < teamIDs.length; i++) {
			const teamID = teamIDs[i];
			const teamQuery = await db.query(
				`SELECT api_football_id, name, country, founded, national, logo, city
				FROM teams
				WHERE api_football_id = $1`,
				[teamID]
			);
			const team = teamQuery.rows[0];
			teamsArray.push(team);
		}
		this.teams = teamsArray;
	}
}

module.exports = User;
