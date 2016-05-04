module.exports = (function() {
  'use strict';

  var cordinatesOperations = {
    indexToCoord: indexToCoord,
    coordToIndex: coordToIndex
  };

  /**
   * Converts linear coordinate to 2D coordinate
   *
   * @param  {Number} index - linear coordinate of cell
   * @param  {Number} size - side of 2D map
   * @return {Array}       - 2D coordinate of cell
   */
  function indexToCoord(index, size) {
    if (size === null ||
        index > size * size - 1) {
      return [-1, -1];
    }
    return [Math.floor(index / size), index % size];
  }

  /**
   * Converts 2D coordinate to linear coordinate
   *
   * @param  {[type]} coord - 2D coordinate of cell
   * @param  {[type]} size - side of 2D map
   * @return {[type]}      - linear coordinate of cell
   */
  function coordToIndex(coord, size) {
    if (coord[0] > size ||
        coord[0] < 0 ||
        coord[1] < 0 ||
        coord[1] > size) {
      return -1;
    }
    return coord[0] * size + coord[1];
  }

  return cordinatesOperations;
})();
