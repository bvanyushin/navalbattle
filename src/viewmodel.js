/* eslint-env browser*/
module.exports = (function() {
  'use strict';
  var battleField = require('./generator');
  var settings = require('./settings');

  var size = settings.mapSize;

  var battleFieldElement = window.document.getElementById('battle-field');

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

  /**
   * make a shot in game
   * 
   * @param  {Object} event event
   * @return {void}
   */
  function makeShot(event) {
    var numId = parseInt(event.target.id, 10);
    event.target.classList.remove("empty");
    var shotResult = battleField.shot(numId);
    if (shotResult === 'destroyed') {
      markDestroyedShip(numId);
      markBusyCells(numId);
      if (battleField.thisIsTheEnd()) {
        gameOver();
      }
    } else {
      event.target.classList.add(shotResult);
    }
  }

  /**
   * Marks destroyed ship's cells as destroyed
   * 
   * @param  {Number} coordinate Index of cell
   * @return {void}
   */
  function markDestroyedShip(coordinate) {
    var shipCoordinates = battleField.getShip(coordinate).coordinates;
    shipCoordinates.forEach(function(numId){
      var cell = window.document.getElementById(numId);
      cell.classList.remove('hit');
      cell.classList.add('destroyed');
    })
  }

  /**
   * Marks destroyed ship's area cells as missed
   * 
   * @param  {Number} coordinate Index of cell
   * @return {void}
   */
  function markBusyCells(coordinate) {
    var areaCoordinates = battleField.getShipArea(coordinate);
    areaCoordinates.forEach(function(numId) {
      var cell = window.document.getElementById(numId);
      cell.classList.remove('empty');
      cell.classList.add('miss');
    });
  }

  function gameOver() {
    alert('Game over');
  }
})();
