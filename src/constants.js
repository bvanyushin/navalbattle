module.exports = (function() {
  var stylesDictionary = {
    map: {
      main: 'noclass'
    },
    cell: {
      main: 'map__cell',
      empty: 'map__cell--empty',
      damaged: 'map__cell--damaged',
      destroyed: 'map__cell--destroyed',
      miss: 'map__cell--miss',
    },
    ship: {
      main: 'ship',
    },
    deck: {
      new: 'ship__deck--colored'
    },
    row: {
      main: 'row'
    }
  }
  var constants = {
    mapSize: 10,
    shipsCollection: [0, 4, 3, 2, 1],
    stylesDictionary: stylesDictionary
  };
  return constants;
})();
