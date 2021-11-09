TODO

DATABASE:

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