const { application } = require("express");
const express = require("express");
const app = express();
const ExpressError = require("./error");

// ROUTES
userRoutes = require("./routes/users");

app.use(express.json());

app.use("/users", userRoutes);

// Listen on port 3000
app.listen(5000, function () {
  console.log("Server started on 5000");
});
