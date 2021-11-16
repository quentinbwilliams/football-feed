import axios from "axios";
import React, { useState, useEffect } from "react";

function LeagueStandings() {
	const [league, setLeague] = useState("");
	const [standings, setStandings] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [teams, setTeams] = useState([]);

	const id = 39;

	const getData = async (id) => {
		try {
			const leagueData = await axios.get(
				`http://localhost:5000/leagues/${id}/standings`
			);
			setLeague(leagueData.data);
			setStandings(leagueData.data.standings);
			setTableHeaders(Object.keys(leagueData.data.standings[0]));
			setTeams(leagueData.data.standings.map((team) => team));
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData(id);
	}, []);

	return (
		<div>
			<img src={league.logo} alt="league logo" />
			<h2>{league.name}</h2>
			<h3>{league.countryName}</h3>

			<table className="table">
				<tr>
					<th>Rank</th>
					<th>Team</th>
					<th>Points</th>
					<th>Goal Diff</th>
					<th>Form</th>
				</tr>
				{teams.map((team) => {
					return (
						<tr>
							<td>{team.rank}</td>
							<td>
								<img
									src={team.team.logo}
									alt="team logo"
									height="25"
									width="25"
								/>
								{team.team.name}
							</td>
							<td>{team.points}</td>
							<td>{team.goalsDiff}</td>
							<td>{team.form}</td>
							<td>{team.description}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default LeagueStandings;
