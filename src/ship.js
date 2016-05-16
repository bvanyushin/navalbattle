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
      if (coord === this.decks[i].coordinates) {
        this.decks[i].destroyed = true;
        return;
      }
    }
  }
  
  return Ship;
})();
