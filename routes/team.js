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
		return new ExpressError(e);
	}
});

module.exports = router;
