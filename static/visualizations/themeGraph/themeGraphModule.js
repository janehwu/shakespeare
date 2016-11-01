angular
	.module('themeGraphModule',['ngMaterial'])
	.directive('themeGraph', function($window) {
		return {
            restrict:'EA',
            template:"<svg width='100%' height='100%'></svg>",
  			scope: {
  				play: '='
  			},
            link: function(scope, elem, attrs){
                $(document).on("themeSelected", function (e,data) {
					var text = data.text;
					var color = data.color;
					d3.selectAll(".themeBar")
					  .attr("fill", function(d) {  
						var themes = d.theme.split(",");

						if(themes.includes(text)){ 
							return color;
						}
						else if(themes.includes(text[0].toUpperCase() + text.substr(1))){
							return color;
						}
						else {
							return d3.hsl(0, 0, 0);
						}
		  			});
					
				});
							   
				$(document).on("playSelected", function(e, play) {


					var json = "./static/visualizations/themeGraph/json/" + play.filename + ".json";
					var width = 1000;
					var height = 100;
					var svg = d3.select(".themeGraph").append("svg")
							.attr("height", height)
							.attr("width", width)
							.attr("id", "chart");


					var x = d3.scale.ordinal().rangePoints([0, width], .1),
						y = d3.scale.linear().rangeRound([height, 0]);

					var g = svg.append("g");

					d3.json(json, function(error, data) {
					  if (error) throw error;


					  x.domain(data.map(function(d) { return d.theme; }));
					  y.domain([0, d3.max(data, function(d) { return 1; })]);

//					  g.append("g")
//						  .attr("class", "axis axis--x")
//						  .attr("transform", "translate(0," + height + ")")
//						  .call(d3.axisBottom(x));

					//  g.append("g")
					//      .attr("class", "axis axis--y")
					//      .call(d3.axisLeft(y).ticks(10, "%"))
					//    .append("text")
					//      .attr("transform", "rotate(-90)")
					//      .attr("y", 6)
					//      .attr("dy", "0.71em")
					//      .attr("text-anchor", "end")
					//      .text("Frequency");

					var colorCounter = -1, widthCounter = -1;
					var marginalColor = 1.0/data.length;
					var marginalWidth = width*1.0/data.length;
					  g.selectAll(".bar")
						.data(data)
						.enter().append("rect")
						  .attr("class", "themeBar")
						  .attr("x", function(d) { widthCounter++; return widthCounter*marginalWidth; })
						  .attr("y", function(d) { return 1; })
						  .attr("width", function(d) { return width/data.length; })
						  .attr("height", function(d) { return height - 1; })
						  .attr("fill", function(d) { return d3.hsl(0, 0, 0);});
					});

//                      // Add an elaborate mouseover title for each chord.
//                      chord.append("title").text(function(d) {
//                        return cities[d.source.index].name
//                            + " → " + cities[d.target.index].name
//                            + ": " + formatPercent(d.source.value)
//                            + "\n" + cities[d.target.index].name
//                            + " → " + cities[d.source.index].name
//                            + ": " + formatPercent(d.target.value);
//                      });
//
//                      function mouseover(d, i) {
//                        chord.classed("fade", function(p) {
//                          return p.source.index != i
//                              && p.target.index != i;
//                        });
//                      }
         

                    
                    
                });
                
            }
		};
	})
