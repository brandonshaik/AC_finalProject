$(document).ready(function(){

  var w = 925;
  var h = 550;
  var margin = 30;
  var startYear = 2004;
  var endYear = 2013;
  var startSeeker = 0;
  var endSeeker = 7500;

  var y = d3.scaleLinear().domain([endSeeker, startSeeker]).range([0+margin, h-margin]);
  var x = d3.scaleLinear().domain([2004,2013]).range([0+margin-5,w]);
  var years = d3.range(startYear, endYear);
  var vis = d3.select("#vis").append("svg:svg").attr("width", w).attr("height", h).append("svg:g");

  var line = d3.line().x(function(d,i){
    return x(d.x);
  }).y(function(d){
    return y(d.y);
  });

vis.append("svg:line").attr("x1", x(2004)).attr("y1", y(startSeeker)).attr("x2", x(2013)).attr("y2", y(startSeeker)).attr("class", "axis")
vis.append("svg:line").attr("x1", x(startYear)).attr("y1", y(startSeeker)).attr("x2", x(startYear)).attr("y2", y(endSeeker)).attr("class", "axis")
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
}).attr("x1", x(1959.5)).attr("y2", function(d) {
    return y(d);
}).attr("x2", x(1960));

// HAVE TO HAVE 'AC_FINALPROJECT' TO WORK IN GH-PAGES, TO WORK IN BROWSER REMOVE 'AC_FINALPROJECT'
  d3.json("AC_finalProject/js/data/asylum1.json", function(data) {
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

        //draw the line
        vis.append("svg:path").data([curData]).attr("country", country.region).attr("d", line);
      });

      // for(var i = 2004; i <= 2013; i++){
      //   years[i] = _.map(data, function(o){
      //     return {country: o.region, value: o[i]};
      //   });
      // }

      console.log(years);



    });
  });



