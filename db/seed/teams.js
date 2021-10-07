const League = require("../../models/league");
const db = require("../db");

/*
TO SEED TEAMS:
Ensure db is populated with leagues
Query db for leagues
Loop through db rows to create League instances with API ID
Call apiGetLeagueData() to give league instances data
Loop through data.standings
Create new Team instance with each API ID.
Call apiGetTeamData for each team
Call dbInsertTeamData after getting
*/

// ARRAY CONTAINING API IDs FOR LEAGUES IN OUR APP
const LEAGUES = [];

(async () => {
  const league = new League((apiFootballID = 40));
  league.apiGetLeagueData();
  LEAGUES.push(league);
})();
