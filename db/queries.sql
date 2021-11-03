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


-- UPDATE MATCH DATE, REFEREE, HT_HOME, HT_AWAY, FT_HOME, FT_AWAY, ET_HOME, ET_AWAY, PEN_HOME, PEN_AWAY, HOME_WIN, AWAY_WIN
UPDATE matches SET date = $1, referee = $2, ht_home = $3, ht_away = $4, ft_home = $5, ft_away = $6, et_home = $7, et_away = $8, pen_home = $9, pen_away = $10, home_win = $11, away_win = $12
WHERE api_football_id = $13