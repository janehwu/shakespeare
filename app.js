angular
  .module('shakespeareApp', ['ngMaterial', 'playModule'])
  .config(function($mdThemingProvider, $mdIconProvider){
      $mdIconProvider
          .defaultIconSet("./assets/svg/avatars.svg", 128)
          .icon("menu"       , "./assets/svg/menu.svg"        , 24);

      $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');

  })
  .controller('AppController', ['playService', '$mdSidenav', '$scope', AppController]);

/**
 * Main Controller for the Angular Material Starter App
 * @param $scope
 * @param $mdSidenav
 * @param $scope
 * @constructor
 */
function AppController(playService, $mdSidenav, $scope) {
    var self = this;
    self.selected;
    self.plays = [];

    self.toggleList = togglePlaysList;
    self.selectPlay = selectPlay;

    // Load all plays
    playService
          .loadAllPlays()
          .then( function(plays) {
            self.plays    = [].concat(plays);
            self.selected = plays[0];
          });


    /**
     * Hide or Show the 'left' sideNav area
     */
    function togglePlaysList() {
      // $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectPlay (play) {
      self.selected = angular.isNumber(play) ? self.plays[play] : play;
    }   
}
