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
  BattleField.prototype.shipCanBeAdded = shipCanBeAdded;

  /**
   * adds new ship to the map
   *
   * @param {Array} coords - cordinates of new ship
   * @return {void}
   */
  function addShip(coords) {
    if (!this.shipCanBeAdded(coords)) {
      return;
    }
    var ship = new Ship(coords);
    for (var i = 0; i < coords.length; i++) {
      this.cells[coords[i]].ship = ship;
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
    return this.cells[coord].ship;
  }

  /**
   * checks if ship can be added in given coordinates
   *
   * @param  {Array} coords - coordinates to inspect
   * @return {Boolean}      - true if can be added
   */
  function shipCanBeAdded(coords) {
    var self = this;
    if (!coordUtil.areValid(coords, self.size)) {
      return false;
    }
    if (!coordUtil.areConsistent(coords, self.size)) {
      return false;
    }
    for (var i = 0; i < coords.length; i++) {
      var neighbours = coordUtil.getNeighbourhood(coords[i], self.size);
      for (var j = 0; j < neighbours.length; j++) {
        if (self.getShip(neighbours[j])) {
          return false;
        }
      }
    }
    return true;
  }

  return BattleField;
})();
