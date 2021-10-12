const Country = require("../models/country");
const db = require("../db/db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();

router.get("/", async (req, res, next) => {
	const countries = await Country.dbGetCountries();
	const countryObjs = countries.map((country) =>
	  new Country(country.code, country.name, country.flag)
	);
	console.log(countryObjs)
	res.render("country", {
		title: "Countries",
		countries: countryObjs
	});
});

module.exports = router;
