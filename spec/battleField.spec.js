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
      var shipA = battleField.getShip(0);
      var shipB = battleField.getShip(1);
      expect(shipA).toBeDefined();
      expect(shipA).toEqual(shipB);
    });
  });

  describe('method getShip ', function() {
    it('should answer if there is a ship in cell', function() {
      battleField.addShip([0, 1]);
      expect(battleField.getShip(0)).toBeTruthy();
      expect(battleField.getShip(10)).toBeFalsy();
    });
  });

  describe('method getShipArea ', function() {
    it('should return indexes around given except given', function() {
      battleField.addShip([11]);
      var expectedArea = [22, 21, 20, 12, 10, 2, 1, 0];
      expect(battleField.getShipArea(11)).toEqual(expectedArea);
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
      var onEmptyMap = battleField.shipCanBeAdded([1]);
      battleField.addShip([1]);
      var onBusyCells = battleField.shipCanBeAdded([1]);
      var onEmptyCellsNoNeighbours = battleField.shipCanBeAdded([3, 4]);
      var onEmptyCellsWithNeighbours = battleField.shipCanBeAdded([3, 2]);

      expect(onEmptyMap).toBeTruthy();
      expect(onEmptyCellsNoNeighbours).toBeTruthy();
      expect(onEmptyCellsWithNeighbours).toBeFalsy();
      expect(onBusyCells).toBeFalsy();
    });

    it('should answer false if coordinates are inapropriate', function() {
      var outOfBounds = battleField.shipCanBeAdded([-1, 0]);
      var withGape = battleField.shipCanBeAdded([0, 2]);
      var scattered = battleField.shipCanBeAdded([0, 11]);

      expect(scattered).toBeFalsy();
      expect(outOfBounds).toBeFalsy();
      expect(withGape).toBeFalsy();
    });
  });
  describe('method thisIsTheEnd ', function() {
    it('should answer if all ships are destroyed', function() {
      battleField.addShip([11]);
      var falsyResult = battleField.thisIsTheEnd();
      battleField.shot(11);
      var truthyResult = battleField.thisIsTheEnd();
      expect(falsyResult).toBe(false);
      expect(truthyResult).toBe(true);
    });
  });
});
