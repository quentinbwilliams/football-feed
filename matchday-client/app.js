const League = require("./models/league");
const user = {
	username: "h",
	email: "h",
	id: 1,
	leagues: [
		{
			user_id: 1,
			league_id: 38,
			name: "UEFA U21 Championship",
			type: "Cup",
			logo: "https://media.api-sports.io/football/leagues/38.png",
		},
		{
			user_id: 1,
			league_id: 39,
			name: "Premier League",
			type: "League",
			logo: "https://media.api-sports.io/football/leagues/39.png",
		},
		{
			user_id: 1,
			league_id: 39,
			name: "Premier League",
			type: "League",
			logo: "https://media.api-sports.io/football/leagues/39.png",
		},
		{
			user_id: 1,
			league_id: 39,
			name: "Premier League",
			type: "League",
			logo: "https://media.api-sports.io/football/leagues/39.png",
		},
	],
	teams: [
		{
			user_id: 1,
			team_id: 40,
			team_name: "Liverpool",
			team_founded: 1892,
			team_logo: "https://media.api-sports.io/football/teams/40.png",
			team_city: "Liverpool",
		},
	],
};

const leagueViewer = async () => {
	const leagues = user.leagues;
	for (let i = 0; i < leagues.length; i++) {
		const id = leagues[i].apiFootballID;
		const league = new League(id);
		const table = league.makeTable();
		const matches = league.makeMatchCards();
		const goalStandings = league.makeGoalStandingsTable();
		const assistStandings = league.makeAssistsStandingsTable();
		const yellowStandings = league.makeYellowCardStandingsTable();
		const redStandings = league.makeRedCardStandingsTable();
	}
};

const teamViewer = async () => {
	const teams = user.teams;
	for (let i = 0; i < teams.length; i++) {
		// do stuff
	}
};
