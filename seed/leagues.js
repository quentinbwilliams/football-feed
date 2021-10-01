const axios = require("axios").default;
const db = require("../db");

const LEAGUES = [];

function getLeagues() {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      const data = response.data.response;
      LEAGUES.push(data);
      return data;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function makeLeagueObjs(LEAGUES) {
  // CALL getLeagues() TO PUSH LEAGUES RES TO LEAGUES ARRAY. POP LEAGUES ARRAY TO HANDLE DATA
  let l = LEAGUES.pop();
  let array = [];
  for (let i = 0; i < l.length; i++) {
    const league = l[i];
    let name = league.league.name;
    let type = league.league.type;
    let logo = league.league.logo;
    let countryName = league.country.name;
    let countryCode = league.country.code || "World";
    let apiFootballID = league.league.id;
    let leagueObj = {
      name: name,
      type: type,
      logo: logo,
      countryName: countryName,
      countryCode: countryCode,
      apiFootballID: apiFootballID,
    };
    array.push(leagueObj);
    LEAGUES.push(leagueObj);
  }
  return array;
}

async function seedLeagues(LEAGUES) {
  // PASS GLOBAL LEAGUES ARRAY WITH OBJECTS EACH CONTAINING A LEAGUE
  try {
    for (let i = 0; i < LEAGUES.length; i++) {
      const league = LEAGUES[i];
      console.log(league);
      const insertRow = await db.query(
        `INSERT INTO leagues(name, type, logo, country_name, country_code, api_football_id) VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          league.name,
          league.type,
          league.logo,
          league.countryName,
          league.countryCode,
          league.apiFootballID,
        ]
      );
    }
  } catch (e) {
    console.log(e);
  }
}
