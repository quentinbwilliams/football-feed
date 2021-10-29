TODO

DATABASE:
- Automate task to run seed scripts (particularly db/seed/matches).

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