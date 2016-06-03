/* eslint-env jasmine*/

var Ship = require('../src/ship');
var ship;

describe('Ship class ', function() {
  beforeEach(function() {
    ship = new Ship([11, 12]);
  });

  describe('constructor ', function() {
    it('should create ship with coordinates ', function() {
      expect(ship.decks[0].coordinate).toEqual(11);
      expect(ship.decks[1].coordinate).toEqual(12);
    });

    it('should set all damaged fields values to false', function() {
      expect(ship.decks[0].damaged).toBe(false);
      expect(ship.decks[1].damaged).toBe(false);
    });

    it('should store coordinates array', function() {
      expect(ship.coordinates).toEqual([11, 12]);
    });
  });

  describe('method isDestroyed ', function() {
    it('should return false when at least one deck is not damaged',
      function() {
        ship.decks[0].damaged = true;
        expect(ship.isDestroyed()).toBe(false);
      }
    );

    it('should return true when all decks are damaged', function() {
      ship.decks[0].damaged = true;
      ship.decks[1].damaged = true;
      expect(ship.isDestroyed()).toBe(true);
    });
  });

  describe('method damage ', function() {
    it('should set damaged status of deck to true', function() {
      ship.damage(11);
      expect(ship.decks[0].damaged).toBe(true);
      expect(ship.decks[1].damaged).toBe(false);
    });

    it('should not set damaged status of deck to false', function() {
      ship.decks[0].damaged = true;
      ship.damage(11);
      expect(ship.decks[0].damaged).toBe(true);
      expect(ship.decks[1].damaged).toBe(false);
    });
  });
});
