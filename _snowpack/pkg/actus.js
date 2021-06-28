import { g as getDefaultExportFromNamespaceIfNotNamed, c as createCommonjsModule, a as commonjsGlobal } from './common/_commonjsHelpers-0597c316.js';

var isPromise_1 = isPromise;
var _default = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
isPromise_1.default = _default;

var indentString = (string, count = 1, options) => {
  options = {
    indent: ' ',
    includeEmptyLines: false,
    ...options
  };

  if (typeof string !== 'string') {
    throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
  }

  if (typeof count !== 'number') {
    throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
  }

  if (typeof options.indent !== 'string') {
    throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``);
  }

  if (count === 0) {
    return string;
  }

  const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return string.replace(regex, options.indent.repeat(count));
};

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _nodeResolve_empty
});

var os = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(_nodeResolve_empty$1);

const extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir = typeof os.homedir === 'undefined' ? '' : os.homedir();

var cleanStack = (stack, options) => {
  options = Object.assign({
    pretty: false
  }, options);
  return stack.replace(/\\/g, '/').split('\n').filter(line => {
    const pathMatches = line.match(extractPathRegex);

    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }

    const match = pathMatches[1]; // Electron

    if (match.includes('.app/Contents/Resources/electron.asar') || match.includes('.app/Contents/Resources/default_app.asar')) {
      return false;
    }

    return !pathRegex.test(match);
  }).filter(line => line.trim() !== '').map(line => {
    if (options.pretty) {
      return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, '~')));
    }

    return line;
  }).join('\n');
};

const cleanInternalStack = stack => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, '');

class AggregateError extends Error {
  constructor(errors) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
    }

    errors = [...errors].map(error => {
      if (error instanceof Error) {
        return error;
      }

      if (error !== null && typeof error === 'object') {
        // Handle plain error objects with message property and/or possibly other metadata
        return Object.assign(new Error(error.message), error);
      }

      return new Error(error);
    });
    let message = errors.map(error => {
      // The `stack` property is not standardized, so we can't assume it exists
      return typeof error.stack === 'string' ? cleanInternalStack(cleanStack(error.stack)) : String(error);
    }).join('\n');
    message = '\n' + indentString(message, 4);
    super(message);
    this.name = 'AggregateError';
    Object.defineProperty(this, '_errors', {
      value: errors
    });
  }

  *[Symbol.iterator]() {
    for (const error of this._errors) {
      yield error;
    }
  }

}

var aggregateError = AggregateError;

function n(n) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}

function t(n) {
  return !!n && !!n[Q];
}

function r(n) {
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var t = Object.getPrototypeOf(n);
    if (null === t) return !0;
    var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
    return r === Object || "function" == typeof r && Function.toString.call(r) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!n.constructor[L] || s(n) || v(n));
}

function i(n, t, r) {
  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : nn)(n).forEach(function (e) {
    r && "symbol" == typeof e || t(e, n[e], n);
  }) : n.forEach(function (r, e) {
    return t(e, r, n);
  });
}

function o(n) {
  var t = n[Q];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}

function u(n, t) {
  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
}

function a(n, t) {
  return 2 === o(n) ? n.get(t) : n[t];
}

function f(n, t, r) {
  var e = o(n);
  2 === e ? n.set(t, r) : 3 === e ? (n.delete(t), n.add(r)) : n[t] = r;
}

function c(n, t) {
  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
}

function s(n) {
  return X && n instanceof Map;
}

function v(n) {
  return q && n instanceof Set;
}

function p(n) {
  return n.o || n.t;
}

function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var t = tn(n);
  delete t[Q];

  for (var r = nn(t), e = 0; e < r.length; e++) {
    var i = r[e],
        o = t[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }

  return Object.create(Object.getPrototypeOf(n), t);
}

function d(n, e) {
  return void 0 === e && (e = !1), y(n) || t(n) || !r(n) ? n : (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, function (n, t) {
    return d(t, !0);
  }, !0), n);
}

function h() {
  n(2);
}

function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}

function b(t) {
  var r = rn[t];
  return r || n(18, t), r;
}

function _() {
  return U;
}

function j(n, t) {
  t && (b("Patches"), n.u = [], n.s = [], n.v = t);
}

