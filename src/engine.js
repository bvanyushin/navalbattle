module.exports = (function() {
  'use strict';

  var BattleFieldVM = require('./battleFieldVM.js');

  var engine = {
    init: init
  }

  function init(playerField, cpuField) {
    var playerFieldVM = new BattleFieldVM('player', playerField);
    var cpuFieldVM = new BattleFieldVM('cpu', cpuField);
    playerFieldVM.draw();
    cpuFieldVM.draw()
  }

  return engine;
})();
