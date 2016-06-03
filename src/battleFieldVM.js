module.exports = (function () {
  'use strict';

  var constants = require('./constants');
  var size = constants.mapSize;
  var styles = constants.stylesDictionary;
  var BattleField = require('./battleField');

  function BattleFieldVM(battleFieldNodeId) {
    self = this;
    self.id = battleFieldNodeId
    self.battleField = new BattleField();
    self.draw = draw;
    self.reDraw = draw;
    self.getElement = getElement;
    self.addShip = addShip;
    self.getCellClass = getCellClass;
  }

  function draw() {
    var self = this;
    var battleFieldElement = window.document.getElementById(this.id);
    battleFieldElement.innerHTML = '';
    battleFieldElement.classList.add(styles.map.main);
    for (var i = 0; i < size; i++) {
      var row = window.document.createElement('div');
      row.classList.add(styles.row.main);
      for (var j = 0; j < size; j++) {
        var cell = window.document.createElement('div');
        cell.classList.add(styles.cell.main);
        var idNum = (i * size + j);
        cell.classList.add(self.getCellClass(idNum));
        cell.id = idNum;
        row.appendChild(cell);
      }
      battleFieldElement.appendChild(row);
    }
  }

  function getCellClass(coordinate) {
    var status = this.battleField.getCellStatus(coordinate);
    //Todo check owner
    var hideShips = false;
    if (hideShips) {
      if (status === 'intact') {
        status = 'empty';
      }
    }
    return styles.cell[status];
  }

  function constructMap() {
    var fleet = constants.shipsCollection.slice(0);

  }

  function addShip(coords) {
    this.battleField.addShip(coords);
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
      markShip(numId, 'hit', 'destroyed');
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
  function markShip(coordinate, previousMark, newMark) {
    var shipCoordinates = battleField.getShip(coordinate).coordinates;
    shipCoordinates.forEach(function(numId) {
      var cell = window.document.getElementById(numId);
      cell.classList.remove(previousMark);
      cell.classList.add(newMark);
    });
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

  /**
   * Handles end of the game
   *
   * @return {void}
   */
  function gameOver() {
    console.log('Game over');
  }

  return BattleFieldVM;
})();
