module.exports = (function () {
  'use strict';

  var BattleField = require('./battleFieldVM');
  
  var battleField = new BattleField('player');
  var battleFieldCPU = new BattleField('cpu');

  battleField.draw();
  battleField.constructMap();
  battleFieldCPU.draw();
  battleFieldCPU.generate();

  playTheGame(battleField, battleFieldCPU);
})();
