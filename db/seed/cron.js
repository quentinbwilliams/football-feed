const cron = require("node-cron");
const seedMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");

// UPDATE matches table at 8am, 2pm, 8pm EST
const matches = cron.schedule("* * 8,14,20 * *", async () => {
	const update = await seedMatches();
});

// UPDATE leagues_teams view at midnight each night
const leaguesTeams = cron.schedule("* * 0 * *", async () => {
	const update = await updateLeaguesTeams();
})

matches.start();
leaguesTeams.start();