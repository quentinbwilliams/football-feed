const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();
const User = require("../models/user");

// LOGIN
router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		res.send(user);
	} catch (e) {
		return new ExpressError("Invalid username or password");
	}
});

// LOGOUT
// router.get("/logout", async (req, res, next) => {
// 	const
// })

// GET user by id
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		const leagues = await user.dbGetUserLeagues();
		const teams = await user.dbGetUserTeams();
		return res.send([user, teams]);
	} catch (err) {
		return next(err);
	}
});

// GET user leagues
router.get("/:id/leagues", async (req, res, next) => {
		const { id } = req.params;
	try {
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
		const { id } = req.params;
	try {
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
		return res.send(user);
	} catch (e) {
		return next(e);
	}
});

// UPDATE user teams
router.patch("/:id/team/:teamID", async (req, res, next) => {
	const { id, teamID } = req.params;
	try {
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		await user.dbAddUserTeam(teamID);
		return res.send(user);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
