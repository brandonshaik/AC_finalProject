$(document).ready(function(){

  var w = 925;
  var h = 550;
  var margin = 30;
  var startYear = 2004;
  var endYear = 2013;
  var startSeeker = 0;
  var endSeeker = 17500;

  var y = d3.scaleLinear().domain([endSeeker, startSeeker]).range([0+margin, h-margin]);
  var x = d3.scaleLinear().domain([2004,2013]).range([0+margin-5,w]);
  var years = d3.range(startYear, endYear);
  var vis = d3.select("#vis").append("svg:svg").attr("width", w).attr("height", h).append("svg:g");

  var line = d3.line().x(function(d,i){
    return x(d.x);
  }).y(function(d){
    return y(d.y);
  });

  var countries_regions = {};
  d3.json("/js/data/asylum1.json", function(data) {
    console.log(data);
  for (i=1; i < data.length; i++) {
    countries_regions[data[i][0]]= data[i][1];
  };
  });
  console.log(countries_regions)




	// Exercise
	// 1. load data using d3 and define the newly rendered data set as a variable

    // d3.csv("js/data.csv", function(data){
    //   var dataset = data;

    //   // 2. Within the d3 data function, select a container through d3
    //   var chart = d3.select("#chart");

    //   // 3. Within the d3 data function, add a paragraph for each data point into the container diplaying
    //   chart.selectAll("div")
    //         .data(dataset)
    //         .enter()
    //         .append("div")
    //         .text(function(d){
    //           return "The food group is " + d.food_group;
    //         });

    //   console.log(dataset);
    // });

});
