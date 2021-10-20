const Country = require("../models/country");
const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();

// GET ALL COUNTRIES
router.get("/", async (req, res, next) => {
	try {
		const countries = await Country.dbGetCountries();
		res.send(countries);
	} catch (e) {
		return next(e);
	}
});

// GET COUNTRY WITH CODE
router.get("/:code", async (req, res, next) => {
	try {
		const { code } = req.params;
		const country = new Country(code)
		country.apiGetCountryData();
		res.send(country);
	} catch (e) {
		next(e)
	}
})

module.exports = router;