angular
	.module('playModule',['ngMaterial'])
	// .service('navBarService', ['$q', NavBarService])
	// .controller('PlayController', function($scope) {
	// 	this.feature = $scope.feature;
	// })
	.directive('playPage', function() {
		return {
			restrict: "E",
         	controller: 'PlayController',
			controllerAs: 'ctrl',
  			scope: {
  				play: '=',
  			},
         	templateUrl: './src/plays/play.html',
         	bindToController: true
		};
	});