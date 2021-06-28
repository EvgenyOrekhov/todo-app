import { r as react } from './common/index-f991c804.js';
import { c as createCommonjsModule } from './common/_commonjsHelpers-0597c316.js';
import { u as unistUtilVisit, a as unistUtilPosition, f as find_1, c as commaSeparatedTokens, s as spaceSeparatedTokens, h as hastToReact, b as styleToObject, d as svg_1, e as html_1$1 } from './common/index-796ea957.js';
import { p as propTypes } from './common/index-9c6597c3.js';
import './common/immutable-935f0f91.js';

var own = {}.hasOwnProperty;
var unistUtilStringifyPosition = stringify;

function stringify(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return '';
  } // Node.


  if (own.call(value, 'position') || own.call(value, 'type')) {
    return position(value.position);
  } // Position.


  if (own.call(value, 'start') || own.call(value, 'end')) {
    return position(value);
  } // Point.


  if (own.call(value, 'line') || own.call(value, 'column')) {
    return point(value);
  } // ?


  return '';
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {};
  }

  return index(point.line) + ':' + index(point.column);
}

function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {};
  }

  return point(pos.start) + '-' + point(pos.end);
}

function index(value) {
  return value && typeof value === 'number' ? value : 1;
}

var vfileMessage = VMessage; // Inherit from `Error#`.

function VMessagePrototype() {}

VMessagePrototype.prototype = Error.prototype;
VMessage.prototype = new VMessagePrototype(); // Message properties.

var proto = VMessage.prototype;
proto.file = '';
proto.name = '';
proto.reason = '';
proto.message = '';
proto.stack = '';
proto.fatal = null;
proto.column = null;
proto.line = null; // Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.

function VMessage(reason, position, origin) {
  var parts;
  var range;
  var location;

  if (typeof position === 'string') {
    origin = position;
    position = null;
  }

  parts = parseOrigin(origin);
  range = unistUtilStringifyPosition(position) || '1:1';
  location = {
    start: {
      line: null,
      column: null
    },
    end: {
      line: null,
      column: null
    }
  }; // Node.

  if (position && position.position) {
    position = position.position;
  }

  if (position) {
    // Position.
    if (position.start) {
      location = position;
      position = position.start;
    } else {
      // Point.
      location.start = position;
    }
  }

  if (reason.stack) {
    this.stack = reason.stack;
    reason = reason.message;
  }

  this.message = reason;
  this.name = range;
  this.reason = reason;
  this.line = position ? position.line : null;
  this.column = position ? position.column : null;
  this.location = location;
  this.source = parts[0];
  this.ruleId = parts[1];
}

function parseOrigin(origin) {
  var result = [null, null];
  var index;

  if (typeof origin === 'string') {
    index = origin.indexOf(':');

    if (index === -1) {
      result[1] = origin;
    } else {
      result[0] = origin.slice(0, index);
      result[1] = origin.slice(index + 1);
    }
  }

  return result;
}

// <https://github.com/browserify/path-browserify>.
// Which is licensed:
//
// MIT License
//
// Copyright (c) 2013 James Halliday
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// A derivative work based on:
//
// Parts of that are extracted from Node’s internal `path` module:
// <https://github.com/nodejs/node/blob/master/lib/path.js>.
// Which is licensed:
//
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var basename_1 = basename;
var dirname_1 = dirname;
var extname_1 = extname;
var join_1 = join;
var sep = '/';

function basename(path, ext) {
  var start = 0;
  var end = -1;
  var index;
  var firstNonSlashEnd;
  var seenNonSlash;
  var extIndex;

  if (ext !== undefined && typeof ext !== 'string') {
    throw new TypeError('"ext" argument must be a string');
  }

  assertPath(path);
  index = path.length;

  if (ext === undefined || !ext.length || ext.length > path.length) {
    while (index--) {
      if (path.charCodeAt(index) === 47
      /* `/` */
      ) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now.
          if (seenNonSlash) {
            start = index + 1;
            break;
          }
        } else if (end < 0) {
        // We saw the first non-path separator, mark this as the end of our
        // path component.
        seenNonSlash = true;
        end = index + 1;
      }
    }

    return end < 0 ? '' : path.slice(start, end);
  }

  if (ext === path) {
    return '';
  }

  firstNonSlashEnd = -1;
  extIndex = ext.length - 1;

  while (index--) {
    if (path.charCodeAt(index) === 47
    /* `/` */
    ) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now.
        if (seenNonSlash) {
          start = index + 1;
          break;
        }
      } else {
      if (firstNonSlashEnd < 0) {
        // We saw the first non-path separator, remember this index in case
        // we need it if the extension ends up not matching.
        seenNonSlash = true;
        firstNonSlashEnd = index + 1;
      }

      if (extIndex > -1) {
        // Try to match the explicit extension.
        if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            // We matched the extension, so mark this as the end of our path
            // component
            end = index;
          }
        } else {
          // Extension does not match, so our result is the entire path
          // component
          extIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }

  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path.length;
  }

  return path.slice(start, end);
}

function dirname(path) {
  var end;
  var unmatchedSlash;
  var index;
  assertPath(path);

  if (!path.length) {
    return '.';
  }

  end = -1;
  index = path.length; // Prefix `--` is important to not run on `0`.

  while (--index) {
    if (path.charCodeAt(index) === 47
    /* `/` */
    ) {
        if (unmatchedSlash) {
          end = index;
          break;
        }
      } else if (!unmatchedSlash) {
      // We saw the first non-path separator
      unmatchedSlash = true;
    }
  }

  return end < 0 ? path.charCodeAt(0) === 47
  /* `/` */
  ? '/' : '.' : end === 1 && path.charCodeAt(0) === 47
  /* `/` */
  ? '//' : path.slice(0, end);
}

function extname(path) {
  var startDot = -1;
  var startPart = 0;
  var end = -1; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find.

  var preDotState = 0;
  var unmatchedSlash;
  var code;
  var index;
  assertPath(path);
  index = path.length;

  while (index--) {
    code = path.charCodeAt(index);

    if (code === 47
    /* `/` */
    ) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now.
        if (unmatchedSlash) {
          startPart = index + 1;
          break;
        }

        continue;
      }

    if (end < 0) {
      // We saw the first non-path separator, mark this as the end of our
      // extension.
      unmatchedSlash = true;
      end = index + 1;
    }

    if (code === 46
    /* `.` */
    ) {
        // If this is our first dot, mark it as the start of our extension.
        if (startDot < 0) {
          startDot = index;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension.
      preDotState = -1;
    }
  }

  if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
  preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }

  return path.slice(startDot, end);
}

function join() {
  var index = -1;
  var joined;

  while (++index < arguments.length) {
    assertPath(arguments[index]);

    if (arguments[index]) {
      joined = joined === undefined ? arguments[index] : joined + '/' + arguments[index];
    }
  }

  return joined === undefined ? '.' : normalize(joined);
} // Note: `normalize` is not exposed as `path.normalize`, so some code is
// manually removed from it.


function normalize(path) {
  var absolute;
  var value;
  assertPath(path);
  absolute = path.charCodeAt(0) === 47;
  /* `/` */
  // Normalize the path according to POSIX rules.

  value = normalizeString(path, !absolute);

  if (!value.length && !absolute) {
    value = '.';
  }

  if (value.length && path.charCodeAt(path.length - 1) === 47
  /* / */
  ) {
      value += '/';
    }

  return absolute ? '/' + value : value;
} // Resolve `.` and `..` elements in a path with directory names.


function normalizeString(path, allowAboveRoot) {
  var result = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var index = -1;
  var code;
  var lastSlashIndex;

  while (++index <= path.length) {
    if (index < path.length) {
      code = path.charCodeAt(index);
    } else if (code === 47
    /* `/` */
    ) {
        break;
      } else {
      code = 47;
      /* `/` */
    }

    if (code === 47
    /* `/` */
    ) {
        if (lastSlash === index - 1 || dots === 1) ; else if (lastSlash !== index - 1 && dots === 2) {
          if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46
          /* `.` */
          || result.charCodeAt(result.length - 2) !== 46
          /* `.` */
          ) {
              if (result.length > 2) {
                lastSlashIndex = result.lastIndexOf('/');
                /* istanbul ignore else - No clue how to cover it. */

                if (lastSlashIndex !== result.length - 1) {
                  if (lastSlashIndex < 0) {
                    result = '';
                    lastSegmentLength = 0;
                  } else {
                    result = result.slice(0, lastSlashIndex);
                    lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
                  }

                  lastSlash = index;
                  dots = 0;
                  continue;
                }
              } else if (result.length) {
                result = '';
                lastSegmentLength = 0;
                lastSlash = index;
                dots = 0;
                continue;
              }
            }

          if (allowAboveRoot) {
            result = result.length ? result + '/..' : '..';
            lastSegmentLength = 2;
          }
        } else {
          if (result.length) {
            result += '/' + path.slice(lastSlash + 1, index);
          } else {
            result = path.slice(lastSlash + 1, index);
          }

          lastSegmentLength = index - lastSlash - 1;
        }

        lastSlash = index;
        dots = 0;
      } else if (code === 46
    /* `.` */
    && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }

  return result;
}

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

var minpath_browser = {
	basename: basename_1,
	dirname: dirname_1,
	extname: extname_1,
	join: join_1,
	sep: sep
};

// <https://github.com/defunctzombie/node-process/blob/master/browser.js>.
// But I don’t think one tiny line of code can be copyrighted. 😅

var cwd_1 = cwd;

function cwd() {
  return '/';
}

var minproc_browser = {
	cwd: cwd_1
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

var core = VFile;
var own$1 = {}.hasOwnProperty; // Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.

var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
VFile.prototype.toString = toString; // Access full path (`~/index.min.js`).

Object.defineProperty(VFile.prototype, 'path', {
  get: getPath,
  set: setPath
}); // Access parent path (`~`).

Object.defineProperty(VFile.prototype, 'dirname', {
  get: getDirname,
  set: setDirname
}); // Access basename (`index.min.js`).

Object.defineProperty(VFile.prototype, 'basename', {
  get: getBasename,
  set: setBasename
}); // Access extname (`.js`).

Object.defineProperty(VFile.prototype, 'extname', {
  get: getExtname,
  set: setExtname
}); // Access stem (`index.min`).

Object.defineProperty(VFile.prototype, 'stem', {
  get: getStem,
  set: setStem
}); // Construct a new file.

function VFile(options) {
  var prop;
  var index;

  if (!options) {
    options = {};
  } else if (typeof options === 'string' || isBuffer(options)) {
    options = {
      contents: options
    };
  } else if ('message' in options && 'messages' in options) {
    return options;
  }

  if (!(this instanceof VFile)) {
    return new VFile(options);
  }

  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = minproc_browser.cwd(); // Set path related properties in the correct order.

  index = -1;

  while (++index < order.length) {
    prop = order[index];

    if (own$1.call(options, prop)) {
      this[prop] = options[prop];
    }
  } // Set non-path related properties.


  for (prop in options) {
    if (order.indexOf(prop) < 0) {
      this[prop] = options[prop];
    }
  }
}

function getPath() {
  return this.history[this.history.length - 1];
}

function setPath(path) {
  assertNonEmpty(path, 'path');

  if (this.path !== path) {
    this.history.push(path);
  }
}

function getDirname() {
  return typeof this.path === 'string' ? minpath_browser.dirname(this.path) : undefined;
}

function setDirname(dirname) {
  assertPath$1(this.path, 'dirname');
  this.path = minpath_browser.join(dirname || '', this.basename);
}

function getBasename() {
  return typeof this.path === 'string' ? minpath_browser.basename(this.path) : undefined;
}

function setBasename(basename) {
  assertNonEmpty(basename, 'basename');
  assertPart(basename, 'basename');
  this.path = minpath_browser.join(this.dirname || '', basename);
}

function getExtname() {
  return typeof this.path === 'string' ? minpath_browser.extname(this.path) : undefined;
}

function setExtname(extname) {
  assertPart(extname, 'extname');
  assertPath$1(this.path, 'extname');

  if (extname) {
    if (extname.charCodeAt(0) !== 46
    /* `.` */
    ) {
        throw new Error('`extname` must start with `.`');
      }

    if (extname.indexOf('.', 1) > -1) {
      throw new Error('`extname` cannot contain multiple dots');
    }
  }

  this.path = minpath_browser.join(this.dirname, this.stem + (extname || ''));
}

function getStem() {
  return typeof this.path === 'string' ? minpath_browser.basename(this.path, this.extname) : undefined;
}

function setStem(stem) {
  assertNonEmpty(stem, 'stem');
  assertPart(stem, 'stem');
  this.path = minpath_browser.join(this.dirname || '', stem + (this.extname || ''));
} // Get the value of the file.


function toString(encoding) {
  return (this.contents || '').toString(encoding);
} // Assert that `part` is not a path (i.e., does not contain `p.sep`).


function assertPart(part, name) {
  if (part && part.indexOf(minpath_browser.sep) > -1) {
    throw new Error('`' + name + '` cannot be a path: did not expect `' + minpath_browser.sep + '`');
  }
} // Assert that `part` is not empty.


function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty');
  }
} // Assert `path` exists.


function assertPath$1(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too');
  }
}

var lib = core;
core.prototype.message = message;
core.prototype.info = info;
core.prototype.fail = fail; // Create a message with `reason` at `position`.
// When an error is passed in as `reason`, copies the stack.

function message(reason, position, origin) {
  var message = new vfileMessage(reason, position, origin);

  if (this.path) {
    message.name = this.path + ':' + message.name;
    message.file = this.path;
  }

  message.fatal = false;
  this.messages.push(message);
  return message;
} // Fail: creates a vmessage, associates it with the file, and throws it.


function fail() {
  var message = this.message.apply(this, arguments);
  message.fatal = true;
  throw message;
} // Info: creates a vmessage, associates it with the file, and marks the fatality
// as null.


function info() {
  var message = this.message.apply(this, arguments);
  message.fatal = null;
  return message;
}

var vfile = lib;

var bail_1 = bail;

function bail(err) {
  if (err) {
    throw err;
  }
}

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'); // Not own constructor property must be Object

  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  } // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.


  var key;

  for (key in obj) {
    /**/
  }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}; // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target


var setProperty = function setProperty(target, options) {
  if (defineProperty && options.name === '__proto__') {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
}; // Return undefined instead of __proto__ if '__proto__' is not an own property


var getProperty = function getProperty(obj, name) {
  if (name === '__proto__') {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      // In early versions of node, obj['__proto__'] is buggy when obj has
      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
      return gOPD(obj, name).value;
    }
  }

  return obj[name];
};

var extend = function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false; // Handle a deep copy situation

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {}; // skip the boolean and the target

    i = 2;
  }

  if (target == null || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i]; // Only deal with non-null/undefined values

    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name); // Prevent never-ending loop

        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            } // Never move original objects, clone them


            setProperty(target, {
              name: name,
              newValue: extend(deep, clone, copy)
            }); // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            setProperty(target, {
              name: name,
              newValue: copy
            });
          }
        }
      }
    }
  } // Return the modified object


  return target;
};

var isPlainObj = value => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

var slice = [].slice;
var wrap_1 = wrap; // Wrap `fn`.
// Can be sync or async; return a promise, receive a completion handler, return
// new values and errors.

function wrap(fn, callback) {
  var invoked;
  return wrapped;

  function wrapped() {
    var params = slice.call(arguments, 0);
    var callback = fn.length > params.length;
    var result;

    if (callback) {
      params.push(done);
    }

    try {
      result = fn.apply(null, params);
    } catch (error) {
      // Well, this is quite the pickle.
      // `fn` received a callback and invoked it (thus continuing the pipeline),
      // but later also threw an error.
      // We’re not about to restart the pipeline again, so the only thing left
      // to do is to throw the thing instead.
      if (callback && invoked) {
        throw error;
      }

      return done(error);
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  } // Invoke `next`, only once.


  function done() {
    if (!invoked) {
      invoked = true;
      callback.apply(null, arguments);
    }
  } // Invoke `done` with one value.
  // Tracks if an error is passed, too.


  function then(value) {
    done(null, value);
  }
}

var trough_1 = trough;
trough.wrap = wrap_1;
var slice$1 = [].slice; // Create new middleware.

function trough() {
  var fns = [];
  var middleware = {};
  middleware.run = run;
  middleware.use = use;
  return middleware; // Run `fns`.  Last argument must be a completion handler.

  function run() {
    var index = -1;
    var input = slice$1.call(arguments, 0, -1);
    var done = arguments[arguments.length - 1];

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done);
    }

    next.apply(null, [null].concat(input)); // Run the next `fn`, if any.

    function next(err) {
      var fn = fns[++index];
      var params = slice$1.call(arguments, 0);
      var values = params.slice(1);
      var length = input.length;
      var pos = -1;

      if (err) {
        done(err);
        return;
      } // Copy non-nully input into values.


      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos];
        }
      }

      input = values; // Next or done.

      if (fn) {
        wrap_1(fn, next).apply(null, input);
      } else {
        done.apply(null, [null].concat(input));
      }
    }
  } // Add `fn` to the list.


  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn);
    }

    fns.push(fn);
    return middleware;
  }
}

// Expose a frozen processor.


var unified_1 = unified().freeze();
var slice$2 = [].slice;
var own$2 = {}.hasOwnProperty; // Process pipeline.

var pipeline = trough_1().use(pipelineParse).use(pipelineRun).use(pipelineStringify);

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file);
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done);

  function done(error, tree, file) {
    if (error) {
      next(error);
    } else {
      ctx.tree = tree;
      ctx.file = file;
      next();
    }
  }
}

function pipelineStringify(p, ctx) {
  var result = p.stringify(ctx.tree, ctx.file);

  if (result === undefined || result === null) ; else if (typeof result === 'string' || isBuffer(result)) {
    ctx.file.contents = result;
  } else {
    ctx.file.result = result;
  }
} // Function to create the first processor.


