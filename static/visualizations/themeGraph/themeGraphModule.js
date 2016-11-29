angular
	.module('themeGraphModule',['ngMaterial'])
	.directive('themeGraph', function($window) {
		return {
            restrict:'EA',
            template:"<svg></svg>",
  			scope: {
  				play: '='
  			},
            link: function(scope, elem, attrs){
				
				// Event for when a wordCloud theme is selected
                $(document).on("themeSelected", function (e,data) {
					
					var text = data.text;
					
					d3.select(".Themes")
						.style("float", "right")
						.select("svg")
						.selectAll("text")
						.style("fill", function(d){
						
							if(d.text === text){
								return "#940088";
							}
							else{
								return d3.hsl(185, 1, .29);
							}
					});
					
					// Move the pieChart over !! woo.
					d3.select(".pieChart")
						.style("float", "left");		
					
					var focus = d3.select(".focus");
					var lineLength = d3.selectAll(".themeBar")[0].length;
					
					// For every bar, change color to represent the character
					//                set the width to be wider for easy hover
					// 				  set mouse hovering to display the quote on hover
					d3.selectAll(".themeBar")
					  .attr("fill", function(d) {  
						var themes = d.theme.split(",");

						var hue = d.color;
						var color = d3.hsl(0, 0, .69420);
						
						// change the color of lines with the selected theme
						if((themes.indexOf(text) != -1) || 
						   (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1) ||
						   (themes.indexOf(text+"s") != -1)){ 
							return color;
						}
						else {
							return d3.hsl(0, 0, .9);
						}
		  			})
				     .attr("width", function(d){
						var themes = d.theme.split(",");

						// change the width of lines with the selected theme
						if((themes.indexOf(text) != -1) || 
						   (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1) ||
						   (themes.indexOf(text+"s") != -1)) {
							return 5;
						}
						else {
							return 0;	
						}
					})
					 .on("mouseover", function() { focus.style("display", "inline");})
					 .on("mouseout", function(d) { 
						
						// change pieChart slice back to gray
						d3.select(".pieChart")
							.select("svg")
							.select(".slices")
							.select(".slice." + d.character.split(" ").join("delim"))
							.style("fill", function(d) {
							  	if(this.attributes.hasOwnProperty("clicked") &&
								 	this.attributes.clicked.value === "true"){
								  	return this.style.fill;
							  	}
							  	return d3.hsl(0, 0, .69420);
						  });
						
						// If a bar is related to a clicked pie chart slice, keep its color
						d3.selectAll(".themeBar")
							.style("fill", function(d) {
							  	if(this.attributes.hasOwnProperty("clicked") &&
								 	this.attributes.clicked.value === "true"){
								  	return this.style.fill;
							  	}
							  	return d3.hsl(0, 0, .69420);
						  });
						
						focus.style("display", "none")})
					
				     .on("mousemove", function(dat) {
						var char = dat.character		
						var themes = dat.theme.split(",");

						// Make sure bars related to a clicked pie slice stay colored
						d3.selectAll(".themeBar")
							.style("fill", function(d){
							  		if(this.attributes.hasOwnProperty("clicked") &&
										   this.attributes.clicked.value === "true"){
										return this.style.fill;
									}
							  		else{
										return d3.hsl(0,0,.69420);
									}
						  		});
					
						// color the hovered bar
						this.style.fill = d3.hsl(parseInt(dat.color), 1, .5);
					
						// when hovering over a character, change color of pie chart slice
						d3.select(".pieChart")
							.select("svg")
							.select(".slices")
							.select(".slice." + dat.character.split(" ").join("delim"))
							.style("fill", d3.hsl(parseInt(dat.color), 1, .5));
						
						
						// set a hover feature for lines with the selected theme
						if((themes.indexOf(text) != -1) || 
						   (themes.indexOf(text[0].toUpperCase() + text.substr(1)) != -1) ||
						   (themes.indexOf(text+"s") != -1)){ 
							var message = "Act: " + dat.act + " Scene: " + dat.scene + "          " + dat.character + ": " + 
				   		"\"" + dat.quote + "\"";
				   			focus.select("text").html(message);
						}
						else {
							focus.style("display", "none");
						}
					});
					
				});

				var json = "./static/visualizations/themeGraph/json/" + scope.play + ".json";
				var width = 1200;
				var height = 225;
				
				var x = d3.scale.ordinal().rangePoints([0, width], .1),
					y = d3.scale.linear().rangeRound([height, 0]);
				
				// get the json data and use it to create the visualization
				d3.json(json, function(error, data) {
					if (error) throw error;
					
					// Create the svg tag for our visualization
					var svg = d3.select(".themeGraph").append("svg")
					.attr("height", height)
					.attr("width", width)
					.attr("id", "chart");
					
					var g = svg.append("g");
					
					x.domain(data.map(function(d) { return d.act; }));
					y.domain([0, d3.max(data, function(d) { return 1; })]);
					
					// create the html for displaying a themeBar's quote/character
					var focus = svg.append("g")
					.attr("class", "focus")
					.attr("style", "display: none;");
					
					focus.append("text")
						.attr("x", 9)
						.attr("y", 210)
						.attr("dy", ".35em")
						.attr("style", "white-space:pre;");
					
					
					// determine the width of each bar (color is not used I believe)
					var colorCounter = -1, widthCounter = -1;
					var marginalColor = 1.0/data.length;
					var marginalWidth = (width-5)*1.0/(data.length);
					
					svg.append("g")
						.attr("class", "xAxis")
						.attr("transform", "translate(0," + (height-50) + ")")
					
					
					// set a start and end text
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
					
					//create the themeBars visualization with a gray fill color 
					g.selectAll(".themeBar")
						.data(data)
						.enter().append("rect")
						.attr("class", "themeBar")
						.attr("x", function(d) { widthCounter++; return widthCounter*marginalWidth ; })
						.attr("y", function(d) { return 15; })
						.attr("width", function(d) { return width/data.length; })
						.attr("height", function(d) { return height*2.0/3; })
						.attr("fill", function(d) { return d3.hsl(0, 0, .9);})
					
					
					});
            }
		};
	})
