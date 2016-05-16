module.exports = (function() {
  'use strict';

  var cordinatesOperations = {
    getNeighbourhood: getNeighbourhood,
    areValid: areValid,
    areConsistent: areConsistent
  };

  /**
   * returns all neighbours of cell, including cell in bounds of given size
   *
   * @param  {Array}  coordinate     - coordinate of cell (linear or 2D)
   * @param  {Number} size           - side of 2D map
   * @return {Array}                - array of cells next to given coordinates
   */
  function getNeighbourhood(coordinate, size) {
    var output = [];
    var x = Math.floor(coordinate / size);
    var y = coordinate % size;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        output.push((x - i) * size + y - j);
      }
    }
    output = output.filter(function(e) {
      return !(e < 0 || e >= size * size - 1);
    });
    return output;
  }

  /**
   * checks if given coordinates are in bounds of map
   *
   * @param  {Array} coords - coordinates to check
   * @param  {Number} size  - size of map
   * @return {Boolean}      - true if coordinates are in bounds
   */
  function areValid(coords, size) {
    for (var i = 0; i < coords.length; i++) {
      if (coords[i] < 0 ||
          coords[i] >= size * size - 1) {
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
    if (coords.length === 1) {
      return true;
    }
    coords.sort(function(a, b) {
      return a - b;
    });
    var i;
    for (i = 1; i < coords.length; i++) {
      var diff = coords[i] - coords[i - 1];
      if ((diff !== size) && (diff !== 1)) {
        return false;
      }
    }
    for (i = 1; i < coords.length - 1; i++) {
      var prevDiff = coords[i] - coords[i - 1];
      var nextDiff = coords[i + 1] - coords[i];
      if (prevDiff !== nextDiff) {
        return false;
      }
    }
    return true;
  }

  return cordinatesOperations;
})();
