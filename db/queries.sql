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

-- JOIN TEAMS ON LEAGUES_TEAMS WHERE LEAGUE ID IS KNOWN
SELECT
teams.name as team_name,
teams.founded as team_founded,
teams.logo as team_logo,
teams.city as team_city,
leagues_teams.league_id
FROM teams
JOIN leagues_teams ON teams.league_id=leagues_teams.league_id
WHERE leagues_teams.league_id = 39;

-- JOIN LEAGUES ON LEAGUES_TEAMS WHERE TEAM ID IS KNOWN
SELECT
leagues_teams.league_id,
leagues_teams.team_id,
leagues.name,
leagues.type,
leagues.logo
FROM leagues_teams
JOIN leagues ON leagues_teams.league_id=leagues.api_football_id
WHERE leagues_teams.team_id = 40;

-- JOIN LEAGUES ON USERS_LEAGUES WHERE USER ID IS KNOWN
SELECT
users_leagues.user_id,
users_leagues.league_id,
leagues.name,
leagues.type,
leagues.logo
FROM users_leagues
JOIN leagues on users_leagues.league_id=leagues.api_football_id
WHERE users_leagues.user_id = $1;

-- JOIN TEAMS ON USERS_TEAMS WHERE USER ID IS KNOWN
SELECT
users_teams.user_id,
users_teams.team_id,
teams.name as team_name,
teams.founded as team_founded,
teams.logo as team_logo,
teams.city as team_city
FROM users_teams
JOIN teams on users_teams.team_id=teams.api_football_id
WHERE users_teams.user_id = $1;