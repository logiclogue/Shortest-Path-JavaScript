'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
	function Canvas() {
		_classCallCheck(this, Canvas);
	}

	_createClass(Canvas, null, [{
		key: 'init',
		value: function init() {
			this.c = document.getElementById('main-canvas');
			this.c.width = window.innerWidth;
			this.c.height = window.innerHeight;
			this.ctx = this.c.getContext('2d');
			this.width = this.c.width;
			this.height = this.c.height;
		}
	}]);

	return Canvas;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
	_classCallCheck(this, Main);

	Canvas.init();
};

window.onload = function () {
	var main = new Main();
};