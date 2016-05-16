module.exports = (function() {
  'use strict';

  var BattleFieldClass = require('./battleField');
  var settings = require('./settings');

  var size = settings.mapSize;

  var battleField = new BattleFieldClass(size);

  var x;
  var y;
  var coords = [];

  x = Math.floor(Math.random() * 4);
  y = Math.floor(Math.random() * 4);
  coords.push(x * size + y);
  coords.push(x * size + y + 1);
  battleField.addShip(coords);
  console.log(coords);

  coords = [];
  x = Math.floor(Math.random() * 4 + 5);
  y = Math.floor(Math.random() * 4);
  coords.push(x * size + y);
  coords.push(x * size + y + 1);
  battleField.addShip(coords);
  console.log(coords);

  coords = [];
  x = Math.floor(Math.random() * 4 + 5);
  y = Math.floor(Math.random() * 4 + 5);
  coords.push(x * size + y);
  coords.push(x * size + y + 1);
  battleField.addShip(coords);
  console.log(coords);

  return battleField;
})();
