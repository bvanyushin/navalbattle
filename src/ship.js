module.exports = (function() {
  'use strict';

  /**
   * creates an instance of Ship
   *
   * @constructor
   * @param {Array} coordinats - coordinates of ship
   */
  function Ship(coordinates) {
    var decks = [];
    for (var i = 0; i < coordinates.length; i++) {
      var deck = {
        coordinate: coordinates[i],
        destroyed: false
      };
      decks.push(deck);
    }
    this.decks = decks;
    this.coordinates = coordinates;
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
  function hit(coordinate) {
    for (var i = 0; i < this.decks.length; i++) {
      if (coordinate === this.decks[i].coordinate) {
        this.decks[i].destroyed = true;
        return;
      }
    }
  }

  return Ship;
})();
