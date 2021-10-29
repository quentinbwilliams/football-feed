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

-- GET LEAGUES
SELECT name, api_football_id, type, country_code
FROM leagues;

-- SELECT LEAGUE BY COUNTRY CODE
SELECT name, api_football_id, type, country_code
FROM leagues
WHERE country_code='World'



-- SELECT CURRENT ROUND OF MATCHES FOR A PARTICULAR LEAGUE
SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
FROM matches
WHERE league_id = $1
AND round = $2;

-- SELECT ALL MATCHES FOR A PARTICULAR TEAM
SELECT api_football_id, league, league_id, season, round, date, referee, home, home_id, away, away_id, ht_home, ht_away, ft_home, ft_away, et_home, et_away, pen_home, pen_away, home_win, away_win,  created_at
FROM matches
WHERE home_id = $1 or away_id = $1