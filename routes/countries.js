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
		const codeUpperCased = code.toUpperCase();
		const countryData = await Country.dbGetCountryByCode(codeUpperCased);
		const country = new Country(
			countryData.code,
			countryData.name,
			countryData.flag
		);
		res.send(country);
	} catch (e) {
		return next(e);
	}
});

// GET LEAGUES IN COUNTRY
router.get("/:code/leagues", async (req, res, next) => {
	try {
		const { code } = req.params;
		const codeUpperCased = code.toUpperCase();
		const countryData = await Country.dbGetCountryByCode(codeUpperCased);
		const country = new Country(
			countryData.code,
			countryData.name,
			countryData.flag
		);
		const getLeagues = await country.dbGetAllLeagues();
		return res.send(country);
	} catch (e) {
		return next(e);
	}
});

// GET TEAMS IN COUNTRY
router.get("/:code/teams", async (req, res, next) => {
	try {
		const { code } = req.params;
		const codeUpperCased = code.toUpperCase();
		const countryData = await Country.dbGetCountryByCode(codeUpperCased);
		const country = new Country(
			countryData.code,
			countryData.name,
			countryData.flag
		);
		const getTeams = await country.dbGetAllTeams();
		return res.send(country);
	} catch (e) {
		return next(e);
	}
});

router.get("/:code/national", async (req, res, next) => {
	try {
		const { code } = req.params;
		const codeUpperCased = code.toUpperCase();
		const countryData = await Country.dbGetCountryByCode(codeUpperCased);
		const country = new Country(
			countryData.code,
			countryData.name,
			countryData.flag
		);
		const getTeams = await country.dbGetAllNationalTeams();
		return res.send(country);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
