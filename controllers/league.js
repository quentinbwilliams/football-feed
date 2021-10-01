class League {
  constructor(name, country, standings) {
    this.name = name;
    this.country = country;
    this.standings = standings;
  }

  getStandings() {
    //CALL API FOR CURRENT STANDINGS. RESULT FROM API WILL  CONTAIN A LIST OF ALL TEAMS AND THEIR DATA
  }

  getLiveMatches() {
    // RETURN ANY LIVE MATCHES, OTHERWISE RETURN FALSE
  }

  getMatchweek() {
    // RETURN THE MATCH SCHEDULE FOR THE UPCOMING MATCHWEEK
  }

  getScorers() {
    // RETURN THE TOP SCORERS FOR THE LEAGUE
  }

  getCompletedMatches() {
    // RETURN THE MATCHES THAT HAVE BEEN PLAYED SO FAR IN THE SEASON
  }
}

module.exports = League;