function O(n) {
  g(n), n.p.forEach(S), n.p = null;
}

function g(n) {
  n === U && (U = n.l);
}

function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}

function S(n) {
  var t = n[Q];
  0 === t.i || 1 === t.i ? t.j() : t.O = !0;
}

function P(t, e) {
  e._ = e.p.length;
  var i = e.p[0],
      o = void 0 !== t && t !== i;
  return e.h.g || b("ES5").S(e, t, o), o ? (i[Q].P && (O(e), n(4)), r(t) && (t = M(e, t), e.l || x(e, t)), e.u && b("Patches").M(i[Q], t, e.u, e.s)) : t = M(e, i, []), O(e), e.u && e.v(e.u, e.s), t !== H ? t : void 0;
}

function M(n, t, r) {
  if (y(t)) return t;
  var e = t[Q];
  if (!e) return i(t, function (i, o) {
    return A(n, e, t, i, o, r);
  }, !0), t;
  if (e.A !== n) return t;
  if (!e.P) return x(n, e.t, !0), e.t;

  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o) : o, function (t, i) {
      return A(n, e, o, t, i, r);
    }), x(n, o, !1), r && n.u && b("Patches").R(e, r, n.u, n.s);
  }

  return e.o;
}

function A(e, i, o, a, c, s) {
  if (t(c)) {
    var v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
    if (f(o, a, v), !t(v)) return;
    e.m = !1;
  }

  if (r(c) && !y(c)) {
    if (!e.h.F && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}

function x(n, t, r) {
  void 0 === r && (r = !1), n.h.F && n.m && d(t, r);
}

function z(n, t) {
  var r = n[Q];
  return (r ? p(r) : n)[t];
}

function I(n, t) {
  if (t in n) for (var r = Object.getPrototypeOf(n); r;) {
    var e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = Object.getPrototypeOf(r);
  }
}

function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}

function E(n) {
  n.o || (n.o = l(n.t));
}

function R(n, t, r) {
  var e = s(t) ? b("MapSet").N(t, r) : v(t) ? b("MapSet").T(t, r) : n.g ? function (n, t) {
    var r = Array.isArray(n),
        e = {
      i: r ? 1 : 0,
      A: t ? t.A : _(),
      P: !1,
      I: !1,
      D: {},
      l: t,
      t: n,
      k: null,
      o: null,
      j: null,
      C: !1
    },
        i = e,
        o = en;
    r && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
        a = u.revoke,
        f = u.proxy;
    return e.k = f, e.j = a, f;
  }(t, r) : b("ES5").J(t, r);
  return (r ? r.A : _()).p.push(e), e;
}

function D(e) {
  return t(e) || n(22, e), function n(t) {
    if (!r(t)) return t;
    var e,
        u = t[Q],
        c = o(t);

    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = F(t, c), u.I = !1;
    } else e = F(t, c);

    return i(e, function (t, r) {
      u && a(u.t, t) === r || f(e, t, n(r));
    }), 3 === c ? new Set(e) : e;
  }(e);
}

function F(n, t) {
  switch (t) {
    case 2:
      return new Map(n);

    case 3:
      return Array.from(n);
  }

  return l(n);
}

