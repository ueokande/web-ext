require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleStream = exports.ConsoleStream = undefined;

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.createLogger = createLogger;

var _bunyan = __webpack_require__(126);

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bunyan-related Flow types

// ConsoleStream types and implementation.

var ConsoleStream = exports.ConsoleStream = function () {
  function ConsoleStream() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    (0, _classCallCheck3.default)(this, ConsoleStream);

    this.verbose = verbose;
    this.isCapturing = false;
    this.capturedMessages = [];
  }

  (0, _createClass3.default)(ConsoleStream, [{
    key: 'format',
    value: function format(_ref2) {
      var name = _ref2.name,
          msg = _ref2.msg,
          level = _ref2.level;

      var prefix = this.verbose ? '[' + name + '][' + _bunyan.nameFromLevel[level] + '] ' : '';
      return '' + prefix + msg + '\n';
    }
  }, {
    key: 'makeVerbose',
    value: function makeVerbose() {
      this.verbose = true;
    }
  }, {
    key: 'write',
    value: function write(packet) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$localProcess = _ref3.localProcess,
          localProcess = _ref3$localProcess === undefined ? process : _ref3$localProcess;

      var thisLevel = this.verbose ? _bunyan2.default.TRACE : _bunyan2.default.INFO;
      if (packet.level >= thisLevel) {
        var _msg = this.format(packet);
        if (this.isCapturing) {
          this.capturedMessages.push(_msg);
        } else {
          localProcess.stdout.write(_msg);
        }
      }
    }
  }, {
    key: 'startCapturing',
    value: function startCapturing() {
      this.isCapturing = true;
    }
  }, {
    key: 'stopCapturing',
    value: function stopCapturing() {
      this.isCapturing = false;
      this.capturedMessages = [];
    }
  }, {
    key: 'flushCapturedLogs',
    value: function flushCapturedLogs() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$localProcess = _ref4.localProcess,
          localProcess = _ref4$localProcess === undefined ? process : _ref4$localProcess;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.capturedMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _msg2 = _step.value;

          localProcess.stdout.write(_msg2);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.capturedMessages = [];
    }
  }]);
  return ConsoleStream;
}();

var consoleStream = exports.consoleStream = new ConsoleStream();

// createLogger types and implementation.

function createLogger(filename) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$createBunyanLog = _ref5.createBunyanLog,
      createBunyanLog = _ref5$createBunyanLog === undefined ? _bunyan.createLogger : _ref5$createBunyanLog;

  return createBunyanLog({
    // Strip the leading src/ from file names (which is in all file names) to
    // make the name less redundant.
    name: filename.replace(/^src\//, ''),
    // Capture all log levels and let the stream filter them.
    level: _bunyan2.default.TRACE,
    streams: [{
      type: 'raw',
      stream: consoleStream
    }]
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(89);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(30);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(101);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiExtensionsReloadError = exports.RemoteTempInstallNotSupported = exports.InvalidManifest = exports.UsageError = exports.WebExtError = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(147);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.onlyInstancesOf = onlyInstancesOf;
exports.onlyErrorsWithCode = onlyErrorsWithCode;
exports.isErrorWithCode = isErrorWithCode;

var _es6Error = __webpack_require__(155);

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Base error for all custom web-ext errors.
 */
var WebExtError = exports.WebExtError = function (_ExtendableError) {
  (0, _inherits3.default)(WebExtError, _ExtendableError);

  function WebExtError(message) {
    (0, _classCallCheck3.default)(this, WebExtError);
    return (0, _possibleConstructorReturn3.default)(this, (WebExtError.__proto__ || Object.getPrototypeOf(WebExtError)).call(this, message));
  }

  return WebExtError;
}(_es6Error2.default);

/*
 * The class for errors that can be fixed by the developer.
 */


var UsageError = exports.UsageError = function (_WebExtError) {
  (0, _inherits3.default)(UsageError, _WebExtError);

  function UsageError(message) {
    (0, _classCallCheck3.default)(this, UsageError);
    return (0, _possibleConstructorReturn3.default)(this, (UsageError.__proto__ || Object.getPrototypeOf(UsageError)).call(this, message));
  }

  return UsageError;
}(WebExtError);

/*
 * The manifest for the extension is invalid (or missing).
 */


var InvalidManifest = exports.InvalidManifest = function (_UsageError) {
  (0, _inherits3.default)(InvalidManifest, _UsageError);

  function InvalidManifest(message) {
    (0, _classCallCheck3.default)(this, InvalidManifest);
    return (0, _possibleConstructorReturn3.default)(this, (InvalidManifest.__proto__ || Object.getPrototypeOf(InvalidManifest)).call(this, message));
  }

  return InvalidManifest;
}(UsageError);

/*
 * The remote Firefox does not support temporary add-on installation.
 */


var RemoteTempInstallNotSupported = exports.RemoteTempInstallNotSupported = function (_WebExtError2) {
  (0, _inherits3.default)(RemoteTempInstallNotSupported, _WebExtError2);

  function RemoteTempInstallNotSupported(message) {
    (0, _classCallCheck3.default)(this, RemoteTempInstallNotSupported);
    return (0, _possibleConstructorReturn3.default)(this, (RemoteTempInstallNotSupported.__proto__ || Object.getPrototypeOf(RemoteTempInstallNotSupported)).call(this, message));
  }

  return RemoteTempInstallNotSupported;
}(WebExtError);

/*
 * The errors collected when reloading all extensions at once
 * (initialized from a map of errors by extensionSourceDir string).
 */


var MultiExtensionsReloadError = exports.MultiExtensionsReloadError = function (_WebExtError3) {
  (0, _inherits3.default)(MultiExtensionsReloadError, _WebExtError3);

  function MultiExtensionsReloadError(errorsMap) {
    (0, _classCallCheck3.default)(this, MultiExtensionsReloadError);

    var errors = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = errorsMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            sourceDir = _step$value[0],
            error = _step$value[1];

        var msg = String(error);
        errors += '\nError on extension loaded from ' + sourceDir + ': ' + msg + '\n';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var message = 'Reload errors: ' + errors;

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (MultiExtensionsReloadError.__proto__ || Object.getPrototypeOf(MultiExtensionsReloadError)).call(this, message));

    _this5.errorsBySourceDir = errorsMap;
    return _this5;
  }

  return MultiExtensionsReloadError;
}(WebExtError);

/*
 * Sugar-y way to catch only instances of a certain error.
 *
 * Usage:
 *
 *  Promise.reject(SyntaxError)
 *    .catch(onlyInstancesOf(SyntaxError, (error) => {
 *      // error is guaranteed to be an instance of SyntaxError
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */


function onlyInstancesOf(predicate, errorHandler) {
  return function (error) {
    if (error instanceof predicate) {
      return errorHandler(error);
    } else {
      throw error;
    }
  };
}

/*
 * Sugar-y way to catch only errors having certain code(s).
 *
 * Usage:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode('ENOENT', (error) => {
 *      // error.code is guaranteed to be ENOENT
 *    }))
 *
 *  or:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode(['ENOENT', 'ENOTDIR'], (error) => {
 *      // ...
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */
function onlyErrorsWithCode(codeWanted, errorHandler) {
  return function (error) {
    var throwError = true;

    if (Array.isArray(codeWanted)) {
      if (codeWanted.indexOf(error.code) !== -1 || codeWanted.indexOf(error.errno) !== -1) {
        throwError = false;
      }
    } else if (error.code === codeWanted || error.errno === codeWanted) {
      throwError = false;
    }

    if (throwError) {
      throw error;
    }

    return errorHandler(error);
  };
}

function isErrorWithCode(codeWanted, error) {
  if (Array.isArray(codeWanted) && codeWanted.indexOf(error.code) !== -1) {
    return true;
  } else if (error.code === codeWanted) {
    return true;
  }

  return false;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(1);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(15);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(60);
var toPrimitive = __webpack_require__(40);
var dP = Object.defineProperty;

exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(119);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(22)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(23);
module.exports = __webpack_require__(13) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("mz");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(63);
var defined = __webpack_require__(38);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(93)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(59)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(115);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(129);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(132);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(62);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
var global = __webpack_require__(6);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(19);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("es6-promisify");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.getManifestId = getManifestId;

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(17);

var _parseJson = __webpack_require__(76);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _errors = __webpack_require__(5);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// getValidatedManifest helper types and implementation

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sourceDir) {
    var manifestFile, manifestContents, manifestData, errors;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manifestFile = _path2.default.join(sourceDir, 'manifest.json');

            log.debug('Validating manifest at ' + manifestFile);

            manifestContents = void 0;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(manifestFile);

          case 6:
            manifestContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.InvalidManifest('Could not read manifest.json file at ' + manifestFile + ': ' + _context.t0);

          case 12:
            manifestData = void 0;
            _context.prev = 13;

            manifestData = (0, _parseJson2.default)(manifestContents, manifestFile);
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context['catch'](13);
            throw new _errors.InvalidManifest('Error parsing manifest.json at ' + manifestFile + ': ' + _context.t1);

          case 20:
            errors = [];
            // This is just some basic validation of what web-ext needs, not
            // what Firefox will need to run the extension.
            // TODO: integrate with the addons-linter for actual validation.

            if (!manifestData.name) {
              errors.push('missing "name" property');
            }
            if (!manifestData.version) {
              errors.push('missing "version" property');
            }

            if (manifestData.applications && !manifestData.applications.gecko) {
              // Since the applications property only applies to gecko, make
              // sure 'gecko' exists when 'applications' is defined. This should
              // make introspection of gecko properties easier.
              errors.push('missing "applications.gecko" property');
            }

            if (!errors.length) {
              _context.next = 26;
              break;
            }

            throw new _errors.InvalidManifest('Manifest at ' + manifestFile + ' is invalid: ' + errors.join('; '));

          case 26:
            return _context.abrupt('return', manifestData);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [13, 17]]);
  }));

  function getValidatedManifest(_x) {
    return _ref.apply(this, arguments);
  }

  return getValidatedManifest;
}();

function getManifestId(manifestData) {
  return manifestData.applications ? manifestData.applications.gecko.id : undefined;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/manifest.js"))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectWithMaxRetries = exports.connect = exports.RemoteFirefox = exports.REMOTE_PORT = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var connect = exports.connect = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REMOTE_PORT;

    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$connectToFirefo = _ref4.connectToFirefox,
        connectToFirefox = _ref4$connectToFirefo === undefined ? _nodeFirefoxConnect2.default : _ref4$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            log.debug('Connecting to Firefox on port ' + port);
            _context3.next = 3;
            return connectToFirefox(port);

          case 3:
            client = _context3.sent;

            log.debug('Connected to the remote Firefox debugger on port ' + port);
            return _context3.abrupt('return', new RemoteFirefox(client));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function connect() {
    return _ref3.apply(this, arguments);
  };
}();

// ConnectWithMaxRetries types and implementation

var connectWithMaxRetries = exports.connectWithMaxRetries = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(
  // A max of 250 will try connecting for 30 seconds.
  _ref6) {
    var _ref6$maxRetries = _ref6.maxRetries,
        maxRetries = _ref6$maxRetries === undefined ? 250 : _ref6$maxRetries,
        _ref6$retryInterval = _ref6.retryInterval,
        retryInterval = _ref6$retryInterval === undefined ? 120 : _ref6$retryInterval,
        port = _ref6.port;

    var establishConnection = function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var lastError, retries;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                retries = 0;

              case 1:
                if (!(retries <= maxRetries)) {
                  _context4.next = 22;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return connectToFirefox(port);

              case 5:
                return _context4.abrupt('return', _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](2);

                if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context4.t0)) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 13;
                return new Promise(function (resolve) {
                  setTimeout(resolve, retryInterval);
                });

              case 13:

                lastError = _context4.t0;
                log.debug('Retrying Firefox (' + retries + '); connection error: ' + _context4.t0);
                _context4.next = 19;
                break;

              case 17:
                log.error(_context4.t0.stack);
                throw _context4.t0;

              case 19:
                retries++;
                _context4.next = 1;
                break;

              case 22:

                log.debug('Connect to Firefox debugger: too many retries');
                throw lastError;

              case 24:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      return function establishConnection() {
        return _ref8.apply(this, arguments);
      };
    }();

    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref7$connectToFirefo = _ref7.connectToFirefox,
        connectToFirefox = _ref7$connectToFirefo === undefined ? connect : _ref7$connectToFirefo;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:

            log.debug('Connecting to the remote Firefox debugger');
            return _context5.abrupt('return', establishConnection());

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function connectWithMaxRetries(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var _nodeFirefoxConnect = __webpack_require__(166);

var _nodeFirefoxConnect2 = _interopRequireDefault(_nodeFirefoxConnect);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//eslint-disable-line import/no-extraneous-dependencies

// RemoteFirefox types and implementation
var log = (0, _logger.createLogger)(__filename);

// The default port that Firefox's remote debugger will listen on and the
// client will connect to.

var REMOTE_PORT = exports.REMOTE_PORT = 6005;

// NOTE: this type aliases Object to catch any other possible response.

var RemoteFirefox = exports.RemoteFirefox = function () {
  function RemoteFirefox(client) {
    (0, _classCallCheck3.default)(this, RemoteFirefox);

    this.client = client;
    this.checkedForAddonReloading = false;

    client.client.on('disconnect', function () {
      log.debug('Received "disconnect" from Firefox client');
    });
    client.client.on('end', function () {
      log.debug('Received "end" from Firefox client');
    });
    client.client.on('message', function (info) {
      // These are arbitrary messages that the client library ignores.
      log.debug('Received message from client: ' + JSON.stringify(info));
    });
  }

  (0, _createClass3.default)(RemoteFirefox, [{
    key: 'disconnect',
    value: function disconnect() {
      this.client.disconnect();
    }
  }, {
    key: 'addonRequest',
    value: function addonRequest(addon, request) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.client.client.makeRequest({ to: addon.actor, type: request }, function (response) {
          if (response.error) {
            var _error = response.error + ': ' + response.message;
            log.debug('Client responded to \'' + request + '\' request with error:', _error);
            reject(new _errors.WebExtError(_error));
          } else {
            resolve(response);
          }
        });
      });
    }
  }, {
    key: 'installTemporaryAddon',
    value: function installTemporaryAddon(addonPath) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.client.request('listTabs', function (error, tabsResponse) {
          if (error) {
            return reject(new _errors.WebExtError('Remote Firefox: listTabs() error: ' + error));
          }
          if (!tabsResponse.addonsActor) {
            log.debug('listTabs returned a falsey addonsActor: ' + ('' + tabsResponse.addonsActor));
            return reject(new _errors.RemoteTempInstallNotSupported('This is an older version of Firefox that does not provide an ' + 'add-ons actor for remote installation. Try Firefox 49 or ' + 'higher.'));
          }

          _this2.client.client.makeRequest({
            to: tabsResponse.addonsActor,
            type: 'installTemporaryAddon',
            addonPath: addonPath
          }, function (installResponse) {
            if (installResponse.error) {
              return reject(new _errors.WebExtError('installTemporaryAddon: Error: ' + (installResponse.error + ': ' + installResponse.message)));
            }
            log.debug('installTemporaryAddon: ' + JSON.stringify(installResponse));
            log.info('Installed ' + addonPath + ' as a temporary add-on');
            resolve(installResponse);
          });
        });
      });
    }
  }, {
    key: 'getInstalledAddon',
    value: function getInstalledAddon(addonId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.client.request('listAddons', function (error, response) {
          if (error) {
            reject(new _errors.WebExtError('Remote Firefox: listAddons() error: ' + error));
          } else {
            resolve(response.addons);
          }
        });
      }).then(function (addons) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = addons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _addon = _step.value;

            if (_addon.id === addonId) {
              return _addon;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        log.debug('Remote Firefox has these addons: ' + addons.map(function (a) {
          return a.id;
        }));
        throw new _errors.WebExtError('The remote Firefox does not have your extension installed');
      });
    }
  }, {
    key: 'checkForAddonReloading',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(addon) {
        var response, supportedRequestTypes;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.checkedForAddonReloading) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', addon);

              case 4:
                _context.next = 6;
                return this.addonRequest(addon, 'requestTypes');

              case 6:
                response = _context.sent;

                if (!(response.requestTypes.indexOf('reload') === -1)) {
                  _context.next = 13;
                  break;
                }

                supportedRequestTypes = JSON.stringify(response.requestTypes);

                log.debug('Remote Firefox only supports: ' + supportedRequestTypes);
                throw new _errors.UsageError('This Firefox version does not support add-on reloading. ' + 'Re-run with --no-reload');

              case 13:
                this.checkedForAddonReloading = true;
                return _context.abrupt('return', addon);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkForAddonReloading(_x) {
        return _ref.apply(this, arguments);
      }

      return checkForAddonReloading;
    }()
  }, {
    key: 'reloadAddon',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(addonId) {
        var addon;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getInstalledAddon(addonId);

              case 2:
                addon = _context2.sent;
                _context2.next = 5;
                return this.checkForAddonReloading(addon);

              case 5:
                _context2.next = 7;
                return this.addonRequest(addon, 'reload');

              case 7:
                process.stdout.write('\rLast extension reload: ' + new Date().toTimeString());
                log.debug('\n');

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reloadAddon(_x2) {
        return _ref2.apply(this, arguments);
      }

      return reloadAddon;
    }()
  }]);
  return RemoteFirefox;
}();

// Connect types and implementation
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/remote.js"))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(95);
var enumBugKeys = __webpack_require__(45);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(64).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(37);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(30);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(38);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(19);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(28);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPackageCreator = exports.getDefaultLocalizedName = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDefaultLocalizedName = exports.getDefaultLocalizedName = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var messageFile = _ref2.messageFile,
        manifestData = _ref2.manifestData;
    var messageData, messageContents, extensionName;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            messageData = void 0;
            messageContents = void 0;
            extensionName = manifestData.name;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(messageFile);

          case 6:
            messageContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.UsageError('Error reading messages.json file at ' + messageFile + ': ' + _context.t0);

          case 12:
            _context.prev = 12;

            messageData = (0, _parseJson2.default)(messageContents, messageFile);
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t1 = _context['catch'](12);
            throw new _errors.UsageError('Error parsing messages.json ' + _context.t1);

          case 19:

            extensionName = manifestData.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g, function (match, messageName) {
              if (!(messageData[messageName] && messageData[messageName].message)) {
                var error = new _errors.UsageError('The locale file ' + messageFile + ' ' + ('is missing key: ' + messageName));
                throw error;
              } else {
                return messageData[messageName].message;
              }
            });
            return _context.abrupt('return', Promise.resolve(extensionName));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [12, 16]]);
  }));

  return function getDefaultLocalizedName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var defaultPackageCreator = exports.defaultPackageCreator = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var manifestData = _ref4.manifestData,
        sourceDir = _ref4.sourceDir,
        fileFilter = _ref4.fileFilter,
        artifactsDir = _ref4.artifactsDir,
        overwriteDest = _ref4.overwriteDest,
        showReadyMessage = _ref4.showReadyMessage;

    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref5$eventToPromise = _ref5.eventToPromise,
        eventToPromise = _ref5$eventToPromise === undefined ? _eventToPromise2.default : _ref5$eventToPromise;

    var id, buffer, extensionName, _messageFile, packageName, extensionPath, stream;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = void 0;

            if (!manifestData) {
              _context2.next = 6;
              break;
            }

            id = (0, _manifest.getManifestId)(manifestData);
            log.debug('Using manifest id=' + (id || '[not specified]'));
            _context2.next = 9;
            break;

          case 6:
            _context2.next = 8;
            return (0, _manifest2.default)(sourceDir);

          case 8:
            manifestData = _context2.sent;

          case 9:
            _context2.next = 11;
            return (0, _zipDir.zipDir)(sourceDir, {
              filter: function filter() {
                return fileFilter.wantFile.apply(fileFilter, arguments);
              }
            });

          case 11:
            buffer = _context2.sent;
            extensionName = manifestData.name;

            if (!manifestData.default_locale) {
              _context2.next = 19;
              break;
            }

            _messageFile = _path2.default.join(sourceDir, '_locales', manifestData.default_locale, 'messages.json');

            log.debug('Manifest declared default_locale, localizing extension name');
            _context2.next = 18;
            return getDefaultLocalizedName({
              messageFile: _messageFile, manifestData: manifestData
            });

          case 18:
            extensionName = _context2.sent;

          case 19:
            packageName = safeFileName(extensionName + '-' + manifestData.version + '.zip');
            extensionPath = _path2.default.join(artifactsDir, packageName);

            // Added 'wx' flags to avoid overwriting of existing package.

            stream = (0, _fs.createWriteStream)(extensionPath, { flags: 'wx' });


            stream.write(buffer, function () {
              return stream.end();
            });

            _context2.prev = 23;
            _context2.next = 26;
            return eventToPromise(stream, 'close');

          case 26:
            _context2.next = 39;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2['catch'](23);

            if ((0, _errors.isErrorWithCode)('EEXIST', _context2.t0)) {
              _context2.next = 32;
              break;
            }

            throw _context2.t0;

          case 32:
            if (overwriteDest) {
              _context2.next = 34;
              break;
            }

            throw new _errors.UsageError('Extension exists at the destination path: ' + extensionPath + '\n' + 'Use --overwrite-dest to enable overwriting.');

          case 34:
            log.info('Destination exists, overwriting: ' + extensionPath);
            stream = (0, _fs.createWriteStream)(extensionPath);
            stream.write(buffer, function () {
              return stream.end();
            });
            _context2.next = 39;
            return eventToPromise(stream, 'close');

          case 39:

            if (showReadyMessage) {
              log.info('Your web extension is ready: ' + extensionPath);
            }
            return _context2.abrupt('return', { extensionPath: extensionPath });

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[23, 28]]);
  }));

  return function defaultPackageCreator(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Build command types and implementation.

exports.safeFileName = safeFileName;

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(51);

var _mz = __webpack_require__(17);

var _parseJson = __webpack_require__(76);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _eventToPromise = __webpack_require__(77);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _watcher = __webpack_require__(78);

var _watcher2 = _interopRequireDefault(_watcher);

var _zipDir = __webpack_require__(127);

var _manifest = __webpack_require__(35);

var _manifest2 = _interopRequireDefault(_manifest);

var _artifacts = __webpack_require__(81);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(5);

var _fileFilter = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types.
var log = (0, _logger.createLogger)(__filename);

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '_');
}

