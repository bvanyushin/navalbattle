module.exports = (function() {
  'use strict';

  /**
   * @param {[type]}
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
   * @param  {[type]}
   * @return {[type]}
   */
  function hit(coords) {
    for (var i = 0; i < this.decks.length; i++) {
      if (areCoordsEqual(this.decks[i].coordinates, coords)) {
        this.decks[i].destroyed = true;
        return;
      }
    }
  }

  function areCoordsEqual(a, b) {
    if (!a || !b) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
    return true;
  }
  return Ship;
})();
