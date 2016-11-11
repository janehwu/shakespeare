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
                  // Based on which play page we're on, a certain 'play' name is passed into request
                  
                    var text = String(data.text);
                    console.log(text);

                    var width = 960,
                        height = 500,
                        radius = Math.min(width, height) / 2;

                    var arc = d3.svg.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(0);

                    var labelArc = d3.svg.arc()
                        .outerRadius(radius - 40)
                        .innerRadius(radius - 40);

                    var svg = d3.select(".pieChart").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                      .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    d3.csv("./static/visualizations/pieChart/pieChartCSV/" + scope.play + ".csv", type, function(error, data) {
                      if (error) throw error;

                      var pieDic = {};

                      console.log(data.length);

                      for (i = 0; i < data.length; i++){
                        var keys = Object.keys(data[i]);
                        console.log(keys.length);
                        if (i == 0){
                          for (k = 0; k < (Math.floor(keys.length / 3)); k+=3){
                            pieDic[keys[k]] = [];
                          }
                        }
                      
                        for (j = 0; j < (Math.floor(keys.length / 3)); j+=3){
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

                      // need d to be the dictionary pieDicLines
                      var pie = d3.layout.pie()
                        .sort(null)
                        .value(function(d) { return parseInt(d.lines); });

                      console.log("HERE1");
                      console.log(pieDic[text]);
                      console.log(svg.selectAll(".arc"));
                      var g = svg.selectAll(".arc")
                          .data(pie(pieDic[text]))
                        .enter().append("g")
                          .attr("class", "arc");

                      console.log("HERE2");

                      // character is a character name to be printed in slice "Macbeth"
                      g.append("path")
                          .attr("d", arc)
                          .style("fill", function(d) {
                            var hue = d.data.color;
                            var color = d3.hsl(parseFloat(hue), 1, .5);
                            return color; });

                      g.append("text")
                          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                          .attr("dy", ".35em")
                          .text(function(d) { return d.data.name; });
                    });

                    function type(d) {
                      d.frequency = +d.frequency;
                      return d;
                    }

                });
              
            }
		};
	})