// defaultPackageCreator types and implementation.

// This defines the _locales/messages.json type. See:
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization#Providing_localized_strings_in__locales

exports.default = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
    var sourceDir = _ref7.sourceDir,
        artifactsDir = _ref7.artifactsDir,
        _ref7$asNeeded = _ref7.asNeeded,
        asNeeded = _ref7$asNeeded === undefined ? false : _ref7$asNeeded,
        _ref7$overwriteDest = _ref7.overwriteDest,
        overwriteDest = _ref7$overwriteDest === undefined ? false : _ref7$overwriteDest,
        _ref7$ignoreFiles = _ref7.ignoreFiles,
        ignoreFiles = _ref7$ignoreFiles === undefined ? [] : _ref7$ignoreFiles;

    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        manifestData = _ref8.manifestData,
        _ref8$createFileFilte = _ref8.createFileFilter,
        createFileFilter = _ref8$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref8$createFileFilte,
        _ref8$fileFilter = _ref8.fileFilter,
        fileFilter = _ref8$fileFilter === undefined ? createFileFilter({
      sourceDir: sourceDir,
      artifactsDir: artifactsDir,
      ignoreFiles: ignoreFiles
    }) : _ref8$fileFilter,
        _ref8$onSourceChange = _ref8.onSourceChange,
        onSourceChange = _ref8$onSourceChange === undefined ? _watcher2.default : _ref8$onSourceChange,
        _ref8$packageCreator = _ref8.packageCreator,
        packageCreator = _ref8$packageCreator === undefined ? defaultPackageCreator : _ref8$packageCreator,
        _ref8$showReadyMessag = _ref8.showReadyMessage,
        showReadyMessage = _ref8$showReadyMessag === undefined ? true : _ref8$showReadyMessag;

    var rebuildAsNeeded, createPackage, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rebuildAsNeeded = asNeeded; // alias for `build --as-needed`

            log.info('Building web extension from ' + sourceDir);

            createPackage = function createPackage() {
              return packageCreator({
                manifestData: manifestData,
                sourceDir: sourceDir,
                fileFilter: fileFilter,
                artifactsDir: artifactsDir,
                overwriteDest: overwriteDest,
                showReadyMessage: showReadyMessage
              });
            };

            _context3.next = 5;
            return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

          case 5:
            _context3.next = 7;
            return createPackage();

          case 7:
            result = _context3.sent;


            if (rebuildAsNeeded) {
              log.info('Rebuilding when files change...');
              onSourceChange({
                sourceDir: sourceDir,
                artifactsDir: artifactsDir,
                onChange: function onChange() {
                  return createPackage().catch(function (error) {
                    log.error(error.stack);
                    throw error;
                  });
                },
                shouldWatchFile: function shouldWatchFile() {
                  return fileFilter.wantFile.apply(fileFilter, arguments);
                }
              });
            }

            return _context3.abrupt('return', result);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function build(_x4) {
    return _ref6.apply(this, arguments);
  }

  return build;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/build.js"))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(136);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(138);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(27);
var wksExt = __webpack_require__(54);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFileFilter = exports.FileFilter = exports.isSubPath = undefined;

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _minimatch = __webpack_require__(157);

var _minimatch2 = _interopRequireDefault(_minimatch);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// check if target is a sub directory of src

var isSubPath = exports.isSubPath = function isSubPath(src, target) {
  var relate = _path2.default.relative(src, target);
  // same dir
  if (!relate) {
    return false;
  }
  if (relate === '..') {
    return false;
  }
  return !relate.startsWith('..' + _path2.default.sep);
};

// FileFilter types and implementation.

/*
 * Allows or ignores files.
 */
var FileFilter = exports.FileFilter = function () {
  function FileFilter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseIgnoredPatte = _ref.baseIgnoredPatterns,
        baseIgnoredPatterns = _ref$baseIgnoredPatte === undefined ? ['**/*.xpi', '**/*.zip', '**/.*', // any hidden file and folder
    '**/.*/**/*', // and the content inside hidden folder
    '**/node_modules', '**/node_modules/**/*'] : _ref$baseIgnoredPatte,
        _ref$ignoreFiles = _ref.ignoreFiles,
        ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
        sourceDir = _ref.sourceDir,
        artifactsDir = _ref.artifactsDir;

    (0, _classCallCheck3.default)(this, FileFilter);

    sourceDir = _path2.default.resolve(sourceDir);

    this.filesToIgnore = [];
    this.sourceDir = sourceDir;

    this.addToIgnoreList(baseIgnoredPatterns);
    if (ignoreFiles) {
      this.addToIgnoreList(ignoreFiles);
    }
    if (artifactsDir && isSubPath(sourceDir, artifactsDir)) {
      artifactsDir = _path2.default.resolve(artifactsDir);
      log.debug('Ignoring artifacts directory "' + artifactsDir + '" ' + 'and all its subdirectories');
      this.addToIgnoreList([artifactsDir, _path2.default.join(artifactsDir, '**', '*')]);
    }
  }

  /**
   *  Resolve relative path to absolute path with sourceDir.
   */


  (0, _createClass3.default)(FileFilter, [{
    key: 'resolveWithSourceDir',
    value: function resolveWithSourceDir(file) {
      var resolvedPath = _path2.default.resolve(this.sourceDir, file);
      log.debug('Resolved path ' + file + ' with sourceDir ' + this.sourceDir + ' ' + ('to ' + resolvedPath));
      return resolvedPath;
    }

    /**
     *  Insert more files into filesToIgnore array.
     */

  }, {
    key: 'addToIgnoreList',
    value: function addToIgnoreList(files) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          this.filesToIgnore.push(this.resolveWithSourceDir(file));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /*
     * Returns true if the file is wanted.
     *
     * If filePath does not start with a slash, it will be treated as a path
     * relative to sourceDir when matching it against all configured
     * ignore-patterns.
     *
     * Example: this is called by zipdir as wantFile(filePath) for each
     * file in the folder that is being archived.
     */

  }, {
    key: 'wantFile',
    value: function wantFile(filePath) {
      var resolvedPath = this.resolveWithSourceDir(filePath);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.filesToIgnore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var test = _step2.value;

          if ((0, _minimatch2.default)(resolvedPath, test)) {
            log.debug('FileFilter: ignoring file ' + resolvedPath + ' (it matched ' + test + ')');
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }]);
  return FileFilter;
}();

// a helper function to make mocking easier

var createFileFilter = exports.createFileFilter = function createFileFilter(params) {
  return new FileFilter(params);
};
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/file-filter.js"))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDesktopNotification = showDesktopNotification;

var _nodeNotifier = __webpack_require__(162);

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLog = (0, _logger.createLogger)(__filename);

function showDesktopNotification(_ref) {
  var title = _ref.title,
      message = _ref.message,
      icon = _ref.icon;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$notifier = _ref2.notifier,
      notifier = _ref2$notifier === undefined ? _nodeNotifier2.default : _ref2$notifier,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? defaultLog : _ref2$log;

  return new Promise(function (resolve, reject) {
    notifier.notify({ title: title, message: message, icon: icon }, function (err, res) {
      if (err) {
        log.debug('Desktop notifier error: ' + err.message + ',' + (' response: ' + res));
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/desktop-notifier.js"))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installExtension = exports.copyProfile = exports.createProfile = exports.useProfile = exports.isDefaultProfile = exports.run = exports.defaultRemotePortFinder = exports.defaultFirefoxEnv = undefined;

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var defaultRemotePortFinder = exports.defaultRemotePortFinder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$portToTry = _ref2.portToTry,
        portToTry = _ref2$portToTry === undefined ? _remote.REMOTE_PORT : _ref2$portToTry,
        _ref2$retriesLeft = _ref2.retriesLeft,
        retriesLeft = _ref2$retriesLeft === undefined ? 10 : _ref2$retriesLeft,
        _ref2$connectToFirefo = _ref2.connectToFirefox,
        connectToFirefox = _ref2$connectToFirefo === undefined ? _remote.connect : _ref2$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log.debug('Checking if remote Firefox port ' + portToTry + ' is available');

            client = void 0;

          case 2:
            if (!(retriesLeft >= 0)) {
              _context.next = 20;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return connectToFirefox(portToTry);

          case 6:
            client = _context.sent;

            log.debug('Remote Firefox port ' + portToTry + ' is in use ' + ('(retries remaining: ' + retriesLeft + ')'));
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](3);

            if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context.t0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', portToTry);

          case 14:
            throw _context.t0;

          case 15:

            client.disconnect();
            portToTry++;
            retriesLeft--;
            _context.next = 2;
            break;

          case 20:
            throw new _errors.WebExtError('Too many retries on port search');

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 10]]);
  }));

  return function defaultRemotePortFinder() {
    return _ref.apply(this, arguments);
  };
}();

// Declare the needed 'fx-runner' module flow types.

// Run command types and implementaion.

/*
 * Runs Firefox with the given profile object and resolves a promise on exit.
 */
var run = exports.run = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(profile) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$fxRunner = _ref4.fxRunner,
        fxRunner = _ref4$fxRunner === undefined ? _fxRunner2.default : _ref4$fxRunner,
        _ref4$findRemotePort = _ref4.findRemotePort,
        findRemotePort = _ref4$findRemotePort === undefined ? defaultRemotePortFinder : _ref4$findRemotePort,
        firefoxBinary = _ref4.firefoxBinary,
        binaryArgs = _ref4.binaryArgs;

    var remotePort, results, firefox;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            log.debug('Running Firefox with profile at ' + profile.path());

            _context2.next = 3;
            return findRemotePort();

          case 3:
            remotePort = _context2.sent;
            _context2.next = 6;
            return fxRunner({
              // if this is falsey, fxRunner tries to find the default one.
              'binary': firefoxBinary,
              'binary-args': binaryArgs,
              // This ensures a new instance of Firefox is created. It has nothing
              // to do with the devtools remote debugger.
              'no-remote': true,
              'listen': remotePort,
              'foreground': true,
              'profile': profile.path(),
              'env': (0, _extends3.default)({}, process.env, defaultFirefoxEnv),
              'verbose': true
            });

          case 6:
            results = _context2.sent;
            firefox = results.process;


            log.debug('Executing Firefox binary: ' + results.binary);
            log.debug('Firefox args: ' + results.args.join(' '));

            firefox.on('error', function (error) {
              // TODO: show a nice error when it can't find Firefox.
              // if (/No such file/.test(err) || err.code === 'ENOENT') {
              log.error('Firefox error: ' + error);
              throw error;
            });

            log.info('Use --verbose or open Tools > Web Developer > Browser Console ' + 'to see logging');

            firefox.stderr.on('data', function (data) {
              log.debug('Firefox stderr: ' + data.toString().trim());
            });

            firefox.stdout.on('data', function (data) {
              log.debug('Firefox stdout: ' + data.toString().trim());
            });

            firefox.on('close', function () {
              log.debug('Firefox closed');
            });

            return _context2.abrupt('return', { firefox: firefox, debuggerPort: remotePort });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// isDefaultProfile types and implementation.

/*
 * Tests if a profile is a default Firefox profile (both as a profile name or
 * profile path).
 *
 * Returns a promise that resolves to true if the profile is one of default Firefox profile.
 */
var isDefaultProfile = exports.isDefaultProfile = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(profilePathOrName) {
    var ProfileFinder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _firefoxProfile2.default.Finder;
    var fsStat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _mz.fs.stat;

    var baseProfileDir, profilesIniPath, finder, readProfiles, normalizedProfileDirPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _profile, profileFullPath;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!DEFAULT_PROFILES_NAMES.includes(profilePathOrName)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', true);

          case 2:
            baseProfileDir = ProfileFinder.locateUserDirectory();
            profilesIniPath = _path2.default.join(baseProfileDir, 'profiles.ini');
            _context3.prev = 4;
            _context3.next = 7;
            return fsStat(profilesIniPath);

          case 7:
            _context3.next = 15;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](4);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context3.t0)) {
              _context3.next = 14;
              break;
            }

            log.debug('profiles.ini not found: ' + _context3.t0);

            // No profiles exist yet, default to false (the default profile name contains a
            // random generated component).
            return _context3.abrupt('return', false);

          case 14:
            throw _context3.t0;

          case 15:

            // Check for profile dir path.
            finder = new ProfileFinder(baseProfileDir);
            readProfiles = (0, _es6Promisify2.default)(finder.readProfiles, finder);
            _context3.next = 19;
            return readProfiles();

          case 19:
            normalizedProfileDirPath = _path2.default.normalize(_path2.default.join(_path2.default.resolve(profilePathOrName), _path2.default.sep));
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 23;
            _iterator = finder.profiles[Symbol.iterator]();

          case 25:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 37;
              break;
            }

            _profile = _step.value;

            if (!(DEFAULT_PROFILES_NAMES.includes(_profile.Name) || _profile.Default === '1')) {
              _context3.next = 34;
              break;
            }

            profileFullPath = void 0;

            // Check for profile name.

            if (!(_profile.Name === profilePathOrName)) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt('return', true);

          case 31:

            // Check for profile path.
            if (_profile.IsRelative === '1') {
              profileFullPath = _path2.default.join(baseProfileDir, _profile.Path, _path2.default.sep);
            } else {
              profileFullPath = _path2.default.join(_profile.Path, _path2.default.sep);
            }

            if (!(_path2.default.normalize(profileFullPath) === normalizedProfileDirPath)) {
              _context3.next = 34;
              break;
            }

            return _context3.abrupt('return', true);

          case 34:
            _iteratorNormalCompletion = true;
            _context3.next = 25;
            break;

          case 37:
            _context3.next = 43;
            break;

          case 39:
            _context3.prev = 39;
            _context3.t1 = _context3['catch'](23);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 43:
            _context3.prev = 43;
            _context3.prev = 44;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 46:
            _context3.prev = 46;

            if (!_didIteratorError) {
              _context3.next = 49;
              break;
            }

            throw _iteratorError;

          case 49:
            return _context3.finish(46);

          case 50:
            return _context3.finish(43);

          case 51:
            return _context3.abrupt('return', false);

          case 52:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 9], [23, 39, 43, 51], [44,, 46, 50]]);
  }));

  return function isDefaultProfile(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

// configureProfile types and implementation.

// Use the target path as a Firefox profile without cloning it

var useProfile = exports.useProfile = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(profilePath) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref8.app,
        _ref8$configureThisPr = _ref8.configureThisProfile,
        configureThisProfile = _ref8$configureThisPr === undefined ? configureProfile : _ref8$configureThisPr,
        _ref8$isFirefoxDefaul = _ref8.isFirefoxDefaultProfile,
        isFirefoxDefaultProfile = _ref8$isFirefoxDefaul === undefined ? isDefaultProfile : _ref8$isFirefoxDefaul,
        _ref8$customPrefs = _ref8.customPrefs,
        customPrefs = _ref8$customPrefs === undefined ? {} : _ref8$customPrefs;

    var isForbiddenProfile, profile;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return isFirefoxDefaultProfile(profilePath);

          case 2:
            isForbiddenProfile = _context4.sent;

            if (!isForbiddenProfile) {
              _context4.next = 5;
              break;
            }

            throw new _errors.UsageError('Cannot use --keep-profile-changes on a default profile' + (' ("' + profilePath + '")') + ' because web-ext will make it insecure and unsuitable for daily use.' + '\nSee https://github.com/mozilla/web-ext/issues/1005');

          case 5:
            profile = new _firefoxProfile2.default({ destinationDirectory: profilePath });
            _context4.next = 8;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function useProfile(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

// createProfile types and implementation.

/*
 * Creates a new temporary profile and resolves with the profile object.
 *
 * The profile will be deleted when the system process exits.
 */
var createProfile = exports.createProfile = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        app = _ref10.app,
        _ref10$configureThisP = _ref10.configureThisProfile,
        configureThisProfile = _ref10$configureThisP === undefined ? configureProfile : _ref10$configureThisP,
        _ref10$customPrefs = _ref10.customPrefs,
        customPrefs = _ref10$customPrefs === undefined ? {} : _ref10$customPrefs;

    var profile;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            profile = new _firefoxProfile2.default();
            _context5.next = 3;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function createProfile() {
    return _ref9.apply(this, arguments);
  };
}();

// copyProfile types and implementation.

/*
 * Copies an existing Firefox profile and creates a new temporary profile.
 * The new profile will be configured with some preferences required to
 * activate extension development.
 *
 * It resolves with the new profile object.
 *
 * The temporary profile will be deleted when the system process exits.
 *
 * The existing profile can be specified as a directory path or a name of
 * one that exists in the current user's Firefox directory.
 */
var copyProfile = exports.copyProfile = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(profileDirectory) {
    var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref12.app,
        _ref12$configureThisP = _ref12.configureThisProfile,
        configureThisProfile = _ref12$configureThisP === undefined ? configureProfile : _ref12$configureThisP,
        _ref12$copyFromUserPr = _ref12.copyFromUserProfile,
        copyFromUserProfile = _ref12$copyFromUserPr === undefined ? _firefoxProfile.copyFromUserProfile : _ref12$copyFromUserPr,
        _ref12$customPrefs = _ref12.customPrefs,
        customPrefs = _ref12$customPrefs === undefined ? {} : _ref12$customPrefs;

    var copy, copyByName, dirExists, _profile2;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            copy = (0, _es6Promisify2.default)(_firefoxProfile2.default.copy);
            copyByName = (0, _es6Promisify2.default)(copyFromUserProfile);
            _context6.prev = 2;
            _context6.next = 5;
            return (0, _isDirectory2.default)(profileDirectory);

          case 5:
            dirExists = _context6.sent;
            _profile2 = void 0;

            if (!dirExists) {
              _context6.next = 14;
              break;
            }

            log.debug('Copying profile directory from "' + profileDirectory + '"');
            _context6.next = 11;
            return copy({ profileDirectory: profileDirectory });

          case 11:
            _profile2 = _context6.sent;
            _context6.next = 18;
            break;

          case 14:
            log.debug('Assuming ' + profileDirectory + ' is a named profile');
            _context6.next = 17;
            return copyByName({ name: profileDirectory });

          case 17:
            _profile2 = _context6.sent;

          case 18:
            return _context6.abrupt('return', configureThisProfile(_profile2, { app: app, customPrefs: customPrefs }));

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6['catch'](2);
            throw new _errors.WebExtError('Could not copy Firefox profile from ' + profileDirectory + ': ' + _context6.t0);

          case 24:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[2, 21]]);
  }));

  return function copyProfile(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

// installExtension types and implementation.

/*
 * Installs an extension into the given Firefox profile object.
 * Resolves when complete.
 *
 * The extension is copied into a special location and you need to turn
 * on some preferences to allow this. See extensions.autoDisableScopes in
 * ./preferences.js.
 *
 * When asProxy is true, a special proxy file will be installed. This is a
 * text file that contains the path to the extension source.
 */
var installExtension = exports.installExtension = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref14) {
    var _ref14$asProxy = _ref14.asProxy,
        asProxy = _ref14$asProxy === undefined ? false : _ref14$asProxy,
        manifestData = _ref14.manifestData,
        profile = _ref14.profile,
        extensionPath = _ref14.extensionPath;

    var id, isDir, destPath, writeStream, readStream, _destPath, _writeStream;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (profile.extensionsDir) {
              _context7.next = 2;
              break;
            }

            throw new _errors.WebExtError('profile.extensionsDir was unexpectedly empty');

          case 2:
            _context7.prev = 2;
            _context7.next = 5;
            return _mz.fs.stat(profile.extensionsDir);

          case 5:
            _context7.next = 16;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context7.t0)) {
              _context7.next = 15;
              break;
            }

            log.debug('Creating extensions directory: ' + profile.extensionsDir);
            _context7.next = 13;
            return _mz.fs.mkdir(profile.extensionsDir);

          case 13:
            _context7.next = 16;
            break;

          case 15:
            throw _context7.t0;

          case 16:
            id = (0, _manifest.getManifestId)(manifestData);

            if (id) {
              _context7.next = 19;
              break;
            }

            throw new _errors.UsageError('An explicit extension ID is required when installing to ' + 'a profile (applications.gecko.id not found in manifest.json)');

          case 19:
            if (!asProxy) {
              _context7.next = 35;
              break;
            }

            log.debug('Installing as an extension proxy; source: ' + extensionPath);

            _context7.next = 23;
            return (0, _isDirectory2.default)(extensionPath);

          case 23:
            isDir = _context7.sent;

            if (isDir) {
              _context7.next = 26;
              break;
            }

            throw new _errors.WebExtError('proxy install: extensionPath must be the extension source ' + ('directory; got: ' + extensionPath));

          case 26:

            // Write a special extension proxy file containing the source
            // directory. See:
            // https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Firefox_extension_proxy_file
            destPath = _path2.default.join(profile.extensionsDir, '' + id);
            writeStream = _fs2.default.createWriteStream(destPath);

            writeStream.write(extensionPath);
            writeStream.end();
            _context7.next = 32;
            return (0, _eventToPromise2.default)(writeStream, 'close');

          case 32:
            return _context7.abrupt('return', _context7.sent);

          case 35:
            // Write the XPI file to the profile.
            readStream = _fs2.default.createReadStream(extensionPath);
            _destPath = _path2.default.join(profile.extensionsDir, id + '.xpi');
            _writeStream = _fs2.default.createWriteStream(_destPath);


            log.debug('Installing extension from ' + extensionPath + ' to ' + _destPath);
            readStream.pipe(_writeStream);

            _context7.next = 42;
            return Promise.all([(0, _eventToPromise2.default)(readStream, 'close'), (0, _eventToPromise2.default)(_writeStream, 'close')]);

          case 42:
            return _context7.abrupt('return', _context7.sent);

          case 43:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[2, 7]]);
  }));

  return function installExtension(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

exports.configureProfile = configureProfile;

var _fs = __webpack_require__(51);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _fxRunner = __webpack_require__(163);

var _fxRunner2 = _interopRequireDefault(_fxRunner);

var _firefoxProfile = __webpack_require__(164);

var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);

