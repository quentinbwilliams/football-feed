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

TEAMS:

- METHODS & ROUTES

USER MIDDLEWARE:

- Ensure user is logged in.
- Sign user with JWT.
- Add userLeagues & userTeams as properties on user.

ROUTES:

- Use some req param to request data from database.
- Create object with that data.
- Call relevant class methods to set object data.
- Send object in res.
- Cache object in router.

CLIENT:

- Components should request router endpoints for data.
- Request is made with id for each league & team stored in user object (via middleware).

QUESTIONS:

- How will my client and router communicate with each other in deployment?
