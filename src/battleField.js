module.exports = (function() {
  'use strict';

  var Ship = require('./ship');
  var coordUtil = require('./coordOperations.js');

  /**
   * @constructor
   * @param {Number} size - size of one side of battle field
   */
  function BattleField(size) {
    this.size = size;
    this.cells = [];
    for (var i = 0; i < size * size; i++) {
      this.cells.push({
        ship: null
      });
    }
  }

  BattleField.prototype.addShip = addShip;
  BattleField.prototype.shot = shot;
  BattleField.prototype.getShip = getShip;

  /**
   * adds new ship to the map
   *
   * @param {Array} coords - cordinates of new ship
   */
  function addShip(coords) {
    var ship = new Ship(coords);
    for (var i = 0; i < coords.length; i++) {
      var linearCoordinate = coordUtil.coordToIndex(coords[i], this.size);
      this.cells[linearCoordinate].ship = ship;
    }
  }

  /**
   * makes a single shot to the cell with given coordinates
   *
   * @param  {Array} coord - coordinates of target cell
   * @return {String}    'hit', 'destroyed' or 'miss'
   */
  function shot(coord) {
    var ship = this.getShip(coord);
    if (ship) {
      ship.hit(coord);
      return ship.isDestroyed() ? 'destroyed' : 'hit';
    }
    return 'miss';
  }

  /**
   * looks for ship in given cell
   * @param  {Array} coord - coordinates of cell to inspect
   * @return {Object} - ship in current cell (null if no such)
   */
  function getShip(coord) {
    var linearCoordinate = coordUtil.coordToIndex(coord, this.size);
    return this.cells[linearCoordinate].ship;
  }

  return BattleField;
})();