var _mz = __webpack_require__(17);

var _es6Promisify = __webpack_require__(34);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _eventToPromise = __webpack_require__(77);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _isDirectory = __webpack_require__(165);

var _isDirectory2 = _interopRequireDefault(_isDirectory);

var _errors = __webpack_require__(5);

var _preferences = __webpack_require__(83);

var _manifest = __webpack_require__(35);

var _logger = __webpack_require__(0);

var _remote = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types
var log = (0, _logger.createLogger)(__filename);
var defaultFirefoxEnv = exports.defaultFirefoxEnv = {
  XPCOM_DEBUG_BREAK: 'stack',
  NS_TRACE_MALLOC_DISABLE_STACKS: '1'
};

// defaultRemotePortFinder types and implementation.

var DEFAULT_PROFILES_NAMES = ['default', 'dev-edition-default'];

/*
 * Configures a profile with common preferences that are required to
 * activate extension development.
 *
 * Returns a promise that resolves with the original profile object.
 */
function configureProfile(profile) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$app = _ref6.app,
      app = _ref6$app === undefined ? 'firefox' : _ref6$app,
      _ref6$getPrefs = _ref6.getPrefs,
      getPrefs = _ref6$getPrefs === undefined ? _preferences.getPrefs : _ref6$getPrefs,
      _ref6$customPrefs = _ref6.customPrefs,
      customPrefs = _ref6$customPrefs === undefined ? {} : _ref6$customPrefs;

  // Set default preferences. Some of these are required for the add-on to
  // operate, such as disabling signatures.
  var prefs = getPrefs(app);
  Object.keys(prefs).forEach(function (pref) {
    profile.setPreference(pref, prefs[pref]);
  });
  if (Object.keys(customPrefs).length > 0) {
    var customPrefsStr = JSON.stringify(customPrefs, null, 2);
    log.info('Setting custom Firefox preferences: ' + customPrefsStr);
    Object.keys(customPrefs).forEach(function (custom) {
      profile.setPreference(custom, customPrefs[custom]);
    });
  }
  profile.updatePreferences();
  return Promise.resolve(profile);
}

// useProfile types and implementation.
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/index.js"))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(61);
var hide = __webpack_require__(15);
var has = __webpack_require__(16);
var Iterators = __webpack_require__(19);
var $iterCreate = __webpack_require__(94);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(98);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(13) && !__webpack_require__(22)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(20);
var arrayIndexOf = __webpack_require__(96)(false);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(19);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {



/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(8);
var aFunction = __webpack_require__(28);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(109);
var html = __webpack_require__(64);
var cel = __webpack_require__(39);
var global = __webpack_require__(6);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isObject = __webpack_require__(12);
var newPromiseCapability = __webpack_require__(49);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("camelcase");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build = __webpack_require__(52);

var _build2 = _interopRequireDefault(_build);

var _lint = __webpack_require__(158);

var _lint2 = _interopRequireDefault(_lint);

var _run = __webpack_require__(160);

var _run2 = _interopRequireDefault(_run);

var _sign = __webpack_require__(172);

var _sign2 = _interopRequireDefault(_sign);

var _docs = __webpack_require__(174);

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { build: _build2.default, lint: _lint2.default, run: _run2.default, sign: _sign2.default, docs: _docs2.default };

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("parse-json");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("event-to-promise");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onSourceChange;
exports.proxyFileChanges = proxyFileChanges;

var _watchpack = __webpack_require__(124);

var _watchpack2 = _interopRequireDefault(_watchpack);

var _debounce = __webpack_require__(125);

var _debounce2 = _interopRequireDefault(_debounce);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// onSourceChange types and implementation

// NOTE: this fix an issue with flow and default exports (which currently
// lose their type signatures) by explicitly declare the default export
// signature. Reference: https://github.com/facebook/flow/issues/449
// eslint-disable-next-line no-shadow

function onSourceChange(_ref) {
  var sourceDir = _ref.sourceDir,
      artifactsDir = _ref.artifactsDir,
      onChange = _ref.onChange,
      shouldWatchFile = _ref.shouldWatchFile;

  // TODO: For network disks, we would need to add {poll: true}.
  var watcher = new _watchpack2.default();

  var executeImmediately = true;
  onChange = (0, _debounce2.default)(onChange, 1000, executeImmediately);

  watcher.on('change', function (filePath) {
    proxyFileChanges({ artifactsDir: artifactsDir, onChange: onChange, filePath: filePath, shouldWatchFile: shouldWatchFile });
  });

  log.debug('Watching for file changes in ' + sourceDir);
  watcher.watch([], [sourceDir], Date.now());

  // TODO: support interrupting the watcher on Windows.
  // https://github.com/mozilla/web-ext/issues/225
  process.on('SIGINT', function () {
    return watcher.close();
  });
  return watcher;
}

// proxyFileChanges types and implementation.

function proxyFileChanges(_ref2) {
  var artifactsDir = _ref2.artifactsDir,
      onChange = _ref2.onChange,
      filePath = _ref2.filePath,
      shouldWatchFile = _ref2.shouldWatchFile;

  if (filePath.indexOf(artifactsDir) === 0 || !shouldWatchFile(filePath)) {
    log.debug('Ignoring change to: ' + filePath);
  } else {
    log.debug('Changed: ' + filePath);
    log.debug('Last change detection: ' + new Date().toTimeString());
    onChange();
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/watcher.js"))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(62);
var hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(33);
var createDesc = __webpack_require__(23);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(40);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(60);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareArtifactsDir = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var prepareArtifactsDir = exports.prepareArtifactsDir = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(artifactsDir) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$asyncMkdirp = _ref2.asyncMkdirp,
        asyncMkdirp = _ref2$asyncMkdirp === undefined ? defaultAsyncMkdirp : _ref2$asyncMkdirp;

    var stats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mz.fs.stat(artifactsDir);

          case 3:
            stats = _context.sent;

            if (stats.isDirectory()) {
              _context.next = 6;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but it is not a directory.');

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return _mz.fs.access(artifactsDir, _mz.fs.W_OK);

          case 9:
            _context.next = 18;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](6);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t0)) {
              _context.next = 17;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but the user lacks ' + 'permissions on it.');

          case 17:
            throw _context.t0;

          case 18:
            _context.next = 43;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context['catch'](0);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t1)) {
              _context.next = 26;
              break;
            }

            throw new _errors.UsageError('Cannot access --artifacts-dir="' + artifactsDir + '" because the user ' + ('lacks permissions: ' + _context.t1));

          case 26:
            if (!(0, _errors.isErrorWithCode)('ENOENT', _context.t1)) {
              _context.next = 42;
              break;
            }

            _context.prev = 27;

            log.debug('Creating artifacts directory: ' + artifactsDir);
            _context.next = 31;
            return asyncMkdirp(artifactsDir);

          case 31:
            _context.next = 40;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context['catch'](27);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t2)) {
              _context.next = 39;
              break;
            }

            throw new _errors.UsageError('Cannot create --artifacts-dir="' + artifactsDir + '" because the ' + ('user lacks permissions: ' + _context.t2));

          case 39:
            throw _context.t2;

          case 40:
            _context.next = 43;
            break;

          case 42:
            throw _context.t1;

          case 43:
            return _context.abrupt('return', artifactsDir);

          case 44:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20], [6, 11], [27, 33]]);
  }));

  return function prepareArtifactsDir(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _mz = __webpack_require__(17);

var _mkdirp = __webpack_require__(156);

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _es6Promisify = __webpack_require__(34);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _errors = __webpack_require__(5);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var defaultAsyncMkdirp = (0, _es6Promisify2.default)(_mkdirp2.default);
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/artifacts.js"))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Helper function used to raise an UsageError when the adb binary has not been found.
var wrapADBCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asyncFn) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return asyncFn();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            if (!((0, _errors.isErrorWithCode)('ENOENT', _context.t0) && _context.t0.message.includes('spawn adb'))) {
              _context.next = 10;
              break;
            }

            throw new _errors.UsageError('No adb executable has been found. ' + 'You can Use --adb-bin, --adb-host/--adb-port ' + 'to configure it manually if needed.');

          case 10:
            throw _context.t0;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function wrapADBCall(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _adbkit = __webpack_require__(161);

var _adbkit2 = _interopRequireDefault(_adbkit);

var _errors = __webpack_require__(5);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var ADBUtils = function () {
  // TODO: better flow typing here.

  // Map<deviceId -> artifactsDir>
  function ADBUtils(params) {
    (0, _classCallCheck3.default)(this, ADBUtils);

    this.params = params;

    var adb = params.adb,
        adbBin = params.adbBin,
        adbHost = params.adbHost,
        adbPort = params.adbPort;


    this.adb = adb || _adbkit2.default;

    this.adbClient = this.adb.createClient({
      bin: adbBin,
      host: adbHost,
      port: adbPort
    });

    this.artifactsDirMap = new Map();

    this.userAbortDiscovery = false;
  }
  // Toggled when the user wants to abort the RDP Unix Socket discovery loop
  // while it is still executing.


  (0, _createClass3.default)(ADBUtils, [{
    key: 'runShellCommand',
    value: function runShellCommand(deviceId, cmd) {
      var _this = this;

      var adb = this.adb,
          adbClient = this.adbClient;


      log.debug('Run adb shell command on ' + deviceId + ': ' + JSON.stringify(cmd));

      return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return adbClient.shell(deviceId, cmd).then(adb.util.readAll);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))).then(function (res) {
        return res.toString();
      });
    }
  }, {
    key: 'discoverDevices',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _this2 = this;

        var adbClient, devices;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                adbClient = this.adbClient;
                devices = [];


                log.debug('Listing android devices');
                _context4.next = 5;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt('return', adbClient.listDevices());

                        case 1:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this2);
                })));

              case 5:
                devices = _context4.sent;
                return _context4.abrupt('return', devices.map(function (dev) {
                  return dev.id;
                }));

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function discoverDevices() {
        return _ref3.apply(this, arguments);
      }

      return discoverDevices;
    }()
  }, {
    key: 'discoverInstalledFirefoxAPKs',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(deviceId) {
        var pmList;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                log.debug('Listing installed Firefox APKs on ' + deviceId);

                _context5.next = 3;
                return this.runShellCommand(deviceId, ['pm', 'list', 'packages']);

              case 3:
                pmList = _context5.sent;
                return _context5.abrupt('return', pmList.split('\n').map(function (line) {
                  return line.replace('package:', '').trim();
                }).filter(function (line) {
                  return line.startsWith('org.mozilla.fennec') || line.startsWith('org.mozilla.firefox');
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function discoverInstalledFirefoxAPKs(_x2) {
        return _ref5.apply(this, arguments);
      }

      return discoverInstalledFirefoxAPKs;
    }()
  }, {
    key: 'getAndroidVersionNumber',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(deviceId) {
        var androidVersion, androidVersionNumber;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.runShellCommand(deviceId, ['getprop', 'ro.build.version.sdk']);

              case 2:
                androidVersion = _context6.sent.trim();
                androidVersionNumber = parseInt(androidVersion);

                // No need to check the granted runtime permissions on Android versions < Lollypop.

                if (!isNaN(androidVersionNumber)) {
                  _context6.next = 6;
                  break;
                }

                throw new _errors.WebExtError('Unable to discovery android version on ' + (deviceId + ': ' + androidVersion));

              case 6:
                return _context6.abrupt('return', androidVersionNumber);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAndroidVersionNumber(_x3) {
        return _ref6.apply(this, arguments);
      }

      return getAndroidVersionNumber;
    }()

    // Raise an UsageError when the given APK does not have the required runtime permissions.

  }, {
    key: 'ensureRequiredAPKRuntimePermissions',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(deviceId, apk, permissions) {
        var permissionsMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, perm, pmDumpLogs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _perm, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _perm2;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                permissionsMap = {};

                // Initialize every permission to false in the permissions map.

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context7.prev = 4;
                for (_iterator = permissions[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  perm = _step.value;

                  permissionsMap[perm] = false;
                }

                // Retrieve the permissions information for the given apk.
                _context7.next = 12;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context7.t0;

              case 12:
                _context7.prev = 12;
                _context7.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 15:
                _context7.prev = 15;

                if (!_didIteratorError) {
                  _context7.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context7.finish(15);

              case 19:
                return _context7.finish(12);

              case 20:
                _context7.next = 22;
                return this.runShellCommand(deviceId, ['pm', 'dump', apk]);

              case 22:
                pmDumpLogs = _context7.sent.split('\n');


                // Set to true the required permissions that have been granted.
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 26;
                _iterator2 = pmDumpLogs[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context7.next = 52;
                  break;
                }

                line = _step2.value;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context7.prev = 33;

                for (_iterator4 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  _perm = _step4.value;

                  if (line.includes(_perm + ': granted=true')) {
                    permissionsMap[_perm] = true;
                  }
                }
                _context7.next = 41;
                break;

              case 37:
                _context7.prev = 37;
                _context7.t1 = _context7['catch'](33);
                _didIteratorError4 = true;
                _iteratorError4 = _context7.t1;

              case 41:
                _context7.prev = 41;
                _context7.prev = 42;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 44:
                _context7.prev = 44;

                if (!_didIteratorError4) {
                  _context7.next = 47;
                  break;
                }

                throw _iteratorError4;

              case 47:
                return _context7.finish(44);

              case 48:
                return _context7.finish(41);

              case 49:
                _iteratorNormalCompletion2 = true;
                _context7.next = 28;
                break;

              case 52:
                _context7.next = 58;
                break;

              case 54:
                _context7.prev = 54;
                _context7.t2 = _context7['catch'](26);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t2;

              case 58:
                _context7.prev = 58;
                _context7.prev = 59;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 61:
                _context7.prev = 61;

                if (!_didIteratorError2) {
                  _context7.next = 64;
                  break;
                }

                throw _iteratorError2;

              case 64:
                return _context7.finish(61);

              case 65:
                return _context7.finish(58);

              case 66:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context7.prev = 69;
                _iterator3 = permissions[Symbol.iterator]();

              case 71:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context7.next = 78;
                  break;
                }

                _perm2 = _step3.value;

                if (permissionsMap[_perm2]) {
                  _context7.next = 75;
                  break;
                }

                throw new _errors.UsageError('Required ' + _perm2 + ' has not be granted for ' + apk + '. ' + 'Please grant them using the Android Settings ' + 'or using the following adb command:\n' + ('\t adb shell pm grant ' + apk + ' ' + _perm2 + '\n'));

              case 75:
                _iteratorNormalCompletion3 = true;
                _context7.next = 71;
                break;

              case 78:
                _context7.next = 84;
                break;

              case 80:
                _context7.prev = 80;
                _context7.t3 = _context7['catch'](69);
                _didIteratorError3 = true;
                _iteratorError3 = _context7.t3;

              case 84:
                _context7.prev = 84;
                _context7.prev = 85;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 87:
                _context7.prev = 87;

                if (!_didIteratorError3) {
                  _context7.next = 90;
                  break;
                }

                throw _iteratorError3;

              case 90:
                return _context7.finish(87);

              case 91:
                return _context7.finish(84);

              case 92:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[4, 8, 12, 20], [13,, 15, 19], [26, 54, 58, 66], [33, 37, 41, 49], [42,, 44, 48], [59,, 61, 65], [69, 80, 84, 92], [85,, 87, 91]]);
      }));

      function ensureRequiredAPKRuntimePermissions(_x4, _x5, _x6) {
        return _ref7.apply(this, arguments);
      }

      return ensureRequiredAPKRuntimePermissions;
    }()
  }, {
    key: 'amForceStopAPK',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(deviceId, apk) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.runShellCommand(deviceId, ['am', 'force-stop', apk]);

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function amForceStopAPK(_x7, _x8) {
        return _ref8.apply(this, arguments);
      }

      return amForceStopAPK;
    }()
  }, {
    key: 'getOrCreateArtifactsDir',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(deviceId) {
        var artifactsDir, testDirOut;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                artifactsDir = this.artifactsDirMap.get(deviceId);

                if (!artifactsDir) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt('return', artifactsDir);

              case 3:

                artifactsDir = '/sdcard/web-ext-artifacts-' + Date.now();

                _context9.next = 6;
                return this.runShellCommand(deviceId, 'test -d ' + artifactsDir + ' ; echo $?');

              case 6:
                testDirOut = _context9.sent.trim();

                if (!(testDirOut !== '1')) {
                  _context9.next = 9;
                  break;
                }

                throw new _errors.WebExtError('Cannot create artifacts directory ' + artifactsDir + ' ' + ('because it exists on ' + deviceId + '.'));

              case 9:
                _context9.next = 11;
                return this.runShellCommand(deviceId, ['mkdir', '-p', artifactsDir]);

              case 11:

                this.artifactsDirMap.set(deviceId, artifactsDir);

                return _context9.abrupt('return', artifactsDir);

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getOrCreateArtifactsDir(_x9) {
        return _ref9.apply(this, arguments);
      }

      return getOrCreateArtifactsDir;
    }()
  }, {
    key: 'clearArtifactsDir',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(deviceId) {
        var artifactsDir;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                artifactsDir = this.artifactsDirMap.get(deviceId);

                if (artifactsDir) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt('return');

              case 3:

                this.artifactsDirMap.delete(deviceId);

                log.debug('Removing ' + artifactsDir + ' artifacts directory on ' + deviceId + ' device');

                _context10.next = 7;
                return this.runShellCommand(deviceId, ['rm', '-rf', artifactsDir]);

              case 7:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function clearArtifactsDir(_x10) {
        return _ref10.apply(this, arguments);
      }

      return clearArtifactsDir;
    }()
  }, {
    key: 'pushFile',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(deviceId, localPath, devicePath) {
        var _this3 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                adbClient = this.adbClient;


                log.debug('Pushing ' + localPath + ' to ' + devicePath + ' on ' + deviceId);

                _context12.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
                  return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return adbClient.push(deviceId, localPath, devicePath).then(function (transfer) {
                            return new Promise(function (resolve) {
                              transfer.on('end', resolve);
                            });
                          });

                        case 2:
                        case 'end':
                          return _context11.stop();
                      }
                    }
                  }, _callee11, _this3);
                })));

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function pushFile(_x11, _x12, _x13) {
        return _ref11.apply(this, arguments);
      }

      return pushFile;
    }()
  }, {
    key: 'startFirefoxAPK',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(deviceId, apk, deviceProfileDir) {
        var _this4 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                adbClient = this.adbClient;


                log.debug('Starting ' + apk + ' with profile ' + deviceProfileDir + ' on ' + deviceId);

                _context14.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
                  return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          _context13.next = 2;
                          return adbClient.startActivity(deviceId, {
                            wait: true,
                            action: 'android.activity.MAIN',
                            component: apk + '/.App',
                            extras: [{
                              key: 'args',
                              value: '-profile ' + deviceProfileDir
                            }]
                          });

                        case 2:
                        case 'end':
                          return _context13.stop();
                      }
                    }
                  }, _callee13, _this4);
                })));

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function startFirefoxAPK(_x14, _x15, _x16) {
        return _ref13.apply(this, arguments);
      }

      return startFirefoxAPK;
    }()
  }, {
    key: 'setUserAbortDiscovery',
    value: function setUserAbortDiscovery(value) {
      this.userAbortDiscovery = value;
    }
  }, {
    key: 'discoverRDPUnixSocket',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(deviceId, apk) {
        var _ref16 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            maxDiscoveryTime = _ref16.maxDiscoveryTime,
            retryInterval = _ref16.retryInterval;

        var rdpUnixSockets, discoveryStartedAt;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                rdpUnixSockets = [];
                discoveryStartedAt = Date.now();

              case 2:
                if (!(rdpUnixSockets.length === 0)) {
                  _context15.next = 16;
                  break;
                }

                if (!this.userAbortDiscovery) {
                  _context15.next = 5;
                  break;
                }

                throw new _errors.UsageError('Exiting Firefox Remote Debugging socket discovery on user request');

              case 5:
                if (!(Date.now() - discoveryStartedAt > maxDiscoveryTime)) {
                  _context15.next = 7;
                  break;
                }

                throw new _errors.WebExtError('Timeout while waiting for the Android Firefox Debugger Socket');

              case 7:
                _context15.next = 9;
                return this.runShellCommand(deviceId, ['cat', '/proc/net/unix']);

              case 9:
                _context15.t0 = function (line) {
                  // The RDP unix socket is expected to be a path in the form:
                  //   /data/data/org.mozilla.fennec_rpl/firefox-debugger-socket
                  return line.trim().endsWith(apk + '/firefox-debugger-socket');
                };

                rdpUnixSockets = _context15.sent.split('\n').filter(_context15.t0);

                if (!(rdpUnixSockets.length === 0)) {
                  _context15.next = 14;
                  break;
                }

                _context15.next = 14;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, retryInterval);
                });

              case 14:
                _context15.next = 2;
                break;

              case 16:

                // Convert into an array of unix socket filenames.
                rdpUnixSockets = rdpUnixSockets.map(function (line) {
                  return line.trim().split(/\s/).pop();
                });

                if (!(rdpUnixSockets.length > 1)) {
                  _context15.next = 19;
                  break;
                }

                throw new _errors.WebExtError('Unexpected multiple RDP sockets: ' + ('' + JSON.stringify(rdpUnixSockets)));

              case 19:
                return _context15.abrupt('return', rdpUnixSockets[0]);

              case 20:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function discoverRDPUnixSocket(_x17, _x18) {
        return _ref15.apply(this, arguments);
      }

      return discoverRDPUnixSocket;
    }()
  }, {
    key: 'setupForward',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(deviceId, remote, local) {
        var _this5 = this;

        var adbClient;
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                adbClient = this.adbClient;

                // TODO(rpl): we should use adb.listForwards and reuse the existing one if any (especially
                // because adbkit doesn't seem to support `adb forward --remote` yet).

                log.debug('Configuring ADB forward for ' + deviceId + ': ' + remote + ' -> ' + local);

                _context17.next = 4;
                return wrapADBCall((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
                  return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          _context16.next = 2;
                          return adbClient.forward(deviceId, local, remote);

                        case 2:
                        case 'end':
                          return _context16.stop();
                      }
                    }
                  }, _callee16, _this5);
                })));

              case 4:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function setupForward(_x20, _x21, _x22) {
        return _ref17.apply(this, arguments);
      }

      return setupForward;
    }()
  }]);
  return ADBUtils;
}();

