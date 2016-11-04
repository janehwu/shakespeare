angular
	.module('barModule', ['ngMaterial'])
	.directive('barChart', function($window) {
		return {
				restrict: 'EA',
				template:"<svg width='100%' height='100%'></svg>",
			scope: {
				play: '='
			},
				link: function(scope, elem, attrs) {
					$(document).on("characterSelected", function(e, data) {
						console.log(data);
						var characterName = data.charName;
						var playName = data.playName;
						var margin = {top: 20, right: 0, bottom: 100, left: 100},
							width = 1200 - margin.left - margin.right, 
							height = 400 - margin.top - margin.bottom;
						// var width = 800,
						//     height = 500;


						var svg = d3.select(".barChart").append("svg")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom)
									.attr("fill", "blue");
						    



						var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
						    y = d3.scaleLinear().rangeRound([height, 0]);

						var g = svg.append("g")
						    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
						    //.attr("transform", "translate(" + 20 + "," + 20 + ")");

						var path = "./static/visualizations/tsvDat";

						d3.tsv(path + "/" + playName + "/" + characterName + ".tsv", function(d) {
						  d.numLines = +d.numLines;
						  return d;
						}, function(error, data) {
						  if (error) throw error;

						  x.domain(data.map(function(d) { return d.scene; }));
						  y.domain([0, d3.max(data, function(d) { return d.numLines + 10 - (d.numLines % 10); })]);

						  g.append("g")
						      .attr("class", "axis axis--x")
						      .attr("transform", "translate(0," + height + ")")
						      .call(d3.axisBottom(x));

						  g.append("g")
						      .attr("class", "axis axis--y")
						      .call(d3.axisLeft(y).ticks(10))
						    .append("text")
						      .attr("transform", "rotate(-90)")
						      .attr("y", 6)
						      .attr("dy", "0.71em")
						      .attr("text-anchor", "end")
						      .text("Frequency");

						  var bars = g.selectAll(".bar")
						    .data(data)
						    .enter().append("rect")
						      .attr("class", "bar")
						      .attr("x", function(d) { return x(d.scene); })
						      .attr("y", function(d) { return y(d.numLines); })
						      .attr("width", x.bandwidth())
						      .attr("height", function(d) { return height - y(d.numLines); })
						      .on("mouseover", function(){
						        d3.select(this)
						          .attr("fill", "orangered");
						      });

						  bars.append("title").text(function(d) {
						    return "" + d.numLines;
						  });

						  function mouseover(d, i) {
						    // bars.classed("fade", function(p) {
						    //   return p.source.index != i
						    //     && p.target.index != i;
						    // });
						  }
						      // .on("mouseover", function() {
						      //   d3.select(this).
						      //     .attr()
						      // })

						});

					})
				}

		}
	})