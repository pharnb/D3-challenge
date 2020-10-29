// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv").then( healthData => {

  console.log(healthData);

  // log a list of names
  var names = healthData.map(data => data.name);
  console.log("names", names);

  // Cast each hours value in tvData as a number using the unary + operator
  healthData.forEach(function(data) {
    data.hours = +data.hours;
    console.log("Name:", data.name);
    console.log("Hours:", data.hours);
  });
}).catch(function(error) {
  console.log(error);
});