exports.default = ADBUtils;
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/adb.js"))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonOverridablePreferences = undefined;

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

exports.getPrefs = getPrefs;
exports.coerceCLICustomPreference = coerceCLICustomPreference;

var _errors = __webpack_require__(5);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var nonOverridablePreferences = exports.nonOverridablePreferences = ['devtools.debugger.remote-enabled', 'devtools.debugger.prompt-connection', 'xpinstall.signatures.required'];

// Flow Types

// Preferences Maps

var prefsCommon = {
  // Allow debug output via dump to be printed to the system console
  'browser.dom.window.dump.enabled': true,
  // Warn about possibly incorrect code.
  'javascript.options.strict': true,
  'javascript.options.showInConsole': true,

  // Allow remote connections to the debugger.
  'devtools.debugger.remote-enabled': true,
  // Disable the prompt for allowing connections.
  'devtools.debugger.prompt-connection': false,

  // Turn off platform logging because it is a lot of info.
  'extensions.logging.enabled': false,

  // Disable extension updates and notifications.
  'extensions.checkCompatibility.nightly': false,
  'extensions.update.enabled': false,
  'extensions.update.notifyUser': false,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l372
  // Only load extensions from the application and user profile.
  // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
  'extensions.enabledScopes': 5,
  // Disable metadata caching for installed add-ons by default.
  'extensions.getAddons.cache.enabled': false,
  // Disable intalling any distribution add-ons.
  'extensions.installDistroAddons': false,
  // Allow installing extensions dropped into the profile folder.
  'extensions.autoDisableScopes': 10,

  // Disable app update.
  'app.update.enabled': false,

  // Allow unsigned add-ons.
  'xpinstall.signatures.required': false
};

// Prefs specific to Firefox for Android.
var prefsFennec = {
  'browser.console.showInPanel': true,
  'browser.firstrun.show.uidiscovery': false,
  'devtools.remote.usb.enabled': true
};

// Prefs specific to Firefox for desktop.
var prefsFirefox = {
  'browser.startup.homepage': 'about:blank',
  'startup.homepage_welcome_url': 'about:blank',
  'startup.homepage_welcome_url.additional': '',
  'devtools.errorconsole.enabled': true,
  'devtools.chrome.enabled': true,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l388
  // Make url-classifier updates so rare that they won't affect tests.
  'urlclassifier.updateinterval': 172800,
  // Point the url-classifier to a nonexistent local URL for fast failures.
  'browser.safebrowsing.provider.0.gethashURL': 'http://localhost/safebrowsing-dummy/gethash',
  'browser.safebrowsing.provider.0.keyURL': 'http://localhost/safebrowsing-dummy/newkey',
  'browser.safebrowsing.provider.0.updateURL': 'http://localhost/safebrowsing-dummy/update',

  // Disable self repair/SHIELD
  'browser.selfsupport.url': 'https://localhost/selfrepair',
  // Disable Reader Mode UI tour
  'browser.reader.detectedFirstArticle': true,

  // Set the policy firstURL to an empty string to prevent
  // the privacy info page to be opened on every "web-ext run".
  // (See #1114 for rationale)
  'datareporting.policy.firstRunURL': ''
};

var prefs = {
  common: prefsCommon,
  fennec: prefsFennec,
  firefox: prefsFirefox
};

// Module exports

function getPrefs() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'firefox';

  var appPrefs = prefs[app];
  if (!appPrefs) {
    throw new _errors.WebExtError('Unsupported application: ' + app);
  }
  return (0, _extends3.default)({}, prefsCommon, appPrefs);
}

function coerceCLICustomPreference(cliPrefs) {
  var customPrefs = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cliPrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pref = _step.value;

      var prefsAry = pref.split('=');

      if (prefsAry.length < 2) {
        throw new _errors.UsageError('Incomplete custom preference: "' + pref + '". ' + 'Syntax expected: "prefname=prefvalue".');
      }

      var _key = prefsAry[0];
      var value = prefsAry.slice(1).join('=');

      if (/[^\w{@}.-]/.test(_key)) {
        throw new _errors.UsageError('Invalid custom preference name: ' + _key);
      }

      if (value === '' + parseInt(value)) {
        value = parseInt(value, 10);
      } else if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      if (nonOverridablePreferences.includes(_key)) {
        log.warn('\'' + _key + '\' preference cannot be customized.');
        continue;
      }
      customPrefs['' + _key] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return customPrefs;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/preferences.js"))

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TempDir = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.withTempDir = withTempDir;

var _tmp = __webpack_require__(171);

var _tmp2 = _interopRequireDefault(_tmp);

var _es6Promisify = __webpack_require__(34);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/*
 * Work with a self-destructing temporary directory in a promise chain.
 *
 * The directory will be destroyed when the promise chain is finished
 * (whether there was an error or not).
 *
 * Usage:
 *
 * withTempDir(
 *   (tmpDir) =>
 *     doSomething(tmpDir.path())
 *     .then(...)
 * );
 *
 */

function withTempDir(makePromise) {
  var tmpDir = new TempDir();
  return tmpDir.create().then(function () {
    return makePromise(tmpDir);
  }).catch(tmpDir.errorHandler()).then(tmpDir.successHandler());
}

/*
 * Work with a self-destructing temporary directory object.
 *
 * It is safer to use withTempDir() instead but if you know
 * what you're doing you can use it directly like:
 *
 * let tmpDir = new TempDir();
 * tmpDir.create()
 *   .then(() => {
 *     // work with tmpDir.path()
 *   })
 *   .catch(tmpDir.errorHandler())
 *   .then(tmpDir.successHandler());
 *
 */

var TempDir = exports.TempDir = function () {
  function TempDir() {
    (0, _classCallCheck3.default)(this, TempDir);

    this._path = undefined;
    this._removeTempDir = undefined;
  }

  /*
   * Returns a promise that is fulfilled when the temp directory has
   * been created.
   */


  (0, _createClass3.default)(TempDir, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var createTempDir = (0, _es6Promisify2.default)(_tmp2.default.dir, { multiArgs: true });
      return createTempDir({
        prefix: 'tmp-web-ext-',
        // This allows us to remove a non-empty tmp dir.
        unsafeCleanup: true
      }).then(function (args) {
        var _args = (0, _slicedToArray3.default)(args, 2),
            tmpPath = _args[0],
            removeTempDir = _args[1];

        _this._path = tmpPath;
        _this._removeTempDir = removeTempDir;
        log.debug('Created temporary directory: ' + _this.path());
        return _this;
      });
    }

    /*
     * Get the absolute path of the temp directory.
     */

  }, {
    key: 'path',
    value: function path() {
      if (!this._path) {
        throw new Error('You cannot access path() before calling create()');
      }
      return this._path;
    }

    /*
     * Returns a callback that will catch an error, remove
     * the temporary directory, and throw the error.
     *
     * This is intended for use in a promise like
     * Promise().catch(tmp.errorHandler())
     */

  }, {
    key: 'errorHandler',
    value: function errorHandler() {
      var _this2 = this;

      return function (error) {
        _this2.remove();
        throw error;
      };
    }

    /*
     * Returns a callback that will remove the temporary direcotry.
     *
     * This is intended for use in a promise like
     * Promise().then(tmp.successHandler())
     */

  }, {
    key: 'successHandler',
    value: function successHandler() {
      var _this3 = this;

      return function (promiseResult) {
        _this3.remove();
        return promiseResult;
      };
    }

    /*
     * Remove the temp directory.
     */

  }, {
    key: 'remove',
    value: function remove() {
      if (!this._removeTempDir) {
        return;
      }
      log.debug('Removing temporary directory: ' + this.path());
      this._removeTempDir && this._removeTempDir();
    }
  }]);
  return TempDir;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/temp-dir.js"))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _program = __webpack_require__(88);

var _cmd = __webpack_require__(75);

var _cmd2 = _interopRequireDefault(_cmd);

var _logger = __webpack_require__(0);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This only exposes util/logger so far.
// Do we need anything else?
var util = { logger: logger };
exports.default = { main: _program.main, cmd: _cmd2.default, util: util };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(90);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.defaultVersionGetter = defaultVersionGetter;
exports.main = main;

var _os = __webpack_require__(73);

var _os2 = _interopRequireDefault(_os);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(51);

var _camelcase = __webpack_require__(74);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _gitRevSync = __webpack_require__(122);

var _gitRevSync2 = _interopRequireDefault(_gitRevSync);

var _yargs = __webpack_require__(123);

var _yargs2 = _interopRequireDefault(_yargs);

var _cmd = __webpack_require__(75);

var _cmd2 = _interopRequireDefault(_cmd);

var _errors = __webpack_require__(5);

var _logger = __webpack_require__(0);

var _preferences = __webpack_require__(83);

var _updates = __webpack_require__(176);

var _config = __webpack_require__(178);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var envPrefix = 'WEB_EXT';

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

/*
 * The command line program.
 */
var Program = exports.Program = function () {
  function Program(argv) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$absolutePackageD = _ref.absolutePackageDir,
        absolutePackageDir = _ref$absolutePackageD === undefined ? process.cwd() : _ref$absolutePackageD;

    (0, _classCallCheck3.default)(this, Program);

    // This allows us to override the process argv which is useful for
    // testing.
    // NOTE: process.argv.slice(2) removes the path to node and web-ext
    // executables from the process.argv array.
    argv = argv || process.argv.slice(2);

    // NOTE: always initialize yargs explicitly with the package dir
    // so that we are sure that it is going to load the 'boolean-negation: false'
    // config (See web-ext#469 for rationale).
    var yargsInstance = (0, _yargs2.default)(argv, absolutePackageDir);

    this.verboseEnabled = false;
    this.shouldExitProgram = true;
    this.yargs = yargsInstance;
    this.yargs.strict();

    this.commands = {};
    this.options = {};
  }

  (0, _createClass3.default)(Program, [{
    key: 'command',
    value: function command(name, description, executor) {
      var _this = this;

      var commandOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.options[(0, _camelcase2.default)(name)] = commandOptions;

      this.yargs.command(name, description, function (yargsForCmd) {
        if (!commandOptions) {
          return;
        }
        return yargsForCmd
        // Make sure the user does not add any extra commands. For example,
        // this would be a mistake because lint does not accept arguments:
        // web-ext lint ./src/path/to/file.js
        .demandCommand(0, 0, undefined, 'This command does not take any arguments').strict().exitProcess(_this.shouldExitProgram)
        // Calling env() will be unnecessary after
        // https://github.com/yargs/yargs/issues/486 is fixed
        .env(envPrefix).options(commandOptions);
      });
      this.commands[name] = executor;
      return this;
    }
  }, {
    key: 'setGlobalOptions',
    value: function setGlobalOptions(options) {
      // This is a convenience for setting global options.
      // An option is only global (i.e. available to all sub commands)
      // with the `global` flag so this makes sure every option has it.
      this.options = (0, _extends3.default)({}, this.options, options);
      Object.keys(options).forEach(function (key) {
        options[key].global = true;
        if (options[key].demand === undefined) {
          // By default, all options should be "demanded" otherwise
          // yargs.strict() will think they are missing when declared.
          options[key].demand = true;
        }
      });
      this.yargs.options(options);
      return this;
    }
  }, {
    key: 'enableVerboseMode',
    value: function enableVerboseMode(logStream, version) {
      if (this.verboseEnabled) {
        return;
      }

      logStream.makeVerbose();
      log.info('Version:', version);
      this.verboseEnabled = true;
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(absolutePackageDir) {
        var _this2 = this;

        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$checkForUpdates = _ref3.checkForUpdates,
            checkForUpdates = _ref3$checkForUpdates === undefined ? _updates.checkForUpdates : _ref3$checkForUpdates,
            _ref3$systemProcess = _ref3.systemProcess,
            systemProcess = _ref3$systemProcess === undefined ? process : _ref3$systemProcess,
            _ref3$logStream = _ref3.logStream,
            logStream = _ref3$logStream === undefined ? _logger.consoleStream : _ref3$logStream,
            _ref3$getVersion = _ref3.getVersion,
            getVersion = _ref3$getVersion === undefined ? defaultVersionGetter : _ref3$getVersion,
            _ref3$applyConfigToAr = _ref3.applyConfigToArgv,
            applyConfigToArgv = _ref3$applyConfigToAr === undefined ? _config.applyConfigToArgv : _ref3$applyConfigToAr,
            _ref3$discoverConfigF = _ref3.discoverConfigFiles,
            discoverConfigFiles = _ref3$discoverConfigF === undefined ? _config.discoverConfigFiles : _ref3$discoverConfigF,
            _ref3$loadJSConfigFil = _ref3.loadJSConfigFile,
            loadJSConfigFile = _ref3$loadJSConfigFil === undefined ? _config.loadJSConfigFile : _ref3$loadJSConfigFil,
            _ref3$shouldExitProgr = _ref3.shouldExitProgram,
            shouldExitProgram = _ref3$shouldExitProgr === undefined ? true : _ref3$shouldExitProgr,
            _ref3$globalEnv = _ref3.globalEnv,
            globalEnv = _ref3$globalEnv === undefined ? "development" : _ref3$globalEnv;

        var argv, cmd, version, runCommand, adjustedArgv, configFiles, discoveredConfigs, niceFileList;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.shouldExitProgram = shouldExitProgram;
                this.yargs.exitProcess(this.shouldExitProgram);

                argv = this.yargs.argv;
                cmd = argv._[0];
                version = getVersion(absolutePackageDir);
                runCommand = this.commands[cmd];


                if (argv.verbose) {
                  this.enableVerboseMode(logStream, version);
                }

                adjustedArgv = (0, _extends3.default)({}, argv);
                _context.prev = 8;

                if (!(cmd === undefined)) {
                  _context.next = 11;
                  break;
                }

                throw new _errors.UsageError('No sub-command was specified in the args');

              case 11:
                if (runCommand) {
                  _context.next = 13;
                  break;
                }

                throw new _errors.UsageError('Unknown command: ' + cmd);

              case 13:
                if (globalEnv === 'production') {
                  checkForUpdates({
                    version: getVersion(absolutePackageDir)
                  });
                }

                configFiles = [];

                if (!argv.configDiscovery) {
                  _context.next = 23;
                  break;
                }

                log.debug('Discovering config files. ' + 'Set --no-config-discovery to disable');
                _context.next = 19;
                return discoverConfigFiles();

              case 19:
                discoveredConfigs = _context.sent;

                configFiles.push.apply(configFiles, (0, _toConsumableArray3.default)(discoveredConfigs));
                _context.next = 24;
                break;

              case 23:
                log.debug('Not discovering config files');

              case 24:

                if (argv.config) {
                  configFiles.push(_path2.default.resolve(argv.config));
                }

                if (configFiles.length) {
                  niceFileList = configFiles.map(function (f) {
                    return f.replace(process.cwd(), '.');
                  }).map(function (f) {
                    return f.replace(_os2.default.homedir(), '~');
                  }).join(', ');

                  log.info('Applying config file' + ((configFiles.length !== 1 ? 's' : '') + ': ') + ('' + niceFileList));
                }

                configFiles.forEach(function (configFileName) {
                  var configObject = loadJSConfigFile(configFileName);
                  adjustedArgv = applyConfigToArgv({
                    argv: adjustedArgv,
                    argvFromCLI: argv,
                    configFileName: configFileName,
                    configObject: configObject,
                    options: _this2.options
                  });
                });

                if (adjustedArgv.verbose) {
                  // Ensure that the verbose is enabled when specified in a config file.
                  this.enableVerboseMode(logStream, version);
                }

                _context.next = 30;
                return runCommand(adjustedArgv, { shouldExitProgram: shouldExitProgram });

              case 30:
                _context.next = 42;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context['catch'](8);

                if (!(_context.t0 instanceof _errors.UsageError) || adjustedArgv.verbose) {
                  log.error('\n' + _context.t0.stack + '\n');
                } else {
                  log.error('\n' + _context.t0 + '\n');
                }
                if (_context.t0.code) {
                  log.error('Error code: ' + _context.t0.code + '\n');
                }

                log.debug('Command executed: ' + cmd);

                if (!this.shouldExitProgram) {
                  _context.next = 41;
                  break;
                }

                systemProcess.exit(1);
                _context.next = 42;
                break;

              case 41:
                throw _context.t0;

              case 42:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 32]]);
      }));

      function execute(_x3) {
        return _ref2.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Program;
}();

