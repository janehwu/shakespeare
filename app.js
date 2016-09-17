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
  .controller('AppController', ['navService', '$mdSidenav', '$scope', AppController])
  .service('navService', ['$q', NavService]);

/**
 * Main Controller for the Angular Material Starter App
 * @param navService
 * @param $mdSidenav
 * @param $scope
 * @constructor
 */
function AppController(navService, $mdSidenav, $scope) {
    var self = this;
    self.selected;
    self.plays = [];
    self.searchTerm = "";
    self.searchMode = false;
    self.selectPlay = selectPlay;

    self.showYears = false;

    self.sortBy = "name";
    self.sortList = sortList;

    self.toggleList = togglePlaysList;
    self.toggleSearch = toggleSearchMode;

    // Load all plays
    navService
          .loadAllPlays()
          .then(function(plays) {
            self.plays    = [].concat(plays);
            //self.selected = plays[0];
          });


    /**
     * Hide or Show the 'left' sideNav area
     */
    function togglePlaysList(e) {
      if (e.target.type !== "text") $mdSidenav('left').toggle();
    }

    function toggleSearchMode() {
      self.searchMode = !self.searchMode;
    }

    function selectPlay (play) {
      self.selected = angular.isNumber(play) ? self.plays[play] : play;
    }

    function sortList(sortBy) {
      self.sortBy = sortBy;
      self.showYears = (sortBy == 'year');
      self.showGenres = (sortBy == 'genre');
    }
}