var G,
    U,
    W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
    X = "undefined" != typeof Map,
    q = "undefined" != typeof Set,
    B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
    H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
    L = W ? Symbol.for("immer-draftable") : "__$immer_draftable",
    Q = W ? Symbol.for("immer-state") : "__$immer_state",
    Z = "" + Object.prototype.constructor,
    nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
} : Object.getOwnPropertyNames,
    tn = Object.getOwnPropertyDescriptors || function (n) {
  var t = {};
  return nn(n).forEach(function (r) {
    t[r] = Object.getOwnPropertyDescriptor(n, r);
  }), t;
},
    rn = {},
    en = {
  get: function (n, t) {
    if (t === Q) return n;
    var e = p(n);
    if (!u(e, t)) return function (n, t, r) {
      var e,
          i = I(t, r);
      return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
    }(n, e, t);
    var i = e[t];
    return n.I || !r(i) ? i : i === z(n.t, t) ? (E(n), n.o[t] = R(n.A.h, i, n)) : i;
  },
  has: function (n, t) {
    return t in p(n);
  },
  ownKeys: function (n) {
    return Reflect.ownKeys(p(n));
  },
  set: function (n, t, r) {
    var e = I(p(n), t);
    if (null == e ? void 0 : e.set) return e.set.call(n.k, r), !0;

    if (!n.P) {
      var i = z(p(n), t),
          o = null == i ? void 0 : i[Q];
      if (o && o.t === r) return n.o[t] = r, n.D[t] = !1, !0;
      if (c(r, i) && (void 0 !== r || u(n.t, t))) return !0;
      E(n), k(n);
    }

    return n.o[t] === r && "number" != typeof r || (n.o[t] = r, n.D[t] = !0, !0);
  },
  deleteProperty: function (n, t) {
    return void 0 !== z(n.t, t) || t in n.t ? (n.D[t] = !1, E(n), k(n)) : delete n.D[t], n.o && delete n.o[t], !0;
  },
  getOwnPropertyDescriptor: function (n, t) {
    var r = p(n),
        e = Reflect.getOwnPropertyDescriptor(r, t);
    return e ? {
      writable: !0,
      configurable: 1 !== n.i || "length" !== t,
      enumerable: e.enumerable,
      value: r[t]
    } : e;
  },
  defineProperty: function () {
    n(11);
  },
  getPrototypeOf: function (n) {
    return Object.getPrototypeOf(n.t);
  },
  setPrototypeOf: function () {
    n(12);
  }
},
    on = {};

i(en, function (n, t) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), on.deleteProperty = function (t, r) {
  return en.deleteProperty.call(this, t[0], r);
}, on.set = function (t, r, e) {
  return en.set.call(this, t[0], r, e, t[0]);
};

var un = function () {
  function e(t) {
    var e = this;
    this.g = B, this.F = !0, this.produce = function (t, i, o) {
      if ("function" == typeof t && "function" != typeof i) {
        var u = i;
        i = t;
        var a = e;
        return function (n) {
          var t = this;
          void 0 === n && (n = u);

          for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

          return a.produce(n, function (n) {
            var r;
            return (r = i).call.apply(r, [t, n].concat(e));
          });
        };
      }

      var f;

      if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), r(t)) {
        var c = w(e),
            s = R(e, t, void 0),
            v = !0;

        try {
          f = i(s), v = !1;
        } finally {
          v ? O(c) : g(c);
        }

        return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
          return j(c, o), P(n, c);
        }, function (n) {
          throw O(c), n;
        }) : (j(c, o), P(f, c));
      }

      if (!t || "object" != typeof t) {
        if ((f = i(t)) === H) return;
        return void 0 === f && (f = t), e.F && d(f, !0), f;
      }

      n(21, t);
    }, this.produceWithPatches = function (n, t) {
      return "function" == typeof n ? function (t) {
        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];

        return e.produceWithPatches(t, function (t) {
          return n.apply(void 0, [t].concat(i));
        });
      } : [e.produce(n, t, function (n, t) {
        r = n, i = t;
      }), r, i];
      var r, i;
    }, "boolean" == typeof (null == t ? void 0 : t.useProxies) && this.setUseProxies(t.useProxies), "boolean" == typeof (null == t ? void 0 : t.autoFreeze) && this.setAutoFreeze(t.autoFreeze);
  }

  var i = e.prototype;
  return i.createDraft = function (e) {
    r(e) || n(8), t(e) && (e = D(e));
    var i = w(this),
        o = R(this, e, void 0);
    return o[Q].C = !0, g(i), o;
  }, i.finishDraft = function (t, r) {
    var e = t && t[Q];
    var i = e.A;
    return j(i, r), P(void 0, i);
  }, i.setAutoFreeze = function (n) {
    this.F = n;
  }, i.setUseProxies = function (t) {
    t && !B && n(20), this.g = t;
  }, i.applyPatches = function (n, r) {
    var e;

    for (e = r.length - 1; e >= 0; e--) {
      var i = r[e];

      if (0 === i.path.length && "replace" === i.op) {
        n = i.value;
        break;
      }
    }

    var o = b("Patches").$;
    return t(n) ? o(n, r) : this.produce(n, function (n) {
      return o(n, r.slice(e + 1));
    });
  }, e;
}(),
    an = new un(),
    fn = an.produce,
    cn = an.produceWithPatches.bind(an),
    sn = an.setAutoFreeze.bind(an),
    vn = an.setUseProxies.bind(an),
    pn = an.applyPatches.bind(an),
    ln = an.createDraft.bind(an),
    dn = an.finishDraft.bind(an);

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

