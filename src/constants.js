module.exports = (function() {
  var stylesDictionary = {
    map: {
      main: 'map'
    },
    cell: {
      main: 'map__cell',
      empty: 'map__cell--empty',
      potential: 'map__cell--potential',
      damaged: 'map__cell--damaged',
      destroyed: 'map__cell--destroyed',
      miss: 'map__cell--miss',
      intact: 'map__cell--intact',
    },
    ship: {
      main: 'ship',
      vertical: 'ship--vertical',
      horizontal: 'ship--horizontal'
    },
    deck: {
      main: 'ship__deck',
      new: 'ship__deck--colored'
    },
    row: {
      main: 'row'
    },
    dock: {
      main: 'dock'
    }
  }
  var constants = {
    mapSize: 10,
    shipsCollection: [1, 2, 3, 4],
    stylesDictionary: stylesDictionary
  };
  return constants;
})();
