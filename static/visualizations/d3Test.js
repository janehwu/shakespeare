angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
}]);

  // Make sure app.js has the d3 service added

angular.module('appApp.directives', ['d3'])
  .directive('barChart', ['d3Service', function(d3Service) {
    return {
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          // d3 is the raw d3 object
        });
      }}
  }]);


  angular.module('appApp.directives')
  .directive('d3Bars', ['d3Service', function(d3Service) {
    return {
    restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
            var svg = d3.select(element[0])
                        .append("svg")
                        .style('width', '100%');
            var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;

            // Browser onResize event
            window.onresize = function() {
                scope.$apply();
            };

            // hard-code data for now
            scope.data = [
                {name: "Jane", score: 54},
                {name: "Srin", score: 33},
                {name: "Anthony", score: 68},
                {name: "Trudy (PM)", score: 22}
            ];

            // watch for resize event
            scope.$watch(function() {
                return angular.element($window)[0].innerWidth;
            }, function() {
                scope.render(scope.data);
            });

            scope.render = function(data) {
                svg.selectAll('*').remove();
                 
                    // If we don't pass any data, return out of the element
                    if (!data) return;
                 
                    // setup variables
                    var width = d3.select(ele[0]).node().offsetWidth - margin,
                        // calculate the height
                        height = scope.data.length * (barHeight + barPadding),
                        // Use the category20() scale function for multicolor support
                        color = d3.scale.category20(),
                        // our xScale
                        xScale = d3.scale.linear()
                        .domain([0, d3.max(data, function(d) {
                            return d.score;
                        })])
                        .range([0, width]);
                 
                    // set the height based on the calculations above
                    svg.attr('height', height);
                 
                    //create the rectangles for the bar chart
                    svg.selectAll('rect')
                    .data(data).enter()
                        .append('rect')
                        .attr('height', barHeight)
                        .attr('width', 140)
                        .attr('x', Math.round(margin/2))
                        .attr('y', function(d,i) {
                        return i * (barHeight + barPadding);
                        })
                        .attr('fill', function(d) { return color(d.score); })
                        .transition()
                        .duration(1000)
                        .attr('width', function(d) {
                            return xScale(d.score);
                        });
           }
        });
    }};
  }]);
