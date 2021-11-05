const ExpressError = require("../../error");
const LeagueTeam = require("../../models/league-team");

/*
	This script calls a static method on the LeagueTeam class to create a new materialized view for leagues_teams.
	The method itself utilizes a `SELECT DISTINCT` query on the matches table.
*/

const updateLeaguesTeams = async () => {
	try {
		const deleteLeagueTeamsView = await LeagueTeam.dbDeleteLeaguesTeamsView();
		const createLeaguesTeamsView = await LeagueTeam.dbCreateLeaguesTeamsView();
	} catch (e) {
		return new ExpressError(e);
	}
}

module.exports = updateLeaguesTeams;
