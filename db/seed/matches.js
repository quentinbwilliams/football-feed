const db = require("../db");
const League = require("../../models/league");
const Match = require("../../models/match");
const LEAGUE_IDS = require("../../leagues-array");
const ExpressError = require("../../error");

// LEAGUES
// US NWSL
// UEFA Women's Champion's League
// Mexican Liga BBVA MX
//* Premier League (GB) - 39 *
//* Championship (GB) - 40 *
//* FA Cup (GB) - 45	*
// EFL Trophy (GB) - 46 *
// FA Trophy (GB) - 47 *
// League Cup (GB) - 48 *
//* La Liga (ES) - 140 *
//* Copa del Rey (ES) - 143 *
//* Bundesliga 1 (DE) - 78 *
// Bundesliga 2 (DE) - 79 *
// German Super Cup (DE) - 529 *
//* DFB Pokal (DE) - 81 *
//* Serie A (IT) - 135 *
// Serie B (IT) - 136 *
// Coppa Italia (IT) - 137 *
// Super Cup (IT) - 547
//* Ligue 1 (FR) - 61 *
// Ligue 2 (FR) - 62 *
// National (FR) - 63 *
// Primeira Liga (PT) - 94 *
// Liga de Honra (PT) - 95 *
// Super Cup (PT) - 550 *
//* Eredivisie (NL) - 88 *
// Eerste Divisie (NL) - 89 *
// KNVB Beker (NL) - 90 *
// Brasilian Serie A (BR) - 71 *
//* MLS (US) - 253 *
//* USL Championship (US) - 255 *
// Liga MX (MX) - 262
// UEFA Champions League (WF) - 2 *
//* UEFA Europa League (WF) - 3 *
// UEFA Super Cup (WF) - 531 *
// UEFA Champions League Women (WF) - 525
//? UEFA Europa Conference League (WF) - 848

const seedMatches = async () => {
	try {
		const leagueObj = new League(2);
		await leagueObj.init();
		await leagueObj.apiGetAllMatches();
		const matches = leagueObj.allMatches;
		console.log(matches.length);
		for (let j = 0; j < matches.length; j++) {
			const match = matches[j];
			const id = match.fixture.id;
			const league = match.league.name;
			const leagueID = match.league.id;
			const season = match.league.season;
			const round = match.league.round;
			const date = match.fixture.date;
			const referee = match.fixture.referee;
			const home = match.teams.home.name;
			const away = match.teams.away.name;
			const homeID = match.teams.home.id;
			const awayID = match.teams.away.id;
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
			const matchObj = new Match(
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
			await matchObj.dbUpdateMatchData()
		}
	} catch (e) {
		return new ExpressError(e);
	}
};

seedMatches();

module.exports = seedMatches;
