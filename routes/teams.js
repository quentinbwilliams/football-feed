const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const Team = require("../models/team");
const router = express.Router();

// TEAM ROUTES:
/*
 * GET POSITION FOR TEAM LEAGUES
 * GET ALL MATCHES
 * GET LIVE MATCHES
 * GET UPCOMING MATCHES
 * GET GOALSCORERS
 * GET ASSISTS
 * GET RED CARDS
 * GET YELLOW CARDS
 */

// GET ALL MATCHES FOR CURRENT SEASON
router.get("/:id/matches", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.dbGetAllMatches();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET COMPLETED MATCHES
router.get("/:id/matches/completed", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.dbGetCompletedMatches();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET UPCOMING MATCHES
router.get("/:id/matches/upcoming", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.dbGetUpcomingMatches();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET LIVE MATCHES
router.get("/:id/matches/live", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.apiGetLiveMatches();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET SQUAD STATS
router.get("/:id/squad", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.apiGetSquadStats();
		await team.apiGetTeamCoach();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET COACHES
router.get("/:id/squad/coach", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET INJURY LIST
router.get("/:id/squad/injuries", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.apiGetInjuryList();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

// GET TEAM LEAGUES
router.get("/:id/leagues", async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = new Team(id);
		await team.init();
		await team.dbGetTeamLeagues();
		res.send(team);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
