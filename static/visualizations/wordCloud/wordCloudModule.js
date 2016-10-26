angular
	.module('wordCloudModule',['ngMaterial'])
	.directive('wordCloud', function($window) {
		return {
            restrict:'EA',
            template:"<svg width='100%' height='100%'></svg>",
            scope: {
  				    play: '='
            },
            link: function(scope, elem, attrs){
                $(document).on("playSelected", function(e, play) {
                    var fileName = play.filename;
                    var frequency_list = [];                 
                    
                    // Currently hard coded for Hamlet until JSON files fixed.
                    $.ajax({
                        type : "POST",
                        url : "get_word_frequencies",
                        data: String(fileName),
                        contentType: 'application/json;charset=UTF-8',
                        success: function(data) {
                            frequency_list = data;
                            console.log(data);
                            var color = d3.scale.linear()
                            .domain([0,1,2,3,4,5,6,10,15,20,100])
                            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

                            d3.layout.cloud().size([800, 300])
                                .words(frequency_list)
                                .rotate(0)
                                .padding(8)
                                .fontSize(function(d) { return d.size; })
                                .on("end", draw)
                                .start();
                                function draw(words) {
                                  d3.select(".Themes").append("svg")
                                      .attr("width", 800)
                                      .attr("height", 300)
                                    .append("g")
                                      .attr("transform", "translate(" + 800 / 2 + "," + 300 / 2 + ")")
                                    .selectAll("text")
                                      .data(words)
                                    .enter().append("text")
                                      .style("font-size", function(d) { return d.size + "px"; })
                                      //.style("font-family", "Impact")
                                      .style("fill", function(d, i) { return color(i); })
                                      .attr("text-anchor", "middle")
                                      .attr("transform", function(d) {
                                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                      })
                                      .text(function(d) { return d.text; });
                                }
                          } });
                    });

                }

    };
  });
