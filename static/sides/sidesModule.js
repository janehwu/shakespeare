angular
	.module('sidesModule',['ngMaterial'])
	.directive('sides', function() {
		return {
			restrict: "E",
         	controller: 'SidesController',
			controllerAs: 'ctrl',
  			scope: {
  				file: "=",
  				characters: "=",
  				scenes: "="
  			},
         	templateUrl: './static/sides/sides.html',
         	bindToController: true
		};
	});
