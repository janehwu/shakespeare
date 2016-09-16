(function(){
	angular
		.module('playModule',['ngMaterial'])
		.controller('PlayController', function($scope) {
    		this.play = $scope.play;
    	})
		.directive('playPage', function() {
			return {
	         	controller: 'PlayController',
				controllerAs: 'ctrl',
	  			scope: {
	  				'play': '=play'
	  			},
	         	templateUrl: './src/plays/play.html'
			};
		})
		.service('playService', ['$q', PlayService]);
})();