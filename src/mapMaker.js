module.exports = (function () {
  'use strict';

  var BattleField = require('./battleFieldVM');
  
  var battleField = new BattleField('battle-field-1');

  battleField.draw();

  // var battleFieldElement = battleField.getElement();
  // battleFieldElement.addEventListener("drop", dropHandler);
  // battleFieldElement.addEventListener("dragleave", dragLeaveHandler);
  // battleFieldElement.addEventListener("dragenter", dragEnterHandler);
  // battleFieldElement.addEventListener("dragover", dragOverHandler);



  // var b = document.getElementsByTagName("body")[0];
  // b.appendChild(prepareShip(2));

  // function prepareShip (size) {
  //   var newShip = window.document.createElement('div');
  //   var deckA = window.document.createElement('div');
  //   var deckB = window.document.createElement('div');
  //   deckA.className = "cell new";
  //   deckB.className = "cell new";
  //   newShip.appendChild(deckA);
  //   newShip.appendChild(deckB);
  //   newShip.draggable = true;
  //   newShip.size = size;
  //   newShip.direction = 'h';
  //   newShip.addEventListener("dragstart", dragStartHandler);
  //   return newShip;
  // }


  // function dragStartHandler(evt) {
  //   this.style.opacity = '0.4';
  //   evt.dataTransfer.setData('size', this.size);
  //   evt.dataTransfer.setData('direction', this.direction);
  // }

  // function dragEnterHandler(e) {
  //   var decks = e.dataTransfer.getData("size");
  //   var id = e.target.id;
  // }

  // function dragLeaveHandler(e) {
  //   var decks = e.dataTransfer.getData("size");
  //   var id = e.target.id;

  //   console.log('I will reset styles to cell ' + id + ' and ' + decks + ' decks');
  // }

  // function dropHandler(e) {
  //   var decks = e.dataTransfer.getData("size");
  //   var id = parseInt(e.target.id);
  //   battleField.addShip([id, id + 1])
  //   battleField.reDraw();
  // }

  // function dragEndHandler(e) {
  //   console.log('nothing to do here')
  // }
  

  // function dragOverHandler(e) {
  //   e.preventDefault();
  // }

  // function dragEndHandler(e) {

  // }
})();
