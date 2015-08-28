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
	
	(function () {
	  var hostname = location.protocol + "//" + location.hostname;
	  var port = window.location.port ? ':3000' : '';
	  var socket_host = hostname + port;
	
	  var socket = io(socket_host);
	  var app = new _gameController2['default'](socket, new _gameModel2['default']());
	
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
	  function Link4App(socket, game) {
	    _classCallCheck(this, Link4App);
	
	    this._game = game;
	    this._game.debug();
	    this.drop(1);
	    this._game.debug();
	    this.drop(1);
	    this._game.debug();
	    this.drop(1);
	    this._game.debug();
	    this.drop(1);
	    this._game.debug();
	  }
	
	  _createClass(Link4App, [{
	    key: "drop",
	    value: function drop(column) {
	      this._game.drop(column);
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
	  function Link4Game() {
	    _classCallCheck(this, Link4Game);
	
	    this.columns = [];
	    for (var i = 0; i < this.COLUMN_COUNT; i++) {
	      this.columns.push([]);
	    }
	    this._randomizeTurn();
	  }
	
	  _createClass(Link4Game, [{
	    key: 'drop',
	    value: function drop(column_index) {
	      var column = this._column(column_index);
	      if (column.length < this.ROW_COUNT) {
	        column.push(this._turn);
	        this._toggleTurn();
	        return true;
	      } else {
	        return false;
	      }
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
	      return this.columns[column_index];
	    }
	  }, {
	    key: 'debug',
	    value: function debug() {
	      console.log('Next -> ' + this.next_turn);
	      console.log(this.columns);
	    }
	  }]);
	
	  return Link4Game;
	})();
	
	exports['default'] = Link4Game;
	
	Link4Game.prototype.COLUMN_COUNT = 7;
	Link4Game.prototype.ROW_COUNT = 6;
	
	Link4Game.prototype.RED = 'R';
	Link4Game.prototype.BLACK = 'B';
	module.exports = exports['default'];

/***/ }
]);
//# sourceMappingURL=app.js.map