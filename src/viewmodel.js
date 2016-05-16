/* eslint-env browser*/
module.exports = (function() {
  'use strict';
  var battleField = require('./generator');
  var settings = require('./settings');

  var size = settings.mapSize;

  var battleFieldElement = window.document.getElementById('battle-field');

  var classes = ['empty', 'miss', 'hit', 'destroyed'];
  
  for (var i = 0; i < size; i++) {
    var row = window.document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < size; j++) {
      var cell = window.document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('empty');
      cell.id = (i * size + j);
      row.appendChild(cell);
    }
    battleFieldElement.appendChild(row);
    battleFieldElement.addEventListener('click', makeShot);
  }

  function makeShot(event) {
    var numId = parseInt(event.target.id);
    console.log(numId);
    event.target.classList.remove("empty");
    var shotResult = battleField.shot(numId);
    console.log(shotResult);
    event.target.classList.add(shotResult);
  }
})();
