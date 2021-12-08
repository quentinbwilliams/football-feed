const baseURL = 'https://matchday.cloud';
const axios = require('axios')

class League {
	constructor(apiFootballID) {
		this.apiFootballID = apiFootballID;
	}

	async getStandings() {
		// Make request to api for standings
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/standings`
		);
		const name = request.data.name;
		const countryName = request.data.countryName;
		const type = request.data.type;
		const logo = request.data.logo;
		const season = request.data.season;
		const standings = request.data.standings;

		console.log(name,
countryName,
type,
logo,
season,
standings);
	}

	async makeTable() {
		const standings = await this.getStandings();
		// Make DOM elements for the table
	}

	async getMatches() {
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/matches`
		);
	}

	async makeMatchCards() {
		const matches = await this.getMatches();
		// Make DOM elements for the matches
	}

	async getGoalStandings() {
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/goals`
		);
	}

	async makeGoalStandingsTable() {
		const standings = await this.getGoalStandings();
	}

	async getAssistsStandings() {
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/assists`
		);
	}

	async makeAssistsStandingsTable() {
		const standings = await this.getAssistsStandings();
	}

	async getYellowCardStandings() {
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/yellowcards`
		);
	}

	async makeYellowCardStandingsTable() {
		const standings = await this.getYellowCardStandings();
	}

	async getRedCardStandings() {
		const request = await axios.get(
			`${baseURL}/leagues/${this.apiFootballID}/redcards`
		);
	}

	async makeRedCardStandingsTable() {
		const standings = await this.getRedCardStandings();
	}

}