const axios = require("axios");

export async function getLeague() {
	const request = await axios.get(`/leagues`);
	return request.data;
}