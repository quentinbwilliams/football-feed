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

(async () => {
	{
		// FOR EACH LEAGUE ID, CREATE A LEAGUE OBJECT AND GET ALL MATCHES IN THE LEAGUE
		for (let i = 0; i < LEAGUE_IDS.length; i++)
			try {
				const leagueObj = new League(LEAGUE_IDS[i]);
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
					const matchInDB = await Match.dbHasMatch(id);
					if (matchInDB) {
						matchObj.dbUpdateMatchData();
					} else {
						matchObj.dbInsertMatchData();
					}
				}
				return leagueObj;
			} catch (e) {
				return new ExpressError(e);
			}
	}
})();
