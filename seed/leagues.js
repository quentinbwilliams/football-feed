const axios = require("axios").default;
const db = require("../db");

leagues = [];

function getLeagues() {
	const options = {
		method: "GET",
		url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
		headers: {
			"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
			"x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
		},
	};

	axios
		.request(options)
		.then(function (response) {
			const data = response.data.response;
			console.log(data)
			leagues.push(data);
			return data
		})
		.catch(function (error) {
			console.error(error);
		});
}

function handleLeagues(leagues) {
	// CALL getLeagues() TO PUSH LEAGUES RES TO LEAGUES ARRAY. POP LEAGUES ARRAY TO HANDLE DATA
	l = leagues.pop()
	for (let i = 0; i < l.length; i++) {
		const league = l[i];
		let name = league.league.name;
		let type = league.league.type;
		let logo = league.league.logo;
		let countryName = league.country.name;
		let countryCode = league.country.code || "World";

		console.log(name, type, logo, countryCode, countryName);
	}
}