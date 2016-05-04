/* eslint-env browser*/
module.exports = (function() {
  'use strict';

  var battleField = window.document.getElementById('battle-field');
  var classes = ['empty', 'miss', 'hit', 'destroyed'];
  for (var i = 0; i < 10; i++) {
    var row = window.document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < 10; j++) {
      var cell = window.document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add(classes[i % 4]);
      row.appendChild(cell);
    }
    battleField.appendChild(row);
  }
})();