var _isPlaceholder_1 = _isPlaceholder;

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder_1(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

var _curry1_1 = _curry1;

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder_1(a) ? f2 : _curry1_1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f2 : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

var _curry2_1 = _curry2;

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder_1(a) ? f3 : _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f3 : _isPlaceholder_1(a) ? _curry2_1(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder_1(b) ? _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1_1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) && _isPlaceholder_1(c) ? f3 : _isPlaceholder_1(a) && _isPlaceholder_1(b) ? _curry2_1(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder_1(a) && _isPlaceholder_1(c) ? _curry2_1(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder_1(b) && _isPlaceholder_1(c) ? _curry2_1(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder_1(c) ? _curry1_1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

var _curry3_1 = _curry3;

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

var _isObject_1 = _isObject;

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var _has_1 = _has;

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3_1(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has_1(k, l)) {
      result[k] = _has_1(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has_1(k, r) && !_has_1(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

var mergeWithKey_1 = mergeWithKey;

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3_1(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey_1(function (k, lVal, rVal) {
    if (_isObject_1(lVal) && _isObject_1(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

var mergeDeepWithKey_1 = mergeDeepWithKey;

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2_1(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey_1(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

var mergeDeepRight_1 = mergeDeepRight;

function getSlice(object, path) {
  return path.reduce((accumulator, property) => accumulator === undefined || accumulator === null ? undefined : accumulator[property], object);
}

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
var _isInteger = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3_1(function assoc(prop, val, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
});

var assoc_1 = assoc;

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1_1(function isNil(x) {
  return x == null;
});

var isNil_1 = isNil;

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3_1(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !isNil_1(obj) && _has_1(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc_1(idx, val, obj);
  }
});

var assocPath_1 = assocPath;

function setSlice(object, path, slice) {
  return assocPath_1(path, slice, object);
}

function getGlobalLoading(loading) {
  return Object.values(loading).some(value => typeof value === "boolean" ? value : getGlobalLoading(value));
}

function hasErrors(errors) {
  return !Object.values(errors).every(value => value === undefined);
}

const defaultConfig = {
  actions: {
    setLoading: ({
      state,
      payload
    }) => {
      const {
        actionPath,
        actionPayload
      } = payload;

      function getNewActionErrors() {
        const newActionErrors = { ...getSlice(state.errors, actionPath),
          [typeof actionPayload === "object" ? JSON.stringify(actionPayload) : actionPayload]: undefined
        };
        return hasErrors(newActionErrors) ? newActionErrors : undefined;
      }

      return { ...state,
        loading: setSlice({ ...state.loading,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          global: true
        }, actionPath, actionPayload === undefined ? true : { ...getSlice(state.loading, actionPath),
          [typeof actionPayload === "object" ? JSON.stringify(actionPayload) : actionPayload]: true
        }),
        ...(getSlice(state.errors, actionPath) === undefined ? {} : {
          errors: setSlice(state.errors, actionPath, actionPayload === undefined ? undefined : getNewActionErrors())
        })
      };
    },
    unsetLoading: ({
      state,
      payload
    }) => {
      const {
        actionPath,
        actionPayload
      } = payload;

      function getNewActionLoadingStates() {
        const newActionLoadingState = { ...getSlice(state.loading, actionPath),
          [typeof actionPayload === "object" ? JSON.stringify(actionPayload) : actionPayload]: false
        };
        return getGlobalLoading(newActionLoadingState) === false ? false : newActionLoadingState;
      }

      const loading = setSlice({ ...state.loading,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        global: false
      }, actionPath, actionPayload === undefined ? false : getNewActionLoadingStates());
      return { ...state,
        loading: { ...loading,
          global: getGlobalLoading(loading)
        }
      };
    },
    handleError: ({
      state,
      payload
    }) => {
      const {
        actionPath,
        actionPayload,
        error
      } = payload;
      return { ...state,
        errors: setSlice(state.errors, actionPath, actionPayload === undefined ? error : { ...getSlice(state.errors, actionPath),
          [typeof actionPayload === "object" ? JSON.stringify(actionPayload) : actionPayload]: error
        })
      };
    }
  }
};

var deepFreeze = function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
};

function freeze({
  isEnabled = "production" !== "production"
} = {}) {
  if (isEnabled) {
    return {
      name: "freeze",
      subscribers: [function freezeState({
        state
      }) {
        if (!Object.isFrozen(state)) {
          deepFreeze(state);
        }
      }]
    };
  }

  return {
    name: "freeze"
  };
}

var utils = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(exports);
  }
})(commonjsGlobal, function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var isDate = exports.isDate = function isDate(d) {
    return d instanceof Date;
  };

  var isEmpty = exports.isEmpty = function isEmpty(o) {
    return Object.keys(o).length === 0;
  };

  var isObject = exports.isObject = function isObject(o) {
    return o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
  };

  var properObject = exports.properObject = function properObject(o) {
    return isObject(o) && !o.hasOwnProperty ? _extends({}, o) : o;
  };
});
});

var diff = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
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

  var diff = function diff(lhs, rhs) {
    if (lhs === rhs) return {}; // equal return no diff

    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs; // return updated rhs

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);
    var deletedValues = Object.keys(l).reduce(function (acc, key) {
      return r.hasOwnProperty(key) ? acc : _extends({}, acc, _defineProperty({}, key, undefined));
    }, {});

    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
      if (l.valueOf() == r.valueOf()) return {};
      return r;
    }

    return Object.keys(r).reduce(function (acc, key) {
      if (!l.hasOwnProperty(key)) return _extends({}, acc, _defineProperty({}, key, r[key])); // return added r key

      var difference = diff(l[key], r[key]);
      if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc; // return no diff

      return _extends({}, acc, _defineProperty({}, key, difference)); // return updated key
    }, deletedValues);
  };

  exports.default = diff;
  module.exports = exports['default'];
});
});

