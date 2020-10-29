// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv").then( healthData => {

  console.log(healthData);

  // log a list of names
  var states = healthData.map(data => data.state);
  console.log("states", states);

  // Cast each hours value in tvData as a number using the unary + operator
  // healthData.forEach( data => {
  //   data.hours = +data.hours;
  //   console.log("Name:", data.name);
  //   console.log("Hours:", data.hours);
  // });
}).catch(function(error) {
  console.log(error);
});