// A global variable generated by DefinePlugin, generated in webpack.config.js


//A defintion of type of argument for defaultVersionGetter


function defaultVersionGetter(absolutePackageDir) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$globalEnv = _ref4.globalEnv,
      globalEnv = _ref4$globalEnv === undefined ? "development" : _ref4$globalEnv;

  if (globalEnv === 'production') {
    log.debug('Getting the version from package.json');
    var packageData = (0, _fs.readFileSync)(_path2.default.join(absolutePackageDir, 'package.json'));
    return JSON.parse(packageData).version;
  } else {
    log.debug('Getting version from the git revision');
    return _gitRevSync2.default.branch(absolutePackageDir) + '-' + _gitRevSync2.default.long(absolutePackageDir);
  }
}

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

function main(absolutePackageDir) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$getVersion = _ref5.getVersion,
      getVersion = _ref5$getVersion === undefined ? defaultVersionGetter : _ref5$getVersion,
      _ref5$commands = _ref5.commands,
      commands = _ref5$commands === undefined ? _cmd2.default : _ref5$commands,
      argv = _ref5.argv,
      _ref5$runOptions = _ref5.runOptions,
      runOptions = _ref5$runOptions === undefined ? {} : _ref5$runOptions;

  var program = new Program(argv, { absolutePackageDir: absolutePackageDir });

  // yargs uses magic camel case expansion to expose options on the
  // final argv object. For example, the 'artifacts-dir' option is alternatively
  // available as argv.artifactsDir.
  program.yargs.usage('Usage: $0 [options] command\n\nOption values can also be set by declaring an environment variable prefixed\nwith $' + envPrefix + '_. For example: $' + envPrefix + '_SOURCE_DIR=/path is the same as\n--source-dir=/path.\n\nTo view specific help for any given command, add the command name.\nExample: $0 --help run.\n').help('help').alias('h', 'help').env(envPrefix).version(function () {
    return getVersion(absolutePackageDir);
  }).demandCommand(1, 'You must specify a command').strict();

  program.setGlobalOptions({
    'source-dir': {
      alias: 's',
      describe: 'Web extension source directory.',
      default: process.cwd(),
      requiresArg: true,
      type: 'array',
      coerce: function coerce(params) {
        return params.map(function (p) {
          return _path2.default.resolve(p);
        });
      }
    },
    'artifacts-dir': {
      alias: 'a',
      describe: 'Directory where artifacts will be saved.',
      default: _path2.default.join(process.cwd(), 'web-ext-artifacts'),
      normalize: true,
      requiresArg: true,
      type: 'string'
    },
    'verbose': {
      alias: 'v',
      describe: 'Show verbose output',
      type: 'boolean'
    },
    'ignore-files': {
      alias: 'i',
      describe: 'A list of glob patterns to define which files should be ' + 'ignored. (Example: --ignore-files=path/to/first.js ' + 'path/to/second.js "**/*.log")',
      demand: false,
      requiresArg: true,
      type: 'array'
    },
    'no-input': {
      describe: 'Disable all features that require standard input',
      type: 'boolean'
    },
    'config': {
      alias: 'c',
      describe: 'Path to a CommonJS config file to set ' + 'option defaults',
      default: undefined,
      demand: false,
      requiresArg: true,
      type: 'string'
    },
    'config-discovery': {
      describe: 'Discover config files in home directory and ' + 'working directory. Disable with --no-config-discovery.',
      demand: false,
      default: true,
      type: 'boolean'
    }
  });

  program.command('build', 'Create an extension package from source', commands.build, {
    'as-needed': {
      describe: 'Watch for file changes and re-build as needed',
      type: 'boolean'
    },
    'overwrite-dest': {
      alias: 'o',
      describe: 'Overwrite destination package if it exists.',
      type: 'boolean'
    }
  }).command('sign', 'Sign the extension so it can be installed in Firefox', commands.sign, {
    'api-key': {
      describe: 'API key (JWT issuer) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-secret': {
      describe: 'API secret (JWT secret) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-url-prefix': {
      describe: 'Signing API URL prefix',
      default: 'https://addons.mozilla.org/api/v3',
      demand: true,
      type: 'string'
    },
    'api-proxy': {
      describe: 'Use a proxy to access the signing API. ' + 'Example: https://yourproxy:6000 ',
      demand: false,
      type: 'string'
    },
    'id': {
      describe: 'A custom ID for the extension. This has no effect if the ' + 'extension already declares an explicit ID in its manifest.',
      demand: false,
      type: 'string'
    },
    'timeout': {
      describe: 'Number of milliseconds to wait before giving up',
      type: 'number'
    }
  }).command('run', 'Run the extension', commands.run, {
    'target': {
      alias: 't',
      describe: 'The extensions runners to enable (e.g. firefox-desktop, ' + 'firefox-android). Specify this option multiple times to ' + 'run against multiple targets.',
      default: 'firefox-desktop',
      demand: false,
      type: 'array'
    },
    'firefox': {
      alias: ['f', 'firefox-binary'],
      describe: 'Path or alias to a Firefox executable such as firefox-bin ' + 'or firefox.exe. ' + 'If not specified, the default Firefox will be used. ' + 'You can specify the following aliases in lieu of a path: ' + 'firefox, beta, nightly, firefoxdeveloperedition.',
      demand: false,
      type: 'string'
    },
    'firefox-profile': {
      alias: 'p',
      describe: 'Run Firefox using a copy of this profile. The profile ' + 'can be specified as a directory or a name, such as one ' + 'you would see in the Profile Manager. If not specified, ' + 'a new temporary profile will be created.',
      demand: false,
      type: 'string'
    },
    'keep-profile-changes': {
      describe: 'Run Firefox directly in custom profile. Any changes to ' + 'the profile will be saved.',
      demand: false,
      type: 'boolean'
    },
    'no-reload': {
      describe: 'Do not reload the extension when source files change',
      demand: false,
      type: 'boolean'
    },
    'pre-install': {
      describe: 'Pre-install the extension into the profile before ' + 'startup. This is only needed to support older versions ' + 'of Firefox.',
      demand: false,
      type: 'boolean'
    },
    'pref': {
      describe: 'Launch firefox with a custom preference ' + '(example: --pref=general.useragent.locale=fr-FR). ' + 'You can repeat this option to set more than one ' + 'preference.',
      demand: false,
      requiresArg: true,
      type: 'array',
      coerce: _preferences.coerceCLICustomPreference
    },
    'start-url': {
      alias: ['u', 'url'],
      describe: 'Launch firefox at specified page',
      demand: false,
      requiresArg: true,
      type: 'array'
    },
    'browser-console': {
      alias: ['bc'],
      describe: 'Open the DevTools Browser Console.',
      demand: false,
      type: 'boolean'
    },
    // Firefox for Android CLI options.
    'adb-bin': {
      describe: 'Specify a custom path to the adb binary',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-host': {
      describe: 'Connect to adb on the specified host',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-port': {
      describe: 'Connect to adb on the specified port',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'adb-device': {
      alias: ['android-device'],
      describe: 'Connect to the specified adb device name',
      demand: false,
      type: 'string',
      requiresArg: true
    },
    'firefox-apk': {
      describe: 'Run a specific Firefox for Android APK. ' + 'Example: org.mozilla.fennec_aurora',
      demand: false,
      type: 'string',
      requiresArg: true
    }
  }).command('lint', 'Validate the extension source', commands.lint, {
    'output': {
      alias: 'o',
      describe: 'The type of output to generate',
      type: 'string',
      default: 'text',
      choices: ['json', 'text']
    },
    'metadata': {
      describe: 'Output only metadata as JSON',
      type: 'boolean',
      default: false
    },
    'warnings-as-errors': {
      describe: 'Treat warnings as errors by exiting non-zero for warnings',
      alias: 'w',
      type: 'boolean',
      default: false
    },
    'pretty': {
      describe: 'Prettify JSON output',
      type: 'boolean',
      default: false
    },
    'self-hosted': {
      describe: 'Your extension will be self-hosted. This disables messages ' + 'related to hosting on addons.mozilla.org.',
      type: 'boolean',
      default: false
    },
    'boring': {
      describe: 'Disables colorful shell output',
      type: 'boolean',
      default: false
    }
  }).command('docs', 'Open the web-ext documentation in a browser', commands.docs, {});

  return program.execute(absolutePackageDir, runOptions);
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/program.js"))

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(91);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(99);
module.exports = __webpack_require__(1).Array.from;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var defined = __webpack_require__(38);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(41);
var descriptor = __webpack_require__(23);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(29);

module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(42);
var toAbsoluteIndex = __webpack_require__(97);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(46);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(7);
var toObject = __webpack_require__(46);
var call = __webpack_require__(65);
var isArrayIter = __webpack_require__(66);
var toLength = __webpack_require__(42);
var createProperty = __webpack_require__(100);
var getIterFn = __webpack_require__(47);

$export($export.S + $export.F * !__webpack_require__(67)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(10);
var createDesc = __webpack_require__(23);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(21);
__webpack_require__(32);
__webpack_require__(106);
__webpack_require__(113);
__webpack_require__(114);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(104);
var step = __webpack_require__(105);
var Iterators = __webpack_require__(19);
var toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(59)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var global = __webpack_require__(6);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(48);
var $export = __webpack_require__(7);
var isObject = __webpack_require__(12);
var aFunction = __webpack_require__(28);
var anInstance = __webpack_require__(107);
var forOf = __webpack_require__(108);
var speciesConstructor = __webpack_require__(69);
var task = __webpack_require__(70).set;
var microtask = __webpack_require__(110)();
var newPromiseCapabilityModule = __webpack_require__(49);
var perform = __webpack_require__(71);
var promiseResolve = __webpack_require__(72);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(111)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(31)($Promise, PROMISE);
__webpack_require__(112)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(67)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(65);
var isArrayIter = __webpack_require__(66);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(42);
var getIterFn = __webpack_require__(47);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var macrotask = __webpack_require__(70).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var core = __webpack_require__(1);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(13);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(7);
var core = __webpack_require__(1);
var global = __webpack_require__(6);
var speciesConstructor = __webpack_require__(69);
var promiseResolve = __webpack_require__(72);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(49);
var perform = __webpack_require__(71);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(118) });


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(33);
var toObject = __webpack_require__(46);
var IObject = __webpack_require__(63);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(22)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(13), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("git-rev-sync");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("watchpack");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("debounce");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipDir = undefined;

var _zipDir = __webpack_require__(128);

var _zipDir2 = _interopRequireDefault(_zipDir);

var _es6Promisify = __webpack_require__(34);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zipDir = exports.zipDir = (0, _es6Promisify2.default)(_zipDir2.default);

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("zip-dir");

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(21);
module.exports = __webpack_require__(131);


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(19);
module.exports = __webpack_require__(1).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(21);
module.exports = __webpack_require__(134);


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(47);
module.exports = __webpack_require__(1).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(53);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(32);
module.exports = __webpack_require__(54).f('iterator');


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(140);
__webpack_require__(68);
__webpack_require__(145);
__webpack_require__(146);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(13);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(61);
var META = __webpack_require__(141).KEY;
var $fails = __webpack_require__(22);
var shared = __webpack_require__(44);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(30);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(54);
var wksDefine = __webpack_require__(55);
var enumKeys = __webpack_require__(142);
var isArray = __webpack_require__(143);
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(12);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(40);
var createDesc = __webpack_require__(23);
var _create = __webpack_require__(41);
var gOPNExt = __webpack_require__(144);
var $GOPD = __webpack_require__(80);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(29);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(79).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(33).f = $propertyIsEnumerable;
  __webpack_require__(50).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(27)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(30)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(22)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(33);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(20);
var gOPN = __webpack_require__(79).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('asyncIterator');


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('observable');


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(148);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(152);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(53);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(7);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(151).set });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12);
var anObject = __webpack_require__(8);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(18)(Function.call, __webpack_require__(80).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(41) });


/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = require("es6-error");

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = require("minimatch");

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lint;

var _addonsLinter = __webpack_require__(159);

var _logger = __webpack_require__(0);

var _fileFilter = __webpack_require__(56);

// import flow types
var log = (0, _logger.createLogger)(__filename);

// Define the needed 'addons-linter' module flow types.

// Lint command types and implementation.

function lint(_ref) {
  var artifactsDir = _ref.artifactsDir,
      boring = _ref.boring,
      ignoreFiles = _ref.ignoreFiles,
      metadata = _ref.metadata,
      output = _ref.output,
      pretty = _ref.pretty,
      sourceDir = _ref.sourceDir,
      selfHosted = _ref.selfHosted,
      verbose = _ref.verbose,
      warningsAsErrors = _ref.warningsAsErrors;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$createLinter = _ref2.createLinter,
      createLinter = _ref2$createLinter === undefined ? _addonsLinter.createInstance : _ref2$createLinter,
      _ref2$createFileFilte = _ref2.createFileFilter,
      createFileFilter = _ref2$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref2$createFileFilte,
      _ref2$shouldExitProgr = _ref2.shouldExitProgram,
      shouldExitProgram = _ref2$shouldExitProgr === undefined ? true : _ref2$shouldExitProgr;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: artifactsDir });

  log.debug('Running addons-linter on ' + sourceDir);
  var linter = createLinter({
    config: {
      logLevel: verbose ? 'debug' : 'fatal',
      stack: Boolean(verbose),
      pretty: pretty,
      warningsAsErrors: warningsAsErrors,
      metadata: metadata,
      output: output,
      boring: boring,
      selfHosted: selfHosted,
      shouldScanFile: function shouldScanFile(fileName) {
        return fileFilter.wantFile(fileName);
      },
      // This mimics the first command line argument from yargs,
      // which should be the directory to the extension.
      _: [sourceDir]
    },
    runAsBinary: shouldExitProgram
  });
  return linter.run();
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/lint.js"))

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = require("addons-linter");

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _build = __webpack_require__(52);

var _build2 = _interopRequireDefault(_build);

var _adb = __webpack_require__(82);

var _adb2 = _interopRequireDefault(_adb);

var _desktopNotifier = __webpack_require__(57);

var _firefox = __webpack_require__(58);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(36);

var _logger = __webpack_require__(0);

var _manifest = __webpack_require__(35);

var _manifest2 = _interopRequireDefault(_manifest);

var _extensionRunners = __webpack_require__(167);

var _firefoxDesktop = __webpack_require__(168);

var _firefoxAndroid = __webpack_require__(169);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import objects that are only used as Flow types.
var log = (0, _logger.createLogger)(__filename);

