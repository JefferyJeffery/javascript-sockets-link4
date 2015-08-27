webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _exclaimify = __webpack_require__(5);
	
	var _exclaimify2 = _interopRequireDefault(_exclaimify);
	
	var button = document.getElementById('button');
	
	var alertAsyncMessage = function alertAsyncMessage() {
	  // CommonJS async syntax webpack magic
	  __webpack_require__.e/* nsure */(2, function () {
	    var message = __webpack_require__(6);
	    alert((0, _exclaimify2['default'])(message));
	  });
	};
	
	console.log('\n  asset references like this one:\n    images/gulp.png\n  get updated in js too!');
	
	button.addEventListener('click', alertAsyncMessage);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var moduleElements = document.querySelectorAll('[data-module]');
	
	var _loop = function () {
	  var el = moduleElements[i];
	  var name = el.getAttribute('data-module');
	  __webpack_require__.e/* nsure */(1, function () {
	    var Module = __webpack_require__(3)("./" + name);
	    new Module(el);
	  });
	};
	
	for (var i = 0; i < moduleElements.length; i++) {
	  _loop();
	}

/***/ }
]);
//# sourceMappingURL=page1.js.map