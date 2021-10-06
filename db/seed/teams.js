const axios = require("axios").default;
const db = require("../db/db");
const season = require("../season/season");
const headers = require("../../headers/api-football");

const TEAMS = [];

const getTeamsInLeague = async (leagueID) => {
  // MAKE REQUEST TO API FOOTBALL FOR TEAMS IN A GIVEN LEAGUE
  // THE REQUEST RETURNS ALL TEAMS IN LEAGUE IN ORDER OF CURRENT STANDINGS
  try {
    const options = {
      method: "GET",
      params: {
        season: `${season}`,
        league: `${leagueID}`,
      },
      headers: headers,
    };
    const request = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/standings",
      options
    );
    TEAMS.push(request.data);
    const res = request.data;
    return res;
  } catch (e) {
    console.log("error", e);
  }
};
