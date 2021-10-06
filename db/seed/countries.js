const axios = require("axios").default;
const db = require("../db");

function getCountries() {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/countries",
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
    },
  };
  //! REFACTOR
  axios
    .request(options)
    .then(function (res) {
      let data = res.data;
      let countries = data.response;
      console.log(countries);
      for (let i = 0; i < countries.length; i++) {
        const name = countries[i].name;
        const code = countries[i].code || "N/A";
        const flag = countries[i].flag;
        const insertRow = db.query(
          `INSERT INTO countries (name, code, flag) VALUES ($1,$2,$3)`,
          [name, code, flag]
        );
        console.log(`successfully inserted ${name}, ${code}`);
      }
      return countries;
    })
    .catch(function (error) {
      console.log(error);
    });
}