var added = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
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

  var addedDiff = function addedDiff(lhs, rhs) {
    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};
    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);
    return Object.keys(r).reduce(function (acc, key) {
      if (l.hasOwnProperty(key)) {
        var difference = addedDiff(l[key], r[key]);
        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;
        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return _extends({}, acc, _defineProperty({}, key, r[key]));
    }, {});
  };

  exports.default = addedDiff;
  module.exports = exports['default'];
});
});

var deleted = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
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

  var deletedDiff = function deletedDiff(lhs, rhs) {
    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};
    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);
    return Object.keys(l).reduce(function (acc, key) {
      if (r.hasOwnProperty(key)) {
        var difference = deletedDiff(l[key], r[key]);
        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;
        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return _extends({}, acc, _defineProperty({}, key, undefined));
    }, {});
  };

  exports.default = deletedDiff;
  module.exports = exports['default'];
});
});

var updated = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
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

  var updatedDiff = function updatedDiff(lhs, rhs) {
    if (lhs === rhs) return {};
    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs;
    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
      if (l.valueOf() == r.valueOf()) return {};
      return r;
    }

    return Object.keys(r).reduce(function (acc, key) {
      if (l.hasOwnProperty(key)) {
        var difference = updatedDiff(l[key], r[key]);
        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc;
        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return acc;
    }, {});
  };

  exports.default = updatedDiff;
  module.exports = exports['default'];
});
});

var detailed = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, added, deleted, updated);
  }
})(commonjsGlobal, function (module, exports, _added, _deleted, _updated) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _added2 = _interopRequireDefault(_added);

  var _deleted2 = _interopRequireDefault(_deleted);

  var _updated2 = _interopRequireDefault(_updated);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var detailedDiff = function detailedDiff(lhs, rhs) {
    return {
      added: (0, _added2.default)(lhs, rhs),
      deleted: (0, _deleted2.default)(lhs, rhs),
      updated: (0, _updated2.default)(lhs, rhs)
    };
  };

  exports.default = detailedDiff;
  module.exports = exports['default'];
});
});

