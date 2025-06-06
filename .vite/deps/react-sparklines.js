import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-sparklines/build/index.js
var require_build = __commonJS({
  "node_modules/react-sparklines/build/index.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory(require_react());
      else if (typeof define === "function" && define.amd)
        define(["react"], factory);
      else if (typeof exports === "object")
        exports["ReactSparklines"] = factory(require_react());
      else
        root["ReactSparklines"] = factory(root["React"]);
    })(exports, function(__WEBPACK_EXTERNAL_MODULE_1__) {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
                /******/
              });
            }
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "/";
          return __webpack_require__(__webpack_require__.s = 11);
        }([
          /* 0 */
          /***/
          function(module2, exports2, __webpack_require__) {
            (function(process) {
              if (process.env.NODE_ENV !== "production") {
                var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
                var isValidElement = function(object) {
                  return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
                };
                var throwOnDirectAccess = true;
                module2.exports = __webpack_require__(14)(isValidElement, throwOnDirectAccess);
              } else {
                module2.exports = __webpack_require__(16)();
              }
            }).call(exports2, __webpack_require__(2));
          },
          /* 1 */
          /***/
          function(module2, exports2) {
            module2.exports = __WEBPACK_EXTERNAL_MODULE_1__;
          },
          /* 2 */
          /***/
          function(module2, exports2) {
            var process = module2.exports = {};
            var cachedSetTimeout;
            var cachedClearTimeout;
            function defaultSetTimout() {
              throw new Error("setTimeout has not been defined");
            }
            function defaultClearTimeout() {
              throw new Error("clearTimeout has not been defined");
            }
            (function() {
              try {
                if (typeof setTimeout === "function") {
                  cachedSetTimeout = setTimeout;
                } else {
                  cachedSetTimeout = defaultSetTimout;
                }
              } catch (e) {
                cachedSetTimeout = defaultSetTimout;
              }
              try {
                if (typeof clearTimeout === "function") {
                  cachedClearTimeout = clearTimeout;
                } else {
                  cachedClearTimeout = defaultClearTimeout;
                }
              } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
              }
            })();
            function runTimeout(fun) {
              if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
              }
              if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
              }
              try {
                return cachedSetTimeout(fun, 0);
              } catch (e) {
                try {
                  return cachedSetTimeout.call(null, fun, 0);
                } catch (e2) {
                  return cachedSetTimeout.call(this, fun, 0);
                }
              }
            }
            function runClearTimeout(marker) {
              if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
              }
              if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
              }
              try {
                return cachedClearTimeout(marker);
              } catch (e) {
                try {
                  return cachedClearTimeout.call(null, marker);
                } catch (e2) {
                  return cachedClearTimeout.call(this, marker);
                }
              }
            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;
            function cleanUpNextTick() {
              if (!draining || !currentQueue) {
                return;
              }
              draining = false;
              if (currentQueue.length) {
                queue = currentQueue.concat(queue);
              } else {
                queueIndex = -1;
              }
              if (queue.length) {
                drainQueue();
              }
            }
            function drainQueue() {
              if (draining) {
                return;
              }
              var timeout = runTimeout(cleanUpNextTick);
              draining = true;
              var len = queue.length;
              while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                  if (currentQueue) {
                    currentQueue[queueIndex].run();
                  }
                }
                queueIndex = -1;
                len = queue.length;
              }
              currentQueue = null;
              draining = false;
              runClearTimeout(timeout);
            }
            process.nextTick = function(fun) {
              var args = new Array(arguments.length - 1);
              if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                  args[i - 1] = arguments[i];
                }
              }
              queue.push(new Item(fun, args));
              if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
              }
            };
            function Item(fun, array) {
              this.fun = fun;
              this.array = array;
            }
            Item.prototype.run = function() {
              this.fun.apply(null, this.array);
            };
            process.title = "browser";
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = "";
            process.versions = {};
            function noop() {
            }
            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;
            process.listeners = function(name) {
              return [];
            };
            process.binding = function(name) {
              throw new Error("process.binding is not supported");
            };
            process.cwd = function() {
              return "/";
            };
            process.chdir = function(dir) {
              throw new Error("process.chdir is not supported");
            };
            process.umask = function() {
              return 0;
            };
          },
          /* 3 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.default = function(data) {
              return data.reduce(function(a, b) {
                return a + b;
              }) / data.length;
            };
          },
          /* 4 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            function makeEmptyFunction(arg) {
              return function() {
                return arg;
              };
            }
            var emptyFunction = function emptyFunction2() {
            };
            emptyFunction.thatReturns = makeEmptyFunction;
            emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
            emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
            emptyFunction.thatReturnsNull = makeEmptyFunction(null);
            emptyFunction.thatReturnsThis = function() {
              return this;
            };
            emptyFunction.thatReturnsArgument = function(arg) {
              return arg;
            };
            module2.exports = emptyFunction;
          },
          /* 5 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            (function(process) {
              var validateFormat = function validateFormat2(format) {
              };
              if (process.env.NODE_ENV !== "production") {
                validateFormat = function validateFormat2(format) {
                  if (format === void 0) {
                    throw new Error("invariant requires an error message argument");
                  }
                };
              }
              function invariant(condition, format, a, b, c, d, e, f) {
                validateFormat(format);
                if (!condition) {
                  var error;
                  if (format === void 0) {
                    error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                  } else {
                    var args = [a, b, c, d, e, f];
                    var argIndex = 0;
                    error = new Error(format.replace(/%s/g, function() {
                      return args[argIndex++];
                    }));
                    error.name = "Invariant Violation";
                  }
                  error.framesToPop = 1;
                  throw error;
                }
              }
              module2.exports = invariant;
            }).call(exports2, __webpack_require__(2));
          },
          /* 6 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
            module2.exports = ReactPropTypesSecret;
          },
          /* 7 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.default = function(data) {
              return Math.min.apply(Math, data);
            };
          },
          /* 8 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            (function(process) {
              var emptyFunction = __webpack_require__(4);
              var warning = emptyFunction;
              if (process.env.NODE_ENV !== "production") {
                var printWarning = function printWarning2(format) {
                  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                  }
                  var argIndex = 0;
                  var message = "Warning: " + format.replace(/%s/g, function() {
                    return args[argIndex++];
                  });
                  if (typeof console !== "undefined") {
                    console.error(message);
                  }
                  try {
                    throw new Error(message);
                  } catch (x) {
                  }
                };
                warning = function warning2(condition, format) {
                  if (format === void 0) {
                    throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
                  }
                  if (format.indexOf("Failed Composite propType: ") === 0) {
                    return;
                  }
                  if (!condition) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                      args[_key2 - 2] = arguments[_key2];
                    }
                    printWarning.apply(void 0, [format].concat(args));
                  }
                };
              }
              module2.exports = warning;
            }).call(exports2, __webpack_require__(2));
          },
          /* 9 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.default = function(data) {
              return Math.max.apply(Math, data);
            };
          },
          /* 10 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _mean = __webpack_require__(3);
            var _mean2 = _interopRequireDefault(_mean);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.default = function(data) {
              var dataMean = (0, _mean2.default)(data);
              var sqDiff = data.map(function(n) {
                return Math.pow(n - dataMean, 2);
              });
              var avgSqDiff = (0, _mean2.default)(sqDiff);
              return Math.sqrt(avgSqDiff);
            };
          },
          /* 11 */
          /***/
          function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__(12);
          },
          /* 12 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            module2.exports = __webpack_require__(13);
          },
          /* 13 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.SparklinesText = exports2.SparklinesNormalBand = exports2.SparklinesReferenceLine = exports2.SparklinesSpots = exports2.SparklinesBars = exports2.SparklinesCurve = exports2.SparklinesLine = exports2.Sparklines = void 0;
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            var _SparklinesText = __webpack_require__(17);
            var _SparklinesText2 = _interopRequireDefault(_SparklinesText);
            var _SparklinesLine = __webpack_require__(18);
            var _SparklinesLine2 = _interopRequireDefault(_SparklinesLine);
            var _SparklinesCurve = __webpack_require__(19);
            var _SparklinesCurve2 = _interopRequireDefault(_SparklinesCurve);
            var _SparklinesBars = __webpack_require__(20);
            var _SparklinesBars2 = _interopRequireDefault(_SparklinesBars);
            var _SparklinesSpots = __webpack_require__(21);
            var _SparklinesSpots2 = _interopRequireDefault(_SparklinesSpots);
            var _SparklinesReferenceLine = __webpack_require__(22);
            var _SparklinesReferenceLine2 = _interopRequireDefault(_SparklinesReferenceLine);
            var _SparklinesNormalBand = __webpack_require__(27);
            var _SparklinesNormalBand2 = _interopRequireDefault(_SparklinesNormalBand);
            var _dataToPoints = __webpack_require__(28);
            var _dataToPoints2 = _interopRequireDefault(_dataToPoints);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var Sparklines = function(_PureComponent) {
              _inherits(Sparklines2, _PureComponent);
              function Sparklines2(props) {
                _classCallCheck(this, Sparklines2);
                return _possibleConstructorReturn(this, (Sparklines2.__proto__ || Object.getPrototypeOf(Sparklines2)).call(this, props));
              }
              _createClass(Sparklines2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, data = _props.data, limit = _props.limit, width = _props.width, height = _props.height, svgWidth = _props.svgWidth, svgHeight = _props.svgHeight, preserveAspectRatio = _props.preserveAspectRatio, margin = _props.margin, style = _props.style, max = _props.max, min = _props.min;
                  if (data.length === 0) return null;
                  var points = (0, _dataToPoints2.default)({ data, limit, width, height, margin, max, min });
                  var svgOpts = { style, viewBox: "0 0 " + width + " " + height, preserveAspectRatio };
                  if (svgWidth > 0) svgOpts.width = svgWidth;
                  if (svgHeight > 0) svgOpts.height = svgHeight;
                  return _react2.default.createElement(
                    "svg",
                    svgOpts,
                    _react2.default.Children.map(this.props.children, function(child) {
                      return _react2.default.cloneElement(child, { data, points, width, height, margin });
                    })
                  );
                }
              }]);
              return Sparklines2;
            }(_react.PureComponent);
            Sparklines.propTypes = {
              data: _propTypes2.default.array,
              limit: _propTypes2.default.number,
              width: _propTypes2.default.number,
              height: _propTypes2.default.number,
              svgWidth: _propTypes2.default.number,
              svgHeight: _propTypes2.default.number,
              preserveAspectRatio: _propTypes2.default.string,
              margin: _propTypes2.default.number,
              style: _propTypes2.default.object,
              min: _propTypes2.default.number,
              max: _propTypes2.default.number,
              onMouseMove: _propTypes2.default.func
            };
            Sparklines.defaultProps = {
              data: [],
              width: 240,
              height: 60,
              //Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
              preserveAspectRatio: "none",
              //https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
              margin: 2
            };
            exports2.Sparklines = Sparklines;
            exports2.SparklinesLine = _SparklinesLine2.default;
            exports2.SparklinesCurve = _SparklinesCurve2.default;
            exports2.SparklinesBars = _SparklinesBars2.default;
            exports2.SparklinesSpots = _SparklinesSpots2.default;
            exports2.SparklinesReferenceLine = _SparklinesReferenceLine2.default;
            exports2.SparklinesNormalBand = _SparklinesNormalBand2.default;
            exports2.SparklinesText = _SparklinesText2.default;
          },
          /* 14 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            (function(process) {
              var emptyFunction = __webpack_require__(4);
              var invariant = __webpack_require__(5);
              var warning = __webpack_require__(8);
              var ReactPropTypesSecret = __webpack_require__(6);
              var checkPropTypes = __webpack_require__(15);
              module2.exports = function(isValidElement, throwOnDirectAccess) {
                var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
                var FAUX_ITERATOR_SYMBOL = "@@iterator";
                function getIteratorFn(maybeIterable) {
                  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
                  if (typeof iteratorFn === "function") {
                    return iteratorFn;
                  }
                }
                var ANONYMOUS = "<<anonymous>>";
                var ReactPropTypes = {
                  array: createPrimitiveTypeChecker("array"),
                  bool: createPrimitiveTypeChecker("boolean"),
                  func: createPrimitiveTypeChecker("function"),
                  number: createPrimitiveTypeChecker("number"),
                  object: createPrimitiveTypeChecker("object"),
                  string: createPrimitiveTypeChecker("string"),
                  symbol: createPrimitiveTypeChecker("symbol"),
                  any: createAnyTypeChecker(),
                  arrayOf: createArrayOfTypeChecker,
                  element: createElementTypeChecker(),
                  instanceOf: createInstanceTypeChecker,
                  node: createNodeChecker(),
                  objectOf: createObjectOfTypeChecker,
                  oneOf: createEnumTypeChecker,
                  oneOfType: createUnionTypeChecker,
                  shape: createShapeTypeChecker
                };
                function is(x, y) {
                  if (x === y) {
                    return x !== 0 || 1 / x === 1 / y;
                  } else {
                    return x !== x && y !== y;
                  }
                }
                function PropTypeError(message) {
                  this.message = message;
                  this.stack = "";
                }
                PropTypeError.prototype = Error.prototype;
                function createChainableTypeChecker(validate) {
                  if (process.env.NODE_ENV !== "production") {
                    var manualPropTypeCallCache = {};
                    var manualPropTypeWarningCount = 0;
                  }
                  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                    componentName = componentName || ANONYMOUS;
                    propFullName = propFullName || propName;
                    if (secret !== ReactPropTypesSecret) {
                      if (throwOnDirectAccess) {
                        invariant(
                          false,
                          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
                        );
                      } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
                        var cacheKey = componentName + ":" + propName;
                        if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                        manualPropTypeWarningCount < 3) {
                          warning(
                            false,
                            "You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
                            propFullName,
                            componentName
                          );
                          manualPropTypeCallCache[cacheKey] = true;
                          manualPropTypeWarningCount++;
                        }
                      }
                    }
                    if (props[propName] == null) {
                      if (isRequired) {
                        if (props[propName] === null) {
                          return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                        }
                        return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
                      }
                      return null;
                    } else {
                      return validate(props, propName, componentName, location, propFullName);
                    }
                  }
                  var chainedCheckType = checkType.bind(null, false);
                  chainedCheckType.isRequired = checkType.bind(null, true);
                  return chainedCheckType;
                }
                function createPrimitiveTypeChecker(expectedType) {
                  function validate(props, propName, componentName, location, propFullName, secret) {
                    var propValue = props[propName];
                    var propType = getPropType(propValue);
                    if (propType !== expectedType) {
                      var preciseType = getPreciseType(propValue);
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createAnyTypeChecker() {
                  return createChainableTypeChecker(emptyFunction.thatReturnsNull);
                }
                function createArrayOfTypeChecker(typeChecker) {
                  function validate(props, propName, componentName, location, propFullName) {
                    if (typeof typeChecker !== "function") {
                      return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
                    }
                    var propValue = props[propName];
                    if (!Array.isArray(propValue)) {
                      var propType = getPropType(propValue);
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
                    }
                    for (var i = 0; i < propValue.length; i++) {
                      var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                      if (error instanceof Error) {
                        return error;
                      }
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createElementTypeChecker() {
                  function validate(props, propName, componentName, location, propFullName) {
                    var propValue = props[propName];
                    if (!isValidElement(propValue)) {
                      var propType = getPropType(propValue);
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createInstanceTypeChecker(expectedClass) {
                  function validate(props, propName, componentName, location, propFullName) {
                    if (!(props[propName] instanceof expectedClass)) {
                      var expectedClassName = expectedClass.name || ANONYMOUS;
                      var actualClassName = getClassName(props[propName]);
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createEnumTypeChecker(expectedValues) {
                  if (!Array.isArray(expectedValues)) {
                    process.env.NODE_ENV !== "production" ? warning(false, "Invalid argument supplied to oneOf, expected an instance of array.") : void 0;
                    return emptyFunction.thatReturnsNull;
                  }
                  function validate(props, propName, componentName, location, propFullName) {
                    var propValue = props[propName];
                    for (var i = 0; i < expectedValues.length; i++) {
                      if (is(propValue, expectedValues[i])) {
                        return null;
                      }
                    }
                    var valuesString = JSON.stringify(expectedValues);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + propValue + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
                  }
                  return createChainableTypeChecker(validate);
                }
                function createObjectOfTypeChecker(typeChecker) {
                  function validate(props, propName, componentName, location, propFullName) {
                    if (typeof typeChecker !== "function") {
                      return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
                    }
                    var propValue = props[propName];
                    var propType = getPropType(propValue);
                    if (propType !== "object") {
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
                    }
                    for (var key in propValue) {
                      if (propValue.hasOwnProperty(key)) {
                        var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                        if (error instanceof Error) {
                          return error;
                        }
                      }
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createUnionTypeChecker(arrayOfTypeCheckers) {
                  if (!Array.isArray(arrayOfTypeCheckers)) {
                    process.env.NODE_ENV !== "production" ? warning(false, "Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
                    return emptyFunction.thatReturnsNull;
                  }
                  for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                    var checker = arrayOfTypeCheckers[i];
                    if (typeof checker !== "function") {
                      warning(
                        false,
                        "Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",
                        getPostfixForTypeWarning(checker),
                        i
                      );
                      return emptyFunction.thatReturnsNull;
                    }
                  }
                  function validate(props, propName, componentName, location, propFullName) {
                    for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
                      var checker2 = arrayOfTypeCheckers[i2];
                      if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
                        return null;
                      }
                    }
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
                  }
                  return createChainableTypeChecker(validate);
                }
                function createNodeChecker() {
                  function validate(props, propName, componentName, location, propFullName) {
                    if (!isNode(props[propName])) {
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function createShapeTypeChecker(shapeTypes) {
                  function validate(props, propName, componentName, location, propFullName) {
                    var propValue = props[propName];
                    var propType = getPropType(propValue);
                    if (propType !== "object") {
                      return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
                    }
                    for (var key in shapeTypes) {
                      var checker = shapeTypes[key];
                      if (!checker) {
                        continue;
                      }
                      var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                      if (error) {
                        return error;
                      }
                    }
                    return null;
                  }
                  return createChainableTypeChecker(validate);
                }
                function isNode(propValue) {
                  switch (typeof propValue) {
                    case "number":
                    case "string":
                    case "undefined":
                      return true;
                    case "boolean":
                      return !propValue;
                    case "object":
                      if (Array.isArray(propValue)) {
                        return propValue.every(isNode);
                      }
                      if (propValue === null || isValidElement(propValue)) {
                        return true;
                      }
                      var iteratorFn = getIteratorFn(propValue);
                      if (iteratorFn) {
                        var iterator = iteratorFn.call(propValue);
                        var step;
                        if (iteratorFn !== propValue.entries) {
                          while (!(step = iterator.next()).done) {
                            if (!isNode(step.value)) {
                              return false;
                            }
                          }
                        } else {
                          while (!(step = iterator.next()).done) {
                            var entry = step.value;
                            if (entry) {
                              if (!isNode(entry[1])) {
                                return false;
                              }
                            }
                          }
                        }
                      } else {
                        return false;
                      }
                      return true;
                    default:
                      return false;
                  }
                }
                function isSymbol(propType, propValue) {
                  if (propType === "symbol") {
                    return true;
                  }
                  if (propValue["@@toStringTag"] === "Symbol") {
                    return true;
                  }
                  if (typeof Symbol === "function" && propValue instanceof Symbol) {
                    return true;
                  }
                  return false;
                }
                function getPropType(propValue) {
                  var propType = typeof propValue;
                  if (Array.isArray(propValue)) {
                    return "array";
                  }
                  if (propValue instanceof RegExp) {
                    return "object";
                  }
                  if (isSymbol(propType, propValue)) {
                    return "symbol";
                  }
                  return propType;
                }
                function getPreciseType(propValue) {
                  if (typeof propValue === "undefined" || propValue === null) {
                    return "" + propValue;
                  }
                  var propType = getPropType(propValue);
                  if (propType === "object") {
                    if (propValue instanceof Date) {
                      return "date";
                    } else if (propValue instanceof RegExp) {
                      return "regexp";
                    }
                  }
                  return propType;
                }
                function getPostfixForTypeWarning(value) {
                  var type = getPreciseType(value);
                  switch (type) {
                    case "array":
                    case "object":
                      return "an " + type;
                    case "boolean":
                    case "date":
                    case "regexp":
                      return "a " + type;
                    default:
                      return type;
                  }
                }
                function getClassName(propValue) {
                  if (!propValue.constructor || !propValue.constructor.name) {
                    return ANONYMOUS;
                  }
                  return propValue.constructor.name;
                }
                ReactPropTypes.checkPropTypes = checkPropTypes;
                ReactPropTypes.PropTypes = ReactPropTypes;
                return ReactPropTypes;
              };
            }).call(exports2, __webpack_require__(2));
          },
          /* 15 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            (function(process) {
              if (process.env.NODE_ENV !== "production") {
                var invariant = __webpack_require__(5);
                var warning = __webpack_require__(8);
                var ReactPropTypesSecret = __webpack_require__(6);
                var loggedTypeFailures = {};
              }
              function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
                if (process.env.NODE_ENV !== "production") {
                  for (var typeSpecName in typeSpecs) {
                    if (typeSpecs.hasOwnProperty(typeSpecName)) {
                      var error;
                      try {
                        invariant(typeof typeSpecs[typeSpecName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.", componentName || "React class", location, typeSpecName);
                        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                      } catch (ex) {
                        error = ex;
                      }
                      warning(!error || error instanceof Error, "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error);
                      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                        loggedTypeFailures[error.message] = true;
                        var stack = getStack ? getStack() : "";
                        warning(false, "Failed %s type: %s%s", location, error.message, stack != null ? stack : "");
                      }
                    }
                  }
                }
              }
              module2.exports = checkPropTypes;
            }).call(exports2, __webpack_require__(2));
          },
          /* 16 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var emptyFunction = __webpack_require__(4);
            var invariant = __webpack_require__(5);
            var ReactPropTypesSecret = __webpack_require__(6);
            module2.exports = function() {
              function shim(props, propName, componentName, location, propFullName, secret) {
                if (secret === ReactPropTypesSecret) {
                  return;
                }
                invariant(
                  false,
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
                );
              }
              ;
              shim.isRequired = shim;
              function getShim() {
                return shim;
              }
              ;
              var ReactPropTypes = {
                array: shim,
                bool: shim,
                func: shim,
                number: shim,
                object: shim,
                string: shim,
                symbol: shim,
                any: shim,
                arrayOf: getShim,
                element: shim,
                instanceOf: getShim,
                node: shim,
                objectOf: getShim,
                oneOf: getShim,
                oneOfType: getShim,
                shape: getShim
              };
              ReactPropTypes.checkPropTypes = emptyFunction;
              ReactPropTypes.PropTypes = ReactPropTypes;
              return ReactPropTypes;
            };
          },
          /* 17 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesText = function(_React$Component) {
              _inherits(SparklinesText2, _React$Component);
              function SparklinesText2() {
                _classCallCheck(this, SparklinesText2);
                return _possibleConstructorReturn(this, (SparklinesText2.__proto__ || Object.getPrototypeOf(SparklinesText2)).apply(this, arguments));
              }
              _createClass(SparklinesText2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, point = _props.point, text = _props.text, fontSize = _props.fontSize, fontFamily = _props.fontFamily;
                  var x = point.x, y = point.y;
                  return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(
                      "text",
                      { x, y, fontFamily: fontFamily || "Verdana", fontSize: fontSize || 10 },
                      text
                    )
                  );
                }
              }]);
              return SparklinesText2;
            }(_react2.default.Component);
            SparklinesText.propTypes = {
              text: _propTypes2.default.string,
              point: _propTypes2.default.object,
              fontSize: _propTypes2.default.number,
              fontFamily: _propTypes2.default.string
            };
            SparklinesText.defaultProps = {
              text: "",
              point: { x: 0, y: 0 }
            };
            exports2.default = SparklinesText;
          },
          /* 18 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesLine = function(_React$Component) {
              _inherits(SparklinesLine2, _React$Component);
              function SparklinesLine2() {
                _classCallCheck(this, SparklinesLine2);
                return _possibleConstructorReturn(this, (SparklinesLine2.__proto__ || Object.getPrototypeOf(SparklinesLine2)).apply(this, arguments));
              }
              _createClass(SparklinesLine2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, data = _props.data, points = _props.points, width = _props.width, height = _props.height, margin = _props.margin, color = _props.color, style = _props.style, onMouseMove = _props.onMouseMove;
                  var linePoints = points.map(function(p) {
                    return [p.x, p.y];
                  }).reduce(function(a, b) {
                    return a.concat(b);
                  });
                  var closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y];
                  var fillPoints = linePoints.concat(closePolyPoints);
                  var lineStyle = {
                    stroke: color || style.stroke || "slategray",
                    strokeWidth: style.strokeWidth || "1",
                    strokeLinejoin: style.strokeLinejoin || "round",
                    strokeLinecap: style.strokeLinecap || "round",
                    fill: "none"
                  };
                  var fillStyle = {
                    stroke: style.stroke || "none",
                    strokeWidth: "0",
                    fillOpacity: style.fillOpacity || ".1",
                    fill: style.fill || color || "slategray",
                    pointerEvents: "auto"
                  };
                  var tooltips = points.map(function(p, i) {
                    return _react2.default.createElement("circle", {
                      key: i,
                      cx: p.x,
                      cy: p.y,
                      r: 2,
                      style: fillStyle,
                      onMouseEnter: function onMouseEnter(e) {
                        return onMouseMove("enter", data[i], p);
                      },
                      onClick: function onClick(e) {
                        return onMouseMove("click", data[i], p);
                      }
                    });
                  });
                  return _react2.default.createElement(
                    "g",
                    null,
                    tooltips,
                    _react2.default.createElement("polyline", { points: fillPoints.join(" "), style: fillStyle }),
                    _react2.default.createElement("polyline", { points: linePoints.join(" "), style: lineStyle })
                  );
                }
              }]);
              return SparklinesLine2;
            }(_react2.default.Component);
            SparklinesLine.propTypes = {
              color: _propTypes2.default.string,
              style: _propTypes2.default.object
            };
            SparklinesLine.defaultProps = {
              style: {},
              onMouseMove: function onMouseMove() {
              }
            };
            exports2.default = SparklinesLine;
          },
          /* 19 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesCurve = function(_React$Component) {
              _inherits(SparklinesCurve2, _React$Component);
              function SparklinesCurve2() {
                _classCallCheck(this, SparklinesCurve2);
                return _possibleConstructorReturn(this, (SparklinesCurve2.__proto__ || Object.getPrototypeOf(SparklinesCurve2)).apply(this, arguments));
              }
              _createClass(SparklinesCurve2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, points = _props.points, width = _props.width, height = _props.height, margin = _props.margin, color = _props.color, style = _props.style, _props$divisor = _props.divisor, divisor = _props$divisor === void 0 ? 0.25 : _props$divisor;
                  var prev = void 0;
                  var curve = function curve2(p) {
                    var res = void 0;
                    if (!prev) {
                      res = [p.x, p.y];
                    } else {
                      var len = (p.x - prev.x) * divisor;
                      res = [
                        "C",
                        //x1
                        prev.x + len,
                        //y1
                        prev.y,
                        //x2,
                        p.x - len,
                        //y2,
                        p.y,
                        //x,
                        p.x,
                        //y
                        p.y
                      ];
                    }
                    prev = p;
                    return res;
                  };
                  var linePoints = points.map(function(p) {
                    return curve(p);
                  }).reduce(function(a, b) {
                    return a.concat(b);
                  });
                  var closePolyPoints = ["L" + points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y];
                  var fillPoints = linePoints.concat(closePolyPoints);
                  var lineStyle = {
                    stroke: color || style.stroke || "slategray",
                    strokeWidth: style.strokeWidth || "1",
                    strokeLinejoin: style.strokeLinejoin || "round",
                    strokeLinecap: style.strokeLinecap || "round",
                    fill: "none"
                  };
                  var fillStyle = {
                    stroke: style.stroke || "none",
                    strokeWidth: "0",
                    fillOpacity: style.fillOpacity || ".1",
                    fill: style.fill || color || "slategray"
                  };
                  return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("path", { d: "M" + fillPoints.join(" "), style: fillStyle }),
                    _react2.default.createElement("path", { d: "M" + linePoints.join(" "), style: lineStyle })
                  );
                }
              }]);
              return SparklinesCurve2;
            }(_react2.default.Component);
            SparklinesCurve.propTypes = {
              color: _propTypes2.default.string,
              style: _propTypes2.default.object
            };
            SparklinesCurve.defaultProps = {
              style: {}
            };
            exports2.default = SparklinesCurve;
          },
          /* 20 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesBars = function(_React$Component) {
              _inherits(SparklinesBars2, _React$Component);
              function SparklinesBars2() {
                _classCallCheck(this, SparklinesBars2);
                return _possibleConstructorReturn(this, (SparklinesBars2.__proto__ || Object.getPrototypeOf(SparklinesBars2)).apply(this, arguments));
              }
              _createClass(SparklinesBars2, [{
                key: "render",
                value: function render() {
                  var _this2 = this;
                  var _props = this.props, points = _props.points, height = _props.height, style = _props.style, barWidth = _props.barWidth, margin = _props.margin, onMouseMove = _props.onMouseMove;
                  var strokeWidth = 1 * (style && style.strokeWidth || 0);
                  var marginWidth = margin ? 2 * margin : 0;
                  var width = barWidth || (points && points.length >= 2 ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth) : 0);
                  return _react2.default.createElement(
                    "g",
                    { transform: "scale(1,-1)" },
                    points.map(function(p, i) {
                      return _react2.default.createElement("rect", {
                        key: i,
                        x: p.x - (width + strokeWidth) / 2,
                        y: -height,
                        width,
                        height: Math.max(0, height - p.y),
                        style,
                        onMouseMove: onMouseMove && onMouseMove.bind(_this2, p)
                      });
                    })
                  );
                }
              }]);
              return SparklinesBars2;
            }(_react2.default.Component);
            SparklinesBars.propTypes = {
              points: _propTypes2.default.arrayOf(_propTypes2.default.object),
              height: _propTypes2.default.number,
              style: _propTypes2.default.object,
              barWidth: _propTypes2.default.number,
              margin: _propTypes2.default.number,
              onMouseMove: _propTypes2.default.func
            };
            SparklinesBars.defaultProps = {
              style: { fill: "slategray" }
            };
            exports2.default = SparklinesBars;
          },
          /* 21 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesSpots = function(_React$Component) {
              _inherits(SparklinesSpots2, _React$Component);
              function SparklinesSpots2() {
                _classCallCheck(this, SparklinesSpots2);
                return _possibleConstructorReturn(this, (SparklinesSpots2.__proto__ || Object.getPrototypeOf(SparklinesSpots2)).apply(this, arguments));
              }
              _createClass(SparklinesSpots2, [{
                key: "lastDirection",
                value: function lastDirection(points) {
                  Math.sign = Math.sign || function(x) {
                    return x > 0 ? 1 : -1;
                  };
                  return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
                }
              }, {
                key: "render",
                value: function render() {
                  var _props = this.props, points = _props.points, width = _props.width, height = _props.height, size = _props.size, style = _props.style, spotColors = _props.spotColors;
                  var startSpot = _react2.default.createElement("circle", {
                    cx: points[0].x,
                    cy: points[0].y,
                    r: size,
                    style
                  });
                  var endSpot = _react2.default.createElement("circle", {
                    cx: points[points.length - 1].x,
                    cy: points[points.length - 1].y,
                    r: size,
                    style: style || { fill: spotColors[this.lastDirection(points)] }
                  });
                  return _react2.default.createElement(
                    "g",
                    null,
                    style && startSpot,
                    endSpot
                  );
                }
              }]);
              return SparklinesSpots2;
            }(_react2.default.Component);
            SparklinesSpots.propTypes = {
              size: _propTypes2.default.number,
              style: _propTypes2.default.object,
              spotColors: _propTypes2.default.object
            };
            SparklinesSpots.defaultProps = {
              size: 2,
              spotColors: {
                "-1": "red",
                "0": "black",
                "1": "green"
              }
            };
            exports2.default = SparklinesSpots;
          },
          /* 22 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            var _dataProcessing = __webpack_require__(23);
            var dataProcessing = _interopRequireWildcard(_dataProcessing);
            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesReferenceLine = function(_React$Component) {
              _inherits(SparklinesReferenceLine2, _React$Component);
              function SparklinesReferenceLine2() {
                _classCallCheck(this, SparklinesReferenceLine2);
                return _possibleConstructorReturn(this, (SparklinesReferenceLine2.__proto__ || Object.getPrototypeOf(SparklinesReferenceLine2)).apply(this, arguments));
              }
              _createClass(SparklinesReferenceLine2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, points = _props.points, margin = _props.margin, type = _props.type, style = _props.style, value = _props.value;
                  var ypoints = points.map(function(p) {
                    return p.y;
                  });
                  var y = type == "custom" ? value : dataProcessing[type](ypoints);
                  return _react2.default.createElement("line", {
                    x1: points[0].x,
                    y1: y + margin,
                    x2: points[points.length - 1].x,
                    y2: y + margin,
                    style
                  });
                }
              }]);
              return SparklinesReferenceLine2;
            }(_react2.default.Component);
            SparklinesReferenceLine.propTypes = {
              type: _propTypes2.default.oneOf(["max", "min", "mean", "avg", "median", "custom"]),
              value: _propTypes2.default.number,
              style: _propTypes2.default.object
            };
            SparklinesReferenceLine.defaultProps = {
              type: "mean",
              style: { stroke: "red", strokeOpacity: 0.75, strokeDasharray: "2, 2" }
            };
            exports2.default = SparklinesReferenceLine;
          },
          /* 23 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.variance = exports2.stdev = exports2.median = exports2.midRange = exports2.avg = exports2.mean = exports2.max = exports2.min = void 0;
            var _min2 = __webpack_require__(7);
            var _min3 = _interopRequireDefault(_min2);
            var _mean2 = __webpack_require__(3);
            var _mean3 = _interopRequireDefault(_mean2);
            var _midRange2 = __webpack_require__(24);
            var _midRange3 = _interopRequireDefault(_midRange2);
            var _median2 = __webpack_require__(25);
            var _median3 = _interopRequireDefault(_median2);
            var _stdev2 = __webpack_require__(10);
            var _stdev3 = _interopRequireDefault(_stdev2);
            var _variance2 = __webpack_require__(26);
            var _variance3 = _interopRequireDefault(_variance2);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.min = _min3.default;
            exports2.max = _min3.default;
            exports2.mean = _mean3.default;
            exports2.avg = _mean3.default;
            exports2.midRange = _midRange3.default;
            exports2.median = _median3.default;
            exports2.stdev = _stdev3.default;
            exports2.variance = _variance3.default;
          },
          /* 24 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _min = __webpack_require__(7);
            var _min2 = _interopRequireDefault(_min);
            var _max = __webpack_require__(9);
            var _max2 = _interopRequireDefault(_max);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.default = function(data) {
              return (0, _max2.default)(data) - (0, _min2.default)(data) / 2;
            };
          },
          /* 25 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.default = function(data) {
              return data.sort(function(a, b) {
                return a - b;
              })[Math.floor(data.length / 2)];
            };
          },
          /* 26 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _mean = __webpack_require__(3);
            var _mean2 = _interopRequireDefault(_mean);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.default = function(data) {
              var dataMean = (0, _mean2.default)(data);
              var sq = data.map(function(n) {
                return Math.pow(n - dataMean, 2);
              });
              return (0, _mean2.default)(sq);
            };
          },
          /* 27 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            var _propTypes = __webpack_require__(0);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _react = __webpack_require__(1);
            var _react2 = _interopRequireDefault(_react);
            var _mean = __webpack_require__(3);
            var _mean2 = _interopRequireDefault(_mean);
            var _stdev = __webpack_require__(10);
            var _stdev2 = _interopRequireDefault(_stdev);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var SparklinesNormalBand = function(_React$Component) {
              _inherits(SparklinesNormalBand2, _React$Component);
              function SparklinesNormalBand2() {
                _classCallCheck(this, SparklinesNormalBand2);
                return _possibleConstructorReturn(this, (SparklinesNormalBand2.__proto__ || Object.getPrototypeOf(SparklinesNormalBand2)).apply(this, arguments));
              }
              _createClass(SparklinesNormalBand2, [{
                key: "render",
                value: function render() {
                  var _props = this.props, points = _props.points, margin = _props.margin, style = _props.style;
                  var ypoints = points.map(function(p) {
                    return p.y;
                  });
                  var dataMean = (0, _mean2.default)(ypoints);
                  var dataStdev = (0, _stdev2.default)(ypoints);
                  return _react2.default.createElement("rect", {
                    x: points[0].x,
                    y: dataMean - dataStdev + margin,
                    width: points[points.length - 1].x - points[0].x,
                    height: _stdev2.default * 2,
                    style
                  });
                }
              }]);
              return SparklinesNormalBand2;
            }(_react2.default.Component);
            SparklinesNormalBand.propTypes = {
              style: _propTypes2.default.object
            };
            SparklinesNormalBand.defaultProps = {
              style: { fill: "red", fillOpacity: 0.1 }
            };
            exports2.default = SparklinesNormalBand;
          },
          /* 28 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            var _min = __webpack_require__(7);
            var _min2 = _interopRequireDefault(_min);
            var _max = __webpack_require__(9);
            var _max2 = _interopRequireDefault(_max);
            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }
            exports2.default = function(_ref) {
              var data = _ref.data, limit = _ref.limit, _ref$width = _ref.width, width = _ref$width === void 0 ? 1 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 1 : _ref$height, _ref$margin = _ref.margin, margin = _ref$margin === void 0 ? 0 : _ref$margin, _ref$max = _ref.max, max = _ref$max === void 0 ? (0, _max2.default)(data) : _ref$max, _ref$min = _ref.min, min = _ref$min === void 0 ? (0, _min2.default)(data) : _ref$min;
              var len = data.length;
              if (limit && limit < len) {
                data = data.slice(len - limit);
              }
              var vfactor = (height - margin * 2) / (max - min || 2);
              var hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));
              return data.map(function(d, i) {
                return {
                  x: i * hfactor + margin,
                  y: (max === min ? 1 : max - d) * vfactor + margin
                };
              });
            };
          }
          /******/
        ])
      );
    });
  }
});
export default require_build();
//# sourceMappingURL=react-sparklines.js.map