function unified() {
  var attachers = [];
  var transformers = trough_1();
  var namespace = {};
  var freezeIndex = -1;
  var frozen; // Data management.

  processor.data = data; // Lock.

  processor.freeze = freeze; // Plugins.

  processor.attachers = attachers;
  processor.use = use; // API.

  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync; // Expose.

  return processor; // Create a new processor based on the processor in the current scope.

  function processor() {
    var destination = unified();
    var index = -1;

    while (++index < attachers.length) {
      destination.use.apply(null, attachers[index]);
    }

    destination.data(extend(true, {}, namespace));
    return destination;
  } // Freeze: used to signal a processor that has finished configuration.
  //
  // For example, take unified itself: it’s frozen.
  // Plugins should not be added to it.
  // Rather, it should be extended, by invoking it, before modifying it.
  //
  // In essence, always invoke this when exporting a processor.


  function freeze() {
    var values;
    var transformer;

    if (frozen) {
      return processor;
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex];

      if (values[1] === false) {
        continue;
      }

      if (values[1] === true) {
        values[1] = undefined;
      }

      transformer = values[0].apply(processor, values.slice(1));

      if (typeof transformer === 'function') {
        transformers.use(transformer);
      }
    }

    frozen = true;
    freezeIndex = Infinity;
    return processor;
  } // Data management.
  // Getter / setter for processor-specific informtion.


  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen);
        namespace[key] = value;
        return processor;
      } // Get `key`.


      return own$2.call(namespace, key) && namespace[key] || null;
    } // Set space.


    if (key) {
      assertUnfrozen('data', frozen);
      namespace = key;
      return processor;
    } // Get space.


    return namespace;
  } // Plugin management.
  //
  // Pass it:
  // *   an attacher and options,
  // *   a preset,
  // *   a list of presets, attachers, and arguments (list of attachers and
  //     options).


  function use(value) {
    var settings;
    assertUnfrozen('use', frozen);

    if (value === null || value === undefined) ; else if (typeof value === 'function') {
      addPlugin.apply(null, arguments);
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`');
    }

    if (settings) {
      namespace.settings = extend(namespace.settings || {}, settings);
    }

    return processor;

    function addPreset(result) {
      addList(result.plugins);

      if (result.settings) {
        settings = extend(settings || {}, result.settings);
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`');
      }
    }

    function addList(plugins) {
      var index = -1;

      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
        while (++index < plugins.length) {
          add(plugins[index]);
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`');
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin);

      if (entry) {
        if (isPlainObj(entry[1]) && isPlainObj(value)) {
          value = extend(true, entry[1], value);
        }

        entry[1] = value;
      } else {
        attachers.push(slice$2.call(arguments));
      }
    }
  }

  function find(plugin) {
    var index = -1;

    while (++index < attachers.length) {
      if (attachers[index][0] === plugin) {
        return attachers[index];
      }
    }
  } // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor.


  function parse(doc) {
    var file = vfile(doc);
    var Parser;
    freeze();
    Parser = processor.Parser;
    assertParser('parse', Parser);

    if (newable(Parser, 'parse')) {
      return new Parser(String(file), file).parse();
    }

    return Parser(String(file), file); // eslint-disable-line new-cap
  } // Run transforms on a unist node representation of a file (in string or
  // vfile representation), async.


  function run(node, file, cb) {
    assertNode(node);
    freeze();

    if (!cb && typeof file === 'function') {
      cb = file;
      file = null;
    }

    if (!cb) {
      return new Promise(executor);
    }

    executor(null, cb);

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done);

      function done(error, tree, file) {
        tree = tree || node;

        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          cb(null, tree, file);
        }
      }
    }
  } // Run transforms on a unist node representation of a file (in string or
  // vfile representation), sync.


  function runSync(node, file) {
    var result;
    var complete;
    run(node, file, done);
    assertDone('runSync', 'run', complete);
    return result;

    function done(error, tree) {
      complete = true;
      result = tree;
      bail_1(error);
    }
  } // Stringify a unist node representation of a file (in string or vfile
  // representation) into a string using the `Compiler` on the processor.


  function stringify(node, doc) {
    var file = vfile(doc);
    var Compiler;
    freeze();
    Compiler = processor.Compiler;
    assertCompiler('stringify', Compiler);
    assertNode(node);

    if (newable(Compiler, 'compile')) {
      return new Compiler(node, file).compile();
    }

    return Compiler(node, file); // eslint-disable-line new-cap
  } // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor, then run transforms on that node, and
  // compile the resulting node using the `Compiler` on the processor, and
  // store that result on the vfile.


  function process(doc, cb) {
    freeze();
    assertParser('process', processor.Parser);
    assertCompiler('process', processor.Compiler);

    if (!cb) {
      return new Promise(executor);
    }

    executor(null, cb);

    function executor(resolve, reject) {
      var file = vfile(doc);
      pipeline.run(processor, {
        file: file
      }, done);

      function done(error) {
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(file);
        } else {
          cb(null, file);
        }
      }
    }
  } // Process the given document (in string or vfile representation), sync.


  function processSync(doc) {
    var file;
    var complete;
    freeze();
    assertParser('processSync', processor.Parser);
    assertCompiler('processSync', processor.Compiler);
    file = vfile(doc);
    process(file, done);
    assertDone('processSync', 'process', complete);
    return file;

    function done(error) {
      complete = true;
      bail_1(error);
    }
  }
} // Check if `value` is a constructor.


function newable(value, name) {
  return typeof value === 'function' && value.prototype && ( // A function with keys in its prototype is probably a constructor.
  // Classes’ prototype methods are not enumerable, so we check if some value
  // exists in the prototype.
  keys(value.prototype) || name in value.prototype);
} // Check if `value` is an object with keys.


function keys(value) {
  var key;

  for (key in value) {
    return true;
  }

  return false;
} // Assert a parser is available.


function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`');
  }
} // Assert a compiler is available.


function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`');
  }
} // Assert the processor is not frozen.


function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error('Cannot invoke `' + name + '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.');
  }
} // Assert `node` is a unist node.


function assertNode(node) {
  if (!node || typeof node.type !== 'string') {
    throw new Error('Expected node, got `' + node + '`');
  }
} // Assert that `complete` is `true`.


function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error('`' + name + '` finished async. Use `' + asyncName + '` instead');
  }
}

var mdastUtilToString = toString$1; // Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.

function toString$1(node) {
  return node && (node.value || node.alt || node.title || 'children' in node && all(node.children) || 'length' in node && all(node)) || '';
}

function all(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString$1(values[index]);
  }

  return result.join('');
}

var assign = Object.assign;
var assign_1 = assign;

var own$3 = {}.hasOwnProperty;
var hasOwnProperty_1 = own$3;

function normalizeIdentifier(value) {
  return value // Collapse Markdown whitespace.
  .replace(/[\t\n\r ]+/g, ' ') // Trim.
  .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
  // counterpart is uppercased will result in a different uppercase
  // character.
  // Hence, to get that form, we perform both lower- and uppercase.
  // Upper case makes sure keys will not interact with default prototypal
  // methods: no object method is uppercase.
  .toLowerCase().toUpperCase();
}

var normalizeIdentifier_1 = normalizeIdentifier;

var fromCharCode = String.fromCharCode;
var fromCharCode_1 = fromCharCode;

function safeFromInt(value, base) {
  var code = parseInt(value, base);

  if ( // C0 except for HT, LF, FF, CR, space
  code < 9 || code === 11 || code > 13 && code < 32 || // Control character (DEL) of the basic block and C1 controls.
  code > 126 && code < 160 || // Lone high surrogates and low surrogates.
  code > 55295 && code < 57344 || // Noncharacters.
  code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || // Out of range
  code > 1114111) {
    return '\uFFFD';
  }

  return fromCharCode_1(code);
}

var safeFromInt_1 = safeFromInt;

function markdownLineEnding(code) {
  return code < -2;
}

var markdownLineEnding_1 = markdownLineEnding;

function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32;
}

var markdownSpace_1 = markdownSpace;

function spaceFactory(effects, ok, type, max) {
  var limit = max ? max - 1 : Infinity;
  var size = 0;
  return start;

  function start(code) {
    if (markdownSpace_1(code)) {
      effects.enter(type);
      return prefix(code);
    }

    return ok(code);
  }

  function prefix(code) {
    if (markdownSpace_1(code) && size++ < limit) {
      effects.consume(code);
      return prefix;
    }

    effects.exit(type);
    return ok(code);
  }
}

var factorySpace = spaceFactory;

var content = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});





var tokenize = initializeContent;

function initializeContent(effects) {
  var contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  var previous;
  return contentStart;

  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, contentStart, 'linePrefix');
  }

  function paragraphInitial(code) {
    effects.enter('paragraph');
    return lineStart(code);
  }

  function lineStart(code) {
    var token = effects.enter('chunkText', {
      contentType: 'text',
      previous: previous
    });

    if (previous) {
      previous.next = token;
    }

    previous = token;
    return data(code);
  }

  function data(code) {
    if (code === null) {
      effects.exit('chunkText');
      effects.exit('paragraph');
      effects.consume(code);
      return;
    }

    if (markdownLineEnding_1(code)) {
      effects.consume(code);
      effects.exit('chunkText');
      return lineStart;
    } // Data.


    effects.consume(code);
    return data;
  }
}

exports.tokenize = tokenize;
});

var partialBlankLine = {
  tokenize: tokenizePartialBlankLine,
  partial: true
};

function tokenizePartialBlankLine(effects, ok, nok) {
  return factorySpace(effects, afterWhitespace, 'linePrefix');

  function afterWhitespace(code) {
    return code === null || markdownLineEnding_1(code) ? ok(code) : nok(code);
  }
}

var partialBlankLine_1 = partialBlankLine;

var document$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});







var tokenize = initializeDocument;
var containerConstruct = {
  tokenize: tokenizeContainer
};
var lazyFlowConstruct = {
  tokenize: tokenizeLazyFlow
};

function initializeDocument(effects) {
  var self = this;
  var stack = [];
  var continued = 0;
  var inspectConstruct = {
    tokenize: tokenizeInspect,
    partial: true
  };
  var inspectResult;
  var childFlow;
  var childToken;
  return start;

  function start(code) {
    if (continued < stack.length) {
      self.containerState = stack[continued][1];
      return effects.attempt(stack[continued][0].continuation, documentContinue, documentContinued)(code);
    }

    return documentContinued(code);
  }

  function documentContinue(code) {
    continued++;
    return start(code);
  }

  function documentContinued(code) {
    // If we’re in a concrete construct (such as when expecting another line of
    // HTML, or we resulted in lazy content), we can immediately start flow.
    if (inspectResult && inspectResult.flowContinue) {
      return flowStart(code);
    }

    self.interrupt = childFlow && childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
    self.containerState = {};
    return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
  }

  function containerContinue(code) {
    stack.push([self.currentConstruct, self.containerState]);
    self.containerState = undefined;
    return documentContinued(code);
  }

  function flowStart(code) {
    if (code === null) {
      exitContainers(0, true);
      effects.consume(code);
      return;
    }

    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter('chunkFlow', {
      contentType: 'flow',
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code);
  }

  function flowContinue(code) {
    if (code === null) {
      continueFlow(effects.exit('chunkFlow'));
      return flowStart(code);
    }

    if (markdownLineEnding_1(code)) {
      effects.consume(code);
      continueFlow(effects.exit('chunkFlow'));
      return effects.check(inspectConstruct, documentAfterPeek);
    }

    effects.consume(code);
    return flowContinue;
  }

  function documentAfterPeek(code) {
    exitContainers(inspectResult.continued, inspectResult && inspectResult.flowEnd);
    continued = 0;
    return start(code);
  }

  function continueFlow(token) {
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.lazy = inspectResult && inspectResult.lazy;
    childFlow.defineSkip(token.start);
    childFlow.write(self.sliceStream(token));
  }

  function exitContainers(size, end) {
    var index = stack.length; // Close the flow.

    if (childFlow && end) {
      childFlow.write([null]);
      childToken = childFlow = undefined;
    } // Exit open containers.


    while (index-- > size) {
      self.containerState = stack[index][1];
      stack[index][0].exit.call(self, effects);
    }

    stack.length = size;
  }

  function tokenizeInspect(effects, ok) {
    var subcontinued = 0;
    inspectResult = {};
    return inspectStart;

    function inspectStart(code) {
      if (subcontinued < stack.length) {
        self.containerState = stack[subcontinued][1];
        return effects.attempt(stack[subcontinued][0].continuation, inspectContinue, inspectLess)(code);
      } // If we’re continued but in a concrete flow, we can’t have more
      // containers.


      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        inspectResult.flowContinue = true;
        return inspectDone(code);
      }

      self.interrupt = childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
      self.containerState = {};
      return effects.attempt(containerConstruct, inspectFlowEnd, inspectDone)(code);
    }

    function inspectContinue(code) {
      subcontinued++;
      return self.containerState._closeFlow ? inspectFlowEnd(code) : inspectStart(code);
    }

    function inspectLess(code) {
      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
        // Maybe another container?
        self.containerState = {};
        return effects.attempt(containerConstruct, inspectFlowEnd, // Maybe flow, or a blank line?
        effects.attempt(lazyFlowConstruct, inspectFlowEnd, effects.check(partialBlankLine_1, inspectFlowEnd, inspectLazy)))(code);
      } // Otherwise we’re interrupting.


      return inspectFlowEnd(code);
    }

    function inspectLazy(code) {
      // Act as if all containers are continued.
      subcontinued = stack.length;
      inspectResult.lazy = true;
      inspectResult.flowContinue = true;
      return inspectDone(code);
    } // We’re done with flow if we have more containers, or an interruption.


    function inspectFlowEnd(code) {
      inspectResult.flowEnd = true;
      return inspectDone(code);
    }

    function inspectDone(code) {
      inspectResult.continued = subcontinued;
      self.interrupt = self.containerState = undefined;
      return ok(code);
    }
  }
}

function tokenizeContainer(effects, ok, nok) {
  return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), 'linePrefix', this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4);
}

function tokenizeLazyFlow(effects, ok, nok) {
  return factorySpace(effects, effects.lazy(this.parser.constructs.flow, ok, nok), 'linePrefix', this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4);
}

exports.tokenize = tokenize;
});

function sizeChunks(chunks) {
  var index = -1;
  var size = 0;

  while (++index < chunks.length) {
    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
  }

  return size;
}

var sizeChunks_1 = sizeChunks;

function prefixSize(events, type) {
  var tail = events[events.length - 1];
  if (!tail || tail[1].type !== type) return 0;
  return sizeChunks_1(tail[2].sliceStream(tail[1]));
}

var prefixSize_1 = prefixSize;

var splice = [].splice;
var splice_1 = splice;

// causes a stack overflow in V8 when trying to insert 100k items for instance.


function chunkedSplice(list, start, remove, items) {
  var end = list.length;
  var chunkStart = 0;
  var parameters; // Make start between zero and `end` (included).

  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }

  remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

  if (items.length < 10000) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    splice_1.apply(list, parameters);
  } else {
    // Delete `remove` items starting from `start`
    if (remove) splice_1.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 10000);
      parameters.unshift(start, 0);
      splice_1.apply(list, parameters);
      chunkStart += 10000;
      start += 10000;
    }
  }
}

var chunkedSplice_1 = chunkedSplice;

function shallow(object) {
  return assign_1({}, object);
}

var shallow_1 = shallow;

function subtokenize(events) {
  var jumps = {};
  var index = -1;
  var event;
  var lineIndex;
  var otherIndex;
  var otherEvent;
  var parameters;
  var subevents;
  var more;

  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index];
    }

    event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.

    if (index && event[1].type === 'chunkFlow' && events[index - 1][1].type === 'listItemPrefix') {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;

      if (otherIndex < subevents.length && subevents[otherIndex][1].type === 'lineEndingBlank') {
        otherIndex += 2;
      }

      if (otherIndex < subevents.length && subevents[otherIndex][1].type === 'content') {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === 'content') {
            break;
          }

          if (subevents[otherIndex][1].type === 'chunkText') {
            subevents[otherIndex][1].isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    } // Enter.


    if (event[0] === 'enter') {
      if (event[1].contentType) {
        assign_1(jumps, subcontent(events, index));
        index = jumps[index];
        more = true;
      }
    } // Exit.
    else if (event[1]._container || event[1]._movePreviousLineEndings) {
        otherIndex = index;
        lineIndex = undefined;

        while (otherIndex--) {
          otherEvent = events[otherIndex];

          if (otherEvent[1].type === 'lineEnding' || otherEvent[1].type === 'lineEndingBlank') {
            if (otherEvent[0] === 'enter') {
              if (lineIndex) {
                events[lineIndex][1].type = 'lineEndingBlank';
              }

              otherEvent[1].type = 'lineEnding';
              lineIndex = otherIndex;
            }
          } else {
            break;
          }
        }

        if (lineIndex) {
          // Fix position.
          event[1].end = shallow_1(events[lineIndex][1].start); // Switch container exit w/ line endings.

          parameters = events.slice(lineIndex, index);
          parameters.unshift(event);
          chunkedSplice_1(events, lineIndex, index - lineIndex + 1, parameters);
        }
      }
  }

  return !more;
}

function subcontent(events, eventIndex) {
  var token = events[eventIndex][1];
  var context = events[eventIndex][2];
  var startPosition = eventIndex - 1;
  var startPositions = [];
  var tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
  var childEvents = tokenizer.events;
  var jumps = [];
  var gaps = {};
  var stream;
  var previous;
  var index;
  var entered;
  var end;
  var adjust; // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.

  while (token) {
    // Find the position of the event for this token.
    while (events[++startPosition][1] !== token) {// Empty.
    }

    startPositions.push(startPosition);

    if (!token._tokenizer) {
      stream = context.sliceStream(token);

      if (!token.next) {
        stream.push(null);
      }

      if (previous) {
        tokenizer.defineSkip(token.start);
      }

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }

      tokenizer.write(stream);

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
      }
    } // Unravel the next token.


    previous = token;
    token = token.next;
  } // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.


  token = previous;
  index = childEvents.length;

  while (index--) {
    // Make sure we’ve at least seen something (final eol is part of the last
    // token).
    if (childEvents[index][0] === 'enter') {
      entered = true;
    } else if ( // Find a void token that includes a break.
    entered && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
      add(childEvents.slice(index + 1, end)); // Help GC.

      token._tokenizer = token.next = undefined;
      token = token.previous;
      end = index + 1;
    }
  } // Help GC.


  tokenizer.events = token._tokenizer = token.next = undefined; // Do head:

  add(childEvents.slice(0, end));
  index = -1;
  adjust = 0;

  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
    adjust += jumps[index][1] - jumps[index][0] - 1;
  }

  return gaps;

  function add(slice) {
    var start = startPositions.pop();
    jumps.unshift([start, start + slice.length - 1]);
    chunkedSplice_1(events, start, 2, slice);
  }
}

var subtokenize_1 = subtokenize;

// No name because it must not be turned off.


var content$1 = {
  tokenize: tokenizeContent,
  resolve: resolveContent,
  interruptible: true,
  lazy: true
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
}; // Content is transparent: it’s parsed right now. That way, definitions are also
// parsed right now: before text in paragraphs (specifically, media) are parsed.

function resolveContent(events) {
  subtokenize_1(events);
  return events;
}

function tokenizeContent(effects, ok) {
  var previous;
  return start;

  function start(code) {
    effects.enter('content');
    previous = effects.enter('chunkContent', {
      contentType: 'content'
    });
    return data(code);
  }

  function data(code) {
    if (code === null) {
      return contentEnd(code);
    }

    if (markdownLineEnding_1(code)) {
      return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
    } // Data.


    effects.consume(code);
    return data;
  }

  function contentEnd(code) {
    effects.exit('chunkContent');
    effects.exit('content');
    return ok(code);
  }

  function contentContinue(code) {
    effects.consume(code);
    effects.exit('chunkContent');
    previous = previous.next = effects.enter('chunkContent', {
      contentType: 'content',
      previous: previous
    });
    return data;
  }
}

function tokenizeContinuation(effects, ok, nok) {
  var self = this;
  return startLookahead;

  function startLookahead(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, prefixed, 'linePrefix');
  }

  function prefixed(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return nok(code);
    }

    if (self.parser.constructs.disable.null.indexOf('codeIndented') > -1 || prefixSize_1(self.events, 'linePrefix') < 4) {
      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
    }

    return ok(code);
  }
}