var dist = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(exports, diff, added, deleted, updated, detailed);
  }
})(commonjsGlobal, function (exports, _diff, _added, _deleted, _updated, _detailed) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.detailedDiff = exports.updatedDiff = exports.deletedDiff = exports.diff = exports.addedDiff = undefined;

  var _diff2 = _interopRequireDefault(_diff);

  var _added2 = _interopRequireDefault(_added);

  var _deleted2 = _interopRequireDefault(_deleted);

  var _updated2 = _interopRequireDefault(_updated);

  var _detailed2 = _interopRequireDefault(_detailed);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.addedDiff = _added2.default;
  exports.diff = _diff2.default;
  exports.deletedDiff = _deleted2.default;
  exports.updatedDiff = _updated2.default;
  exports.detailedDiff = _detailed2.default;
});
});

/* eslint-disable no-console */
function makeLogger({
  name
} = {}) {
  // eslint-disable-next-line fp/no-let, init-declarations
  let previousState;
  return function logAction({
    state,
    actionName,
    payload
  }) {
    const prettyActionName = Array.isArray(actionName) ? actionName.join(".") : actionName;

    if (name === undefined) {
      console.groupCollapsed(`%caction %c${prettyActionName}`, "color: gray; font-weight: lighter;", "font-weight: bold;");
    } else {
      console.groupCollapsed(`%c${name} %caction %c${prettyActionName}`, "font-weight: bold;", "color: gray; font-weight: lighter;", "font-weight: bold;");
    }

    console.log("%cprev state", "color: #9E9E9E; font-weight: bold;", previousState);
    console.log("%cpayload", "color: #03A9F4; font-weight: bold;", payload);
    console.log("%cnext state", "color: #4CAF50; font-weight: bold;", state);
    console.log("%cdiff", "color: #E8A400; font-weight: bold;", dist.diff(previousState, state));
    console.groupEnd(); // eslint-disable-next-line fp/no-mutation

    previousState = state;
  };
}

function logger({
  name,
  isEnabled = "production" === "development"
} = {}) {
  if (isEnabled) {
    return {
      name: "logger",
      subscribers: [makeLogger({
        name
      })]
    };
  }

  return {
    name: "logger"
  };
}

/* global window */

function reduxDevTools({
  name = undefined
} = {}) {
  if (typeof window === "undefined" || window.__REDUX_DEVTOOLS_EXTENSION__ === undefined) {
    return {
      name: "reduxDevTools"
    };
  }

  return {
    name: "reduxDevTools",
    actions: {
      setStateFromDevTools: ({
        payload
      }) => payload
    },
    subscribers: [function makeReduxDevtoolsSubscriber() {
      /* eslint-disable fp/no-let, init-declarations */
      let initialState;
      let currentState;
      let devTools;
      /* eslint-enable fp/no-let, init-declarations */

      function parse(value) {
        try {
          return JSON.parse(value);
        } catch (error) {
          devTools.error(`Invalid JSON: ${value}`);
          throw error;
        }
      }

      return function send({
        state,
        actionName,
        payload,
        actions
      }) {
        // eslint-disable-next-line fp/no-mutation
        currentState = state;

        if (devTools === undefined) {
          // eslint-disable-next-line fp/no-mutation
          initialState = state; // eslint-disable-next-line fp/no-mutation

          devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            name,
            actionCreators: actions,
            actionsBlacklist: ["setStateFromDevTools"],
            features: {
              /* eslint-disable @typescript-eslint/naming-convention */
              pause: true,
              // start/pause recording of dispatched actions
              lock: false,
              // lock/unlock dispatching actions and side effects
              persist: false,
              // persist states on page reloading
              export: false,
              // export history of actions in a file
              import: false,
              // import history of actions from a file
              jump: true,
              // jump back and forth (time travelling)
              skip: false,
              // skip (cancel) actions
              reorder: false,
              // drag and drop actions in the history list
              dispatch: true,
              // dispatch custom actions or action creators
              test: false // generate tests for the selected actions

              /* eslint-enable */

            }
          }); // eslint-disable-next-line max-statements, complexity

          devTools.subscribe(function handleMessage(message) {
            if (message.type === "ACTION") {
              const parsedPayload = typeof message.payload === "string" ? parse(message.payload) : message.payload;

              if (parsedPayload.name === undefined) {
                devTools.error(`Invalid action: ${message.payload}.
                    Example: { "name": "foo.bar", "args": ["{ \\"baz\\": \\"qux\\" }"] }`);
                return;
              }

              const action = getSlice(actions, parsedPayload.name.split("."));

              if (typeof action === "function") {
                action(Array.isArray(parsedPayload.args) && parsedPayload.args.length === 0 ? undefined : parse(parsedPayload.args[0]));
                return;
              }

              devTools.error(`Unknown action: ${parsedPayload.name}`);
              return;
            }

            if (message.type === "DISPATCH") {
              // eslint-disable-next-line default-case
              switch (message.payload.type) {
                case "RESET":
                  actions.setStateFromDevTools(initialState);
                  devTools.init(initialState);
                  return;

                case "COMMIT":
                  devTools.init(currentState);
                  return;

                case "ROLLBACK":
                  {
                    const commitedState = parse(message.state);
                    actions.setStateFromDevTools(commitedState);
                    devTools.init(commitedState);
                    return;
                  }

                case "JUMP_TO_STATE":
                case "JUMP_TO_ACTION":
                  actions.setStateFromDevTools(parse(message.state));
              }
            }
          });
          devTools.init(state);
          return;
        }

        const type = Array.isArray(actionName) ? actionName.join(".") : actionName;
        devTools.send({
          type,
          payload
        }, state);
      };
    }()]
  };
}

