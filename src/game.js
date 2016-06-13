module.exports = (function() {
  'use strict';

  var BattleField = require('./battleField');
  var mapConstructor = require('./mapConstructor');
  var playerField = new BattleField();
  var cpuField = new BattleField();

  mapConstructor.manual(playerField);
  mapConstructor.auto(cpuField);
})();
