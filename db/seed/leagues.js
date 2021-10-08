const db = require("../db")
const Country = require("../../models/country");
const League = require("../../models/league");

/*
- CALL API FOR ALL LEAGUES
- CREATE A LEAGUE INSTANCE WITH EACH LEAGUE FROM API CALL
- CREATE A ROW IN DB WITH LEAGUE DATA
*/

(async () => {
  // static method gets all countries from api
  const leagues = await League.apiGetAllLeagues();
  for (let i = 0; i < leagues.length; i++) {
    let league = new League(
      leagues[i].league.id,
      leagues[i].league.name,
      leagues[i].country.name,
      leagues[i].league.type,
      leagues[i].league.logo,
      leagues[i].country.code
		);
		const insert = await league.dbInsertLeagueData()
  }
})();