var content_1 = content$1;

var flow = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});







var tokenize = initializeFlow;

function initializeFlow(effects) {
  var self = this;
  var initial = effects.attempt( // Try to parse a blank line.
  partialBlankLine_1, atBlankEnding, // Try to parse initial flow (essentially, only code).
  effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content_1, afterConstruct)), 'linePrefix')));
  return initial;

  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }

    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    self.currentConstruct = undefined;
    return initial;
  }

  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    self.currentConstruct = undefined;
    return initial;
  }
}

exports.tokenize = tokenize;
});

var text_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});





var text = initializeFactory('text');
var string = initializeFactory('string');
var resolver = {
  resolveAll: createResolver()
};

function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(field === 'text' ? resolveAllLineSuffixes : undefined)
  };

  function initializeText(effects) {
    var self = this;
    var constructs = this.parser.constructs[field];
    var text = effects.attempt(constructs, start, notText);
    return start;

    function start(code) {
      return atBreak(code) ? text(code) : notText(code);
    }

    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }

      effects.enter('data');
      effects.consume(code);
      return data;
    }

    function data(code) {
      if (atBreak(code)) {
        effects.exit('data');
        return text(code);
      } // Data.


      effects.consume(code);
      return data;
    }

    function atBreak(code) {
      var list = constructs[code];
      var index = -1;

      if (code === null) {
        return true;
      }

      if (list) {
        while (++index < list.length) {
          if (!list[index].previous || list[index].previous.call(self, self.previous)) {
            return true;
          }
        }
      }
    }
  }
}

function createResolver(extraResolver) {
  return resolveAllText;

  function resolveAllText(events, context) {
    var index = -1;
    var enter; // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.

    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === 'data') {
          enter = index;
          index++;
        }
      } else if (!events[index] || events[index][1].type !== 'data') {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          index = enter + 2;
        }

        enter = undefined;
      }
    }

    return extraResolver ? extraResolver(events, context) : events;
  }
} // A rather ugly set of instructions which again looks at chunks in the input
// stream.
// The reason to do this here is that it is *much* faster to parse in reverse.
// And that we can’t hook into `null` to split the line suffix before an EOF.
// To do: figure out if we can make this into a clean utility, or even in core.
// As it will be useful for GFMs literal autolink extension (and maybe even
// tables?)


function resolveAllLineSuffixes(events, context) {
  var eventIndex = -1;
  var chunks;
  var data;
  var chunk;
  var index;
  var bufferIndex;
  var size;
  var tabs;
  var token;

  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === 'lineEnding') && events[eventIndex - 1][1].type === 'data') {
      data = events[eventIndex - 1][1];
      chunks = context.sliceStream(data);
      index = chunks.length;
      bufferIndex = -1;
      size = 0;
      tabs = undefined;

      while (index--) {
        chunk = chunks[index];

        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;

          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }

          if (bufferIndex) break;
          bufferIndex = -1;
        } // Number
        else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1) ;else {
            // Replacement character, exit.
            index++;
            break;
          }
      }

      if (size) {
        token = {
          type: eventIndex === events.length || tabs || size < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index,
            _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
          },
          end: shallow_1(data.end)
        };
        data.end = shallow_1(token.start);

        if (data.start.offset === data.end.offset) {
          assign_1(data, token);
        } else {
          events.splice(eventIndex, 0, ['enter', token, context], ['exit', token, context]);
          eventIndex += 2;
        }
      }

      eventIndex++;
    }
  }

  return events;
}

exports.resolver = resolver;
exports.string = string;
exports.text = text;
});

function miniflat(value) {
  return value === null || value === undefined ? [] : 'length' in value ? value : [value];
}

var miniflat_1 = miniflat;

function combineExtensions(extensions) {
  var all = {};
  var index = -1;

  while (++index < extensions.length) {
    extension(all, extensions[index]);
  }

  return all;
}

function extension(all, extension) {
  var hook;
  var left;
  var right;
  var code;

  for (hook in extension) {
    left = hasOwnProperty_1.call(all, hook) ? all[hook] : all[hook] = {};
    right = extension[hook];

    for (code in right) {
      left[code] = constructs(miniflat_1(right[code]), hasOwnProperty_1.call(left, code) ? left[code] : []);
    }
  }
}

function constructs(list, existing) {
  var index = -1;
  var before = [];

  while (++index < list.length) {
    (list[index].add === 'after' ? existing : before).push(list[index]);
  }

  chunkedSplice_1(existing, 0, 0, before);
  return existing;
}

var combineExtensions_1 = combineExtensions;

function chunkedPush(list, items) {
  if (list.length) {
    chunkedSplice_1(list, list.length, 0, items);
    return list;
  }

  return items;
}

var chunkedPush_1 = chunkedPush;

function resolveAll(constructs, events, context) {
  var called = [];
  var index = -1;
  var resolve;

  while (++index < constructs.length) {
    resolve = constructs[index].resolveAll;

    if (resolve && called.indexOf(resolve) < 0) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }

  return events;
}

var resolveAll_1 = resolveAll;

function serializeChunks(chunks) {
  var index = -1;
  var result = [];
  var chunk;
  var value;
  var atTab;

  while (++index < chunks.length) {
    chunk = chunks[index];

    if (typeof chunk === 'string') {
      value = chunk;
    } else if (chunk === -5) {
      value = '\r';
    } else if (chunk === -4) {
      value = '\n';
    } else if (chunk === -3) {
      value = '\r' + '\n';
    } else if (chunk === -2) {
      value = '\t';
    } else if (chunk === -1) {
      if (atTab) continue;
      value = ' ';
    } else {
      // Currently only replacement character.
      value = fromCharCode_1(chunk);
    }

    atTab = chunk === -2;
    result.push(value);
  }

  return result.join('');
}

var serializeChunks_1 = serializeChunks;

function sliceChunks(chunks, token) {
  var startIndex = token.start._index;
  var startBufferIndex = token.start._bufferIndex;
  var endIndex = token.end._index;
  var endBufferIndex = token.end._bufferIndex;
  var view;

  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);

    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }

    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }

  return view;
}

var sliceChunks_1 = sliceChunks;

// Create a tokenizer.
// Tokenizers deal with one type of data (e.g., containers, flow, text).
// The parser is the object dealing with it all.
// `initialize` works like other constructs, except that only its `tokenize`
// function is used, in which case it doesn’t receive an `ok` or `nok`.
// `from` can be given to set the point before the first character, although
// when further lines are indented, they must be set with `defineSkip`.


function createTokenizer(parser, initialize, from) {
  var point = from ? shallow_1(from) : {
    line: 1,
    column: 1,
    offset: 0
  };
  var columnStart = {};
  var resolveAllConstructs = [];
  var chunks = [];
  var stack = [];
  var effects = {
    consume: consume,
    enter: enter,
    exit: exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    }),
    lazy: constructFactory(onsuccessfulcheck, {
      lazy: true
    })
  }; // State and tools for resolving and serializing.

  var context = {
    previous: null,
    events: [],
    parser: parser,
    sliceStream: sliceStream,
    sliceSerialize: sliceSerialize,
    now: now,
    defineSkip: skip,
    write: write
  }; // The state function.

  var state = initialize.tokenize.call(context, effects); // Track which character we expect to be consumed, to catch bugs.

  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  } // Store where we are in the input stream.


  point._index = 0;
  point._bufferIndex = -1;
  return context;

  function write(slice) {
    chunks = chunkedPush_1(chunks, slice);
    main(); // Exit if we’re not done, resolve might change stuff.

    if (chunks[chunks.length - 1] !== null) {
      return [];
    }

    addResult(initialize, 0); // Otherwise, resolve, and exit.

    context.events = resolveAll_1(resolveAllConstructs, context.events, context);
    return context.events;
  } //
  // Tools.
  //


  function sliceSerialize(token) {
    return serializeChunks_1(sliceStream(token));
  }

  function sliceStream(token) {
    return sliceChunks_1(chunks, token);
  }

  function now() {
    return shallow_1(point);
  }

  function skip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  } //
  // State management.
  //
  // Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
  // `consume`).
  // Here is where we walk through the chunks, which either include strings of
  // several characters, or numerical character codes.
  // The reason to do this in a loop instead of a call is so the stack can
  // drain.


  function main() {
    var chunkIndex;
    var chunk;

    while (point._index < chunks.length) {
      chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

      if (typeof chunk === 'string') {
        chunkIndex = point._index;

        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }

        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  } // Deal with one code.


  function go(code) {
    state = state(code);
  } // Move a character forward.


  function consume(code) {
    if (markdownLineEnding_1(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    } // Not in a string chunk.


    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++; // At end of string chunk.

      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    } // Expose the previous character.


    context.previous = code; // Mark as consumed.
  } // Start a token.


  function enter(type, fields) {
    var token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token;
  } // Stop a token.


  function exit(type) {
    var token = stack.pop();
    token.end = now();
    context.events.push(['exit', token, context]);
    return token;
  } // Use results.


  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  } // Discard results.


  function onsuccessfulcheck(construct, info) {
    info.restore();
  } // Factory to attempt/check/interrupt.


  function constructFactory(onreturn, fields) {
    return hook; // Handle either an object mapping codes to constructs, a list of
    // constructs, or a single construct.

    function hook(constructs, returnState, bogusState) {
      var listOfConstructs;
      var constructIndex;
      var currentConstruct;
      var info;
      return constructs.tokenize || 'length' in constructs ? handleListOfConstructs(miniflat_1(constructs)) : handleMapOfConstructs;

      function handleMapOfConstructs(code) {
        if (code in constructs || null in constructs) {
          return handleListOfConstructs(constructs.null ?
          /* c8 ignore next */
          miniflat_1(constructs[code]).concat(miniflat_1(constructs.null)) : constructs[code])(code);
        }

        return bogusState(code);
      }

      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        return handleConstruct(list[constructIndex]);
      }

      function handleConstruct(construct) {
        return start;

        function start(code) {
          // To do: not nede to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store();
          currentConstruct = construct;

          if (!construct.partial) {
            context.currentConstruct = construct;
          }

          if (construct.name && context.parser.constructs.disable.null.indexOf(construct.name) > -1) {
            return nok();
          }

          return construct.tokenize.call(fields ? assign_1({}, context, fields) : context, effects, ok, nok)(code);
        }
      }

      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }

      function nok(code) {
        info.restore();

        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }

        return bogusState;
      }
    }
  }

  function addResult(construct, from) {
    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
      resolveAllConstructs.push(construct);
    }

    if (construct.resolve) {
      chunkedSplice_1(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }

  function store() {
    var startPoint = now();
    var startPrevious = context.previous;
    var startCurrentConstruct = context.currentConstruct;
    var startEventsIndex = context.events.length;
    var startStack = Array.from(stack);
    return {
      restore: restore,
      from: startEventsIndex
    };

    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }

  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}

var createTokenizer_1 = createTokenizer;

function markdownLineEndingOrSpace(code) {
  return code < 0 || code === 32;
}

var markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace;

//
// CommonMark handles attention (emphasis, strong) markers based on what comes
// before or after them.
// One such difference is if those characters are Unicode punctuation.
// This script is generated from the Unicode data.

var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
var unicodePunctuationRegex = unicodePunctuation;

function regexCheck(regex) {
  return check;

  function check(code) {
    return regex.test(fromCharCode_1(code));
  }
}

var regexCheck_1 = regexCheck;

// In fact adds to the bundle size.


var unicodePunctuation$1 = regexCheck_1(unicodePunctuationRegex);
var unicodePunctuation_1 = unicodePunctuation$1;

var unicodeWhitespace = regexCheck_1(/\s/);
var unicodeWhitespace_1 = unicodeWhitespace;

// Classify whether a character is unicode whitespace, unicode punctuation, or
// anything else.
// Used for attention (emphasis, strong), whose sequences can open or close
// based on the class of surrounding characters.


function classifyCharacter(code) {
  if (code === null || markdownLineEndingOrSpace_1(code) || unicodeWhitespace_1(code)) {
    return 1;
  }

  if (unicodePunctuation_1(code)) {
    return 2;
  }
}

var classifyCharacter_1 = classifyCharacter;

function movePoint(point, offset) {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
  return point;
}

var movePoint_1 = movePoint;

var attention = {
  name: 'attention',
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};

function resolveAllAttention(events, context) {
  var index = -1;
  var open;
  var group;
  var text;
  var openingSequence;
  var closingSequence;
  var use;
  var nextEvents;
  var offset; // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.

  while (++index < events.length) {
    // Find a token that can close.
    if (events[index][0] === 'enter' && events[index][1].type === 'attentionSequence' && events[index][1]._close) {
      open = index; // Now walk back to find an opener.

      while (open--) {
        // Find a token that can open the closer.
        if (events[open][0] === 'exit' && events[open][1].type === 'attentionSequence' && events[open][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
            continue;
          } // Number of markers to use from the sequence.


          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
          openingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: movePoint_1(shallow_1(events[open][1].end), -use),
            end: shallow_1(events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: shallow_1(events[index][1].start),
            end: movePoint_1(shallow_1(events[index][1].start), use)
          };
          text = {
            type: use > 1 ? 'strongText' : 'emphasisText',
            start: shallow_1(events[open][1].end),
            end: shallow_1(events[index][1].start)
          };
          group = {
            type: use > 1 ? 'strong' : 'emphasis',
            start: shallow_1(openingSequence.start),
            end: shallow_1(closingSequence.end)
          };
          events[open][1].end = shallow_1(openingSequence.start);
          events[index][1].start = shallow_1(closingSequence.end);
          nextEvents = []; // If there are more markers in the opening, add them before.

          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = chunkedPush_1(nextEvents, [['enter', events[open][1], context], ['exit', events[open][1], context]]);
          } // Opening.


          nextEvents = chunkedPush_1(nextEvents, [['enter', group, context], ['enter', openingSequence, context], ['exit', openingSequence, context], ['enter', text, context]]); // Between.

          nextEvents = chunkedPush_1(nextEvents, resolveAll_1(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context)); // Closing.

          nextEvents = chunkedPush_1(nextEvents, [['exit', text, context], ['enter', closingSequence, context], ['exit', closingSequence, context], ['exit', group, context]]); // If there are more markers in the closing, add them after.

          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2;
            nextEvents = chunkedPush_1(nextEvents, [['enter', events[index][1], context], ['exit', events[index][1], context]]);
          } else {
            offset = 0;
          }

          chunkedSplice_1(events, open - 1, index - open + 3, nextEvents);
          index = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  } // Remove remaining sequences.


  index = -1;

  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data';
    }
  }

  return events;
}

function tokenizeAttention(effects, ok) {
  var before = classifyCharacter_1(this.previous);
  var marker;
  return start;

  function start(code) {
    effects.enter('attentionSequence');
    marker = code;
    return sequence(code);
  }

  function sequence(code) {
    var token;
    var after;
    var open;
    var close;

    if (code === marker) {
      effects.consume(code);
      return sequence;
    }

    token = effects.exit('attentionSequence');
    after = classifyCharacter_1(code);
    open = !after || after === 2 && before;
    close = !before || before === 2 && after;
    token._open = marker === 42 ? open : open && (before || !close);
    token._close = marker === 42 ? close : close && (after || !open);
    return ok(code);
  }
}

var attention_1 = attention;

var asciiAlpha = regexCheck_1(/[A-Za-z]/);
var asciiAlpha_1 = asciiAlpha;

var asciiAlphanumeric = regexCheck_1(/[\dA-Za-z]/);
var asciiAlphanumeric_1 = asciiAlphanumeric;

var asciiAtext = regexCheck_1(/[#-'*+\--9=?A-Z^-~]/);
var asciiAtext_1 = asciiAtext;

function asciiControl(code) {
  return (// Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code < 32 || code === 127
  );
}

var asciiControl_1 = asciiControl;

var autolink = {
  name: 'autolink',
  tokenize: tokenizeAutolink
};

function tokenizeAutolink(effects, ok, nok) {
  var size = 1;
  return start;

  function start(code) {
    effects.enter('autolink');
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.enter('autolinkProtocol');
    return open;
  }

  function open(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return schemeOrEmailAtext;
    }

    return asciiAtext_1(code) ? emailAtext(code) : nok(code);
  }

  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric_1(code) ? schemeInsideOrEmailAtext(code) : emailAtext(code);
  }

  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      return urlInside;
    }

    if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric_1(code)) && size++ < 32) {
      effects.consume(code);
      return schemeInsideOrEmailAtext;
    }

    return emailAtext(code);
  }

  function urlInside(code) {
    if (code === 62) {
      effects.exit('autolinkProtocol');
      return end(code);
    }

    if (code === 32 || code === 60 || asciiControl_1(code)) {
      return nok(code);
    }

    effects.consume(code);
    return urlInside;
  }

  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot;
    }

    if (asciiAtext_1(code)) {
      effects.consume(code);
      return emailAtext;
    }

    return nok(code);
  }

  function emailAtSignOrDot(code) {
    return asciiAlphanumeric_1(code) ? emailLabel(code) : nok(code);
  }

  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot;
    }

    if (code === 62) {
      // Exit, then change the type.
      effects.exit('autolinkProtocol').type = 'autolinkEmail';
      return end(code);
    }

    return emailValue(code);
  }

  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric_1(code)) && size++ < 63) {
      effects.consume(code);
      return code === 45 ? emailValue : emailLabel;
    }

    return nok(code);
  }

  function end(code) {
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.exit('autolink');
    return ok;
  }
}

var autolink_1 = autolink;

var blockQuote = {
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit: exit
};

function tokenizeBlockQuoteStart(effects, ok, nok) {
  var self = this;
  return start;

  function start(code) {
    if (code === 62) {
      if (!self.containerState.open) {
        effects.enter('blockQuote', {
          _container: true
        });
        self.containerState.open = true;
      }

      effects.enter('blockQuotePrefix');
      effects.enter('blockQuoteMarker');
      effects.consume(code);
      effects.exit('blockQuoteMarker');
      return after;
    }

    return nok(code);
  }

  function after(code) {
    if (markdownSpace_1(code)) {
      effects.enter('blockQuotePrefixWhitespace');
      effects.consume(code);
      effects.exit('blockQuotePrefixWhitespace');
      effects.exit('blockQuotePrefix');
      return ok;
    }

    effects.exit('blockQuotePrefix');
    return ok(code);
  }
}

function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return factorySpace(effects, effects.attempt(blockQuote, ok, nok), 'linePrefix', this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4);
}

function exit(effects) {
  effects.exit('blockQuote');
}

var blockQuote_1 = blockQuote;

