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
      `SELECT * FROM users WHERE id = $1
			JOIN users_leagues AS ul
			ON users.id = ul.user_id 
			JOIN leagues as l
			ON ul.league_id = l.id`,
      [id]
    );
    return usersLeagues;
  } catch (e) {
    return next(e);
  }
});

// GET user teams
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const usersTeams = await db.query(
      `SELECT * FROM users WHERE id = $1
			JOIN users_teams AS ut
			ON users.id = ut.user_id 
			JOIN teams as t
			ON ut.team_id = t.id`,
      [id]
    );
    return usersTeams;
  } catch (e) {
    return next(e);
  }
});

// GET user favorite teams
// router.get("/:id", async (req, res, next) => {
// 	const {id}
// })

module.exports = router;
