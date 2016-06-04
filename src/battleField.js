module.exports = (function() {
  'use strict';

  var Ship = require('./ship');
  var coordUtil = require('./coordOperations.js');
  var constants = require('./constants');
  var size = constants.mapSize;

  /**
   * @constructor
   */
  function BattleField() {
    var self = this;
    self.cells = [];
    for (var i = 0; i < size * size; i++) {
      self.cells.push({
        ship: null,
        hit: false
      });
    }
  }

  BattleField.prototype.addShip = addShip;
  BattleField.prototype.generate = generate;
  BattleField.prototype.shot = shot;
  BattleField.prototype.getShip = getShip;
  BattleField.prototype.getShipArea = getShipArea;
  BattleField.prototype.shipCanBeAdded = shipCanBeAdded;
  BattleField.prototype.thisIsTheEnd = thisIsTheEnd;
  BattleField.prototype.getCellStatus = getCellStatus;

  /**
   * adds new ship to the map
   *
   * @param {Array} coordinates - cordinates of new ship
   * @return {void}
   */
  function addShip(coordinates) {
    if (!this.shipCanBeAdded(coordinates)) {
      alert("can not add the ship here")
      return;
    }
    var ship = new Ship(coordinates);
    console.log(coordinates)
    for (var i = 0; i < coordinates.length; i++) {
      this.cells[coordinates[i]].ship = ship;
    }
  }

  function generate() {
    var self = this;
    var x;
    var y;
    var coords = [];

    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    self.addShip(coords);
    console.log(coords);

    coords = [];
    x = Math.floor(Math.random() * 4 + 5);
    y = Math.floor(Math.random() * 4);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    self.addShip(coords);
    console.log(coords);

    coords = [];
    x = Math.floor(Math.random() * 4 + 5);
    y = Math.floor(Math.random() * 4 + 5);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    self.addShip(coords);
    console.log(coords);

  }

  /**
   * makes a single shot to the cell with given coordinate
   *
   * @param  {Number} coordinate - coordinates of target cell
   * @return void
   */
  function shot(coordinate) {
    cells[coordinate].hit = true;
    var ship = this.getShip(coordinate);
    if (ship) {
      ship.damage(coordinate);
    }
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
      var neighbours = coordUtil.getNeighbourhood(coordinates[i]);
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
    if (!coordUtil.areValid(coordinates)) {
      return false;
    }
    if (!coordUtil.areConsistent(coordinates)) {
      return false;
    }
    for (var i = 0; i < coordinates.length; i++) {
      var neighbours = coordUtil.getNeighbourhood(coordinates[i]);
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

  //Todo write tests
  function getCellStatus(coordinate) {
    var ship = this.getShip(coordinate);
    if (ship) {
      return ship.getDeckStatus(coordinate);
    }
    return this.cells[coordinate].hit ? 'miss' : 'empty';
  }

  return BattleField;
})();
