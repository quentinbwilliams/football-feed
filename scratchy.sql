SELECT * FROM users AS u
JOIN users_leagues AS ul
ON u.id = ul.user_id 
JOIN leagues as l
ON ul.league_id = l.id;