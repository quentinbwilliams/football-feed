const Country = require("../../models/country");
const Team = require("../../models/team");
const COUNTRIES = require("../../countries-array");

// ARRAY CONTAINING API IDs FOR LEAGUES IN OUR APP
(async () => {
  // INSERTS TEAMS IN COUNTRIES FOR GIVEN NUMBER OF COUNTRIES (ORDERED BY FIFA WORLD RANK AS OF 10/08/2021).
  for (let i = 0; i < 25; i++) {
    const country = new Country(null, COUNTRIES[i], null);
    const teams = await country.apiGetTeamsInCountry();
    for (let j = 0; j < country.teams.length; j++) {
      // PROPERTIES
      const id = country.teams[j].team.id;
      const name = country.teams[j].team.name;
      const countryName = country.teams[j].team.country;
      const founded = country.teams[j].team.founded;
      const national = country.teams[j].team.national;
      const logo = country.teams[j].team.logo;
      const city = country.teams[j].venue.city;
      // CREATE TEAM INSTANCE
      const team = new Team(
        id,
        name,
        countryName,
        founded,
        national,
        logo,
        city
      );
      // INSERT TEAM INTO DATABASE
      const insert = await team.dbInsertTeam();
    }
  }
})();