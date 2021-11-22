const { Client } = require("pg");

const client = new Client({
	user: "user",
	password: "password",
	host: "host",
	port: 25060,
	database: "defaultdb",
	ssl: {
		ca: "There is a known error with digitalocean's ssl certification required for accessing a psql database from a droplet in the vcs. The workaroud isn't included here for obvious reasons, but here is the guide that helped me: https://www.adrianhorning.com/digital-ocean-app-platform-ssl-certificate-node-postgres/",
	},
});

client.connect((err) => {
	if (err) {
		console.log("connection error", err.stack);
	} else {
		console.log("connection successful");
	}
});

module.exports = client;
