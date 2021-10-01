const axios = require("axios").default;

FootballAPIHeaders = {
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	'x-rapidapi-key': '0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0'
}




const API_Football = axios.create({
	baseURL = "https://api-football-v1.p.rapidapi.com/v3/",
	
})



const GetRequest = async (url, endpoint, headers, params) => {
	try {
		const res = await axios.get(`${url}/${endpoint}`);
		return res;
	} catch (e) {
		console.log(e);
		return next(e)
	}
}