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
  BattleField.prototype.getShipArea = getShipArea;
  BattleField.prototype.shipCanBeAdded = shipCanBeAdded;
  BattleField.prototype.thisIsTheEnd = thisIsTheEnd;

  /**
   * adds new ship to the map
   *
   * @param {Array} coordinates - cordinates of new ship
   * @return {void}
   */
  function addShip(coordinates) {
    if (!this.shipCanBeAdded(coordinates)) {
      return;
    }
    var ship = new Ship(coordinates);
    for (var i = 0; i < coordinates.length; i++) {
      this.cells[coordinates[i]].ship = ship;
    }
  }

  /**
   * makes a single shot to the cell with given coordinate
   *
   * @param  {Number} coordinate - coordinates of target cell
   * @return {String}    'hit', 'destroyed' or 'miss'
   */
  function shot(coordinate) {
    var ship = this.getShip(coordinate);
    if (ship) {
      ship.hit(coordinate);
      return ship.isDestroyed() ? 'destroyed' : 'hit';
    }
    return 'miss';
  }

  /**
   * looks for ship in cell with given coordinate
   *
   * @param  {Number} coordinate - coordinate of cell to inspect
   * @return {Object} - ship in current cell (null if no such)
   */
  function getShip(coordinate) {
    return this.cells[coordinate].ship;
  }

  /**
   * Gets an area around ship located in given coordinate
   *
   * @param  {Number} coordinate coordinate of cell with ship
   * @return {Array}             array of cells coordinates
   */
  function getShipArea(coordinate) {
    var self = this;
    var area = [];
    var ship = self.getShip(coordinate);
    if (!ship) {
      return area;
    }
    var coordinates = ship.coordinates;
    for (var i = 0; i < coordinates.length; i++) {
      var neighbours = coordUtil.getNeighbourhood(coordinates[i], self.size);
      area = area.concat(neighbours);
    }
    return area.filter(function(element) {
      return coordinates.indexOf(element) < 0;
    });
  }

  /**
   * checks if ship can be added in given coordinates
   *
   * @param  {Array} coordinates - coordinates to inspect
   * @return {Boolean}      - true if can be added
   */
  function shipCanBeAdded(coordinates) {
    var self = this;
    if (!coordUtil.areValid(coordinates, self.size)) {
      return false;
    }
    if (!coordUtil.areConsistent(coordinates, self.size)) {
      return false;
    }
    for (var i = 0; i < coordinates.length; i++) {
      var neighbours = coordUtil.getNeighbourhood(coordinates[i], self.size);
      for (var j = 0; j < neighbours.length; j++) {
        if (self.getShip(neighbours[j])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if all ships are destroyed
   *
   * @return {Boolean} true if every ship on map is destroyed
   */
  function thisIsTheEnd() {
    // Beautiful friend
    var self = this;
    for (var i = 0; i < self.cells.length; i++) {
      if (self.cells[i].ship && !self.cells[i].ship.isDestroyed()) {
        return false;
      }
    }
    return true;
  }

  return BattleField;
})();
