  angular
       .module('playModule')
       .controller('PlayController', [
          'featureService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          PlayController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PlayController( featureService, $mdSidenav, $mdBottomSheet, $timeout, $log ) {
    var self = this;

    self.selected     = null;
    self.featureLinks = [ ];
    self.selectLink   = selectLink;

    // Load all registered users

    featureService
          .loadAllFeatures()
          .then( function( features ) {
            self.features    = [].concat(features);
            self.selected = features[0];
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
    function getPlayInfo ( play ) {

    }

    /**
     * We need to know which play page we're on to get value of 'play'
     * This function gets the appropriate visualization and loads it into the webpage
     */
    function getSpeakFrequency ( play ) {

    }

  }
