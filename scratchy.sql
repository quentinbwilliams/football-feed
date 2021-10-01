SELECT * FROM users AS u
JOIN users_leagues AS ul
ON u.id = ul.user_id 
JOIN leagues as l
ON ul.league_id = l.id;

SELECT * FROM users WHERE id = 1
JOIN users_teams AS ut
ON users.id = ut.user_id 
JOIN teams as t
ON ut.team_id = t.id;