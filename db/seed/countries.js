const Country = require("../../models/country");

// REQUESTS API FOR ALL COUNTRIES AND WITH EACH COUNTRY, CREATES A NEW COUNTRY INSTANCE PUSHED TO COUNTRY_OBJS
(async () => {
  const countries = await Country.apiGetAllCountries();
  for (let i = 0; i < countries.length; i++) {
    let country = new Country(
      (code = countries[i].code),
      (name = countries[i].name),
      (flag = countries[i].flag)
    );
    country.dbInsertCountryData();
  }
})();
