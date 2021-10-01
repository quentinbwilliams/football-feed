const db = require("../db");
const express = require("express");
const ExpressError = require("../error");
const router = express.Router();

function getUser(id) {
  const userRes = await db.query(`SELECT name, type FROM users WHERE id = $1`, [
    id,
  ]);
  // check if user exists
  if (userRes.rows.length === 0) {
    throw new ExpressError("User not found", 404);
  }
  const user = userRes.rows[0];
  return user;
}

// GET user by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    user = getUser(id);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});

// GET user leagues
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const usersLeagues = await db.query(
      `SELECT * FROM users 
			JOIN users_leagues AS ul
			ON users.id = ul.user_id 
			JOIN leagues as l
			ON ul.league_id = l.id
   WHERE users.id = $1`,
      [id]
    );
    const leagues = usersLeagues.rows;
    return leagues;
  } catch (e) {
    return next(e);
  }
});

// GET user teams
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const usersTeams = await db.query(
      `SELECT * FROM users
      JOIN users_teams AS ut
      ON users.id = ut.user_id 
      JOIN teams as t
      ON ut.team_id = t.id
      WHERE users.id=$1`,
      [id]
    );
    const teams = usersTeams.rows;
    return teams;
  } catch (e) {
    return next(e);
  }
});

// UPDATE user leagues
router.patch("/:id/league/:league_id", async (req, res, next) => {
  const { id, league_id } = req.params;
  try {
    const updateUserLeague = await db.query(
      `INSERT INTO users_leagues(user_id, league_id)
			VALUES ($1,$2) RETURNING user_id, league_id`,
      [id, league_id]
    );
  } catch (e) {
    return next(e);
  }
});

// UPDATE user teams
router.patch("/:id/team/:team_id", async (req, res, next) => {
  const { id, team_id } = req.params;
  try {
    const updateUserLeague = await db.query(
      `INSERT INTO users_teams(user_id, team_id)
			VALUES ($1,$2) RETURNING user_id, league_id`,
      [id, team_id]
    );
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
