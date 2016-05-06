module.exports = (function() {
  'use strict';

  /**
   * creates an instance of Ship
   *
   * @constructor
   * @param {Array} coords - coordinates of ship
   */
  function Ship(coords) {
    var decks = [];
    for (var i = 0; i < coords.length; i++) {
      var deck = {
        coordinates: coords[i],
        destroyed: false
      };
      decks.push(deck);
    }
    this.decks = decks;
  }

  Ship.prototype.isDestroyed = isDestroyed;
  Ship.prototype.hit = hit;

  /**
   * @return {Boolean} - true if all decks in ship are destroyed
   */
  function isDestroyed() {
    return this.decks.reduce(function(prev, current) {
      return prev && current.destroyed;
    }, true);
  }

  /**
   * @param  {Array} coord - coordinates of deck to destroy
   * @return {void}
   */
  function hit(coord) {
    for (var i = 0; i < this.decks.length; i++) {
      if (areCoordsEqual(this.decks[i].coordinates, coord)) {
        this.decks[i].destroyed = true;
        return;
      }
    }
  }

  /**
   * @param {Array} a - first array to compare
   * @param {Array} b - second array to compare
   * @return {Boolean} - true if coordinates are equal
   */
  function areCoordsEqual(a, b) {
    if (!a || !b) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return Ship;
})();
