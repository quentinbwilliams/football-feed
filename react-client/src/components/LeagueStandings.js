import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

function LeagueStandings(props) {
	const [league, setLeague] = useState("");
	const [standings, setStandings] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [teams, setTeams] = useState([]);

	const getData = async () => {
		try {
			const leagueData = await axios.get(
				`http://localhost:5000/leagues/${props.leagueID}/standings`
			);
			setLeague(leagueData.data);
			setStandings(leagueData.data.standings);
			if (leagueData.data.type === "Cup") {
				setTableHeaders(Object.keys(leagueData.data.standings.flat()[0]));
				setTeams(leagueData.data.standings.flat().map((team) => team));
			} else if (leagueData.data.type === "League") {
				setTableHeaders(Object.keys(leagueData.data.standings[0]));
				setTeams(leagueData.data.standings.map((team) => team));
			}
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData(props.leagueID);
	}, []);

	return (
		<div>
			<img src={league.logo} alt="league logo" />
			<h2>{league.name}</h2>
			<h3>{league.countryName}</h3>

			<Table hover>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Team</th>
						<th>Points</th>
						<th>Goal Differnce</th>
						<th>Group</th>
						<th>Form</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
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
								<td>{team.group}</td>
								<td>{team.form}</td>
								<td>{team.description}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default LeagueStandings;
