angular
	.module('pieChartModule',['ngMaterial'])
	.directive('pieChart', function($window) {
		return {
            restrict:'EA',
            template:"<svg width='100%' height='100%'></svg>",
  			scope: {
  				play: '='
  			},
            link: function(scope, elem, attrs){
                $(document).on("themeSelected", function (e,data) {

                  var theme = String(data.text);
                  console.log(theme);

                   var width = 600,
                        height = 400,
                        radius = Math.min(width, height) / 2;

                  d3.select(".pieChart").select("svg").remove()
                  var svg = d3.select(".pieChart")
                    .append("svg")
                      .attr("height", height)
                      .attr("width", width)
                    .append("g")

                  svg.append("g")
                    .attr("class", "slices");
                  svg.append("g")
                    .attr("class", "labels");
                  svg.append("g")
                    .attr("class", "lines");

                  var pie = d3.layout.pie()
                    .sort(null)
                    .padAngle(.02)
                    .value(function(d) {
                      return parseInt(d.lines);
                    });

                  var arc = d3.svg.arc()
                    .outerRadius(radius * 0.8)
                    .innerRadius(radius * 0.4);

                  var outerArc = d3.svg.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9);
					
//					    var arc = d3.svg.arc()
//                    .outerRadius(radius )
//                    .innerRadius(radius * 0.5);
//
//                  var outerArc = d3.svg.arc()
//                    .innerRadius(radius )
//                    .outerRadius(radius );

                  svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                  var key = function(d){ 
                    return d.data.name; };

                  change(theme);


                  function change(theme) {

                    var pieDic = {};

                    function type(d) {
                      d.frequency = +d.frequency;
                      return d;
                    }

                    d3.csv("./static/visualizations/pieChart/pieChartCSV/" + scope.play + ".csv", type, function(error, data) {
                      if (error) throw error;

                          for (i = 0; i < data.length; i++){
                            var keys = Object.keys(data[i]);

                            if (i == 0){
                              for (k = 0; k < Math.floor(keys.length); k+=3){
                                pieDic[keys[k]] = [];
                                }
                            }

                            for (j = 0; j < Math.floor(keys.length); j+=3){
                                var entry = String(data[i][keys[j]]);
                                var dic = {};
                                if (entry != " "){
                                  dic["name"] = entry;
                                  dic["lines"] = data[i][keys[j+1]];
                                  dic["color"] = data[i][keys[j+2]];
                                  pieDic[keys[j]].push(dic);
                                }
                              }
                          }

                      /* ------- PIE SLICES -------*/
                      var slice = svg.select(".slices").selectAll("path.slice")
                        .attr("stroke-width", 2)
                        .data(pie(pieDic[theme]), key);

                      slice.enter()
                        .insert("path")
                        .style("fill", function(d) { 
                          var hue = 0.0;
                          var color = d3.hsl(parseFloat(hue), 0, .69420);
                          return color; })
                        .attr("class", function(d){
						  return "slice " + String(d.data.name).split(" ").join("delim");
					  	})
					  	.on("mousemove", function(dat) {
						  var char = dat.data.name;
						  
						  // Change color of pie chart slice
						  d3.select(".slice." + char.split(" ").join("delim"))
						  	.style("fill", d3.hsl( parseInt(dat.data.color), 1, .5));
						  
						  d3.select(".focus").style("display", "inline");
						  d3.select(".focus").select("text").html(char);
						  
						  
						  
						  // change color of all themeGraph bars with the same character
						  d3.select(".themeGraph")
							  .select("#chart")
							  .selectAll(".themeBar")
						  		.style("fill", function(d){
							  		if(d.character === char){
										return d3.hsl(d.color, 1, .5);
									}
							  		else{
										return d3.hsl(0,0,.69420);
									}
						  		});
//						  		.style("width", function(d){
//							  		if(d.character === char && d.theme.indexOf(theme) != -1) {
//										return 10;
//									}
//						  		});
					  		
					  	})
					  .on("mouseout", function(dat) {
						  var char = dat.data.name;
						  
						  // change pie chart slice color back to gray
						  d3.select(".slice." + char.split(" ").join("delim"))
						  	.style("fill", d3.hsl(0, 0, .69420));
						  
						  d3.select(".focus").style("display", "none");
						  
						  // change themeBars' color back to gray
						  d3.selectAll(".themeBar")
						  	.style("fill", d3.hsl(0, 0, .69420));
						  
					  });

                      slice   
                        .transition().duration(1000)
                        .attrTween("d", function(d) {
                          this._current = this._current || d;
                          var interpolate = d3.interpolate(this._current, d);
                          this._current = interpolate(0);
                          return function(t) {
                            return arc(interpolate(t));
                          };
                        })

                      slice.exit()
                        .remove();

                      /* ------- TEXT LABELS -------*/

                      var text = svg.select(".labels").selectAll("text")
                        .data(pie(pieDic[theme]), key);

                      text.enter()
                        .append("text")
                        .attr("dy", ".35em")
                        .text(function(d) {
                          // console.log(d.data.name);
                          return d.data.name;
                        });
                      
                      function midAngle(d){
                        // console.log(d.startAngle + (d.endAngle - d.startAngle)/2);
                        return d.startAngle + (d.endAngle - d.startAngle)/2;
                      }

                      text.transition().duration(1000)
                        .attrTween("transform", function(d) {
                          this._current = this._current || d;
                          var interpolate = d3.interpolate(this._current, d);
                          this._current = interpolate(0);
                          return function(t) {
                            var d2 = interpolate(t);
                            var pos = outerArc.centroid(d2);
                            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                            return "translate("+ pos +")";
                          };
                        })
                        .styleTween("text-anchor", function(d){
                          this._current = this._current || d;
                          var interpolate = d3.interpolate(this._current, d);
                          this._current = interpolate(0);
                          return function(t) {
                            var d2 = interpolate(t);
                            return midAngle(d2) < Math.PI ? "start":"end";
                          };
                        });

                      text.exit()
                        .remove();

                      /* ------- SLICE TO TEXT POLYLINES -------*/

                      var polyline = svg.select(".lines").selectAll("polyline")
                        .data(pie(pieDic[theme]), key);
                      
                      polyline.enter()
                        .append("polyline")
                          .attr("opacity", .3)
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill", "none");

                      polyline.transition().duration(1000)
                        .attrTween("points", function(d){
                          this._current = this._current || d;
                          var interpolate = d3.interpolate(this._current, d);
                          this._current = interpolate(0);
                          return function(t) {
                            var d2 = interpolate(t);
                            var pos = outerArc.centroid(d2);
                            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                            return [arc.centroid(d2), outerArc.centroid(d2), pos];
                          };      
                        });
                      
                      polyline.exit()
                        .remove();
                    });
                  };

                });
              
            }
		};
	})