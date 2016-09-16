angular
	.module('playModule',['ngMaterial'])
	.controller('PlayController', function($scope) {
		this.feature = $scope.feature;
	})
	.directive('playPage', function() {
		return {
			restrict: "E",
         	controller: 'PlayController',
			controllerAs: 'ctrl',
  			scope: {
  				play: '='
  			},
         	templateUrl: './src/plays/play.html'
		};
	})
	.service('playService', ['$q', PlayService]);