// Run command types and implementation.

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref2) {
    var _this = this;

    var artifactsDir = _ref2.artifactsDir,
        _ref2$browserConsole = _ref2.browserConsole,
        browserConsole = _ref2$browserConsole === undefined ? false : _ref2$browserConsole,
        pref = _ref2.pref,
        firefox = _ref2.firefox,
        firefoxProfile = _ref2.firefoxProfile,
        _ref2$keepProfileChan = _ref2.keepProfileChanges,
        keepProfileChanges = _ref2$keepProfileChan === undefined ? false : _ref2$keepProfileChan,
        ignoreFiles = _ref2.ignoreFiles,
        _ref2$noInput = _ref2.noInput,
        noInput = _ref2$noInput === undefined ? false : _ref2$noInput,
        _ref2$noReload = _ref2.noReload,
        noReload = _ref2$noReload === undefined ? false : _ref2$noReload,
        _ref2$preInstall = _ref2.preInstall,
        preInstall = _ref2$preInstall === undefined ? false : _ref2$preInstall,
        sourceDir = _ref2.sourceDir,
        startUrl = _ref2.startUrl,
        target = _ref2.target,
        adbBin = _ref2.adbBin,
        adbHost = _ref2.adbHost,
        adbPort = _ref2.adbPort,
        adbDevice = _ref2.adbDevice,
        firefoxApk = _ref2.firefoxApk;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$buildExtension = _ref3.buildExtension,
        buildExtension = _ref3$buildExtension === undefined ? _build2.default : _ref3$buildExtension,
        _ref3$desktopNotifica = _ref3.desktopNotifications,
        desktopNotifications = _ref3$desktopNotifica === undefined ? _desktopNotifier.showDesktopNotification : _ref3$desktopNotifica,
        _ref3$firefoxApp = _ref3.firefoxApp,
        firefoxApp = _ref3$firefoxApp === undefined ? defaultFirefoxApp : _ref3$firefoxApp,
        _ref3$firefoxClient = _ref3.firefoxClient,
        firefoxClient = _ref3$firefoxClient === undefined ? _remote.connectWithMaxRetries : _ref3$firefoxClient,
        _ref3$reloadStrategy = _ref3.reloadStrategy,
        reloadStrategy = _ref3$reloadStrategy === undefined ? _extensionRunners.defaultReloadStrategy : _ref3$reloadStrategy,
        _ref3$FirefoxAndroidE = _ref3.FirefoxAndroidExtensionRunner,
        FirefoxAndroidExtensionRunner = _ref3$FirefoxAndroidE === undefined ? _firefoxAndroid.FirefoxAndroidExtensionRunner : _ref3$FirefoxAndroidE,
        _ref3$FirefoxDesktopE = _ref3.FirefoxDesktopExtensionRunner,
        FirefoxDesktopExtensionRunner = _ref3$FirefoxDesktopE === undefined ? _firefoxDesktop.FirefoxDesktopExtensionRunner : _ref3$FirefoxDesktopE,
        _ref3$MultiExtensionR = _ref3.MultiExtensionRunner,
        MultiExtensionRunner = _ref3$MultiExtensionR === undefined ? _extensionRunners.MultiExtensionRunner : _ref3$MultiExtensionR,
        _ref3$getValidatedMan = _ref3.getValidatedManifest,
        getValidatedManifest = _ref3$getValidatedMan === undefined ? _manifest2.default : _ref3$getValidatedMan;

    var customPrefs, extensions, runners, commonRunnerParams, firefoxDesktopRunnerParams, firefoxDesktopRunner, firefoxAndroidRunnerParams, firefoxAndroidRunner, extensionRunner;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            log.info('Running web extension from ' + sourceDir.join(','));
            if (preInstall) {
              log.info('Disabled auto-reloading because it\'s not possible with ' + '--pre-install');
              noReload = true;
            }

            // Create an alias for --pref since it has been transformed into an
            // object containing one or more preferences.
            customPrefs = pref;
            _context2.next = 5;
            return Promise.all(sourceDir.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dir) {
                var manifestData;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return getValidatedManifest(dir);

                      case 2:
                        manifestData = _context.sent;
                        return _context.abrupt('return', { sourceDir: dir, manifestData: manifestData });

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 5:
            extensions = _context2.sent;
            runners = [];
            commonRunnerParams = {
              // Common options.
              extensions: extensions,
              keepProfileChanges: keepProfileChanges,
              startUrl: startUrl,
              desktopNotifications: desktopNotifications
            };


            if (!target || target.length === 0 || target.includes('firefox-desktop')) {
              firefoxDesktopRunnerParams = (0, _extends3.default)({}, commonRunnerParams, {

                // Firefox specific CLI options.
                firefoxBinary: firefox,
                profilePath: firefoxProfile,
                customPrefs: customPrefs,
                browserConsole: browserConsole,
                preInstall: preInstall,

                // Firefox runner injected dependencies.
                firefoxApp: firefoxApp,
                firefoxClient: firefoxClient
              });
              firefoxDesktopRunner = new FirefoxDesktopExtensionRunner(firefoxDesktopRunnerParams);


              runners.push(firefoxDesktopRunner);
            }

            if (target && target.includes('firefox-android')) {
              firefoxAndroidRunnerParams = (0, _extends3.default)({}, commonRunnerParams, {

                // Firefox specific CLI options.
                profilePath: firefoxProfile,
                customPrefs: customPrefs,
                browserConsole: browserConsole,
                preInstall: preInstall,
                firefoxApk: firefoxApk,
                adbDevice: adbDevice,
                adbHost: adbHost,
                adbPort: adbPort,
                adbBin: adbBin,

                // Injected dependencies.
                firefoxApp: firefoxApp,
                firefoxClient: firefoxClient,
                ADBUtils: _adb2.default,
                desktopNotifications: _desktopNotifier.showDesktopNotification,
                buildSourceDir: function buildSourceDir(extensionSourceDir, tmpArtifactsDir) {
                  return buildExtension({
                    sourceDir: extensionSourceDir,
                    ignoreFiles: ignoreFiles,
                    asNeeded: false,
                    // Use a separate temporary directory for building the extension zip file
                    // that we are going to upload on the android device.
                    artifactsDir: tmpArtifactsDir
                  }, {
                    // Suppress the message usually logged by web-ext build.
                    showReadyMessage: false
                  });
                }
              });
              firefoxAndroidRunner = new FirefoxAndroidExtensionRunner((0, _extends3.default)({}, commonRunnerParams, firefoxAndroidRunnerParams));


              runners.push(firefoxAndroidRunner);
            }

            extensionRunner = new MultiExtensionRunner({
              desktopNotifications: desktopNotifications,
              runners: runners
            });


            process.on('SIGTERM', function () {
              extensionRunner.exit();
            });
            _context2.next = 14;
            return extensionRunner.run();

          case 14:

            if (noReload) {
              log.info('Automatic extension reloading has been disabled');
            }

            return _context2.abrupt('return', extensionRunner);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function run(_x) {
    return _ref.apply(this, arguments);
  }

  return run;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/run.js"))

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("adbkit");

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = require("node-notifier");

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = require("fx-runner");

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = require("firefox-profile");

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDirectory;

var _mz = __webpack_require__(17);

var _errors = __webpack_require__(5);

/*
 * Resolves true if the path is a readable directory.
 *
 * Usage:
 *
 * isDirectory('/some/path')
 *  .then((dirExists) => {
 *    // dirExists will be true or false.
 *  });
 *
 * */
function isDirectory(path) {
  return _mz.fs.stat(path).then(function (stats) {
    return stats.isDirectory();
  }).catch((0, _errors.onlyErrorsWithCode)(['ENOENT', 'ENOTDIR'], function () {
    return false;
  }));
}

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = require("node-firefox-connect");

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiExtensionRunner = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.defaultWatcherCreator = defaultWatcherCreator;
exports.defaultReloadStrategy = defaultReloadStrategy;

var _readline = __webpack_require__(84);

var _readline2 = _interopRequireDefault(_readline);

var _tty = __webpack_require__(85);

var _tty2 = _interopRequireDefault(_tty);

var _desktopNotifier = __webpack_require__(57);

var _logger = __webpack_require__(0);

var _fileFilter = __webpack_require__(56);

var _watcher = __webpack_require__(78);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/**
 * Implements an IExtensionRunner which allow the caller to
 * manage multiple extension runners at the same time (e.g. by running
 * a Firefox Desktop instance alongside to a Firefox for Android instance).
 */
var MultiExtensionRunner = exports.MultiExtensionRunner = function () {
  function MultiExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, MultiExtensionRunner);

    this.extensionRunners = params.runners;
    this.desktopNotifications = params.desktopNotifications;
  }

  // Method exported from the IExtensionRunner interface.

  /**
   * Returns the runner name.
   */


  (0, _createClass3.default)(MultiExtensionRunner, [{
    key: 'getName',
    value: function getName() {
      return 'Multi Extension Runner';
    }

    /**
     * Call the `run` method on all the managed extension runners,
     * and awaits that all the runners has been successfully started.
     */

  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var promises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, runner;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promises = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;

                for (_iterator = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  runner = _step.value;

                  promises.push(runner.run());
                }

                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 12:
                _context.prev = 12;
                _context.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 15:
                _context.prev = 15;

                if (!_didIteratorError) {
                  _context.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context.finish(15);

              case 19:
                return _context.finish(12);

              case 20:
                _context.next = 22;
                return Promise.all(promises);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()

    /**
     * Reloads all the extensions on all the managed extension runners,
     * collect any reload error, and resolves to an array composed by
     * a ExtensionRunnerReloadResult object per managed runner.
     *
     * Any detected reload error is also logged on the terminal and shows as a
     * desktop notification.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _this = this;

        var promises, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                log.debug('Reloading all reloadable add-ons');

                promises = [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 5;

                _loop = function _loop() {
                  var runner = _step2.value;

                  var reloadPromise = runner.reloadAllExtensions().then(function () {
                    return { runnerName: runner.getName() };
                  }, function (error) {
                    return {
                      runnerName: runner.getName(),
                      reloadError: error
                    };
                  });

                  promises.push(reloadPromise);
                };

                for (_iterator2 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop();
                }

                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 14:
                _context2.prev = 14;
                _context2.prev = 15;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 17:
                _context2.prev = 17;

                if (!_didIteratorError2) {
                  _context2.next = 20;
                  break;
                }

                throw _iteratorError2;

              case 20:
                return _context2.finish(17);

              case 21:
                return _context2.finish(14);

              case 22:
                _context2.next = 24;
                return Promise.all(promises).then(function (results) {
                  _this.handleReloadResults(results);
                  return results;
                });

              case 24:
                return _context2.abrupt('return', _context2.sent);

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 10, 14, 22], [15,, 17, 21]]);
      }));

      function reloadAllExtensions() {
        return _ref2.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension on all the managed extension runners,
     * collect any reload error and resolves to an array composed by
     * a ExtensionRunnerReloadResult object per managed runner.
     *
     * Any detected reload error is also logged on the terminal and shows as a
     * desktop notification.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sourceDir) {
        var _this2 = this;

        var promises, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop2, _iterator3, _step3;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                log.debug('Reloading add-on at ' + sourceDir);

                promises = [];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 5;

                _loop2 = function _loop2() {
                  var runner = _step3.value;

                  var reloadPromise = runner.reloadExtensionBySourceDir(sourceDir).then(function () {
                    return { runnerName: runner.getName(), sourceDir: sourceDir };
                  }, function (error) {
                    return {
                      runnerName: runner.getName(),
                      reloadError: error,
                      sourceDir: sourceDir
                    };
                  });

                  promises.push(reloadPromise);
                };

                for (_iterator3 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _loop2();
                }

                // $FLOW_FIXME: When upgrading to Flow 0.61.0, it could not follow the type of sourceDir in the array of promises.
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](5);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 14:
                _context3.prev = 14;
                _context3.prev = 15;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 17:
                _context3.prev = 17;

                if (!_didIteratorError3) {
                  _context3.next = 20;
                  break;
                }

                throw _iteratorError3;

              case 20:
                return _context3.finish(17);

              case 21:
                return _context3.finish(14);

              case 22:
                _context3.next = 24;
                return Promise.all(promises).then(function (results) {
                  _this2.handleReloadResults(results);
                  return results;
                });

              case 24:
                return _context3.abrupt('return', _context3.sent);

              case 25:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 10, 14, 22], [15,, 17, 21]]);
      }));

      function reloadExtensionBySourceDir(_x) {
        return _ref3.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when all the managed runners has been exited.
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(cleanupCallback) {
      var promises = [];

      // Create a promise for every extension runner managed by this instance,
      // the promise will be resolved when the particular runner calls its
      // registered cleanup callbacks.
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop3 = function _loop3() {
          var runner = _step4.value;

          promises.push(new Promise(function (resolve) {
            runner.registerCleanup(resolve);
          }));
        };

        for (var _iterator4 = this.extensionRunners[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop3();
        }

        // Wait for all the created promises to be resolved or rejected
        // (once each one of the runners has cleaned up) and then call
        // the cleanup callback registered to this runner.
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      Promise.all(promises).then(cleanupCallback, cleanupCallback);
    }

    /**
     * Exits all the managed runner has been exited.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var promises, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _runner;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                promises = [];
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context4.prev = 4;

                for (_iterator5 = this.extensionRunners[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  _runner = _step5.value;

                  promises.push(_runner.exit());
                }

                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](4);
                _didIteratorError5 = true;
                _iteratorError5 = _context4.t0;

              case 12:
                _context4.prev = 12;
                _context4.prev = 13;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 15:
                _context4.prev = 15;

                if (!_didIteratorError5) {
                  _context4.next = 18;
                  break;
                }

                throw _iteratorError5;

              case 18:
                return _context4.finish(15);

              case 19:
                return _context4.finish(12);

              case 20:
                _context4.next = 22;
                return Promise.all(promises);

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      function exit() {
        return _ref4.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'handleReloadResults',
    value: function handleReloadResults(results) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = results[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _ref6 = _step6.value;
          var runnerName = _ref6.runnerName,
              reloadError = _ref6.reloadError,
              _sourceDir = _ref6.sourceDir;

          if (reloadError instanceof Error) {
            var message = 'Error occurred while reloading';
            if (_sourceDir) {
              message += ' "' + _sourceDir + '" ';
            }

            message += 'on "' + runnerName + '" - ' + reloadError.message;

            log.error('\n' + message);
            log.debug(reloadError.stack);

            this.desktopNotifications({
              title: 'web-ext run: extension reload error',
              message: message
            });
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }]);
  return MultiExtensionRunner;
}();

// defaultWatcherCreator types and implementation.

function defaultWatcherCreator(_ref7) {
  var reloadExtension = _ref7.reloadExtension,
      sourceDir = _ref7.sourceDir,
      artifactsDir = _ref7.artifactsDir,
      ignoreFiles = _ref7.ignoreFiles,
      _ref7$onSourceChange = _ref7.onSourceChange,
      onSourceChange = _ref7$onSourceChange === undefined ? _watcher2.default : _ref7$onSourceChange,
      _ref7$createFileFilte = _ref7.createFileFilter,
      createFileFilter = _ref7$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref7$createFileFilte;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles });
  return onSourceChange({
    sourceDir: sourceDir,
    artifactsDir: artifactsDir,
    onChange: function onChange() {
      return reloadExtension(sourceDir);
    },
    shouldWatchFile: function shouldWatchFile(file) {
      return fileFilter.wantFile(file);
    }
  });
}

// defaultReloadStrategy types and implementation.

function defaultReloadStrategy(_ref8) {
  var artifactsDir = _ref8.artifactsDir,
      extensionRunner = _ref8.extensionRunner,
      ignoreFiles = _ref8.ignoreFiles,
      _ref8$noInput = _ref8.noInput,
      noInput = _ref8$noInput === undefined ? false : _ref8$noInput,
      sourceDir = _ref8.sourceDir;

  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref9$createWatcher = _ref9.createWatcher,
      createWatcher = _ref9$createWatcher === undefined ? defaultWatcherCreator : _ref9$createWatcher,
      _ref9$stdin = _ref9.stdin,
      stdin = _ref9$stdin === undefined ? process.stdin : _ref9$stdin,
      _ref9$kill = _ref9.kill,
      kill = _ref9$kill === undefined ? process.kill : _ref9$kill;

  var allowInput = !noInput;
  if (!allowInput) {
    log.debug('Input has been disabled because of noInput==true');
  }

  var watcher = createWatcher({
    reloadExtension: function reloadExtension(watchedSourceDir) {
      extensionRunner.reloadExtensionBySourceDir(watchedSourceDir);
    },
    sourceDir: sourceDir,
    artifactsDir: artifactsDir,
    ignoreFiles: ignoreFiles
  });

  extensionRunner.registerCleanup(function () {
    watcher.close();
    if (allowInput) {
      stdin.pause();
    }
  });

  if (allowInput && stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
    _readline2.default.emitKeypressEvents(stdin);
    stdin.setRawMode(true);

    var keypressUsageInfo = 'Press R to reload (and Ctrl-C to quit)';

    // NOTE: this `Promise.resolve().then(...)` is basically used to spawn a "co-routine"
    // that is executed before the callback attached to the Promise returned by this function
    // (and it allows the `run` function to not be stuck in the while loop).
    Promise.resolve().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var userExit, keyPressed;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              log.info(keypressUsageInfo);

              userExit = false;

            case 2:
              if (userExit) {
                _context5.next = 9;
                break;
              }

              _context5.next = 5;
              return new Promise(function (resolve) {
                stdin.once('keypress', function (str, key) {
                  return resolve(key);
                });
              });

            case 5:
              keyPressed = _context5.sent;


              if (keyPressed.ctrl && keyPressed.name === 'c') {
                userExit = true;
              } else if (keyPressed.name === 'z') {
                // Prepare to suspend.

                // NOTE: Switch the raw mode off before suspending (needed to make the keypress event
                // to work correctly when the nodejs process is resumed).
                if (stdin instanceof _tty2.default.ReadStream) {
                  stdin.setRawMode(false);
                }

                log.info('\nweb-ext has been suspended on user request');
                kill(process.pid, 'SIGTSTP');

                // Prepare to resume.

                log.info('\nweb-ext has been resumed. ' + keypressUsageInfo);
                // Switch the raw mode on on resume.
                if (stdin instanceof _tty2.default.ReadStream) {
                  stdin.setRawMode(true);
                }
              } else if (keyPressed.name === 'r') {
                log.debug('Reloading installed extensions on user request');
                extensionRunner.reloadAllExtensions();
              }
              _context5.next = 2;
              break;

            case 9:

              log.info('\nExiting web-ext on user request');
              extensionRunner.exit();

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/index.js"))

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirefoxDesktopExtensionRunner = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _errors = __webpack_require__(5);

var _firefox = __webpack_require__(58);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(36);

var _logger = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types from project files.
// eslint-disable-line import/named

var log = (0, _logger.createLogger)(__filename);

/**
 * Implements an IExtensionRunner which manages a Firefox Desktop instance.
 */


/**
 * This module provide an ExtensionRunner subclass that manage an extension executed
 * in a Firefox for Desktop instance.
 */

// Import flow types from npm dependencies.

var FirefoxDesktopExtensionRunner = exports.FirefoxDesktopExtensionRunner = function () {
  function FirefoxDesktopExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, FirefoxDesktopExtensionRunner);

    this.params = params;

    this.reloadableExtensions = new Map();
    this.cleanupCallbacks = new Set();
  }

  // Method exported from the IExtensionRunner interface.

  /**
   * Returns the runner name.
   */

  // Map extensions sourceDir to their related addon ids.


  (0, _createClass3.default)(FirefoxDesktopExtensionRunner, [{
    key: 'getName',
    value: function getName() {
      return 'Firefox Desktop';
    }

    /**
     * Setup the Firefox Profile and run a Firefox Desktop instance.
     */

  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setupProfileDir();

              case 2:
                _context.next = 4;
                return this.startFirefoxInstance();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()

    /**
     * Reloads all the extensions, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var runnerName, reloadErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, sourceDir, _ref5, _ref6, res;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                runnerName = this.getName();
                reloadErrors = new Map();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = this.params.extensions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 19;
                  break;
                }

                _ref4 = _step.value;
                sourceDir = _ref4.sourceDir;
                _context2.next = 12;
                return this.reloadExtensionBySourceDir(sourceDir);

              case 12:
                _ref5 = _context2.sent;
                _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
                res = _ref6[0];

                if (res.reloadError instanceof Error) {
                  reloadErrors.set(sourceDir, res.reloadError);
                }

              case 16:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                if (!(reloadErrors.size > 0)) {
                  _context2.next = 35;
                  break;
                }

                return _context2.abrupt('return', [{
                  runnerName: runnerName,
                  reloadError: new _errors.MultiExtensionsReloadError(reloadErrors)
                }]);

              case 35:
                return _context2.abrupt('return', [{ runnerName: runnerName }]);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 21, 25, 33], [26,, 28, 32]]);
      }));

      function reloadAllExtensions() {
        return _ref2.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(extensionSourceDir) {
        var runnerName, addonId;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                runnerName = this.getName();
                addonId = this.reloadableExtensions.get(extensionSourceDir);

                if (addonId) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: new _errors.WebExtError('Extension not reloadable: ' + ('no addonId has been mapped to "' + extensionSourceDir + '"')),
                  runnerName: runnerName
                }]);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return this.remoteFirefox.reloadAddon(addonId);

              case 7:
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](4);
                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: _context3.t0,
                  runnerName: runnerName
                }]);

              case 12:
                return _context3.abrupt('return', [{ runnerName: runnerName, sourceDir: extensionSourceDir }]);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 9]]);
      }));

      function reloadExtensionBySourceDir(_x) {
        return _ref7.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when the runner has been exited
     * (e.g. the Firefox instance exits or the user has requested web-ext
     * to exit).
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(fn) {
      this.cleanupCallbacks.add(fn);
    }

    /**
     * Exits the runner, by closing the managed Firefox instance.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.runningInfo || !this.runningInfo.firefox)) {
                  _context4.next = 2;
                  break;
                }

                throw new _errors.WebExtError('No firefox instance is currently running');

              case 2:

                this.runningInfo.firefox.kill();

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function exit() {
        return _ref8.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'setupProfileDir',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var _params, customPrefs, extensions, keepProfileChanges, preInstall, profilePath, firefoxApp, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, extension;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _params = this.params, customPrefs = _params.customPrefs, extensions = _params.extensions, keepProfileChanges = _params.keepProfileChanges, preInstall = _params.preInstall, profilePath = _params.profilePath, firefoxApp = _params.firefoxApp;

                if (!profilePath) {
                  _context5.next = 15;
                  break;
                }

                if (!keepProfileChanges) {
                  _context5.next = 9;
                  break;
                }

                log.debug('Using Firefox profile from ' + profilePath);
                _context5.next = 6;
                return firefoxApp.useProfile(profilePath, { customPrefs: customPrefs });

              case 6:
                this.profile = _context5.sent;
                _context5.next = 13;
                break;

              case 9:
                log.debug('Copying Firefox profile from ' + profilePath);
                _context5.next = 12;
                return firefoxApp.copyProfile(profilePath, { customPrefs: customPrefs });

              case 12:
                this.profile = _context5.sent;

              case 13:
                _context5.next = 19;
                break;

              case 15:
                log.debug('Creating new Firefox profile');
                _context5.next = 18;
                return firefoxApp.createProfile({ customPrefs: customPrefs });

              case 18:
                this.profile = _context5.sent;

              case 19:
                if (!preInstall) {
                  _context5.next = 46;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 23;
                _iterator2 = extensions[Symbol.iterator]();

              case 25:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 32;
                  break;
                }

                extension = _step2.value;
                _context5.next = 29;
                return firefoxApp.installExtension({
                  asProxy: true,
                  extensionPath: extension.sourceDir,
                  manifestData: extension.manifestData,
                  profile: this.profile
                });

              case 29:
                _iteratorNormalCompletion2 = true;
                _context5.next = 25;
                break;

              case 32:
                _context5.next = 38;
                break;

              case 34:
                _context5.prev = 34;
                _context5.t0 = _context5['catch'](23);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 38:
                _context5.prev = 38;
                _context5.prev = 39;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 41:
                _context5.prev = 41;

                if (!_didIteratorError2) {
                  _context5.next = 44;
                  break;
                }

                throw _iteratorError2;

              case 44:
                return _context5.finish(41);

              case 45:
                return _context5.finish(38);

              case 46:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[23, 34, 38, 46], [39,, 41, 45]]);
      }));

      function setupProfileDir() {
        return _ref9.apply(this, arguments);
      }

      return setupProfileDir;
    }()
  }, {
    key: 'startFirefoxInstance',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _this = this;

        var _params2, browserConsole, extensions, firefoxBinary, preInstall, startUrl, firefoxApp, firefoxClient, binaryArgs, urls, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, url, remoteFirefox, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, extension, addonId;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _params2 = this.params, browserConsole = _params2.browserConsole, extensions = _params2.extensions, firefoxBinary = _params2.firefoxBinary, preInstall = _params2.preInstall, startUrl = _params2.startUrl, firefoxApp = _params2.firefoxApp, firefoxClient = _params2.firefoxClient;
                binaryArgs = [];


                if (browserConsole) {
                  binaryArgs.push('-jsconsole');
                }

                if (!startUrl) {
                  _context6.next = 24;
                  break;
                }

                urls = Array.isArray(startUrl) ? startUrl : [startUrl];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context6.prev = 8;

                for (_iterator3 = urls[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  url = _step3.value;

                  binaryArgs.push('--url', url);
                }
                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](8);
                _didIteratorError3 = true;
                _iteratorError3 = _context6.t0;

              case 16:
                _context6.prev = 16;
                _context6.prev = 17;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 19:
                _context6.prev = 19;

                if (!_didIteratorError3) {
                  _context6.next = 22;
                  break;
                }

                throw _iteratorError3;

              case 22:
                return _context6.finish(19);

              case 23:
                return _context6.finish(16);

              case 24:
                _context6.next = 26;
                return firefoxApp.run(this.profile, {
                  firefoxBinary: firefoxBinary, binaryArgs: binaryArgs
                });

              case 26:
                this.runningInfo = _context6.sent;


                this.runningInfo.firefox.on('close', function () {
                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                    for (var _iterator4 = _this.cleanupCallbacks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var cleanupCb = _step4.value;

                      try {
                        cleanupCb();
                      } catch (error) {
                        log.error('Exception on executing cleanup callback: ' + error);
                      }
                    }
                  } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                      }
                    } finally {
                      if (_didIteratorError4) {
                        throw _iteratorError4;
                      }
                    }
                  }
                });

                if (preInstall) {
                  _context6.next = 73;
                  break;
                }

                _context6.next = 31;
                return firefoxClient({
                  port: this.runningInfo.debuggerPort
                });

              case 31:
                remoteFirefox = this.remoteFirefox = _context6.sent;


                // Install all the temporary addons.
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context6.prev = 35;
                _iterator5 = extensions[Symbol.iterator]();

              case 37:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context6.next = 59;
                  break;
                }

                extension = _step5.value;
                _context6.prev = 39;
                _context6.next = 42;
                return remoteFirefox.installTemporaryAddon(extension.sourceDir).then(function (installResult) {
                  return installResult.addon.id;
                });

              case 42:
                addonId = _context6.sent;

                if (addonId) {
                  _context6.next = 45;
                  break;
                }

                throw new _errors.WebExtError('Unexpected missing addonId in the installAsTemporaryAddon result');

              case 45:

                this.reloadableExtensions.set(extension.sourceDir, addonId);
                _context6.next = 56;
                break;

              case 48:
                _context6.prev = 48;
                _context6.t1 = _context6['catch'](39);

                if (!(_context6.t1 instanceof _errors.RemoteTempInstallNotSupported)) {
                  _context6.next = 55;
                  break;
                }

                log.debug('Caught: ' + _context6.t1);
                throw new _errors.WebExtError('Temporary add-on installation is not supported in this version' + ' of Firefox (you need Firefox 49 or higher). For older Firefox' + ' versions, use --pre-install');

              case 55:
                throw _context6.t1;

              case 56:
                _iteratorNormalCompletion5 = true;
                _context6.next = 37;
                break;

              case 59:
                _context6.next = 65;
                break;

              case 61:
                _context6.prev = 61;
                _context6.t2 = _context6['catch'](35);
                _didIteratorError5 = true;
                _iteratorError5 = _context6.t2;

              case 65:
                _context6.prev = 65;
                _context6.prev = 66;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 68:
                _context6.prev = 68;

                if (!_didIteratorError5) {
                  _context6.next = 71;
                  break;
                }

                throw _iteratorError5;

              case 71:
                return _context6.finish(68);

              case 72:
                return _context6.finish(65);

              case 73:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 12, 16, 24], [17,, 19, 23], [35, 61, 65, 73], [39, 48], [66,, 68, 72]]);
      }));

      function startFirefoxInstance() {
        return _ref10.apply(this, arguments);
      }

      return startFirefoxInstance;
    }()
  }]);
  return FirefoxDesktopExtensionRunner;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/firefox-desktop.js"))

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirefoxAndroidExtensionRunner = undefined;

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _net = __webpack_require__(170);

var _net2 = _interopRequireDefault(_net);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _readline = __webpack_require__(84);

var _readline2 = _interopRequireDefault(_readline);

var _tty = __webpack_require__(85);

var _tty2 = _interopRequireDefault(_tty);

var _tempDir = __webpack_require__(86);

var _adb = __webpack_require__(82);

var _adb2 = _interopRequireDefault(_adb);

var _desktopNotifier = __webpack_require__(57);

var _errors = __webpack_require__(5);

var _firefox = __webpack_require__(58);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(36);

var _logger = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/**
 * This module provide an ExtensionRunner subclass that manage an extension executed
 * in a Firefox for Android instance.
 */

/**
 * Implements an IExtensionRunner which manages a Firefox for Android instance.
 */
var FirefoxAndroidExtensionRunner = exports.FirefoxAndroidExtensionRunner = function () {
  // Wait 3s before the next unix socket discovery loop.
  function FirefoxAndroidExtensionRunner(params) {
    (0, _classCallCheck3.default)(this, FirefoxAndroidExtensionRunner);

    this.params = params;
    this.cleanupCallbacks = new Set();
    this.adbExtensionsPathBySourceDir = new Map();
    this.reloadableExtensions = new Map();

    // Print warning for not currently supported options (e.g. preInstall,
    // cloned profiles, browser console).
    this.printIgnoredParamsWarnings();
  }
  // Wait for at most 3 minutes before giving up.


  (0, _createClass3.default)(FirefoxAndroidExtensionRunner, [{
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _params, adbBin, adbHost, adbPort;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _params = this.params, adbBin = _params.adbBin, adbHost = _params.adbHost, adbPort = _params.adbPort;


                this.adbUtils = new this.params.ADBUtils({
                  adbBin: adbBin, adbHost: adbHost, adbPort: adbPort
                });

                _context.next = 4;
                return this.adbDevicesDiscoveryAndSelect();

              case 4:
                _context.next = 6;
                return this.apkPackagesDiscoveryAndSelect();

              case 6:
                _context.next = 8;
                return this.adbCheckRuntimePermissions();

              case 8:
                _context.next = 10;
                return this.adbForceStopSelectedPackage();

              case 10:
                _context.next = 12;
                return this.adbPrepareProfileDir();

              case 12:
                _context.next = 14;
                return Promise.all([
                // Start Firefox for Android instance on the created profile.
                this.adbStartSelectedPackage(),

                // Build and push to devices all the extension xpis
                // and keep track of the xpi built and uploaded by extension sourceDir.
                this.buildAndPushExtensions(),

                // Wait for RDP unix socket file created and
                // Create an ADB forward connection on a free tcp port
                this.adbDiscoveryAndForwardRDPUnixSocket()]);

              case 14:
                _context.next = 16;
                return this.rdpInstallExtensions();

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()

    // Method exported from the IExtensionRunner interface.

    /**
     * Returns the runner name.
     */

  }, {
    key: 'getName',
    value: function getName() {
      return 'Firefox Android';
    }

    /**
     * Reloads all the extensions, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadAllExtensions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var runnerName, reloadErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, sourceDir, _ref5, _ref6, res;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                runnerName = this.getName();
                reloadErrors = new Map();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = this.params.extensions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 19;
                  break;
                }

                _ref4 = _step.value;
                sourceDir = _ref4.sourceDir;
                _context2.next = 12;
                return this.reloadExtensionBySourceDir(sourceDir);

              case 12:
                _ref5 = _context2.sent;
                _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
                res = _ref6[0];

                if (res.reloadError instanceof Error) {
                  reloadErrors.set(sourceDir, res.reloadError);
                }

              case 16:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                if (!(reloadErrors.size > 0)) {
                  _context2.next = 35;
                  break;
                }

                return _context2.abrupt('return', [{
                  runnerName: runnerName,
                  reloadError: new _errors.MultiExtensionsReloadError(reloadErrors)
                }]);

              case 35:
                return _context2.abrupt('return', [{ runnerName: runnerName }]);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 21, 25, 33], [26,, 28, 32]]);
      }));

      function reloadAllExtensions() {
        return _ref2.apply(this, arguments);
      }

      return reloadAllExtensions;
    }()

    /**
     * Reloads a single extension, collect any reload error and resolves to
     * an array composed by a single ExtensionRunnerReloadResult object.
     */

  }, {
    key: 'reloadExtensionBySourceDir',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(extensionSourceDir) {
        var runnerName, addonId;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                runnerName = this.getName();
                addonId = this.reloadableExtensions.get(extensionSourceDir);

                if (addonId) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: new _errors.WebExtError('Extension not reloadable: ' + ('no addonId has been mapped to "' + extensionSourceDir + '"')),
                  runnerName: runnerName
                }]);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return this.buildAndPushExtension(extensionSourceDir);

              case 7:
                _context3.next = 9;
                return this.remoteFirefox.reloadAddon(addonId);

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](4);
                return _context3.abrupt('return', [{
                  sourceDir: extensionSourceDir,
                  reloadError: _context3.t0,
                  runnerName: runnerName
                }]);

              case 14:
                return _context3.abrupt('return', [{ runnerName: runnerName, sourceDir: extensionSourceDir }]);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 11]]);
      }));

      function reloadExtensionBySourceDir(_x) {
        return _ref7.apply(this, arguments);
      }

      return reloadExtensionBySourceDir;
    }()

    /**
     * Register a callback to be called when the runner has been exited
     * (e.g. the Firefox instance exits or the user has requested web-ext
     * to exit).
     */

  }, {
    key: 'registerCleanup',
    value: function registerCleanup(fn) {
      this.cleanupCallbacks.add(fn);
    }

    /**
     * Exits the runner, by closing the managed Firefox instance.
     */

  }, {
    key: 'exit',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var adbUtils, selectedAdbDevice, selectedArtifactsDir, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, fn;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedArtifactsDir = this.selectedArtifactsDir;


                this.exiting = true;

                // If a Firefox for Android instance has been started,
                // we should ensure that it has been stopped when we exit.
                _context4.next = 4;
                return this.adbForceStopSelectedPackage();

              case 4:
                if (!selectedArtifactsDir) {
                  _context4.next = 8;
                  break;
                }

                log.debug('Cleaning up artifacts directory on the Android device...');
                _context4.next = 8;
                return adbUtils.clearArtifactsDir(selectedAdbDevice);

              case 8:

                // Call all the registered cleanup callbacks.
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 11;
                for (_iterator2 = this.cleanupCallbacks[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  fn = _step2.value;

                  try {
                    fn();
                  } catch (error) {
                    log.error(error);
                  }
                }
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](11);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 19:
                _context4.prev = 19;
                _context4.prev = 20;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 22:
                _context4.prev = 22;

                if (!_didIteratorError2) {
                  _context4.next = 25;
                  break;
                }

                throw _iteratorError2;

              case 25:
                return _context4.finish(22);

              case 26:
                return _context4.finish(19);

              case 27:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      function exit() {
        return _ref8.apply(this, arguments);
      }

      return exit;
    }()

    // Private helper methods.

  }, {
    key: 'getDeviceProfileDir',
    value: function getDeviceProfileDir() {
      return this.selectedArtifactsDir + '/profile';
    }
  }, {
    key: 'printIgnoredParamsWarnings',
    value: function printIgnoredParamsWarnings() {
      if (this.params.profilePath) {
        log.warn('Firefox for Android target does not support custom profile paths.');
      }

      if (this.params.keepProfileChanges) {
        log.warn('Firefox for Android target does not support --keep-profile-changes.');
      }

      if (this.params.browserConsole) {
        log.warn('Firefox for Android target does not support --browser-console option.');
      }

      if (this.params.preInstall) {
        log.warn('Firefox for Android target does not support --pre-install option.');
      }

      if (this.params.startUrl) {
        log.warn('Firefox for Android target does not support --start-url option.');
      }
    }
  }, {
    key: 'adbDevicesDiscoveryAndSelect',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var adbUtils, adbDevice, devices, devicesMsg, foundDevices, _devicesMsg;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                adbUtils = this.adbUtils;
                adbDevice = this.params.adbDevice;
                devices = [];


                log.debug('Listing android devices');
                _context5.next = 6;
                return adbUtils.discoverDevices();

              case 6:
                devices = _context5.sent;

                if (!(devices.length === 0)) {
                  _context5.next = 9;
                  break;
                }

                throw new _errors.UsageError('No Android device found through ADB. ' + 'Make sure the device is connected and USB debugging is enabled.');

              case 9:
                if (adbDevice) {
                  _context5.next = 13;
                  break;
                }

                devicesMsg = devices.map(function (dev) {
                  return ' - ' + dev;
                }).join('\n');

                log.info('\nAndroid devices found:\n' + devicesMsg);
                throw new _errors.UsageError('Select an android device using --android-device=<name>');

              case 13:
                foundDevices = devices.filter(function (device) {
                  return device === adbDevice;
                });

                if (!(foundDevices.length === 0)) {
                  _context5.next = 17;
                  break;
                }

                _devicesMsg = JSON.stringify(devices);
                throw new _errors.UsageError('Android device ' + adbDevice + ' was not found in list: ' + _devicesMsg);

              case 17:

                this.selectedAdbDevice = foundDevices[0];
                log.info('Selected ADB device: ' + this.selectedAdbDevice);

              case 19:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function adbDevicesDiscoveryAndSelect() {
        return _ref9.apply(this, arguments);
      }

      return adbDevicesDiscoveryAndSelect;
    }()
  }, {
    key: 'apkPackagesDiscoveryAndSelect',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var adbUtils, selectedAdbDevice, firefoxApk, packages, pkgsListMsg, filteredPackages, pkgsList;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, firefoxApk = this.params.firefoxApk;
                // Discovery and select a Firefox for Android version.

                _context6.next = 3;
                return adbUtils.discoverInstalledFirefoxAPKs(selectedAdbDevice);

              case 3:
                packages = _context6.sent;

                if (!(packages.length === 0)) {
                  _context6.next = 6;
                  break;
                }

                throw new _errors.UsageError('No Firefox packages were found on the selected Android device');

              case 6:
                pkgsListMsg = function pkgsListMsg(pkgs) {
                  return pkgs.map(function (pkg) {
                    return ' - ' + pkg;
                  }).join('\n');
                };

                if (firefoxApk) {
                  _context6.next = 14;
                  break;
                }

                log.info('\nPackages found:\n' + pkgsListMsg(packages));

                if (!(packages.length > 1)) {
                  _context6.next = 11;
                  break;
                }

                throw new _errors.UsageError('Select one of the packages using --firefox-apk');

              case 11:

                // If only one APK has been found, select it even if it has not been
                // specified explicitly on the comment line.
                this.selectedFirefoxApk = packages[0];
                log.info('Selected Firefox for Android APK: ' + this.selectedFirefoxApk);
                return _context6.abrupt('return');

              case 14:
                filteredPackages = packages.filter(function (line) {
                  return line === firefoxApk;
                });

                if (!(filteredPackages.length === 0)) {
                  _context6.next = 18;
                  break;
                }

                pkgsList = pkgsListMsg(filteredPackages);
                throw new _errors.UsageError('Package ' + firefoxApk + ' was not found in list: ' + pkgsList);

              case 18:

                this.selectedFirefoxApk = filteredPackages[0];
                log.debug('Selected Firefox for Android APK: ' + this.selectedFirefoxApk);

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function apkPackagesDiscoveryAndSelect() {
        return _ref10.apply(this, arguments);
      }

      return apkPackagesDiscoveryAndSelect;
    }()
  }, {
    key: 'adbForceStopSelectedPackage',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk;


                log.info('Stopping existing instances of ' + selectedFirefoxApk + '...');
                _context7.next = 4;
                return adbUtils.amForceStopAPK(selectedAdbDevice, selectedFirefoxApk);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function adbForceStopSelectedPackage() {
        return _ref11.apply(this, arguments);
      }

      return adbForceStopSelectedPackage;
    }()
  }, {
    key: 'adbCheckRuntimePermissions',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, androidVersion;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk;


                log.debug('Discovering Android version for ' + selectedAdbDevice + '...');

                _context8.next = 4;
                return adbUtils.getAndroidVersionNumber(selectedAdbDevice);

              case 4:
                androidVersion = _context8.sent;

                if (!(typeof androidVersion !== 'number' || Number.isNaN(androidVersion))) {
                  _context8.next = 7;
                  break;
                }

                throw new _errors.WebExtError('Invalid Android version: ' + androidVersion);

              case 7:

                log.debug('Detected Android version ' + androidVersion);

                if (!(androidVersion < 23)) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt('return');

              case 10:

                log.debug('Checking read/write permissions needed for web-ext' + ('on ' + selectedFirefoxApk + '...'));

                // Runtime permission needed to be able to run Firefox on a temporarily created profile
                // on android versions >= 23 (Android Marshmallow, which is the first version where
                // these permissions are optional and have to be granted explicitly).
                _context8.next = 13;
                return adbUtils.ensureRequiredAPKRuntimePermissions(selectedAdbDevice, selectedFirefoxApk, ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function adbCheckRuntimePermissions() {
        return _ref12.apply(this, arguments);
      }

      return adbCheckRuntimePermissions;
    }()
  }, {
    key: 'adbPrepareProfileDir',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, firefoxApp, profile, deviceProfileDir;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk, firefoxApp = this.params.firefoxApp;
                // Create the preferences file and the Fennec temporary profile.

                log.debug('Preparing a temporary profile for ' + selectedFirefoxApk + '...');

                _context9.next = 4;
                return firefoxApp.createProfile({ app: 'fennec' });

              case 4:
                profile = _context9.sent;
                _context9.next = 7;
                return adbUtils.getOrCreateArtifactsDir(selectedAdbDevice);

              case 7:
                this.selectedArtifactsDir = _context9.sent;
                deviceProfileDir = this.getDeviceProfileDir();
                _context9.next = 11;
                return adbUtils.runShellCommand(selectedAdbDevice, ['mkdir', '-p', deviceProfileDir]);

              case 11:
                _context9.next = 13;
                return adbUtils.pushFile(selectedAdbDevice, _path2.default.join(profile.profileDir, 'user.js'), deviceProfileDir + '/user.js');

              case 13:

                log.debug('Created temporary profile at ' + deviceProfileDir + '.');

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function adbPrepareProfileDir() {
        return _ref13.apply(this, arguments);
      }

      return adbPrepareProfileDir;
    }()
  }, {
    key: 'adbStartSelectedPackage',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var adbUtils, selectedFirefoxApk, selectedAdbDevice, deviceProfileDir;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                adbUtils = this.adbUtils, selectedFirefoxApk = this.selectedFirefoxApk, selectedAdbDevice = this.selectedAdbDevice;
                deviceProfileDir = this.getDeviceProfileDir();


                log.info('Starting ' + selectedFirefoxApk + '...');

                log.debug('Using profile ' + deviceProfileDir);

                _context10.next = 6;
                return adbUtils.startFirefoxAPK(selectedAdbDevice, selectedFirefoxApk, deviceProfileDir);

              case 6:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function adbStartSelectedPackage() {
        return _ref14.apply(this, arguments);
      }

      return adbStartSelectedPackage;
    }()
  }, {
    key: 'buildAndPushExtension',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(sourceDir) {
        var _this = this;

        var adbUtils, selectedAdbDevice, selectedArtifactsDir, buildSourceDir;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedArtifactsDir = this.selectedArtifactsDir, buildSourceDir = this.params.buildSourceDir;
                _context12.next = 3;
                return (0, _tempDir.withTempDir)(function () {
                  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(tmpDir) {
                    var _ref17, extensionPath, extFileName, adbExtensionPath;

                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return buildSourceDir(sourceDir, tmpDir.path());

                          case 2:
                            _ref17 = _context11.sent;
                            extensionPath = _ref17.extensionPath;
                            extFileName = _path2.default.basename(extensionPath, '.zip');
                            adbExtensionPath = _this.adbExtensionsPathBySourceDir.get(sourceDir);


                            if (!adbExtensionPath) {
                              adbExtensionPath = selectedArtifactsDir + '/' + extFileName + '.xpi';
                            }

                            log.debug('Uploading ' + extFileName + ' on the android device');

                            _context11.next = 10;
                            return adbUtils.pushFile(selectedAdbDevice, extensionPath, adbExtensionPath);

                          case 10:

                            log.debug('Upload completed: ' + adbExtensionPath);

                            _this.adbExtensionsPathBySourceDir.set(sourceDir, adbExtensionPath);

                          case 12:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this);
                  }));

                  return function (_x3) {
                    return _ref16.apply(this, arguments);
                  };
                }());

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function buildAndPushExtension(_x2) {
        return _ref15.apply(this, arguments);
      }

      return buildAndPushExtension;
    }()
  }, {
    key: 'buildAndPushExtensions',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref20, sourceDir;

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context13.prev = 3;
                _iterator3 = this.params.extensions[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context13.next = 13;
                  break;
                }

                _ref20 = _step3.value;
                sourceDir = _ref20.sourceDir;
                _context13.next = 10;
                return this.buildAndPushExtension(sourceDir);

              case 10:
                _iteratorNormalCompletion3 = true;
                _context13.next = 5;
                break;

              case 13:
                _context13.next = 19;
                break;

              case 15:
                _context13.prev = 15;
                _context13.t0 = _context13['catch'](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context13.t0;

              case 19:
                _context13.prev = 19;
                _context13.prev = 20;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 22:
                _context13.prev = 22;

                if (!_didIteratorError3) {
                  _context13.next = 25;
                  break;
                }

                throw _iteratorError3;

              case 25:
                return _context13.finish(22);

              case 26:
                return _context13.finish(19);

              case 27:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[3, 15, 19, 27], [20,, 22, 26]]);
      }));

      function buildAndPushExtensions() {
        return _ref18.apply(this, arguments);
      }

      return buildAndPushExtensions;
    }()
  }, {
    key: 'adbDiscoveryAndForwardRDPUnixSocket',
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
        var adbUtils, selectedAdbDevice, selectedFirefoxApk, firefoxAndroidTimeout, stdin, unixSocketDiscoveryRetryInterval, unixSocketDiscoveryMaxTime, handleCtrlC, tcpPort;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                adbUtils = this.adbUtils, selectedAdbDevice = this.selectedAdbDevice, selectedFirefoxApk = this.selectedFirefoxApk, firefoxAndroidTimeout = this.params.firefoxAndroidTimeout;
                stdin = this.params.stdin || process.stdin;
                unixSocketDiscoveryRetryInterval = FirefoxAndroidExtensionRunner.unixSocketDiscoveryRetryInterval;
                unixSocketDiscoveryMaxTime = FirefoxAndroidExtensionRunner.unixSocketDiscoveryMaxTime;


                if (typeof firefoxAndroidTimeout === 'number') {
                  unixSocketDiscoveryMaxTime = firefoxAndroidTimeout;
                }

                handleCtrlC = function handleCtrlC(str, key) {
                  if (key.ctrl && key.name === 'c') {
                    adbUtils.setUserAbortDiscovery(true);
                  }
                };

                // TODO: use noInput property to decide if we should
                // disable direct keypress handling.


                if (stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
                  _readline2.default.emitKeypressEvents(stdin);
                  stdin.setRawMode(true);

                  stdin.on('keypress', handleCtrlC);
                }

                _context14.prev = 7;
                _context14.next = 10;
                return adbUtils.discoverRDPUnixSocket(selectedAdbDevice, selectedFirefoxApk, {
                  maxDiscoveryTime: unixSocketDiscoveryMaxTime,
                  retryInterval: unixSocketDiscoveryRetryInterval
                });

              case 10:
                this.selectedRDPSocketFile = _context14.sent;

              case 11:
                _context14.prev = 11;

                if (stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
                  stdin.removeListener('keypress', handleCtrlC);
                }
                return _context14.finish(11);

              case 14:

                log.debug('RDP Socket File selected: ' + this.selectedRDPSocketFile);

                _context14.next = 17;
                return this.chooseLocalTcpPort();

              case 17:
                tcpPort = _context14.sent;


                // Log the choosen tcp port at info level (useful to the user to be able
                // to connect the Firefox DevTools to the Firefox for Android instance).
                log.info('You can connect to this Android device on TCP port ' + tcpPort);

                _context14.next = 21;
                return adbUtils.setupForward(selectedAdbDevice, 'localfilesystem:' + this.selectedRDPSocketFile, 'tcp:' + tcpPort);

              case 21:

                this.selectedTCPPort = tcpPort;

              case 22:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[7,, 11, 14]]);
      }));

      function adbDiscoveryAndForwardRDPUnixSocket() {
        return _ref21.apply(this, arguments);
      }

      return adbDiscoveryAndForwardRDPUnixSocket;
    }()
  }, {
    key: 'chooseLocalTcpPort',
    value: function chooseLocalTcpPort() {
      return new Promise(function (resolve) {
        var srv = _net2.default.createServer();
        // $FLOW_FIXME: flow has his own opinions on this method signature.
        srv.listen(0, function () {
          var freeTcpPort = srv.address().port;
          srv.close();
          resolve(freeTcpPort);
        });
      });
    }
  }, {
    key: 'rdpInstallExtensions',
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
        var _this2 = this;

        var selectedTCPPort, _params2, extensions, firefoxClient, remoteFirefox, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, extension, sourceDir, adbExtensionPath, addonId;

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                selectedTCPPort = this.selectedTCPPort, _params2 = this.params, extensions = _params2.extensions, firefoxClient = _params2.firefoxClient;
                _context15.next = 3;
                return firefoxClient({
                  port: selectedTCPPort
                });

              case 3:
                remoteFirefox = this.remoteFirefox = _context15.sent;


                // Exit and cleanup the extension runner if the connection to the
                // remote Firefox for Android instance has been closed.
                remoteFirefox.client.on('end', function () {
                  if (!_this2.exiting) {
                    log.info('Exiting the device because Firefox for Android disconnected');
                    _this2.exit();
                  }
                });

                // Install all the temporary addons.
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context15.prev = 8;
                _iterator4 = extensions[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context15.next = 25;
                  break;
                }

                extension = _step4.value;
                sourceDir = extension.sourceDir;
                adbExtensionPath = this.adbExtensionsPathBySourceDir.get(sourceDir);

                if (adbExtensionPath) {
                  _context15.next = 16;
                  break;
                }

                throw new _errors.WebExtError('ADB extension path for "' + sourceDir + '" was unexpectedly empty');

              case 16:
                _context15.next = 18;
                return remoteFirefox.installTemporaryAddon(adbExtensionPath).then(function (installResult) {
                  return installResult.addon.id;
                });

              case 18:
                addonId = _context15.sent;

                if (addonId) {
                  _context15.next = 21;
                  break;
                }

                throw new _errors.WebExtError('Received an empty addonId from ' + ('remoteFirefox.installTemporaryAddon("' + adbExtensionPath + '")'));

              case 21:

                this.reloadableExtensions.set(extension.sourceDir, addonId);

              case 22:
                _iteratorNormalCompletion4 = true;
                _context15.next = 10;
                break;

              case 25:
                _context15.next = 31;
                break;

              case 27:
                _context15.prev = 27;
                _context15.t0 = _context15['catch'](8);
                _didIteratorError4 = true;
                _iteratorError4 = _context15.t0;

              case 31:
                _context15.prev = 31;
                _context15.prev = 32;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 34:
                _context15.prev = 34;

                if (!_didIteratorError4) {
                  _context15.next = 37;
                  break;
                }

                throw _iteratorError4;

              case 37:
                return _context15.finish(34);

              case 38:
                return _context15.finish(31);

              case 39:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[8, 27, 31, 39], [32,, 34, 38]]);
      }));

      function rdpInstallExtensions() {
        return _ref22.apply(this, arguments);
      }

      return rdpInstallExtensions;
    }()
  }]);
  return FirefoxAndroidExtensionRunner;
}();

