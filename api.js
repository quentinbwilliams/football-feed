var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/teams",
  params: { id: "33" },
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "0c53816d30mshaf76a97a06df018p1a51f7jsn5f2149fe7ff0",
  },
};

axios
  .request(options)
  .then(function (response) {
    data = response.data;
    res = data.response;
    team = res[0];
    return team;
  })
  .catch(function (error) {
    console.log(error);
  });
get;
