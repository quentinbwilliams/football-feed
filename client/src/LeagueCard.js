import React from "react";
import League from "../../models/league";

const LeagueCard = (props) => {
	const apiFootballID = props.id;
	const league = new League(apiFootballID);
	const initLeague = league.init();

	return (
		<div>
			<h1></h1>
		</div>
	);
};

export default LeagueCard;
