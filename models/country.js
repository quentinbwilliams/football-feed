class Country {
  constructor(name, code, leagues) {
    this.name = name;
    this.code = code;
    this.leagues = leagues;
  }
  getLeagues() {
    // CALL API TO OBTAIN LEAGUES & UPDATE VALUE OF LEAGUES ON COUNTRY INSTANCE
  }

  getNationalTeam() {
    // CALL API FOR INFO ON COUNTRIES NATIONAL TEAMS
  }
}

module.exports = Country;
