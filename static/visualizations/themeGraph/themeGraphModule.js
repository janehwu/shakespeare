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
				
				// Event for when a wordCloud theme is selected
                $(document).on("themeSelected", function (e,data) {
					
					var text = data.text;
					var focus = d3.select(".focus");
					var lineLength = d3.selectAll(".themeBar")[0].length;
					
					// For every bar, change color to represent the character
					//                set the width to be wider for easy hover
					// 				  set mouse hovering to display the quote on hover
					d3.selectAll(".themeBar")
					  .attr("fill", function(d) {  
						var themes = d.theme.split(",");

						var hue = d.color;
						var color = d3.hsl(parseInt(hue, 10), 1, .5);
						
						// change the color of lines with the selected theme
						if((themes.indexOf(text) != -1) || (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1) ){ 
							return color;
						}
						else {
							return d3.hsl(0, 0, .9);
						}
		  			})
				     .attr("width", function(d){
						var themes = d.theme.split(",");

						// change the width of lines with the selected theme
						if((themes.indexOf(text) != -1) || (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1)) {
							return 5;
						}
						else {
							return 0;	
						}
					})
					 .on("mouseover", function() { focus.style("display", "inline");})
					 .on("mouseout", function() { focus.style("display", "none")})
				     .on("mousemove", function(d) {
						var themes = d.theme.split(",");

						// set a hover feature for lines with the selected theme
						if( (themes.indexOf(text) != -1) || (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1) ){ 
							var message = "Act: " + d.act + " Scene: " + d.scene + "          " + d.character + ": " + 
				   		"\"" + d.quote + "\"";
				   			focus.select("text").html(message);
						}
						else {
							focus.style("display", "none");
						}
					});
					
				});
							   
	//			$(document).on("playSelected", function(e, play) {


					var json = "./static/visualizations/themeGraph/json/" + scope.play + ".json";
					var width = 1200;
					var height = 175;


					var x = d3.scale.ordinal().rangePoints([0, width], .1),
						y = d3.scale.linear().rangeRound([height, 0]);

					
		
					
				
				
					

					d3.json(json, function(error, data) {
					  if (error) throw error;
					  			var svg = d3.select(".themeGraph").append("svg")
							.attr("height", height)
							.attr("width", width)
							.attr("id", "chart");

							var g = svg.append("g");

					  x.domain(data.map(function(d) { return d.act; }));
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

						
						// which lines have a scene change
						// multiple by width to get where to put tick!! (offset value)
						
//						var oldScene = 0;
//						var oldAct = 0;
//						var sceneLoc = {};
//						var counter = 0;
//						
//						data.forEach(function(d) {
//							if (d.scene != oldScene || d.act != oldAct){
//								var actAndScene = d.act + " " + d.scene;
//								sceneLoc[actAndScene] = counter;
//								oldScene = d.scene;
//								oldAct = d.act;
//							}
//							counter += 1;
//						});
												
						var focus = svg.append("g")
								   .attr("class", "focus")
					   	 		   .attr("style", "display: none;");
					
					focus.append("text")
						 .attr("x", 9)
						 .attr("y", 160)
						 .attr("dy", ".35em")
						 .attr("style", "white-space:pre;");

						
					var colorCounter = -1, widthCounter = -1;
					var marginalColor = 1.0/data.length;
					var marginalWidth = width*1.0/data.length;
						
					svg.append("g")
							.attr("class", "xAxis")
							.attr("transform", "translate(0," + (height-50) + ")")
					
						
						var startTick = svg.select(".xAxis").append("g")
							.attr("class", "tick")
							.attr("transform", "translate(0,0)");
						
						startTick.append("line")
							.attr("y2", 6)
							.attr("x2", 0);
						
						startTick.append("text")
							.attr("dy", ".71em")
							.attr("y", 9)
							.attr("x", 0)
							.text("start");
						
						var endTick = svg.select(".xAxis").append("g")
							.attr("class", "tick")
							.attr("transform", "translate(" + (width-30) + ",0)");
						
						endTick.append("line")
							.attr("y2", 6)
							.attr("x2", 0);
						
						endTick.append("text")
							.attr("dy", ".71em")
							.attr("y", 9)
							.attr("x", 0)
							.text("end");
						
						
					
					
						
						
					
						
					  g.selectAll(".themeBar")
						.data(data)
						.enter().append("rect")
						  .attr("class", "themeBar")
						  .attr("x", function(d) { widthCounter++; return widthCounter*marginalWidth; })
						  .attr("y", function(d) { return 15; })
						  .attr("width", function(d) { return width/data.length; })
						  .attr("height", function(d) { return height*2.0/3; })
						  .attr("fill", function(d) { return d3.hsl(0, 0, .9);})
						 
						
					});
					

					
					
					
					// Add an elaborate mouseover title for each chord.
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
         

                    
                    
      //          });
                
            }
		};
	})
