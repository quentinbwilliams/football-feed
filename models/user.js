class User {
  constructor(username, email, password, favoriteLeagues, favoriteTeams) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.favoriteLeagues = favoriteLeagues;
    this.favoriteTeams = favoriteTeams;
  }
  register() {
    // REGISTER USER
  }

  authenticate() {
    // AUTHENTICATE USER
  }
}

module.exports = User;
