const cron = require("node-cron");
const updateMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");
const LEAGUE_IDS = require("../../leagues-array");

// UPDATE matches table at 8am, 2pm, 8pm EST
const matches = cron.schedule("* * 8,14,20 * *", async () => {
	try {
		const update = await updateMatches(LEAGUE_IDS);
		console.log(`CRON UPDATED MATCHES AT ${new Date().toLocaleString()}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE leagues_teams view at midnight each night
const leaguesTeams = cron.schedule("* * 0 * *", async () => {
	try {
		const update = await updateLeaguesTeams();
		console.log(
			`CRON UPDATED LEAGUES TEAMS VIEW AT ${new Date().toLocaleString()}`
		);
	} catch (e) {
		return new ExpressError(e);
	}
});

matches.start();
leaguesTeams.start();
