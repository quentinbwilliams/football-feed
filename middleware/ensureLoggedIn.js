const ExpressError = require("../error")

function ensureLoggedIn(req, res, next) {
	if (!req.user) {
		const e = new ExpressError("Unauthorized", 401);
		return next(e);
	} else {
		return next();
	}
}

module.exports = ensureLoggedIn;