const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///footy_db",
});

client.connect();

module.exports = client;
