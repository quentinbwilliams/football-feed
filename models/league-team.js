const db = require("../db/db");
const season = require("../season");
const headers = require("../headers/api-football");
const axios = require("axios").default;
const ExpressError = require("../error");

class LeagueTeam {
	constructor(leagueID, teamID) {
		this.leagueID = leagueID;
		this.teamID = teamID;
	}

	static async dbCreateLeaguesTeamsView() {
		try {
			const create = await db.query(
				`CREATE MATERIALIZED VIEW leagues_teams AS SELECT DISTINCT league_id, home_id FROM matches;`
			);
			return create.rows;
		} catch (e) {
			return new ExpressError(e);
		}
	}
}

module.exports = LeagueTeam;