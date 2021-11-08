const db = require("../db/db");
const express = require("express");
const router = express.Router();
const Match = require("../models/match");

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const match = new Match(id);
		await match.init();
		await match.apiGetLineups();
		res.send(match);
	} catch (e) {
		return next(e);
	}
})

module.exports = router;