/* eslint-env jasmine*/

'use strict';

var cu = require('../src/coordOperations');
var size = 3;
var index = 7;
var coordinates = [2, 1];
var center = [1, 1];
var leftTop = [0, 0];
var linearA = [[0, 0], [0, 1], [0, 2]];
var linearB = [[0, 0], [1, 0], [2, 0]];
var valid = [[0, 0], [1, 1]];
var invalid = [[-1, -1], [0, 0]];
var notLinear = [[0, 0], [0, 1], [1, 0]];
var rightBottom = [size - 1, size - 1];
var withGape = [[0, 0], [0, 2]];
var diagonal = [[0, 0], [1, 1], [2, 2]];
var angle = [[0, 0], [0, 1], [1, 1]];

describe('indexToCoord function ', function() {
  it('should convert index to coordinates array', function() {
    expect(cu.indexToCoord(index, size)).toEqual(coordinates);
  });
});

describe('coordToIndex function ', function() {
  it('should convert coordinates array to index', function() {
    expect(cu.coordToIndex(coordinates, size)).toEqual(index);
  });
});

describe('getNeighbourhood function', function() {
  it('should return aray with neighbours and cell', function() {
    var result = cu.getNeighbourhood(center, size, false);
    var expectation = [[2, 2], [2, 1], [2, 0],
                       [1, 2], [1, 1], [1, 0],
                       [0, 2], [0, 1], [0, 0]];
    expect(result).toEqual(expectation);
  });

  it('should operate with linearIndex in input', function() {
    var linearCenter = cu.coordToIndex(center, size);
    var result = cu.getNeighbourhood(linearCenter, size, false);
    var expectation = [[2, 2], [2, 1], [2, 0],
                       [1, 2], [1, 1], [1, 0],
                       [0, 2], [0, 1], [0, 0]];
    expect(result).toEqual(expectation);
  });

  it('should convert to linear format if specified', function() {
    var result = cu.getNeighbourhood(center, size, true);
    var expectation = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    expect(result).toEqual(expectation);
  });

  it('should not take elements out of bounds', function() {
    var resultA = cu.getNeighbourhood(leftTop, size, true);
    var resultB = cu.getNeighbourhood(rightBottom, size, true);
    var expectationA = [4, 3, 1, 0];
    var expectationB = [8, 7, 5, 4];
    expect(resultA).toEqual(expectationA);
    expect(resultB).toEqual(expectationB);
  });
});

describe('areConsistent function ', function() {
  it('should check cells to be in line', function() {
    expect(cu.areConsistent(linearA, size)).toEqual(true);
    expect(cu.areConsistent(linearB, size)).toEqual(true);
    expect(cu.areConsistent(notLinear, size)).toEqual(false);
    expect(cu.areConsistent(withGape, size)).toEqual(false);
    expect(cu.areConsistent(diagonal, size)).toEqual(false);
    expect(cu.areConsistent(angle, size)).toEqual(false);
  });
});

describe('areValid function ', function() {
  it('should check cells to be in bounds', function() {
    expect(cu.areValid(valid, size)).toEqual(true);
    expect(cu.areValid(invalid, size)).toEqual(false);
  });
});