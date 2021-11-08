const db = require("../db");
const League = require("../../models/league");
const Match = require("../../models/match");
const LEAGUE_IDS = require("../../leagues-array");
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

module.exports = updateMatches;