var asciiPunctuation = regexCheck_1(/[!-/:-@[-`{-~]/);
var asciiPunctuation_1 = asciiPunctuation;

var characterEscape = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
};

function tokenizeCharacterEscape(effects, ok, nok) {
  return start;

  function start(code) {
    effects.enter('characterEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    effects.exit('escapeMarker');
    return open;
  }

  function open(code) {
    if (asciiPunctuation_1(code)) {
      effects.enter('characterEscapeValue');
      effects.consume(code);
      effects.exit('characterEscapeValue');
      effects.exit('characterEscape');
      return ok;
    }

    return nok(code);
  }
}

var characterEscape_1 = characterEscape;

/* eslint-env browser */

var el;
var semicolon = 59; //  ';'

var decodeEntity_browser = decodeEntity;

function decodeEntity(characters) {
  var entity = '&' + characters + ';';
  var char;
  el = el || document.createElement('i');
  el.innerHTML = entity;
  char = el.textContent; // Some entities do not require the closing semicolon (`&not` - for instance),
  // which leads to situations where parsing the assumed entity of &notit; will
  // result in the string `¬it;`.  When we encounter a trailing semicolon after
  // parsing and the entity to decode was not a semicolon (`&semi;`), we can
  // assume that the matching was incomplete

  if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
    return false;
  } // If the decoded string is equal to the input, the entity was not valid


  return char === entity ? false : char;
}

var asciiDigit = regexCheck_1(/\d/);
var asciiDigit_1 = asciiDigit;

var asciiHexDigit = regexCheck_1(/[\dA-Fa-f]/);
var asciiHexDigit_1 = asciiHexDigit;

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    default: e
  };
}

var decodeEntity__default = /*#__PURE__*/_interopDefaultLegacy(decodeEntity_browser);

var characterReference = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
};

function tokenizeCharacterReference(effects, ok, nok) {
  var self = this;
  var size = 0;
  var max;
  var test;
  return start;

  function start(code) {
    effects.enter('characterReference');
    effects.enter('characterReferenceMarker');
    effects.consume(code);
    effects.exit('characterReferenceMarker');
    return open;
  }

  function open(code) {
    if (code === 35) {
      effects.enter('characterReferenceMarkerNumeric');
      effects.consume(code);
      effects.exit('characterReferenceMarkerNumeric');
      return numeric;
    }

    effects.enter('characterReferenceValue');
    max = 31;
    test = asciiAlphanumeric_1;
    return value(code);
  }

  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter('characterReferenceMarkerHexadecimal');
      effects.consume(code);
      effects.exit('characterReferenceMarkerHexadecimal');
      effects.enter('characterReferenceValue');
      max = 6;
      test = asciiHexDigit_1;
      return value;
    }

    effects.enter('characterReferenceValue');
    max = 7;
    test = asciiDigit_1;
    return value(code);
  }

  function value(code) {
    var token;

    if (code === 59 && size) {
      token = effects.exit('characterReferenceValue');

      if (test === asciiAlphanumeric_1 && !decodeEntity__default['default'](self.sliceSerialize(token))) {
        return nok(code);
      }

      effects.enter('characterReferenceMarker');
      effects.consume(code);
      effects.exit('characterReferenceMarker');
      effects.exit('characterReference');
      return ok;
    }

    if (test(code) && size++ < max) {
      effects.consume(code);
      return value;
    }

    return nok(code);
  }
}

var characterReference_1 = characterReference;

var codeFenced = {
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced,
  concrete: true
};

function tokenizeCodeFenced(effects, ok, nok) {
  var self = this;
  var closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  var initialPrefix = prefixSize_1(this.events, 'linePrefix');
  var sizeOpen = 0;
  var marker;
  return start;

  function start(code) {
    effects.enter('codeFenced');
    effects.enter('codeFencedFence');
    effects.enter('codeFencedFenceSequence');
    marker = code;
    return sequenceOpen(code);
  }

  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen;
    }

    effects.exit('codeFencedFenceSequence');
    return sizeOpen < 3 ? nok(code) : factorySpace(effects, infoOpen, 'whitespace')(code);
  }

  function infoOpen(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return openAfter(code);
    }

    effects.enter('codeFencedFenceInfo');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return info(code);
  }

  function info(code) {
    if (code === null || markdownLineEndingOrSpace_1(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceInfo');
      return factorySpace(effects, infoAfter, 'whitespace')(code);
    }

    if (code === 96 && code === marker) return nok(code);
    effects.consume(code);
    return info;
  }

  function infoAfter(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return openAfter(code);
    }

    effects.enter('codeFencedFenceMeta');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return meta(code);
  }

  function meta(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceMeta');
      return openAfter(code);
    }

    if (code === 96 && code === marker) return nok(code);
    effects.consume(code);
    return meta;
  }

  function openAfter(code) {
    effects.exit('codeFencedFence');
    return self.interrupt ? ok(code) : content(code);
  }

  function content(code) {
    if (code === null) {
      return after(code);
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace(effects, content, 'linePrefix', initialPrefix + 1) : content);
    }

    effects.enter('codeFlowValue');
    return contentContinue(code);
  }

  function contentContinue(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('codeFlowValue');
      return content(code);
    }

    effects.consume(code);
    return contentContinue;
  }

  function after(code) {
    effects.exit('codeFenced');
    return ok(code);
  }

  function tokenizeClosingFence(effects, ok, nok) {
    var size = 0;
    return factorySpace(effects, closingSequenceStart, 'linePrefix', this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4);

    function closingSequenceStart(code) {
      effects.enter('codeFencedFence');
      effects.enter('codeFencedFenceSequence');
      return closingSequence(code);
    }

    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return closingSequence;
      }

      if (size < sizeOpen) return nok(code);
      effects.exit('codeFencedFenceSequence');
      return factorySpace(effects, closingSequenceEnd, 'whitespace')(code);
    }

    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding_1(code)) {
        effects.exit('codeFencedFence');
        return ok(code);
      }

      return nok(code);
    }
  }
}

var codeFenced_1 = codeFenced;

var codeIndented = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented,
  resolve: resolveCodeIndented
};
var indentedContentConstruct = {
  tokenize: tokenizeIndentedContent,
  partial: true
};

function resolveCodeIndented(events, context) {
  var code = {
    type: 'codeIndented',
    start: events[0][1].start,
    end: events[events.length - 1][1].end
  };
  chunkedSplice_1(events, 0, 0, [['enter', code, context]]);
  chunkedSplice_1(events, events.length, 0, [['exit', code, context]]);
  return events;
}

function tokenizeCodeIndented(effects, ok, nok) {
  return effects.attempt(indentedContentConstruct, afterPrefix, nok);

  function afterPrefix(code) {
    if (code === null) {
      return ok(code);
    }

    if (markdownLineEnding_1(code)) {
      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code);
    }

    effects.enter('codeFlowValue');
    return content(code);
  }

  function content(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('codeFlowValue');
      return afterPrefix(code);
    }

    effects.consume(code);
    return content;
  }
}

function tokenizeIndentedContent(effects, ok, nok) {
  var self = this;
  return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1);

  function afterPrefix(code) {
    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1);
    }

    return prefixSize_1(self.events, 'linePrefix') < 4 ? nok(code) : ok(code);
  }
}

var codeIndented_1 = codeIndented;

var codeText = {
  name: 'codeText',
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous: previous
};

function resolveCodeText(events) {
  var tailExitIndex = events.length - 4;
  var headEnterIndex = 3;
  var index;
  var enter; // If we start and end with an EOL or a space.

  if ((events[headEnterIndex][1].type === 'lineEnding' || events[headEnterIndex][1].type === 'space') && (events[tailExitIndex][1].type === 'lineEnding' || events[tailExitIndex][1].type === 'space')) {
    index = headEnterIndex; // And we have data.

    while (++index < tailExitIndex) {
      if (events[index][1].type === 'codeTextData') {
        // Then we have padding.
        events[tailExitIndex][1].type = events[headEnterIndex][1].type = 'codeTextPadding';
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  } // Merge adjacent spaces and data.


  index = headEnterIndex - 1;
  tailExitIndex++;

  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
        enter = index;
      }
    } else if (index === tailExitIndex || events[index][1].type === 'lineEnding') {
      events[enter][1].type = 'codeTextData';

      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end;
        events.splice(enter + 2, index - enter - 2);
        tailExitIndex -= index - enter - 2;
        index = enter + 2;
      }

      enter = undefined;
    }
  }

  return events;
}

function previous(code) {
  // If there is a previous code, there will always be a tail.
  return code !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape';
}

function tokenizeCodeText(effects, ok, nok) {
  var sizeOpen = 0;
  var size;
  var token;
  return start;

  function start(code) {
    effects.enter('codeText');
    effects.enter('codeTextSequence');
    return openingSequence(code);
  }

  function openingSequence(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return openingSequence;
    }

    effects.exit('codeTextSequence');
    return gap(code);
  }

  function gap(code) {
    // EOF.
    if (code === null) {
      return nok(code);
    } // Closing fence?
    // Could also be data.


    if (code === 96) {
      token = effects.enter('codeTextSequence');
      size = 0;
      return closingSequence(code);
    } // Tabs don’t work, and virtual spaces don’t make sense.


    if (code === 32) {
      effects.enter('space');
      effects.consume(code);
      effects.exit('space');
      return gap;
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return gap;
    } // Data.


    effects.enter('codeTextData');
    return data(code);
  } // In code.


  function data(code) {
    if (code === null || code === 32 || code === 96 || markdownLineEnding_1(code)) {
      effects.exit('codeTextData');
      return gap(code);
    }

    effects.consume(code);
    return data;
  } // Closing fence.


  function closingSequence(code) {
    // More.
    if (code === 96) {
      effects.consume(code);
      size++;
      return closingSequence;
    } // Done!


    if (size === sizeOpen) {
      effects.exit('codeTextSequence');
      effects.exit('codeText');
      return ok(code);
    } // More or less accents: mark as data.


    token.type = 'codeTextData';
    return data(code);
  }
}

var codeText_1 = codeText;

// eslint-disable-next-line max-params


function destinationFactory(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  var limit = max || Infinity;
  var balance = 0;
  return start;

  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore;
    }

    if (asciiControl_1(code) || code === 41) {
      return nok(code);
    }

    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationRaw(code);
  }

  function destinationEnclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok;
    }

    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationEnclosed(code);
  }

  function destinationEnclosed(code) {
    if (code === 62) {
      effects.exit('chunkString');
      effects.exit(stringType);
      return destinationEnclosedBefore(code);
    }

    if (code === null || code === 60 || markdownLineEnding_1(code)) {
      return nok(code);
    }

    effects.consume(code);
    return code === 92 ? destinationEnclosedEscape : destinationEnclosed;
  }

  function destinationEnclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return destinationEnclosed;
    }

    return destinationEnclosed(code);
  }

  function destinationRaw(code) {
    if (code === 40) {
      if (++balance > limit) return nok(code);
      effects.consume(code);
      return destinationRaw;
    }

    if (code === 41) {
      if (!balance--) {
        effects.exit('chunkString');
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code);
      }

      effects.consume(code);
      return destinationRaw;
    }

    if (code === null || markdownLineEndingOrSpace_1(code)) {
      if (balance) return nok(code);
      effects.exit('chunkString');
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code);
    }

    if (asciiControl_1(code)) return nok(code);
    effects.consume(code);
    return code === 92 ? destinationRawEscape : destinationRaw;
  }

  function destinationRawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return destinationRaw;
    }

    return destinationRaw(code);
  }
}

var factoryDestination = destinationFactory;

// eslint-disable-next-line max-params


function labelFactory(effects, ok, nok, type, markerType, stringType) {
  var self = this;
  var size = 0;
  var data;
  return start;

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }

  function atBreak(code) {
    if (code === null || code === 91 || code === 93 && !data ||
    /* c8 ignore next */
    code === 94 &&
    /* c8 ignore next */
    !size &&
    /* c8 ignore next */
    '_hiddenFootnoteSupport' in self.parser.constructs || size > 999) {
      return nok(code);
    }

    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return atBreak;
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return label(code);
  }

  function label(code) {
    if (code === null || code === 91 || code === 93 || markdownLineEnding_1(code) || size++ > 999) {
      effects.exit('chunkString');
      return atBreak(code);
    }

    effects.consume(code);
    data = data || !markdownSpace_1(code);
    return code === 92 ? labelEscape : label;
  }

  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return label;
    }

    return label(code);
  }
}

var factoryLabel = labelFactory;

function whitespaceFactory(effects, ok) {
  var seen;
  return start;

  function start(code) {
    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      seen = true;
      return start;
    }

    if (markdownSpace_1(code)) {
      return factorySpace(effects, start, seen ? 'linePrefix' : 'lineSuffix')(code);
    }

    return ok(code);
  }
}

var factoryWhitespace = whitespaceFactory;

function titleFactory(effects, ok, nok, type, markerType, stringType) {
  var marker;
  return start;

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    marker = code === 40 ? 41 : code;
    return atFirstTitleBreak;
  }

  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }

    effects.enter(stringType);
    return atTitleBreak(code);
  }

  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker);
    }

    if (code === null) {
      return nok(code);
    } // Note: blank lines can’t exist in content.


    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace(effects, atTitleBreak, 'linePrefix');
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return title(code);
  }

  function title(code) {
    if (code === marker || code === null || markdownLineEnding_1(code)) {
      effects.exit('chunkString');
      return atTitleBreak(code);
    }

    effects.consume(code);
    return code === 92 ? titleEscape : title;
  }

  function titleEscape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return title;
    }

    return title(code);
  }
}

var factoryTitle = titleFactory;

var definition = {
  name: 'definition',
  tokenize: tokenizeDefinition
};
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};

function tokenizeDefinition(effects, ok, nok) {
  var self = this;
  var identifier;
  return start;

  function start(code) {
    effects.enter('definition');
    return factoryLabel.call(self, effects, labelAfter, nok, 'definitionLabel', 'definitionLabelMarker', 'definitionLabelString')(code);
  }

  function labelAfter(code) {
    identifier = normalizeIdentifier_1(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));

    if (code === 58) {
      effects.enter('definitionMarker');
      effects.consume(code);
      effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

      return factoryWhitespace(effects, factoryDestination(effects, effects.attempt(titleConstruct, factorySpace(effects, after, 'whitespace'), factorySpace(effects, after, 'whitespace')), nok, 'definitionDestination', 'definitionDestinationLiteral', 'definitionDestinationLiteralMarker', 'definitionDestinationRaw', 'definitionDestinationString'));
    }

    return nok(code);
  }

  function after(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('definition');

      if (self.parser.defined.indexOf(identifier) < 0) {
        self.parser.defined.push(identifier);
      }

      return ok(code);
    }

    return nok(code);
  }
}

function tokenizeTitle(effects, ok, nok) {
  return start;

  function start(code) {
    return markdownLineEndingOrSpace_1(code) ? factoryWhitespace(effects, before)(code) : nok(code);
  }

  function before(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(effects, factorySpace(effects, after, 'whitespace'), nok, 'definitionTitle', 'definitionTitleMarker', 'definitionTitleString')(code);
    }

    return nok(code);
  }

  function after(code) {
    return code === null || markdownLineEnding_1(code) ? ok(code) : nok(code);
  }
}

var definition_1 = definition;

var hardBreakEscape = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
};

function tokenizeHardBreakEscape(effects, ok, nok) {
  return start;

  function start(code) {
    effects.enter('hardBreakEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    return open;
  }

  function open(code) {
    if (markdownLineEnding_1(code)) {
      effects.exit('escapeMarker');
      effects.exit('hardBreakEscape');
      return ok(code);
    }

    return nok(code);
  }
}

var hardBreakEscape_1 = hardBreakEscape;

var headingAtx = {
  name: 'headingAtx',
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};

function resolveHeadingAtx(events, context) {
  var contentEnd = events.length - 2;
  var contentStart = 3;
  var content;
  var text; // Prefix whitespace, part of the opening.

  if (events[contentStart][1].type === 'whitespace') {
    contentStart += 2;
  } // Suffix whitespace, part of the closing.


  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === 'whitespace') {
    contentEnd -= 2;
  }

  if (events[contentEnd][1].type === 'atxHeadingSequence' && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === 'whitespace')) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }

  if (contentEnd > contentStart) {
    content = {
      type: 'atxHeadingText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text = {
      type: 'chunkText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: 'text'
    };
    chunkedSplice_1(events, contentStart, contentEnd - contentStart + 1, [['enter', content, context], ['enter', text, context], ['exit', text, context], ['exit', content, context]]);
  }

  return events;
}

function tokenizeHeadingAtx(effects, ok, nok) {
  var self = this;
  var size = 0;
  return start;

  function start(code) {
    effects.enter('atxHeading');
    effects.enter('atxHeadingSequence');
    return fenceOpenInside(code);
  }

  function fenceOpenInside(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return fenceOpenInside;
    }

    if (code === null || markdownLineEndingOrSpace_1(code)) {
      effects.exit('atxHeadingSequence');
      return self.interrupt ? ok(code) : headingBreak(code);
    }

    return nok(code);
  }

  function headingBreak(code) {
    if (code === 35) {
      effects.enter('atxHeadingSequence');
      return sequence(code);
    }

    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('atxHeading');
      return ok(code);
    }

    if (markdownSpace_1(code)) {
      return factorySpace(effects, headingBreak, 'whitespace')(code);
    }

    effects.enter('atxHeadingText');
    return data(code);
  }

  function sequence(code) {
    if (code === 35) {
      effects.consume(code);
      return sequence;
    }

    effects.exit('atxHeadingSequence');
    return headingBreak(code);
  }

  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace_1(code)) {
      effects.exit('atxHeadingText');
      return headingBreak(code);
    }

    effects.consume(code);
    return data;
  }
}

var headingAtx_1 = headingAtx;

var basics = ['address', 'article', 'aside', 'base', 'basefont', 'blockquote', 'body', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dialog', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'iframe', 'legend', 'li', 'link', 'main', 'menu', 'menuitem', 'nav', 'noframes', 'ol', 'optgroup', 'option', 'p', 'param', 'section', 'source', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul'];
var htmlBlockNames = basics;

var raws = ['pre', 'script', 'style', 'textarea'];
var htmlRawNames = raws;

var htmlFlow = {
  name: 'htmlFlow',
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};

function resolveToHtmlFlow(events) {
  var index = events.length;

  while (index--) {
    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
      break;
    }
  }

  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

    events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

    events.splice(index - 2, 2);
  }

  return events;
}

function tokenizeHtmlFlow(effects, ok, nok) {
  var self = this;
  var kind;
  var startTag;
  var buffer;
  var index;
  var marker;
  return start;

  function start(code) {
    effects.enter('htmlFlow');
    effects.enter('htmlFlowData');
    effects.consume(code);
    return open;
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationStart;
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart;
    }

    if (code === 63) {
      effects.consume(code);
      kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.

      return self.interrupt ? ok : continuationDeclarationInside;
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      buffer = fromCharCode_1(code);
      startTag = true;
      return tagName;
    }

    return nok(code);
  }

  function declarationStart(code) {
    if (code === 45) {
      effects.consume(code);
      kind = 2;
      return commentOpenInside;
    }

    if (code === 91) {
      effects.consume(code);
      kind = 5;
      buffer = 'CDATA[';
      index = 0;
      return cdataOpenInside;
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      kind = 4;
      return self.interrupt ? ok : continuationDeclarationInside;
    }

    return nok(code);
  }

  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok : continuationDeclarationInside;
    }

    return nok(code);
  }

  function cdataOpenInside(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length ? self.interrupt ? ok : continuation : cdataOpenInside;
    }

    return nok(code);
  }

  function tagCloseStart(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      buffer = fromCharCode_1(code);
      return tagName;
    }

    return nok(code);
  }

  function tagName(code) {
    if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace_1(code)) {
      if (code !== 47 && startTag && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
        kind = 1;
        return self.interrupt ? ok(code) : continuation(code);
      }

      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
        kind = 6;

        if (code === 47) {
          effects.consume(code);
          return basicSelfClosing;
        }

        return self.interrupt ? ok(code) : continuation(code);
      }

      kind = 7; // Do not support complete HTML when interrupting.

      return self.interrupt ? nok(code) : startTag ? completeAttributeNameBefore(code) : completeClosingTagAfter(code);
    }

    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      buffer += fromCharCode_1(code);
      return tagName;
    }

    return nok(code);
  }

  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok : continuation;
    }

    return nok(code);
  }

  function completeClosingTagAfter(code) {
    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeClosingTagAfter;
    }

    return completeEnd(code);
  }

  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd;
    }

    if (code === 58 || code === 95 || asciiAlpha_1(code)) {
      effects.consume(code);
      return completeAttributeName;
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeNameBefore;
    }

    return completeEnd(code);
  }

  function completeAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return completeAttributeName;
    }

    return completeAttributeNameAfter(code);
  }

  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeNameAfter;
    }

    return completeAttributeNameBefore(code);
  }

  function completeAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return completeAttributeValueQuoted;
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }

    marker = undefined;
    return completeAttributeValueUnquoted(code);
  }

  function completeAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return completeAttributeValueQuotedAfter;
    }

    if (code === null || markdownLineEnding_1(code)) {
      return nok(code);
    }

    effects.consume(code);
    return completeAttributeValueQuoted;
  }

  function completeAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace_1(code)) {
      return completeAttributeNameAfter(code);
    }

    effects.consume(code);
    return completeAttributeValueUnquoted;
  }

  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace_1(code)) {
      return completeAttributeNameBefore(code);
    }

    return nok(code);
  }

  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter;
    }

    return nok(code);
  }

  function completeAfter(code) {
    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAfter;
    }

    return code === null || markdownLineEnding_1(code) ? continuation(code) : nok(code);
  }

  function continuation(code) {
    if (code === 45 && kind === 2) {
      effects.consume(code);
      return continuationCommentInside;
    }

    if (code === 60 && kind === 1) {
      effects.consume(code);
      return continuationRawTagOpen;
    }

    if (code === 62 && kind === 4) {
      effects.consume(code);
      return continuationClose;
    }

    if (code === 63 && kind === 3) {
      effects.consume(code);
      return continuationDeclarationInside;
    }

    if (code === 93 && kind === 5) {
      effects.consume(code);
      return continuationCharacterDataInside;
    }

    if (markdownLineEnding_1(code) && (kind === 6 || kind === 7)) {
      return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code);
    }

    if (code === null || markdownLineEnding_1(code)) {
      return continuationAtLineEnding(code);
    }

    effects.consume(code);
    return continuation;
  }

  function continuationAtLineEnding(code) {
    effects.exit('htmlFlowData');
    return htmlContinueStart(code);
  }

  function htmlContinueStart(code) {
    if (code === null) {
      return done(code);
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return htmlContinueStart;
    }

    effects.enter('htmlFlowData');
    return continuation(code);
  }

  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside;
    }

    return continuation(code);
  }

  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = '';
      return continuationRawEndTag;
    }

    return continuation(code);
  }

  function continuationRawEndTag(code) {
    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
      effects.consume(code);
      return continuationClose;
    }

    if (asciiAlpha_1(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += fromCharCode_1(code);
      return continuationRawEndTag;
    }

    return continuation(code);
  }

  function continuationCharacterDataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside;
    }

    return continuation(code);
  }

  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose;
    }

    return continuation(code);
  }

  function continuationClose(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('htmlFlowData');
      return done(code);
    }

    effects.consume(code);
    return continuationClose;
  }

  function done(code) {
    effects.exit('htmlFlow');
    return ok(code);
  }
}

function tokenizeNextBlank(effects, ok, nok) {
  return start;

  function start(code) {
    effects.exit('htmlFlowData');
    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    return effects.attempt(partialBlankLine_1, ok, nok);
  }
}

var htmlFlow_1 = htmlFlow;

var htmlText = {
  name: 'htmlText',
  tokenize: tokenizeHtmlText
};

function tokenizeHtmlText(effects, ok, nok) {
  var self = this;
  var marker;
  var buffer;
  var index;
  var returnState;
  return start;

  function start(code) {
    effects.enter('htmlText');
    effects.enter('htmlTextData');
    effects.consume(code);
    return open;
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart;
    }

    if (code === 63) {
      effects.consume(code);
      return instruction;
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return tagOpen;
    }

    return nok(code);
  }

  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpen;
    }

    if (code === 91) {
      effects.consume(code);
      buffer = 'CDATA[';
      index = 0;
      return cdataOpen;
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return declaration;
    }

    return nok(code);
  }

  function commentOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentStart;
    }

    return nok(code);
  }

  function commentStart(code) {
    if (code === null || code === 62) {
      return nok(code);
    }

    if (code === 45) {
      effects.consume(code);
      return commentStartDash;
    }

    return comment(code);
  }

  function commentStartDash(code) {
    if (code === null || code === 62) {
      return nok(code);
    }

    return comment(code);
  }

  function comment(code) {
    if (code === null) {
      return nok(code);
    }

    if (code === 45) {
      effects.consume(code);
      return commentClose;
    }

    if (markdownLineEnding_1(code)) {
      returnState = comment;
      return atLineEnding(code);
    }

    effects.consume(code);
    return comment;
  }

  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return end;
    }

    return comment(code);
  }

  function cdataOpen(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length ? cdata : cdataOpen;
    }

    return nok(code);
  }

  function cdata(code) {
    if (code === null) {
      return nok(code);
    }

    if (code === 93) {
      effects.consume(code);
      return cdataClose;
    }

    if (markdownLineEnding_1(code)) {
      returnState = cdata;
      return atLineEnding(code);
    }

    effects.consume(code);
    return cdata;
  }

  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }

    return cdata(code);
  }

  function cdataEnd(code) {
    if (code === 62) {
      return end(code);
    }

    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }

    return cdata(code);
  }

  function declaration(code) {
    if (code === null || code === 62) {
      return end(code);
    }

    if (markdownLineEnding_1(code)) {
      returnState = declaration;
      return atLineEnding(code);
    }

    effects.consume(code);
    return declaration;
  }

  function instruction(code) {
    if (code === null) {
      return nok(code);
    }

    if (code === 63) {
      effects.consume(code);
      return instructionClose;
    }

    if (markdownLineEnding_1(code)) {
      returnState = instruction;
      return atLineEnding(code);
    }

    effects.consume(code);
    return instruction;
  }

  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code);
  }

  function tagCloseStart(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return tagClose;
    }

    return nok(code);
  }

  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return tagClose;
    }

    return tagCloseBetween(code);
  }

  function tagCloseBetween(code) {
    if (markdownLineEnding_1(code)) {
      returnState = tagCloseBetween;
      return atLineEnding(code);
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagCloseBetween;
    }

    return end(code);
  }

  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return tagOpen;
    }

    if (code === 47 || code === 62 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code);
    }

    return nok(code);
  }

  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end;
    }

    if (code === 58 || code === 95 || asciiAlpha_1(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenBetween;
      return atLineEnding(code);
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenBetween;
    }

    return end(code);
  }

  function tagOpenAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }

    return tagOpenAttributeNameAfter(code);
  }

  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code);
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter;
    }

    return tagOpenBetween(code);
  }

  function tagOpenAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted;
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code);
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }

    effects.consume(code);
    marker = undefined;
    return tagOpenAttributeValueUnquoted;
  }

  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return tagOpenAttributeValueQuotedAfter;
    }

    if (code === null) {
      return nok(code);
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code);
    }

    effects.consume(code);
    return tagOpenAttributeValueQuoted;
  }

  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 62 || code === 47 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code);
    }

    return nok(code);
  }

  function tagOpenAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
      return nok(code);
    }

    if (code === 62 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code);
    }

    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  } // We can’t have blank lines in content, so no need to worry about empty
  // tokens.


  function atLineEnding(code) {
    effects.exit('htmlTextData');
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, afterPrefix, 'linePrefix', self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4);
  }

  function afterPrefix(code) {
    effects.enter('htmlTextData');
    return returnState(code);
  }

  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit('htmlTextData');
      effects.exit('htmlText');
      return ok;
    }

    return nok(code);
  }
}

var htmlText_1 = htmlText;

var labelEnd = {
  name: 'labelEnd',
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};

function resolveAllLabelEnd(events) {
  var index = -1;
  var token;

  while (++index < events.length) {
    token = events[index][1];

    if (!token._used && (token.type === 'labelImage' || token.type === 'labelLink' || token.type === 'labelEnd')) {
      // Remove the marker.
      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
      token.type = 'data';
      index++;
    }
  }

  return events;
}

function resolveToLabelEnd(events, context) {
  var index = events.length;
  var offset = 0;
  var group;
  var label;
  var text;
  var token;
  var open;
  var close;
  var media; // Find an opening.

  while (index--) {
    token = events[index][1];

    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (token.type === 'link' || token.type === 'labelLink' && token._inactive) {
        break;
      } // Mark other link openings as inactive, as we can’t have links in
      // links.


      if (events[index][0] === 'enter' && token.type === 'labelLink') {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index][0] === 'enter' && (token.type === 'labelImage' || token.type === 'labelLink') && !token._balanced) {
        open = index;

        if (token.type !== 'labelLink') {
          offset = 2;
          break;
        }
      }
    } else if (token.type === 'labelEnd') {
      close = index;
    }
  }

  group = {
    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
    start: shallow_1(events[open][1].start),
    end: shallow_1(events[events.length - 1][1].end)
  };
  label = {
    type: 'label',
    start: shallow_1(events[open][1].start),
    end: shallow_1(events[close][1].end)
  };
  text = {
    type: 'labelText',
    start: shallow_1(events[open + offset + 2][1].end),
    end: shallow_1(events[close - 2][1].start)
  };
  media = [['enter', group, context], ['enter', label, context]]; // Opening marker.

  media = chunkedPush_1(media, events.slice(open + 1, open + offset + 3)); // Text open.

  media = chunkedPush_1(media, [['enter', text, context]]); // Between.

  media = chunkedPush_1(media, resolveAll_1(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context)); // Text close, marker close, label close.

  media = chunkedPush_1(media, [['exit', text, context], events[close - 2], events[close - 1], ['exit', label, context]]); // Reference, resource, or so.

  media = chunkedPush_1(media, events.slice(close + 1)); // Media close.

  media = chunkedPush_1(media, [['exit', group, context]]);
  chunkedSplice_1(events, open, events.length, media);
  return events;
}

function tokenizeLabelEnd(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var labelStart;
  var defined; // Find an opening.

  while (index--) {
    if ((self.events[index][1].type === 'labelImage' || self.events[index][1].type === 'labelLink') && !self.events[index][1]._balanced) {
      labelStart = self.events[index][1];
      break;
    }
  }

  return start;

  function start(code) {
    if (!labelStart) {
      return nok(code);
    } // It’s a balanced bracket, but contains a link.


    if (labelStart._inactive) return balanced(code);
    defined = self.parser.defined.indexOf(normalizeIdentifier_1(self.sliceSerialize({
      start: labelStart.end,
      end: self.now()
    }))) > -1;
    effects.enter('labelEnd');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelEnd');
    return afterLabelEnd;
  }

  function afterLabelEnd(code) {
    // Resource: `[asd](fgh)`.
    if (code === 40) {
      return effects.attempt(resourceConstruct, ok, defined ? ok : balanced)(code);
    } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?


    if (code === 91) {
      return effects.attempt(fullReferenceConstruct, ok, defined ? effects.attempt(collapsedReferenceConstruct, ok, balanced) : balanced)(code);
    } // Shortcut reference: `[asd]`?


    return defined ? ok(code) : balanced(code);
  }

  function balanced(code) {
    labelStart._balanced = true;
    return nok(code);
  }
}

function tokenizeResource(effects, ok, nok) {
  return start;

  function start(code) {
    effects.enter('resource');
    effects.enter('resourceMarker');
    effects.consume(code);
    effects.exit('resourceMarker');
    return factoryWhitespace(effects, open);
  }

  function open(code) {
    if (code === 41) {
      return end(code);
    }

    return factoryDestination(effects, destinationAfter, nok, 'resourceDestination', 'resourceDestinationLiteral', 'resourceDestinationLiteralMarker', 'resourceDestinationRaw', 'resourceDestinationString', 3)(code);
  }

  function destinationAfter(code) {
    return markdownLineEndingOrSpace_1(code) ? factoryWhitespace(effects, between)(code) : end(code);
  }

  function between(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(effects, factoryWhitespace(effects, end), nok, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(code);
    }

    return end(code);
  }

  function end(code) {
    if (code === 41) {
      effects.enter('resourceMarker');
      effects.consume(code);
      effects.exit('resourceMarker');
      effects.exit('resource');
      return ok;
    }

    return nok(code);
  }
}

function tokenizeFullReference(effects, ok, nok) {
  var self = this;
  return start;

  function start(code) {
    return factoryLabel.call(self, effects, afterLabel, nok, 'reference', 'referenceMarker', 'referenceString')(code);
  }

  function afterLabel(code) {
    return self.parser.defined.indexOf(normalizeIdentifier_1(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) < 0 ? nok(code) : ok(code);
  }
}

function tokenizeCollapsedReference(effects, ok, nok) {
  return start;

  function start(code) {
    effects.enter('reference');
    effects.enter('referenceMarker');
    effects.consume(code);
    effects.exit('referenceMarker');
    return open;
  }

  function open(code) {
    if (code === 93) {
      effects.enter('referenceMarker');
      effects.consume(code);
      effects.exit('referenceMarker');
      effects.exit('reference');
      return ok;
    }

    return nok(code);
  }
}

var labelEnd_1 = labelEnd;

var labelStartImage = {
  name: 'labelStartImage',
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd_1.resolveAll
};

function tokenizeLabelStartImage(effects, ok, nok) {
  var self = this;
  return start;

  function start(code) {
    effects.enter('labelImage');
    effects.enter('labelImageMarker');
    effects.consume(code);
    effects.exit('labelImageMarker');
    return open;
  }

  function open(code) {
    if (code === 91) {
      effects.enter('labelMarker');
      effects.consume(code);
      effects.exit('labelMarker');
      effects.exit('labelImage');
      return after;
    }

    return nok(code);
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
    /* c8 ignore next */
    '_hiddenFootnoteSupport' in self.parser.constructs ?
    /* c8 ignore next */
    nok(code) : ok(code);
  }
}

var labelStartImage_1 = labelStartImage;

var labelStartLink = {
  name: 'labelStartLink',
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd_1.resolveAll
};

function tokenizeLabelStartLink(effects, ok, nok) {
  var self = this;
  return start;

  function start(code) {
    effects.enter('labelLink');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelLink');
    return after;
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
    /* c8 ignore next */
    '_hiddenFootnoteSupport' in self.parser.constructs ?
    /* c8 ignore next */
    nok(code) : ok(code);
  }
}

var labelStartLink_1 = labelStartLink;

var lineEnding = {
  name: 'lineEnding',
  tokenize: tokenizeLineEnding
};

function tokenizeLineEnding(effects, ok) {
  return start;

  function start(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, ok, 'linePrefix');
  }
}

var lineEnding_1 = lineEnding;

var thematicBreak = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
};

function tokenizeThematicBreak(effects, ok, nok) {
  var size = 0;
  var marker;
  return start;

  function start(code) {
    effects.enter('thematicBreak');
    marker = code;
    return atBreak(code);
  }

  function atBreak(code) {
    if (code === marker) {
      effects.enter('thematicBreakSequence');
      return sequence(code);
    }

    if (markdownSpace_1(code)) {
      return factorySpace(effects, atBreak, 'whitespace')(code);
    }

    if (size < 3 || code !== null && !markdownLineEnding_1(code)) {
      return nok(code);
    }

    effects.exit('thematicBreak');
    return ok(code);
  }

  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence;
    }

    effects.exit('thematicBreakSequence');
    return atBreak(code);
  }
}

var thematicBreak_1 = thematicBreak;

var list = {
  name: 'list',
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};

function tokenizeListStart(effects, ok, nok) {
  var self = this;
  var initialSize = prefixSize_1(self.events, 'linePrefix');
  var size = 0;
  return start;

  function start(code) {
    var kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? 'listUnordered' : 'listOrdered');

    if (kind === 'listUnordered' ? !self.containerState.marker || code === self.containerState.marker : asciiDigit_1(code)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }

      if (kind === 'listUnordered') {
        effects.enter('listItemPrefix');
        return code === 42 || code === 45 ? effects.check(thematicBreak_1, nok, atMarker)(code) : atMarker(code);
      }

      if (!self.interrupt || code === 49) {
        effects.enter('listItemPrefix');
        effects.enter('listItemValue');
        return inside(code);
      }
    }

    return nok(code);
  }

  function inside(code) {
    if (asciiDigit_1(code) && ++size < 10) {
      effects.consume(code);
      return inside;
    }

    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
      effects.exit('listItemValue');
      return atMarker(code);
    }

    return nok(code);
  }

  function atMarker(code) {
    effects.enter('listItemMarker');
    effects.consume(code);
    effects.exit('listItemMarker');
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(partialBlankLine_1, // Can’t be empty when interrupting.
    self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
  }

  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code);
  }

  function otherPrefix(code) {
    if (markdownSpace_1(code)) {
      effects.enter('listItemPrefixWhitespace');
      effects.consume(code);
      effects.exit('listItemPrefixWhitespace');
      return endOfPrefix;
    }

    return nok(code);
  }

  function endOfPrefix(code) {
    self.containerState.size = initialSize + sizeChunks_1(self.sliceStream(effects.exit('listItemPrefix')));
    return ok(code);
  }
}

function tokenizeListContinuation(effects, ok, nok) {
  var self = this;
  self.containerState._closeFlow = undefined;
  return effects.check(partialBlankLine_1, onBlank, notBlank);

  function onBlank(code) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine; // We have a blank line.
    // Still, try to consume at most the items size.

    return factorySpace(effects, ok, 'listItemIndent', self.containerState.size + 1)(code);
  }

  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace_1(code)) {
      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
      return notInCurrentItem(code);
    }

    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
  }

  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

    self.interrupt = undefined;
    return factorySpace(effects, effects.attempt(list, ok, nok), 'linePrefix', self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4)(code);
  }
}

function tokenizeIndent(effects, ok, nok) {
  var self = this;
  return factorySpace(effects, afterPrefix, 'listItemIndent', self.containerState.size + 1);

  function afterPrefix(code) {
    return prefixSize_1(self.events, 'listItemIndent') === self.containerState.size ? ok(code) : nok(code);
  }
}

function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}

function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  var self = this;
  return factorySpace(effects, afterPrefix, 'listItemPrefixWhitespace', self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? undefined : 4 + 1);

  function afterPrefix(code) {
    return markdownSpace_1(code) || !prefixSize_1(self.events, 'listItemPrefixWhitespace') ? nok(code) : ok(code);
  }
}

var list_1 = list;

var setextUnderline = {
  name: 'setextUnderline',
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};

function resolveToSetextUnderline(events, context) {
  var index = events.length;
  var content;
  var text;
  var definition;
  var heading; // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.

  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === 'content') {
        content = index;
        break;
      }

      if (events[index][1].type === 'paragraph') {
        text = index;
      }
    } // Exit
    else {
        if (events[index][1].type === 'content') {
          // Remove the content end (if needed we’ll add it later)
          events.splice(index, 1);
        }

        if (!definition && events[index][1].type === 'definition') {
          definition = index;
        }
      }
  }

  heading = {
    type: 'setextHeading',
    start: shallow_1(events[text][1].start),
    end: shallow_1(events[events.length - 1][1].end)
  }; // Change the paragraph to setext heading text.

  events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.

  if (definition) {
    events.splice(text, 0, ['enter', heading, context]);
    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
    events[content][1].end = shallow_1(events[definition][1].end);
  } else {
    events[content][1] = heading;
  } // Add the heading exit at the end.


  events.push(['exit', heading, context]);
  return events;
}

function tokenizeSetextUnderline(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var marker;
  var paragraph; // Find an opening.

  while (index--) {
    // Skip enter/exit of line ending, line prefix, and content.
    // We can now either have a definition or a paragraph.
    if (self.events[index][1].type !== 'lineEnding' && self.events[index][1].type !== 'linePrefix' && self.events[index][1].type !== 'content') {
      paragraph = self.events[index][1].type === 'paragraph';
      break;
    }
  }

  return start;

  function start(code) {
    if (!self.lazy && (self.interrupt || paragraph)) {
      effects.enter('setextHeadingLine');
      effects.enter('setextHeadingLineSequence');
      marker = code;
      return closingSequence(code);
    }

    return nok(code);
  }

  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code);
      return closingSequence;
    }

    effects.exit('setextHeadingLineSequence');
    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code);
  }

  function closingSequenceEnd(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('setextHeadingLine');
      return ok(code);
    }

    return nok(code);
  }
}

var setextUnderline_1 = setextUnderline;

var constructs$1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});











































var document = {
  42: list_1,
  // Asterisk
  43: list_1,
  // Plus sign
  45: list_1,
  // Dash
  48: list_1,
  // 0
  49: list_1,
  // 1
  50: list_1,
  // 2
  51: list_1,
  // 3
  52: list_1,
  // 4
  53: list_1,
  // 5
  54: list_1,
  // 6
  55: list_1,
  // 7
  56: list_1,
  // 8
  57: list_1,
  // 9
  62: blockQuote_1 // Greater than

};
var contentInitial = {
  91: definition_1 // Left square bracket

};
var flowInitial = {
  '-2': codeIndented_1,
  // Horizontal tab
  '-1': codeIndented_1,
  // Virtual space
  32: codeIndented_1 // Space

};
var flow = {
  35: headingAtx_1,
  // Number sign
  42: thematicBreak_1,
  // Asterisk
  45: [setextUnderline_1, thematicBreak_1],
  // Dash
  60: htmlFlow_1,
  // Less than
  61: setextUnderline_1,
  // Equals to
  95: thematicBreak_1,
  // Underscore
  96: codeFenced_1,
  // Grave accent
  126: codeFenced_1 // Tilde

};
var string = {
  38: characterReference_1,
  // Ampersand
  92: characterEscape_1 // Backslash

};
var text = {
  '-5': lineEnding_1,
  // Carriage return
  '-4': lineEnding_1,
  // Line feed
  '-3': lineEnding_1,
  // Carriage return + line feed
  33: labelStartImage_1,
  // Exclamation mark
  38: characterReference_1,
  // Ampersand
  42: attention_1,
  // Asterisk
  60: [autolink_1, htmlText_1],
  // Less than
  91: labelStartLink_1,
  // Left square bracket
  92: [hardBreakEscape_1, characterEscape_1],
  // Backslash
  93: labelEnd_1,
  // Right square bracket
  95: attention_1,
  // Underscore
  96: codeText_1 // Grave accent

};
var insideSpan = {
  null: [attention_1, text_1.resolver]
};
var disable = {
  null: []
};
exports.contentInitial = contentInitial;
exports.disable = disable;
exports.document = document;
exports.flow = flow;
exports.flowInitial = flowInitial;
exports.insideSpan = insideSpan;
exports.string = string;
exports.text = text;
});

function parse(options) {
  var settings = options || {};
  var parser = {
    defined: [],
    constructs: combineExtensions_1([constructs$1].concat(miniflat_1(settings.extensions))),
    content: create(content),
    document: create(document$1),
    flow: create(flow),
    string: create(text_1.string),
    text: create(text_1.text)
  };
  return parser;

  function create(initializer) {
    return creator;

    function creator(from) {
      return createTokenizer_1(parser, initializer, from);
    }
  }
}

var parse_1 = parse;

var search = /[\0\t\n\r]/g;

function preprocess() {
  var start = true;
  var column = 1;
  var buffer = '';
  var atCarriageReturn;
  return preprocessor;

  function preprocessor(value, encoding, end) {
    var chunks = [];
    var match;
    var next;
    var startPosition;
    var endPosition;
    var code;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = '';

    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }

      start = undefined;
    }

    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match ? match.index : value.length;
      code = value.charCodeAt(endPosition);

      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }

      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = undefined;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = undefined;
        }

        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }

        if (code === 0) {
          chunks.push(65533);
          column++;
        } else if (code === 9) {
          next = Math.ceil(column / 4) * 4;
          chunks.push(-2);

          while (column++ < next) chunks.push(-1);
        } else if (code === 10) {
          chunks.push(-4);
          column = 1;
        } // Must be carriage return.
        else {
            atCarriageReturn = true;
            column = 1;
          }
      }

      startPosition = endPosition + 1;
    }

    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }

    return chunks;
  }
}

var preprocess_1 = preprocess;

function postprocess(events) {
  while (!subtokenize_1(events)) {// Empty
  }

  return events;
}

var postprocess_1 = postprocess;

var dist = fromMarkdown; // These three are compiled away in the `dist/`





















function fromMarkdown(value, encoding, options) {
  if (typeof encoding !== 'string') {
    options = encoding;
    encoding = undefined;
  }

  return compiler(options)(postprocess_1(parse_1(options).document().write(preprocess_1()(value, encoding, true))));
} // Note this compiler only understand complete buffering, not streaming.


function compiler(options) {
  var settings = options || {};
  var config = configure({
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: opener(link),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading),
      blockQuote: opener(blockQuote),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html, buffer),
      htmlTextData: onenterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list, onenterlistordered),
      listUnordered: opener(list),
      paragraph: opener(paragraph),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  }, settings.mdastExtensions || []);
  var data = {};
  return compile;

  function compile(events) {
    var tree = {
      type: 'root',
      children: []
    };
    var stack = [tree];
    var tokenStack = [];
    var listStack = [];
    var index = -1;
    var handler;
    var listStart;
    var context = {
      stack: stack,
      tokenStack: tokenStack,
      config: config,
      enter: enter,
      exit: exit,
      buffer: buffer,
      resume: resume,
      setData: setData,
      getData: getData
    };

    while (++index < events.length) {
      // We preprocess lists to add `listItem` tokens, and to infer whether
      // items the list itself are spread out.
      if (events[index][1].type === 'listOrdered' || events[index][1].type === 'listUnordered') {
        if (events[index][0] === 'enter') {
          listStack.push(index);
        } else {
          listStart = listStack.pop(index);
          index = prepareList(events, listStart, index);
        }
      }
    }

    index = -1;

    while (++index < events.length) {
      handler = config[events[index][0]];

      if (hasOwnProperty_1.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(assign_1({
          sliceSerialize: events[index][2].sliceSerialize
        }, context), events[index][1]);
      }
    }

    if (tokenStack.length) {
      throw new Error('Cannot close document, a token (`' + tokenStack[tokenStack.length - 1].type + '`, ' + unistUtilStringifyPosition({
        start: tokenStack[tokenStack.length - 1].start,
        end: tokenStack[tokenStack.length - 1].end
      }) + ') is still open');
    } // Figure out `root` position.


    tree.position = {
      start: point(events.length ? events[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: point(events.length ? events[events.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    };
    index = -1;

    while (++index < config.transforms.length) {
      tree = config.transforms[index](tree) || tree;
    }

    return tree;
  }

  function prepareList(events, start, length) {
    var index = start - 1;
    var containerBalance = -1;
    var listSpread = false;
    var listItem;
    var tailIndex;
    var lineIndex;
    var tailEvent;
    var event;
    var firstBlankLineIndex;
    var atMarker;

    while (++index <= length) {
      event = events[index];

      if (event[1].type === 'listUnordered' || event[1].type === 'listOrdered' || event[1].type === 'blockQuote') {
        if (event[0] === 'enter') {
          containerBalance++;
        } else {
          containerBalance--;
        }

        atMarker = undefined;
      } else if (event[1].type === 'lineEndingBlank') {
        if (event[0] === 'enter') {
          if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index;
          }

          atMarker = undefined;
        }
      } else if (event[1].type === 'linePrefix' || event[1].type === 'listItemValue' || event[1].type === 'listItemMarker' || event[1].type === 'listItemPrefix' || event[1].type === 'listItemPrefixWhitespace') ; else {
        atMarker = undefined;
      }

      if (!containerBalance && event[0] === 'enter' && event[1].type === 'listItemPrefix' || containerBalance === -1 && event[0] === 'exit' && (event[1].type === 'listUnordered' || event[1].type === 'listOrdered')) {
        if (listItem) {
          tailIndex = index;
          lineIndex = undefined;

          while (tailIndex--) {
            tailEvent = events[tailIndex];

            if (tailEvent[1].type === 'lineEnding' || tailEvent[1].type === 'lineEndingBlank') {
              if (tailEvent[0] === 'exit') continue;

              if (lineIndex) {
                events[lineIndex][1].type = 'lineEndingBlank';
                listSpread = true;
              }

              tailEvent[1].type = 'lineEnding';
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === 'linePrefix' || tailEvent[1].type === 'blockQuotePrefix' || tailEvent[1].type === 'blockQuotePrefixWhitespace' || tailEvent[1].type === 'blockQuoteMarker' || tailEvent[1].type === 'listItemIndent') ; else {
              break;
            }
          }

          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem._spread = true;
          } // Fix position.


          listItem.end = point(lineIndex ? events[lineIndex][1].start : event[1].end);
          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
          index++;
          length++;
        } // Create a new list item.


        if (event[1].type === 'listItemPrefix') {
          listItem = {
            type: 'listItem',
            _spread: false,
            start: point(event[1].start)
          };
          events.splice(index, 0, ['enter', listItem, event[2]]);
          index++;
          length++;
          firstBlankLineIndex = undefined;
          atMarker = true;
        }
      }
    }

    events[start][1]._spread = listSpread;
    return length;
  }

  function setData(key, value) {
    data[key] = value;
  }

  function getData(key) {
    return data[key];
  }

  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }

  function opener(create, and) {
    return open;

    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }

  function buffer() {
    this.stack.push({
      type: 'fragment',
      children: []
    });
  }

  function enter(node, token) {
    this.stack[this.stack.length - 1].children.push(node);
    this.stack.push(node);
    this.tokenStack.push(token);
    node.position = {
      start: point(token.start)
    };
    return node;
  }

  function closer(and) {
    return close;

    function close(token) {
      if (and) and.call(this, token);
      exit.call(this, token);
    }
  }

  function exit(token) {
    var node = this.stack.pop();
    var open = this.tokenStack.pop();

    if (!open) {
      throw new Error('Cannot close `' + token.type + '` (' + unistUtilStringifyPosition({
        start: token.start,
        end: token.end
      }) + '): it’s not open');
    } else if (open.type !== token.type) {
      throw new Error('Cannot close `' + token.type + '` (' + unistUtilStringifyPosition({
        start: token.start,
        end: token.end
      }) + '): a different token (`' + open.type + '`, ' + unistUtilStringifyPosition({
        start: open.start,
        end: open.end
      }) + ') is open');
    }

    node.position.end = point(token.end);
    return node;
  }

  function resume() {
    return mdastUtilToString(this.stack.pop());
  } //
  // Handlers.
  //


  function onenterlistordered() {
    setData('expectingFirstListItemValue', true);
  }

  function onenterlistitemvalue(token) {
    if (getData('expectingFirstListItemValue')) {
      this.stack[this.stack.length - 2].start = parseInt(this.sliceSerialize(token), 10);
      setData('expectingFirstListItemValue');
    }
  }

  function onexitcodefencedfenceinfo() {
    var data = this.resume();
    this.stack[this.stack.length - 1].lang = data;
  }

  function onexitcodefencedfencemeta() {
    var data = this.resume();
    this.stack[this.stack.length - 1].meta = data;
  }

  function onexitcodefencedfence() {
    // Exit if this is the closing fence.
    if (getData('flowCodeInside')) return;
    this.buffer();
    setData('flowCodeInside', true);
  }

  function onexitcodefenced() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
    setData('flowCodeInside');
  }

  function onexitcodeindented() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitdefinitionlabelstring(token) {
    // Discard label, use the source content instead.
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier_1(this.sliceSerialize(token)).toLowerCase();
  }

  function onexitdefinitiontitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitdefinitiondestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitatxheadingsequence(token) {
    if (!this.stack[this.stack.length - 1].depth) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).length;
    }
  }

  function onexitsetextheadingtext() {
    setData('setextHeadingSlurpLineEnding', true);
  }

  function onexitsetextheadinglinesequence(token) {
    this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }

  function onexitsetextheading() {
    setData('setextHeadingSlurpLineEnding');
  }

  function onenterdata(token) {
    var siblings = this.stack[this.stack.length - 1].children;
    var tail = siblings[siblings.length - 1];

    if (!tail || tail.type !== 'text') {
      // Add a new text node.
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      this.stack[this.stack.length - 1].children.push(tail);
    }

    this.stack.push(tail);
  }

  function onexitdata(token) {
    var tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point(token.end);
  }

  function onexitlineending(token) {
    var context = this.stack[this.stack.length - 1]; // If we’re at a hard break, include the line ending in there.

    if (getData('atHardBreak')) {
      context.children[context.children.length - 1].position.end = point(token.end);
      setData('atHardBreak');
      return;
    }

    if (!getData('setextHeadingSlurpLineEnding') && config.canContainEols.indexOf(context.type) > -1) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }

  function onexithardbreak() {
    setData('atHardBreak', true);
  }

  function onexithtmlflow() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexithtmltext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitcodetext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitlink() {
    var context = this.stack[this.stack.length - 1]; // To do: clean.

    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitimage() {
    var context = this.stack[this.stack.length - 1]; // To do: clean.

    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitlabeltext(token) {
    this.stack[this.stack.length - 2].identifier = normalizeIdentifier_1(this.sliceSerialize(token)).toLowerCase();
  }

  function onexitlabel() {
    var fragment = this.stack[this.stack.length - 1];
    var value = this.resume();
    this.stack[this.stack.length - 1].label = value; // Assume a reference.

    setData('inReference', true);

    if (this.stack[this.stack.length - 1].type === 'link') {
      this.stack[this.stack.length - 1].children = fragment.children;
    } else {
      this.stack[this.stack.length - 1].alt = value;
    }
  }

  function onexitresourcedestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitresourcetitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitresource() {
    setData('inReference');
  }

  function onenterreference() {
    setData('referenceType', 'collapsed');
  }

  function onexitreferencestring(token) {
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier_1(this.sliceSerialize(token)).toLowerCase();
    setData('referenceType', 'full');
  }

  function onexitcharacterreferencemarker(token) {
    setData('characterReferenceType', token.type);
  }

  function onexitcharacterreferencevalue(token) {
    var data = this.sliceSerialize(token);
    var type = getData('characterReferenceType');
    var value;
    var tail;

    if (type) {
      value = safeFromInt_1(data, type === 'characterReferenceMarkerNumeric' ? 10 : 16);
      setData('characterReferenceType');
    } else {
      value = decodeEntity_browser(data);
    }

    tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point(token.end);
  }

  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
  }

  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url = 'mailto:' + this.sliceSerialize(token);
  } //
  // Creaters.
  //


  function blockQuote() {
    return {
      type: 'blockquote',
      children: []
    };
  }

  function codeFlow() {
    return {
      type: 'code',
      lang: null,
      meta: null,
      value: ''
    };
  }

  function codeText() {
    return {
      type: 'inlineCode',
      value: ''
    };
  }

  function definition() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: ''
    };
  }

  function emphasis() {
    return {
      type: 'emphasis',
      children: []
    };
  }

  function heading() {
    return {
      type: 'heading',
      depth: undefined,
      children: []
    };
  }

  function hardBreak() {
    return {
      type: 'break'
    };
  }

  function html() {
    return {
      type: 'html',
      value: ''
    };
  }

  function image() {
    return {
      type: 'image',
      title: null,
      url: '',
      alt: null
    };
  }

  function link() {
    return {
      type: 'link',
      title: null,
      url: '',
      children: []
    };
  }

  function list(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      spread: token._spread,
      children: []
    };
  }

  function listItem(token) {
    return {
      type: 'listItem',
      spread: token._spread,
      checked: null,
      children: []
    };
  }

  function paragraph() {
    return {
      type: 'paragraph',
      children: []
    };
  }

  function strong() {
    return {
      type: 'strong',
      children: []
    };
  }

  function text() {
    return {
      type: 'text',
      value: ''
    };
  }

  function thematicBreak() {
    return {
      type: 'thematicBreak'
    };
  }
}

function configure(config, extensions) {
  var index = -1;

  while (++index < extensions.length) {
    extension$1(config, extensions[index]);
  }

  return config;
}

function extension$1(config, extension) {
  var key;
  var left;

  for (key in extension) {
    left = hasOwnProperty_1.call(config, key) ? config[key] : config[key] = {};

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, extension[key]);
    } else {
      Object.assign(left, extension[key]);
    }
  }
}

var mdastUtilFromMarkdown = dist;

var remarkParse = parse$1;



function parse$1(options) {
  var self = this;
  this.Parser = parse;

  function parse(doc) {
    return mdastUtilFromMarkdown(doc, Object.assign({}, self.data('settings'), options, {
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self.data('micromarkExtensions') || [],
      mdastExtensions: self.data('fromMarkdownExtensions') || []
    }));
  }
}

var unistBuilder = u;

function u(type, props, value) {
  var node;

  if ((value === null || value === undefined) && (typeof props !== 'object' || Array.isArray(props))) {
    value = props;
    props = {};
  }

  node = Object.assign({
    type: String(type)
  }, props);

  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== null && value !== undefined) {
    node.value = String(value);
  }

  return node;
}

var unistUtilGenerated = generated;

function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}

var mdastUtilDefinitions = getDefinitionFactory;
var own$4 = {}.hasOwnProperty; // Get a definition in `node` by `identifier`.

function getDefinitionFactory(node, options) {
  return getterFactory(gather(node));
} // Gather all definitions in `node`


function gather(node) {
  var cache = {};

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node');
  }

  unistUtilVisit(node, 'definition', ondefinition);
  return cache;

  function ondefinition(definition) {
    var id = normalise(definition.identifier);

    if (!own$4.call(cache, id)) {
      cache[id] = definition;
    }
  }
} // Factory to get a node from the given definition-cache.


function getterFactory(cache) {
  return getter; // Get a node from the bound definition-cache.

  function getter(identifier) {
    var id = identifier && normalise(identifier);
    return id && own$4.call(cache, id) ? cache[id] : null;
  }
}

function normalise(identifier) {
  return identifier.toUpperCase();
}

var all_1 = all$1;



function all$1(h, parent) {
  var nodes = parent.children || [];
  var length = nodes.length;
  var values = [];
  var index = -1;
  var result;
  var head;

  while (++index < length) {
    result = one_1(h, nodes[index], parent);

    if (result) {
      if (index && nodes[index - 1].type === 'break') {
        if (result.value) {
          result.value = result.value.replace(/^\s+/, '');
        }

        head = result.children && result.children[0];

        if (head && head.value) {
          head.value = head.value.replace(/^\s+/, '');
        }
      }

      values = values.concat(result);
    }
  }

  return values;
}

var one_1 = one;





var own$5 = {}.hasOwnProperty; // Transform an unknown node.

function unknown(h, node) {
  if (text(node)) {
    return h.augment(node, unistBuilder('text', node.value));
  }

  return h(node, 'div', all_1(h, node));
} // Visit a node.


function one(h, node, parent) {
  var type = node && node.type;
  var fn; // Fail on non-nodes.

  if (!type) {
    throw new Error('Expected node, got `' + node + '`');
  }

  if (own$5.call(h.handlers, type)) {
    fn = h.handlers[type];
  } else if (h.passThrough && h.passThrough.indexOf(type) > -1) {
    fn = returnNode;
  } else {
    fn = h.unknownHandler;
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent);
} // Check if the node should be renderered as a text node.


function text(node) {
  var data = node.data || {};

  if (own$5.call(data, 'hName') || own$5.call(data, 'hProperties') || own$5.call(data, 'hChildren')) {
    return false;
  }

  return 'value' in node;
}

function returnNode(h, node) {
  var clone;

  if (node.children) {
    clone = Object.assign({}, node);
    clone.children = all_1(h, node);
    return clone;
  }

  return node;
}

var thematicBreak_1$1 = thematicBreak$1;

function thematicBreak$1(h, node) {
  return h(node, 'hr');
}

var wrap_1$1 = wrap$1;

 // Wrap `nodes` with line feeds between each entry.
// Optionally adds line feeds at the start and end.


function wrap$1(nodes, loose) {
  var result = [];
  var index = -1;
  var length = nodes.length;

  if (loose) {
    result.push(unistBuilder('text', '\n'));
  }

  while (++index < length) {
    if (index) {
      result.push(unistBuilder('text', '\n'));
    }

    result.push(nodes[index]);
  }

  if (loose && nodes.length > 0) {
    result.push(unistBuilder('text', '\n'));
  }

  return result;
}

var list_1$1 = list$1;





function list$1(h, node) {
  var props = {};
  var name = node.ordered ? 'ol' : 'ul';
  var items;
  var index = -1;
  var length;

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start;
  }

  items = all_1(h, node);
  length = items.length; // Like GitHub, add a class for custom styling.

  while (++index < length) {
    if (items[index].properties.className && items[index].properties.className.indexOf('task-list-item') !== -1) {
      props.className = ['contains-task-list'];
      break;
    }
  }

  return h(node, name, props, wrap_1$1(items, true));
}

var footer = generateFootnotes;







function generateFootnotes(h) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var length = footnoteOrder.length;
  var index = -1;
  var listItems = [];
  var def;
  var backReference;
  var content;
  var tail;

  while (++index < length) {
    def = footnoteById[footnoteOrder[index].toUpperCase()];

    if (!def) {
      continue;
    }

    content = def.children.concat();
    tail = content[content.length - 1];
    backReference = {
      type: 'link',
      url: '#fnref-' + def.identifier,
      data: {
        hProperties: {
          className: ['footnote-backref']
        }
      },
      children: [{
        type: 'text',
        value: '↩'
      }]
    };

    if (!tail || tail.type !== 'paragraph') {
      tail = {
        type: 'paragraph',
        children: []
      };
      content.push(tail);
    }

    tail.children.push(backReference);
    listItems.push({
      type: 'listItem',
      data: {
        hProperties: {
          id: 'fn-' + def.identifier
        }
      },
      children: content,
      position: def.position
    });
  }

  if (listItems.length === 0) {
    return null;
  }

  return h(null, 'div', {
    className: ['footnotes']
  }, wrap_1$1([thematicBreak_1$1(h), list_1$1(h, {
    type: 'list',
    ordered: true,
    children: listItems
  })], true));
}

var blockquote_1 = blockquote;





function blockquote(h, node) {
  return h(node, 'blockquote', wrap_1$1(all_1(h, node), true));
}

var _break = hardBreak;



function hardBreak(h, node) {
  return [h(node, 'br'), unistBuilder('text', '\n')];
}

var code_1 = code;



function code(h, node) {
  var value = node.value ? node.value + '\n' : ''; // To do: next major, use `node.lang` w/o regex, the splitting’s been going
  // on for years in remark now.

  var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  var props = {};
  var code;

  if (lang) {
    props.className = ['language-' + lang];
  }

  code = h(node, 'code', props, [unistBuilder('text', value)]);

  if (node.meta) {
    code.data = {
      meta: node.meta
    };
  }

  return h(node.position, 'pre', [code]);
}

var _delete = strikethrough;



function strikethrough(h, node) {
  return h(node, 'del', all_1(h, node));
}

var emphasis_1 = emphasis;



function emphasis(h, node) {
  return h(node, 'em', all_1(h, node));
}

var footnoteReference_1 = footnoteReference;



function footnoteReference(h, node) {
  var footnoteOrder = h.footnoteOrder;
  var identifier = String(node.identifier);

  if (footnoteOrder.indexOf(identifier) === -1) {
    footnoteOrder.push(identifier);
  }

  return h(node.position, 'sup', {
    id: 'fnref-' + identifier
  }, [h(node, 'a', {
    href: '#fn-' + identifier,
    className: ['footnote-ref']
  }, [unistBuilder('text', node.label || identifier)])]);
}

var footnote_1 = footnote;



function footnote(h, node) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var identifier = 1;

  while (identifier in footnoteById) {
    identifier++;
  }

  identifier = String(identifier); // No need to check if `identifier` exists in `footnoteOrder`, it’s guaranteed
  // to not exist because we just generated it.

  footnoteOrder.push(identifier);
  footnoteById[identifier] = {
    type: 'footnoteDefinition',
    identifier: identifier,
    children: [{
      type: 'paragraph',
      children: node.children
    }],
    position: node.position
  };
  return footnoteReference_1(h, {
    type: 'footnoteReference',
    identifier: identifier,
    position: node.position
  });
}

var heading_1 = heading;



function heading(h, node) {
  return h(node, 'h' + node.depth, all_1(h, node));
}

var html_1 = html;

 // Return either a `raw` node in dangerous mode, otherwise nothing.


function html(h, node) {
  return h.dangerous ? h.augment(node, unistBuilder('raw', node.value)) : null;
}

var encodeCache = {}; // Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//

function getEncodeCache(exclude) {
  var i,
      ch,
      cache = encodeCache[exclude];

  if (cache) {
    return cache;
  }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
} // Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//


function encode(string, exclude, keepEscaped) {
  var i,
      l,
      code,
      nextCode,
      cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25
    /* % */
    && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);

        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }

      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_1 = encode;

var revert_1 = revert;



 // Return the content of a reference without definition as Markdown.


function revert(h, node) {
  var subtype = node.referenceType;
  var suffix = ']';
  var contents;
  var head;
  var tail;

  if (subtype === 'collapsed') {
    suffix += '[]';
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']';
  }

  if (node.type === 'imageReference') {
    return unistBuilder('text', '![' + node.alt + suffix);
  }

  contents = all_1(h, node);
  head = contents[0];

  if (head && head.type === 'text') {
    head.value = '[' + head.value;
  } else {
    contents.unshift(unistBuilder('text', '['));
  }

  tail = contents[contents.length - 1];

  if (tail && tail.type === 'text') {
    tail.value += suffix;
  } else {
    contents.push(unistBuilder('text', suffix));
  }

  return contents;
}

var imageReference_1 = imageReference;





function imageReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node);
  }

  props = {
    src: encode_1(def.url || ''),
    alt: node.alt
  };

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'img', props);
}

var image_1 = image;

function image(h, node) {
  var props = {
    src: encode_1(node.url),
    alt: node.alt
  };

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'img', props);
}

var inlineCode_1 = inlineCode;



function inlineCode(h, node) {
  var value = node.value.replace(/\r?\n|\r/g, ' ');
  return h(node, 'code', [unistBuilder('text', value)]);
}

var linkReference_1 = linkReference;







function linkReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node);
  }

  props = {
    href: encode_1(def.url || '')
  };

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'a', props, all_1(h, node));
}

var link_1 = link;

function link(h, node) {
  var props = {
    href: encode_1(node.url)
  };

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'a', props, all_1(h, node));
}

var listItem_1 = listItem;





function listItem(h, node, parent) {
  var result = all_1(h, node);
  var head = result[0];
  var loose = parent ? listLoose(parent) : listItemLoose(node);
  var props = {};
  var wrapped = [];
  var length;
  var index;
  var child;

  if (typeof node.checked === 'boolean') {
    if (!head || head.tagName !== 'p') {
      head = h(null, 'p', []);
      result.unshift(head);
    }

    if (head.children.length > 0) {
      head.children.unshift(unistBuilder('text', ' '));
    }

    head.children.unshift(h(null, 'input', {
      type: 'checkbox',
      checked: node.checked,
      disabled: true
    })); // According to github-markdown-css, this class hides bullet.
    // See: <https://github.com/sindresorhus/github-markdown-css>.

    props.className = ['task-list-item'];
  }

  length = result.length;
  index = -1;

  while (++index < length) {
    child = result[index]; // Add eols before nodes, except if this is a loose, first paragraph.

    if (loose || index !== 0 || child.tagName !== 'p') {
      wrapped.push(unistBuilder('text', '\n'));
    }

    if (child.tagName === 'p' && !loose) {
      wrapped = wrapped.concat(child.children);
    } else {
      wrapped.push(child);
    }
  } // Add a final eol.


  if (length && (loose || child.tagName !== 'p')) {
    wrapped.push(unistBuilder('text', '\n'));
  }

  return h(node, 'li', props, wrapped);
}

function listLoose(node) {
  var loose = node.spread;
  var children = node.children;
  var length = children.length;
  var index = -1;

  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }

  return loose;
}

function listItemLoose(node) {
  var spread = node.spread;
  return spread === undefined || spread === null ? node.children.length > 1 : spread;
}

var paragraph_1 = paragraph;



function paragraph(h, node) {
  return h(node, 'p', all_1(h, node));
}

var root_1 = root;







function root(h, node) {
  return h.augment(node, unistBuilder('root', wrap_1$1(all_1(h, node))));
}

var strong_1 = strong;



function strong(h, node) {
  return h(node, 'strong', all_1(h, node));
}

var table_1 = table;







function table(h, node) {
  var rows = node.children;
  var index = rows.length;
  var align = node.align || [];
  var alignLength = align.length;
  var result = [];
  var pos;
  var row;
  var out;
  var name;
  var cell;

  while (index--) {
    row = rows[index].children;
    name = index === 0 ? 'th' : 'td';
    pos = alignLength || row.length;
    out = [];

    while (pos--) {
      cell = row[pos];
      out[pos] = h(cell, name, {
        align: align[pos]
      }, cell ? all_1(h, cell) : []);
    }

    result[index] = h(rows[index], 'tr', wrap_1$1(out, true));
  }

  return h(node, 'table', wrap_1$1([h(result[0].position, 'thead', wrap_1$1([result[0]], true))].concat(result[1] ? h({
    start: unistUtilPosition.start(result[1]),
    end: unistUtilPosition.end(result[result.length - 1])
  }, 'tbody', wrap_1$1(result.slice(1), true)) : []), true));
}

var text_1$1 = text$1;



function text$1(h, node) {
  return h.augment(node, unistBuilder('text', String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, '$1')));
}

var handlers = {
  blockquote: blockquote_1,
  break: _break,
  code: code_1,
  delete: _delete,
  emphasis: emphasis_1,
  footnoteReference: footnoteReference_1,
  footnote: footnote_1,
  heading: heading_1,
  html: html_1,
  imageReference: imageReference_1,
  image: image_1,
  inlineCode: inlineCode_1,
  linkReference: linkReference_1,
  link: link_1,
  listItem: listItem_1,
  list: list_1$1,
  paragraph: paragraph_1,
  root: root_1,
  strong: strong_1,
  table: table_1,
  text: text_1$1,
  thematicBreak: thematicBreak_1$1,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
}; // Return nothing for nodes that are ignored.

function ignore() {
  return null;
}

var lib$1 = toHast;

















var own$6 = {}.hasOwnProperty;
var deprecationWarningIssued = false; // Factory to transform.

function factory(tree, options) {
  var settings = options || {}; // Issue a warning if the deprecated tag 'allowDangerousHTML' is used

  if (settings.allowDangerousHTML !== undefined && !deprecationWarningIssued) {
    deprecationWarningIssued = true;
    console.warn('mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead');
  }

  var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML;
  var footnoteById = {};
  h.dangerous = dangerous;
  h.definition = mdastUtilDefinitions(tree);
  h.footnoteById = footnoteById;
  h.footnoteOrder = [];
  h.augment = augment;
  h.handlers = Object.assign({}, handlers, settings.handlers);
  h.unknownHandler = settings.unknownHandler;
  h.passThrough = settings.passThrough;
  unistUtilVisit(tree, 'footnoteDefinition', onfootnotedefinition);
  return h; // Finalise the created `right`, a hast node, from `left`, an mdast node.

  function augment(left, right) {
    var data;
    var ctx; // Handle `data.hName`, `data.hProperties, `data.hChildren`.

    if (left && left.data) {
      data = left.data;

      if (data.hName) {
        if (right.type !== 'element') {
          right = {
            type: 'element',
            tagName: '',
            properties: {},
            children: []
          };
        }

        right.tagName = data.hName;
      }

      if (right.type === 'element' && data.hProperties) {
        right.properties = Object.assign({}, right.properties, data.hProperties);
      }

      if (right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }

    ctx = left && left.position ? left : {
      position: left
    };

    if (!unistUtilGenerated(ctx)) {
      right.position = {
        start: unistUtilPosition.start(ctx),
        end: unistUtilPosition.end(ctx)
      };
    }

    return right;
  } // Create an element for `node`.


  function h(node, tagName, props, children) {
    if ((children === undefined || children === null) && typeof props === 'object' && 'length' in props) {
      children = props;
      props = {};
    }

    return augment(node, {
      type: 'element',
      tagName: tagName,
      properties: props || {},
      children: children || []
    });
  }

  function onfootnotedefinition(definition) {
    var id = String(definition.identifier).toUpperCase(); // Mimick CM behavior of link definitions.
    // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8290999/index.js#L26>.

    if (!own$6.call(footnoteById, id)) {
      footnoteById[id] = definition;
    }
  }
} // Transform `tree`, which is an mdast node, to a hast node.


function toHast(tree, options) {
  var h = factory(tree, options);
  var node = one_1(h, tree);
  var foot = footer(h);

  if (foot) {
    node.children = node.children.concat(unistBuilder('text', '\n'), foot);
  }

  return node;
}

var mdastUtilToHast = lib$1;

var remarkRehype = remark2rehype; // Attacher.
// If a destination is given, runs the destination with the new hast tree
// (bridge mode).
// Without destination, returns the tree: further plugins run on that tree
// (mutate mode).

function remark2rehype(destination, options) {
  if (destination && !destination.process) {
    options = destination;
    destination = null;
  }

  return destination ? bridge(destination, options) : mutate(options);
} // Bridge mode.
// Runs the destination with the new hast tree.


function bridge(destination, options) {
  return transformer;

  function transformer(node, file, next) {
    destination.run(mdastUtilToHast(node, options), file, done);

    function done(error) {
      next(error);
    }
  }
} // Mutate-mode.
// Further transformers run on the hast tree.


function mutate(options) {
  return transformer;

  function transformer(node) {
    return mdastUtilToHast(node, options);
  }
}

const splice$1 = [].splice;
var rehypeFilter_1 = rehypeFilter;
/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @callback AllowElement
 * @param {Element} element
 * @param {number} index
 * @param {Element|Root} parent
 * @returns {boolean}
 *
 * @typedef {Object} RehypeFilterOptions
 * @property {Array.<string>} [allowedElements]
 * @property {Array.<string>} [disallowedElements=[]]
 * @property {AllowElement} [allowElement]
 * @property {boolean} [unwrapDisallowed=false]
 */

/**
 * @param {RehypeFilterOptions} options
 */

function rehypeFilter(options) {
  if (options.allowedElements && options.disallowedElements) {
    throw new TypeError('Only one of `allowedElements` and `disallowedElements` should be defined');
  }

  return options.allowedElements || options.disallowedElements || options.allowElement ? transform : undefined;
  /**
   * @param {Root} tree
   */

  function transform(tree) {
    unistUtilVisit(tree, 'element', onelement);
  }
  /**
   * @param {Element} node
   * @param {number} index
   * @param {Element|Root} parent
   * @returns {number|void}
   */


  function onelement(node, index, parent) {
    /** @type {boolean} */
    let remove;

    if (options.allowedElements) {
      remove = !options.allowedElements.includes(node.tagName);
    } else if (options.disallowedElements) {
      remove = options.disallowedElements.includes(node.tagName);
    }

    if (!remove && options.allowElement) {
      remove = !options.allowElement(node, index, parent);
    }

    if (remove) {
      /** @type {Array.<unknown>} */
      let parameters = [index, 1];

      if (options.unwrapDisallowed && node.children) {
        parameters = parameters.concat(node.children);
      }

      splice$1.apply(parent.children, parameters);
      return index;
    }

    return undefined;
  }
}

const protocols = ['http', 'https', 'mailto', 'tel'];
var uriTransformer_1 = uriTransformer;
/**
 * @param {string} uri
 * @returns {string}
 */

function uriTransformer(uri) {
  const url = (uri || '').trim();
  const first = url.charAt(0);

  if (first === '#' || first === '/') {
    return url;
  }

  const colon = url.indexOf(':');

  if (colon === -1) {
    return url;
  }

  let index = -1;

  while (++index < protocols.length) {
    const protocol = protocols[index];

    if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
      return url;
    }
  }

  index = url.indexOf('?');

  if (index !== -1 && colon > index) {
    return url;
  }

  index = url.indexOf('#');

  if (index !== -1 && colon > index) {
    return url;
  } // eslint-disable-next-line no-script-url


  return 'javascript:void(0)';
}

/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = 60103,
    c = 60106,
    d = 60107,
    e = 60108,
    f = 60114,
    g = 60109,
    h = 60110,
    k = 60112,
    l = 60113,
    m = 60120,
    n = 60115,
    p = 60116,
    q = 60121,
    r = 60122,
    u$1 = 60117,
    v = 60129,
    w = 60131;

if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u$1 = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}

