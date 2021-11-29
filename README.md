The API is deployed using a digitalocean private cloud network & an nginx web server -- found at matchday.cloud
The matchday api is deployed using a digitalocean private cloud network & an nginx web server -- found at matchday.cloud.

SERVING:

League data:
	leagues/:id
	leagues/:id/standings
	leagues/:id/matches
	leagues/:id/matches/current
	leagues/:id/matches/live
	leagues/:id/goals
	leagues/:id/assists
	leagues/:id/yellowcards
	leagues/:id/redcards

Team data:
	`teams/:id/matches`
	`teams/:id/matches/completed`
	`teams/:id/matches/upcoming`
	`teams/:id/matches/live`
	`teams/:id/squad`
	`teams/:id/squad/coach`
	`teams/:id/squad/injuries`
	`teams/:id/leagues`

Country data:
	`countries/:code`
	`countries/:code/leagues`
	`countries/:code/teams`
	`countries/:code/national`

Match data:
	`matches/:id`

TODO

- Automate task to run seed scripts (particularly db/seed/matches).
- Seed leagues_teams: Without this table, isolating league data on a team object is convoluted.
  - To seed leagues_team:
    - One strategy:
    - `dbGetAllMatches()`
    - Loop through all matches
      - grab league_id, home_id, away_id
      - insert into leagues_teams
      * PROBLEM: -- This strategy will result in thousands of duplicates.
      - Using SQL DISTINCT operator might solve our problem:
        `SELECT DISTINCT league_id, home_id FROM matches`
      - Assuming each team plays at home at least once for each league, this query should return the exact values needed for leagues_teams.
      * SOLUTION:
      - Add a method to the Match class with that query.
      - This query can be used to seed the leagues_teams table.
      - And can be modified in methods on League and Team such as:
        `getTeamsInLeague` -> `SELECT DISTINCT home_id FROM matches WHERE league_id = `,
        `getTeamLeagues` -> `SELECT DISTINCT league_id FROM matches WHERE home_id = `.
    - To seed leagues_teams: add distinctness query to Match class. Insert those rows directly to leagues_teams.
  - Bypassing leagues_teams:
    - Match has static method `dbGetLeaguesTeams()` which returns array of objects with league id and home id.
    - Adding distinctness queries to the League and Team classes will allow the dataflow to bypass leagues_teams table.
    - Get the needed without writing a join query, which seems preferable. Let SQL do the heavy lifting.
    - As teams are eliminated from leagues and cup competitions, the leagues_teams table will need to be updated -- adding a level of complexity.
    - Matches will be updated on a frequent basis, so calling distinctness queries on leagues/teams will always give the most up-to-date data.
		- This query style is costly and can be simplified.
			- Instead of using `SELECT DISTINCT` in League and Team, create a materialized view of the leagues_teams table. 
			- Add a static methods to LeagueTeam class to drop and create the materialized leagues_teams view from the matches table.
			- Remove `SELECT DISTINCT` query methods from League and Team classes.
			- Add methods to League and Team classes that query the leagues_teams view.
		- RESULT: A LeagueTeam class with `dbCreateLeaguesTeamsView()`, a static method to create a materialized view from the query: `CREATE MATERIALIZED VIEW leagues_teams AS SELECT DISTINCT league_id, home_id AS team_id FROM matches`.
			- An async function in db/seed/leagues-teams drops the materialized view and recreates it.
			- The function is imported to cron and runs at midnight. The schedule can be refactored but right now this works.
- Currently there are over 8,000 matches from this season logged in the database, but no logical relationship has been established in the db to connect matches to leagues and teams.
	- The League and Team classes should have instance methods to create materialized views for league_matches and team_matches.

2022 World Cup Qualifiers
- Season is 2022 for api requests, not 2021. How can I change this?
- WC Qualifier League Model extends League model. Everything stays the same expect the season import is 2022 WC Season, not SEASON from /season.js.

USER MIDDLEWARE:

- Ensure user is logged in.
- Sign user with JWT.
- Add userLeagues & userTeams as properties on user.

ROUTES:

- Use id in req param to request data from database.
- Create object with that data.
- Call class methods to set object data.
- Send object in res.
- Cache object in router.

CLIENT:

- Components should request router endpoints for data.
- Request is made with id for each league & team stored in user object (via middleware).
