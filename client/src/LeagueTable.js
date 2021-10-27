import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import League from "../../models/league"

const LeagueTable = (leagueID) => {
	const league = new League(leagueID);
	const getStandings = league.apiGetStandings();

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Rank</TableCell>
						<TableCell align="right">Team</TableCell>
						<TableCell align="right">Points</TableCell>
						<TableCell align="right">Form</TableCell>
						<TableCell align="right">Goal Diff</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{league.leagueStandings.map((row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.rank}
							</TableCell>
							<TableCell align="right">{row.team.name}</TableCell>
							<TableCell align="right">{row.points}</TableCell>
							<TableCell align="right">{row.form}</TableCell>
							<TableCell align="right">{row.goalsDiff}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);	
}

export default LeagueTable;