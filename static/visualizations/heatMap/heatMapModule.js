angular
	.module('heatMapModule',['ngMaterial'])
	.directive('heatMap', function($window) {
		return {
            restrict:'EA',
            template:"<svg width='100%' height='100%'></svg>",
  			scope: {
  				play: '='
  			},
            link: function(scope, elem, attrs){
                $(document).on("playSelected", function(e, play) {
                  $.ajax({
                    type : "POST",
                    url : "get_play_content",
                    data: String(play.filename),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data) {
                      var margin = { top: 20, right: 0, bottom: 50, left: 150 },
                      // left: 120
                      // characters = getCharacterList("Ham"),
                      // scenes = getSceneList("Ham"),
                      //characters = ["FIRST WITCH", "SECOND WITCH", "ALL", "THIRD WITCH", "MALCOLM", "CAPTAIN", "LENNOX", "ROSS", "DUNCAN", "ANGUS", "MACBETH", "BANQUO", "MESSENGER", "LADY MACBETH", "FLEANCE", "MACDUFF", "DONALBAIN", "PORTER", "OLD MAN", "SERVANT", "SECOND MURDERER", "FIRST MURDERER", "MURDERERS", "THIRD MURDERER", "LORDS", "MURDERER", "HECATE", "LORD", "SECOND APPARITION", "THIRD APPARITION", "FIRST APPARITION", "LADY MACDUFF", "SON", "DOCTOR", "GENTLEWOMAN", "MENTEITH", "CAITHNESS", "SEYTON", "SIWARD", "SOLDIER", "YOUNG SIWARD"],
                      characters = data.characters,
                      scenes = data.scenes,
                      width = 1200 - margin.left - margin.right,
                      height = 750 - margin.top - margin.bottom,
                      gridWidth = Math.floor(width / scenes.length),
                      gridHeight = Math.floor(height / characters.length),
                      legendElementWidth = gridWidth * 2,
                      buckets = 9,
                      colors = ["#E2E9F7","#C6D3F0","#AABEE9","#8DA8E2","#7192DB","#557DD4","#3867CD","#1C51C6","#003CBF"];
                      datasets = ["./static/visualizations/heatMap/heatmapTSV/" + play.filename + ".tsv"];

                      // Is it ok that #chart is not defined in this document...it was in lineDensityHeat.html
                      var svg = d3.select("#chart").append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                      var characterLabels = svg.selectAll(".characterLabel")
                      .data(characters)
                      .enter().append("text")
                      .text(function (d) { return d; })
                      .attr("x", 0)
                      .attr("y", function (d, i) { return i * gridHeight; })
                      .style("text-anchor", "end")
                      .on('click', function(d) {$(document).trigger("characterSelected", d);})
                      .attr("transform", "translate(-6," + gridHeight + ")")
                      .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "characterLabel mono axis axis-characters" : "characterLabel mono axis"); });

                      var sceneLabels = svg.selectAll(".sceneLabel")
                      .data(scenes)
                      .enter().append("text")
                      .text(function(d) { return d; })
                      .attr("x", function(d, i) { return i * gridWidth; })
                      .attr("y", 0)
                      .style("text-anchor", "middle")
                      .attr("transform", "translate(" + gridWidth / 2 + ", -6)")
                      .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "sceneLabel mono axis axis-scenes" : "sceneLabel mono axis"); });

                      var heatmapChart = function(tsvFile) {
                        d3.tsv(tsvFile,
                        function(d) {
                          return {
                            character: +d.character,
                            scene: +d.scene,
                            value: +d.value
                          };
                        },
                        function(error, data) {
                          var colorScale = d3.scale.quantile()
                              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                              .range(colors);

                          var cards = svg.selectAll(".scene")
                              .data(data, function(d) {return d.character+':'+d.scene;});

                          cards.append("title");

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
                
                });
              }
		};
	})