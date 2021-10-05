const db = require("../db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();

// GET LEAGUES BY COUNTRY CODE
router.get("/:code", async (req, res, next) => {
	const code = req.params.code;
	const query = await db.query(
		`SELECT name, api_football_id, type, country_code
		FROM leagues
		WHERE country_code=$1`, [code]
	);
	return query.rows;
})

module.exports = router;