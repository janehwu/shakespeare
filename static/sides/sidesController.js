  angular
    .module('sidesModule')
    .controller('SidesController', ['$scope', SidesController]);

  /**
   * Controller for displaying a character's sides
   * @param $scope
   * @constructor
   */
  function SidesController($scope) {
    var self = this;

    self.file = $scope.file;
    self.characters = $scope.characters;
    self.scenes = $scope.scenes;
    self.lines = [];
    self.prev = [];
    self.indexes = [];

    self.character = "";
    self.scene = "";
    self.hasLines = false;
    self.showError = false;

    self.selectChar = function(character) { self.character = character }
    self.selectScene = function(scene) { self.scene = scene }

    self.getData = function() {
      var act = self.scene.split(".")[0];
      var scene = self.scene.split(".")[1];
      $.ajax({
      type : "POST",
      url : "/get_character_sides",
      data: {"play": String(self.file),
             "character": String(self.character),
             "act": String(act),
             "scene": String(scene)},
      contentType: 'application/json',
      success: function(data) {
          self.prev = data[1];
          self.lines = data[0];
          self.indexes = [];
          for(var i = 0; i < data[0].length; i++) {
            self.indexes.push(i);
          }
          if(data[0].length == 0) {
            self.hasLines = false;
            self.showError = true;
          }
          else {
            self.hasLines = true;
            self.showError = false;
          }
          $scope.$apply();
        }
      });
    }
    $(document).on("playSelected", function(e, play) {
      self.character = "";
      self.scene = "";
      self.hasLines = false;
      self.showError = false;
    });   
  }

