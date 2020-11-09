// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv").then( healthData => {

  console.log(healthData);

  // log a list of names
  var stateabbr = healthData.map(data => data.abbr);
  var poverty = healthData.map(data => data.poverty);
  var income = healthData.map(data => data.income);
  console.log("states", stateabbr);
  console.log("poverty", poverty);
  console.log("income",income);

  
}).catch(function(error) {
  console.log(error);
});
