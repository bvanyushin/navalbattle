/* eslint-env jasmine*/

'use strict';

var cu = require('../src/coordOperations');
var constants = require('../src/constants');
var size = constants.mapSize;
var center = 11;
var leftTop = 0;
var linearA = [0, 1, 2];
var linearB = [0, 10, 20];
var unLinearA = [9, 10];
var valid = [0, 1];
var invalid = [-1, 0];
var notLinear = [0, 1, 10];
var rightBottom = [size * size - 1];
var withGape = [0, 2];
var diagonal = [0, 11, 22];
var angle = [0, 1, 11];

describe('getNeighbourhood function', function() {
  it('should return aray with neighbours and cell', function() {
    var result = cu.getNeighbourhood(center, size, false);
    var expectation = [22, 21, 20, 12, 11, 10, 2, 1, 0];
    expect(result).toEqual(expectation);
  });

  it('should not take elements out of bounds', function() {
    var resultA = cu.getNeighbourhood(leftTop, size);
    var resultB = cu.getNeighbourhood(rightBottom, size);
    var expectationA = [11, 10, 1, 0];
    var expectationB = [99, 98, 89, 88];
    expect(resultA).toEqual(expectationA);
    expect(resultB).toEqual(expectationB);
  });
});

describe('areConsistent function ', function() {
  it('should check cells to be in line', function() {
    expect(cu.areConsistent(linearA, size)).toEqual(true);
    expect(cu.areConsistent(linearB, size)).toEqual(true);
    expect(cu.areConsistent(unLinearA, size)).toEqual(false);
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

describe('getAllCoordinates function', function () {
  it('should return proper array of coordinates for vertical array', function () {
    var result = cu.getAllCoordinates('v', 3, 1, 55);
    expect(result).toEqual([45, 55, 65]);
  });

  it('should return proper array of coordinates for horizontal array', function () {
    var result = cu.getAllCoordinates('h', 3, 1, 55);
    expect(result).toEqual([54, 55, 56]);
  });
})
