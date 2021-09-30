const axios = require("axios").default;

apiFootballHeaders = {
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	'x-rapidapi-key': '0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0'
}

const apiFootball = axios.create({
	baseURL : "https://api-football-v1.p.rapidapi.com/v3/",
	timeout: 1000,
	headers: {
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	'x-rapidapi-key': '0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0'
	}
})

apiFootball.get({ url: `/teams`, params: { id: "39" } });