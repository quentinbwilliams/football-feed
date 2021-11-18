import React from "react";
import "./App.css";
import LeagueStandings from "./components/LeagueStandings";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";

const App = () => (
	<div className="App">
		<div>
			<LeagueStandings leagueID={2} />
		</div>
	</div>
);
export default App;
