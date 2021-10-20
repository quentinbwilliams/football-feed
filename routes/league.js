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
		next(e);
	}
});

// 

// GET LEAGUES BY COUNTRY CODE
// router.get("/:id", async (req, res, next) => {
// 	try {
// 		const league = new League(id);
// 	} catch (e) {
// 		next(e)
// 	}
// })

module.exports = router;
