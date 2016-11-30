$(document).ready(function(){

	// Exercise
	// 1. load data using d3 and define the newly rendered data set as a variable

    d3.csv("js/data.csv", function(data){
      var dataset = data;

      // 2. Within the d3 data function, select a container through d3
      var chart = d3.select("#chart");

      // 3. Within the d3 data function, add a paragraph for each data point into the container diplaying
      chart.selectAll("div")
            .data(dataset)
            .enter()
            .append("div")
            .text(function(d){
              return "The food group is " + d.food_group;
            });

      console.log(dataset);
    });

});
