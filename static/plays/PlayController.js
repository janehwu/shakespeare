
    angular
       .module('playModule')
       .controller('PlayController', [
          'navBarService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          PlayController])
       .service('navBarService', ['$q', NavBarService]);

  var dict = {
    'All\'s Well That Ends Well': 'AWW',
    'Antony and Cleopatra': 'Ant',
    'As You Like It': 'AYL',
    'Coriolanus': 'Cor',
    'Cymbeline': 'Cym',
    'Comedy of Errors': 'Err',
    'Henry IV': 'H4',
    'Henry V': 'H5',
    'Hamlet': 'Ham',
    'Macbeth': 'Mac'
  }


  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PlayController( navBarService, $scope) {
    var self = this;

    self.selected     = null;
    self.featureLinks = [ ];
    self.selectLink   = selectLink;
    self.getPlayInfo  = getPlayInfo;
    self.getSpeakFrequency = getSpeakFrequency;
    self.play = $scope.play;
    self.playName = "";
    self.playChars = [];
    self.playSummary = "";


    // Load all registered users

    navBarService
          .loadAllFeatures()
          .then( function( features ) {
            self.features    = [].concat(features);
            //self.selected = features[0];
          });
    
    function getPlayInfo(play) {
      var name = play["name"];
      var fileName = dict[name];
      console.log(fileName);

      // Currently hard coded for Hamlet until JSON files fixed.
      $.ajax({
      type : "POST",
      url : "get_play_content",
      data: String(fileName),
      contentType: 'application/json;charset=UTF-8',
      success: function(data) {
          console.log(data);
          $.each(data, function(key, val) {
            console.log(key + "value:: " + val);
            self.playName = data.name;
            self.playChars = data.characters;
            self.playSummary = data.summary;
          });
        }
      });

    }

    $(document).on("playSelected", function(e, play) {
      self.getPlayInfo(play);
    });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectLink ( feature ) {
      self.selected = angular.isNumber(feature) ? $scope.features[feature] : feature;
    }



    /**
     * We get 'play' value from clicking a play in the left navbar
     * This function reads play info from a JSON file
     */
    

    /**
     * We need to know which play page we're on to get value of 'play'
     * This function gets the appropriate visualization and loads it into the webpage
     */
    function getSpeakFrequency ( play ) {

    }

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
