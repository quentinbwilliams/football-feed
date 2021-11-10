const db = require("../db");
const League = require("../../models/league");
const Match = require("../../models/match");
const ExpressError = require("../../error");

const updateMatches = async (leagueIDs) => {
	try {
		for (let i = 0; i < leagueIDs.length; i++) {
			const leagueObj = new League(leagueIDs[i]);
			await leagueObj.init();
			await leagueObj.apiGetAllMatches();
			const matches = leagueObj.allMatches;
			for (let j = 0; j < matches.length; j++) {
				const match = matches[j];
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
		}
	} catch (e) {
		return new ExpressError(e);
	}
};

const insertMatches = async (leagueIDs) => {
	try {
		for (let i = 0; i < 1; i++) {
			const leagueObj = new League(leagueIDs[i]);
			await leagueObj.init();
			await leagueObj.apiGetAllMatches();
			const matches = leagueObj.allMatches;
			// FOR EACH MATCH, GET THE DATA, CREATE A NEW MATCH OBJECT, CHECK IF MATCH DATA EXISTS:
			// IF MATCH DATA EXISTS: UPDATE; ELSE: INSERT
			for (let j = 0; j < matches.length; j++) {
				const id = matches[j].fixture.id;
				const league = matches[j].league.name;
				const leagueID = matches[j].league.id;
				const season = matches[j].league.season;
				const round = matches[j].league.round;
				const date = matches[j].fixture.date;
				const referee = matches[j].fixture.referee;
				const home = matches[j].teams.home.name;
				const homeID = matches[j].teams.home.id;
				const away = matches[j].teams.away.name;
				const awayID = matches[j].teams.away.id;
				const htHome = matches[j].score.halftime.home;
				const htAway = matches[j].score.halftime.away;
				const ftHome = matches[j].score.fulltime.home;
				const ftAway = matches[j].score.fulltime.away;
				const etHome = matches[j].score.extratime.away;
				const etAway = matches[j].score.extratime.away;
				const penHome = matches[j].score.penalty.home;
				const penAway = matches[j].score.penalty.away;
				const homeWin = matches[j].teams.home.winner;
				const awayWin = matches[j].teams.away.winner;
				const insert = await Match.dbInsertMatchData(
					id,
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
		}
	} catch (e) {
		return new ExpressError(e);
	}
};

module.exports = { insertMatches, updateMatches };
