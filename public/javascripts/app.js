webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// Link4 App JavaScript
	
	'use strict';
	
	(function () {
	
	  function Link4App(socket) {}
	
	  var hostname = location.protocol + "//" + location.hostname;
	  var port = window.location.port ? ':3000' : '';
	  var socket_host = hostname + port;
	
	  new Link4App(io(socket_host));
	
	  console.log('Looking for sockets at ' + socket_host);
	})();

/***/ }
]);
//# sourceMappingURL=app.js.map