module.exports = (function() {
  'use strict';

  var constants = require('./constants');
  var size = constants.mapSize;
  var fleet = constants.shipsCollection.slice(0);
  var styles = constants.stylesDictionary;
  var BattleField = require('./battleField');
  var coordUtil = require('./coordOperations.js');

  var capturedDeckId = 'unchanged';
  var draggedElement = null;


  /**
   * constructor
   *
   * @param {[type]} prefix [description]
   */
  function BattleFieldVM(prefix) {
    var self = this;
    self.prefix = prefix;
    self.id = 'battle-field-' + prefix;
    self.battleField = new BattleField();
  }

  BattleFieldVM.prototype.draw = draw;
  BattleFieldVM.prototype.generate = generate;
  BattleFieldVM.prototype.reDraw = draw;
  BattleFieldVM.prototype.getCellClass = getCellClass;
  BattleFieldVM.prototype.addShip = addShip;
  BattleFieldVM.prototype.coordinateToId = coordinateToId;
  BattleFieldVM.prototype.idToCoordinate = idToCoordinate;

  BattleFieldVM.prototype.constructMap = initMapConstructor;
  BattleFieldVM.prototype.constructorCycle = constructorCycle;
  BattleFieldVM.prototype.finishMapConstructor = finishMapConstructor;
  BattleFieldVM.prototype.addConstructorListeners = addConstructorListeners;

  BattleFieldVM.prototype.addDragListeners = addDragListeners;
  BattleFieldVM.prototype.getShipCoordinatesFromEvent = getShipCoordinatesFromEvent;
  BattleFieldVM.prototype.highlightShip = highlightShip;

  /**
   * render battle field in node with id = "dattlefield" + prefix
   *
   * @return void
   */
  function draw() {
    var self = this;
    var battleFieldElement = window.document.getElementById(self.id);
    battleFieldElement.innerHTML = '';
    battleFieldElement.classList.add(styles.map.main);
    for (var i = 0; i < size; i++) {
      var row = window.document.createElement('div');
      row.classList.add(styles.row.main);
      for (var j = 0; j < size; j++) {
        var cell = window.document.createElement('div');
        cell.classList.add(styles.cell.main);
        var idNum = (i * size + j);
        cell.classList.add(self.getCellClass(idNum));
        cell.id = self.coordinateToId(idNum);
        row.appendChild(cell);
      }
      battleFieldElement.appendChild(row);
    }
  }

  function generate() {
    var self = this;
    self.battleField.generate();
    self.reDraw();
  }

  function getCellClass(coordinate) {
    var self = this;
    var status = self.battleField.getCellStatus(coordinate);
    //Todo check owner
    var hideShips = false;//self.prefix !== 'player';
    if (hideShips) {
      if (status === 'intact') {
        status = 'empty';
      }
    }
    return styles.cell[status];
  }

  function addShip(coords) {
    this.battleField.addShip(coords);
  }

  function coordinateToId(coordinate) {
    return this.prefix + ':' + coordinate;
  }

  function idToCoordinate(id) {
    return parseInt(id.substr(this.prefix.length + 1), 10);
  }

  function initMapConstructor() {
    var self = this;
    var dock = window.document.getElementsByClassName(styles.dock.main)[0];
    dock.classList.remove('hidden');
    self.addConstructorListeners();
    self.constructorCycle(dock);
  }

  function constructorCycle() {
    var self = this;
    var dock = window.document.getElementsByClassName(styles.dock.main)[0];
    dock.innerHTML = '';
    var size = fleet.pop();
    if (size) {
      var shipV = shipFactory(size, 'vertical');
      self.addDragListeners(shipV);
      
      dock.appendChild(shipV);
      if (size > 1) {
        var shipH = shipFactory(size, 'horizontal');
        self.addDragListeners(shipH);
        dock.appendChild(shipH);
      }
    } else {
      self.finishMapConstructor(dock);
    }
  }

  function finishMapConstructor() {
    var dock = window.document.getElementsByClassName(styles.dock.main)[0];
    dock.innerHTML = '';
    dock.classList.add('hidden');
  }

  function addDragListeners(element) {
    var self = this
    element.addEventListener("dragstart", dragStartHandler);
    element.addEventListener("dragend", dragEndHandler);

    function dragEndHandler(evt) {
      self.reDraw();
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
  }

  function addConstructorListeners() {
    var self = this;
    var battleField = window.document.getElementById(self.id);
    battleField.addEventListener("drop", dropHandler);
    battleField.addEventListener("dragleave", dragLeaveHandler);
    battleField.addEventListener("dragenter", dragEnterHandler);
    battleField.addEventListener("dragover", dragOverHandler);

    function dragLeaveHandler(evt) {
      self.reDraw();
    }

    function dropHandler(evt) {
      var coordinates = self.getShipCoordinatesFromEvent(evt);
      if (self.battleField.shipCanBeAdded(coordinates)) {
        self.battleField.addShip(coordinates);
        self.constructorCycle();
      }
      self.reDraw();
    }

    function dragEnterHandler(evt) {
      self.highlightShip(self.getShipCoordinatesFromEvent(evt));    
    }
    
    function dragOverHandler(e) {
      e.preventDefault();
    }
  }

  function getShipCoordinatesFromEvent(evt) {
    var self = this;
    var direction = evt.dataTransfer.getData('direction');
    var decksCount = evt.dataTransfer.getData('decksCount');
    var currentDeck = evt.dataTransfer.getData('currentDeck');
    var position = self.idToCoordinate(evt.target.id);
    return coordUtil.getAllCoordinates(direction, decksCount, currentDeck, position);
  }

  function highlightShip(coordinates) {
    var self = this
    for (var i = 0; i < coordinates.length; i++) {
      var elm = window.document.getElementById(self.coordinateToId(coordinates[i]));
      if (elm) {
        elm.classList.remove(styles.cell.empty);
        elm.classList.add(styles.cell.potential);
      }
    }
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
      deck.addEventListener('mousedown', function(e) {
        capturedDeckId = this.id;
      })
      ship.appendChild(deck);
    }
    return ship;
  }

  return BattleFieldVM;
})();
