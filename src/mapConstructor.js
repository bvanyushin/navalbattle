/* eslint-env browser*/
module.exports = (function() {
  'use strict';

  var mapConstructor = {
    auto: autoConstruct,
    manual: manualConstructor
  };

  var constants = require('./constants');
  var size = constants.mapSize;
  var coordUtil = require('./coordOperations.js');

  /**
   * simple stub for automatic placement of ships, to be enriched further
   * @param  {Object} battleField battliField object to generate map
   * @return {void}
   */
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

  /**
   * Manual constructor of map. Adds new battlefield to DOM, and some more elements
   * cleansup after constructing
   * @param  {Object} battleField battliField object to generate map
   * @return {void}
   */
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
    resetButton.addEventListener('click', resetBatleField);
    autoGenerateButton.innerText = 'Сгенерировать';
    autoGenerateButton.addEventListener('click', generateBattleField);
    okButton.classList.add(styles.hidden);
    okButton.innerText = "OK";
    okButton.addEventListener("click", submitBattlefield);

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
    constructorCycle();

    /**
     * Make an itteration in ship placement, creates DOM Nodes and
     * adds listeners to them
     * @return {void}
     */
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

    /**
     * Adds listeners to node node with battlefield
     * return {void}
     */
    function addConstructorListeners() {
      sandBox.addEventListener("drop", dropHandler);
      sandBox.addEventListener("dragleave", dragLeaveHandler);
      sandBox.addEventListener("dragenter", dragEnterHandler);
      sandBox.addEventListener("dragover", dragOverHandler);
    }

    // Drag-and-drop handlers

    /**
     * Adds ship to map to place where it was dropped
     * @param  {Object} evt drop event
     * @return {void}
     */
    function dropHandler(evt) {
      var coordinates = getShipCoordinatesFromEvent(evt);
      if (battleField.shipCanBeAdded(coordinates)) {
        battleField.addShip(coordinates);
        constructorCycle();
      }
      viewModel.reDraw();
    }

    /**
     * Redraws map after mouse leaved the cells
     * @return {void}
     */
    function dragLeaveHandler() {
      viewModel.reDraw();
    }

    /**
     * Highlightes cells where ship will be added
     * @param  {Object} evt drag event
     * @return {void}
     */
    function dragEnterHandler(evt) {
      viewModel.highlightCells(getShipCoordinatesFromEvent(evt));
    }

    /**
     * Allows dropping to map
     * @param  {Object} evt drag event
     * @return {void}
     */
    function dragOverHandler(evt) {
      evt.preventDefault();
    }

    /**
     * Gets coordinates of cells to highlight with respect to deck which was touched
     * @param  {Object} evt drag event
     * @return {Array.Numbers}     coordinates of cells to highlight
     */
    function getShipCoordinatesFromEvent(evt) {
      var direction = evt.dataTransfer.getData('direction');
      var decksCount = evt.dataTransfer.getData('decksCount');
      var currentDeck = evt.dataTransfer.getData('currentDeck');
      var position = viewModel.idToCoordinate(evt.target.id);
      return coordUtil.getAllCoordinates(direction,
                                         decksCount,
                                         currentDeck,
                                         position);
    }

    /**
     * Adds drag handlers to ship stub
     * @param {Object} element DOM Node to add handlers
     */
    function addDragListeners(element) {
      element.addEventListener("dragstart", dragStartHandler);
      element.addEventListener("dragend", dragEndHandler);
    }

    /**
     * Redraws map and restores look of dragged element after drag ends
     * @param  {Object} evt drag event
     * @return {void}
     */
    function dragEndHandler() {
      viewModel.reDraw();
      draggedElement.style.opacity = '1';
    }

    /**
     * Saves data to ship can be added properly
     * @param  {Object} evt drag event
     * @return {void}
     */
    function dragStartHandler(evt) {
      draggedElement = this;
      draggedElement.style.opacity = '0.4';
      var dragParams = capturedDeckId.split('-');
      evt.dataTransfer.setData('direction', dragParams[0]);
      evt.dataTransfer.setData('decksCount', dragParams[1]);
      evt.dataTransfer.setData('currentDeck', dragParams[2]);
    }

    /**
     * Creates a stub of ship to be added
     * @param  {Number} size      number of decks in ship
     * @param  {String} direction type of ship either vertical or horizontal
     * @return {Object} Dom node with stub of ship
     */
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
        deck.addEventListener('mousedown', rememberDraggedCell);
        ship.appendChild(deck);
      }
      return ship;
    }
    /**
     * Stores cell which was captured to drag ship stub
     * @return {void}
     */
    function rememberDraggedCell() {
      capturedDeckId = this.id;
    }

    /**
     * Finishes generating the map
     * @return {void}
     */
    function finishMapConstructor() {
      dock.classList.add('hidden');
      okButton.classList.remove('hidden');
    }

    // Button Handlers

    /**
     * Remove all added ships from the battlefield
     * @return {void}
     */
    function resetBatleField() {
      dock.classList.remove(styles.hidden);
      fleet = constants.shipsCollection.slice(0);
      battleField.reset();
      viewModel.reDraw();
      constructorCycle();
    }

    /**
     * Cleans up after end of generating process
     * @return {void}
     */
    function submitBattlefield() {
      world.removeChild(sandBox);
      world.removeChild(dock);
      world.removeChild(okButton);
      world.removeChild(resetButton);
      world.removeChild(autoGenerateButton);
    }

    /**
     * Run process of automatic generating map for current battlefield
     * @return {void}
     */
    function generateBattleField() {
      battleField.reset();
      autoConstruct(battleField);
      viewModel.reDraw();
      finishMapConstructor();
    }
  }

  return mapConstructor;
})();
