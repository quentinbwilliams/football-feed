const Country = require("../../models/country");

const COUNTRIES = [];
const COUNTRY_OBJS = [];

// REQUESTS API FOR ALL COUNTRIES AND WITH EACH COUNTRY, CREATES A NEW COUNTRY INSTANCE PUSHED TO COUNTRY_OBJS
(async () => {
  const data = await Country.apiGetAllCountries();
  COUNTRIES.push(data);
  const countries = COUNTRIES[0];
  for (let i = 0; i < countries.length; i++) {
    let country = new Country(
      (code = countries[i].code),
      (name = countries[i].name),
      (flag = countries[i].flag)
    );
    country.dbInsertCountryData();
    COUNTRY_OBJS.push(country);
  }
})();
