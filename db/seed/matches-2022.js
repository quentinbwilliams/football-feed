const db = require("../db");
const League = require("../../models/league-2022");
const Match = require("../../models/match");
const ExpressError = require("../../error");

const updateMatches = async (leagueID) => {
	try {
		const leagueObj = new League(leagueID);
		await leagueObj.init();
		await leagueObj.apiGetAllMatches();
		const matches = leagueObj.allMatches;
		for (let i = 0; i < matches.length; i++) {
			const match = matches[i];
			const id = match.fixture.id;
			const date = match.fixture.date;
			const referee = match.fixture.referee;
			const htHome = match.score.halftime.home;
			const htAway = match.score.halftime.away;
			const ftHome = match.score.fulltime.home;
			const ftAway = match.score.fulltime.away;
			const etHome = match.score.extratime.home;
			const etAway = match.score.extratime.away;
			const penHome = match.score.penalty.home;
			const penAway = match.score.penalty.away;
			const homeWin = match.teams.home.winner;
			const awayWin = match.teams.away.winner;
			const update = await Match.dbUpdateMatchData(
				date,
				referee,
				htHome,
				htAway,
				ftHome,
				ftAway,
				etHome,
				etAway,
				penHome,
				penAway,
				homeWin,
				awayWin,
				id
			);
			console.log(`MATCH ID ${id} UPDATED`);
		}
	} catch (e) {
		return new ExpressError(e);
	}
};

const insertMatches = async (leagueID) => {
	try {
		const leagueObj = new League(leagueID);
		await leagueObj.init();
		console.log(`LEAGUE OBJ AFTER INIT: ${leagueObj}`);
		await leagueObj.apiGetAllMatches();
		console.log(`LEAGUE OBJ AFTER GET ALL MATCHES: ${leagueObj}`);
		const matches = leagueObj.allMatches;
		console.log("LEAGUE OBJ MATCHES:", matches);
		// FOR EACH MATCH, GET THE DATA, CREATE A NEW MATCH OBJECT, CHECK IF MATCH DATA EXISTS:
		// IF MATCH DATA EXISTS: UPDATE; ELSE: INSERT
		for (let i = 0; i < matches.length; i++) {
			const match = matches[i];
			const apiFootballID = match.fixture.id;
			const league = match.league.name;
			const leagueID = match.league.id;
			const season = match.league.season;
			const round = match.league.round;
			const date = match.fixture.date;
			const referee = match.fixture.referee;
			const home = match.teams.home.name;
			const homeID = match.teams.home.id;
			const away = match.teams.away.name;
			const awayID = match.teams.away.id;
			const htHome = match.score.halftime.home;
			const htAway = match.score.halftime.away;
			const ftHome = match.score.fulltime.home;
			const ftAway = match.score.fulltime.away;
			const etHome = match.score.extratime.away;
			const etAway = match.score.extratime.away;
			const penHome = match.score.penalty.home;
			const penAway = match.score.penalty.away;
			const homeWin = match.teams.home.winner;
			const awayWin = match.teams.away.winner;
			const insert = await Match.dbInsertMatchData(
				apiFootballID,
				league,
				leagueID,
				season,
				round,
				date,
				referee,
				home,
				homeID,
				away,
				awayID,
				htHome,
				htAway,
				ftHome,
				ftAway,
				etHome,
				etAway,
				penHome,
				penAway,
				homeWin,
				awayWin
			);
			console.log(`INSERTING ${insert}`);
		}
		return leagueObj;
	} catch (e) {
		return new ExpressError(e);
	}
};

module.exports = { insertMatches, updateMatches };
