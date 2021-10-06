const db = require("../db/db");

class Player {
  constructor(apiFootballID) {
    this.apiFootballID = apiFootballID;
  }
}

module.exports = Player;
