// SEED TEAMS DB
// OUR DB DOESN'T NEED ALL THE TEAMS FROM ALL THE LEAGUES
const axios = require("axios").default;
const db = require("../db");

async function getLeaguesFromCountry(countryCode) {
	// Pass countryCode arg to SQL query
	const result = await db.query(
		`SELECT * FROM countries
		WHERE code = $1`,
		[countryCode]
	);
	const leagues = result.rows;
	return leagues;
}

const countryLeagues = [];

async function getLeaguesFromCountry(countryCode) {
	// Pass leagueID arg to SQL query
	try {
		const result = await db.query(
			`SELECT name, api_football_id, type, country_code
		FROM leagues
		WHERE country_code=$1`,
			[countryCode]
		);
		countryLeagues.push(result, result.rows);
		const teams = result.rows;
		return teams;
	} catch (e) {
		console.log(e);
	}
}

const teams = [];

const getTeamsFromLeague = async (leagueID) => {
	const res = [];
	try {
		const options = {
			method: "GET",
			params: {
				season: "2021",
				league: `${leagueID}`
			},
			headers: {
				"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
				"x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
			},
		};
		const request = await axios.get(
			"https://api-football-v1.p.rapidapi.com/v3/standings",
			options
		);
		res.push(request);
		return res;
	} catch (e) {
		console.log("error", e);
	}
};

const sayHi = () => {
	const hi = "HI!"
	return hi
}

const slowHi = () => {
	const hi = setTimeout(sayHi(), 50000);
	return hi;
}

const myAsync = async () => {
	try {
		const hi = await sayHi();
	} catch (e) {
		console.log("err", e);
	}
}