// SEED TEAMS DB
// OUR DB DOESN'T NEED ALL THE TEAMS FROM ALL THE LEAGUES
const axios = require("axios").default;
const db = require("../db");
const SEASON = require("../season/season");

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
				season: `${SEASON}`,
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
