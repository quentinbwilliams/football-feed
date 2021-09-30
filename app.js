const { application } = require("express");
const express = require("express");
const app = express();
const ExpressError = require("./error");

app.use(express.json());

// Listen on port 3000
app.listen(3000, function () {
  console.log("Server started on 3000");
});
