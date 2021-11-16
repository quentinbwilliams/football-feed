import axios from "axios";
import React, { useState, useEffect } from "react";

function LeagueTitle() {
	const [league, setLeague] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	const id = 39;

	const getData = async (id) => {
		try {
			const leagueData = await axios.get(`http://localhost:5000/leagues/${id}/standings`);
			setLeague(leagueData.data);
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData(id);
	}, []);

	return (
		<div>
			<img src={league.logo} alt="league logo"/>
			<h2>{league.name}</h2>
			<h2>{league.countryName}</h2>
			<h2>{league.season}</h2>
		</div>
	)
}

export default LeagueTitle;
