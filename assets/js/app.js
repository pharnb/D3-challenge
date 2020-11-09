var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then( healthData => {

    // Step 1: Map data
    // ==============================
    // var stateabbr = healthData.map(data => data.abbr);
    // var poverty = healthData.map(data => data.poverty);
    // var income = healthData.map(data => data.income);
    // console.log("states", stateabbr);
    // console.log("poverty", poverty);
    // console.log("income", income);

    healthData.forEach( data => {
      data.income = +data.income;
      data.poverty = +data.poverty;
    });

    // Step 2: Create scale functions
    // Poverty vs Income
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.income)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.poverty)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // append state abbr
    chartGroup.select("g")
        .selectAll("circle")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.income))
        .attr("y", d => yLinearScale(d.poverty))
        .attr("dy",-395)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");
    
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Income");
  }).catch(function(error) {
    console.log(error);
  });
