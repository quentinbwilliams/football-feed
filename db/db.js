const { Client } = require("pg");

const client = new Client({
	connectionString:
		"postgresql://doadmin:******PRIVATE*PASSWORD*****@private-matchday-db-do-user-10270224-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
});

client.connect();

module.exports = client;