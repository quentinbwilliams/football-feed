const cron = require("node-cron");
const updateMatches = require("./matches");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");
const LEAGUE_IDS = require("../../leagues-array");
const currentDate = new Date().toLocaleString();

// UPDATE PREMIER LEAGUE SATURDAY AND SUNDAY AT 6AM, 12PM, 4PM
const premierLeague = cron.schedule("*	6,12,16	*	*	0,6	", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(39);
		console.log(`CRON UPDATED PREMIER LEAGUE MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE CHAMPIONS LEAGUE NOVEMBER 23,24 AT 12PM, 3PM, 6PM
const championsLeague = cron.schedule("*	12,15,18	23,24	11	*", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(2);
		console.log(`CRON UPDATED CHAMPIONS LEAGUE MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE EUROPA LEAGUE NOVEMBER 24,25 AT 12PM,3PM,6PM
const europaLeague = cron.schedule("*	12,15,18	24,25	11	*", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(3);
		console.log(`CRON UPDATED BUNDESLIGA MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

const leagueCup = cron.schedule("* * 8 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(2);
		console.log(`CRON UPDATED ENGLISH LEAGUE CUP MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

const bundesliga = cron.schedule("* * 8 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(78);
		console.log(`CRON UPDATED BUNDESLIGA MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

const laLiga = cron.schedule("* * 8 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(140);
		console.log(`CRON UPDATED LA LIGA MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

const MLS = cron.schedule("* * 8 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(253);
		console.log(`CRON UPDATED MLS MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});


const ligueUn = cron.schedule("* * 8 * * *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(61);
		console.log(`CRON UPDATED LIGUE UN MATCHES AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

//! ADD INTERNATIONAL COMPS

// UPDATE LEAGUES TEAMS VIEW AT MIDNIGHT EVERY NIGHT
const leaguesTeams = cron.schedule("*	0	*	*	*	", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateLeaguesTeams();
		console.log(`CRON UPDATED LEAGUES TEAMS VIEW AT ${currentDate}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

premierLeague.start();
championsLeague.start();
europaLeague.start();
leaguesTeams.stop();