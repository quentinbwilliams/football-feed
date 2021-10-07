const { dbGetCountries } = require("../../models/country");
const Country = require("../../models/country");
const League = require("../../models/league");

const COUNTRIES = [];
const LEAGUES = [];

// QUERY DB FOR ALL COUNTRIES,
(async () => {
  const countriesRows = await Country.dbGetCountries();
  COUNTRIES.push(countriesRows);
  const countries = COUNTRIES[0];
  for (let i = 0; i < countries.length; i++) {
    let country = new Country(
      (code = countries[i].code),
      (name = countries[i].name),
      (flag = countries[i].flag)
    );
    let leagues = await country.dbGetLeaguesInCountry();
    LEAGUES.push(leagues);
  }
})();
