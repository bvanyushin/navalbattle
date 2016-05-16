/* eslint-env jasmine*/
'use strict';

var BattleField = require('../src/battleField');
var battleField;
var size = 10;

describe('BattleField class ', function() {
  beforeEach(function() {
    battleField = new BattleField(size);
  });

  describe('constructor ', function() {
    it('should create field with proper num of cells ', function() {
      expect(battleField.cells.length).toEqual(size * size);
    });

    it('should store the size', function() {
      expect(battleField.size).toEqual(size);
    });
  });

  describe('method addShip ', function() {
    it('should add Ship with proper coordinates', function() {
      battleField.addShip([0, 1]);
      expect(battleField.cells[0].ship).toBeDefined;
      expect(battleField.cells[0].ship).toEqual(battleField.cells[1].ship);
    });
  });

  describe('method getShip ', function() {
    it('should answer if there is a ship in cell', function() {
      battleField.addShip([0, 1]);
      expect(battleField.getShip(0)).toBeTruthy;
      expect(battleField.getShip(10)).toBeFalsy;
    });
  });

  describe('method shot ', function() {
    it('should return "hit" if ship hit, but not destroyed', function() {
      battleField.addShip([0, 1]);
      var shot = battleField.shot(0);
      expect(shot).toEqual('hit');
    });

    it('should return "destroyed" if ship destroyed', function() {
      battleField.addShip([0]);
      var shot = battleField.shot(0);
      expect(shot).toEqual('destroyed');
    });

    it('should return "miss" if there is no ship', function() {
      battleField.addShip([0]);
      var shot = battleField.shot(1);
      expect(shot).toEqual('miss');
    });
  });

  describe('method shipCanBeAdded ', function() {
    it('should answer if a ship can be added to coordinates', function() {
      var onEmptyMap = battleField.shipCanBeAdded([0, 1]);
      battleField.addShip([0, 1]);
      var onBusyCells = battleField.shipCanBeAdded([0, 1]);
      var onEmptyCellsNoNeighbours = battleField.shipCanBeAdded([22, 21]);
      var onEmptyCellsWithNeighbours = battleField.shipCanBeAdded([11, 12]);

      expect(onEmptyMap).toBe.Truthy;
      expect(onEmptyCellsNoNeighbours).toBe(true);
      expect(onEmptyCellsWithNeighbours).toBe(false);
      expect(onBusyCells).toBe(false);
    });

    it('should answer false if coordinates are inapropriate', function() {
      var outOfBounds = battleField.shipCanBeAdded([[0, -1], [0, 1]]);
      var withGape = battleField.shipCanBeAdded([[0, 0], [0, 2]]);
      var scattered = battleField.shipCanBeAdded([[0, 0], [1, 1]]);

      expect(scattered).toBe(false);
      expect(outOfBounds).toBe(false);
      expect(withGape).toBe(false);
    });
  });
});
