const cron = require("node-cron");
const updateMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");
const LEAGUE_IDS = require("../../leagues-array");
const currentDate = new Date().toLocaleString();

// UPDATE matches table at 8am, 2pm, 8pm EST
const matches = cron.schedule("* * 8,14,20 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(LEAGUE_IDS);
		console.log(`CRON UPDATED MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE leagues_teams 10 minutes after updating matches
const leaguesTeams = cron.schedule("* 10 8,14,20 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateLeaguesTeams();
		console.log(`CRON UPDATED LEAGUES TEAMS VIEW AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

matches.start();
leaguesTeams.start();