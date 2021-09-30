const axios = require("axios").default;

const Request = async (endpoint, ) => {
	try {
		const data = await axios.get(endpoint);
		return data;
	} catch (e) {
		console.log(e);
		return next(e)
	}
}
