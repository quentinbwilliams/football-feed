const cron = require("node-cron");
const updateMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");

/*
	Premier League - 39
	Bundesliga - 78
	La Liga - 140
	Ligue Un - 61
	Serie A - 135

*/

// Update these leagues on the weekend
// “At minute 0 past hour 9, 12, 15, and 17 on Saturday and Sunday.”
const updateLeagues = cron.schedule("0 9,12,15,17 * * 6,0", async () => {
	const leagues = [39, 78, 140, 61, 135];
	const currentDate = new Date().toLocaleString();
	const updates = [];
	try {
		for (let i = 0; i < leagues.length; i++) {
			const leagueID = leagues[i];
			const update = await updateMatches(leagueID);
			updates.push(update);
		}
		return updates;
	} catch (e) {
		return new ExpressError(e);
	}
});

updateLeagues.start();