const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res, next) => {
	return res.send("Hello user");
});

// GET user by id
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log('id: ', id)
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		const leagues = await user.dbGetUserLeagueIDs();
		// const teams = await user.dbGetUserTeams();
		console.log('LEAGUES: ', leagues)
		// console.log('TEAMS: ', teams)
		console.log('USER: ', user)
		// return res.send([user, teams]);
	} catch (err) {
		return next(err);
	}
});

// GET user leagues
router.get("/:id/leagues", async (req, res, next) => {
	const { id } = req.params;
	const user = await User.getUserByID(id);
	await user.dbGetUserLeagues();
	return res.send(user);
});

// GET user teams
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const usersTeams = await db.query(
			`SELECT * FROM users
			JOIN users_teams AS ut
			ON users.id = ut.user_id 
			JOIN teams as t
			ON ut.team_id = t.id
			WHERE users.id=$1`,
			[id]
		);
		const teams = usersTeams.rows;
		return teams;
	} catch (e) {
		return next(e);
	}
});

// UPDATE user leagues
router.patch("/:id/league/:league_id", async (req, res, next) => {
	const { id, league_id } = req.params;
	try {
		const updateUserLeague = await db.query(
			`INSERT INTO users_leagues(user_id, league_id)
			VALUES ($1,$2) RETURNING user_id, league_id`,
			[id, league_id]
		);
	} catch (e) {
		return next(e);
	}
});

// UPDATE user teams
router.patch("/:id/team/:team_id", async (req, res, next) => {
	const { id, team_id } = req.params;
	try {
		const updateUserLeague = await db.query(
			`INSERT INTO users_teams(user_id, team_id)
			VALUES ($1,$2) RETURNING user_id, league_id`,
			[id, team_id]
		);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