function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;

    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;

              default:
                return t;
            }

        }

      case c:
        return t;
    }
  }
}

var z = g,
    A = b,
    B = k,
    C = d,
    D = p,
    E = n,
    F = c,
    G = f,
    H = e,
    I = l;
var ContextConsumer = h;
var ContextProvider = z;
var Element = A;
var ForwardRef = B;
var Fragment = C;
var Lazy = D;
var Memo = E;
var Portal = F;
var Profiler = G;
var StrictMode = H;
var Suspense = I;

var isAsyncMode = function () {
  return !1;
};

var isConcurrentMode = function () {
  return !1;
};

var isContextConsumer = function (a) {
  return y(a) === h;
};

var isContextProvider = function (a) {
  return y(a) === g;
};

var isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};

var isForwardRef = function (a) {
  return y(a) === k;
};

var isFragment = function (a) {
  return y(a) === d;
};

var isLazy = function (a) {
  return y(a) === p;
};

var isMemo = function (a) {
  return y(a) === n;
};

var isPortal = function (a) {
  return y(a) === c;
};

var isProfiler = function (a) {
  return y(a) === f;
};

var isStrictMode = function (a) {
  return y(a) === e;
};

var isSuspense = function (a) {
  return y(a) === l;
};

var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u$1 || a.$$typeof === q || a[0] === r) ? !0 : !1;
};

