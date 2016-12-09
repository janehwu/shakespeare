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

    self.dispChars = self.characters;
    self.dispScenes = self.scenes;

    self.charText = "CHARACTER";
    self.sceneText = "ACT/SCENE";

    self.lines = [];
    self.prev = [];
    self.prevChars = [];
    self.indexes = [];

    self.character;
    self.scene;
    self.hasLines = false;
    self.showError = false;
    self.showNames = false;


    self.filenames = {
      "Ant": "a_and_c" ,  "AWW": "all_well",
      "AYL": "as_you"  ,  "Err": "com_err" ,
      "Cor": "coriolan",  "Cym": "cymbelin",
      "MND": "dream"   ,  "Ham": "hamlet"  ,
      "H41": "hen_iv_1",  "H42": "hen_iv_2",
      "H5": "hen_v"    ,  "H61": "hen_vi_1",
      "H62": "hen_vi_2",  "H63": "hen_vi_3",
      "H8": "hen_viii" ,  "JC": "j_caesar" ,
      "Jn": "john"     ,  "Lr": "lear"   , 
      "LLL": "lll"     ,  "MM": "m_for_m"  , 
      "Wiv": "m_wives" ,  "Mac": "macbeth" ,
      "MV": "merchant" ,  "Ado": "much_ado",
      "Oth": "othello" ,  "Per": "pericles",
      "Rom": "r_and_j" ,  "R2": "rich_ii"  ,
      "R3": "rich_iii" ,  "TN": "t_night"  ,
      "Shr": "taming"  ,  "Tmp": "tempest" ,
      "Tim": "timon"   ,  "Tit": "titus"   ,
      "Tro": "troilus" ,  "TGV": "two_gent",
      "WT": "win_tale"
    };

    self.selectChar = function(character) { 
      self.character = character;
      self.filterScenes();
      self.charText = character;
      if(self.character != null && self.scene != null) {
        self.getData();
        self.dispScenes = self.scenes;
      }
    }
    self.selectScene = function(scene) { 
      self.scene = scene;
      self.filterChars();
      self.sceneText = scene;
      if(self.character != null && self.scene != null) {
        self.getData();
        self.dispScenes = self.scenes;
      }
    }

    self.filterScenes = function() {
      if(self.character == null) return;
      var character = self.character.replace(/\s+/g, '');
      self.dispScenes = [];
      jQuery.get('./static/visualizations/barGraph/tsvDat/' + self.file + '/' + character + '.tsv', function(data) {
        var charScenes = []
        var scenes = data.split("\n");
        scenes.shift();
        scenes.forEach(function(scene) {
          var sceneList = scene.split("\t");
          if (sceneList[1] > 0) {
            charScenes.push(sceneList[0]);
          }
        });
        self.dispScenes = charScenes;
        $scope.$apply();
      });
    }

    self.filterChars = function() {
      var filteredCharList = [];
      if(self.scene == null) return;
      jQuery.get('./static/visualizations/heatMap/heatmapTSV/' + self.file + '.tsv', function(data) {
        var sceneChars = [];
        var cells = data.split("\n");

        cells.shift();
        cells.forEach(function(cell) {
          var thisCell = cell.split("\t");
          if(thisCell[1] == self.scenes.indexOf(self.scene) + 1) { //This is the scene
            filteredCharList.push(self.characters[parseInt(thisCell[0],10) + 1]);
          }
        });

        self.dispChars = filteredCharList;
        $scope.$apply();
      });
    }

    self.intToRoman = function(num) {
      if (!+num)
          return false;
      var digits = String(+num).split(""),
          key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                 "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                 "","I","II","III","IV","V","VI","VII","VIII","IX"],
          roman = "",
          i = 3;
      while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }

    self.hasChildren = function(object) {
      if (object.children) {
        return object.children.length > 2;
      }
      return false;
    }

    self.getData = function() {
      var file = self.filenames[self.file];
      var actNum = self.scene.split(".")[0];
      var sceneNum = self.intToRoman(self.scene.split(".")[1]);

      var total_lines = [];
      var total_prev_lines = [];
      var total_prev_characters = [];

      $.ajax({
        dataType : "xml",
        url : './xml/' + file + '.xml',
        success: function(xml) {
            var playChildren = Array.prototype.slice.call(xml.childNodes[1].childNodes);
            playChildren.filter(self.hasChildren).forEach(function(act) {
                if(act.childNodes[0].textContent == ('ACT ' + actNum)) { //This ACT
                  var actChildren = Array.prototype.slice.call(act.children);
                  actChildren.filter(self.hasChildren).forEach(function(scene) {
                    if(scene.childNodes[0].textContent.includes('SCENE ' + sceneNum + '.')) { //This SCENE
                      var sceneChildren = Array.prototype.slice.call(scene.children);
                      sceneChildren.forEach(function(element) {
                        if(element.tagName == 'SPEECH') {
                          var elemChildren = Array.prototype.slice.call(element.children); //This CHARACTER
                          var speaker = elemChildren[0].textContent;
                          if(speaker.toUpperCase() == self.character) { //Each speech, need to get all lines + prev
                            var lines = [];
                            var prev_lines = [];

                            elemChildren.shift(); //Remove speaker element

                            //Add character's lines
                            elemChildren.forEach(function(line) {
                              if(line.tagName == "STAGEDIR") {
                                lines.push('[Stage Dir] ' + line.textContent);
                              }
                              else if(line.children.length > 0) { //Some nested stage directions
                                var sublines = []
                                var lineChildren = Array.prototype.slice.call(line.childNodes);
                                lineChildren.forEach(function(element) {
                                  if(element.tagName == "STAGEDIR") {
                                      sublines.push(element.textContent);
                                  }
                                  else sublines.push(element.textContent);
                                });
                                lines.push("[" + sublines[0] + "] " + sublines[1]);
                              }
                              else lines.push(line.textContent);
                            });

                            //Add previous line(s)
                            var prev = element.previousElementSibling;
                            if(prev.tagName == 'SPEECH') {
                              var prevElemChildren = Array.prototype.slice.call(prev.children);
                              
                              total_prev_characters.push(prevElemChildren[0].textContent);

                              prevElemChildren.shift(); //Remove speaker element

                              var lastLine = prevElemChildren[prevElemChildren.length - 1];
                              if(lastLine.tagName == "STAGEDIR") {
                                  prev_lines.unshift('[Stage Direction] ' + lastLine.textContent);
                              }
                              else prev_lines.unshift(lastLine.textContent);

                              if(prevElemChildren.length > 1) {
                                for(i = prevElemChildren.length - 2; i >= 0; i--) {
                                  var line = prevElemChildren[i];
                                  if(line.tagName == "STAGEDIR") {
                                    prev_lines.unshift('[Stage Dir] ' + line.textContent);
                                  }
                                  else if (line.textContent[0] == line.textContent[0].toUpperCase()) {
                                    prev_lines.unshift(line.textContent);
                                    break;
                                  }
                                }
                              }
                            }
                            else {
                              total_prev_characters.push("Stage Directions");
                              prev_lines.push(prev.textContent);
                            }

                            total_lines.push(lines);
                            total_prev_lines.push(prev_lines);

                          }
                        }
                      });
                    }
                  });
                }
            });

            self.prev = total_prev_lines;
            self.lines = total_lines;
            self.prevChars = total_prev_characters;
            self.indexes = [];
            for(var i = 0; i < total_lines.length; i++) {
              self.indexes.push(i);
            }
            if(total_lines.length == 0) {
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
  }

