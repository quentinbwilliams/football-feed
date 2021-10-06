const db = require("../db/db");
const axios = require("axios").default;
const headers = require("../headers/api-football");
const season = require("../season/season");
const league = require("./league");

class Team {
  constructor(apiFootballTeamID) {
    this.apiFootballTeamID = apiFootballTeamID;
  }

  getTeamInfo() {
    // RETURNS OBJECT WITH TEAM OBJECT AND VENUE OBJECT
  }
  getAciveSquad() {
    // RETURN ALL CURRENT SQUAD PLAYERS
  }

  getPlayerStats() {
    // RETURN MATCH STATS FOR PLAYERS
  }

  getTeamStats() {
    // RETURN STATS FOR TEAM IN CURRENT LEAGUE AND TEAM
  }

  getTransfersNews() {
    // RETURN ANY RESULTS FOR TRANSFER NEWS
  }
}

module.exports = Team;
