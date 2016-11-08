
    angular
       .module('playModule')
       .controller('PlayController', [
          'navBarService', '$routeParams', '$scope',
          PlayController])
       .service('navBarService', ['$q', NavBarService]);

  /**
   * Controller for Play page
   * @param navBarService
   * @param $routeParams
   * @constructor
   */
  function PlayController(navBarService, $routeParams, $scope) {
    var self = this;

    self.selected = "Summary";
    self.getPlayInfo  = getPlayInfo;
    self.showFeature = showFeature;
    self.playName = "hi";
    self.playChars = [];
    self.playSummary = "";
    self.playScenes = [];
    self.file = $routeParams.file;
    self.scope = $scope;


    // Load all registered users
    navBarService
          .loadAllFeatures()
          .then( function( features ) {
            self.features    = [].concat(features);
          });
    
    function getPlayInfo(play_file) {
      var fileName = play_file;
      var scope = self.scope;
      var that = self;

      // Currently hard coded for Hamlet until JSON files fixed.
      $.ajax({
      type : "POST",
      url : "get_play_content",
      data: String(fileName),
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
        $.each(data, function(key, val) {
          self.file = fileName;
          self.playName = data.name;
          self.playChars = data.characters;
          self.playSummary = data.summary;
          self.playScenes = data.scenes;
        });
      }
      });
    }

    function showFeature(feature) {
      self.selected = feature;
    }

    $(document).on("playFileSelected", function(e, filename) {
      self.getPlayInfo(filename);
      self.file = filename;
    });

    $scope.$watch('self.playName', function (newValue) {
      console.log($scope);
      self.getPlayInfo(self.file);
    }).bind(self);
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
        return $q.when(features);
      }
    };
  }

