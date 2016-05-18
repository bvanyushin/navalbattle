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
   * @param  {Number}  coordinate     - coordinate of cell (linear or 2D)
   * @param  {Number} size            - side of 2D map
   * @return {Array}                 - array of cells next to given coordinates
   */
  function getNeighbourhood(coordinate, size) {
    var output = [];
    var x = Math.floor(coordinate / size);
    var y = coordinate % size;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (x - i < size &&
            x - i >= 0 &&
            y - j < size &&
            y - j >= 0) {
          output.push((x - i) * size + y - j);
        }
      }
    }
    output = output.filter(function(e) {
      return !(e < 0 || e >= size * size);
    });
    return output;
  }

  /**
   * checks if given coordinates are in bounds of map
   *
   * @param  {Array} coordinates - coordinates to check
   * @param  {Number} size  - size of map
   * @return {Boolean}      - true if coordinates are in bounds
   */
  function areValid(coordinates, size) {
    for (var i = 0; i < coordinates.length; i++) {
      if (coordinates[i] < 0 ||
          coordinates[i] >= size * size) {
        return false;
      }
    }
    return true;
  }

  /**
   * checks if given coordinate make a continious line
   *
   * @param  {Array} coordinates - coordinates to check
   * @param  {Number} size  - size of map
   * @return {Boolean}       - true if coorfinates make a line
   */
  function areConsistent(coordinates, size) {
    coordinates.sort(function(a, b) {
      return a - b;
    });
    var i;
    for (i = 1; i < coordinates.length; i++) {
      var diff = coordinates[i] - coordinates[i - 1];
      if ((diff !== size) && (diff !== 1)) {
        return false;
      }
    }
    for (i = 1; i < coordinates.length - 1; i++) {
      var prevDiff = coordinates[i] - coordinates[i - 1];
      var nextDiff = coordinates[i + 1] - coordinates[i];
      if (prevDiff !== nextDiff) {
        return false;
      }
    }
    return true;
  }

  return cordinatesOperations;
})();
