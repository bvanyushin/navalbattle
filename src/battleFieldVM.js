module.exports = (function() {
  'use strict';

  var constants = require('./constants');
  var size = constants.mapSize;
  var fleet = constants.shipsCollection.slice(0);
  var styles = constants.stylesDictionary;
  var BattleField = require('./battleField');
  var coordUtil = require('./coordOperations.js');

  BattleFieldVM.prototype.draw = draw;
  BattleFieldVM.prototype.reDraw = draw;
  BattleFieldVM.prototype.coordinateToId = coordinateToId;
  BattleFieldVM.prototype.idToCoordinate = idToCoordinate;
  BattleFieldVM.prototype.getCellClass = getCellClass;
  BattleFieldVM.prototype.highlightCells = highlightCells;

  /**
   * constructor
   *
   * @param {[type]} postfix [description]
   */
  function BattleFieldVM(postfix, battleField) {
    var bfvm = this;
    bfvm.postfix = postfix;
    bfvm.id = 'battle-field-' + postfix;
    bfvm.battleField = battleField;
  }

  /**
   * render battle field in node with id = "battlefield" + postfix
   *
   * @return void
   */
  function draw() {
    var bfvm = this;
    var battleFieldElement = window.document.getElementById(bfvm.id);
    if (!battleFieldElement) {
      return
    }
    battleFieldElement.innerHTML = '';
    battleFieldElement.classList.add(styles.map.main);
    for (var i = 0; i < size; i++) {
      var row = window.document.createElement('div');
      row.classList.add(styles.row.main);
      for (var j = 0; j < size; j++) {
        var cell = window.document.createElement('div');
        cell.classList.add(styles.cell.main);
        var idNum = (i * size + j);
        cell.classList.add(bfvm.getCellClass(idNum));
        cell.id = bfvm.coordinateToId(idNum);
        row.appendChild(cell);
      }
      battleFieldElement.appendChild(row);
    }
  }

  /**
   * Get class of cell in given coordinate
   *
   * @param  {Number} coordinate coordinate of cell in battlefield
   * @return {[type]}            [description]
   */
  function getCellClass(coordinate) {
    var bfvm = this;
    var status = bfvm.battleField.getCellStatus(coordinate);
    //Todo check owner
    var hideShips = false; //bfvm.postfix !== 'player';
    if (hideShips) {
      if (status === 'intact') {
        status = 'empty';
      }
    }
    return styles.cell[status];
  }

  /**
   * Generate id for the cell with given coordinate
   *
   * @param  {Number} coordinate coordinate of cell
   * @return {String}            id for cell prefix + coordinate
   */
  function coordinateToId(coordinate) {
    return this.postfix + ':' + coordinate;
  }

  /**
   * Get coordinate from cell id
   *
   * @param  {String} id id of cell (prefix + coordinate)
   * @return {Number}    coordinate of cell in battlefield
   */
  function idToCoordinate(id) {
    return parseInt(id.substr(this.postfix.length + 1), 10);
  }

  /**
   * Highlight cells with given coordinates
   *
   * @param  {Array} coordinates coordinates of cell to highlight
   * @return {void}
   */
  function highlightCells(coordinates) {
    var bfvm = this
    for (var i = 0; i < coordinates.length; i++) {
      var elm = window.document.getElementById(bfvm.coordinateToId(coordinates[i]));
      if (elm) {
        elm.classList.remove(styles.cell.empty);
        elm.classList.add(styles.cell.potential);
      }
    }
  }


  return BattleFieldVM;
})();
