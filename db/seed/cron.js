const cron = require("node-cron");
const updateMatches = require("./matches");
const updateMatches2022Season = require("./matches-2022");
const updateMatches2020Season = require("./matches-2020");
const updateLeaguesTeams = require("./leagues-teams");
const ExpressError = require("../../error");

// UPDATE PREMIER LEAGUE SATURDAY AND SUNDAY AT 6AM, 12PM, 4PM
const premierLeague = cron.schedule("0 12,4 * * 6,0", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(39);
		console.log(`CRON UPDATED PREMIER LEAGUE MATCHES AT ${currentDate}`);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});



// UPDATE CHAMPIONS LEAGUE NOVEMBER 23,24 AT 12PM, 3PM, 6PM
const championsLeague = cron.schedule("0 12,15,18 23,24 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(2);
		console.log(`CRON UPDATED CHAMPIONS LEAGUE MATCHES AT ${currentDate}`);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE EUROPA LEAGUE NOVEMBER 24,25 AT 12PM,3PM,6PM
const europaLeague = cron.schedule("0 12,15,18 23,24 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches(3);
		console.log(`CRON UPDATED EUROPA LEAGUE MATCHES AT ${currentDate}`);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE AT 6PM NOVEMBER 16
const wcQualAfrica = cron.schedule("0 18 16 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches2022Season(29);
		console.log(
			`CRON UPDATED AFRICAN WORLD CUP QUALIFICATION MATCHES AT ${currentDate}`
		);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE AT 3PM NOVEMBER 16
const wcQualAsia = cron.schedule("0 15 16 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches2022Season(30);
		console.log(
			`CRON UPDATED ASIAN WORLD CUP QUALIFICATION MATCHES AT ${currentDate}`
		);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE AT 10PM NOVEMBER 12
// NEXT UPDATE SHOULD BE NOVEMBER 16 AT 11PM
const wcQualCONCACAF = cron.schedule("0 22 12 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches2022Season(31);
		console.log(
			`CRON UPDATED CONCACAF WORLD CUP QUALIFICATION MATCHES AT ${currentDate}`
		);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE AT 6PM NOVEMBER 12
const wcQualEurope = cron.schedule("0 14 12 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches2020Season(32);
		console.log(
			`CRON UPDATED EUROPEAN WORLD CUP QUALIFICATION MATCHES AT ${currentDate}`
		);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

// UPDATE AT 9PM NOVEMBER 12
const wcQualSouthAmerica = cron.schedule("0 21 12 11 *", async () => {
	try {
		const currentDate = new Date().toLocaleString();
		const update = await updateMatches2022Season(34);
		console.log(
			`CRON UPDATED SOUTH AMERICAN WORLD CUP QUALIFICATION MATCHES AT ${currentDate}`
		);
		console.log(`UPDATE OBJECT: ${update}`);
	} catch (e) {
		return new ExpressError(e);
	}
});

/*

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

*/

// UPDATE LEAGUES TEAMS VIEW AT MIDNIGHT EVERY NIGHT
const leaguesTeams = cron.schedule("0 0 * * *", async () => {
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
wcQualAfrica.start();
wcQualAsia.start();
wcQualCONCACAF.start();
wcQualEurope.start();
wcQualSouthAmerica.start();
// leagueCup.stop();
// bundesliga.stop();
// laLiga.stop();
// MLS.stop();
// ligueUn.stop();
leaguesTeams.start();