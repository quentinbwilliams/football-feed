export function getLeagueStandings(id) {
	return fetch(`${URL}/leagues/${id}/standings`);
}
