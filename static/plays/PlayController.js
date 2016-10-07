
    angular
       .module('playModule')
       .controller('PlayController', [
          'navBarService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          PlayController])
       .service('navBarService', ['$q', NavBarService]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PlayController( navBarService, $scope) {
    var self = this;

    self.selected = "Summary";
    self.getPlayInfo  = getPlayInfo;
    self.showFeature = showFeature;
    self.play = $scope.play;
    self.playName = "";
    self.playChars = [];
    self.playSummary = "";


    // Load all registered users
    navBarService
          .loadAllFeatures()
          .then( function( features ) {
            self.features    = [].concat(features);
          });
    
    function getPlayInfo(play) {
      var fileName = play["filename"];

      // Currently hard coded for Hamlet until JSON files fixed.
      $.ajax({
      type : "POST",
      url : "get_play_content",
      data: String(fileName),
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
          $.each(data, function(key, val) {
            self.playName = data.name;
            self.playChars = data.characters;
            self.playSummary = data.summary;
          });
        }
      });

    }

    function showFeature(feature) {
      self.selected = feature;
    }

    $(document).on("playSelected", function(e, play) {
      self.getPlayInfo(play);
    });
  }


/**
   * Plays DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
function NavBarService($q){
    var features = [
      {
        name: 'Summary',
        avatar: 'svg-1'
      },
      {
        name: 'Visualizations',
        avatar: 'svg-2'
      },
      {
        name: 'Character List',
        avatar: 'svg-3'
      },
      {
        name: 'Reader',
        avatar: 'svg-4',
      }
    ];

    // Promise-based API
    return {
      loadAllFeatures : function() {
        // Simulate async nature of real remote calls
        console.log(features);
        return $q.when(features);
      }
    };
  }
