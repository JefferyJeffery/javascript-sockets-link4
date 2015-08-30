webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Link4 App JavaScript
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _gameController = __webpack_require__(2);
	
	var _gameController2 = _interopRequireDefault(_gameController);
	
	var _gameModel = __webpack_require__(3);
	
	var _gameModel2 = _interopRequireDefault(_gameModel);
	
	var _gameView = __webpack_require__(4);
	
	var _gameView2 = _interopRequireDefault(_gameView);
	
	(function () {
	  var hostname = location.protocol + "//" + location.hostname;
	  var port = window.location.port ? ':3000' : '';
	  var socket_host = hostname + port;
	
	  var socket = window.io ? window.io(socket_host) : null;
	  var app = new _gameController2['default'](socket, new _gameModel2['default'](), new _gameView2['default'](document, 'board'));
	
	  console.log('Looking for sockets at ' + socket_host);
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Link4App = (function () {
	  function Link4App(socket, game, view) {
	    _classCallCheck(this, Link4App);
	
	    this._socket = socket;
	    this._game = game;
	    this._view = view;
	
	    this._game.reset();
	
	    this._view.bind({
	      drop: this.drop.bind(this),
	      reset: this.reset.bind(this)
	    });
	
	    this._view.render(this._game);
	  }
	
	  _createClass(Link4App, [{
	    key: "drop",
	    value: function drop(column) {
	      this._game.drop(column);
	      this._view.render(this._game);
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this._game.reset();
	      this._view.render(this._game);
	    }
	  }]);
	
	  return Link4App;
	})();
	
	exports["default"] = Link4App;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Link4Game = (function () {
	  function Link4Game(force_first) {
	    _classCallCheck(this, Link4Game);
	
	    this.reset(force_first);
	  }
	
	  _createClass(Link4Game, [{
	    key: 'reset',
	    value: function reset(force_first) {
	      this._id = this._generateUUID();
	      this._columns = [];
	      this._history = [];
	      for (var i = 0; i < this.COLUMN_COUNT; i++) {
	        this._columns.push([]);
	      }
	      if (force_first == this.RED || force_first == this.BLACK) {
	        this._turn = force_first;
	      } else {
	        this._randomizeTurn();
	      }
	      this._start_turn = this.currentTurn();
	    }
	  }, {
	    key: 'drop',
	    value: function drop(column_index) {
	      var column = this._column(column_index);
	      if (column.length < this.ROW_COUNT && this.status() == this.STATUS_ACTIVE) {
	        column.push(this._turn);
	        this._history.push(column_index);
	        this._toggleTurn();
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'status',
	    value: function status() {
	      var winner = this.winner();
	      if (winner === this.RED) {
	        return this.RED;
	      } else if (winner === this.BLACK) {
	        return this.BLACK;
	      } else if (this.isTie()) {
	        return this.STATUS_TIE;
	      }
	      return this.STATUS_ACTIVE;
	    }
	  }, {
	    key: 'isActive',
	    value: function isActive() {
	      return this.status() != this.STATUS_ACTIVE;
	    }
	  }, {
	    key: 'isTie',
	    value: function isTie() {
	      for (var i = 0; i < this.COLUMN_COUNT; i++) {
	        if (this._columns[i].length < this.ROW_COUNT) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'winner',
	    value: function winner() {
	      return this._verticalWinner() || this._horizontalWinner() || this._slashWinner() || this._backslashWinner();
	    }
	  }, {
	    key: 'currentTurn',
	    value: function currentTurn() {
	      return this._turn;
	    }
	  }, {
	    key: 'at',
	    value: function at(column_index, row_index) {
	      var column = this._column(column_index);
	      if (row_index < column.length) {
	        return column[row_index];
	      }
	      return this.EMPTY;
	    }
	  }, {
	    key: 'serialize',
	    value: function serialize() {
	      var source = {
	        id: this._id,
	        start_turn: this._start_turn,
	        history: this._history,
	        status: this.status()
	      };
	      return JSON.stringify(source);
	    }
	  }, {
	    key: 'getStartingPlayer',
	    value: function getStartingPlayer() {
	      return this._start_turn;
	    }
	  }, {
	    key: 'getColumn',
	    value: function getColumn(column_index) {
	      return this._column(column_index).slice(0);
	    }
	  }, {
	    key: 'getHistory',
	    value: function getHistory() {
	      return this._history.slice(0);
	    }
	  }, {
	    key: 'debug',
	    value: function debug() {
	      console.log('Next -> ' + this.currentTurn());
	      console.log(this._columns);
	    }
	  }, {
	    key: '_verticalWinner',
	    value: function _verticalWinner() {
	      for (var i = 0; i < this.COLUMN_COUNT; i++) {
	        var winner = this._findSequence(this._columns[i], this.LINK_REQUIRED);
	        if (winner) {
	          return winner;
	        }
	      }
	      return null;
	    }
	  }, {
	    key: '_horizontalWinner',
	    value: function _horizontalWinner() {
	      for (var i = 0; i < this.ROW_COUNT; i++) {
	        var row = [];
	        for (var col = 0; col < this.COLUMN_COUNT; col++) {
	          row.push(this.at(col, i));
	        }
	        var winner = this._findSequence(row, this.LINK_REQUIRED);
	        if (winner) {
	          return winner;
	        }
	      }
	      return null;
	    }
	
	    // \ down to the right
	  }, {
	    key: '_slashWinner',
	    value: function _slashWinner() {
	      var slanted_grid = this._diagonals2();
	      for (var i = 0; i < slanted_grid.length; i++) {
	        var winner = this._findSequence(slanted_grid[i], this.LINK_REQUIRED);
	        if (winner) {
	          return winner;
	        }
	      }
	
	      return null;
	    }
	
	    // / up to the right
	  }, {
	    key: '_backslashWinner',
	    value: function _backslashWinner() {
	      var slanted_grid = this._diagonals1();
	      for (var i = 0; i < slanted_grid.length; i++) {
	        var winner = this._findSequence(slanted_grid[i], this.LINK_REQUIRED);
	        if (winner) {
	          return winner;
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: '_diagonals1',
	    value: function _diagonals1() {
	      var m = this.ROW_COUNT;
	      var n = this.COLUMN_COUNT;
	
	      var out = [];
	      for (var i = 1 - m; i < n; i++) {
	
	        var group = [];
	
	        for (var j = 0; j < m; j++) {
	          var col = i + j;
	          if (col >= 0 && col < n) {
	            group.push(this.at(col, j));
	          }
	        }
	
	        //if(group.length >= this.LINK_REQUIRED){
	        out.push(group);
	        //}
	      }
	      return out;
	    }
	  }, {
	    key: '_diagonals2',
	    value: function _diagonals2() {
	      var m = this.ROW_COUNT;
	      var n = this.COLUMN_COUNT;
	
	      var out = [];
	      for (var i = n + m - 2; i >= 0; i--) {
	
	        var group = [];
	
	        for (var j = 0; j < m; j++) {
	          var col = i - j;
	          if (col >= 0 && col < n) {
	            group.push(this.at(col, j));
	          }
	        }
	
	        //if(group.length >= this.LINK_REQUIRED){
	        out.push(group);
	        //}
	      }
	      return out;
	    }
	  }, {
	    key: '_findSequence',
	    value: function _findSequence(array, minLen) {
	      if (array.length < minLen) {
	        return false;
	      }
	      var cursor = '';
	      var count = 0;
	      for (var i = 0; i < array.length; i++) {
	        var remaining = array.length - i;
	        if (array[i] == this.EMPTY) {
	          count = 0;
	          cursor = array[i];
	        } else if (cursor !== array[i]) {
	          count = 1;
	          cursor = array[i];
	        } else {
	          count++;
	        }
	        if (count >= minLen) {
	          return cursor;
	        } else if (minLen - count > remaining) {
	          return false;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: '_randomizeTurn',
	    value: function _randomizeTurn() {
	      this._turn = Math.random() > 0.5 ? this.BLACK : this.RED;
	    }
	  }, {
	    key: '_toggleTurn',
	    value: function _toggleTurn() {
	      this._turn = this._turn == this.RED ? this.BLACK : this.RED;
	    }
	  }, {
	    key: '_column',
	    value: function _column(column_index) {
	      return this._columns[column_index];
	    }
	  }, {
	    key: '_generateUUID',
	    value: function _generateUUID() {
	      var d = new Date().getTime();
	      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = (d + Math.random() * 16) % 16 | 0;
	        d = Math.floor(d / 16);
	        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	      });
	      return uuid;
	    }
	  }]);
	
	  return Link4Game;
	})();
	
	exports['default'] = Link4Game;
	
	Link4Game.prototype.COLUMN_COUNT = 7;
	Link4Game.prototype.ROW_COUNT = 6;
	
	Link4Game.prototype.RED = 'R';
	Link4Game.prototype.BLACK = 'B';
	Link4Game.prototype.EMPTY = '_';
	Link4Game.prototype.STATUS_TIE = 'T';
	Link4Game.prototype.STATUS_ACTIVE = 'A';
	Link4Game.prototype.LINK_REQUIRED = 4;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Link4View = (function () {
	  function Link4View(document, boardSelector, callbacks) {
	    _classCallCheck(this, Link4View);
	
	    this._document = document;
	    this.boardSelector = boardSelector;
	  }
	
	  _createClass(Link4View, [{
	    key: 'render',
	    value: function render(model) {
	      var _this = this;
	
	      this._debugDiv().innerHTML = model.serialize();
	
	      var board = this.boardDiv();
	
	      var current_player_div = board.querySelector('.current_player');
	
	      var status = model.status();
	
	      if (status == model.STATUS_ACTIVE) {
	        current_player_div.innerHTML = 'Next: ' + this._currentPlayerName(model.currentTurn());
	      } else if (model.winner()) {
	        current_player_div.innerHTML = '' + this._currentPlayerName(model.winner()) + ' wins!';
	      } else {
	        current_player_div.innerHTML = 'Tie';
	      }
	
	      this._forEachElement('.dropper', function (dropper) {
	        _this._dropperView(dropper, model);
	      });
	
	      for (var row = 0; row < model.ROW_COUNT; row++) {
	        for (var col = 0; col < model.COLUMN_COUNT; col++) {
	          var board_row = board.querySelector('.board_row[data-row="' + row + '"]');
	          var state = model.at(col, row);
	          var cell = board_row.querySelector('.cell[data-column="' + col + '"]');
	          switch (state) {
	            case model.RED:
	              this._addClass('player_R', cell);
	              this._removeClass('player_B', cell);
	              break;
	            case model.BLACK:
	              this._addClass('player_B', cell);
	              this._removeClass('player_R', cell);
	              break;
	            default:
	              this._removeClass('player_R', cell);
	              this._removeClass('player_B', cell);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'boardDiv',
	    value: function boardDiv() {
	      return this._document.getElementById(this.boardSelector);
	    }
	  }, {
	    key: 'bind',
	    value: function bind(callbacks) {
	      var dropCallback = this._dropCallback.bind(this, callbacks.drop);
	
	      this._forEachElement('.dropper', function (dropper) {
	        dropper.addEventListener('click', dropCallback);
	      });
	
	      this._forEachElement('.cell', function (cell) {
	        cell.addEventListener('click', dropCallback);
	      });
	
	      var reset = this.boardDiv().querySelector('.reset');
	      reset.addEventListener('click', function (e) {
	        callbacks.reset();
	      });
	    }
	  }, {
	    key: '_dropperView',
	    value: function _dropperView(dropper, model) {
	      this._removeClass('next_R', dropper);
	      this._removeClass('next_B', dropper);
	      if (model.status() != model.STATUS_ACTIVE) {
	        dropper.disabled = true;
	      } else {
	        dropper.disabled = false;
	        switch (model.currentTurn()) {
	          case model.RED:
	            this._addClass('next_R', dropper);
	            break;
	          case model.BLACK:
	            this._addClass('next_B', dropper);
	            break;
	        }
	      }
	    }
	  }, {
	    key: '_currentPlayerName',
	    value: function _currentPlayerName(status) {
	      switch (status) {
	        case 'R':
	          return 'Stu';
	        case 'B':
	          return 'Dana';
	      }
	      return '-';
	    }
	  }, {
	    key: '_forEachElement',
	    value: function _forEachElement(selector, cb) {
	      var elements = this.boardDiv().querySelectorAll(selector);
	      for (var i = 0; i < elements.length; i++) {
	        cb.apply(this, [elements[i]]);
	      }
	    }
	  }, {
	    key: '_stateToCellContents',
	    value: function _stateToCellContents(state) {
	      if (state === '_') {
	        return '&nbsp;';
	      }
	      return state;
	    }
	  }, {
	    key: '_addClass',
	    value: function _addClass(classname, element) {
	      var cn = element.className;
	      //test for existance
	      if (cn.indexOf(classname) != -1) {
	        return;
	      }
	      //add a space if the element already has class
	      if (cn != '') {
	        classname = ' ' + classname;
	      }
	      element.className = cn + classname;
	    }
	  }, {
	    key: '_removeClass',
	    value: function _removeClass(classname, element) {
	      var cn = element.className;
	      var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
	      cn = cn.replace(rxp, '');
	      element.className = cn;
	    }
	  }, {
	    key: '_dropCallback',
	    value: function _dropCallback(cb, e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var column_index = parseInt(e.target.dataset.column);
	      if (!isNaN(column_index)) {
	        cb(column_index);
	      }
	    }
	  }, {
	    key: '_debugDiv',
	    value: function _debugDiv() {
	      return this.boardDiv().querySelector('.debug');
	    }
	  }, {
	    key: '_findAncestor',
	    value: function _findAncestor(el, cls) {
	      while ((el = el.parentElement) && !el.classList.contains(cls));
	      return el;
	    }
	  }]);
	
	  return Link4View;
	})();
	
	exports['default'] = Link4View;
	module.exports = exports['default'];

/***/ }
]);
//# sourceMappingURL=app.js.map