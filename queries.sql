-- GET ALL USERS AND THE LEAGUES THEY FOLLOW
SELECT * FROM users AS u
JOIN users_leagues AS ul
ON u.id = ul.user_id 
JOIN leagues as l
ON ul.league_id = l.id;

-- GET TEAMS FOR USER WITH ID
SELECT * FROM users
JOIN users_teams AS ut
ON users.id = ut.user_id 
JOIN teams as t
ON ut.team_id = t.id
WHERE users.id='1';