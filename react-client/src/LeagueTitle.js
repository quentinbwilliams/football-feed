import React, { useState, useEffect } from "react";
import { getLeague } from "./services/getLeague";
import { getLeagueStandings } from "./services/getLeagueStandings";

function LeagueTitle() {
	const [league, setLeague] = useState([]);

	useEffect(() => {
		const leagueData = getLeague();
		setLeague(leagueData);
	}, []);

	return (
		<div className="league-title">
			<h1>LEAGUE</h1>
				<h2>{league.name}</h2>
		</div>
	);
}

export default LeagueTitle;