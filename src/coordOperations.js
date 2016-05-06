module.exports = (function() {
  'use strict';

  var cordinatesOperations = {
    indexToCoord: indexToCoord,
    coordToIndex: coordToIndex,
    getNeighbourhood: getNeighbourhood,
    areValid: areValid,
    areConsistent: areConsistent
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
   * @param  {Array}  coord - 2D coordinate of cell
   * @param  {Number} size - side of 2D map
   * @return {Number}      - linear coordinate of cell
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

  /**
   * returns all neighbours of cell, including cell in bounds of given size
   *
   * @param  {Array}  coordinate     - coordinate of cell (linear or 2D)
   * @param  {Number} size           - side of 2D map
   * @param  {Boolean} converToLinear - flag to convert to linear coordinates
   * @return {Array}                - array of cells next to given coordinates
   */
  function getNeighbourhood(coordinate, size, converToLinear) {
    if (typeof (coordinate) === 'number') {
      coordinate = indexToCoord(coordinate, size);
    }
    var output = [];
    var x = coordinate[0];
    var y = coordinate[1];
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        output.push([x - i, y - j]);
      }
    }
    output = output.filter(function(e) {
      return !(e[0] < 0 || e[0] >= size || e[1] < 0 || e[1] >= size);
    });
    if (!converToLinear) {
      return output;
    }
    return output.map(function(element) {
      return coordToIndex(element, size);
    });
  }

  /**
   * checks if given coordinates are in bounds of map
   *
   * @param  {Array} coords - coordinates to check
   * @param  {Number} size  - size of map
   * @return {Boolean}      - true if coordinates are in bounds
   */
  function areValid(coords, size) {
    if (typeof (coords[0]) === 'number') {
      coords = coords.map(function(e) {
        return indexToCoord(e, size);
      });
    }
    for (var i = 0; i < coords.length; i++) {
      if (coords[i][0] < 0 ||
          coords[i][1] < 0 ||
          coords[i][0] >= size ||
          coords[i][1] >= size) {
        return false;
      }
    }
    return true;
  }

  /**
   * checks if given coordinate make a continious line
   *
   * @param  {Array} coords - coordinates to check
   * @param  {Number} size  - size of map
   * @return {Boolean}       - true if coorfinates make a line
   */
  function areConsistent(coords, size) {
    if (!Array.isArray(coords[0])) {
      return -1;
    }
    if (coords.length === 1) {
      return true;
    }
    var linearCoordinates = coords.map(function(e) {
      return coordToIndex(e, size);
    });
    linearCoordinates.sort(function(a, b) {
      return a - b;
    });
    var i;
    for (i = 1; i < linearCoordinates.length; i++) {
      var diff = linearCoordinates[i] - linearCoordinates[i - 1];
      if ((diff !== size) && (diff !== 1)) {
        return false;
      }
    }
    for (i = 1; i < linearCoordinates.length - 1; i++) {
      var prevDiff = linearCoordinates[i] - linearCoordinates[i - 1];
      var nextDiff = linearCoordinates[i + 1] - linearCoordinates[i];
      if (prevDiff !== nextDiff) {
        return false;
      }
    }
    return true;
  }

  return cordinatesOperations;
})();
