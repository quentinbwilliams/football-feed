const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();
const League = require("../models/league");

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

// GET UPCOMING MATCHES
router.get("/:id/matches/current", async (req, res, next) => {
	try {
		const { id } = req.params;
		const league = new League(id);
		await league.init();
		await league.apiGetCurrentRound();
		await league.dbGetAllMatches();
		const currentMatches = league.allMatches.map((match) => {});
		res.send(league);
	} catch (e) {
		console.log(e);
	}
});

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

module.exports = router;
