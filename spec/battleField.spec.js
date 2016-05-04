/* eslint-env jasmine*/
'use strict';

var BattleField = require('../src/battleField');
var battleField;
var size;

describe('BattleField class ', function() {
  beforeEach(function() {
    size = 3;
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
      battleField.addShip([[0, 0], [0, 1]]);
      expect(battleField.cells[0].ship).toBeDefined;
      expect(battleField.cells[0].ship).toEqual(battleField.cells[1].ship);
    });
  });

  describe('method getShip ', function() {
    it('should answer if there is a ship in cell', function() {
      battleField.addShip([[0, 0], [0, 1]]);
      expect(battleField.getShip([0, 0])).toBe.Truthy;
      expect(battleField.getShip([1, 0])).toBe.Falsy;
    });
  });

  describe('method shot ', function() {
    it('should return "hit" if ship hit, but not destroyed', function() {
      battleField.addShip([[0, 0], [0, 1]]);
      var shot = battleField.shot([0, 0]);
      expect(shot).toEqual('hit');
    });

    it('should return "destroyed" if ship destroyed', function() {
      battleField.addShip([[0, 0]]);
      var shot = battleField.shot([0, 0]);
      expect(shot).toEqual('destroyed');
    });

    it('should return "miss" if there is no ship', function() {
      battleField.addShip([[0, 0]]);
      var shot = battleField.shot([0, 1]);
      expect(shot).toEqual('miss');
    });
  });
});