FirefoxAndroidExtensionRunner.unixSocketDiscoveryRetryInterval = 3 * 1000;
FirefoxAndroidExtensionRunner.unixSocketDiscoveryMaxTime = 3 * 60 * 1000;
/* WEBPACK VAR INJECTION */}.call(exports, "src/extension-runners/firefox-android.js"))

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = require("tmp");

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveIdToSourceDir = exports.getIdFromSourceDir = exports.extensionIdFile = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(26);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getIdFromSourceDir = exports.getIdFromSourceDir = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(sourceDir) {
    var filePath, content, lines, id;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            content = void 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _mz.fs.readFile(filePath);

          case 5:
            content = _context2.sent;
            _context2.next = 14;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context2.t0)) {
              _context2.next = 13;
              break;
            }

            log.debug('No ID file found at: ' + filePath);
            return _context2.abrupt('return');

          case 13:
            throw _context2.t0;

          case 14:
            lines = content.toString().split('\n');

            lines = lines.filter(function (line) {
              line = line.trim();
              if (line && !line.startsWith('#')) {
                return line;
              }
            });

            id = lines[0];

            log.debug('Found extension ID ' + id + ' in ' + filePath);

            if (id) {
              _context2.next = 20;
              break;
            }

            throw new _errors.UsageError('No ID found in extension ID file ' + filePath);

          case 20:
            return _context2.abrupt('return', id);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 8]]);
  }));

  return function getIdFromSourceDir(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var saveIdToSourceDir = exports.saveIdToSourceDir = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sourceDir, id) {
    var filePath;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            _context3.next = 3;
            return _mz.fs.writeFile(filePath, ['# This file was created by https://github.com/mozilla/web-ext', '# Your auto-generated extension ID for addons.mozilla.org is:', id.toString()].join('\n'));

          case 3:

            log.debug('Saved auto-generated ID ' + id + ' to ' + filePath);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function saveIdToSourceDir(_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = sign;

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(17);

var _signAddon = __webpack_require__(173);

var _signAddon2 = _interopRequireDefault(_signAddon);

var _build = __webpack_require__(52);

var _build2 = _interopRequireDefault(_build);

var _manifest = __webpack_require__(35);

var _manifest2 = _interopRequireDefault(_manifest);

var _tempDir = __webpack_require__(86);

var _errors = __webpack_require__(5);

var _artifacts = __webpack_require__(81);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var extensionIdFile = exports.extensionIdFile = '.web-extension-id';

// Sign command types and implementation.

function sign(_ref) {
  var apiKey = _ref.apiKey,
      apiProxy = _ref.apiProxy,
      apiSecret = _ref.apiSecret,
      apiUrlPrefix = _ref.apiUrlPrefix,
      artifactsDir = _ref.artifactsDir,
      id = _ref.id,
      _ref$ignoreFiles = _ref.ignoreFiles,
      ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
      sourceDir = _ref.sourceDir,
      timeout = _ref.timeout,
      verbose = _ref.verbose;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$build = _ref2.build,
      build = _ref2$build === undefined ? _build2.default : _ref2$build,
      preValidatedManifest = _ref2.preValidatedManifest,
      _ref2$signAddon = _ref2.signAddon,
      signAddon = _ref2$signAddon === undefined ? _signAddon2.default : _ref2$signAddon;

  return (0, _tempDir.withTempDir)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tmpDir) {
      var manifestData, _ref4, _ref5, buildResult, idFromSourceDir, manifestId, signingResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

            case 2:
              manifestData = void 0;

              if (!preValidatedManifest) {
                _context.next = 7;
                break;
              }

              manifestData = preValidatedManifest;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return (0, _manifest2.default)(sourceDir);

            case 9:
              manifestData = _context.sent;

            case 10:
              _context.next = 12;
              return Promise.all([build({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: tmpDir.path() }, { manifestData: manifestData, showReadyMessage: false }), getIdFromSourceDir(sourceDir)]);

            case 12:
              _ref4 = _context.sent;
              _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
              buildResult = _ref5[0];
              idFromSourceDir = _ref5[1];
              manifestId = (0, _manifest.getManifestId)(manifestData);

              if (!(id && manifestId)) {
                _context.next = 19;
                break;
              }

              throw new _errors.UsageError('Cannot set custom ID ' + id + ' because manifest.json ' + ('declares ID ' + manifestId));

            case 19:
              if (id) {
                log.debug('Using custom ID declared as --id=' + id);
              }

              if (manifestId) {
                id = manifestId;
              }

              if (!id && idFromSourceDir) {
                log.info('Using previously auto-generated extension ID: ' + idFromSourceDir);
                id = idFromSourceDir;
              }

              if (!id) {
                log.warn('No extension ID specified (it will be auto-generated)');
              }

              _context.next = 25;
              return signAddon({
                apiKey: apiKey,
                apiSecret: apiSecret,
                apiUrlPrefix: apiUrlPrefix,
                apiProxy: apiProxy,
                timeout: timeout,
                verbose: verbose,
                id: id,
                xpiPath: buildResult.extensionPath,
                version: manifestData.version,
                downloadDir: artifactsDir
              });

            case 25:
              signingResult = _context.sent;

              if (!signingResult.id) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return saveIdToSourceDir(sourceDir, signingResult.id);

            case 29:
              if (!signingResult.success) {
                _context.next = 34;
                break;
              }

              log.info('Extension ID: ' + signingResult.id);
              log.info('SUCCESS');
              _context.next = 36;
              break;

            case 34:
              log.info('FAIL');
              throw new _errors.WebExtError('The extension could not be signed');

            case 36:
              return _context.abrupt('return', signingResult);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/sign.js"))

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = require("sign-addon");

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = undefined;
exports.default = docs;

var _open = __webpack_require__(175);

var _open2 = _interopRequireDefault(_open);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var url = exports.url = 'https://developer.mozilla.org/en-US/Add-ons' + '/WebExtensions/Getting_started_with_web-ext';

function docs(params) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$openUrl = _ref.openUrl,
      openUrl = _ref$openUrl === undefined ? _open2.default : _ref$openUrl;

  return new Promise(function (resolve, reject) {
    openUrl(url, function (error) {
      if (error) {
        log.debug('Encountered an error while opening URL ' + url, error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/docs.js"))

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = require("open");

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdates = checkForUpdates;

var _updateNotifier = __webpack_require__(177);

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkForUpdates(_ref) {
  var version = _ref.version,
      _ref$updateNotifier = _ref.updateNotifier,
      updateNotifier = _ref$updateNotifier === undefined ? _updateNotifier2.default : _ref$updateNotifier;

  var pkg = { name: 'web-ext', version: version };

  updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3 // 3 days,
  }).notify();
}

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = require("update-notifier");

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discoverConfigFiles = undefined;

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = __webpack_require__(53);

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__(25);

var _extends3 = _interopRequireDefault(_extends2);

var discoverConfigFiles = exports.discoverConfigFiles = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _this = this;

    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$getHomeDir = _ref3.getHomeDir,
        getHomeDir = _ref3$getHomeDir === undefined ? _os2.default.homedir : _ref3$getHomeDir;

    var magicConfigName, possibleConfigs, configs, existingConfigs;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            magicConfigName = 'web-ext-config.js';

            // Config files will be loaded in this order.

            possibleConfigs = [
            // Look for a magic hidden config (preceded by dot) in home dir.
            _path2.default.join(getHomeDir(), '.' + magicConfigName),
            // Look for a magic config in the current working directory.
            _path2.default.join(process.cwd(), magicConfigName)];
            _context2.next = 4;
            return Promise.all(possibleConfigs.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileName) {
                var resolvedFileName;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        resolvedFileName = _path2.default.resolve(fileName);
                        _context.next = 3;
                        return (0, _fileExists2.default)(resolvedFileName);

                      case 3:
                        if (!_context.sent) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt('return', resolvedFileName);

                      case 7:
                        log.debug('Discovered config "' + resolvedFileName + '" does not ' + 'exist or is not readable');
                        return _context.abrupt('return', undefined);

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 4:
            configs = _context2.sent;
            existingConfigs = [];

            configs.forEach(function (f) {
              if (typeof f === 'string') {
                existingConfigs.push(f);
              }
            });
            return _context2.abrupt('return', existingConfigs);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function discoverConfigFiles() {
    return _ref2.apply(this, arguments);
  };
}();

exports.applyConfigToArgv = applyConfigToArgv;
exports.loadJSConfigFile = loadJSConfigFile;

var _os = __webpack_require__(73);

var _os2 = _interopRequireDefault(_os);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _requireUncached = __webpack_require__(179);

var _requireUncached2 = _interopRequireDefault(_requireUncached);

var _camelcase = __webpack_require__(74);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _decamelize = __webpack_require__(180);

var _decamelize2 = _interopRequireDefault(_decamelize);

var _fileExists = __webpack_require__(181);

var _fileExists2 = _interopRequireDefault(_fileExists);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

function applyConfigToArgv(_ref) {
  var argv = _ref.argv,
      argvFromCLI = _ref.argvFromCLI,
      configObject = _ref.configObject,
      options = _ref.options,
      configFileName = _ref.configFileName;

  var newArgv = (0, _extends3.default)({}, argv);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(configObject)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if ((0, _camelcase2.default)(option) !== option) {
        throw new _errors.UsageError('The config option "' + option + '" must be ' + ('specified in camel case: "' + (0, _camelcase2.default)(option) + '"'));
      }

      // A config option cannot be a sub-command config
      // object if it is an array.
      if (!Array.isArray(configObject[option]) && (0, _typeof3.default)(options[option]) === 'object' && (0, _typeof3.default)(configObject[option]) === 'object') {
        // Descend into the nested configuration for a sub-command.
        newArgv = applyConfigToArgv({
          argv: newArgv,
          argvFromCLI: argvFromCLI,
          configObject: configObject[option],
          options: options[option],
          configFileName: configFileName });
        continue;
      }

      var decamelizedOptName = (0, _decamelize2.default)(option, '-');

      if ((0, _typeof3.default)(options[decamelizedOptName]) !== 'object') {
        throw new _errors.UsageError('The config file at ' + configFileName + ' specified ' + ('an unknown option: "' + option + '"'));
      }
      if (options[decamelizedOptName].type === undefined) {
        // This means yargs option type wasn't not defined correctly
        throw new _errors.WebExtError('Option: ' + option + ' was defined without a type.');
      }

      var expectedType = options[decamelizedOptName].type === 'count' ? 'number' : options[decamelizedOptName].type;

      var optionType = Array.isArray(configObject[option]) ? 'array' : (0, _typeof3.default)(configObject[option]);

      if (optionType !== expectedType) {
        throw new _errors.UsageError('The config file at ' + configFileName + ' specified ' + ('the type of "' + option + '" incorrectly as "' + optionType + '"') + (' (expected type "' + expectedType + '")'));
      }

      var defaultValue = void 0;
      if (options[decamelizedOptName]) {
        if (options[decamelizedOptName].default !== undefined) {
          defaultValue = options[decamelizedOptName].default;
        } else if (expectedType === 'boolean') {
          defaultValue = false;
        }
      }

      // This is our best effort (without patching yargs) to detect
      // if a value was set on the CLI instead of in the config.
      // It looks for a default value and if the argv value is
      // different, it assumes that the value was configured on the CLI.

      var wasValueSetOnCLI = typeof argvFromCLI[option] !== 'undefined' && argvFromCLI[option] !== defaultValue;
      if (wasValueSetOnCLI) {
        log.debug('Favoring CLI: ' + option + '=' + argvFromCLI[option] + ' over ' + ('configuration: ' + option + '=' + configObject[option]));
        newArgv[option] = argvFromCLI[option];
        continue;
      }

      newArgv[option] = configObject[option];

      var coerce = options[decamelizedOptName].coerce;
      if (coerce) {
        log.debug('Calling coerce() on configured value for ' + option);
        newArgv[option] = coerce(newArgv[option]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newArgv;
}

function loadJSConfigFile(filePath) {
  var resolvedFilePath = _path2.default.resolve(filePath);
  log.debug('Loading JS config file: "' + filePath + '" ' + ('(resolved to "' + resolvedFilePath + '")'));
  var configObject = void 0;
  try {
    configObject = (0, _requireUncached2.default)(resolvedFilePath);
  } catch (error) {
    log.debug('Handling error:', error);
    throw new _errors.UsageError('Cannot read config file: ' + resolvedFilePath + '\n' + ('Error: ' + error.message));
  }
  if (Object.keys(configObject).length === 0) {
    log.debug('Config file ' + resolvedFilePath + ' did not define any options. ' + 'Did you set module.exports = {...}?');
  }
  return configObject;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/config.js"))

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = require("require-uncached");

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = require("decamelize");

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(4);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mz = __webpack_require__(17);

var _errors = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Resolves true if the path is a readable file.
 *
 * Usage:
 *
 * const exists = await fileExists(filePath);
 * if (exists) {
 *   // ...
 * }
 *
 * */
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$fileIsReadable = _ref2.fileIsReadable,
        fileIsReadable = _ref2$fileIsReadable === undefined ? function (f) {
      return _mz.fs.access(f, _mz.fs.constants.R_OK);
    } : _ref2$fileIsReadable;

    var stat;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fileIsReadable(path);

          case 3:
            _context.next = 5;
            return _mz.fs.stat(path);

          case 5:
            stat = _context.sent;
            return _context.abrupt('return', stat.isFile());

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            if (!(0, _errors.isErrorWithCode)(['EACCES', 'ENOENT'], _context.t0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', false);

          case 13:
            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  function fileExists(_x) {
    return _ref.apply(this, arguments);
  }

  return fileExists;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=web-ext.js.map