var typeOf = y;

var reactIs_production_min = {
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs = createCommonjsModule(function (module) {

{
  module.exports = reactIs_production_min;
}
});

// @ts-ignore remove when typed


 // @ts-ignore remove when typed


 // @ts-ignore remove when typed


 // @ts-ignore remove when typed


 // @ts-ignore remove when typed






var hastToReact_1 = toReact;
var hastChildrenToReact = childrenToReact;
/**
 * @typedef {JSX.IntrinsicElements} IntrinsicElements
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('unist').Position} Position
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').DocType} Doctype
 */

/**
 * @typedef {Object} Info
 * @property {string?} space
 * @property {string?} attribute
 * @property {string?} property
 * @property {boolean} boolean
 * @property {boolean} booleanish
 * @property {boolean} overloadedBoolean
 * @property {boolean} number
 * @property {boolean} commaSeparated
 * @property {boolean} spaceSeparated
 * @property {boolean} commaOrSpaceSeparated
 * @property {boolean} mustUseProperty
 * @property {boolean} defined
 *
 * @typedef {Object} Schema
 * @property {Object.<string, Info>} property
 * @property {Object.<string, string>} normal
 * @property {string?} space
 *
 * @typedef {Object} Raw
 * @property {'raw'} type
 * @property {string} value
 *
 * @typedef {Object} Context
 * @property {TransformOptions} options
 * @property {Schema} schema
 * @property {number} listDepth
 *
 * @callback TransformLink
 * @param {string} href
 * @param {Array.<Comment|Element|Text>} children
 * @param {string?} title
 * @returns {string}
 *
 * @callback TransformImage
 * @param {string} src
 * @param {string} alt
 * @param {string?} title
 * @returns {string}
 *
 * @callback TransformLinkTarget
 * @param {string} href
 * @param {Array.<Comment|Element|Text>} children
 * @param {string?} title
 * @returns {string}
 *
 * @typedef {keyof IntrinsicElements} ReactMarkdownNames
 *
 * @typedef {{ [key: string]: unknown, className?: string }} ReactBaseProps
 *
 * To do: is `data-sourcepos` typeable?
 *
 * @typedef {Object} ReactMarkdownProps
 * @property {Element} node
 * @property {string} key
 * @property {ReactNode[]} children
 * @property {Position?} [sourcePosition] Passed when `options.rawSourcePos` is given
 * @property {number} [index] Passed when `options.includeElementIndex` is given
 * @property {number} [siblingCount] Passed when `options.includeElementIndex` is given
 *
 * @callback NormalComponent
 * @param {ReactBaseProps & ReactMarkdownProps} props
 * @returns {ReactNode}
 *
 * @callback CodeComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {inline?: boolean}} props
 * @returns {ReactNode}
 *
 * @callback HeadingComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {level: number}} props
 * @returns {ReactNode}
 *
 * @callback LiComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {checked: boolean|null, index: number, ordered: boolean}} props
 * @returns {ReactNode}
 *
 * @callback OrderedListComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {depth: number, ordered: true}} props
 * @returns {ReactNode}
 *
 * @callback TableCellComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {style?: Object.<string, unknown>, isHeader: boolean}} props
 * @returns {ReactNode}
 *
 * @callback TableRowComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {isHeader: boolean}} props
 * @returns {ReactNode}
 *
 * @callback UnorderedListComponent
 * @param {ReactBaseProps & ReactMarkdownProps & {depth: number, ordered: false}} props
 * @returns {ReactNode}
 *
 * @typedef {Object} SpecialComponents
 * @property {CodeComponent|ReactMarkdownNames} code
 * @property {HeadingComponent|ReactMarkdownNames} h1
 * @property {HeadingComponent|ReactMarkdownNames} h2
 * @property {HeadingComponent|ReactMarkdownNames} h3
 * @property {HeadingComponent|ReactMarkdownNames} h4
 * @property {HeadingComponent|ReactMarkdownNames} h5
 * @property {HeadingComponent|ReactMarkdownNames} h6
 * @property {LiComponent|ReactMarkdownNames} li
 * @property {OrderedListComponent|ReactMarkdownNames} ol
 * @property {TableCellComponent|ReactMarkdownNames} td
 * @property {TableCellComponent|ReactMarkdownNames} th
 * @property {TableRowComponent|ReactMarkdownNames} tr
 * @property {UnorderedListComponent|ReactMarkdownNames} ul
 *
 * @typedef {Record<Exclude<ReactMarkdownNames, keyof SpecialComponents>, NormalComponent|ReactMarkdownNames>} NormalComponents
 * @typedef {Partial<NormalComponents & SpecialComponents>} Components
 */

/**
 * @typedef {Object} TransformOptions
 * @property {boolean} [sourcePos=false]
 * @property {boolean} [rawSourcePos=false]
 * @property {boolean} [skipHtml=false]
 * @property {boolean} [includeElementIndex=false]
 * @property {false|TransformLink} [transformLinkUri]
 * @property {TransformImage} [transformImageUri]
 * @property {string|TransformLinkTarget} [linkTarget]
 * @property {Components} [components]
 */

const own$7 = {}.hasOwnProperty; // The table-related elements that must not contain whitespace text according
// to React.

const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr']);
/**
 * @param {Context} context
 * @param {Element|Root} node
 */

function childrenToReact(context, node) {
  /** @type {Array.<ReactNode>} */
  const children = [];
  let childIndex = -1;
  /** @type {Comment|Doctype|Element|Raw|Text} */

  let child;

  while (++childIndex < node.children.length) {
    child = node.children[childIndex];

    if (child.type === 'element') {
      children.push(toReact(context, child, childIndex, node));
    } else if (child.type === 'text') {
      // React does not permit whitespace text elements as children of table:
      // cf. https://github.com/remarkjs/react-markdown/issues/576
      if (node.type !== 'element' || !tableElements.has(node.tagName) || child.value !== '\n') {
        children.push(child.value);
      }
    } // @ts-ignore `raw` nodes are non-standard
    else if (child.type === 'raw' && !context.options.skipHtml) {
        // Default behavior is to show (encoded) HTML.
        // @ts-ignore `raw` nodes are non-standard
        children.push(child.value);
      }
  }

  return children;
}
/**
 * @param {Context} context
 * @param {Element} node
 * @param {number} index
 * @param {Element|Root} parent
 */


function toReact(context, node, index, parent) {
  const options = context.options;
  const parentSchema = context.schema;
  /** @type {ReactMarkdownNames} */
  // @ts-ignore assume a known HTML/SVG element.

  const name = node.tagName;
  /** @type {Object.<string, unknown>} */

  const properties = {};
  let schema = parentSchema;
  /** @type {string} */

  let property;

  if (parentSchema.space === 'html' && name === 'svg') {
    schema = svg_1;
    context.schema = schema;
  }

  for (property in node.properties) {
    /* istanbul ignore else - prototype polution. */
    if (own$7.call(node.properties, property)) {
      addProperty(properties, property, node.properties[property], context);
    }
  }

  if (name === 'ol' || name === 'ul') {
    context.listDepth++;
  }

  const children = childrenToReact(context, node);

  if (name === 'ol' || name === 'ul') {
    context.listDepth--;
  } // Restore parent schema.


  context.schema = parentSchema; // Nodes created by plugins do not have positional info, in which case we use
  // an object that matches the positon interface.

  const position = node.position || {
    start: {
      line: null,
      column: null,
      offset: null
    },
    end: {
      line: null,
      column: null,
      offset: null
    }
  };
  /** @type {NormalComponent|SpecialComponents[keyof SpecialComponents]|ReactMarkdownNames} */

  const component = options.components && own$7.call(options.components, name) ? options.components[name] : name;
  const basic = typeof component === 'string' || component === react.Fragment;

  if (!reactIs.isValidElementType(component)) {
    throw new TypeError(`Component for name \`${name}\` not defined or is not renderable`);
  }

  properties.key = [name, position.start.line, position.start.column, index].join('-');

  if (name === 'a' && options.linkTarget) {
    properties.target = typeof options.linkTarget === 'function' ? // @ts-ignore assume `href` is a string
    options.linkTarget(properties.href, node.children, properties.title) : options.linkTarget;
  }

  if (name === 'a' && options.transformLinkUri) {
    properties.href = options.transformLinkUri( // @ts-ignore assume `href` is a string
    properties.href, node.children, properties.title);
  }

  if (!basic && name === 'code' && parent.tagName !== 'pre') {
    properties.inline = true;
  }

  if (!basic && (name === 'h1' || name === 'h2' || name === 'h3' || name === 'h4' || name === 'h5' || name === 'h6')) {
    properties.level = parseInt(name.charAt(1), 10);
  }

  if (name === 'img' && options.transformImageUri) {
    properties.src = options.transformImageUri( // @ts-ignore assume `src` is a string
    properties.src, properties.alt, properties.title);
  }

  if (!basic && name === 'li') {
    const input = getInputElement(node);
    properties.checked = input ? Boolean(input.properties.checked) : null;
    properties.index = getElementsBeforeCount(parent, node);
    properties.ordered = parent.tagName === 'ol';
  }

  if (!basic && (name === 'ol' || name === 'ul')) {
    properties.ordered = name === 'ol';
    properties.depth = context.listDepth;
  }

  if (name === 'td' || name === 'th') {
    if (properties.align) {
      if (!properties.style) properties.style = {}; // @ts-ignore assume `style` is an object

      properties.style.textAlign = properties.align;
      delete properties.align;
    }

    if (!basic) {
      properties.isHeader = name === 'th';
    }
  }

  if (!basic && name === 'tr') {
    properties.isHeader = Boolean(parent.tagName === 'thead');
  } // If `sourcePos` is given, pass source information (line/column info from markdown source).


  if (options.sourcePos) {
    properties['data-sourcepos'] = flattenPosition(position);
  }

  if (!basic && options.rawSourcePos) {
    properties.sourcePosition = node.position;
  } // If `includeElementIndex` is given, pass node index info to components.


  if (!basic && options.includeElementIndex) {
    properties.index = getElementsBeforeCount(parent, node);
    properties.siblingCount = getElementsBeforeCount(parent);
  }

  if (!basic) {
    properties.node = node;
  } // Ensure no React warnings are emitted for void elements w/ children.


  return children.length > 0 ? react.createElement(component, properties, children) : react.createElement(component, properties);
}
/**
 * @param {Element|Root} node
 * @returns {Element?}
 */


function getInputElement(node) {
  let index = -1;

  while (++index < node.children.length) {
    const child = node.children[index];

    if (child.type === 'element' && child.tagName === 'input') {
      return child;
    }
  }

  return null;
}
/**
 * @param {Element|Root} parent
 * @param {Element} [node]
 * @returns {number}
 */


function getElementsBeforeCount(parent, node) {
  let index = -1;
  let count = 0;

  while (++index < parent.children.length) {
    if (parent.children[index] === node) break;
    if (parent.children[index].type === 'element') count++;
  }

  return count;
}
/**
 * @param {Object.<string, unknown>} props
 * @param {string} prop
 * @param {unknown} value
 * @param {Context} ctx
 */


function addProperty(props, prop, value, ctx) {
  /** @type {Info} */
  const info = find_1(ctx.schema, prop);
  let result = value; // Ignore nullish and `NaN` values.
  // eslint-disable-next-line no-self-compare

  if (result === null || result === undefined || result !== result) {
    return;
  } // Accept `array`.
  // Most props are space-separated.


  if (result && typeof result === 'object' && 'length' in result) {
    // type-coverage:ignore-next-line remove when typed.
    result = (info.commaSeparated ? commaSeparatedTokens : spaceSeparatedTokens).stringify(result);
  }

  if (info.property === 'style' && typeof result === 'string') {
    result = parseStyle(result);
  }

  if (info.space) {
    props[own$7.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
  } else {
    props[info.attribute] = result;
  }
}
/**
 * @param {string} value
 * @returns {Object.<string, string>}
 */


function parseStyle(value) {
  /** @type {Object.<string, string>} */
  const result = {};

  try {
    styleToObject(value, iterator);
  } catch (
  /** @type {Error} */
  _) {// Silent.
  }

  return result;
  /**
   * @param {string} name
   * @param {string} v
   */

  function iterator(name, v) {
    const k = name.slice(0, 4) === '-ms-' ? `ms-${name.slice(4)}` : name;
    result[k.replace(/-([a-z])/g, styleReplacer)] = v;
  }
}
/**
 * @param {unknown} _
 * @param {string} $1
 */


function styleReplacer(_, $1) {
  return $1.toUpperCase();
}
/**
 * @param {Position} pos
 * @returns {string}
 */


function flattenPosition(pos) {
  return [pos.start.line, ':', pos.start.column, '-', pos.end.line, ':', pos.end.column].map(d => String(d)).join('');
}

var astToReact = {
	hastToReact: hastToReact_1,
	hastChildrenToReact: hastChildrenToReact
};

// @ts-ignore remove when typed








const childrenToReact$1 = astToReact.hastChildrenToReact;
/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('react').ReactElement<{}>} ReactElement
 * @typedef {import('unified').PluggableList} PluggableList
 * @typedef {import('hast').Root} Root
 * @typedef {import('./rehype-filter.js').RehypeFilterOptions} FilterOptions
 * @typedef {import('./ast-to-react.js').TransformOptions} TransformOptions
 *
 * @typedef {Object} CoreOptions
 * @property {string} children
 *
 * @typedef {Object} PluginOptions
 * @property {PluggableList} [plugins=[]] **deprecated**: use `remarkPlugins` instead
 * @property {PluggableList} [remarkPlugins=[]]
 * @property {PluggableList} [rehypePlugins=[]]
 *
 * @typedef {Object} LayoutOptions
 * @property {string} [className]
 *
 * @typedef {CoreOptions & PluginOptions & LayoutOptions & FilterOptions & TransformOptions} ReactMarkdownOptions
 */


var reactMarkdown = ReactMarkdown;
const own$8 = {}.hasOwnProperty;
const changelog = 'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';
/**
 * @typedef {Object} Deprecation
 * @property {string} id
 * @property {string} [to]
 */

/**
 * @type {Object.<string, Deprecation>}
 */

const deprecated = {
  renderers: {
    to: 'components',
    id: 'change-renderers-to-components'
  },
  astPlugins: {
    id: 'remove-buggy-html-in-markdown-parser'
  },
  allowDangerousHtml: {
    id: 'remove-buggy-html-in-markdown-parser'
  },
  escapeHtml: {
    id: 'remove-buggy-html-in-markdown-parser'
  },
  source: {
    to: 'children',
    id: 'change-source-to-children'
  },
  allowNode: {
    to: 'allowElement',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  allowedTypes: {
    to: 'allowedElements',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  disallowedTypes: {
    to: 'disallowedElements',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes'
  },
  includeNodeIndex: {
    to: 'includeElementIndex',
    id: 'change-includenodeindex-to-includeelementindex'
  }
};
/**
 * @param {ReactMarkdownOptions} options
 * @returns {ReactElement}
 */

function ReactMarkdown(options) {
  for (const key in deprecated) {
    if (own$8.call(deprecated, key) && own$8.call(options, key)) {
      /** @type {Deprecation} */
      const deprecation = deprecated[key];
      console.warn(`[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : 'remove'} \`${key}\` (see <${changelog}#${deprecation.id}> for more info)`);
      delete deprecated[key];
    }
  }

  const processor = unified_1().use(remarkParse) // TODO: deprecate `plugins` in v7.0.0.
  .use(options.remarkPlugins || options.plugins || []).use(remarkRehype, {
    allowDangerousHtml: true
  }).use(options.rehypePlugins || []).use(rehypeFilter_1, options);
  /** @type {vfile} */

  let file;

  if (typeof options.children === 'string') {
    file = vfile(options.children);
  } else {
    if (options.children !== undefined && options.children !== null) {
      console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`);
    }

    file = vfile();
  }
  /** @type {Root} */
  // @ts-ignore we’ll throw if it isn’t a root next.


  const hastNode = processor.runSync(processor.parse(file), file);

  if (hastNode.type !== 'root') {
    throw new TypeError('Expected a `root` node');
  }
  /** @type {ReactElement} */


  let result = react.createElement(react.Fragment, {}, childrenToReact$1({
    options: options,
    schema: html_1$1,
    listDepth: 0
  }, hastNode));

  if (options.className) {
    result = react.createElement('div', {
      className: options.className
    }, result);
  }

  return result;
}

ReactMarkdown.defaultProps = {
  transformLinkUri: uriTransformer_1
};
ReactMarkdown.propTypes = {
  // Core options:
  children: propTypes.string,
  // Layout options:
  className: propTypes.string,
  // Filter options:
  allowElement: propTypes.func,
  allowedElements: propTypes.arrayOf(propTypes.string),
  disallowedElements: propTypes.arrayOf(propTypes.string),
  unwrapDisallowed: propTypes.bool,
  // Plugin options:
  // type-coverage:ignore-next-line
  remarkPlugins: propTypes.arrayOf(propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.arrayOf(propTypes.oneOfType([propTypes.object, propTypes.func]))])),
  // type-coverage:ignore-next-line
  rehypePlugins: propTypes.arrayOf(propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.arrayOf(propTypes.oneOfType([propTypes.object, propTypes.func]))])),
  // Transform options:
  sourcePos: propTypes.bool,
  rawSourcePos: propTypes.bool,
  skipHtml: propTypes.bool,
  includeElementIndex: propTypes.bool,
  transformLinkUri: propTypes.oneOfType([propTypes.func, propTypes.bool]),
  linkTarget: propTypes.oneOfType([propTypes.func, propTypes.string]),
  transformImageUri: propTypes.func,
  components: propTypes.object
};
ReactMarkdown.uriTransformer = uriTransformer_1;

export default reactMarkdown;
