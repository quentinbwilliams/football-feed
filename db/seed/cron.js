const cron = require("node-cron");
const seedMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");

// UPDATE matches table at 8am, 2pm, 8pm EST
const matches = cron.schedule("* * 8,14,20 * *", async () => {
	try {
		const update = await seedMatches();
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE leagues_teams view at midnight each night
const leaguesTeams = cron.schedule("* * 0 * *", async () => {
	try {
		const update = await updateLeaguesTeams();
	} catch (e) {
		return new ExpressError(e);
	}
});

matches.start();
leaguesTeams.start();
