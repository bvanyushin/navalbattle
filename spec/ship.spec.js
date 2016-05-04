/* eslint-env jasmine*/

var Ship = require('.././src/ship');
var ship;

describe('Ship class ', function() {
  beforeEach(function() {
    ship = new Ship([[1, 1], [1, 2]]);
  });

  describe('constructor ', function() {
    it('should create ship with coordinates ', function() {
      expect(ship.decks[0].coordinates).toEqual([1, 1]);
      expect(ship.decks[1].coordinates).toEqual([1, 2]);
    });

    it('should set all destroyed fields values to false', function() {
      expect(ship.decks[0].destroyed).toBe(false);
      expect(ship.decks[1].destroyed).toBe(false);
    });
  });

  describe('method isDestroyed ', function() {
    it('should return false when at least one deck is not destroyed',
      function() {
        ship.decks[0].destroyed = true;
        expect(ship.isDestroyed()).toBe(false);
      }
    );

    it('should return true when all decks are destroyed', function() {
      ship.decks[0].destroyed = true;
      ship.decks[1].destroyed = true;
      expect(ship.isDestroyed()).toBe(true);
    });
  });

  describe('method hit ', function() {
    it('should set destroyed status of deck to true', function() {
      ship.hit([1, 1]);
      expect(ship.decks[0].destroyed).toBe(true);
      expect(ship.decks[1].destroyed).toBe(false);
    });

    it('should not set destroyed status of deck to false', function() {
      ship.decks[0].destroyed = true;
      ship.hit([1, 1]);
      expect(ship.decks[0].destroyed).toBe(true);
      expect(ship.decks[1].destroyed).toBe(false);
    });
  });
});
