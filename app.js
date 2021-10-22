const express = require("express");
const app = express();
const ExpressError = require("./error");
const { authenticateJWT } = require("./middleware/auth");
const countryRoutes = require("./routes/country");
const leagueRoutes = require("./routes/league");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/countries", countryRoutes);
app.use("/leagues", leagueRoutes);
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
