(function(){

  angular
       .module('plays')
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
    self.plays        = [ ];
    self.selectPlay   = selectPlay;
    self.toggleList   = togglePlaysList;
    self.makeContact  = makeContact;

    // Load all registered users

    featureService
          .loadAllFeatures()
          .then( function( plays ) {
            self.plays    = [].concat(plays);
            self.selected = plays[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function togglePlaysList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectPlay ( play ) {
      self.selected = angular.isNumber(play) ? $scope.plays[play] : play;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedPlay) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/plays/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.play = selectedPlay;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactPlay = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
