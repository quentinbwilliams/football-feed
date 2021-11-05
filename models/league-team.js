const db = require("../db/db");
const ExpressError = require("../error");

class LeagueTeam {
	/************************************************
	 * STATIC METHODS:
	 * .dbDeleteLeaguesTeamsView()
	 * .dbCreateLeaguesTeamsView()
	 ************************************************/
	constructor(leagueID, teamID) {
		this.leagueID = leagueID;
		this.teamID = teamID;
	}

	static async dbDeleteLeaguesTeamsView() {
		try {
			const deleteView = await db.query(
				`DROP MATERIALIZED VIEW IF EXISTS leagues_teams CASCADE`
			);
			console.log("DROPPING LEAGUES_TEAMS VIEW", deleteView);
		} catch (e) {
			return new ExpressError(e);
		}
	}

	static async dbCreateLeaguesTeamsView() {
		try {
			const createView = await db.query(
				`CREATE MATERIALIZED VIEW leagues_teams AS SELECT DISTINCT league_id, home_id AS team_id FROM matches`
			);
			console.log("CREATING LEAGUES_TEAMS VIEW", createView);
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = LeagueTeam;
