const express = require("express");
const app = express();
const ExpressError = require("./error");
const authenticateJWT = require("./middleware/authenticate");
const ensureLoggedIn = require("./middleware/ensureLoggedIn");
const getUserData = require("./middleware/getUserData");
const countryRoutes = require("./routes/countries");
const leagueRoutes = require("./routes/leagues");
const teamRoutes = require("./routes/teams");
const userRoutes = require("./routes/user");
const matchRoutes = require("./routes/matches");
const cors = require('cors');
const path = require("path");

app.use(cors());

app.use(express.json());
app.use("/countries", countryRoutes);
app.use("/leagues", leagueRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);
app.use("/matches", matchRoutes);

const root = require("path").join(__dirname, "react-client", "build");
app.use(express.static(root));
app.get("/*", (req, res) => {
	res.sendFile("index.html", { root });
});

app.use(function (req, res, next) {
	const e = new ExpressError("Not found!", 404);
	return next(e);
});

// Listen on port 5000
app.listen(5000, function () {
	console.log("Server started on port 5000");
});

module.exports = app;