/* eslint-env jasmine*/

'use strict';

var cu = require('../src/coordOperations');
var size = 3;
var index = 7;
var coordinates = [2, 1];

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