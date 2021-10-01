class Team {
  constructor(
    name,
    leagueName,
    leagueID,
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
    this.leagueID = leagueID;
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
