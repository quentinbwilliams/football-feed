const axios = require("axios").default;

class Team {
  constructor(
    name,
    leagueName,
    apiFootballTeamID,
    apiFootballLeagueID,
    players,
    coach,
    rank,
    points,
    gamesPlayed,
    gamesWon,
    gamesLost,
    homeWins,
    homeDraws,
    homeLosses,
    awayWins,
    awayDraws,
    awayLosses,
    goalsDiff,
    goalsFor,
    goalsAgainst
  ) {
    this.name = name;
    this.leagueName = leagueName;
    this.apiFootballTeamID = apiFootballTeamID;
    this.apiFootballLeagueID = apiFootballLeagueID;
    this.players = players;
    this.coach = coach;
    this.rank = rank;
    this.points = points;
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
    this.gamesLost = gamesLost;
    this.homeWins = homeWins;
    this.homeDraws = homeDraws;
    this.homeLosses = homeLosses;
    this.awayWins = awayWins;
    this.awayDraws = awayDraws;
    this.awayLosses = awayLosses;
    this.goalsDiff = goalsDiff;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
  }

  getTeamInfo(id) {
    // RETURNS OBJECT WITH TEAM OBJECT AND VENUE OBJECT
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams",
      params: {
        id: `${id}`,
      },
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        data = response.data;
        res = data.response;
        team = res[0];
        return team;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAciveSquad() {
    // RETURN ALL CURRENT SQUAD PLAYERS
  }

  getPlayerStats() {
    // RETURN MATCH STATS FOR PLAYERS
  }

  getTeamStats() {
    // RETURN STATS FOR TEAM IN CURRENT LEAGUE AND TEAM
    var options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams/statistics",
      params: {
        league: `${this.leagueID}`,
        season: "2021",
        team: `${this.id}`,
      },
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        data = response.data;
        res = data.response;
        team = res[0];
        return team;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTransfersNews() {
    // RETURN ANY RESULTS FOR TRANSFER NEWS
  }
}

module.exports = Team;
