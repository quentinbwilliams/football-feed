const axios = require("axios");
const ExpressError = require("./error");

async function getLeague(id) {
	try {
		const request = await axios.get(`/leagues/${id}`);
		return request.data;
	} catch (e) {
		return new ExpressError(e);
	}
}

module.exports = getLeague;
