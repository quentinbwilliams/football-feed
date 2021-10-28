const User = require("../models/user");

const getUserData = async (req, res, next) => {
	const user = req.user;
	const id = user.id;
	try {
		const getUser = await User.getUserByID(id);
		const user = new User(getUser.username, getUser.email, getUser.id);
		const leagues = await user.dbGetUserLeagues();
		const teams = await user.dbGetUserTeams();
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = getUserData;