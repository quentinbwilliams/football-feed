const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///footy_test",
});

client.connect();

module.exports = client;