function castToString(value) {
  return value === undefined || value === null ? "" : String(value);
}

function castToArray(value) {
  return value === undefined || value === null ? [] : Array.from(value);
}

function makeDefaultActions(initialState) {
  const defaultActions = {
    number: {
      set: ({
        payload
      }) => Number(payload),
      reset: () => initialState,
      increment: ({
        state
      }) => state + 1,
      decrement: ({
        state
      }) => state - 1
    },
    boolean: {
      set: ({
        payload
      }) => Boolean(payload),
      reset: () => initialState,
      on: () => true,
      off: () => false,
      toggle: ({
        state
      }) => !state
    },
    string: {
      set: ({
        payload
      }) => castToString(payload),
      reset: () => initialState,
      clear: () => "",
      concat: ({
        state,
        payload
      }) => state + castToString(payload)
    },
    object: {
      set: ({
        payload
      }) => payload,
      reset: () => initialState,
      clear: () => ({}),
      merge: ({
        state,
        payload
      }) => ({ ...state,
        ...payload
      }),
      mergeDeep: ({
        state,
        payload
      }) => mergeDeepRight_1(state, payload),
      remove: ({
        state,
        payload: propertyName
      }) => {
        const {
          [propertyName]: ignore,
          ...rest
        } = state;
        return rest;
      }
    },
    array: {
      set: ({
        payload
      }) => castToArray(payload),
      reset: () => initialState,
      clear: () => [],
      append: ({
        state,
        payload
      }) => [...state, payload],
      prepend: ({
        state,
        payload
      }) => [payload, ...state],
      concat: ({
        state,
        payload
      }) => [...state, ...castToArray(payload)]
    }
  };

  if (initialState === null) {
    return {};
  }

  const type = Array.isArray(initialState) ? "array" : typeof initialState;

  if (defaultActions[type] === undefined) {
    return {};
  }

  return type === "object" ? { ...defaultActions[type],
    ...Object.fromEntries(Object.entries(initialState).map(([key, value]) => [key, makeDefaultActions(value)]).filter(([, value]) => Object.keys(value).length > 0))
  } : defaultActions[type];
}

function defaultActions(initialState) {
  return {
    name: "defaultActions",
    actions: makeDefaultActions(initialState)
  };
}

function isEmptyObject(value) {
  return typeof value === "object" && Object.keys(value).length === 0;
}

function mergeStates(left, right) {
  if (typeof left === "object" && typeof right === "object") {
    return mergeDeepRight_1(left, right);
  }

  return left !== undefined && (right === undefined || isEmptyObject(right)) ? left : right;
}

function getActionsWithNextStateGetter(actions = {}, getNextState = (previousState, actionResult) => actionResult) {
  return Object.fromEntries(Object.entries(actions).map(([actionName, action]) => [actionName, typeof action === "function" ? [action, getNextState] : getActionsWithNextStateGetter(action, getNextState)]));
}

