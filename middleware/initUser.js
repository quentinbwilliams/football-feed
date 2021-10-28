const User = require("../models/user");

const initUser = async (req, res, next) => {
	try {
		return next();
	} catch (e) {
		return next(e);
	}
};
