(function(){
  'use strict';

  angular.module('plays')
         .service('featureService', ['$q', FeatureService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function FeatureService($q){
    var plays = [
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
        avatar: 'svg-4'
      }
    ];

    // Promise-based API
    return {
      loadAllFeatures : function() {
        // Simulate async nature of real remote calls
        return $q.when(plays);
      }
    };
  }

})();
