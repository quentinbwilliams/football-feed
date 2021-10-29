const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();
const League = require("../models/league");

// LEAGUE ROUTES:
/*
 * GET ALL LEAGUES
 * GET ONE LEAGUE WITH ID
 * GET LEAGUE STANDINGS
 * GET ALL MATCHES
 * GET LIVE MATCHES
 * GET CURRENT ROUND OF MATCHES
 * GET TOP GOALSCORERS
 * GET TOP ASSISTS
 * GET TOP RED CARDS
 * GET TOP YELLOW CARDS
 */

// GET ALL LEAGUES
router.get("/", async (req, res, next) => {
	try {
		const leagues = await League.dbGetAllLeagues();
		res.send(leagues);
	} catch (e) {
		console.log(e);
	}
});

// GET LEAGUE
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		const initLeague = await league.init();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET LEAGUE STANDINGS
router.get("/:id/standings", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetStandings();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET ALL MATCHES
router.get("/:id/matches", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.dbGetAllMatches();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET LIVE MATCHES
router.get("/:id/matches/live", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetLiveMatches();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET CURRENT ROUND OF MATCHES
router.get("/:id/matches/current", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.dbGetCurrentRoundMatches();
		res.send(league);
	} catch (e) {
		console.log(e);
	}
});

// GET TOP GOALSCORERS
router.get("/:id/goals", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetGoals();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET TOP ASSITS
router.get("/:id/assists", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetAssists();
		res.send(league)
	} catch (e) {
		return new ExpressError(e);
	}
});

// GET TOP RED CARDS
router.get("/:id/redcards", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetRedCards();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});
// GET TOP YELLOW CARDS
router.get("/:id/yellowcards", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetYellowCards();
		res.send(league);
	} catch (e) {
		return new ExpressError(e);
	}
});

module.exports = router;
