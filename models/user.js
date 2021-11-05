const db = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SECRET_KEY = require("../config");
const ExpressError = require("../error");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const validator = require("validator");

class User {
	/************************************************
	 * STATIC METHODS:
	 * .register(username,email,password)
	 * .login(email,password)
	 * .getUserByUsername(username)
	 * .getUserByEmail(email)
	 * .getUserByID(id)
	 *
	 * INSTANCE METHODS:
	 * .dbGetUserLeagues()
	 * .dbAddUserLeague(leagueID)
	 * .dbRemoveUserLeagues(leagueID)
	 * .dbGetUserTeams()
	 * .dbAddUserTeam(teamID)
	 * .dbRemoveUserTeam(teamID)
	 ************************************************/

	constructor(username, email, id) {
		this.username = username;
		this.email = email;
		this.id = id;
	}

	/************************************************
	 * REGISTER USER
	 * LOG IN USER
	 ************************************************/

	static async register(username, email, password) {
		// IF USERNAME AND EMAIL ARE VALID STRINGS:
		// HASH PASSWORD,
		// INSERT USERNAME, EMAIL, HASHED PASSWORD INTO DB
		try {
			if (!validator.isEmail(email)) {
				throw new ExpressError("Invalid email address");
			} else if (!validator.isAlphanumeric(username)) {
				throw new ExpressError("Username must be alphanumeric.");
			} else if (!validator.isAlphanumeric(password)) {
				throw new ExpressError("Password must be alphanumeric.");
			} else {
				const hashedPassword = await bcrypt.hash(password, saltRounds);
				try {
					const insert = await db.query(
						`INSERT INTO users (username, email, password)
					VALUES ($1,$2,$3)
					RETURNING username, email, id`,
						[username, email, hashedPassword]
					);
					const data = await insert.rows[0];
					return data;
				} catch (e) {
					throw new ExpressError(
						"An account is already associated with username/email"
					);
				}
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
					return user;
				} else {
					throw new ExpressError("Invalid password", 400);
				}
			} else {
				throw new ExpressError("Invalid username", 400);
			}
		} catch (e) {
			console.log(e);
		}
	}

	/************************************************
	 * GET USER BY EMAIL, USERNAME, OR ID
	 ************************************************/

	static async getUserByUsername(username) {
		// SEARCH FOR USER WITH USERNAME
		const query = await db.query(
			`SELECT * FROM users
			WHERE username = $1`,
			[username]
		);
		const user = query.rows[0];
		return user;
	}

	static async getUserByEmail(email) {
		// SEARCH FOR USER WITH USERNAME
		const query = await db.query(
			`SELECT * FROM users
			WHERE email = $1`,
			[email]
		);
		const user = query.rows[0];
		return user;
	}

	static async getUserByID(id) {
		// SEARCH FOR USER WITH USERNAME
		const query = await db.query(
			`SELECT * FROM users
			WHERE id = $1`,
			[id]
		);
		const user = query.rows[0];
		return user;
	}

	/************************************************
	 * USER LEAGUE METHODS
	 * GET LEAGUES
	 * ADD LEAGUES
	 * REMOVE LEAGUES
	 ************************************************/

	async dbGetUserLeagues() {
		try {
			const query = await db.query(
				`SELECT
				users_leagues.user_id,
				users_leagues.league_id,
				leagues.name,
				leagues.type,
				leagues.logo
				FROM users_leagues
				JOIN leagues on users_leagues.league_id=leagues.api_football_id
				WHERE users_leagues.user_id = $1`,
				[this.id]
			);
			const data = query.rows;
			this.leagues = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbAddUserLeague(leagueID) {
		try {
			const userLeagues = await this.dbGetUserLeagues();
			let findLeague = userLeagues.find(
				(obj) => obj.api_football_id == leagueID
			);
			if (findLeague) {
				throw new ExpressError("You already follow this league");
			} else {
				const insert = await db.query(
					`INSERT INTO users_leagues (user_id, league_id)
					VALUES ($1,$2)`,
					[this.id, leagueID]
				);
				return "Successfully added league";
			}
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

	/************************************************
	 * USER TEAM METHODS
	 * GET TEAMS
	 * ADD TEAMS
	 * REMOVE TEAMS
	 ************************************************/

	async dbGetUserTeams() {
		try {
			const query = await db.query(
				`SELECT
				users_teams.user_id,
				users_teams.team_id,
				teams.name as team_name,
				teams.founded as team_founded,
				teams.logo as team_logo,
				teams.city as team_city
				FROM users_teams
				JOIN teams on users_teams.team_id=teams.api_football_id
				WHERE users_teams.user_id = $1`,
				[this.id]
			);
			const data = query.rows;
			this.teams = data;
			return data;
		} catch (e) {
			return new ExpressError(e);
		}
	}

	async dbAddUserTeam(teamID) {
		try {
			const userTeams = await this.dbGetUserTeams();
			console.log;
			let findTeam = userTeams.find((obj) => obj.api_football_id == teamID);
			console.log(userTeams);
			if (findTeam) {
				throw new ExpressError("You already follow this team");
			} else {
				const insert = await db.query(
					`INSERT INTO users_teams (user_id, team_id)
					VALUES ($1, $2)`,
					[this.id, teamID]
				);
				return insert.rows[0];
			}
		} catch (e) {
			next(e);
		}
	}

	async dbRemoveUserTeam(teamID) {
		try {
			const remove = await db.query(
				`DELETE FROM users_teams
				WHERE user_id = $1 AND team_id = $2
				RETURNING user_id, team_id`,
				[this.id, teamID]
			);
			return remove.rows[0];
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = User;
