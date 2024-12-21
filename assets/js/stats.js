/*! For license information please see stats.js.LICENSE.txt */
(() => {
    var __webpack_modules__ = {
            661: (t, e, n) => {
                "use strict";
                n.d(e, {
                    Ay: () => lt
                });
                var r = function() {
                    return r = Object.assign || function(t) {
                        for (var e, n = 1, r = arguments.length; n < r; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }, r.apply(this, arguments)
                };

                function o(t, e, n, r) {
                    return new(n || (n = Promise))((function(o, i) {
                        function a(t) {
                            try {
                                c(r.next(t))
                            } catch (t) {
                                i(t)
                            }
                        }

                        function s(t) {
                            try {
                                c(r.throw(t))
                            } catch (t) {
                                i(t)
                            }
                        }

                        function c(t) {
                            var e;
                            t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                                t(e)
                            }))).then(a, s)
                        }
                        c((r = r.apply(t, e || [])).next())
                    }))
                }

                function i(t, e) {
                    var n, r, o, i, a = {
                        label: 0,
                        sent: function() {
                            if (1 & o[0]) throw o[1];
                            return o[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return i = {
                        next: s(0),
                        throw: s(1),
                        return: s(2)
                    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                        return this
                    }), i;

                    function s(s) {
                        return function(c) {
                            return function(s) {
                                if (n) throw new TypeError("Generator is already executing.");
                                for (; i && (i = 0, s[0] && (a = 0)), a;) try {
                                    if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;
                                    switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                        case 0:
                                        case 1:
                                            o = s;
                                            break;
                                        case 4:
                                            return a.label++, {
                                                value: s[1],
                                                done: !1
                                            };
                                        case 5:
                                            a.label++, r = s[1], s = [0];
                                            continue;
                                        case 7:
                                            s = a.ops.pop(), a.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                                a = 0;
                                                continue
                                            }
                                            if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                                a.label = s[1];
                                                break
                                            }
                                            if (6 === s[0] && a.label < o[1]) {
                                                a.label = o[1], o = s;
                                                break
                                            }
                                            if (o && a.label < o[2]) {
                                                a.label = o[2], a.ops.push(s);
                                                break
                                            }
                                            o[2] && a.ops.pop(), a.trys.pop();
                                            continue
                                    }
                                    s = e.call(t, a)
                                } catch (t) {
                                    s = [6, t], r = 0
                                } finally {
                                    n = o = 0
                                }
                                if (5 & s[0]) throw s[1];
                                return {
                                    value: s[0] ? s[1] : void 0,
                                    done: !0
                                }
                            }([s, c])
                        }
                    }
                }
                Object.create;

                function a(t, e, n) {
                    if (n || 2 === arguments.length)
                        for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
                    return t.concat(r || Array.prototype.slice.call(e))
                }
                Object.create;
                "function" == typeof SuppressedError && SuppressedError;
                var s = "3.4.2";

                function c(t, e) {
                    return new Promise((function(n) {
                        return setTimeout(n, t, e)
                    }))
                }

                function u(t) {
                    return !!t && "function" == typeof t.then
                }

                function l(t, e) {
                    try {
                        var n = t();
                        u(n) ? n.then((function(t) {
                            return e(!0, t)
                        }), (function(t) {
                            return e(!1, t)
                        })) : e(!0, n)
                    } catch (t) {
                        e(!1, t)
                    }
                }

                function d(t, e, n) {
                    return void 0 === n && (n = 16), o(this, void 0, void 0, (function() {
                        var r, o, a, s;
                        return i(this, (function(i) {
                            switch (i.label) {
                                case 0:
                                    r = Array(t.length), o = Date.now(), a = 0, i.label = 1;
                                case 1:
                                    return a < t.length ? (r[a] = e(t[a], a), (s = Date.now()) >= o + n ? (o = s, [4, c(0)]) : [3, 3]) : [3, 4];
                                case 2:
                                    i.sent(), i.label = 3;
                                case 3:
                                    return ++a, [3, 1];
                                case 4:
                                    return [2, r]
                            }
                        }))
                    }))
                }

                function h(t) {
                    t.then(void 0, (function() {}))
                }

                function p(t, e) {
                    t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];
                    var n = [0, 0, 0, 0];
                    return n[3] += t[3] + e[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += t[2] + e[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += t[1] + e[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += t[0] + e[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
                }

                function f(t, e) {
                    t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];
                    var n = [0, 0, 0, 0];
                    return n[3] += t[3] * e[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += t[2] * e[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += t[3] * e[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += t[1] * e[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += t[2] * e[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += t[3] * e[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
                }

                function m(t, e) {
                    return 32 === (e %= 64) ? [t[1], t[0]] : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e | t[0] >>> 32 - e] : (e -= 32, [t[1] << e | t[0] >>> 32 - e, t[0] << e | t[1] >>> 32 - e])
                }

                function g(t, e) {
                    return 0 === (e %= 64) ? t : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e] : [t[1] << e - 32, 0]
                }

                function y(t, e) {
                    return [t[0] ^ e[0], t[1] ^ e[1]]
                }

                function v(t) {
                    return t = y(t, [0, t[0] >>> 1]), t = y(t = f(t, [4283543511, 3981806797]), [0, t[0] >>> 1]), t = y(t = f(t, [3301882366, 444984403]), [0, t[0] >>> 1])
                }

                function I(t, e) {
                    e = e || 0;
                    var n, r = (t = t || "").length % 16,
                        o = t.length - r,
                        i = [0, e],
                        a = [0, e],
                        s = [0, 0],
                        c = [0, 0],
                        u = [2277735313, 289559509],
                        l = [1291169091, 658871167];
                    for (n = 0; n < o; n += 16) s = [255 & t.charCodeAt(n + 4) | (255 & t.charCodeAt(n + 5)) << 8 | (255 & t.charCodeAt(n + 6)) << 16 | (255 & t.charCodeAt(n + 7)) << 24, 255 & t.charCodeAt(n) | (255 & t.charCodeAt(n + 1)) << 8 | (255 & t.charCodeAt(n + 2)) << 16 | (255 & t.charCodeAt(n + 3)) << 24], c = [255 & t.charCodeAt(n + 12) | (255 & t.charCodeAt(n + 13)) << 8 | (255 & t.charCodeAt(n + 14)) << 16 | (255 & t.charCodeAt(n + 15)) << 24, 255 & t.charCodeAt(n + 8) | (255 & t.charCodeAt(n + 9)) << 8 | (255 & t.charCodeAt(n + 10)) << 16 | (255 & t.charCodeAt(n + 11)) << 24], s = m(s = f(s, u), 31), i = p(i = m(i = y(i, s = f(s, l)), 27), a), i = p(f(i, [0, 5]), [0, 1390208809]), c = m(c = f(c, l), 33), a = p(a = m(a = y(a, c = f(c, u)), 31), i), a = p(f(a, [0, 5]), [0, 944331445]);
                    switch (s = [0, 0], c = [0, 0], r) {
                        case 15:
                            c = y(c, g([0, t.charCodeAt(n + 14)], 48));
                        case 14:
                            c = y(c, g([0, t.charCodeAt(n + 13)], 40));
                        case 13:
                            c = y(c, g([0, t.charCodeAt(n + 12)], 32));
                        case 12:
                            c = y(c, g([0, t.charCodeAt(n + 11)], 24));
                        case 11:
                            c = y(c, g([0, t.charCodeAt(n + 10)], 16));
                        case 10:
                            c = y(c, g([0, t.charCodeAt(n + 9)], 8));
                        case 9:
                            c = f(c = y(c, [0, t.charCodeAt(n + 8)]), l), a = y(a, c = f(c = m(c, 33), u));
                        case 8:
                            s = y(s, g([0, t.charCodeAt(n + 7)], 56));
                        case 7:
                            s = y(s, g([0, t.charCodeAt(n + 6)], 48));
                        case 6:
                            s = y(s, g([0, t.charCodeAt(n + 5)], 40));
                        case 5:
                            s = y(s, g([0, t.charCodeAt(n + 4)], 32));
                        case 4:
                            s = y(s, g([0, t.charCodeAt(n + 3)], 24));
                        case 3:
                            s = y(s, g([0, t.charCodeAt(n + 2)], 16));
                        case 2:
                            s = y(s, g([0, t.charCodeAt(n + 1)], 8));
                        case 1:
                            s = f(s = y(s, [0, t.charCodeAt(n)]), u), i = y(i, s = f(s = m(s, 31), l))
                    }
                    return i = p(i = y(i, [0, t.length]), a = y(a, [0, t.length])), a = p(a, i), i = p(i = v(i), a = v(a)), a = p(a, i), ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(-8)
                }

                function b(t) {
                    return parseInt(t)
                }

                function C(t) {
                    return parseFloat(t)
                }

                function w(t, e) {
                    return "number" == typeof t && isNaN(t) ? e : t
                }

                function S(t) {
                    return t.reduce((function(t, e) {
                        return t + (e ? 1 : 0)
                    }), 0)
                }

                function A(t, e) {
                    if (void 0 === e && (e = 1), Math.abs(e) >= 1) return Math.round(t / e) * e;
                    var n = 1 / e;
                    return Math.round(t * n) / n
                }

                function k(t) {
                    return t && "object" == typeof t && "message" in t ? t : {
                        message: t
                    }
                }

                function E(t) {
                    return "function" != typeof t
                }

                function R(t, e, n) {
                    var r = Object.keys(t).filter((function(t) {
                            return ! function(t, e) {
                                for (var n = 0, r = t.length; n < r; ++n)
                                    if (t[n] === e) return !0;
                                return !1
                            }(n, t)
                        })),
                        a = d(r, (function(n) {
                            return function(t, e) {
                                var n = new Promise((function(n) {
                                    var r = Date.now();
                                    l(t.bind(null, e), (function() {
                                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                        var o = Date.now() - r;
                                        if (!t[0]) return n((function() {
                                            return {
                                                error: k(t[1]),
                                                duration: o
                                            }
                                        }));
                                        var i = t[1];
                                        if (E(i)) return n((function() {
                                            return {
                                                value: i,
                                                duration: o
                                            }
                                        }));
                                        n((function() {
                                            return new Promise((function(t) {
                                                var e = Date.now();
                                                l(i, (function() {
                                                    for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                                                    var i = o + Date.now() - e;
                                                    if (!n[0]) return t({
                                                        error: k(n[1]),
                                                        duration: i
                                                    });
                                                    t({
                                                        value: n[1],
                                                        duration: i
                                                    })
                                                }))
                                            }))
                                        }))
                                    }))
                                }));
                                return h(n),
                                    function() {
                                        return n.then((function(t) {
                                            return t()
                                        }))
                                    }
                            }(t[n], e)
                        }));
                    return h(a),
                        function() {
                            return o(this, void 0, void 0, (function() {
                                var t, e, n, o;
                                return i(this, (function(i) {
                                    switch (i.label) {
                                        case 0:
                                            return [4, a];
                                        case 1:
                                            return [4, d(i.sent(), (function(t) {
                                                var e = t();
                                                return h(e), e
                                            }))];
                                        case 2:
                                            return t = i.sent(), [4, Promise.all(t)];
                                        case 3:
                                            for (e = i.sent(), n = {}, o = 0; o < r.length; ++o) n[r[o]] = e[o];
                                            return [2, n]
                                    }
                                }))
                            }))
                        }
                }

                function M() {
                    var t = window,
                        e = navigator;
                    return S(["MSCSSMatrix" in t, "msSetImmediate" in t, "msIndexedDB" in t, "msMaxTouchPoints" in e, "msPointerEnabled" in e]) >= 4
                }

                function T() {
                    var t = window,
                        e = navigator;
                    return S(["webkitPersistentStorage" in e, "webkitTemporaryStorage" in e, 0 === e.vendor.indexOf("Google"), "webkitResolveLocalFileSystemURL" in t, "BatteryManager" in t, "webkitMediaStream" in t, "webkitSpeechGrammar" in t]) >= 5
                }

                function L() {
                    var t = window,
                        e = navigator;
                    return S(["ApplePayError" in t, "CSSPrimitiveValue" in t, "Counter" in t, 0 === e.vendor.indexOf("Apple"), "getStorageUpdates" in e, "WebKitMediaKeys" in t]) >= 4
                }

                function _() {
                    var t = window;
                    return S(["safari" in t, !("DeviceMotionEvent" in t), !("ongestureend" in t), !("standalone" in navigator)]) >= 3
                }

                function x() {
                    var t = document;
                    return (t.exitFullscreen || t.msExitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen).call(t)
                }

                function N() {
                    var t = T(),
                        e = function() {
                            var t, e, n = window;
                            return S(["buildID" in navigator, "MozAppearance" in (null !== (e = null === (t = document.documentElement) || void 0 === t ? void 0 : t.style) && void 0 !== e ? e : {}), "onmozfullscreenchange" in n, "mozInnerScreenX" in n, "CSSMozDocumentRule" in n, "CanvasCaptureMediaStream" in n]) >= 4
                        }();
                    if (!t && !e) return !1;
                    var n = window;
                    return S(["onorientationchange" in n, "orientation" in n, t && !("SharedWorker" in n), e && /android/i.test(navigator.appVersion)]) >= 2
                }

                function O(t) {
                    var e = new Error(t);
                    return e.name = t, e
                }

                function F(t, e, n) {
                    var r, a, s;
                    return void 0 === n && (n = 50), o(this, void 0, void 0, (function() {
                        var o, u;
                        return i(this, (function(i) {
                            switch (i.label) {
                                case 0:
                                    o = document, i.label = 1;
                                case 1:
                                    return o.body ? [3, 3] : [4, c(n)];
                                case 2:
                                    return i.sent(), [3, 1];
                                case 3:
                                    u = o.createElement("iframe"), i.label = 4;
                                case 4:
                                    return i.trys.push([4, , 10, 11]), [4, new Promise((function(t, n) {
                                        var r = !1,
                                            i = function() {
                                                r = !0, t()
                                            };
                                        u.onload = i, u.onerror = function(t) {
                                            r = !0, n(t)
                                        };
                                        var a = u.style;
                                        a.setProperty("display", "block", "important"), a.position = "absolute", a.top = "0", a.left = "0", a.visibility = "hidden", e && "srcdoc" in u ? u.srcdoc = e : u.src = "about:blank", o.body.appendChild(u);
                                        var s = function() {
                                            var t, e;
                                            r || ("complete" === (null === (e = null === (t = u.contentWindow) || void 0 === t ? void 0 : t.document) || void 0 === e ? void 0 : e.readyState) ? i() : setTimeout(s, 10))
                                        };
                                        s()
                                    }))];
                                case 5:
                                    i.sent(), i.label = 6;
                                case 6:
                                    return (null === (a = null === (r = u.contentWindow) || void 0 === r ? void 0 : r.document) || void 0 === a ? void 0 : a.body) ? [3, 8] : [4, c(n)];
                                case 7:
                                    return i.sent(), [3, 6];
                                case 8:
                                    return [4, t(u, u.contentWindow)];
                                case 9:
                                    return [2, i.sent()];
                                case 10:
                                    return null === (s = u.parentNode) || void 0 === s || s.removeChild(u), [7];
                                case 11:
                                    return [2]
                            }
                        }))
                    }))
                }

                function V(t) {
                    for (var e = function(t) {
                            for (var e, n, r = "Unexpected syntax '".concat(t, "'"), o = /^\s*([a-z-]*)(.*)$/i.exec(t), i = o[1] || void 0, a = {}, s = /([.:#][\w-]+|\[.+?\])/gi, c = function(t, e) {
                                    a[t] = a[t] || [], a[t].push(e)
                                };;) {
                                var u = s.exec(o[2]);
                                if (!u) break;
                                var l = u[0];
                                switch (l[0]) {
                                    case ".":
                                        c("class", l.slice(1));
                                        break;
                                    case "#":
                                        c("id", l.slice(1));
                                        break;
                                    case "[":
                                        var d = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(l);
                                        if (!d) throw new Error(r);
                                        c(d[1], null !== (n = null !== (e = d[4]) && void 0 !== e ? e : d[5]) && void 0 !== n ? n : "");
                                        break;
                                    default:
                                        throw new Error(r)
                                }
                            }
                            return [i, a]
                        }(t), n = e[0], r = e[1], o = document.createElement(null != n ? n : "div"), i = 0, a = Object.keys(r); i < a.length; i++) {
                        var s = a[i],
                            c = r[s].join(" ");
                        "style" === s ? W(o.style, c) : o.setAttribute(s, c)
                    }
                    return o
                }

                function W(t, e) {
                    for (var n = 0, r = e.split(";"); n < r.length; n++) {
                        var o = r[n],
                            i = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o);
                        if (i) {
                            var a = i[1],
                                s = i[2],
                                c = i[4];
                            t.setProperty(a, s, c || "")
                        }
                    }
                }
                var D = ["monospace", "sans-serif", "serif"],
                    Z = ["sans-serif-thin", "ARNO PRO", "Agency FB", "Arabic Typesetting", "Arial Unicode MS", "AvantGarde Bk BT", "BankGothic Md BT", "Batang", "Bitstream Vera Sans Mono", "Calibri", "Century", "Century Gothic", "Clarendon", "EUROSTILE", "Franklin Gothic", "Futura Bk BT", "Futura Md BT", "GOTHAM", "Gill Sans", "HELV", "Haettenschweiler", "Helvetica Neue", "Humanst521 BT", "Leelawadee", "Letter Gothic", "Levenim MT", "Lucida Bright", "Lucida Sans", "Menlo", "MS Mincho", "MS Outlook", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MYRIAD PRO", "Marlett", "Meiryo UI", "Microsoft Uighur", "Minion Pro", "Monotype Corsiva", "PMingLiU", "Pristina", "SCRIPTINA", "Segoe UI Light", "Serifa", "SimHei", "Small Fonts", "Staccato222 BT", "TRAJAN PRO", "Univers CE 55 Medium", "Vrinda", "ZWAdobeF"];

                function B(t) {
                    return t.toDataURL()
                }
                var G, P, U = 2500;

                function Y() {
                    var t = this;
                    return function() {
                            if (void 0 === P) {
                                var t = function() {
                                    var e = j();
                                    J(e) ? P = setTimeout(t, U) : (G = e, P = void 0)
                                };
                                t()
                            }
                        }(),
                        function() {
                            return o(t, void 0, void 0, (function() {
                                var t;
                                return i(this, (function(e) {
                                    switch (e.label) {
                                        case 0:
                                            return J(t = j()) ? G ? [2, a([], G, !0)] : (n = document).fullscreenElement || n.msFullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement ? [4, x()] : [3, 2] : [3, 2];
                                        case 1:
                                            e.sent(), t = j(), e.label = 2;
                                        case 2:
                                            return J(t) || (G = t), [2, t]
                                    }
                                    var n
                                }))
                            }))
                        }
                }

                function j() {
                    var t = screen;
                    return [w(C(t.availTop), null), w(C(t.width) - C(t.availWidth) - w(C(t.availLeft), 0), null), w(C(t.height) - C(t.availHeight) - w(C(t.availTop), 0), null), w(C(t.availLeft), null)]
                }

                function J(t) {
                    for (var e = 0; e < 4; ++e)
                        if (t[e]) return !1;
                    return !0
                }

                function X(t) {
                    var e;
                    return o(this, void 0, void 0, (function() {
                        var n, r, o, a, s, u, l;
                        return i(this, (function(i) {
                            switch (i.label) {
                                case 0:
                                    for (n = document, r = n.createElement("div"), o = new Array(t.length), a = {}, K(r), l = 0; l < t.length; ++l) "DIALOG" === (s = V(t[l])).tagName && s.show(), K(u = n.createElement("div")), u.appendChild(s), r.appendChild(u), o[l] = s;
                                    i.label = 1;
                                case 1:
                                    return n.body ? [3, 3] : [4, c(50)];
                                case 2:
                                    return i.sent(), [3, 1];
                                case 3:
                                    n.body.appendChild(r);
                                    try {
                                        for (l = 0; l < t.length; ++l) o[l].offsetParent || (a[t[l]] = !0)
                                    } finally {
                                        null === (e = r.parentNode) || void 0 === e || e.removeChild(r)
                                    }
                                    return [2, a]
                            }
                        }))
                    }))
                }

                function K(t) {
                    t.style.setProperty("display", "block", "important")
                }

                function z(t) {
                    return matchMedia("(inverted-colors: ".concat(t, ")")).matches
                }

                function H(t) {
                    return matchMedia("(forced-colors: ".concat(t, ")")).matches
                }

                function Q(t) {
                    return matchMedia("(prefers-contrast: ".concat(t, ")")).matches
                }

                function q(t) {
                    return matchMedia("(prefers-reduced-motion: ".concat(t, ")")).matches
                }

                function $(t) {
                    return matchMedia("(dynamic-range: ".concat(t, ")")).matches
                }
                var tt = Math,
                    et = function() {
                        return 0
                    };
                var nt = {
                    default: [],
                    apple: [{
                        font: "-apple-system-body"
                    }],
                    serif: [{
                        fontFamily: "serif"
                    }],
                    sans: [{
                        fontFamily: "sans-serif"
                    }],
                    mono: [{
                        fontFamily: "monospace"
                    }],
                    min: [{
                        fontSize: "1px"
                    }],
                    system: [{
                        fontFamily: "system-ui"
                    }]
                };
                var rt = {
                    fonts: function() {
                        return F((function(t, e) {
                            var n = e.document,
                                r = n.body;
                            r.style.fontSize = "48px";
                            var o = n.createElement("div"),
                                i = {},
                                a = {},
                                s = function(t) {
                                    var e = n.createElement("span"),
                                        r = e.style;
                                    return r.position = "absolute", r.top = "0", r.left = "0", r.fontFamily = t, e.textContent = "mmMwWLliI0O&1", o.appendChild(e), e
                                },
                                c = D.map(s),
                                u = function() {
                                    for (var t = {}, e = function(e) {
                                            t[e] = D.map((function(t) {
                                                return function(t, e) {
                                                    return s("'".concat(t, "',").concat(e))
                                                }(e, t)
                                            }))
                                        }, n = 0, r = Z; n < r.length; n++) {
                                        e(r[n])
                                    }
                                    return t
                                }();
                            r.appendChild(o);
                            for (var l = 0; l < D.length; l++) i[D[l]] = c[l].offsetWidth, a[D[l]] = c[l].offsetHeight;
                            return Z.filter((function(t) {
                                return e = u[t], D.some((function(t, n) {
                                    return e[n].offsetWidth !== i[t] || e[n].offsetHeight !== a[t]
                                }));
                                var e
                            }))
                        }))
                    },
                    domBlockers: function(t) {
                        var e = (void 0 === t ? {} : t).debug;
                        return o(this, void 0, void 0, (function() {
                            var t, n, r, o, a;
                            return i(this, (function(i) {
                                switch (i.label) {
                                    case 0:
                                        return L() || N() ? (s = atob, t = {
                                            abpIndo: ["#Iklan-Melayang", "#Kolom-Iklan-728", "#SidebarIklan-wrapper", '[title="ALIENBOLA" i]', s("I0JveC1CYW5uZXItYWRz")],
                                            abpvn: [".quangcao", "#mobileCatfish", s("LmNsb3NlLWFkcw=="), '[id^="bn_bottom_fixed_"]', "#pmadv"],
                                            adBlockFinland: [".mainostila", s("LnNwb25zb3JpdA=="), ".ylamainos", s("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"), s("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],
                                            adBlockPersian: ["#navbar_notice_50", ".kadr", 'TABLE[width="140px"]', "#divAgahi", s("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")],
                                            adBlockWarningRemoval: ["#adblock-honeypot", ".adblocker-root", ".wp_adblock_detect", s("LmhlYWRlci1ibG9ja2VkLWFk"), s("I2FkX2Jsb2NrZXI=")],
                                            adGuardAnnoyances: [".hs-sosyal", "#cookieconsentdiv", 'div[class^="app_gdpr"]', ".as-oil", '[data-cypress="soft-push-notification-modal"]'],
                                            adGuardBase: [".BetterJsPopOverlay", s("I2FkXzMwMFgyNTA="), s("I2Jhbm5lcmZsb2F0MjI="), s("I2NhbXBhaWduLWJhbm5lcg=="), s("I0FkLUNvbnRlbnQ=")],
                                            adGuardChinese: [s("LlppX2FkX2FfSA=="), s("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"), "#widget-quan", s("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"), s("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")],
                                            adGuardFrench: ["#pavePub", s("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"), ".mobile_adhesion", ".widgetadv", s("LmFkc19iYW4=")],
                                            adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                                            adGuardJapanese: ["#kauli_yad_1", s("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="), s("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="), s("LmFkZ29vZ2xl"), s("Ll9faXNib29zdFJldHVybkFk")],
                                            adGuardMobile: [s("YW1wLWF1dG8tYWRz"), s("LmFtcF9hZA=="), 'amp-embed[type="24smi"]', "#mgid_iframe1", s("I2FkX2ludmlld19hcmVh")],
                                            adGuardRussian: [s("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="), s("LnJlY2xhbWE="), 'div[id^="smi2adblock"]', s("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"), "#psyduckpockeball"],
                                            adGuardSocial: [s("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="), s("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="), ".etsy-tweet", "#inlineShare", ".popup-social"],
                                            adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", ".cnt-publi"],
                                            adGuardTrackingProtection: ["#qoo-counter", s("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="), s("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="), s("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="), "#top100counter"],
                                            adGuardTurkish: ["#backkapat", s("I3Jla2xhbWk="), s("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="), s("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"), s("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],
                                            bulgarian: [s("dGQjZnJlZW5ldF90YWJsZV9hZHM="), "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"],
                                            easyList: [".yb-floorad", s("LndpZGdldF9wb19hZHNfd2lkZ2V0"), s("LnRyYWZmaWNqdW5reS1hZA=="), ".textad_headline", s("LnNwb25zb3JlZC10ZXh0LWxpbmtz")],
                                            easyListChina: [s("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="), s("LmZyb250cGFnZUFkdk0="), "#taotaole", "#aafoot.top_box", ".cfa_popup"],
                                            easyListCookie: [".ezmob-footer", ".cc-CookieWarning", "[data-cookie-number]", s("LmF3LWNvb2tpZS1iYW5uZXI="), ".sygnal24-gdpr-modal-wrap"],
                                            easyListCzechSlovak: ["#onlajny-stickers", s("I3Jla2xhbW5pLWJveA=="), s("LnJla2xhbWEtbWVnYWJvYXJk"), ".sklik", s("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],
                                            easyListDutch: [s("I2FkdmVydGVudGll"), s("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="), ".adstekst", s("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="), "#semilo-lrectangle"],
                                            easyListGermany: ["#SSpotIMPopSlider", s("LnNwb25zb3JsaW5rZ3J1ZW4="), s("I3dlcmJ1bmdza3k="), s("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"), s("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")],
                                            easyListItaly: [s("LmJveF9hZHZfYW5udW5jaQ=="), ".sb-box-pubbliredazionale", s("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"), s("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"), s("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],
                                            easyListLithuania: [s("LnJla2xhbW9zX3RhcnBhcw=="), s("LnJla2xhbW9zX251b3JvZG9z"), s("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"), s("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"), s("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],
                                            estonian: [s("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
                                            fanboyAnnoyances: ["#ac-lre-player", ".navigate-to-top", "#subscribe_popup", ".newsletter_holder", "#back-top"],
                                            fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
                                            fanboyEnhancedTrackers: [".open.pushModal", "#issuem-leaky-paywall-articles-zero-remaining-nag", "#sovrn_container", 'div[class$="-hide"][zoompage-fontsize][style="display: block;"]', ".BlockNag__Card"],
                                            fanboySocial: ["#FollowUs", "#meteored_share", "#social_follow", ".article-sharer", ".community__social-desc"],
                                            frellwitSwedish: [s("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="), s("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="), "article.category-samarbete", s("ZGl2LmhvbGlkQWRz"), "ul.adsmodern"],
                                            greekAdBlock: [s("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"), s("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="), s("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"), "DIV.agores300", "TABLE.advright"],
                                            hungarian: ["#cemp_doboz", ".optimonk-iframe-container", s("LmFkX19tYWlu"), s("W2NsYXNzKj0iR29vZ2xlQWRzIl0="), "#hirdetesek_box"],
                                            iDontCareAboutCookies: ['.alert-info[data-block-track*="CookieNotice"]', ".ModuleTemplateCookieIndicator", ".o--cookies--container", "#cookies-policy-sticky", "#stickyCookieBar"],
                                            icelandicAbp: [s("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
                                            latvian: [s("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="), s("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],
                                            listKr: [s("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="), s("I2xpdmVyZUFkV3JhcHBlcg=="), s("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="), s("aW5zLmZhc3R2aWV3LWFk"), ".revenue_unit_item.dable"],
                                            listeAr: [s("LmdlbWluaUxCMUFk"), ".right-and-left-sponsers", s("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="), s("YVtocmVmKj0iYm9vcmFxLm9yZyJd"), s("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],
                                            listeFr: [s("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="), s("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="), s("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="), ".site-pub-interstitiel", 'div[id^="crt-"][data-criteo-id]'],
                                            officialPolish: ["#ceneo-placeholder-ceneo-12", s("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"), s("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="), s("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="), s("ZGl2I3NrYXBpZWNfYWQ=")],
                                            ro: [s("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"), s("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"), s("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="), s("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"), 'a[href^="/url/"]'],
                                            ruAd: [s("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"), s("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="), s("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="), "#pgeldiz", ".yandex-rtb-block"],
                                            thaiAds: ["a[href*=macau-uta-popup]", s("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="), s("LmFkczMwMHM="), ".bumq", ".img-kosana"],
                                            webAnnoyancesUltralist: ["#mod-social-share-2", "#social-tools", s("LmN0cGwtZnVsbGJhbm5lcg=="), ".zergnet-recommend", ".yt.btn-link.btn-md.btn"]
                                        }, n = Object.keys(t), [4, X((a = []).concat.apply(a, n.map((function(e) {
                                            return t[e]
                                        }))))]) : [2, void 0];
                                    case 1:
                                        return r = i.sent(), e && function(t, e) {
                                            for (var n = "DOM blockers debug:\n```", r = 0, o = Object.keys(t); r < o.length; r++) {
                                                var i = o[r];
                                                n += "\n".concat(i, ":");
                                                for (var a = 0, s = t[i]; a < s.length; a++) {
                                                    var c = s[a];
                                                    n += "\n  ".concat(e[c] ? "🚫" : "➡️", " ").concat(c)
                                                }
                                            }
                                            console.log("".concat(n, "\n```"))
                                        }(t, r), (o = n.filter((function(e) {
                                            var n = t[e];
                                            return S(n.map((function(t) {
                                                return r[t]
                                            }))) > .6 * n.length
                                        }))).sort(), [2, o]
                                }
                                var s
                            }))
                        }))
                    },
                    fontPreferences: function() {
                        return function(t, e) {
                            void 0 === e && (e = 4e3);
                            return F((function(n, r) {
                                var o = r.document,
                                    i = o.body,
                                    s = i.style;
                                s.width = "".concat(e, "px"), s.webkitTextSizeAdjust = s.textSizeAdjust = "none", T() ? i.style.zoom = "".concat(1 / r.devicePixelRatio) : L() && (i.style.zoom = "reset");
                                var c = o.createElement("div");
                                return c.textContent = a([], Array(e / 20 | 0), !0).map((function() {
                                    return "word"
                                })).join(" "), i.appendChild(c), t(o, i)
                            }), '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
                        }((function(t, e) {
                            for (var n = {}, r = {}, o = 0, i = Object.keys(nt); o < i.length; o++) {
                                var a = i[o],
                                    s = nt[a],
                                    c = s[0],
                                    u = void 0 === c ? {} : c,
                                    l = s[1],
                                    d = void 0 === l ? "mmMwWLliI0fiflO&1" : l,
                                    h = t.createElement("span");
                                h.textContent = d, h.style.whiteSpace = "nowrap";
                                for (var p = 0, f = Object.keys(u); p < f.length; p++) {
                                    var m = f[p],
                                        g = u[m];
                                    void 0 !== g && (h.style[m] = g)
                                }
                                n[a] = h, e.appendChild(t.createElement("br")), e.appendChild(h)
                            }
                            for (var y = 0, v = Object.keys(nt); y < v.length; y++) {
                                r[a = v[y]] = n[a].getBoundingClientRect().width
                            }
                            return r
                        }))
                    },
                    audio: function() {
                        var t = window,
                            e = t.OfflineAudioContext || t.webkitOfflineAudioContext;
                        if (!e) return -2;
                        if (L() && !_() && ! function() {
                                var t = window;
                                return S(["DOMRectList" in t, "RTCPeerConnectionIceEvent" in t, "SVGGeometryElement" in t, "ontransitioncancel" in t]) >= 3
                            }()) return -1;
                        var n = new e(1, 5e3, 44100),
                            r = n.createOscillator();
                        r.type = "triangle", r.frequency.value = 1e4;
                        var o = n.createDynamicsCompressor();
                        o.threshold.value = -50, o.knee.value = 40, o.ratio.value = 12, o.attack.value = 0, o.release.value = .25, r.connect(o), o.connect(n.destination), r.start(0);
                        var i = function(t) {
                                var e = 3,
                                    n = 500,
                                    r = 500,
                                    o = 5e3,
                                    i = function() {},
                                    a = new Promise((function(a, s) {
                                        var c = !1,
                                            l = 0,
                                            d = 0;
                                        t.oncomplete = function(t) {
                                            return a(t.renderedBuffer)
                                        };
                                        var p = function() {
                                                setTimeout((function() {
                                                    return s(O("timeout"))
                                                }), Math.min(r, d + o - Date.now()))
                                            },
                                            f = function() {
                                                try {
                                                    var r = t.startRendering();
                                                    switch (u(r) && h(r), t.state) {
                                                        case "running":
                                                            d = Date.now(), c && p();
                                                            break;
                                                        case "suspended":
                                                            document.hidden || l++, c && l >= e ? s(O("suspended")) : setTimeout(f, n)
                                                    }
                                                } catch (t) {
                                                    s(t)
                                                }
                                            };
                                        f(), i = function() {
                                            c || (c = !0, d > 0 && p())
                                        }
                                    }));
                                return [a, i]
                            }(n),
                            a = i[0],
                            s = i[1],
                            c = a.then((function(t) {
                                return function(t) {
                                    for (var e = 0, n = 0; n < t.length; ++n) e += Math.abs(t[n]);
                                    return e
                                }(t.getChannelData(0).subarray(4500))
                            }), (function(t) {
                                if ("timeout" === t.name || "suspended" === t.name) return -3;
                                throw t
                            }));
                        return h(c),
                            function() {
                                return s(), c
                            }
                    },
                    screenFrame: function() {
                        var t = this,
                            e = Y();
                        return function() {
                            return o(t, void 0, void 0, (function() {
                                var t, n;
                                return i(this, (function(r) {
                                    switch (r.label) {
                                        case 0:
                                            return [4, e()];
                                        case 1:
                                            return t = r.sent(), [2, [(n = function(t) {
                                                return null === t ? null : A(t, 10)
                                            })(t[0]), n(t[1]), n(t[2]), n(t[3])]]
                                    }
                                }))
                            }))
                        }
                    },
                    osCpu: function() {
                        return navigator.oscpu
                    },
                    languages: function() {
                        var t, e = navigator,
                            n = [],
                            r = e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
                        if (void 0 !== r && n.push([r]), Array.isArray(e.languages)) T() && S([!("MediaSettingsRange" in (t = window)), "RTCEncodedAudioFrame" in t, "" + t.Intl == "[object Intl]", "" + t.Reflect == "[object Reflect]"]) >= 3 || n.push(e.languages);
                        else if ("string" == typeof e.languages) {
                            var o = e.languages;
                            o && n.push(o.split(","))
                        }
                        return n
                    },
                    colorDepth: function() {
                        return window.screen.colorDepth
                    },
                    deviceMemory: function() {
                        return w(C(navigator.deviceMemory), void 0)
                    },
                    screenResolution: function() {
                        var t = screen,
                            e = function(t) {
                                return w(b(t), null)
                            },
                            n = [e(t.width), e(t.height)];
                        return n.sort().reverse(), n
                    },
                    hardwareConcurrency: function() {
                        return w(b(navigator.hardwareConcurrency), void 0)
                    },
                    timezone: function() {
                        var t, e = null === (t = window.Intl) || void 0 === t ? void 0 : t.DateTimeFormat;
                        if (e) {
                            var n = (new e).resolvedOptions().timeZone;
                            if (n) return n
                        }
                        var r, o = (r = (new Date).getFullYear(), -Math.max(C(new Date(r, 0, 1).getTimezoneOffset()), C(new Date(r, 6, 1).getTimezoneOffset())));
                        return "UTC".concat(o >= 0 ? "+" : "").concat(Math.abs(o))
                    },
                    sessionStorage: function() {
                        try {
                            return !!window.sessionStorage
                        } catch (t) {
                            return !0
                        }
                    },
                    localStorage: function() {
                        try {
                            return !!window.localStorage
                        } catch (t) {
                            return !0
                        }
                    },
                    indexedDB: function() {
                        var t, e;
                        if (!(M() || (t = window, e = navigator, S(["msWriteProfilerMark" in t, "MSStream" in t, "msLaunchUri" in e, "msSaveBlob" in e]) >= 3 && !M()))) try {
                            return !!window.indexedDB
                        } catch (t) {
                            return !0
                        }
                    },
                    openDatabase: function() {
                        return !!window.openDatabase
                    },
                    cpuClass: function() {
                        return navigator.cpuClass
                    },
                    platform: function() {
                        var t = navigator.platform;
                        return "MacIntel" === t && L() && !_() ? function() {
                            if ("iPad" === navigator.platform) return !0;
                            var t = screen,
                                e = t.width / t.height;
                            return S(["MediaSource" in window, !!Element.prototype.webkitRequestFullscreen, e > .65 && e < 1.53]) >= 2
                        }() ? "iPad" : "iPhone" : t
                    },
                    plugins: function() {
                        var t = navigator.plugins;
                        if (t) {
                            for (var e = [], n = 0; n < t.length; ++n) {
                                var r = t[n];
                                if (r) {
                                    for (var o = [], i = 0; i < r.length; ++i) {
                                        var a = r[i];
                                        o.push({
                                            type: a.type,
                                            suffixes: a.suffixes
                                        })
                                    }
                                    e.push({
                                        name: r.name,
                                        description: r.description,
                                        mimeTypes: o
                                    })
                                }
                            }
                            return e
                        }
                    },
                    canvas: function() {
                        var t, e, n = !1,
                            r = function() {
                                var t = document.createElement("canvas");
                                return t.width = 1, t.height = 1, [t, t.getContext("2d")]
                            }(),
                            o = r[0],
                            i = r[1];
                        if (function(t, e) {
                                return !(!e || !t.toDataURL)
                            }(o, i)) {
                            n = function(t) {
                                    return t.rect(0, 0, 10, 10), t.rect(2, 2, 6, 6), !t.isPointInPath(5, 5, "evenodd")
                                }(i),
                                function(t, e) {
                                    t.width = 240, t.height = 60, e.textBaseline = "alphabetic", e.fillStyle = "#f60", e.fillRect(100, 1, 62, 20), e.fillStyle = "#069", e.font = '11pt "Times New Roman"';
                                    var n = "Cwm fjordbank gly ".concat(String.fromCharCode(55357, 56835));
                                    e.fillText(n, 2, 15), e.fillStyle = "rgba(102, 204, 0, 0.2)", e.font = "18pt Arial", e.fillText(n, 4, 45)
                                }(o, i);
                            var a = B(o);
                            a !== B(o) ? t = e = "unstable" : (e = a, function(t, e) {
                                t.width = 122, t.height = 110, e.globalCompositeOperation = "multiply";
                                for (var n = 0, r = [
                                        ["#f2f", 40, 40],
                                        ["#2ff", 80, 40],
                                        ["#ff2", 60, 80]
                                    ]; n < r.length; n++) {
                                    var o = r[n],
                                        i = o[0],
                                        a = o[1],
                                        s = o[2];
                                    e.fillStyle = i, e.beginPath(), e.arc(a, s, 40, 0, 2 * Math.PI, !0), e.closePath(), e.fill()
                                }
                                e.fillStyle = "#f9c", e.arc(60, 60, 60, 0, 2 * Math.PI, !0), e.arc(60, 60, 20, 0, 2 * Math.PI, !0), e.fill("evenodd")
                            }(o, i), t = B(o))
                        } else t = e = "";
                        return {
                            winding: n,
                            geometry: t,
                            text: e
                        }
                    },
                    touchSupport: function() {
                        var t, e = navigator,
                            n = 0;
                        void 0 !== e.maxTouchPoints ? n = b(e.maxTouchPoints) : void 0 !== e.msMaxTouchPoints && (n = e.msMaxTouchPoints);
                        try {
                            document.createEvent("TouchEvent"), t = !0
                        } catch (e) {
                            t = !1
                        }
                        return {
                            maxTouchPoints: n,
                            touchEvent: t,
                            touchStart: "ontouchstart" in window
                        }
                    },
                    vendor: function() {
                        return navigator.vendor || ""
                    },
                    vendorFlavors: function() {
                        for (var t = [], e = 0, n = ["chrome", "safari", "__crWeb", "__gCrWeb", "yandex", "__yb", "__ybro", "__firefox__", "__edgeTrackingPreventionStatistics", "webkit", "oprt", "samsungAr", "ucweb", "UCShellJava", "puffinDevice"]; e < n.length; e++) {
                            var r = n[e],
                                o = window[r];
                            o && "object" == typeof o && t.push(r)
                        }
                        return t.sort()
                    },
                    cookiesEnabled: function() {
                        var t = document;
                        try {
                            t.cookie = "cookietest=1; SameSite=Strict;";
                            var e = -1 !== t.cookie.indexOf("cookietest=");
                            return t.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
                        } catch (t) {
                            return !1
                        }
                    },
                    colorGamut: function() {
                        for (var t = 0, e = ["rec2020", "p3", "srgb"]; t < e.length; t++) {
                            var n = e[t];
                            if (matchMedia("(color-gamut: ".concat(n, ")")).matches) return n
                        }
                    },
                    invertedColors: function() {
                        return !!z("inverted") || !z("none") && void 0
                    },
                    forcedColors: function() {
                        return !!H("active") || !H("none") && void 0
                    },
                    monochrome: function() {
                        if (matchMedia("(min-monochrome: 0)").matches) {
                            for (var t = 0; t <= 100; ++t)
                                if (matchMedia("(max-monochrome: ".concat(t, ")")).matches) return t;
                            throw new Error("Too high value")
                        }
                    },
                    contrast: function() {
                        return Q("no-preference") ? 0 : Q("high") || Q("more") ? 1 : Q("low") || Q("less") ? -1 : Q("forced") ? 10 : void 0
                    },
                    reducedMotion: function() {
                        return !!q("reduce") || !q("no-preference") && void 0
                    },
                    hdr: function() {
                        return !!$("high") || !$("standard") && void 0
                    },
                    math: function() {
                        var t, e = tt.acos || et,
                            n = tt.acosh || et,
                            r = tt.asin || et,
                            o = tt.asinh || et,
                            i = tt.atanh || et,
                            a = tt.atan || et,
                            s = tt.sin || et,
                            c = tt.sinh || et,
                            u = tt.cos || et,
                            l = tt.cosh || et,
                            d = tt.tan || et,
                            h = tt.tanh || et,
                            p = tt.exp || et,
                            f = tt.expm1 || et,
                            m = tt.log1p || et;
                        return {
                            acos: e(.12312423423423424),
                            acosh: n(1e308),
                            acoshPf: (t = 1e154, tt.log(t + tt.sqrt(t * t - 1))),
                            asin: r(.12312423423423424),
                            asinh: o(1),
                            asinhPf: function(t) {
                                return tt.log(t + tt.sqrt(t * t + 1))
                            }(1),
                            atanh: i(.5),
                            atanhPf: function(t) {
                                return tt.log((1 + t) / (1 - t)) / 2
                            }(.5),
                            atan: a(.5),
                            sin: s(-1e300),
                            sinh: c(1),
                            sinhPf: function(t) {
                                return tt.exp(t) - 1 / tt.exp(t) / 2
                            }(1),
                            cos: u(10.000000000123),
                            cosh: l(1),
                            coshPf: function(t) {
                                return (tt.exp(t) + 1 / tt.exp(t)) / 2
                            }(1),
                            tan: d(-1e300),
                            tanh: h(1),
                            tanhPf: function(t) {
                                return (tt.exp(2 * t) - 1) / (tt.exp(2 * t) + 1)
                            }(1),
                            exp: p(1),
                            expm1: f(1),
                            expm1Pf: function(t) {
                                return tt.exp(t) - 1
                            }(1),
                            log1p: m(10),
                            log1pPf: function(t) {
                                return tt.log(1 + t)
                            }(10),
                            powPI: function(t) {
                                return tt.pow(tt.PI, t)
                            }(-100)
                        }
                    },
                    videoCard: function() {
                        var t, e = document.createElement("canvas"),
                            n = null !== (t = e.getContext("webgl")) && void 0 !== t ? t : e.getContext("experimental-webgl");
                        if (n && "getExtension" in n) {
                            var r = n.getExtension("WEBGL_debug_renderer_info");
                            if (r) return {
                                vendor: (n.getParameter(r.UNMASKED_VENDOR_WEBGL) || "").toString(),
                                renderer: (n.getParameter(r.UNMASKED_RENDERER_WEBGL) || "").toString()
                            }
                        }
                    },
                    pdfViewerEnabled: function() {
                        return navigator.pdfViewerEnabled
                    },
                    architecture: function() {
                        var t = new Float32Array(1),
                            e = new Uint8Array(t.buffer);
                        return t[0] = 1 / 0, t[0] = t[0] - t[0], e[3]
                    }
                };
                var ot = "$ if upgrade to Pro: https://fpjs.dev/pro";

                function it(t) {
                    var e = function(t) {
                            if (N()) return .4;
                            if (L()) return _() ? .5 : .3;
                            var e = t.platform.value || "";
                            if (/^Win/.test(e)) return .6;
                            if (/^Mac/.test(e)) return .5;
                            return .7
                        }(t),
                        n = function(t) {
                            return A(.99 + .01 * t, 1e-4)
                        }(e);
                    return {
                        score: e,
                        comment: ot.replace(/\$/g, "".concat(n))
                    }
                }

                function at(t) {
                    return JSON.stringify(t, (function(t, e) {
                        return e instanceof Error ? r({
                            name: (n = e).name,
                            message: n.message,
                            stack: null === (o = n.stack) || void 0 === o ? void 0 : o.split("\n")
                        }, n) : e;
                        var n, o
                    }), 2)
                }

                function st(t) {
                    return I(function(t) {
                        for (var e = "", n = 0, r = Object.keys(t).sort(); n < r.length; n++) {
                            var o = r[n],
                                i = t[o],
                                a = i.error ? "error" : JSON.stringify(i.value);
                            e += "".concat(e ? "|" : "").concat(o.replace(/([:|\\])/g, "\\$1"), ":").concat(a)
                        }
                        return e
                    }(t))
                }

                function ct(t) {
                    return void 0 === t && (t = 50),
                        function(t, e) {
                            void 0 === e && (e = 1 / 0);
                            var n = window.requestIdleCallback;
                            return n ? new Promise((function(t) {
                                return n.call(window, (function() {
                                    return t()
                                }), {
                                    timeout: e
                                })
                            })) : c(Math.min(t, e))
                        }(t, 2 * t)
                }

                function ut(t, e) {
                    var n = Date.now();
                    return {
                        get: function(r) {
                            return o(this, void 0, void 0, (function() {
                                var o, a, c;
                                return i(this, (function(i) {
                                    switch (i.label) {
                                        case 0:
                                            return o = Date.now(), [4, t()];
                                        case 1:
                                            return a = i.sent(), c = function(t) {
                                                var e;
                                                return {
                                                    get visitorId() {
                                                        return void 0 === e && (e = st(this.components)), e
                                                    },
                                                    set visitorId(t) {
                                                        e = t
                                                    },
                                                    confidence: it(t),
                                                    components: t,
                                                    version: s
                                                }
                                            }(a), (e || (null == r ? void 0 : r.debug)) && console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(c.version, "\nuserAgent: ").concat(navigator.userAgent, "\ntimeBetweenLoadAndGet: ").concat(o - n, "\nvisitorId: ").concat(c.visitorId, "\ncomponents: ").concat(at(a), "\n```")), [2, c]
                                    }
                                }))
                            }))
                        }
                    }
                }
                var lt = {
                    load: function(t) {
                        var e = void 0 === t ? {} : t,
                            n = e.delayFallback,
                            r = e.debug,
                            a = e.monitoring,
                            c = void 0 === a || a;
                        return o(this, void 0, void 0, (function() {
                            return i(this, (function(t) {
                                switch (t.label) {
                                    case 0:
                                        return c && function() {
                                            if (!(window.__fpjs_d_m || Math.random() >= .001)) try {
                                                var t = new XMLHttpRequest;
                                                t.open("get", "https://m1.openfpcdn.io/fingerprintjs/v".concat(s, "/npm-monitoring"), !0), t.send()
                                            } catch (t) {
                                                console.error(t)
                                            }
                                        }(), [4, ct(n)];
                                    case 1:
                                        return t.sent(), [2, ut(R(rt, {
                                            debug: r
                                        }, []), r)]
                                }
                            }))
                        }))
                    },
                    hashComponents: st,
                    componentsToDebugString: at
                }
            },
            526: (t, e) => {
                "use strict";
                e.byteLength = function(t) {
                    var e = s(t),
                        n = e[0],
                        r = e[1];
                    return 3 * (n + r) / 4 - r
                }, e.toByteArray = function(t) {
                    var e, n, i = s(t),
                        a = i[0],
                        c = i[1],
                        u = new o(function(t, e, n) {
                            return 3 * (e + n) / 4 - n
                        }(0, a, c)),
                        l = 0,
                        d = c > 0 ? a - 4 : a;
                    for (n = 0; n < d; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], u[l++] = e >> 16 & 255, u[l++] = e >> 8 & 255, u[l++] = 255 & e;
                    2 === c && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, u[l++] = 255 & e);
                    1 === c && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, u[l++] = e >> 8 & 255, u[l++] = 255 & e);
                    return u
                }, e.fromByteArray = function(t) {
                    for (var e, r = t.length, o = r % 3, i = [], a = 16383, s = 0, u = r - o; s < u; s += a) i.push(c(t, s, s + a > u ? u : s + a));
                    1 === o ? (e = t[r - 1], i.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === o && (e = (t[r - 2] << 8) + t[r - 1], i.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
                    return i.join("")
                };
                for (var n = [], r = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0; a < 64; ++a) n[a] = i[a], r[i.charCodeAt(a)] = a;

                function s(t) {
                    var e = t.length;
                    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var n = t.indexOf("=");
                    return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
                }

                function c(t, e, r) {
                    for (var o, i, a = [], s = e; s < r; s += 3) o = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);
                    return a.join("")
                }
                r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
            },
            287: (t, e, n) => {
                "use strict";
                var r = n(526),
                    o = n(251),
                    i = n(634);

                function a() {
                    return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function s(t, e) {
                    if (a() < e) throw new RangeError("Invalid typed array length");
                    return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t
                }

                function c(t, e, n) {
                    if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return d(this, t)
                    }
                    return u(this, t, e, n)
                }

                function u(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
                        if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                        if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                        e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                        c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = h(t, e);
                        return t
                    }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
                        "string" == typeof n && "" !== n || (n = "utf8");
                        if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                        var r = 0 | f(e, n);
                        t = s(t, r);
                        var o = t.write(e, n);
                        o !== r && (t = t.slice(0, o));
                        return t
                    }(t, e, n) : function(t, e) {
                        if (c.isBuffer(e)) {
                            var n = 0 | p(e.length);
                            return 0 === (t = s(t, n)).length || e.copy(t, 0, 0, n), t
                        }
                        if (e) {
                            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : h(t, e);
                            if ("Buffer" === e.type && i(e.data)) return h(t, e.data)
                        }
                        var r;
                        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                    }(t, e)
                }

                function l(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function d(t, e) {
                    if (l(e), t = s(t, e < 0 ? 0 : 0 | p(e)), !c.TYPED_ARRAY_SUPPORT)
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function h(t, e) {
                    var n = e.length < 0 ? 0 : 0 | p(e.length);
                    t = s(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function p(t) {
                    if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
                    return 0 | t
                }

                function f(t, e) {
                    if (c.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return G(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return P(t).length;
                        default:
                            if (r) return G(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function m(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if ((n >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return L(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return E(this, e, n);
                        case "ascii":
                            return M(this, e, n);
                        case "latin1":
                        case "binary":
                            return T(this, e, n);
                        case "base64":
                            return k(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return _(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function g(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function y(t, e, n, r, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, o);
                    if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function v(t, e, n, r, o) {
                    var i, a = 1,
                        s = t.length,
                        c = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        a = 2, s /= 2, c /= 2, n /= 2
                    }

                    function u(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a)
                    }
                    if (o) {
                        var l = -1;
                        for (i = n; i < s; i++)
                            if (u(t, i) === u(e, -1 === l ? 0 : i - l)) {
                                if (-1 === l && (l = i), i - l + 1 === c) return l * a
                            } else -1 !== l && (i -= i - l), l = -1
                    } else
                        for (n + c > s && (n = s - c), i = n; i >= 0; i--) {
                            for (var d = !0, h = 0; h < c; h++)
                                if (u(t, i + h) !== u(e, h)) {
                                    d = !1;
                                    break
                                }
                            if (d) return i
                        }
                    return -1
                }

                function I(t, e, n, r) {
                    n = Number(n) || 0;
                    var o = t.length - n;
                    r ? (r = Number(r)) > o && (r = o) : r = o;
                    var i = e.length;
                    if (i % 2 != 0) throw new TypeError("Invalid hex string");
                    r > i / 2 && (r = i / 2);
                    for (var a = 0; a < r; ++a) {
                        var s = parseInt(e.substr(2 * a, 2), 16);
                        if (isNaN(s)) return a;
                        t[n + a] = s
                    }
                    return a
                }

                function b(t, e, n, r) {
                    return U(G(e, t.length - n), t, n, r)
                }

                function C(t, e, n, r) {
                    return U(function(t) {
                        for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                        return e
                    }(e), t, n, r)
                }

                function w(t, e, n, r) {
                    return C(t, e, n, r)
                }

                function S(t, e, n, r) {
                    return U(P(e), t, n, r)
                }

                function A(t, e, n, r) {
                    return U(function(t, e) {
                        for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = (n = t.charCodeAt(a)) >> 8, o = n % 256, i.push(o), i.push(r);
                        return i
                    }(e, t.length - n), t, n, r)
                }

                function k(t, e, n) {
                    return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
                }

                function E(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], o = e; o < n;) {
                        var i, a, s, c, u = t[o],
                            l = null,
                            d = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (o + d <= n) switch (d) {
                            case 1:
                                u < 128 && (l = u);
                                break;
                            case 2:
                                128 == (192 & (i = t[o + 1])) && (c = (31 & u) << 6 | 63 & i) > 127 && (l = c);
                                break;
                            case 3:
                                i = t[o + 1], a = t[o + 2], 128 == (192 & i) && 128 == (192 & a) && (c = (15 & u) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (l = c);
                                break;
                            case 4:
                                i = t[o + 1], a = t[o + 2], s = t[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & s) && (c = (15 & u) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & s) > 65535 && c < 1114112 && (l = c)
                        }
                        null === l ? (l = 65533, d = 1) : l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), r.push(l), o += d
                    }
                    return function(t) {
                        var e = t.length;
                        if (e <= R) return String.fromCharCode.apply(String, t);
                        var n = "",
                            r = 0;
                        for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += R));
                        return n
                    }(r)
                }
                e.hp = c, e.IS = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== n.g.TYPED_ARRAY_SUPPORT ? n.g.TYPED_ARRAY_SUPPORT : function() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }(), a(), c.poolSize = 8192, c._augment = function(t) {
                    return t.__proto__ = c.prototype, t
                }, c.from = function(t, e, n) {
                    return u(null, t, e, n)
                }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
                    value: null,
                    configurable: !0
                })), c.alloc = function(t, e, n) {
                    return function(t, e, n, r) {
                        return l(e), e <= 0 ? s(t, e) : void 0 !== n ? "string" == typeof r ? s(t, e).fill(n, r) : s(t, e).fill(n) : s(t, e)
                    }(null, t, e, n)
                }, c.allocUnsafe = function(t) {
                    return d(null, t)
                }, c.allocUnsafeSlow = function(t) {
                    return d(null, t)
                }, c.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, c.compare = function(t, e) {
                    if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
                        if (t[o] !== e[o]) {
                            n = t[o], r = e[o];
                            break
                        }
                    return n < r ? -1 : r < n ? 1 : 0
                }, c.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, c.concat = function(t, e) {
                    if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return c.alloc(0);
                    var n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = c.allocUnsafe(e),
                        o = 0;
                    for (n = 0; n < t.length; ++n) {
                        var a = t[n];
                        if (!c.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(r, o), o += a.length
                    }
                    return r
                }, c.byteLength = f, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) g(this, e, e + 1);
                    return this
                }, c.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
                    return this
                }, c.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
                    return this
                }, c.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? E(this, 0, t) : m.apply(this, arguments)
                }, c.prototype.equals = function(t) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === c.compare(this, t)
                }, c.prototype.inspect = function() {
                    var t = "",
                        n = e.IS;
                    return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
                }, c.prototype.compare = function(t, e, n, r, o) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
                    if (r >= o && e >= n) return 0;
                    if (r >= o) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), s = Math.min(i, a), u = this.slice(r, o), l = t.slice(e, n), d = 0; d < s; ++d)
                        if (u[d] !== l[d]) {
                            i = u[d], a = l[d];
                            break
                        }
                    return i < a ? -1 : a < i ? 1 : 0
                }, c.prototype.includes = function(t, e, n) {
                    return -1 !== this.indexOf(t, e, n)
                }, c.prototype.indexOf = function(t, e, n) {
                    return y(this, t, e, n, !0)
                }, c.prototype.lastIndexOf = function(t, e, n) {
                    return y(this, t, e, n, !1)
                }, c.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var o = this.length - e;
                    if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var i = !1;;) switch (r) {
                        case "hex":
                            return I(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return b(this, t, e, n);
                        case "ascii":
                            return C(this, t, e, n);
                        case "latin1":
                        case "binary":
                            return w(this, t, e, n);
                        case "base64":
                            return S(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return A(this, t, e, n);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), i = !0
                    }
                }, c.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var R = 4096;

                function M(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
                    return r
                }

                function T(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
                    return r
                }

                function L(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var o = "", i = e; i < n; ++i) o += B(t[i]);
                    return o
                }

                function _(t, e, n) {
                    for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                    return o
                }

                function x(t, e, n) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function N(t, e, n, r, o, i) {
                    if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function O(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
                }

                function F(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255
                }

                function V(t, e, n, r, o, i) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function W(t, e, n, r, i) {
                    return i || V(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
                }

                function D(t, e, n, r, i) {
                    return i || V(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
                }
                c.prototype.slice = function(t, e) {
                    var n, r = this.length;
                    if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = c.prototype;
                    else {
                        var o = e - t;
                        n = new c(o, void 0);
                        for (var i = 0; i < o; ++i) n[i] = this[i + t]
                    }
                    return n
                }, c.prototype.readUIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || x(t, e, this.length);
                    for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
                    return r
                }, c.prototype.readUIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || x(t, e, this.length);
                    for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;
                    return r
                }, c.prototype.readUInt8 = function(t, e) {
                    return e || x(t, 1, this.length), this[t]
                }, c.prototype.readUInt16LE = function(t, e) {
                    return e || x(t, 2, this.length), this[t] | this[t + 1] << 8
                }, c.prototype.readUInt16BE = function(t, e) {
                    return e || x(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, c.prototype.readUInt32LE = function(t, e) {
                    return e || x(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, c.prototype.readUInt32BE = function(t, e) {
                    return e || x(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, c.prototype.readIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || x(t, e, this.length);
                    for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
                    return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r
                }, c.prototype.readIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || x(t, e, this.length);
                    for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;
                    return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
                }, c.prototype.readInt8 = function(t, e) {
                    return e || x(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, c.prototype.readInt16LE = function(t, e) {
                    e || x(t, 2, this.length);
                    var n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, c.prototype.readInt16BE = function(t, e) {
                    e || x(t, 2, this.length);
                    var n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, c.prototype.readInt32LE = function(t, e) {
                    return e || x(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, c.prototype.readInt32BE = function(t, e) {
                    return e || x(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, c.prototype.readFloatLE = function(t, e) {
                    return e || x(t, 4, this.length), o.read(this, t, !0, 23, 4)
                }, c.prototype.readFloatBE = function(t, e) {
                    return e || x(t, 4, this.length), o.read(this, t, !1, 23, 4)
                }, c.prototype.readDoubleLE = function(t, e) {
                    return e || x(t, 8, this.length), o.read(this, t, !0, 52, 8)
                }, c.prototype.readDoubleBE = function(t, e) {
                    return e || x(t, 8, this.length), o.read(this, t, !1, 52, 8)
                }, c.prototype.writeUIntLE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || N(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var o = 1,
                        i = 0;
                    for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, c.prototype.writeUIntBE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || N(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var o = n - 1,
                        i = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, c.prototype.writeUInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, c.prototype.writeUInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
                }, c.prototype.writeUInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
                }, c.prototype.writeUInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : F(this, t, e, !0), e + 4
                }, c.prototype.writeUInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : F(this, t, e, !1), e + 4
                }, c.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var o = Math.pow(2, 8 * n - 1);
                        N(this, t, e, n, o - 1, -o)
                    }
                    var i = 0,
                        a = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++i < n && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), this[e + i] = (t / a | 0) - s & 255;
                    return e + n
                }, c.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var o = Math.pow(2, 8 * n - 1);
                        N(this, t, e, n, o - 1, -o)
                    }
                    var i = n - 1,
                        a = 1,
                        s = 0;
                    for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), this[e + i] = (t / a | 0) - s & 255;
                    return e + n
                }, c.prototype.writeInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, c.prototype.writeInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
                }, c.prototype.writeInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
                }, c.prototype.writeInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : F(this, t, e, !0), e + 4
                }, c.prototype.writeInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || N(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : F(this, t, e, !1), e + 4
                }, c.prototype.writeFloatLE = function(t, e, n) {
                    return W(this, t, e, !0, n)
                }, c.prototype.writeFloatBE = function(t, e, n) {
                    return W(this, t, e, !1, n)
                }, c.prototype.writeDoubleLE = function(t, e, n) {
                    return D(this, t, e, !0, n)
                }, c.prototype.writeDoubleBE = function(t, e, n) {
                    return D(this, t, e, !1, n)
                }, c.prototype.copy = function(t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var o, i = r - n;
                    if (this === t && n < e && e < r)
                        for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
                    else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                        for (o = 0; o < i; ++o) t[o + e] = this[o + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
                    return i
                }, c.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var o = t.charCodeAt(0);
                            o < 256 && (t = o)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    var i;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (i = e; i < n; ++i) this[i] = t;
                    else {
                        var a = c.isBuffer(t) ? t : G(new c(t, r).toString()),
                            s = a.length;
                        for (i = 0; i < n - e; ++i) this[i + e] = a[i % s]
                    }
                    return this
                };
                var Z = /[^+\/0-9A-Za-z-_]/g;

                function B(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function G(t, e) {
                    var n;
                    e = e || 1 / 0;
                    for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
                        if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
                            if (!o) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === r) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                o = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                                continue
                            }
                            n = 65536 + (o - 55296 << 10 | n - 56320)
                        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (o = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            i.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return i
                }

                function P(t) {
                    return r.toByteArray(function(t) {
                        if ((t = function(t) {
                                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                            }(t).replace(Z, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function U(t, e, n, r) {
                    for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
                    return o
                }
            },
            251: (t, e) => {
                e.read = function(t, e, n, r, o) {
                    var i, a, s = 8 * o - r - 1,
                        c = (1 << s) - 1,
                        u = c >> 1,
                        l = -7,
                        d = n ? o - 1 : 0,
                        h = n ? -1 : 1,
                        p = t[e + d];
                    for (d += h, i = p & (1 << -l) - 1, p >>= -l, l += s; l > 0; i = 256 * i + t[e + d], d += h, l -= 8);
                    for (a = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; a = 256 * a + t[e + d], d += h, l -= 8);
                    if (0 === i) i = 1 - u;
                    else {
                        if (i === c) return a ? NaN : 1 / 0 * (p ? -1 : 1);
                        a += Math.pow(2, r), i -= u
                    }
                    return (p ? -1 : 1) * a * Math.pow(2, i - r)
                }, e.write = function(t, e, n, r, o, i) {
                    var a, s, c, u = 8 * i - o - 1,
                        l = (1 << u) - 1,
                        d = l >> 1,
                        h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        p = r ? 0 : i - 1,
                        f = r ? 1 : -1,
                        m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = l) : (a = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -a)) < 1 && (a--, c *= 2), (e += a + d >= 1 ? h / c : h * Math.pow(2, 1 - d)) * c >= 2 && (a++, c /= 2), a + d >= l ? (s = 0, a = l) : a + d >= 1 ? (s = (e * c - 1) * Math.pow(2, o), a += d) : (s = e * Math.pow(2, d - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + p] = 255 & s, p += f, s /= 256, o -= 8);
                    for (a = a << o | s, u += o; u > 0; t[n + p] = 255 & a, p += f, a /= 256, u -= 8);
                    t[n + p - f] |= 128 * m
                }
            },
            634: t => {
                var e = {}.toString;
                t.exports = Array.isArray || function(t) {
                    return "[object Array]" == e.call(t)
                }
            },
            606: t => {
                var e, n, r = t.exports = {};

                function o() {
                    throw new Error("setTimeout has not been defined")
                }

                function i() {
                    throw new Error("clearTimeout has not been defined")
                }

                function a(t) {
                    if (e === setTimeout) return setTimeout(t, 0);
                    if ((e === o || !e) && setTimeout) return e = setTimeout, setTimeout(t, 0);
                    try {
                        return e(t, 0)
                    } catch (n) {
                        try {
                            return e.call(null, t, 0)
                        } catch (n) {
                            return e.call(this, t, 0)
                        }
                    }
                }! function() {
                    try {
                        e = "function" == typeof setTimeout ? setTimeout : o
                    } catch (t) {
                        e = o
                    }
                    try {
                        n = "function" == typeof clearTimeout ? clearTimeout : i
                    } catch (t) {
                        n = i
                    }
                }();
                var s, c = [],
                    u = !1,
                    l = -1;

                function d() {
                    u && s && (u = !1, s.length ? c = s.concat(c) : l = -1, c.length && h())
                }

                function h() {
                    if (!u) {
                        var t = a(d);
                        u = !0;
                        for (var e = c.length; e;) {
                            for (s = c, c = []; ++l < e;) s && s[l].run();
                            l = -1, e = c.length
                        }
                        s = null, u = !1,
                            function(t) {
                                if (n === clearTimeout) return clearTimeout(t);
                                if ((n === i || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                                try {
                                    return n(t)
                                } catch (e) {
                                    try {
                                        return n.call(null, t)
                                    } catch (e) {
                                        return n.call(this, t)
                                    }
                                }
                            }(t)
                    }
                }

                function p(t, e) {
                    this.fun = t, this.array = e
                }

                function f() {}
                r.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (arguments.length > 1)
                        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    c.push(new p(t, e)), 1 !== c.length || u || a(h)
                }, p.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = f, r.addListener = f, r.once = f, r.off = f, r.removeListener = f, r.removeAllListeners = f, r.emit = f, r.prependListener = f, r.prependOnceListener = f, r.listeners = function(t) {
                    return []
                }, r.binding = function(t) {
                    throw new Error("process.binding is not supported")
                }, r.cwd = function() {
                    return "/"
                }, r.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                }, r.umask = function() {
                    return 0
                }
            },
            302: (t, e, n) => {
                "use strict";
                n.d(e, {
                    A: () => u
                });
                const r = {
                    randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
                };
                let o;
                const i = new Uint8Array(16);

                function a() {
                    if (!o && (o = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !o)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return o(i)
                }
                const s = [];
                for (let t = 0; t < 256; ++t) s.push((t + 256).toString(16).slice(1));

                function c(t, e = 0) {
                    return s[t[e + 0]] + s[t[e + 1]] + s[t[e + 2]] + s[t[e + 3]] + "-" + s[t[e + 4]] + s[t[e + 5]] + "-" + s[t[e + 6]] + s[t[e + 7]] + "-" + s[t[e + 8]] + s[t[e + 9]] + "-" + s[t[e + 10]] + s[t[e + 11]] + s[t[e + 12]] + s[t[e + 13]] + s[t[e + 14]] + s[t[e + 15]]
                }
                const u = function(t, e, n) {
                    if (r.randomUUID && !e && !t) return r.randomUUID();
                    const o = (t = t || {}).random || (t.rng || a)();
                    if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, e) {
                        n = n || 0;
                        for (let t = 0; t < 16; ++t) e[n + t] = o[t];
                        return e
                    }
                    return c(o)
                }
            },
            727: (t, e, n) => {
                "use strict";
                var r;

                function o(t) {
                    return t.nodeType === t.ELEMENT_NODE
                }

                function i(t) {
                    var e = null == t ? void 0 : t.host;
                    return Boolean((null == e ? void 0 : e.shadowRoot) === t)
                }

                function a(t) {
                    return "[object ShadowRoot]" === Object.prototype.toString.call(t)
                }

                function s(t) {
                    try {
                        var e = t.rules || t.cssRules;
                        return e ? ((n = Array.from(e).map(c).join("")).includes(" background-clip: text;") && !n.includes(" -webkit-background-clip: text;") && (n = n.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), n) : null
                    } catch (t) {
                        return null
                    }
                    var n
                }

                function c(t) {
                    var e = t.cssText;
                    if (function(t) {
                            return "styleSheet" in t
                        }(t)) try {
                        e = s(t.styleSheet) || e
                    } catch (t) {}
                    return e
                }
                n.d(e, {
                        A: () => oe
                    }),
                    function(t) {
                        t[t.Document = 0] = "Document", t[t.DocumentType = 1] = "DocumentType", t[t.Element = 2] = "Element", t[t.Text = 3] = "Text", t[t.CDATA = 4] = "CDATA", t[t.Comment = 5] = "Comment"
                    }(r || (r = {}));
                var u = function() {
                    function t() {
                        this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
                    }
                    return t.prototype.getId = function(t) {
                        var e;
                        if (!t) return -1;
                        var n = null === (e = this.getMeta(t)) || void 0 === e ? void 0 : e.id;
                        return null != n ? n : -1
                    }, t.prototype.getNode = function(t) {
                        return this.idNodeMap.get(t) || null
                    }, t.prototype.getIds = function() {
                        return Array.from(this.idNodeMap.keys())
                    }, t.prototype.getMeta = function(t) {
                        return this.nodeMetaMap.get(t) || null
                    }, t.prototype.removeNodeFromMap = function(t) {
                        var e = this,
                            n = this.getId(t);
                        this.idNodeMap.delete(n), t.childNodes && t.childNodes.forEach((function(t) {
                            return e.removeNodeFromMap(t)
                        }))
                    }, t.prototype.has = function(t) {
                        return this.idNodeMap.has(t)
                    }, t.prototype.hasNode = function(t) {
                        return this.nodeMetaMap.has(t)
                    }, t.prototype.add = function(t, e) {
                        var n = e.id;
                        this.idNodeMap.set(n, t), this.nodeMetaMap.set(t, e)
                    }, t.prototype.replace = function(t, e) {
                        var n = this.getNode(t);
                        if (n) {
                            var r = this.nodeMetaMap.get(n);
                            r && this.nodeMetaMap.set(e, r)
                        }
                        this.idNodeMap.set(t, e)
                    }, t.prototype.reset = function() {
                        this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
                    }, t
                }();

                function l(t) {
                    var e = t.maskInputOptions,
                        n = t.tagName,
                        r = t.type,
                        o = t.value,
                        i = t.maskInputFn,
                        a = o || "";
                    return (e[n.toLowerCase()] || e[r]) && (a = i ? i(a) : "*".repeat(a.length)), a
                }
                var d = "__rrweb_original__";
                var h, p, f = 1,
                    m = new RegExp("[^a-z0-9-_:]"),
                    g = -2;

                function y() {
                    return f++
                }
                var v = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
                    I = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
                    b = /^(data:)([^,]*),(.*)/i;

                function C(t, e) {
                    return (t || "").replace(v, (function(t, n, r, o, i, a) {
                        var s, c = r || i || a,
                            u = n || o || "";
                        if (!c) return t;
                        if (!I.test(c)) return "url(".concat(u).concat(c).concat(u, ")");
                        if (b.test(c)) return "url(".concat(u).concat(c).concat(u, ")");
                        if ("/" === c[0]) return "url(".concat(u).concat((s = e, (s.indexOf("//") > -1 ? s.split("/").slice(0, 3).join("/") : s.split("/")[0]).split("?")[0] + c)).concat(u, ")");
                        var l = e.split("/"),
                            d = c.split("/");
                        l.pop();
                        for (var h = 0, p = d; h < p.length; h++) {
                            var f = p[h];
                            "." !== f && (".." === f ? l.pop() : l.push(f))
                        }
                        return "url(".concat(u).concat(l.join("/")).concat(u, ")")
                    }))
                }
                var w = /^[^ \t\n\r\u000c]+/,
                    S = /^[, \t\n\r\u000c]+/;

                function A(t, e) {
                    if (!e || "" === e.trim()) return e;
                    var n = t.createElement("a");
                    return n.href = e, n.href
                }

                function k(t) {
                    return Boolean("svg" === t.tagName || t.ownerSVGElement)
                }

                function E() {
                    var t = document.createElement("a");
                    return t.href = "", t.href
                }

                function R(t, e, n, r) {
                    return "src" === n || "href" === n && r && ("use" !== e || "#" !== r[0]) || "xlink:href" === n && r && "#" !== r[0] ? A(t, r) : "background" !== n || !r || "table" !== e && "td" !== e && "th" !== e ? "srcset" === n && r ? function(t, e) {
                        if ("" === e.trim()) return e;
                        var n = 0;

                        function r(t) {
                            var r, o = t.exec(e.substring(n));
                            return o ? (r = o[0], n += r.length, r) : ""
                        }
                        for (var o = []; r(S), !(n >= e.length);) {
                            var i = r(w);
                            if ("," === i.slice(-1)) i = A(t, i.substring(0, i.length - 1)), o.push(i);
                            else {
                                var a = "";
                                i = A(t, i);
                                for (var s = !1;;) {
                                    var c = e.charAt(n);
                                    if ("" === c) {
                                        o.push((i + a).trim());
                                        break
                                    }
                                    if (s) ")" === c && (s = !1);
                                    else {
                                        if ("," === c) {
                                            n += 1, o.push((i + a).trim());
                                            break
                                        }
                                        "(" === c && (s = !0)
                                    }
                                    a += c, n += 1
                                }
                            }
                        }
                        return o.join(", ")
                    }(t, r) : "style" === n && r ? C(r, E()) : "object" === e && "data" === n && r ? A(t, r) : r : A(t, r)
                }

                function M(t, e, n) {
                    if (!t) return !1;
                    if (t.nodeType !== t.ELEMENT_NODE) return !!n && M(t.parentNode, e, n);
                    for (var r = t.classList.length; r--;) {
                        var o = t.classList[r];
                        if (e.test(o)) return !0
                    }
                    return !!n && M(t.parentNode, e, n)
                }

                function T(t, e, n) {
                    var r = t.nodeType === t.ELEMENT_NODE ? t : t.parentElement;
                    if (null === r) return !1;
                    if ("string" == typeof e) {
                        if (r.classList.contains(e)) return !0;
                        if (r.closest(".".concat(e))) return !0
                    } else if (M(r, e, !0)) return !0;
                    if (n) {
                        if (r.matches(n)) return !0;
                        if (r.closest(n)) return !0
                    }
                    return !1
                }

                function L(t, e) {
                    var n = e.doc,
                        o = e.mirror,
                        i = e.blockClass,
                        a = e.blockSelector,
                        c = e.maskTextClass,
                        u = e.maskTextSelector,
                        f = e.inlineStylesheet,
                        g = e.maskInputOptions,
                        y = void 0 === g ? {} : g,
                        v = e.maskTextFn,
                        I = e.maskInputFn,
                        b = e.dataURLOptions,
                        w = void 0 === b ? {} : b,
                        S = e.inlineImages,
                        A = e.recordCanvas,
                        M = e.keepIframeSrcFn,
                        L = e.newlyAddedElement,
                        _ = void 0 !== L && L,
                        x = function(t, e) {
                            if (!e.hasNode(t)) return;
                            var n = e.getId(t);
                            return 1 === n ? void 0 : n
                        }(n, o);
                    switch (t.nodeType) {
                        case t.DOCUMENT_NODE:
                            return "CSS1Compat" !== t.compatMode ? {
                                type: r.Document,
                                childNodes: [],
                                compatMode: t.compatMode
                            } : {
                                type: r.Document,
                                childNodes: []
                            };
                        case t.DOCUMENT_TYPE_NODE:
                            return {
                                type: r.DocumentType,
                                name: t.name,
                                publicId: t.publicId,
                                systemId: t.systemId,
                                rootId: x
                            };
                        case t.ELEMENT_NODE:
                            return function(t, e) {
                                for (var n = e.doc, o = e.blockClass, i = e.blockSelector, a = e.inlineStylesheet, c = e.maskInputOptions, u = void 0 === c ? {} : c, f = e.maskInputFn, g = e.dataURLOptions, y = void 0 === g ? {} : g, v = e.inlineImages, I = e.recordCanvas, b = e.keepIframeSrcFn, w = e.newlyAddedElement, S = void 0 !== w && w, A = e.rootId, M = function(t, e, n) {
                                        if ("string" == typeof e) {
                                            if (t.classList.contains(e)) return !0
                                        } else
                                            for (var r = t.classList.length; r--;) {
                                                var o = t.classList[r];
                                                if (e.test(o)) return !0
                                            }
                                        return !!n && t.matches(n)
                                    }(t, o, i), T = function(t) {
                                        if (t instanceof HTMLFormElement) return "form";
                                        var e = t.tagName.toLowerCase().trim();
                                        return m.test(e) ? "div" : e
                                    }(t), L = {}, _ = t.attributes.length, x = 0; x < _; x++) {
                                    var N = t.attributes[x];
                                    L[N.name] = R(n, T, N.name, N.value)
                                }
                                if ("link" === T && a) {
                                    var O = Array.from(n.styleSheets).find((function(e) {
                                            return e.href === t.href
                                        })),
                                        F = null;
                                    O && (F = s(O)), F && (delete L.rel, delete L.href, L._cssText = C(F, O.href))
                                }
                                if ("style" === T && t.sheet && !(t.innerText || t.textContent || "").trim().length) {
                                    (F = s(t.sheet)) && (L._cssText = C(F, E()))
                                }
                                if ("input" === T || "textarea" === T || "select" === T) {
                                    var V = t.value,
                                        W = t.checked;
                                    "radio" !== L.type && "checkbox" !== L.type && "submit" !== L.type && "button" !== L.type && V ? L.value = l({
                                        type: L.type,
                                        tagName: T,
                                        value: V,
                                        maskInputOptions: u,
                                        maskInputFn: f
                                    }) : W && (L.checked = W)
                                }
                                "option" === T && (t.selected && !u.select ? L.selected = !0 : delete L.selected);
                                if ("canvas" === T && I)
                                    if ("2d" === t.__context)(function(t) {
                                        var e = t.getContext("2d");
                                        if (!e) return !0;
                                        for (var n = 0; n < t.width; n += 50)
                                            for (var r = 0; r < t.height; r += 50) {
                                                var o = e.getImageData,
                                                    i = d in o ? o[d] : o;
                                                if (new Uint32Array(i.call(e, n, r, Math.min(50, t.width - n), Math.min(50, t.height - r)).data.buffer).some((function(t) {
                                                        return 0 !== t
                                                    }))) return !1
                                            }
                                        return !0
                                    })(t) || (L.rr_dataURL = t.toDataURL(y.type, y.quality));
                                    else if (!("__context" in t)) {
                                    var D = t.toDataURL(y.type, y.quality),
                                        Z = document.createElement("canvas");
                                    Z.width = t.width, Z.height = t.height, D !== Z.toDataURL(y.type, y.quality) && (L.rr_dataURL = D)
                                }
                                if ("img" === T && v) {
                                    h || (h = n.createElement("canvas"), p = h.getContext("2d"));
                                    var B = t,
                                        G = B.crossOrigin;
                                    B.crossOrigin = "anonymous";
                                    var P = function() {
                                        try {
                                            h.width = B.naturalWidth, h.height = B.naturalHeight, p.drawImage(B, 0, 0), L.rr_dataURL = h.toDataURL(y.type, y.quality)
                                        } catch (t) {
                                            console.warn("Cannot inline img src=".concat(B.currentSrc, "! Error: ").concat(t))
                                        }
                                        G ? L.crossOrigin = G : B.removeAttribute("crossorigin")
                                    };
                                    B.complete && 0 !== B.naturalWidth ? P() : B.onload = P
                                }
                                "audio" !== T && "video" !== T || (L.rr_mediaState = t.paused ? "paused" : "played", L.rr_mediaCurrentTime = t.currentTime);
                                S || (t.scrollLeft && (L.rr_scrollLeft = t.scrollLeft), t.scrollTop && (L.rr_scrollTop = t.scrollTop));
                                if (M) {
                                    var U = t.getBoundingClientRect(),
                                        Y = U.width,
                                        j = U.height;
                                    L = {
                                        class: L.class,
                                        rr_width: "".concat(Y, "px"),
                                        rr_height: "".concat(j, "px")
                                    }
                                }
                                "iframe" !== T || b(L.src) || (t.contentDocument || (L.rr_src = L.src), delete L.src);
                                return {
                                    type: r.Element,
                                    tagName: T,
                                    attributes: L,
                                    childNodes: [],
                                    isSVG: k(t) || void 0,
                                    needBlock: M,
                                    rootId: A
                                }
                            }(t, {
                                doc: n,
                                blockClass: i,
                                blockSelector: a,
                                inlineStylesheet: f,
                                maskInputOptions: y,
                                maskInputFn: I,
                                dataURLOptions: w,
                                inlineImages: S,
                                recordCanvas: A,
                                keepIframeSrcFn: M,
                                newlyAddedElement: _,
                                rootId: x
                            });
                        case t.TEXT_NODE:
                            return function(t, e) {
                                var n, o = e.maskTextClass,
                                    i = e.maskTextSelector,
                                    a = e.maskTextFn,
                                    s = e.rootId,
                                    c = t.parentNode && t.parentNode.tagName,
                                    u = t.textContent,
                                    l = "STYLE" === c || void 0,
                                    d = "SCRIPT" === c || void 0;
                                if (l && u) {
                                    try {
                                        t.nextSibling || t.previousSibling || (null === (n = t.parentNode.sheet) || void 0 === n ? void 0 : n.cssRules) && (u = (h = t.parentNode.sheet).cssRules ? Array.from(h.cssRules).map((function(t) {
                                            return t.cssText || ""
                                        })).join("") : "")
                                    } catch (e) {
                                        console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(e), t)
                                    }
                                    u = C(u, E())
                                }
                                var h;
                                d && (u = "SCRIPT_PLACEHOLDER");
                                !l && !d && u && T(t, o, i) && (u = a ? a(u) : u.replace(/[\S]/g, "*"));
                                return {
                                    type: r.Text,
                                    textContent: u || "",
                                    isStyle: l,
                                    rootId: s
                                }
                            }(t, {
                                maskTextClass: c,
                                maskTextSelector: u,
                                maskTextFn: v,
                                rootId: x
                            });
                        case t.CDATA_SECTION_NODE:
                            return {
                                type: r.CDATA,
                                textContent: "",
                                rootId: x
                            };
                        case t.COMMENT_NODE:
                            return {
                                type: r.Comment,
                                textContent: t.textContent || "",
                                rootId: x
                            };
                        default:
                            return !1
                    }
                }

                function _(t) {
                    return void 0 === t ? "" : t.toLowerCase()
                }

                function x(t, e) {
                    var n, s = e.doc,
                        c = e.mirror,
                        u = e.blockClass,
                        l = e.blockSelector,
                        d = e.maskTextClass,
                        h = e.maskTextSelector,
                        p = e.skipChild,
                        f = void 0 !== p && p,
                        m = e.inlineStylesheet,
                        v = void 0 === m || m,
                        I = e.maskInputOptions,
                        b = void 0 === I ? {} : I,
                        C = e.maskTextFn,
                        w = e.maskInputFn,
                        S = e.slimDOMOptions,
                        A = e.dataURLOptions,
                        k = void 0 === A ? {} : A,
                        E = e.inlineImages,
                        R = void 0 !== E && E,
                        M = e.recordCanvas,
                        T = void 0 !== M && M,
                        N = e.onSerialize,
                        O = e.onIframeLoad,
                        F = e.iframeLoadTimeout,
                        V = void 0 === F ? 5e3 : F,
                        W = e.onStylesheetLoad,
                        D = e.stylesheetLoadTimeout,
                        Z = void 0 === D ? 5e3 : D,
                        B = e.keepIframeSrcFn,
                        G = void 0 === B ? function() {
                            return !1
                        } : B,
                        P = e.newlyAddedElement,
                        U = void 0 !== P && P,
                        Y = e.preserveWhiteSpace,
                        j = void 0 === Y || Y,
                        J = L(t, {
                            doc: s,
                            mirror: c,
                            blockClass: u,
                            blockSelector: l,
                            maskTextClass: d,
                            maskTextSelector: h,
                            inlineStylesheet: v,
                            maskInputOptions: b,
                            maskTextFn: C,
                            maskInputFn: w,
                            dataURLOptions: k,
                            inlineImages: R,
                            recordCanvas: T,
                            keepIframeSrcFn: G,
                            newlyAddedElement: U
                        });
                    if (!J) return console.warn(t, "not serialized"), null;
                    n = c.hasNode(t) ? c.getId(t) : ! function(t, e) {
                        if (e.comment && t.type === r.Comment) return !0;
                        if (t.type === r.Element) {
                            if (e.script && ("script" === t.tagName || "link" === t.tagName && "preload" === t.attributes.rel && "script" === t.attributes.as || "link" === t.tagName && "prefetch" === t.attributes.rel && "string" == typeof t.attributes.href && t.attributes.href.endsWith(".js"))) return !0;
                            if (e.headFavicon && ("link" === t.tagName && "shortcut icon" === t.attributes.rel || "meta" === t.tagName && (_(t.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === _(t.attributes.name) || "icon" === _(t.attributes.rel) || "apple-touch-icon" === _(t.attributes.rel) || "shortcut icon" === _(t.attributes.rel)))) return !0;
                            if ("meta" === t.tagName) {
                                if (e.headMetaDescKeywords && _(t.attributes.name).match(/^description|keywords$/)) return !0;
                                if (e.headMetaSocial && (_(t.attributes.property).match(/^(og|twitter|fb):/) || _(t.attributes.name).match(/^(og|twitter):/) || "pinterest" === _(t.attributes.name))) return !0;
                                if (e.headMetaRobots && ("robots" === _(t.attributes.name) || "googlebot" === _(t.attributes.name) || "bingbot" === _(t.attributes.name))) return !0;
                                if (e.headMetaHttpEquiv && void 0 !== t.attributes["http-equiv"]) return !0;
                                if (e.headMetaAuthorship && ("author" === _(t.attributes.name) || "generator" === _(t.attributes.name) || "framework" === _(t.attributes.name) || "publisher" === _(t.attributes.name) || "progid" === _(t.attributes.name) || _(t.attributes.property).match(/^article:/) || _(t.attributes.property).match(/^product:/))) return !0;
                                if (e.headMetaVerification && ("google-site-verification" === _(t.attributes.name) || "yandex-verification" === _(t.attributes.name) || "csrf-token" === _(t.attributes.name) || "p:domain_verify" === _(t.attributes.name) || "verify-v1" === _(t.attributes.name) || "verification" === _(t.attributes.name) || "shopify-checkout-api-token" === _(t.attributes.name))) return !0
                            }
                        }
                        return !1
                    }(J, S) && (j || J.type !== r.Text || J.isStyle || J.textContent.replace(/^\s+|\s+$/gm, "").length) ? y() : g;
                    var X = Object.assign(J, {
                        id: n
                    });
                    if (c.add(t, X), n === g) return null;
                    N && N(t);
                    var K = !f;
                    if (X.type === r.Element) {
                        K = K && !X.needBlock, delete X.needBlock;
                        var z = t.shadowRoot;
                        z && a(z) && (X.isShadowHost = !0)
                    }
                    if ((X.type === r.Document || X.type === r.Element) && K) {
                        S.headWhitespace && X.type === r.Element && "head" === X.tagName && (j = !1);
                        for (var H = {
                                doc: s,
                                mirror: c,
                                blockClass: u,
                                blockSelector: l,
                                maskTextClass: d,
                                maskTextSelector: h,
                                skipChild: f,
                                inlineStylesheet: v,
                                maskInputOptions: b,
                                maskTextFn: C,
                                maskInputFn: w,
                                slimDOMOptions: S,
                                dataURLOptions: k,
                                inlineImages: R,
                                recordCanvas: T,
                                preserveWhiteSpace: j,
                                onSerialize: N,
                                onIframeLoad: O,
                                iframeLoadTimeout: V,
                                onStylesheetLoad: W,
                                stylesheetLoadTimeout: Z,
                                keepIframeSrcFn: G
                            }, Q = 0, q = Array.from(t.childNodes); Q < q.length; Q++) {
                            (et = x(q[Q], H)) && X.childNodes.push(et)
                        }
                        if (o(t) && t.shadowRoot)
                            for (var $ = 0, tt = Array.from(t.shadowRoot.childNodes); $ < tt.length; $++) {
                                var et;
                                (et = x(tt[$], H)) && (a(t.shadowRoot) && (et.isShadow = !0), X.childNodes.push(et))
                            }
                    }
                    return t.parentNode && i(t.parentNode) && a(t.parentNode) && (X.isShadow = !0), X.type === r.Element && "iframe" === X.tagName && function(t, e, n) {
                        var r = t.contentWindow;
                        if (r) {
                            var o, i = !1;
                            try {
                                o = r.document.readyState
                            } catch (t) {
                                return
                            }
                            if ("complete" === o) {
                                var a = "about:blank";
                                if (r.location.href !== a || t.src === a || "" === t.src) return setTimeout(e, 0), t.addEventListener("load", e);
                                t.addEventListener("load", e)
                            } else {
                                var s = setTimeout((function() {
                                    i || (e(), i = !0)
                                }), n);
                                t.addEventListener("load", (function() {
                                    clearTimeout(s), i = !0, e()
                                }))
                            }
                        }
                    }(t, (function() {
                        var e = t.contentDocument;
                        if (e && O) {
                            var n = x(e, {
                                doc: e,
                                mirror: c,
                                blockClass: u,
                                blockSelector: l,
                                maskTextClass: d,
                                maskTextSelector: h,
                                skipChild: !1,
                                inlineStylesheet: v,
                                maskInputOptions: b,
                                maskTextFn: C,
                                maskInputFn: w,
                                slimDOMOptions: S,
                                dataURLOptions: k,
                                inlineImages: R,
                                recordCanvas: T,
                                preserveWhiteSpace: j,
                                onSerialize: N,
                                onIframeLoad: O,
                                iframeLoadTimeout: V,
                                onStylesheetLoad: W,
                                stylesheetLoadTimeout: Z,
                                keepIframeSrcFn: G
                            });
                            n && O(t, n)
                        }
                    }), V), X.type === r.Element && "link" === X.tagName && "stylesheet" === X.attributes.rel && function(t, e, n) {
                        var r, o = !1;
                        try {
                            r = t.sheet
                        } catch (t) {
                            return
                        }
                        if (!r) {
                            var i = setTimeout((function() {
                                o || (e(), o = !0)
                            }), n);
                            t.addEventListener("load", (function() {
                                clearTimeout(i), o = !0, e()
                            }))
                        }
                    }(t, (function() {
                        if (W) {
                            var e = x(t, {
                                doc: s,
                                mirror: c,
                                blockClass: u,
                                blockSelector: l,
                                maskTextClass: d,
                                maskTextSelector: h,
                                skipChild: !1,
                                inlineStylesheet: v,
                                maskInputOptions: b,
                                maskTextFn: C,
                                maskInputFn: w,
                                slimDOMOptions: S,
                                dataURLOptions: k,
                                inlineImages: R,
                                recordCanvas: T,
                                preserveWhiteSpace: j,
                                onSerialize: N,
                                onIframeLoad: O,
                                iframeLoadTimeout: V,
                                onStylesheetLoad: W,
                                stylesheetLoadTimeout: Z,
                                keepIframeSrcFn: G
                            });
                            e && W(t, e)
                        }
                    }), Z), X
                }
                var N = /([^\\]):hover/;
                new RegExp(N.source, "g");

                function O(t, e, n = document) {
                    const r = {
                        capture: !0,
                        passive: !0
                    };
                    return n.addEventListener(t, e, r), () => n.removeEventListener(t, e, r)
                }
                const F = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
                let V = {
                    map: {},
                    getId: () => (console.error(F), -1),
                    getNode: () => (console.error(F), null),
                    removeNodeFromMap() {
                        console.error(F)
                    },
                    has: () => (console.error(F), !1),
                    reset() {
                        console.error(F)
                    }
                };

                function W(t, e, n = {}) {
                    let r = null,
                        o = 0;
                    return function(...i) {
                        const a = Date.now();
                        o || !1 !== n.leading || (o = a);
                        const s = e - (a - o),
                            c = this;
                        s <= 0 || s > e ? (r && (clearTimeout(r), r = null), o = a, t.apply(c, i)) : r || !1 === n.trailing || (r = setTimeout((() => {
                            o = !1 === n.leading ? 0 : Date.now(), r = null, t.apply(c, i)
                        }), s))
                    }
                }

                function D(t, e, n, r, o = window) {
                    const i = o.Object.getOwnPropertyDescriptor(t, e);
                    return o.Object.defineProperty(t, e, r ? n : {
                        set(t) {
                            setTimeout((() => {
                                n.set.call(this, t)
                            }), 0), i && i.set && i.set.call(this, t)
                        }
                    }), () => D(t, e, i || {}, !0)
                }

                function Z(t, e, n) {
                    try {
                        if (!(e in t)) return () => {};
                        const r = t[e],
                            o = n(r);
                        return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
                            __rrweb_original__: {
                                enumerable: !1,
                                value: r
                            }
                        })), t[e] = o, () => {
                            t[e] = r
                        }
                    } catch (t) {
                        return () => {}
                    }
                }

                function B() {
                    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
                }

                function G() {
                    return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
                }

                function P(t, e, n, r) {
                    if (!t) return !1;
                    const o = t.nodeType === t.ELEMENT_NODE ? t : t.parentElement;
                    if (!o) return !1;
                    if ("string" == typeof e) {
                        if (o.classList.contains(e)) return !0;
                        if (r && null !== o.closest("." + e)) return !0
                    } else if (M(o, e, r)) return !0;
                    if (n) {
                        if (t.matches(n)) return !0;
                        if (r && null !== o.closest(n)) return !0
                    }
                    return !1
                }

                function U(t, e) {
                    return e.getId(t) === g
                }

                function Y(t, e) {
                    if (i(t)) return !1;
                    const n = e.getId(t);
                    return !e.has(n) || (!t.parentNode || t.parentNode.nodeType !== t.DOCUMENT_NODE) && (!t.parentNode || Y(t.parentNode, e))
                }

                function j(t) {
                    return Boolean(t.changedTouches)
                }

                function J(t, e) {
                    return Boolean("IFRAME" === t.nodeName && e.getMeta(t))
                }

                function X(t, e) {
                    return Boolean("LINK" === t.nodeName && t.nodeType === t.ELEMENT_NODE && t.getAttribute && "stylesheet" === t.getAttribute("rel") && e.getMeta(t))
                }

                function K(t) {
                    return Boolean(null == t ? void 0 : t.shadowRoot)
                }
                "undefined" != typeof window && window.Proxy && window.Reflect && (V = new Proxy(V, {
                    get: (t, e, n) => ("map" === e && console.error(F), Reflect.get(t, e, n))
                }));
                class z {
                    constructor() {
                        this.id = 1, this.styleIDMap = new WeakMap, this.idStyleMap = new Map
                    }
                    getId(t) {
                        var e;
                        return null !== (e = this.styleIDMap.get(t)) && void 0 !== e ? e : -1
                    }
                    has(t) {
                        return this.styleIDMap.has(t)
                    }
                    add(t, e) {
                        if (this.has(t)) return this.getId(t);
                        let n;
                        return n = void 0 === e ? this.id++ : e, this.styleIDMap.set(t, n), this.idStyleMap.set(n, t), n
                    }
                    getStyle(t) {
                        return this.idStyleMap.get(t) || null
                    }
                    reset() {
                        this.styleIDMap = new WeakMap, this.idStyleMap = new Map, this.id = 1
                    }
                    generateId() {
                        return this.id++
                    }
                }
                var H = (t => (t[t.DomContentLoaded = 0] = "DomContentLoaded", t[t.Load = 1] = "Load", t[t.FullSnapshot = 2] = "FullSnapshot", t[t.IncrementalSnapshot = 3] = "IncrementalSnapshot", t[t.Meta = 4] = "Meta", t[t.Custom = 5] = "Custom", t[t.Plugin = 6] = "Plugin", t))(H || {}),
                    Q = (t => (t[t.Mutation = 0] = "Mutation", t[t.MouseMove = 1] = "MouseMove", t[t.MouseInteraction = 2] = "MouseInteraction", t[t.Scroll = 3] = "Scroll", t[t.ViewportResize = 4] = "ViewportResize", t[t.Input = 5] = "Input", t[t.TouchMove = 6] = "TouchMove", t[t.MediaInteraction = 7] = "MediaInteraction", t[t.StyleSheetRule = 8] = "StyleSheetRule", t[t.CanvasMutation = 9] = "CanvasMutation", t[t.Font = 10] = "Font", t[t.Log = 11] = "Log", t[t.Drag = 12] = "Drag", t[t.StyleDeclaration = 13] = "StyleDeclaration", t[t.Selection = 14] = "Selection", t[t.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", t))(Q || {}),
                    q = (t => (t[t.MouseUp = 0] = "MouseUp", t[t.MouseDown = 1] = "MouseDown", t[t.Click = 2] = "Click", t[t.ContextMenu = 3] = "ContextMenu", t[t.DblClick = 4] = "DblClick", t[t.Focus = 5] = "Focus", t[t.Blur = 6] = "Blur", t[t.TouchStart = 7] = "TouchStart", t[t.TouchMove_Departed = 8] = "TouchMove_Departed", t[t.TouchEnd = 9] = "TouchEnd", t[t.TouchCancel = 10] = "TouchCancel", t))(q || {}),
                    $ = (t => (t[t["2D"] = 0] = "2D", t[t.WebGL = 1] = "WebGL", t[t.WebGL2 = 2] = "WebGL2", t))($ || {});

                function tt(t) {
                    return "__ln" in t
                }
                class et {
                    constructor() {
                        this.length = 0, this.head = null
                    }
                    get(t) {
                        if (t >= this.length) throw new Error("Position outside of list range");
                        let e = this.head;
                        for (let n = 0; n < t; n++) e = (null == e ? void 0 : e.next) || null;
                        return e
                    }
                    addNode(t) {
                        const e = {
                            value: t,
                            previous: null,
                            next: null
                        };
                        if (t.__ln = e, t.previousSibling && tt(t.previousSibling)) {
                            const n = t.previousSibling.__ln.next;
                            e.next = n, e.previous = t.previousSibling.__ln, t.previousSibling.__ln.next = e, n && (n.previous = e)
                        } else if (t.nextSibling && tt(t.nextSibling) && t.nextSibling.__ln.previous) {
                            const n = t.nextSibling.__ln.previous;
                            e.previous = n, e.next = t.nextSibling.__ln, t.nextSibling.__ln.previous = e, n && (n.next = e)
                        } else this.head && (this.head.previous = e), e.next = this.head, this.head = e;
                        this.length++
                    }
                    removeNode(t) {
                        const e = t.__ln;
                        this.head && (e.previous ? (e.previous.next = e.next, e.next && (e.next.previous = e.previous)) : (this.head = e.next, this.head && (this.head.previous = null)), t.__ln && delete t.__ln, this.length--)
                    }
                }
                const nt = (t, e) => `${t}@${e}`;
                class rt {
                    constructor() {
                        this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.processMutations = t => {
                            t.forEach(this.processMutation), this.emit()
                        }, this.emit = () => {
                            if (this.frozen || this.locked) return;
                            const t = [],
                                e = new et,
                                n = t => {
                                    let e = t,
                                        n = g;
                                    for (; n === g;) e = e && e.nextSibling, n = e && this.mirror.getId(e);
                                    return n
                                },
                                r = r => {
                                    var o, a, s, c;
                                    let u = null;
                                    (null === (a = null === (o = r.getRootNode) || void 0 === o ? void 0 : o.call(r)) || void 0 === a ? void 0 : a.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && r.getRootNode().host && (u = r.getRootNode().host);
                                    let l = u;
                                    for (;
                                        (null === (c = null === (s = null == l ? void 0 : l.getRootNode) || void 0 === s ? void 0 : s.call(l)) || void 0 === c ? void 0 : c.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && l.getRootNode().host;) l = l.getRootNode().host;
                                    const d = !(this.doc.contains(r) || l && this.doc.contains(l));
                                    if (!r.parentNode || d) return;
                                    const h = i(r.parentNode) ? this.mirror.getId(u) : this.mirror.getId(r.parentNode),
                                        p = n(r);
                                    if (-1 === h || -1 === p) return e.addNode(r);
                                    const f = x(r, {
                                        doc: this.doc,
                                        mirror: this.mirror,
                                        blockClass: this.blockClass,
                                        blockSelector: this.blockSelector,
                                        maskTextClass: this.maskTextClass,
                                        maskTextSelector: this.maskTextSelector,
                                        skipChild: !0,
                                        newlyAddedElement: !0,
                                        inlineStylesheet: this.inlineStylesheet,
                                        maskInputOptions: this.maskInputOptions,
                                        maskTextFn: this.maskTextFn,
                                        maskInputFn: this.maskInputFn,
                                        slimDOMOptions: this.slimDOMOptions,
                                        dataURLOptions: this.dataURLOptions,
                                        recordCanvas: this.recordCanvas,
                                        inlineImages: this.inlineImages,
                                        onSerialize: t => {
                                            J(t, this.mirror) && this.iframeManager.addIframe(t), X(t, this.mirror) && this.stylesheetManager.trackLinkElement(t), K(r) && this.shadowDomManager.addShadowRoot(r.shadowRoot, this.doc)
                                        },
                                        onIframeLoad: (t, e) => {
                                            this.iframeManager.attachIframe(t, e), this.shadowDomManager.observeAttachShadow(t)
                                        },
                                        onStylesheetLoad: (t, e) => {
                                            this.stylesheetManager.attachLinkElement(t, e)
                                        }
                                    });
                                    f && t.push({
                                        parentId: h,
                                        nextId: p,
                                        node: f
                                    })
                                };
                            for (; this.mapRemoves.length;) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                            for (const t of Array.from(this.movedSet.values())) it(this.removes, t, this.mirror) && !this.movedSet.has(t.parentNode) || r(t);
                            for (const t of Array.from(this.addedSet.values())) st(this.droppedSet, t) || it(this.removes, t, this.mirror) ? st(this.movedSet, t) ? r(t) : this.droppedSet.add(t) : r(t);
                            let o = null;
                            for (; e.length;) {
                                let t = null;
                                if (o) {
                                    const e = this.mirror.getId(o.value.parentNode),
                                        r = n(o.value); - 1 !== e && -1 !== r && (t = o)
                                }
                                if (!t)
                                    for (let r = e.length - 1; r >= 0; r--) {
                                        const o = e.get(r);
                                        if (o) {
                                            const e = this.mirror.getId(o.value.parentNode);
                                            if (-1 === n(o.value)) continue;
                                            if (-1 !== e) {
                                                t = o;
                                                break
                                            } {
                                                const e = o.value;
                                                if (e.parentNode && e.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                                    const n = e.parentNode.host;
                                                    if (-1 !== this.mirror.getId(n)) {
                                                        t = o;
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                if (!t) {
                                    for (; e.head;) e.removeNode(e.head.value);
                                    break
                                }
                                o = t.previous, e.removeNode(t.value), r(t.value)
                            }
                            const a = {
                                texts: this.texts.map((t => ({
                                    id: this.mirror.getId(t.node),
                                    value: t.value
                                }))).filter((t => this.mirror.has(t.id))),
                                attributes: this.attributes.map((t => ({
                                    id: this.mirror.getId(t.node),
                                    attributes: t.attributes
                                }))).filter((t => this.mirror.has(t.id))),
                                removes: this.removes,
                                adds: t
                            };
                            (a.texts.length || a.attributes.length || a.removes.length || a.adds.length) && (this.texts = [], this.attributes = [], this.removes = [], this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.movedMap = {}, this.mutationCb(a))
                        }, this.processMutation = t => {
                            if (!U(t.target, this.mirror)) switch (t.type) {
                                case "characterData":
                                    {
                                        const e = t.target.textContent;P(t.target, this.blockClass, this.blockSelector, !1) || e === t.oldValue || this.texts.push({
                                            value: T(t.target, this.maskTextClass, this.maskTextSelector) && e ? this.maskTextFn ? this.maskTextFn(e) : e.replace(/[\S]/g, "*") : e,
                                            node: t.target
                                        });
                                        break
                                    }
                                case "attributes":
                                    {
                                        const e = t.target;
                                        let n = t.target.getAttribute(t.attributeName);
                                        if ("value" === t.attributeName && (n = l({
                                                maskInputOptions: this.maskInputOptions,
                                                tagName: t.target.tagName,
                                                type: t.target.getAttribute("type"),
                                                value: n,
                                                maskInputFn: this.maskInputFn
                                            })), P(t.target, this.blockClass, this.blockSelector, !1) || n === t.oldValue) return;
                                        let r = this.attributes.find((e => e.node === t.target));
                                        if ("IFRAME" === e.tagName && "src" === t.attributeName && !this.keepIframeSrcFn(n)) {
                                            if (e.contentDocument) return;
                                            t.attributeName = "rr_src"
                                        }
                                        if (r || (r = {
                                                node: t.target,
                                                attributes: {}
                                            }, this.attributes.push(r)), "style" === t.attributeName) {
                                            const n = this.doc.createElement("span");
                                            t.oldValue && n.setAttribute("style", t.oldValue), void 0 !== r.attributes.style && null !== r.attributes.style || (r.attributes.style = {});
                                            const o = r.attributes.style;
                                            for (const t of Array.from(e.style)) {
                                                const r = e.style.getPropertyValue(t),
                                                    i = e.style.getPropertyPriority(t);
                                                r === n.style.getPropertyValue(t) && i === n.style.getPropertyPriority(t) || (o[t] = "" === i ? r : [r, i])
                                            }
                                            for (const t of Array.from(n.style)) "" === e.style.getPropertyValue(t) && (o[t] = !1)
                                        } else r.attributes[t.attributeName] = R(this.doc, e.tagName, t.attributeName, n);
                                        break
                                    }
                                case "childList":
                                    if (P(t.target, this.blockClass, this.blockSelector, !0)) return;
                                    t.addedNodes.forEach((e => this.genAdds(e, t.target))), t.removedNodes.forEach((e => {
                                        const n = this.mirror.getId(e),
                                            r = i(t.target) ? this.mirror.getId(t.target.host) : this.mirror.getId(t.target);
                                        P(t.target, this.blockClass, this.blockSelector, !1) || U(e, this.mirror) || ! function(t, e) {
                                            return -1 !== e.getId(t)
                                        }(e, this.mirror) || (this.addedSet.has(e) ? (ot(this.addedSet, e), this.droppedSet.add(e)) : this.addedSet.has(t.target) && -1 === n || Y(t.target, this.mirror) || (this.movedSet.has(e) && this.movedMap[nt(n, r)] ? ot(this.movedSet, e) : this.removes.push({
                                            parentId: r,
                                            id: n,
                                            isShadow: !(!i(t.target) || !a(t.target)) || void 0
                                        })), this.mapRemoves.push(e))
                                    }))
                            }
                        }, this.genAdds = (t, e) => {
                            if (this.mirror.hasNode(t)) {
                                if (U(t, this.mirror)) return;
                                this.movedSet.add(t);
                                let n = null;
                                e && this.mirror.hasNode(e) && (n = this.mirror.getId(e)), n && -1 !== n && (this.movedMap[nt(this.mirror.getId(t), n)] = !0)
                            } else this.addedSet.add(t), this.droppedSet.delete(t);
                            P(t, this.blockClass, this.blockSelector, !1) || t.childNodes.forEach((t => this.genAdds(t)))
                        }
                    }
                    init(t) {
                        ["mutationCb", "blockClass", "blockSelector", "maskTextClass", "maskTextSelector", "inlineStylesheet", "maskInputOptions", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager"].forEach((e => {
                            this[e] = t[e]
                        }))
                    }
                    freeze() {
                        this.frozen = !0, this.canvasManager.freeze()
                    }
                    unfreeze() {
                        this.frozen = !1, this.canvasManager.unfreeze(), this.emit()
                    }
                    isFrozen() {
                        return this.frozen
                    }
                    lock() {
                        this.locked = !0, this.canvasManager.lock()
                    }
                    unlock() {
                        this.locked = !1, this.canvasManager.unlock(), this.emit()
                    }
                    reset() {
                        this.shadowDomManager.reset(), this.canvasManager.reset()
                    }
                }

                function ot(t, e) {
                    t.delete(e), e.childNodes.forEach((e => ot(t, e)))
                }

                function it(t, e, n) {
                    return 0 !== t.length && at(t, e, n)
                }

                function at(t, e, n) {
                    const {
                        parentNode: r
                    } = e;
                    if (!r) return !1;
                    const o = n.getId(r);
                    return !!t.some((t => t.id === o)) || at(t, r, n)
                }

                function st(t, e) {
                    return 0 !== t.size && ct(t, e)
                }

                function ct(t, e) {
                    const {
                        parentNode: n
                    } = e;
                    return !!n && (!!t.has(n) || ct(t, n))
                }
                const ut = [],
                    lt = "undefined" != typeof CSSGroupingRule,
                    dt = "undefined" != typeof CSSMediaRule,
                    ht = "undefined" != typeof CSSSupportsRule,
                    pt = "undefined" != typeof CSSConditionRule;

                function ft(t) {
                    try {
                        if ("composedPath" in t) {
                            const e = t.composedPath();
                            if (e.length) return e[0]
                        } else if ("path" in t && t.path.length) return t.path[0];
                        return t.target
                    } catch (e) {
                        return t.target
                    }
                }

                function mt(t, e) {
                    var n, r;
                    const o = new rt;
                    ut.push(o), o.init(t);
                    let i = window.MutationObserver || window.__rrMutationObserver;
                    const a = null === (r = null === (n = null === window || void 0 === window ? void 0 : window.Zone) || void 0 === n ? void 0 : n.__symbol__) || void 0 === r ? void 0 : r.call(n, "MutationObserver");
                    a && window[a] && (i = window[a]);
                    const s = new i(o.processMutations.bind(o));
                    return s.observe(e, {
                        attributes: !0,
                        attributeOldValue: !0,
                        characterData: !0,
                        characterDataOldValue: !0,
                        childList: !0,
                        subtree: !0
                    }), s
                }

                function gt({
                    mouseInteractionCb: t,
                    doc: e,
                    mirror: n,
                    blockClass: r,
                    blockSelector: o,
                    sampling: i
                }) {
                    if (!1 === i.mouseInteraction) return () => {};
                    const a = !0 === i.mouseInteraction || void 0 === i.mouseInteraction ? {} : i.mouseInteraction,
                        s = [];
                    return Object.keys(q).filter((t => Number.isNaN(Number(t)) && !t.endsWith("_Departed") && !1 !== a[t])).forEach((i => {
                        const a = i.toLowerCase(),
                            c = (e => i => {
                                const a = ft(i);
                                if (P(a, r, o, !0)) return;
                                const s = j(i) ? i.changedTouches[0] : i;
                                if (!s) return;
                                const c = n.getId(a),
                                    {
                                        clientX: u,
                                        clientY: l
                                    } = s;
                                t({
                                    type: q[e],
                                    id: c,
                                    x: u,
                                    y: l
                                })
                            })(i);
                        s.push(O(a, c, e))
                    })), () => {
                        s.forEach((t => t()))
                    }
                }

                function yt({
                    scrollCb: t,
                    doc: e,
                    mirror: n,
                    blockClass: r,
                    blockSelector: o,
                    sampling: i
                }) {
                    return O("scroll", W((i => {
                        const a = ft(i);
                        if (!a || P(a, r, o, !0)) return;
                        const s = n.getId(a);
                        if (a === e) {
                            const n = e.scrollingElement || e.documentElement;
                            t({
                                id: s,
                                x: n.scrollLeft,
                                y: n.scrollTop
                            })
                        } else t({
                            id: s,
                            x: a.scrollLeft,
                            y: a.scrollTop
                        })
                    }), i.scroll || 100), e)
                }

                function vt(t, e) {
                    const n = Object.assign({}, t);
                    return e || delete n.userTriggered, n
                }
                const It = ["INPUT", "TEXTAREA", "SELECT"],
                    bt = new WeakMap;

                function Ct(t) {
                    return function(t, e) {
                        if (lt && t.parentRule instanceof CSSGroupingRule || dt && t.parentRule instanceof CSSMediaRule || ht && t.parentRule instanceof CSSSupportsRule || pt && t.parentRule instanceof CSSConditionRule) {
                            const n = Array.from(t.parentRule.cssRules).indexOf(t);
                            e.unshift(n)
                        } else if (t.parentStyleSheet) {
                            const n = Array.from(t.parentStyleSheet.cssRules).indexOf(t);
                            e.unshift(n)
                        }
                        return e
                    }(t, [])
                }

                function wt(t, e, n) {
                    let r, o;
                    return t ? (t.ownerNode ? r = e.getId(t.ownerNode) : o = n.getId(t), {
                        styleId: o,
                        id: r
                    }) : {}
                }

                function St({
                    mirror: t,
                    stylesheetManager: e
                }, n) {
                    var r, o, i;
                    let a = null;
                    a = "#document" === n.nodeName ? t.getId(n) : t.getId(n.host);
                    const s = "#document" === n.nodeName ? null === (r = n.defaultView) || void 0 === r ? void 0 : r.Document : null === (i = null === (o = n.ownerDocument) || void 0 === o ? void 0 : o.defaultView) || void 0 === i ? void 0 : i.ShadowRoot,
                        c = Object.getOwnPropertyDescriptor(null == s ? void 0 : s.prototype, "adoptedStyleSheets");
                    return null !== a && -1 !== a && s && c ? (Object.defineProperty(n, "adoptedStyleSheets", {
                        configurable: c.configurable,
                        enumerable: c.enumerable,
                        get() {
                            var t;
                            return null === (t = c.get) || void 0 === t ? void 0 : t.call(this)
                        },
                        set(t) {
                            var n;
                            const r = null === (n = c.set) || void 0 === n ? void 0 : n.call(this, t);
                            if (null !== a && -1 !== a) try {
                                e.adoptStyleSheets(t, a)
                            } catch (t) {}
                            return r
                        }
                    }), () => {
                        Object.defineProperty(n, "adoptedStyleSheets", {
                            configurable: c.configurable,
                            enumerable: c.enumerable,
                            get: c.get,
                            set: c.set
                        })
                    }) : () => {}
                }

                function At(t, e = {}) {
                    const n = t.doc.defaultView;
                    if (!n) return () => {};
                    ! function(t, e) {
                        const {
                            mutationCb: n,
                            mousemoveCb: r,
                            mouseInteractionCb: o,
                            scrollCb: i,
                            viewportResizeCb: a,
                            inputCb: s,
                            mediaInteractionCb: c,
                            styleSheetRuleCb: u,
                            styleDeclarationCb: l,
                            canvasMutationCb: d,
                            fontCb: h,
                            selectionCb: p
                        } = t;
                        t.mutationCb = (...t) => {
                            e.mutation && e.mutation(...t), n(...t)
                        }, t.mousemoveCb = (...t) => {
                            e.mousemove && e.mousemove(...t), r(...t)
                        }, t.mouseInteractionCb = (...t) => {
                            e.mouseInteraction && e.mouseInteraction(...t), o(...t)
                        }, t.scrollCb = (...t) => {
                            e.scroll && e.scroll(...t), i(...t)
                        }, t.viewportResizeCb = (...t) => {
                            e.viewportResize && e.viewportResize(...t), a(...t)
                        }, t.inputCb = (...t) => {
                            e.input && e.input(...t), s(...t)
                        }, t.mediaInteractionCb = (...t) => {
                            e.mediaInteaction && e.mediaInteaction(...t), c(...t)
                        }, t.styleSheetRuleCb = (...t) => {
                            e.styleSheetRule && e.styleSheetRule(...t), u(...t)
                        }, t.styleDeclarationCb = (...t) => {
                            e.styleDeclaration && e.styleDeclaration(...t), l(...t)
                        }, t.canvasMutationCb = (...t) => {
                            e.canvasMutation && e.canvasMutation(...t), d(...t)
                        }, t.fontCb = (...t) => {
                            e.font && e.font(...t), h(...t)
                        }, t.selectionCb = (...t) => {
                            e.selection && e.selection(...t), p(...t)
                        }
                    }(t, e);
                    const r = mt(t, t.doc),
                        o = function({
                            mousemoveCb: t,
                            sampling: e,
                            doc: n,
                            mirror: r
                        }) {
                            if (!1 === e.mousemove) return () => {};
                            const o = "number" == typeof e.mousemove ? e.mousemove : 50,
                                i = "number" == typeof e.mousemoveCallback ? e.mousemoveCallback : 500;
                            let a, s = [];
                            const c = W((e => {
                                    const n = Date.now() - a;
                                    t(s.map((t => (t.timeOffset -= n, t))), e), s = [], a = null
                                }), i),
                                u = W((t => {
                                    const e = ft(t),
                                        {
                                            clientX: n,
                                            clientY: o
                                        } = j(t) ? t.changedTouches[0] : t;
                                    a || (a = Date.now()), s.push({
                                        x: n,
                                        y: o,
                                        id: r.getId(e),
                                        timeOffset: Date.now() - a
                                    }), c("undefined" != typeof DragEvent && t instanceof DragEvent ? Q.Drag : t instanceof MouseEvent ? Q.MouseMove : Q.TouchMove)
                                }), o, {
                                    trailing: !1
                                }),
                                l = [O("mousemove", u, n), O("touchmove", u, n), O("drag", u, n)];
                            return () => {
                                l.forEach((t => t()))
                            }
                        }(t),
                        i = gt(t),
                        a = yt(t),
                        s = function({
                            viewportResizeCb: t
                        }) {
                            let e = -1,
                                n = -1;
                            return O("resize", W((() => {
                                const r = B(),
                                    o = G();
                                e === r && n === o || (t({
                                    width: Number(o),
                                    height: Number(r)
                                }), e = r, n = o)
                            }), 200), window)
                        }(t),
                        c = function({
                            inputCb: t,
                            doc: e,
                            mirror: n,
                            blockClass: r,
                            blockSelector: o,
                            ignoreClass: i,
                            maskInputOptions: a,
                            maskInputFn: s,
                            sampling: c,
                            userTriggeredOnInput: u
                        }) {
                            function d(t) {
                                let n = ft(t);
                                const c = t.isTrusted;
                                if (n && "OPTION" === n.tagName && (n = n.parentElement), !n || !n.tagName || It.indexOf(n.tagName) < 0 || P(n, r, o, !0)) return;
                                const d = n.type;
                                if (n.classList.contains(i)) return;
                                let p = n.value,
                                    f = !1;
                                "radio" === d || "checkbox" === d ? f = n.checked : (a[n.tagName.toLowerCase()] || a[d]) && (p = l({
                                    maskInputOptions: a,
                                    tagName: n.tagName,
                                    type: d,
                                    value: p,
                                    maskInputFn: s
                                })), h(n, vt({
                                    text: p,
                                    isChecked: f,
                                    userTriggered: c
                                }, u));
                                const m = n.name;
                                "radio" === d && m && f && e.querySelectorAll(`input[type="radio"][name="${m}"]`).forEach((t => {
                                    t !== n && h(t, vt({
                                        text: t.value,
                                        isChecked: !f,
                                        userTriggered: !1
                                    }, u))
                                }))
                            }

                            function h(e, r) {
                                const o = bt.get(e);
                                if (!o || o.text !== r.text || o.isChecked !== r.isChecked) {
                                    bt.set(e, r);
                                    const o = n.getId(e);
                                    t(Object.assign(Object.assign({}, r), {
                                        id: o
                                    }))
                                }
                            }
                            const p = ("last" === c.input ? ["change"] : ["input", "change"]).map((t => O(t, d, e))),
                                f = e.defaultView;
                            if (!f) return () => {
                                p.forEach((t => t()))
                            };
                            const m = f.Object.getOwnPropertyDescriptor(f.HTMLInputElement.prototype, "value"),
                                g = [
                                    [f.HTMLInputElement.prototype, "value"],
                                    [f.HTMLInputElement.prototype, "checked"],
                                    [f.HTMLSelectElement.prototype, "value"],
                                    [f.HTMLTextAreaElement.prototype, "value"],
                                    [f.HTMLSelectElement.prototype, "selectedIndex"],
                                    [f.HTMLOptionElement.prototype, "selected"]
                                ];
                            return m && m.set && p.push(...g.map((t => D(t[0], t[1], {
                                set() {
                                    d({
                                        target: this
                                    })
                                }
                            }, !1, f)))), () => {
                                p.forEach((t => t()))
                            }
                        }(t),
                        u = function({
                            mediaInteractionCb: t,
                            blockClass: e,
                            blockSelector: n,
                            mirror: r,
                            sampling: o
                        }) {
                            const i = i => W((o => {
                                    const a = ft(o);
                                    if (!a || P(a, e, n, !0)) return;
                                    const {
                                        currentTime: s,
                                        volume: c,
                                        muted: u,
                                        playbackRate: l
                                    } = a;
                                    t({
                                        type: i,
                                        id: r.getId(a),
                                        currentTime: s,
                                        volume: c,
                                        muted: u,
                                        playbackRate: l
                                    })
                                }), o.media || 500),
                                a = [O("play", i(0)), O("pause", i(1)), O("seeked", i(2)), O("volumechange", i(3)), O("ratechange", i(4))];
                            return () => {
                                a.forEach((t => t()))
                            }
                        }(t),
                        d = function({
                            styleSheetRuleCb: t,
                            mirror: e,
                            stylesheetManager: n
                        }, {
                            win: r
                        }) {
                            const o = r.CSSStyleSheet.prototype.insertRule;
                            r.CSSStyleSheet.prototype.insertRule = function(r, i) {
                                const {
                                    id: a,
                                    styleId: s
                                } = wt(this, e, n.styleMirror);
                                return (a && -1 !== a || s && -1 !== s) && t({
                                    id: a,
                                    styleId: s,
                                    adds: [{
                                        rule: r,
                                        index: i
                                    }]
                                }), o.apply(this, [r, i])
                            };
                            const i = r.CSSStyleSheet.prototype.deleteRule;
                            let a, s;
                            r.CSSStyleSheet.prototype.deleteRule = function(r) {
                                const {
                                    id: o,
                                    styleId: a
                                } = wt(this, e, n.styleMirror);
                                return (o && -1 !== o || a && -1 !== a) && t({
                                    id: o,
                                    styleId: a,
                                    removes: [{
                                        index: r
                                    }]
                                }), i.apply(this, [r])
                            }, r.CSSStyleSheet.prototype.replace && (a = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = function(r) {
                                const {
                                    id: o,
                                    styleId: i
                                } = wt(this, e, n.styleMirror);
                                return (o && -1 !== o || i && -1 !== i) && t({
                                    id: o,
                                    styleId: i,
                                    replace: r
                                }), a.apply(this, [r])
                            }), r.CSSStyleSheet.prototype.replaceSync && (s = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = function(r) {
                                const {
                                    id: o,
                                    styleId: i
                                } = wt(this, e, n.styleMirror);
                                return (o && -1 !== o || i && -1 !== i) && t({
                                    id: o,
                                    styleId: i,
                                    replaceSync: r
                                }), s.apply(this, [r])
                            });
                            const c = {};
                            lt ? c.CSSGroupingRule = r.CSSGroupingRule : (dt && (c.CSSMediaRule = r.CSSMediaRule), pt && (c.CSSConditionRule = r.CSSConditionRule), ht && (c.CSSSupportsRule = r.CSSSupportsRule));
                            const u = {};
                            return Object.entries(c).forEach((([r, o]) => {
                                u[r] = {
                                    insertRule: o.prototype.insertRule,
                                    deleteRule: o.prototype.deleteRule
                                }, o.prototype.insertRule = function(o, i) {
                                    const {
                                        id: a,
                                        styleId: s
                                    } = wt(this.parentStyleSheet, e, n.styleMirror);
                                    return (a && -1 !== a || s && -1 !== s) && t({
                                        id: a,
                                        styleId: s,
                                        adds: [{
                                            rule: o,
                                            index: [...Ct(this), i || 0]
                                        }]
                                    }), u[r].insertRule.apply(this, [o, i])
                                }, o.prototype.deleteRule = function(o) {
                                    const {
                                        id: i,
                                        styleId: a
                                    } = wt(this.parentStyleSheet, e, n.styleMirror);
                                    return (i && -1 !== i || a && -1 !== a) && t({
                                        id: i,
                                        styleId: a,
                                        removes: [{
                                            index: [...Ct(this), o]
                                        }]
                                    }), u[r].deleteRule.apply(this, [o])
                                }
                            })), () => {
                                r.CSSStyleSheet.prototype.insertRule = o, r.CSSStyleSheet.prototype.deleteRule = i, a && (r.CSSStyleSheet.prototype.replace = a), s && (r.CSSStyleSheet.prototype.replaceSync = s), Object.entries(c).forEach((([t, e]) => {
                                    e.prototype.insertRule = u[t].insertRule, e.prototype.deleteRule = u[t].deleteRule
                                }))
                            }
                        }(t, {
                            win: n
                        }),
                        h = St(t, t.doc),
                        p = function({
                            styleDeclarationCb: t,
                            mirror: e,
                            ignoreCSSAttributes: n,
                            stylesheetManager: r
                        }, {
                            win: o
                        }) {
                            const i = o.CSSStyleDeclaration.prototype.setProperty;
                            o.CSSStyleDeclaration.prototype.setProperty = function(o, a, s) {
                                var c;
                                if (n.has(o)) return i.apply(this, [o, a, s]);
                                const {
                                    id: u,
                                    styleId: l
                                } = wt(null === (c = this.parentRule) || void 0 === c ? void 0 : c.parentStyleSheet, e, r.styleMirror);
                                return (u && -1 !== u || l && -1 !== l) && t({
                                    id: u,
                                    styleId: l,
                                    set: {
                                        property: o,
                                        value: a,
                                        priority: s
                                    },
                                    index: Ct(this.parentRule)
                                }), i.apply(this, [o, a, s])
                            };
                            const a = o.CSSStyleDeclaration.prototype.removeProperty;
                            return o.CSSStyleDeclaration.prototype.removeProperty = function(o) {
                                var i;
                                if (n.has(o)) return a.apply(this, [o]);
                                const {
                                    id: s,
                                    styleId: c
                                } = wt(null === (i = this.parentRule) || void 0 === i ? void 0 : i.parentStyleSheet, e, r.styleMirror);
                                return (s && -1 !== s || c && -1 !== c) && t({
                                    id: s,
                                    styleId: c,
                                    remove: {
                                        property: o
                                    },
                                    index: Ct(this.parentRule)
                                }), a.apply(this, [o])
                            }, () => {
                                o.CSSStyleDeclaration.prototype.setProperty = i, o.CSSStyleDeclaration.prototype.removeProperty = a
                            }
                        }(t, {
                            win: n
                        }),
                        f = t.collectFonts ? function({
                            fontCb: t,
                            doc: e
                        }) {
                            const n = e.defaultView;
                            if (!n) return () => {};
                            const r = [],
                                o = new WeakMap,
                                i = n.FontFace;
                            n.FontFace = function(t, e, n) {
                                const r = new i(t, e, n);
                                return o.set(r, {
                                    family: t,
                                    buffer: "string" != typeof e,
                                    descriptors: n,
                                    fontSource: "string" == typeof e ? e : JSON.stringify(Array.from(new Uint8Array(e)))
                                }), r
                            };
                            const a = Z(e.fonts, "add", (function(e) {
                                return function(n) {
                                    return setTimeout((() => {
                                        const e = o.get(n);
                                        e && (t(e), o.delete(n))
                                    }), 0), e.apply(this, [n])
                                }
                            }));
                            return r.push((() => {
                                n.FontFace = i
                            })), r.push(a), () => {
                                r.forEach((t => t()))
                            }
                        }(t) : () => {},
                        m = function(t) {
                            const {
                                doc: e,
                                mirror: n,
                                blockClass: r,
                                blockSelector: o,
                                selectionCb: i
                            } = t;
                            let a = !0;
                            const s = () => {
                                const t = e.getSelection();
                                if (!t || a && (null == t ? void 0 : t.isCollapsed)) return;
                                a = t.isCollapsed || !1;
                                const s = [],
                                    c = t.rangeCount || 0;
                                for (let e = 0; e < c; e++) {
                                    const i = t.getRangeAt(e),
                                        {
                                            startContainer: a,
                                            startOffset: c,
                                            endContainer: u,
                                            endOffset: l
                                        } = i;
                                    P(a, r, o, !0) || P(u, r, o, !0) || s.push({
                                        start: n.getId(a),
                                        startOffset: c,
                                        end: n.getId(u),
                                        endOffset: l
                                    })
                                }
                                i({
                                    ranges: s
                                })
                            };
                            return s(), O("selectionchange", s)
                        }(t),
                        g = [];
                    for (const e of t.plugins) g.push(e.observer(e.callback, n, e.options));
                    return () => {
                        ut.forEach((t => t.reset())), r.disconnect(), o(), i(), a(), s(), c(), u(), d(), h(), p(), f(), m(), g.forEach((t => t()))
                    }
                }
                class kt {
                    constructor(t) {
                        this.generateIdFn = t, this.iframeIdToRemoteIdMap = new WeakMap, this.iframeRemoteIdToIdMap = new WeakMap
                    }
                    getId(t, e, n, r) {
                        const o = n || this.getIdToRemoteIdMap(t),
                            i = r || this.getRemoteIdToIdMap(t);
                        let a = o.get(e);
                        return a || (a = this.generateIdFn(), o.set(e, a), i.set(a, e)), a
                    }
                    getIds(t, e) {
                        const n = this.getIdToRemoteIdMap(t),
                            r = this.getRemoteIdToIdMap(t);
                        return e.map((e => this.getId(t, e, n, r)))
                    }
                    getRemoteId(t, e, n) {
                        const r = n || this.getRemoteIdToIdMap(t);
                        if ("number" != typeof e) return e;
                        const o = r.get(e);
                        return o || -1
                    }
                    getRemoteIds(t, e) {
                        const n = this.getRemoteIdToIdMap(t);
                        return e.map((e => this.getRemoteId(t, e, n)))
                    }
                    reset(t) {
                        if (!t) return this.iframeIdToRemoteIdMap = new WeakMap, void(this.iframeRemoteIdToIdMap = new WeakMap);
                        this.iframeIdToRemoteIdMap.delete(t), this.iframeRemoteIdToIdMap.delete(t)
                    }
                    getIdToRemoteIdMap(t) {
                        let e = this.iframeIdToRemoteIdMap.get(t);
                        return e || (e = new Map, this.iframeIdToRemoteIdMap.set(t, e)), e
                    }
                    getRemoteIdToIdMap(t) {
                        let e = this.iframeRemoteIdToIdMap.get(t);
                        return e || (e = new Map, this.iframeRemoteIdToIdMap.set(t, e)), e
                    }
                }
                class Et {
                    constructor(t) {
                        this.iframes = new WeakMap, this.crossOriginIframeMap = new WeakMap, this.crossOriginIframeMirror = new kt(y), this.mutationCb = t.mutationCb, this.wrappedEmit = t.wrappedEmit, this.stylesheetManager = t.stylesheetManager, this.recordCrossOriginIframes = t.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new kt(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = t.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this))
                    }
                    addIframe(t) {
                        this.iframes.set(t, !0), t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t)
                    }
                    addLoadListener(t) {
                        this.loadListener = t
                    }
                    attachIframe(t, e) {
                        var n;
                        this.mutationCb({
                            adds: [{
                                parentId: this.mirror.getId(t),
                                nextId: null,
                                node: e
                            }],
                            removes: [],
                            texts: [],
                            attributes: [],
                            isAttachIframe: !0
                        }), null === (n = this.loadListener) || void 0 === n || n.call(this, t), t.contentDocument && t.contentDocument.adoptedStyleSheets && t.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(t.contentDocument.adoptedStyleSheets, this.mirror.getId(t.contentDocument))
                    }
                    handleMessage(t) {
                        if ("rrweb" === t.data.type) {
                            if (!t.source) return;
                            const e = this.crossOriginIframeMap.get(t.source);
                            if (!e) return;
                            const n = this.transformCrossOriginEvent(e, t.data.event);
                            n && this.wrappedEmit(n, t.data.isCheckout)
                        }
                    }
                    transformCrossOriginEvent(t, e) {
                        var n;
                        switch (e.type) {
                            case H.FullSnapshot:
                                return this.crossOriginIframeMirror.reset(t), this.crossOriginIframeStyleMirror.reset(t), this.replaceIdOnNode(e.data.node, t), {
                                    timestamp: e.timestamp,
                                    type: H.IncrementalSnapshot,
                                    data: {
                                        source: Q.Mutation,
                                        adds: [{
                                            parentId: this.mirror.getId(t),
                                            nextId: null,
                                            node: e.data.node
                                        }],
                                        removes: [],
                                        texts: [],
                                        attributes: [],
                                        isAttachIframe: !0
                                    }
                                };
                            case H.Meta:
                            case H.Load:
                            case H.DomContentLoaded:
                                return !1;
                            case H.Plugin:
                                return e;
                            case H.Custom:
                                return this.replaceIds(e.data.payload, t, ["id", "parentId", "previousId", "nextId"]), e;
                            case H.IncrementalSnapshot:
                                switch (e.data.source) {
                                    case Q.Mutation:
                                        return e.data.adds.forEach((e => {
                                            this.replaceIds(e, t, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(e.node, t)
                                        })), e.data.removes.forEach((e => {
                                            this.replaceIds(e, t, ["parentId", "id"])
                                        })), e.data.attributes.forEach((e => {
                                            this.replaceIds(e, t, ["id"])
                                        })), e.data.texts.forEach((e => {
                                            this.replaceIds(e, t, ["id"])
                                        })), e;
                                    case Q.Drag:
                                    case Q.TouchMove:
                                    case Q.MouseMove:
                                        return e.data.positions.forEach((e => {
                                            this.replaceIds(e, t, ["id"])
                                        })), e;
                                    case Q.ViewportResize:
                                        return !1;
                                    case Q.MediaInteraction:
                                    case Q.MouseInteraction:
                                    case Q.Scroll:
                                    case Q.CanvasMutation:
                                    case Q.Input:
                                        return this.replaceIds(e.data, t, ["id"]), e;
                                    case Q.StyleSheetRule:
                                    case Q.StyleDeclaration:
                                        return this.replaceIds(e.data, t, ["id"]), this.replaceStyleIds(e.data, t, ["styleId"]), e;
                                    case Q.Font:
                                        return e;
                                    case Q.Selection:
                                        return e.data.ranges.forEach((e => {
                                            this.replaceIds(e, t, ["start", "end"])
                                        })), e;
                                    case Q.AdoptedStyleSheet:
                                        return this.replaceIds(e.data, t, ["id"]), this.replaceStyleIds(e.data, t, ["styleIds"]), null === (n = e.data.styles) || void 0 === n || n.forEach((e => {
                                            this.replaceStyleIds(e, t, ["styleId"])
                                        })), e
                                }
                        }
                    }
                    replace(t, e, n, r) {
                        for (const o of r)(Array.isArray(e[o]) || "number" == typeof e[o]) && (Array.isArray(e[o]) ? e[o] = t.getIds(n, e[o]) : e[o] = t.getId(n, e[o]));
                        return e
                    }
                    replaceIds(t, e, n) {
                        return this.replace(this.crossOriginIframeMirror, t, e, n)
                    }
                    replaceStyleIds(t, e, n) {
                        return this.replace(this.crossOriginIframeStyleMirror, t, e, n)
                    }
                    replaceIdOnNode(t, e) {
                        this.replaceIds(t, e, ["id"]), "childNodes" in t && t.childNodes.forEach((t => {
                            this.replaceIdOnNode(t, e)
                        }))
                    }
                }
                class Rt {
                    constructor(t) {
                        this.shadowDoms = new WeakSet, this.restorePatches = [], this.mutationCb = t.mutationCb, this.scrollCb = t.scrollCb, this.bypassOptions = t.bypassOptions, this.mirror = t.mirror;
                        const e = this;
                        this.restorePatches.push(Z(Element.prototype, "attachShadow", (function(t) {
                            return function(n) {
                                const r = t.call(this, n);
                                return this.shadowRoot && e.addShadowRoot(this.shadowRoot, this.ownerDocument), r
                            }
                        })))
                    }
                    addShadowRoot(t, e) {
                        a(t) && (this.shadowDoms.has(t) || (this.shadowDoms.add(t), mt(Object.assign(Object.assign({}, this.bypassOptions), {
                            doc: e,
                            mutationCb: this.mutationCb,
                            mirror: this.mirror,
                            shadowDomManager: this
                        }), t), yt(Object.assign(Object.assign({}, this.bypassOptions), {
                            scrollCb: this.scrollCb,
                            doc: t,
                            mirror: this.mirror
                        })), setTimeout((() => {
                            t.adoptedStyleSheets && t.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(t.adoptedStyleSheets, this.mirror.getId(t.host)), St({
                                mirror: this.mirror,
                                stylesheetManager: this.bypassOptions.stylesheetManager
                            }, t)
                        }), 0)))
                    }
                    observeAttachShadow(t) {
                        if (t.contentWindow) {
                            const e = this;
                            this.restorePatches.push(Z(t.contentWindow.HTMLElement.prototype, "attachShadow", (function(n) {
                                return function(r) {
                                    const o = n.call(this, r);
                                    return this.shadowRoot && e.addShadowRoot(this.shadowRoot, t.contentDocument), o
                                }
                            })))
                        }
                    }
                    reset() {
                        this.restorePatches.forEach((t => t())), this.shadowDoms = new WeakSet
                    }
                }

                function Mt(t, e, n, r) {
                    return new(n || (n = Promise))((function(o, i) {
                        function a(t) {
                            try {
                                c(r.next(t))
                            } catch (t) {
                                i(t)
                            }
                        }

                        function s(t) {
                            try {
                                c(r.throw(t))
                            } catch (t) {
                                i(t)
                            }
                        }

                        function c(t) {
                            var e;
                            t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                                t(e)
                            }))).then(a, s)
                        }
                        c((r = r.apply(t, e || [])).next())
                    }))
                }
                for (var Tt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Lt = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), _t = 0; _t < 64; _t++) Lt[Tt.charCodeAt(_t)] = _t;
                const xt = new Map;
                const Nt = (t, e, n) => {
                    if (!t || !Vt(t, e) && "object" != typeof t) return;
                    const r = function(t, e) {
                        let n = xt.get(t);
                        return n || (n = new Map, xt.set(t, n)), n.has(e) || n.set(e, []), n.get(e)
                    }(n, t.constructor.name);
                    let o = r.indexOf(t);
                    return -1 === o && (o = r.length, r.push(t)), o
                };

                function Ot(t, e, n) {
                    if (t instanceof Array) return t.map((t => Ot(t, e, n)));
                    if (null === t) return t;
                    if (t instanceof Float32Array || t instanceof Float64Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Uint8Array || t instanceof Uint16Array || t instanceof Int16Array || t instanceof Int8Array || t instanceof Uint8ClampedArray) {
                        return {
                            rr_type: t.constructor.name,
                            args: [Object.values(t)]
                        }
                    }
                    if (t instanceof ArrayBuffer) {
                        const e = t.constructor.name,
                            n = function(t) {
                                var e, n = new Uint8Array(t),
                                    r = n.length,
                                    o = "";
                                for (e = 0; e < r; e += 3) o += Tt[n[e] >> 2], o += Tt[(3 & n[e]) << 4 | n[e + 1] >> 4], o += Tt[(15 & n[e + 1]) << 2 | n[e + 2] >> 6], o += Tt[63 & n[e + 2]];
                                return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
                            }(t);
                        return {
                            rr_type: e,
                            base64: n
                        }
                    }
                    if (t instanceof DataView) {
                        return {
                            rr_type: t.constructor.name,
                            args: [Ot(t.buffer, e, n), t.byteOffset, t.byteLength]
                        }
                    }
                    if (t instanceof HTMLImageElement) {
                        const e = t.constructor.name,
                            {
                                src: n
                            } = t;
                        return {
                            rr_type: e,
                            src: n
                        }
                    }
                    if (t instanceof HTMLCanvasElement) {
                        return {
                            rr_type: "HTMLImageElement",
                            src: t.toDataURL()
                        }
                    }
                    if (t instanceof ImageData) {
                        return {
                            rr_type: t.constructor.name,
                            args: [Ot(t.data, e, n), t.width, t.height]
                        }
                    }
                    if (Vt(t, e) || "object" == typeof t) {
                        return {
                            rr_type: t.constructor.name,
                            index: Nt(t, e, n)
                        }
                    }
                    return t
                }
                const Ft = (t, e, n) => [...t].map((t => Ot(t, e, n))),
                    Vt = (t, e) => {
                        const n = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter((t => "function" == typeof e[t]));
                        return Boolean(n.find((n => t instanceof e[n])))
                    };

                function Wt(t, e, n) {
                    const r = [];
                    try {
                        const o = Z(t.HTMLCanvasElement.prototype, "getContext", (function(t) {
                            return function(r, ...o) {
                                return P(this, e, n, !0) || "__context" in this || (this.__context = r), t.apply(this, [r, ...o])
                            }
                        }));
                        r.push(o)
                    } catch (t) {
                        console.error("failed to patch HTMLCanvasElement.prototype.getContext")
                    }
                    return () => {
                        r.forEach((t => t()))
                    }
                }

                function Dt(t, e, n, r, o, i, a) {
                    const s = [],
                        c = Object.getOwnPropertyNames(t);
                    for (const i of c)
                        if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(i)) try {
                            if ("function" != typeof t[i]) continue;
                            const c = Z(t, i, (function(t) {
                                return function(...s) {
                                    const c = t.apply(this, s);
                                    if (Nt(c, a, this), !P(this.canvas, r, o, !0)) {
                                        const t = Ft([...s], a, this),
                                            r = {
                                                type: e,
                                                property: i,
                                                args: t
                                            };
                                        n(this.canvas, r)
                                    }
                                    return c
                                }
                            }));
                            s.push(c)
                        } catch (r) {
                            const o = D(t, i, {
                                set(t) {
                                    n(this.canvas, {
                                        type: e,
                                        property: i,
                                        args: [t],
                                        setter: !0
                                    })
                                }
                            });
                            s.push(o)
                        }
                    return s
                }
                var Zt = null;
                try {
                    var Bt = "undefined" != typeof module && "function" == typeof module.require && module.require("worker_threads") || "function" == typeof require && require("worker_threads") || "function" == typeof require && require("worker_threads");
                    Zt = Bt.Worker
                } catch (t) {}
                var Gt = n(287).hp;

                function Pt(t, e, n) {
                    var r = void 0 === e ? null : e,
                        o = function(t, e) {
                            return Gt.from(t, "base64").toString(e ? "utf16" : "utf8")
                        }(t, void 0 !== n && n),
                        i = o.indexOf("\n", 10) + 1,
                        a = o.substring(i) + (r ? "//# sourceMappingURL=" + r : "");
                    return function(t) {
                        return new Zt(a, Object.assign({}, t, {
                            eval: !0
                        }))
                    }
                }

                function Ut(t, e, n) {
                    var r = void 0 === e ? null : e,
                        o = function(t, e) {
                            var n = atob(t);
                            if (e) {
                                for (var r = new Uint8Array(n.length), o = 0, i = n.length; o < i; ++o) r[o] = n.charCodeAt(o);
                                return String.fromCharCode.apply(null, new Uint16Array(r.buffer))
                            }
                            return n
                        }(t, void 0 !== n && n),
                        i = o.indexOf("\n", 10) + 1,
                        a = o.substring(i) + (r ? "//# sourceMappingURL=" + r : ""),
                        s = new Blob([a], {
                            type: "application/javascript"
                        });
                    return URL.createObjectURL(s)
                }
                var Yt = n(606),
                    jt = "[object process]" === Object.prototype.toString.call(void 0 !== Yt ? Yt : 0);
                var Jt, Xt, Kt, zt = (Jt = "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo=", Xt = null, Kt = !1, jt ? Pt(Jt, Xt, Kt) : function(t, e, n) {
                    var r;
                    return function(o) {
                        return r = r || Ut(t, e, n), new Worker(r, o)
                    }
                }(Jt, Xt, Kt));
                class Ht {
                    constructor(t) {
                        this.pendingCanvasMutations = new Map, this.rafStamps = {
                            latestId: 0,
                            invokeId: null
                        }, this.frozen = !1, this.locked = !1, this.processMutation = (t, e) => {
                            !(this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) && this.rafStamps.invokeId || (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(t) || this.pendingCanvasMutations.set(t, []), this.pendingCanvasMutations.get(t).push(e)
                        };
                        const {
                            sampling: e = "all",
                            win: n,
                            blockClass: r,
                            blockSelector: o,
                            recordCanvas: i,
                            dataURLOptions: a
                        } = t;
                        this.mutationCb = t.mutationCb, this.mirror = t.mirror, i && "all" === e && this.initCanvasMutationObserver(n, r, o), i && "number" == typeof e && this.initCanvasFPSObserver(e, n, r, o, {
                            dataURLOptions: a
                        })
                    }
                    reset() {
                        this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers()
                    }
                    freeze() {
                        this.frozen = !0
                    }
                    unfreeze() {
                        this.frozen = !1
                    }
                    lock() {
                        this.locked = !0
                    }
                    unlock() {
                        this.locked = !1
                    }
                    initCanvasFPSObserver(t, e, n, r, o) {
                        const i = Wt(e, n, r),
                            a = new Map,
                            s = new zt;
                        s.onmessage = t => {
                            const {
                                id: e
                            } = t.data;
                            if (a.set(e, !1), !("base64" in t.data)) return;
                            const {
                                base64: n,
                                type: r,
                                width: o,
                                height: i
                            } = t.data;
                            this.mutationCb({
                                id: e,
                                type: $["2D"],
                                commands: [{
                                    property: "clearRect",
                                    args: [0, 0, o, i]
                                }, {
                                    property: "drawImage",
                                    args: [{
                                        rr_type: "ImageBitmap",
                                        args: [{
                                            rr_type: "Blob",
                                            data: [{
                                                rr_type: "ArrayBuffer",
                                                base64: n
                                            }],
                                            type: r
                                        }]
                                    }, 0, 0]
                                }]
                            })
                        };
                        const c = 1e3 / t;
                        let u, l = 0;
                        const d = t => {
                            l && t - l < c || (l = t, (() => {
                                const t = [];
                                return e.document.querySelectorAll("canvas").forEach((e => {
                                    P(e, n, r, !0) || t.push(e)
                                })), t
                            })().forEach((t => Mt(this, void 0, void 0, (function*() {
                                var e;
                                const n = this.mirror.getId(t);
                                if (a.get(n)) return;
                                if (a.set(n, !0), ["webgl", "webgl2"].includes(t.__context)) {
                                    const n = t.getContext(t.__context);
                                    !1 === (null === (e = null == n ? void 0 : n.getContextAttributes()) || void 0 === e ? void 0 : e.preserveDrawingBuffer) && (null == n || n.clear(n.COLOR_BUFFER_BIT))
                                }
                                const r = yield createImageBitmap(t);
                                s.postMessage({
                                    id: n,
                                    bitmap: r,
                                    width: t.width,
                                    height: t.height,
                                    dataURLOptions: o.dataURLOptions
                                }, [r])
                            }))))), u = requestAnimationFrame(d)
                        };
                        u = requestAnimationFrame(d), this.resetObservers = () => {
                            i(), cancelAnimationFrame(u)
                        }
                    }
                    initCanvasMutationObserver(t, e, n) {
                        this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
                        const r = Wt(t, e, n),
                            o = function(t, e, n, r) {
                                const o = [],
                                    i = Object.getOwnPropertyNames(e.CanvasRenderingContext2D.prototype);
                                for (const a of i) try {
                                    if ("function" != typeof e.CanvasRenderingContext2D.prototype[a]) continue;
                                    const i = Z(e.CanvasRenderingContext2D.prototype, a, (function(o) {
                                        return function(...i) {
                                            return P(this.canvas, n, r, !0) || setTimeout((() => {
                                                const n = Ft([...i], e, this);
                                                t(this.canvas, {
                                                    type: $["2D"],
                                                    property: a,
                                                    args: n
                                                })
                                            }), 0), o.apply(this, i)
                                        }
                                    }));
                                    o.push(i)
                                } catch (n) {
                                    const r = D(e.CanvasRenderingContext2D.prototype, a, {
                                        set(e) {
                                            t(this.canvas, {
                                                type: $["2D"],
                                                property: a,
                                                args: [e],
                                                setter: !0
                                            })
                                        }
                                    });
                                    o.push(r)
                                }
                                return () => {
                                    o.forEach((t => t()))
                                }
                            }(this.processMutation.bind(this), t, e, n),
                            i = function(t, e, n, r, o) {
                                const i = [];
                                return i.push(...Dt(e.WebGLRenderingContext.prototype, $.WebGL, t, n, r, 0, e)), void 0 !== e.WebGL2RenderingContext && i.push(...Dt(e.WebGL2RenderingContext.prototype, $.WebGL2, t, n, r, 0, e)), () => {
                                    i.forEach((t => t()))
                                }
                            }(this.processMutation.bind(this), t, e, n, this.mirror);
                        this.resetObservers = () => {
                            r(), o(), i()
                        }
                    }
                    startPendingCanvasMutationFlusher() {
                        requestAnimationFrame((() => this.flushPendingCanvasMutations()))
                    }
                    startRAFTimestamping() {
                        const t = e => {
                            this.rafStamps.latestId = e, requestAnimationFrame(t)
                        };
                        requestAnimationFrame(t)
                    }
                    flushPendingCanvasMutations() {
                        this.pendingCanvasMutations.forEach(((t, e) => {
                            const n = this.mirror.getId(e);
                            this.flushPendingCanvasMutationFor(e, n)
                        })), requestAnimationFrame((() => this.flushPendingCanvasMutations()))
                    }
                    flushPendingCanvasMutationFor(t, e) {
                        if (this.frozen || this.locked) return;
                        const n = this.pendingCanvasMutations.get(t);
                        if (!n || -1 === e) return;
                        const r = n.map((t => {
                                const e = function(t, e) {
                                    var n = {};
                                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
                                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                                        var o = 0;
                                        for (r = Object.getOwnPropertySymbols(t); o < r.length; o++) e.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[o]) && (n[r[o]] = t[r[o]])
                                    }
                                    return n
                                }(t, ["type"]);
                                return e
                            })),
                            {
                                type: o
                            } = n[0];
                        this.mutationCb({
                            id: e,
                            type: o,
                            commands: r
                        }), this.pendingCanvasMutations.delete(t)
                    }
                }
                class Qt {
                    constructor(t) {
                        this.trackedLinkElements = new WeakSet, this.styleMirror = new z, this.mutationCb = t.mutationCb, this.adoptedStyleSheetCb = t.adoptedStyleSheetCb
                    }
                    attachLinkElement(t, e) {
                        "_cssText" in e.attributes && this.mutationCb({
                            adds: [],
                            removes: [],
                            texts: [],
                            attributes: [{
                                id: e.id,
                                attributes: e.attributes
                            }]
                        }), this.trackLinkElement(t)
                    }
                    trackLinkElement(t) {
                        this.trackedLinkElements.has(t) || (this.trackedLinkElements.add(t), this.trackStylesheetInLinkElement(t))
                    }
                    adoptStyleSheets(t, e) {
                        if (0 === t.length) return;
                        const n = {
                                id: e,
                                styleIds: []
                            },
                            r = [];
                        for (const e of t) {
                            let t;
                            if (this.styleMirror.has(e)) t = this.styleMirror.getId(e);
                            else {
                                t = this.styleMirror.add(e);
                                const n = Array.from(e.rules || CSSRule);
                                r.push({
                                    styleId: t,
                                    rules: n.map(((t, e) => ({
                                        rule: c(t),
                                        index: e
                                    })))
                                })
                            }
                            n.styleIds.push(t)
                        }
                        r.length > 0 && (n.styles = r), this.adoptedStyleSheetCb(n)
                    }
                    reset() {
                        this.styleMirror.reset(), this.trackedLinkElements = new WeakSet
                    }
                    trackStylesheetInLinkElement(t) {}
                }

                function qt(t) {
                    return Object.assign(Object.assign({}, t), {
                        timestamp: Date.now()
                    })
                }
                let $t, te, ee, ne = !1;
                const re = new u;

                function oe(t = {}) {
                    const {
                        emit: e,
                        checkoutEveryNms: n,
                        checkoutEveryNth: r,
                        blockClass: o = "rr-block",
                        blockSelector: i = null,
                        ignoreClass: a = "rr-ignore",
                        maskTextClass: s = "rr-mask",
                        maskTextSelector: c = null,
                        inlineStylesheet: l = !0,
                        maskAllInputs: d,
                        maskInputOptions: h,
                        slimDOMOptions: p,
                        maskInputFn: f,
                        maskTextFn: m,
                        hooks: g,
                        packFn: y,
                        sampling: v = {},
                        dataURLOptions: I = {},
                        mousemoveWait: b,
                        recordCanvas: C = !1,
                        recordCrossOriginIframes: w = !1,
                        userTriggeredOnInput: S = !1,
                        collectFonts: A = !1,
                        inlineImages: k = !1,
                        plugins: E,
                        keepIframeSrcFn: R = (() => !1),
                        ignoreCSSAttributes: M = new Set([])
                    } = t, T = !w || window.parent === window;
                    let L = !1;
                    if (!T) try {
                        window.parent.document, L = !1
                    } catch (t) {
                        L = !0
                    }
                    if (T && !e) throw new Error("emit function is required");
                    void 0 !== b && void 0 === v.mousemove && (v.mousemove = b), re.reset();
                    const _ = !0 === d ? {
                            color: !0,
                            date: !0,
                            "datetime-local": !0,
                            email: !0,
                            month: !0,
                            number: !0,
                            range: !0,
                            search: !0,
                            tel: !0,
                            text: !0,
                            time: !0,
                            url: !0,
                            week: !0,
                            textarea: !0,
                            select: !0,
                            password: !0
                        } : void 0 !== h ? h : {
                            password: !0
                        },
                        N = !0 === p || "all" === p ? {
                            script: !0,
                            comment: !0,
                            headFavicon: !0,
                            headWhitespace: !0,
                            headMetaSocial: !0,
                            headMetaRobots: !0,
                            headMetaHttpEquiv: !0,
                            headMetaVerification: !0,
                            headMetaAuthorship: "all" === p,
                            headMetaDescKeywords: "all" === p
                        } : p || {};
                    let F;
                    ! function(t = window) {
                        "NodeList" in t && !t.NodeList.prototype.forEach && (t.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in t && !t.DOMTokenList.prototype.forEach && (t.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = (...t) => {
                            let e = t[0];
                            if (!(0 in t)) throw new TypeError("1 argument is required");
                            do {
                                if (this === e) return !0
                            } while (e = e && e.parentNode);
                            return !1
                        })
                    }();
                    let V = 0;
                    const W = t => {
                        for (const e of E || []) e.eventProcessor && (t = e.eventProcessor(t));
                        return y && (t = y(t)), t
                    };
                    $t = (t, o) => {
                        var i;
                        if (!(null === (i = ut[0]) || void 0 === i ? void 0 : i.isFrozen()) || t.type === H.FullSnapshot || t.type === H.IncrementalSnapshot && t.data.source === Q.Mutation || ut.forEach((t => t.unfreeze())), T) null == e || e(W(t), o);
                        else if (L) {
                            const e = {
                                type: "rrweb",
                                event: W(t),
                                isCheckout: o
                            };
                            window.parent.postMessage(e, "*")
                        }
                        if (t.type === H.FullSnapshot) F = t, V = 0;
                        else if (t.type === H.IncrementalSnapshot) {
                            if (t.data.source === Q.Mutation && t.data.isAttachIframe) return;
                            V++;
                            const e = r && V >= r,
                                o = n && t.timestamp - F.timestamp > n;
                            (e || o) && te(!0)
                        }
                    };
                    const D = t => {
                            $t(qt({
                                type: H.IncrementalSnapshot,
                                data: Object.assign({
                                    source: Q.Mutation
                                }, t)
                            }))
                        },
                        Z = t => $t(qt({
                            type: H.IncrementalSnapshot,
                            data: Object.assign({
                                source: Q.Scroll
                            }, t)
                        })),
                        P = t => $t(qt({
                            type: H.IncrementalSnapshot,
                            data: Object.assign({
                                source: Q.CanvasMutation
                            }, t)
                        })),
                        U = new Qt({
                            mutationCb: D,
                            adoptedStyleSheetCb: t => $t(qt({
                                type: H.IncrementalSnapshot,
                                data: Object.assign({
                                    source: Q.AdoptedStyleSheet
                                }, t)
                            }))
                        }),
                        Y = new Et({
                            mirror: re,
                            mutationCb: D,
                            stylesheetManager: U,
                            recordCrossOriginIframes: w,
                            wrappedEmit: $t
                        });
                    for (const t of E || []) t.getMirror && t.getMirror({
                        nodeMirror: re,
                        crossOriginIframeMirror: Y.crossOriginIframeMirror,
                        crossOriginIframeStyleMirror: Y.crossOriginIframeStyleMirror
                    });
                    ee = new Ht({
                        recordCanvas: C,
                        mutationCb: P,
                        win: window,
                        blockClass: o,
                        blockSelector: i,
                        mirror: re,
                        sampling: v.canvas,
                        dataURLOptions: I
                    });
                    const j = new Rt({
                        mutationCb: D,
                        scrollCb: Z,
                        bypassOptions: {
                            blockClass: o,
                            blockSelector: i,
                            maskTextClass: s,
                            maskTextSelector: c,
                            inlineStylesheet: l,
                            maskInputOptions: _,
                            dataURLOptions: I,
                            maskTextFn: m,
                            maskInputFn: f,
                            recordCanvas: C,
                            inlineImages: k,
                            sampling: v,
                            slimDOMOptions: N,
                            iframeManager: Y,
                            stylesheetManager: U,
                            canvasManager: ee,
                            keepIframeSrcFn: R
                        },
                        mirror: re
                    });
                    te = (t = !1) => {
                        var e, n, r, a, d, h;
                        $t(qt({
                            type: H.Meta,
                            data: {
                                href: window.location.href,
                                width: G(),
                                height: B()
                            }
                        }), t), U.reset(), ut.forEach((t => t.lock()));
                        const p = function(t, e) {
                            var n = e || {},
                                r = n.mirror,
                                o = void 0 === r ? new u : r,
                                i = n.blockClass,
                                a = void 0 === i ? "rr-block" : i,
                                s = n.blockSelector,
                                c = void 0 === s ? null : s,
                                l = n.maskTextClass,
                                d = void 0 === l ? "rr-mask" : l,
                                h = n.maskTextSelector,
                                p = void 0 === h ? null : h,
                                f = n.inlineStylesheet,
                                m = void 0 === f || f,
                                g = n.inlineImages,
                                y = void 0 !== g && g,
                                v = n.recordCanvas,
                                I = void 0 !== v && v,
                                b = n.maskAllInputs,
                                C = void 0 !== b && b,
                                w = n.maskTextFn,
                                S = n.maskInputFn,
                                A = n.slimDOM,
                                k = void 0 !== A && A,
                                E = n.dataURLOptions,
                                R = n.preserveWhiteSpace,
                                M = n.onSerialize,
                                T = n.onIframeLoad,
                                L = n.iframeLoadTimeout,
                                _ = n.onStylesheetLoad,
                                N = n.stylesheetLoadTimeout,
                                O = n.keepIframeSrcFn;
                            return x(t, {
                                doc: t,
                                mirror: o,
                                blockClass: a,
                                blockSelector: c,
                                maskTextClass: d,
                                maskTextSelector: p,
                                skipChild: !1,
                                inlineStylesheet: m,
                                maskInputOptions: !0 === C ? {
                                    color: !0,
                                    date: !0,
                                    "datetime-local": !0,
                                    email: !0,
                                    month: !0,
                                    number: !0,
                                    range: !0,
                                    search: !0,
                                    tel: !0,
                                    text: !0,
                                    time: !0,
                                    url: !0,
                                    week: !0,
                                    textarea: !0,
                                    select: !0,
                                    password: !0
                                } : !1 === C ? {
                                    password: !0
                                } : C,
                                maskTextFn: w,
                                maskInputFn: S,
                                slimDOMOptions: !0 === k || "all" === k ? {
                                    script: !0,
                                    comment: !0,
                                    headFavicon: !0,
                                    headWhitespace: !0,
                                    headMetaDescKeywords: "all" === k,
                                    headMetaSocial: !0,
                                    headMetaRobots: !0,
                                    headMetaHttpEquiv: !0,
                                    headMetaAuthorship: !0,
                                    headMetaVerification: !0
                                } : !1 === k ? {} : k,
                                dataURLOptions: E,
                                inlineImages: y,
                                recordCanvas: I,
                                preserveWhiteSpace: R,
                                onSerialize: M,
                                onIframeLoad: T,
                                iframeLoadTimeout: L,
                                onStylesheetLoad: _,
                                stylesheetLoadTimeout: N,
                                keepIframeSrcFn: void 0 === O ? function() {
                                    return !1
                                } : O,
                                newlyAddedElement: !1
                            })
                        }(document, {
                            mirror: re,
                            blockClass: o,
                            blockSelector: i,
                            maskTextClass: s,
                            maskTextSelector: c,
                            inlineStylesheet: l,
                            maskAllInputs: _,
                            maskTextFn: m,
                            slimDOM: N,
                            dataURLOptions: I,
                            recordCanvas: C,
                            inlineImages: k,
                            onSerialize: t => {
                                J(t, re) && Y.addIframe(t), X(t, re) && U.trackLinkElement(t), K(t) && j.addShadowRoot(t.shadowRoot, document)
                            },
                            onIframeLoad: (t, e) => {
                                Y.attachIframe(t, e), j.observeAttachShadow(t)
                            },
                            onStylesheetLoad: (t, e) => {
                                U.attachLinkElement(t, e)
                            },
                            keepIframeSrcFn: R
                        });
                        if (!p) return console.warn("Failed to snapshot the document");
                        $t(qt({
                            type: H.FullSnapshot,
                            data: {
                                node: p,
                                initialOffset: {
                                    left: void 0 !== window.pageXOffset ? window.pageXOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollLeft) || (null === (n = null === (e = null === document || void 0 === document ? void 0 : document.body) || void 0 === e ? void 0 : e.parentElement) || void 0 === n ? void 0 : n.scrollLeft) || (null === (r = null === document || void 0 === document ? void 0 : document.body) || void 0 === r ? void 0 : r.scrollLeft) || 0,
                                    top: void 0 !== window.pageYOffset ? window.pageYOffset : (null === document || void 0 === document ? void 0 : document.documentElement.scrollTop) || (null === (d = null === (a = null === document || void 0 === document ? void 0 : document.body) || void 0 === a ? void 0 : a.parentElement) || void 0 === d ? void 0 : d.scrollTop) || (null === (h = null === document || void 0 === document ? void 0 : document.body) || void 0 === h ? void 0 : h.scrollTop) || 0
                                }
                            }
                        })), ut.forEach((t => t.unlock())), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && U.adoptStyleSheets(document.adoptedStyleSheets, re.getId(document))
                    };
                    try {
                        const t = [];
                        t.push(O("DOMContentLoaded", (() => {
                            $t(qt({
                                type: H.DomContentLoaded,
                                data: {}
                            }))
                        })));
                        const e = t => {
                            var e;
                            return At({
                                mutationCb: D,
                                mousemoveCb: (t, e) => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: {
                                        source: e,
                                        positions: t
                                    }
                                })),
                                mouseInteractionCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.MouseInteraction
                                    }, t)
                                })),
                                scrollCb: Z,
                                viewportResizeCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.ViewportResize
                                    }, t)
                                })),
                                inputCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.Input
                                    }, t)
                                })),
                                mediaInteractionCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.MediaInteraction
                                    }, t)
                                })),
                                styleSheetRuleCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.StyleSheetRule
                                    }, t)
                                })),
                                styleDeclarationCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.StyleDeclaration
                                    }, t)
                                })),
                                canvasMutationCb: P,
                                fontCb: t => $t(qt({
                                    type: H.IncrementalSnapshot,
                                    data: Object.assign({
                                        source: Q.Font
                                    }, t)
                                })),
                                selectionCb: t => {
                                    $t(qt({
                                        type: H.IncrementalSnapshot,
                                        data: Object.assign({
                                            source: Q.Selection
                                        }, t)
                                    }))
                                },
                                blockClass: o,
                                ignoreClass: a,
                                maskTextClass: s,
                                maskTextSelector: c,
                                maskInputOptions: _,
                                inlineStylesheet: l,
                                sampling: v,
                                recordCanvas: C,
                                inlineImages: k,
                                userTriggeredOnInput: S,
                                collectFonts: A,
                                doc: t,
                                maskInputFn: f,
                                maskTextFn: m,
                                keepIframeSrcFn: R,
                                blockSelector: i,
                                slimDOMOptions: N,
                                dataURLOptions: I,
                                mirror: re,
                                iframeManager: Y,
                                stylesheetManager: U,
                                shadowDomManager: j,
                                canvasManager: ee,
                                ignoreCSSAttributes: M,
                                plugins: (null === (e = null == E ? void 0 : E.filter((t => t.observer))) || void 0 === e ? void 0 : e.map((t => ({
                                    observer: t.observer,
                                    options: t.options,
                                    callback: e => $t(qt({
                                        type: H.Plugin,
                                        data: {
                                            plugin: t.name,
                                            payload: e
                                        }
                                    }))
                                })))) || []
                            }, g)
                        };
                        Y.addLoadListener((n => {
                            t.push(e(n.contentDocument))
                        }));
                        const n = () => {
                            te(), t.push(e(document)), ne = !0
                        };
                        return "interactive" === document.readyState || "complete" === document.readyState ? n() : t.push(O("load", (() => {
                            $t(qt({
                                type: H.Load,
                                data: {}
                            })), n()
                        }), window)), () => {
                            t.forEach((t => t())), ne = !1
                        }
                    } catch (t) {
                        console.warn(t)
                    }
                }
                oe.addCustomEvent = (t, e) => {
                    if (!ne) throw new Error("please add custom event after start recording");
                    $t(qt({
                        type: H.Custom,
                        data: {
                            tag: t,
                            payload: e
                        }
                    }))
                }, oe.freezePage = () => {
                    ut.forEach((t => t.freeze()))
                }, oe.takeFullSnapshot = t => {
                    if (!ne) throw new Error("please take full snapshot after start recording");
                    te(t)
                }, oe.mirror = re
            }
        },
        __webpack_module_cache__ = {};

    function __webpack_require__(t) {
        var e = __webpack_module_cache__[t];
        if (void 0 !== e) return e.exports;
        var n = __webpack_module_cache__[t] = {
            exports: {}
        };
        return __webpack_modules__[t](n, n.exports, __webpack_require__), n.exports
    }
    __webpack_require__.d = (t, e) => {
        for (var n in e) __webpack_require__.o(e, n) && !__webpack_require__.o(t, n) && Object.defineProperty(t, n, {
            enumerable: !0,
            get: e[n]
        })
    }, __webpack_require__.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), __webpack_require__.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var rrweb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(727),
            uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(302),
            _fingerprintjs_fingerprintjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(661);

        function _typeof(t) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, _typeof(t)
        }

        function _toConsumableArray(t) {
            return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
        }

        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }

        function _unsupportedIterableToArray(t, e) {
            if (t) {
                if ("string" == typeof t) return _arrayLikeToArray(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(t, e) : void 0
            }
        }

        function _iterableToArray(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }

        function _arrayWithoutHoles(t) {
            if (Array.isArray(t)) return _arrayLikeToArray(t)
        }

        function _arrayLikeToArray(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function _regeneratorRuntime() {
            _regeneratorRuntime = function() {
                return e
            };
            var t, e = {},
                n = Object.prototype,
                r = n.hasOwnProperty,
                o = Object.defineProperty || function(t, e, n) {
                    t[e] = n.value
                },
                i = "function" == typeof Symbol ? Symbol : {},
                a = i.iterator || "@@iterator",
                s = i.asyncIterator || "@@asyncIterator",
                c = i.toStringTag || "@@toStringTag";

            function u(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e]
            }
            try {
                u({}, "")
            } catch (t) {
                u = function(t, e, n) {
                    return t[e] = n
                }
            }

            function l(t, e, n, r) {
                var i = e && e.prototype instanceof y ? e : y,
                    a = Object.create(i.prototype),
                    s = new L(r || []);
                return o(a, "_invoke", {
                    value: E(t, n, s)
                }), a
            }

            function d(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            e.wrap = l;
            var h = "suspendedStart",
                p = "suspendedYield",
                f = "executing",
                m = "completed",
                g = {};

            function y() {}

            function v() {}

            function I() {}
            var b = {};
            u(b, a, (function() {
                return this
            }));
            var C = Object.getPrototypeOf,
                w = C && C(C(_([])));
            w && w !== n && r.call(w, a) && (b = w);
            var S = I.prototype = y.prototype = Object.create(b);

            function A(t) {
                ["next", "throw", "return"].forEach((function(e) {
                    u(t, e, (function(t) {
                        return this._invoke(e, t)
                    }))
                }))
            }

            function k(t, e) {
                function n(o, i, a, s) {
                    var c = d(t[o], t, i);
                    if ("throw" !== c.type) {
                        var u = c.arg,
                            l = u.value;
                        return l && "object" == _typeof(l) && r.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                            n("next", t, a, s)
                        }), (function(t) {
                            n("throw", t, a, s)
                        })) : e.resolve(l).then((function(t) {
                            u.value = t, a(u)
                        }), (function(t) {
                            return n("throw", t, a, s)
                        }))
                    }
                    s(c.arg)
                }
                var i;
                o(this, "_invoke", {
                    value: function(t, r) {
                        function o() {
                            return new e((function(e, o) {
                                n(t, r, e, o)
                            }))
                        }
                        return i = i ? i.then(o, o) : o()
                    }
                })
            }

            function E(e, n, r) {
                var o = h;
                return function(i, a) {
                    if (o === f) throw new Error("Generator is already running");
                    if (o === m) {
                        if ("throw" === i) throw a;
                        return {
                            value: t,
                            done: !0
                        }
                    }
                    for (r.method = i, r.arg = a;;) {
                        var s = r.delegate;
                        if (s) {
                            var c = R(s, r);
                            if (c) {
                                if (c === g) continue;
                                return c
                            }
                        }
                        if ("next" === r.method) r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if (o === h) throw o = m, r.arg;
                            r.dispatchException(r.arg)
                        } else "return" === r.method && r.abrupt("return", r.arg);
                        o = f;
                        var u = d(e, n, r);
                        if ("normal" === u.type) {
                            if (o = r.done ? m : p, u.arg === g) continue;
                            return {
                                value: u.arg,
                                done: r.done
                            }
                        }
                        "throw" === u.type && (o = m, r.method = "throw", r.arg = u.arg)
                    }
                }
            }

            function R(e, n) {
                var r = n.method,
                    o = e.iterator[r];
                if (o === t) return n.delegate = null, "throw" === r && e.iterator.return && (n.method = "return", n.arg = t, R(e, n), "throw" === n.method) || "return" !== r && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + r + "' method")), g;
                var i = d(o, e.iterator, n.arg);
                if ("throw" === i.type) return n.method = "throw", n.arg = i.arg, n.delegate = null, g;
                var a = i.arg;
                return a ? a.done ? (n[e.resultName] = a.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, g) : a : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, g)
            }

            function M(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function T(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function L(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(M, this), this.reset(!0)
            }

            function _(e) {
                if (e || "" === e) {
                    var n = e[a];
                    if (n) return n.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var o = -1,
                            i = function n() {
                                for (; ++o < e.length;)
                                    if (r.call(e, o)) return n.value = e[o], n.done = !1, n;
                                return n.value = t, n.done = !0, n
                            };
                        return i.next = i
                    }
                }
                throw new TypeError(_typeof(e) + " is not iterable")
            }
            return v.prototype = I, o(S, "constructor", {
                value: I,
                configurable: !0
            }), o(I, "constructor", {
                value: v,
                configurable: !0
            }), v.displayName = u(I, c, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name))
            }, e.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, I) : (t.__proto__ = I, u(t, c, "GeneratorFunction")), t.prototype = Object.create(S), t
            }, e.awrap = function(t) {
                return {
                    __await: t
                }
            }, A(k.prototype), u(k.prototype, s, (function() {
                return this
            })), e.AsyncIterator = k, e.async = function(t, n, r, o, i) {
                void 0 === i && (i = Promise);
                var a = new k(l(t, n, r, o), i);
                return e.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                    return t.done ? t.value : a.next()
                }))
            }, A(S), u(S, c, "Generator"), u(S, a, (function() {
                return this
            })), u(S, "toString", (function() {
                return "[object Generator]"
            })), e.keys = function(t) {
                var e = Object(t),
                    n = [];
                for (var r in e) n.push(r);
                return n.reverse(),
                    function t() {
                        for (; n.length;) {
                            var r = n.pop();
                            if (r in e) return t.value = r, t.done = !1, t
                        }
                        return t.done = !0, t
                    }
            }, e.values = _, L.prototype = {
                constructor: L,
                reset: function(e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(T), !e)
                        for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function(e) {
                    if (this.done) throw e;
                    var n = this;

                    function o(r, o) {
                        return s.type = "throw", s.arg = e, n.next = r, o && (n.method = "next", n.arg = t), !!o
                    }
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var a = this.tryEntries[i],
                            s = a.completion;
                        if ("root" === a.tryLoc) return o("end");
                        if (a.tryLoc <= this.prev) {
                            var c = r.call(a, "catchLoc"),
                                u = r.call(a, "finallyLoc");
                            if (c && u) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            } else if (c) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                            } else {
                                if (!u) throw new Error("try statement without catch or finally");
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n];
                        if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, g) : this.complete(a)
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), g
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), T(n), g
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                T(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(e, n, r) {
                    return this.delegate = {
                        iterator: _(e),
                        resultName: n,
                        nextLoc: r
                    }, "next" === this.method && (this.arg = t), g
                }
            }, e
        }

        function asyncGeneratorStep(t, e, n, r, o, i, a) {
            try {
                var s = t[i](a),
                    c = s.value
            } catch (t) {
                return void n(t)
            }
            s.done ? e(c) : Promise.resolve(c).then(r, o)
        }

        function _asyncToGenerator(t) {
            return function() {
                var e = this,
                    n = arguments;
                return new Promise((function(r, o) {
                    var i = t.apply(e, n);

                    function a(t) {
                        asyncGeneratorStep(i, r, o, a, s, "next", t)
                    }

                    function s(t) {
                        asyncGeneratorStep(i, r, o, a, s, "throw", t)
                    }
                    a(void 0)
                }))
            }
        }
        var visitId = sessionStorage.getItem("visitId"),
            pageId = (0, uuid__WEBPACK_IMPORTED_MODULE_0__.A)(),
            urlParams, domain = window.location.hostname.replace(/^www\./, ""),
            gclid, ua = navigator.userAgent,
            events = [],
            interval, isFirstEvent = !0,
            loadCEFingerprint = _fingerprintjs_fingerprintjs__WEBPACK_IMPORTED_MODULE_1__.Ay.load(),
            trackingEndpoint = "https://clickexpose.com/monitoring/js-tracker",
            jsEndpoint = "https://clickexpose.com" + "/api/tracking/custom-js/".concat(domain),
            now = new Date;
        try {
            urlParams = new URLSearchParams(window.location.search)
        } catch (t) {
            console.error("ClickExpose - Error parsing URL parameters:", t)
        }
        if ("true" === urlParams.get("ce_cb") && (localStorage.removeItem("ce-custom-js-".concat(domain)), console.log("ClickExpose - Clearing local session key: ce-custom-js-".concat(domain))), null !== urlParams.get("ce_tracking_endpoint") && (trackingEndpoint = urlParams.get("ce_tracking_endpoint"), console.log("ClickExpose - Tracking endpoint updated to: ".concat(trackingEndpoint))), null !== urlParams.get("ce_js_endpoint") && (trackingEndpoint = urlParams.get("ce_js_endpoint"), console.log("ClickExpose - Custom JS endpoint updated to: ".concat(jsEndpoint))), visitId) {
            if (gclid = urlParams.get("gclid"), null !== gclid) {
                visitId = (0, uuid__WEBPACK_IMPORTED_MODULE_0__.A)();
                try {
                    sessionStorage.setItem("visitId", visitId)
                } catch (t) {
                    console.error("ClickExpose - Error storing Visit ID in session:", t)
                }
            }
        } else if (gclid = urlParams.get("gclid"), null === gclid) console.log("ClickExpose - Could not find gclid parameter in URL");
        else {
            visitId = (0, uuid__WEBPACK_IMPORTED_MODULE_0__.A)();
            try {
                sessionStorage.setItem("visitId", visitId)
            } catch (t) {
                console.error("ClickExpose - Error storing Visit ID in session:", t)
            }
        }
        try {
            sessionStorage.setItem("pageId", pageId)
        } catch (t) {
            console.error("ClickExpose - Error storing Page ID in session:", t)
        }
        if (visitId && pageId) {
            var saveEvent = function() {
                if (events.length > 0) {
                    var t = JSON.stringify(events);
                    events = [], fetch(trackingEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        mode: "no-cors",
                        body: t
                    }).catch((function(e) {
                        var n;
                        console.error("ClickExpose - Error submitting events:", e), (n = events).push.apply(n, _toConsumableArray(JSON.parse(t)))
                    }))
                }
            };
            console.log("ClickExpose Protection Active"), (0, rrweb__WEBPACK_IMPORTED_MODULE_2__.A)({
                emit: function(t) {
                    var e = {
                        action: isFirstEvent ? "start" : "events",
                        page_id: pageId,
                        visit_id: visitId,
                        location: window.location.href,
                        action_log: {
                            events: [t]
                        }
                    };
                    isFirstEvent ? (_asyncToGenerator(_regeneratorRuntime().mark((function t() {
                        var n, r;
                        return _regeneratorRuntime().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, loadCEFingerprint;
                                case 2:
                                    return n = t.sent, t.next = 5, n.get();
                                case 5:
                                    r = t.sent, e.fingerprint = r.visitorId, e.gclid = gclid, e.data = {
                                        user_agent: ua,
                                        campaign_id: urlParams.get("campaignid"),
                                        keywords: urlParams.get("keywords"),
                                        adposition: urlParams.get("adposition"),
                                        loc_physical_ms: urlParams.get("loc_physical_ms"),
                                        loc_interest_ms: urlParams.get("loc_interest_ms"),
                                        adgroupid: urlParams.get("adgroupid"),
                                        network: urlParams.get("network"),
                                        device: urlParams.get("device"),
                                        placement: urlParams.get("placement"),
                                        domain,
                                        received_at: now
                                    }, events.push(e), saveEvent();
                                case 11:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })))(), isFirstEvent = !1) : events.push(e)
                },
                maskAllInputs: !0
            }), interval = setInterval(saveEvent, 2500), setTimeout((function() {
                clearInterval(interval), sessionStorage.removeItem("visitId"), sessionStorage.removeItem("pageId")
            }), 6e4)
        }

        function loadJS(t) {
            return _loadJS.apply(this, arguments)
        }

        function _loadJS() {
            return _loadJS = _asyncToGenerator(_regeneratorRuntime().mark((function t(e) {
                var n, r, o, i, a, s, c, u;
                return _regeneratorRuntime().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            if (t.prev = 0, n = "ce-custom-js-".concat(e), r = localStorage.getItem(n), o = (new Date).getTime(), !r) {
                                t.next = 8;
                                break
                            }
                            if (i = JSON.parse(r), a = i.lastFetched, s = i.js, !(o - a < 36e5)) {
                                t.next = 8;
                                break
                            }
                            return t.abrupt("return", s);
                        case 8:
                            return t.next = 10, fetch(jsEndpoint, {
                                headers: {
                                    Accept: "application/javascript"
                                }
                            });
                        case 10:
                            if ((c = t.sent).ok) {
                                t.next = 14;
                                break
                            }
                            return console.error("ClickExpose - Failed to fetch custom JS: ".concat(c.status)), t.abrupt("return", null);
                        case 14:
                            return t.next = 16, c.text();
                        case 16:
                            return u = t.sent, localStorage.setItem(n, JSON.stringify({
                                lastFetched: o,
                                js: u
                            })), t.abrupt("return", u);
                        case 21:
                            t.prev = 21, t.t0 = t.catch(0), console.error("ClickExpose - Error fetching custom JS:", t.t0);
                        case 24:
                        case "end":
                            return t.stop()
                    }
                }), t, null, [
                    [0, 21]
                ])
            }))), _loadJS.apply(this, arguments)
        }
        loadJS(domain).then((function(customJS) {
            customJS && eval(customJS)
        }))
    })()
})();