angular
	.module('visModule',['ngMaterial'])
	.directive('speakChord', function() {
		return {
  			scope: {
  				play: '='
  			},
         	templateUrl: './src/visualizations/speakChord.html'
		};
	})
