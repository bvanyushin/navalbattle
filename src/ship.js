module.exports = (function() {
  'use strict';

  /**
   * creates an instance of Ship
   *
   * @constructor
   * @param {Array} coordinates - coordinates of ship
   */
  function Ship(coordinates) {
    var decks = [];
    for (var i = 0; i < coordinates.length; i++) {
      var deck = {
        coordinate: coordinates[i],
        damaged: false
      };
      decks.push(deck);
    }
    this.decks = decks;
    this.coordinates = coordinates;
  }

  Ship.prototype.isDestroyed = isDestroyed;
  Ship.prototype.damage = damage;

  /**
   * @return {Boolean} - true if all decks in ship are destroyed
   */
  function isDestroyed() {
    return this.decks.reduce(function(prev, current) {
      return prev && current.damaged;
    }, true);
  }

  /**
   * @param  {Array} coordinate - coordinates of deck to destroy
   * @return {void}
   */
  function damage(coordinate) {
    for (var i = 0; i < this.decks.length; i++) {
      if (coordinate === this.decks[i].coordinate) {
        this.decks[i].damaged = true;
        return;
      }
    }
  }

  /**
   * returns status of current deck of ship
   * 
   * @param  {Number} coordinate - index of deck on the map
   * @return {String}            - Current status of deck
   */
  function getDeckStatus(coordinate) {
    if (this.isDestroyed()) {
      return 'destroyed';
    }
    for (var i = 0; i < this.decks.length; i++) {
      if (this.decks[i].coordinate = coordinate) {
        return decks[i].damaged ? 'damaged' : 'intact';
      }
    }
    return 'something bad happened!';
  }

  return Ship;
})();
