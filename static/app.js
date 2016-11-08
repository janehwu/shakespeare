angular
  .module('shakespeareApp', 
    ['ngMaterial',
     'ngRoute',
     'playModule', 
     'speakChordModule', 
     'heatMapModule', 
     'wordCloudModule', 
     'themeGraphModule', 
     'barModule'])
  .config(function($mdThemingProvider, $routeProvider){
      $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');
      $routeProvider.when('/play/:file', {
        templateUrl: './static/plays/play.html',
        controller: 'PlayController',
        controllerAs: 'ctrl',
        resolve:{params: function($route) {
          $(document).trigger("playFileSelected", $route.current.params["file"]);
        }}
      });
  })
  .controller('AppController', 
    ['navService', '$mdSidenav', '$scope', '$location', AppController])
  .service('navService', ['$q', NavService]);

/**
 * Main Controller for Shakespeare app
 * @param navService
 * @param $mdSidenav
 * @param $scope
 * @param $location
 * @constructor
 */
function AppController(navService, $mdSidenav, $scope, $location) {
    var self = this;
    self.selected;
    self.plays = [];
    self.comedies = [];
    self.histories = [];
    self.tragedies = [];
    self.searchTerm = "";
    self.searchMode = false;
    self.selectPlay = selectPlay;

    self.showYears = false;
    self.location = $location;

    self.sortBy = "name";
    self.sortList = sortList;

    self.toggleList = togglePlaysList;
    self.toggleSearch = toggleSearchMode;

    self.viewHomePage = viewHomePage;
	
    // Load all plays
    navService
          .loadAllPlays()
          .then(function(plays) {
            self.plays    = [].concat(plays);
            plays.forEach(function(play) {
              if (play.genre == "Comedy") self.comedies.push(play);
              else if (play.genre == "History") self.histories.push(play);
              else if (play.genre == "Tragedy") self.tragedies.push(play);
              else;
            });
          });

    function viewHomePage() { 
      self.selected = null; 
      self.location.path("/");
    }

	
	
    /**
     * Hide or Show the 'left' sideNav area
     */
    function togglePlaysList(e) {
      if (e.target.type !== "text") $mdSidenav('left').toggle();
    }

    /**
     * Whether we are searching for a play
     */
    function toggleSearchMode() {
      self.searchMode = !self.searchMode;
    }

    function selectPlay (play) {
      self.selected = angular.isNumber(play) ? self.plays[play] : play;
      self.searchTerm = "";
      $(document).trigger("playSelected", self.selected);
      self.location.path("/play/" + self.selected["filename"]);
    }

    function sortList(sortBy) {
      self.sortBy = sortBy;
      self.showYears = (sortBy == 'year');
      self.showGenres = (sortBy == 'genre');
    }
}
