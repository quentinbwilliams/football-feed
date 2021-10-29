const express = require("express");
const app = express();
const ExpressError = require("./error");
const authenticateJWT = require("./middleware/authenticate");
const ensureLoggedIn = require("./middleware/ensureLoggedIn");
const getUserData = require("./middleware/getUserData");
const countryRoutes = require("./routes/country");
const leagueRoutes = require("./routes/league");
const teamRoutes = require("./routes/team");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/countries", countryRoutes);
app.use("/leagues", leagueRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);

app.use(function (req, res, next) {
	const e = new ExpressError("Not found!", 404);
	return next(e);
});

// Listen on port 3000
app.listen(5000, function () {
	console.log("Server started on 5000");
});

module.exports = app;
