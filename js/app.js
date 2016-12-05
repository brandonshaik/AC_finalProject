$(document).ready(function(){


  // create global variables for scale, axes and SVG
  var w = 925;
  var h = 600;
  var margin = 30;
  var startYear = 2004;
  var endYear = 2013;
  var startSeeker = 0;
  var endSeeker = 5500;

  // Define scale and range
 //var y = d3.scaleLinear().domain([endSeeker, startSeeker]).range([0+margin, h-margin]);
 var y = d3.scaleLinear().domain([endSeeker,startSeeker]).range([margin,570]);
 //var x = d3.scaleLinear().domain([2004,2013]).range([0+margin-5,w]);
 var x = d3.scaleLinear().domain([2004,2013]).range([40,w]);
  var years = d3.range(startYear, endYear);

  // Create SVG
  var vis = d3.select("#vis").append("svg:svg").attr("width", w).attr("height", h).append("svg:g").attr("viewBox", "0 0 " + w + " " + h)
                        .attr("preserveAspectRatio", "xMinYMin slice");
  var line = d3.line().x(function(d,i){;

  // Draw lines
    return x(d.x);
  }).y(function(d){
    return y(d.y);
  });


vis.append("svg:line").attr("x1", x(startYear)).attr("y1", y(startSeeker)).attr("x2", x(2013)).attr("y2", y(startSeeker)).attr("class", "axis")
vis.append("svg:line").attr("x1", x(startYear)).attr("y1", y(startSeeker)).attr("x2", x(startYear)).attr("y2", y(endSeeker)).attr("class", "axis")

// Axes Labels
vis.selectAll(".xLabel").data(x.ticks(5)).enter().append("svg:text").attr("class", "xLabel").text(String).attr("x", function(d) {
    return x(d)
}).attr("y", h - 10).attr("text-anchor", "middle");
vis.selectAll(".yLabel").data(y.ticks(4)).enter().append("svg:text").attr("class", "yLabel").text(String).attr("x", 0).attr("y", function(d) {
    return y(d)
}).attr("text-anchor", "right").attr("dy", 3);
vis.selectAll(".xTicks").data(x.ticks(5)).enter().append("svg:line").attr("class", "xTicks").attr("x1", function(d) {
    return x(d);
}).attr("y1", y(startSeeker)).attr("x2", function(d) {
    return x(d);
}).attr("y2", y(startSeeker) + 7);
vis.selectAll(".yTicks").data(y.ticks(4)).enter().append("svg:line").attr("class", "yTicks").attr("y1", function(d) {
    return y(d);
}).attr("x1", x(2003.5)).attr("y2", function(d) {
    return y(d);
}).attr("x2", x(2004));


// HAVE TO HAVE 'AC_FINALPROJECT' TO WORK IN GH-PAGES, TO WORK IN BROWSER REMOVE 'AC_FINALPROJECT'
  d3.json("js/data/asylum1.json", function(data) {
      var dataset = data,
        years = {};

      _.each(data, function(country){
        var curData = [],
        years = Object.keys(country);

        years = _.filter(years, function(o){
          return $.isNumeric(o);
        });

        _.each(years, function(year){
          curData.push({
            x: year,
            y: country[year]
          });
        });

        console.log(curData);



        //Mouseover
        vis.append("svg:path").data([curData]).attr("country", country.region).attr("d", line)
        .on("mouseover", function(){
          d3.select(this)
          .style("stroke","red");
        })
        .on("mouseout", function(d){
          d3.select(this)
          .style("stroke","");
        })
      });






    });
  });