function mergeConfigs(config) {
  const configs = Array.isArray(config) ? config : [config];
  const isLoggerEnabled = configs.filter(Boolean).some(({
    name
  }) => name === "logger");
  const isReduxDevToolsEnabled = configs.filter(Boolean).some(({
    name
  }) => name === "reduxDevTools");
  const isDefaultActionsEnabled = configs.filter(Boolean).some(({
    name
  }) => name === "defaultActions");
  const initialState = configs.filter(Boolean).map(({
    state
  }) => state).reduce(mergeStates);
  const configsWithDefaultPlugins = [defaultConfig, !isLoggerEnabled && logger(), !isReduxDevToolsEnabled && reduxDevTools(), !isDefaultActionsEnabled && defaultActions(initialState), freeze(), ...configs];
  return configsWithDefaultPlugins.filter(Boolean).reduce(function mergeConfig(accumulator, currentConfig) {
    return {
      state: mergeStates(accumulator.state, currentConfig.state),
      actions: mergeDeepRight_1(accumulator.actions, getActionsWithNextStateGetter(currentConfig.actions, currentConfig.getNextState) || {}),
      subscribers: [...(accumulator.subscribers || []), ...(currentConfig.subscribers || [])]
    };
  }, {
    state: {},
    actions: {},
    subscribers: []
  });
}

function actus(config) {
  const {
    state,
    actions,
    subscribers
  } = mergeConfigs(config); // eslint-disable-next-line fp/no-let

  let currentState = state; // eslint-disable-next-line fp/no-let, init-declarations

  let shouldNotifySubscribers; // eslint-disable-next-line fp/no-let, init-declarations, prefer-const

  let boundActions;

  function notifySubscribers({
    actionName,
    payload
  } = {}) {
    // eslint-disable-next-line fp/no-mutation
    shouldNotifySubscribers = true; // eslint-disable-next-line fp/no-let

    let errors = [];
    subscribers.every(function notifySubscriber(subscriber) {
      try {
        subscriber({
          state: currentState,
          actions: boundActions,
          actionName,
          payload
        });
      } catch (error) {
        // eslint-disable-next-line fp/no-mutation
        errors = [...errors, error];
      }

      return shouldNotifySubscribers;
    }); // eslint-disable-next-line fp/no-mutation

    shouldNotifySubscribers = false;

    if (errors.length > 0) {
      if (errors.length === 1) {
        throw errors[0];
      }

      throw new aggregateError(errors);
    }
  } // eslint-disable-next-line sonarjs/cognitive-complexity


  function bindActions(unboundActions, path = []) {
    return Object.fromEntries(Object.entries(unboundActions).map(function bindAction([actionName, actionWithNextStateGetter]) {
      if (Array.isArray(actionWithNextStateGetter)) {
        const [action, getNextState] = actionWithNextStateGetter;
        return [actionName, function boundAction(payload) {
          const currentSlice = getSlice(currentState, path);
          const newSlice = fn(currentSlice, draft => action({
            state: draft,
            payload,
            actions: boundActions
          }));

          if (isPromise_1(newSlice)) {
            const actionPath = path.length === 0 ? [actionName] : [...path, actionName];
            boundActions.setLoading({
              actionPath,
              actionPayload: payload
            });
            return newSlice.catch(error => {
              boundActions.handleError({
                error,
                actionPath,
                actionPayload: payload
              });
            }).finally(() => {
              boundActions.unsetLoading({
                actionPath,
                actionPayload: payload
              });
            });
          }

          const nextState = getNextState(currentSlice, newSlice); // eslint-disable-next-line fp/no-mutation

          currentState = setSlice(currentState, path, nextState);
          notifySubscribers({
            actionName: path.length === 0 ? actionName : [...path, actionName],
            payload
          });
        }];
      }

      return [actionName, bindActions(actionWithNextStateGetter, [...path, actionName])];
    }));
  } // eslint-disable-next-line fp/no-mutation


  boundActions = bindActions(actions);
  notifySubscribers();
  return boundActions;
}

export { actus, defaultActions, logger };
