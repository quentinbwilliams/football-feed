const axios = require("axios").default;
const db = require("../db");

function getLeagues() {
	const options = {
		method: 'GET',
		url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
		headers: {
			'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
			'x-rapidapi-key': '0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0'
		}
	};
	axios
		.request(options)
		.then(function (res) {
			let data = res.data;
			let leagues = data.response;
			return leagues
		})
		.catch(function (error) {
			console.log(error);
		});
}