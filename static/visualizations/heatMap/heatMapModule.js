angular
	.module('heatMapModule',['ngMaterial'])
	.directive('heatMap', function($window) {
		return {
			restrict:'EA',
			template:"<svg></svg>",
			scope: {
				play: '='
			},
			link: function(scope, elem, attrs){
					// Based on which play page we're on, a certain 'play' name is passed into request
					$.ajax({
						type : "POST",
						url : "get_play_content",
						data: String(scope.play),
						contentType: 'application/json;charset=UTF-8',
						success: function(data) {
							var margin = { top: 30, right: 0, bottom: 50, left: 150 },
							// getting character list from play JSON file
							characters = data.characters,
							// getting scene list from play JSON file
							scenes = data.scenes,
							width = 1300 - margin.left - margin.right,
							height = 750 - margin.top - margin.bottom,
							// setting dimensions of heatmap cells
							gridWidth = Math.floor(width / scenes.length),
							gridHeight = Math.floor(height / characters.length),
							legendElementWidth = gridWidth * 2,
							buckets = 9,
							// Gradient of blue for line densities
							colors = ["#E2E9F7","#C6D3F0","#AABEE9","#8DA8E2","#7192DB","#557DD4","#3867CD","#1C51C6","#003CBF"];
							// Getting TSV file for generating correct heatmap
							datasets = ["./static/visualizations/heatMap/heatmapTSV/" + scope.play + ".tsv"];

							// Allocating space for heatmap
							var svg = d3.select("#chart").append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom)
							.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							
							// Putting labels for each character on the y-axis
							var characterLabels = svg.selectAll(".characterLabel")
							.data(characters)
							.enter().append("text")
							.text(function (d) { return d; })
							.attr("x", 0)
							.attr("y", function (d, i) { return i * gridHeight; })
							.attr("cursor", "pointer")
							.style("text-anchor", "end")
							.style("fill", "rgb(70, 70, 70)")
							.on('click', function(d) {
								
								// when a character is clicked, trigger the barChart to appear
								$(document).trigger("characterSelected", {"charName": String(d), "playName": scope.play}); })
							.attr("transform", "translate(-6," + gridHeight + ")")

							.attr("class", function (d, i) { 
								var charClassName = d.split(" ").join("delim");
								
								return ((i >= 0 && i <= 4) ? "characterLabel mono axis axis-characters " + charClassName : "characterLabel mono axis " + charClassName); 
							});

							// Putting labels for each scene on the x-axis of heatmap
							var sceneLabels = svg.selectAll(".sceneLabel")
							
							.data(scenes)
							.enter().append("text")
							.text(function(d) { return d; })
							.attr("x", function(d, i) { return ((i * gridWidth)/2.0) + 2; })
							.attr("y", function(d, i) { return -1.0*((i * gridWidth)/2.0)*(-1.732)})

							.style("text-anchor", "middle")
							.attr("transform", "translate(" + gridWidth / 2 + ", -6) rotate(-60)")

							.attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "sceneLabel mono axis axis-scenes" : "sceneLabel mono axis"); });
							
							
							var heatmapChart = function(tsvFile) {
								// Opening TSV file and collecting line densities for each character
								d3.tsv(tsvFile,
								function(d) {
									return {
										character: +d.character,
										scene: +d.scene,
										value: +d.value
									};
								},
								function(error, data) {
									// Determining cell color depending upon character's line density
									var colorScale = d3.scale.quantile()
											.domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
											.range(colors);

									var cards = svg.selectAll(".scene")
											.data(data, function(d) {return d.character+':'+d.scene;});

									cards.append("title");

									// Adding cell to appropriate place in heatmap
									cards.enter().append("rect")
											.attr("x", function(d) { return (d.scene - 1) * gridWidth; })
											.attr("y", function(d) { return (d.character - 1) * gridHeight; })
											.attr("rx", 4)
											.attr("ry", 4)
											.attr("class", "scene bordered")
											.attr("width", gridWidth)
											.attr("height", gridHeight)
											.style("fill", function(d) { return colorScale(d.value)});

									cards.transition().duration(1000)
											.style("fill", function(d) { return colorScale(d.value); });

									cards.select("title").text(function(d) { return d.value; });
									
									cards.exit().remove();

									// Creating legend showing which color corresponds to which line densities
									var legend = svg.selectAll(".legend")
											.data([0].concat(colorScale.quantiles()), function(d) { return d; });

									legend.enter().append("g")
											.attr("class", "legend");

									legend.append("rect")
										.attr("x", function(d, i) { return legendElementWidth * i; })
										.attr("y", height)
										.attr("width", legendElementWidth)
										.attr("height", gridHeight)
										.style("fill", function(d, i) { return colors[i]; });

									legend.append("text")
										.attr("class", "mono")
										.text(function(d) { return "≥ " + Math.round(d); })
										.attr("x", function(d, i) { return legendElementWidth * i; })
										.attr("y", height + gridHeight);

									legend.exit().remove();



								});  
							};
							heatmapChart(datasets[0]);
					}
				});
			}
		};
	})