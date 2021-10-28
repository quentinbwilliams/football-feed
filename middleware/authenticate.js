const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


function authenticateJWT(req, res, next) {
	try {
		const tokenFromBody = req.body._token;
		const payload = jwt.verify(tokenFromBody, SECRET_KEY);
		req.user = payload;
		return next();
	} catch (e) {
		return next();
	}
}
module.exports = { authenticateJWT };