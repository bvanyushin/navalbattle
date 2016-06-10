module.exports = (function () {

  'use strict';
  
  var mapConstructor = {
    auto: autoConstruct,
    manual: manualConstructor
  };


  var constants = require('./constants');
  var size = constants.mapSize;
  var coordUtil = require('./coordOperations.js');

  function autoConstruct(battleField) {
    var x;
    var y;
    var coords = [];

    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    battleField.addShip(coords);
    console.log(coords);

    coords = [];
    x = Math.floor(Math.random() * 4 + 5);
    y = Math.floor(Math.random() * 4);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    battleField.addShip(coords);
    console.log(coords);

    coords = [];
    x = Math.floor(Math.random() * 4 + 5);
    y = Math.floor(Math.random() * 4 + 5);
    coords.push(x * size + y);
    coords.push(x * size + y + 1);
    battleField.addShip(coords);
    console.log(coords);
  }

  function manualConstructor(battleField) {
    var BattleFieldVM = require('./battleFieldVM.js');
    var styles = constants.stylesDictionary;
    var fleet = constants.shipsCollection.slice(0);
    var world = window.document.getElementById('world');
    
    var sandBox = window.document.createElement('div');
    sandBox.id = 'battle-field-constructor';
    var dock = window.document.createElement('div');
    var viewModel = new BattleFieldVM('constructor', battleField);

    var okButton = window.document.createElement('button');
    var resetButton = window.document.createElement('button');
    var autoGenerateButton = window.document.createElement('button');

    resetButton.innerText = 'Сбросить';
    resetButton.addEventListener('click', function() {
      dock.classList.remove(styles.hidden);
      fleet = constants.shipsCollection.slice(0);
      battleField.reset();
      viewModel.reDraw()
      constructorCycle()
    });
    autoGenerateButton.innerText = 'Сгенерировать';
    autoGenerateButton.addEventListener('click', function() {
      battleField.reset();
      autoConstruct(battleField);
      viewModel.reDraw()
      finishMapConstructor();
    });
    okButton.classList.add(styles.hidden);
    okButton.innerText = "OK";
    okButton.addEventListener("click", (function(evt) {
      world.removeChild(sandBox);
      world.removeChild(dock);
      world.removeChild(okButton);
      world.removeChild(resetButton);
      world.removeChild(autoGenerateButton);
    }));

    var capturedDeckId;
    var draggedElement;

    dock.classList.add(styles.dock.main);

    world.appendChild(sandBox);
    world.appendChild(dock);
    world.appendChild(resetButton);
    world.appendChild(autoGenerateButton);
    world.appendChild(okButton);

    viewModel.draw();
    addConstructorListeners();
    constructorCycle()

    function constructorCycle() {
      dock.innerHTML = '';
      var size = fleet.pop();
      if (size) {
        var shipV = shipFactory(size, 'vertical');
        addDragListeners(shipV);
        dock.appendChild(shipV);
        if (size > 1) {
          var shipH = shipFactory(size, 'horizontal');
          addDragListeners(shipH);
          dock.appendChild(shipH);
        }
      } else {
        finishMapConstructor();
      }
    }

    function addConstructorListeners() {
      sandBox.addEventListener("drop", dropHandler);
      sandBox.addEventListener("dragleave", dragLeaveHandler);
      sandBox.addEventListener("dragenter", dragEnterHandler);
      sandBox.addEventListener("dragover", dragOverHandler);
    }

    function dropHandler(evt) {
      var coordinates = getShipCoordinatesFromEvent(evt);
      if (battleField.shipCanBeAdded(coordinates)) {
        battleField.addShip(coordinates);
        constructorCycle();
      }
      viewModel.reDraw();
    }

    function dragLeaveHandler(evt) {
      viewModel.reDraw();
    }

    function dragEnterHandler(evt) {
      viewModel.highlightCells(getShipCoordinatesFromEvent(evt));    
    }
    
    function dragOverHandler(evt) {
      evt.preventDefault();
    }

    function getShipCoordinatesFromEvent(evt) {
      var direction = evt.dataTransfer.getData('direction');
      var decksCount = evt.dataTransfer.getData('decksCount');
      var currentDeck = evt.dataTransfer.getData('currentDeck');
      var position = viewModel.idToCoordinate(evt.target.id);
      return coordUtil.getAllCoordinates(direction, decksCount, currentDeck, position);
    }

    function addDragListeners(element) {
      element.addEventListener("dragstart", dragStartHandler);
      element.addEventListener("dragend", dragEndHandler);
    }

    function dragEndHandler(evt) {
      viewModel.reDraw();
      draggedElement.style.opacity = '1';
    }

    function dragStartHandler(evt) {
      draggedElement = this;
      draggedElement.style.opacity = '0.4';
      var dragParams = capturedDeckId.split('-');
      evt.dataTransfer.setData('direction', dragParams[0]);
      evt.dataTransfer.setData('decksCount', dragParams[1]);
      evt.dataTransfer.setData('currentDeck', dragParams[2]);
    }

    function shipFactory(size, direction) {
      var ship = window.document.createElement('div');
      ship.classList.add(styles.ship.main);
      ship.classList.add(styles.ship[direction]);
      ship.draggable = true;
      for (var i = 0; i < size; i++) {
        var deck = window.document.createElement('div');
        deck.classList.add(styles.deck.main);
        deck.classList.add(styles.deck.new);
        deck.id = direction[0] + '-' + size + '-' + i;
        deck.addEventListener('mousedown', function(evt) {
          capturedDeckId = this.id;
        })
        ship.appendChild(deck);
      }
      return ship;
    }

    function finishMapConstructor() {
      dock.classList.add('hidden');
      okButton.classList.remove('hidden');
    }
  }

  return mapConstructor;
})();
