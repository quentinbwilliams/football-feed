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
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		const leagues = await user.dbGetUserLeagues();
		const teams = await user.dbGetUserTeams();
		console.log("USER: ", user);
		return res.send([user, teams]);
	} catch (err) {
		return next(err);
	}
});

// GET user leagues
router.get("/:id/leagues", async (req, res, next) => {
	try {
		const { id } = req.params;
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		await user.dbGetUserLeagues();
		return res.send(user);
	} catch (e) {
		return next(e);
	}
});

// GET user teams
router.get("/:id/teams", async (req, res, next) => {
	try {
		const { id } = req.params;
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		await user.dbGetUserTeams();
		return res.send(user);
	} catch (e) {
		return next(e);
	}
});

// UPDATE user leagues
router.patch("/:id/league/:leagueID", async (req, res, next) => {
	const { id, leagueID } = req.params;
	try {
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		await user.dbAddUserLeague(leagueID);
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
