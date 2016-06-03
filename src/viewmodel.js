/* eslint-env browser*/
module.exports = (function() {
  'use strict';
  // var battleField = require('./generator');
  // var settings = require('./settings');

  var constants = require('./constants');
  var size = constants.mapSize;

  var battleFieldElement = window.document.getElementById('battle-field');

  for (var i = 0; i < size; i++) {
    var row = window.document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < size; j++) {
      var cell = window.document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('empty');
      cell.id = (i * size + j);
      row.appendChild(cell);
    }
    battleFieldElement.appendChild(row);
    // battleFieldElement.addEventListener('click', makeShot);
  }

  var b = document.getElementsByTagName("body")[0];

  var newShip = window.document.createElement('div');
  newShip.className = "cell destroyed";
  newShip.draggable = true;

  newShip.addEventListener("dragstart", dragHandler);
  battleFieldElement.addEventListener("dragover", dragOverHandler);



  b.appendChild(newShip);
  console.log("stm");


  function adder (event) {
     alert('will add ship');
  }

  function dragHandler(e) {
    this.style.opacity = '0.4';
  }

  

  function dragOverHandler(e) {
    e.preventDefault();
    console.log(e.target.id);
  }
})();
