(() => {
    var z = class {
            constructor() {}
            lineAt(e) {
                if (e < 0 || e > this.length) throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
                return this.lineInner(e, !1, 1, 0)
            }
            line(e) {
                if (e < 1 || e > this.lines) throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
                return this.lineInner(e, !0, 1, 0)
            }
            replace(e, t, i) {
                let r = [];
                return this.decompose(0, e, r, 2), i.length && i.decompose(0, i.length, r, 1 | 2), this.decompose(t, this.length, r, 1), _e.from(r, this.length - (t - e) + i.length)
            }
            append(e) {
                return this.replace(this.length, this.length, e)
            }
            slice(e, t = this.length) {
                let i = [];
                return this.decompose(e, t, i, 0), _e.from(i, t - e)
            }
            eq(e) {
                if (e == this) return !0;
                if (e.length != this.length || e.lines != this.lines) return !1;
                let t = this.scanIdentical(e, 1),
                    i = this.length - this.scanIdentical(e, -1),
                    r = new Gt(this),
                    s = new Gt(e);
                for (let O = t, o = t;;) {
                    if (r.next(O), s.next(O), O = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value) return !1;
                    if (o += r.value.length, r.done || o >= i) return !0
                }
            }
            iter(e = 1) {
                return new Gt(this, e)
            }
            iterRange(e, t = this.length) {
                return new Hn(this, e, t)
            }
            iterLines(e, t) {
                let i;
                if (e == null) i = this.iter();
                else {
                    t == null && (t = this.lines + 1);
                    let r = this.line(e).from;
                    i = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to))
                }
                return new Kn(i)
            }
            toString() {
                return this.sliceString(0)
            }
            toJSON() {
                let e = [];
                return this.flatten(e), e
            }
            static of (e) {
                if (e.length == 0) throw new RangeError("A document must have at least one line");
                return e.length == 1 && !e[0] ? z.empty : e.length <= 32 ? new I(e) : _e.from(I.split(e, []))
            }
        },
        I = class extends z {
            constructor(e, t = Jh(e)) {
                super();
                this.text = e, this.length = t
            }
            get lines() {
                return this.text.length
            }
            get children() {
                return null
            }
            lineInner(e, t, i, r) {
                for (let s = 0;; s++) {
                    let O = this.text[s],
                        o = r + O.length;
                    if ((t ? i : o) >= e) return new sO(r, o, i, O);
                    r = o + 1, i++
                }
            }
            decompose(e, t, i, r) {
                let s = e <= 0 && t >= this.length ? this : new I(rO(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
                if (r & 1) {
                    let O = i.pop(),
                        o = Ni(s.text, O.text.slice(), 0, s.length);
                    if (o.length <= 32) i.push(new I(o, O.length + s.length));
                    else {
                        let l = o.length >> 1;
                        i.push(new I(o.slice(0, l)), new I(o.slice(l)))
                    }
                } else i.push(s)
            }
            replace(e, t, i) {
                if (!(i instanceof I)) return super.replace(e, t, i);
                let r = Ni(this.text, Ni(i.text, rO(this.text, 0, e)), t),
                    s = this.length + i.length - (t - e);
                return r.length <= 32 ? new I(r, s) : _e.from(I.split(r, []), s)
            }
            sliceString(e, t = this.length, i = `
`) {
                let r = "";
                for (let s = 0, O = 0; s <= t && O < this.text.length; O++) {
                    let o = this.text[O],
                        l = s + o.length;
                    s > e && O && (r += i), e < l && t > s && (r += o.slice(Math.max(0, e - s), t - s)), s = l + 1
                }
                return r
            }
            flatten(e) {
                for (let t of this.text) e.push(t)
            }
            scanIdentical() {
                return 0
            }
            static split(e, t) {
                let i = [],
                    r = -1;
                for (let s of e) i.push(s), r += s.length + 1, i.length == 32 && (t.push(new I(i, r)), i = [], r = -1);
                return r > -1 && t.push(new I(i, r)), t
            }
        },
        _e = class extends z {
            constructor(e, t) {
                super();
                this.children = e, this.length = t, this.lines = 0;
                for (let i of e) this.lines += i.lines
            }
            lineInner(e, t, i, r) {
                for (let s = 0;; s++) {
                    let O = this.children[s],
                        o = r + O.length,
                        l = i + O.lines - 1;
                    if ((t ? l : o) >= e) return O.lineInner(e, t, i, r);
                    r = o + 1, i = l + 1
                }
            }
            decompose(e, t, i, r) {
                for (let s = 0, O = 0; O <= t && s < this.children.length; s++) {
                    let o = this.children[s],
                        l = O + o.length;
                    if (e <= l && t >= O) {
                        let a = r & ((O <= e ? 1 : 0) | (l >= t ? 2 : 0));
                        O >= e && l <= t && !a ? i.push(o) : o.decompose(e - O, t - O, i, a)
                    }
                    O = l + 1
                }
            }
            replace(e, t, i) {
                if (i.lines < this.lines)
                    for (let r = 0, s = 0; r < this.children.length; r++) {
                        let O = this.children[r],
                            o = s + O.length;
                        if (e >= s && t <= o) {
                            let l = O.replace(e - s, t - s, i),
                                a = this.lines - O.lines + l.lines;
                            if (l.lines < a >> 5 - 1 && l.lines > a >> 5 + 1) {
                                let h = this.children.slice();
                                return h[r] = l, new _e(h, this.length - (t - e) + i.length)
                            }
                            return super.replace(s, o, l)
                        }
                        s = o + 1
                    }
                return super.replace(e, t, i)
            }
            sliceString(e, t = this.length, i = `
`) {
                let r = "";
                for (let s = 0, O = 0; s < this.children.length && O <= t; s++) {
                    let o = this.children[s],
                        l = O + o.length;
                    O > e && s && (r += i), e < l && t > O && (r += o.sliceString(e - O, t - O, i)), O = l + 1
                }
                return r
            }
            flatten(e) {
                for (let t of this.children) t.flatten(e)
            }
            scanIdentical(e, t) {
                if (!(e instanceof _e)) return 0;
                let i = 0,
                    [r, s, O, o] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
                for (;; r += t, s += t) {
                    if (r == O || s == o) return i;
                    let l = this.children[r],
                        a = e.children[s];
                    if (l != a) return i + l.scanIdentical(a, t);
                    i += l.length + 1
                }
            }
            static from(e, t = e.reduce((i, r) => i + r.length + 1, -1)) {
                let i = 0;
                for (let d of e) i += d.lines;
                if (i < 32) {
                    let d = [];
                    for (let p of e) p.flatten(d);
                    return new I(d, t)
                }
                let r = Math.max(32, i >> 5),
                    s = r << 1,
                    O = r >> 1,
                    o = [],
                    l = 0,
                    a = -1,
                    h = [];

                function c(d) {
                    let p;
                    if (d.lines > s && d instanceof _e)
                        for (let m of d.children) c(m);
                    else d.lines > O && (l > O || !l) ? (f(), o.push(d)) : d instanceof I && l && (p = h[h.length - 1]) instanceof I && d.lines + p.lines <= 32 ? (l += d.lines, a += d.length + 1, h[h.length - 1] = new I(p.text.concat(d.text), p.length + 1 + d.length)) : (l + d.lines > r && f(), l += d.lines, a += d.length + 1, h.push(d))
                }

                function f() {
                    l != 0 && (o.push(h.length == 1 ? h[0] : _e.from(h, a)), a = -1, l = h.length = 0)
                }
                for (let d of e) c(d);
                return f(), o.length == 1 ? o[0] : new _e(o, t)
            }
        };
    z.empty = new I([""], 0);

    function Jh(n) {
        let e = -1;
        for (let t of n) e += t.length + 1;
        return e
    }

    function Ni(n, e, t = 0, i = 1e9) {
        for (let r = 0, s = 0, O = !0; s < n.length && r <= i; s++) {
            let o = n[s],
                l = r + o.length;
            l >= t && (l > i && (o = o.slice(0, i - r)), r < t && (o = o.slice(t - r)), O ? (e[e.length - 1] += o, O = !1) : e.push(o)), r = l + 1
        }
        return e
    }

    function rO(n, e, t) {
        return Ni(n, [""], e, t)
    }
    var Gt = class {
            constructor(e, t = 1) {
                this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof I ? e.text.length : e.children.length) << 1]
            }
            nextInner(e, t) {
                for (this.done = this.lineBreak = !1;;) {
                    let i = this.nodes.length - 1,
                        r = this.nodes[i],
                        s = this.offsets[i],
                        O = s >> 1,
                        o = r instanceof I ? r.text.length : r.children.length;
                    if (O == (t > 0 ? o : 0)) {
                        if (i == 0) return this.done = !0, this.value = "", this;
                        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop()
                    } else if ((s & 1) == (t > 0 ? 0 : 1)) {
                        if (this.offsets[i] += t, e == 0) return this.lineBreak = !0, this.value = `
`, this;
                        e--
                    } else if (r instanceof I) {
                        let l = r.text[O + (t < 0 ? -1 : 0)];
                        if (this.offsets[i] += t, l.length > Math.max(0, e)) return this.value = e == 0 ? l : t > 0 ? l.slice(e) : l.slice(0, l.length - e), this;
                        e -= l.length
                    } else {
                        let l = r.children[O + (t < 0 ? -1 : 0)];
                        e > l.length ? (e -= l.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(l), this.offsets.push(t > 0 ? 1 : (l instanceof I ? l.text.length : l.children.length) << 1))
                    }
                }
            }
            next(e = 0) {
                return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir)
            }
        },
        Hn = class {
            constructor(e, t, i) {
                this.value = "", this.done = !1, this.cursor = new Gt(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i)
            }
            nextInner(e, t) {
                if (t < 0 ? this.pos <= this.from : this.pos >= this.to) return this.value = "", this.done = !0, this;
                e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
                let i = t < 0 ? this.pos - this.from : this.to - this.pos;
                e > i && (e = i), i -= e;
                let {
                    value: r
                } = this.cursor.next(e);
                return this.pos += (r.length + e) * t, this.value = r.length <= i ? r : t < 0 ? r.slice(r.length - i) : r.slice(0, i), this.done = !this.value, this
            }
            next(e = 0) {
                return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir)
            }
            get lineBreak() {
                return this.cursor.lineBreak && this.value != ""
            }
        },
        Kn = class {
            constructor(e) {
                this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1
            }
            next(e = 0) {
                let {
                    done: t,
                    lineBreak: i,
                    value: r
                } = this.inner.next(e);
                return t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this
            }
            get lineBreak() {
                return !1
            }
        };
    typeof Symbol != "undefined" && (z.prototype[Symbol.iterator] = function() {
        return this.iter()
    }, Gt.prototype[Symbol.iterator] = Hn.prototype[Symbol.iterator] = Kn.prototype[Symbol.iterator] = function() {
        return this
    });
    var sO = class {
            constructor(e, t, i, r) {
                this.from = e, this.to = t, this.number = i, this.text = r
            }
            get length() {
                return this.to - this.from
            }
        },
        Et = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(n => n ? parseInt(n, 36) : 1);
    for (let n = 1; n < Et.length; n++) Et[n] += Et[n - 1];

    function ec(n) {
        for (let e = 1; e < Et.length; e += 2)
            if (Et[e] > n) return Et[e - 1] <= n;
        return !1
    }

    function OO(n) {
        return n >= 127462 && n <= 127487
    }
    var oO = 8205;

    function Ve(n, e, t = !0, i = !0) {
        return (t ? lO : tc)(n, e, i)
    }

    function lO(n, e, t) {
        if (e == n.length) return e;
        e && aO(n.charCodeAt(e)) && hO(n.charCodeAt(e - 1)) && e--;
        let i = xe(n, e);
        for (e += Ue(i); e < n.length;) {
            let r = xe(n, e);
            if (i == oO || r == oO || t && ec(r)) e += Ue(r), i = r;
            else if (OO(r)) {
                let s = 0,
                    O = e - 2;
                for (; O >= 0 && OO(xe(n, O));) s++, O -= 2;
                if (s % 2 == 0) break;
                e += 2
            } else break
        }
        return e
    }

    function tc(n, e, t) {
        for (; e > 0;) {
            let i = lO(n, e - 2, t);
            if (i < e) return i;
            e--
        }
        return 0
    }

    function aO(n) {
        return n >= 56320 && n < 57344
    }

    function hO(n) {
        return n >= 55296 && n < 56320
    }

    function xe(n, e) {
        let t = n.charCodeAt(e);
        if (!hO(t) || e + 1 == n.length) return t;
        let i = n.charCodeAt(e + 1);
        return aO(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t
    }

    function cO(n) {
        return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320))
    }

    function Ue(n) {
        return n < 65536 ? 1 : 2
    }
    var Jn = /\r\n?|\n/,
        re = function(n) {
            return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n
        }(re || (re = {})),
        Te = class {
            constructor(e) {
                this.sections = e
            }
            get length() {
                let e = 0;
                for (let t = 0; t < this.sections.length; t += 2) e += this.sections[t];
                return e
            }
            get newLength() {
                let e = 0;
                for (let t = 0; t < this.sections.length; t += 2) {
                    let i = this.sections[t + 1];
                    e += i < 0 ? this.sections[t] : i
                }
                return e
            }
            get empty() {
                return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0
            }
            iterGaps(e) {
                for (let t = 0, i = 0, r = 0; t < this.sections.length;) {
                    let s = this.sections[t++],
                        O = this.sections[t++];
                    O < 0 ? (e(i, r, s), r += s) : r += O, i += s
                }
            }
            iterChangedRanges(e, t = !1) {
                er(this, e, t)
            }
            get invertedDesc() {
                let e = [];
                for (let t = 0; t < this.sections.length;) {
                    let i = this.sections[t++],
                        r = this.sections[t++];
                    r < 0 ? e.push(i, r) : e.push(r, i)
                }
                return new Te(e)
            }
            composeDesc(e) {
                return this.empty ? e : e.empty ? this : uO(this, e)
            }
            mapDesc(e, t = !1) {
                return e.empty ? this : tr(this, e, t)
            }
            mapPos(e, t = -1, i = re.Simple) {
                let r = 0,
                    s = 0;
                for (let O = 0; O < this.sections.length;) {
                    let o = this.sections[O++],
                        l = this.sections[O++],
                        a = r + o;
                    if (l < 0) {
                        if (a > e) return s + (e - r);
                        s += o
                    } else {
                        if (i != re.Simple && a >= e && (i == re.TrackDel && r < e && a > e || i == re.TrackBefore && r < e || i == re.TrackAfter && a > e)) return null;
                        if (a > e || a == e && t < 0 && !o) return e == r || t < 0 ? s : s + l;
                        s += l
                    }
                    r = a
                }
                if (e > r) throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
                return s
            }
            touchesRange(e, t = e) {
                for (let i = 0, r = 0; i < this.sections.length && r <= t;) {
                    let s = this.sections[i++],
                        O = this.sections[i++],
                        o = r + s;
                    if (O >= 0 && r <= t && o >= e) return r < e && o > t ? "cover" : !0;
                    r = o
                }
                return !1
            }
            toString() {
                let e = "";
                for (let t = 0; t < this.sections.length;) {
                    let i = this.sections[t++],
                        r = this.sections[t++];
                    e += (e ? " " : "") + i + (r >= 0 ? ":" + r : "")
                }
                return e
            }
            toJSON() {
                return this.sections
            }
            static fromJSON(e) {
                if (!Array.isArray(e) || e.length % 2 || e.some(t => typeof t != "number")) throw new RangeError("Invalid JSON representation of ChangeDesc");
                return new Te(e)
            }
            static create(e) {
                return new Te(e)
            }
        },
        B = class extends Te {
            constructor(e, t) {
                super(e);
                this.inserted = t
            }
            apply(e) {
                if (this.length != e.length) throw new RangeError("Applying change set to a document with the wrong length");
                return er(this, (t, i, r, s, O) => e = e.replace(r, r + (i - t), O), !1), e
            }
            mapDesc(e, t = !1) {
                return tr(this, e, t, !0)
            }
            invert(e) {
                let t = this.sections.slice(),
                    i = [];
                for (let r = 0, s = 0; r < t.length; r += 2) {
                    let O = t[r],
                        o = t[r + 1];
                    if (o >= 0) {
                        t[r] = o, t[r + 1] = O;
                        let l = r >> 1;
                        for (; i.length < l;) i.push(z.empty);
                        i.push(O ? e.slice(s, s + O) : z.empty)
                    }
                    s += O
                }
                return new B(t, i)
            }
            compose(e) {
                return this.empty ? e : e.empty ? this : uO(this, e, !0)
            }
            map(e, t = !1) {
                return e.empty ? this : tr(this, e, t, !0)
            }
            iterChanges(e, t = !1) {
                er(this, e, t)
            }
            get desc() {
                return Te.create(this.sections)
            }
            filter(e) {
                let t = [],
                    i = [],
                    r = [],
                    s = new Dt(this);
                e: for (let O = 0, o = 0;;) {
                    let l = O == e.length ? 1e9 : e[O++];
                    for (; o < l || o == l && s.len == 0;) {
                        if (s.done) break e;
                        let h = Math.min(s.len, l - o);
                        oe(r, h, -1);
                        let c = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
                        oe(t, h, c), c > 0 && ht(i, t, s.text), s.forward(h), o += h
                    }
                    let a = e[O++];
                    for (; o < a;) {
                        if (s.done) break e;
                        let h = Math.min(s.len, a - o);
                        oe(t, h, -1), oe(r, h, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(h), o += h
                    }
                }
                return {
                    changes: new B(t, i),
                    filtered: Te.create(r)
                }
            }
            toJSON() {
                let e = [];
                for (let t = 0; t < this.sections.length; t += 2) {
                    let i = this.sections[t],
                        r = this.sections[t + 1];
                    r < 0 ? e.push(i) : r == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()))
                }
                return e
            }
            static of (e, t, i) {
                let r = [],
                    s = [],
                    O = 0,
                    o = null;

                function l(h = !1) {
                    if (!h && !r.length) return;
                    O < t && oe(r, t - O, -1);
                    let c = new B(r, s);
                    o = o ? o.compose(c.map(o)) : c, r = [], s = [], O = 0
                }

                function a(h) {
                    if (Array.isArray(h))
                        for (let c of h) a(c);
                    else if (h instanceof B) {
                        if (h.length != t) throw new RangeError(`Mismatched change set length (got ${h.length}, expected ${t})`);
                        l(), o = o ? o.compose(h.map(o)) : h
                    } else {
                        let {
                            from: c,
                            to: f = c,
                            insert: d
                        } = h;
                        if (c > f || c < 0 || f > t) throw new RangeError(`Invalid change range ${c} to ${f} (in doc of length ${t})`);
                        let p = d ? typeof d == "string" ? z.of(d.split(i || Jn)) : d : z.empty,
                            m = p.length;
                        if (c == f && m == 0) return;
                        c < O && l(), c > O && oe(r, c - O, -1), oe(r, f - c, m), ht(s, r, p), O = f
                    }
                }
                return a(e), l(!o), o
            }
            static empty(e) {
                return new B(e ? [e, -1] : [], [])
            }
            static fromJSON(e) {
                if (!Array.isArray(e)) throw new RangeError("Invalid JSON representation of ChangeSet");
                let t = [],
                    i = [];
                for (let r = 0; r < e.length; r++) {
                    let s = e[r];
                    if (typeof s == "number") t.push(s, -1);
                    else {
                        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((O, o) => o && typeof O != "string")) throw new RangeError("Invalid JSON representation of ChangeSet");
                        if (s.length == 1) t.push(s[0], 0);
                        else {
                            for (; i.length < r;) i.push(z.empty);
                            i[r] = z.of(s.slice(1)), t.push(s[0], i[r].length)
                        }
                    }
                }
                return new B(t, i)
            }
            static createSet(e, t) {
                return new B(e, t)
            }
        };

    function oe(n, e, t, i = !1) {
        if (e == 0 && t <= 0) return;
        let r = n.length - 2;
        r >= 0 && t <= 0 && t == n[r + 1] ? n[r] += e : e == 0 && n[r] == 0 ? n[r + 1] += t : i ? (n[r] += e, n[r + 1] += t) : n.push(e, t)
    }

    function ht(n, e, t) {
        if (t.length == 0) return;
        let i = e.length - 2 >> 1;
        if (i < n.length) n[n.length - 1] = n[n.length - 1].append(t);
        else {
            for (; n.length < i;) n.push(z.empty);
            n.push(t)
        }
    }

    function er(n, e, t) {
        let i = n.inserted;
        for (let r = 0, s = 0, O = 0; O < n.sections.length;) {
            let o = n.sections[O++],
                l = n.sections[O++];
            if (l < 0) r += o, s += o;
            else {
                let a = r,
                    h = s,
                    c = z.empty;
                for (; a += o, h += l, l && i && (c = c.append(i[O - 2 >> 1])), !(t || O == n.sections.length || n.sections[O + 1] < 0);) o = n.sections[O++], l = n.sections[O++];
                e(r, a, s, h, c), r = a, s = h
            }
        }
    }

    function tr(n, e, t, i = !1) {
        let r = [],
            s = i ? [] : null,
            O = new Dt(n),
            o = new Dt(e);
        for (let l = -1;;)
            if (O.ins == -1 && o.ins == -1) {
                let a = Math.min(O.len, o.len);
                oe(r, a, -1), O.forward(a), o.forward(a)
            } else if (o.ins >= 0 && (O.ins < 0 || l == O.i || O.off == 0 && (o.len < O.len || o.len == O.len && !t))) {
            let a = o.len;
            for (oe(r, o.ins, -1); a;) {
                let h = Math.min(O.len, a);
                O.ins >= 0 && l < O.i && O.len <= h && (oe(r, 0, O.ins), s && ht(s, r, O.text), l = O.i), O.forward(h), a -= h
            }
            o.next()
        } else if (O.ins >= 0) {
            let a = 0,
                h = O.len;
            for (; h;)
                if (o.ins == -1) {
                    let c = Math.min(h, o.len);
                    a += c, h -= c, o.forward(c)
                } else if (o.ins == 0 && o.len < h) h -= o.len, o.next();
            else break;
            oe(r, a, l < O.i ? O.ins : 0), s && l < O.i && ht(s, r, O.text), l = O.i, O.forward(O.len - h)
        } else {
            if (O.done && o.done) return s ? B.createSet(r, s) : Te.create(r);
            throw new Error("Mismatched change set lengths")
        }
    }

    function uO(n, e, t = !1) {
        let i = [],
            r = t ? [] : null,
            s = new Dt(n),
            O = new Dt(e);
        for (let o = !1;;) {
            if (s.done && O.done) return r ? B.createSet(i, r) : Te.create(i);
            if (s.ins == 0) oe(i, s.len, 0, o), s.next();
            else if (O.len == 0 && !O.done) oe(i, 0, O.ins, o), r && ht(r, i, O.text), O.next();
            else {
                if (s.done || O.done) throw new Error("Mismatched change set lengths"); {
                    let l = Math.min(s.len2, O.len),
                        a = i.length;
                    if (s.ins == -1) {
                        let h = O.ins == -1 ? -1 : O.off ? 0 : O.ins;
                        oe(i, l, h, o), r && h && ht(r, i, O.text)
                    } else O.ins == -1 ? (oe(i, s.off ? 0 : s.len, l, o), r && ht(r, i, s.textBit(l))) : (oe(i, s.off ? 0 : s.len, O.off ? 0 : O.ins, o), r && !O.off && ht(r, i, O.text));
                    o = (s.ins > l || O.ins >= 0 && O.len > l) && (o || i.length > a), s.forward2(l), O.forward(l)
                }
            }
        }
    }
    var Dt = class {
            constructor(e) {
                this.set = e, this.i = 0, this.next()
            }
            next() {
                let {
                    sections: e
                } = this.set;
                this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0
            }
            get done() {
                return this.ins == -2
            }
            get len2() {
                return this.ins < 0 ? this.len : this.ins
            }
            get text() {
                let {
                    inserted: e
                } = this.set, t = this.i - 2 >> 1;
                return t >= e.length ? z.empty : e[t]
            }
            textBit(e) {
                let {
                    inserted: t
                } = this.set, i = this.i - 2 >> 1;
                return i >= t.length && !e ? z.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e)
            }
            forward(e) {
                e == this.len ? this.next() : (this.len -= e, this.off += e)
            }
            forward2(e) {
                this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e)
            }
        },
        ct = class {
            constructor(e, t, i) {
                this.from = e, this.to = t, this.flags = i
            }
            get anchor() {
                return this.flags & 16 ? this.to : this.from
            }
            get head() {
                return this.flags & 16 ? this.from : this.to
            }
            get empty() {
                return this.from == this.to
            }
            get assoc() {
                return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0
            }
            get bidiLevel() {
                let e = this.flags & 3;
                return e == 3 ? null : e
            }
            get goalColumn() {
                let e = this.flags >> 5;
                return e == 33554431 ? void 0 : e
            }
            map(e, t = -1) {
                let i, r;
                return this.empty ? i = r = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), i == this.from && r == this.to ? this : new ct(i, r, this.flags)
            }
            extend(e, t = e) {
                if (e <= this.anchor && t >= this.anchor) return y.range(e, t);
                let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
                return y.range(this.anchor, i)
            }
            eq(e) {
                return this.anchor == e.anchor && this.head == e.head
            }
            toJSON() {
                return {
                    anchor: this.anchor,
                    head: this.head
                }
            }
            static fromJSON(e) {
                if (!e || typeof e.anchor != "number" || typeof e.head != "number") throw new RangeError("Invalid JSON representation for SelectionRange");
                return y.range(e.anchor, e.head)
            }
            static create(e, t, i) {
                return new ct(e, t, i)
            }
        },
        y = class {
            constructor(e, t) {
                this.ranges = e, this.mainIndex = t
            }
            map(e, t = -1) {
                return e.empty ? this : y.create(this.ranges.map(i => i.map(e, t)), this.mainIndex)
            }
            eq(e) {
                if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex) return !1;
                for (let t = 0; t < this.ranges.length; t++)
                    if (!this.ranges[t].eq(e.ranges[t])) return !1;
                return !0
            }
            get main() {
                return this.ranges[this.mainIndex]
            }
            asSingle() {
                return this.ranges.length == 1 ? this : new y([this.main], 0)
            }
            addRange(e, t = !0) {
                return y.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1)
            }
            replaceRange(e, t = this.mainIndex) {
                let i = this.ranges.slice();
                return i[t] = e, y.create(i, this.mainIndex)
            }
            toJSON() {
                return {
                    ranges: this.ranges.map(e => e.toJSON()),
                    main: this.mainIndex
                }
            }
            static fromJSON(e) {
                if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length) throw new RangeError("Invalid JSON representation for EditorSelection");
                return new y(e.ranges.map(t => ct.fromJSON(t)), e.main)
            }
            static single(e, t = e) {
                return new y([y.range(e, t)], 0)
            }
            static create(e, t = 0) {
                if (e.length == 0) throw new RangeError("A selection needs at least one range");
                for (let i = 0, r = 0; r < e.length; r++) {
                    let s = e[r];
                    if (s.empty ? s.from <= i : s.from < i) return y.normalized(e.slice(), t);
                    i = s.to
                }
                return new y(e, t)
            }
            static cursor(e, t = 0, i, r) {
                return ct.create(e, e, (t == 0 ? 0 : t < 0 ? 4 : 8) | (i == null ? 3 : Math.min(2, i)) | (r ? ? 33554431) << 5)
            }
            static range(e, t, i) {
                let r = (i ? ? 33554431) << 5;
                return t < e ? ct.create(t, e, 16 | r | 8) : ct.create(e, t, r | (t > e ? 4 : 0))
            }
            static normalized(e, t = 0) {
                let i = e[t];
                e.sort((r, s) => r.from - s.from), t = e.indexOf(i);
                for (let r = 1; r < e.length; r++) {
                    let s = e[r],
                        O = e[r - 1];
                    if (s.empty ? s.from <= O.to : s.from < O.to) {
                        let o = O.from,
                            l = Math.max(s.to, O.to);
                        r <= t && t--, e.splice(--r, 2, s.anchor > s.head ? y.range(l, o) : y.range(o, l))
                    }
                }
                return new y(e, t)
            }
        };

    function fO(n, e) {
        for (let t of n.ranges)
            if (t.to > e) throw new RangeError("Selection points outside of document")
    }
    var ir = 0,
        T = class {
            constructor(e, t, i, r, s) {
                this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = r, this.id = ir++, this.default = e([]), this.extensions = typeof s == "function" ? s(this) : s
            }
            static define(e = {}) {
                return new T(e.combine || (t => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : nr), !!e.static, e.enables)
            } of (e) {
                return new ui([], this, 0, e)
            }
            compute(e, t) {
                if (this.isStatic) throw new Error("Can't compute a static facet");
                return new ui(e, this, 1, t)
            }
            computeN(e, t) {
                if (this.isStatic) throw new Error("Can't compute a static facet");
                return new ui(e, this, 2, t)
            }
            from(e, t) {
                return t || (t = i => i), this.compute([e], i => t(i.field(e)))
            }
        };

    function nr(n, e) {
        return n == e || n.length == e.length && n.every((t, i) => t === e[i])
    }
    var ui = class {
        constructor(e, t, i, r) {
            this.dependencies = e, this.facet = t, this.type = i, this.value = r, this.id = ir++
        }
        dynamicSlot(e) {
            var t;
            let i = this.value,
                r = this.facet.compareInput,
                s = this.id,
                O = e[s] >> 1,
                o = this.type == 2,
                l = !1,
                a = !1,
                h = [];
            for (let c of this.dependencies) c == "doc" ? l = !0 : c == "selection" ? a = !0 : (((t = e[c.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && h.push(e[c.id]);
            return {
                create(c) {
                    return c.values[O] = i(c), 1
                },
                update(c, f) {
                    if (l && f.docChanged || a && (f.docChanged || f.selection) || rr(c, h)) {
                        let d = i(c);
                        if (o ? !dO(d, c.values[O], r) : !r(d, c.values[O])) return c.values[O] = d, 1
                    }
                    return 0
                },
                reconfigure: (c, f) => {
                    let d, p = f.config.address[s];
                    if (p != null) {
                        let m = Li(f, p);
                        if (this.dependencies.every($ => $ instanceof T ? f.facet($) === c.facet($) : $ instanceof pe ? f.field($, !1) == c.field($, !1) : !0) || (o ? dO(d = i(c), m, r) : r(d = i(c), m))) return c.values[O] = m, 0
                    } else d = i(c);
                    return c.values[O] = d, 1
                }
            }
        }
    };

    function dO(n, e, t) {
        if (n.length != e.length) return !1;
        for (let i = 0; i < n.length; i++)
            if (!t(n[i], e[i])) return !1;
        return !0
    }

    function rr(n, e) {
        let t = !1;
        for (let i of e) fi(n, i) & 1 && (t = !0);
        return t
    }

    function ic(n, e, t) {
        let i = t.map(l => n[l.id]),
            r = t.map(l => l.type),
            s = i.filter(l => !(l & 1)),
            O = n[e.id] >> 1;

        function o(l) {
            let a = [];
            for (let h = 0; h < i.length; h++) {
                let c = Li(l, i[h]);
                if (r[h] == 2)
                    for (let f of c) a.push(f);
                else a.push(c)
            }
            return e.combine(a)
        }
        return {
            create(l) {
                for (let a of i) fi(l, a);
                return l.values[O] = o(l), 1
            },
            update(l, a) {
                if (!rr(l, s)) return 0;
                let h = o(l);
                return e.compare(h, l.values[O]) ? 0 : (l.values[O] = h, 1)
            },
            reconfigure(l, a) {
                let h = rr(l, i),
                    c = a.config.facets[e.id],
                    f = a.facet(e);
                if (c && !h && nr(t, c)) return l.values[O] = f, 0;
                let d = o(l);
                return e.compare(d, f) ? (l.values[O] = f, 0) : (l.values[O] = d, 1)
            }
        }
    }
    var pO = T.define({
            static: !0
        }),
        pe = class {
            constructor(e, t, i, r, s) {
                this.id = e, this.createF = t, this.updateF = i, this.compareF = r, this.spec = s, this.provides = void 0
            }
            static define(e) {
                let t = new pe(ir++, e.create, e.update, e.compare || ((i, r) => i === r), e);
                return e.provide && (t.provides = e.provide(t)), t
            }
            create(e) {
                let t = e.facet(pO).find(i => i.field == this);
                return ((t == null ? void 0 : t.create) || this.createF)(e)
            }
            slot(e) {
                let t = e[this.id] >> 1;
                return {
                    create: i => (i.values[t] = this.create(i), 1),
                    update: (i, r) => {
                        let s = i.values[t],
                            O = this.updateF(s, r);
                        return this.compareF(s, O) ? 0 : (i.values[t] = O, 1)
                    },
                    reconfigure: (i, r) => r.config.address[this.id] != null ? (i.values[t] = r.field(this), 0) : (i.values[t] = this.create(i), 1)
                }
            }
            init(e) {
                return [this, pO.of({
                    field: this,
                    create: e
                })]
            }
            get extension() {
                return this
            }
        },
        vt = {
            lowest: 4,
            low: 3,
            default: 2,
            high: 1,
            highest: 0
        };

    function di(n) {
        return e => new sr(e, n)
    }
    var ut = {
            highest: di(vt.highest),
            high: di(vt.high),
            default: di(vt.default),
            low: di(vt.low),
            lowest: di(vt.lowest)
        },
        sr = class {
            constructor(e, t) {
                this.inner = e, this.prec = t
            }
        },
        wt = class { of (e) {
                return new Fi(this, e)
            }
            reconfigure(e) {
                return wt.reconfigure.of({
                    compartment: this,
                    extension: e
                })
            }
            get(e) {
                return e.config.compartments.get(this)
            }
        },
        Fi = class {
            constructor(e, t) {
                this.compartment = e, this.inner = t
            }
        },
        pi = class {
            constructor(e, t, i, r, s, O) {
                for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = r, this.staticValues = s, this.facets = O, this.statusTemplate = []; this.statusTemplate.length < i.length;) this.statusTemplate.push(0)
            }
            staticFacet(e) {
                let t = this.address[e.id];
                return t == null ? e.default : this.staticValues[t >> 1]
            }
            static resolve(e, t, i) {
                let r = [],
                    s = Object.create(null),
                    O = new Map;
                for (let f of nc(e, t, O)) f instanceof pe ? r.push(f) : (s[f.facet.id] || (s[f.facet.id] = [])).push(f);
                let o = Object.create(null),
                    l = [],
                    a = [];
                for (let f of r) o[f.id] = a.length << 1, a.push(d => f.slot(d));
                let h = i == null ? void 0 : i.config.facets;
                for (let f in s) {
                    let d = s[f],
                        p = d[0].facet,
                        m = h && h[f] || [];
                    if (d.every($ => $.type == 0))
                        if (o[p.id] = l.length << 1 | 1, nr(m, d)) l.push(i.facet(p));
                        else {
                            let $ = p.combine(d.map(g => g.value));
                            l.push(i && p.compare($, i.facet(p)) ? i.facet(p) : $)
                        }
                    else {
                        for (let $ of d) $.type == 0 ? (o[$.id] = l.length << 1 | 1, l.push($.value)) : (o[$.id] = a.length << 1, a.push(g => $.dynamicSlot(g)));
                        o[p.id] = a.length << 1, a.push($ => ic($, p, d))
                    }
                }
                let c = a.map(f => f(o));
                return new pi(e, O, c, o, l, s)
            }
        };

    function nc(n, e, t) {
        let i = [
                [],
                [],
                [],
                [],
                []
            ],
            r = new Map;

        function s(O, o) {
            let l = r.get(O);
            if (l != null) {
                if (l <= o) return;
                let a = i[l].indexOf(O);
                a > -1 && i[l].splice(a, 1), O instanceof Fi && t.delete(O.compartment)
            }
            if (r.set(O, o), Array.isArray(O))
                for (let a of O) s(a, o);
            else if (O instanceof Fi) {
                if (t.has(O.compartment)) throw new RangeError("Duplicate use of compartment in extensions");
                let a = e.get(O.compartment) || O.inner;
                t.set(O.compartment, a), s(a, o)
            } else if (O instanceof sr) s(O.inner, O.prec);
            else if (O instanceof pe) i[o].push(O), O.provides && s(O.provides, o);
            else if (O instanceof ui) i[o].push(O), O.facet.extensions && s(O.facet.extensions, vt.default);
            else {
                let a = O.extension;
                if (!a) throw new Error(`Unrecognized extension value in extension set (${O}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
                s(a, o)
            }
        }
        return s(n, vt.default), i.reduce((O, o) => O.concat(o))
    }

    function fi(n, e) {
        if (e & 1) return 2;
        let t = e >> 1,
            i = n.status[t];
        if (i == 4) throw new Error("Cyclic dependency between fields and/or facets");
        if (i & 2) return i;
        n.status[t] = 4;
        let r = n.computeSlot(n, n.config.dynamicSlots[t]);
        return n.status[t] = 2 | r
    }

    function Li(n, e) {
        return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1]
    }
    var mO = T.define(),
        $O = T.define({
            combine: n => n.some(e => e),
            static: !0
        }),
        gO = T.define({
            combine: n => n.length ? n[0] : void 0,
            static: !0
        }),
        QO = T.define(),
        yO = T.define(),
        SO = T.define(),
        bO = T.define({
            combine: n => n.length ? n[0] : !1
        }),
        Be = class {
            constructor(e, t) {
                this.type = e, this.value = t
            }
            static define() {
                return new PO
            }
        },
        PO = class { of (e) {
                return new Be(this, e)
            }
        },
        xO = class {
            constructor(e) {
                this.map = e
            } of (e) {
                return new Z(this, e)
            }
        },
        Z = class {
            constructor(e, t) {
                this.type = e, this.value = t
            }
            map(e) {
                let t = this.type.map(this.value, e);
                return t === void 0 ? void 0 : t == this.value ? this : new Z(this.type, t)
            }
            is(e) {
                return this.type == e
            }
            static define(e = {}) {
                return new xO(e.map || (t => t))
            }
            static mapEffects(e, t) {
                if (!e.length) return e;
                let i = [];
                for (let r of e) {
                    let s = r.map(t);
                    s && i.push(s)
                }
                return i
            }
        };
    Z.reconfigure = Z.define();
    Z.appendConfig = Z.define();
    var F = class {
        constructor(e, t, i, r, s, O) {
            this.startState = e, this.changes = t, this.selection = i, this.effects = r, this.annotations = s, this.scrollIntoView = O, this._doc = null, this._state = null, i && fO(i, t.newLength), s.some(o => o.type == F.time) || (this.annotations = s.concat(F.time.of(Date.now())))
        }
        static create(e, t, i, r, s, O) {
            return new F(e, t, i, r, s, O)
        }
        get newDoc() {
            return this._doc || (this._doc = this.changes.apply(this.startState.doc))
        }
        get newSelection() {
            return this.selection || this.startState.selection.map(this.changes)
        }
        get state() {
            return this._state || this.startState.applyTransaction(this), this._state
        }
        annotation(e) {
            for (let t of this.annotations)
                if (t.type == e) return t.value
        }
        get docChanged() {
            return !this.changes.empty
        }
        get reconfigured() {
            return this.startState.config != this.state.config
        }
        isUserEvent(e) {
            let t = this.annotation(F.userEvent);
            return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."))
        }
    };
    F.time = Be.define();
    F.userEvent = Be.define();
    F.addToHistory = Be.define();
    F.remote = Be.define();

    function rc(n, e) {
        let t = [];
        for (let i = 0, r = 0;;) {
            let s, O;
            if (i < n.length && (r == e.length || e[r] >= n[i])) s = n[i++], O = n[i++];
            else if (r < e.length) s = e[r++], O = e[r++];
            else return t;
            !t.length || t[t.length - 1] < s ? t.push(s, O) : t[t.length - 1] < O && (t[t.length - 1] = O)
        }
    }

    function TO(n, e, t) {
        var i;
        let r, s, O;
        return t ? (r = e.changes, s = B.empty(e.changes.length), O = n.changes.compose(e.changes)) : (r = e.changes.map(n.changes), s = n.changes.mapDesc(e.changes, !0), O = n.changes.compose(r)), {
            changes: O,
            selection: e.selection ? e.selection.map(s) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(r),
            effects: Z.mapEffects(n.effects, r).concat(Z.mapEffects(e.effects, s)),
            annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
            scrollIntoView: n.scrollIntoView || e.scrollIntoView
        }
    }

    function Or(n, e, t) {
        let i = e.selection,
            r = Mt(e.annotations);
        return e.userEvent && (r = r.concat(F.userEvent.of(e.userEvent))), {
            changes: e.changes instanceof B ? e.changes : B.of(e.changes || [], t, n.facet(gO)),
            selection: i && (i instanceof y ? i : y.single(i.anchor, i.head)),
            effects: Mt(e.effects),
            annotations: r,
            scrollIntoView: !!e.scrollIntoView
        }
    }

    function kO(n, e, t) {
        let i = Or(n, e.length ? e[0] : {}, n.doc.length);
        e.length && e[0].filter === !1 && (t = !1);
        for (let s = 1; s < e.length; s++) {
            e[s].filter === !1 && (t = !1);
            let O = !!e[s].sequential;
            i = TO(i, Or(n, e[s], O ? i.changes.newLength : n.doc.length), O)
        }
        let r = F.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
        return Oc(t ? sc(r) : r)
    }

    function sc(n) {
        let e = n.startState,
            t = !0;
        for (let r of e.facet(QO)) {
            let s = r(n);
            if (s === !1) {
                t = !1;
                break
            }
            Array.isArray(s) && (t = t === !0 ? s : rc(t, s))
        }
        if (t !== !0) {
            let r, s;
            if (t === !1) s = n.changes.invertedDesc, r = B.empty(e.doc.length);
            else {
                let O = n.changes.filter(t);
                r = O.changes, s = O.filtered.mapDesc(O.changes).invertedDesc
            }
            n = F.create(e, r, n.selection && n.selection.map(s), Z.mapEffects(n.effects, s), n.annotations, n.scrollIntoView)
        }
        let i = e.facet(yO);
        for (let r = i.length - 1; r >= 0; r--) {
            let s = i[r](n);
            s instanceof F ? n = s : Array.isArray(s) && s.length == 1 && s[0] instanceof F ? n = s[0] : n = kO(e, Mt(s), !1)
        }
        return n
    }

    function Oc(n) {
        let e = n.startState,
            t = e.facet(SO),
            i = n;
        for (let r = t.length - 1; r >= 0; r--) {
            let s = t[r](n);
            s && Object.keys(s).length && (i = TO(i, Or(e, s, n.changes.newLength), !0))
        }
        return i == n ? n : F.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView)
    }
    var oc = [];

    function Mt(n) {
        return n == null ? oc : Array.isArray(n) ? n : [n]
    }
    var ke = function(n) {
            return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n
        }(ke || (ke = {})),
        lc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        or;
    try {
        or = new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u")
    } catch (n) {}

    function ac(n) {
        if (or) return or.test(n);
        for (let e = 0; e < n.length; e++) {
            let t = n[e];
            if (/\w/.test(t) || t > "\x80" && (t.toUpperCase() != t.toLowerCase() || lc.test(t))) return !0
        }
        return !1
    }

    function hc(n) {
        return e => {
            if (!/\S/.test(e)) return ke.Space;
            if (ac(e)) return ke.Word;
            for (let t = 0; t < n.length; t++)
                if (e.indexOf(n[t]) > -1) return ke.Word;
            return ke.Other
        }
    }
    var _ = class {
        constructor(e, t, i, r, s, O) {
            this.config = e, this.doc = t, this.selection = i, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, O && (O._state = this);
            for (let o = 0; o < this.config.dynamicSlots.length; o++) fi(this, o << 1);
            this.computeSlot = null
        }
        field(e, t = !0) {
            let i = this.config.address[e.id];
            if (i == null) {
                if (t) throw new RangeError("Field is not present in this state");
                return
            }
            return fi(this, i), Li(this, i)
        }
        update(...e) {
            return kO(this, e, !0)
        }
        applyTransaction(e) {
            let t = this.config,
                {
                    base: i,
                    compartments: r
                } = t;
            for (let O of e.effects) O.is(wt.reconfigure) ? (t && (r = new Map, t.compartments.forEach((o, l) => r.set(l, o)), t = null), r.set(O.value.compartment, O.value.extension)) : O.is(Z.reconfigure) ? (t = null, i = O.value) : O.is(Z.appendConfig) && (t = null, i = Mt(i).concat(O.value));
            let s;
            t ? s = e.startState.values.slice() : (t = pi.resolve(i, r, this), s = new _(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (o, l) => l.reconfigure(o, this), null).values), new _(t, e.newDoc, e.newSelection, s, (O, o) => o.update(O, e), e)
        }
        replaceSelection(e) {
            return typeof e == "string" && (e = this.toText(e)), this.changeByRange(t => ({
                changes: {
                    from: t.from,
                    to: t.to,
                    insert: e
                },
                range: y.cursor(t.from + e.length)
            }))
        }
        changeByRange(e) {
            let t = this.selection,
                i = e(t.ranges[0]),
                r = this.changes(i.changes),
                s = [i.range],
                O = Mt(i.effects);
            for (let o = 1; o < t.ranges.length; o++) {
                let l = e(t.ranges[o]),
                    a = this.changes(l.changes),
                    h = a.map(r);
                for (let f = 0; f < o; f++) s[f] = s[f].map(h);
                let c = r.mapDesc(a, !0);
                s.push(l.range.map(c)), r = r.compose(h), O = Z.mapEffects(O, h).concat(Z.mapEffects(Mt(l.effects), c))
            }
            return {
                changes: r,
                selection: y.create(s, t.mainIndex),
                effects: O
            }
        }
        changes(e = []) {
            return e instanceof B ? e : B.of(e, this.doc.length, this.facet(_.lineSeparator))
        }
        toText(e) {
            return z.of(e.split(this.facet(_.lineSeparator) || Jn))
        }
        sliceDoc(e = 0, t = this.doc.length) {
            return this.doc.sliceString(e, t, this.lineBreak)
        }
        facet(e) {
            let t = this.config.address[e.id];
            return t == null ? e.default : (fi(this, t), Li(this, t))
        }
        toJSON(e) {
            let t = {
                doc: this.sliceDoc(),
                selection: this.selection.toJSON()
            };
            if (e)
                for (let i in e) {
                    let r = e[i];
                    r instanceof pe && this.config.address[r.id] != null && (t[i] = r.spec.toJSON(this.field(e[i]), this))
                }
            return t
        }
        static fromJSON(e, t = {}, i) {
            if (!e || typeof e.doc != "string") throw new RangeError("Invalid JSON representation for EditorState");
            let r = [];
            if (i) {
                for (let s in i)
                    if (Object.prototype.hasOwnProperty.call(e, s)) {
                        let O = i[s],
                            o = e[s];
                        r.push(O.init(l => O.spec.fromJSON(o, l)))
                    }
            }
            return _.create({
                doc: e.doc,
                selection: y.fromJSON(e.selection),
                extensions: t.extensions ? r.concat([t.extensions]) : r
            })
        }
        static create(e = {}) {
            let t = pi.resolve(e.extensions || [], new Map),
                i = e.doc instanceof z ? e.doc : z.of((e.doc || "").split(t.staticFacet(_.lineSeparator) || Jn)),
                r = e.selection ? e.selection instanceof y ? e.selection : y.single(e.selection.anchor, e.selection.head) : y.single(0);
            return fO(r, i.length), t.staticFacet($O) || (r = r.asSingle()), new _(t, i, r, t.dynamicSlots.map(() => null), (s, O) => O.create(s), null)
        }
        get tabSize() {
            return this.facet(_.tabSize)
        }
        get lineBreak() {
            return this.facet(_.lineSeparator) || `
`
        }
        get readOnly() {
            return this.facet(bO)
        }
        phrase(e, ...t) {
            for (let i of this.facet(_.phrases))
                if (Object.prototype.hasOwnProperty.call(i, e)) {
                    e = i[e];
                    break
                }
            return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, r) => {
                if (r == "$") return "$";
                let s = +(r || 1);
                return !s || s > t.length ? i : t[s - 1]
            })), e
        }
        languageDataAt(e, t, i = -1) {
            let r = [];
            for (let s of this.facet(mO))
                for (let O of s(this, t, i)) Object.prototype.hasOwnProperty.call(O, e) && r.push(O[e]);
            return r
        }
        charCategorizer(e) {
            return hc(this.languageDataAt("wordChars", e).join(""))
        }
        wordAt(e) {
            let {
                text: t,
                from: i,
                length: r
            } = this.doc.lineAt(e), s = this.charCategorizer(e), O = e - i, o = e - i;
            for (; O > 0;) {
                let l = Ve(t, O, !1);
                if (s(t.slice(l, O)) != ke.Word) break;
                O = l
            }
            for (; o < r;) {
                let l = Ve(t, o);
                if (s(t.slice(o, l)) != ke.Word) break;
                o = l
            }
            return O == o ? null : y.range(O + i, o + i)
        }
    };
    _.allowMultipleSelections = $O;
    _.tabSize = T.define({
        combine: n => n.length ? n[0] : 4
    });
    _.lineSeparator = gO;
    _.readOnly = bO;
    _.phrases = T.define({
        compare(n, e) {
            let t = Object.keys(n),
                i = Object.keys(e);
            return t.length == i.length && t.every(r => n[r] == e[r])
        }
    });
    _.languageData = mO;
    _.changeFilter = QO;
    _.transactionFilter = yO;
    _.transactionExtender = SO;
    wt.reconfigure = Z.define();

    function It(n, e, t = {}) {
        let i = {};
        for (let r of n)
            for (let s of Object.keys(r)) {
                let O = r[s],
                    o = i[s];
                if (o === void 0) i[s] = O;
                else if (!(o === O || O === void 0))
                    if (Object.hasOwnProperty.call(t, s)) i[s] = t[s](o, O);
                    else throw new Error("Config merge conflict for field " + s)
            }
        for (let r in e) i[r] === void 0 && (i[r] = e[r]);
        return i
    }
    var Ne = class {
        eq(e) {
            return this == e
        }
        range(e, t = e) {
            return Bt.create(e, t, this)
        }
    };
    Ne.prototype.startSide = Ne.prototype.endSide = 0;
    Ne.prototype.point = !1;
    Ne.prototype.mapMode = re.TrackDel;
    var Bt = class {
        constructor(e, t, i) {
            this.from = e, this.to = t, this.value = i
        }
        static create(e, t, i) {
            return new Bt(e, t, i)
        }
    };

    function lr(n, e) {
        return n.from - e.from || n.value.startSide - e.value.startSide
    }
    var Hi = class {
            constructor(e, t, i, r) {
                this.from = e, this.to = t, this.value = i, this.maxPoint = r
            }
            get length() {
                return this.to[this.to.length - 1]
            }
            findIndex(e, t, i, r = 0) {
                let s = i ? this.to : this.from;
                for (let O = r, o = s.length;;) {
                    if (O == o) return O;
                    let l = O + o >> 1,
                        a = s[l] - e || (i ? this.value[l].endSide : this.value[l].startSide) - t;
                    if (l == O) return a >= 0 ? O : o;
                    a >= 0 ? o = l : O = l + 1
                }
            }
            between(e, t, i, r) {
                for (let s = this.findIndex(t, -1e9, !0), O = this.findIndex(i, 1e9, !1, s); s < O; s++)
                    if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === !1) return !1
            }
            map(e, t) {
                let i = [],
                    r = [],
                    s = [],
                    O = -1,
                    o = -1;
                for (let l = 0; l < this.value.length; l++) {
                    let a = this.value[l],
                        h = this.from[l] + e,
                        c = this.to[l] + e,
                        f, d;
                    if (h == c) {
                        let p = t.mapPos(h, a.startSide, a.mapMode);
                        if (p == null || (f = d = p, a.startSide != a.endSide && (d = t.mapPos(h, a.endSide), d < f))) continue
                    } else if (f = t.mapPos(h, a.startSide), d = t.mapPos(c, a.endSide), f > d || f == d && a.startSide > 0 && a.endSide <= 0) continue;
                    (d - f || a.endSide - a.startSide) < 0 || (O < 0 && (O = f), a.point && (o = Math.max(o, d - f)), i.push(a), r.push(f - O), s.push(d - O))
                }
                return {
                    mapped: i.length ? new Hi(r, s, i, o) : null,
                    pos: O
                }
            }
        },
        U = class {
            constructor(e, t, i, r) {
                this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = r
            }
            static create(e, t, i, r) {
                return new U(e, t, i, r)
            }
            get length() {
                let e = this.chunk.length - 1;
                return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length)
            }
            get size() {
                if (this.isEmpty) return 0;
                let e = this.nextLayer.size;
                for (let t of this.chunk) e += t.value.length;
                return e
            }
            chunkEnd(e) {
                return this.chunkPos[e] + this.chunk[e].length
            }
            update(e) {
                let {
                    add: t = [],
                    sort: i = !1,
                    filterFrom: r = 0,
                    filterTo: s = this.length
                } = e, O = e.filter;
                if (t.length == 0 && !O) return this;
                if (i && (t = t.slice().sort(lr)), this.isEmpty) return t.length ? U.of(t) : this;
                let o = new ar(this, null, -1).goto(0),
                    l = 0,
                    a = [],
                    h = new ft;
                for (; o.value || l < t.length;)
                    if (l < t.length && (o.from - t[l].from || o.startSide - t[l].value.startSide) >= 0) {
                        let c = t[l++];
                        h.addInner(c.from, c.to, c.value) || a.push(c)
                    } else o.rangeIndex == 1 && o.chunkIndex < this.chunk.length && (l == t.length || this.chunkEnd(o.chunkIndex) < t[l].from) && (!O || r > this.chunkEnd(o.chunkIndex) || s < this.chunkPos[o.chunkIndex]) && h.addChunk(this.chunkPos[o.chunkIndex], this.chunk[o.chunkIndex]) ? o.nextChunk() : ((!O || r > o.to || s < o.from || O(o.from, o.to, o.value)) && (h.addInner(o.from, o.to, o.value) || a.push(Bt.create(o.from, o.to, o.value))), o.next());
                return h.finishInner(this.nextLayer.isEmpty && !a.length ? U.empty : this.nextLayer.update({
                    add: a,
                    filter: O,
                    filterFrom: r,
                    filterTo: s
                }))
            }
            map(e) {
                if (e.empty || this.isEmpty) return this;
                let t = [],
                    i = [],
                    r = -1;
                for (let O = 0; O < this.chunk.length; O++) {
                    let o = this.chunkPos[O],
                        l = this.chunk[O],
                        a = e.touchesRange(o, o + l.length);
                    if (a === !1) r = Math.max(r, l.maxPoint), t.push(l), i.push(e.mapPos(o));
                    else if (a === !0) {
                        let {
                            mapped: h,
                            pos: c
                        } = l.map(o, e);
                        h && (r = Math.max(r, h.maxPoint), t.push(h), i.push(c))
                    }
                }
                let s = this.nextLayer.map(e);
                return t.length == 0 ? s : new U(i, t, s || U.empty, r)
            }
            between(e, t, i) {
                if (!this.isEmpty) {
                    for (let r = 0; r < this.chunk.length; r++) {
                        let s = this.chunkPos[r],
                            O = this.chunk[r];
                        if (t >= s && e <= s + O.length && O.between(s, e - s, t - s, i) === !1) return
                    }
                    this.nextLayer.between(e, t, i)
                }
            }
            iter(e = 0) {
                return Nt.from([this]).goto(e)
            }
            get isEmpty() {
                return this.nextLayer == this
            }
            static iter(e, t = 0) {
                return Nt.from(e).goto(t)
            }
            static compare(e, t, i, r, s = -1) {
                let O = e.filter(c => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= s),
                    o = t.filter(c => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= s),
                    l = vO(O, o, i),
                    a = new Lt(O, l, s),
                    h = new Lt(o, l, s);
                i.iterGaps((c, f, d) => wO(a, c, h, f, d, r)), i.empty && i.length == 0 && wO(a, 0, h, 0, 0, r)
            }
            static eq(e, t, i = 0, r) {
                r == null && (r = 1e9 - 1);
                let s = e.filter(h => !h.isEmpty && t.indexOf(h) < 0),
                    O = t.filter(h => !h.isEmpty && e.indexOf(h) < 0);
                if (s.length != O.length) return !1;
                if (!s.length) return !0;
                let o = vO(s, O),
                    l = new Lt(s, o, 0).goto(i),
                    a = new Lt(O, o, 0).goto(i);
                for (;;) {
                    if (l.to != a.to || !hr(l.active, a.active) || l.point && (!a.point || !l.point.eq(a.point))) return !1;
                    if (l.to > r) return !0;
                    l.next(), a.next()
                }
            }
            static spans(e, t, i, r, s = -1) {
                let O = new Lt(e, null, s).goto(t),
                    o = t,
                    l = O.openStart;
                for (;;) {
                    let a = Math.min(O.to, i);
                    if (O.point) {
                        let h = O.activeForPoint(O.to),
                            c = O.pointFrom < t ? h.length + 1 : Math.min(h.length, l);
                        r.point(o, a, O.point, h, c, O.pointRank), l = Math.min(O.openEnd(a), h.length)
                    } else a > o && (r.span(o, a, O.active, l), l = O.openEnd(a));
                    if (O.to > i) return l + (O.point && O.to > i ? 1 : 0);
                    o = O.to, O.next()
                }
            }
            static of (e, t = !1) {
                let i = new ft;
                for (let r of e instanceof Bt ? [e] : t ? cc(e) : e) i.add(r.from, r.to, r.value);
                return i.finish()
            }
        };
    U.empty = new U([], [], null, -1);

    function cc(n) {
        if (n.length > 1)
            for (let e = n[0], t = 1; t < n.length; t++) {
                let i = n[t];
                if (lr(e, i) > 0) return n.slice().sort(lr);
                e = i
            }
        return n
    }
    U.empty.nextLayer = U.empty;
    var ft = class {
        constructor() {
            this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null
        }
        finishChunk(e) {
            this.chunks.push(new Hi(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = [])
        }
        add(e, t, i) {
            this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new ft)).add(e, t, i)
        }
        addInner(e, t, i) {
            let r = e - this.lastTo || i.startSide - this.last.endSide;
            if (r <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0) throw new Error("Ranges must be added sorted by `from` position and `startSide`");
            return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0)
        }
        addChunk(e, t) {
            if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0) return !1;
            this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
            let i = t.value.length - 1;
            return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0
        }
        finish() {
            return this.finishInner(U.empty)
        }
        finishInner(e) {
            if (this.from.length && this.finishChunk(!1), this.chunks.length == 0) return e;
            let t = U.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
            return this.from = null, t
        }
    };

    function vO(n, e, t) {
        let i = new Map;
        for (let s of n)
            for (let O = 0; O < s.chunk.length; O++) s.chunk[O].maxPoint <= 0 && i.set(s.chunk[O], s.chunkPos[O]);
        let r = new Set;
        for (let s of e)
            for (let O = 0; O < s.chunk.length; O++) {
                let o = i.get(s.chunk[O]);
                o != null && (t ? t.mapPos(o) : o) == s.chunkPos[O] && !(t == null ? void 0 : t.touchesRange(o, o + s.chunk[O].length)) && r.add(s.chunk[O])
            }
        return r
    }
    var ar = class {
            constructor(e, t, i, r = 0) {
                this.layer = e, this.skip = t, this.minPoint = i, this.rank = r
            }
            get startSide() {
                return this.value ? this.value.startSide : 0
            }
            get endSide() {
                return this.value ? this.value.endSide : 0
            }
            goto(e, t = -1e9) {
                return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this
            }
            gotoInner(e, t, i) {
                for (; this.chunkIndex < this.layer.chunk.length;) {
                    let r = this.layer.chunk[this.chunkIndex];
                    if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint)) break;
                    this.chunkIndex++, i = !1
                }
                if (this.chunkIndex < this.layer.chunk.length) {
                    let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
                    (!i || this.rangeIndex < r) && this.setRangeIndex(r)
                }
                this.next()
            }
            forward(e, t) {
                (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0)
            }
            next() {
                for (;;)
                    if (this.chunkIndex == this.layer.chunk.length) {
                        this.from = this.to = 1e9, this.value = null;
                        break
                    } else {
                        let e = this.layer.chunkPos[this.chunkIndex],
                            t = this.layer.chunk[this.chunkIndex],
                            i = e + t.from[this.rangeIndex];
                        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break
                    }
            }
            setRangeIndex(e) {
                if (e == this.layer.chunk[this.chunkIndex].value.length) {
                    if (this.chunkIndex++, this.skip)
                        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]);) this.chunkIndex++;
                    this.rangeIndex = 0
                } else this.rangeIndex = e
            }
            nextChunk() {
                this.chunkIndex++, this.rangeIndex = 0, this.next()
            }
            compare(e) {
                return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide
            }
        },
        Nt = class {
            constructor(e) {
                this.heap = e
            }
            static from(e, t = null, i = -1) {
                let r = [];
                for (let s = 0; s < e.length; s++)
                    for (let O = e[s]; !O.isEmpty; O = O.nextLayer) O.maxPoint >= i && r.push(new ar(O, t, i, s));
                return r.length == 1 ? r[0] : new Nt(r)
            }
            get startSide() {
                return this.value ? this.value.startSide : 0
            }
            goto(e, t = -1e9) {
                for (let i of this.heap) i.goto(e, t);
                for (let i = this.heap.length >> 1; i >= 0; i--) cr(this.heap, i);
                return this.next(), this
            }
            forward(e, t) {
                for (let i of this.heap) i.forward(e, t);
                for (let i = this.heap.length >> 1; i >= 0; i--) cr(this.heap, i);
                (this.to - e || this.value.endSide - t) < 0 && this.next()
            }
            next() {
                if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
                else {
                    let e = this.heap[0];
                    this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), cr(this.heap, 0)
                }
            }
        };

    function cr(n, e) {
        for (let t = n[e];;) {
            let i = (e << 1) + 1;
            if (i >= n.length) break;
            let r = n[i];
            if (i + 1 < n.length && r.compare(n[i + 1]) >= 0 && (r = n[i + 1], i++), t.compare(r) < 0) break;
            n[i] = t, n[e] = r, e = i
        }
    }
    var Lt = class {
        constructor(e, t, i) {
            this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Nt.from(e, t, i)
        }
        goto(e, t = -1e9) {
            return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this
        }
        forward(e, t) {
            for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0;) this.removeActive(this.minActive);
            this.cursor.forward(e, t)
        }
        removeActive(e) {
            Ki(this.active, e), Ki(this.activeTo, e), Ki(this.activeRank, e), this.minActive = XO(this.active, this.activeTo)
        }
        addActive(e) {
            let t = 0,
                {
                    value: i,
                    to: r,
                    rank: s
                } = this.cursor;
            for (; t < this.activeRank.length && this.activeRank[t] <= s;) t++;
            Ji(this.active, t, i), Ji(this.activeTo, t, r), Ji(this.activeRank, t, s), e && Ji(e, t, this.cursor.from), this.minActive = XO(this.active, this.activeTo)
        }
        next() {
            let e = this.to,
                t = this.point;
            this.point = null;
            let i = this.openStart < 0 ? [] : null;
            for (;;) {
                let r = this.minActive;
                if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
                    if (this.activeTo[r] > e) {
                        this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
                        break
                    }
                    this.removeActive(r), i && Ki(i, r)
                } else if (this.cursor.value)
                    if (this.cursor.from > e) {
                        this.to = this.cursor.from, this.endSide = this.cursor.startSide;
                        break
                    } else {
                        let s = this.cursor.value;
                        if (!s.point) this.addActive(i), this.cursor.next();
                        else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
                        else {
                            this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
                            break
                        }
                    }
                else {
                    this.to = this.endSide = 1e9;
                    break
                }
            }
            if (i) {
                this.openStart = 0;
                for (let r = i.length - 1; r >= 0 && i[r] < e; r--) this.openStart++
            }
        }
        activeForPoint(e) {
            if (!this.active.length) return this.active;
            let t = [];
            for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)(this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
            return t.reverse()
        }
        openEnd(e) {
            let t = 0;
            for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--) t++;
            return t
        }
    };

    function wO(n, e, t, i, r, s) {
        n.goto(e), t.goto(i);
        let O = i + r,
            o = i,
            l = i - e;
        for (;;) {
            let a = n.to + l - t.to || n.endSide - t.endSide,
                h = a < 0 ? n.to + l : t.to,
                c = Math.min(h, O);
            if (n.point || t.point ? n.point && t.point && (n.point == t.point || n.point.eq(t.point)) && hr(n.activeForPoint(n.to + l), t.activeForPoint(t.to)) || s.comparePoint(o, c, n.point, t.point) : c > o && !hr(n.active, t.active) && s.compareRange(o, c, n.active, t.active), h > O) break;
            o = h, a <= 0 && n.next(), a >= 0 && t.next()
        }
    }

    function hr(n, e) {
        if (n.length != e.length) return !1;
        for (let t = 0; t < n.length; t++)
            if (n[t] != e[t] && !n[t].eq(e[t])) return !1;
        return !0
    }

    function Ki(n, e) {
        for (let t = e, i = n.length - 1; t < i; t++) n[t] = n[t + 1];
        n.pop()
    }

    function Ji(n, e, t) {
        for (let i = n.length - 1; i >= e; i--) n[i + 1] = n[i];
        n[e] = t
    }

    function XO(n, e) {
        let t = -1,
            i = 1e9;
        for (let r = 0; r < e.length; r++)(e[r] - i || n[r].endSide - n[t].endSide) < 0 && (t = r, i = e[r]);
        return t
    }

    function en(n, e, t = n.length) {
        let i = 0;
        for (let r = 0; r < t;) n.charCodeAt(r) == 9 ? (i += e - i % e, r++) : (i++, r = Ve(n, r));
        return i
    }

    function RO(n, e, t, i) {
        for (let r = 0, s = 0;;) {
            if (s >= e) return r;
            if (r == n.length) break;
            s += n.charCodeAt(r) == 9 ? t - s % t : 1, r = Ve(n, r)
        }
        return i === !0 ? -1 : n.length
    }
    var ur = "\u037C",
        zO = typeof Symbol == "undefined" ? "__" + ur : Symbol.for(ur),
        fr = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"),
        WO = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {},
        Ce = class {
            constructor(e, t) {
                this.rules = [];
                let {
                    finish: i
                } = t || {};

                function r(O) {
                    return /^@/.test(O) ? [O] : O.split(/,\s*/)
                }

                function s(O, o, l, a) {
                    let h = [],
                        c = /^@(\w+)\b/.exec(O[0]),
                        f = c && c[1] == "keyframes";
                    if (c && o == null) return l.push(O[0] + ";");
                    for (let d in o) {
                        let p = o[d];
                        if (/&/.test(d)) s(d.split(/,\s*/).map(m => O.map($ => m.replace(/&/, $))).reduce((m, $) => m.concat($)), p, l);
                        else if (p && typeof p == "object") {
                            if (!c) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
                            s(r(d), p, h, f)
                        } else p != null && h.push(d.replace(/_.*/, "").replace(/[A-Z]/g, m => "-" + m.toLowerCase()) + ": " + p + ";")
                    }(h.length || f) && l.push((i && !c && !a ? O.map(i) : O).join(", ") + " {" + h.join(" ") + "}")
                }
                for (let O in e) s(r(O), e[O], this.rules)
            }
            getRules() {
                return this.rules.join(`
`)
            }
            static newName() {
                let e = WO[zO] || 1;
                return WO[zO] = e + 1, ur + e.toString(36)
            }
            static mount(e, t) {
                (e[fr] || new qO(e)).mount(Array.isArray(t) ? t : [t])
            }
        },
        tn = null,
        qO = class {
            constructor(e) {
                if (!e.head && e.adoptedStyleSheets && typeof CSSStyleSheet != "undefined") {
                    if (tn) return e.adoptedStyleSheets = [tn.sheet].concat(e.adoptedStyleSheets), e[fr] = tn;
                    this.sheet = new CSSStyleSheet, e.adoptedStyleSheets = [this.sheet].concat(e.adoptedStyleSheets), tn = this
                } else {
                    this.styleTag = (e.ownerDocument || e).createElement("style");
                    let t = e.head || e;
                    t.insertBefore(this.styleTag, t.firstChild)
                }
                this.modules = [], e[fr] = this
            }
            mount(e) {
                let t = this.sheet,
                    i = 0,
                    r = 0;
                for (let s = 0; s < e.length; s++) {
                    let O = e[s],
                        o = this.modules.indexOf(O);
                    if (o < r && o > -1 && (this.modules.splice(o, 1), r--, o = -1), o == -1) {
                        if (this.modules.splice(r++, 0, O), t)
                            for (let l = 0; l < O.rules.length; l++) t.insertRule(O.rules[l], i++)
                    } else {
                        for (; r < o;) i += this.modules[r++].rules.length;
                        i += O.rules.length, r++
                    }
                }
                if (!t) {
                    let s = "";
                    for (let O = 0; O < this.modules.length; O++) s += this.modules[O].getRules() + `
`;
                    this.styleTag.textContent = s
                }
            }
        };
    var tt = {
            8: "Backspace",
            9: "Tab",
            10: "Enter",
            12: "NumLock",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            44: "PrintScreen",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Meta",
            92: "Meta",
            106: "*",
            107: "+",
            108: ",",
            109: "-",
            110: ".",
            111: "/",
            144: "NumLock",
            145: "ScrollLock",
            160: "Shift",
            161: "Shift",
            162: "Control",
            163: "Control",
            164: "Alt",
            165: "Alt",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },
        Ft = {
            48: ")",
            49: "!",
            50: "@",
            51: "#",
            52: "$",
            53: "%",
            54: "^",
            55: "&",
            56: "*",
            57: "(",
            59: ":",
            61: "+",
            173: "_",
            186: ":",
            187: "+",
            188: "<",
            189: "_",
            190: ">",
            191: "?",
            192: "~",
            219: "{",
            220: "|",
            221: "}",
            222: '"'
        },
        ZO = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent),
        og = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent),
        uc = typeof navigator != "undefined" && /Mac/.test(navigator.platform),
        fc = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
        dc = uc || ZO && +ZO[1] < 57;
    for (var se = 0; se < 10; se++) tt[48 + se] = tt[96 + se] = String(se);
    for (var se = 1; se <= 24; se++) tt[se + 111] = "F" + se;
    for (var se = 65; se <= 90; se++) tt[se] = String.fromCharCode(se + 32), Ft[se] = String.fromCharCode(se);
    for (var dr in tt) Ft.hasOwnProperty(dr) || (Ft[dr] = tt[dr]);

    function _O(n) {
        var e = dc && (n.ctrlKey || n.altKey || n.metaKey) || fc && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified",
            t = !e && n.key || (n.shiftKey ? Ft : tt)[n.keyCode] || n.key || "Unidentified";
        return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t
    }

    function nn(n) {
        let e;
        return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection()
    }

    function Ht(n, e) {
        return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1
    }

    function pc(n) {
        let e = n.activeElement;
        for (; e && e.shadowRoot;) e = e.shadowRoot.activeElement;
        return e
    }

    function rn(n, e) {
        if (!e.anchorNode) return !1;
        try {
            return Ht(n, e.anchorNode)
        } catch (t) {
            return !1
        }
    }

    function mi(n) {
        return n.nodeType == 3 ? Kt(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : []
    }

    function sn(n, e, t, i) {
        return t ? VO(n, e, t, i, -1) || VO(n, e, t, i, 1) : !1
    }

    function On(n) {
        for (var e = 0;; e++)
            if (n = n.previousSibling, !n) return e
    }

    function VO(n, e, t, i, r) {
        for (;;) {
            if (n == t && e == i) return !0;
            if (e == (r < 0 ? 0 : $i(n))) {
                if (n.nodeName == "DIV") return !1;
                let s = n.parentNode;
                if (!s || s.nodeType != 1) return !1;
                e = On(n) + (r < 0 ? 0 : 1), n = s
            } else if (n.nodeType == 1) {
                if (n = n.childNodes[e + (r < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false") return !1;
                e = r < 0 ? $i(n) : 0
            } else return !1
        }
    }

    function $i(n) {
        return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length
    }
    var UO = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    function pr(n, e) {
        let t = e ? n.left : n.right;
        return {
            left: t,
            right: t,
            top: n.top,
            bottom: n.bottom
        }
    }

    function mc(n) {
        return {
            left: 0,
            right: n.innerWidth,
            top: 0,
            bottom: n.innerHeight
        }
    }

    function $c(n, e, t, i, r, s, O, o) {
        let l = n.ownerDocument,
            a = l.defaultView || window;
        for (let h = n; h;)
            if (h.nodeType == 1) {
                let c, f = h == l.body;
                if (f) c = mc(a);
                else {
                    if (h.scrollHeight <= h.clientHeight && h.scrollWidth <= h.clientWidth) {
                        h = h.assignedSlot || h.parentNode;
                        continue
                    }
                    let m = h.getBoundingClientRect();
                    c = {
                        left: m.left,
                        right: m.left + h.clientWidth,
                        top: m.top,
                        bottom: m.top + h.clientHeight
                    }
                }
                let d = 0,
                    p = 0;
                if (r == "nearest") e.top < c.top ? (p = -(c.top - e.top + O), t > 0 && e.bottom > c.bottom + p && (p = e.bottom - c.bottom + p + O)) : e.bottom > c.bottom && (p = e.bottom - c.bottom + O, t < 0 && e.top - p < c.top && (p = -(c.top + p - e.top + O)));
                else {
                    let m = e.bottom - e.top,
                        $ = c.bottom - c.top;
                    p = (r == "center" && m <= $ ? e.top + m / 2 - $ / 2 : r == "start" || r == "center" && t < 0 ? e.top - O : e.bottom - $ + O) - c.top
                }
                if (i == "nearest" ? e.left < c.left ? (d = -(c.left - e.left + s), t > 0 && e.right > c.right + d && (d = e.right - c.right + d + s)) : e.right > c.right && (d = e.right - c.right + s, t < 0 && e.left < c.left + d && (d = -(c.left + d - e.left + s))) : d = (i == "center" ? e.left + (e.right - e.left) / 2 - (c.right - c.left) / 2 : i == "start" == o ? e.left - s : e.right - (c.right - c.left) + s) - c.left, d || p)
                    if (f) a.scrollBy(d, p);
                    else {
                        let m = 0,
                            $ = 0;
                        if (p) {
                            let g = h.scrollTop;
                            h.scrollTop += p, $ = h.scrollTop - g
                        }
                        if (d) {
                            let g = h.scrollLeft;
                            h.scrollLeft += d, m = h.scrollLeft - g
                        }
                        e = {
                            left: e.left - m,
                            top: e.top - $,
                            right: e.right - m,
                            bottom: e.bottom - $
                        }, m && Math.abs(m - d) < 1 && (i = "nearest"), $ && Math.abs($ - p) < 1 && (r = "nearest")
                    }
                if (f) break;
                h = h.assignedSlot || h.parentNode
            } else if (h.nodeType == 11) h = h.host;
        else break
    }
    var CO = class {
            constructor() {
                this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0
            }
            eq(e) {
                return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset
            }
            setRange(e) {
                this.set(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset)
            }
            set(e, t, i, r) {
                this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = r
            }
        },
        Jt = null;

    function AO(n) {
        if (n.setActive) return n.setActive();
        if (Jt) return n.focus(Jt);
        let e = [];
        for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode);
        if (n.focus(Jt == null ? {
                get preventScroll() {
                    return Jt = {
                        preventScroll: !0
                    }, !0
                }
            } : void 0), !Jt) {
            Jt = !1;
            for (let t = 0; t < e.length;) {
                let i = e[t++],
                    r = e[t++],
                    s = e[t++];
                i.scrollTop != r && (i.scrollTop = r), i.scrollLeft != s && (i.scrollLeft = s)
            }
        }
    }
    var YO;

    function Kt(n, e, t = e) {
        let i = YO || (YO = document.createRange());
        return i.setEnd(n, t), i.setStart(n, e), i
    }

    function ei(n, e, t) {
        let i = {
                key: e,
                code: e,
                keyCode: t,
                which: t,
                cancelable: !0
            },
            r = new KeyboardEvent("keydown", i);
        r.synthetic = !0, n.dispatchEvent(r);
        let s = new KeyboardEvent("keyup", i);
        return s.synthetic = !0, n.dispatchEvent(s), r.defaultPrevented || s.defaultPrevented
    }

    function gc(n) {
        for (; n;) {
            if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host)) return n;
            n = n.assignedSlot || n.parentNode
        }
        return null
    }

    function jO(n) {
        for (; n.attributes.length;) n.removeAttributeNode(n.attributes[0])
    }

    function Qc(n, e) {
        let t = e.focusNode,
            i = e.focusOffset;
        if (!t || e.anchorNode != t || e.anchorOffset != i) return !1;
        for (;;)
            if (i) {
                if (t.nodeType != 1) return !1;
                let r = t.childNodes[i - 1];
                r.contentEditable == "false" ? i-- : (t = r, i = $i(t))
            } else {
                if (t == n) return !0;
                i = On(t), t = t.parentNode
            }
    }
    var Oe = class {
            constructor(e, t, i = !0) {
                this.node = e, this.offset = t, this.precise = i
            }
            static before(e, t) {
                return new Oe(e.parentNode, On(e), t)
            }
            static after(e, t) {
                return new Oe(e.parentNode, On(e) + 1, t)
            }
        },
        mr = [],
        A = class {
            constructor() {
                this.parent = null, this.dom = null, this.dirty = 2
            }
            get editorView() {
                if (!this.parent) throw new Error("Accessing view in orphan content view");
                return this.parent.editorView
            }
            get overrideDOMText() {
                return null
            }
            get posAtStart() {
                return this.parent ? this.parent.posBefore(this) : 0
            }
            get posAtEnd() {
                return this.posAtStart + this.length
            }
            posBefore(e) {
                let t = this.posAtStart;
                for (let i of this.children) {
                    if (i == e) return t;
                    t += i.length + i.breakAfter
                }
                throw new RangeError("Invalid child in posBefore")
            }
            posAfter(e) {
                return this.posBefore(e) + e.length
            }
            coordsAt(e, t) {
                return null
            }
            sync(e) {
                if (this.dirty & 2) {
                    let t = this.dom,
                        i = null,
                        r;
                    for (let s of this.children) {
                        if (s.dirty) {
                            if (!s.dom && (r = i ? i.nextSibling : t.firstChild)) {
                                let O = A.get(r);
                                (!O || !O.parent && O.canReuseDOM(s)) && s.reuseDOM(r)
                            }
                            s.sync(e), s.dirty = 0
                        }
                        if (r = i ? i.nextSibling : t.firstChild, e && !e.written && e.node == t && r != s.dom && (e.written = !0), s.dom.parentNode == t)
                            for (; r && r != s.dom;) r = GO(r);
                        else t.insertBefore(s.dom, r);
                        i = s.dom
                    }
                    for (r = i ? i.nextSibling : t.firstChild, r && e && e.node == t && (e.written = !0); r;) r = GO(r)
                } else if (this.dirty & 1)
                    for (let t of this.children) t.dirty && (t.sync(e), t.dirty = 0)
            }
            reuseDOM(e) {}
            localPosFromDOM(e, t) {
                let i;
                if (e == this.dom) i = this.dom.childNodes[t];
                else {
                    let r = $i(e) == 0 ? 0 : t == 0 ? -1 : 1;
                    for (;;) {
                        let s = e.parentNode;
                        if (s == this.dom) break;
                        r == 0 && s.firstChild != s.lastChild && (e == s.firstChild ? r = -1 : r = 1), e = s
                    }
                    r < 0 ? i = e : i = e.nextSibling
                }
                if (i == this.dom.firstChild) return 0;
                for (; i && !A.get(i);) i = i.nextSibling;
                if (!i) return this.length;
                for (let r = 0, s = 0;; r++) {
                    let O = this.children[r];
                    if (O.dom == i) return s;
                    s += O.length + O.breakAfter
                }
            }
            domBoundsAround(e, t, i = 0) {
                let r = -1,
                    s = -1,
                    O = -1,
                    o = -1;
                for (let l = 0, a = i, h = i; l < this.children.length; l++) {
                    let c = this.children[l],
                        f = a + c.length;
                    if (a < e && f > t) return c.domBoundsAround(e, t, a);
                    if (f >= e && r == -1 && (r = l, s = a), a > t && c.dom.parentNode == this.dom) {
                        O = l, o = h;
                        break
                    }
                    h = f, a = f + c.breakAfter
                }
                return {
                    from: s,
                    to: o < 0 ? i + this.length : o,
                    startDOM: (r ? this.children[r - 1].dom.nextSibling : null) || this.dom.firstChild,
                    endDOM: O < this.children.length && O >= 0 ? this.children[O].dom : null
                }
            }
            markDirty(e = !1) {
                this.dirty |= 2, this.markParentsDirty(e)
            }
            markParentsDirty(e) {
                for (let t = this.parent; t; t = t.parent) {
                    if (e && (t.dirty |= 2), t.dirty & 1) return;
                    t.dirty |= 1, e = !1
                }
            }
            setParent(e) {
                this.parent != e && (this.parent = e, this.dirty && this.markParentsDirty(!0))
            }
            setDOM(e) {
                this.dom && (this.dom.cmView = null), this.dom = e, e.cmView = this
            }
            get rootView() {
                for (let e = this;;) {
                    let t = e.parent;
                    if (!t) return e;
                    e = t
                }
            }
            replaceChildren(e, t, i = mr) {
                this.markDirty();
                for (let r = e; r < t; r++) {
                    let s = this.children[r];
                    s.parent == this && s.destroy()
                }
                this.children.splice(e, t - e, ...i);
                for (let r = 0; r < i.length; r++) i[r].setParent(this)
            }
            ignoreMutation(e) {
                return !1
            }
            ignoreEvent(e) {
                return !1
            }
            childCursor(e = this.length) {
                return new $r(this.children, e, this.children.length)
            }
            childPos(e, t = 1) {
                return this.childCursor().findPos(e, t)
            }
            toString() {
                let e = this.constructor.name.replace("View", "");
                return e + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (e == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "")
            }
            static get(e) {
                return e.cmView
            }
            get isEditable() {
                return !0
            }
            merge(e, t, i, r, s, O) {
                return !1
            }
            become(e) {
                return !1
            }
            canReuseDOM(e) {
                return e.constructor == this.constructor
            }
            getSide() {
                return 0
            }
            destroy() {
                this.parent = null
            }
        };
    A.prototype.breakAfter = 0;

    function GO(n) {
        let e = n.nextSibling;
        return n.parentNode.removeChild(n), e
    }
    var $r = class {
        constructor(e, t, i) {
            this.children = e, this.pos = t, this.i = i, this.off = 0
        }
        findPos(e, t = 1) {
            for (;;) {
                if (e > this.pos || e == this.pos && (t > 0 || this.i == 0 || this.children[this.i - 1].breakAfter)) return this.off = e - this.pos, this;
                let i = this.children[--this.i];
                this.pos -= i.length + i.breakAfter
            }
        }
    };

    function EO(n, e, t, i, r, s, O, o, l) {
        let {
            children: a
        } = n, h = a.length ? a[e] : null, c = s.length ? s[s.length - 1] : null, f = c ? c.breakAfter : O;
        if (!(e == i && h && !O && !f && s.length < 2 && h.merge(t, r, s.length ? c : null, t == 0, o, l))) {
            if (i < a.length) {
                let d = a[i];
                d && r < d.length ? (e == i && (d = d.split(r), r = 0), !f && c && d.merge(0, r, c, !0, 0, l) ? s[s.length - 1] = d : (r && d.merge(0, r, null, !1, 0, l), s.push(d))) : (d == null ? void 0 : d.breakAfter) && (c ? c.breakAfter = 1 : O = 1), i++
            }
            for (h && (h.breakAfter = O, t > 0 && (!O && s.length && h.merge(t, h.length, s[0], !1, o, 0) ? h.breakAfter = s.shift().breakAfter : (t < h.length || h.children.length && h.children[h.children.length - 1].length == 0) && h.merge(t, h.length, null, !1, o, 0), e++)); e < i && s.length;)
                if (a[i - 1].become(s[s.length - 1])) i--, s.pop(), l = s.length ? 0 : o;
                else if (a[e].become(s[0])) e++, s.shift(), o = s.length ? 0 : l;
            else break;
            !s.length && e && i < a.length && !a[e - 1].breakAfter && a[i].merge(0, 0, a[e - 1], !1, o, l) && e--, (e < i || s.length) && n.replaceChildren(e, i, s)
        }
    }

    function DO(n, e, t, i, r, s) {
        let O = n.childCursor(),
            {
                i: o,
                off: l
            } = O.findPos(t, 1),
            {
                i: a,
                off: h
            } = O.findPos(e, -1),
            c = e - t;
        for (let f of i) c += f.length;
        n.length += c, EO(n, a, h, o, l, i, 0, r, s)
    }
    var Qe = typeof navigator != "undefined" ? navigator : {
            userAgent: "",
            vendor: "",
            platform: ""
        },
        gr = typeof document != "undefined" ? document : {
            documentElement: {
                style: {}
            }
        },
        Qr = /Edge\/(\d+)/.exec(Qe.userAgent),
        MO = /MSIE \d/.test(Qe.userAgent),
        yr = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Qe.userAgent),
        on = !!(MO || yr || Qr),
        IO = !on && /gecko\/(\d+)/i.test(Qe.userAgent),
        Sr = !on && /Chrome\/(\d+)/.exec(Qe.userAgent),
        BO = "webkitFontSmoothing" in gr.documentElement.style,
        NO = !on && /Apple Computer/.test(Qe.vendor),
        LO = NO && (/Mobile\/\w+/.test(Qe.userAgent) || Qe.maxTouchPoints > 2),
        b = {
            mac: LO || /Mac/.test(Qe.platform),
            windows: /Win/.test(Qe.platform),
            linux: /Linux|X11/.test(Qe.platform),
            ie: on,
            ie_version: MO ? gr.documentMode || 6 : yr ? +yr[1] : Qr ? +Qr[1] : 0,
            gecko: IO,
            gecko_version: IO ? +(/Firefox\/(\d+)/.exec(Qe.userAgent) || [0, 0])[1] : 0,
            chrome: !!Sr,
            chrome_version: Sr ? +Sr[1] : 0,
            ios: LO,
            android: /Android\b/.test(Qe.userAgent),
            webkit: BO,
            safari: NO,
            webkit_version: BO ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
            tabSize: gr.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
        },
        yc = 256,
        it = class extends A {
            constructor(e) {
                super();
                this.text = e
            }
            get length() {
                return this.text.length
            }
            createDOM(e) {
                this.setDOM(e || document.createTextNode(this.text))
            }
            sync(e) {
                this.dom || this.createDOM(), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text)
            }
            reuseDOM(e) {
                e.nodeType == 3 && this.createDOM(e)
            }
            merge(e, t, i) {
                return i && (!(i instanceof it) || this.length - (t - e) + i.length > yc) ? !1 : (this.text = this.text.slice(0, e) + (i ? i.text : "") + this.text.slice(t), this.markDirty(), !0)
            }
            split(e) {
                let t = new it(this.text.slice(e));
                return this.text = this.text.slice(0, e), this.markDirty(), t
            }
            localPosFromDOM(e, t) {
                return e == this.dom ? t : t ? this.text.length : 0
            }
            domAtPos(e) {
                return new Oe(this.dom, e)
            }
            domBoundsAround(e, t, i) {
                return {
                    from: i,
                    to: i + this.length,
                    startDOM: this.dom,
                    endDOM: this.dom.nextSibling
                }
            }
            coordsAt(e, t) {
                return br(this.dom, e, t)
            }
        },
        Ae = class extends A {
            constructor(e, t = [], i = 0) {
                super();
                this.mark = e, this.children = t, this.length = i;
                for (let r of t) r.setParent(this)
            }
            setAttrs(e) {
                if (jO(e), this.mark.class && (e.className = this.mark.class), this.mark.attrs)
                    for (let t in this.mark.attrs) e.setAttribute(t, this.mark.attrs[t]);
                return e
            }
            reuseDOM(e) {
                e.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(e), this.dirty |= 4 | 2)
            }
            sync(e) {
                this.dom ? this.dirty & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(e)
            }
            merge(e, t, i, r, s, O) {
                return i && (!(i instanceof Ae && i.mark.eq(this.mark)) || e && s <= 0 || t < this.length && O <= 0) ? !1 : (DO(this, e, t, i ? i.children : [], s - 1, O - 1), this.markDirty(), !0)
            }
            split(e) {
                let t = [],
                    i = 0,
                    r = -1,
                    s = 0;
                for (let o of this.children) {
                    let l = i + o.length;
                    l > e && t.push(i < e ? o.split(e - i) : o), r < 0 && i >= e && (r = s), i = l, s++
                }
                let O = this.length - e;
                return this.length = e, r > -1 && (this.children.length = r, this.markDirty()), new Ae(this.mark, t, O)
            }
            domAtPos(e) {
                return FO(this, e)
            }
            coordsAt(e, t) {
                return HO(this, e, t)
            }
        };

    function br(n, e, t) {
        let i = n.nodeValue.length;
        e > i && (e = i);
        let r = e,
            s = e,
            O = 0;
        e == 0 && t < 0 || e == i && t >= 0 ? b.chrome || b.gecko || (e ? (r--, O = 1) : s < i && (s++, O = -1)) : t < 0 ? r-- : s < i && s++;
        let o = Kt(n, r, s).getClientRects();
        if (!o.length) return UO;
        let l = o[(O ? O < 0 : t >= 0) ? 0 : o.length - 1];
        return b.safari && !O && l.width == 0 && (l = Array.prototype.find.call(o, a => a.width) || l), O ? pr(l, O < 0) : l || null
    }
    var nt = class extends A {
            constructor(e, t, i) {
                super();
                this.widget = e, this.length = t, this.side = i, this.prevWidget = null
            }
            static create(e, t, i) {
                return new(e.customView || nt)(e, t, i)
            }
            split(e) {
                let t = nt.create(this.widget, this.length - e, this.side);
                return this.length -= e, t
            }
            sync() {
                (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false")
            }
            getSide() {
                return this.side
            }
            merge(e, t, i, r, s, O) {
                return i && (!(i instanceof nt) || !this.widget.compare(i.widget) || e > 0 && s <= 0 || t < this.length && O <= 0) ? !1 : (this.length = e + (i ? i.length : 0) + (this.length - t), !0)
            }
            become(e) {
                return e.length == this.length && e instanceof nt && e.side == this.side && this.widget.constructor == e.widget.constructor ? (this.widget.eq(e.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, !0) : !1
            }
            ignoreMutation() {
                return !0
            }
            ignoreEvent(e) {
                return this.widget.ignoreEvent(e)
            }
            get overrideDOMText() {
                if (this.length == 0) return z.empty;
                let e = this;
                for (; e.parent;) e = e.parent;
                let t = e.editorView,
                    i = t && t.state.doc,
                    r = this.posAtStart;
                return i ? i.slice(r, r + this.length) : z.empty
            }
            domAtPos(e) {
                return e == 0 ? Oe.before(this.dom) : Oe.after(this.dom, e == this.length)
            }
            domBoundsAround() {
                return null
            }
            coordsAt(e, t) {
                let i = this.dom.getClientRects(),
                    r = null;
                if (!i.length) return UO;
                for (let s = e > 0 ? i.length - 1 : 0; r = i[s], !(e > 0 ? s == 0 : s == i.length - 1 || r.top < r.bottom); s += e > 0 ? -1 : 1);
                return this.length ? r : pr(r, this.side > 0)
            }
            get isEditable() {
                return !1
            }
            destroy() {
                super.destroy(), this.dom && this.widget.destroy(this.dom)
            }
        },
        Pr = class extends nt {
            domAtPos(e) {
                let {
                    topView: t,
                    text: i
                } = this.widget;
                return t ? xr(e, 0, t, i, (r, s) => r.domAtPos(s), r => new Oe(i, Math.min(r, i.nodeValue.length))) : new Oe(i, Math.min(e, i.nodeValue.length))
            }
            sync() {
                this.setDOM(this.widget.toDOM())
            }
            localPosFromDOM(e, t) {
                let {
                    topView: i,
                    text: r
                } = this.widget;
                return i ? KO(e, t, i, r) : Math.min(t, this.length)
            }
            ignoreMutation() {
                return !1
            }
            get overrideDOMText() {
                return null
            }
            coordsAt(e, t) {
                let {
                    topView: i,
                    text: r
                } = this.widget;
                return i ? xr(e, t, i, r, (s, O, o) => s.coordsAt(O, o), (s, O) => br(r, s, O)) : br(r, e, t)
            }
            destroy() {
                var e;
                super.destroy(), (e = this.widget.topView) === null || e === void 0 || e.destroy()
            }
            get isEditable() {
                return !0
            }
            canReuseDOM() {
                return !0
            }
        };

    function xr(n, e, t, i, r, s) {
        if (t instanceof Ae) {
            for (let O = t.dom.firstChild; O; O = O.nextSibling) {
                let o = A.get(O);
                if (!o) return s(n, e);
                let l = Ht(O, i),
                    a = o.length + (l ? i.nodeValue.length : 0);
                if (n < a || n == a && o.getSide() <= 0) return l ? xr(n, e, o, i, r, s) : r(o, n, e);
                n -= a
            }
            return r(t, t.length, -1)
        } else return t.dom == i ? s(n, e) : r(t, n, e)
    }

    function KO(n, e, t, i) {
        if (t instanceof Ae)
            for (let r of t.children) {
                let s = 0,
                    O = Ht(r.dom, i);
                if (Ht(r.dom, n)) return s + (O ? KO(n, e, r, i) : r.localPosFromDOM(n, e));
                s += O ? i.nodeValue.length : r.length
            } else if (t.dom == i) return Math.min(e, i.nodeValue.length);
        return t.localPosFromDOM(n, e)
    }
    var Xt = class extends A {
        constructor(e) {
            super();
            this.side = e
        }
        get length() {
            return 0
        }
        merge() {
            return !1
        }
        become(e) {
            return e instanceof Xt && e.side == this.side
        }
        split() {
            return new Xt(this.side)
        }
        sync() {
            if (!this.dom) {
                let e = document.createElement("img");
                e.className = "cm-widgetBuffer", e.setAttribute("aria-hidden", "true"), this.setDOM(e)
            }
        }
        getSide() {
            return this.side
        }
        domAtPos(e) {
            return Oe.before(this.dom)
        }
        localPosFromDOM() {
            return 0
        }
        domBoundsAround() {
            return null
        }
        coordsAt(e) {
            let t = this.dom.getBoundingClientRect(),
                i = Sc(this, this.side > 0 ? -1 : 1);
            return i && i.top < t.bottom && i.bottom > t.top ? {
                left: t.left,
                right: t.right,
                top: i.top,
                bottom: i.bottom
            } : t
        }
        get overrideDOMText() {
            return z.empty
        }
    };
    it.prototype.children = nt.prototype.children = Xt.prototype.children = mr;

    function Sc(n, e) {
        let t = n.parent,
            i = t ? t.children.indexOf(n) : -1;
        for (; t && i >= 0;)
            if (e < 0 ? i > 0 : i < t.children.length) {
                let r = t.children[i + e];
                if (r instanceof it) {
                    let s = r.coordsAt(e < 0 ? r.length : 0, e);
                    if (s) return s
                }
                i += e
            } else if (t instanceof Ae && t.parent) i = t.parent.children.indexOf(t) + (e < 0 ? 0 : 1), t = t.parent;
        else {
            let r = t.dom.lastChild;
            if (r && r.nodeName == "BR") return r.getClientRects()[0];
            break
        }
    }

    function FO(n, e) {
        let t = n.dom,
            {
                children: i
            } = n,
            r = 0;
        for (let s = 0; r < i.length; r++) {
            let O = i[r],
                o = s + O.length;
            if (!(o == s && O.getSide() <= 0)) {
                if (e > s && e < o && O.dom.parentNode == t) return O.domAtPos(e - s);
                if (e <= s) break;
                s = o
            }
        }
        for (let s = r; s > 0; s--) {
            let O = i[s - 1];
            if (O.dom.parentNode == t) return O.domAtPos(O.length)
        }
        for (let s = r; s < i.length; s++) {
            let O = i[s];
            if (O.dom.parentNode == t) return O.domAtPos(0)
        }
        return new Oe(t, 0)
    }

    function JO(n, e, t) {
        let i, {
            children: r
        } = n;
        t > 0 && e instanceof Ae && r.length && (i = r[r.length - 1]) instanceof Ae && i.mark.eq(e.mark) ? JO(i, e.children[0], t - 1) : (r.push(e), e.setParent(n)), n.length += e.length
    }

    function HO(n, e, t) {
        let i = null,
            r = -1,
            s = null,
            O = -1;

        function o(a, h) {
            for (let c = 0, f = 0; c < a.children.length && f <= h; c++) {
                let d = a.children[c],
                    p = f + d.length;
                p >= h && (d.children.length ? o(d, h - f) : !s && (p > h || f == p && d.getSide() > 0) ? (s = d, O = h - f) : (f < h || f == p && d.getSide() < 0) && (i = d, r = h - f)), f = p
            }
        }
        o(n, e);
        let l = (t < 0 ? i : s) || i || s;
        return l ? l.coordsAt(Math.max(0, l == i ? r : O), t) : bc(n)
    }

    function bc(n) {
        let e = n.dom.lastChild;
        if (!e) return n.dom.getBoundingClientRect();
        let t = mi(e);
        return t[t.length - 1] || null
    }

    function Tr(n, e) {
        for (let t in n) t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
        return e
    }

    function kr(n, e) {
        if (n == e) return !0;
        if (!n || !e) return !1;
        let t = Object.keys(n),
            i = Object.keys(e);
        if (t.length != i.length) return !1;
        for (let r of t)
            if (i.indexOf(r) == -1 || n[r] !== e[r]) return !1;
        return !0
    }

    function vr(n, e, t) {
        let i = null;
        if (e)
            for (let r in e) t && r in t || n.removeAttribute(i = r);
        if (t)
            for (let r in t) e && e[r] == t[r] || n.setAttribute(i = r, t[r]);
        return !!i
    }
    var dt = class {
            eq(e) {
                return !1
            }
            updateDOM(e) {
                return !1
            }
            compare(e) {
                return this == e || this.constructor == e.constructor && this.eq(e)
            }
            get estimatedHeight() {
                return -1
            }
            ignoreEvent(e) {
                return !0
            }
            get customView() {
                return null
            }
            destroy(e) {}
        },
        N = function(n) {
            return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n
        }(N || (N = {})),
        Y = class extends Ne {
            constructor(e, t, i, r) {
                super();
                this.startSide = e, this.endSide = t, this.widget = i, this.spec = r
            }
            get heightRelevant() {
                return !1
            }
            static mark(e) {
                return new gi(e)
            }
            static widget(e) {
                let t = e.side || 0,
                    i = !!e.block;
                return t += i ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new pt(e, t, t, i, e.widget || null, !1)
            }
            static replace(e) {
                let t = !!e.block,
                    i, r;
                if (e.isBlockGap) i = -5e8, r = 4e8;
                else {
                    let {
                        start: s,
                        end: O
                    } = eo(e, t);
                    i = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (O ? t ? 2e8 : 1 : -6e8) + 1
                }
                return new pt(e, i, r, t, e.widget || null, !0)
            }
            static line(e) {
                return new ti(e)
            }
            static set(e, t = !1) {
                return U.of(e, t)
            }
            hasHeight() {
                return this.widget ? this.widget.estimatedHeight > -1 : !1
            }
        };
    Y.none = U.empty;
    var gi = class extends Y {
        constructor(e) {
            let {
                start: t,
                end: i
            } = eo(e);
            super(t ? -1 : 5e8, i ? 1 : -6e8, null, e);
            this.tagName = e.tagName || "span", this.class = e.class || "", this.attrs = e.attributes || null
        }
        eq(e) {
            return this == e || e instanceof gi && this.tagName == e.tagName && this.class == e.class && kr(this.attrs, e.attrs)
        }
        range(e, t = e) {
            if (e >= t) throw new RangeError("Mark decorations may not be empty");
            return super.range(e, t)
        }
    };
    gi.prototype.point = !1;
    var ti = class extends Y {
        constructor(e) {
            super(-2e8, -2e8, null, e)
        }
        eq(e) {
            return e instanceof ti && kr(this.spec.attributes, e.spec.attributes)
        }
        range(e, t = e) {
            if (t != e) throw new RangeError("Line decoration ranges must be zero-length");
            return super.range(e, t)
        }
    };
    ti.prototype.mapMode = re.TrackBefore;
    ti.prototype.point = !0;
    var pt = class extends Y {
        constructor(e, t, i, r, s, O) {
            super(t, i, s, e);
            this.block = r, this.isReplace = O, this.mapMode = r ? t <= 0 ? re.TrackBefore : re.TrackAfter : re.TrackDel
        }
        get type() {
            return this.startSide < this.endSide ? N.WidgetRange : this.startSide <= 0 ? N.WidgetBefore : N.WidgetAfter
        }
        get heightRelevant() {
            return this.block || !!this.widget && this.widget.estimatedHeight >= 5
        }
        eq(e) {
            return e instanceof pt && Pc(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide
        }
        range(e, t = e) {
            if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw new RangeError("Invalid range for replacement decoration");
            if (!this.isReplace && t != e) throw new RangeError("Widget decorations can only have zero-length ranges");
            return super.range(e, t)
        }
    };
    pt.prototype.point = !0;

    function eo(n, e = !1) {
        let {
            inclusiveStart: t,
            inclusiveEnd: i
        } = n;
        return t == null && (t = n.inclusive), i == null && (i = n.inclusive), {
            start: t ? ? e,
            end: i ? ? e
        }
    }

    function Pc(n, e) {
        return n == e || !!(n && e && n.compare(e))
    }

    function wr(n, e, t, i = 0) {
        let r = t.length - 1;
        r >= 0 && t[r] + i >= n ? t[r] = Math.max(t[r], e) : t.push(n, e)
    }
    var le = class extends A {
            constructor() {
                super(...arguments);
                this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0
            }
            merge(e, t, i, r, s, O) {
                if (i) {
                    if (!(i instanceof le)) return !1;
                    this.dom || i.transferDOM(this)
                }
                return r && this.setDeco(i ? i.attrs : null), DO(this, e, t, i ? i.children : [], s, O), !0
            }
            split(e) {
                let t = new le;
                if (t.breakAfter = this.breakAfter, this.length == 0) return t;
                let {
                    i,
                    off: r
                } = this.childPos(e);
                r && (t.append(this.children[i].split(r), 0), this.children[i].merge(r, this.children[i].length, null, !1, 0, 0), i++);
                for (let s = i; s < this.children.length; s++) t.append(this.children[s], 0);
                for (; i > 0 && this.children[i - 1].length == 0;) this.children[--i].destroy();
                return this.children.length = i, this.markDirty(), this.length = e, t
            }
            transferDOM(e) {
                !this.dom || (this.markDirty(), e.setDOM(this.dom), e.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null)
            }
            setDeco(e) {
                kr(this.attrs, e) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = e)
            }
            append(e, t) {
                JO(this, e, t)
            }
            addLineDeco(e) {
                let t = e.spec.attributes,
                    i = e.spec.class;
                t && (this.attrs = Tr(t, this.attrs || {})), i && (this.attrs = Tr({
                    class: i
                }, this.attrs || {}))
            }
            domAtPos(e) {
                return FO(this, e)
            }
            reuseDOM(e) {
                e.nodeName == "DIV" && (this.setDOM(e), this.dirty |= 4 | 2)
            }
            sync(e) {
                var t;
                this.dom ? this.dirty & 4 && (jO(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (vr(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(e);
                let i = this.dom.lastChild;
                for (; i && A.get(i) instanceof Ae;) i = i.lastChild;
                if (!i || !this.length || i.nodeName != "BR" && ((t = A.get(i)) === null || t === void 0 ? void 0 : t.isEditable) == !1 && (!b.ios || !this.children.some(r => r instanceof it))) {
                    let r = document.createElement("BR");
                    r.cmIgnore = !0, this.dom.appendChild(r)
                }
            }
            measureTextSize() {
                if (this.children.length == 0 || this.length > 20) return null;
                let e = 0;
                for (let t of this.children) {
                    if (!(t instanceof it) || /[^ -~]/.test(t.text)) return null;
                    let i = mi(t.dom);
                    if (i.length != 1) return null;
                    e += i[0].width
                }
                return e ? {
                    lineHeight: this.dom.getBoundingClientRect().height,
                    charWidth: e / this.length
                } : null
            }
            coordsAt(e, t) {
                return HO(this, e, t)
            }
            become(e) {
                return !1
            }
            get type() {
                return N.Text
            }
            static find(e, t) {
                for (let i = 0, r = 0; i < e.children.length; i++) {
                    let s = e.children[i],
                        O = r + s.length;
                    if (O >= t) {
                        if (s instanceof le) return s;
                        if (O > t) break
                    }
                    r = O + s.breakAfter
                }
                return null
            }
        },
        mt = class extends A {
            constructor(e, t, i) {
                super();
                this.widget = e, this.length = t, this.type = i, this.breakAfter = 0, this.prevWidget = null
            }
            merge(e, t, i, r, s, O) {
                return i && (!(i instanceof mt) || !this.widget.compare(i.widget) || e > 0 && s <= 0 || t < this.length && O <= 0) ? !1 : (this.length = e + (i ? i.length : 0) + (this.length - t), !0)
            }
            domAtPos(e) {
                return e == 0 ? Oe.before(this.dom) : Oe.after(this.dom, e == this.length)
            }
            split(e) {
                let t = this.length - e;
                this.length = e;
                let i = new mt(this.widget, t, this.type);
                return i.breakAfter = this.breakAfter, i
            }
            get children() {
                return mr
            }
            sync() {
                (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false")
            }
            get overrideDOMText() {
                return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : z.empty
            }
            domBoundsAround() {
                return null
            }
            become(e) {
                return e instanceof mt && e.type == this.type && e.widget.constructor == this.widget.constructor ? (e.widget.eq(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, this.breakAfter = e.breakAfter, !0) : !1
            }
            ignoreMutation() {
                return !0
            }
            ignoreEvent(e) {
                return this.widget.ignoreEvent(e)
            }
            destroy() {
                super.destroy(), this.dom && this.widget.destroy(this.dom)
            }
        },
        ln = class {
            constructor(e, t, i, r) {
                this.doc = e, this.pos = t, this.end = i, this.disallowBlockEffectsFor = r, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = e.iter(), this.skip = t
            }
            posCovered() {
                if (this.content.length == 0) return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
                let e = this.content[this.content.length - 1];
                return !e.breakAfter && !(e instanceof mt && e.type == N.WidgetBefore)
            }
            getLine() {
                return this.curLine || (this.content.push(this.curLine = new le), this.atCursorPos = !0), this.curLine
            }
            flushBuffer(e) {
                this.pendingBuffer && (this.curLine.append(an(new Xt(-1), e), e.length), this.pendingBuffer = 0)
            }
            addBlockWidget(e) {
                this.flushBuffer([]), this.curLine = null, this.content.push(e)
            }
            finish(e) {
                e ? this.pendingBuffer = 0 : this.flushBuffer([]), this.posCovered() || this.getLine()
            }
            buildText(e, t, i) {
                for (; e > 0;) {
                    if (this.textOff == this.text.length) {
                        let {
                            value: s,
                            lineBreak: O,
                            done: o
                        } = this.cursor.next(this.skip);
                        if (this.skip = 0, o) throw new Error("Ran out of text content when drawing inline views");
                        if (O) {
                            this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer([]), this.curLine = null, e--;
                            continue
                        } else this.text = s, this.textOff = 0
                    }
                    let r = Math.min(this.text.length - this.textOff, e, 512);
                    this.flushBuffer(t.slice(t.length - i)), this.getLine().append(an(new it(this.text.slice(this.textOff, this.textOff + r)), t), i), this.atCursorPos = !0, this.textOff += r, e -= r, i = 0
                }
            }
            span(e, t, i, r) {
                this.buildText(t - e, i, r), this.pos = t, this.openStart < 0 && (this.openStart = r)
            }
            point(e, t, i, r, s, O) {
                if (this.disallowBlockEffectsFor[O] && i instanceof pt) {
                    if (i.block) throw new RangeError("Block decorations may not be specified via plugins");
                    if (t > this.doc.lineAt(this.pos).to) throw new RangeError("Decorations that replace line breaks may not be specified via plugins")
                }
                let o = t - e;
                if (i instanceof pt)
                    if (i.block) {
                        let {
                            type: l
                        } = i;
                        l == N.WidgetAfter && !this.posCovered() && this.getLine(), this.addBlockWidget(new mt(i.widget || new Xr("div"), o, l))
                    } else {
                        let l = nt.create(i.widget || new Xr("span"), o, o ? 0 : i.startSide),
                            a = this.atCursorPos && !l.isEditable && s <= r.length && (e < t || i.startSide > 0),
                            h = !l.isEditable && (e < t || i.startSide <= 0),
                            c = this.getLine();
                        this.pendingBuffer == 2 && !a && (this.pendingBuffer = 0), this.flushBuffer(r), a && (c.append(an(new Xt(1), r), s), s = r.length + Math.max(0, s - r.length)), c.append(an(l, r), s), this.atCursorPos = h, this.pendingBuffer = h ? e < t ? 1 : 2 : 0
                    }
                else this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
                o && (this.textOff + o <= this.text.length ? this.textOff += o : (this.skip += o - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = t), this.openStart < 0 && (this.openStart = s)
            }
            static build(e, t, i, r, s) {
                let O = new ln(e, t, i, s);
                return O.openEnd = U.spans(r, t, i, O), O.openStart < 0 && (O.openStart = O.openEnd), O.finish(O.openEnd), O
            }
        };

    function an(n, e) {
        for (let t of e) n = new Ae(t, [n], n.length);
        return n
    }
    var Xr = class extends dt {
            constructor(e) {
                super();
                this.tag = e
            }
            eq(e) {
                return e.tag == this.tag
            }
            toDOM() {
                return document.createElement(this.tag)
            }
            updateDOM(e) {
                return e.nodeName.toLowerCase() == this.tag
            }
        },
        to = T.define(),
        io = T.define(),
        no = T.define(),
        ro = T.define(),
        Rr = T.define(),
        so = T.define(),
        Oo = T.define({
            combine: n => n.some(e => e)
        }),
        xc = T.define({
            combine: n => n.some(e => e)
        }),
        Qi = class {
            constructor(e, t = "nearest", i = "nearest", r = 5, s = 5) {
                this.range = e, this.y = t, this.x = i, this.yMargin = r, this.xMargin = s
            }
            map(e) {
                return e.empty ? this : new Qi(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin)
            }
        },
        oo = Z.define({
            map: (n, e) => n.map(e)
        });

    function ye(n, e, t) {
        let i = n.facet(ro);
        i.length ? i[0](e) : window.onerror ? window.onerror(String(e), t, void 0, void 0, e) : t ? console.error(t + ":", e) : console.error(e)
    }
    var hn = T.define({
            combine: n => n.length ? n[0] : !0
        }),
        Tc = 0,
        yi = T.define(),
        ve = class {
            constructor(e, t, i, r) {
                this.id = e, this.create = t, this.domEventHandlers = i, this.extension = r(this)
            }
            static define(e, t) {
                let {
                    eventHandlers: i,
                    provide: r,
                    decorations: s
                } = t || {};
                return new ve(Tc++, e, i, O => {
                    let o = [yi.of(O)];
                    return s && o.push(Si.of(l => {
                        let a = l.plugin(O);
                        return a ? s(a) : Y.none
                    })), r && o.push(r(O)), o
                })
            }
            static fromClass(e, t) {
                return ve.define(i => new e(i), t)
            }
        },
        cn = class {
            constructor(e) {
                this.spec = e, this.mustUpdate = null, this.value = null
            }
            update(e) {
                if (this.value) {
                    if (this.mustUpdate) {
                        let t = this.mustUpdate;
                        if (this.mustUpdate = null, this.value.update) try {
                            this.value.update(t)
                        } catch (i) {
                            if (ye(t.state, i, "CodeMirror plugin crashed"), this.value.destroy) try {
                                this.value.destroy()
                            } catch (r) {}
                            this.deactivate()
                        }
                    }
                } else if (this.spec) try {
                    this.value = this.spec.create(e)
                } catch (t) {
                    ye(e.state, t, "CodeMirror plugin crashed"), this.deactivate()
                }
                return this
            }
            destroy(e) {
                var t;
                if ((t = this.value) === null || t === void 0 ? void 0 : t.destroy) try {
                    this.value.destroy()
                } catch (i) {
                    ye(e.state, i, "CodeMirror plugin crashed")
                }
            }
            deactivate() {
                this.spec = this.value = null
            }
        },
        lo = T.define(),
        zr = T.define(),
        Si = T.define(),
        ao = T.define(),
        ho = T.define(),
        bi = T.define(),
        Ye = class {
            constructor(e, t, i, r) {
                this.fromA = e, this.toA = t, this.fromB = i, this.toB = r
            }
            join(e) {
                return new Ye(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB))
            }
            addToSet(e) {
                let t = e.length,
                    i = this;
                for (; t > 0; t--) {
                    let r = e[t - 1];
                    if (!(r.fromA > i.toA)) {
                        if (r.toA < i.fromA) break;
                        i = i.join(r), e.splice(t - 1, 1)
                    }
                }
                return e.splice(t, 0, i), e
            }
            static extendWithRanges(e, t) {
                if (t.length == 0) return e;
                let i = [];
                for (let r = 0, s = 0, O = 0, o = 0;; r++) {
                    let l = r == e.length ? null : e[r],
                        a = O - o,
                        h = l ? l.fromB : 1e9;
                    for (; s < t.length && t[s] < h;) {
                        let c = t[s],
                            f = t[s + 1],
                            d = Math.max(o, c),
                            p = Math.min(h, f);
                        if (d <= p && new Ye(d + a, p + a, d, p).addToSet(i), f > h) break;
                        s += 2
                    }
                    if (!l) return i;
                    new Ye(l.fromA, l.toA, l.fromB, l.toB).addToSet(i), O = l.toA, o = l.toB
                }
            }
        },
        Pi = class {
            constructor(e, t, i) {
                this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = B.empty(this.startState.doc.length);
                for (let O of i) this.changes = this.changes.compose(O.changes);
                let r = [];
                this.changes.iterChangedRanges((O, o, l, a) => r.push(new Ye(O, o, l, a))), this.changedRanges = r;
                let s = e.hasFocus;
                s != e.inputState.notifiedFocused && (e.inputState.notifiedFocused = s, this.flags |= 1)
            }
            static create(e, t, i) {
                return new Pi(e, t, i)
            }
            get viewportChanged() {
                return (this.flags & 4) > 0
            }
            get heightChanged() {
                return (this.flags & 2) > 0
            }
            get geometryChanged() {
                return this.docChanged || (this.flags & (8 | 2)) > 0
            }
            get focusChanged() {
                return (this.flags & 1) > 0
            }
            get docChanged() {
                return !this.changes.empty
            }
            get selectionSet() {
                return this.transactions.some(e => e.selection)
            }
            get empty() {
                return this.flags == 0 && this.transactions.length == 0
            }
        },
        H = function(n) {
            return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n
        }(H || (H = {})),
        Wr = H.LTR,
        kc = H.RTL;

    function co(n) {
        let e = [];
        for (let t = 0; t < n.length; t++) e.push(1 << +n[t]);
        return e
    }
    var vc = co("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),
        wc = co("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),
        qr = Object.create(null),
        Le = [];
    for (let n of ["()", "[]", "{}"]) {
        let e = n.charCodeAt(0),
            t = n.charCodeAt(1);
        qr[e] = t, qr[t] = -e
    }

    function Xc(n) {
        return n <= 247 ? vc[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? wc[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8203 ? 256 : 64336 <= n && n <= 65023 ? 4 : n == 8204 ? 256 : 1
    }
    var Rc = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/,
        Rt = class {
            constructor(e, t, i) {
                this.from = e, this.to = t, this.level = i
            }
            get dir() {
                return this.level % 2 ? kc : Wr
            }
            side(e, t) {
                return this.dir == t == e ? this.to : this.from
            }
            static find(e, t, i, r) {
                let s = -1;
                for (let O = 0; O < e.length; O++) {
                    let o = e[O];
                    if (o.from <= t && o.to >= t) {
                        if (o.level == i) return O;
                        (s < 0 || (r != 0 ? r < 0 ? o.from < t : o.to > t : e[s].level > o.level)) && (s = O)
                    }
                }
                if (s < 0) throw new RangeError("Index out of range");
                return s
            }
        },
        D = [];

    function zc(n, e) {
        let t = n.length,
            i = e == Wr ? 1 : 2,
            r = e == Wr ? 2 : 1;
        if (!n || i == 1 && !Rc.test(n)) return uo(t);
        for (let O = 0, o = i, l = i; O < t; O++) {
            let a = Xc(n.charCodeAt(O));
            a == 512 ? a = o : a == 8 && l == 4 && (a = 16), D[O] = a == 4 ? 2 : a, a & 7 && (l = a), o = a
        }
        for (let O = 0, o = i, l = i; O < t; O++) {
            let a = D[O];
            if (a == 128) O < t - 1 && o == D[O + 1] && o & 24 ? a = D[O] = o : D[O] = 256;
            else if (a == 64) {
                let h = O + 1;
                for (; h < t && D[h] == 64;) h++;
                let c = O && o == 8 || h < t && D[h] == 8 ? l == 1 ? 1 : 8 : 256;
                for (let f = O; f < h; f++) D[f] = c;
                O = h - 1
            } else a == 8 && l == 1 && (D[O] = 1);
            o = a, a & 7 && (l = a)
        }
        for (let O = 0, o = 0, l = 0, a, h, c; O < t; O++)
            if (h = qr[a = n.charCodeAt(O)])
                if (h < 0) {
                    for (let f = o - 3; f >= 0; f -= 3)
                        if (Le[f + 1] == -h) {
                            let d = Le[f + 2],
                                p = d & 2 ? i : d & 4 ? d & 1 ? r : i : 0;
                            p && (D[O] = D[Le[f]] = p), o = f;
                            break
                        }
                } else {
                    if (Le.length == 189) break;
                    Le[o++] = O, Le[o++] = a, Le[o++] = l
                }
        else if ((c = D[O]) == 2 || c == 1) {
            let f = c == i;
            l = f ? 0 : 1;
            for (let d = o - 3; d >= 0; d -= 3) {
                let p = Le[d + 2];
                if (p & 2) break;
                if (f) Le[d + 2] |= 2;
                else {
                    if (p & 4) break;
                    Le[d + 2] |= 4
                }
            }
        }
        for (let O = 0; O < t; O++)
            if (D[O] == 256) {
                let o = O + 1;
                for (; o < t && D[o] == 256;) o++;
                let l = (O ? D[O - 1] : i) == 1,
                    a = (o < t ? D[o] : i) == 1,
                    h = l == a ? l ? 1 : 2 : i;
                for (let c = O; c < o; c++) D[c] = h;
                O = o - 1
            }
        let s = [];
        if (i == 1)
            for (let O = 0; O < t;) {
                let o = O,
                    l = D[O++] != 1;
                for (; O < t && l == (D[O] != 1);) O++;
                if (l)
                    for (let a = O; a > o;) {
                        let h = a,
                            c = D[--a] != 2;
                        for (; a > o && c == (D[a - 1] != 2);) a--;
                        s.push(new Rt(a, h, c ? 2 : 1))
                    } else s.push(new Rt(o, O, 0))
            } else
                for (let O = 0; O < t;) {
                    let o = O,
                        l = D[O++] == 2;
                    for (; O < t && l == (D[O] == 2);) O++;
                    s.push(new Rt(o, O, l ? 1 : 2))
                }
        return s
    }

    function uo(n) {
        return [new Rt(0, n, 0)]
    }
    var fo = "";

    function Wc(n, e, t, i, r) {
        var s;
        let O = i.head - n.from,
            o = -1;
        if (O == 0) {
            if (!r || !n.length) return null;
            e[0].level != t && (O = e[0].side(!1, t), o = 0)
        } else if (O == n.length) {
            if (r) return null;
            let f = e[e.length - 1];
            f.level != t && (O = f.side(!0, t), o = e.length - 1)
        }
        o < 0 && (o = Rt.find(e, O, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc));
        let l = e[o];
        O == l.side(r, t) && (l = e[o += r ? 1 : -1], O = l.side(!r, t));
        let a = r == (l.dir == t),
            h = Ve(n.text, O, a);
        if (fo = n.text.slice(Math.min(O, h), Math.max(O, h)), h != l.side(r, t)) return y.cursor(h + n.from, a ? -1 : 1, l.level);
        let c = o == (r ? e.length - 1 : 0) ? null : e[o + (r ? 1 : -1)];
        return !c && l.level != t ? y.cursor(r ? n.to : n.from, r ? -1 : 1, t) : c && c.level < l.level ? y.cursor(c.side(!r, t) + n.from, r ? 1 : -1, c.level) : y.cursor(h + n.from, r ? -1 : 1, l.level)
    }
    var $t = "\uFFFF",
        Zr = class {
            constructor(e, t) {
                this.points = e, this.text = "", this.lineSeparator = t.facet(_.lineSeparator)
            }
            append(e) {
                this.text += e
            }
            lineBreak() {
                this.text += $t
            }
            readRange(e, t) {
                if (!e) return this;
                let i = e.parentNode;
                for (let r = e;;) {
                    this.findPointBefore(i, r), this.readNode(r);
                    let s = r.nextSibling;
                    if (s == t) break;
                    let O = A.get(r),
                        o = A.get(s);
                    (O && o ? O.breakAfter : (O ? O.breakAfter : po(r)) || po(s) && (r.nodeName != "BR" || r.cmIgnore)) && this.lineBreak(), r = s
                }
                return this.findPointBefore(i, t), this
            }
            readTextNode(e) {
                let t = e.nodeValue;
                for (let i of this.points) i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
                for (let i = 0, r = this.lineSeparator ? null : /\r\n?|\n/g;;) {
                    let s = -1,
                        O = 1,
                        o;
                    if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, i), O = this.lineSeparator.length) : (o = r.exec(t)) && (s = o.index, O = o[0].length), this.append(t.slice(i, s < 0 ? t.length : s)), s < 0) break;
                    if (this.lineBreak(), O > 1)
                        for (let l of this.points) l.node == e && l.pos > this.text.length && (l.pos -= O - 1);
                    i = s + O
                }
            }
            readNode(e) {
                if (e.cmIgnore) return;
                let t = A.get(e),
                    i = t && t.overrideDOMText;
                if (i != null) {
                    this.findPointInside(e, i.length);
                    for (let r = i.iter(); !r.next().done;) r.lineBreak ? this.lineBreak() : this.append(r.value)
                } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null)
            }
            findPointBefore(e, t) {
                for (let i of this.points) i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length)
            }
            findPointInside(e, t) {
                for (let i of this.points)(e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + Math.min(t, i.offset))
            }
        };

    function po(n) {
        return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName)
    }
    var _r = class {
            constructor(e, t) {
                this.node = e, this.offset = t, this.pos = -1
            }
        },
        Vr = class extends A {
            constructor(e) {
                super();
                this.view = e, this.compositionDeco = Y.none, this.decorations = [], this.dynamicDecorationMap = [], this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(e.contentDOM), this.children = [new le], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new Ye(0, 0, 0, e.state.doc.length)], 0)
            }
            get editorView() {
                return this.view
            }
            get length() {
                return this.view.state.doc.length
            }
            update(e) {
                let t = e.changedRanges;
                this.minWidth > 0 && t.length && (t.every(({
                    fromA: O,
                    toA: o
                }) => o < this.minWidthFrom || O > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.view.inputState.composing < 0 ? this.compositionDeco = Y.none : (e.transactions.length || this.dirty) && (this.compositionDeco = Zc(this.view, e.changes)), (b.ie || b.chrome) && !this.compositionDeco.size && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
                let i = this.decorations,
                    r = this.updateDeco(),
                    s = Vc(i, r, e.changes);
                return t = Ye.extendWithRanges(t, s), this.dirty == 0 && t.length == 0 ? !1 : (this.updateInner(t, e.startState.doc.length), e.transactions.length && (this.lastUpdate = Date.now()), !0)
            }
            updateInner(e, t) {
                this.view.viewState.mustMeasureContent = !0, this.updateChildren(e, t);
                let {
                    observer: i
                } = this.view;
                i.ignore(() => {
                    this.dom.style.height = this.view.viewState.contentHeight + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
                    let s = b.chrome || b.ios ? {
                        node: i.selectionRange.focusNode,
                        written: !1
                    } : void 0;
                    this.sync(s), this.dirty = 0, s && (s.written || i.selectionRange.focusNode != s.node) && (this.forceSelection = !0), this.dom.style.height = ""
                });
                let r = [];
                if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
                    for (let s of this.children) s instanceof mt && s.widget instanceof Ur && r.push(s.dom);
                i.updateGaps(r)
            }
            updateChildren(e, t) {
                let i = this.childCursor(t);
                for (let r = e.length - 1;; r--) {
                    let s = r >= 0 ? e[r] : null;
                    if (!s) break;
                    let {
                        fromA: O,
                        toA: o,
                        fromB: l,
                        toB: a
                    } = s, {
                        content: h,
                        breakAtStart: c,
                        openStart: f,
                        openEnd: d
                    } = ln.build(this.view.state.doc, l, a, this.decorations, this.dynamicDecorationMap), {
                        i: p,
                        off: m
                    } = i.findPos(o, 1), {
                        i: $,
                        off: g
                    } = i.findPos(O, -1);
                    EO(this, $, g, p, m, h, c, f, d)
                }
            }
            updateSelection(e = !1, t = !1) {
                if ((e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange(), !(t || this.mayControlSelection())) return;
                let i = this.forceSelection;
                this.forceSelection = !1;
                let r = this.view.state.selection.main,
                    s = this.domAtPos(r.anchor),
                    O = r.empty ? s : this.domAtPos(r.head);
                if (b.gecko && r.empty && qc(s)) {
                    let l = document.createTextNode("");
                    this.view.observer.ignore(() => s.node.insertBefore(l, s.node.childNodes[s.offset] || null)), s = O = new Oe(l, 0), i = !0
                }
                let o = this.view.observer.selectionRange;
                (i || !o.focusNode || !sn(s.node, s.offset, o.anchorNode, o.anchorOffset) || !sn(O.node, O.offset, o.focusNode, o.focusOffset)) && (this.view.observer.ignore(() => {
                    b.android && b.chrome && this.dom.contains(o.focusNode) && Uc(o.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({
                        preventScroll: !0
                    }));
                    let l = nn(this.view.root);
                    if (l)
                        if (r.empty) {
                            if (b.gecko) {
                                let a = _c(s.node, s.offset);
                                if (a && a != (1 | 2)) {
                                    let h = mo(s.node, s.offset, a == 1 ? 1 : -1);
                                    h && (s = new Oe(h, a == 1 ? 0 : h.nodeValue.length))
                                }
                            }
                            l.collapse(s.node, s.offset), r.bidiLevel != null && o.cursorBidiLevel != null && (o.cursorBidiLevel = r.bidiLevel)
                        } else if (l.extend) {
                        l.collapse(s.node, s.offset);
                        try {
                            l.extend(O.node, O.offset)
                        } catch (a) {}
                    } else {
                        let a = document.createRange();
                        r.anchor > r.head && ([s, O] = [O, s]), a.setEnd(O.node, O.offset), a.setStart(s.node, s.offset), l.removeAllRanges(), l.addRange(a)
                    }
                }), this.view.observer.setSelectionRange(s, O)), this.impreciseAnchor = s.precise ? null : new Oe(o.anchorNode, o.anchorOffset), this.impreciseHead = O.precise ? null : new Oe(o.focusNode, o.focusOffset)
            }
            enforceCursorAssoc() {
                if (this.compositionDeco.size) return;
                let {
                    view: e
                } = this, t = e.state.selection.main, i = nn(e.root), {
                    anchorNode: r,
                    anchorOffset: s
                } = e.observer.selectionRange;
                if (!i || !t.empty || !t.assoc || !i.modify) return;
                let O = le.find(this, t.head);
                if (!O) return;
                let o = O.posAtStart;
                if (t.head == o || t.head == o + O.length) return;
                let l = this.coordsAt(t.head, -1),
                    a = this.coordsAt(t.head, 1);
                if (!l || !a || l.bottom > a.top) return;
                let h = this.domAtPos(t.head + t.assoc);
                i.collapse(h.node, h.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
                let c = e.observer.selectionRange;
                e.docView.posFromDOM(c.anchorNode, c.anchorOffset) != t.from && i.collapse(r, s)
            }
            mayControlSelection() {
                let e = this.view.root.activeElement;
                return e == this.dom || rn(this.dom, this.view.observer.selectionRange) && !(e && this.dom.contains(e))
            }
            nearest(e) {
                for (let t = e; t;) {
                    let i = A.get(t);
                    if (i && i.rootView == this) return i;
                    t = t.parentNode
                }
                return null
            }
            posFromDOM(e, t) {
                let i = this.nearest(e);
                if (!i) throw new RangeError("Trying to find position for a DOM position outside of the document");
                return i.localPosFromDOM(e, t) + i.posAtStart
            }
            domAtPos(e) {
                let {
                    i: t,
                    off: i
                } = this.childCursor().findPos(e, -1);
                for (; t < this.children.length - 1;) {
                    let r = this.children[t];
                    if (i < r.length || r instanceof le) break;
                    t++, i = 0
                }
                return this.children[t].domAtPos(i)
            }
            coordsAt(e, t) {
                for (let i = this.length, r = this.children.length - 1;; r--) {
                    let s = this.children[r],
                        O = i - s.breakAfter - s.length;
                    if (e > O || e == O && s.type != N.WidgetBefore && s.type != N.WidgetAfter && (!r || t == 2 || this.children[r - 1].breakAfter || this.children[r - 1].type == N.WidgetBefore && t > -2)) return s.coordsAt(e - O, t);
                    i = O
                }
            }
            measureVisibleLineHeights(e) {
                let t = [],
                    {
                        from: i,
                        to: r
                    } = e,
                    s = this.view.contentDOM.clientWidth,
                    O = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1,
                    o = -1,
                    l = this.view.textDirection == H.LTR;
                for (let a = 0, h = 0; h < this.children.length; h++) {
                    let c = this.children[h],
                        f = a + c.length;
                    if (f > r) break;
                    if (a >= i) {
                        let d = c.dom.getBoundingClientRect();
                        if (t.push(d.height), O) {
                            let p = c.dom.lastChild,
                                m = p ? mi(p) : [];
                            if (m.length) {
                                let $ = m[m.length - 1],
                                    g = l ? $.right - d.left : d.right - $.left;
                                g > o && (o = g, this.minWidth = s, this.minWidthFrom = a, this.minWidthTo = f)
                            }
                        }
                    }
                    a = f + c.breakAfter
                }
                return t
            }
            textDirectionAt(e) {
                let {
                    i: t
                } = this.childPos(e, 1);
                return getComputedStyle(this.children[t].dom).direction == "rtl" ? H.RTL : H.LTR
            }
            measureTextSize() {
                for (let r of this.children)
                    if (r instanceof le) {
                        let s = r.measureTextSize();
                        if (s) return s
                    }
                let e = document.createElement("div"),
                    t, i;
                return e.className = "cm-line", e.style.width = "99999px", e.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
                    this.dom.appendChild(e);
                    let r = mi(e.firstChild)[0];
                    t = e.getBoundingClientRect().height, i = r ? r.width / 27 : 7, e.remove()
                }), {
                    lineHeight: t,
                    charWidth: i
                }
            }
            childCursor(e = this.length) {
                let t = this.children.length;
                return t && (e -= this.children[--t].length), new $r(this.children, e, t)
            }
            computeBlockGapDeco() {
                let e = [],
                    t = this.view.viewState;
                for (let i = 0, r = 0;; r++) {
                    let s = r == t.viewports.length ? null : t.viewports[r],
                        O = s ? s.from - 1 : this.length;
                    if (O > i) {
                        let o = t.lineBlockAt(O).bottom - t.lineBlockAt(i).top;
                        e.push(Y.replace({
                            widget: new Ur(o),
                            block: !0,
                            inclusive: !0,
                            isBlockGap: !0
                        }).range(i, O))
                    }
                    if (!s) break;
                    i = s.to + 1
                }
                return Y.set(e)
            }
            updateDeco() {
                let e = this.view.state.facet(Si).map((t, i) => (this.dynamicDecorationMap[i] = typeof t == "function") ? t(this.view) : t);
                for (let t = e.length; t < e.length + 3; t++) this.dynamicDecorationMap[t] = !1;
                return this.decorations = [...e, this.compositionDeco, this.computeBlockGapDeco(), this.view.viewState.lineGapDeco]
            }
            scrollIntoView(e) {
                let {
                    range: t
                } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), r;
                if (!i) return;
                !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
                    left: Math.min(i.left, r.left),
                    top: Math.min(i.top, r.top),
                    right: Math.max(i.right, r.right),
                    bottom: Math.max(i.bottom, r.bottom)
                });
                let s = 0,
                    O = 0,
                    o = 0,
                    l = 0;
                for (let h of this.view.state.facet(ho).map(c => c(this.view)))
                    if (h) {
                        let {
                            left: c,
                            right: f,
                            top: d,
                            bottom: p
                        } = h;
                        c != null && (s = Math.max(s, c)), f != null && (O = Math.max(O, f)), d != null && (o = Math.max(o, d)), p != null && (l = Math.max(l, p))
                    }
                let a = {
                    left: i.left - s,
                    top: i.top - o,
                    right: i.right + O,
                    bottom: i.bottom + l
                };
                $c(this.view.scrollDOM, a, t.head < t.anchor ? -1 : 1, e.x, e.y, e.xMargin, e.yMargin, this.view.textDirection == H.LTR)
            }
        };

    function qc(n) {
        return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false")
    }
    var Ur = class extends dt {
        constructor(e) {
            super();
            this.height = e
        }
        toDOM() {
            let e = document.createElement("div");
            return this.updateDOM(e), e
        }
        eq(e) {
            return e.height == this.height
        }
        updateDOM(e) {
            return e.style.height = this.height + "px", !0
        }
        get estimatedHeight() {
            return this.height
        }
    };

    function $o(n) {
        let e = n.observer.selectionRange,
            t = e.focusNode && mo(e.focusNode, e.focusOffset, 0);
        if (!t) return null;
        let i = n.docView.nearest(t);
        if (!i) return null;
        if (i instanceof le) {
            let r = t;
            for (; r.parentNode != i.dom;) r = r.parentNode;
            let s = r.previousSibling;
            for (; s && !A.get(s);) s = s.previousSibling;
            let O = s ? A.get(s).posAtEnd : i.posAtStart;
            return {
                from: O,
                to: O,
                node: r,
                text: t
            }
        } else {
            for (;;) {
                let {
                    parent: s
                } = i;
                if (!s) return null;
                if (s instanceof le) break;
                i = s
            }
            let r = i.posAtStart;
            return {
                from: r,
                to: r + i.length,
                node: i.dom,
                text: t
            }
        }
    }

    function Zc(n, e) {
        let t = $o(n);
        if (!t) return Y.none;
        let {
            from: i,
            to: r,
            node: s,
            text: O
        } = t, o = e.mapPos(i, 1), l = Math.max(o, e.mapPos(r, -1)), {
            state: a
        } = n, h = s.nodeType == 3 ? s.nodeValue : new Zr([], a).readRange(s.firstChild, null).text;
        if (l - o < h.length)
            if (a.doc.sliceString(o, Math.min(a.doc.length, o + h.length), $t) == h) l = o + h.length;
            else if (a.doc.sliceString(Math.max(0, l - h.length), l, $t) == h) o = l - h.length;
        else return Y.none;
        else if (a.doc.sliceString(o, l, $t) != h) return Y.none;
        let c = A.get(s);
        return c instanceof Pr ? c = c.widget.topView : c && (c.parent = null), Y.set(Y.replace({
            widget: new go(s, O, c),
            inclusive: !0
        }).range(o, l))
    }
    var go = class extends dt {
        constructor(e, t, i) {
            super();
            this.top = e, this.text = t, this.topView = i
        }
        eq(e) {
            return this.top == e.top && this.text == e.text
        }
        toDOM() {
            return this.top
        }
        ignoreEvent() {
            return !1
        }
        get customView() {
            return Pr
        }
    };

    function mo(n, e, t) {
        for (;;) {
            if (n.nodeType == 3) return n;
            if (n.nodeType == 1 && e > 0 && t <= 0) n = n.childNodes[e - 1], e = $i(n);
            else if (n.nodeType == 1 && e < n.childNodes.length && t >= 0) n = n.childNodes[e], e = 0;
            else return null
        }
    }

    function _c(n, e) {
        return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0)
    }
    var Qo = class {
        constructor() {
            this.changes = []
        }
        compareRange(e, t) {
            wr(e, t, this.changes)
        }
        comparePoint(e, t) {
            wr(e, t, this.changes)
        }
    };

    function Vc(n, e, t) {
        let i = new Qo;
        return U.compare(n, e, t, i), i.changes
    }

    function Uc(n, e) {
        for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
            if (t.nodeType == 1 && t.contentEditable == "false") return !0;
        return !1
    }

    function Cc(n, e, t = 1) {
        let i = n.charCategorizer(e),
            r = n.doc.lineAt(e),
            s = e - r.from;
        if (r.length == 0) return y.cursor(e);
        s == 0 ? t = 1 : s == r.length && (t = -1);
        let O = s,
            o = s;
        t < 0 ? O = Ve(r.text, s, !1) : o = Ve(r.text, s);
        let l = i(r.text.slice(O, o));
        for (; O > 0;) {
            let a = Ve(r.text, O, !1);
            if (i(r.text.slice(a, O)) != l) break;
            O = a
        }
        for (; o < r.length;) {
            let a = Ve(r.text, o);
            if (i(r.text.slice(o, a)) != l) break;
            o = a
        }
        return y.range(O + r.from, o + r.from)
    }

    function Ac(n, e) {
        return e.left > n ? e.left - n : Math.max(0, n - e.right)
    }

    function Yc(n, e) {
        return e.top > n ? e.top - n : Math.max(0, n - e.bottom)
    }

    function Cr(n, e) {
        return n.top < e.bottom - 1 && n.bottom > e.top + 1
    }

    function yo(n, e) {
        return e < n.top ? {
            top: e,
            left: n.left,
            right: n.right,
            bottom: n.bottom
        } : n
    }

    function So(n, e) {
        return e > n.bottom ? {
            top: n.top,
            left: n.left,
            right: n.right,
            bottom: e
        } : n
    }

    function Ar(n, e, t) {
        let i, r, s, O, o = !1,
            l, a, h, c;
        for (let p = n.firstChild; p; p = p.nextSibling) {
            let m = mi(p);
            for (let $ = 0; $ < m.length; $++) {
                let g = m[$];
                r && Cr(r, g) && (g = yo(So(g, r.bottom), r.top));
                let S = Ac(e, g),
                    k = Yc(t, g);
                if (S == 0 && k == 0) return p.nodeType == 3 ? bo(p, e, t) : Ar(p, e, t);
                (!i || O > k || O == k && s > S) && (i = p, r = g, s = S, O = k, o = !S || (S > 0 ? $ < m.length - 1 : $ > 0)), S == 0 ? t > g.bottom && (!h || h.bottom < g.bottom) ? (l = p, h = g) : t < g.top && (!c || c.top > g.top) && (a = p, c = g) : h && Cr(h, g) ? h = So(h, g.bottom) : c && Cr(c, g) && (c = yo(c, g.top))
            }
        }
        if (h && h.bottom >= t ? (i = l, r = h) : c && c.top <= t && (i = a, r = c), !i) return {
            node: n,
            offset: 0
        };
        let f = Math.max(r.left, Math.min(r.right, e));
        if (i.nodeType == 3) return bo(i, f, t);
        if (o && i.contentEditable != "false") return Ar(i, f, t);
        let d = Array.prototype.indexOf.call(n.childNodes, i) + (e >= (r.left + r.right) / 2 ? 1 : 0);
        return {
            node: n,
            offset: d
        }
    }

    function bo(n, e, t) {
        let i = n.nodeValue.length,
            r = -1,
            s = 1e9,
            O = 0;
        for (let o = 0; o < i; o++) {
            let l = Kt(n, o, o + 1).getClientRects();
            for (let a = 0; a < l.length; a++) {
                let h = l[a];
                if (h.top == h.bottom) continue;
                O || (O = e - h.left);
                let c = (h.top > t ? h.top - t : t - h.bottom) - 1;
                if (h.left - 1 <= e && h.right + 1 >= e && c < s) {
                    let f = e >= (h.left + h.right) / 2,
                        d = f;
                    if ((b.chrome || b.gecko) && Kt(n, o).getBoundingClientRect().left == h.right && (d = !f), c <= 0) return {
                        node: n,
                        offset: o + (d ? 1 : 0)
                    };
                    r = o + (d ? 1 : 0), s = c
                }
            }
        }
        return {
            node: n,
            offset: r > -1 ? r : O > 0 ? n.nodeValue.length : 0
        }
    }

    function xo(n, {
        x: e,
        y: t
    }, i, r = -1) {
        var s;
        let O = n.contentDOM.getBoundingClientRect(),
            o = O.top + n.viewState.paddingTop,
            l, {
                docHeight: a
            } = n.viewState,
            h = t - o;
        if (h < 0) return 0;
        if (h > a) return n.state.doc.length;
        for (let g = n.defaultLineHeight / 2, S = !1; l = n.elementAtHeight(h), l.type != N.Text;)
            for (; h = r > 0 ? l.bottom + g : l.top - g, !(h >= 0 && h <= a);) {
                if (S) return i ? null : 0;
                S = !0, r = -r
            }
        t = o + h;
        let c = l.from;
        if (c < n.viewport.from) return n.viewport.from == 0 ? 0 : i ? null : Po(n, O, l, e, t);
        if (c > n.viewport.to) return n.viewport.to == n.state.doc.length ? n.state.doc.length : i ? null : Po(n, O, l, e, t);
        let f = n.dom.ownerDocument,
            d = n.root.elementFromPoint ? n.root : f,
            p = d.elementFromPoint(e, t);
        p && !n.contentDOM.contains(p) && (p = null), p || (e = Math.max(O.left + 1, Math.min(O.right - 1, e)), p = d.elementFromPoint(e, t), p && !n.contentDOM.contains(p) && (p = null));
        let m, $ = -1;
        if (p && ((s = n.docView.nearest(p)) === null || s === void 0 ? void 0 : s.isEditable) != !1) {
            if (f.caretPositionFromPoint) {
                let g = f.caretPositionFromPoint(e, t);
                g && ({
                    offsetNode: m,
                    offset: $
                } = g)
            } else if (f.caretRangeFromPoint) {
                let g = f.caretRangeFromPoint(e, t);
                g && ({
                    startContainer: m,
                    startOffset: $
                } = g, (!n.contentDOM.contains(m) || b.safari && jc(m, $, e) || b.chrome && Gc(m, $, e)) && (m = void 0))
            }
        }
        if (!m || !n.docView.dom.contains(m)) {
            let g = le.find(n.docView, c);
            if (!g) return h > l.top + l.height / 2 ? l.to : l.from;
            ({
                node: m,
                offset: $
            } = Ar(g.dom, e, t))
        }
        return n.docView.posFromDOM(m, $)
    }

    function Po(n, e, t, i, r) {
        let s = Math.round((i - e.left) * n.defaultCharacterWidth);
        n.lineWrapping && t.height > n.defaultLineHeight * 1.5 && (s += Math.floor((r - t.top) / n.defaultLineHeight) * n.viewState.heightOracle.lineLength);
        let O = n.state.sliceDoc(t.from, t.to);
        return t.from + RO(O, s, n.state.tabSize)
    }

    function jc(n, e, t) {
        let i;
        if (n.nodeType != 3 || e != (i = n.nodeValue.length)) return !1;
        for (let r = n.nextSibling; r; r = r.nextSibling)
            if (r.nodeType != 1 || r.nodeName != "BR") return !1;
        return Kt(n, i - 1, i).getBoundingClientRect().left > t
    }

    function Gc(n, e, t) {
        if (e != 0) return !1;
        for (let r = n;;) {
            let s = r.parentNode;
            if (!s || s.nodeType != 1 || s.firstChild != r) return !1;
            if (s.classList.contains("cm-line")) break;
            r = s
        }
        let i = n.nodeType == 1 ? n.getBoundingClientRect() : Kt(n, 0, Math.max(n.nodeValue.length, 1)).getBoundingClientRect();
        return t - i.left > 5
    }

    function Ec(n, e, t, i) {
        let r = n.state.doc.lineAt(e.head),
            s = !i || !n.lineWrapping ? null : n.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
        if (s) {
            let l = n.dom.getBoundingClientRect(),
                a = n.textDirectionAt(r.from),
                h = n.posAtCoords({
                    x: t == (a == H.LTR) ? l.right - 1 : l.left + 1,
                    y: (s.top + s.bottom) / 2
                });
            if (h != null) return y.cursor(h, t ? -1 : 1)
        }
        let O = le.find(n.docView, e.head),
            o = O ? t ? O.posAtEnd : O.posAtStart : t ? r.to : r.from;
        return y.cursor(o, t ? -1 : 1)
    }

    function To(n, e, t, i) {
        let r = n.state.doc.lineAt(e.head),
            s = n.bidiSpans(r),
            O = n.textDirectionAt(r.from);
        for (let o = e, l = null;;) {
            let a = Wc(r, s, O, o, t),
                h = fo;
            if (!a) {
                if (r.number == (t ? n.state.doc.lines : 1)) return o;
                h = `
`, r = n.state.doc.line(r.number + (t ? 1 : -1)), s = n.bidiSpans(r), a = y.cursor(t ? r.from : r.to)
            }
            if (l) {
                if (!l(h)) return o
            } else {
                if (!i) return a;
                l = i(h)
            }
            o = a
        }
    }

    function Dc(n, e, t) {
        let i = n.state.charCategorizer(e),
            r = i(t);
        return s => {
            let O = i(s);
            return r == ke.Space && (r = O), r == O
        }
    }

    function Mc(n, e, t, i) {
        let r = e.head,
            s = t ? 1 : -1;
        if (r == (t ? n.state.doc.length : 0)) return y.cursor(r, e.assoc);
        let O = e.goalColumn,
            o, l = n.contentDOM.getBoundingClientRect(),
            a = n.coordsAtPos(r),
            h = n.documentTop;
        if (a) O == null && (O = a.left - l.left), o = s < 0 ? a.top : a.bottom;
        else {
            let d = n.viewState.lineBlockAt(r);
            O == null && (O = Math.min(l.right - l.left, n.defaultCharacterWidth * (r - d.from))), o = (s < 0 ? d.top : d.bottom) + h
        }
        let c = l.left + O,
            f = i ? ? n.defaultLineHeight >> 1;
        for (let d = 0;; d += 10) {
            let p = o + (f + d) * s,
                m = xo(n, {
                    x: c,
                    y: p
                }, !1, s);
            if (p < l.top || p > l.bottom || (s < 0 ? m < r : m > r)) return y.cursor(m, e.assoc, void 0, O)
        }
    }

    function Yr(n, e, t) {
        let i = n.state.facet(ao).map(r => r(n));
        for (;;) {
            let r = !1;
            for (let s of i) s.between(t.from - 1, t.from + 1, (O, o, l) => {
                t.from > O && t.from < o && (t = e.head > t.from ? y.cursor(O, 1) : y.cursor(o, -1), r = !0)
            });
            if (!r) return t
        }
    }
    var ko = class {
            constructor(e) {
                this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.chromeScrollHack = -1, this.pendingIOSKey = void 0, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastEscPress = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.registeredEvents = [], this.customHandlers = [], this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.mouseSelection = null;
                for (let t in K) {
                    let i = K[t];
                    e.contentDOM.addEventListener(t, r => {
                        !wo(e, r) || this.ignoreDuringComposition(r) || t == "keydown" && this.keydown(e, r) || (this.mustFlushObserver(r) && e.observer.forceFlush(), this.runCustomHandlers(t, e, r) ? r.preventDefault() : i(e, r))
                    }, jr[t]), this.registeredEvents.push(t)
                }
                b.chrome && b.chrome_version == 102 && e.scrollDOM.addEventListener("wheel", () => {
                    this.chromeScrollHack < 0 ? e.contentDOM.style.pointerEvents = "none" : window.clearTimeout(this.chromeScrollHack), this.chromeScrollHack = setTimeout(() => {
                        this.chromeScrollHack = -1, e.contentDOM.style.pointerEvents = ""
                    }, 100)
                }, {
                    passive: !0
                }), this.notifiedFocused = e.hasFocus, b.safari && e.contentDOM.addEventListener("input", () => null)
            }
            setSelectionOrigin(e) {
                this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now()
            }
            ensureHandlers(e, t) {
                var i;
                let r;
                this.customHandlers = [];
                for (let s of t)
                    if (r = (i = s.update(e).spec) === null || i === void 0 ? void 0 : i.domEventHandlers) {
                        this.customHandlers.push({
                            plugin: s.value,
                            handlers: r
                        });
                        for (let O in r) this.registeredEvents.indexOf(O) < 0 && O != "scroll" && (this.registeredEvents.push(O), e.contentDOM.addEventListener(O, o => {
                            !wo(e, o) || this.runCustomHandlers(O, e, o) && o.preventDefault()
                        }))
                    }
            }
            runCustomHandlers(e, t, i) {
                for (let r of this.customHandlers) {
                    let s = r.handlers[e];
                    if (s) try {
                        if (s.call(r.plugin, i, t) || i.defaultPrevented) return !0
                    } catch (O) {
                        ye(t.state, O)
                    }
                }
                return !1
            }
            runScrollHandlers(e, t) {
                this.lastScrollTop = e.scrollDOM.scrollTop, this.lastScrollLeft = e.scrollDOM.scrollLeft;
                for (let i of this.customHandlers) {
                    let r = i.handlers.scroll;
                    if (r) try {
                        r.call(i.plugin, t, e)
                    } catch (s) {
                        ye(e.state, s)
                    }
                }
            }
            keydown(e, t) {
                if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && Date.now() < this.lastEscPress + 2e3) return !0;
                if (b.android && b.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8)) return e.observer.delayAndroidKey(t.key, t.keyCode), !0;
                let i;
                return b.ios && !t.synthetic && !t.altKey && !t.metaKey && ((i = vo.find(r => r.keyCode == t.keyCode)) && !t.ctrlKey || Ic.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = i || t, setTimeout(() => this.flushIOSKey(e), 250), !0) : !1
            }
            flushIOSKey(e) {
                let t = this.pendingIOSKey;
                return t ? (this.pendingIOSKey = void 0, ei(e.contentDOM, t.key, t.keyCode)) : !1
            }
            ignoreDuringComposition(e) {
                return /^key/.test(e.type) ? this.composing > 0 ? !0 : b.safari && !b.ios && Date.now() - this.compositionEndedAt < 100 ? (this.compositionEndedAt = 0, !0) : !1 : !1
            }
            mustFlushObserver(e) {
                return e.type == "keydown" && e.keyCode != 229
            }
            startMouseSelection(e) {
                this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e
            }
            update(e) {
                this.mouseSelection && this.mouseSelection.update(e), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0)
            }
            destroy() {
                this.mouseSelection && this.mouseSelection.destroy()
            }
        },
        vo = [{
            key: "Backspace",
            keyCode: 8,
            inputType: "deleteContentBackward"
        }, {
            key: "Enter",
            keyCode: 13,
            inputType: "insertParagraph"
        }, {
            key: "Delete",
            keyCode: 46,
            inputType: "deleteContentForward"
        }],
        Ic = "dthko",
        Xo = [16, 17, 18, 20, 91, 92, 224, 225],
        Ro = class {
            constructor(e, t, i, r) {
                this.view = e, this.style = i, this.mustSelect = r, this.lastEvent = t;
                let s = e.contentDOM.ownerDocument;
                s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(_.allowMultipleSelections) && Bc(e, t), this.dragMove = Nc(e, t), this.dragging = Lc(e, t) && zo(t) == 1 ? null : !1, this.dragging === !1 && (t.preventDefault(), this.select(t))
            }
            move(e) {
                if (e.buttons == 0) return this.destroy();
                this.dragging === !1 && this.select(this.lastEvent = e)
            }
            up(e) {
                this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy()
            }
            destroy() {
                let e = this.view.contentDOM.ownerDocument;
                e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = null
            }
            select(e) {
                let t = this.style.get(e, this.extend, this.multiple);
                (this.mustSelect || !t.eq(this.view.state.selection) || t.main.assoc != this.view.state.selection.main.assoc) && this.view.dispatch({
                    selection: t,
                    userEvent: "select.pointer",
                    scrollIntoView: !0
                }), this.mustSelect = !1
            }
            update(e) {
                e.docChanged && this.dragging && (this.dragging = this.dragging.map(e.changes)), this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20)
            }
        };

    function Bc(n, e) {
        let t = n.state.facet(to);
        return t.length ? t[0](e) : b.mac ? e.metaKey : e.ctrlKey
    }

    function Nc(n, e) {
        let t = n.state.facet(io);
        return t.length ? t[0](e) : b.mac ? !e.altKey : !e.ctrlKey
    }

    function Lc(n, e) {
        let {
            main: t
        } = n.state.selection;
        if (t.empty) return !1;
        let i = nn(n.root);
        if (!i || i.rangeCount == 0) return !0;
        let r = i.getRangeAt(0).getClientRects();
        for (let s = 0; s < r.length; s++) {
            let O = r[s];
            if (O.left <= e.clientX && O.right >= e.clientX && O.top <= e.clientY && O.bottom >= e.clientY) return !0
        }
        return !1
    }

    function wo(n, e) {
        if (!e.bubbles) return !0;
        if (e.defaultPrevented) return !1;
        for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
            if (!t || t.nodeType == 11 || (i = A.get(t)) && i.ignoreEvent(e)) return !1;
        return !0
    }
    var K = Object.create(null),
        jr = Object.create(null),
        Wo = b.ie && b.ie_version < 15 || b.ios && b.webkit_version < 604;

    function Fc(n) {
        let e = n.dom.parentNode;
        if (!e) return;
        let t = e.appendChild(document.createElement("textarea"));
        t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
            n.focus(), t.remove(), qo(n, t.value)
        }, 50)
    }

    function qo(n, e) {
        let {
            state: t
        } = n, i, r = 1, s = t.toText(e), O = s.lines == t.selection.ranges.length;
        if (Gr != null && t.selection.ranges.every(l => l.empty) && Gr == s.toString()) {
            let l = -1;
            i = t.changeByRange(a => {
                let h = t.doc.lineAt(a.from);
                if (h.from == l) return {
                    range: a
                };
                l = h.from;
                let c = t.toText((O ? s.line(r++).text : e) + t.lineBreak);
                return {
                    changes: {
                        from: h.from,
                        insert: c
                    },
                    range: y.cursor(a.from + c.length)
                }
            })
        } else O ? i = t.changeByRange(l => {
            let a = s.line(r++);
            return {
                changes: {
                    from: l.from,
                    to: l.to,
                    insert: a.text
                },
                range: y.cursor(l.from + a.length)
            }
        }) : i = t.replaceSelection(s);
        n.dispatch(i, {
            userEvent: "input.paste",
            scrollIntoView: !0
        })
    }
    K.keydown = (n, e) => {
        n.inputState.setSelectionOrigin("select"), e.keyCode == 27 ? n.inputState.lastEscPress = Date.now() : Xo.indexOf(e.keyCode) < 0 && (n.inputState.lastEscPress = 0)
    };
    K.touchstart = (n, e) => {
        n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer")
    };
    K.touchmove = n => {
        n.inputState.setSelectionOrigin("select.pointer")
    };
    jr.touchstart = jr.touchmove = {
        passive: !0
    };
    K.mousedown = (n, e) => {
        if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3) return;
        let t = null;
        for (let i of n.state.facet(no))
            if (t = i(n, e), t) break;
        if (!t && e.button == 0 && (t = Hc(n, e)), t) {
            let i = n.root.activeElement != n.contentDOM;
            i && n.observer.ignore(() => AO(n.contentDOM)), n.inputState.startMouseSelection(new Ro(n, e, t, i))
        }
    };

    function Zo(n, e, t, i) {
        if (i == 1) return y.cursor(e, t);
        if (i == 2) return Cc(n.state, e, t); {
            let r = le.find(n.docView, e),
                s = n.state.doc.lineAt(r ? r.posAtEnd : e),
                O = r ? r.posAtStart : s.from,
                o = r ? r.posAtEnd : s.to;
            return o < n.state.doc.length && o == s.to && o++, y.range(O, o)
        }
    }
    var _o = (n, e) => n >= e.top && n <= e.bottom,
        Vo = (n, e, t) => _o(e, t) && n >= t.left && n <= t.right;

    function Kc(n, e, t, i) {
        let r = le.find(n.docView, e);
        if (!r) return 1;
        let s = e - r.posAtStart;
        if (s == 0) return 1;
        if (s == r.length) return -1;
        let O = r.coordsAt(s, -1);
        if (O && Vo(t, i, O)) return -1;
        let o = r.coordsAt(s, 1);
        return o && Vo(t, i, o) ? 1 : O && _o(i, O) ? -1 : 1
    }

    function Uo(n, e) {
        let t = n.posAtCoords({
            x: e.clientX,
            y: e.clientY
        }, !1);
        return {
            pos: t,
            bias: Kc(n, t, e.clientX, e.clientY)
        }
    }
    var Jc = b.ie && b.ie_version <= 11,
        Co = null,
        Ao = 0,
        Yo = 0;

    function zo(n) {
        if (!Jc) return n.detail;
        let e = Co,
            t = Yo;
        return Co = n, Yo = Date.now(), Ao = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Ao + 1) % 3 : 1
    }

    function Hc(n, e) {
        let t = Uo(n, e),
            i = zo(e),
            r = n.state.selection,
            s = t,
            O = e;
        return {
            update(o) {
                o.docChanged && (t.pos = o.changes.mapPos(t.pos), r = r.map(o.changes), O = null)
            },
            get(o, l, a) {
                let h;
                O && o.clientX == O.clientX && o.clientY == O.clientY ? h = s : (h = s = Uo(n, o), O = o);
                let c = Zo(n, h.pos, h.bias, i);
                if (t.pos != h.pos && !l) {
                    let f = Zo(n, t.pos, t.bias, i),
                        d = Math.min(f.from, c.from),
                        p = Math.max(f.to, c.to);
                    c = d < c.from ? y.range(d, p) : y.range(p, d)
                }
                return l ? r.replaceRange(r.main.extend(c.from, c.to)) : a && r.ranges.length > 1 && r.ranges.some(f => f.eq(c)) ? eu(r, c) : a ? r.addRange(c) : y.create([c])
            }
        }
    }

    function eu(n, e) {
        for (let t = 0;; t++)
            if (n.ranges[t].eq(e)) return y.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0))
    }
    K.dragstart = (n, e) => {
        let {
            selection: {
                main: t
            }
        } = n.state, {
            mouseSelection: i
        } = n.inputState;
        i && (i.dragging = t), e.dataTransfer && (e.dataTransfer.setData("Text", n.state.sliceDoc(t.from, t.to)), e.dataTransfer.effectAllowed = "copyMove")
    };

    function jo(n, e, t, i) {
        if (!t) return;
        let r = n.posAtCoords({
            x: e.clientX,
            y: e.clientY
        }, !1);
        e.preventDefault();
        let {
            mouseSelection: s
        } = n.inputState, O = i && s && s.dragging && s.dragMove ? {
            from: s.dragging.from,
            to: s.dragging.to
        } : null, o = {
            from: r,
            insert: t
        }, l = n.state.changes(O ? [O, o] : o);
        n.focus(), n.dispatch({
            changes: l,
            selection: {
                anchor: l.mapPos(r, -1),
                head: l.mapPos(r, 1)
            },
            userEvent: O ? "move.drop" : "input.drop"
        })
    }
    K.drop = (n, e) => {
        if (!e.dataTransfer) return;
        if (n.state.readOnly) return e.preventDefault();
        let t = e.dataTransfer.files;
        if (t && t.length) {
            e.preventDefault();
            let i = Array(t.length),
                r = 0,
                s = () => {
                    ++r == t.length && jo(n, e, i.filter(O => O != null).join(n.state.lineBreak), !1)
                };
            for (let O = 0; O < t.length; O++) {
                let o = new FileReader;
                o.onerror = s, o.onload = () => {
                    /[\x00-\x08\x0e-\x1f]{2}/.test(o.result) || (i[O] = o.result), s()
                }, o.readAsText(t[O])
            }
        } else jo(n, e, e.dataTransfer.getData("Text"), !0)
    };
    K.paste = (n, e) => {
        if (n.state.readOnly) return e.preventDefault();
        n.observer.flush();
        let t = Wo ? null : e.clipboardData;
        t ? (qo(n, t.getData("text/plain")), e.preventDefault()) : Fc(n)
    };

    function tu(n, e) {
        let t = n.dom.parentNode;
        if (!t) return;
        let i = t.appendChild(document.createElement("textarea"));
        i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
            i.remove(), n.focus()
        }, 50)
    }

    function iu(n) {
        let e = [],
            t = [],
            i = !1;
        for (let r of n.selection.ranges) r.empty || (e.push(n.sliceDoc(r.from, r.to)), t.push(r));
        if (!e.length) {
            let r = -1;
            for (let {
                    from: s
                } of n.selection.ranges) {
                let O = n.doc.lineAt(s);
                O.number > r && (e.push(O.text), t.push({
                    from: O.from,
                    to: Math.min(n.doc.length, O.to + 1)
                })), r = O.number
            }
            i = !0
        }
        return {
            text: e.join(n.lineBreak),
            ranges: t,
            linewise: i
        }
    }
    var Gr = null;
    K.copy = K.cut = (n, e) => {
        let {
            text: t,
            ranges: i,
            linewise: r
        } = iu(n.state);
        if (!t && !r) return;
        Gr = r ? t : null;
        let s = Wo ? null : e.clipboardData;
        s ? (e.preventDefault(), s.clearData(), s.setData("text/plain", t)) : tu(n, t), e.type == "cut" && !n.state.readOnly && n.dispatch({
            changes: i,
            scrollIntoView: !0,
            userEvent: "delete.cut"
        })
    };

    function Go(n) {
        setTimeout(() => {
            n.hasFocus != n.inputState.notifiedFocused && n.update([])
        }, 10)
    }
    K.focus = n => {
        n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), Go(n)
    };
    K.blur = n => {
        n.observer.clearSelectionRange(), Go(n)
    };
    K.compositionstart = K.compositionupdate = n => {
        n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0)
    };
    K.compositionend = n => {
        n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionFirstChange = null, b.chrome && b.android && n.observer.flushSoon(), setTimeout(() => {
            n.inputState.composing < 0 && n.docView.compositionDeco.size && n.update([])
        }, 50)
    };
    K.contextmenu = n => {
        n.inputState.lastContextMenu = Date.now()
    };
    K.beforeinput = (n, e) => {
        var t;
        let i;
        if (b.chrome && b.android && (i = vo.find(r => r.inputType == e.inputType)) && (n.observer.delayAndroidKey(i.key, i.keyCode), i.key == "Backspace" || i.key == "Delete")) {
            let r = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.height) || 0;
            setTimeout(() => {
                var s;
                (((s = window.visualViewport) === null || s === void 0 ? void 0 : s.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus())
            }, 100)
        }
    };
    var Eo = ["pre-wrap", "normal", "pre-line", "break-spaces"],
        Do = class {
            constructor(e) {
                this.lineWrapping = e, this.doc = z.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.lineLength = 30, this.heightChanged = !1
            }
            heightForGap(e, t) {
                let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
                return this.lineWrapping && (i += Math.ceil((t - e - i * this.lineLength * .5) / this.lineLength)), this.lineHeight * i
            }
            heightForLine(e) {
                return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight
            }
            setDoc(e) {
                return this.doc = e, this
            }
            mustRefreshForWrapping(e) {
                return Eo.indexOf(e) > -1 != this.lineWrapping
            }
            mustRefreshForHeights(e) {
                let t = !1;
                for (let i = 0; i < e.length; i++) {
                    let r = e[i];
                    r < 0 ? i++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0)
                }
                return t
            }
            refresh(e, t, i, r, s) {
                let O = Eo.indexOf(e) > -1,
                    o = Math.round(t) != Math.round(this.lineHeight) || this.lineWrapping != O;
                if (this.lineWrapping = O, this.lineHeight = t, this.charWidth = i, this.lineLength = r, o) {
                    this.heightSamples = {};
                    for (let l = 0; l < s.length; l++) {
                        let a = s[l];
                        a < 0 ? l++ : this.heightSamples[Math.floor(a * 10)] = !0
                    }
                }
                return o
            }
        },
        Mo = class {
            constructor(e, t) {
                this.from = e, this.heights = t, this.index = 0
            }
            get more() {
                return this.index < this.heights.length
            }
        },
        rt = class {
            constructor(e, t, i, r, s) {
                this.from = e, this.length = t, this.top = i, this.height = r, this.type = s
            }
            get to() {
                return this.from + this.length
            }
            get bottom() {
                return this.top + this.height
            }
            join(e) {
                let t = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(e.type) ? e.type : [e]);
                return new rt(this.from, this.length + e.length, this.top, this.height + e.height, t)
            }
        },
        G = function(n) {
            return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n
        }(G || (G = {})),
        un = .001,
        ae = class {
            constructor(e, t, i = 2) {
                this.length = e, this.height = t, this.flags = i
            }
            get outdated() {
                return (this.flags & 2) > 0
            }
            set outdated(e) {
                this.flags = (e ? 2 : 0) | this.flags & ~2
            }
            setHeight(e, t) {
                this.height != t && (Math.abs(this.height - t) > un && (e.heightChanged = !0), this.height = t)
            }
            replace(e, t, i) {
                return ae.of(i)
            }
            decomposeLeft(e, t) {
                t.push(this)
            }
            decomposeRight(e, t) {
                t.push(this)
            }
            applyChanges(e, t, i, r) {
                let s = this;
                for (let O = r.length - 1; O >= 0; O--) {
                    let {
                        fromA: o,
                        toA: l,
                        fromB: a,
                        toB: h
                    } = r[O], c = s.lineAt(o, G.ByPosNoHeight, t, 0, 0), f = c.to >= l ? c : s.lineAt(l, G.ByPosNoHeight, t, 0, 0);
                    for (h += f.to - l, l = f.to; O > 0 && c.from <= r[O - 1].toA;) o = r[O - 1].fromA, a = r[O - 1].fromB, O--, o < c.from && (c = s.lineAt(o, G.ByPosNoHeight, t, 0, 0));
                    a += c.from - o, o = c.from;
                    let d = fn.build(i, e, a, h);
                    s = s.replace(o, l, d)
                }
                return s.updateHeight(i, 0)
            }
            static empty() {
                return new me(0, 0)
            }
            static of (e) {
                if (e.length == 1) return e[0];
                let t = 0,
                    i = e.length,
                    r = 0,
                    s = 0;
                for (;;)
                    if (t == i)
                        if (r > s * 2) {
                            let o = e[t - 1];
                            o.break ? e.splice(--t, 1, o.left, null, o.right) : e.splice(--t, 1, o.left, o.right), i += 1 + o.break, r -= o.size
                        } else if (s > r * 2) {
                    let o = e[i];
                    o.break ? e.splice(i, 1, o.left, null, o.right) : e.splice(i, 1, o.left, o.right), i += 2 + o.break, s -= o.size
                } else break;
                else if (r < s) {
                    let o = e[t++];
                    o && (r += o.size)
                } else {
                    let o = e[--i];
                    o && (s += o.size)
                }
                let O = 0;
                return e[t - 1] == null ? (O = 1, t--) : e[t] == null && (O = 1, i++), new Io(ae.of(e.slice(0, t)), O, ae.of(e.slice(i)))
            }
        };
    ae.prototype.size = 1;
    var Er = class extends ae {
            constructor(e, t, i) {
                super(e, t);
                this.type = i
            }
            blockAt(e, t, i, r) {
                return new rt(r, this.length, i, this.height, this.type)
            }
            lineAt(e, t, i, r, s) {
                return this.blockAt(0, i, r, s)
            }
            forEachLine(e, t, i, r, s, O) {
                e <= s + this.length && t >= s && O(this.blockAt(0, i, r, s))
            }
            updateHeight(e, t = 0, i = !1, r) {
                return r && r.from <= t && r.more && this.setHeight(e, r.heights[r.index++]), this.outdated = !1, this
            }
            toString() {
                return `block(${this.length})`
            }
        },
        me = class extends Er {
            constructor(e, t) {
                super(e, t, N.Text);
                this.collapsed = 0, this.widgetHeight = 0
            }
            replace(e, t, i) {
                let r = i[0];
                return i.length == 1 && (r instanceof me || r instanceof J && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof J ? r = new me(r.length, this.height) : r.height = this.height, this.outdated || (r.outdated = !1), r) : ae.of(i)
            }
            updateHeight(e, t = 0, i = !1, r) {
                return r && r.from <= t && r.more ? this.setHeight(e, r.heights[r.index++]) : (i || this.outdated) && this.setHeight(e, Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed))), this.outdated = !1, this
            }
            toString() {
                return `line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`
            }
        },
        J = class extends ae {
            constructor(e) {
                super(e, 0)
            }
            lines(e, t) {
                let i = e.lineAt(t).number,
                    r = e.lineAt(t + this.length).number;
                return {
                    firstLine: i,
                    lastLine: r,
                    lineHeight: this.height / (r - i + 1)
                }
            }
            blockAt(e, t, i, r) {
                let {
                    firstLine: s,
                    lastLine: O,
                    lineHeight: o
                } = this.lines(t, r), l = Math.max(0, Math.min(O - s, Math.floor((e - i) / o))), {
                    from: a,
                    length: h
                } = t.line(s + l);
                return new rt(a, h, i + o * l, o, N.Text)
            }
            lineAt(e, t, i, r, s) {
                if (t == G.ByHeight) return this.blockAt(e, i, r, s);
                if (t == G.ByPosNoHeight) {
                    let {
                        from: c,
                        to: f
                    } = i.lineAt(e);
                    return new rt(c, f - c, 0, 0, N.Text)
                }
                let {
                    firstLine: O,
                    lineHeight: o
                } = this.lines(i, s), {
                    from: l,
                    length: a,
                    number: h
                } = i.lineAt(e);
                return new rt(l, a, r + o * (h - O), o, N.Text)
            }
            forEachLine(e, t, i, r, s, O) {
                let {
                    firstLine: o,
                    lineHeight: l
                } = this.lines(i, s);
                for (let a = Math.max(e, s), h = Math.min(s + this.length, t); a <= h;) {
                    let c = i.lineAt(a);
                    a == e && (r += l * (c.number - o)), O(new rt(c.from, c.length, r, l, N.Text)), r += l, a = c.to + 1
                }
            }
            replace(e, t, i) {
                let r = this.length - t;
                if (r > 0) {
                    let s = i[i.length - 1];
                    s instanceof J ? i[i.length - 1] = new J(s.length + r) : i.push(null, new J(r - 1))
                }
                if (e > 0) {
                    let s = i[0];
                    s instanceof J ? i[0] = new J(e + s.length) : i.unshift(new J(e - 1), null)
                }
                return ae.of(i)
            }
            decomposeLeft(e, t) {
                t.push(new J(e - 1), null)
            }
            decomposeRight(e, t) {
                t.push(null, new J(this.length - e - 1))
            }
            updateHeight(e, t = 0, i = !1, r) {
                let s = t + this.length;
                if (r && r.from <= t + this.length && r.more) {
                    let O = [],
                        o = Math.max(t, r.from),
                        l = -1,
                        a = e.heightChanged;
                    for (r.from > t && O.push(new J(r.from - t - 1).updateHeight(e, t)); o <= s && r.more;) {
                        let c = e.doc.lineAt(o).length;
                        O.length && O.push(null);
                        let f = r.heights[r.index++];
                        l == -1 ? l = f : Math.abs(f - l) >= un && (l = -2);
                        let d = new me(c, f);
                        d.outdated = !1, O.push(d), o += c + 1
                    }
                    o <= s && O.push(null, new J(s - o).updateHeight(e, o));
                    let h = ae.of(O);
                    return e.heightChanged = a || l < 0 || Math.abs(h.height - this.height) >= un || Math.abs(l - this.lines(e.doc, t).lineHeight) >= un, h
                } else(i || this.outdated) && (this.setHeight(e, e.heightForGap(t, t + this.length)), this.outdated = !1);
                return this
            }
            toString() {
                return `gap(${this.length})`
            }
        },
        Io = class extends ae {
            constructor(e, t, i) {
                super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0));
                this.left = e, this.right = i, this.size = e.size + i.size
            }
            get break() {
                return this.flags & 1
            }
            blockAt(e, t, i, r) {
                let s = i + this.left.height;
                return e < s ? this.left.blockAt(e, t, i, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break)
            }
            lineAt(e, t, i, r, s) {
                let O = r + this.left.height,
                    o = s + this.left.length + this.break,
                    l = t == G.ByHeight ? e < O : e < o,
                    a = l ? this.left.lineAt(e, t, i, r, s) : this.right.lineAt(e, t, i, O, o);
                if (this.break || (l ? a.to < o : a.from > o)) return a;
                let h = t == G.ByPosNoHeight ? G.ByPosNoHeight : G.ByPos;
                return l ? a.join(this.right.lineAt(o, h, i, O, o)) : this.left.lineAt(o, h, i, r, s).join(a)
            }
            forEachLine(e, t, i, r, s, O) {
                let o = r + this.left.height,
                    l = s + this.left.length + this.break;
                if (this.break) e < l && this.left.forEachLine(e, t, i, r, s, O), t >= l && this.right.forEachLine(e, t, i, o, l, O);
                else {
                    let a = this.lineAt(l, G.ByPos, i, r, s);
                    e < a.from && this.left.forEachLine(e, a.from - 1, i, r, s, O), a.to >= e && a.from <= t && O(a), t > a.to && this.right.forEachLine(a.to + 1, t, i, o, l, O)
                }
            }
            replace(e, t, i) {
                let r = this.left.length + this.break;
                if (t < r) return this.balanced(this.left.replace(e, t, i), this.right);
                if (e > this.left.length) return this.balanced(this.left, this.right.replace(e - r, t - r, i));
                let s = [];
                e > 0 && this.decomposeLeft(e, s);
                let O = s.length;
                for (let o of i) s.push(o);
                if (e > 0 && Bo(s, O - 1), t < this.length) {
                    let o = s.length;
                    this.decomposeRight(t, s), Bo(s, o)
                }
                return ae.of(s)
            }
            decomposeLeft(e, t) {
                let i = this.left.length;
                if (e <= i) return this.left.decomposeLeft(e, t);
                t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t)
            }
            decomposeRight(e, t) {
                let i = this.left.length,
                    r = i + this.break;
                if (e >= r) return this.right.decomposeRight(e - r, t);
                e < i && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right)
            }
            balanced(e, t) {
                return e.size > 2 * t.size || t.size > 2 * e.size ? ae.of(this.break ? [e, null, t] : [e, t]) : (this.left = e, this.right = t, this.height = e.height + t.height, this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break+t.length, this)
            }
            updateHeight(e, t = 0, i = !1, r) {
                let {
                    left: s,
                    right: O
                } = this, o = t + s.length + this.break, l = null;
                return r && r.from <= t + s.length && r.more ? l = s = s.updateHeight(e, t, i, r) : s.updateHeight(e, t, i), r && r.from <= o + O.length && r.more ? l = O = O.updateHeight(e, o, i, r) : O.updateHeight(e, o, i), l ? this.balanced(s, O) : (this.height = this.left.height + this.right.height, this.outdated = !1, this)
            }
            toString() {
                return this.left + (this.break ? " " : "-") + this.right
            }
        };

    function Bo(n, e) {
        let t, i;
        n[e] == null && (t = n[e - 1]) instanceof J && (i = n[e + 1]) instanceof J && n.splice(e - 1, 3, new J(t.length + 1 + i.length))
    }
    var nu = 5,
        fn = class {
            constructor(e, t) {
                this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e
            }
            get isCovered() {
                return this.covering && this.nodes[this.nodes.length - 1] == this.covering
            }
            span(e, t) {
                if (this.lineStart > -1) {
                    let i = Math.min(t, this.lineEnd),
                        r = this.nodes[this.nodes.length - 1];
                    r instanceof me ? r.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new me(i - this.pos, -1)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1)
                }
                this.pos = t
            }
            point(e, t, i) {
                if (e < t || i.heightRelevant) {
                    let r = i.widget ? i.widget.estimatedHeight : 0;
                    r < 0 && (r = this.oracle.lineHeight);
                    let s = t - e;
                    i.block ? this.addBlock(new Er(s, r, i.type)) : (s || r >= nu) && this.addLineDeco(r, s)
                } else t > e && this.span(e, t);
                this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to)
            }
            enterLine() {
                if (this.lineStart > -1) return;
                let {
                    from: e,
                    to: t
                } = this.oracle.doc.lineAt(this.pos);
                this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new me(this.pos - e, -1)), this.writtenTo = this.pos
            }
            blankContent(e, t) {
                let i = new J(t - e);
                return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i
            }
            ensureLine() {
                this.enterLine();
                let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
                if (e instanceof me) return e;
                let t = new me(0, -1);
                return this.nodes.push(t), t
            }
            addBlock(e) {
                this.enterLine(), e.type == N.WidgetAfter && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, e.type != N.WidgetBefore && (this.covering = e)
            }
            addLineDeco(e, t) {
                let i = this.ensureLine();
                i.length += t, i.collapsed += t, i.widgetHeight = Math.max(i.widgetHeight, e), this.writtenTo = this.pos = this.pos + t
            }
            finish(e) {
                let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
                this.lineStart > -1 && !(t instanceof me) && !this.isCovered ? this.nodes.push(new me(0, -1)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
                let i = e;
                for (let r of this.nodes) r instanceof me && r.updateHeight(this.oracle, i), i += r ? r.length : 1;
                return this.nodes
            }
            static build(e, t, i, r) {
                let s = new fn(i, e);
                return U.spans(t, i, r, s, 0), s.finish(i)
            }
        };

    function ru(n, e, t) {
        let i = new No;
        return U.compare(n, e, t, i, 0), i.changes
    }
    var No = class {
        constructor() {
            this.changes = []
        }
        compareRange() {}
        comparePoint(e, t, i, r) {
            (e < t || i && i.heightRelevant || r && r.heightRelevant) && wr(e, t, this.changes, 5)
        }
    };

    function su(n, e) {
        let t = n.getBoundingClientRect(),
            i = n.ownerDocument,
            r = i.defaultView || window,
            s = Math.max(0, t.left),
            O = Math.min(r.innerWidth, t.right),
            o = Math.max(0, t.top),
            l = Math.min(r.innerHeight, t.bottom);
        for (let a = n.parentNode; a && a != i.body;)
            if (a.nodeType == 1) {
                let h = a,
                    c = window.getComputedStyle(h);
                if ((h.scrollHeight > h.clientHeight || h.scrollWidth > h.clientWidth) && c.overflow != "visible") {
                    let f = h.getBoundingClientRect();
                    s = Math.max(s, f.left), O = Math.min(O, f.right), o = Math.max(o, f.top), l = a == n.parentNode ? f.bottom : Math.min(l, f.bottom)
                }
                a = c.position == "absolute" || c.position == "fixed" ? h.offsetParent : h.parentNode
            } else if (a.nodeType == 11) a = a.host;
        else break;
        return {
            left: s - t.left,
            right: Math.max(s, O) - t.left,
            top: o - (t.top + e),
            bottom: Math.max(o, l) - (t.top + e)
        }
    }

    function Ou(n, e) {
        let t = n.getBoundingClientRect();
        return {
            left: 0,
            right: t.right - t.left,
            top: e,
            bottom: t.bottom - (t.top + e)
        }
    }
    var dn = class {
            constructor(e, t, i) {
                this.from = e, this.to = t, this.size = i
            }
            static same(e, t) {
                if (e.length != t.length) return !1;
                for (let i = 0; i < e.length; i++) {
                    let r = e[i],
                        s = t[i];
                    if (r.from != s.from || r.to != s.to || r.size != s.size) return !1
                }
                return !0
            }
            draw(e) {
                return Y.replace({
                    widget: new Lo(this.size, e)
                }).range(this.from, this.to)
            }
        },
        Lo = class extends dt {
            constructor(e, t) {
                super();
                this.size = e, this.vertical = t
            }
            eq(e) {
                return e.size == this.size && e.vertical == this.vertical
            }
            toDOM() {
                let e = document.createElement("div");
                return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e
            }
            get estimatedHeight() {
                return this.vertical ? this.size : -1
            }
        },
        Dr = class {
            constructor(e) {
                this.state = e, this.pixelViewport = {
                    left: 0,
                    right: window.innerWidth,
                    top: 0,
                    bottom: 0
                }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaler = Fo, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = H.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
                let t = e.facet(zr).some(i => typeof i != "function" && i.class == "cm-lineWrapping");
                this.heightOracle = new Do(t), this.stateDeco = e.facet(Si).filter(i => typeof i != "function"), this.heightMap = ae.empty().applyChanges(this.stateDeco, z.empty, this.heightOracle.setDoc(e.doc), [new Ye(0, 0, 0, e.doc.length)]), this.viewport = this.getViewport(0, null), this.updateViewportLines(), this.updateForViewport(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Y.set(this.lineGaps.map(i => i.draw(!1))), this.computeVisibleRanges()
            }
            updateForViewport() {
                let e = [this.viewport],
                    {
                        main: t
                    } = this.state.selection;
                for (let i = 0; i <= 1; i++) {
                    let r = i ? t.head : t.anchor;
                    if (!e.some(({
                            from: s,
                            to: O
                        }) => r >= s && r <= O)) {
                        let {
                            from: s,
                            to: O
                        } = this.lineBlockAt(r);
                        e.push(new xi(s, O))
                    }
                }
                this.viewports = e.sort((i, r) => i.from - r.from), this.scaler = this.heightMap.height <= 7e6 ? Fo : new Ho(this.heightOracle.doc, this.heightMap, this.viewports)
            }
            updateViewportLines() {
                this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, e => {
                    this.viewportLines.push(this.scaler.scale == 1 ? e : Ti(e, this.scaler))
                })
            }
            update(e, t = null) {
                this.state = e.state;
                let i = this.stateDeco;
                this.stateDeco = this.state.facet(Si).filter(a => typeof a != "function");
                let r = e.changedRanges,
                    s = Ye.extendWithRanges(r, ru(i, this.stateDeco, e ? e.changes : B.empty(this.state.doc.length))),
                    O = this.heightMap.height;
                this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), s), this.heightMap.height != O && (e.flags |= 2);
                let o = s.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
                (t && (t.range.head < o.from || t.range.head > o.to) || !this.viewportIsAppropriate(o)) && (o = this.getViewport(0, t));
                let l = !e.changes.empty || e.flags & 2 || o.from != this.viewport.from || o.to != this.viewport.to;
                this.viewport = o, this.updateForViewport(), l && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 2e3 << 1) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && e.selectionSet && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(xc) && (this.mustEnforceCursorAssoc = !0)
            }
            measure(e) {
                let t = e.contentDOM,
                    i = window.getComputedStyle(t),
                    r = this.heightOracle,
                    s = i.whiteSpace;
                this.defaultTextDirection = i.direction == "rtl" ? H.RTL : H.LTR;
                let O = this.heightOracle.mustRefreshForWrapping(s),
                    o = O || this.mustMeasureContent || this.contentDOMHeight != t.clientHeight;
                this.contentDOMHeight = t.clientHeight, this.mustMeasureContent = !1;
                let l = 0,
                    a = 0,
                    h = parseInt(i.paddingTop) || 0,
                    c = parseInt(i.paddingBottom) || 0;
                (this.paddingTop != h || this.paddingBottom != c) && (this.paddingTop = h, this.paddingBottom = c, l |= 8 | 2), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (o = !0), this.editorWidth = e.scrollDOM.clientWidth, l |= 8);
                let f = (this.printing ? Ou : su)(t, this.paddingTop),
                    d = f.top - this.pixelViewport.top,
                    p = f.bottom - this.pixelViewport.bottom;
                this.pixelViewport = f;
                let m = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
                if (m != this.inView && (this.inView = m, m && (o = !0)), !this.inView && !this.scrollTarget) return 0;
                let $ = t.clientWidth;
                if ((this.contentDOMWidth != $ || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = $, this.editorHeight = e.scrollDOM.clientHeight, l |= 8), o) {
                    let S = e.docView.measureVisibleLineHeights(this.viewport);
                    if (r.mustRefreshForHeights(S) && (O = !0), O || r.lineWrapping && Math.abs($ - this.contentDOMWidth) > r.charWidth) {
                        let {
                            lineHeight: k,
                            charWidth: x
                        } = e.docView.measureTextSize();
                        O = k > 0 && r.refresh(s, k, x, $ / x, S), O && (e.docView.minWidth = 0, l |= 8)
                    }
                    d > 0 && p > 0 ? a = Math.max(d, p) : d < 0 && p < 0 && (a = Math.min(d, p)), r.heightChanged = !1;
                    for (let k of this.viewports) {
                        let x = k.from == this.viewport.from ? S : e.docView.measureVisibleLineHeights(k);
                        this.heightMap = (O ? ae.empty().applyChanges(this.stateDeco, z.empty, this.heightOracle, [new Ye(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, O, new Mo(k.from, x))
                    }
                    r.heightChanged && (l |= 2)
                }
                let g = !this.viewportIsAppropriate(this.viewport, a) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
                return g && (this.viewport = this.getViewport(a, this.scrollTarget)), this.updateForViewport(), (l & 2 || g) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 2e3 << 1) && this.updateLineGaps(this.ensureLineGaps(O ? [] : this.lineGaps, e)), l |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), l
            }
            get visibleTop() {
                return this.scaler.fromDOM(this.pixelViewport.top)
            }
            get visibleBottom() {
                return this.scaler.fromDOM(this.pixelViewport.bottom)
            }
            getViewport(e, t) {
                let i = .5 - Math.max(-.5, Math.min(.5, e / 1e3 / 2)),
                    r = this.heightMap,
                    s = this.state.doc,
                    {
                        visibleTop: O,
                        visibleBottom: o
                    } = this,
                    l = new xi(r.lineAt(O - i * 1e3, G.ByHeight, s, 0, 0).from, r.lineAt(o + (1 - i) * 1e3, G.ByHeight, s, 0, 0).to);
                if (t) {
                    let {
                        head: a
                    } = t.range;
                    if (a < l.from || a > l.to) {
                        let h = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top),
                            c = r.lineAt(a, G.ByPos, s, 0, 0),
                            f;
                        t.y == "center" ? f = (c.top + c.bottom) / 2 - h / 2 : t.y == "start" || t.y == "nearest" && a < l.from ? f = c.top : f = c.bottom - h, l = new xi(r.lineAt(f - 1e3 / 2, G.ByHeight, s, 0, 0).from, r.lineAt(f + h + 1e3 / 2, G.ByHeight, s, 0, 0).to)
                    }
                }
                return l
            }
            mapViewport(e, t) {
                let i = t.mapPos(e.from, -1),
                    r = t.mapPos(e.to, 1);
                return new xi(this.heightMap.lineAt(i, G.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(r, G.ByPos, this.state.doc, 0, 0).to)
            }
            viewportIsAppropriate({
                from: e,
                to: t
            }, i = 0) {
                if (!this.inView) return !0;
                let {
                    top: r
                } = this.heightMap.lineAt(e, G.ByPos, this.state.doc, 0, 0), {
                    bottom: s
                } = this.heightMap.lineAt(t, G.ByPos, this.state.doc, 0, 0), {
                    visibleTop: O,
                    visibleBottom: o
                } = this;
                return (e == 0 || r <= O - Math.max(10, Math.min(-i, 250))) && (t == this.state.doc.length || s >= o + Math.max(10, Math.min(i, 250))) && r > O - 2 * 1e3 && s < o + 2 * 1e3
            }
            mapLineGaps(e, t) {
                if (!e.length || t.empty) return e;
                let i = [];
                for (let r of e) t.touchesRange(r.from, r.to) || i.push(new dn(t.mapPos(r.from), t.mapPos(r.to), r.size));
                return i
            }
            ensureLineGaps(e, t) {
                let i = this.heightOracle.lineWrapping,
                    r = i ? 1e4 : 2e3,
                    s = r >> 1,
                    O = r << 1;
                if (this.defaultTextDirection != H.LTR && !i) return [];
                let o = [],
                    l = (a, h, c, f) => {
                        if (h - a < s) return;
                        let d = this.state.selection.main,
                            p = [d.from];
                        d.empty || p.push(d.to);
                        for (let $ of p)
                            if ($ > a && $ < h) {
                                l(a, $ - 10, c, f), l($ + 10, h, c, f);
                                return
                            }
                        let m = lu(e, $ => $.from >= c.from && $.to <= c.to && Math.abs($.from - a) < s && Math.abs($.to - h) < s && !p.some(g => $.from < g && $.to > g));
                        if (!m) {
                            if (h < c.to && t && i && t.visibleRanges.some($ => $.from <= h && $.to >= h)) {
                                let $ = t.moveToLineBoundary(y.cursor(h), !1, !0).head;
                                $ > a && (h = $)
                            }
                            m = new dn(a, h, this.gapSize(c, a, h, f))
                        }
                        o.push(m)
                    };
                for (let a of this.viewportLines) {
                    if (a.length < O) continue;
                    let h = ou(a.from, a.to, this.stateDeco);
                    if (h.total < O) continue;
                    let c = this.scrollTarget ? this.scrollTarget.range.head : null,
                        f, d;
                    if (i) {
                        let p = r / this.heightOracle.lineLength * this.heightOracle.lineHeight,
                            m, $;
                        if (c != null) {
                            let g = mn(h, c),
                                S = ((this.visibleBottom - this.visibleTop) / 2 + p) / a.height;
                            m = g - S, $ = g + S
                        } else m = (this.visibleTop - a.top - p) / a.height, $ = (this.visibleBottom - a.top + p) / a.height;
                        f = pn(h, m), d = pn(h, $)
                    } else {
                        let p = h.total * this.heightOracle.charWidth,
                            m = r * this.heightOracle.charWidth,
                            $, g;
                        if (c != null) {
                            let S = mn(h, c),
                                k = ((this.pixelViewport.right - this.pixelViewport.left) / 2 + m) / p;
                            $ = S - k, g = S + k
                        } else $ = (this.pixelViewport.left - m) / p, g = (this.pixelViewport.right + m) / p;
                        f = pn(h, $), d = pn(h, g)
                    }
                    f > a.from && l(a.from, f, a, h), d < a.to && l(d, a.to, a, h)
                }
                return o
            }
            gapSize(e, t, i, r) {
                let s = mn(r, i) - mn(r, t);
                return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s
            }
            updateLineGaps(e) {
                dn.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Y.set(e.map(t => t.draw(this.heightOracle.lineWrapping))))
            }
            computeVisibleRanges() {
                let e = this.stateDeco;
                this.lineGaps.length && (e = e.concat(this.lineGapDeco));
                let t = [];
                U.spans(e, this.viewport.from, this.viewport.to, {
                    span(r, s) {
                        t.push({
                            from: r,
                            to: s
                        })
                    },
                    point() {}
                }, 20);
                let i = t.length != this.visibleRanges.length || this.visibleRanges.some((r, s) => r.from != t[s].from || r.to != t[s].to);
                return this.visibleRanges = t, i ? 4 : 0
            }
            lineBlockAt(e) {
                return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find(t => t.from <= e && t.to >= e) || Ti(this.heightMap.lineAt(e, G.ByPos, this.state.doc, 0, 0), this.scaler)
            }
            lineBlockAtHeight(e) {
                return Ti(this.heightMap.lineAt(this.scaler.fromDOM(e), G.ByHeight, this.state.doc, 0, 0), this.scaler)
            }
            elementAtHeight(e) {
                return Ti(this.heightMap.blockAt(this.scaler.fromDOM(e), this.state.doc, 0, 0), this.scaler)
            }
            get docHeight() {
                return this.scaler.toDOM(this.heightMap.height)
            }
            get contentHeight() {
                return this.docHeight + this.paddingTop + this.paddingBottom
            }
        },
        xi = class {
            constructor(e, t) {
                this.from = e, this.to = t
            }
        };

    function ou(n, e, t) {
        let i = [],
            r = n,
            s = 0;
        return U.spans(t, n, e, {
            span() {},
            point(O, o) {
                O > r && (i.push({
                    from: r,
                    to: O
                }), s += O - r), r = o
            }
        }, 20), r < e && (i.push({
            from: r,
            to: e
        }), s += e - r), {
            total: s,
            ranges: i
        }
    }

    function pn({
        total: n,
        ranges: e
    }, t) {
        if (t <= 0) return e[0].from;
        if (t >= 1) return e[e.length - 1].to;
        let i = Math.floor(n * t);
        for (let r = 0;; r++) {
            let {
                from: s,
                to: O
            } = e[r], o = O - s;
            if (i <= o) return s + i;
            i -= o
        }
    }

    function mn(n, e) {
        let t = 0;
        for (let {
                from: i,
                to: r
            } of n.ranges) {
            if (e <= r) {
                t += e - i;
                break
            }
            t += r - i
        }
        return t / n.total
    }

    function lu(n, e) {
        for (let t of n)
            if (e(t)) return t
    }
    var Fo = {
            toDOM(n) {
                return n
            },
            fromDOM(n) {
                return n
            },
            scale: 1
        },
        Ho = class {
            constructor(e, t, i) {
                let r = 0,
                    s = 0,
                    O = 0;
                this.viewports = i.map(({
                    from: o,
                    to: l
                }) => {
                    let a = t.lineAt(o, G.ByPos, e, 0, 0).top,
                        h = t.lineAt(l, G.ByPos, e, 0, 0).bottom;
                    return r += h - a, {
                        from: o,
                        to: l,
                        top: a,
                        bottom: h,
                        domTop: 0,
                        domBottom: 0
                    }
                }), this.scale = (7e6 - r) / (t.height - r);
                for (let o of this.viewports) o.domTop = O + (o.top - s) * this.scale, O = o.domBottom = o.domTop + (o.bottom - o.top), s = o.bottom
            }
            toDOM(e) {
                for (let t = 0, i = 0, r = 0;; t++) {
                    let s = t < this.viewports.length ? this.viewports[t] : null;
                    if (!s || e < s.top) return r + (e - i) * this.scale;
                    if (e <= s.bottom) return s.domTop + (e - s.top);
                    i = s.bottom, r = s.domBottom
                }
            }
            fromDOM(e) {
                for (let t = 0, i = 0, r = 0;; t++) {
                    let s = t < this.viewports.length ? this.viewports[t] : null;
                    if (!s || e < s.domTop) return i + (e - r) / this.scale;
                    if (e <= s.domBottom) return s.top + (e - s.domTop);
                    i = s.bottom, r = s.domBottom
                }
            }
        };

    function Ti(n, e) {
        if (e.scale == 1) return n;
        let t = e.toDOM(n.top),
            i = e.toDOM(n.bottom);
        return new rt(n.from, n.length, t, i - t, Array.isArray(n.type) ? n.type.map(r => Ti(r, e)) : n.type)
    }
    var $n = T.define({
            combine: n => n.join(" ")
        }),
        Mr = T.define({
            combine: n => n.indexOf(!0) > -1
        }),
        Ir = Ce.newName(),
        Ko = Ce.newName(),
        Jo = Ce.newName(),
        el = {
            "&light": "." + Ko,
            "&dark": "." + Jo
        };

    function Br(n, e, t) {
        return new Ce(e, {
            finish(i) {
                return /&/.test(i) ? i.replace(/&\w*/, r => {
                    if (r == "&") return n;
                    if (!t || !t[r]) throw new RangeError(`Unsupported selector: ${r}`);
                    return t[r]
                }) : n + " " + i
            }
        })
    }
    var au = Br("." + Ir, {
            "&.cm-editor": {
                position: "relative !important",
                boxSizing: "border-box",
                "&.cm-focused": {
                    outline: "1px dotted #212121"
                },
                display: "flex !important",
                flexDirection: "column"
            },
            ".cm-scroller": {
                display: "flex !important",
                alignItems: "flex-start !important",
                fontFamily: "monospace",
                lineHeight: 1.4,
                height: "100%",
                overflowX: "auto",
                position: "relative",
                zIndex: 0
            },
            ".cm-content": {
                margin: 0,
                flexGrow: 2,
                flexShrink: 0,
                minHeight: "100%",
                display: "block",
                whiteSpace: "pre",
                wordWrap: "normal",
                boxSizing: "border-box",
                padding: "4px 0",
                outline: "none",
                "&[contenteditable=true]": {
                    WebkitUserModify: "read-write-plaintext-only"
                }
            },
            ".cm-lineWrapping": {
                whiteSpace_fallback: "pre-wrap",
                whiteSpace: "break-spaces",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                flexShrink: 1
            },
            "&light .cm-content": {
                caretColor: "black"
            },
            "&dark .cm-content": {
                caretColor: "white"
            },
            ".cm-line": {
                display: "block",
                padding: "0 2px 0 4px"
            },
            ".cm-selectionLayer": {
                zIndex: -1,
                contain: "size style"
            },
            ".cm-selectionBackground": {
                position: "absolute"
            },
            "&light .cm-selectionBackground": {
                background: "#d9d9d9"
            },
            "&dark .cm-selectionBackground": {
                background: "#222"
            },
            "&light.cm-focused .cm-selectionBackground": {
                background: "#d7d4f0"
            },
            "&dark.cm-focused .cm-selectionBackground": {
                background: "#233"
            },
            ".cm-cursorLayer": {
                zIndex: 100,
                contain: "size style",
                pointerEvents: "none"
            },
            "&.cm-focused .cm-cursorLayer": {
                animation: "steps(1) cm-blink 1.2s infinite"
            },
            "@keyframes cm-blink": {
                "0%": {},
                "50%": {
                    opacity: 0
                },
                "100%": {}
            },
            "@keyframes cm-blink2": {
                "0%": {},
                "50%": {
                    opacity: 0
                },
                "100%": {}
            },
            ".cm-cursor, .cm-dropCursor": {
                position: "absolute",
                borderLeft: "1.2px solid black",
                marginLeft: "-0.6px",
                pointerEvents: "none"
            },
            ".cm-cursor": {
                display: "none"
            },
            "&dark .cm-cursor": {
                borderLeftColor: "#444"
            },
            "&.cm-focused .cm-cursor": {
                display: "block"
            },
            "&light .cm-activeLine": {
                backgroundColor: "#cceeff44"
            },
            "&dark .cm-activeLine": {
                backgroundColor: "#99eeff33"
            },
            "&light .cm-specialChar": {
                color: "red"
            },
            "&dark .cm-specialChar": {
                color: "#f78"
            },
            ".cm-gutters": {
                flexShrink: 0,
                display: "flex",
                height: "100%",
                boxSizing: "border-box",
                left: 0,
                zIndex: 200
            },
            "&light .cm-gutters": {
                backgroundColor: "#f5f5f5",
                color: "#6c6c6c",
                borderRight: "1px solid #ddd"
            },
            "&dark .cm-gutters": {
                backgroundColor: "#333338",
                color: "#ccc"
            },
            ".cm-gutter": {
                display: "flex !important",
                flexDirection: "column",
                flexShrink: 0,
                boxSizing: "border-box",
                minHeight: "100%",
                overflow: "hidden"
            },
            ".cm-gutterElement": {
                boxSizing: "border-box"
            },
            ".cm-lineNumbers .cm-gutterElement": {
                padding: "0 3px 0 5px",
                minWidth: "20px",
                textAlign: "right",
                whiteSpace: "nowrap"
            },
            "&light .cm-activeLineGutter": {
                backgroundColor: "#e2f2ff"
            },
            "&dark .cm-activeLineGutter": {
                backgroundColor: "#222227"
            },
            ".cm-panels": {
                boxSizing: "border-box",
                position: "sticky",
                left: 0,
                right: 0
            },
            "&light .cm-panels": {
                backgroundColor: "#f5f5f5",
                color: "black"
            },
            "&light .cm-panels-top": {
                borderBottom: "1px solid #ddd"
            },
            "&light .cm-panels-bottom": {
                borderTop: "1px solid #ddd"
            },
            "&dark .cm-panels": {
                backgroundColor: "#333338",
                color: "white"
            },
            ".cm-tab": {
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom"
            },
            ".cm-widgetBuffer": {
                verticalAlign: "text-top",
                height: "1em",
                width: 0,
                display: "inline"
            },
            ".cm-placeholder": {
                color: "#888",
                display: "inline-block",
                verticalAlign: "top"
            },
            ".cm-button": {
                verticalAlign: "middle",
                color: "inherit",
                fontSize: "70%",
                padding: ".2em 1em",
                borderRadius: "1px"
            },
            "&light .cm-button": {
                backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
                border: "1px solid #888",
                "&:active": {
                    backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
                }
            },
            "&dark .cm-button": {
                backgroundImage: "linear-gradient(#393939, #111)",
                border: "1px solid #888",
                "&:active": {
                    backgroundImage: "linear-gradient(#111, #333)"
                }
            },
            ".cm-textfield": {
                verticalAlign: "middle",
                color: "inherit",
                fontSize: "70%",
                border: "1px solid silver",
                padding: ".2em .5em"
            },
            "&light .cm-textfield": {
                backgroundColor: "white"
            },
            "&dark .cm-textfield": {
                border: "1px solid #555",
                backgroundColor: "inherit"
            }
        }, el),
        tl = class {
            constructor(e, t, i, r) {
                this.typeOver = r, this.bounds = null, this.text = "";
                let {
                    impreciseHead: s,
                    impreciseAnchor: O
                } = e.docView;
                if (e.state.readOnly && t > -1) this.newSel = null;
                else if (t > -1 && (this.bounds = e.docView.domBoundsAround(t, i, 0))) {
                    let o = s || O ? [] : hu(e),
                        l = new Zr(o, e.state);
                    l.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = l.text, this.newSel = cu(o, this.bounds.from)
                } else {
                    let o = e.observer.selectionRange,
                        l = s && s.node == o.focusNode && s.offset == o.focusOffset || !Ht(e.contentDOM, o.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(o.focusNode, o.focusOffset),
                        a = O && O.node == o.anchorNode && O.offset == o.anchorOffset || !Ht(e.contentDOM, o.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(o.anchorNode, o.anchorOffset);
                    this.newSel = y.single(a, l)
                }
            }
        };

    function il(n, e) {
        let t, {
                newSel: i
            } = e,
            r = n.state.selection.main;
        if (e.bounds) {
            let {
                from: s,
                to: O
            } = e.bounds, o = r.from, l = null;
            (n.inputState.lastKeyCode === 8 && n.inputState.lastKeyTime > Date.now() - 100 || b.android && e.text.length < O - s) && (o = r.to, l = "end");
            let a = uu(n.state.doc.sliceString(s, O, $t), e.text, o - s, l);
            a && (b.chrome && n.inputState.lastKeyCode == 13 && a.toB == a.from + 2 && e.text.slice(a.from, a.toB) == $t + $t && a.toB--, t = {
                from: s + a.from,
                to: s + a.toA,
                insert: z.of(e.text.slice(a.from, a.toB).split($t))
            })
        } else i && (!n.hasFocus || !n.state.facet(hn) || i.main.eq(r)) && (i = null);
        if (!t && !i) return !1;
        if (!t && e.typeOver && !r.empty && i && i.main.empty ? t = {
                from: r.from,
                to: r.to,
                insert: n.state.doc.slice(r.from, r.to)
            } : t && t.from >= r.from && t.to <= r.to && (t.from != r.from || t.to != r.to) && r.to - r.from - (t.to - t.from) <= 4 ? t = {
                from: r.from,
                to: r.to,
                insert: n.state.doc.slice(r.from, t.from).append(t.insert).append(n.state.doc.slice(t.to, r.to))
            } : (b.mac || b.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) ? (i && t.insert.length == 2 && (i = y.single(i.main.anchor - 1, i.main.head - 1)), t = {
                from: r.from,
                to: r.to,
                insert: z.of([" "])
            }) : b.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = y.single(i.main.anchor - 1, i.main.head - 1)), t = {
                from: r.from,
                to: r.to,
                insert: z.of([" "])
            }), t) {
            let s = n.state;
            if (b.ios && n.inputState.flushIOSKey(n) || b.android && (t.from == r.from && t.to == r.to && t.insert.length == 1 && t.insert.lines == 2 && ei(n.contentDOM, "Enter", 13) || t.from == r.from - 1 && t.to == r.to && t.insert.length == 0 && ei(n.contentDOM, "Backspace", 8) || t.from == r.from && t.to == r.to + 1 && t.insert.length == 0 && ei(n.contentDOM, "Delete", 46))) return !0;
            let O = t.insert.toString();
            if (n.state.facet(so).some(a => a(n, t.from, t.to, O))) return !0;
            n.inputState.composing >= 0 && n.inputState.composing++;
            let o;
            if (t.from >= r.from && t.to <= r.to && t.to - t.from >= (r.to - r.from) / 3 && (!i || i.main.empty && i.main.from == t.from + t.insert.length) && n.inputState.composing < 0) {
                let a = r.from < t.from ? s.sliceDoc(r.from, t.from) : "",
                    h = r.to > t.to ? s.sliceDoc(t.to, r.to) : "";
                o = s.replaceSelection(n.state.toText(a + t.insert.sliceString(0, void 0, n.state.lineBreak) + h))
            } else {
                let a = s.changes(t),
                    h = i && !s.selection.main.eq(i.main) && i.main.to <= a.newLength ? i.main : void 0;
                if (s.selection.ranges.length > 1 && n.inputState.composing >= 0 && t.to <= r.to && t.to >= r.to - 10) {
                    let c = n.state.sliceDoc(t.from, t.to),
                        f = $o(n) || n.state.doc.lineAt(r.head),
                        d = r.to - t.to,
                        p = r.to - r.from;
                    o = s.changeByRange(m => {
                        if (m.from == r.from && m.to == r.to) return {
                            changes: a,
                            range: h || m.map(a)
                        };
                        let $ = m.to - d,
                            g = $ - c.length;
                        if (m.to - m.from != p || n.state.sliceDoc(g, $) != c || f && m.to >= f.from && m.from <= f.to) return {
                            range: m
                        };
                        let S = s.changes({
                                from: g,
                                to: $,
                                insert: t.insert
                            }),
                            k = m.to - r.to;
                        return {
                            changes: S,
                            range: h ? y.range(Math.max(0, h.anchor + k), Math.max(0, h.head + k)) : m.map(S)
                        }
                    })
                } else o = {
                    changes: a,
                    selection: h && s.selection.replaceRange(h)
                }
            }
            let l = "input.type";
            return n.composing && (l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), n.dispatch(o, {
                scrollIntoView: !0,
                userEvent: l
            }), !0
        } else if (i && !i.main.eq(r)) {
            let s = !1,
                O = "select";
            return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (s = !0), O = n.inputState.lastSelectionOrigin), n.dispatch({
                selection: i,
                scrollIntoView: s,
                userEvent: O
            }), !0
        } else return !1
    }

    function uu(n, e, t, i) {
        let r = Math.min(n.length, e.length),
            s = 0;
        for (; s < r && n.charCodeAt(s) == e.charCodeAt(s);) s++;
        if (s == r && n.length == e.length) return null;
        let O = n.length,
            o = e.length;
        for (; O > 0 && o > 0 && n.charCodeAt(O - 1) == e.charCodeAt(o - 1);) O--, o--;
        if (i == "end") {
            let l = Math.max(0, s - Math.min(O, o));
            t -= O + l - s
        }
        return O < s && n.length < e.length ? (s -= t <= s && t >= O ? s - t : 0, o = s + (o - O), O = s) : o < s && (s -= t <= s && t >= o ? s - t : 0, O = s + (O - o), o = s), {
            from: s,
            toA: O,
            toB: o
        }
    }

    function hu(n) {
        let e = [];
        if (n.root.activeElement != n.contentDOM) return e;
        let {
            anchorNode: t,
            anchorOffset: i,
            focusNode: r,
            focusOffset: s
        } = n.observer.selectionRange;
        return t && (e.push(new _r(t, i)), (r != t || s != i) && e.push(new _r(r, s))), e
    }

    function cu(n, e) {
        if (n.length == 0) return null;
        let t = n[0].pos,
            i = n.length == 2 ? n[1].pos : t;
        return t > -1 && i > -1 ? y.single(t + e, i + e) : null
    }
    var fu = {
            childList: !0,
            characterData: !0,
            subtree: !0,
            attributes: !0,
            characterDataOldValue: !0
        },
        Nr = b.ie && b.ie_version <= 11,
        nl = class {
            constructor(e) {
                this.view = e, this.active = !1, this.selectionRange = new CO, this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resize = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver(t => {
                    for (let i of t) this.queue.push(i);
                    (b.ie && b.ie_version <= 11 || b.ios && e.composing) && t.some(i => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush()
                }), Nr && (this.onCharData = t => {
                    this.queue.push({
                        target: t.target,
                        type: "characterData",
                        oldValue: t.prevValue
                    }), this.flushSoon()
                }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), typeof ResizeObserver == "function" && (this.resize = new ResizeObserver(() => {
                    var t;
                    ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize()
                }), this.resize.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver(t => {
                    this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")))
                }, {}), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver(t => {
                    t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"))
                }, {})), this.listenForScroll(), this.readSelectionRange()
            }
            onScrollChanged(e) {
                this.view.inputState.runScrollHandlers(this.view, e), this.intersecting && this.view.measure()
            }
            onScroll(e) {
                this.intersecting && this.flush(!1), this.onScrollChanged(e)
            }
            onResize() {
                this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
                    this.resizeTimeout = -1, this.view.requestMeasure()
                }, 50))
            }
            onPrint() {
                this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
                    this.view.viewState.printing = !1, this.view.requestMeasure()
                }, 500)
            }
            updateGaps(e) {
                if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
                    this.gapIntersection.disconnect();
                    for (let t of e) this.gapIntersection.observe(t);
                    this.gaps = e
                }
            }
            onSelectionChange(e) {
                let t = this.selectionChanged;
                if (!this.readSelectionRange() || this.delayedAndroidKey) return;
                let {
                    view: i
                } = this, r = this.selectionRange;
                if (i.state.facet(hn) ? i.root.activeElement != this.dom : !rn(i.dom, r)) return;
                let s = r.anchorNode && i.docView.nearest(r.anchorNode);
                if (s && s.ignoreEvent(e)) {
                    t || (this.selectionChanged = !1);
                    return
                }(b.ie && b.ie_version <= 11 || b.android && b.chrome) && !i.state.selection.main.empty && r.focusNode && sn(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1)
            }
            readSelectionRange() {
                let {
                    view: e
                } = this, t = b.safari && e.root.nodeType == 11 && pc(this.dom.ownerDocument) == this.dom && du(this.view) || nn(e.root);
                if (!t || this.selectionRange.eq(t)) return !1;
                let i = rn(this.dom, t);
                return i && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Qc(this.dom, t) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(t), i && (this.selectionChanged = !0), !0)
            }
            setSelectionRange(e, t) {
                this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1
            }
            clearSelectionRange() {
                this.selectionRange.set(null, 0, null, 0)
            }
            listenForScroll() {
                this.parentCheck = -1;
                let e = 0,
                    t = null;
                for (let i = this.dom; i;)
                    if (i.nodeType == 1) !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
                    else if (i.nodeType == 11) i = i.host;
                else break;
                if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
                    for (let i of this.scrollTargets) i.removeEventListener("scroll", this.onScroll);
                    for (let i of this.scrollTargets = t) i.addEventListener("scroll", this.onScroll)
                }
            }
            ignore(e) {
                if (!this.active) return e();
                try {
                    return this.stop(), e()
                } finally {
                    this.start(), this.clear()
                }
            }
            start() {
                this.active || (this.observer.observe(this.dom, fu), Nr && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0)
            }
            stop() {
                !this.active || (this.active = !1, this.observer.disconnect(), Nr && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData))
            }
            clear() {
                this.processRecords(), this.queue.length = 0, this.selectionChanged = !1
            }
            delayAndroidKey(e, t) {
                var i;
                if (!this.delayedAndroidKey) {
                    let r = () => {
                        let s = this.delayedAndroidKey;
                        s && (this.clearDelayedAndroidKey(), !this.flush() && s.force && ei(this.dom, s.key, s.keyCode))
                    };
                    this.flushingAndroidKey = this.view.win.requestAnimationFrame(r)
                }(!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
                    key: e,
                    keyCode: t,
                    force: this.lastChange < Date.now() - 50 || !!((i = this.delayedAndroidKey) === null || i === void 0 ? void 0 : i.force)
                })
            }
            clearDelayedAndroidKey() {
                this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1
            }
            flushSoon() {
                this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
                    this.delayedFlush = -1, this.flush()
                }))
            }
            forceFlush() {
                this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush()
            }
            processRecords() {
                let e = this.queue;
                for (let s of this.observer.takeRecords()) e.push(s);
                e.length && (this.queue = []);
                let t = -1,
                    i = -1,
                    r = !1;
                for (let s of e) {
                    let O = this.readMutation(s);
                    !O || (O.typeOver && (r = !0), t == -1 ? {
                        from: t,
                        to: i
                    } = O : (t = Math.min(O.from, t), i = Math.max(O.to, i)))
                }
                return {
                    from: t,
                    to: i,
                    typeOver: r
                }
            }
            readChange() {
                let {
                    from: e,
                    to: t,
                    typeOver: i
                } = this.processRecords(), r = this.selectionChanged && rn(this.dom, this.selectionRange);
                return e < 0 && !r ? null : (e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1, new tl(this.view, e, t, i))
            }
            flush(e = !0) {
                if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
                e && this.readSelectionRange();
                let t = this.readChange();
                if (!t) return !1;
                let i = this.view.state,
                    r = il(this.view, t);
                return this.view.state == i && this.view.update([]), r
            }
            readMutation(e) {
                let t = this.view.docView.nearest(e.target);
                if (!t || t.ignoreMutation(e)) return null;
                if (t.markDirty(e.type == "attributes"), e.type == "attributes" && (t.dirty |= 4), e.type == "childList") {
                    let i = rl(t, e.previousSibling || e.target.previousSibling, -1),
                        r = rl(t, e.nextSibling || e.target.nextSibling, 1);
                    return {
                        from: i ? t.posAfter(i) : t.posAtStart,
                        to: r ? t.posBefore(r) : t.posAtEnd,
                        typeOver: !1
                    }
                } else return e.type == "characterData" ? {
                    from: t.posAtStart,
                    to: t.posAtEnd,
                    typeOver: e.target.nodeValue == e.oldValue
                } : null
            }
            setWindow(e) {
                e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win))
            }
            addWindowListeners(e) {
                e.addEventListener("resize", this.onResize), e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange)
            }
            removeWindowListeners(e) {
                e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange)
            }
            destroy() {
                var e, t, i;
                this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resize) === null || i === void 0 || i.disconnect();
                for (let r of this.scrollTargets) r.removeEventListener("scroll", this.onScroll);
                this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey)
            }
        };

    function rl(n, e, t) {
        for (; e;) {
            let i = A.get(e);
            if (i && i.parent == n) return i;
            let r = e.parentNode;
            e = r != n.dom ? r : t > 0 ? e.nextSibling : e.previousSibling
        }
        return null
    }

    function du(n) {
        let e = null;

        function t(l) {
            l.preventDefault(), l.stopImmediatePropagation(), e = l.getTargetRanges()[0]
        }
        if (n.contentDOM.addEventListener("beforeinput", t, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", t, !0), !e) return null;
        let i = e.startContainer,
            r = e.startOffset,
            s = e.endContainer,
            O = e.endOffset,
            o = n.docView.domAtPos(n.state.selection.main.anchor);
        return sn(o.node, o.offset, s, O) && ([i, r, s, O] = [s, O, i, r]), {
            anchorNode: i,
            anchorOffset: r,
            focusNode: s,
            focusOffset: O
        }
    }
    var w = class {
        constructor(e = {}) {
            this.plugins = [], this.pluginMap = new Map, this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.style.cssText = "position: absolute; top: -10000px", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), this._dispatch = e.dispatch || (t => this.update([t])), this.dispatch = this.dispatch.bind(this), this._root = e.root || gc(e.parent) || document, this.viewState = new Dr(e.state || _.create(e)), this.plugins = this.state.facet(yi).map(t => new cn(t));
            for (let t of this.plugins) t.update(this);
            this.observer = new nl(this), this.inputState = new ko(this), this.inputState.ensureHandlers(this, this.plugins), this.docView = new Vr(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), e.parent && e.parent.appendChild(this.dom)
        }
        get state() {
            return this.viewState.state
        }
        get viewport() {
            return this.viewState.viewport
        }
        get visibleRanges() {
            return this.viewState.visibleRanges
        }
        get inView() {
            return this.viewState.inView
        }
        get composing() {
            return this.inputState.composing > 0
        }
        get compositionStarted() {
            return this.inputState.composing >= 0
        }
        get root() {
            return this._root
        }
        get win() {
            return this.dom.ownerDocument.defaultView || window
        }
        dispatch(...e) {
            this._dispatch(e.length == 1 && e[0] instanceof F ? e[0] : this.state.update(...e))
        }
        update(e) {
            if (this.updateState != 0) throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
            let t = !1,
                i = !1,
                r, s = this.state;
            for (let a of e) {
                if (a.startState != s) throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
                s = a.state
            }
            if (this.destroyed) {
                this.viewState.state = s;
                return
            }
            let O = this.observer.delayedAndroidKey,
                o = null;
            if (O ? (this.observer.clearDelayedAndroidKey(), o = this.observer.readChange(), (o && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (o = null)) : this.observer.clear(), s.facet(_.phrases) != this.state.facet(_.phrases)) return this.setState(s);
            r = Pi.create(this, s, e);
            let l = this.viewState.scrollTarget;
            try {
                this.updateState = 2;
                for (let a of e) {
                    if (l && (l = l.map(a.changes)), a.scrollIntoView) {
                        let {
                            main: h
                        } = a.state.selection;
                        l = new Qi(h.empty ? h : y.cursor(h.head, h.head > h.anchor ? -1 : 1))
                    }
                    for (let h of a.effects) h.is(oo) && (l = h.value)
                }
                this.viewState.update(r, l), this.bidiCache = ki.update(this.bidiCache, r.changes), r.empty || (this.updatePlugins(r), this.inputState.update(r)), t = this.docView.update(r), this.state.facet(bi) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some(a => a.isUserEvent("select.pointer")))
            } finally {
                this.updateState = 0
            }
            if (r.startState.facet($n) != r.state.facet($n) && (this.viewState.mustMeasureContent = !0), (t || i || l || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), !r.empty)
                for (let a of this.state.facet(Rr)) a(r);
            o && !il(this, o) && O.force && ei(this.contentDOM, O.key, O.keyCode)
        }
        setState(e) {
            if (this.updateState != 0) throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
            if (this.destroyed) {
                this.viewState.state = e;
                return
            }
            this.updateState = 2;
            let t = this.hasFocus;
            try {
                for (let i of this.plugins) i.destroy(this);
                this.viewState = new Dr(e), this.plugins = e.facet(yi).map(i => new cn(i)), this.pluginMap.clear();
                for (let i of this.plugins) i.update(this);
                this.docView = new Vr(this), this.inputState.ensureHandlers(this, this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = []
            } finally {
                this.updateState = 0
            }
            t && this.focus(), this.requestMeasure()
        }
        updatePlugins(e) {
            let t = e.startState.facet(yi),
                i = e.state.facet(yi);
            if (t != i) {
                let r = [];
                for (let s of i) {
                    let O = t.indexOf(s);
                    if (O < 0) r.push(new cn(s));
                    else {
                        let o = this.plugins[O];
                        o.mustUpdate = e, r.push(o)
                    }
                }
                for (let s of this.plugins) s.mustUpdate != e && s.destroy(this);
                this.plugins = r, this.pluginMap.clear(), this.inputState.ensureHandlers(this, this.plugins)
            } else
                for (let r of this.plugins) r.mustUpdate = e;
            for (let r = 0; r < this.plugins.length; r++) this.plugins[r].update(this)
        }
        measure(e = !0) {
            if (this.destroyed) return;
            this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.measureScheduled = 0, e && this.observer.forceFlush();
            let t = null,
                {
                    scrollHeight: i,
                    scrollTop: r,
                    clientHeight: s
                } = this.scrollDOM,
                O = r > i - s - 4 ? i : r;
            try {
                for (let o = 0;; o++) {
                    this.updateState = 1;
                    let l = this.viewport,
                        a = this.viewState.lineBlockAtHeight(O),
                        h = this.viewState.measure(this);
                    if (!h && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
                    if (o > 5) {
                        console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
                        break
                    }
                    let c = [];
                    h & 4 || ([this.measureRequests, c] = [c, this.measureRequests]);
                    let f = c.map($ => {
                            try {
                                return $.read(this)
                            } catch (g) {
                                return ye(this.state, g), sl
                            }
                        }),
                        d = Pi.create(this, this.state, []),
                        p = !1,
                        m = !1;
                    d.flags |= h, t ? t.flags |= h : t = d, this.updateState = 2, d.empty || (this.updatePlugins(d), this.inputState.update(d), this.updateAttrs(), p = this.docView.update(d));
                    for (let $ = 0; $ < c.length; $++)
                        if (f[$] != sl) try {
                            let g = c[$];
                            g.write && g.write(f[$], this)
                        } catch (g) {
                            ye(this.state, g)
                        }
                    if (this.viewState.editorHeight)
                        if (this.viewState.scrollTarget) this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, m = !0;
                        else {
                            let $ = this.viewState.lineBlockAt(a.from).top - a.top;
                            ($ > 1 || $ < -1) && (this.scrollDOM.scrollTop += $, m = !0)
                        }
                    if (p && this.docView.updateSelection(!0), this.viewport.from == l.from && this.viewport.to == l.to && !m && this.measureRequests.length == 0) break
                }
            } finally {
                this.updateState = 0, this.measureScheduled = -1
            }
            if (t && !t.empty)
                for (let o of this.state.facet(Rr)) o(t)
        }
        get themeClasses() {
            return Ir + " " + (this.state.facet(Mr) ? Jo : Ko) + " " + this.state.facet($n)
        }
        updateAttrs() {
            let e = Ol(this, lo, {
                    class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
                }),
                t = {
                    spellcheck: "false",
                    autocorrect: "off",
                    autocapitalize: "off",
                    translate: "no",
                    contenteditable: this.state.facet(hn) ? "true" : "false",
                    class: "cm-content",
                    style: `${b.tabSize}: ${this.state.tabSize}`,
                    role: "textbox",
                    "aria-multiline": "true"
                };
            this.state.readOnly && (t["aria-readonly"] = "true"), Ol(this, zr, t);
            let i = this.observer.ignore(() => {
                let r = vr(this.contentDOM, this.contentAttrs, t),
                    s = vr(this.dom, this.editorAttrs, e);
                return r || s
            });
            return this.editorAttrs = e, this.contentAttrs = t, i
        }
        showAnnouncements(e) {
            let t = !0;
            for (let i of e)
                for (let r of i.effects)
                    if (r.is(w.announce)) {
                        t && (this.announceDOM.textContent = ""), t = !1;
                        let s = this.announceDOM.appendChild(document.createElement("div"));
                        s.textContent = r.value
                    }
        }
        mountStyles() {
            this.styleModules = this.state.facet(bi), Ce.mount(this.root, this.styleModules.concat(au).reverse())
        }
        readMeasured() {
            if (this.updateState == 2) throw new Error("Reading the editor layout isn't allowed during an update");
            this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1)
        }
        requestMeasure(e) {
            if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
                if (e.key != null) {
                    for (let t = 0; t < this.measureRequests.length; t++)
                        if (this.measureRequests[t].key === e.key) {
                            this.measureRequests[t] = e;
                            return
                        }
                }
                this.measureRequests.push(e)
            }
        }
        plugin(e) {
            let t = this.pluginMap.get(e);
            return (t === void 0 || t && t.spec != e) && this.pluginMap.set(e, t = this.plugins.find(i => i.spec == e) || null), t && t.update(this).value
        }
        get documentTop() {
            return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop
        }
        get documentPadding() {
            return {
                top: this.viewState.paddingTop,
                bottom: this.viewState.paddingBottom
            }
        }
        elementAtHeight(e) {
            return this.readMeasured(), this.viewState.elementAtHeight(e)
        }
        lineBlockAtHeight(e) {
            return this.readMeasured(), this.viewState.lineBlockAtHeight(e)
        }
        get viewportLineBlocks() {
            return this.viewState.viewportLines
        }
        lineBlockAt(e) {
            return this.viewState.lineBlockAt(e)
        }
        get contentHeight() {
            return this.viewState.contentHeight
        }
        moveByChar(e, t, i) {
            return Yr(this, e, To(this, e, t, i))
        }
        moveByGroup(e, t) {
            return Yr(this, e, To(this, e, t, i => Dc(this, e.head, i)))
        }
        moveToLineBoundary(e, t, i = !0) {
            return Ec(this, e, t, i)
        }
        moveVertically(e, t, i) {
            return Yr(this, e, Mc(this, e, t, i))
        }
        domAtPos(e) {
            return this.docView.domAtPos(e)
        }
        posAtDOM(e, t = 0) {
            return this.docView.posFromDOM(e, t)
        }
        posAtCoords(e, t = !0) {
            return this.readMeasured(), xo(this, e, t)
        }
        coordsAtPos(e, t = 1) {
            this.readMeasured();
            let i = this.docView.coordsAt(e, t);
            if (!i || i.left == i.right) return i;
            let r = this.state.doc.lineAt(e),
                s = this.bidiSpans(r),
                O = s[Rt.find(s, e - r.from, -1, t)];
            return pr(i, O.dir == H.LTR == t > 0)
        }
        get defaultCharacterWidth() {
            return this.viewState.heightOracle.charWidth
        }
        get defaultLineHeight() {
            return this.viewState.heightOracle.lineHeight
        }
        get textDirection() {
            return this.viewState.defaultTextDirection
        }
        textDirectionAt(e) {
            return !this.state.facet(Oo) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e))
        }
        get lineWrapping() {
            return this.viewState.heightOracle.lineWrapping
        }
        bidiSpans(e) {
            if (e.length > pu) return uo(e.length);
            let t = this.textDirectionAt(e.from);
            for (let r of this.bidiCache)
                if (r.from == e.from && r.dir == t) return r.order;
            let i = zc(e.text, t);
            return this.bidiCache.push(new ki(e.from, e.to, t, i)), i
        }
        get hasFocus() {
            var e;
            return (this.dom.ownerDocument.hasFocus() || b.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM
        }
        focus() {
            this.observer.ignore(() => {
                AO(this.contentDOM), this.docView.updateSelection()
            })
        }
        setRoot(e) {
            this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles())
        }
        destroy() {
            for (let e of this.plugins) e.destroy(this);
            this.plugins = [], this.inputState.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.destroyed = !0
        }
        static scrollIntoView(e, t = {}) {
            return oo.of(new Qi(typeof e == "number" ? y.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin))
        }
        static domEventHandlers(e) {
            return ve.define(() => ({}), {
                eventHandlers: e
            })
        }
        static theme(e, t) {
            let i = Ce.newName(),
                r = [$n.of(i), bi.of(Br(`.${i}`, e))];
            return t && t.dark && r.push(Mr.of(!0)), r
        }
        static baseTheme(e) {
            return ut.lowest(bi.of(Br("." + Ir, e, el)))
        }
        static findFromDOM(e) {
            var t;
            let i = e.querySelector(".cm-content"),
                r = i && A.get(i) || A.get(e);
            return ((t = r == null ? void 0 : r.rootView) === null || t === void 0 ? void 0 : t.view) || null
        }
    };
    w.styleModule = bi;
    w.inputHandler = so;
    w.perLineTextDirection = Oo;
    w.exceptionSink = ro;
    w.updateListener = Rr;
    w.editable = hn;
    w.mouseSelectionStyle = no;
    w.dragMovesSelection = io;
    w.clickAddsSelectionRange = to;
    w.decorations = Si;
    w.atomicRanges = ao;
    w.scrollMargins = ho;
    w.darkTheme = Mr;
    w.contentAttributes = zr;
    w.editorAttributes = lo;
    w.lineWrapping = w.contentAttributes.of({
        class: "cm-lineWrapping"
    });
    w.announce = Z.define();
    var pu = 4096,
        sl = {},
        ki = class {
            constructor(e, t, i, r) {
                this.from = e, this.to = t, this.dir = i, this.order = r
            }
            static update(e, t) {
                if (t.empty) return e;
                let i = [],
                    r = e.length ? e[e.length - 1].dir : H.LTR;
                for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
                    let O = e[s];
                    O.dir == r && !t.touchesRange(O.from, O.to) && i.push(new ki(t.mapPos(O.from, 1), t.mapPos(O.to, -1), O.dir, O.order))
                }
                return i
            }
        };

    function Ol(n, e, t) {
        for (let i = n.state.facet(e), r = i.length - 1; r >= 0; r--) {
            let s = i[r],
                O = typeof s == "function" ? s(n) : s;
            O && Tr(O, t)
        }
        return t
    }
    var mu = b.mac ? "mac" : b.windows ? "win" : b.linux ? "linux" : "key";

    function $u(n, e) {
        let t = n.split(/-(?!$)/),
            i = t[t.length - 1];
        i == "Space" && (i = " ");
        let r, s, O, o;
        for (let l = 0; l < t.length - 1; ++l) {
            let a = t[l];
            if (/^(cmd|meta|m)$/i.test(a)) o = !0;
            else if (/^a(lt)?$/i.test(a)) r = !0;
            else if (/^(c|ctrl|control)$/i.test(a)) s = !0;
            else if (/^s(hift)?$/i.test(a)) O = !0;
            else if (/^mod$/i.test(a)) e == "mac" ? o = !0 : s = !0;
            else throw new Error("Unrecognized modifier name: " + a)
        }
        return r && (i = "Alt-" + i), s && (i = "Ctrl-" + i), o && (i = "Meta-" + i), O && (i = "Shift-" + i), i
    }

    function gn(n, e, t) {
        return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n
    }
    var yu = ut.default(w.domEventHandlers({
            keydown(n, e) {
                return Qu(gu(e.state), n, e, "editor")
            }
        })),
        ii = T.define({
            enables: yu
        }),
        ol = new WeakMap;

    function gu(n) {
        let e = n.facet(ii),
            t = ol.get(e);
        return t || ol.set(e, t = Su(e.reduce((i, r) => i.concat(r), []))), t
    }
    var gt = null,
        bu = 4e3;

    function Su(n, e = mu) {
        let t = Object.create(null),
            i = Object.create(null),
            r = (O, o) => {
                let l = i[O];
                if (l == null) i[O] = o;
                else if (l != o) throw new Error("Key binding " + O + " is used both as a regular binding and as a multi-stroke prefix")
            },
            s = (O, o, l, a) => {
                var h, c;
                let f = t[O] || (t[O] = Object.create(null)),
                    d = o.split(/ (?!$)/).map($ => $u($, e));
                for (let $ = 1; $ < d.length; $++) {
                    let g = d.slice(0, $).join(" ");
                    r(g, !0), f[g] || (f[g] = {
                        preventDefault: !0,
                        run: [S => {
                            let k = gt = {
                                view: S,
                                prefix: g,
                                scope: O
                            };
                            return setTimeout(() => {
                                gt == k && (gt = null)
                            }, bu), !0
                        }]
                    })
                }
                let p = d.join(" ");
                r(p, !1);
                let m = f[p] || (f[p] = {
                    preventDefault: !1,
                    run: ((c = (h = f._any) === null || h === void 0 ? void 0 : h.run) === null || c === void 0 ? void 0 : c.slice()) || []
                });
                l && m.run.push(l), a && (m.preventDefault = !0)
            };
        for (let O of n) {
            let o = O.scope ? O.scope.split(" ") : ["editor"];
            if (O.any)
                for (let a of o) {
                    let h = t[a] || (t[a] = Object.create(null));
                    h._any || (h._any = {
                        preventDefault: !1,
                        run: []
                    });
                    for (let c in h) h[c].run.push(O.any)
                }
            let l = O[e] || O.key;
            if (!!l)
                for (let a of o) s(a, l, O.run, O.preventDefault), O.shift && s(a, "Shift-" + l, O.shift, O.preventDefault)
        }
        return t
    }

    function Qu(n, e, t, i) {
        let r = _O(e),
            s = xe(r, 0),
            O = Ue(s) == r.length && r != " ",
            o = "",
            l = !1;
        gt && gt.view == t && gt.scope == i && (o = gt.prefix + " ", (l = Xo.indexOf(e.keyCode) < 0) && (gt = null));
        let a = new Set,
            h = p => {
                if (p) {
                    for (let m of p.run)
                        if (!a.has(m) && (a.add(m), m(t, e))) return !0;
                    p.preventDefault && (l = !0)
                }
                return !1
            },
            c = n[i],
            f, d;
        if (c) {
            if (h(c[o + gn(r, e, !O)])) return !0;
            if (O && (e.altKey || e.metaKey || e.ctrlKey) && (f = tt[e.keyCode]) && f != r) {
                if (h(c[o + gn(f, e, !0)])) return !0;
                if (e.shiftKey && (d = Ft[e.keyCode]) != r && d != f && h(c[o + gn(d, e, !1)])) return !0
            } else if (O && e.shiftKey && h(c[o + gn(r, e, !0)])) return !0;
            if (h(c._any)) return !0
        }
        return l
    }
    var Pu = !b.ios;
    var xu = {
        ".cm-line": {
            "& ::selection": {
                backgroundColor: "transparent !important"
            },
            "&::selection": {
                backgroundColor: "transparent !important"
            }
        }
    };
    Pu && (xu[".cm-line"].caretColor = "transparent !important");
    var ug = /x/.unicode != null ? "gu" : "g";
    var Lr = "-10000px",
        ll = class {
            constructor(e, t, i) {
                this.facet = t, this.createTooltipView = i, this.input = e.state.facet(t), this.tooltips = this.input.filter(r => r), this.tooltipViews = this.tooltips.map(i)
            }
            update(e) {
                var t;
                let i = e.state.facet(this.facet),
                    r = i.filter(O => O);
                if (i === this.input) {
                    for (let O of this.tooltipViews) O.update && O.update(e);
                    return !1
                }
                let s = [];
                for (let O = 0; O < r.length; O++) {
                    let o = r[O],
                        l = -1;
                    if (!!o) {
                        for (let a = 0; a < this.tooltips.length; a++) {
                            let h = this.tooltips[a];
                            h && h.create == o.create && (l = a)
                        }
                        if (l < 0) s[O] = this.createTooltipView(o);
                        else {
                            let a = s[O] = this.tooltipViews[l];
                            a.update && a.update(e)
                        }
                    }
                }
                for (let O of this.tooltipViews) s.indexOf(O) < 0 && (O.dom.remove(), (t = O.destroy) === null || t === void 0 || t.call(O));
                return this.input = i, this.tooltips = r, this.tooltipViews = s, !0
            }
        };

    function Tu(n) {
        let {
            win: e
        } = n;
        return {
            top: 0,
            left: 0,
            bottom: e.innerHeight,
            right: e.innerWidth
        }
    }
    var Fr = T.define({
            combine: n => {
                var e, t, i;
                return {
                    position: b.ios ? "absolute" : ((e = n.find(r => r.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
                    parent: ((t = n.find(r => r.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
                    tooltipSpace: ((i = n.find(r => r.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || Tu
                }
            }
        }),
        al = ve.fromClass(class {
            constructor(n) {
                this.view = n, this.inView = !0, this.lastTransaction = 0, this.measureTimeout = -1;
                let e = n.state.facet(Fr);
                this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = {
                    read: this.readMeasure.bind(this),
                    write: this.writeMeasure.bind(this),
                    key: this
                }, this.manager = new ll(n, Hr, t => this.createTooltip(t)), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver(t => {
                    Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon()
                }, {
                    threshold: [1]
                }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure()
            }
            createContainer() {
                this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom
            }
            observeIntersection() {
                if (this.intersectionObserver) {
                    this.intersectionObserver.disconnect();
                    for (let n of this.manager.tooltipViews) this.intersectionObserver.observe(n.dom)
                }
            }
            measureSoon() {
                this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
                    this.measureTimeout = -1, this.maybeMeasure()
                }, 50))
            }
            update(n) {
                n.transactions.length && (this.lastTransaction = Date.now());
                let e = this.manager.update(n);
                e && this.observeIntersection();
                let t = e || n.geometryChanged,
                    i = n.state.facet(Fr);
                if (i.position != this.position) {
                    this.position = i.position;
                    for (let r of this.manager.tooltipViews) r.dom.style.position = this.position;
                    t = !0
                }
                if (i.parent != this.parent) {
                    this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
                    for (let r of this.manager.tooltipViews) this.container.appendChild(r.dom);
                    t = !0
                } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
                t && this.maybeMeasure()
            }
            createTooltip(n) {
                let e = n.create(this.view);
                if (e.dom.classList.add("cm-tooltip"), n.arrow && !e.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
                    let t = document.createElement("div");
                    t.className = "cm-tooltip-arrow", e.dom.appendChild(t)
                }
                return e.dom.style.position = this.position, e.dom.style.top = Lr, this.container.appendChild(e.dom), e.mount && e.mount(this.view), e
            }
            destroy() {
                var n, e;
                this.view.win.removeEventListener("resize", this.measureSoon);
                for (let t of this.manager.tooltipViews) t.dom.remove(), (n = t.destroy) === null || n === void 0 || n.call(t);
                (e = this.intersectionObserver) === null || e === void 0 || e.disconnect(), clearTimeout(this.measureTimeout)
            }
            readMeasure() {
                let n = this.view.dom.getBoundingClientRect();
                return {
                    editor: n,
                    parent: this.parent ? this.container.getBoundingClientRect() : n,
                    pos: this.manager.tooltips.map((e, t) => {
                        let i = this.manager.tooltipViews[t];
                        return i.getCoords ? i.getCoords(e.pos) : this.view.coordsAtPos(e.pos)
                    }),
                    size: this.manager.tooltipViews.map(({
                        dom: e
                    }) => e.getBoundingClientRect()),
                    space: this.view.state.facet(Fr).tooltipSpace(this.view)
                }
            }
            writeMeasure(n) {
                let {
                    editor: e,
                    space: t
                } = n, i = [];
                for (let r = 0; r < this.manager.tooltips.length; r++) {
                    let s = this.manager.tooltips[r],
                        O = this.manager.tooltipViews[r],
                        {
                            dom: o
                        } = O,
                        l = n.pos[r],
                        a = n.size[r];
                    if (!l || l.bottom <= Math.max(e.top, t.top) || l.top >= Math.min(e.bottom, t.bottom) || l.right < Math.max(e.left, t.left) - .1 || l.left > Math.min(e.right, t.right) + .1) {
                        o.style.top = Lr;
                        continue
                    }
                    let h = s.arrow ? O.dom.querySelector(".cm-tooltip-arrow") : null,
                        c = h ? 7 : 0,
                        f = a.right - a.left,
                        d = a.bottom - a.top,
                        p = O.offset || ku,
                        m = this.view.textDirection == H.LTR,
                        $ = a.width > t.right - t.left ? m ? t.left : t.right - a.width : m ? Math.min(l.left - (h ? 14 : 0) + p.x, t.right - f) : Math.max(t.left, l.left - f + (h ? 14 : 0) - p.x),
                        g = !!s.above;
                    !s.strictSide && (g ? l.top - (a.bottom - a.top) - p.y < t.top : l.bottom + (a.bottom - a.top) + p.y > t.bottom) && g == t.bottom - l.bottom > l.top - t.top && (g = !g);
                    let S = g ? l.top - d - c - p.y : l.bottom + c + p.y,
                        k = $ + f;
                    if (O.overlap !== !0)
                        for (let x of i) x.left < k && x.right > $ && x.top < S + d && x.bottom > S && (S = g ? x.top - d - 2 - c : x.bottom + c + 2);
                    this.position == "absolute" ? (o.style.top = S - n.parent.top + "px", o.style.left = $ - n.parent.left + "px") : (o.style.top = S + "px", o.style.left = $ + "px"), h && (h.style.left = `${l.left+(m?p.x:-p.x)-($+14-7)}px`), O.overlap !== !0 && i.push({
                        left: $,
                        top: S,
                        right: k,
                        bottom: S + d
                    }), o.classList.toggle("cm-tooltip-above", g), o.classList.toggle("cm-tooltip-below", !g), O.positioned && O.positioned(n.space)
                }
            }
            maybeMeasure() {
                if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
                    for (let n of this.manager.tooltipViews) n.dom.style.top = Lr
            }
        }, {
            eventHandlers: {
                scroll() {
                    this.maybeMeasure()
                }
            }
        }),
        vu = w.baseTheme({
            ".cm-tooltip": {
                zIndex: 100
            },
            "&light .cm-tooltip": {
                border: "1px solid #bbb",
                backgroundColor: "#f5f5f5"
            },
            "&light .cm-tooltip-section:not(:first-child)": {
                borderTop: "1px solid #bbb"
            },
            "&dark .cm-tooltip": {
                backgroundColor: "#333338",
                color: "white"
            },
            ".cm-tooltip-arrow": {
                height: `${7}px`,
                width: `${7*2}px`,
                position: "absolute",
                zIndex: -1,
                overflow: "hidden",
                "&:before, &:after": {
                    content: "''",
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeft: `${7}px solid transparent`,
                    borderRight: `${7}px solid transparent`
                },
                ".cm-tooltip-above &": {
                    bottom: `-${7}px`,
                    "&:before": {
                        borderTop: `${7}px solid #bbb`
                    },
                    "&:after": {
                        borderTop: `${7}px solid #f5f5f5`,
                        bottom: "1px"
                    }
                },
                ".cm-tooltip-below &": {
                    top: `-${7}px`,
                    "&:before": {
                        borderBottom: `${7}px solid #bbb`
                    },
                    "&:after": {
                        borderBottom: `${7}px solid #f5f5f5`,
                        top: "1px"
                    }
                }
            },
            "&dark .cm-tooltip .cm-tooltip-arrow": {
                "&:before": {
                    borderTopColor: "#333338",
                    borderBottomColor: "#333338"
                },
                "&:after": {
                    borderTopColor: "transparent",
                    borderBottomColor: "transparent"
                }
            }
        }),
        ku = {
            x: 0,
            y: 0
        },
        Hr = T.define({
            enables: [al, vu]
        });

    function hl(n, e) {
        let t = n.plugin(al);
        if (!t) return null;
        let i = t.manager.tooltips.indexOf(e);
        return i < 0 ? null : t.manager.tooltipViews[i]
    }
    var st = class extends Ne {
        compare(e) {
            return this == e || this.constructor == e.constructor && this.eq(e)
        }
        eq(e) {
            return !1
        }
        destroy(e) {}
    };
    st.prototype.elementClass = "";
    st.prototype.toDOM = void 0;
    st.prototype.mapMode = re.TrackBefore;
    st.prototype.startSide = st.prototype.endSide = -1;
    st.prototype.point = !0;
    var Kr = T.define();
    var Qn = T.define();
    var Jr = T.define({
        combine: n => n.some(e => e)
    });

    function Xu(n) {
        let e = [wu];
        return n && n.fixed === !1 && e.push(Jr.of(!0)), e
    }
    var wu = ve.fromClass(class {
        constructor(n) {
            this.view = n, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight + "px", this.gutters = n.state.facet(Qn).map(e => new es(n, e));
            for (let e of this.gutters) this.dom.appendChild(e.dom);
            this.fixed = !n.state.facet(Jr), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM)
        }
        update(n) {
            if (this.updateGutters(n)) {
                let e = this.prevViewport,
                    t = n.view.viewport,
                    i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
                this.syncGutters(i < (t.to - t.from) * .8)
            }
            n.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight + "px"), this.view.state.facet(Jr) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = n.view.viewport
        }
        syncGutters(n) {
            let e = this.dom.nextSibling;
            n && this.dom.remove();
            let t = U.iter(this.view.state.facet(Kr), this.view.viewport.from),
                i = [],
                r = this.gutters.map(s => new ul(s, this.view.viewport, -this.view.documentPadding.top));
            for (let s of this.view.viewportLineBlocks) {
                let O;
                if (Array.isArray(s.type)) {
                    for (let o of s.type)
                        if (o.type == N.Text) {
                            O = o;
                            break
                        }
                } else O = s.type == N.Text ? s : void 0;
                if (!!O) {
                    i.length && (i = []), cl(t, i, s.from);
                    for (let o of r) o.line(this.view, O, i)
                }
            }
            for (let s of r) s.finish();
            n && this.view.scrollDOM.insertBefore(this.dom, e)
        }
        updateGutters(n) {
            let e = n.startState.facet(Qn),
                t = n.state.facet(Qn),
                i = n.docChanged || n.heightChanged || n.viewportChanged || !U.eq(n.startState.facet(Kr), n.state.facet(Kr), n.view.viewport.from, n.view.viewport.to);
            if (e == t)
                for (let r of this.gutters) r.update(n) && (i = !0);
            else {
                i = !0;
                let r = [];
                for (let s of t) {
                    let O = e.indexOf(s);
                    O < 0 ? r.push(new es(this.view, s)) : (this.gutters[O].update(n), r.push(this.gutters[O]))
                }
                for (let s of this.gutters) s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
                for (let s of r) this.dom.appendChild(s.dom);
                this.gutters = r
            }
            return i
        }
        destroy() {
            for (let n of this.gutters) n.destroy();
            this.dom.remove()
        }
    }, {
        provide: n => w.scrollMargins.of(e => {
            let t = e.plugin(n);
            return !t || t.gutters.length == 0 || !t.fixed ? null : e.textDirection == H.LTR ? {
                left: t.dom.offsetWidth
            } : {
                right: t.dom.offsetWidth
            }
        })
    });

    function fl(n) {
        return Array.isArray(n) ? n : [n]
    }

    function cl(n, e, t) {
        for (; n.value && n.from <= t;) n.from == t && e.push(n.value), n.next()
    }
    var ul = class {
            constructor(e, t, i) {
                this.gutter = e, this.height = i, this.localMarkers = [], this.i = 0, this.cursor = U.iter(e.markers, t.from)
            }
            line(e, t, i) {
                this.localMarkers.length && (this.localMarkers = []), cl(this.cursor, this.localMarkers, t.from);
                let r = i.length ? this.localMarkers.concat(i) : this.localMarkers,
                    s = this.gutter.config.lineMarker(e, t, r);
                s && r.unshift(s);
                let O = this.gutter;
                if (r.length == 0 && !O.config.renderEmptyElements) return;
                let o = t.top - this.height;
                if (this.i == O.elements.length) {
                    let l = new ts(e, t.height, o, r);
                    O.elements.push(l), O.dom.appendChild(l.dom)
                } else O.elements[this.i].update(e, t.height, o, r);
                this.height = t.bottom, this.i++
            }
            finish() {
                let e = this.gutter;
                for (; e.elements.length > this.i;) {
                    let t = e.elements.pop();
                    e.dom.removeChild(t.dom), t.destroy()
                }
            }
        },
        es = class {
            constructor(e, t) {
                this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
                for (let i in t.domEventHandlers) this.dom.addEventListener(i, r => {
                    let s = e.lineBlockAtHeight(r.clientY - e.documentTop);
                    t.domEventHandlers[i](e, s, r) && r.preventDefault()
                });
                this.markers = fl(t.markers(e)), t.initialSpacer && (this.spacer = new ts(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none")
            }
            update(e) {
                let t = this.markers;
                if (this.markers = fl(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
                    let r = this.config.updateSpacer(this.spacer.markers[0], e);
                    r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r])
                }
                let i = e.view.viewport;
                return !U.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1)
            }
            destroy() {
                for (let e of this.elements) e.destroy()
            }
        },
        ts = class {
            constructor(e, t, i, r) {
                this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, r)
            }
            update(e, t, i, r) {
                this.height != t && (this.dom.style.height = (this.height = t) + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Ru(this.markers, r) || this.setMarkers(e, r)
            }
            setMarkers(e, t) {
                let i = "cm-gutterElement",
                    r = this.dom.firstChild;
                for (let s = 0, O = 0;;) {
                    let o = O,
                        l = s < t.length ? t[s++] : null,
                        a = !1;
                    if (l) {
                        let h = l.elementClass;
                        h && (i += " " + h);
                        for (let c = O; c < this.markers.length; c++)
                            if (this.markers[c].compare(l)) {
                                o = c, a = !0;
                                break
                            }
                    } else o = this.markers.length;
                    for (; O < o;) {
                        let h = this.markers[O++];
                        if (h.toDOM) {
                            h.destroy(r);
                            let c = r.nextSibling;
                            r.remove(), r = c
                        }
                    }
                    if (!l) break;
                    l.toDOM && (a ? r = r.nextSibling : this.dom.insertBefore(l.toDOM(e), r)), a && O++
                }
                this.dom.className = i, this.markers = t
            }
            destroy() {
                this.setMarkers(null, [])
            }
        };

    function Ru(n, e) {
        if (n.length != e.length) return !1;
        for (let t = 0; t < n.length; t++)
            if (!n[t].compare(e[t])) return !1;
        return !0
    }
    var zu = T.define(),
        ni = T.define({
            combine(n) {
                return It(n, {
                    formatNumber: String,
                    domEventHandlers: {}
                }, {
                    domEventHandlers(e, t) {
                        let i = Object.assign({}, e);
                        for (let r in t) {
                            let s = i[r],
                                O = t[r];
                            i[r] = s ? (o, l, a) => s(o, l, a) || O(o, l, a) : O
                        }
                        return i
                    }
                })
            }
        }),
        yn = class extends st {
            constructor(e) {
                super();
                this.number = e
            }
            eq(e) {
                return this.number == e.number
            }
            toDOM() {
                return document.createTextNode(this.number)
            }
        };

    function is(n, e) {
        return n.state.facet(ni).formatNumber(e, n.state)
    }
    var Wu = Qn.compute([ni], n => ({
        class: "cm-lineNumbers",
        renderEmptyElements: !1,
        markers(e) {
            return e.state.facet(zu)
        },
        lineMarker(e, t, i) {
            return i.some(r => r.toDOM) ? null : new yn(is(e, e.state.doc.lineAt(t.from).number))
        },
        lineMarkerChange: e => e.startState.facet(ni) != e.state.facet(ni),
        initialSpacer(e) {
            return new yn(is(e, dl(e.state.doc.lines)))
        },
        updateSpacer(e, t) {
            let i = is(t.view, dl(t.view.state.doc.lines));
            return i == e.number ? e : new yn(i)
        },
        domEventHandlers: n.facet(ni).domEventHandlers
    }));

    function pl(n = {}) {
        return [ni.of(n), Xu(), Wu]
    }

    function dl(n) {
        let e = 9;
        for (; e < n;) e = e * 10 + 9;
        return e
    }
    var ns = 1024,
        qu = 0,
        Se = class {
            constructor(e, t) {
                this.from = e, this.to = t
            }
        },
        R = class {
            constructor(e = {}) {
                this.id = qu++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
                    throw new Error("This node type doesn't define a deserialize function")
                })
            }
            add(e) {
                if (this.perNode) throw new RangeError("Can't add per-node props to node types");
                return typeof e != "function" && (e = ee.match(e)), t => {
                    let i = e(t);
                    return i === void 0 ? null : [this, i]
                }
            }
        };
    R.closedBy = new R({
        deserialize: n => n.split(" ")
    });
    R.openedBy = new R({
        deserialize: n => n.split(" ")
    });
    R.group = new R({
        deserialize: n => n.split(" ")
    });
    R.contextHash = new R({
        perNode: !0
    });
    R.lookAhead = new R({
        perNode: !0
    });
    R.mounted = new R({
        perNode: !0
    });
    var ml = class {
            constructor(e, t, i) {
                this.tree = e, this.overlay = t, this.parser = i
            }
        },
        Zu = Object.create(null),
        ee = class {
            constructor(e, t, i, r = 0) {
                this.name = e, this.props = t, this.id = i, this.flags = r
            }
            static define(e) {
                let t = e.props && e.props.length ? Object.create(null) : Zu,
                    i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0),
                    r = new ee(e.name || "", t, e.id, i);
                if (e.props) {
                    for (let s of e.props)
                        if (Array.isArray(s) || (s = s(r)), s) {
                            if (s[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
                            t[s[0].id] = s[1]
                        }
                }
                return r
            }
            prop(e) {
                return this.props[e.id]
            }
            get isTop() {
                return (this.flags & 1) > 0
            }
            get isSkipped() {
                return (this.flags & 2) > 0
            }
            get isError() {
                return (this.flags & 4) > 0
            }
            get isAnonymous() {
                return (this.flags & 8) > 0
            }
            is(e) {
                if (typeof e == "string") {
                    if (this.name == e) return !0;
                    let t = this.prop(R.group);
                    return t ? t.indexOf(e) > -1 : !1
                }
                return this.id == e
            }
            static match(e) {
                let t = Object.create(null);
                for (let i in e)
                    for (let r of i.split(" ")) t[r] = e[i];
                return i => {
                    for (let r = i.prop(R.group), s = -1; s < (r ? r.length : 0); s++) {
                        let O = t[s < 0 ? i.name : r[s]];
                        if (O) return O
                    }
                }
            }
        };
    ee.none = new ee("", Object.create(null), 0, 8);
    var ri = class {
            constructor(e) {
                this.types = e;
                for (let t = 0; t < e.length; t++)
                    if (e[t].id != t) throw new RangeError("Node type ids should correspond to array positions when creating a node set")
            }
            extend(...e) {
                let t = [];
                for (let i of this.types) {
                    let r = null;
                    for (let s of e) {
                        let O = s(i);
                        O && (r || (r = Object.assign({}, i.props)), r[O[0].id] = O[1])
                    }
                    t.push(r ? new ee(i.name, r, i.id, i.flags) : i)
                }
                return new ri(t)
            }
        },
        Sn = new WeakMap,
        $l = new WeakMap,
        C;
    (function(n) {
        n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays"
    })(C || (C = {}));
    var j = class {
        constructor(e, t, i, r, s) {
            if (this.type = e, this.children = t, this.positions = i, this.length = r, this.props = null, s && s.length) {
                this.props = Object.create(null);
                for (let [O, o] of s) this.props[typeof O == "number" ? O : O.id] = o
            }
        }
        toString() {
            let e = this.prop(R.mounted);
            if (e && !e.overlay) return e.tree.toString();
            let t = "";
            for (let i of this.children) {
                let r = i.toString();
                r && (t && (t += ","), t += r)
            }
            return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t
        }
        cursor(e = 0) {
            return new Oi(this.topNode, e)
        }
        cursorAt(e, t = 0, i = 0) {
            let r = Sn.get(this) || this.topNode,
                s = new Oi(r);
            return s.moveTo(e, t), Sn.set(this, s._tree), s
        }
        get topNode() {
            return new be(this, 0, 0, null)
        }
        resolve(e, t = 0) {
            let i = si(Sn.get(this) || this.topNode, e, t, !1);
            return Sn.set(this, i), i
        }
        resolveInner(e, t = 0) {
            let i = si($l.get(this) || this.topNode, e, t, !0);
            return $l.set(this, i), i
        }
        iterate(e) {
            let {
                enter: t,
                leave: i,
                from: r = 0,
                to: s = this.length
            } = e;
            for (let O = this.cursor((e.mode || 0) | C.IncludeAnonymous);;) {
                let o = !1;
                if (O.from <= s && O.to >= r && (O.type.isAnonymous || t(O) !== !1)) {
                    if (O.firstChild()) continue;
                    o = !0
                }
                for (; o && i && !O.type.isAnonymous && i(O), !O.nextSibling();) {
                    if (!O.parent()) return;
                    o = !0
                }
            }
        }
        prop(e) {
            return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e)
        }
        get propValues() {
            let e = [];
            if (this.props)
                for (let t in this.props) e.push([+t, this.props[t]]);
            return e
        }
        balance(e = {}) {
            return this.children.length <= 8 ? this : rs(ee.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, r) => new j(this.type, t, i, r, this.propValues), e.makeTree || ((t, i, r) => new j(ee.none, t, i, r)))
        }
        static build(e) {
            return _u(e)
        }
    };
    j.empty = new j(ee.none, [], [], 0);
    var bn = class {
            constructor(e, t) {
                this.buffer = e, this.index = t
            }
            get id() {
                return this.buffer[this.index - 4]
            }
            get start() {
                return this.buffer[this.index - 3]
            }
            get end() {
                return this.buffer[this.index - 2]
            }
            get size() {
                return this.buffer[this.index - 1]
            }
            get pos() {
                return this.index
            }
            next() {
                this.index -= 4
            }
            fork() {
                return new bn(this.buffer, this.index)
            }
        },
        Qt = class {
            constructor(e, t, i) {
                this.buffer = e, this.length = t, this.set = i
            }
            get type() {
                return ee.none
            }
            toString() {
                let e = [];
                for (let t = 0; t < this.buffer.length;) e.push(this.childString(t)), t = this.buffer[t + 3];
                return e.join(",")
            }
            childString(e) {
                let t = this.buffer[e],
                    i = this.buffer[e + 3],
                    r = this.set.types[t],
                    s = r.name;
                if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, i == e) return s;
                let O = [];
                for (; e < i;) O.push(this.childString(e)), e = this.buffer[e + 3];
                return s + "(" + O.join(",") + ")"
            }
            findChild(e, t, i, r, s) {
                let {
                    buffer: O
                } = this, o = -1;
                for (let l = e; l != t && !(gl(s, r, O[l + 1], O[l + 2]) && (o = l, i > 0)); l = O[l + 3]);
                return o
            }
            slice(e, t, i) {
                let r = this.buffer,
                    s = new Uint16Array(t - e),
                    O = 0;
                for (let o = e, l = 0; o < t;) {
                    s[l++] = r[o++], s[l++] = r[o++] - i;
                    let a = s[l++] = r[o++] - i;
                    s[l++] = r[o++] - e, O = Math.max(O, a)
                }
                return new Qt(s, O, this.set)
            }
        };

    function gl(n, e, t, i) {
        switch (n) {
            case -2:
                return t < e;
            case -1:
                return i >= e && t < e;
            case 0:
                return t < e && i > e;
            case 1:
                return t <= e && i > e;
            case 2:
                return i > e;
            case 4:
                return !0
        }
    }

    function Ql(n, e) {
        let t = n.childBefore(e);
        for (; t;) {
            let i = t.lastChild;
            if (!i || i.to != t.to) break;
            i.type.isError && i.from == i.to ? (n = t, t = i.prevSibling) : t = i
        }
        return n
    }

    function si(n, e, t, i) {
        for (var r; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e);) {
            let O = !i && n instanceof be && n.index < 0 ? null : n.parent;
            if (!O) return n;
            n = O
        }
        let s = i ? 0 : C.IgnoreOverlays;
        if (i)
            for (let O = n, o = O.parent; o; O = o, o = O.parent) O instanceof be && O.index < 0 && ((r = o.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != O.from && (n = o);
        for (;;) {
            let O = n.enter(e, t, s);
            if (!O) return n;
            n = O
        }
    }
    var be = class {
        constructor(e, t, i, r) {
            this._tree = e, this.from = t, this.index = i, this._parent = r
        }
        get type() {
            return this._tree.type
        }
        get name() {
            return this._tree.type.name
        }
        get to() {
            return this.from + this._tree.length
        }
        nextChild(e, t, i, r, s = 0) {
            for (let O = this;;) {
                for (let {
                        children: o,
                        positions: l
                    } = O._tree, a = t > 0 ? o.length : -1; e != a; e += t) {
                    let h = o[e],
                        c = l[e] + O.from;
                    if (!!gl(r, i, c, c + h.length)) {
                        if (h instanceof Qt) {
                            if (s & C.ExcludeBuffers) continue;
                            let f = h.findChild(0, h.buffer.length, t, i - c, r);
                            if (f > -1) return new je(new yl(O, h, e, c), null, f)
                        } else if (s & C.IncludeAnonymous || !h.type.isAnonymous || ss(h)) {
                            let f;
                            if (!(s & C.IgnoreMounts) && h.props && (f = h.prop(R.mounted)) && !f.overlay) return new be(f.tree, c, e, O);
                            let d = new be(h, c, e, O);
                            return s & C.IncludeAnonymous || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? h.children.length - 1 : 0, t, i, r)
                        }
                    }
                }
                if (s & C.IncludeAnonymous || !O.type.isAnonymous || (O.index >= 0 ? e = O.index + t : e = t < 0 ? -1 : O._parent._tree.children.length, O = O._parent, !O)) return null
            }
        }
        get firstChild() {
            return this.nextChild(0, 1, 0, 4)
        }
        get lastChild() {
            return this.nextChild(this._tree.children.length - 1, -1, 0, 4)
        }
        childAfter(e) {
            return this.nextChild(0, 1, e, 2)
        }
        childBefore(e) {
            return this.nextChild(this._tree.children.length - 1, -1, e, -2)
        }
        enter(e, t, i = 0) {
            let r;
            if (!(i & C.IgnoreOverlays) && (r = this._tree.prop(R.mounted)) && r.overlay) {
                let s = e - this.from;
                for (let {
                        from: O,
                        to: o
                    } of r.overlay)
                    if ((t > 0 ? O <= s : O < s) && (t < 0 ? o >= s : o > s)) return new be(r.tree, r.overlay[0].from + this.from, -1, this)
            }
            return this.nextChild(0, 1, e, t, i)
        }
        nextSignificantParent() {
            let e = this;
            for (; e.type.isAnonymous && e._parent;) e = e._parent;
            return e
        }
        get parent() {
            return this._parent ? this._parent.nextSignificantParent() : null
        }
        get nextSibling() {
            return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null
        }
        get prevSibling() {
            return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null
        }
        cursor(e = 0) {
            return new Oi(this, e)
        }
        get tree() {
            return this._tree
        }
        toTree() {
            return this._tree
        }
        resolve(e, t = 0) {
            return si(this, e, t, !1)
        }
        resolveInner(e, t = 0) {
            return si(this, e, t, !0)
        }
        enterUnfinishedNodesBefore(e) {
            return Ql(this, e)
        }
        getChild(e, t = null, i = null) {
            let r = Pn(this, e, t, i);
            return r.length ? r[0] : null
        }
        getChildren(e, t = null, i = null) {
            return Pn(this, e, t, i)
        }
        toString() {
            return this._tree.toString()
        }
        get node() {
            return this
        }
        matchContext(e) {
            return xn(this, e)
        }
    };

    function Pn(n, e, t, i) {
        let r = n.cursor(),
            s = [];
        if (!r.firstChild()) return s;
        if (t != null) {
            for (; !r.type.is(t);)
                if (!r.nextSibling()) return s
        }
        for (;;) {
            if (i != null && r.type.is(i)) return s;
            if (r.type.is(e) && s.push(r.node), !r.nextSibling()) return i == null ? s : []
        }
    }

    function xn(n, e, t = e.length - 1) {
        for (let i = n.parent; t >= 0; i = i.parent) {
            if (!i) return !1;
            if (!i.type.isAnonymous) {
                if (e[t] && e[t] != i.name) return !1;
                t--
            }
        }
        return !0
    }
    var yl = class {
            constructor(e, t, i, r) {
                this.parent = e, this.buffer = t, this.index = i, this.start = r
            }
        },
        je = class {
            get name() {
                return this.type.name
            }
            get from() {
                return this.context.start + this.context.buffer.buffer[this.index + 1]
            }
            get to() {
                return this.context.start + this.context.buffer.buffer[this.index + 2]
            }
            constructor(e, t, i) {
                this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]]
            }
            child(e, t, i) {
                let {
                    buffer: r
                } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, i);
                return s < 0 ? null : new je(this.context, this, s)
            }
            get firstChild() {
                return this.child(1, 0, 4)
            }
            get lastChild() {
                return this.child(-1, 0, 4)
            }
            childAfter(e) {
                return this.child(1, e, 2)
            }
            childBefore(e) {
                return this.child(-1, e, -2)
            }
            enter(e, t, i = 0) {
                if (i & C.ExcludeBuffers) return null;
                let {
                    buffer: r
                } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
                return s < 0 ? null : new je(this.context, this, s)
            }
            get parent() {
                return this._parent || this.context.parent.nextSignificantParent()
            }
            externalSibling(e) {
                return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4)
            }
            get nextSibling() {
                let {
                    buffer: e
                } = this.context, t = e.buffer[this.index + 3];
                return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new je(this.context, this._parent, t) : this.externalSibling(1)
            }
            get prevSibling() {
                let {
                    buffer: e
                } = this.context, t = this._parent ? this._parent.index + 4 : 0;
                return this.index == t ? this.externalSibling(-1) : new je(this.context, this._parent, e.findChild(t, this.index, -1, 0, 4))
            }
            cursor(e = 0) {
                return new Oi(this, e)
            }
            get tree() {
                return null
            }
            toTree() {
                let e = [],
                    t = [],
                    {
                        buffer: i
                    } = this.context,
                    r = this.index + 4,
                    s = i.buffer[this.index + 3];
                if (s > r) {
                    let O = i.buffer[this.index + 1];
                    e.push(i.slice(r, s, O)), t.push(0)
                }
                return new j(this.type, e, t, this.to - this.from)
            }
            resolve(e, t = 0) {
                return si(this, e, t, !1)
            }
            resolveInner(e, t = 0) {
                return si(this, e, t, !0)
            }
            enterUnfinishedNodesBefore(e) {
                return Ql(this, e)
            }
            toString() {
                return this.context.buffer.childString(this.index)
            }
            getChild(e, t = null, i = null) {
                let r = Pn(this, e, t, i);
                return r.length ? r[0] : null
            }
            getChildren(e, t = null, i = null) {
                return Pn(this, e, t, i)
            }
            get node() {
                return this
            }
            matchContext(e) {
                return xn(this, e)
            }
        },
        Oi = class {
            get name() {
                return this.type.name
            }
            constructor(e, t = 0) {
                if (this.mode = t, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, e instanceof be) this.yieldNode(e);
                else {
                    this._tree = e.context.parent, this.buffer = e.context;
                    for (let i = e._parent; i; i = i._parent) this.stack.unshift(i.index);
                    this.bufferNode = e, this.yieldBuf(e.index)
                }
            }
            yieldNode(e) {
                return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1
            }
            yieldBuf(e, t) {
                this.index = e;
                let {
                    start: i,
                    buffer: r
                } = this.buffer;
                return this.type = t || r.set.types[r.buffer[e]], this.from = i + r.buffer[e + 1], this.to = i + r.buffer[e + 2], !0
            }
            yield(e) {
                return e ? e instanceof be ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1
            }
            toString() {
                return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString()
            }
            enterChild(e, t, i) {
                if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
                let {
                    buffer: r
                } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, i);
                return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s))
            }
            firstChild() {
                return this.enterChild(1, 0, 4)
            }
            lastChild() {
                return this.enterChild(-1, 0, 4)
            }
            childAfter(e) {
                return this.enterChild(1, e, 2)
            }
            childBefore(e) {
                return this.enterChild(-1, e, -2)
            }
            enter(e, t, i = this.mode) {
                return this.buffer ? i & C.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i))
            }
            parent() {
                if (!this.buffer) return this.yieldNode(this.mode & C.IncludeAnonymous ? this._tree._parent : this._tree.parent);
                if (this.stack.length) return this.yieldBuf(this.stack.pop());
                let e = this.mode & C.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
                return this.buffer = null, this.yieldNode(e)
            }
            sibling(e) {
                if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
                let {
                    buffer: t
                } = this.buffer, i = this.stack.length - 1;
                if (e < 0) {
                    let r = i < 0 ? 0 : this.stack[i] + 4;
                    if (this.index != r) return this.yieldBuf(t.findChild(r, this.index, -1, 0, 4))
                } else {
                    let r = t.buffer[this.index + 3];
                    if (r < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3])) return this.yieldBuf(r)
                }
                return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1
            }
            nextSibling() {
                return this.sibling(1)
            }
            prevSibling() {
                return this.sibling(-1)
            }
            atLastNode(e) {
                let t, i, {
                    buffer: r
                } = this;
                if (r) {
                    if (e > 0) {
                        if (this.index < r.buffer.buffer.length) return !1
                    } else
                        for (let s = 0; s < this.index; s++)
                            if (r.buffer.buffer[s + 3] < this.index) return !1;
                    ({
                        index: t,
                        parent: i
                    } = r)
                } else({
                    index: t,
                    _parent: i
                } = this._tree);
                for (; i; {
                        index: t,
                        _parent: i
                    } = i)
                    if (t > -1)
                        for (let s = t + e, O = e < 0 ? -1 : i._tree.children.length; s != O; s += e) {
                            let o = i._tree.children[s];
                            if (this.mode & C.IncludeAnonymous || o instanceof Qt || !o.type.isAnonymous || ss(o)) return !1
                        }
                return !0
            }
            move(e, t) {
                if (t && this.enterChild(e, 0, 4)) return !0;
                for (;;) {
                    if (this.sibling(e)) return !0;
                    if (this.atLastNode(e) || !this.parent()) return !1
                }
            }
            next(e = !0) {
                return this.move(1, e)
            }
            prev(e = !0) {
                return this.move(-1, e)
            }
            moveTo(e, t = 0) {
                for (;
                    (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(););
                for (; this.enterChild(1, e, t););
                return this
            }
            get node() {
                if (!this.buffer) return this._tree;
                let e = this.bufferNode,
                    t = null,
                    i = 0;
                if (e && e.context == this.buffer) {
                    e: for (let r = this.index, s = this.stack.length; s >= 0;) {
                        for (let O = e; O; O = O._parent)
                            if (O.index == r) {
                                if (r == this.index) return O;
                                t = O, i = s + 1;
                                break e
                            }
                        r = this.stack[--s]
                    }
                }
                for (let r = i; r < this.stack.length; r++) t = new je(this.buffer, t, this.stack[r]);
                return this.bufferNode = new je(this.buffer, t, this.index)
            }
            get tree() {
                return this.buffer ? null : this._tree._tree
            }
            iterate(e, t) {
                for (let i = 0;;) {
                    let r = !1;
                    if (this.type.isAnonymous || e(this) !== !1) {
                        if (this.firstChild()) {
                            i++;
                            continue
                        }
                        this.type.isAnonymous || (r = !0)
                    }
                    for (; r && t && t(this), r = this.type.isAnonymous, !this.nextSibling();) {
                        if (!i) return;
                        this.parent(), i--, r = !0
                    }
                }
            }
            matchContext(e) {
                if (!this.buffer) return xn(this.node, e);
                let {
                    buffer: t
                } = this.buffer, {
                    types: i
                } = t.set;
                for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
                    if (s < 0) return xn(this.node, e, r);
                    let O = i[t.buffer[this.stack[s]]];
                    if (!O.isAnonymous) {
                        if (e[r] && e[r] != O.name) return !1;
                        r--
                    }
                }
                return !0
            }
        };

    function ss(n) {
        return n.children.some(e => e instanceof Qt || !e.type.isAnonymous || ss(e))
    }

    function _u(n) {
        var e;
        let {
            buffer: t,
            nodeSet: i,
            maxBufferLength: r = ns,
            reused: s = [],
            minRepeatType: O = i.types.length
        } = n, o = Array.isArray(t) ? new bn(t, t.length) : t, l = i.types, a = 0, h = 0;

        function c(x, X, v, W, ne) {
            let {
                id: V,
                start: q,
                end: M,
                size: de
            } = o, qe = h;
            for (; de < 0;)
                if (o.next(), de == -1) {
                    let at = s[V];
                    v.push(at), W.push(q - x);
                    return
                } else if (de == -3) {
                a = V;
                return
            } else if (de == -4) {
                h = V;
                return
            } else throw new RangeError(`Unrecognized record size: ${de}`);
            let Yt = l[V],
                lt, Je, iO = q - x;
            if (M - q <= r && (Je = m(o.pos - X, ne))) {
                let at = new Uint16Array(Je.size - Je.skip),
                    Ze = o.pos - Je.size,
                    et = at.length;
                for (; o.pos > Ze;) et = $(Je.start, at, et);
                lt = new Qt(at, M - Je.start, i), iO = Je.start - x
            } else {
                let at = o.pos - de;
                o.next();
                let Ze = [],
                    et = [],
                    kt = V >= O ? V : -1,
                    jt = 0,
                    Bi = M;
                for (; o.pos > at;) kt >= 0 && o.id == kt && o.size >= 0 ? (o.end <= Bi - r && (d(Ze, et, q, jt, o.end, Bi, kt, qe), jt = Ze.length, Bi = o.end), o.next()) : c(q, at, Ze, et, kt);
                if (kt >= 0 && jt > 0 && jt < Ze.length && d(Ze, et, q, jt, q, Bi, kt, qe), Ze.reverse(), et.reverse(), kt > -1 && jt > 0) {
                    let nO = f(Yt);
                    lt = rs(Yt, Ze, et, 0, Ze.length, 0, M - q, nO, nO)
                } else lt = p(Yt, Ze, et, M - q, qe - M)
            }
            v.push(lt), W.push(iO)
        }

        function f(x) {
            return (X, v, W) => {
                let ne = 0,
                    V = X.length - 1,
                    q, M;
                if (V >= 0 && (q = X[V]) instanceof j) {
                    if (!V && q.type == x && q.length == W) return q;
                    (M = q.prop(R.lookAhead)) && (ne = v[V] + q.length + M)
                }
                return p(x, X, v, W, ne)
            }
        }

        function d(x, X, v, W, ne, V, q, M) {
            let de = [],
                qe = [];
            for (; x.length > W;) de.push(x.pop()), qe.push(X.pop() + v - ne);
            x.push(p(i.types[q], de, qe, V - ne, M - V)), X.push(ne - v)
        }

        function p(x, X, v, W, ne = 0, V) {
            if (a) {
                let q = [R.contextHash, a];
                V = V ? [q].concat(V) : [q]
            }
            if (ne > 25) {
                let q = [R.lookAhead, ne];
                V = V ? [q].concat(V) : [q]
            }
            return new j(x, X, v, W, V)
        }

        function m(x, X) {
            let v = o.fork(),
                W = 0,
                ne = 0,
                V = 0,
                q = v.end - r,
                M = {
                    size: 0,
                    start: 0,
                    skip: 0
                };
            e: for (let de = v.pos - x; v.pos > de;) {
                let qe = v.size;
                if (v.id == X && qe >= 0) {
                    M.size = W, M.start = ne, M.skip = V, V += 4, W += 4, v.next();
                    continue
                }
                let Yt = v.pos - qe;
                if (qe < 0 || Yt < de || v.start < q) break;
                let lt = v.id >= O ? 4 : 0,
                    Je = v.start;
                for (v.next(); v.pos > Yt;) {
                    if (v.size < 0)
                        if (v.size == -3) lt += 4;
                        else break e;
                    else v.id >= O && (lt += 4);
                    v.next()
                }
                ne = Je, W += qe, V += lt
            }
            return (X < 0 || W == x) && (M.size = W, M.start = ne, M.skip = V), M.size > 4 ? M : void 0
        }

        function $(x, X, v) {
            let {
                id: W,
                start: ne,
                end: V,
                size: q
            } = o;
            if (o.next(), q >= 0 && W < O) {
                let M = v;
                if (q > 4) {
                    let de = o.pos - (q - 4);
                    for (; o.pos > de;) v = $(x, X, v)
                }
                X[--v] = M, X[--v] = V - x, X[--v] = ne - x, X[--v] = W
            } else q == -3 ? a = W : q == -4 && (h = W);
            return v
        }
        let g = [],
            S = [];
        for (; o.pos > 0;) c(n.start || 0, n.bufferStart || 0, g, S, -1);
        let k = (e = n.length) !== null && e !== void 0 ? e : g.length ? S[0] + g[0].length : 0;
        return new j(l[n.topID], g.reverse(), S.reverse(), k)
    }
    var Sl = new WeakMap;

    function Tn(n, e) {
        if (!n.isAnonymous || e instanceof Qt || e.type != n) return 1;
        let t = Sl.get(e);
        if (t == null) {
            t = 1;
            for (let i of e.children) {
                if (i.type != n || !(i instanceof j)) {
                    t = 1;
                    break
                }
                t += Tn(n, i)
            }
            Sl.set(e, t)
        }
        return t
    }

    function rs(n, e, t, i, r, s, O, o, l) {
        let a = 0;
        for (let p = i; p < r; p++) a += Tn(n, e[p]);
        let h = Math.ceil(a * 1.5 / 8),
            c = [],
            f = [];

        function d(p, m, $, g, S) {
            for (let k = $; k < g;) {
                let x = k,
                    X = m[k],
                    v = Tn(n, p[k]);
                for (k++; k < g; k++) {
                    let W = Tn(n, p[k]);
                    if (v + W >= h) break;
                    v += W
                }
                if (k == x + 1) {
                    if (v > h) {
                        let W = p[x];
                        d(W.children, W.positions, 0, W.children.length, m[x] + S);
                        continue
                    }
                    c.push(p[x])
                } else {
                    let W = m[k - 1] + p[k - 1].length - X;
                    c.push(rs(n, p, m, x, k, X, W, null, l))
                }
                f.push(X + S - s)
            }
        }
        return d(e, t, i, r, 0), (o || l)(c, f, O)
    }
    var Os = class {
            constructor() {
                this.map = new WeakMap
            }
            setBuffer(e, t, i) {
                let r = this.map.get(e);
                r || this.map.set(e, r = new Map), r.set(t, i)
            }
            getBuffer(e, t) {
                let i = this.map.get(e);
                return i && i.get(t)
            }
            set(e, t) {
                e instanceof je ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof be && this.map.set(e.tree, t)
            }
            get(e) {
                return e instanceof je ? this.getBuffer(e.context.buffer, e.index) : e instanceof be ? this.map.get(e.tree) : void 0
            }
            cursorSet(e, t) {
                e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t)
            }
            cursorGet(e) {
                return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree)
            }
        },
        Ge = class {
            constructor(e, t, i, r, s = !1, O = !1) {
                this.from = e, this.to = t, this.tree = i, this.offset = r, this.open = (s ? 1 : 0) | (O ? 2 : 0)
            }
            get openStart() {
                return (this.open & 1) > 0
            }
            get openEnd() {
                return (this.open & 2) > 0
            }
            static addTree(e, t = [], i = !1) {
                let r = [new Ge(0, e.length, e, 0, !1, i)];
                for (let s of t) s.to > e.length && r.push(s);
                return r
            }
            static applyChanges(e, t, i = 128) {
                if (!t.length) return e;
                let r = [],
                    s = 1,
                    O = e.length ? e[0] : null;
                for (let o = 0, l = 0, a = 0;; o++) {
                    let h = o < t.length ? t[o] : null,
                        c = h ? h.fromA : 1e9;
                    if (c - l >= i)
                        for (; O && O.from < c;) {
                            let f = O;
                            if (l >= f.from || c <= f.to || a) {
                                let d = Math.max(f.from, l) - a,
                                    p = Math.min(f.to, c) - a;
                                f = d >= p ? null : new Ge(d, p, f.tree, f.offset + a, o > 0, !!h)
                            }
                            if (f && r.push(f), O.to > c) break;
                            O = s < e.length ? e[s++] : null
                        }
                    if (!h) break;
                    l = h.toA, a = h.toA - h.toB
                }
                return r
            }
        },
        vi = class {
            startParse(e, t, i) {
                return typeof e == "string" && (e = new bl(e)), i = i ? i.length ? i.map(r => new Se(r.from, r.to)) : [new Se(0, 0)] : [new Se(0, e.length)], this.createParse(e, t || [], i)
            }
            parse(e, t, i) {
                let r = this.startParse(e, t, i);
                for (;;) {
                    let s = r.advance();
                    if (s) return s
                }
            }
        },
        bl = class {
            constructor(e) {
                this.string = e
            }
            get length() {
                return this.string.length
            }
            chunk(e) {
                return this.string.slice(e)
            }
            get lineChunks() {
                return !1
            }
            read(e, t) {
                return this.string.slice(e, t)
            }
        };

    function kn(n) {
        return (e, t, i, r) => new Pl(e, n, t, i, r)
    }
    var os = class {
            constructor(e, t, i, r, s) {
                this.parser = e, this.parse = t, this.overlay = i, this.target = r, this.ranges = s
            }
        },
        xl = class {
            constructor(e, t, i, r, s, O, o) {
                this.parser = e, this.predicate = t, this.mounts = i, this.index = r, this.start = s, this.target = O, this.prev = o, this.depth = 0, this.ranges = []
            }
        },
        ls = new R({
            perNode: !0
        }),
        Pl = class {
            constructor(e, t, i, r, s) {
                this.nest = t, this.input = i, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e
            }
            advance() {
                if (this.baseParse) {
                    let i = this.baseParse.advance();
                    if (!i) return null;
                    if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
                        for (let r of this.inner) r.parse.stopAt(this.stoppedAt)
                }
                if (this.innerDone == this.inner.length) {
                    let i = this.baseTree;
                    return this.stoppedAt != null && (i = new j(i.type, i.children, i.positions, i.length, i.propValues.concat([
                        [ls, this.stoppedAt]
                    ]))), i
                }
                let e = this.inner[this.innerDone],
                    t = e.parse.advance();
                if (t) {
                    this.innerDone++;
                    let i = Object.assign(Object.create(null), e.target.props);
                    i[R.mounted.id] = new ml(t, e.overlay, e.parser), e.target.props = i
                }
                return null
            }
            get parsedPos() {
                if (this.baseParse) return 0;
                let e = this.input.length;
                for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].ranges[0].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
                return e
            }
            stopAt(e) {
                if (this.stoppedAt = e, this.baseParse) this.baseParse.stopAt(e);
                else
                    for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].parse.stopAt(e)
            }
            startInner() {
                let e = new Tl(this.fragments),
                    t = null,
                    i = null,
                    r = new Oi(new be(this.baseTree, this.ranges[0].from, 0, null), C.IncludeAnonymous | C.IgnoreMounts);
                e: for (let s, O; this.stoppedAt == null || r.from < this.stoppedAt;) {
                    let o = !0,
                        l;
                    if (e.hasNode(r)) {
                        if (t) {
                            let a = t.mounts.find(h => h.frag.from <= r.from && h.frag.to >= r.to && h.mount.overlay);
                            if (a)
                                for (let h of a.mount.overlay) {
                                    let c = h.from + a.pos,
                                        f = h.to + a.pos;
                                    c >= r.from && f <= r.to && !t.ranges.some(d => d.from < f && d.to > c) && t.ranges.push({
                                        from: c,
                                        to: f
                                    })
                                }
                        }
                        o = !1
                    } else if (i && (O = Vu(i.ranges, r.from, r.to))) o = O != 2;
                    else if (!r.type.isAnonymous && r.from < r.to && (s = this.nest(r, this.input))) {
                        r.tree || Uu(r);
                        let a = e.findMounts(r.from, s.parser);
                        if (typeof s.overlay == "function") t = new xl(s.parser, s.overlay, a, this.inner.length, r.from, r.tree, t);
                        else {
                            let h = kl(this.ranges, s.overlay || [new Se(r.from, r.to)]);
                            h.length && this.inner.push(new os(s.parser, s.parser.startParse(this.input, vl(a, h), h), s.overlay ? s.overlay.map(c => new Se(c.from - r.from, c.to - r.from)) : null, r.tree, h)), s.overlay ? h.length && (i = {
                                ranges: h,
                                depth: 0,
                                prev: i
                            }) : o = !1
                        }
                    } else t && (l = t.predicate(r)) && (l === !0 && (l = new Se(r.from, r.to)), l.from < l.to && t.ranges.push(l));
                    if (o && r.firstChild()) t && t.depth++, i && i.depth++;
                    else
                        for (; !r.nextSibling();) {
                            if (!r.parent()) break e;
                            if (t && !--t.depth) {
                                let a = kl(this.ranges, t.ranges);
                                a.length && this.inner.splice(t.index, 0, new os(t.parser, t.parser.startParse(this.input, vl(t.mounts, a), a), t.ranges.map(h => new Se(h.from - t.start, h.to - t.start)), t.target, a)), t = t.prev
                            }
                            i && !--i.depth && (i = i.prev)
                        }
                }
            }
        };

    function Vu(n, e, t) {
        for (let i of n) {
            if (i.from >= t) break;
            if (i.to > e) return i.from <= e && i.to >= t ? 2 : 1
        }
        return 0
    }

    function wl(n, e, t, i, r, s) {
        if (e < t) {
            let O = n.buffer[e + 1];
            i.push(n.slice(e, t, O)), r.push(O - s)
        }
    }

    function Uu(n) {
        let {
            node: e
        } = n, t = 0;
        do n.parent(), t++; while (!n.tree);
        let i = 0,
            r = n.tree,
            s = 0;
        for (; s = r.positions[i] + n.from, !(s <= e.from && s + r.children[i].length >= e.to); i++);
        let O = r.children[i],
            o = O.buffer;

        function l(a, h, c, f, d) {
            let p = a;
            for (; o[p + 2] + s <= e.from;) p = o[p + 3];
            let m = [],
                $ = [];
            wl(O, a, p, m, $, f);
            let g = o[p + 1],
                S = o[p + 2],
                k = g + s == e.from && S + s == e.to && o[p] == e.type.id;
            return m.push(k ? e.toTree() : l(p + 4, o[p + 3], O.set.types[o[p]], g, S - g)), $.push(g - f), wl(O, o[p + 3], h, m, $, f), new j(c, m, $, d)
        }
        r.children[i] = l(0, o.length, ee.none, 0, O.length);
        for (let a = 0; a <= t; a++) n.childAfter(e.from)
    }
    var as = class {
            constructor(e, t) {
                this.offset = t, this.done = !1, this.cursor = e.cursor(C.IncludeAnonymous | C.IgnoreMounts)
            }
            moveTo(e) {
                let {
                    cursor: t
                } = this, i = e - this.offset;
                for (; !this.done && t.from < i;) t.to >= e && t.enter(i, 1, C.IgnoreOverlays | C.ExcludeBuffers) || t.next(!1) || (this.done = !0)
            }
            hasNode(e) {
                if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
                    for (let t = this.cursor.tree;;) {
                        if (t == e.tree) return !0;
                        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof j) t = t.children[0];
                        else break
                    }
                return !1
            }
        },
        Tl = class {
            constructor(e) {
                var t;
                if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
                    let i = this.curFrag = e[0];
                    this.curTo = (t = i.tree.prop(ls)) !== null && t !== void 0 ? t : i.to, this.inner = new as(i.tree, -i.offset)
                } else this.curFrag = this.inner = null
            }
            hasNode(e) {
                for (; this.curFrag && e.from >= this.curTo;) this.nextFrag();
                return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e)
            }
            nextFrag() {
                var e;
                if (this.fragI++, this.fragI == this.fragments.length) this.curFrag = this.inner = null;
                else {
                    let t = this.curFrag = this.fragments[this.fragI];
                    this.curTo = (e = t.tree.prop(ls)) !== null && e !== void 0 ? e : t.to, this.inner = new as(t.tree, -t.offset)
                }
            }
            findMounts(e, t) {
                var i;
                let r = [];
                if (this.inner) {
                    this.inner.cursor.moveTo(e, 1);
                    for (let s = this.inner.cursor.node; s; s = s.parent) {
                        let O = (i = s.tree) === null || i === void 0 ? void 0 : i.prop(R.mounted);
                        if (O && O.parser == t)
                            for (let o = this.fragI; o < this.fragments.length; o++) {
                                let l = this.fragments[o];
                                if (l.from >= s.to) break;
                                l.tree == this.curFrag.tree && r.push({
                                    frag: l,
                                    pos: s.from - l.offset,
                                    mount: O
                                })
                            }
                    }
                }
                return r
            }
        };

    function kl(n, e) {
        let t = null,
            i = e;
        for (let r = 1, s = 0; r < n.length; r++) {
            let O = n[r - 1].to,
                o = n[r].from;
            for (; s < i.length; s++) {
                let l = i[s];
                if (l.from >= o) break;
                l.to <= O || (t || (i = t = e.slice()), l.from < O ? (t[s] = new Se(l.from, O), l.to > o && t.splice(s + 1, 0, new Se(o, l.to))) : l.to > o ? t[s--] = new Se(o, l.to) : t.splice(s--, 1))
            }
        }
        return i
    }

    function Cu(n, e, t, i) {
        let r = 0,
            s = 0,
            O = !1,
            o = !1,
            l = -1e9,
            a = [];
        for (;;) {
            let h = r == n.length ? 1e9 : O ? n[r].to : n[r].from,
                c = s == e.length ? 1e9 : o ? e[s].to : e[s].from;
            if (O != o) {
                let f = Math.max(l, t),
                    d = Math.min(h, c, i);
                f < d && a.push(new Se(f, d))
            }
            if (l = Math.min(h, c), l == 1e9) break;
            h == l && (O ? (O = !1, r++) : O = !0), c == l && (o ? (o = !1, s++) : o = !0)
        }
        return a
    }

    function vl(n, e) {
        let t = [];
        for (let {
                pos: i,
                mount: r,
                frag: s
            } of n) {
            let O = i + (r.overlay ? r.overlay[0].from : 0),
                o = O + r.tree.length,
                l = Math.max(s.from, O),
                a = Math.min(s.to, o);
            if (r.overlay) {
                let h = r.overlay.map(f => new Se(f.from + i, f.to + i)),
                    c = Cu(e, h, l, a);
                for (let f = 0, d = l;; f++) {
                    let p = f == c.length,
                        m = p ? a : c[f].from;
                    if (m > d && t.push(new Ge(d, m, r.tree, -O, s.from >= d || s.openStart, s.to <= m || s.openEnd)), p) break;
                    d = c[f].to
                }
            } else t.push(new Ge(l, a, r.tree, -O, s.from >= O || s.openStart, s.to <= o || s.openEnd))
        }
        return t
    }
    var Au = 0,
        Ee = class {
            constructor(e, t, i) {
                this.set = e, this.base = t, this.modified = i, this.id = Au++
            }
            static define(e) {
                if (e == null ? void 0 : e.base) throw new Error("Can not derive from a modified tag");
                let t = new Ee([], null, []);
                if (t.set.push(t), e)
                    for (let i of e.set) t.set.push(i);
                return t
            }
            static defineModifier() {
                let e = new wi;
                return t => t.modified.indexOf(e) > -1 ? t : wi.get(t.base || t, t.modified.concat(e).sort((i, r) => i.id - r.id))
            }
        },
        Yu = 0,
        wi = class {
            constructor() {
                this.instances = [], this.id = Yu++
            }
            static get(e, t) {
                if (!t.length) return e;
                let i = t[0].instances.find(o => o.base == e && ju(t, o.modified));
                if (i) return i;
                let r = [],
                    s = new Ee(r, e, t);
                for (let o of t) o.instances.push(s);
                let O = Gu(t);
                for (let o of e.set)
                    if (!o.modified.length)
                        for (let l of O) r.push(wi.get(o, l));
                return s
            }
        };

    function ju(n, e) {
        return n.length == e.length && n.every((t, i) => t == e[i])
    }

    function Gu(n) {
        let e = [
            []
        ];
        for (let t = 0; t < n.length; t++)
            for (let i = 0, r = e.length; i < r; i++) e.push(e[i].concat(n[t]));
        return e.sort((t, i) => i.length - t.length)
    }

    function he(n) {
        let e = Object.create(null);
        for (let t in n) {
            let i = n[t];
            Array.isArray(i) || (i = [i]);
            for (let r of t.split(" "))
                if (r) {
                    let s = [],
                        O = 2,
                        o = r;
                    for (let c = 0;;) {
                        if (o == "..." && c > 0 && c + 3 == r.length) {
                            O = 1;
                            break
                        }
                        let f = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(o);
                        if (!f) throw new RangeError("Invalid path: " + r);
                        if (s.push(f[0] == "*" ? "" : f[0][0] == '"' ? JSON.parse(f[0]) : f[0]), c += f[0].length, c == r.length) break;
                        let d = r[c++];
                        if (c == r.length && d == "!") {
                            O = 0;
                            break
                        }
                        if (d != "/") throw new RangeError("Invalid path: " + r);
                        o = r.slice(c)
                    }
                    let l = s.length - 1,
                        a = s[l];
                    if (!a) throw new RangeError("Invalid path: " + r);
                    let h = new Xi(i, O, l > 0 ? s.slice(0, l) : null);
                    e[a] = h.sort(e[a])
                }
        }
        return Xl.add(e)
    }
    var Xl = new R,
        Xi = class {
            constructor(e, t, i, r) {
                this.tags = e, this.mode = t, this.context = i, this.next = r
            }
            get opaque() {
                return this.mode == 0
            }
            get inherit() {
                return this.mode == 1
            }
            sort(e) {
                return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e)
            }
            get depth() {
                return this.context ? this.context.length : 0
            }
        };
    Xi.empty = new Xi([], 2, null);

    function hs(n, e) {
        let t = Object.create(null);
        for (let s of n)
            if (!Array.isArray(s.tag)) t[s.tag.id] = s.class;
            else
                for (let O of s.tag) t[O.id] = s.class;
        let {
            scope: i,
            all: r = null
        } = e || {};
        return {
            style: s => {
                let O = r;
                for (let o of s)
                    for (let l of o.set) {
                        let a = t[l.id];
                        if (a) {
                            O = O ? O + " " + a : a;
                            break
                        }
                    }
                return O
            },
            scope: i
        }
    }

    function Eu(n, e) {
        let t = null;
        for (let i of n) {
            let r = i.style(e);
            r && (t = t ? t + " " + r : r)
        }
        return t
    }

    function zl(n, e, t, i = 0, r = n.length) {
        let s = new Rl(i, Array.isArray(e) ? e : [e], t);
        s.highlightRange(n.cursor(), i, r, "", s.highlighters), s.flush(r)
    }
    var Rl = class {
        constructor(e, t, i) {
            this.at = e, this.highlighters = t, this.span = i, this.class = ""
        }
        startSpan(e, t) {
            t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t)
        }
        flush(e) {
            e > this.at && this.class && this.span(this.at, e, this.class)
        }
        highlightRange(e, t, i, r, s) {
            let {
                type: O,
                from: o,
                to: l
            } = e;
            if (o >= i || l <= t) return;
            O.isTop && (s = this.highlighters.filter(d => !d.scope || d.scope(O)));
            let a = r,
                h = Du(e) || Xi.empty,
                c = Eu(s, h.tags);
            if (c && (a && (a += " "), a += c, h.mode == 1 && (r += (r ? " " : "") + c)), this.startSpan(e.from, a), h.opaque) return;
            let f = e.tree && e.tree.prop(R.mounted);
            if (f && f.overlay) {
                let d = e.node.enter(f.overlay[0].from + o, 1),
                    p = this.highlighters.filter($ => !$.scope || $.scope(f.tree.type)),
                    m = e.firstChild();
                for (let $ = 0, g = o;; $++) {
                    let S = $ < f.overlay.length ? f.overlay[$] : null,
                        k = S ? S.from + o : l,
                        x = Math.max(t, g),
                        X = Math.min(i, k);
                    if (x < X && m)
                        for (; e.from < X && (this.highlightRange(e, x, X, r, s), this.startSpan(Math.min(i, e.to), a), !(e.to >= k || !e.nextSibling())););
                    if (!S || k > i) break;
                    g = S.to + o, g > t && (this.highlightRange(d.cursor(), Math.max(t, S.from + o), Math.min(i, g), r, p), this.startSpan(g, a))
                }
                m && e.parent()
            } else if (e.firstChild()) {
                do
                    if (!(e.to <= t)) {
                        if (e.from >= i) break;
                        this.highlightRange(e, t, i, r, s), this.startSpan(Math.min(i, e.to), a)
                    }
                while (e.nextSibling());
                e.parent()
            }
        }
    };

    function Du(n) {
        let e = n.type.prop(Xl);
        for (; e && e.context && !n.matchContext(e.context);) e = e.next;
        return e || null
    }
    var Q = Ee.define,
        vn = Q(),
        yt = Q(),
        Wl = Q(yt),
        ql = Q(yt),
        St = Q(),
        wn = Q(St),
        cs = Q(St),
        Fe = Q(),
        zt = Q(Fe),
        He = Q(),
        Ke = Q(),
        us = Q(),
        Ri = Q(us),
        Xn = Q(),
        u = {
            comment: vn,
            lineComment: Q(vn),
            blockComment: Q(vn),
            docComment: Q(vn),
            name: yt,
            variableName: Q(yt),
            typeName: Wl,
            tagName: Q(Wl),
            propertyName: ql,
            attributeName: Q(ql),
            className: Q(yt),
            labelName: Q(yt),
            namespace: Q(yt),
            macroName: Q(yt),
            literal: St,
            string: wn,
            docString: Q(wn),
            character: Q(wn),
            attributeValue: Q(wn),
            number: cs,
            integer: Q(cs),
            float: Q(cs),
            bool: Q(St),
            regexp: Q(St),
            escape: Q(St),
            color: Q(St),
            url: Q(St),
            keyword: He,
            self: Q(He),
            null: Q(He),
            atom: Q(He),
            unit: Q(He),
            modifier: Q(He),
            operatorKeyword: Q(He),
            controlKeyword: Q(He),
            definitionKeyword: Q(He),
            moduleKeyword: Q(He),
            operator: Ke,
            derefOperator: Q(Ke),
            arithmeticOperator: Q(Ke),
            logicOperator: Q(Ke),
            bitwiseOperator: Q(Ke),
            compareOperator: Q(Ke),
            updateOperator: Q(Ke),
            definitionOperator: Q(Ke),
            typeOperator: Q(Ke),
            controlOperator: Q(Ke),
            punctuation: us,
            separator: Q(us),
            bracket: Ri,
            angleBracket: Q(Ri),
            squareBracket: Q(Ri),
            paren: Q(Ri),
            brace: Q(Ri),
            content: Fe,
            heading: zt,
            heading1: Q(zt),
            heading2: Q(zt),
            heading3: Q(zt),
            heading4: Q(zt),
            heading5: Q(zt),
            heading6: Q(zt),
            contentSeparator: Q(Fe),
            list: Q(Fe),
            quote: Q(Fe),
            emphasis: Q(Fe),
            strong: Q(Fe),
            link: Q(Fe),
            monospace: Q(Fe),
            strikethrough: Q(Fe),
            inserted: Q(),
            deleted: Q(),
            changed: Q(),
            invalid: Q(),
            meta: Xn,
            documentMeta: Q(Xn),
            annotation: Q(Xn),
            processingInstruction: Q(Xn),
            definition: Ee.defineModifier(),
            constant: Ee.defineModifier(),
            function: Ee.defineModifier(),
            standard: Ee.defineModifier(),
            local: Ee.defineModifier(),
            special: Ee.defineModifier()
        },
        gg = hs([{
            tag: u.link,
            class: "tok-link"
        }, {
            tag: u.heading,
            class: "tok-heading"
        }, {
            tag: u.emphasis,
            class: "tok-emphasis"
        }, {
            tag: u.strong,
            class: "tok-strong"
        }, {
            tag: u.keyword,
            class: "tok-keyword"
        }, {
            tag: u.atom,
            class: "tok-atom"
        }, {
            tag: u.bool,
            class: "tok-bool"
        }, {
            tag: u.url,
            class: "tok-url"
        }, {
            tag: u.labelName,
            class: "tok-labelName"
        }, {
            tag: u.inserted,
            class: "tok-inserted"
        }, {
            tag: u.deleted,
            class: "tok-deleted"
        }, {
            tag: u.literal,
            class: "tok-literal"
        }, {
            tag: u.string,
            class: "tok-string"
        }, {
            tag: u.number,
            class: "tok-number"
        }, {
            tag: [u.regexp, u.escape, u.special(u.string)],
            class: "tok-string2"
        }, {
            tag: u.variableName,
            class: "tok-variableName"
        }, {
            tag: u.local(u.variableName),
            class: "tok-variableName tok-local"
        }, {
            tag: u.definition(u.variableName),
            class: "tok-variableName tok-definition"
        }, {
            tag: u.special(u.variableName),
            class: "tok-variableName2"
        }, {
            tag: u.definition(u.propertyName),
            class: "tok-propertyName tok-definition"
        }, {
            tag: u.typeName,
            class: "tok-typeName"
        }, {
            tag: u.namespace,
            class: "tok-namespace"
        }, {
            tag: u.className,
            class: "tok-className"
        }, {
            tag: u.macroName,
            class: "tok-macroName"
        }, {
            tag: u.propertyName,
            class: "tok-propertyName"
        }, {
            tag: u.operator,
            class: "tok-operator"
        }, {
            tag: u.comment,
            class: "tok-comment"
        }, {
            tag: u.meta,
            class: "tok-meta"
        }, {
            tag: u.invalid,
            class: "tok-invalid"
        }, {
            tag: u.punctuation,
            class: "tok-punctuation"
        }]);
    var fs, zi = new R;

    function Mu(n) {
        return T.define({
            combine: n ? e => e.concat(n) : void 0
        })
    }
    var we = class {
        constructor(e, t, i = [], r = "") {
            this.data = e, this.name = r, _.prototype.hasOwnProperty("tree") || Object.defineProperty(_.prototype, "tree", {
                get() {
                    return L(this)
                }
            }), this.parser = t, this.extension = [oi.of(this), _.languageData.of((s, O, o) => s.facet(Zl(s, O, o)))].concat(i)
        }
        isActiveAt(e, t, i = -1) {
            return Zl(e, t, i) == this.data
        }
        findRegions(e) {
            let t = e.facet(oi);
            if ((t == null ? void 0 : t.data) == this.data) return [{
                from: 0,
                to: e.doc.length
            }];
            if (!t || !t.allowsNesting) return [];
            let i = [],
                r = (s, O) => {
                    if (s.prop(zi) == this.data) {
                        i.push({
                            from: O,
                            to: O + s.length
                        });
                        return
                    }
                    let o = s.prop(R.mounted);
                    if (o) {
                        if (o.tree.prop(zi) == this.data) {
                            if (o.overlay)
                                for (let l of o.overlay) i.push({
                                    from: l.from + O,
                                    to: l.to + O
                                });
                            else i.push({
                                from: O,
                                to: O + s.length
                            });
                            return
                        } else if (o.overlay) {
                            let l = i.length;
                            if (r(o.tree, o.overlay[0].from + O), i.length > l) return
                        }
                    }
                    for (let l = 0; l < s.children.length; l++) {
                        let a = s.children[l];
                        a instanceof j && r(a, s.positions[l] + O)
                    }
                };
            return r(L(e), 0), i
        }
        get allowsNesting() {
            return !0
        }
    };
    we.setState = Z.define();

    function Zl(n, e, t) {
        let i = n.facet(oi);
        if (!i) return null;
        let r = i.data;
        if (i.allowsNesting)
            for (let s = L(n).topNode; s; s = s.enter(e, t, C.ExcludeBuffers)) r = s.type.prop(zi) || r;
        return r
    }
    var te = class extends we {
        constructor(e, t, i) {
            super(e, t, [], i);
            this.parser = t
        }
        static define(e) {
            let t = Mu(e.languageData);
            return new te(t, e.parser.configure({
                props: [zi.add(i => i.isTop ? t : void 0)]
            }), e.name)
        }
        configure(e, t) {
            return new te(this.data, this.parser.configure(e), t || this.name)
        }
        get allowsNesting() {
            return this.parser.hasWrappers()
        }
    };

    function L(n) {
        let e = n.field(we.state, !1);
        return e ? e.tree : j.empty
    }
    var _l = class {
            constructor(e, t = e.length) {
                this.doc = e, this.length = t, this.cursorPos = 0, this.string = "", this.cursor = e.iter()
            }
            syncTo(e) {
                return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length
            }
            chunk(e) {
                return this.syncTo(e), this.string
            }
            get lineChunks() {
                return !0
            }
            read(e, t) {
                let i = this.cursorPos - this.string.length;
                return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i)
            }
        },
        Wi = null,
        qi = class {
            constructor(e, t, i = [], r, s, O, o, l) {
                this.parser = e, this.state = t, this.fragments = i, this.tree = r, this.treeLen = s, this.viewport = O, this.skipped = o, this.scheduleOn = l, this.parse = null, this.tempSkipped = []
            }
            static create(e, t, i) {
                return new qi(e, t, [], j.empty, 0, i, [], null)
            }
            startParse() {
                return this.parser.startParse(new _l(this.state.doc), this.fragments)
            }
            work(e, t) {
                return t != null && t >= this.state.doc.length && (t = void 0), this.tree != j.empty && this.isDone(t ? ? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
                    var i;
                    if (typeof e == "number") {
                        let r = Date.now() + e;
                        e = () => Date.now() > r
                    }
                    for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t);;) {
                        let r = this.parse.advance();
                        if (r)
                            if (this.fragments = this.withoutTempSkipped(Ge.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ? ? this.state.doc.length)) this.parse = this.startParse();
                            else return !0;
                        if (e()) return !1
                    }
                })
            }
            takeTree() {
                let e, t;
                this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
                    for (; !(t = this.parse.advance()););
                }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Ge.addTree(this.tree, this.fragments, !0)), this.parse = null)
            }
            withContext(e) {
                let t = Wi;
                Wi = this;
                try {
                    return e()
                } finally {
                    Wi = t
                }
            }
            withoutTempSkipped(e) {
                for (let t; t = this.tempSkipped.pop();) e = Vl(e, t.from, t.to);
                return e
            }
            changes(e, t) {
                let {
                    fragments: i,
                    tree: r,
                    treeLen: s,
                    viewport: O,
                    skipped: o
                } = this;
                if (this.takeTree(), !e.empty) {
                    let l = [];
                    if (e.iterChangedRanges((a, h, c, f) => l.push({
                            fromA: a,
                            toA: h,
                            fromB: c,
                            toB: f
                        })), i = Ge.applyChanges(i, l), r = j.empty, s = 0, O = {
                            from: e.mapPos(O.from, -1),
                            to: e.mapPos(O.to, 1)
                        }, this.skipped.length) {
                        o = [];
                        for (let a of this.skipped) {
                            let h = e.mapPos(a.from, 1),
                                c = e.mapPos(a.to, -1);
                            h < c && o.push({
                                from: h,
                                to: c
                            })
                        }
                    }
                }
                return new qi(this.parser, t, i, r, s, O, o, this.scheduleOn)
            }
            updateViewport(e) {
                if (this.viewport.from == e.from && this.viewport.to == e.to) return !1;
                this.viewport = e;
                let t = this.skipped.length;
                for (let i = 0; i < this.skipped.length; i++) {
                    let {
                        from: r,
                        to: s
                    } = this.skipped[i];
                    r < e.to && s > e.from && (this.fragments = Vl(this.fragments, r, s), this.skipped.splice(i--, 1))
                }
                return this.skipped.length >= t ? !1 : (this.reset(), !0)
            }
            reset() {
                this.parse && (this.takeTree(), this.parse = null)
            }
            skipUntilInView(e, t) {
                this.skipped.push({
                    from: e,
                    to: t
                })
            }
            static getSkippingParser(e) {
                return new class extends vi {
                    createParse(t, i, r) {
                        let s = r[0].from,
                            O = r[r.length - 1].to;
                        return {
                            parsedPos: s,
                            advance() {
                                let l = Wi;
                                if (l) {
                                    for (let a of r) l.tempSkipped.push(a);
                                    e && (l.scheduleOn = l.scheduleOn ? Promise.all([l.scheduleOn, e]) : e)
                                }
                                return this.parsedPos = O, new j(ee.none, [], [], O - s)
                            },
                            stoppedAt: null,
                            stopAt() {}
                        }
                    }
                }
            }
            isDone(e) {
                e = Math.min(e, this.state.doc.length);
                let t = this.fragments;
                return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e
            }
            static get() {
                return Wi
            }
        };

    function Vl(n, e, t) {
        return Ge.applyChanges(n, [{
            fromA: e,
            toA: t,
            fromB: e,
            toB: t
        }])
    }
    var Wt = class {
        constructor(e) {
            this.context = e, this.tree = e.tree
        }
        apply(e) {
            if (!e.docChanged && this.tree == this.context.tree) return this;
            let t = this.context.changes(e.changes, e.state),
                i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
            return t.work(20, i) || t.takeTree(), new Wt(t)
        }
        static init(e) {
            let t = Math.min(3e3, e.doc.length),
                i = qi.create(e.facet(oi).parser, e, {
                    from: 0,
                    to: t
                });
            return i.work(20, t) || i.takeTree(), new Wt(i)
        }
    };
    we.state = pe.define({
        create: Wt.init,
        update(n, e) {
            for (let t of e.effects)
                if (t.is(we.setState)) return t.value;
            return e.startState.facet(oi) != e.state.facet(oi) ? Wt.init(e.state) : n.apply(e)
        }
    });
    var Ul = n => {
        let e = setTimeout(() => n(), 500);
        return () => clearTimeout(e)
    };
    typeof requestIdleCallback != "undefined" && (Ul = n => {
        let e = -1,
            t = setTimeout(() => {
                e = requestIdleCallback(n, {
                    timeout: 500 - 100
                })
            }, 100);
        return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e)
    });
    var ds = typeof navigator != "undefined" && ((fs = navigator.scheduling) === null || fs === void 0 ? void 0 : fs.isInputPending) ? () => navigator.scheduling.isInputPending() : null,
        Iu = ve.fromClass(class {
            constructor(e) {
                this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork()
            }
            update(e) {
                let t = this.view.state.field(we.state).context;
                (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), e.docChanged && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t)
            }
            scheduleWork() {
                if (this.working) return;
                let {
                    state: e
                } = this.view, t = e.field(we.state);
                (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Ul(this.work))
            }
            work(e) {
                this.working = null;
                let t = Date.now();
                if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
                let {
                    state: i,
                    viewport: {
                        to: r
                    }
                } = this.view, s = i.field(we.state);
                if (s.tree == s.context.tree && s.context.isDone(r + 1e5)) return;
                let O = Date.now() + Math.min(this.chunkBudget, 100, e && !ds ? Math.max(25, e.timeRemaining() - 5) : 1e9),
                    o = s.context.treeLen < r && i.doc.length > r + 1e3,
                    l = s.context.work(() => ds && ds() || Date.now() > O, r + (o ? 0 : 1e5));
                this.chunkBudget -= Date.now() - t, (l || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({
                    effects: we.setState.of(new Wt(s.context))
                })), this.chunkBudget > 0 && !(l && !o) && this.scheduleWork(), this.checkAsyncSchedule(s.context)
            }
            checkAsyncSchedule(e) {
                e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch(t => ye(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null)
            }
            destroy() {
                this.working && this.working()
            }
            isWorking() {
                return !!(this.working || this.workScheduled > 0)
            }
        }, {
            eventHandlers: {
                focus() {
                    this.scheduleWork()
                }
            }
        }),
        oi = T.define({
            combine(n) {
                return n.length ? n[0] : null
            },
            enables: n => [we.state, Iu, w.contentAttributes.compute([n], e => {
                let t = e.facet(n);
                return t && t.name ? {
                    "data-language": t.name
                } : {}
            })]
        }),
        ce = class {
            constructor(e, t = []) {
                this.language = e, this.support = t, this.extension = [e, t]
            }
        };
    var li = T.define({
        combine: n => {
            if (!n.length) return "  ";
            if (!/^(?: +|\t+)$/.test(n[0])) throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
            return n[0]
        }
    });

    function Cl(n) {
        let e = n.facet(li);
        return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length
    }

    function Al(n, e) {
        let t = "",
            i = n.tabSize;
        if (n.facet(li).charCodeAt(0) == 9)
            for (; e >= i;) t += "	", e -= i;
        for (let r = 0; r < e; r++) t += " ";
        return t
    }
    var $e = new R;

    function Bu(n) {
        let e = n.node,
            t = e.childAfter(e.from),
            i = e.lastChild;
        if (!t) return null;
        let r = n.options.simulateBreak,
            s = n.state.doc.lineAt(t.from),
            O = r == null || r <= s.from ? s.to : Math.min(s.to, r);
        for (let o = t.to;;) {
            let l = e.childAfter(o);
            if (!l || l == i) return null;
            if (!l.type.isSkipped) return l.from < O ? t : null;
            o = l.to
        }
    }

    function Rn({
        closing: n,
        align: e = !0,
        units: t = 1
    }) {
        return i => Nu(i, e, t, n)
    }

    function Nu(n, e, t, i, r) {
        let s = n.textAfter,
            O = s.match(/^\s*/)[0].length,
            o = i && s.slice(O, O + i.length) == i || r == n.pos + O,
            l = e ? Bu(n) : null;
        return l ? o ? n.column(l.from) : n.column(l.to) : n.baseIndent + (o ? 0 : n.unit * t)
    }
    var Yl = n => n.baseIndent;

    function ue({
        except: n,
        units: e = 1
    } = {}) {
        return t => {
            let i = n && n.test(t.textAfter);
            return t.baseIndent + (i ? 0 : e * t.unit)
        }
    }
    var ge = new R;

    function bt(n) {
        let e = n.firstChild,
            t = n.lastChild;
        return e && e.to < t.from ? {
            from: e.to,
            to: t.type.isError ? n.to : t.from
        } : null
    }
    var qt = class {
            constructor(e, t) {
                this.specs = e;
                let i;

                function r(o) {
                    let l = Ce.newName();
                    return (i || (i = Object.create(null)))["." + l] = o, l
                }
                let s = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0,
                    O = t.scope;
                this.scope = O instanceof we ? o => o.prop(zi) == O.data : O ? o => o == O : void 0, this.style = hs(e.map(o => ({
                    tag: o.tag,
                    class: o.class || r(Object.assign({}, o, {
                        tag: null
                    }))
                })), {
                    all: s
                }).style, this.module = i ? new Ce(i) : null, this.themeType = t.themeType
            }
            static define(e, t) {
                return new qt(e, t || {})
            }
        },
        ps = T.define(),
        jl = T.define({
            combine(n) {
                return n.length ? [n[0]] : null
            }
        });

    function ms(n) {
        let e = n.facet(ps);
        return e.length ? e : n.facet(jl)
    }

    function Gl(n, e) {
        let t = [Lu],
            i;
        return n instanceof qt && (n.module && t.push(w.styleModule.of(n.module)), i = n.themeType), (e == null ? void 0 : e.fallback) ? t.push(jl.of(n)) : i ? t.push(ps.computeN([w.darkTheme], r => r.facet(w.darkTheme) == (i == "dark") ? [n] : [])) : t.push(ps.of(n)), t
    }
    var El = class {
            constructor(e) {
                this.markCache = Object.create(null), this.tree = L(e.state), this.decorations = this.buildDeco(e, ms(e.state))
            }
            update(e) {
                let t = L(e.state),
                    i = ms(e.state),
                    r = i != ms(e.startState);
                t.length < e.view.viewport.to && !r && t.type == this.tree.type ? this.decorations = this.decorations.map(e.changes) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, i))
            }
            buildDeco(e, t) {
                if (!t || !this.tree.length) return Y.none;
                let i = new ft;
                for (let {
                        from: r,
                        to: s
                    } of e.visibleRanges) zl(this.tree, t, (O, o, l) => {
                    i.add(O, o, this.markCache[l] || (this.markCache[l] = Y.mark({
                        class: l
                    })))
                }, r, s);
                return i.finish()
            }
        },
        Lu = ut.high(ve.fromClass(El, {
            decorations: n => n.decorations
        })),
        vg = qt.define([{
            tag: u.meta,
            color: "#7a757a"
        }, {
            tag: u.link,
            textDecoration: "underline"
        }, {
            tag: u.heading,
            textDecoration: "underline",
            fontWeight: "bold"
        }, {
            tag: u.emphasis,
            fontStyle: "italic"
        }, {
            tag: u.strong,
            fontWeight: "bold"
        }, {
            tag: u.strikethrough,
            textDecoration: "line-through"
        }, {
            tag: u.keyword,
            color: "#708"
        }, {
            tag: [u.atom, u.bool, u.url, u.contentSeparator, u.labelName],
            color: "#219"
        }, {
            tag: [u.literal, u.inserted],
            color: "#164"
        }, {
            tag: [u.string, u.deleted],
            color: "#a11"
        }, {
            tag: [u.regexp, u.escape, u.special(u.string)],
            color: "#e40"
        }, {
            tag: u.definition(u.variableName),
            color: "#00f"
        }, {
            tag: u.local(u.variableName),
            color: "#30a"
        }, {
            tag: [u.typeName, u.namespace],
            color: "#085"
        }, {
            tag: u.className,
            color: "#167"
        }, {
            tag: [u.special(u.variableName), u.macroName],
            color: "#256"
        }, {
            tag: u.definition(u.propertyName),
            color: "#00c"
        }, {
            tag: u.comment,
            color: "#940"
        }, {
            tag: u.invalid,
            color: "#f00"
        }]);
    var Fu = Object.create(null),
        Dl = [ee.none];
    var Ml = [],
        Hu = Object.create(null);
    for (let [n, e] of [
            ["variable", "variableName"],
            ["variable-2", "variableName.special"],
            ["string-2", "string.special"],
            ["def", "variableName.definition"],
            ["tag", "tagName"],
            ["attribute", "attributeName"],
            ["type", "typeName"],
            ["builtin", "variableName.standard"],
            ["qualifier", "modifier"],
            ["error", "invalid"],
            ["header", "heading"],
            ["property", "propertyName"]
        ]) Hu[n] = Ku(Fu, e);

    function $s(n, e) {
        Ml.indexOf(n) > -1 || (Ml.push(n), console.warn(e))
    }

    function Ku(n, e) {
        let t = null;
        for (let s of e.split(".")) {
            let O = n[s] || u[s];
            O ? typeof O == "function" ? t ? t = O(t) : $s(s, `Modifier ${s} used at start of tag`) : t ? $s(s, `Tag ${s} used as modifier`) : t = O : $s(s, `Unknown highlighting tag ${s}`)
        }
        if (!t) return 0;
        let i = e.replace(/ /g, "_"),
            r = ee.define({
                id: Dl.length,
                name: i,
                props: [he({
                    [i]: t
                })]
            });
        return Dl.push(r), r.id
    }
    var Il = Be.define();
    var Ju = T.define();
    var De = class {
        constructor(e, t, i, r, s) {
            this.changes = e, this.effects = t, this.mapped = i, this.startSelection = r, this.selectionsAfter = s
        }
        setSelAfter(e) {
            return new De(this.changes, this.effects, this.mapped, this.startSelection, e)
        }
        toJSON() {
            var e, t, i;
            return {
                changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
                mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
                startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
                selectionsAfter: this.selectionsAfter.map(r => r.toJSON())
            }
        }
        static fromJSON(e) {
            return new De(e.changes && B.fromJSON(e.changes), [], e.mapped && Te.fromJSON(e.mapped), e.startSelection && y.fromJSON(e.startSelection), e.selectionsAfter.map(y.fromJSON))
        }
        static fromTransaction(e, t) {
            let i = Xe;
            for (let r of e.startState.facet(Ju)) {
                let s = r(e);
                s.length && (i = i.concat(s))
            }
            return !i.length && e.changes.empty ? null : new De(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Xe)
        }
        static selection(e) {
            return new De(void 0, Xe, void 0, void 0, e)
        }
    };

    function gs(n, e, t, i) {
        let r = e + 1 > t + 20 ? e - t - 1 : 0,
            s = n.slice(r, e);
        return s.push(i), s
    }

    function ef(n, e) {
        let t = [],
            i = !1;
        return n.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, O, o) => {
            for (let l = 0; l < t.length;) {
                let a = t[l++],
                    h = t[l++];
                o >= a && O <= h && (i = !0)
            }
        }), i
    }

    function tf(n, e) {
        return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0
    }

    function Bl(n, e) {
        return n.length ? e.length ? n.concat(e) : n : e
    }
    var Xe = [],
        nf = 200;

    function rf(n, e) {
        if (n.length) {
            let t = n[n.length - 1],
                i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - nf));
            return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), gs(n, n.length - 1, 1e9, t.setSelAfter(i)))
        } else return [De.selection([e])]
    }

    function sf(n) {
        let e = n[n.length - 1],
            t = n.slice();
        return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t
    }

    function Qs(n, e) {
        if (!n.length) return n;
        let t = n.length,
            i = Xe;
        for (; t;) {
            let r = Of(n[t - 1], e, i);
            if (r.changes && !r.changes.empty || r.effects.length) {
                let s = n.slice(0, t);
                return s[t - 1] = r, s
            } else e = r.mapped, t--, i = r.selectionsAfter
        }
        return i.length ? [De.selection(i)] : Xe
    }

    function Of(n, e, t) {
        let i = Bl(n.selectionsAfter.length ? n.selectionsAfter.map(o => o.map(e)) : Xe, t);
        if (!n.changes) return De.selection(i);
        let r = n.changes.map(e),
            s = e.mapDesc(n.changes, !0),
            O = n.mapped ? n.mapped.composeDesc(s) : s;
        return new De(r, Z.mapEffects(n.effects, e), O, n.startSelection.map(s), i)
    }
    var of = /^(input\.type|delete)($|\.)/, Pt = class {
        constructor(e, t, i = 0, r = void 0) {
            this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = r
        }
        isolate() {
            return this.prevTime ? new Pt(this.done, this.undone) : this
        }
        addChanges(e, t, i, r, s) {
            let O = this.done,
                o = O[O.length - 1];
            return o && o.changes && !o.changes.empty && e.changes && (!i || of .test(i)) && (!o.selectionsAfter.length && t - this.prevTime < r && ef(o.changes, e.changes) || i == "input.type.compose") ? O = gs(O, O.length - 1, s, new De(e.changes.compose(o.changes), Bl(e.effects, o.effects), o.mapped, o.startSelection, Xe)) : O = gs(O, O.length, s, e), new Pt(O, Xe, t, i)
        }
        addSelection(e, t, i, r) {
            let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Xe;
            return s.length > 0 && t - this.prevTime < r && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && tf(s[s.length - 1], e) ? this : new Pt(rf(this.done, e), this.undone, t, i)
        }
        addMapping(e) {
            return new Pt(Qs(this.done, e), Qs(this.undone, e), this.prevTime, this.prevUserEvent)
        }
        pop(e, t, i) {
            let r = e == 0 ? this.done : this.undone;
            if (r.length == 0) return null;
            let s = r[r.length - 1];
            if (i && s.selectionsAfter.length) return t.update({
                selection: s.selectionsAfter[s.selectionsAfter.length - 1],
                annotations: Il.of({
                    side: e,
                    rest: sf(r)
                }),
                userEvent: e == 0 ? "select.undo" : "select.redo",
                scrollIntoView: !0
            });
            if (s.changes) {
                let O = r.length == 1 ? Xe : r.slice(0, r.length - 1);
                return s.mapped && (O = Qs(O, s.mapped)), t.update({
                    changes: s.changes,
                    selection: s.startSelection,
                    effects: s.effects,
                    annotations: Il.of({
                        side: e,
                        rest: O
                    }),
                    filter: !1,
                    userEvent: e == 0 ? "undo" : "redo",
                    scrollIntoView: !0
                })
            } else return null
        }
    };
    Pt.empty = new Pt(Xe, Xe);

    function Nl(n, e) {
        let t = -1;
        return n.changeByRange(i => {
            let r = [];
            for (let O = i.from; O <= i.to;) {
                let o = n.doc.lineAt(O);
                o.number > t && (i.empty || i.to > o.from) && (e(o, r, i), t = o.number), O = o.to + 1
            }
            let s = n.changes(r);
            return {
                changes: r,
                range: y.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
            }
        })
    }
    var lf = ({
            state: n,
            dispatch: e
        }) => n.readOnly ? !1 : (e(n.update(Nl(n, (t, i) => {
            i.push({
                from: t.from,
                insert: n.facet(li)
            })
        }), {
            userEvent: "input.indent"
        })), !0),
        af = ({
            state: n,
            dispatch: e
        }) => n.readOnly ? !1 : (e(n.update(Nl(n, (t, i) => {
            let r = /^\s*/.exec(t.text)[0];
            if (!r) return;
            let s = en(r, n.tabSize),
                O = 0,
                o = Al(n, Math.max(0, s - Cl(n)));
            for (; O < r.length && O < o.length && r.charCodeAt(O) == o.charCodeAt(O);) O++;
            i.push({
                from: t.from + O,
                to: t.from + r.length,
                insert: o.slice(O)
            })
        }), {
            userEvent: "delete.dedent"
        })), !0);
    var Ll = {
        key: "Tab",
        run: lf,
        shift: af
    };
    var ys = class {
        constructor(e, t, i) {
            this.state = e, this.pos = t, this.explicit = i, this.abortListeners = []
        }
        tokenBefore(e) {
            let t = L(this.state).resolveInner(this.pos, -1);
            for (; t && e.indexOf(t.name) < 0;) t = t.parent;
            return t ? {
                from: t.from,
                to: this.pos,
                text: this.state.sliceDoc(t.from, this.pos),
                type: t.type
            } : null
        }
        matchBefore(e) {
            let t = this.state.doc.lineAt(this.pos),
                i = Math.max(t.from, this.pos - 250),
                r = t.text.slice(i - t.from, this.pos - t.from),
                s = r.search(Fl(e, !1));
            return s < 0 ? null : {
                from: i + s,
                to: this.pos,
                text: r.slice(s)
            }
        }
        get aborted() {
            return this.abortListeners == null
        }
        addEventListener(e, t) {
            e == "abort" && this.abortListeners && this.abortListeners.push(t)
        }
    };

    function Hl(n) {
        let e = Object.keys(n).join(""),
            t = /\w/.test(e);
        return t && (e = e.replace(/\w/g, "")), `[${t?"\\w":""}${e.replace(/[^\w\s]/g,"\\$&")}]`
    }

    function hf(n) {
        let e = Object.create(null),
            t = Object.create(null);
        for (let {
                label: r
            } of n) {
            e[r[0]] = !0;
            for (let s = 1; s < r.length; s++) t[r[s]] = !0
        }
        let i = Hl(e) + Hl(t) + "*$";
        return [new RegExp("^" + i), new RegExp(i)]
    }

    function Zi(n) {
        let e = n.map(r => typeof r == "string" ? {
                label: r
            } : r),
            [t, i] = e.every(r => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : hf(e);
        return r => {
            let s = r.matchBefore(i);
            return s || r.explicit ? {
                from: s ? s.from : r.pos,
                options: e,
                validFor: t
            } : null
        }
    }

    function zn(n, e) {
        return t => {
            for (let i = L(t.state).resolveInner(t.pos, -1); i; i = i.parent)
                if (n.indexOf(i.name) > -1) return null;
            return e(t)
        }
    }
    var Ss = class {
        constructor(e, t, i) {
            this.completion = e, this.source = t, this.match = i
        }
    };

    function xt(n) {
        return n.selection.main.head
    }

    function Fl(n, e) {
        var t;
        let {
            source: i
        } = n, r = e && i[0] != "^", s = i[i.length - 1] != "$";
        return !r && !s ? n : new RegExp(`${r?"^":""}(?:${i})${s?"$":""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "")
    }
    var cf = Be.define();

    function uf(n, e, t, i) {
        return Object.assign(Object.assign({}, n.changeByRange(r => {
            if (r == n.selection.main) return {
                changes: {
                    from: t,
                    to: i,
                    insert: e
                },
                range: y.cursor(t + e.length)
            };
            let s = i - t;
            return !r.empty || s && n.sliceDoc(r.from - s, r.from) != n.sliceDoc(t, i) ? {
                range: r
            } : {
                changes: {
                    from: r.from - s,
                    to: r.from,
                    insert: e
                },
                range: y.cursor(r.from - s + e.length)
            }
        })), {
            userEvent: "input.complete"
        })
    }

    function Kl(n, e) {
        let t = e.completion.apply || e.completion.label,
            i = e.source;
        typeof t == "string" ? n.dispatch(Object.assign(Object.assign({}, uf(n.state, t, i.from, i.to)), {
            annotations: cf.of(e.completion)
        })) : t(n, e.completion, i.from, i.to)
    }
    var Jl = new WeakMap;

    function ff(n) {
        if (!Array.isArray(n)) return n;
        let e = Jl.get(n);
        return e || Jl.set(n, e = Zi(n)), e
    }
    var ea = class {
            constructor(e) {
                this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [];
                for (let t = 0; t < e.length;) {
                    let i = xe(e, t),
                        r = Ue(i);
                    this.chars.push(i);
                    let s = e.slice(t, t + r),
                        O = s.toUpperCase();
                    this.folded.push(xe(O == s ? s.toLowerCase() : O, 0)), t += r
                }
                this.astral = e.length != this.chars.length
            }
            match(e) {
                if (this.pattern.length == 0) return [0];
                if (e.length < this.pattern.length) return null;
                let {
                    chars: t,
                    folded: i,
                    any: r,
                    precise: s,
                    byWord: O
                } = this;
                if (t.length == 1) {
                    let S = xe(e, 0);
                    return S == t[0] ? [0, 0, Ue(S)] : S == i[0] ? [-200, 0, Ue(S)] : null
                }
                let o = e.indexOf(this.pattern);
                if (o == 0) return [0, 0, this.pattern.length];
                let l = t.length,
                    a = 0;
                if (o < 0) {
                    for (let S = 0, k = Math.min(e.length, 200); S < k && a < l;) {
                        let x = xe(e, S);
                        (x == t[a] || x == i[a]) && (r[a++] = S), S += Ue(x)
                    }
                    if (a < l) return null
                }
                let h = 0,
                    c = 0,
                    f = !1,
                    d = 0,
                    p = -1,
                    m = -1,
                    $ = /[a-z]/.test(e),
                    g = !0;
                for (let S = 0, k = Math.min(e.length, 200), x = 0; S < k && c < l;) {
                    let X = xe(e, S);
                    o < 0 && (h < l && X == t[h] && (s[h++] = S), d < l && (X == t[d] || X == i[d] ? (d == 0 && (p = S), m = S + 1, d++) : d = 0));
                    let v, W = X < 255 ? X >= 48 && X <= 57 || X >= 97 && X <= 122 ? 2 : X >= 65 && X <= 90 ? 1 : 0 : (v = cO(X)) != v.toLowerCase() ? 1 : v != v.toUpperCase() ? 2 : 0;
                    (!S || W == 1 && $ || x == 0 && W != 0) && (t[c] == X || i[c] == X && (f = !0) ? O[c++] = S : O.length && (g = !1)), x = W, S += Ue(X)
                }
                return c == l && O[0] == 0 && g ? this.result(-100 + (f ? -200 : 0), O, e) : d == l && p == 0 ? [-200 - e.length, 0, m] : o > -1 ? [-700 - e.length, o, o + this.pattern.length] : d == l ? [-200 + -700 - e.length, p, m] : c == l ? this.result(-100 + (f ? -200 : 0) + -700 + (g ? 0 : -1100), O, e) : t.length == 2 ? null : this.result((r[0] ? -700 : 0) + -200 + -1100, r, e)
            }
            result(e, t, i) {
                let r = [e - i.length],
                    s = 1;
                for (let O of t) {
                    let o = O + (this.astral ? Ue(xe(i, O)) : 1);
                    s > 1 && r[s - 1] == O ? r[s - 1] = o : (r[s++] = O, r[s++] = o)
                }
                return r
            }
        },
        Re = T.define({
            combine(n) {
                return It(n, {
                    activateOnTyping: !0,
                    selectOnOpen: !0,
                    override: null,
                    closeOnBlur: !0,
                    maxRenderedOptions: 100,
                    defaultKeymap: !0,
                    optionClass: () => "",
                    aboveCursor: !1,
                    icons: !0,
                    addToOptions: [],
                    compareCompletions: (e, t) => e.label.localeCompare(t.label),
                    interactionDelay: 75
                }, {
                    defaultKeymap: (e, t) => e && t,
                    closeOnBlur: (e, t) => e && t,
                    icons: (e, t) => e && t,
                    optionClass: (e, t) => i => df(e(i), t(i)),
                    addToOptions: (e, t) => e.concat(t)
                })
            }
        });

    function df(n, e) {
        return n ? e ? n + " " + e : n : e
    }

    function pf(n) {
        let e = n.addToOptions.slice();
        return n.icons && e.push({
            render(t) {
                let i = document.createElement("div");
                return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map(r => "cm-completionIcon-" + r)), i.setAttribute("aria-hidden", "true"), i
            },
            position: 20
        }), e.push({
            render(t, i, r) {
                let s = document.createElement("span");
                s.className = "cm-completionLabel";
                let {
                    label: O
                } = t, o = 0;
                for (let l = 1; l < r.length;) {
                    let a = r[l++],
                        h = r[l++];
                    a > o && s.appendChild(document.createTextNode(O.slice(o, a)));
                    let c = s.appendChild(document.createElement("span"));
                    c.appendChild(document.createTextNode(O.slice(a, h))), c.className = "cm-completionMatchedText", o = h
                }
                return o < O.length && s.appendChild(document.createTextNode(O.slice(o))), s
            },
            position: 50
        }, {
            render(t) {
                if (!t.detail) return null;
                let i = document.createElement("span");
                return i.className = "cm-completionDetail", i.textContent = t.detail, i
            },
            position: 80
        }), e.sort((t, i) => t.position - i.position).map(t => t.render)
    }

    function ta(n, e, t) {
        if (n <= t) return {
            from: 0,
            to: n
        };
        if (e < 0 && (e = 0), e <= n >> 1) {
            let r = Math.floor(e / t);
            return {
                from: r * t,
                to: (r + 1) * t
            }
        }
        let i = Math.floor((n - e) / t);
        return {
            from: n - (i + 1) * t,
            to: n - i * t
        }
    }
    var ia = class {
        constructor(e, t) {
            this.view = e, this.stateField = t, this.info = null, this.placeInfo = {
                read: () => this.measureInfo(),
                write: o => this.positionInfo(o),
                key: this
            }, this.space = null;
            let i = e.state.field(t),
                {
                    options: r,
                    selected: s
                } = i.open,
                O = e.state.facet(Re);
            this.optionContent = pf(O), this.optionClass = O.optionClass, this.range = ta(r.length, s, O.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.dom.addEventListener("mousedown", o => {
                for (let l = o.target, a; l && l != this.dom; l = l.parentNode)
                    if (l.nodeName == "LI" && (a = /-(\d+)$/.exec(l.id)) && +a[1] < r.length) {
                        Kl(e, r[+a[1]]), o.preventDefault();
                        return
                    }
            }), this.list = this.dom.appendChild(this.createListBox(r, i.id, this.range)), this.list.addEventListener("scroll", () => {
                this.info && this.view.requestMeasure(this.placeInfo)
            })
        }
        mount() {
            this.updateSel()
        }
        update(e) {
            var t, i, r;
            let s = e.state.field(this.stateField),
                O = e.startState.field(this.stateField);
            s != O && (this.updateSel(), ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) != ((i = O.open) === null || i === void 0 ? void 0 : i.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!((r = s.open) === null || r === void 0 ? void 0 : r.disabled)))
        }
        positioned(e) {
            this.space = e, this.info && this.view.requestMeasure(this.placeInfo)
        }
        updateSel() {
            let e = this.view.state.field(this.stateField),
                t = e.open;
            if ((t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = ta(t.options.length, t.selected, this.view.state.facet(Re).maxRenderedOptions), this.list.remove(), this.list = this.dom.appendChild(this.createListBox(t.options, e.id, this.range)), this.list.addEventListener("scroll", () => {
                    this.info && this.view.requestMeasure(this.placeInfo)
                })), this.updateSelectedOption(t.selected)) {
                this.info && (this.info.remove(), this.info = null);
                let {
                    completion: i
                } = t.options[t.selected], {
                    info: r
                } = i;
                if (!r) return;
                let s = typeof r == "string" ? document.createTextNode(r) : r(i);
                if (!s) return;
                "then" in s ? s.then(O => {
                    O && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(O)
                }).catch(O => ye(this.view.state, O, "completion info")) : this.addInfoPane(s)
            }
        }
        addInfoPane(e) {
            let t = this.info = document.createElement("div");
            t.className = "cm-tooltip cm-completionInfo", t.appendChild(e), this.dom.appendChild(t), this.view.requestMeasure(this.placeInfo)
        }
        updateSelectedOption(e) {
            let t = null;
            for (let i = this.list.firstChild, r = this.range.from; i; i = i.nextSibling, r++) r == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
            return t && mf(this.list, t), t
        }
        measureInfo() {
            let e = this.dom.querySelector("[aria-selected]");
            if (!e || !this.info) return null;
            let t = this.dom.getBoundingClientRect(),
                i = this.info.getBoundingClientRect(),
                r = e.getBoundingClientRect(),
                s = this.space;
            if (!s) {
                let p = this.dom.ownerDocument.defaultView || window;
                s = {
                    left: 0,
                    top: 0,
                    right: p.innerWidth,
                    bottom: p.innerHeight
                }
            }
            if (r.top > Math.min(s.bottom, t.bottom) - 10 || r.bottom < Math.max(s.top, t.top) + 10) return null;
            let O = this.view.textDirection == H.RTL,
                o = O,
                l = !1,
                a, h = "",
                c = "",
                f = t.left - s.left,
                d = s.right - t.right;
            if (o && f < Math.min(i.width, d) ? o = !1 : !o && d < Math.min(i.width, f) && (o = !0), i.width <= (o ? f : d)) h = Math.max(s.top, Math.min(r.top, s.bottom - i.height)) - t.top + "px", a = Math.min(400, o ? f : d) + "px";
            else {
                l = !0, a = Math.min(400, (O ? t.right : s.right - t.left) - 30) + "px";
                let p = s.bottom - t.bottom;
                p >= i.height || p > t.top ? h = r.bottom - t.top + "px" : c = t.bottom - r.top + "px"
            }
            return {
                top: h,
                bottom: c,
                maxWidth: a,
                class: l ? O ? "left-narrow" : "right-narrow" : o ? "left" : "right"
            }
        }
        positionInfo(e) {
            this.info && (e ? (this.info.style.top = e.top, this.info.style.bottom = e.bottom, this.info.style.maxWidth = e.maxWidth, this.info.className = "cm-tooltip cm-completionInfo cm-completionInfo-" + e.class) : this.info.style.top = "-1e6px")
        }
        createListBox(e, t, i) {
            let r = document.createElement("ul");
            r.id = t, r.setAttribute("role", "listbox"), r.setAttribute("aria-expanded", "true"), r.setAttribute("aria-label", this.view.state.phrase("Completions"));
            for (let s = i.from; s < i.to; s++) {
                let {
                    completion: O,
                    match: o
                } = e[s], l = r.appendChild(document.createElement("li"));
                l.id = t + "-" + s, l.setAttribute("role", "option");
                let a = this.optionClass(O);
                a && (l.className = a);
                for (let h of this.optionContent) {
                    let c = h(O, this.view.state, o);
                    c && l.appendChild(c)
                }
            }
            return i.from && r.classList.add("cm-completionListIncompleteTop"), i.to < e.length && r.classList.add("cm-completionListIncompleteBottom"), r
        }
    };

    function $f(n) {
        return e => new ia(e, n)
    }

    function mf(n, e) {
        let t = n.getBoundingClientRect(),
            i = e.getBoundingClientRect();
        i.top < t.top ? n.scrollTop -= t.top - i.top : i.bottom > t.bottom && (n.scrollTop += i.bottom - t.bottom)
    }

    function na(n) {
        return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0)
    }

    function gf(n, e) {
        let t = [],
            i = 0;
        for (let o of n)
            if (o.hasResult())
                if (o.result.filter === !1) {
                    let l = o.result.getMatch;
                    for (let a of o.result.options) {
                        let h = [1e9 - i++];
                        if (l)
                            for (let c of l(a)) h.push(c);
                        t.push(new Ss(a, o, h))
                    }
                } else {
                    let l = new ea(e.sliceDoc(o.from, o.to)),
                        a;
                    for (let h of o.result.options)(a = l.match(h.label)) && (h.boost != null && (a[0] += h.boost), t.push(new Ss(h, o, a)))
                }
        let r = [],
            s = null,
            O = e.facet(Re).compareCompletions;
        for (let o of t.sort((l, a) => a.match[0] - l.match[0] || O(l.completion, a.completion))) !s || s.label != o.completion.label || s.detail != o.completion.detail || s.type != null && o.completion.type != null && s.type != o.completion.type || s.apply != o.completion.apply ? r.push(o) : na(o.completion) > na(s) && (r[r.length - 1] = o), s = o.completion;
        return r
    }
    var Zt = class {
            constructor(e, t, i, r, s, O) {
                this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = r, this.selected = s, this.disabled = O
            }
            setSelected(e, t) {
                return e == this.selected || e >= this.options.length ? this : new Zt(this.options, ra(t, e), this.tooltip, this.timestamp, e, this.disabled)
            }
            static build(e, t, i, r, s) {
                let O = gf(e, t);
                if (!O.length) return r && e.some(l => l.state == 1) ? new Zt(r.options, r.attrs, r.tooltip, r.timestamp, r.selected, !0) : null;
                let o = t.facet(Re).selectOnOpen ? 0 : -1;
                if (r && r.selected != o && r.selected != -1) {
                    let l = r.options[r.selected].completion;
                    for (let a = 0; a < O.length; a++)
                        if (O[a].completion == l) {
                            o = a;
                            break
                        }
                }
                return new Zt(O, ra(i, o), {
                    pos: e.reduce((l, a) => a.hasResult() ? Math.min(l, a.from) : l, 1e8),
                    create: $f(ze),
                    above: s.aboveCursor
                }, r ? r.timestamp : Date.now(), o, !1)
            }
            map(e) {
                return new Zt(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), {
                    pos: e.mapPos(this.tooltip.pos)
                }), this.timestamp, this.selected, this.disabled)
            }
        },
        _i = class {
            constructor(e, t, i) {
                this.active = e, this.id = t, this.open = i
            }
            static start() {
                return new _i(Sf, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null)
            }
            update(e) {
                let {
                    state: t
                } = e, i = t.facet(Re), s = (i.override || t.languageDataAt("autocomplete", xt(t)).map(ff)).map(o => (this.active.find(a => a.source == o) || new fe(o, this.active.some(a => a.state != 0) ? 1 : 0)).update(e, i));
                s.length == this.active.length && s.every((o, l) => o == this.active[l]) && (s = this.active);
                let O = this.open;
                e.selection || s.some(o => o.hasResult() && e.changes.touchesRange(o.from, o.to)) || !Qf(s, this.active) ? O = Zt.build(s, t, this.id, this.open, i) : O && O.disabled && !s.some(o => o.state == 1) ? O = null : O && e.docChanged && (O = O.map(e.changes)), !O && s.every(o => o.state != 1) && s.some(o => o.hasResult()) && (s = s.map(o => o.hasResult() ? new fe(o.source, 0) : o));
                for (let o of e.effects) o.is(sa) && (O = O && O.setSelected(o.value, this.id));
                return s == this.active && O == this.open ? this : new _i(s, this.id, O)
            }
            get tooltip() {
                return this.open ? this.open.tooltip : null
            }
            get attrs() {
                return this.open ? this.open.attrs : yf
            }
        };

    function Qf(n, e) {
        if (n == e) return !0;
        for (let t = 0, i = 0;;) {
            for (; t < n.length && !n[t].hasResult;) t++;
            for (; i < e.length && !e[i].hasResult;) i++;
            let r = t == n.length,
                s = i == e.length;
            if (r || s) return r == s;
            if (n[t++].result != e[i++].result) return !1
        }
    }
    var yf = {
        "aria-autocomplete": "list"
    };

    function ra(n, e) {
        let t = {
            "aria-autocomplete": "list",
            "aria-haspopup": "listbox",
            "aria-controls": n
        };
        return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t
    }
    var Sf = [];

    function bs(n) {
        return n.isUserEvent("input.type") ? "input" : n.isUserEvent("delete.backward") ? "delete" : null
    }
    var fe = class {
            constructor(e, t, i = -1) {
                this.source = e, this.state = t, this.explicitPos = i
            }
            hasResult() {
                return !1
            }
            update(e, t) {
                let i = bs(e),
                    r = this;
                i ? r = r.handleUserEvent(e, i, t) : e.docChanged ? r = r.handleChange(e) : e.selection && r.state != 0 && (r = new fe(r.source, 0));
                for (let s of e.effects)
                    if (s.is(Ps)) r = new fe(r.source, 1, s.value ? xt(e.state) : -1);
                    else if (s.is(Wn)) r = new fe(r.source, 0);
                else if (s.is(Oa))
                    for (let O of s.value) O.source == r.source && (r = O);
                return r
            }
            handleUserEvent(e, t, i) {
                return t == "delete" || !i.activateOnTyping ? this.map(e.changes) : new fe(this.source, 1)
            }
            handleChange(e) {
                return e.changes.touchesRange(xt(e.startState)) ? new fe(this.source, 0) : this.map(e.changes)
            }
            map(e) {
                return e.empty || this.explicitPos < 0 ? this : new fe(this.source, this.state, e.mapPos(this.explicitPos))
            }
        },
        ai = class extends fe {
            constructor(e, t, i, r, s) {
                super(e, 2, t);
                this.result = i, this.from = r, this.to = s
            }
            hasResult() {
                return !0
            }
            handleUserEvent(e, t, i) {
                var r;
                let s = e.changes.mapPos(this.from),
                    O = e.changes.mapPos(this.to, 1),
                    o = xt(e.state);
                if ((this.explicitPos < 0 ? o <= s : o < this.from) || o > O || t == "delete" && xt(e.startState) == this.from) return new fe(this.source, t == "input" && i.activateOnTyping ? 1 : 0);
                let l = this.explicitPos < 0 ? -1 : e.changes.mapPos(this.explicitPos),
                    a;
                return bf(this.result.validFor, e.state, s, O) ? new ai(this.source, l, this.result, s, O) : this.result.update && (a = this.result.update(this.result, s, O, new ys(e.state, o, l >= 0))) ? new ai(this.source, l, a, a.from, (r = a.to) !== null && r !== void 0 ? r : xt(e.state)) : new fe(this.source, 1, l)
            }
            handleChange(e) {
                return e.changes.touchesRange(this.from, this.to) ? new fe(this.source, 0) : this.map(e.changes)
            }
            map(e) {
                return e.empty ? this : new ai(this.source, this.explicitPos < 0 ? -1 : e.mapPos(this.explicitPos), this.result, e.mapPos(this.from), e.mapPos(this.to, 1))
            }
        };

    function bf(n, e, t, i) {
        if (!n) return !1;
        let r = e.sliceDoc(t, i);
        return typeof n == "function" ? n(r, t, i, e) : Fl(n, !0).test(r)
    }
    var Ps = Z.define(),
        Wn = Z.define(),
        Oa = Z.define({
            map(n, e) {
                return n.map(t => t.map(e))
            }
        }),
        sa = Z.define(),
        ze = pe.define({
            create() {
                return _i.start()
            },
            update(n, e) {
                return n.update(e)
            },
            provide: n => [Hr.from(n, e => e.tooltip), w.contentAttributes.from(n, e => e.attrs)]
        });

    function qn(n, e = "option") {
        return t => {
            let i = t.state.field(ze, !1);
            if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(Re).interactionDelay) return !1;
            let r = 1,
                s;
            e == "page" && (s = hl(t, i.open.tooltip)) && (r = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
            let {
                length: O
            } = i.open.options, o = i.open.selected > -1 ? i.open.selected + r * (n ? 1 : -1) : n ? 0 : O - 1;
            return o < 0 ? o = e == "page" ? 0 : O - 1 : o >= O && (o = e == "page" ? O - 1 : 0), t.dispatch({
                effects: sa.of(o)
            }), !0
        }
    }
    var Pf = n => {
            let e = n.state.field(ze, !1);
            return n.state.readOnly || !e || !e.open || e.open.selected < 0 || Date.now() - e.open.timestamp < n.state.facet(Re).interactionDelay ? !1 : (e.open.disabled || Kl(n, e.open.options[e.open.selected]), !0)
        },
        xf = n => n.state.field(ze, !1) ? (n.dispatch({
            effects: Ps.of(!0)
        }), !0) : !1,
        Tf = n => {
            let e = n.state.field(ze, !1);
            return !e || !e.active.some(t => t.state != 0) ? !1 : (n.dispatch({
                effects: Wn.of(null)
            }), !0)
        },
        oa = class {
            constructor(e, t) {
                this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0
            }
        },
        la = 50,
        kf = 50,
        vf = 1e3,
        wf = ve.fromClass(class {
            constructor(n) {
                this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.composing = 0;
                for (let e of n.state.field(ze).active) e.state == 1 && this.startQuery(e)
            }
            update(n) {
                let e = n.state.field(ze);
                if (!n.selectionSet && !n.docChanged && n.startState.field(ze) == e) return;
                let t = n.transactions.some(i => (i.selection || i.docChanged) && !bs(i));
                for (let i = 0; i < this.running.length; i++) {
                    let r = this.running[i];
                    if (t || r.updates.length + n.transactions.length > kf && Date.now() - r.time > vf) {
                        for (let s of r.context.abortListeners) try {
                            s()
                        } catch (O) {
                            ye(this.view.state, O)
                        }
                        r.context.abortListeners = null, this.running.splice(i--, 1)
                    } else r.updates.push(...n.transactions)
                }
                if (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), this.debounceUpdate = e.active.some(i => i.state == 1 && !this.running.some(r => r.active.source == i.source)) ? setTimeout(() => this.startUpdate(), la) : -1, this.composing != 0)
                    for (let i of n.transactions) bs(i) == "input" ? this.composing = 2 : this.composing == 2 && i.selection && (this.composing = 3)
            }
            startUpdate() {
                this.debounceUpdate = -1;
                let {
                    state: n
                } = this.view, e = n.field(ze);
                for (let t of e.active) t.state == 1 && !this.running.some(i => i.active.source == t.source) && this.startQuery(t)
            }
            startQuery(n) {
                let {
                    state: e
                } = this.view, t = xt(e), i = new ys(e, t, n.explicitPos == t), r = new oa(n, i);
                this.running.push(r), Promise.resolve(n.source(i)).then(s => {
                    r.context.aborted || (r.done = s || null, this.scheduleAccept())
                }, s => {
                    this.view.dispatch({
                        effects: Wn.of(null)
                    }), ye(this.view.state, s)
                })
            }
            scheduleAccept() {
                this.running.every(n => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), la))
            }
            accept() {
                var n;
                this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
                let e = [],
                    t = this.view.state.facet(Re);
                for (let i = 0; i < this.running.length; i++) {
                    let r = this.running[i];
                    if (r.done === void 0) continue;
                    if (this.running.splice(i--, 1), r.done) {
                        let O = new ai(r.active.source, r.active.explicitPos, r.done, r.done.from, (n = r.done.to) !== null && n !== void 0 ? n : xt(r.updates.length ? r.updates[0].startState : this.view.state));
                        for (let o of r.updates) O = O.update(o, t);
                        if (O.hasResult()) {
                            e.push(O);
                            continue
                        }
                    }
                    let s = this.view.state.field(ze).active.find(O => O.source == r.active.source);
                    if (s && s.state == 1)
                        if (r.done == null) {
                            let O = new fe(r.active.source, 0);
                            for (let o of r.updates) O = O.update(o, t);
                            O.state != 1 && e.push(O)
                        } else this.startQuery(s)
                }
                e.length && this.view.dispatch({
                    effects: Oa.of(e)
                })
            }
        }, {
            eventHandlers: {
                blur() {
                    let n = this.view.state.field(ze, !1);
                    n && n.tooltip && this.view.state.facet(Re).closeOnBlur && this.view.dispatch({
                        effects: Wn.of(null)
                    })
                },
                compositionstart() {
                    this.composing = 1
                },
                compositionend() {
                    this.composing == 3 && setTimeout(() => this.view.dispatch({
                        effects: Ps.of(!1)
                    }), 20), this.composing = 0
                }
            }
        }),
        aa = w.baseTheme({
            ".cm-tooltip.cm-tooltip-autocomplete": {
                "& > ul": {
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                    overflow: "hidden auto",
                    maxWidth_fallback: "700px",
                    maxWidth: "min(700px, 95vw)",
                    minWidth: "250px",
                    maxHeight: "10em",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    "& > li": {
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        padding: "1px 3px",
                        lineHeight: 1.2
                    }
                }
            },
            "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
                background: "#17c",
                color: "white"
            },
            "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
                background: "#777"
            },
            "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
                background: "#347",
                color: "white"
            },
            "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
                background: "#444"
            },
            ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
                content: '"\xB7\xB7\xB7"',
                opacity: .5,
                display: "block",
                textAlign: "center"
            },
            ".cm-tooltip.cm-completionInfo": {
                position: "absolute",
                padding: "3px 9px",
                width: "max-content",
                maxWidth: `${400}px`,
                boxSizing: "border-box"
            },
            ".cm-completionInfo.cm-completionInfo-left": {
                right: "100%"
            },
            ".cm-completionInfo.cm-completionInfo-right": {
                left: "100%"
            },
            ".cm-completionInfo.cm-completionInfo-left-narrow": {
                right: `${30}px`
            },
            ".cm-completionInfo.cm-completionInfo-right-narrow": {
                left: `${30}px`
            },
            "&light .cm-snippetField": {
                backgroundColor: "#00000022"
            },
            "&dark .cm-snippetField": {
                backgroundColor: "#ffffff22"
            },
            ".cm-snippetFieldPosition": {
                verticalAlign: "text-top",
                width: 0,
                height: "1.15em",
                display: "inline-block",
                margin: "0 -0.7px -.7em",
                borderLeft: "1.4px dotted #888"
            },
            ".cm-completionMatchedText": {
                textDecoration: "underline"
            },
            ".cm-completionDetail": {
                marginLeft: "0.5em",
                fontStyle: "italic"
            },
            ".cm-completionIcon": {
                fontSize: "90%",
                width: ".8em",
                display: "inline-block",
                textAlign: "center",
                paddingRight: ".6em",
                opacity: "0.6",
                boxSizing: "content-box"
            },
            ".cm-completionIcon-function, .cm-completionIcon-method": {
                "&:after": {
                    content: "'\u0192'"
                }
            },
            ".cm-completionIcon-class": {
                "&:after": {
                    content: "'\u25CB'"
                }
            },
            ".cm-completionIcon-interface": {
                "&:after": {
                    content: "'\u25CC'"
                }
            },
            ".cm-completionIcon-variable": {
                "&:after": {
                    content: "'\u{1D465}'"
                }
            },
            ".cm-completionIcon-constant": {
                "&:after": {
                    content: "'\u{1D436}'"
                }
            },
            ".cm-completionIcon-type": {
                "&:after": {
                    content: "'\u{1D461}'"
                }
            },
            ".cm-completionIcon-enum": {
                "&:after": {
                    content: "'\u222A'"
                }
            },
            ".cm-completionIcon-property": {
                "&:after": {
                    content: "'\u25A1'"
                }
            },
            ".cm-completionIcon-keyword": {
                "&:after": {
                    content: "'\u{1F511}\uFE0E'"
                }
            },
            ".cm-completionIcon-namespace": {
                "&:after": {
                    content: "'\u25A2'"
                }
            },
            ".cm-completionIcon-text": {
                "&:after": {
                    content: "'abc'",
                    fontSize: "50%",
                    verticalAlign: "middle"
                }
            }
        }),
        ha = class {
            constructor(e, t, i, r) {
                this.field = e, this.line = t, this.from = i, this.to = r
            }
        },
        Zn = class {
            constructor(e, t, i) {
                this.field = e, this.from = t, this.to = i
            }
            map(e) {
                let t = e.mapPos(this.from, -1, re.TrackDel),
                    i = e.mapPos(this.to, 1, re.TrackDel);
                return t == null || i == null ? null : new Zn(this.field, t, i)
            }
        },
        _n = class {
            constructor(e, t) {
                this.lines = e, this.fieldPositions = t
            }
            instantiate(e, t) {
                let i = [],
                    r = [t],
                    s = e.doc.lineAt(t),
                    O = /^\s*/.exec(s.text)[0];
                for (let l of this.lines) {
                    if (i.length) {
                        let a = O,
                            h = /^\t*/.exec(l)[0].length;
                        for (let c = 0; c < h; c++) a += e.facet(li);
                        r.push(t + a.length - h), l = a + l.slice(h)
                    }
                    i.push(l), t += l.length + 1
                }
                let o = this.fieldPositions.map(l => new Zn(l.field, r[l.line] + l.from, r[l.line] + l.to));
                return {
                    text: i,
                    ranges: o
                }
            }
            static parse(e) {
                let t = [],
                    i = [],
                    r = [],
                    s;
                for (let O of e.split(/\r\n?|\n/)) {
                    for (; s = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(O);) {
                        let o = s[1] ? +s[1] : null,
                            l = s[2] || s[3] || "",
                            a = -1;
                        for (let h = 0; h < t.length; h++)(o != null ? t[h].seq == o : l ? t[h].name == l : !1) && (a = h);
                        if (a < 0) {
                            let h = 0;
                            for (; h < t.length && (o == null || t[h].seq != null && t[h].seq < o);) h++;
                            t.splice(h, 0, {
                                seq: o,
                                name: l
                            }), a = h;
                            for (let c of r) c.field >= a && c.field++
                        }
                        r.push(new ha(a, i.length, s.index, s.index + l.length)), O = O.slice(0, s.index) + l + O.slice(s.index + s[0].length)
                    }
                    for (let o; o = /\\([{}])/.exec(O);) {
                        O = O.slice(0, o.index) + o[1] + O.slice(o.index + o[0].length);
                        for (let l of r) l.line == i.length && l.from > o.index && (l.from--, l.to--)
                    }
                    i.push(O)
                }
                return new _n(i, r)
            }
        },
        Xf = Y.widget({
            widget: new class extends dt {
                toDOM() {
                    let n = document.createElement("span");
                    return n.className = "cm-snippetFieldPosition", n
                }
                ignoreEvent() {
                    return !1
                }
            }
        }),
        Rf = Y.mark({
            class: "cm-snippetField"
        }),
        _t = class {
            constructor(e, t) {
                this.ranges = e, this.active = t, this.deco = Y.set(e.map(i => (i.from == i.to ? Xf : Rf).range(i.from, i.to)))
            }
            map(e) {
                let t = [];
                for (let i of this.ranges) {
                    let r = i.map(e);
                    if (!r) return null;
                    t.push(r)
                }
                return new _t(t, this.active)
            }
            selectionInsideField(e) {
                return e.ranges.every(t => this.ranges.some(i => i.field == this.active && i.from <= t.from && i.to >= t.to))
            }
        },
        Vi = Z.define({
            map(n, e) {
                return n && n.map(e)
            }
        }),
        zf = Z.define(),
        Ui = pe.define({
            create() {
                return null
            },
            update(n, e) {
                for (let t of e.effects) {
                    if (t.is(Vi)) return t.value;
                    if (t.is(zf) && n) return new _t(n.ranges, t.value)
                }
                return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n
            },
            provide: n => w.decorations.from(n, e => e ? e.deco : Y.none)
        });

    function xs(n, e) {
        return y.create(n.filter(t => t.field == e).map(t => y.range(t.from, t.to)))
    }

    function Zf(n) {
        let e = _n.parse(n);
        return (t, i, r, s) => {
            let {
                text: O,
                ranges: o
            } = e.instantiate(t.state, r), l = {
                changes: {
                    from: r,
                    to: s,
                    insert: z.of(O)
                },
                scrollIntoView: !0
            };
            if (o.length && (l.selection = xs(o, 0)), o.length > 1) {
                let a = new _t(o, 0),
                    h = l.effects = [Vi.of(a)];
                t.state.field(Ui, !1) === void 0 && h.push(Z.appendConfig.of([Ui, Wf, qf, aa]))
            }
            t.dispatch(t.state.update(l))
        }
    }

    function ca(n) {
        return ({
            state: e,
            dispatch: t
        }) => {
            let i = e.field(Ui, !1);
            if (!i || n < 0 && i.active == 0) return !1;
            let r = i.active + n,
                s = n > 0 && !i.ranges.some(O => O.field == r + n);
            return t(e.update({
                selection: xs(i.ranges, r),
                effects: Vi.of(s ? null : new _t(i.ranges, r))
            })), !0
        }
    }
    var _f = ({
            state: n,
            dispatch: e
        }) => n.field(Ui, !1) ? (e(n.update({
            effects: Vi.of(null)
        })), !0) : !1,
        Vf = ca(1),
        Uf = ca(-1),
        Cf = [{
            key: "Tab",
            run: Vf,
            shift: Uf
        }, {
            key: "Escape",
            run: _f
        }],
        ua = T.define({
            combine(n) {
                return n.length ? n[0] : Cf
            }
        }),
        Wf = ut.highest(ii.compute([ua], n => n.facet(ua)));

    function We(n, e) {
        return Object.assign(Object.assign({}, e), {
            apply: Zf(n)
        })
    }
    var qf = w.domEventHandlers({
        mousedown(n, e) {
            let t = e.state.field(Ui, !1),
                i;
            if (!t || (i = e.posAtCoords({
                    x: n.clientX,
                    y: n.clientY
                })) == null) return !1;
            let r = t.ranges.find(s => s.from <= i && s.to >= i);
            return !r || r.field == t.active ? !1 : (e.dispatch({
                selection: xs(t.ranges, r.field),
                effects: Vi.of(t.ranges.some(s => s.field > r.field) ? new _t(t.ranges, r.field) : null)
            }), !0)
        }
    });
    var fa = new class extends Ne {};
    fa.startSide = 1;
    fa.endSide = -1;
    var Gg = typeof navigator == "object" && /Android\b/.test(navigator.userAgent);

    function da(n = {}) {
        return [ze, Re.of(n), wf, Af, aa]
    }
    var Yf = [{
            key: "Ctrl-Space",
            run: xf
        }, {
            key: "Escape",
            run: Tf
        }, {
            key: "ArrowDown",
            run: qn(!0)
        }, {
            key: "ArrowUp",
            run: qn(!1)
        }, {
            key: "PageDown",
            run: qn(!0, "page")
        }, {
            key: "PageUp",
            run: qn(!1, "page")
        }, {
            key: "Enter",
            run: Pf
        }],
        Af = ut.highest(ii.computeN([Re], n => n.facet(Re).defaultKeymap ? [Yf] : []));
    var Ci = class {
            constructor(e, t, i, r, s, O, o, l, a, h = 0, c) {
                this.p = e, this.stack = t, this.state = i, this.reducePos = r, this.pos = s, this.score = O, this.buffer = o, this.bufferBase = l, this.curContext = a, this.lookAhead = h, this.parent = c
            }
            toString() {
                return `[${this.stack.filter((e,t)=>t%3==0).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`
            }
            static start(e, t, i = 0) {
                let r = e.parser.context;
                return new Ci(e, [], t, i, i, 0, [], 0, r ? new Ts(r, r.start) : null, 0, null)
            }
            get context() {
                return this.curContext ? this.curContext.context : null
            }
            pushState(e, t) {
                this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e
            }
            reduce(e) {
                let t = e >> 19,
                    i = e & 65535,
                    {
                        parser: r
                    } = this.p,
                    s = r.dynamicPrecedence(i);
                if (s && (this.score += s), t == 0) {
                    this.pushState(r.getGoto(this.state, i, !0), this.reducePos), i < r.minRepeatTerm && this.storeNode(i, this.reducePos, this.reducePos, 4, !0), this.reduceContext(i, this.reducePos);
                    return
                }
                let O = this.stack.length - (t - 1) * 3 - (e & 262144 ? 6 : 0),
                    o = this.stack[O - 2],
                    l = this.stack[O - 1],
                    a = this.bufferBase + this.buffer.length - l;
                if (i < r.minRepeatTerm || e & 131072) {
                    let h = r.stateFlag(this.state, 1) ? this.pos : this.reducePos;
                    this.storeNode(i, o, h, a + 4, !0)
                }
                if (e & 262144) this.state = this.stack[O];
                else {
                    let h = this.stack[O - 3];
                    this.state = r.getGoto(h, i, !0)
                }
                for (; this.stack.length > O;) this.stack.pop();
                this.reduceContext(i, o)
            }
            storeNode(e, t, i, r = 4, s = !1) {
                if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
                    let O = this,
                        o = this.buffer.length;
                    if (o == 0 && O.parent && (o = O.bufferBase - O.parent.bufferBase, O = O.parent), o > 0 && O.buffer[o - 4] == 0 && O.buffer[o - 1] > -1) {
                        if (t == i) return;
                        if (O.buffer[o - 2] >= t) {
                            O.buffer[o - 2] = i;
                            return
                        }
                    }
                }
                if (!s || this.pos == i) this.buffer.push(e, t, i, r);
                else {
                    let O = this.buffer.length;
                    if (O > 0 && this.buffer[O - 4] != 0)
                        for (; O > 0 && this.buffer[O - 2] > i;) this.buffer[O] = this.buffer[O - 4], this.buffer[O + 1] = this.buffer[O - 3], this.buffer[O + 2] = this.buffer[O - 2], this.buffer[O + 3] = this.buffer[O - 1], O -= 4, r > 4 && (r -= 4);
                    this.buffer[O] = e, this.buffer[O + 1] = t, this.buffer[O + 2] = i, this.buffer[O + 3] = r
                }
            }
            shift(e, t, i) {
                let r = this.pos;
                if (e & 131072) this.pushState(e & 65535, this.pos);
                else if ((e & 262144) == 0) {
                    let s = e,
                        {
                            parser: O
                        } = this.p;
                    (i > this.pos || t <= O.maxNode) && (this.pos = i, O.stateFlag(s, 1) || (this.reducePos = i)), this.pushState(s, r), this.shiftContext(t, r), t <= O.maxNode && this.buffer.push(t, r, i, 4)
                } else this.pos = i, this.shiftContext(t, r), t <= this.p.parser.maxNode && this.buffer.push(t, r, i, 4)
            }
            apply(e, t, i) {
                e & 65536 ? this.reduce(e) : this.shift(e, t, i)
            }
            useNode(e, t) {
                let i = this.p.reused.length - 1;
                (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
                let r = this.pos;
                this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(i, r, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)))
            }
            split() {
                let e = this,
                    t = e.buffer.length;
                for (; t > 0 && e.buffer[t - 2] > e.reducePos;) t -= 4;
                let i = e.buffer.slice(t),
                    r = e.bufferBase + t;
                for (; e && r == e.bufferBase;) e = e.parent;
                return new Ci(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, r, this.curContext, this.lookAhead, e)
            }
            recoverByDelete(e, t) {
                let i = e <= this.p.parser.maxNode;
                i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190
            }
            canShift(e) {
                for (let t = new pa(this);;) {
                    let i = this.p.parser.stateSlot(t.state, 4) || this.p.parser.hasAction(t.state, e);
                    if (i == 0) return !1;
                    if ((i & 65536) == 0) return !0;
                    t.reduce(i)
                }
            }
            recoverByInsert(e) {
                if (this.stack.length >= 300) return [];
                let t = this.p.parser.nextStates(this.state);
                if (t.length > 4 << 1 || this.stack.length >= 120) {
                    let r = [];
                    for (let s = 0, O; s < t.length; s += 2)(O = t[s + 1]) != this.state && this.p.parser.hasAction(O, e) && r.push(t[s], O);
                    if (this.stack.length < 120)
                        for (let s = 0; r.length < 4 << 1 && s < t.length; s += 2) {
                            let O = t[s + 1];
                            r.some((o, l) => l & 1 && o == O) || r.push(t[s], O)
                        }
                    t = r
                }
                let i = [];
                for (let r = 0; r < t.length && i.length < 4; r += 2) {
                    let s = t[r + 1];
                    if (s == this.state) continue;
                    let O = this.split();
                    O.pushState(s, this.pos), O.storeNode(0, O.pos, O.pos, 4, !0), O.shiftContext(t[r], this.pos), O.score -= 200, i.push(O)
                }
                return i
            }
            forceReduce() {
                let e = this.p.parser.stateSlot(this.state, 5);
                if ((e & 65536) == 0) return !1;
                let {
                    parser: t
                } = this.p;
                if (!t.validAction(this.state, e)) {
                    let i = e >> 19,
                        r = e & 65535,
                        s = this.stack.length - i * 3;
                    if (s < 0 || t.getGoto(this.stack[s], r, !1) < 0) return !1;
                    this.storeNode(0, this.reducePos, this.reducePos, 4, !0), this.score -= 100
                }
                return this.reducePos = this.pos, this.reduce(e), !0
            }
            forceAll() {
                for (; !this.p.parser.stateFlag(this.state, 2);)
                    if (!this.forceReduce()) {
                        this.storeNode(0, this.pos, this.pos, 4, !0);
                        break
                    }
                return this
            }
            get deadEnd() {
                if (this.stack.length != 3) return !1;
                let {
                    parser: e
                } = this.p;
                return e.data[e.stateSlot(this.state, 1)] == 65535 && !e.stateSlot(this.state, 4)
            }
            restart() {
                this.state = this.stack[0], this.stack.length = 0
            }
            sameState(e) {
                if (this.state != e.state || this.stack.length != e.stack.length) return !1;
                for (let t = 0; t < this.stack.length; t += 3)
                    if (this.stack[t] != e.stack[t]) return !1;
                return !0
            }
            get parser() {
                return this.p.parser
            }
            dialectEnabled(e) {
                return this.p.parser.dialect.flags[e]
            }
            shiftContext(e, t) {
                this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)))
            }
            reduceContext(e, t) {
                this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)))
            }
            emitContext() {
                let e = this.buffer.length - 1;
                (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3)
            }
            emitLookAhead() {
                let e = this.buffer.length - 1;
                (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4)
            }
            updateContext(e) {
                if (e != this.curContext.context) {
                    let t = new Ts(this.curContext.tracker, e);
                    t.hash != this.curContext.hash && this.emitContext(), this.curContext = t
                }
            }
            setLookAhead(e) {
                e > this.lookAhead && (this.emitLookAhead(), this.lookAhead = e)
            }
            close() {
                this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead()
            }
        },
        Ts = class {
            constructor(e, t) {
                this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0
            }
        },
        ma;
    (function(n) {
        n[n.Insert = 200] = "Insert", n[n.Delete = 190] = "Delete", n[n.Reduce = 100] = "Reduce", n[n.MaxNext = 4] = "MaxNext", n[n.MaxInsertStackDepth = 300] = "MaxInsertStackDepth", n[n.DampenInsertStackDepth = 120] = "DampenInsertStackDepth"
    })(ma || (ma = {}));
    var pa = class {
            constructor(e) {
                this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length
            }
            reduce(e) {
                let t = e & 65535,
                    i = e >> 19;
                i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
                let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
                this.state = r
            }
        },
        Ai = class {
            constructor(e, t, i) {
                this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext()
            }
            static create(e, t = e.bufferBase + e.buffer.length) {
                return new Ai(e, t, t - e.bufferBase)
            }
            maybeNext() {
                let e = this.stack.parent;
                e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer)
            }
            get id() {
                return this.buffer[this.index - 4]
            }
            get start() {
                return this.buffer[this.index - 3]
            }
            get end() {
                return this.buffer[this.index - 2]
            }
            get size() {
                return this.buffer[this.index - 1]
            }
            next() {
                this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext()
            }
            fork() {
                return new Ai(this.stack, this.pos, this.index)
            }
        },
        Yi = class {
            constructor() {
                this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0
            }
        },
        $a = new Yi,
        ga = class {
            constructor(e, t) {
                this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = $a, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext()
            }
            resolveOffset(e, t) {
                let i = this.range,
                    r = this.rangeIndex,
                    s = this.pos + e;
                for (; s < i.from;) {
                    if (!r) return null;
                    let O = this.ranges[--r];
                    s -= i.from - O.to, i = O
                }
                for (; t < 0 ? s > i.to : s >= i.to;) {
                    if (r == this.ranges.length - 1) return null;
                    let O = this.ranges[++r];
                    s += O.from - i.to, i = O
                }
                return s
            }
            clipPos(e) {
                if (e >= this.range.from && e < this.range.to) return e;
                for (let t of this.ranges)
                    if (t.to > e) return Math.max(e, t.from);
                return this.end
            }
            peek(e) {
                let t = this.chunkOff + e,
                    i, r;
                if (t >= 0 && t < this.chunk.length) i = this.pos + e, r = this.chunk.charCodeAt(t);
                else {
                    let s = this.resolveOffset(e, 1);
                    if (s == null) return -1;
                    if (i = s, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length) r = this.chunk2.charCodeAt(i - this.chunk2Pos);
                    else {
                        let O = this.rangeIndex,
                            o = this.range;
                        for (; o.to <= i;) o = this.ranges[++O];
                        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > o.to && (this.chunk2 = this.chunk2.slice(0, o.to - i)), r = this.chunk2.charCodeAt(0)
                    }
                }
                return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), r
            }
            acceptToken(e, t = 0) {
                let i = t ? this.resolveOffset(t, -1) : this.pos;
                if (i == null || i < this.token.start) throw new RangeError("Token end out of bounds");
                this.token.value = e, this.token.end = i
            }
            getChunk() {
                if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
                    let {
                        chunk: e,
                        chunkPos: t
                    } = this;
                    this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos
                } else {
                    this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
                    let e = this.input.chunk(this.pos),
                        t = this.pos + e.length;
                    this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0
                }
            }
            readNext() {
                return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff)
            }
            advance(e = 1) {
                for (this.chunkOff += e; this.pos + e >= this.range.to;) {
                    if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
                    e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from
                }
                return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext()
            }
            setDone() {
                return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1
            }
            reset(e, t) {
                if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = $a, this.pos != e) {
                    if (this.pos = e, e == this.end) return this.setDone(), this;
                    for (; e < this.range.from;) this.range = this.ranges[--this.rangeIndex];
                    for (; e >= this.range.to;) this.range = this.ranges[++this.rangeIndex];
                    e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext()
                }
                return this
            }
            read(e, t) {
                if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length) return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
                if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
                if (e >= this.range.from && t <= this.range.to) return this.input.read(e, t);
                let i = "";
                for (let r of this.ranges) {
                    if (r.from >= t) break;
                    r.to > e && (i += this.input.read(Math.max(r.from, e), Math.min(r.to, t)))
                }
                return i
            }
        },
        ji = class {
            constructor(e, t) {
                this.data = e, this.id = t
            }
            token(e, t) {
                jf(this.data, e, t, this.id)
            }
        };
    ji.prototype.contextual = ji.prototype.fallback = ji.prototype.extend = !1;
    var E = class {
        constructor(e, t = {}) {
            this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend
        }
    };

    function jf(n, e, t, i) {
        let r = 0,
            s = 1 << i,
            {
                parser: O
            } = t.p,
            {
                dialect: o
            } = O;
        e: for (;
            (s & n[r]) != 0;) {
            let l = n[r + 1];
            for (let f = r + 3; f < l; f += 2)
                if ((n[f + 1] & s) > 0) {
                    let d = n[f];
                    if (o.allows(d) && (e.token.value == -1 || e.token.value == d || O.overrides(d, e.token.value))) {
                        e.acceptToken(d);
                        break
                    }
                }
            let a = e.next,
                h = 0,
                c = n[r + 2];
            if (e.next < 0 && c > h && n[l + c * 3 - 3] == 65535 && n[l + c * 3 - 3] == 65535) {
                r = n[l + c * 3 - 1];
                continue e
            }
            for (; h < c;) {
                let f = h + c >> 1,
                    d = l + f + (f << 1),
                    p = n[d],
                    m = n[d + 1] || 65536;
                if (a < p) c = f;
                else if (a >= m) h = f + 1;
                else {
                    r = n[d + 2], e.advance();
                    continue e
                }
            }
            break
        }
    }

    function Vn(n, e = Uint16Array) {
        if (typeof n != "string") return n;
        let t = null;
        for (let i = 0, r = 0; i < n.length;) {
            let s = 0;
            for (;;) {
                let O = n.charCodeAt(i++),
                    o = !1;
                if (O == 126) {
                    s = 65535;
                    break
                }
                O >= 92 && O--, O >= 34 && O--;
                let l = O - 32;
                if (l >= 46 && (l -= 46, o = !0), s += l, o) break;
                s *= 46
            }
            t ? t[r++] = s : t = new e(s)
        }
        return t
    }
    var Me = typeof process != "undefined" && process.env && /\bparse\b/.test(process.env.LOG),
        ks = null,
        Qa;
    (function(n) {
        n[n.Margin = 25] = "Margin"
    })(Qa || (Qa = {}));

    function ya(n, e, t) {
        let i = n.cursor(C.IncludeAnonymous);
        for (i.moveTo(e);;)
            if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
                for (;;) {
                    if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError) return t < 0 ? Math.max(0, Math.min(i.to - 1, e - 25)) : Math.min(n.length, Math.max(i.from + 1, e + 25));
                    if (t < 0 ? i.prevSibling() : i.nextSibling()) break;
                    if (!i.parent()) return t < 0 ? 0 : n.length
                }
    }
    var Sa = class {
            constructor(e, t) {
                this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment()
            }
            nextFragment() {
                let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
                if (e) {
                    for (this.safeFrom = e.openStart ? ya(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? ya(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length;) this.trees.pop(), this.start.pop(), this.index.pop();
                    this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom
                } else this.nextStart = 1e9
            }
            nodeAt(e) {
                if (e < this.nextStart) return null;
                for (; this.fragment && this.safeTo <= e;) this.nextFragment();
                if (!this.fragment) return null;
                for (;;) {
                    let t = this.trees.length - 1;
                    if (t < 0) return this.nextFragment(), null;
                    let i = this.trees[t],
                        r = this.index[t];
                    if (r == i.children.length) {
                        this.trees.pop(), this.start.pop(), this.index.pop();
                        continue
                    }
                    let s = i.children[r],
                        O = this.start[t] + i.positions[r];
                    if (O > e) return this.nextStart = O, null;
                    if (s instanceof j) {
                        if (O == e) {
                            if (O < this.safeFrom) return null;
                            let o = O + s.length;
                            if (o <= this.safeTo) {
                                let l = s.prop(R.lookAhead);
                                if (!l || o + l < this.fragment.to) return s
                            }
                        }
                        this.index[t]++, O + s.length >= Math.max(this.safeFrom, e) && (this.trees.push(s), this.start.push(O), this.index.push(0))
                    } else this.index[t]++, this.nextStart = O + s.length
                }
            }
        },
        ba = class {
            constructor(e, t) {
                this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map(i => new Yi)
            }
            getActions(e) {
                let t = 0,
                    i = null,
                    {
                        parser: r
                    } = e.p,
                    {
                        tokenizers: s
                    } = r,
                    O = r.stateSlot(e.state, 3),
                    o = e.curContext ? e.curContext.hash : 0,
                    l = 0;
                for (let a = 0; a < s.length; a++) {
                    if ((1 << a & O) == 0) continue;
                    let h = s[a],
                        c = this.tokens[a];
                    if (!(i && !h.fallback) && ((h.contextual || c.start != e.pos || c.mask != O || c.context != o) && (this.updateCachedToken(c, h, e), c.mask = O, c.context = o), c.lookAhead > c.end + 25 && (l = Math.max(c.lookAhead, l)), c.value != 0)) {
                        let f = t;
                        if (c.extended > -1 && (t = this.addActions(e, c.extended, c.end, t)), t = this.addActions(e, c.value, c.end, t), !h.extend && (i = c, t > f)) break
                    }
                }
                for (; this.actions.length > t;) this.actions.pop();
                return l && e.setLookAhead(l), !i && e.pos == this.stream.end && (i = new Yi, i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions
            }
            getMainToken(e) {
                if (this.mainToken) return this.mainToken;
                let t = new Yi,
                    {
                        pos: i,
                        p: r
                    } = e;
                return t.start = i, t.end = Math.min(i + 1, r.stream.end), t.value = i == r.stream.end ? r.parser.eofTerm : 0, t
            }
            updateCachedToken(e, t, i) {
                let r = this.stream.clipPos(i.pos);
                if (t.token(this.stream.reset(r, e), i), e.value > -1) {
                    let {
                        parser: s
                    } = i.p;
                    for (let O = 0; O < s.specialized.length; O++)
                        if (s.specialized[O] == e.value) {
                            let o = s.specializers[O](this.stream.read(e.start, e.end), i);
                            if (o >= 0 && i.p.parser.dialect.allows(o >> 1)) {
                                (o & 1) == 0 ? e.value = o >> 1 : e.extended = o >> 1;
                                break
                            }
                        }
                } else e.value = 0, e.end = this.stream.clipPos(r + 1)
            }
            putAction(e, t, i, r) {
                for (let s = 0; s < r; s += 3)
                    if (this.actions[s] == e) return r;
                return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = i, r
            }
            addActions(e, t, i, r) {
                let {
                    state: s
                } = e, {
                    parser: O
                } = e.p, {
                    data: o
                } = O;
                for (let l = 0; l < 2; l++)
                    for (let a = O.stateSlot(s, l ? 2 : 1);; a += 3) {
                        if (o[a] == 65535)
                            if (o[a + 1] == 1) a = Ot(o, a + 2);
                            else {
                                r == 0 && o[a + 1] == 2 && (r = this.putAction(Ot(o, a + 2), t, i, r));
                                break
                            }
                        o[a] == t && (r = this.putAction(Ot(o, a + 1), t, i, r))
                    }
                return r
            }
        },
        Pa;
    (function(n) {
        n[n.Distance = 5] = "Distance", n[n.MaxRemainingPerStep = 3] = "MaxRemainingPerStep", n[n.MinBufferLengthPrune = 500] = "MinBufferLengthPrune", n[n.ForceReduceLimit = 10] = "ForceReduceLimit", n[n.CutDepth = 15e3] = "CutDepth", n[n.CutTo = 9e3] = "CutTo"
    })(Pa || (Pa = {}));
    var xa = class {
        constructor(e, t, i, r) {
            this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.stream = new ga(t, r), this.tokens = new ba(e, this.stream), this.topTerm = e.top[1];
            let {
                from: s
            } = r[0];
            this.stacks = [Ci.start(this, e.top[0], s)], this.fragments = i.length && this.stream.end - s > e.bufferLength * 4 ? new Sa(i, e.nodeSet) : null
        }
        get parsedPos() {
            return this.minStackPos
        }
        advance() {
            let e = this.stacks,
                t = this.minStackPos,
                i = this.stacks = [],
                r, s;
            for (let O = 0; O < e.length; O++) {
                let o = e[O];
                for (;;) {
                    if (this.tokens.mainToken = null, o.pos > t) i.push(o);
                    else {
                        if (this.advanceStack(o, i, e)) continue; {
                            r || (r = [], s = []), r.push(o);
                            let l = this.tokens.getMainToken(o);
                            s.push(l.value, l.end)
                        }
                    }
                    break
                }
            }
            if (!i.length) {
                let O = r && Gf(r);
                if (O) return this.stackToTree(O);
                if (this.parser.strict) throw Me && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
                this.recovering || (this.recovering = 5)
            }
            if (this.recovering && r) {
                let O = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, s, i);
                if (O) return this.stackToTree(O.forceAll())
            }
            if (this.recovering) {
                let O = this.recovering == 1 ? 1 : this.recovering * 3;
                if (i.length > O)
                    for (i.sort((o, l) => l.score - o.score); i.length > O;) i.pop();
                i.some(o => o.reducePos > t) && this.recovering--
            } else if (i.length > 1) {
                e: for (let O = 0; O < i.length - 1; O++) {
                    let o = i[O];
                    for (let l = O + 1; l < i.length; l++) {
                        let a = i[l];
                        if (o.sameState(a) || o.buffer.length > 500 && a.buffer.length > 500)
                            if ((o.score - a.score || o.buffer.length - a.buffer.length) > 0) i.splice(l--, 1);
                            else {
                                i.splice(O--, 1);
                                continue e
                            }
                    }
                }
            }
            this.minStackPos = i[0].pos;
            for (let O = 1; O < i.length; O++) i[O].pos < this.minStackPos && (this.minStackPos = i[O].pos);
            return null
        }
        stopAt(e) {
            if (this.stoppedAt != null && this.stoppedAt < e) throw new RangeError("Can't move stoppedAt forward");
            this.stoppedAt = e
        }
        advanceStack(e, t, i) {
            let r = e.pos,
                {
                    parser: s
                } = this,
                O = Me ? this.stackID(e) + " -> " : "";
            if (this.stoppedAt != null && r > this.stoppedAt) return e.forceReduce() ? e : null;
            if (this.fragments) {
                let a = e.curContext && e.curContext.tracker.strict,
                    h = a ? e.curContext.hash : 0;
                for (let c = this.fragments.nodeAt(r); c;) {
                    let f = this.parser.nodeSet.types[c.type.id] == c.type ? s.getGoto(e.state, c.type.id) : -1;
                    if (f > -1 && c.length && (!a || (c.prop(R.contextHash) || 0) == h)) return e.useNode(c, f), Me && console.log(O + this.stackID(e) + ` (via reuse of ${s.getName(c.type.id)})`), !0;
                    if (!(c instanceof j) || c.children.length == 0 || c.positions[0] > 0) break;
                    let d = c.children[0];
                    if (d instanceof j && c.positions[0] == 0) c = d;
                    else break
                }
            }
            let o = s.stateSlot(e.state, 4);
            if (o > 0) return e.reduce(o), Me && console.log(O + this.stackID(e) + ` (via always-reduce ${s.getName(o&65535)})`), !0;
            if (e.stack.length >= 15e3)
                for (; e.stack.length > 9e3 && e.forceReduce(););
            let l = this.tokens.getActions(e);
            for (let a = 0; a < l.length;) {
                let h = l[a++],
                    c = l[a++],
                    f = l[a++],
                    d = a == l.length || !i,
                    p = d ? e : e.split();
                if (p.apply(h, c, f), Me && console.log(O + this.stackID(p) + ` (via ${(h&65536)==0?"shift":`reduce of ${s.getName(h&65535)}`} for ${s.getName(c)} @ ${r}${p==e?"":", split"})`), d) return !0;
                p.pos > r ? t.push(p) : i.push(p)
            }
            return !1
        }
        advanceFully(e, t) {
            let i = e.pos;
            for (;;) {
                if (!this.advanceStack(e, null, null)) return !1;
                if (e.pos > i) return Ta(e, t), !0
            }
        }
        runRecovery(e, t, i) {
            let r = null,
                s = !1;
            for (let O = 0; O < e.length; O++) {
                let o = e[O],
                    l = t[O << 1],
                    a = t[(O << 1) + 1],
                    h = Me ? this.stackID(o) + " -> " : "";
                if (o.deadEnd && (s || (s = !0, o.restart(), Me && console.log(h + this.stackID(o) + " (restarted)"), this.advanceFully(o, i)))) continue;
                let c = o.split(),
                    f = h;
                for (let d = 0; c.forceReduce() && d < 10 && (Me && console.log(f + this.stackID(c) + " (via force-reduce)"), !this.advanceFully(c, i)); d++) Me && (f = this.stackID(c) + " -> ");
                for (let d of o.recoverByInsert(l)) Me && console.log(h + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
                this.stream.end > o.pos ? (a == o.pos && (a++, l = 0), o.recoverByDelete(l, a), Me && console.log(h + this.stackID(o) + ` (via recover-delete ${this.parser.getName(l)})`), Ta(o, i)) : (!r || r.score < o.score) && (r = o)
            }
            return r
        }
        stackToTree(e) {
            return e.close(), j.build({
                buffer: Ai.create(e),
                nodeSet: this.parser.nodeSet,
                topID: this.topTerm,
                maxBufferLength: this.parser.bufferLength,
                reused: this.reused,
                start: this.ranges[0].from,
                length: e.pos - this.ranges[0].from,
                minRepeatType: this.parser.minRepeatTerm
            })
        }
        stackID(e) {
            let t = (ks || (ks = new WeakMap)).get(e);
            return t || ks.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e
        }
    };

    function Ta(n, e) {
        for (let t = 0; t < e.length; t++) {
            let i = e[t];
            if (i.pos == n.pos && i.sameState(n)) {
                e[t].score < n.score && (e[t] = n);
                return
            }
        }
        e.push(n)
    }
    var ka = class {
            constructor(e, t, i) {
                this.source = e, this.flags = t, this.disabled = i
            }
            allows(e) {
                return !this.disabled || this.disabled[e] == 0
            }
        },
        vs = n => n,
        Vt = class {
            constructor(e) {
                this.start = e.start, this.shift = e.shift || vs, this.reduce = e.reduce || vs, this.reuse = e.reuse || vs, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1
            }
        },
        ie = class extends vi {
            constructor(e) {
                super();
                if (this.wrappers = [], e.version != 14) throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (${14})`);
                let t = e.nodeNames.split(" ");
                this.minRepeatTerm = t.length;
                for (let o = 0; o < e.repeatNodeCount; o++) t.push("");
                let i = Object.keys(e.topRules).map(o => e.topRules[o][1]),
                    r = [];
                for (let o = 0; o < t.length; o++) r.push([]);

                function s(o, l, a) {
                    r[o].push([l, l.deserialize(String(a))])
                }
                if (e.nodeProps)
                    for (let o of e.nodeProps) {
                        let l = o[0];
                        typeof l == "string" && (l = R[l]);
                        for (let a = 1; a < o.length;) {
                            let h = o[a++];
                            if (h >= 0) s(h, l, o[a++]);
                            else {
                                let c = o[a + -h];
                                for (let f = -h; f > 0; f--) s(o[a++], l, c);
                                a++
                            }
                        }
                    }
                this.nodeSet = new ri(t.map((o, l) => ee.define({
                    name: l >= this.minRepeatTerm ? void 0 : o,
                    id: l,
                    props: r[l],
                    top: i.indexOf(l) > -1,
                    error: l == 0,
                    skipped: e.skippedNodes && e.skippedNodes.indexOf(l) > -1
                }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = ns;
                let O = Vn(e.tokenData);
                this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
                for (let o = 0; o < this.specializerSpecs.length; o++) this.specialized[o] = this.specializerSpecs[o].term;
                this.specializers = this.specializerSpecs.map(wa), this.states = Vn(e.states, Uint32Array), this.data = Vn(e.stateData), this.goto = Vn(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map(o => typeof o == "number" ? new ji(O, o) : o), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]]
            }
            createParse(e, t, i) {
                let r = new xa(this, e, t, i);
                for (let s of this.wrappers) r = s(r, e, t, i);
                return r
            }
            getGoto(e, t, i = !1) {
                let r = this.goto;
                if (t >= r[0]) return -1;
                for (let s = r[t + 1];;) {
                    let O = r[s++],
                        o = O & 1,
                        l = r[s++];
                    if (o && i) return l;
                    for (let a = s + (O >> 1); s < a; s++)
                        if (r[s] == e) return l;
                    if (o) return -1
                }
            }
            hasAction(e, t) {
                let i = this.data;
                for (let r = 0; r < 2; r++)
                    for (let s = this.stateSlot(e, r ? 2 : 1), O;; s += 3) {
                        if ((O = i[s]) == 65535)
                            if (i[s + 1] == 1) O = i[s = Ot(i, s + 2)];
                            else {
                                if (i[s + 1] == 2) return Ot(i, s + 2);
                                break
                            }
                        if (O == t || O == 0) return Ot(i, s + 1)
                    }
                return 0
            }
            stateSlot(e, t) {
                return this.states[e * 6 + t]
            }
            stateFlag(e, t) {
                return (this.stateSlot(e, 0) & t) > 0
            }
            validAction(e, t) {
                if (t == this.stateSlot(e, 4)) return !0;
                for (let i = this.stateSlot(e, 1);; i += 3) {
                    if (this.data[i] == 65535)
                        if (this.data[i + 1] == 1) i = Ot(this.data, i + 2);
                        else return !1;
                    if (t == Ot(this.data, i + 1)) return !0
                }
            }
            nextStates(e) {
                let t = [];
                for (let i = this.stateSlot(e, 1);; i += 3) {
                    if (this.data[i] == 65535)
                        if (this.data[i + 1] == 1) i = Ot(this.data, i + 2);
                        else break;
                    if ((this.data[i + 2] & 65536 >> 16) == 0) {
                        let r = this.data[i + 1];
                        t.some((s, O) => O & 1 && s == r) || t.push(this.data[i], r)
                    }
                }
                return t
            }
            overrides(e, t) {
                let i = va(this.data, this.tokenPrecTable, t);
                return i < 0 || va(this.data, this.tokenPrecTable, e) < i
            }
            configure(e) {
                let t = Object.assign(Object.create(ie.prototype), this);
                if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
                    let i = this.topRules[e.top];
                    if (!i) throw new RangeError(`Invalid top rule name ${e.top}`);
                    t.top = i
                }
                return e.tokenizers && (t.tokenizers = this.tokenizers.map(i => {
                    let r = e.tokenizers.find(s => s.from == i);
                    return r ? r.to : i
                })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, r) => {
                    let s = e.specializers.find(o => o.from == i.external);
                    if (!s) return i;
                    let O = Object.assign(Object.assign({}, i), {
                        external: s.to
                    });
                    return t.specializers[r] = wa(O), O
                })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t
            }
            hasWrappers() {
                return this.wrappers.length > 0
            }
            getName(e) {
                return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e)
            }
            get eofTerm() {
                return this.maxNode + 1
            }
            get topNode() {
                return this.nodeSet.types[this.top[1]]
            }
            dynamicPrecedence(e) {
                let t = this.dynamicPrecedences;
                return t == null ? 0 : t[e] || 0
            }
            parseDialect(e) {
                let t = Object.keys(this.dialects),
                    i = t.map(() => !1);
                if (e)
                    for (let s of e.split(" ")) {
                        let O = t.indexOf(s);
                        O >= 0 && (i[O] = !0)
                    }
                let r = null;
                for (let s = 0; s < t.length; s++)
                    if (!i[s])
                        for (let O = this.dialects[t[s]], o;
                            (o = this.data[O++]) != 65535;)(r || (r = new Uint8Array(this.maxTerm + 1)))[o] = 1;
                return new ka(e, i, r)
            }
            static deserialize(e) {
                return new ie(e)
            }
        };

    function Ot(n, e) {
        return n[e] | n[e + 1] << 16
    }

    function va(n, e, t) {
        for (let i = e, r;
            (r = n[i]) != 65535; i++)
            if (r == t) return i - e;
        return -1
    }

    function Gf(n) {
        let e = null;
        for (let t of n) {
            let i = t.p.stoppedAt;
            (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(t.state, 2) && (!e || e.score < t.score) && (e = t)
        }
        return e
    }

    function wa(n) {
        if (n.external) {
            let e = n.extend ? 1 : 0;
            return (t, i) => n.external(t, i) << 1 | e
        }
        return n.get
    }
    var Ef = 1,
        Df = 2,
        Mf = 263,
        If = 3,
        Bf = 264,
        Xa = 265,
        Nf = 266,
        Lf = 4,
        Ff = 5,
        Hf = 6,
        Kf = 7,
        Ra = 8,
        Jf = 9,
        ed = 10,
        td = 11,
        id = 12,
        nd = 13,
        rd = 14,
        sd = 15,
        Od = 16,
        od = 17,
        ld = 18,
        ad = 19,
        hd = 20,
        cd = 21,
        ud = 22,
        fd = 23,
        dd = 24,
        pd = 25,
        md = 26,
        $d = 27,
        gd = 28,
        Qd = 29,
        yd = 30,
        Sd = 31,
        bd = 32,
        Pd = 33,
        xd = 34,
        Td = 35,
        kd = 36,
        vd = 37,
        wd = 38,
        Xd = 39,
        Rd = 40,
        zd = 41,
        Wd = 42,
        qd = 43,
        Zd = 44,
        _d = 45,
        Vd = 46,
        Ud = 47,
        Cd = 48,
        Ad = 49,
        Yd = 50,
        jd = 51,
        Gd = 52,
        Ed = 53,
        Dd = 54,
        Md = 55,
        Id = 56,
        Bd = 57,
        Nd = 58,
        Ld = 59,
        Fd = 60,
        Hd = 61,
        ws = 62,
        Kd = 63,
        Jd = 64,
        ep = 65,
        tp = {
            abstract: Lf,
            and: Ff,
            array: Hf,
            as: Kf,
            true: Ra,
            false: Ra,
            break: Jf,
            case: ed,
            catch: td,
            clone: id,
            const: nd,
            continue: rd,
            declare: Od,
            default: sd,
            do: od,
            echo: ld,
            else: ad,
            elseif: hd,
            enddeclare: cd,
            endfor: ud,
            endforeach: fd,
            endif: dd,
            endswitch: pd,
            endwhile: md,
            enum: $d,
            extends: gd,
            final: Qd,
            finally: yd,
            fn: Sd,
            for: bd,
            foreach: Pd,
            from: xd,
            function: Td,
            global: kd,
            goto: vd,
            if: wd,
            implements: Xd,
            include: Rd,
            include_once: zd,
            instanceof: Wd,
            insteadof: qd,
            interface: Zd,
            list: _d,
            match: Vd,
            namespace: Ud,
            new: Cd,
            null: Ad,
            or: Yd,
            print: jd,
            require: Gd,
            require_once: Ed,
            return: Dd,
            switch: Md,
            throw: Id,
            trait: Bd,
            try: Nd,
            unset: Ld,
            use: Fd,
            var: Hd,
            public: ws,
            private: ws,
            protected: ws,
            while: Kd,
            xor: Jd,
            yield: ep,
            __proto__: null
        };

    function ip(n) {
        let e = tp[n.toLowerCase()];
        return e ? ? -1
    }

    function za(n) {
        return n == 9 || n == 10 || n == 13 || n == 32
    }

    function Wa(n) {
        return n >= 97 && n <= 122 || n >= 65 && n <= 90
    }

    function Gi(n) {
        return n == 95 || n >= 128 || Wa(n)
    }

    function Xs(n) {
        return n >= 48 && n <= 55 || n >= 97 && n <= 102 || n >= 65 && n <= 70
    }
    var np = {
            int: !0,
            integer: !0,
            bool: !0,
            boolean: !0,
            float: !0,
            double: !0,
            real: !0,
            string: !0,
            array: !0,
            object: !0,
            unset: !0,
            __proto__: null
        },
        rp = new E(n => {
            if (n.next == 40) {
                n.advance();
                let e = 0;
                for (; za(n.peek(e));) e++;
                let t = "",
                    i;
                for (; Wa(i = n.peek(e));) t += String.fromCharCode(i), e++;
                for (; za(n.peek(e));) e++;
                n.peek(e) == 41 && np[t.toLowerCase()] && n.acceptToken(Ef)
            } else if (n.next == 60 && n.peek(1) == 60 && n.peek(2) == 60) {
                for (let i = 0; i < 3; i++) n.advance();
                for (; n.next == 32 || n.next == 9;) n.advance();
                let e = n.next == 39;
                if (e && n.advance(), !Gi(n.next)) return;
                let t = String.fromCharCode(n.next);
                for (; n.advance(), !(!Gi(n.next) && !(n.next >= 48 && n.next <= 55));) t += String.fromCharCode(n.next);
                if (e) {
                    if (n.next != 39) return;
                    n.advance()
                }
                if (n.next != 10 && n.next != 13) return;
                for (;;) {
                    let i = n.next == 10 || n.next == 13;
                    if (n.advance(), n.next < 0) return;
                    if (i) {
                        for (; n.next == 32 || n.next == 9;) n.advance();
                        let r = !0;
                        for (let s = 0; s < t.length; s++) {
                            if (n.next != t.charCodeAt(s)) {
                                r = !1;
                                break
                            }
                            n.advance()
                        }
                        if (r) return n.acceptToken(Df)
                    }
                }
            }
        }),
        sp = new E(n => {
            n.next < 0 && n.acceptToken(Nf)
        }),
        Op = new E((n, e) => {
            n.next == 63 && e.canShift(Xa) && n.peek(1) == 62 && n.acceptToken(Xa)
        });

    function op(n) {
        let e = n.peek(1);
        if (e == 110 || e == 114 || e == 116 || e == 118 || e == 101 || e == 102 || e == 92 || e == 36 || e == 34 || e == 123) return 2;
        if (e >= 48 && e <= 55) {
            let t = 2,
                i;
            for (; t < 5 && (i = n.peek(t)) >= 48 && i <= 55;) t++;
            return t
        }
        if (e == 120 && Xs(n.peek(2))) return Xs(n.peek(3)) ? 4 : 3;
        if (e == 117 && n.peek(2) == 123)
            for (let t = 3;; t++) {
                let i = n.peek(t);
                if (i == 125) return t == 2 ? 0 : t + 1;
                if (!Xs(i)) break
            }
        return 0
    }
    var lp = new E((n, e) => {
            let t = !1;
            for (; !(n.next == 34 || n.next < 0 || n.next == 36 && (Gi(n.peek(1)) || n.peek(1) == 123) || n.next == 123 && n.peek(1) == 36); t = !0) {
                if (n.next == 92) {
                    let i = op(n);
                    if (i) {
                        if (t) break;
                        return n.acceptToken(If, i)
                    }
                } else if (!t && (n.next == 91 || n.next == 45 && n.peek(1) == 62 && Gi(n.peek(2)) || n.next == 63 && n.peek(1) == 45 && n.peek(2) == 62 && Gi(n.peek(3))) && e.canShift(Bf)) break;
                n.advance()
            }
            t && n.acceptToken(Mf)
        }),
        ap = he({
            "Visibility abstract final static": u.modifier,
            "for foreach while do if else elseif switch try catch finally return throw break continue default case": u.controlKeyword,
            "endif endfor endforeach endswitch endwhile declare enddeclare goto match": u.controlKeyword,
            "and or xor yield unset clone instanceof insteadof": u.operatorKeyword,
            "function fn class trait implements extends const enum global interface use var": u.definitionKeyword,
            "include include_once require require_once namespace": u.moduleKeyword,
            "new from echo print array list as": u.keyword,
            null: u.null,
            Boolean: u.bool,
            VariableName: u.variableName,
            "NamespaceName/...": u.namespace,
            "NamedType/...": u.typeName,
            Name: u.name,
            "CallExpression/Name": u.function(u.variableName),
            "LabelStatement/Name": u.labelName,
            "MemberExpression/Name": u.propertyName,
            "MemberExpression/VariableName": u.special(u.propertyName),
            "ScopedExpression/ClassMemberName/Name": u.propertyName,
            "ScopedExpression/ClassMemberName/VariableName": u.special(u.propertyName),
            "CallExpression/MemberExpression/Name": u.function(u.propertyName),
            "CallExpression/ScopedExpression/ClassMemberName/Name": u.function(u.propertyName),
            "MethodDeclaration/Name": u.function(u.definition(u.variableName)),
            "FunctionDefinition/Name": u.function(u.definition(u.variableName)),
            "ClassDeclaration/Name": u.definition(u.className),
            UpdateOp: u.updateOperator,
            ArithOp: u.arithmeticOperator,
            LogicOp: u.logicOperator,
            BitOp: u.bitwiseOperator,
            CompareOp: u.compareOperator,
            ControlOp: u.controlOperator,
            AssignOp: u.definitionOperator,
            "$ ConcatOp": u.operator,
            LineComment: u.lineComment,
            BlockComment: u.blockComment,
            Integer: u.integer,
            Float: u.float,
            String: u.string,
            ShellExpression: u.special(u.string),
            "=> ->": u.punctuation,
            "( )": u.paren,
            "#[ [ ]": u.squareBracket,
            "${ { }": u.brace,
            "-> ?->": u.derefOperator,
            ", ; :: : \\": u.separator,
            "PhpOpen PhpClose": u.processingInstruction
        }),
        hp = {
            __proto__: null,
            static: 311,
            STATIC: 311,
            class: 333,
            CLASS: 333
        },
        qa = ie.deserialize({
            version: 14,
            states: "$GSQ`OWOOQhQaOOP%oO`OOOOO#t'#H_'#H_O%tO#|O'#DtOOO#u'#Dw'#DwQ&SOWO'#DwO&XO$VOOOOQ#u'#Dx'#DxO&lQaO'#D|O(mQdO'#E}O(tQdO'#EQO*kQaO'#EWO,zQ`O'#ETO-PQ`O'#E^O/nQaO'#E^O/uQ`O'#EfO/zQ`O'#EoO*kQaO'#EoO0VQ`O'#HhO0[Q`O'#E{O0[Q`O'#E{OOQS'#Ic'#IcO0aQ`O'#EvOOQS'#IZ'#IZO2oQdO'#IWO6tQeO'#FUO*kQaO'#FeO*kQaO'#FfO*kQaO'#FgO*kQaO'#FhO*kQaO'#FhO*kQaO'#FkOOQO'#Id'#IdO7RQ`O'#FqOOQO'#Hi'#HiO7ZQ`O'#HOO7uQ`O'#FlO8QQ`O'#H]O8]Q`O'#FvO8eQaO'#FwO*kQaO'#GVO*kQaO'#GYO8}OrO'#G]OOQS'#Iq'#IqOOQS'#Ip'#IpOOQS'#IW'#IWO,zQ`O'#GdO,zQ`O'#GfO,zQ`O'#GkOhQaO'#GmO9UQ`O'#GnO9ZQ`O'#GqO9`Q`O'#GtO9eQeO'#GuO9eQeO'#GvO9eQeO'#GwO9oQ`O'#GxO9tQ`O'#GzO9yQaO'#G{O<YQ`O'#G|O<_Q`O'#G}O<dQ`O'#G}O9oQ`O'#HOO<iQ`O'#HQO<nQ`O'#HRO<sQ`O'#HSO<xQ`O'#HVO=TQ`O'#HWO9yQaO'#H[OOQ#u'#IV'#IVOOQ#u'#Ha'#HaQhQaOOO=fQ`O'#HPO7pQ`O'#HPO=kO#|O'#DrPOOO)CCw)CCwOOO#t-E;]-E;]OOO#u,5:c,5:cOOO#u'#H`'#H`O&XO$VOOO=vQ$VO'#IUOOOO'#IU'#IUQOOOOOOOQ#y,5:h,5:hO=}QaO,5:hOOQ#u,5:j,5:jO@eQaO,5:mO@lQaO,5;UO*kQaO,5;UO@sQ`O,5;VOCbQaO'#EsOOQS,5;^,5;^OCiQ`O,5;jOOQP'#F]'#F]O*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qO*kQaO,5;qOOQ#u'#Im'#ImOOQS,5<q,5<qOOQ#u,5:l,5:lOEbQ`O,5:rOEiQdO'#E}OF]Q`O'#FlOFeQ`O'#FlOFmQ`O,5:oOFrQaO'#E_OOQS,5:x,5:xOHyQ`O'#I]O9yQaO'#EaO9yQaO'#I]OOQS'#I]'#I]OIQQ`O'#I[OIYQ`O,5:xO-UQaO,5:xOI_QaO'#EgOOQS,5;Q,5;QOOQS,5;Z,5;ZOIiQ`O,5;ZOOQO,5>S,5>SOJ[QdO,5;gOOQO-E;f-E;fOL^Q`O,5;gOLcQpO,5;bO0aQ`O'#EyOLkQtO'#E}OOQS'#Ez'#EzOOQS'#Ib'#IbOM`QaO,5:wO*kQaO,5;nOOQS,5;p,5;pO*kQaO,5;pOMgQdO,5<POMwQdO,5<QONXQdO,5<RONiQdO,5<SO!!sQdO,5<SO!!zQdO,5<VO!#[Q`O'#FrO!#gQ`O'#IgO!#oQ`O,5<]OOQO-E;g-E;gO!#tQ`O'#IoO<_Q`O,5=iO!#|Q`O,5=iO9oQ`O,5=jO!$RQ`O,5=nO!$WQ`O,5=kO!$]Q`O,5=kO!$bQ`O'#FnO!$xQ`O,5<WO!%TQ`O,5<WO!%WQ`O,5?ZO!%]Q`O,5<WO!%eQ`O,5<bO!%mQdO'#GPO!%{QdO'#InO!&WQdO,5=wO!&`Q`O,5<bO!%WQ`O,5<bO!&hQdO,5<cO!&xQ`O,5<cO!'lQdO,5<qO!)nQdO,5<tO!*OOrO'#HsOOOQ'#It'#ItO*kQaO'#GbOOOQ'#Hs'#HsO!*pOrO,5<wOOQS,5<w,5<wO!*wQaO,5=OO!+OQ`O,5=QO!+WQeO,5=VO!+bQ`O,5=XO!+gQaO'#GoO!+WQeO,5=YO9yQaO'#GrO!+WQeO,5=]O!&WQdO,5=`O(tQdO,5=aOOQ#u,5=a,5=aO(tQdO,5=bOOQ#u,5=b,5=bO(tQdO,5=cOOQ#u,5=c,5=cO!+nQ`O,5=dO!+vQ`O,5=fO!+{QdO'#IvOOQS'#Iv'#IvO!&WQdO,5=gO>UQaO,5=hO!-eQ`O'#F}O!-jQdO'#IlO!&WQdO,5=iOOQ#u,5=j,5=jO!-uQ`O,5=lO!-xQ`O,5=mO!-}Q`O,5=nO!.YQdO,5=qOOQ#u,5=q,5=qO!.eQ`O,5=rO!.eQ`O,5=rO!.mQdO'#IwO!.{Q`O'#HXO!&WQdO,5=rO!/ZQ`O,5=rO!/fQdO'#IYO!&WQdO,5=vOOQ#u-E;_-E;_O!1RQ`O,5=kOOO#u,5:^,5:^O!1^O#|O,5:^OOO#u-E;^-E;^OOOO,5>p,5>pOOQ#y1G0S1G0SO!1fQ`O1G0XO*kQaO1G0XO!2xQ`O1G0pOOQS1G0p1G0pO!4[Q`O1G0pOOQS'#I_'#I_O*kQaO'#I_OOQS1G0q1G0qO!4cQ`O'#IaO!7lQ`O'#E}O!7yQaO'#EuOOQO'#Ia'#IaO!8TQ`O'#I`O!8]Q`O,5;_OOQS'#FQ'#FQOOQS1G1U1G1UO!8bQdO1G1]O!:dQdO1G1]O!<PQdO1G1]O!=lQdO1G1]O!?XQdO1G1]O!@tQdO1G1]O!BaQdO1G1]O!C|QdO1G1]O!EiQdO1G1]O!GUQdO1G1]O!HqQdO1G1]O!J^QdO1G1]O!KyQdO1G1]O!MfQdO1G1]O# RQdO1G1]O#!nQdO1G1]OOQT1G0^1G0^O!%WQ`O,5<WO#$ZQaO'#EXOOQS1G0Z1G0ZO#$bQ`O,5:yOFuQaO,5:yO#$gQaO,5:}O#$nQdO,5:{O#&jQdO,5>wO#(fQaO'#HdO#(vQ`O,5>vOOQS1G0d1G0dO#)OQ`O1G0dO#)TQ`O'#I^O#*mQ`O'#I^O#*uQ`O,5;ROIbQaO,5;ROOQS1G0u1G0uPOQO'#E}'#E}O#+fQdO1G1RO0aQ`O'#HgO#-hQtO,5;cO#.YQaO1G0|OOQS,5;e,5;eO#0iQtO,5;gO#0vQdO1G0cO*kQaO1G0cO#2cQdO1G1YO#4OQdO1G1[OOQO,5<^,5<^O#4`Q`O'#HjO#4nQ`O,5?ROOQO1G1w1G1wO#4vQ`O,5?ZO!&WQdO1G3TO<_Q`O1G3TOOQ#u1G3U1G3UO#4{Q`O1G3YO!1RQ`O1G3VO#5WQ`O1G3VO#5]QpO'#FoO#5kQ`O'#FoO#5{Q`O'#FoO#6WQ`O'#FoO#6`Q`O'#FsO#6eQ`O'#FtOOQO'#If'#IfO#6lQ`O'#IeO#6tQ`O,5<YOOQS1G1r1G1rO0aQ`O1G1rO#6yQ`O1G1rO#7OQ`O1G1rO!%WQ`O1G4uO#7ZQdO1G4uO!%WQ`O1G1rO#7iQ`O1G1|O!%WQ`O1G1|O9yQaO,5<kO#7qQdO'#HqO#8PQdO,5?YOOQ#u1G3c1G3cO*kQaO1G1|O0aQ`O1G1|O#8[QdO1G1}O7RQ`O'#FyO7RQ`O'#FzO#:nQ`O'#F{OOQS1G1}1G1}O!-xQ`O1G1}O!1UQ`O1G1}O!1RQ`O1G1}O#;eO`O,5<xO#;jO`O,5<xO#;uO!bO,5<yO#<TQ`O,5<|OOOQ-E;q-E;qOOQS1G2c1G2cO#<[QaO'#GeO#<uQ$VO1G2jO#AuQ`O1G2jO#BQQ`O'#GgO#B]Q`O'#GjOOQ#u1G2l1G2lO#BhQ`O1G2lOOQ#u'#Gl'#GlOOQ#u'#Iu'#IuOOQ#u1G2q1G2qO#BmQ`O1G2qO,zQ`O1G2sO#BrQaO,5=ZO#ByQ`O,5=ZOOQ#u1G2t1G2tO#COQ`O1G2tO#CTQ`O,5=^OOQ#u1G2w1G2wO#DgQ`O1G2wOOQ#u1G2z1G2zOOQ#u1G2{1G2{OOQ#u1G2|1G2|OOQ#u1G2}1G2}O#DlQ`O'#HxO9oQ`O'#HxO#DqQ$VO1G3OO#IwQ`O1G3QO9yQaO'#HwO#I|QdO,5=[OOQ#u1G3R1G3RO#JXQ`O1G3SO9yQaO,5<iO#J^QdO'#HpO#JlQdO,5?WOOQ#u1G3T1G3TOOQ#u1G3W1G3WO!-xQ`O1G3WOOQ#u1G3X1G3XO#KfQ`O'#HTOOQ#u1G3Y1G3YO#KmQ`O1G3YO0aQ`O1G3YOOQ#u1G3]1G3]O!&WQdO1G3^O#KrQ`O1G3^O#KzQdO'#HzO#L]QdO,5?cO#LhQ`O,5?cO#LmQ`O'#HYO7RQ`O'#HYO#LxQ`O'#IxO#MQQ`O,5=sOOQ#u1G3^1G3^O!.eQ`O1G3^O!.eQ`O1G3^O#MVQeO'#HbO#MgQdO,5>tOOQ#u1G3b1G3bOOQ#u1G3V1G3VO!-xQ`O1G3VO!1UQ`O1G3VOOO#u1G/x1G/xO*kQaO7+%sO#MuQdO7+%sOOQS7+&[7+&[O$ bQ`O,5>yO>UQaO,5;`O$ iQ`O,5;aO$#OQaO'#HfO$#YQ`O,5>zOOQS1G0y1G0yO$#bQ`O'#EYO$#gQ`O'#IXO$#oQ`O,5:sOOQS1G0e1G0eO$#tQ`O1G0eO$#yQ`O1G0iO9yQaO1G0iOOQO,5>O,5>OOOQO-E;b-E;bOOQS7+&O7+&OO>UQaO,5;SO$%`QaO'#HeO$%jQ`O,5>xOOQS1G0m1G0mO$%rQ`O1G0mOOQS,5>R,5>ROOQS-E;e-E;eO$%wQdO7+&hO$'yQtO1G1RO$(WQdO7+%}OOQS1G0i1G0iOOQO,5>U,5>UOOQO-E;h-E;hOOQ#u7+(o7+(oO!&WQdO7+(oOOQ#u7+(t7+(tO#KmQ`O7+(tO0aQ`O7+(tOOQ#u7+(q7+(qO!-xQ`O7+(qO!1UQ`O7+(qO!1RQ`O7+(qO$)sQ`O,5<ZO$*OQ`O,5<ZO$*WQ`O,5<_O$*]QpO,5<ZO>UQaO,5<ZOOQO,5<_,5<_O$*kQpO,5<`O$*sQ`O,5<`O$+OQ`O'#HkO$+iQ`O,5?POOQS1G1t1G1tO$+qQpO7+'^O$+yQ`O'#FuO$,UQ`O7+'^OOQS7+'^7+'^O0aQ`O7+'^O#6yQ`O7+'^O$,^QdO7+*aO0aQ`O7+*aO$,lQ`O7+'^O*kQaO7+'hO0aQ`O7+'hO$,wQ`O7+'hO$-PQdO1G2VOOQS,5>],5>]OOQS-E;o-E;oO$.iQdO7+'hO$.yQpO7+'hO$/RQdO'#IiOOQO,5<e,5<eOOQO,5<f,5<fO$/dQpO'#GOO$/lQ`O'#GOOOQO'#Ik'#IkOOQO'#Ho'#HoO$0]Q`O'#GOO<_Q`O'#F|O!&WQdO'#GOO!.YQdO'#GQO7RQ`O'#GROOQO'#Ij'#IjOOQO'#Hn'#HnO$0yQ`O,5<gOOQ#y,5<g,5<gOOQS7+'i7+'iO!-xQ`O7+'iO!1UQ`O7+'iOOOQ1G2d1G2dO$1pO`O1G2dO$1uO!bO1G2eO$2TO`O'#G`O$2YO`O1G2eOOOQ1G2h1G2hO$2_QaO,5=PO,zQ`O'#HtO$2xQ$VO7+(UOhQaO7+(UO,zQ`O'#HuO$7xQ`O7+(UO!&WQdO7+(UO$8TQ`O7+(UO$8YQaO'#GhO$:iQ`O'#GiOOQO'#Hv'#HvO$:qQ`O,5=ROOQ#u,5=R,5=RO$:|Q`O,5=UO!&WQdO7+(WO!&WQdO7+(]O!&WQdO7+(_O$;XQaO1G2uO$;`Q`O1G2uO$;eQaO1G2uO!&WQdO7+(`O9yQaO1G2xO!&WQdO7+(cO0aQ`O'#GyO9oQ`O,5>dOOQ#u,5>d,5>dOOQ#u-E;v-E;vO$;lQaO7+(lO$<TQdO,5>cOOQS-E;u-E;uO!&WQdO7+(nO$=mQdO1G2TOOQS,5>[,5>[OOQS-E;n-E;nOOQ#u7+(r7+(rO$?nQ`O'#GQO$?uQ`O'#GQO$@ZQ`O'#HUOOQO'#Hy'#HyO$@`Q`O,5=oOOQ#u,5=o,5=oO$@gQpO7+(tOOQ#u7+(x7+(xO!&WQdO7+(xO$@rQdO,5>fOOQS-E;x-E;xO$AQQdO1G4}O$A]Q`O,5=tO$AbQ`O,5=tO$AmQ`O'#H{O$BRQ`O,5?dOOQS1G3_1G3_O#KrQ`O7+(xO$BZQdO,5=|OOQS-E;`-E;`O$CvQdO<<I_OOQS1G4e1G4eO$EcQ`O1G0zOOQO,5>Q,5>QOOQO-E;d-E;dO$8YQaO,5:tO$FxQaO'#HcO$GVQ`O,5>sOOQS1G0_1G0_OOQS7+&P7+&PO$G_Q`O7+&TO$HtQ`O1G0nO$JZQ`O,5>POOQO,5>P,5>POOQO-E;c-E;cOOQS7+&X7+&XOOQS7+&T7+&TOOQ#u<<LZ<<LZOOQ#u<<L`<<L`O$@gQpO<<L`OOQ#u<<L]<<L]O!-xQ`O<<L]O!1UQ`O<<L]O>UQaO1G1uO$KsQ`O1G1uO$LOQ`O1G1yOOQO1G1y1G1yO$LTQ`O1G1uO$L]Q`O1G1uO$MrQ`O1G1zO>UQaO1G1zOOQO,5>V,5>VOOQO-E;i-E;iOOQS<<Jx<<JxO$M}Q`O'#IhO$NVQ`O'#IhO$N[Q`O,5<aO0aQ`O<<JxO$+qQpO<<JxO$NaQ`O<<JxO0aQ`O<<M{O$NiQtO<<M{O#6yQ`O<<JxO$NwQdO<<KSO% XQpO<<KSO*kQaO<<KSO0aQ`O<<KSO% aQdO'#HmO% xQdO,5?TO!&WQdO,5<jO$/dQpO,5<jO%!ZQ`O,5<jO<_Q`O,5<hO!.YQdO,5<lOOQO-E;m-E;mO!&WQdO,5<hOOQO,5<j,5<jOOQO,5<l,5<lO%!tQdO,5<mOOQO-E;l-E;lOOQ#y1G2R1G2ROOQS<<KT<<KTO!-xQ`O<<KTOOOQ7+(O7+(OO%#PO`O7+(POOOO,5<z,5<zOOOQ7+(P7+(POhQaO,5>`OOQ#u-E;r-E;rOhQaO<<KpOOQ#u<<Kp<<KpO$8TQ`O,5>aOOQO-E;s-E;sO!&WQdO<<KpO$8TQ`O<<KpO%#UQ`O<<KpO%#ZQ`O,5=SO%$pQaO,5=TOOQO-E;t-E;tOOQ#u1G2m1G2mOOQ#u<<Kr<<KrOOQ#u<<Kw<<KwOOQ#u<<Ky<<KyOOQT7+(a7+(aO%%QQ`O7+(aO%%VQaO7+(aO%%^Q`O7+(aOOQ#u<<Kz<<KzO%%cQ`O7+(dO%&xQ`O7+(dOOQ#u<<K}<<K}O%&}QpO,5=eOOQ#u1G4O1G4OO%'YQ`O<<LWOOQ#u<<LY<<LYO$?uQ`O,5<lO%'_Q`O,5=pO%'dQdO,5=pOOQO-E;w-E;wOOQ#u1G3Z1G3ZO#KmQ`O<<L`OOQ#u<<Ld<<LdO%'oQ`O1G4QO%'tQdO7+*iOOQO1G3`1G3`O%(PQ`O1G3`O%(UQ`O'#HZO7RQ`O'#HZOOQO,5>g,5>gOOQO-E;y-E;yO!&WQdO<<LdO%(aQ`O1G0`OOQO,5=},5=}OOQO-E;a-E;aO>UQaO,5;TOOQ#uANAzANAzO#KmQ`OANAzOOQ#uANAwANAwO!-xQ`OANAwO%)vQ`O7+'aO>UQaO7+'aOOQO7+'e7+'eO%+]Q`O7+'aO%+hQ`O7+'eO>UQaO7+'fO%+mQ`O7+'fO%-SQ`O'#HlO%-bQ`O,5?SO%-bQ`O,5?SOOQO1G1{1G1{O$+qQpOAN@dOOQSAN@dAN@dO0aQ`OAN@dO%-jQtOANCgO%-xQ`OAN@dO*kQaOAN@nO%.QQdOAN@nO%.bQpOAN@nOOQS,5>X,5>XOOQS-E;k-E;kOOQO1G2U1G2UO!&WQdO1G2UO$/dQpO1G2UO<_Q`O1G2SO!.YQdO1G2WO!&WQdO1G2SOOQO1G2W1G2WOOQO1G2S1G2SO%.jQaO'#GSOOQO1G2X1G2XOOQSAN@oAN@oOOOQ<<Kk<<KkOOQ#u1G3z1G3zOOQ#uANA[ANA[OOQO1G3{1G3{O%0iQ`OANA[O!&WQdOANA[O%0nQaO1G2nO%1OQaO1G2oOOQT<<K{<<K{O%1`Q`O<<K{O%1eQaO<<K{O*kQaO,5=_OOQT<<LO<<LOOOQO1G3P1G3PO%1lQ`O1G3PO!+WQeOANArO%1qQdO1G3[OOQO1G3[1G3[O%1|Q`O1G3[OOQS7+)l7+)lOOQO7+(z7+(zO%2UQ`O,5=uO%2ZQ`O,5=uOOQ#uANBOANBOO%2fQ`O1G0oOOQ#uG27fG27fOOQ#uG27cG27cO%3{Q`O<<J{O>UQaO<<J{OOQO<<KP<<KPO%5bQ`O<<KQOOQO,5>W,5>WO%6wQ`O,5>WOOQO-E;j-E;jO%6|Q`O1G4nOOQSG26OG26OO$+qQpOG26OO0aQ`OG26OO%7UQdOG26YO*kQaOG26YOOQO7+'p7+'pO!&WQdO7+'pO!&WQdO7+'nOOQO7+'r7+'rOOQO7+'n7+'nO%7fQ`OLD+tO%8uQ`O'#E}O%9PQ`O'#IZO!&WQdO'#HrO%:|QaO,5<nOOQO,5<n,5<nO!&WQdOG26vOOQ#uG26vG26vO%<{QaO7+(YOOQTANAgANAgO%=]Q`OANAgO%=bQ`O1G2yOOQO7+(k7+(kOOQ#uG27^G27^O%=iQ`OG27^OOQO7+(v7+(vO%=nQ`O7+(vO!&WQdO7+(vOOQO1G3a1G3aO%=vQ`O1G3aO%={Q`OAN@gOOQO1G3r1G3rOOQSLD+jLD+jO$+qQpOLD+jO%?bQdOLD+tOOQO<<K[<<K[OOQO<<KY<<KYO%?rQ`O,5<oO%?wQ`O,5<pOOQP,5>^,5>^OOQP-E;p-E;pOOQO1G2Y1G2YOOQ#uLD,bLD,bOOQTG27RG27RO!&WQdOLD,xO!&WQdO<<LbOOQO<<Lb<<LbOOQO7+({7+({OOQS!$( U!$( UOOQS1G2Z1G2ZOOQS1G2[1G2[O%@PQdO1G2[OOQ#u!$(!d!$(!dOOQOANA|ANA|OOQS7+'v7+'vO%@[Q`O'#E{O%@[Q`O'#E{O%@aQ`O,5;gO%@fQdO,5<cO%BbQaO,5:}O*kQaO1G0iO%BiQaO'#FwO#.YQaO'#GVO#.YQaO'#GYO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO#.YQaO,5;qO%BpQdO'#I]O%D`QdO'#I]O#.YQaO'#EaO#.YQaO'#I]O%FbQaO,5:wO#.YQaO,5;nO#.YQaO,5;pO%FiQdO,5<PO%HeQdO,5<QO%JaQdO,5<RO%L]QdO,5<SO%NXQdO,5<SO%NoQdO,5<VO&!kQdO,5<tO#.YQaO1G0XO&$gQdO1G1]O&&cQdO1G1]O&(_QdO1G1]O&*ZQdO1G1]O&,VQdO1G1]O&.RQdO1G1]O&/}QdO1G1]O&1yQdO1G1]O&3uQdO1G1]O&5qQdO1G1]O&7mQdO1G1]O&9iQdO1G1]O&;eQdO1G1]O&=aQdO1G1]O&?]QdO1G1]O&AXQdO,5:{O&CTQdO,5>wO&EPQdO1G0cO#.YQaO1G0cO&F{QdO1G1YO&HwQdO1G1[O#.YQaO1G1|O#.YQaO7+%sO&JsQdO7+%sO&LoQdO7+%}O#.YQaO7+'hO&NkQdO7+'hO'!gQdO<<I_O'$cQdO<<KSO#.YQaO<<KSO#.YQaOAN@nO'&_QdOAN@nO'(ZQdOG26YO#.YQaOG26YO'*VQdOLD+tO',RQaO,5:}O'.QQaO1G0iO'/|QdO'#IWO'0aQeO'#FUO'4aQeO'#FUO#.YQaO'#FeO'.QQaO'#FeO#.YQaO'#FfO'.QQaO'#FfO#.YQaO'#FgO'.QQaO'#FgO#.YQaO'#FhO'.QQaO'#FhO#.YQaO'#FhO'.QQaO'#FhO#.YQaO'#FkO'.QQaO'#FkO'8gQaO,5:mO'8nQ`O,5<bO'8vQ`O1G0XO'.QQaO1G0|O':YQ`O1G1|O':bQ`O7+'hO':jQpO7+'hO':rQpO<<KSO':zQpOAN@nO';SQaO'#FwO'.QQaO'#GVO'.QQaO'#GYO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO,5;qO'.QQaO'#EaO'.QQaO'#I]O'=RQaO,5:wO'.QQaO,5;nO'.QQaO,5;pO'?QQdO,5<PO'ASQdO,5<QO'CUQdO,5<RO'EWQdO,5<SO'GYQdO,5<SO'GvQdO,5<VO'IxQdO,5<tO'.QQaO1G0XO'KzQdO1G1]O'M|QdO1G1]O(!OQdO1G1]O($QQdO1G1]O(&SQdO1G1]O((UQdO1G1]O(*WQdO1G1]O(,YQdO1G1]O(.[QdO1G1]O(0^QdO1G1]O(2`QdO1G1]O(4bQdO1G1]O(6dQdO1G1]O(8fQdO1G1]O(:hQdO1G1]O(<jQdO,5:{O(>lQdO,5>wO(@nQdO1G0cO'.QQaO1G0cO(BpQdO1G1YO(DrQdO1G1[O'.QQaO1G1|O'.QQaO7+%sO(FtQdO7+%sO(HvQdO7+%}O'.QQaO7+'hO(JxQdO7+'hO(LzQdO<<I_O(N|QdO<<KSO'.QQaO<<KSO'.QQaOAN@nO)#OQdOAN@nO)%QQdOG26YO'.QQaOG26YO)'SQdOLD+tO))UQaO,5:}O#.YQaO1G0iO))]Q`O'#FvO))eQpO,5;bO))mQ`O,5<bO!%WQ`O,5<bO!%WQ`O1G1|O0aQ`O1G1|O0aQ`O7+'hO0aQ`O<<KSO))uQdO,5<cO)+wQdO'#I]O)-vQdO'#IWO).aQaO,5:mO).hQ`O,5<bO).pQ`O1G0XO)0SQ`O1G1|O)0[Q`O7+'hO)0dQpO7+'hO)0lQpO<<KSO)0tQpOAN@nO0aQ`O'#EvO9yQaO'#FeO9yQaO'#FfO9yQaO'#FgO9yQaO'#FhO9yQaO'#FhO9yQaO'#FkO)0|QaO'#FwO9yQaO'#GVO9yQaO'#GYO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO9yQaO,5;qO)1TQ`O'#FlO*kQaO'#EaO*kQaO'#I]O)1]QaO,5:wO9yQaO,5;nO9yQaO,5;pO)1dQdO,5<PO)3`QdO,5<QO)5[QdO,5<RO)7WQdO,5<SO)9SQdO,5<SO)9jQdO,5<VO);fQdO,5<cO)=bQdO,5<tO)?^Q`O'#IvO)@sQ`O'#IYO9yQaO1G0XO)BYQdO1G1]O)DUQdO1G1]O)FQQdO1G1]O)G|QdO1G1]O)IxQdO1G1]O)KtQdO1G1]O)MpQdO1G1]O* lQdO1G1]O*#hQdO1G1]O*%dQdO1G1]O*'`QdO1G1]O*)[QdO1G1]O*+WQdO1G1]O*-SQdO1G1]O*/OQdO1G1]O*0zQaO,5:}O*1RQdO,5:{O*1cQdO,5>wO*1sQaO'#HdO*2TQ`O,5>vO*2]QdO1G0cO9yQaO1G0cO*4XQdO1G1YO*6TQdO1G1[O9yQaO1G1|O>UQaO'#HwO*8PQ`O,5=[O*8XQaO'#HbO*8cQ`O,5>tO9yQaO7+%sO*8kQdO7+%sO*:gQ`O1G0iO>UQaO1G0iO*;|QdO7+%}O9yQaO7+'hO*=xQdO7+'hO*?tQ`O,5>cO*AZQ`O,5=|O*BpQdO<<I_O*DlQ`O7+&TO*FRQdO<<KSO9yQaO<<KSO9yQaOAN@nO*G}QdOAN@nO*IyQdOG26YO9yQaOG26YO*KuQdOLD+tO*MqQaO,5:}O9yQaO1G0iO*MxQdO'#I]O*NcQ`O'#FvO*NkQ`O,5<bO!%WQ`O,5<bO!%WQ`O1G1|O0aQ`O1G1|O0aQ`O7+'hO0aQ`O<<KSO*NsQdO'#IWO+ ^QeO'#FUO+ zQaO'#FUO+#sQaO'#FUO+%`QaO'#FUO>UQaO'#FeO>UQaO'#FfO>UQaO'#FgO>UQaO'#FhO>UQaO'#FhO>UQaO'#FkO+'XQaO'#FwO>UQaO'#GVO>UQaO'#GYO+'`QaO,5:mO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO>UQaO,5;qO+'gQ`O'#I]O$8YQaO'#EaO+)PQaOG26YO$8YQaO'#I]O+*{Q`O'#I[O++TQaO,5:wO>UQaO,5;nO>UQaO,5;pO++[Q`O,5<PO+,wQ`O,5<QO+.dQ`O,5<RO+0PQ`O,5<SO+1lQ`O,5<SO+3XQ`O,5<VO+4tQ`O,5<bO+4|Q`O,5<cO+6iQ`O,5<tO+8UQ`O1G0XO>UQaO1G0XO+9hQ`O1G1]O+;TQ`O1G1]O+<pQ`O1G1]O+>]Q`O1G1]O+?xQ`O1G1]O+AeQ`O1G1]O+CQQ`O1G1]O+DmQ`O1G1]O+FYQ`O1G1]O+GuQ`O1G1]O+IbQ`O1G1]O+J}Q`O1G1]O+LjQ`O1G1]O+NVQ`O1G1]O, rQ`O1G1]O,#_Q`O1G0cO>UQaO1G0cO,$zQ`O1G1YO,&gQ`O1G1[O,(SQ`O1G1|O>UQaO1G1|O>UQaO7+%sO,([Q`O7+%sO,)wQ`O7+%}O>UQaO7+'hO,+dQ`O7+'hO,+lQ`O7+'hO,-XQpO7+'hO,-aQ`O<<I_O,.|Q`O<<KSO,0iQpO<<KSO>UQaO<<KSO>UQaOAN@nO,0qQ`OAN@nO,2^QpOAN@nO,2fQ`OG26YO>UQaOG26YO,4RQ`OLD+tO,5nQaO,5:}O>UQaO1G0iO,5uQ`O'#I]O$8YQaO'#FeO$8YQaO'#FfO$8YQaO'#FgO$8YQaO'#FhO$8YQaO'#FhO+)PQaO'#FhO$8YQaO'#FkO,6SQaO'#FwO,6ZQaO'#FwO$8YQaO'#GVO+)PQaO'#GVO$8YQaO'#GYO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO$8YQaO,5;qO+)PQaO,5;qO,8YQ`O'#FlO>UQaO'#EaO>UQaO'#I]O,8bQaO,5:wO,8iQaO,5:wO$8YQaO,5;nO+)PQaO,5;nO$8YQaO,5;pO,:hQ`O,5<PO,<TQ`O,5<QO,=pQ`O,5<RO,?]Q`O,5<SO,@xQ`O,5<SO,BeQ`O,5<SO,CtQ`O,5<VO,EaQ`O,5<cO%7fQ`O,5<cO,F|Q`O,5<tO$8YQaO1G0XO+)PQaO1G0XO,HiQ`O1G1]O,JUQ`O1G1]O,KeQ`O1G1]O,MQQ`O1G1]O,NaQ`O1G1]O- |Q`O1G1]O-#]Q`O1G1]O-$xQ`O1G1]O-&XQ`O1G1]O-'tQ`O1G1]O-)TQ`O1G1]O-*pQ`O1G1]O-,PQ`O1G1]O--lQ`O1G1]O-.{Q`O1G1]O-0hQ`O1G1]O-1wQ`O1G1]O-3dQ`O1G1]O-4sQ`O1G1]O-6`Q`O1G1]O-7oQ`O1G1]O-9[Q`O1G1]O-:kQ`O1G1]O-<WQ`O1G1]O-=gQ`O1G1]O-?SQ`O1G1]O-@cQ`O1G1]O-BOQ`O1G1]O-C_Q`O1G1]O-DzQ`O1G1]O-FZQ`O,5:{O-GvQ`O,5>wO-IcQ`O1G0cO-KOQ`O1G0cO$8YQaO1G0cO+)PQaO1G0cO-L_Q`O1G1YO-MzQ`O1G1YO. ZQ`O1G1[O$8YQaO1G1|O$8YQaO7+%sO+)PQaO7+%sO.!vQ`O7+%sO.$cQ`O7+%sO.%rQ`O7+%}O.'_Q`O7+%}O$8YQaO7+'hO.(nQ`O7+'hO.*ZQ`O<<I_O.+vQ`O<<I_O.-VQ`O<<KSO$8YQaO<<KSO$8YQaOAN@nO..rQ`OAN@nO.0_Q`OG26YO$8YQaOG26YO.1zQ`OLD+tO.3gQaO,5:}O.3nQaO,5:}O$8YQaO1G0iO+)PQaO1G0iO.5mQ`O'#I]O.7PQ`O'#I]O.:fQ`O'#IWO.:vQ`O'#FvO.;OQaO,5:mO.;VQ`O,5<bO.;_Q`O,5<bO!%WQ`O,5<bO.;gQ`O1G0XO.<yQ`O,5:{O.>fQ`O,5>wO.@RQ`O1G1|O!%WQ`O1G1|O0aQ`O1G1|O0aQ`O7+'hO.@ZQ`O7+'hO.@cQpO7+'hO.@kQpO<<KSO0aQ`O<<KSO.@sQpOAN@nO.@{Q`O'#IWO.A]Q`O'#IWO.CSQaO,5:mO.CZQaO,5:mO.CbQ`O,5<bO.CjQ`O7+'hO.CrQ`O1G0XO.EUQ`O1G0XO.FhQ`O1G1|O.FpQ`O7+'hO.FxQpO7+'hO.GQQpOAN@nO.GYQpO<<KSO.GbQpOAN@nO.GjQ`O'#FvO.GrQ`O'#FlO.GzQ`O,5<bO!%WQ`O,5<bO!%WQ`O1G1|O0aQ`O1G1|O0aQ`O7+'hO0aQ`O<<KSO.HSQ`O'#FvO.H[Q`O,5<bO.HdQ`O,5<bO!%WQ`O,5<bO!%WQ`O1G1|O!%WQ`O1G1|O0aQ`O1G1|O0aQ`O<<KSO0aQ`O7+'hO0aQ`O<<KSO.HlQ`O'#FlO.HtQ`O'#FlO.H|Q`O'#Fl",
            stateData: ".Ic~O!dOS!eOS&vOS!gQQ~O!iTO&wRO~OPgOQ|OS!lOU^OW}OX!XO[mO]!_O^!WO`![Oa!SOb!]Ok!dOm!lOowOp!TOq!UOsuOt!gOu!VOv!POxkOykO|!bO}`O!O]O!P!eO!QxO!R}O!TpO!UlO!VlO!W!YO!X!QO!YzO!Z!cO![!ZO!]!^O!^!fO!`!`O!a!RO!cjO!mWO!oXO!sYO!y[O#W_O#bhO#daO#ebO#peO$ToO$]nO$^oO$aqO$drO$l!kO$zyO${!OO$}}O%O}O%V|O'g{O~O!g!mO~O&wRO!i!hX&p!hX&t!hX~O!i!pO~O!d!qO!e!qO!g!mO&t!tO&v!qO~PhO!n!vO~PhOT'VXz'VX!S'VX!b'VX!m'VX!o'VX!v'VX!y'VX#S'VX#W'VX#`'VX#a'VX#p#qX#s'VX#z'VX#{'VX#|'VX#}'VX$O'VX$Q'VX$R'VX$S'VX$T'VX$U'VX$V'VX$W'VX$z'VX&s'VX~O!q!xO~P&sOT#TOz#RO!S#UO!b#VO!m#cO!o!{O!v!yO!y!}O#S#QO#W!zO#`!|O#a!|O#s#PO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dO&s#cO~OPgOQ|OU^OW}O[mOowOs#hOxkOykO}`O!O]O!QxO!R}O!TpO!UlO!VlO!YzO!cjO!s#gO!y[O#W_O#bhO#daO#ebO#peO$ToO$]nO$^oO$aqO$zyO${!OO$}}O%O}O%V|O'g{O~O!y[O~O!y#kO~OP6]OQ|OU^OW}O[6`Oo=YOs#hOx6^Oy6^O}`O!O]O!Q6dO!R}O!T6cO!U6_O!V6_O!Y6fO!c8fO!s#gO!y[O#S#oO#U#nO#W_O#bhO#daO#ebO#peO$T6bO$]6aO$^6bO$aqO$z6eO${!OO$}}O%O}O%V|O'g{O#X'OP~O!}#sO~P-UO!y#tO~O#b#vO#daO#ebO~O#p#xO~O!s#yO~OU$PO!R$PO!s$OO!v#}O#p2XO~OT&zXz&zX!S&zX!b&zX!m&zX!o&zX!v&zX!y&zX#S&zX#W&zX#`&zX#a&zX#s&zX#z&zX#{&zX#|&zX#}&zX$O&zX$Q&zX$R&zX$S&zX$T&zX$U&zX$V&zX$W&zX$z&zX&s&zX!x&zX!n&zX~O#u$RO#w$SO~P0rOP6]OQ|OU^OW}O[6`Oo=YOs#hOx6^Oy6^O}`O!O]O!Q6dO!R}O!T6cO!U6_O!V6_O!Y6fO!c8fO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T6bO$]6aO$^6bO$aqO$z6eO${!OO$}}O%O}O%V|O'g{OT#xXz#xX!S#xX!b#xX!m#xX!o#xX!v#xX#`#xX#a#xX#s#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX&s#xX!x#xX!n#xX~Or$UO#S6yO#U6xO~P2yO!s#gO#peO~OS$gO]$bOk$eOm$gOs$aO!`$cO$drO$l$fO~O!s$kO!y$hO#S$jO~Oo$mOs$lO#b$nO~O!y$hO#S$rO~O$l$tO~P*kOR$zO!o$yO#b$xO#e$yO&q$zO~O'f$|O~P8lO!y%RO~O!y%TO~O!s%VO~O!m#cO&s#cO~P*kO!oXO~O!y%_O~OP6]OQ|OU^OW}O[6`Oo=YOs#hOx6^Oy6^O}`O!O]O!Q6dO!R}O!T6cO!U6_O!V6_O!Y6fO!c8fO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T6bO$]6aO$^6bO$aqO$z6eO${!OO$}}O%O}O%V|O'g{O~O!y%cO~O!s%dO~O]$bO~O!s%hO~O!s%iO~O!s%jO~O!oXO!s#gO#peO~O]%rOs%rO!o%pO!s#gO#p%nO~O!s%vO~O!i%wO&t%wO&wRO~O&t%zO~PhO!n%{O~PhOPgOQ|OU^OW}O[8lOo=yOs#hOx8jOy8jO}`O!O]O!Q8pO!R}O!T8oO!U8kO!V8kO!Y8rO!c8iO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T8nO$]8mO$^8nO$aqO$z8qO${!OO$}}O%O}O%V|O'g{O~O!q%}O~P>UO#X&PO~P>UO!o&SO!s&RO#b&RO~OPgOQ|OU^OW}O[8lOo=yOs#hOx8jOy8jO}`O!O]O!Q8pO!R}O!T8oO!U8kO!V8kO!Y8rO!c8iO!s&VO!y[O#U&WO#W_O#bhO#daO#ebO#peO$T8nO$]8mO$^8nO$aqO$z8qO${!OO$}}O%O}O%V|O'g{O~O!x'SP~PAOO!s&[O#b&[O~OT#TOz#RO!S#UO!b#VO!o!{O!v!yO!y!}O#S#QO#W!zO#`!|O#a!|O#s#PO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dO~O!x&nO~PCqO!x'VX!}'VX#O'VX#X'VX!n'VXV'VX!q'VX#u'VX#w'VXw'VX~P&sO!y$hO#S&oO~Oo$mOs$lO~O!o&pO~O!}&sO#S;dO#U;cO!x'OP~P9yOT6iOz6gO!S6jO!b6kO!o!{O!v8sO!y!}O#S#QO#W!zO#`!|O#a!|O#s#PO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}'PX#X'PX~O#O&tO~PGSO!}&wO#X'OX~O#X&yO~O!}'OO!x'QP~P9yO!n'PO~PCqO!m#oa!o#oa#S#oa#p#qX&s#oa!x#oa#O#oaw#oa~OT#oaz#oa!S#oa!b#oa!v#oa!y#oa#W#oa#`#oa#a#oa#s#oa#z#oa#{#oa#|#oa#}#oa$O#oa$Q#oa$R#oa$S#oa$T#oa$U#oa$V#oa$W#oa$z#oa!}#oa#X#oa!n#oaV#oa!q#oa#u#oa#w#oa~PIpO!s'RO~O!x'UO#l'SO~O!x'VX#l'VX#p#qX#S'VX#U'VX#b'VX!o'VX#O'VXw'VX!m'VX&s'VX~O#S'YO~P*kO!m$Xa&s$Xa!x$Xa!n$Xa~PCqO!m$Ya&s$Ya!x$Ya!n$Ya~PCqO!m$Za&s$Za!x$Za!n$Za~PCqO!m$[a&s$[a!x$[a!n$[a~PCqO!o!{O!y!}O#W!zO#`!|O#a!|O#s#PO$z#dOT$[a!S$[a!b$[a!m$[a!v$[a#S$[a#z$[a#{$[a#|$[a#}$[a$O$[a$Q$[a$R$[a$S$[a$T$[a$U$[a$V$[a$W$[a&s$[a!x$[a!n$[a~Oz#RO~PNyO!m$_a&s$_a!x$_a!n$_a~PCqO!y!}O!}$fX#X$fX~O!}'^O#X'ZX~O#X'`O~O!s$kO#S'aO~O]'cO~O!s'eO~O!s'fO~O$l'gO~O!`'mO#S'kO#U'lO#b'jO$drO!x'XP~P0aO!^'sO!oXO!q'rO~O!s'uO!y$hO~O!y$hO#S'wO~O!y$hO#S'yO~O#u'zO!m$sX!}$sX&s$sX~O!}'{O!m'bX&s'bX~O!m#cO&s#cO~O!q(PO#O(OO~O!m$ka&s$ka!x$ka!n$ka~PCqOl(ROw(SO!o(TO!y!}O~O!o!{O!y!}O#W!zO#`!|O#a!|O#s#PO~OT$yaz$ya!S$ya!b$ya!m$ya!v$ya#S$ya#z$ya#{$ya#|$ya#}$ya$O$ya$Q$ya$R$ya$S$ya$T$ya$U$ya$V$ya$W$ya$z$ya&s$ya!x$ya!}$ya#O$ya#X$ya!n$ya!q$yaV$ya#u$ya#w$ya~P!'WO!m$|a&s$|a!x$|a!n$|a~PCqO#W([O#`(YO#a(YO&r(ZOR&gX!o&gX#b&gX#e&gX&q&gX'f&gX~O'f(_O~P8lO!q(`O~PhO!o(cO!q(dO~O!q(`O&s(gO~PhO!a(kO~O!m(lO~P9yOZ(wOn(xO~O!s(zO~OT6iOz6gO!S6jO!b6kO!v8sO!}({O#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m'jX&s'jX~P!'WO#u)PO~O!})QO!m'`X&s'`X~Ol(RO!o(TO~Ow(SO!o)WO!q)ZO~O!m#cO!oXO&s#cO~O!o%pO!s#yO~OV)aO!})_O!m'kX&s'kX~O])cOs)cO!s#gO#peO~O!o%pO!s#gO#p)hO~OT6iOz6gO!S6jO!b6kO!v8sO!})iO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m&|X&s&|X#O&|X~P!'WOl(ROw(SO!o(TO~O!i)oO&t)oO~OT8vOz8tO!S8wO!b8xO!q)pO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#X)rO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WO!n)rO~PCqOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x'TX!}'TX~P!'WOT'VXz'VX!S'VX!b'VX!o'VX!v'VX!y'VX#S'VX#W'VX#`'VX#a'VX#p#qX#s'VX#z'VX#{'VX#|'VX#}'VX$O'VX$Q'VX$R'VX$S'VX$T'VX$U'VX$V'VX$W'VX$z'VX~O!q)tO!x'VX!}'VX~P!5xO!x#iX!}#iX~P>UO!})vO!x'SX~O!x)xO~O$z#dOT#yiz#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi$W#yi&s#yi!x#yi!}#yi#O#yi#X#yi!n#yi!q#yiV#yi#u#yi#w#yi~P!'WOz#RO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi&s#yi!x#yi!n#yi~P!'WOz#RO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi&s#yi!x#yi!n#yi~P!'WOT#TOz#RO!b#VO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dO!S#yi!m#yi&s#yi!x#yi!n#yi~P!'WOT#TOz#RO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dO!S#yi!b#yi!m#yi&s#yi!x#yi!n#yi~P!'WOz#RO#S#QO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#z#yi#{#yi&s#yi!x#yi!n#yi~P!'WOz#RO#S#QO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#z#yi#{#yi#|#yi&s#yi!x#yi!n#yi~P!'WOz#RO#S#QO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#z#yi#{#yi#|#yi#}#yi&s#yi!x#yi!n#yi~P!'WOz#RO#S#QO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#z#yi#{#yi#|#yi#}#yi$O#yi&s#yi!x#yi!n#yi~P!'WOz#RO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi&s#yi!x#yi!n#yi~P!'WOz#RO$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi&s#yi!x#yi!n#yi~P!'WOz#RO$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi&s#yi!x#yi!n#yi~P!'WOz#RO$T#`O$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi&s#yi!x#yi!n#yi~P!'WOz#RO$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi&s#yi!x#yi!n#yi~P!'WOz#RO$S#_O$T#`O$V#bO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi&s#yi!x#yi!n#yi~P!'WOz#RO$W#bO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi&s#yi!x#yi!n#yi~P!'WO_)yO~P9yO!x)|O~O#S*PO~P9yOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}#Ta#X#Ta#O#Ta!m#Ta&s#Ta!x#Ta!n#TaV#Ta!q#Ta~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}'Pa#X'Pa#O'Pa!m'Pa&s'Pa!x'Pa!n'PaV'Pa!q'Pa~P!'WO#S#oO#U#nO!}&WX#X&WX~P9yO!}&wO#X'Oa~O#X*SO~OT6iOz6gO!S6jO!b6kO!v8sO!}*UO#O*TO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!x'QX~P!'WO!}*UO!x'QX~O!x*WO~O!m#oi!o#oi#S#oi#p#qX&s#oi!x#oi#O#oiw#oi~OT#oiz#oi!S#oi!b#oi!v#oi!y#oi#W#oi#`#oi#a#oi#s#oi#z#oi#{#oi#|#oi#}#oi$O#oi$Q#oi$R#oi$S#oi$T#oi$U#oi$V#oi$W#oi$z#oi!}#oi#X#oi!n#oiV#oi!q#oi#u#oi#w#oi~P#*zO#l'SO!x#ka#S#ka#U#ka#b#ka!o#ka#O#kaw#ka!m#ka&s#ka~OPgOQ|OU^OW}O[4OOo5xOs#hOx3zOy3zO}`O!O]O!Q2^O!R}O!T4UO!U3|O!V3|O!Y2`O!c3xO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T4SO$]4QO$^4SO$aqO$z2_O${!OO$}}O%O}O%V|O'g{O~O#l#oa#U#oa#b#oa~PIpOz#RO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#Pi!S#Pi!b#Pi!m#Pi&s#Pi!x#Pi!n#Pi~P!'WOz#RO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#vi!S#vi!b#vi!m#vi&s#vi!x#vi!n#vi~P!'WO!m#xi&s#xi!x#xi!n#xi~PCqO!s#gO#peO!}&^X#X&^X~O!}'^O#X'Za~O!s'uO~Ow(SO!o)WO!q*fO~O!s*jO~O#S*lO#U*mO#b*kO#l'SO~O#S*lO#U*mO#b*kO$drO~P0aO#u*oO!x$cX!}$cX~O#U*mO#b*kO~O#b*pO~O#b*rO~P0aO!}*sO!x'XX~O!x*uO~O!y*wO~O!^*{O!oXO!q*zO~O!q*}O!o'ci!m'ci&s'ci~O!q+QO#O+PO~O#b$nO!m&eX!}&eX&s&eX~O!}'{O!m'ba&s'ba~OT$kiz$ki!S$ki!b$ki!m$ki!o$ki!v$ki!y$ki#S$ki#W$ki#`$ki#a$ki#s$ki#u#fa#w#fa#z$ki#{$ki#|$ki#}$ki$O$ki$Q$ki$R$ki$S$ki$T$ki$U$ki$V$ki$W$ki$z$ki&s$ki!x$ki!}$ki#O$ki#X$ki!n$ki!q$kiV$ki~OS+^O]+aOm+^Os$aO!^+dO!_+^O!`+^O!n+hO#b$nO$aqO$drO~P0aO!s+lO~O#W+nO#`+mO#a+mO~O!s+pO#b+pO$}+pO%T+oO~O!n+qO~PCqOc%XXd%XXh%XXj%XXf%XXg%XXe%XX~PhOc+uOd+sOP%WiQ%WiS%WiU%WiW%WiX%Wi[%Wi]%Wi^%Wi`%Wia%Wib%Wik%Wim%Wio%Wip%Wiq%Wis%Wit%Wiu%Wiv%Wix%Wiy%Wi|%Wi}%Wi!O%Wi!P%Wi!Q%Wi!R%Wi!T%Wi!U%Wi!V%Wi!W%Wi!X%Wi!Y%Wi!Z%Wi![%Wi!]%Wi!^%Wi!`%Wi!a%Wi!c%Wi!m%Wi!o%Wi!s%Wi!y%Wi#W%Wi#b%Wi#d%Wi#e%Wi#p%Wi$T%Wi$]%Wi$^%Wi$a%Wi$d%Wi$l%Wi$z%Wi${%Wi$}%Wi%O%Wi%V%Wi&p%Wi'g%Wi&t%Wi!n%Wih%Wij%Wif%Wig%WiY%Wi_%Wii%Wie%Wi~Oc+yOd+vOh+xO~OY+zO_+{O!n,OO~OY+zO_+{Oi%^X~Oi,QO~Oj,RO~O!m,TO~P9yO!m,VO~Of,WO~OT6iOV,XOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO~P!'WOg,YO~O!y,ZO~OZ(wOn(xOP%liQ%liS%liU%liW%liX%li[%li]%li^%li`%lia%lib%lik%lim%lio%lip%liq%lis%lit%liu%liv%lix%liy%li|%li}%li!O%li!P%li!Q%li!R%li!T%li!U%li!V%li!W%li!X%li!Y%li!Z%li![%li!]%li!^%li!`%li!a%li!c%li!m%li!o%li!s%li!y%li#W%li#b%li#d%li#e%li#p%li$T%li$]%li$^%li$a%li$d%li$l%li$z%li${%li$}%li%O%li%V%li&p%li'g%li&t%li!n%lic%lid%lih%lij%lif%lig%liY%li_%lii%lie%li~O#u,_O~O!}({O!m%da&s%da~O!x,bO~O!s%dO!m&dX!}&dX&s&dX~O!})QO!m'`a&s'`a~OS+^OY,iOm+^Os$aO!^+dO!_+^O!`+^O$aqO$drO~O!n,lO~P#JwO!o)WO~O!o%pO!s'RO~O!s#gO#peO!m&nX!}&nX&s&nX~O!})_O!m'ka&s'ka~O!s,rO~OV,sO!n%|X!}%|X~O!},uO!n'lX~O!n,wO~O!m&UX!}&UX&s&UX#O&UX~P9yO!})iO!m&|a&s&|a#O&|a~Oz#RO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT!uq!S!uq!b!uq!m!uq!v!uq&s!uq!x!uq!n!uq~P!'WO!n,|O~PCqOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#ia!}#ia~P!'WO!x&YX!}&YX~PAOO!})vO!x'Sa~O#O-QO~O!}-RO!n&{X~O!n-TO~O!x-UO~OT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}#Vi#X#Vi~P!'WO!x&XX!}&XX~P9yO!}*UO!x'Qa~O!x-[O~OT#jqz#jq!S#jq!b#jq!m#jq!v#jq#S#jq#u#jq#w#jq#z#jq#{#jq#|#jq#}#jq$O#jq$Q#jq$R#jq$S#jq$T#jq$U#jq$V#jq$W#jq$z#jq&s#jq!x#jq!}#jq#O#jq#X#jq!n#jq!q#jqV#jq~P!'WO#l#oi#U#oi#b#oi~P#*zOz#RO!v!yO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT#Pq!S#Pq!b#Pq!m#Pq&s#Pq!x#Pq!n#Pq~P!'WO#u-dO!x$ca!}$ca~O#U-fO#b-eO~O#b-gO~O#S-hO#U-fO#b-eO#l'SO~O#b-jO#l'SO~O#u-kO!x$ha!}$ha~O!`'mO#S'kO#U'lO#b'jO$drO!x&_X!}&_X~P0aO!}*sO!x'Xa~O!oXO#l'SO~O#S-pO#b-oO!x'[P~O!oXO!q-rO~O!q-uO!o'cq!m'cq&s'cq~O!^-wO!oXO!q-rO~O!q-{O#O-zO~OT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m$si!}$si&s$si~P!'WO!m$jq&s$jq!x$jq!n$jq~PCqO#O-zO#l'SO~O!}-|Ow']X!o']X!m']X&s']X~O#b$nO#l'SO~OS+^O].ROm+^Os$aO!_+^O!`+^O#b$nO$aqO$drO~P0aOS+^O].ROm+^Os$aO!_+^O!`+^O#b$nO$aqO~P0aOS+^O]+aOm+^Os$aO!^+dO!_+^O!`+^O!n.ZO#b$nO$aqO$drO~P0aO!s.^O~O!s._O#b._O$}._O%T+oO~O$}.`O~O#X.aO~Oc%Xad%Xah%Xaj%Xaf%Xag%Xae%Xa~PhOc.dOd+sOP%WqQ%WqS%WqU%WqW%WqX%Wq[%Wq]%Wq^%Wq`%Wqa%Wqb%Wqk%Wqm%Wqo%Wqp%Wqq%Wqs%Wqt%Wqu%Wqv%Wqx%Wqy%Wq|%Wq}%Wq!O%Wq!P%Wq!Q%Wq!R%Wq!T%Wq!U%Wq!V%Wq!W%Wq!X%Wq!Y%Wq!Z%Wq![%Wq!]%Wq!^%Wq!`%Wq!a%Wq!c%Wq!m%Wq!o%Wq!s%Wq!y%Wq#W%Wq#b%Wq#d%Wq#e%Wq#p%Wq$T%Wq$]%Wq$^%Wq$a%Wq$d%Wq$l%Wq$z%Wq${%Wq$}%Wq%O%Wq%V%Wq&p%Wq'g%Wq&t%Wq!n%Wqh%Wqj%Wqf%Wqg%WqY%Wq_%Wqi%Wqe%Wq~Oc.iOd+vOh.hO~O!q(`O~OP6]OQ|OU^OW}O[:fOo>ROs#hOx:dOy:dO}`O!O]O!Q:kO!R}O!T:jO!U:eO!V:eO!Y:oO!c8gO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T:hO$]:gO$^:hO$aqO$z:mO${!OO$}}O%O}O%V|O'g{O~O!m.lO!q.lO~OY+zO_+{O!n.nO~OY+zO_+{Oi%^a~O!x.rO~P>UO!m.tO~O!m.tO~P9yOQ|OW}O!R}O$}}O%O}O%V|O'g{O~OT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m&ka!}&ka&s&ka~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m$qi!}$qi&s$qi~P!'WOS+^Om+^Os$aO!_+^O!`+^O$aqO$drO~OY/PO~P$?VOS+^Om+^Os$aO!_+^O!`+^O$aqO~O!s/QO~O!n/SO~P#JwOw(SO!o)WO#l'SO~OV/VO!m&na!}&na&s&na~O!})_O!m'ki&s'ki~O!s/XO~OV/YO!n%|a!}%|a~O]/[Os/[O!s#gO#peO!n&oX!}&oX~O!},uO!n'la~OT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m&Ua!}&Ua&s&Ua#O&Ua~P!'WOz#RO#S#QO#z#SO#{#WO#|#XO#}#YO$O#ZO$Q#]O$R#^O$S#_O$T#`O$U#aO$V#bO$W#bO$z#dOT!uy!S!uy!b!uy!m!uy!v!uy&s!uy!x!uy!n!uy~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#hi!}#hi~P!'WO_)yO!n&VX!}&VX~P9yO!}-RO!n&{a~OT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}#Vq#X#Vq~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#[i!}#[i~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#O/cO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!x&Xa!}&Xa~P!'WO#u/iO!x$ci!}$ci~O#b/jO~O#U/lO#b/kO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$ci!}$ci~P!'WO#u/mO!x$hi!}$hi~O!}/oO!x'[X~O#b/qO~O!x/rO~O!oXO!q/uO~O#l'SO!o'cy!m'cy&s'cy~O!m$jy&s$jy!x$jy!n$jy~PCqO#O/xO#l'SO~O!s#gO#peOw&aX!o&aX!}&aX!m&aX&s&aX~O!}-|Ow']a!o']a!m']a&s']a~OU$PO]0QO!R$PO!s$OO!v#}O#b$nO#p2XO~P$?uO!m#cO!o0VO&s#cO~O#X0YO~Oh0_O~OT:tOz:pO!S:vO!b:xO!m0`O!q0`O!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO~P!'WOY%]a_%]a!n%]ai%]a~PhO!x0bO~O!x0bO~P>UO!m0dO~OT6iOz6gO!S6jO!b6kO!v8sO!x0fO#O0eO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO~P!'WO!x0fO~O!x0gO#b0hO#l'SO~O!x0iO~O!s0jO~O!m#cO#u0lO&s#cO~O!s0mO~O!})_O!m'kq&s'kq~O!s0nO~OV0oO!n%}X!}%}X~OT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!n!|i!}!|i~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$cq!}$cq~P!'WO#u0vO!x$cq!}$cq~O#b0wO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$hq!}$hq~P!'WO#S0zO#b0yO!x&`X!}&`X~O!}/oO!x'[a~O#l'SO!o'c!R!m'c!R&s'c!R~O!oXO!q1PO~O!m$j!R&s$j!R!x$j!R!n$j!R~PCqO#O1RO#l'SO~OP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!n1^O!s1YO!y[O#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$z:nO${!OO~P$;lOh1_O~OY%[i_%[i!n%[ii%[i~PhOY%]i_%]i!n%]ii%]i~PhO!x1bO~O!x1bO~P>UO!x1eO~O!m#cO#u1iO&s#cO~O$}1jO%V1jO~O!s1kO~OV1lO!n%}a!}%}a~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#]i!}#]i~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$cy!}$cy~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$hy!}$hy~P!'WO#b1nO~O!}/oO!x'[i~O!m$j!Z&s$j!Z!x$j!Z!n$j!Z~PCqOT:uOz:qO!S:wO!b:yO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dO~P!'WOV1uO{1tO~P!5xOV1uO{1tOT&}Xz&}X!S&}X!b&}X!o&}X!v&}X!y&}X#S&}X#W&}X#`&}X#a&}X#s&}X#u&}X#w&}X#z&}X#{&}X#|&}X#}&}X$O&}X$Q&}X$R&}X$S&}X$T&}X$U&}X$V&}X$W&}X$z&}X~OP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!n1xO!s1YO!y[O#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$z:nO${!OO~P$;lOY%[q_%[q!n%[qi%[q~PhO!x1zO~O!x%gi~PCqOe1{O~O$}1|O%V1|O~O!s2OO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x$c!R!}$c!R~P!'WO!m$j!c&s$j!c!x$j!c!n$j!c~PCqO!s2QO~O!`2SO!s2RO~O!s2VO!m$xi&s$xi~O!s'WO~O!s*]O~OT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$ka#u$ka#w$ka&s$ka!x$ka!n$ka!q$ka#X$ka!}$ka~P!'WO#S2]O~P*kO$l$tO~P#.YOT6iOz6gO!S6jO!b6kO!v8sO#O2[O#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m'PX&s'PX!x'PX!n'PX~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#O3uO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}'PX#X'PX#u'PX#w'PX!m'PX&s'PX!x'PX!n'PXV'PX!q'PX~P!'WO#S3dO~P#.YOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$Xa#u$Xa#w$Xa&s$Xa!x$Xa!n$Xa!q$Xa#X$Xa!}$Xa~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$Ya#u$Ya#w$Ya&s$Ya!x$Ya!n$Ya!q$Ya#X$Ya!}$Ya~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$Za#u$Za#w$Za&s$Za!x$Za!n$Za!q$Za#X$Za!}$Za~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$[a#u$[a#w$[a&s$[a!x$[a!n$[a!q$[a#X$[a!}$[a~P!'WOz2aO#u$[a#w$[a!q$[a#X$[a!}$[a~PNyOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$_a#u$_a#w$_a&s$_a!x$_a!n$_a!q$_a#X$_a!}$_a~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$|a#u$|a#w$|a&s$|a!x$|a!n$|a!q$|a#X$|a!}$|a~P!'WOz2aO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#u#yi#w#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi#u#yi#w#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOT2cOz2aO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!S#yi!m#yi#u#yi#w#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOT2cOz2aO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!S#yi!b#yi!m#yi#u#yi#w#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO#S#QO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#u#yi#w#yi#z#yi#{#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO#S#QO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#u#yi#w#yi#z#yi#{#yi#|#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO#S#QO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO#S#QO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$T2nO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$S2mO$T2nO$V2pO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOz2aO$W2pO$z#dOT#yi!S#yi!b#yi!m#yi!v#yi#S#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi&s#yi!x#yi!n#yi!q#yi#X#yi!}#yi~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m#Ta#u#Ta#w#Ta&s#Ta!x#Ta!n#Ta!q#Ta#X#Ta!}#Ta~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m'Pa#u'Pa#w'Pa&s'Pa!x'Pa!n'Pa!q'Pa#X'Pa!}'Pa~P!'WOz2aO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#Pi!S#Pi!b#Pi!m#Pi#u#Pi#w#Pi&s#Pi!x#Pi!n#Pi!q#Pi#X#Pi!}#Pi~P!'WOz2aO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#vi!S#vi!b#vi!m#vi#u#vi#w#vi&s#vi!x#vi!n#vi!q#vi#X#vi!}#vi~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m#xi#u#xi#w#xi&s#xi!x#xi!n#xi!q#xi#X#xi!}#xi~P!'WOz2aO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT!uq!S!uq!b!uq!m!uq!v!uq#u!uq#w!uq&s!uq!x!uq!n!uq!q!uq#X!uq!}!uq~P!'WOz2aO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT#Pq!S#Pq!b#Pq!m#Pq#u#Pq#w#Pq&s#Pq!x#Pq!n#Pq!q#Pq#X#Pq!}#Pq~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$jq#u$jq#w$jq&s$jq!x$jq!n$jq!q$jq#X$jq!}$jq~P!'WOz2aO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dOT!uy!S!uy!b!uy!m!uy!v!uy#u!uy#w!uy&s!uy!x!uy!n!uy!q!uy#X!uy!}!uy~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$jy#u$jy#w$jy&s$jy!x$jy!n$jy!q$jy#X$jy!}$jy~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$j!R#u$j!R#w$j!R&s$j!R!x$j!R!n$j!R!q$j!R#X$j!R!}$j!R~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$j!Z#u$j!Z#w$j!Z&s$j!Z!x$j!Z!n$j!Z!q$j!Z#X$j!Z!}$j!Z~P!'WOT2cOz2aO!S2dO!b2eO!v4WO#S#QO#z2bO#{2fO#|2gO#}2hO$O2iO$Q2kO$R2lO$S2mO$T2nO$U2oO$V2pO$W2pO$z#dO!m$j!c#u$j!c#w$j!c&s$j!c!x$j!c!n$j!c!q$j!c#X$j!c!}$j!c~P!'WOP6]OU^O[4POo8^Os#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#S3vO#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$z4bO${!OO~P$;lOP6]OU^O[4POo8^Os#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$z4bO${!OO~P$;lO#u2uO#w2vO!q&zX#X&zX!}&zX~P0rOP6]OU^O[4POo8^Or2wOs#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#S2tO#U2sO#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$z4bO${!OOT#xXz#xX!S#xX!b#xX!m#xX!o#xX!v#xX#`#xX#a#xX#s#xX#u#xX#w#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX&s#xX!x#xX!n#xX!q#xX#X#xX!}#xX~P$;lOP6]OU^O[4POo8^Or4xOs#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#S4uO#U4tO#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$z4bO${!OOT#xXz#xX!S#xX!b#xX!o#xX!v#xX!}#xX#O#xX#X#xX#`#xX#a#xX#s#xX#u#xX#w#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX!m#xX&s#xX!x#xX!n#xXV#xX!q#xX~P$;lO!q3PO~P>UO!q5}O#O3gO~OT8vOz8tO!S8wO!b8xO!q3hO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WO!q6OO#O3kO~O!q6PO#O3oO~O#O3oO#l'SO~O#O3pO#l'SO~O#O3sO#l'SO~OP6]OU^O[4POo8^Os#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$l$tO$z4bO${!OO~P$;lOP6]OU^O[4POo8^Os#hOx3{Oy3{O}`O!O]O!Q4aO!T4VO!U3}O!V3}O!Y4cO!c3yO!s#gO!y[O#S5eO#W_O#bhO#daO#ebO#peO$T4TO$]4RO$^4TO$aqO$z4bO${!OO~P$;lOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$Xa#O$Xa#X$Xa#u$Xa#w$Xa!m$Xa&s$Xa!x$Xa!n$XaV$Xa!q$Xa~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$Ya#O$Ya#X$Ya#u$Ya#w$Ya!m$Ya&s$Ya!x$Ya!n$YaV$Ya!q$Ya~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$Za#O$Za#X$Za#u$Za#w$Za!m$Za&s$Za!x$Za!n$ZaV$Za!q$Za~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$[a#O$[a#X$[a#u$[a#w$[a!m$[a&s$[a!x$[a!n$[aV$[a!q$[a~P!'WOz4dO!}$[a#O$[a#X$[a#u$[a#w$[aV$[a!q$[a~PNyOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$_a#O$_a#X$_a#u$_a#w$_a!m$_a&s$_a!x$_a!n$_aV$_a!q$_a~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$|a#O$|a#X$|a#u$|a#w$|a!m$|a&s$|a!x$|a!n$|aV$|a!q$|a~P!'WOz4dO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#u#yi#w#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!}#yi#O#yi#X#yi#u#yi#w#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOT4fOz4dO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!S#yi!}#yi#O#yi#X#yi#u#yi#w#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOT4fOz4dO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!S#yi!b#yi!}#yi#O#yi#X#yi#u#yi#w#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO#S#QO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#u#yi#w#yi#z#yi#{#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO#S#QO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO#S#QO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO#S#QO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$T4qO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$S4pO$T4qO$V4sO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz4dO$W4sO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#u#yi#w#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}#Ta#O#Ta#X#Ta#u#Ta#w#Ta!m#Ta&s#Ta!x#Ta!n#TaV#Ta!q#Ta~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}'Pa#O'Pa#X'Pa#u'Pa#w'Pa!m'Pa&s'Pa!x'Pa!n'PaV'Pa!q'Pa~P!'WOz4dO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#Pi!S#Pi!b#Pi!}#Pi#O#Pi#X#Pi#u#Pi#w#Pi!m#Pi&s#Pi!x#Pi!n#PiV#Pi!q#Pi~P!'WOz4dO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#vi!S#vi!b#vi!}#vi#O#vi#X#vi#u#vi#w#vi!m#vi&s#vi!x#vi!n#viV#vi!q#vi~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}#xi#O#xi#X#xi#u#xi#w#xi!m#xi&s#xi!x#xi!n#xiV#xi!q#xi~P!'WOz4dO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT!uq!S!uq!b!uq!v!uq!}!uq#O!uq#X!uq#u!uq#w!uq!m!uq&s!uq!x!uq!n!uqV!uq!q!uq~P!'WOz4dO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT#Pq!S#Pq!b#Pq!}#Pq#O#Pq#X#Pq#u#Pq#w#Pq!m#Pq&s#Pq!x#Pq!n#PqV#Pq!q#Pq~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$jq#O$jq#X$jq#u$jq#w$jq!m$jq&s$jq!x$jq!n$jqV$jq!q$jq~P!'WOz4dO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dOT!uy!S!uy!b!uy!v!uy!}!uy#O!uy#X!uy#u!uy#w!uy!m!uy&s!uy!x!uy!n!uyV!uy!q!uy~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$jy#O$jy#X$jy#u$jy#w$jy!m$jy&s$jy!x$jy!n$jyV$jy!q$jy~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$j!R#O$j!R#X$j!R#u$j!R#w$j!R!m$j!R&s$j!R!x$j!R!n$j!RV$j!R!q$j!R~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$j!Z#O$j!Z#X$j!Z#u$j!Z#w$j!Z!m$j!Z&s$j!Z!x$j!Z!n$j!ZV$j!Z!q$j!Z~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$j!c#O$j!c#X$j!c#u$j!c#w$j!c!m$j!c&s$j!c!x$j!c!n$j!cV$j!c!q$j!c~P!'WO#S5wO~P#.YO!y$hO#S5{O~O!x4ZO#l'SO~O!y$hO#S5|O~OT4fOz4dO!S4gO!b4hO!v6TO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!}$ka#O$ka#X$ka#u$ka#w$ka!m$ka&s$ka!x$ka!n$kaV$ka!q$ka~P!'WOT4fOz4dO!S4gO!b4hO!v6TO#O5vO#S#QO#z4eO#{4iO#|4jO#}4kO$O4lO$Q4nO$R4oO$S4pO$T4qO$U4rO$V4sO$W4sO$z#dO!m'PX#u'PX#w'PX&s'PX!x'PX!n'PX!q'PX#X'PX!}'PX~P!'WO#u4vO#w4wO!}&zX#O&zX#X&zXV&zX!q&zX~P0rO!q5QO~P>UO!q8bO#O5hO~OT8vOz8tO!S8wO!b8xO!q5iO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WO!q8cO#O5lO~O!q8dO#O5pO~O#O5pO#l'SO~O#O5qO#l'SO~O#O5tO#l'SO~O$l$tO~P9yOo5zOs$lO~O#S7oO~P9yOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$Xa#O$Xa#X$Xa!m$Xa&s$Xa!x$Xa!n$XaV$Xa!q$Xa~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$Ya#O$Ya#X$Ya!m$Ya&s$Ya!x$Ya!n$YaV$Ya!q$Ya~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$Za#O$Za#X$Za!m$Za&s$Za!x$Za!n$ZaV$Za!q$Za~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$[a#O$[a#X$[a!m$[a&s$[a!x$[a!n$[aV$[a!q$[a~P!'WOz6gO!}$[a#O$[a#X$[aV$[a!q$[a~PNyOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$_a#O$_a#X$_a!m$_a&s$_a!x$_a!n$_aV$_a!q$_a~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$ka#O$ka#X$ka!m$ka&s$ka!x$ka!n$kaV$ka!q$ka~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$|a#O$|a#X$|a!m$|a&s$|a!x$|a!n$|aV$|a!q$|a~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO!}7sO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x'jX~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO!}7uO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x&|X~P!'WOz6gO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!}#yi#O#yi#X#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOT6iOz6gO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!S#yi!}#yi#O#yi#X#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOT6iOz6gO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!S#yi!b#yi!}#yi#O#yi#X#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO#S#QO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#z#yi#{#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO#S#QO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#z#yi#{#yi#|#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO#S#QO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#z#yi#{#yi#|#yi#}#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO#S#QO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$T6tO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$S6sO$T6tO$V6vO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WOz6gO$W6vO$z#dOT#yi!S#yi!b#yi!v#yi!}#yi#O#yi#S#yi#X#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi!m#yi&s#yi!x#yi!n#yiV#yi!q#yi~P!'WO#S7zO~P>UO!m#Ta&s#Ta!x#Ta!n#Ta~PCqO!m'Pa&s'Pa!x'Pa!n'Pa~PCqO#S;dO#U;cO!x&WX!}&WX~P9yO!}7lO!x'Oa~Oz6gO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#Pi!S#Pi!b#Pi!}#Pi#O#Pi#X#Pi!m#Pi&s#Pi!x#Pi!n#PiV#Pi!q#Pi~P!'WOz6gO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#vi!S#vi!b#vi!}#vi#O#vi#X#vi!m#vi&s#vi!x#vi!n#viV#vi!q#vi~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}#xi#O#xi#X#xi!m#xi&s#xi!x#xi!n#xiV#xi!q#xi~P!'WO!}7sO!x%da~O!x&UX!}&UX~P>UO!}7uO!x&|a~Oz6gO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT!uq!S!uq!b!uq!v!uq!}!uq#O!uq#X!uq!m!uq&s!uq!x!uq!n!uqV!uq!q!uq~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#Vi!}#Vi~P!'WOz6gO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT#Pq!S#Pq!b#Pq!}#Pq#O#Pq#X#Pq!m#Pq&s#Pq!x#Pq!n#PqV#Pq!q#Pq~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$jq#O$jq#X$jq!m$jq&s$jq!x$jq!n$jqV$jq!q$jq~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x&ka!}&ka~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x&Ua!}&Ua~P!'WOz6gO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dOT!uy!S!uy!b!uy!v!uy!}!uy#O!uy#X!uy!m!uy&s!uy!x!uy!n!uyV!uy!q!uy~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#Vq!}#Vq~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$jy#O$jy#X$jy!m$jy&s$jy!x$jy!n$jyV$jy!q$jy~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$j!R#O$j!R#X$j!R!m$j!R&s$j!R!x$j!R!n$j!RV$j!R!q$j!R~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$j!Z#O$j!Z#X$j!Z!m$j!Z&s$j!Z!x$j!Z!n$j!ZV$j!Z!q$j!Z~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!}$j!c#O$j!c#X$j!c!m$j!c&s$j!c!x$j!c!n$j!cV$j!c!q$j!c~P!'WO#S8[O~P9yO#O8ZO!m'PX&s'PX!x'PX!n'PXV'PX!q'PX~PGSO!y$hO#S8`O~O!y$hO#S8aO~O#u6zO#w6{O!}&zX#O&zX#X&zXV&zX!q&zX~P0rOr6|O#S#oO#U#nO!}#xX#O#xX#X#xXV#xX!q#xX~P2yOr;iO#S9XO#U9VOT#xXz#xX!S#xX!b#xX!m#xX!o#xX!q#xX!v#xX#`#xX#a#xX#s#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX!n#xX!}#xX~P9yOr9WO#S9WO#U9WOT#xXz#xX!S#xX!b#xX!o#xX!v#xX#`#xX#a#xX#s#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX~P9yOr9]O#S;dO#U;cOT#xXz#xX!S#xX!b#xX!o#xX!q#xX!v#xX#`#xX#a#xX#s#xX#z#xX#{#xX#|#xX#}#xX$O#xX$Q#xX$R#xX$S#xX$U#xX$V#xX$W#xX#X#xX!x#xX!}#xX~P9yO$l$tO~P>UO!q7XO~P>UOT6iOz6gO!S6jO!b6kO!v8sO#O7iO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!x'PX!}'PX~P!'WOP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$z:nO${!OO~P$;lO!}7lO!x'OX~O#S9yO~P>UOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$Xa#X$Xa!x$Xa!}$Xa~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$Ya#X$Ya!x$Ya!}$Ya~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$Za#X$Za!x$Za!}$Za~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$[a#X$[a!x$[a!}$[a~P!'WOz8tO$z#dOT$[a!S$[a!b$[a!q$[a!v$[a#S$[a#z$[a#{$[a#|$[a#}$[a$O$[a$Q$[a$R$[a$S$[a$T$[a$U$[a$V$[a$W$[a#X$[a!x$[a!}$[a~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$_a#X$_a!x$_a!}$_a~P!'WO!q=dO#O7rO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$ka#X$ka!x$ka!}$ka~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$|a#X$|a!x$|a!}$|a~P!'WOT8vOz8tO!S8wO!b8xO!q7wO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WOz8tO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#X#yi!x#yi!}#yi~P!'WOz8tO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi#X#yi!x#yi!}#yi~P!'WOT8vOz8tO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!S#yi!q#yi#X#yi!x#yi!}#yi~P!'WOT8vOz8tO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!S#yi!b#yi!q#yi#X#yi!x#yi!}#yi~P!'WOz8tO#S#QO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#z#yi#{#yi#X#yi!x#yi!}#yi~P!'WOz8tO#S#QO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#z#yi#{#yi#|#yi#X#yi!x#yi!}#yi~P!'WOz8tO#S#QO$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#z#yi#{#yi#|#yi#}#yi#X#yi!x#yi!}#yi~P!'WOz8tO#S#QO$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#z#yi#{#yi#|#yi#}#yi$O#yi#X#yi!x#yi!}#yi~P!'WOz8tO$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi#X#yi!x#yi!}#yi~P!'WOz8tO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi#X#yi!x#yi!}#yi~P!'WOz8tO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi#X#yi!x#yi!}#yi~P!'WOz8tO$T9RO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi#X#yi!x#yi!}#yi~P!'WOz8tO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi#X#yi!x#yi!}#yi~P!'WOz8tO$S9QO$T9RO$V9TO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi#X#yi!x#yi!}#yi~P!'WOz8tO$W9TO$z#dOT#yi!S#yi!b#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi#X#yi!x#yi!}#yi~P!'WOz8tO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#Pi!S#Pi!b#Pi!q#Pi#X#Pi!x#Pi!}#Pi~P!'WOz8tO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#vi!S#vi!b#vi!q#vi#X#vi!x#vi!}#vi~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q#xi#X#xi!x#xi!}#xi~P!'WO!q=eO#O7|O~Oz8tO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT!uq!S!uq!b!uq!q!uq!v!uq#X!uq!x!uq!}!uq~P!'WOz8tO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT#Pq!S#Pq!b#Pq!q#Pq#X#Pq!x#Pq!}#Pq~P!'WO!q=iO#O8TO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$jq#X$jq!x$jq!}$jq~P!'WO#O8TO#l'SO~Oz8tO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dOT!uy!S!uy!b!uy!q!uy!v!uy#X!uy!x!uy!}!uy~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$jy#X$jy!x$jy!}$jy~P!'WO#O8UO#l'SO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$j!R#X$j!R!x$j!R!}$j!R~P!'WO#O8XO#l'SO~OT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$j!Z#X$j!Z!x$j!Z!}$j!Z~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!q$j!c#X$j!c!x$j!c!}$j!c~P!'WO#S:bO~P>UO#O:aO!q'PX!x'PX~PGSO$l$tO~P$8YOP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!s#gO!y[O#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$l$tO$z:nO${!OO~P$;lOo8_Os$lO~O#S<jO~P$8YOP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!s#gO!y[O#S<kO#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$z:nO${!OO~P$;lOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$Xa!q$Xa!n$Xa!}$Xa~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$Ya!q$Ya!n$Ya!}$Ya~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$Za!q$Za!n$Za!}$Za~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$[a!q$[a!n$[a!}$[a~P!'WOz:pO$z#dOT$[a!S$[a!b$[a!m$[a!q$[a!v$[a#S$[a#z$[a#{$[a#|$[a#}$[a$O$[a$Q$[a$R$[a$S$[a$T$[a$U$[a$V$[a$W$[a!n$[a!}$[a~P!'WOz:qO$z#dOT$[a!S$[a!b$[a!v$[a#S$[a#z$[a#{$[a#|$[a#}$[a$O$[a$Q$[a$R$[a$S$[a$T$[a$U$[a$V$[a$W$[a~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$_a!q$_a!n$_a!}$_a~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$ka!q$ka!n$ka!}$ka~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$|a!q$|a!n$|a!}$|a~P!'WOz:pO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi!n#yi!}#yi~P!'WOz:qO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi~P!'WOz:pO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!n#yi!}#yi~P!'WOz:qO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi~P!'WOT:tOz:pO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!S#yi!m#yi!q#yi!n#yi!}#yi~P!'WOT:uOz:qO!b:yO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dO!S#yi~P!'WOT:tOz:pO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!S#yi!b#yi!m#yi!q#yi!n#yi!}#yi~P!'WOT:uOz:qO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dO!S#yi!b#yi~P!'WOz:pO#S#QO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#z#yi#{#yi!n#yi!}#yi~P!'WOz:qO#S#QO#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#z#yi#{#yi~P!'WOz:pO#S#QO#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#z#yi#{#yi#|#yi!n#yi!}#yi~P!'WOz:qO#S#QO#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#z#yi#{#yi#|#yi~P!'WOz:pO#S#QO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#z#yi#{#yi#|#yi#}#yi!n#yi!}#yi~P!'WOz:qO#S#QO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#z#yi#{#yi#|#yi#}#yi~P!'WOz:pO#S#QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#z#yi#{#yi#|#yi#}#yi$O#yi!n#yi!}#yi~P!'WOz:qO#S#QO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#z#yi#{#yi#|#yi#}#yi$O#yi~P!'WOz:pO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi!n#yi!}#yi~P!'WOz:qO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi~P!'WOz:pO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi!n#yi!}#yi~P!'WOz:qO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi~P!'WOz:pO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi!n#yi!}#yi~P!'WOz:qO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi~P!'WOz:pO$T;[O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi!n#yi!}#yi~P!'WOz:qO$T;]O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$U#yi~P!'WOz:pO$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi!n#yi!}#yi~P!'WOz:qO$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi~P!'WOz:pO$S;YO$T;[O$V;`O$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi!n#yi!}#yi~P!'WOz:qO$S;ZO$T;]O$V;aO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$U#yi~P!'WOz:pO$W;`O$z#dOT#yi!S#yi!b#yi!m#yi!q#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi!n#yi!}#yi~P!'WOz:qO$W;aO$z#dOT#yi!S#yi!b#yi!v#yi#S#yi#z#yi#{#yi#|#yi#}#yi$O#yi$Q#yi$R#yi$S#yi$T#yi$U#yi$V#yi~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x#Ta!}#Ta!q#Ta#X#Ta~P!'WOT8vOz8tO!S8wO!b8xO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO!x'Pa!}'Pa!q'Pa#X'Pa~P!'WOz:pO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#Pi!S#Pi!b#Pi!m#Pi!q#Pi!n#Pi!}#Pi~P!'WOz:qO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#Pi!S#Pi!b#Pi~P!'WOz:pO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#vi!S#vi!b#vi!m#vi!q#vi!n#vi!}#vi~P!'WOz:qO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#vi!S#vi!b#vi~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m#xi!q#xi!n#xi!}#xi~P!'WOz:pO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT!uq!S!uq!b!uq!m!uq!q!uq!v!uq!n!uq!}!uq~P!'WOz:qO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT!uq!S!uq!b!uq!v!uq~P!'WOz:pO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT#Pq!S#Pq!b#Pq!m#Pq!q#Pq!n#Pq!}#Pq~P!'WOz:qO!v=nO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT#Pq!S#Pq!b#Pq~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$jq!q$jq!n$jq!}$jq~P!'WOz:pO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dOT!uy!S!uy!b!uy!m!uy!q!uy!v!uy!n!uy!}!uy~P!'WOz:qO#S#QO#z:sO#{:{O#|:}O#};PO$O;RO$Q;VO$R;XO$S;ZO$T;]O$U;_O$V;aO$W;aO$z#dOT!uy!S!uy!b!uy!v!uy~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$jy!q$jy!n$jy!}$jy~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$j!R!q$j!R!n$j!R!}$j!R~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$j!Z!q$j!Z!n$j!Z!}$j!Z~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m$j!c!q$j!c!n$j!c!}$j!c~P!'WO#S=TO~P$8YOP6]OU^O[9WOo>SOs#hOx9WOy9WO}`O!O]O!Q:lO!T9WO!U9WO!V9WO!Y9WO!c8hO!s#gO!y[O#S=UO#W_O#bhO#daO#ebO#peO$T:iO$]9WO$^:iO$aqO$z:nO${!OO~P$;lOT6iOz6gO!S6jO!b6kO!v8sO#O=SO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO~P!'WOT6iOz6gO!S6jO!b6kO!v8sO#O=RO#S#QO#z6hO#{6lO#|6mO#}6nO$O6oO$Q6qO$R6rO$S6sO$T6tO$U6uO$V6vO$W6vO$z#dO!m'PX!q'PX!n'PX!}'PX~P!'WOT&zXz&zX!S&zX!b&zX!o&zX!q&zX!v&zX!y&zX#S&zX#W&zX#`&zX#a&zX#s&zX#z&zX#{&zX#|&zX#}&zX$O&zX$Q&zX$R&zX$S&zX$T&zX$U&zX$V&zX$W&zX$z&zX!}&zX~O#u9ZO#w9[O#X&zX!x&zX~P.8oO!y$hO#S=^O~O!q9hO~P>UO!y$hO#S=cO~O!q>OO#O9}O~OT8vOz8tO!S8wO!b8xO!q:OO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m#Ta!q#Ta!n#Ta!}#Ta~P!'WOT:tOz:pO!S:vO!b:xO!v=mO#S#QO#z:rO#{:zO#|:|O#};OO$O;QO$Q;UO$R;WO$S;YO$T;[O$U;^O$V;`O$W;`O$z#dO!m'Pa!q'Pa!n'Pa!}'Pa~P!'WO!q>PO#O:RO~O!q>QO#O:YO~O#O:YO#l'SO~O#O:ZO#l'SO~O#O:_O#l'SO~O#u;eO#w;gO!m&zX!n&zX~P.8oO#u;fO#w;hOT&zXz&zX!S&zX!b&zX!o&zX!v&zX!y&zX#S&zX#W&zX#`&zX#a&zX#s&zX#z&zX#{&zX#|&zX#}&zX$O&zX$Q&zX$R&zX$S&zX$T&zX$U&zX$V&zX$W&zX$z&zX~O!q;tO~P>UO!q;uO~P>UO!q>XO#O<oO~O!q>YO#O9WO~OT8vOz8tO!S8wO!b8xO!q<pO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WOT8vOz8tO!S8wO!b8xO!q<qO!v=ZO#S#QO#z8uO#{8yO#|8zO#}8{O$O8|O$Q9OO$R9PO$S9QO$T9RO$U9SO$V9TO$W9TO$z#dO~P!'WO!q>ZO#O<vO~O!q>[O#O<{O~O#O<{O#l'SO~O#O9WO#l'SO~O#O<|O#l'SO~O#O=PO#l'SO~O!y$hO#S=|O~Oo=[Os$lO~O!y$hO#S=}O~O!y$hO#S>UO~O!y$hO#S>VO~O!y$hO#S>WO~Oo={Os$lO~Oo>TOs$lO~Oo>SOs$lO~O%O$U$}$d!d$V#b%V#e'g!s#d~",
            goto: "%&y'mPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'nP'uPP'{(OPPP(hP(OP(O*ZP*ZPP2W:j:mPP*Z:sBpPBsPBsPP:sCSCVCZ:s:sPPPC^PP:sK^!$S!$S:s!$WP!$W!$W!%UP!.]!7pP!?oP*ZP*Z*ZPPPPP!?rPPPPPPP*Z*Z*Z*ZPP*Z*ZP!E]!GRP!GV!Gy!GR!GR!HP*Z*ZP!HY!Hl!Ib!J`!Jd!J`!Jo!J}!J}!KV!KY!KY*ZPP*ZPP!K^#%[#%[#%`P#%fP(O#%j(O#&S#&V#&V#&](O#&`(O(O#&f#&i(O#&r#&u(O(O(O(O(O#&x(O(O(O(O(O(O(O(O(O#&{!KR(O(O#'_#'o#'r(O(OP#'u#'|#(S#(o#(y#)P#)Z#)b#)h#*d#4X#5T#5Z#5a#5k#5q#5w#6]#6c#6i#6o#6u#6{#7R#7]#7g#7m#7s#7}PPPPPPPP#8T#8X#8}#NO#NR#N]$(f$(r$)X$)_$)b$)e$)k$,X$5v$>_$>b$>h$>k$>n$>w$>{$?X$?k$Bk$CO$C{$K{PP%%y%%}%&Z%&p%&vQ!nQT!qV!rQUOR%x!mRVO}!hPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1a|!hPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1aQ%^!ZQ%g!aQ%l!eQ'd$dQ'q$iQ)[%kQ*y'tQ,](xU-n*v*x+OQ.W+cQ.{,[S/t-s-tQ0T.SS0}/s/wQ1V0RQ1o1OR2P1p0u!OPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=n0t!OPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nQ#j]Q$}!PQ%O!QQ%P!RQ,S(kQ.b+sR.f+vR&q#jQ)z&pR/a-R0uhPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nR#l^k#p_j#k#s&s&w3x3y7l8f8g8h8iR#u`T&|#t'OR-Y*U0thPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nR#va-r#OZ#f#m#w$V$W$X$Y$Z$[$u$v%W%Y%[%`%s%|&O&Q&U&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&u&v&{'X'Z'[(](p)q)s)u*O*[*^+S+V,`,c,y,{,}-V-W-X-i-x.k.w/`/h/n/y0r0u0x1Q1X1d1m1q2q2r2x2y2z2{2|2}3O3Q3R3S3T3U3V3W3X3Y3Z3[3]3^3_3`3a3b3c3e3f3i3j3l3m3n3q3r3t4Y4y4z4{4|4}5O5P5R5S5T5U5V5W5X5Y5Z5[5]5^5_5`5a5b5c5d5f5g5j5k5m5n5o5r5s5u6R6V6}7O7P7Q7R7S7U7V7W7Y7Z7[7]7^7_7`7a7b7c7d7e7f7g7h7j7k7n7p7q7x7y7{7}8O8P8Q8R8S8V8W8Y8]9U9^9_9`9a9b9c9f9g9i9j9k9l9m9n9o9p9q9r9s9t9u9v9w9x9z9{:P:Q:T:V:W:[:^:`:c;j;k;l;m;n;o;p;s;v;w;x;y;z;{;|;}<O<P<Q<R<S<T<U<V<W<X<Y<Z<[<]<^<_<`<a<b<c<d<e<f<g<h<i<l<m<n<r<s<t<u<w<x<y<z<}=O=Q=V=W=_=`=a=q=rQ']$]Y(Q$s7T9e;q;rS(U2Z6QR(X$tT&X!})v!w$Qg#}$h'S'i'm'r(P(T)Z*f*s*z*}+Q+]+`+g,Z-r-u-{.Q/u1P5}6O6P6]8b8c8d=d=e=i>O>P>Q>X>Y>Z>[3ZfPVX[_bgjklmnoprxyz!S!W!X!Y!]!e!f!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t#}$R$S$U$h$y$}%P%R%S%T%U%c%p%r%}&S&W&p&s&t&w'O'S'U'Y'^'i'm'r'z(O(P(R(S(T(`(l({)P)Z)_)c)i)p)t)v*P*T*U*f*o*s*z*}+P+Q+]+`+d+g+r+u+z,T,V,X,Z,u-Q-R-d-k-r-u-z-{-|.Q.b.d.l.t/[/c/i/m/u/x0V0`0a0d0e0i0v1P1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w5}6O6P6T6]6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8b8c8d8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=d=e=i=m=n>O>P>Q>X>Y>Z>[3scPVX[_bdegjklmnoprxyz!S!W!X!Y!]!e!f!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t#{#}$R$S$U$h$y$}%P%R%S%T%U%c%m%n%p%r%}&S&W&p&s&t&w'O'S'U'Y'^'i'm'r'z(O(P(R(S(T(`(l({)P)Z)^)_)c)g)h)i)p)t)v*P*T*U*f*o*s*z*}+P+Q+]+`+d+g+r+u+z,T,V,X,Z,u,x-Q-R-d-k-r-u-z-{-|.Q.b.d.l.t/[/c/i/m/u/x0V0`0a0d0e0i0v1P1R1]1a2W2X2Y2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w5}6O6P6T6]6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8b8c8d8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=d=e=i=m=n>O>P>Q>X>Y>Z>[0phPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0`0a0d0e0i0v1R1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nT1Z0V1]R&]#P!n#[Z#f#w$V$W$X$Y$[$s$v%W%Y%[&Q&_&`&a&b&c&d&e&f'X'Z'[(])q)s*^+V,{-x/y1Q1d1q7j7k!Y2j2Z2x2y2z2{2}3O3Q3R3S3T3U3V3W3X3a3b3c3e3f3i3j3l3m3n3q3r3t!^4m2r4y4z4{4|5O5P5R5S5T5U5V5W5X5Y5b5c5d5f5g5j5k5m5n5o5r5s5u6Q6R#Q6p#m%`%s&u&v&{(p*O+S,`,c,y-V-X.w2q6}7O7P7Q7S7T7U7Y7Z7[7]7^7_7`7a7n7p7q7x7{7}8Q8S8V8W8Y8]9U:c=V=W#^8}%|&O&U)u,}-W-i/h/n0r0u0x1m4Y6V7V7W7y8O8P8R9^9_9`9a9c9e9f9g9i9j9k9l9m9n9o9p9x9z9{:P:Q:T:V:W:[:^:`<f<g=_=q=r!^;S.k/`;j;k;l;m;p;q;s;v;x;z;|<O<Q<S<U<h<l<n<r<t<w<x<z<}=O=Q=`=ao;T1X;r;w;y;{;}<P<R<T<V<i<m<s<u<yS$iu#hQ$qwU't$j$l&oQ'v$kS'x$m$rQ*|'uQ+O'wQ+R'yQ4X5xS4[5z5{Q4]5|Q6U8^S6W8_8`Q6X8aQ9d=YS9|=[=^Q:S=cQ=]=yS=b={=|Q=f=}Q=o>RS=p>S>VS=s>T>UR=t>WT'n$h*s!csPVXt!S!j!r!s!w$h$}%P%S%U'i(T(`)W*s+]+g+r+u,g,k.b.d.l0`0a0i1aQ$^rR*`'^Q*x'sQ-t*{R/w-wQ(W$tQ)U%hQ)n%vQ*i'fQ+k(XR-c*jQ(V$tQ)Y%jQ)m%vQ*e'eS*h'f)nS+j(W(XS-b*i*jQ.]+kQ/T,mQ/e-`R/g-cQ(U$tQ)T%hQ)V%iQ)l%vU*g'f)m)nU+i(V(W(XQ,f)UU-a*h*i*jS.[+j+kS/f-b-cQ0X.]R0t/gT+e(T+g[%e!_$b'c+a.R0QR,d)Qb$ov(T+[+]+`+g.P.Q0PR+T'{S+e(T+gT,j)W,kR0W.XT1[0V1]0w|PVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X,_-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nT$x{${Q+p([R._+nT$z{${Q(b$}Q(j%PQ(o%SQ(r%UQ.j+yQ0].fQ0^.iR1g0iR(e%OX+|(c(d+},PR(f%OX(h%P%S%U0iR%S!T_%a!]%R(l,T,V.t0dR%U!UR.x,XR,[(wQ)X%jS*d'e)YS-_*e,mS/d-`/TR0s/eQ%q!fU)]%m%n%rU,o)^)g)hR/_,xR)d%pR/],uSSO!mR!oSQ!rVR%y!rQ!jPS!sV!rQ!wX[%u!j!s!w+r0a1aQ+r(`Q0a.lR1a0`Q)j%sS,z)j7vR7v7WQ-S)zR/b-SQ&x#qS*R&x7mR7m9YS*V&{&|R-Z*VQ)w&YR-P)w!l'T#|'h*n*q*v+W+[,m-`-s-v-y.P.z/s/v/z0P1O1p4^4_4`5y6Y6Z6[:U:X:]=g=h=j=u=v=w=xR*Z'T1^dPVX[_bjklmnoprxyz!S!W!X!Y!]!e!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%p%}&S&W&p&s&t&w'O'U'Y'^'z(O(R(S(`(l({)P)_)c)i)p)t)v*P*T*U*o+P+d+r+u+z,T,V,X,u-Q-R-d-k-z-|.b.d.l.t/[/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=n`#zd#{%m)^)g,x2W2YQ#{eQ%m!fQ)^%nQ)g%rQ,x)h!v2Wg#}$h'S'i'm'r(P(T)Z*f*s*z*}+Q+]+`+g,Z-r-u-{.Q/u1P5}6O6P6]8b8c8d=d=e=i>O>P>Q>X>Y>Z>[R2Y2X|tPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1aW$`t'i+],gS'i$h*sS+](T+gT,g)W,kQ'_$^R*a'_Q*t'oR-m*tQ/p-oS0{/p0|R0|/qQ-}+XR/|-}Q+g(TR.Y+gS+`(T+gS,h)W,kQ.Q+]W.T+`,h.Q/OR/O,gQ)R%eR,e)RQ'|$oR+U'|Q1]0VR1w1]Q${{R(^${Q+t(aR.c+tQ+w(bR.g+wQ+}(cQ,P(dT.m+},PQ(|%`S,a(|7tR7t7VQ(y%^R,^(yQ,k)WR/R,kQ)`%oS,q)`/WR/W,rQ,v)dR/^,vT!uV!rj!iPVX!j!r!s!w(`+r.l0`0a1aQ%Q!SQ(a$}W(h%P%S%U0iQ.e+uQ0Z.bR0[.d|ZPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1aQ#f[U#m_#s&wQ#wbQ$VkQ$WlQ$XmQ$YnQ$ZoQ$[pQ$sx^$uy2_4b6e8q:m:nQ$vzQ%W!WQ%Y!XQ%[!YW%`!]%R(l,VU%s!g&p-RQ%|!yQ&O!zQ&Q!{S&U!})v^&^#R2a4d6g8t:p:qQ&_#SQ&`#TQ&a#UQ&b#VQ&c#WQ&d#XQ&e#YQ&f#ZQ&g#[Q&h#]Q&i#^Q&j#_Q&k#`Q&l#aQ&m#bQ&u#nQ&v#oS&{#t'OQ'X$RQ'Z$SQ'[$UQ(]$yQ(p%TQ)q%}Q)s&SQ)u&WQ*O&tS*['U4ZQ*^'Y^*_2[3u5v8Z:a=R=SQ+S'zQ+V(OQ,`({Q,c)PQ,y)iQ,{)pQ,})tQ-V*PQ-W*TQ-X*U^-]2]3v5w8[:b=T=UQ-i*oQ-x+PQ.k+zQ.w,XQ/`-QQ/h-dQ/n-kQ/y-zQ0r/cQ0u/iQ0x/mQ1Q/xU1X0V1]9WQ1d0eQ1m0vQ1q1RQ2Z2^Q2qjQ2r3yQ2x3zQ2y3|Q2z4OQ2{4QQ2|4SQ2}4UQ3O2`Q3Q2bQ3R2cQ3S2dQ3T2eQ3U2fQ3V2gQ3W2hQ3X2iQ3Y2jQ3Z2kQ3[2lQ3]2mQ3^2nQ3_2oQ3`2pQ3a2sQ3b2tQ3c2uQ3e2vQ3f2wQ3i3PQ3j3dQ3l3gQ3m3hQ3n3kQ3q3oQ3r3pQ3t3sQ4Y4WQ4y3{Q4z3}Q4{4PQ4|4RQ4}4TQ5O4VQ5P4cQ5R4eQ5S4fQ5T4gQ5U4hQ5V4iQ5W4jQ5X4kQ5Y4lQ5Z4mQ5[4nQ5]4oQ5^4pQ5_4qQ5`4rQ5a4sQ5b4tQ5c4uQ5d4vQ5f4wQ5g4xQ5j5QQ5k5eQ5m5hQ5n5iQ5o5lQ5r5pQ5s5qQ5u5tQ6Q4aQ6R3xQ6V6TQ6}6^Q7O6_Q7P6`Q7Q6aQ7R6bQ7S6cQ7T6dQ7U6fU7V,T.t0dQ7W%cQ7Y6hQ7Z6iQ7[6jQ7]6kQ7^6lQ7_6mQ7`6nQ7a6oQ7b6pQ7c6qQ7d6rQ7e6sQ7f6tQ7g6uQ7h6vQ7j6xQ7k6yQ7n6zQ7p6{Q7q6|Q7x7XQ7y7iQ7{7oQ7}7rQ8O7sQ8P7uQ8Q7wQ8R7zQ8S7|Q8V8TQ8W8UQ8Y8XQ8]8fU9U#k&s7lQ9^8jQ9_8kQ9`8lQ9a8mQ9b8nQ9c8oQ9e8pQ9f8rQ9g8sQ9i8uQ9j8vQ9k8wQ9l8xQ9m8yQ9n8zQ9o8{Q9p8|Q9q8}Q9r9OQ9s9PQ9t9QQ9u9RQ9v9SQ9w9TQ9x9ZQ9z9[Q9{9]Q:P9hQ:Q9yQ:T9}Q:V:OQ:W:RQ:[:YQ:^:ZQ:`:_Q:c8iQ;j:dQ;k:eQ;l:fQ;m:gQ;n:hQ;o:iQ;p:jQ;q:kQ;r:lQ;s:oQ;v:rQ;w:sQ;x:tQ;y:uQ;z:vQ;{:wQ;|:xQ;}:yQ<O:zQ<P:{Q<Q:|Q<R:}Q<S;OQ<T;PQ<U;QQ<V;RQ<W;SQ<X;TQ<Y;UQ<Z;VQ<[;WQ<];XQ<^;YQ<_;ZQ<`;[Q<a;]Q<b;^Q<c;_Q<d;`Q<e;aQ<f;cQ<g;dQ<h;eQ<i;fQ<l;gQ<m;hQ<n;iQ<r;tQ<s;uQ<t<jQ<u<kQ<w<oQ<x<pQ<y<qQ<z<vQ<}<{Q=O<|Q=Q=PQ=V8hQ=W8gQ=_=ZQ=`9VQ=a9XQ=q=mR=r=nR){&pQ%t!gQ)O%cT)y&p-R$SiPVX[bklmnopxyz!S!W!X!Y!j!r!s!w!{#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b$R$S$U$y$}%P%S%U%}&S'Y(O(`)p+P+r+u-z.b.d.l/x0`0a0e0i1R1a2[2]6x6y!t3w'U2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3z3|4O4Q4S4U5v5w!x6S3u3v3x3y3{3}4P4R4T4V4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t$O8e_j!]!g#k#n#o#s#t%R%T&p&s&t&w'O'z(l({)P)i*P*U,V,X-R6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6z6{6|7X7l7o7r7w7|8T8U8X8Z8[8f8g8h8i#|=X!y!z!}%c&W)t)v*T*o,T-d-k.t/c/i/m0d0v4W6T7i7s7u7z8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9Z9[9]9h9y9}:O:R:Y:Z:_:a:b;c;d=Z=m=n!v=k+z-Q9V9X:d:e:f:g:h:j:k:m:o:p:r:t:v:x:z:|;O;Q;S;U;W;Y;[;^;`;e;g;i;t<j<o<p<v<{<|=P=R=T!]=l0V1]9W:i:l:n:q:s:u:w:y:{:};P;R;T;V;X;Z;];_;a;f;h;u<k<q=S=UQ#r_Q&r#kQ&z#sR)}&sS#q_#s^$Tj3x3y8f8g8h8iS*Q&w7lT9Y#k&sQ&}#tR*X'OR&T!|R&Z!}Q&Y!}R-O)vQ#|gQ'V#}S'h$h*sQ*Y'SQ*n'iQ*q'mQ*v'rQ+W(PS+[(T+gQ,m)ZQ-`*fQ-s*zQ-v*}Q-y+QS.P+]+`Q.z,ZQ/s-rQ/v-uQ/z-{Q0P.QQ1O/uQ1p1PQ4^5}Q4_6OQ4`6PQ5y6]Q6Y8bQ6Z8cQ6[8dQ:U=dQ:X=eQ:]=iQ=g>OQ=h>PQ=j>QQ=u>XQ=v>YQ=w>ZR=x>[0t!OPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=n!v$Pg#}$h'S'i'm'r(P(T)Z*f*s*z*}+Q+]+`+g,Z-r-u-{.Q/u1P5}6O6P6]8b8c8d=d=e=i>O>P>Q>X>Y>Z>[S$]r'^Q%k!eS%o!f%rQ)b%pU+X(R(S+dQ,p)_Q,t)cQ/Z,uQ/{-|R0p/[|vPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1a#U#i[bklmnopxyz!W!X!Y!{#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b$R$S$U$y%}&S'Y(O)p+P-z/x0e1R2[2]6x6yd+^(T)W+]+`+g,g,h,k.Q/O!t6w'U2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3z3|4O4Q4S4U5v5w!x;b3u3v3x3y3{3}4P4R4T4V4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t$O=z_j!]!g#k#n#o#s#t%R%T&p&s&t&w'O'z(l({)P)i*P*U,V,X-R6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6z6{6|7X7l7o7r7w7|8T8U8X8Z8[8f8g8h8i#|>]!y!z!}%c&W)t)v*T*o,T-d-k.t/c/i/m0d0v4W6T7i7s7u7z8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9Z9[9]9h9y9}:O:R:Y:Z:_:a:b;c;d=Z=m=n!v>^+z-Q9V9X:d:e:f:g:h:j:k:m:o:p:r:t:v:x:z:|;O;Q;S;U;W;Y;[;^;`;e;g;i;t<j<o<p<v<{<|=P=R=T!]>_0V1]9W:i:l:n:q:s:u:w:y:{:};P;R;T;V;X;Z;];_;a;f;h;u<k<q=S=UR'p$hQ'o$hR-l*sR$_rR-q*wQ+Y(RQ+Z(SR.X+dT+f(T+ge+_(T)W+]+`+g,g,h,k.Q/OQ%f!_Q'b$bQ*c'cQ.U+aQ0S.RR1U0QQ#eZQ%X!WQ%Z!XQ%]!YQ'}$pQ(s%VQ(t%WQ(u%YQ(v%[Q(}%bQ)S%fQ)[%kQ)f%qQ)k%tQ*b'bQ,n)]Q-^*cQ.V+bQ.W+cQ.e+xQ.o,QQ.p,RQ.q,SQ.v,WQ.y,YQ.},bQ/U,oQ/}.OQ0T.SQ0U.UQ0W.XQ0[.hQ0k/QQ0q/_Q1S0OQ1V0RQ1W0SQ1`0_Q1h0jQ1r1TQ1s1UQ1v1[Q1y1_Q1}1jQ2T1{R2U1|Q$pvS+b(T+gU.O+[+]+`S0O.P.QR1T0P|!aPVX!S!j!r!s!w$}%P%S%U(`+r+u.b.d.l0`0a0i1aQ$dtW+c(T)W+g,kW.S+]+`,g,hT0R.Q/O0t!OPVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nR.|,_0w}PVX[_bjklmnopxyz!S!W!X!Y!]!g!j!r!s!w!y!z!{!}#R#S#T#U#V#W#X#Y#Z#[#]#^#_#`#a#b#k#n#o#s#t$R$S$U$y$}%P%R%S%T%U%c%}&S&W&p&s&t&w'O'U'Y'z(O(`(l({)P)i)p)t)v*P*T*U*o+P+r+u+z,T,V,X,_-Q-R-d-k-z.b.d.l.t/c/i/m/x0V0`0a0d0e0i0v1R1]1a2[2]2^2_2`2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2s2t2u2v2w3P3d3g3h3k3o3p3s3u3v3x3y3z3{3|3}4O4P4Q4R4S4T4U4V4W4Z4a4b4c4d4e4f4g4h4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x5Q5e5h5i5l5p5q5t5v5w6T6^6_6`6a6b6c6d6e6f6g6h6i6j6k6l6m6n6o6p6q6r6s6t6u6v6x6y6z6{6|7X7i7l7o7r7s7u7w7z7|8T8U8X8Z8[8f8g8h8i8j8k8l8m8n8o8p8q8r8s8t8u8v8w8x8y8z8{8|8}9O9P9Q9R9S9T9V9W9X9Z9[9]9h9y9}:O:R:Y:Z:_:a:b:d:e:f:g:h:i:j:k:l:m:n:o:p:q:r:s:t:u:v:w:x:y:z:{:|:};O;P;Q;R;S;T;U;V;W;X;Y;Z;[;];^;_;`;a;c;d;e;f;g;h;i;t;u<j<k<o<p<q<v<{<|=P=R=S=T=U=Z=m=nT$w{${Q(i%PQ(n%SQ(q%UR1f0iQ%b!]Q(m%RQ,U(lQ.s,TQ.u,VQ0c.tR1c0dQ%q!fR)]%rR)e%p",
            nodeNames: "\u26A0 ( HeredocString EscapeSequence abstract LogicOp array as Boolean break case catch clone const continue default declare do echo else elseif enddeclare endfor endforeach endif endswitch endwhile enum extends final finally fn for foreach from function global goto if implements include include_once LogicOp insteadof interface list match namespace new null LogicOp print require require_once return switch throw trait try unset use var Visibility while LogicOp yield LineComment BlockComment TextInterpolation PhpClose Text PhpOpen Template TextInterpolation EmptyStatement ; } { Block : LabelStatement Name ExpressionStatement ConditionalExpression LogicOp MatchExpression ) ( ParenthesizedExpression MatchBlock MatchArm , => AssignmentExpression ArrayExpression ValueList & VariadicUnpacking ... Pair [ ] ListExpression ValueList Pair Pair SubscriptExpression MemberExpression -> ?-> VariableName DynamicVariable $ ${ CallExpression ArgList NamedArgument SpreadArgument CastExpression UnionType LogicOp OptionalType NamedType QualifiedName \\ NamespaceName ScopedExpression :: ClassMemberName AssignOp UpdateExpression UpdateOp YieldExpression BinaryExpression LogicOp LogicOp LogicOp BitOp BitOp BitOp CompareOp CompareOp BitOp ArithOp ConcatOp ArithOp ArithOp IncludeExpression RequireExpression CloneExpression UnaryExpression ControlOp LogicOp PrintIntrinsic FunctionExpression static ParamList Parameter #[ Attributes Attribute VariadicParameter PropertyParameter UseList ArrowFunction NewExpression class BaseClause ClassInterfaceClause DeclarationList ConstDeclaration VariableDeclarator PropertyDeclaration VariableDeclarator MethodDeclaration UseDeclaration UseList UseInsteadOfClause UseAsClause UpdateExpression ArithOp ShellExpression ThrowExpression Integer Float String MemberExpression SubscriptExpression UnaryExpression ArithOp Interpolation String IfStatement ColonBlock SwitchStatement Block CaseStatement DefaultStatement ColonBlock WhileStatement EmptyStatement DoStatement ForStatement ForSpec SequenceExpression ForeachStatement ForSpec Pair GotoStatement ContinueStatement BreakStatement ReturnStatement TryStatement CatchDeclarator DeclareStatement EchoStatement UnsetStatement ConstDeclaration FunctionDefinition ClassDeclaration InterfaceDeclaration TraitDeclaration EnumDeclaration EnumBody EnumCase NamespaceDefinition NamespaceUseDeclaration UseGroup UseClause UseClause GlobalDeclaration FunctionStaticDeclaration Program",
            maxTerm: 304,
            nodeProps: [
                ["group", -36, 2, 8, 49, 81, 83, 85, 88, 93, 94, 102, 106, 107, 110, 111, 114, 118, 123, 126, 130, 132, 133, 147, 148, 149, 150, 153, 154, 164, 165, 179, 181, 182, 183, 184, 185, 191, "Expression", -28, 74, 78, 80, 82, 192, 194, 199, 201, 202, 205, 208, 209, 210, 211, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 225, 226, 230, 231, "Statement", -3, 119, 121, 122, "Type"],
                ["openedBy", 69, "phpOpen", 76, "{", 86, "(", 101, "#["],
                ["closedBy", 71, "phpClose", 77, "}", 87, ")", 158, "]"]
            ],
            propSources: [ap],
            skippedNodes: [0],
            repeatNodeCount: 29,
            tokenData: "!5h_R!ZOX$tXY%nYZ&}Z]$t]^%n^p$tpq%nqr(]rs)wst*atu/nuv2_vw3`wx4gxy8Oyz8fz{8|{|:W|};_}!O;u!O!P=R!P!QBl!Q!RFr!R![Hn![!]Nz!]!^!!O!^!_!!f!_!`!%R!`!a!&V!a!b!'Z!b!c!*T!c!d!*k!d!e!+q!e!}!*k!}#O!-k#O#P!.R#P#Q!.i#Q#R!/P#R#S!*k#S#T!/j#T#U!*k#U#V!+q#V#o!*k#o#p!2y#p#q!3a#q#r!4j#r#s!5Q#s$f$t$f$g%n$g&j!*k&j$I_$t$I_$I`%n$I`$KW$t$KW$KX%n$KX?HT$t?HT?HU%n?HU~$tP$yT&wPOY$tYZ%YZ!^$t!^!_%_!_~$tP%_O&wPP%bSOY$tYZ%YZ!a$t!b~$tV%ub&wP&vUOX$tXY%nYZ&}Z]$t]^%n^p$tpq%nq!^$t!^!_%_!_$f$t$f$g%n$g$I_$t$I_$I`%n$I`$KW$t$KW$KX%n$KX?HT$t?HT?HU%n?HU~$tV'UW&wP&vUXY'nYZ'n]^'npq'n$f$g'n$I_$I`'n$KW$KX'n?HT?HU'nU'sW&vUXY'nYZ'n]^'npq'n$f$g'n$I_$I`'n$KW$KX'n?HT?HU'nR(dU$^Q&wPOY$tYZ%YZ!^$t!^!_%_!_!`(v!`~$tR(}U$QQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`)a!`~$tR)hT$QQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV*QT'fS&wP'gQOY$tYZ%YZ!^$t!^!_%_!_~$tV*hZ&wP!dUOY+ZYZ%YZ]+Z]^$t^!^+Z!^!_+}!_!a+Z!a!b-i!b!}+Z!}#O.x#O~+ZV+bX&wP!dUOY+ZYZ%YZ]+Z]^$t^!^+Z!^!_+}!_!a+Z!a!b-i!b~+ZV,SV!dUOY+ZYZ%YZ]+Z]^$t^!a+Z!a!b,i!b~+ZU,lUOY-OYZ-dZ]-O]^-d^!`-O!a~-OU-TT!dUOY-OZ]-O^!a-O!a!b,i!b~-OU-iO!dUV-nX&wPOY+ZYZ.ZZ]+Z]^.b^!^+Z!^!_+}!_!`+Z!`!a$t!a~+ZV.bO&wP!dUV.iT&wP!dUOY$tYZ%YZ!^$t!^!_%_!_~$tV/RX&wP$dQ!dUOY+ZYZ%YZ]+Z]^$t^!^+Z!^!_+}!_!a+Z!a!b-i!b~+Z_/u^&wP#dQOY$tYZ%YZ!^$t!^!_%_!_!c$t!c!}0q!}#R$t#R#S0q#S#T$t#T#o0q#o#p1w#p$g$t$g&j0q&j~$t_0x_&wP#b^OY$tYZ%YZ!Q$t!Q![0q![!^$t!^!_%_!_!c$t!c!}0q!}#R$t#R#S0q#S#T$t#T#o0q#o$g$t$g&j0q&j~$tV2OT&wP#eUOY$tYZ%YZ!^$t!^!_%_!_~$tR2fU&wP$VQOY$tYZ%YZ!^$t!^!_%_!_!`2x!`~$tR3PT#wQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV3gW#SU&wPOY$tYZ%YZv$tvw4Pw!^$t!^!_%_!_!`2x!`~$tR4WT#|Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR4nX&wP%VQOY4gYZ5ZZw4gwx6bx!^4g!^!_6x!_#O4g#O#P7j#P~4gR5bT&wP%VQOw5qwx6Vx#O5q#O#P6[#P~5qQ5vT%VQOw5qwx6Vx#O5q#O#P6[#P~5qQ6[O%VQQ6_PO~5qR6iT&wP%VQOY$tYZ%YZ!^$t!^!_%_!_~$tR6}X%VQOY4gYZ5ZZw4gwx6bx!a4g!a!b5q!b#O4g#O#P7j#P~4gR7oT&wPOY4gYZ5ZZ!^4g!^!_6x!_~4gR8VT!yQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV8mT!xU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR9TW&wP$VQOY$tYZ%YZz$tz{9m{!^$t!^!_%_!_!`2x!`~$tR9tU$WQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`2x!`~$tR:_W$TQ&wPOY$tYZ%YZ{$t{|:w|!^$t!^!_%_!_!`2x!`~$tR;OT$zQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR;fT!}Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$t_<OX$TQ%TW&wPOY$tYZ%YZ}$t}!O:w!O!^$t!^!_%_!_!`2x!`!a<k!a~$tV<rT#`U&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV=YY&wP$UQOY$tYZ%YZ!O$t!O!P=x!P!Q$t!Q![>z![!^$t!^!_%_!_!`2x!`~$tV=}V&wPOY$tYZ%YZ!O$t!O!P>d!P!^$t!^!_%_!_~$tV>kT#UU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR?R]&wP%OQOY$tYZ%YZ!Q$t!Q![>z![!^$t!^!_%_!_!g$t!g!h?z!h#R$t#R#SBQ#S#X$t#X#Y?z#Y~$tR@PZ&wPOY$tYZ%YZ{$t{|@r|}$t}!O@r!O!Q$t!Q![A^![!^$t!^!_%_!_~$tR@wV&wPOY$tYZ%YZ!Q$t!Q![A^![!^$t!^!_%_!_~$tRAeX&wP%OQOY$tYZ%YZ!Q$t!Q![A^![!^$t!^!_%_!_#R$t#R#S@r#S~$tRBVV&wPOY$tYZ%YZ!Q$t!Q![>z![!^$t!^!_%_!_~$tVBsY&wP$VQOY$tYZ%YZz$tz{Cc{!P$t!P!Q+Z!Q!^$t!^!_%_!_!`2x!`~$tVChV&wPOYCcYZC}ZzCcz{EQ{!^Cc!^!_FY!_~CcVDSR&wPOzD]z{Di{~D]UD`ROzD]z{Di{~D]UDlTOzD]z{Di{!PD]!P!QD{!Q~D]UEQO!eUVEVX&wPOYCcYZC}ZzCcz{EQ{!PCc!P!QEr!Q!^Cc!^!_FY!_~CcVEyT!eU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tVF]VOYCcYZC}ZzCcz{EQ{!aCc!a!bD]!b~CcZFyk&wP$}YOY$tYZ%YZ!O$t!O!P>z!P!Q$t!Q![Hn![!^$t!^!_%_!_!d$t!d!eJ`!e!g$t!g!h?z!h!q$t!q!rKt!r!z$t!z!{MS!{#R$t#R#SIt#S#U$t#U#VJ`#V#X$t#X#Y?z#Y#c$t#c#dKt#d#l$t#l#mMS#m~$tZHu_&wP$}YOY$tYZ%YZ!O$t!O!P>z!P!Q$t!Q![Hn![!^$t!^!_%_!_!g$t!g!h?z!h#R$t#R#SIt#S#X$t#X#Y?z#Y~$tZIyV&wPOY$tYZ%YZ!Q$t!Q![Hn![!^$t!^!_%_!_~$tZJeW&wPOY$tYZ%YZ!Q$t!Q!RJ}!R!SJ}!S!^$t!^!_%_!_~$tZKUY&wP$}YOY$tYZ%YZ!Q$t!Q!RJ}!R!SJ}!S!^$t!^!_%_!_#R$t#R#SJ`#S~$tZKyV&wPOY$tYZ%YZ!Q$t!Q!YL`!Y!^$t!^!_%_!_~$tZLgX&wP$}YOY$tYZ%YZ!Q$t!Q!YL`!Y!^$t!^!_%_!_#R$t#R#SKt#S~$tZMXZ&wPOY$tYZ%YZ!Q$t!Q![Mz![!^$t!^!_%_!_!c$t!c!iMz!i#T$t#T#ZMz#Z~$tZNR]&wP$}YOY$tYZ%YZ!Q$t!Q![Mz![!^$t!^!_%_!_!c$t!c!iMz!i#R$t#R#SMS#S#T$t#T#ZMz#Z~$tR! RV!qQ&wPOY$tYZ%YZ![$t![!]! h!]!^$t!^!_%_!_~$tR! oT#sQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!!VT!mU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!!kW$RQOY$tYZ%YZ!^$t!^!_!#T!_!`!#n!`!a)a!a!b!$[!b~$tR!#[U$SQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`2x!`~$tR!#uV$RQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`$t!`!a)a!a~$tP!$aR!iP!_!`!$j!r!s!$o#d#e!$oP!$oO!iPP!$rQ!j!k!$x#[#]!$xP!${Q!r!s!$j#d#e!$jV!%YV#uQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`(v!`!a!%o!a~$tV!%vT#OU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!&^V$RQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`!&s!`!a!#T!a~$tR!&zT$RQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!'bY!vQ&wPOY$tYZ%YZ}$t}!O!(Q!O!^$t!^!_%_!_!`$t!`!a!)S!a!b!)j!b~$tV!(VV&wPOY$tYZ%YZ!^$t!^!_%_!_!`$t!`!a!(l!a~$tV!(sT#aU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!)ZT!gU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!)qU#zQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`2x!`~$tR!*[T$]Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$t_!*r_&wP!s^OY$tYZ%YZ!Q$t!Q![!*k![!^$t!^!_%_!_!c$t!c!}!*k!}#R$t#R#S!*k#S#T$t#T#o!*k#o$g$t$g&j!*k&j~$t_!+xc&wP!s^OY$tYZ%YZr$trs!-Tsw$twx4gx!Q$t!Q![!*k![!^$t!^!_%_!_!c$t!c!}!*k!}#R$t#R#S!*k#S#T$t#T#o!*k#o$g$t$g&j!*k&j~$tR!-[T&wP'gQOY$tYZ%YZ!^$t!^!_%_!_~$tV!-rT#WU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!.YT#pU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!.pT#XQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!/WU$OQ&wPOY$tYZ%YZ!^$t!^!_%_!_!`2x!`~$tR!/oX&wPOY!/jYZ!0[Z!^!/j!^!_!1_!_#O!/j#O#P!1}#P#S!/j#S#T!2c#T~!/jR!0aT&wPO#O!0p#O#P!1S#P#S!0p#S#T!1Y#T~!0pQ!0sTO#O!0p#O#P!1S#P#S!0p#S#T!1Y#T~!0pQ!1VPO~!0pQ!1_O${QR!1bXOY!/jYZ!0[Z!a!/j!a!b!0p!b#O!/j#O#P!1}#P#S!/j#S#T!2c#T~!/jR!2ST&wPOY!/jYZ!0[Z!^!/j!^!_!1_!_~!/jR!2jT${Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!3QT!oU&wPOY$tYZ%YZ!^$t!^!_%_!_~$tV!3jW#}Q#lS&wPOY$tYZ%YZ!^$t!^!_%_!_!`2x!`#p$t#p#q!4S#q~$tR!4ZT#{Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!4qT!nQ&wPOY$tYZ%YZ!^$t!^!_%_!_~$tR!5XT$^Q&wPOY$tYZ%YZ!^$t!^!_%_!_~$t",
            tokenizers: [rp, lp, Op, 0, 1, 2, 3, sp],
            topRules: {
                Template: [0, 72],
                Program: [1, 232]
            },
            dynamicPrecedences: {
                "284": 1
            },
            specialized: [{
                term: 81,
                get: (n, e) => ip(n) << 1
            }, {
                term: 81,
                get: n => hp[n] || -1
            }],
            tokenPrec: 29354
        });
    var cp = 54,
        up = 1,
        fp = 55,
        dp = 2,
        pp = 56,
        mp = 3,
        Un = 4,
        Za = 5,
        _a = 6,
        Va = 7,
        Ua = 8,
        $p = 9,
        gp = 10,
        Qp = 11,
        Rs = 57,
        yp = 12,
        Ca = 58,
        Sp = 18,
        bp = 27,
        Pp = 30,
        xp = 33,
        Tp = 35,
        kp = 0,
        vp = {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            command: !0,
            embed: !0,
            frame: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
            menuitem: !0
        },
        wp = {
            dd: !0,
            li: !0,
            optgroup: !0,
            option: !0,
            p: !0,
            rp: !0,
            rt: !0,
            tbody: !0,
            td: !0,
            tfoot: !0,
            th: !0,
            tr: !0
        },
        Aa = {
            dd: {
                dd: !0,
                dt: !0
            },
            dt: {
                dd: !0,
                dt: !0
            },
            li: {
                li: !0
            },
            option: {
                option: !0,
                optgroup: !0
            },
            optgroup: {
                optgroup: !0
            },
            p: {
                address: !0,
                article: !0,
                aside: !0,
                blockquote: !0,
                dir: !0,
                div: !0,
                dl: !0,
                fieldset: !0,
                footer: !0,
                form: !0,
                h1: !0,
                h2: !0,
                h3: !0,
                h4: !0,
                h5: !0,
                h6: !0,
                header: !0,
                hgroup: !0,
                hr: !0,
                menu: !0,
                nav: !0,
                ol: !0,
                p: !0,
                pre: !0,
                section: !0,
                table: !0,
                ul: !0
            },
            rp: {
                rp: !0,
                rt: !0
            },
            rt: {
                rp: !0,
                rt: !0
            },
            tbody: {
                tbody: !0,
                tfoot: !0
            },
            td: {
                td: !0,
                th: !0
            },
            tfoot: {
                tbody: !0
            },
            th: {
                td: !0,
                th: !0
            },
            thead: {
                tbody: !0,
                tfoot: !0
            },
            tr: {
                tr: !0
            }
        };

    function Xp(n) {
        return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161
    }

    function Ya(n) {
        return n == 9 || n == 10 || n == 13 || n == 32
    }
    var ja = null,
        Ga = null,
        Ea = 0;

    function zs(n, e) {
        let t = n.pos + e;
        if (Ea == t && Ga == n) return ja;
        let i = n.peek(e);
        for (; Ya(i);) i = n.peek(++e);
        let r = "";
        for (; Xp(i);) r += String.fromCharCode(i), i = n.peek(++e);
        return Ga = n, Ea = t, ja = r ? r.toLowerCase() : i == Rp || i == zp ? void 0 : null
    }
    var Da = 60,
        Ma = 62,
        Ia = 47,
        Rp = 63,
        zp = 33,
        Wp = 45;

    function Ba(n, e) {
        this.name = n, this.parent = e, this.hash = e ? e.hash : 0;
        for (let t = 0; t < n.length; t++) this.hash += (this.hash << 4) + n.charCodeAt(t) + (n.charCodeAt(t) << 8)
    }
    var qp = [Un, Ua, Za, _a, Va],
        Zp = new Vt({
            start: null,
            shift(n, e, t, i) {
                return qp.indexOf(e) > -1 ? new Ba(zs(i, 1) || "", n) : n
            },
            reduce(n, e) {
                return e == Sp && n ? n.parent : n
            },
            reuse(n, e, t, i) {
                let r = e.type.id;
                return r == Un || r == Tp ? new Ba(zs(i, 1) || "", n) : n
            },
            hash(n) {
                return n ? n.hash : 0
            },
            strict: !1
        }),
        _p = new E((n, e) => {
            if (n.next != Da) {
                n.next < 0 && e.context && n.acceptToken(Rs);
                return
            }
            n.advance();
            let t = n.next == Ia;
            t && n.advance();
            let i = zs(n, 0);
            if (i === void 0) return;
            if (!i) return n.acceptToken(t ? yp : Un);
            let r = e.context ? e.context.name : null;
            if (t) {
                if (i == r) return n.acceptToken($p);
                if (r && wp[r]) return n.acceptToken(Rs, -2);
                if (e.dialectEnabled(kp)) return n.acceptToken(gp);
                for (let s = e.context; s; s = s.parent)
                    if (s.name == i) return;
                n.acceptToken(Qp)
            } else {
                if (i == "script") return n.acceptToken(Za);
                if (i == "style") return n.acceptToken(_a);
                if (i == "textarea") return n.acceptToken(Va);
                if (vp.hasOwnProperty(i)) return n.acceptToken(Ua);
                r && Aa[r] && Aa[r][i] ? n.acceptToken(Rs, -1) : n.acceptToken(Un)
            }
        }, {
            contextual: !0
        }),
        Vp = new E(n => {
            for (let e = 0, t = 0;; t++) {
                if (n.next < 0) {
                    t && n.acceptToken(Ca);
                    break
                }
                if (n.next == Wp) e++;
                else if (n.next == Ma && e >= 2) {
                    t > 3 && n.acceptToken(Ca, -2);
                    break
                } else e = 0;
                n.advance()
            }
        });

    function Ws(n, e, t) {
        let i = 2 + n.length;
        return new E(r => {
            for (let s = 0, O = 0, o = 0;; o++) {
                if (r.next < 0) {
                    o && r.acceptToken(e);
                    break
                }
                if (s == 0 && r.next == Da || s == 1 && r.next == Ia || s >= 2 && s < i && r.next == n.charCodeAt(s - 2)) s++, O++;
                else if ((s == 2 || s == i) && Ya(r.next)) O++;
                else if (s == i && r.next == Ma) {
                    o > O ? r.acceptToken(e, -O) : r.acceptToken(t, -(O - 2));
                    break
                } else if ((r.next == 10 || r.next == 13) && o) {
                    r.acceptToken(e, 1);
                    break
                } else s = O = 0;
                r.advance()
            }
        })
    }
    var Up = Ws("script", cp, up),
        Cp = Ws("style", fp, dp),
        Ap = Ws("textarea", pp, mp),
        Yp = he({
            "Text RawText": u.content,
            "StartTag StartCloseTag SelfClosingEndTag EndTag": u.angleBracket,
            TagName: u.tagName,
            "MismatchedCloseTag/TagName": [u.tagName, u.invalid],
            AttributeName: u.attributeName,
            "AttributeValue UnquotedAttributeValue": u.attributeValue,
            Is: u.definitionOperator,
            "EntityReference CharacterReference": u.character,
            Comment: u.blockComment,
            ProcessingInst: u.processingInstruction,
            DoctypeDecl: u.documentMeta
        }),
        Na = ie.deserialize({
            version: 14,
            states: ",xOVOxOOO!WQ!bO'#CoO!]Q!bO'#CyO!bQ!bO'#C|O!gQ!bO'#DPO!lQ!bO'#DRO!qOXO'#CnO!|OYO'#CnO#XO[O'#CnO$eOxO'#CnOOOW'#Cn'#CnO$lO!rO'#DTO$tQ!bO'#DVO$yQ!bO'#DWOOOW'#Dk'#DkOOOW'#DY'#DYQVOxOOO%OQ#tO,59ZO%WQ#tO,59eO%`Q#tO,59hO%hQ#tO,59kO%sQ#tO,59mOOOX'#D^'#D^O%{OXO'#CwO&WOXO,59YOOOY'#D_'#D_O&`OYO'#CzO&kOYO,59YOOO['#D`'#D`O&sO[O'#C}O'OO[O,59YOOOW'#Da'#DaO'WOxO,59YO'_Q!bO'#DQOOOW,59Y,59YOOO`'#Db'#DbO'dO!rO,59oOOOW,59o,59oO'lQ!bO,59qO'qQ!bO,59rOOOW-E7W-E7WO'vQ#tO'#CqOOQO'#DZ'#DZO(UQ#tO1G.uOOOX1G.u1G.uO(^Q#tO1G/POOOY1G/P1G/PO(fQ#tO1G/SOOO[1G/S1G/SO(nQ#tO1G/VOOOW1G/V1G/VOOOW1G/X1G/XO(yQ#tO1G/XOOOX-E7[-E7[O)RQ!bO'#CxOOOW1G.t1G.tOOOY-E7]-E7]O)WQ!bO'#C{OOO[-E7^-E7^O)]Q!bO'#DOOOOW-E7_-E7_O)bQ!bO,59lOOO`-E7`-E7`OOOW1G/Z1G/ZOOOW1G/]1G/]OOOW1G/^1G/^O)gQ&jO,59]OOQO-E7X-E7XOOOX7+$a7+$aOOOY7+$k7+$kOOO[7+$n7+$nOOOW7+$q7+$qOOOW7+$s7+$sO)rQ!bO,59dO)wQ!bO,59gO)|Q!bO,59jOOOW1G/W1G/WO*RO,UO'#CtO*dO7[O'#CtOOQO1G.w1G.wOOOW1G/O1G/OOOOW1G/R1G/ROOOW1G/U1G/UOOOO'#D['#D[O*uO,UO,59`OOQO,59`,59`OOOO'#D]'#D]O+WO7[O,59`OOOO-E7Y-E7YOOQO1G.z1G.zOOOO-E7Z-E7Z",
            stateData: "+u~O!^OS~OSSOTPOUQOVROWTOY]OZ[O[^O^^O_^O`^Oa^Ox^O{_O!dZO~OdaO~OdbO~OdcO~OddO~OdeO~O!WfOPkP!ZkP~O!XiOQnP!ZnP~O!YlORqP!ZqP~OSSOTPOUQOVROWTOXqOY]OZ[O[^O^^O_^O`^Oa^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OdvO~OdwO~OfyOj|O~OfyOj!OO~OfyOj!QO~OfyOj!SOv!TO~OfyOj!TO~O!WfOPkX!ZkX~OP!WO!Z!XO~O!XiOQnX!ZnX~OQ!ZO!Z!XO~O!YlORqX!ZqX~OR!]O!Z!XO~O!Z!XO~P#dOd!_O~O![sO!e!aO~Oj!bO~Oj!cO~Og!dOfeXjeXveX~OfyOj!fO~OfyOj!gO~OfyOj!hO~OfyOj!iOv!jO~OfyOj!jO~Od!kO~Od!lO~Od!mO~Oj!nO~Oi!qO!`!oO!b!pO~Oj!rO~Oj!sO~Oj!tO~O_!uO`!uOa!uO!`!wO!a!uO~O_!xO`!xOa!xO!b!wO!c!xO~O_!uO`!uOa!uO!`!{O!a!uO~O_!xO`!xOa!xO!b!{O!c!xO~Ov~vj`!dx{_a_~",
            goto: "%p!`PPPPPPPPPPPPPPPPPP!a!gP!mPP!yPP!|#P#S#Y#]#`#f#i#l#r#xP!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{}!P!R!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!UeZ!e{}!P!R!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
            nodeNames: "\u26A0 StartCloseTag StartCloseTag StartCloseTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue EndTag ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag SelfClosingEndTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
            maxTerm: 67,
            context: Zp,
            nodeProps: [
                ["closedBy", -10, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, "EndTag", 4, "EndTag SelfClosingEndTag", -4, 19, 29, 32, 35, "CloseTag"],
                ["group", -9, 12, 15, 16, 17, 18, 39, 40, 41, 42, "Entity", 14, "Entity TextContent", -3, 27, 30, 33, "TextContent Entity"],
                ["openedBy", 26, "StartTag StartCloseTag", -4, 28, 31, 34, 36, "OpenTag", 38, "StartTag"]
            ],
            propSources: [Yp],
            skippedNodes: [0],
            repeatNodeCount: 9,
            tokenData: "#(r!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs4ysv-_vw5iwxJ^x}-_}!OKP!O!P-_!P!Q!!O!Q![-_![!]!$c!]!^-_!^!_!(k!_!`#'S!`!a#'z!a!c-_!c!}!$c!}#R-_#R#S!$c#S#T3V#T#o!$c#o#s-_#s$f$q$f%W-_%W%o!$c%o%p-_%p&a!$c&a&b-_&b1p!$c1p4U-_4U4d!$c4d4e-_4e$IS!$c$IS$I`-_$I`$Ib!$c$Ib$Kh-_$Kh%#t!$c%#t&/x-_&/x&Et!$c&Et&FV-_&FV;'S!$c;'S;:j!(e;:j;=`4s<%l?&r-_?&r?Ah!$c?Ah?BY$q?BY?Mn!$c?MnO$q!Z$|c^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX^P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV^P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT^POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W^P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYiWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`^P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljfS^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_1n!_!a&X!a#S-_#S#T3V#T#s-_#s$f$q$f;'S-_;'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ecfSiWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;'S/^;'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0uXfSqr0psw0px!P0p!Q!_0p!a#s0p$f;'S0p;'S;=`1b<%l?Ah0p?BY?Mn0pS1eP;=`<%l0p[1kP;=`<%l/^!U1wbfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!U3SP;=`<%l1n!V3bcfS^P!a`!cpOq&Xqr3Vrs&}sv3Vvw0pwx(tx!P3V!P!Q&X!Q!^3V!^!_1n!_!a&X!a#s3V#s$f&X$f;'S3V;'S;=`4m<%l?Ah3V?Ah?BY&X?BY?Mn3V?MnO&X!V4pP;=`<%l3V!_4vP;=`<%l-_!Z5SV!`h^P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_5rjfSiWa!ROX7dXZ8qZ[7d[^8q^p7dqr:crs8qst@Ttw:cwx8qx!P:c!P!Q7d!Q!]:c!]!^/^!^!_=p!_!a8q!a#S:c#S#T=p#T#s:c#s$f7d$f;'S:c;'S;=`?}<%l?Ah:c?Ah?BY7d?BY?Mn:c?MnO7d!Z7ibiWOX7dXZ8qZ[7d[^8q^p7dqr7drs8qst+Ptw7dwx8qx!]7d!]!^9f!^!a8q!a#S7d#S#T8q#T;'S7d;'S;=`:]<%lO7d!R8tVOp8qqs8qt!]8q!]!^9Z!^;'S8q;'S;=`9`<%lO8q!R9`O_!R!R9cP;=`<%l8q!Z9mYiW_!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z:`P;=`<%l7d!_:jjfSiWOX7dXZ8qZ[7d[^8q^p7dqr:crs8qst/^tw:cwx8qx!P:c!P!Q7d!Q!]:c!]!^<[!^!_=p!_!a8q!a#S:c#S#T=p#T#s:c#s$f7d$f;'S:c;'S;=`?}<%l?Ah:c?Ah?BY7d?BY?Mn:c?MnO7d!_<ecfSiW_!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;'S/^;'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V=udfSOp8qqr=prs8qst0ptw=pwx8qx!P=p!P!Q8q!Q!]=p!]!^?T!^!_=p!_!a8q!a#s=p#s$f8q$f;'S=p;'S;=`?w<%l?Ah=p?Ah?BY8q?BY?Mn=p?MnO8q!V?[XfS_!Rqr0psw0px!P0p!Q!_0p!a#s0p$f;'S0p;'S;=`1b<%l?Ah0p?BY?Mn0p!V?zP;=`<%l=p!_@QP;=`<%l:c!_@[ifSiWOXAyXZCTZ[Ay[^CT^pAyqrDrrsCTswDrwxCTx!PDr!P!QAy!Q!]Dr!]!^/^!^!_G|!_!aCT!a#SDr#S#TG|#T#sDr#s$fAy$f;'SDr;'S;=`JW<%l?AhDr?Ah?BYAy?BY?MnDr?MnOAy!ZBOaiWOXAyXZCTZ[Ay[^CT^pAyqrAyrsCTswAywxCTx!]Ay!]!^Cu!^!aCT!a#SAy#S#TCT#T;'SAy;'S;=`Dl<%lOAy!RCWUOpCTq!]CT!]!^Cj!^;'SCT;'S;=`Co<%lOCT!RCoO`!R!RCrP;=`<%lCT!ZC|YiW`!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZDoP;=`<%lAy!_DyifSiWOXAyXZCTZ[Ay[^CT^pAyqrDrrsCTswDrwxCTx!PDr!P!QAy!Q!]Dr!]!^Fh!^!_G|!_!aCT!a#SDr#S#TG|#T#sDr#s$fAy$f;'SDr;'S;=`JW<%l?AhDr?Ah?BYAy?BY?MnDr?MnOAy!_FqcfSiW`!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;'S/^;'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VHRcfSOpCTqrG|rsCTswG|wxCTx!PG|!P!QCT!Q!]G|!]!^I^!^!_G|!_!aCT!a#sG|#s$fCT$f;'SG|;'S;=`JQ<%l?AhG|?Ah?BYCT?BY?MnG|?MnOCT!VIeXfS`!Rqr0psw0px!P0p!Q!_0p!a#s0p$f;'S0p;'S;=`1b<%l?Ah0p?BY?Mn0p!VJTP;=`<%lG|!_JZP;=`<%lDr!ZJgW!bx^P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aK^lfS^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMU!O!P-_!P!Q$q!Q!^-_!^!_1n!_!a&X!a#S-_#S#T3V#T#s-_#s$f$q$f;'S-_;'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aMckfS^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_1n!_!`&X!`!a! W!a#S-_#S#T3V#T#s-_#s$f$q$f;'S-_;'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!T! cX^P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!a!!Zd^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!`&X!`!a!#i!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!X!#vX^P!a`!cpvSjUOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!a!$r!ZfSdQ^PiW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!O!$c!O!P!$c!P!Q$q!Q![!$c![!]!$c!]!^-_!^!_1n!_!a&X!a!c-_!c!}!$c!}#R-_#R#S!$c#S#T3V#T#o!$c#o#s-_#s$f$q$f$}-_$}%O!$c%O%W-_%W%o!$c%o%p-_%p&a!$c&a&b-_&b1p!$c1p4U!$c4U4d!$c4d4e-_4e$IS!$c$IS$I`-_$I`$Ib!$c$Ib$Je-_$Je$Jg!$c$Jg$Kh-_$Kh%#t!$c%#t&/x-_&/x&Et!$c&Et&FV-_&FV;'S!$c;'S;:j!(e;:j;=`4s<%l?&r-_?&r?Ah!$c?Ah?BY$q?BY?Mn!$c?MnO$q!a!(hP;=`<%l!$c!V!(tcfS!a`!cpOq*Vqr!*Prs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!b!H^!b#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!*YhfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex}1n}!O!+t!O!P1n!P!Q*V!Q!_1n!_!a*V!a!f1n!f!g!.p!g#W1n#W#X!?^#X#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!+}dfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex}1n}!O!-]!O!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!-hbfS!a`!cp!dPOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!.ydfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!q1n!q!r!0X!r#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!0bdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!e1n!e!f!1p!f#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!1ydfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!v1n!v!w!3X!w#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!3bdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!{1n!{!|!4p!|#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!4ydfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!r1n!r!s!6X!s#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!6bdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!g1n!g!h!7p!h#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!7ycfS!a`!cpOq!9Uqr!7prs!9{sv!7pvw!=swx!;ox!P!7p!P!Q!9U!Q!_!7p!_!`!9U!`!a!<}!a#s!7p#s$f!9U$f;'S!7p;'S;=`!?W<%l?Ah!7p?Ah?BY!9U?BY?Mn!7p?MnO!9U!R!9]Y!a`!cpOr!9Urs!9{sv!9Uvw!:gwx!;ox!`!9U!`!a!<}!a;'S!9U;'S;=`!=m<%lO!9Uq!:QV!cpOv!9{vx!:gx!`!9{!`!a!;U!a;'S!9{;'S;=`!;i<%lO!9{P!:jTO!`!:g!`!a!:y!a;'S!:g;'S;=`!;O<%lO!:gP!;OO{PP!;RP;=`<%l!:gq!;]S!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!;lP;=`<%l!9{a!;tX!a`Or!;ors!:gsv!;ovw!:gw!`!;o!`!a!<a!a;'S!;o;'S;=`!<w<%lO!;oa!<hT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!<zP;=`<%l!;o!R!=WV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!=pP;=`<%l!9UT!=xbfSOq!:gqr!=srs!:gsw!=swx!:gx!P!=s!P!Q!:g!Q!_!=s!_!`!:g!`!a!:y!a#s!=s#s$f!:g$f;'S!=s;'S;=`!?Q<%l?Ah!=s?Ah?BY!:g?BY?Mn!=s?MnO!:gT!?TP;=`<%l!=s!V!?ZP;=`<%l!7p!V!?gdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#c1n#c#d!@u#d#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!AOdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#V1n#V#W!B^#W#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!BgdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#h1n#h#i!Cu#i#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!DOdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#m1n#m#n!E^#n#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!EgdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#d1n#d#e!Fu#e#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!GOdfS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#X1n#X#Y!7p#Y#s1n#s$f*V$f;'S1n;'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!HgcfS!a`!cpOq!Irqr!H^rs!Jisv!H^vw#!vwx!MZx!P!H^!P!Q!Ir!Q!_!H^!_!a!Ir!a!b#%h!b#s!H^#s$f!Ir$f;'S!H^;'S;=`#&|<%l?Ah!H^?Ah?BY!Ir?BY?Mn!H^?MnO!Ir!R!IyY!a`!cpOr!Irrs!Jisv!Irvw!KTwx!MZx!a!Ir!a!b# Z!b;'S!Ir;'S;=`#!p<%lO!Irq!JnV!cpOv!Jivx!KTx!a!Ji!a!b!LU!b;'S!Ji;'S;=`!MT<%lO!JiP!KWTO!a!KT!a!b!Kg!b;'S!KT;'S;=`!LO<%lO!KTP!KjTO!`!KT!`!a!Ky!a;'S!KT;'S;=`!LO<%lO!KTP!LOOxPP!LRP;=`<%l!KTq!LZV!cpOv!Jivx!KTx!`!Ji!`!a!Lp!a;'S!Ji;'S;=`!MT<%lO!Jiq!LwS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!MWP;=`<%l!Jia!M`X!a`Or!MZrs!KTsv!MZvw!KTw!a!MZ!a!b!M{!b;'S!MZ;'S;=`# T<%lO!MZa!NQX!a`Or!MZrs!KTsv!MZvw!KTw!`!MZ!`!a!Nm!a;'S!MZ;'S;=`# T<%lO!MZa!NtT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea# WP;=`<%l!MZ!R# bY!a`!cpOr!Irrs!Jisv!Irvw!KTwx!MZx!`!Ir!`!a#!Q!a;'S!Ir;'S;=`#!p<%lO!Ir!R#!ZV!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R#!sP;=`<%l!IrT#!{bfSOq!KTqr#!vrs!KTsw#!vwx!KTx!P#!v!P!Q!KT!Q!_#!v!_!a!KT!a!b#$T!b#s#!v#s$f!KT$f;'S#!v;'S;=`#%b<%l?Ah#!v?Ah?BY!KT?BY?Mn#!v?MnO!KTT#$YbfSOq!KTqr#!vrs!KTsw#!vwx!KTx!P#!v!P!Q!KT!Q!_#!v!_!`!KT!`!a!Ky!a#s#!v#s$f!KT$f;'S#!v;'S;=`#%b<%l?Ah#!v?Ah?BY!KT?BY?Mn#!v?MnO!KTT#%eP;=`<%l#!v!V#%qcfS!a`!cpOq!Irqr!H^rs!Jisv!H^vw#!vwx!MZx!P!H^!P!Q!Ir!Q!_!H^!_!`!Ir!`!a#!Q!a#s!H^#s$f!Ir$f;'S!H^;'S;=`#&|<%l?Ah!H^?Ah?BY!Ir?BY?Mn!H^?MnO!Ir!V#'PP;=`<%l!H^!V#'_XgS^P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!X#(VX^P!a`!cpjUOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
            tokenizers: [Up, Cp, Ap, _p, Vp, 0, 1, 2, 3, 4, 5],
            topRules: {
                Document: [0, 13]
            },
            dialects: {
                noMatch: 0,
                selfClosing: 485
            },
            tokenPrec: 487
        });

    function jp(n, e) {
        let t = Object.create(null);
        for (let i of n.firstChild.getChildren("Attribute")) {
            let r = i.getChild("AttributeName"),
                s = i.getChild("AttributeValue") || i.getChild("UnquotedAttributeValue");
            r && (t[e.read(r.from, r.to)] = s ? s.name == "AttributeValue" ? e.read(s.from + 1, s.to - 1) : e.read(s.from, s.to) : "")
        }
        return t
    }

    function qs(n, e, t) {
        let i;
        for (let r of t)
            if (!r.attrs || r.attrs(i || (i = jp(n.node.parent, e)))) return {
                parser: r.parser
            };
        return null
    }

    function La(n) {
        let e = [],
            t = [],
            i = [];
        for (let r of n) {
            let s = r.tag == "script" ? e : r.tag == "style" ? t : r.tag == "textarea" ? i : null;
            if (!s) throw new RangeError("Only script, style, and textarea tags can host nested parsers");
            s.push(r)
        }
        return kn((r, s) => {
            let O = r.type.id;
            return O == bp ? qs(r, s, e) : O == Pp ? qs(r, s, t) : O == xp ? qs(r, s, i) : null
        })
    }
    var Gp = 93,
        Fa = 1,
        Ep = 94,
        Dp = 95,
        Ha = 2,
        Ka = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288],
        Mp = 58,
        Ip = 40,
        Ja = 95,
        Bp = 91,
        Cn = 45,
        Np = 46,
        Lp = 35,
        Fp = 37;

    function An(n) {
        return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 161
    }

    function Hp(n) {
        return n >= 48 && n <= 57
    }
    var Kp = new E((n, e) => {
            for (let t = !1, i = 0, r = 0;; r++) {
                let {
                    next: s
                } = n;
                if (An(s) || s == Cn || s == Ja || t && Hp(s)) !t && (s != Cn || r > 0) && (t = !0), i === r && s == Cn && i++, n.advance();
                else {
                    t && n.acceptToken(s == Ip ? Ep : i == 2 && e.canShift(Ha) ? Ha : Dp);
                    break
                }
            }
        }),
        Jp = new E(n => {
            if (Ka.includes(n.peek(-1))) {
                let {
                    next: e
                } = n;
                (An(e) || e == Ja || e == Lp || e == Np || e == Bp || e == Mp || e == Cn) && n.acceptToken(Gp)
            }
        }),
        em = new E(n => {
            if (!Ka.includes(n.peek(-1))) {
                let {
                    next: e
                } = n;
                if (e == Fp && (n.advance(), n.acceptToken(Fa)), An(e)) {
                    do n.advance(); while (An(n.next));
                    n.acceptToken(Fa)
                }
            }
        }),
        tm = he({
            "AtKeyword import charset namespace keyframes media supports": u.definitionKeyword,
            "from to selector": u.keyword,
            NamespaceName: u.namespace,
            KeyframeName: u.labelName,
            TagName: u.tagName,
            ClassName: u.className,
            PseudoClassName: u.constant(u.className),
            IdName: u.labelName,
            "FeatureName PropertyName": u.propertyName,
            AttributeName: u.attributeName,
            NumberLiteral: u.number,
            KeywordQuery: u.keyword,
            UnaryQueryOp: u.operatorKeyword,
            "CallTag ValueName": u.atom,
            VariableName: u.variableName,
            Callee: u.operatorKeyword,
            Unit: u.unit,
            "UniversalSelector NestingSelector": u.definitionOperator,
            MatchOp: u.compareOperator,
            "ChildOp SiblingOp, LogicOp": u.logicOperator,
            BinOp: u.arithmeticOperator,
            Important: u.modifier,
            Comment: u.blockComment,
            ParenthesizedContent: u.special(u.name),
            ColorLiteral: u.color,
            StringLiteral: u.string,
            ":": u.punctuation,
            "PseudoOp #": u.derefOperator,
            "; ,": u.separator,
            "( )": u.paren,
            "[ ]": u.squareBracket,
            "{ }": u.brace
        }),
        im = {
            __proto__: null,
            lang: 32,
            "nth-child": 32,
            "nth-last-child": 32,
            "nth-of-type": 32,
            "nth-last-of-type": 32,
            dir: 32,
            "host-context": 32,
            url: 60,
            "url-prefix": 60,
            domain: 60,
            regexp: 60,
            selector: 134
        },
        nm = {
            __proto__: null,
            "@import": 114,
            "@media": 138,
            "@charset": 142,
            "@namespace": 146,
            "@keyframes": 152,
            "@supports": 164
        },
        rm = {
            __proto__: null,
            not: 128,
            only: 128,
            from: 158,
            to: 160
        },
        eh = ie.deserialize({
            version: 14,
            states: "7WOYQ[OOOOQP'#Cd'#CdOOQP'#Cc'#CcO!ZQ[O'#CfO!}QXO'#CaO#UQ[O'#ChO#aQ[O'#DPO#fQ[O'#DTOOQP'#Ec'#EcO#kQdO'#DeO$VQ[O'#DrO#kQdO'#DtO$hQ[O'#DvO$sQ[O'#DyO$xQ[O'#EPO%WQ[O'#EROOQS'#Eb'#EbOOQS'#ES'#ESQYQ[OOOOQP'#Cg'#CgOOQP,59Q,59QO!ZQ[O,59QO%_Q[O'#EVO%yQWO,58{O&RQ[O,59SO#aQ[O,59kO#fQ[O,59oO%_Q[O,59sO%_Q[O,59uO%_Q[O,59vO'bQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO'iQWO,59SO'nQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO'sQ`O,59oOOQS'#Cp'#CpO#kQdO'#CqO'{QvO'#CsO)VQtO,5:POOQO'#Cx'#CxO'nQWO'#CwO)kQWO'#CyOOQS'#Ef'#EfOOQO'#Dh'#DhO)pQ[O'#DoO*OQWO'#EiO$xQ[O'#DmO*^QWO'#DpOOQO'#Ej'#EjO%|QWO,5:^O*cQpO,5:`OOQS'#Dx'#DxO*kQWO,5:bO*pQ[O,5:bOOQO'#D{'#D{O*xQWO,5:eO*}QWO,5:kO+VQWO,5:mOOQS-E8Q-E8QOOQP1G.l1G.lO+yQXO,5:qOOQO-E8T-E8TOOQS1G.g1G.gOOQP1G.n1G.nO'iQWO1G.nO'nQWO1G.nOOQP1G/V1G/VO,WQ`O1G/ZO,qQXO1G/_O-XQXO1G/aO-oQXO1G/bO.VQXO'#CdO.zQWO'#DaOOQS,59z,59zO/PQWO,59zO/XQ[O,59zO/`Q[O'#DOO/gQdO'#CoOOQP1G/Z1G/ZO#kQdO1G/ZO/nQpO,59]OOQS,59_,59_O#kQdO,59aO/vQWO1G/kOOQS,59c,59cO/{Q!bO,59eO0TQWO'#DhO0`QWO,5:TO0eQWO,5:ZO$xQ[O,5:VO$xQ[O'#EYO0mQWO,5;TO0xQWO,5:XO%_Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O1ZQWO1G/|O1`QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XOOQP7+$Y7+$YOOQP7+$u7+$uO#kQdO7+$uO#kQdO,59{O1nQ[O'#EXO1xQWO1G/fOOQS1G/f1G/fO1xQWO1G/fO2QQXO'#EhO2XQWO,59jO2^QtO'#ETO3RQdO'#EeO3]QWO,59ZO3bQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO3jQWO1G/PO#kQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO3oQWO,5:tOOQO-E8W-E8WO3}QXO1G/vOOQS7+%h7+%hO4UQYO'#CsO%|QWO'#EZO4^QdO,5:hOOQS,5:h,5:hO4lQpO<<HaO4tQtO1G/gOOQO,5:s,5:sO5XQ[O,5:sOOQO-E8V-E8VOOQS7+%Q7+%QO5cQWO7+%QO5kQWO,5;SOOQP1G/U1G/UOOQS-E8R-E8RO#kQdO'#EUO5sQWO,5;POOQT1G.u1G.uOOQP<<Ha<<HaOOQS7+$k7+$kO5{QdO7+%ZOOQO7+%b7+%bOOQS,5:u,5:uOOQS-E8X-E8XOOQS1G0S1G0SOOQPAN={AN={O6SQtO'#EWO#kQdO'#EWO6}QdO7+%ROOQO7+%R7+%ROOQO1G0_1G0_OOQS<<Hl<<HlO7_QdO,5:pOOQO-E8S-E8SOOQO<<Hu<<HuO7iQtO,5:rOOQS-E8U-E8UOOQO<<Hm<<Hm",
            stateData: "8j~O#TOSROS~OUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#RPO#WRO~O#RcO~O]hO^hOpfOtiOxjO|kO!PmO#PlO#WeO~O!RnO~P!`O`tO#QqO#RpO~O#RuO~O#RwO~OQ!QObzOf!QOh!QOn!PO#Q}O#RyO#Z{O~Ob!SO!b!UO!e!VO#R!RO!R#]P~Oh![On!PO#R!ZO~O#R!^O~Ob!SO!b!UO!e!VO#R!RO~O!W#]P~P$VOUWOXWO]TO^TOtUOxVO#RPO#WRO~OpfO!RnO~O`!iO#QqO#RpO~OQ!pOUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#R!oO#WRO~O!Q!qO~P&^Ob!tO~Ob!uO~Ov!vOz!wO~OP!yObgXjgX!WgX!bgX!egX#RgXagXQgXfgXhgXngXpgX#QgX#ZgXvgX!QgX!VgX~Ob!SOj!zO!b!UO!e!VO#R!RO!W#]P~Ob!}O~Ob!SO!b!UO!e!VO#R#OO~Op#SO!`#RO!R#]X!W#]X~Ob#VO~Oj!zO!W#XO~O!W#YO~Oh#ZOn!PO~O!R#[O~O!RnO!`#RO~O!RnO!W#_O~O]hO^hOtiOxjO|kO!PmO#PlO#WeO~Op!ya!R!yaa!ya~P+_Ov#aOz#bO~O]hO^hOtiOxjO#WeO~Op{i|{i!P{i!R{i#P{ia{i~P,`Op}i|}i!P}i!R}i#P}ia}i~P,`Op!Oi|!Oi!P!Oi!R!Oi#P!Oia!Oi~P,`O]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#PWX#WWX~O]#cO~O!Q#fO!W#dO~O!Q#fO~P&^Oa#[P~P%_Oa#XP~P#kOa#nOj!zO~O!W#pO~Oh#qOo#qO~O]!^Xa![X!`![X~O]#rO~Oa#sO!`#RO~Op#SO!R#]a!W#]a~O!`#ROp!aa!R!aa!W!aaa!aa~O!W#xO~O!Q#|O!q#zO!r#zO#Z#yO~O!Q!{X!W!{X~P&^O!Q$SO!W#dO~Oa#[X~P!`Oa$VO~Oj!zOQ!wXa!wXb!wXf!wXh!wXn!wXp!wX#Q!wX#R!wX#Z!wX~Op$XOa#XX~P#kOa$ZO~Oj!zOv$[O~Oa$]O~O!`#ROp!|a!R!|a!W!|a~Oa$_O~P+_OP!yO!RgX~O!Q$bO!q#zO!r#zO#Z#yO~Oj!zOv$cO~Oj!zOp$eO!V$gO!Q!Ti!W!Ti~P#kO!Q!{a!W!{a~P&^O!Q$iO!W#dO~OpfOa#[a~Op$XOa#Xa~Oa$lO~P#kOj!zOQ!zXb!zXf!zXh!zXn!zXp!zX!Q!zX!V!zX!W!zX#Q!zX#R!zX#Z!zX~Op$eO!V$oO!Q!Tq!W!Tq~P#kOa!xap!xa~P#kOj!zOQ!zab!zaf!zah!zan!zap!za!Q!za!V!za!W!za#Q!za#R!za#Z!za~Oo#Zj!Pj~",
            goto: ",O#_PPPPP#`P#h#vP#h$U#hPP$[PPP$b$k$kP$}P$kP$k%e%wPPP&a&g#hP&mP#hP&sP#hP#h#hPPP&y']'iPP#`PP'o'o'y'oP'oP'o'oP#`P#`P#`P'|#`P(P(SPP#`P#`(V(e(s(y)T)Z)e)kPPPPPP)q)yP*e*hP+^+a+j]`Obn!s#d$QiWObfklmn!s!t#V#d$QiQObfklmn!s!t#V#d$QQdRR!ceQrTR!ghQ!gtQ!|!OR#`!iq!QXZz!u!w!z#b#c#k#r$O$X$^$e$f$jp!QXZz!u!w!z#b#c#k#r$O$X$^$e$f$jT#z#[#{q!OXZz!u!w!z#b#c#k#r$O$X$^$e$f$jp!QXZz!u!w!z#b#c#k#r$O$X$^$e$f$jQ![[R#Z!]QsTR!hhQ!gsR#`!hQvUR!jiQxVR!kjQoSQ!fgQ#W!XQ#^!`Q#_!aR$`#zQ!rnQ#g!sQ$P#dR$h$QX!pn!s#d$Qa!WY^_|!S!U#R#SR#P!SR!][R!_]R#]!_QbOU!bb!s$QQ!snR$Q#dQ#k!uU$W#k$^$jQ$^#rR$j$XQ$Y#kR$k$YQgSS!eg$UR$U#hQ$f$OR$n$fQ#e!rS$R#e$TR$T#gQ#T!TR#v#TQ#{#[R$a#{]aObn!s#d$Q[SObn!s#d$QQ!dfQ!lkQ!mlQ!nmQ#h!tR#w#VR#l!uQ|XQ!YZQ!xz[#j!u#k#r$X$^$jQ#m!wQ#o!zQ#}#bQ$O#cS$d$O$fR$m$eR#i!tQ!XYQ!a_R!{|U!TY_|Q!`^Q#Q!SQ#U!UQ#t#RR#u#S",
            nodeNames: "\u26A0 Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule",
            maxTerm: 106,
            nodeProps: [
                ["openedBy", 17, "(", 48, "{"],
                ["closedBy", 18, ")", 49, "}"]
            ],
            propSources: [tm],
            skippedNodes: [0, 3],
            repeatNodeCount: 8,
            tokenData: "Ay~R![OX$wX^%]^p$wpq%]qr(crs+}st,otu2Uuv$wvw2rwx2}xy3jyz3uz{3z{|4_|}8U}!O8a!O!P8x!P!Q9Z!Q![;e![!]<Y!]!^<x!^!_$w!_!`=T!`!a=`!a!b$w!b!c>O!c!}$w!}#O?[#O#P$w#P#Q?g#Q#R2U#R#T$w#T#U?r#U#c$w#c#d@q#d#o$w#o#pAQ#p#q2U#q#rA]#r#sAh#s#y$w#y#z%]#z$f$w$f$g%]$g#BY$w#BY#BZ%]#BZ$IS$w$IS$I_%]$I_$I|$w$I|$JO%]$JO$JT$w$JT$JU%]$JU$KV$w$KV$KW%]$KW&FU$w&FU&FV%]&FV~$wW$zQOy%Qz~%QW%VQoWOy%Qz~%Q~%bf#T~OX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q~&}f#T~oWOX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q^(fSOy%Qz#]%Q#]#^(r#^~%Q^(wSoWOy%Qz#a%Q#a#b)T#b~%Q^)YSoWOy%Qz#d%Q#d#e)f#e~%Q^)kSoWOy%Qz#c%Q#c#d)w#d~%Q^)|SoWOy%Qz#f%Q#f#g*Y#g~%Q^*_SoWOy%Qz#h%Q#h#i*k#i~%Q^*pSoWOy%Qz#T%Q#T#U*|#U~%Q^+RSoWOy%Qz#b%Q#b#c+_#c~%Q^+dSoWOy%Qz#h%Q#h#i+p#i~%Q^+wQ!VUoWOy%Qz~%Q~,QUOY+}Zr+}rs,ds#O+}#O#P,i#P~+}~,iOh~~,lPO~+}_,tWtPOy%Qz!Q%Q!Q![-^![!c%Q!c!i-^!i#T%Q#T#Z-^#Z~%Q^-cWoWOy%Qz!Q%Q!Q![-{![!c%Q!c!i-{!i#T%Q#T#Z-{#Z~%Q^.QWoWOy%Qz!Q%Q!Q![.j![!c%Q!c!i.j!i#T%Q#T#Z.j#Z~%Q^.qWfUoWOy%Qz!Q%Q!Q![/Z![!c%Q!c!i/Z!i#T%Q#T#Z/Z#Z~%Q^/bWfUoWOy%Qz!Q%Q!Q![/z![!c%Q!c!i/z!i#T%Q#T#Z/z#Z~%Q^0PWoWOy%Qz!Q%Q!Q![0i![!c%Q!c!i0i!i#T%Q#T#Z0i#Z~%Q^0pWfUoWOy%Qz!Q%Q!Q![1Y![!c%Q!c!i1Y!i#T%Q#T#Z1Y#Z~%Q^1_WoWOy%Qz!Q%Q!Q![1w![!c%Q!c!i1w!i#T%Q#T#Z1w#Z~%Q^2OQfUoWOy%Qz~%QY2XSOy%Qz!_%Q!_!`2e!`~%QY2lQzQoWOy%Qz~%QX2wQXPOy%Qz~%Q~3QUOY2}Zw2}wx,dx#O2}#O#P3d#P~2}~3gPO~2}_3oQbVOy%Qz~%Q~3zOa~_4RSUPjSOy%Qz!_%Q!_!`2e!`~%Q_4fUjS!PPOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q^4}SoWOy%Qz!Q%Q!Q![5Z![~%Q^5bWoW#ZUOy%Qz!Q%Q!Q![5Z![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q^6PWoWOy%Qz{%Q{|6i|}%Q}!O6i!O!Q%Q!Q![6z![~%Q^6nSoWOy%Qz!Q%Q!Q![6z![~%Q^7RSoW#ZUOy%Qz!Q%Q!Q![6z![~%Q^7fYoW#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q_8ZQpVOy%Qz~%Q^8fUjSOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q_8}S#WPOy%Qz!Q%Q!Q![5Z![~%Q~9`RjSOy%Qz{9i{~%Q~9nSoWOy9iyz9zz{:o{~9i~9}ROz9zz{:W{~9z~:ZTOz9zz{:W{!P9z!P!Q:j!Q~9z~:oOR~~:tUoWOy9iyz9zz{:o{!P9i!P!Q;W!Q~9i~;_QoWR~Oy%Qz~%Q^;jY#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%QX<_S]POy%Qz![%Q![!]<k!]~%QX<rQ^PoWOy%Qz~%Q_<}Q!WVOy%Qz~%QY=YQzQOy%Qz~%QX=eS|POy%Qz!`%Q!`!a=q!a~%QX=xQ|PoWOy%Qz~%QX>RUOy%Qz!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX>lY!YPoWOy%Qz}%Q}!O>e!O!Q%Q!Q![>e![!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX?aQxPOy%Qz~%Q^?lQvUOy%Qz~%QX?uSOy%Qz#b%Q#b#c@R#c~%QX@WSoWOy%Qz#W%Q#W#X@d#X~%QX@kQ!`PoWOy%Qz~%QX@tSOy%Qz#f%Q#f#g@d#g~%QXAVQ!RPOy%Qz~%Q_AbQ!QVOy%Qz~%QZAmS!PPOy%Qz!_%Q!_!`2e!`~%Q",
            tokenizers: [Jp, em, Kp, 0, 1, 2, 3],
            topRules: {
                StyleSheet: [0, 4]
            },
            specialized: [{
                term: 94,
                get: n => im[n] || -1
            }, {
                term: 56,
                get: n => nm[n] || -1
            }, {
                term: 95,
                get: n => rm[n] || -1
            }],
            tokenPrec: 1078
        });
    var Zs = null;

    function _s() {
        if (!Zs && typeof document == "object" && document.body) {
            let n = [];
            for (let e in document.body.style) /[A-Z]|^-|^(item|length)$/.test(e) || n.push(e);
            Zs = n.sort().map(e => ({
                type: "property",
                label: e
            }))
        }
        return Zs || []
    }
    var th = ["active", "after", "any-link", "autofill", "backdrop", "before", "checked", "cue", "default", "defined", "disabled", "empty", "enabled", "file-selector-button", "first", "first-child", "first-letter", "first-line", "first-of-type", "focus", "focus-visible", "focus-within", "fullscreen", "has", "host", "host-context", "hover", "in-range", "indeterminate", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "marker", "modal", "not", "nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "part", "placeholder", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "selection", "slotted", "target", "target-text", "valid", "visited", "where"].map(n => ({
            type: "class",
            label: n
        })),
        ih = ["above", "absolute", "activeborder", "additive", "activecaption", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "antialiased", "appworkspace", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below", "bidi-override", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic-abegede-gez", "ethiopic-halehame-aa-er", "ethiopic-halehame-gez", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "graytext", "grid", "groove", "hand", "hard-light", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "keep-all", "landscape", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lowercase", "ltr", "luminosity", "manipulation", "match", "matrix", "matrix3d", "medium", "menu", "menutext", "message-box", "middle", "min-intrinsic", "mix", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "start", "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "text", "text-bottom", "text-top", "textarea", "textfield", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "to", "top", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-latin", "uppercase", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"].map(n => ({
            type: "keyword",
            label: n
        })).concat(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"].map(n => ({
            type: "constant",
            label: n
        }))),
        sm = ["a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "figcaption", "figure", "footer", "form", "header", "hgroup", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "meter", "nav", "ol", "output", "p", "pre", "ruby", "section", "select", "small", "source", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "tr", "u", "ul"].map(n => ({
            type: "type",
            label: n
        })),
        Tt = /^[\w-]*/,
        Om = n => {
            let {
                state: e,
                pos: t
            } = n, i = L(e).resolveInner(t, -1);
            if (i.name == "PropertyName") return {
                from: i.from,
                options: _s(),
                validFor: Tt
            };
            if (i.name == "ValueName") return {
                from: i.from,
                options: ih,
                validFor: Tt
            };
            if (i.name == "PseudoClassName") return {
                from: i.from,
                options: th,
                validFor: Tt
            };
            if (i.name == "TagName") {
                for (let {
                        parent: O
                    } = i; O; O = O.parent)
                    if (O.name == "Block") return {
                        from: i.from,
                        options: _s(),
                        validFor: Tt
                    };
                return {
                    from: i.from,
                    options: sm,
                    validFor: Tt
                }
            }
            if (!n.explicit) return null;
            let r = i.resolve(t),
                s = r.childBefore(t);
            return s && s.name == ":" && r.name == "PseudoClassSelector" ? {
                from: t,
                options: th,
                validFor: Tt
            } : s && s.name == ":" && r.name == "Declaration" || r.name == "ArgList" ? {
                from: t,
                options: ih,
                validFor: Tt
            } : r.name == "Block" ? {
                from: t,
                options: _s(),
                validFor: Tt
            } : null
        },
        Yn = te.define({
            name: "css",
            parser: eh.configure({
                props: [$e.add({
                    Declaration: ue()
                }), ge.add({
                    Block: bt
                })]
            }),
            languageData: {
                commentTokens: {
                    block: {
                        open: "/*",
                        close: "*/"
                    }
                },
                indentOnInput: /^\s*\}$/,
                wordChars: "-"
            }
        });

    function jn() {
        return new ce(Yn, Yn.data.of({
            autocomplete: Om
        }))
    }
    var om = 1,
        nh = 288,
        rh = 2,
        lm = 3,
        Gn = 289,
        am = 4,
        hm = 290,
        sh = 291,
        cm = 293,
        um = 294,
        fm = 5,
        dm = 6,
        pm = 1,
        mm = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288],
        Oh = 125,
        $m = 123,
        gm = 59,
        oh = 47,
        Qm = 42,
        ym = 43,
        Sm = 45,
        bm = 36,
        Pm = 96,
        xm = 92,
        Tm = new Vt({
            start: !1,
            shift(n, e) {
                return e == fm || e == dm || e == cm ? n : e == um
            },
            strict: !1
        }),
        km = new E((n, e) => {
            let {
                next: t
            } = n;
            (t == Oh || t == -1 || e.context) && e.canShift(sh) && n.acceptToken(sh)
        }, {
            contextual: !0,
            fallback: !0
        }),
        vm = new E((n, e) => {
            let {
                next: t
            } = n, i;
            mm.indexOf(t) > -1 || t == oh && ((i = n.peek(1)) == oh || i == Qm) || t != Oh && t != gm && t != -1 && !e.context && e.canShift(nh) && n.acceptToken(nh)
        }, {
            contextual: !0
        }),
        wm = new E((n, e) => {
            let {
                next: t
            } = n;
            if ((t == ym || t == Sm) && (n.advance(), t == n.next)) {
                n.advance();
                let i = !e.context && e.canShift(rh);
                n.acceptToken(i ? rh : lm)
            }
        }, {
            contextual: !0
        }),
        Xm = new E(n => {
            for (let e = !1, t = 0;; t++) {
                let {
                    next: i
                } = n;
                if (i < 0) {
                    t && n.acceptToken(Gn);
                    break
                } else if (i == Pm) {
                    t ? n.acceptToken(Gn) : n.acceptToken(hm, 1);
                    break
                } else if (i == $m && e) {
                    t == 1 ? n.acceptToken(am, 1) : n.acceptToken(Gn, -1);
                    break
                } else if (i == 10 && t) {
                    n.advance(), n.acceptToken(Gn);
                    break
                } else i == xm && n.advance();
                e = i == bm, n.advance()
            }
        }),
        Rm = new E((n, e) => {
            if (!(n.next != 101 || !e.dialectEnabled(pm))) {
                n.advance();
                for (let t = 0; t < 6; t++) {
                    if (n.next != "xtends".charCodeAt(t)) return;
                    n.advance()
                }
                n.next >= 57 && n.next <= 65 || n.next >= 48 && n.next <= 90 || n.next == 95 || n.next >= 97 && n.next <= 122 || n.next > 160 || n.acceptToken(om)
            }
        }),
        zm = he({
            "get set async static": u.modifier,
            "for while do if else switch try catch finally return throw break continue default case": u.controlKeyword,
            "in of await yield void typeof delete instanceof": u.operatorKeyword,
            "let var const function class extends": u.definitionKeyword,
            "import export from": u.moduleKeyword,
            "with debugger as new": u.keyword,
            TemplateString: u.special(u.string),
            super: u.atom,
            BooleanLiteral: u.bool,
            this: u.self,
            null: u.null,
            Star: u.modifier,
            VariableName: u.variableName,
            "CallExpression/VariableName TaggedTemplateExpression/VariableName": u.function(u.variableName),
            VariableDefinition: u.definition(u.variableName),
            Label: u.labelName,
            PropertyName: u.propertyName,
            PrivatePropertyName: u.special(u.propertyName),
            "CallExpression/MemberExpression/PropertyName": u.function(u.propertyName),
            "FunctionDeclaration/VariableDefinition": u.function(u.definition(u.variableName)),
            "ClassDeclaration/VariableDefinition": u.definition(u.className),
            PropertyDefinition: u.definition(u.propertyName),
            PrivatePropertyDefinition: u.definition(u.special(u.propertyName)),
            UpdateOp: u.updateOperator,
            LineComment: u.lineComment,
            BlockComment: u.blockComment,
            Number: u.number,
            String: u.string,
            ArithOp: u.arithmeticOperator,
            LogicOp: u.logicOperator,
            BitOp: u.bitwiseOperator,
            CompareOp: u.compareOperator,
            RegExp: u.regexp,
            Equals: u.definitionOperator,
            Arrow: u.function(u.punctuation),
            ": Spread": u.punctuation,
            "( )": u.paren,
            "[ ]": u.squareBracket,
            "{ }": u.brace,
            "InterpolationStart InterpolationEnd": u.special(u.brace),
            ".": u.derefOperator,
            ", ;": u.separator,
            TypeName: u.typeName,
            TypeDefinition: u.definition(u.typeName),
            "type enum interface implements namespace module declare": u.definitionKeyword,
            "abstract global Privacy readonly override": u.modifier,
            "is keyof unique infer": u.operatorKeyword,
            JSXAttributeValue: u.attributeValue,
            JSXText: u.content,
            "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": u.angleBracket,
            "JSXIdentifier JSXNameSpacedName": u.tagName,
            "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": u.attributeName,
            "JSXBuiltin/JSXIdentifier": u.standard(u.tagName)
        }),
        Wm = {
            __proto__: null,
            export: 18,
            as: 23,
            from: 29,
            default: 32,
            async: 37,
            function: 38,
            this: 50,
            true: 58,
            false: 58,
            null: 68,
            void: 72,
            typeof: 76,
            super: 92,
            new: 126,
            await: 143,
            yield: 145,
            delete: 146,
            class: 156,
            extends: 158,
            public: 203,
            private: 203,
            protected: 203,
            readonly: 205,
            instanceof: 226,
            satisfies: 229,
            in: 230,
            const: 232,
            import: 264,
            keyof: 319,
            unique: 323,
            infer: 329,
            is: 365,
            abstract: 385,
            implements: 387,
            type: 389,
            let: 392,
            var: 394,
            interface: 401,
            enum: 405,
            namespace: 411,
            module: 413,
            declare: 417,
            global: 421,
            for: 442,
            of: 451,
            while: 454,
            with: 458,
            do: 462,
            if: 466,
            else: 468,
            switch: 472,
            case: 478,
            try: 484,
            catch: 488,
            finally: 492,
            return: 496,
            throw: 500,
            break: 504,
            continue: 508,
            debugger: 512
        },
        qm = {
            __proto__: null,
            async: 113,
            get: 115,
            set: 117,
            public: 165,
            private: 165,
            protected: 165,
            static: 167,
            abstract: 169,
            override: 171,
            readonly: 177,
            accessor: 179,
            new: 369
        },
        Zm = {
            __proto__: null,
            "<": 133
        },
        lh = ie.deserialize({
            version: 14,
            states: "$;fO`QdOOO'TQ(C|O'#ChO'[OWO'#DYO)gQdO'#D_O)wQdO'#DjO*OQdO'#DtO-{QdO'#DzOOQO'#E`'#E`O.`Q`O'#E_O.eQ`O'#E_OOQ(C['#Ei'#EiO0gQ(C|O'#IzO3QQ(C|O'#I{O3nQ`O'#FOO3sQ!bO'#FgOOQ(C['#FW'#FWO4OO#tO'#FWO4^Q&jO'#FnO5qQ`O'#FmOOQ(C['#I{'#I{OOQ(CW'#Iz'#IzOOQS'#Jd'#JdO5vQ`O'#HwO5{Q(ChO'#HxOOQS'#Io'#IoOOQS'#Hy'#HyQ`QdOOO*OQdO'#DlO6TQ`O'#GcO6YQ&jO'#CmO6hQ`O'#E^O6sQ`O'#EjO6xQ&jO'#FVO7dQ`O'#GcO7iQ`O'#GgO7tQ`O'#GgO8SQ`O'#GjO8SQ`O'#GkO8SQ`O'#GmO6TQ`O'#GpO8sQ`O'#GsO:RQ`O'#CdO:cQ`O'#HQO:kQ`O'#HWO:kQ`O'#HYO`QdO'#H[O:kQ`O'#H^O:kQ`O'#HaO:pQ`O'#HgO:uQ(CjO'#HmO*OQdO'#HoO;QQ(CjO'#HqO;]Q(CjO'#HsO5{Q(ChO'#HuO*OQdO'#DZOOOW'#H{'#H{O;hOWO,59tOOQ(C[,59t,59tO=|QtO'#ChO>WQdO'#H|O>kQ`O'#I|O@mQtO'#I|O'gQdO'#I|O@tQ`O,59yO@yQ,UO'#DdOBPQ`O'#E`OB^Q`O'#JXOBiQ`O'#JWOBiQ`O'#JWOBqQ`O,5:|OBvQ`O'#JVOB}QaO'#D{O6YQ&jO'#E^OC]Q`O'#E^OChQpO'#FVOOQ(C[,5:U,5:UOCpQdO,5:UOEqQ(C|O,5:`OF_Q`O,5:fOFxQ(ChO'#JUO7iQ`O'#JTOGPQ`O'#JTOGXQ`O,5:{OG^Q`O'#JTOGlQdO,5:yOIlQ&jO'#EZOJ|Q`O,5:yOLcQ&jO'#DnOLjQdO'#DsOLtQ,UO,5;SOL|Q,UO,5;SO*OQdO,5;SOOQS'#Ev'#EvOOQS'#Ex'#ExO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UO*OQdO,5;UOOQS'#E|'#E|OM[QdO,5;gOOQ(C[,5;l,5;lOOQ(C[,5;m,5;mO! [Q`O,5;mOOQ(C[,5;n,5;nO*OQdO'#IWO! dQ(ChO,5<ZOIlQ&jO,5;UO!!OQ&jO,5;UO*OQdO,5;jO!!VQ!bO'#F]O!#SQ!bO'#J]O!!nQ!bO'#J]O!#ZQ!bO'#J]OOQO'#J]'#J]O!#oQ!bO,5;uOOOO,5<R,5<RO!$QQdO'#FiOOOO'#IV'#IVO4OO#tO,5;rO!$XQ!bO'#FkOOQ(C[,5;r,5;rO!$xQ7]O'#CsOOQ(C]'#Cv'#CvO!%]Q`O'#CvO!%bOWO'#CzO!&OQ&kO,5<WO!&VQ`O,5<YO!'iQMhO'#FxO!'vQ`O'#FyO!'{Q`O'#FyO!(QQMhO'#F}O!)PQ,UO'#GRO!)uQ7]O'#IwOOQ(C]'#Iw'#IwO!*xQaO'#IvO!+WQ`O'#IuO!+`Q`O'#CrOOQ(C]'#Ct'#CtOOQ(C]'#C}'#C}OOQ(C]'#DP'#DPO!+hQ`O'#DROKRQ&jO'#FpOKRQ&jO'#FrO!+mQ`O'#FtO!+rQ`O'#FuO!'{Q`O'#F{OKRQ&jO'#GQO!+wQ`O'#EaO!,`Q`O,5<XO`QdO,5>cOOQS'#Ir'#IrOOQS,5>d,5>dOOQS-E;w-E;wO!._Q(C|O,5:WOOQ(CX'#Cp'#CpO!/OQ&kO,5<}OOQO'#Cf'#CfO!/aQ(ChO'#IsO5qQ`O'#IsO:pQ`O,59XO!/rQ!bO,59XO!/zQ&jO,59XO6YQ&jO,59XO!0VQ`O,5:yO!0_Q`O'#HPO!0mQ`O'#JhO*OQdO,5;oO!0uQ,UO,5;qO!0zQ`O,5=jO!1PQ`O,5=jO!1UQ`O,5=jO5{Q(ChO,5=jO6TQ`O,5<}O!1dQ`O'#EbO!2ZQ,UO'#EcOOQ(CW'#JV'#JVO!2bQ(ChO'#JeO5{Q(ChO,5=RO8SQ`O,5=XOOQP'#Cs'#CsO!2mQ!bO,5=UO!2uQ!cO,5=VO!3QQ`O,5=XO!3VQpO,5=[O:pQ`O'#GuO6TQ`O'#GwO!3_Q`O'#GwO6YQ&jO'#GzO!3dQ`O'#GzOOQS,5=_,5=_O!3iQ`O'#G{O!3qQ`O'#CmO!3vQ`O,59OO!4QQ`O,59OO!6SQdO,59OOOQS,59O,59OO!6aQ(ChO,59OO*OQdO,59OO!6lQdO'#HSOOQS'#HT'#HTOOQS'#HU'#HUO`QdO,5=lO!6|Q`O,5=lO*OQdO'#DzO`QdO,5=rO`QdO,5=tO!7RQ`O,5=vO`QdO,5=xO!7WQ`O,5={O!7]QdO,5>ROOQS,5>X,5>XO*OQdO,5>XO5{Q(ChO,5>ZOOQS,5>],5>]O!;^Q`O,5>]OOQS,5>_,5>_O!;^Q`O,5>_OOQS,5>a,5>aO!;cQpO,59uOOOW-E;y-E;yOOQ(C[1G/`1G/`O!;hQtO,5>hO'gQdO,5>hOOQO,5>m,5>mO!;rQdO'#H|OOQO-E;z-E;zO!<PQ`O,5?hO!<XQtO,5?hO!<`Q`O,5?rOOQ(C[1G/e1G/eO!<hQ!bO'#DWOOQ(CW'#JO'#JOO*OQdO'#JOO!=VQ!bO'#JOO!=tQ!bO'#DeO!>VQ,UO'#DeO!@bQdO'#DeO!@iQ`O'#I}O!@qQ`O,5:OO!@vQ`O'#EdO!AUQ`O'#JYO!A^Q`O,5:}O!AtQ,UO'#DeO*OQdO,5?sO!BOQ`O'#IROOQO-E<P-E<PO!<`Q`O,5?rOOQ(CW1G0h1G0hO!BdQ,UO'#EOOOQ(C[,5:g,5:gO*OQdO,5:gOIlQ&jO,5:gO!C^QaO,5:gO:pQ`O,5:xO!/rQ!bO,5:xO!/zQ&jO,5:xO6YQ&jO,5:xOOQ(C[1G/p1G/pOOQ(C[1G0Q1G0QOOQ(CW'#EY'#EYO*OQdO,5?pO!CiQ(ChO,5?pO!CzQ(ChO,5?pO!DRQ`O,5?oO!DZQ`O'#ITO!DRQ`O,5?oOOQ(CW1G0g1G0gO7iQ`O,5?oOOQ(C[1G0e1G0eO!DuQ(C|O1G0eO!EwQ(CyO,5:uOOQ(C]'#Fw'#FwO!HbQ(C}O'#IwOGlQdO1G0eO!IUQ&kO'#JPO!I`Q`O,5:YO!IeQtO'#JQO*OQdO'#JQO!IoQ`O,5:_OOQ(C]'#DW'#DWOOQ(C[1G0n1G0nO*OQdO1G0nOOQ(C[1G1X1G1XO!ItQ`O1G0nO!LYQ(C|O1G0pO!LaQ(C|O1G0pO!NwQ(C|O1G0pO# OQ(C|O1G0pO##VQ(C|O1G0pO##mQ(C|O1G0pO#&dQ(C|O1G0pO#&kQ(C|O1G0pO#)RQ(C|O1G0pO#)YQ(C|O1G0pO#+QQ(C|O1G0pO#-}Q!LUO'#ChO#/{Q!LUO1G1RO#1yQ!LUO'#I{O! _Q`O1G1XO#2^Q(C|O,5>rOOQ(CW-E<U-E<UO#2}Q(C}O1G0pOOQ(C[1G0p1G0pO#5VQ(C|O1G1UO#5vQ!bO,5;yO#6OQ!bO,5;zO#6WQ!bO'#FbO#6oQ`O'#FaOOQO'#J^'#J^OOQO'#IU'#IUO#6tQ!bO1G1aOOQ(C[1G1a1G1aOOOO1G1l1G1lO#7VQ!LUO'#IzO#7aQ`O,5<TOM[QdO,5<TOOOO-E<T-E<TOOQ(C[1G1^1G1^OOQ(C[,5<V,5<VO#7fQ!bO,5<VOOQ(C],59b,59bOIlQ&jO'#C|OOOW'#Hz'#HzO#7kOWO,59fOOQ(C],59f,59fO*OQdO1G1rO!+rQ`O'#IYO#7vQ`O,5<kOOQ(C],5<h,5<hOOQO'#G^'#G^OKRQ&jO,5<wOOQO'#G`'#G`OKRQ&jO,5<yOIlQ&jO,5<{OOQO1G1t1G1tO#8RQqO'#CpO#8fQqO,5<dO#8mQ`O'#JaO6TQ`O'#JaO#8{Q`O,5<fOKRQ&jO,5<eO#9QQ`O'#FzO#9]Q`O,5<eO#9bQqO'#FwO#9oQqO'#JbO#9yQ`O'#JbOIlQ&jO'#JbO#:OQ`O,5<iOOQ(CW'#Di'#DiO#:TQ!bO'#GSO!(zQ,UO'#GSO#:fQ`O'#GUO#:kQ`O'#GWO!'{Q`O'#GZO#:pQ(ChO'#I[O#:{Q,UO,5<mOOQ(C],5<m,5<mO#;SQ,UO'#GSO#;bQ,UO'#GTO#;jQ,UO'#GTOOQ(C],5<|,5<|OKRQ&jO,5?bOKRQ&jO,5?bO#;oQ`O'#I]O#;zQ`O,5?aO#<SQ`O,59^OOQ(C]'#Ch'#ChO#<sQ&kO,59mOOQ(C],59m,59mO#=fQ&kO,5<[O#>XQ&kO,5<^O#>cQ`O,5<`OOQ(C],5<a,5<aO#>hQ`O,5<gO#>mQ&kO,5<lOGlQdO1G1sO#>}Q`O1G1sOOQS1G3}1G3}OOQ(C[1G/r1G/rO! [Q`O1G/rOOQS1G2i1G2iOIlQ&jO1G2iO*OQdO1G2iOIlQ&jO1G2iO#?SQaO1G2iO#@lQ&jO'#EZOOQ(CW,5?_,5?_O#@vQ(ChO,5?_OOQS1G.s1G.sO:pQ`O1G.sO!/rQ!bO1G.sO!/zQ&jO1G.sO#AXQ`O1G0eO#A^Q`O'#ChO#AiQ`O'#JiO#AqQ`O,5=kO#AvQ`O'#JiO#A{Q`O'#JiO#BTQ`O'#IeO#BcQ`O,5@SO#BkQtO1G1ZOOQ(C[1G1]1G1]O6TQ`O1G3UO#BrQ`O1G3UO#BwQ`O1G3UO#B|Q`O1G3UOOQS1G3U1G3UO#CRQ&kO1G2iO7iQ`O'#JWO7iQ`O'#EdO*OQdO'#EdO7iQ`O'#I_O#CdQ(ChO,5@POOQS1G2m1G2mO!3QQ`O1G2sOIlQ&jO1G2pO#CoQ`O1G2pOOQS1G2q1G2qOIlQ&jO1G2qO#CtQaO1G2qO#C|Q,UO'#GoOOQS1G2s1G2sO!(zQ,UO'#IaO!3VQpO1G2vOOQS1G2v1G2vOOQS,5=a,5=aO#DUQ&kO,5=cO6TQ`O,5=cO#:kQ`O,5=fO5qQ`O,5=fO!/rQ!bO,5=fO!/zQ&jO,5=fO6YQ&jO,5=fO#DgQ`O'#JgO#DrQ`O,5=gOOQS1G.j1G.jO#DwQ(ChO1G.jO#ESQ`O1G.jO#EXQ`O1G.jO5{Q(ChO1G.jO#EaQtO,5@UO#EkQ`O,5@UO#EvQdO,5=nO#E}Q`O,5=nO7iQ`O,5@UOOQS1G3W1G3WO`QdO1G3WOOQS1G3^1G3^OOQS1G3`1G3`O:kQ`O1G3bO#FSQdO1G3dO#I}QdO'#HcOOQS1G3g1G3gO#J[Q`O'#HiO:pQ`O'#HkOOQS1G3m1G3mO#JdQdO1G3mO5{Q(ChO1G3sOOQS1G3u1G3uOOQ(CW'#GO'#GOO5{Q(ChO1G3wO5{Q(ChO1G3yOOOW1G/a1G/aO#NbQpO,5<ZO#NjQtO1G4SOOQO1G4X1G4XO*OQdO,5>hO#NtQ`O1G5SO#N|Q`O1G5^O$ UQ`O,5?jOM[QdO,5;OO7iQ`O,5;OO:pQ`O,5:POM[QdO,5:PO*OQdO'#JOO!/rQ!bO,5:PO$ ZQ!LUO,5:POOQO,5;O,5;OO$ eQ,UO'#H}O$ {Q`O,5?iOOQ(C[1G/j1G/jO$!TQ,UO'#ISO$!_Q`O,5?tOOQ(CW1G0i1G0iO!>VQ,UO,5:PO$!gQtO1G5_O7iQ`O,5>mOOQ(CW'#EU'#EUO$!qQ(DjO'#EVO$#]Q,UO'#EPOOQO'#IQ'#IQO$#nQ,UO,5:jOOQ(C[,5:j,5:jO$$hQ,UO'#EPO$$uQ,UO'#EPO$%VQ,UO'#E]O$%YQ,UO'#EVO$%sQ,UO'#EVO$#]Q,UO'#EVO$&dQ`O1G0RO$&iQqO1G0ROOQ(C[1G0R1G0RO*OQdO1G0ROIlQ&jO1G0ROOQ(C[1G0d1G0dO:pQ`O1G0dO!/rQ!bO1G0dO!/zQ&jO1G0dO$&pQ(C|O1G5[O*OQdO1G5[O$'QQ(ChO1G5[O$'cQ`O1G5ZO7iQ`O,5>oOOQO,5>o,5>oO$'kQ`O,5>oOOQO-E<R-E<RO$'cQ`O1G5ZO$'yQ(C}O,59mO$*OQ(C}O,5<[O$,WQ(C}O,5<^O$.`Q(C}O,5<lOOQ(C[7+&P7+&PO$0nQ(C|O7+&PO$1_Q&jO'#IOO$1iQ`O,5?kOOQ(C]1G/t1G/tO$1qQdO'#IPO$2OQ`O,5?lO$2WQtO,5?lOOQ(C[1G/y1G/yO$2bQ`O7+&YOOQ(C[7+&Y7+&YO$2gQ!LUO,5:`O*OQdO7+&mO$2qQ!LUO,5:WOOQ(C[7+&s7+&sOOQO1G1e1G1eOOQO1G1f1G1fO$3OQ$ISO,5;|OM[QdO,5;{OOQO-E<S-E<SOOQ(C[7+&{7+&{OOOO7+'W7+'WOOOO1G1o1G1oO$3ZQ`O1G1oOOQ(C[1G1q1G1qO$3`QqO,59hOOOW-E;x-E;xOOQ(C]1G/Q1G/QO$3gQ(C|O7+'^OOQ(C],5>t,5>tO$4WQ`O,5>tOOQ(C]1G2V1G2VP$4]Q`O'#IYPOQ(C]-E<W-E<WO$4|Q&kO1G2cO$5oQ&kO1G2eO$5yQqO1G2gOOQ(C]1G2O1G2OO$6QQ`O'#IXO$6`Q`O,5?{O$6`Q`O,5?{O$6hQ`O,5?{O$6sQ`O,5?{OOQO1G2Q1G2QO$7RQ&kO1G2POKRQ&jO1G2PO$7cQMhO'#IZO$7sQ`O,5?|OIlQ&jO,5?|O$7{QqO,5?|OOQ(C]1G2T1G2TOOQ(CW,5<n,5<nOOQ(CW,5<o,5<oO$8VQ`O,5<oO#:aQ`O,5<oO!/rQ!bO,5<nOOQO'#GV'#GVO$8[Q`O,5<pOOQ(CW,5<r,5<rO$8VQ`O,5<uOOQO,5>v,5>vOOQO-E<Y-E<YOOQ(C]1G2X1G2XO!(zQ,UO,5<nO$8dQ`O,5<oO#:fQ`O,5<pO!(zQ,UO,5<oO$8oQ&kO1G4|O$8yQ&kO1G4|OOQO,5>w,5>wOOQO-E<Z-E<ZOOQP1G.x1G.xO!0uQ,UO,59oO*OQdO,59oO$9WQ`O1G1zOKRQ&jO1G2RO$9]Q(C|O7+'_OOQ(C[7+'_7+'_OGlQdO7+'_OOQ(C[7+%^7+%^O$9|QqO'#JcO$&dQ`O7+(TO$:WQ`O7+(TO$:`QqO7+(TOOQS7+(T7+(TOIlQ&jO7+(TO*OQdO7+(TOIlQ&jO7+(TO$:jQ(CyO'#ChO$:}Q(CyO,5<sO$;oQ`O,5<sOOQ(CW1G4y1G4yOOQS7+$_7+$_O:pQ`O7+$_O!/rQ!bO7+$_OGlQdO7+&PO$;tQ`O'#IdO$<VQ`O,5@TOOQO1G3V1G3VO6TQ`O,5@TO$<VQ`O,5@TO$<_Q`O,5@TOOQO,5?P,5?POOQO-E<c-E<cOOQ(C[7+&u7+&uO$<dQ`O7+(pO5{Q(ChO7+(pO6TQ`O7+(pO$<iQ`O7+(pO$<nQaO7+(TO$<|Q`O,5;OOOQ(CW,5>y,5>yOOQ(CW-E<]-E<]OOQS7+(_7+(_O$=RQ(CyO7+([OIlQ&jO7+([O$=]QqO7+(]OOQS7+(]7+(]OIlQ&jO7+(]O$=dQ`O'#JfO$=oQ`O,5=ZOOQO,5>{,5>{OOQO-E<_-E<_OOQS7+(b7+(bO$>rQ,UO'#GxOOQS1G2}1G2}OIlQ&jO1G2}O*OQdO1G2}OIlQ&jO1G2}O$>yQaO1G2}O$?XQ&kO1G2}O5{Q(ChO1G3QO#:kQ`O1G3QO5qQ`O1G3QO!/rQ!bO1G3QO!/zQ&jO1G3QO$?jQ`O'#IcO$?uQ`O,5@RO$?}Q,UO,5@ROOQ(CW1G3R1G3ROOQS7+$U7+$UO$@VQ`O7+$UO5{Q(ChO7+$UO$@[Q`O7+$UO*OQdO1G5pO*OQdO1G5qO$@aQdO1G3YO$@hQ`O1G3YO$@mQdO1G3YO$@tQ(ChO1G5pOOQS7+(r7+(rO5{Q(ChO7+(|O`QdO7+)OOOQS'#Jl'#JlOOQS'#If'#IfO$AOQdO,5=}OOQS,5=},5=}O*OQdO'#HdO$A]Q`O'#HfOOQS,5>T,5>TO7iQ`O,5>TOOQS,5>V,5>VOOQS7+)X7+)XOOQS7+)_7+)_OOQS7+)c7+)cOOQS7+)e7+)eO$AbQ!bO1G5UO$AvQ!LUO1G0jO$BQQ`O1G0jOOQO1G/k1G/kO$B]Q!LUO1G/kO$BgQ`O,5?jO:pQ`O1G/kOM[QdO'#DeOOQO,5>i,5>iOOQO-E;{-E;{OOQO,5>n,5>nOOQO-E<Q-E<QO!/rQ!bO1G/kO:pQ`O,5:kOOQO,5:q,5:qO*OQdO,5:qO$BlQ(ChO,5:qO$BwQ(ChO,5:qO!/rQ!bO,5:kOOQO-E<O-E<OOOQ(C[1G0U1G0UO$#]Q,UO,5:kO$CVQ,UO,5:kO$CdQ(DjO,5:qO$DOQ,UO,5:kO$#]Q,UO,5:qOOQO,5:w,5:wO$D`Q,UO,5:qO$DyQ(ChO,5:qOOQ(C[7+%m7+%mO$&dQ`O7+%mO$&iQqO7+%mOOQ(C[7+&O7+&OO:pQ`O7+&OO!/rQ!bO7+&OO$E_Q(C|O7+*vO*OQdO7+*vOOQO1G4Z1G4ZO7iQ`O1G4ZO$EoQ`O7+*uO$EwQ(C}O1G2cO$HPQ(C}O1G2eO$JXQ(C}O1G2PO$LgQ&kO,5>jOOQO-E;|-E;|O$LqQtO,5>kO*OQdO,5>kOOQO-E;}-E;}O$L{Q`O1G5WOOQ(C[<<It<<ItO$MTQ!LUO1G0eO% _Q!LUO1G0pO% fQ!LUO1G0pO%#jQ!LUO1G0pO%#qQ!LUO1G0pO%%fQ!LUO1G0pO%%|Q!LUO1G0pO%(aQ!LUO1G0pO%(hQ!LUO1G0pO%*lQ!LUO1G0pO%*sQ!LUO1G0pO%,kQ!LUO1G0pO%-OQ(C|O<<JXO%.QQ!LVO1G0pO%/vQ!LVO'#IwO%0QQ!LUO1G1UOM[QdO'#FdOOQO'#J_'#J_OOQO1G1h1G1hO%0_Q`O1G1gO%0dQ!LUO,5>rOOOO7+'Z7+'ZOOOW1G/S1G/SOOQ(C]1G4`1G4`OKRQ&jO7+(RO%0nQ`O,5>sO6TQ`O,5>sOOQO-E<V-E<VO%0|Q`O1G5gO%0|Q`O1G5gO%1UQ`O1G5gO%1aQ&kO7+'kO%1qQqO,5>uO%1{Q`O,5>uOIlQ&jO,5>uOOQO-E<X-E<XO%2QQqO1G5hO%2[Q`O1G5hOOQ(CW1G2Z1G2ZO$8VQ`O1G2ZOOQ(CW1G2Y1G2YO%2dQ`O1G2[OIlQ&jO1G2[OOQ(CW1G2a1G2aO!/rQ!bO1G2YO#:aQ`O1G2ZO%2iQ`O1G2[O%2qQ`O1G2ZOKRQ&jO7+*hOOQ(C]1G/Z1G/ZO%2|Q`O1G/ZOOQ(C]7+'f7+'fO%3RQ&kO7+'mO%3cQ(C|O<<JyOOQ(C[<<Jy<<JyOIlQ&jO'#I^O%4SQ`O,5?}OOQS<<Ko<<KoOIlQ&jO<<KoO$&dQ`O<<KoO%4[Q`O<<KoO%4dQqO<<KoOIlQ&jO1G2_OOQS<<Gy<<GyO:pQ`O<<GyO%4nQ(C|O<<IkOOQ(C[<<Ik<<IkOOQO,5?O,5?OO%5_Q`O,5?OO%5dQ`O,5?OOOQO-E<b-E<bO%5lQ`O1G5oO%5lQ`O1G5oO6TQ`O1G5oO%5tQ`O<<L[OOQS<<L[<<L[O%5yQ`O<<L[O5{Q(ChO<<L[O*OQdO<<KoOIlQ&jO<<KoO%6OQ`O1G0jOOQS<<Kv<<KvO$=RQ(CyO<<KvOOQS<<Kw<<KwO$=]QqO<<KwO%6TQ,UO'#I`O%6`Q`O,5@QOM[QdO,5@QOOQS1G2u1G2uO%6hQ(DjO'#JOO%7SQdO'#JOO%7ZQ(ChO'#EVO$!qQ(DjO'#EVO$#fQ,UO'#GyOOQO'#Ib'#IbO%7oQ,UO,5=dOOQS,5=d,5=dO%7vQ,UO'#EVO%8XQ,UO'#EVO%8oQ,UO'#EVO%9]Q,UO'#GyO%9nQ`O7+(iO%9sQ`O7+(iO%9{QqO7+(iOOQS7+(i7+(iOIlQ&jO7+(iO*OQdO7+(iOIlQ&jO7+(iO%:VQaO7+(iOOQS7+(l7+(lO5{Q(ChO7+(lO#:kQ`O7+(lO5qQ`O7+(lO!/rQ!bO7+(lO%:eQ`O,5>}OOQO-E<a-E<aOOQO'#G|'#G|O%:pQ`O1G5mO5{Q(ChO<<GpOOQS<<Gp<<GpO%:xQ`O<<GpO%:}Q`O7++[O%;SQ`O7++]OOQS7+(t7+(tO%;XQ`O7+(tO%;^QdO7+(tO%;eQ`O7+(tO*OQdO7++[O*OQdO7++]OOQS<<Lh<<LhOOQS<<Lj<<LjOOQS-E<d-E<dOOQS1G3i1G3iO%;jQ`O,5>OOOQS,5>Q,5>QO%;oQ`O1G3oO7iQ`O7+&UOM[QdO7+&UOOQ(CW1G5U1G5UOOQO7+%V7+%VO%;tQ!LUO1G5_O:pQ`O7+%VOOQO1G0V1G0VO%<OQ(C|O1G0]OOQO1G0]1G0]O*OQdO1G0]O%<YQ(ChO1G0]O:pQ`O1G0VO!/rQ!bO1G0VO$#]Q,UO1G0VO%<eQ(ChO1G0]O%<sQ,UO1G0VO%=QQ(ChO1G0]O%=fQ(DjO1G0]O%=pQ,UO1G0VO$#]Q,UO1G0]OOQ(C[<<IX<<IXOOQ(C[<<Ij<<IjO:pQ`O<<IjO%>QQ(C|O<<NbOOQO7+)u7+)uO%>bQ(C}O7+'kO%@pQ(C}O7+'mO%COQtO1G4VO%CYQ!LUO7+&PO%DOQ!LVO,59mO%FSQ!LVO,5<[O%HZQ!LVO,5<^O%I|Q!LVO,5<lO%KrQ!LUO7+'^O%LPQ!LUO7+'_O%L^Q`O,5<OOOQO7+'R7+'RO%LcQ&kO<<KmOOQO1G4_1G4_O%LjQ`O1G4_O%LuQ`O1G4_O%MTQ`O7++RO%MTQ`O7++ROIlQ&jO1G4aO%M]QqO1G4aO%MgQ`O7++SOOQ(CW7+'u7+'uO$8VQ`O7+'vO%MoQqO7+'vOOQ(CW7+'t7+'tO$8VQ`O7+'uO%MvQ`O7+'vOIlQ&jO7+'vO#:aQ`O7+'uO%M{Q&kO<<NSOOQ(C]7+$u7+$uO%NVQqO,5>xOOQO-E<[-E<[O$&dQ`OANAZOOQSANAZANAZOIlQ&jOANAZO%NaQ(CyO7+'yOOQSAN=eAN=eO6TQ`O1G4jOOQO1G4j1G4jO%NqQ`O1G4jO%NvQ`O7++ZO%NvQ`O7++ZO5{Q(ChOANAvO& OQ`OANAvOOQSANAvANAvO& TQ`OANAZO& ]QqOANAZOOQSANAbANAbOOQSANAcANAcO& gQ`O,5>zOOQO-E<^-E<^O& rQ!LUO1G5lO#:kQ`O,5=eO5qQ`O,5=eO&$SQtO'#ChO!/rQ!bO,5=eOOQO-E<`-E<`OOQS1G3O1G3OO%7SQdO,5<pO%6hQ(DjO,5=eO$CdQ(DjO,5:qO$#fQ,UO,5=eO&$^Q,UO,5=eO&$oQ,UO,5:qOOQS<<LT<<LTOIlQ&jO<<LTO%9nQ`O<<LTO&%VQ`O<<LTO&%_QqO<<LTO*OQdO<<LTOIlQ&jO<<LTOOQS<<LW<<LWO5{Q(ChO<<LWO#:kQ`O<<LWO5qQ`O<<LWO&%iQ,UO1G4iO&%qQ`O7++XOOQSAN=[AN=[O5{Q(ChOAN=[OOQS<<Nv<<NvOOQS<<Nw<<NwOOQS<<L`<<L`O&%yQ`O<<L`O&&OQdO<<L`O&&VQ`O<<NvO&&[Q`O<<NwOOQS1G3j1G3jO:pQ`O7+)ZO&&aQ`O<<IpO&&lQ!LUO<<IpOOQO<<Hq<<HqOOQO7+%w7+%wO%<OQ(C|O7+%wO*OQdO7+%wOOQO7+%q7+%qO:pQ`O7+%qO!/rQ!bO7+%qO&&vQ(ChO7+%wO$#]Q,UO7+%qO&'RQ(ChO7+%wO&'aQ,UO7+%qO&'nQ(ChO7+%wOOQ(C[AN?UAN?UO&(SQ!LUO<<JXO&(aQ!LVO1G2PO&*kQ!LVO1G2cO&,rQ!LVO1G2eO&.eQ!LUO<<JyO&.rQ!LUO<<IkOOQO1G1j1G1jOKRQ&jOANAXOOQO7+)y7+)yO&/PQ`O7+)yO&/[Q`O<<NmO&/dQqO7+){OOQ(CW<<Kb<<KbO$8VQ`O<<KbOOQ(CW<<Ka<<KaO&/nQqO<<KbO$8VQ`O<<KaOOQSG26uG26uO$&dQ`OG26uOOQO7+*U7+*UO6TQ`O7+*UO&/uQ`O<<NuOOQSG27bG27bO5{Q(ChOG27bOIlQ&jOG26uOM[QdO1G4fO&/}Q`O7++WO5{Q(ChO1G3PO#:kQ`O1G3PO5qQ`O1G3PO!/rQ!bO1G3PO$#fQ,UO1G3PO%6hQ(DjO1G3PO%=fQ(DjO1G0]O&0VQ,UO1G3PO%9nQ`OANAoOOQSANAoANAoOIlQ&jOANAoO&0hQ`OANAoO&0pQqOANAoOOQSANArANArO5{Q(ChOANArO#:kQ`OANArOOQO'#G}'#G}OOQO7+*T7+*TOOQSG22vG22vOOQSANAzANAzO&0zQ`OANAzOOQSANDbANDbOOQSANDcANDcOOQS<<Lu<<LuOM[QdOAN?[OOQO<<Ic<<IcO%<OQ(C|O<<IcOOQO<<I]<<I]O:pQ`O<<I]O*OQdO<<IcO!/rQ!bO<<I]O&1PQ(ChO<<IcO$#]Q,UO<<I]O&1[Q(ChO<<IcO&1jQ!LVO7+'kO&3`Q!LVO7+'mO&5UQ&kOG26sOOQO<<Me<<MeOOQ(CWAN@|AN@|O$8VQ`OAN@|OOQ(CWAN@{AN@{OOQSLD,aLD,aOOQO<<Mp<<MpOOQSLD,|LD,|O$&dQ`OLD,aO&5fQ!LUO7+*QOOQO7+(k7+(kO5{Q(ChO7+(kO#:kQ`O7+(kO5qQ`O7+(kO!/rQ!bO7+(kO$#fQ,UO7+(kOOQSG27ZG27ZO%9nQ`OG27ZOIlQ&jOG27ZOOQSG27^G27^O5{Q(ChOG27^OOQSG27fG27fO&5pQ!LUOG24vOOQOAN>}AN>}OOQOAN>wAN>wO%<OQ(C|OAN>}O:pQ`OAN>wO*OQdOAN>}O!/rQ!bOAN>wO&5zQ(ChOAN>}O&6VQ(C}OG26sOOQ(CWG26hG26hOOQS!$( {!$( {OOQO<<LV<<LVO5{Q(ChO<<LVO#:kQ`O<<LVO5qQ`O<<LVO!/rQ!bO<<LVOOQSLD,uLD,uO%9nQ`OLD,uOOQSLD,xLD,xOOQOG24iG24iOOQOG24cG24cO%<OQ(C|OG24iO:pQ`OG24cO*OQdOG24iO&8vQ7]O,5:uOOQOANAqANAqO5{Q(ChOANAqO#:kQ`OANAqO5qQ`OANAqOOQS!$(!a!$(!aOOQOLD*TLD*TOOQOLD)}LD)}O%<OQ(C|OLD*TO&9vQ!LVOG26sO&;lQ7]O,59mO&<iQ7]O,5<[O&=fQ7]O,5<^O&>cQ7]O,5<lOOQOG27]G27]O5{Q(ChOG27]O#:kQ`OG27]OOQO!$'Mo!$'MoO&?cQ7]O1G2cO&@`Q7]O1G2eO&A]Q7]O1G2POOQOLD,wLD,wO5{Q(ChOLD,wO&B]Q7]O7+'kO&C]Q7]O7+'mOOQO!$(!c!$(!cO&D]Q7]OG26sOM[QdO'#DtO&E]QtO'#IzOM[QdO'#DlO&EdQ(C|O'#ChO&E}QtO'#ChO&F_QdO,5:yO&H_Q&jO'#EZOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO,5;UOM[QdO'#IWO&IoQ`O,5<ZO&IwQ&jO,5;UO&KXQ&jO,5;UOM[QdO,5;jO!+hQ`O'#DRO!+hQ`O'#DRO!+hQ`O'#DROIlQ&jO'#FpO&H_Q&jO'#FpO&IwQ&jO'#FpOIlQ&jO'#FrO&H_Q&jO'#FrO&IwQ&jO'#FrOIlQ&jO'#GQO&H_Q&jO'#GQO&IwQ&jO'#GQOM[QdO,5?sO&F_QdO1G0eO&K`Q!LUO'#ChOM[QdO1G1rOIlQ&jO,5<wO&H_Q&jO,5<wO&IwQ&jO,5<wOIlQ&jO,5<yO&H_Q&jO,5<yO&IwQ&jO,5<yOIlQ&jO,5<eO&H_Q&jO,5<eO&IwQ&jO,5<eO&F_QdO1G1sOM[QdO7+&mOIlQ&jO1G2PO&H_Q&jO1G2PO&IwQ&jO1G2POIlQ&jO1G2RO&H_Q&jO1G2RO&IwQ&jO1G2RO&F_QdO7+'_O&F_QdO7+&PO&KjQ`O7+'vOIlQ&jOANAXO&H_Q&jOANAXO&IwQ&jOANAXO&KjQ`O<<KbO&KjQ`OAN@|O&KoQ`O'#E_O&KtQ`O'#E_O&K|Q`O'#FOO&LRQ`O'#EjO&LWQ`O'#JXO&LcQ`O'#JVO&LnQ`O,5:yO&LsQ&kO,5<WO&LzQ`O'#FyO&MPQ`O'#FyO&MUQ`O'#FyO&MZQ`O,5<XO&McQ`O,5:yO&MkQ!LUO1G1RO&MrQ`O,5<eO&MwQ`O,5<eO&M|Q`O,5<eO&NRQ`O,5<gO&NWQ`O,5<gO&N]Q`O,5<gO&NbQ`O1G1sO&NgQ`O1G0eO&NlQ`O1G2[O&NqQ&kO<<KmO&NxQ&kO<<KmO' PQ&kO<<KmO' WQqO7+'vO' _Q`O7+'vO' dQqO<<KbO4^Q&jO'#FnO5qQ`O'#FmOC]Q`O'#E^OM[QdO,5;gO!'{Q`O'#FyO!'{Q`O'#FyO!'{Q`O'#FyO!'{Q`O'#F{O!'{Q`O'#F{O!'{Q`O'#F{O' kQ`O,5<pOKRQ&jO7+(ROKRQ&jO7+(ROKRQ&jO7+(ROIlQ&jO1G2[O' sQ`O1G2[OIlQ&jO7+'vO$5yQqO1G2gO$5yQqO1G2gO$5yQqO1G2gOIlQ&jO,5<{OIlQ&jO,5<{OIlQ&jO,5<{",
            stateData: "'!v~O'aOS'bOSTOSUOS~OQTORTOXyO]cO_hObnOcmOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!VSO!akO!fUO!iTO!jTO!kTO!lTO!mTO!plO#hsO#xpO#|^O%WqO%YtO%[rO%]rO%`uO%bvO%ewO%fwO%hxO%uzO%{{O%}|O&P}O&R!OO&U!PO&[!QO&b!RO&d!SO&f!TO&h!UO&j!VO'dPO'lQO'uYO(SaO~OQ[XZ[X_[Xk[Xx[Xy[X{[X!T[X!c[X!d[X!f[X!l[X#O[X#ZdX#_[X#`[X#a[X#b[X#c[X#d[X#e[X#f[X#g[X#i[X#k[X#m[X#n[X#s[X'_[X'l[X'v[X'}[X(O[X~O!_$rX~P$zOS!WO']!XO'^!ZO~OQTORTO]cOb!kOc!jOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!V!bO!akO!fUO!iTO!jTO!kTO!lTO!mTO!p!iO#x!lO#|^O'd![O'lQO'uYO(SaO~O!S!`O!T!]O!Q'pP!Q'zP~P'gO!U!mO~P`OQTORTO]cOb!kOc!jOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!V!bO!akO!fUO!iTO!jTO!kTO!lTO!mTO!p!iO#x!lO#|^O'd9|O'lQO'uYO(SaO~OQTORTO]cOb!kOc!jOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!V!bO!akO!fUO!iTO!jTO!kTO!lTO!mTO!p!iO#x!lO#|^O'lQO'uYO(SaO~O!S!rO#X!uO#Y!rO'd9}O!e'wP~P,OO#Z!vO~O!_!wO#Z!vO~OQ#_OZ#fOk#SOx!{Oy!|O{!}O!T#cO!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO#k#XO#m#ZO#n#[O'lQO'v#]O'}#OO(O#PO~O_'nX'_'nX!e'nX!Q'nX!V'nX%X'nX!_'nX~P.mO#O#gO#s#gOQ'oXZ'oX_'oXk'oXx'oXy'oX{'oX!T'oX!c'oX!d'oX!f'oX!l'oX#_'oX#`'oX#a'oX#b'oX#c'oX#d'oX#e'oX#f'oX#i'oX#k'oX#m'oX#n'oX'l'oX'v'oX'}'oX(O'oX~O#g'oX'_'oX!Q'oX!e'oXo'oX!V'oX%X'oX!_'oX~P1QO#O#gO~O$O#iO$Q#hO$X#nO~O!V#oO#|^O$[#pO$^#rO~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv$XO{#}O!V$OO!a$^O!f#zO#Y$_O#x$[O$e$YO$g$ZO$j$]O'd#tO'h$TO'l#wOe'iP~O!f$`O~O!_$bO~O_$cO'_$cO~O'd$gO~O!f$`O'd$gO'e$iO'h$TO~Oc$oO!f$`O'd$gO~O#g#UO~O]$xOx$tO!V$qO!f$sO%Y$wO'd$gO'e$iO^([P~O!p$yO~O{$zO!V${O'd$gO~O{$zO!V${O%b%PO'd$gO~O'd%QO~O#hsO%YtO%[rO%]rO%`uO%bvO%ewO%fwO~Ob%ZOc%YO!p%WO%W%XO%j%VO~P8XOb%^OcmO!V%]O!plO#hsO%WqO%[rO%]rO%`uO%bvO%ewO%fwO%hxO~O`%aO#O%dO%Y%_O'e$iO~P9WO!f%eO!i%iO~O!f%jO~O!VSO~O_$cO'[%rO'_$cO~O_$cO'[%uO'_$cO~O_$cO'[%wO'_$cO~OS!WO']!XO'^%{O~OQ[XZ[Xk[Xx[Xy[X{[X!T[X!TdX!c[X!d[X!f[X!l[X#O[X#OdX#ZdX#_[X#`[X#a[X#b[X#c[X#d[X#e[X#f[X#g[X#i[X#k[X#m[X#n[X#s[X'l[X'v[X'}[X(O[X~O!Q[X!QdX~P;sO!S%}O!Q&pX!Q&uX!T&pX!T&uX~P'gO!T&PO!Q'pX~OQ#_OZ#fOk#SOx!{Oy!|O{!}O!T&PO!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO#k#XO#m#ZO#n#[O'lQO'v#]O'}#OO(O#PO~O!Q'pX~P>sO!Q&UO~O]&YOl&YO{&XO!S&]O!Y&cO!Z&[O![&[O'e$iO'm&VO!U'qP!U'|P~O!Q'yX!T'yX!_'yX!e'yX'v'yX~O#O'yX#Z#SX!U'yX~PAnO#O&dO!Q'{X!T'{X~O!T&eO!Q'zX~O!Q&hO~O#O#gO~PAnOP&lO!V&iO!q&kO'd$gO~Oc&qO!f$`O'd$gO~Ox$tO!f$sO~O!U&rO~P`Ox!{Oy!|O{!}O!d!yO!f!zO'lQOQ!haZ!hak!ha!T!ha!c!ha!l!ha#_!ha#`!ha#a!ha#b!ha#c!ha#d!ha#e!ha#f!ha#g!ha#i!ha#k!ha#m!ha#n!ha'v!ha'}!ha(O!ha~O_!ha'_!ha!Q!ha!e!hao!ha!V!ha%X!ha!_!ha~PCwO!e&sO~O!_!wO#O&uO'v&tO!T'xX_'xX'_'xX~O!e'xX~PFdO!T&yO!e'wX~O!e&{O~O{$zO!V${O#Y&|O'd$gO~OQTORTO]cOb!kOc!jOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!VSO!akO!fUO!iTO!jTO!kTO!lTO!mTO!p!iO#x!lO#|^O'd9|O'lQO'uYO(SaO~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv:bO{#}O!V$OO!a<RO!f#zO#Y:kO#x$[O$e:eO$g:hO$j$]O'd'QO'h$TO'l#wO~O#Z'SO~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv$XO{#}O!V$OO!a$^O!f#zO#Y$_O#x$[O$e$YO$g$ZO$j$]O'd'QO'h$TO'l#wO~Oe'sP~PKRO!S'WO!e'tP~P*OO'm'YO'uYO~O{'[O!f!zO'm'YO'uYO~OQ9yOR9yO]cOb;|Oc!jOicOk9yOlcOmcOrcOt9yOv9yO{RO!OcO!PcO!V!bO!a9{O!fUO!i9yO!j9yO!k9yO!l9yO!m9yO!p!iO#x!lO#|^O'd'jO'lQO'uYO(S;zO~Oy'mO!f!zO~O!T#cO_$ca'_$ca!e$ca!Q$ca!V$ca%X$ca!_$ca~O#h'qO~PIlOx'tO!_'sO!V$PX#{$PX$O$PX$Q$PX$X$PX~O!_'sO!V(PX#{(PX$O(PX$Q(PX$X(PX~Ox'tO~P!!nOx'tO!V(PX#{(PX$O(PX$Q(PX$X(PX~O!V'vO#{'zO$O'uO$Q'uO$X'{O~O!S(OO~PM[O$O#iO$Q#hO$X(RO~OP$kXx$kX{$kX!d$kX'}$kX(O$kX~OPgXegXe$kX!TgX#OgX~P!$dOl(TO~OS(UO'](VO'^(XO~OP(bOx(ZO{([O'}(^O(O(`O~Oe(YO~P!%mOe(cO~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv:bO{#}O!V$OO!a<RO!f#zO#Y:kO#x$[O$e:eO$g:hO$j$]O'h$TO'l#wO~O!S(gO'd(dO!e(TP~P!&[O#Z(iO~O!f(jO~O!S(oO'd(lO!Q(UP~P!&[Ok(|O{(tO!Y(zO!Z(sO![(sO!f(jO!z({O%O(vO'e$iO'm(qO~O!U(yO~P!(_O!d!yOP'kXx'kX{'kX'}'kX(O'kX!T'kX#q'kX!U'kX~Oe'kX#O'kX]'kXl'kX!Y'kX!Z'kX!['kX!t'kX!u'kX!v'kX!z'kX!{'kX'e'kX'm'kX'u'kX~P!)WOP)PO#O)OOe'jX!T'jX~O!T)QOe'iX~O'd%QOe'iP~O'd)TO~O!f)YO~O'd'QO~O{$zO!S!rO!V${O#X!uO#Y!rO'd$gO!e'wP~O!_!wO#Z)^O~OQ#_OZ#fOk#SOx!{Oy!|O{!}O!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO#k#XO#m#ZO#n#[O'lQO'v#]O'}#OO(O#PO~O_!`a!T!`a'_!`a!Q!`a!e!`ao!`a!V!`a%X!`a!_!`a~P!,hOP)fO!V&iO!q)eO%X)dO'h$TO~O!_)hO!V'gX_'gX!T'gX'_'gX~O!f$`O'h$TO~O!f$`O'd$gO'h$TO~O!_!wO#Z'SO~O])sO%Y)tO'd)pO!U(]P~O!T)uO^([X~O'm'YO~OZ)yO~O^)zO~O!V$qO'd$gO'e$iO^([P~O{$zO!S*PO!T&eO!V${O'd$gO!Q'zP~O]&`Ol&`O{*RO!S*QO'm'YO~O!U'|P~P!1xO!T*SO_(XX'_(XX~O#O*WO'h$TO~OP*ZO!V$OO'h$TO~O!V*]O~Ox*_O!VSO~O!p*dO~Oc*iO~O'd)TO!U(ZP~Oc$oO~O%YtO'd%QO~P9WOZ*oO^*nO~OQTORTO]cObnOcmOicOkTOlcOmcOrcOtTOvTO{RO!OcO!PcO!akO!fUO!iTO!jTO!kTO!lTO!mTO!plO#|^O%WqO'lQO'uYO(SaO~O!V!bO#x!lO'd9|O~P!4YO^*nO_$cO'_$cO~O_*sO#h*uO%[*uO%]*uO~P*OO!f%eO~O%{*zO~O!V*|O~O&^+OO&`+POQ&ZaR&ZaX&Za]&Za_&Zab&Zac&Zai&Zak&Zal&Zam&Zar&Zat&Zav&Za{&Za!O&Za!P&Za!V&Za!a&Za!f&Za!i&Za!j&Za!k&Za!l&Za!m&Za!p&Za#h&Za#x&Za#|&Za%W&Za%Y&Za%[&Za%]&Za%`&Za%b&Za%e&Za%f&Za%h&Za%u&Za%{&Za%}&Za&P&Za&R&Za&U&Za&[&Za&b&Za&d&Za&f&Za&h&Za&j&Za'Z&Za'd&Za'l&Za'u&Za(S&Za!U&Za&S&Za`&Za&X&Za~O'd+UO~Oo+XO~O!Q&pa!T&pa~P!,hO!S+]O!Q&pX!T&pX~P*OO!T&PO!Q'pa~O!Q'pa~P>sO!T&eO!Q'za~O!TzX!T!]X!UzX!U!]X!_zX!_!]X!f!]X#OzX'h!]X~O!_+bO#O+aO!T#WX!T'rX!U#WX!U'rX!_'rX!f'rX'h'rX~O!_+dO!f$`O'h$TO!T!XX!U!XX~O]&WOl&WO{+eO'm(qO~OQ9yOR9yO]cOb;|Oc!jOicOk9yOlcOmcOrcOt9yOv9yO{RO!OcO!PcO!V!bO!a9{O!fUO!i9yO!j9yO!k9yO!l9yO!m9yO!p!iO#x!lO#|^O'lQO'uYO(S;zO~O'd:pO~P!>eO!T+iO!U'qX~O!U+kO~O!_+bO#O+aO!T#WX!U#WX~O!T+lO!U'|X~O!U+nO~O]&WOl&WO{+eO'e$iO'm(qO~O!Z+oO![+oO~P!AcO{$zO!S+qO!V${O'd$gO!Q&uX!T&uX~O_+uO!U+wO!Y+xO!Z+tO![+tO!t+|O!u+zO!v+{O!w+yO!z+}O!{+}O'u+rO~P!AcOP,SO!V&iO!q,RO~O#O,YO!T'xa!e'xa_'xa'_'xa~O!_!wO~P!CiO!T&yO!e'wa~O{$zO!S,]O!V${O#X,_O#Y,]O'd$gO!T&wX!e&wX~O_#Ri!T#Ri'_#Ri!Q#Ri!e#Rio#Ri!V#Ri%X#Ri!_#Ri~P!,hOP<`Ox(ZO{([O'}(^O(O(`O~O#Z!}a!T!}a!e!}a#O!}a!V!}a_!}a'_!}a!Q!}a~P!EfO!d!yOP'kXx'kX{'kX'}'kX(O'kXQ'kXZ'kXk'kXy'kX!T'kX!c'kX!f'kX!l'kX#_'kX#`'kX#a'kX#b'kX#c'kX#d'kX#e'kX#f'kX#g'kX#i'kX#k'kX#m'kX#n'kX'l'kX'v'kX~O#Z'kX_'kX'_'kX!e'kX!Q'kX!V'kX#O'kXo'kX%X'kX!_'kX~P!FeO!T,hOe'sX~P!%mOe,jO~O!T,kO!e'tX~P!,hO!e,nO~O!Q,pO~OQ#_Ox!{Oy!|O{!}O!d!yO!f!zO!l#_O'lQOZ#^i_#^ik#^i!T#^i!c#^i#`#^i#a#^i#b#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i'_#^i'v#^i'}#^i(O#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~O#_#^i~P!IyO#_#QO~P!IyOQ#_Ox!{Oy!|O{!}O!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO'lQOZ#^i_#^i!T#^i!c#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i'_#^i'v#^i'}#^i(O#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~Ok#^i~P!LhOk#SO~P!LhOQ#_Ok#SOx!{Oy!|O{!}O!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO'lQO_#^i!T#^i#i#^i#k#^i#m#^i#n#^i'_#^i'v#^i'}#^i(O#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~OZ#^i!c#^i#d#^i#e#^i#f#^i#g#^i~P# VOZ#fO!c#UO#d#UO#e#UO#f#eO#g#UO~P# VOQ#_OZ#fOk#SOx!{Oy!|O{!}O!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO'lQO_#^i!T#^i#k#^i#m#^i#n#^i'_#^i'v#^i(O#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~O'}#^i~P#$TO'}#OO~P#$TOQ#_OZ#fOk#SOx!{Oy!|O{!}O!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO#k#XO'lQO'}#OO_#^i!T#^i#m#^i#n#^i'_#^i'v#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~O(O#^i~P#&rO(O#PO~P#&rOQ#_OZ#fOk#SOx!{Oy!|O{!}O!c#UO!d!yO!f!zO!l#_O#_#QO#`#RO#a#RO#b#RO#c#TO#d#UO#e#UO#f#eO#g#UO#i#VO#k#XO#m#ZO'lQO'}#OO(O#PO~O_#^i!T#^i#n#^i'_#^i'v#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~P#)aOQ[XZ[Xk[Xx[Xy[X{[X!c[X!d[X!f[X!l[X#O[X#ZdX#_[X#`[X#a[X#b[X#c[X#d[X#e[X#f[X#g[X#i[X#k[X#m[X#n[X#s[X'l[X'v[X'}[X(O[X!T[X!U[X~O#q[X~P#+wOQ#_OZ:`Ok:SOx!{Oy!|O{!}O!c:UO!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO#c:TO#d:UO#e:UO#f:_O#g:UO#i:VO#k:XO#m:ZO#n:[O'lQO'v#]O'}#OO(O#PO~O#q,rO~P#.UOQ'oXZ'oXk'oXx'oXy'oX{'oX!c'oX!d'oX!f'oX!l'oX#_'oX#`'oX#a'oX#b'oX#c'oX#d'oX#e'oX#f'oX#i'oX#k'oX#m'oX#n'oX'l'oX'v'oX'}'oX(O'oX!T'oX~O#O:aO#s:aO#g'oX#q'oX!U'oX~P#0SO_&za!T&za'_&za!e&zao&za!Q&za!V&za%X&za!_&za~P!,hOQ#^iZ#^i_#^ik#^iy#^i!T#^i!c#^i!d#^i!f#^i!l#^i#_#^i#`#^i#a#^i#b#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i'_#^i'l#^i'v#^i!Q#^i!e#^io#^i!V#^i%X#^i!_#^i~P!EfO_#ri!T#ri'_#ri!Q#ri!e#rio#ri!V#ri%X#ri!_#ri~P!,hO$O,uO$Q,uO~O$O,vO$Q,vO~O!_'sO#O,wO!V$UX#{$UX$O$UX$Q$UX$X$UX~O!S,xO~O!V'vO#{,zO$O'uO$Q'uO$X,{O~O!T:]O!U'nX~P#.UO!U,|O~O$X-OO~OS(UO'](VO'^-RO~O]-UOl-UO!Q-VO~O!TdX!_dX!edX!e$kX'vdX~P!$dO!e-]O~P!EfO!T-^O!_!wO'v&tO!e(TX~O!e-cO~O!S(gO'd$gO!e(TP~O#Z-eO~O!Q$kX!T$kX!_$rX~P!$dO!T-fO!Q(UX~P!EfO!_-hO~O!Q-jO~Ok-nO!_!wO!f$`O'h$TO'v&tO~O'd-pO~O!_)hO~O_$cO!T-tO'_$cO~O!U-vO~P!(_O!Z-wO![-wO'e$iO'm(qO~O{-yO'm(qO~O!z-zO~O'd%QOe'PX!T'PX~O!T)QOe'ia~Oe.PO~Ox.QOy.QO{.ROPua'}ua(Oua!Tua#Oua~Oeua#qua~P#<XOx(ZO{([OP$da'}$da(O$da!T$da#O$da~Oe$da#q$da~P#<}Ox(ZO{([OP$fa'}$fa(O$fa!T$fa#O$fa~Oe$fa#q$fa~P#=pO].SO~O#Z.TO~Oe$ta!T$ta#O$ta#q$ta~P!%mO#Z.WO~OP.aO!V&iO!q.`O%X._O~O]#uOk#vOl#uOm#uOr$VOt$WOv:bO{#}O!V$OO!a<RO!f#zO#Y:kO#x$[O$e:eO$g:hO$j$]O'h$TO'l#wO~Oi.cO'd.bO~P#?bO!_)hO!V'ga_'ga!T'ga'_'ga~O#Z.iO~OZ[X!TdX!UdX~O!T.jO!U(]X~O!U.lO~OZ.mO~O].oO'd)pO~O!V$qO'd$gO^'XX!T'XX~O!T)uO^([a~O!e.rO~P!,hO].tO~OZ.uO~O^.vO~OP.aO!V&iO!q.`O%X._O'h$TO~O!T*SO_(Xa'_(Xa~O#O.}O~OP/QO!V$OO~O'm'YO!U(YP~OP/[O!V/WO!q/ZO%X/YO'h$TO~OZ/fO!T/dO!U(ZX~O!U/gO~O^/iO_$cO'_$cO~O]/jO~O]/kO'd)TO~O#g/lO%y/mO~P1QO#O#gO#g/lO%y/mO~O_/nO~P*OO_/pO~O&S/tOQ&QiR&QiX&Qi]&Qi_&Qib&Qic&Qii&Qik&Qil&Qim&Qir&Qit&Qiv&Qi{&Qi!O&Qi!P&Qi!V&Qi!a&Qi!f&Qi!i&Qi!j&Qi!k&Qi!l&Qi!m&Qi!p&Qi#h&Qi#x&Qi#|&Qi%W&Qi%Y&Qi%[&Qi%]&Qi%`&Qi%b&Qi%e&Qi%f&Qi%h&Qi%u&Qi%{&Qi%}&Qi&P&Qi&R&Qi&U&Qi&[&Qi&b&Qi&d&Qi&f&Qi&h&Qi&j&Qi'Z&Qi'd&Qi'l&Qi'u&Qi(S&Qi!U&Qi`&Qi&X&Qi~O`/zO!U/xO&X/yO~P`O!VSO!f/|O~O&`+POQ&ZiR&ZiX&Zi]&Zi_&Zib&Zic&Zii&Zik&Zil&Zim&Zir&Zit&Ziv&Zi{&Zi!O&Zi!P&Zi!V&Zi!a&Zi!f&Zi!i&Zi!j&Zi!k&Zi!l&Zi!m&Zi!p&Zi#h&Zi#x&Zi#|&Zi%W&Zi%Y&Zi%[&Zi%]&Zi%`&Zi%b&Zi%e&Zi%f&Zi%h&Zi%u&Zi%{&Zi%}&Zi&P&Zi&R&Zi&U&Zi&[&Zi&b&Zi&d&Zi&f&Zi&h&Zi&j&Zi'Z&Zi'd&Zi'l&Zi'u&Zi(S&Zi!U&Zi&S&Zi`&Zi&X&Zi~O!T#cOo$ca~O!Q&pi!T&pi~P!,hO!T&PO!Q'pi~O!T&eO!Q'zi~O!Q0SO~O!T!Xa!U!Xa~P#.UO!S0ZO!Y&cO!Z&[O![&[O!T&qX!U&qX~P!AcO!T+iO!U'qa~O!T&vX!U&vX~P!1xO!T+lO!U'|a~O!Q'{i!T'{i~P!,hO_$cO!_!wO!f$`O!l0eO#O0cO'_$cO'h$TO'v&tO~O]&WOl&WO{+eO'm(qO'u+rO~O_+uO!U0hO!Y+xO!Z+tO![+tO!t+|O!u+zO!v+{O!w+yO!z+}O!{+}O'u+rO~P!AcO!Z0iO![0iO'u+rO~P!AcO!Y0jO!Z0iO![0iO'u+rO~P!AcO!VSO!Y0jO!Z0iO![0iO!w0lO!z0mO!{0mO'u+rO~P!AcO!Y0jO!Z0iO![0iO!u0oO!v0oO!w0lO!z0mO!{0mO'u+rO~P!AcO!V&iO~O!V&iO~P!EfO!T'xi!e'xi_'xi'_'xi~P!,hO#O0xO!T'xi!e'xi_'xi'_'xi~O!T&yO!e'wi~O{$zO!V${O#Y0zO'd$gO~O#ZuaQuaZua_uakua!cua!dua!fua!lua#_ua#`ua#aua#bua#cua#dua#eua#fua#gua#iua#kua#mua#nua'_ua'lua'vua!eua!Qua!Vuaoua%Xua!_ua~P#<XO#Z$daQ$daZ$da_$dak$day$da!c$da!d$da!f$da!l$da#_$da#`$da#a$da#b$da#c$da#d$da#e$da#f$da#g$da#i$da#k$da#m$da#n$da'_$da'l$da'v$da!e$da!Q$da!V$dao$da%X$da!_$da~P#<}O#Z$faQ$faZ$fa_$fak$fay$fa!c$fa!d$fa!f$fa!l$fa#_$fa#`$fa#a$fa#b$fa#c$fa#d$fa#e$fa#f$fa#g$fa#i$fa#k$fa#m$fa#n$fa'_$fa'l$fa'v$fa!e$fa!Q$fa!V$fao$fa%X$fa!_$fa~P#=pO#Z$taQ$taZ$ta_$tak$tay$ta!T$ta!c$ta!d$ta!f$ta!l$ta#_$ta#`$ta#a$ta#b$ta#c$ta#d$ta#e$ta#f$ta#g$ta#i$ta#k$ta#m$ta#n$ta'_$ta'l$ta'v$ta!e$ta!Q$ta!V$ta#O$tao$ta%X$ta!_$ta~P!EfO_#Rq!T#Rq'_#Rq!Q#Rq!e#Rqo#Rq!V#Rq%X#Rq!_#Rq~P!,hOe&rX!T&rX~PKRO!T,hOe'sa~O!S1SO!T&sX!e&sX~P*OO!T,kO!e'ta~O!T,kO!e'ta~P!,hO!Q1VO~O#q!ha!U!ha~PCwO#q!`a!T!`a!U!`a~P#.UO!V1hO#|^O$V1iO~O!U1mO~Oo1nO~P!EfO_$`q!T$`q'_$`q!Q$`q!e$`qo$`q!V$`q%X$`q!_$`q~P!,hO!Q1oO~O]-UOl-UO~Ox(ZO{([O(O(`OP%Pi'}%Pi!T%Pi#O%Pi~Oe%Pi#q%Pi~P$4eOx(ZO{([OP%Ri'}%Ri(O%Ri!T%Ri#O%Ri~Oe%Ri#q%Ri~P$5WO'v#]O~P!EfO!S1rO'd$gO!T&{X!e&{X~O!T-^O!e(Ta~O!T-^O!_!wO!e(Ta~O!T-^O!_!wO'v&tO!e(Ta~Oe$mi!T$mi#O$mi#q$mi~P!%mO!S1zO'd(lO!Q&}X!T&}X~P!&[O!T-fO!Q(Ua~O!T-fO!Q(Ua~P!EfO!_!wO~O!_!wO#g2SO~Ok2VO!_!wO'v&tO~Oe'ji!T'ji~P!%mO#O2YOe'ji!T'ji~P!%mO!e2]O~O_$aq!T$aq'_$aq!Q$aq!e$aqo$aq!V$aq%X$aq!_$aq~P!,hO!T2aO!V(VX~P!EfO!V&iO%X2dO~O!V&iO%X2dO~P!EfO!V$kX$|[X_$kX!T$kX'_$kX~P!$dO$|2hOPhXxhX{hX!VhX'}hX(OhX_hX!ThX'_hX~O$|2hO~O]2nO%Y2oO'd)pO!T'WX!U'WX~O!T.jO!U(]a~OZ2sO~O^2tO~O]2wO~OP2yO!V&iO!q2xO%X2dO~O!Q2zO~O_$cO'_$cO~P!EfO!V$OO~P!EfO!T3PO#O3RO!U(YX~O!U3SO~O]&WOl&WO{3UO!Y3`O!Z3XO![3XO!t3_O!u3^O!v3^O!z3]O!{+}O'e$iO'm(qO'u+rO~O!U3[O~P$=tOP3gO!V/WO!q3fO%X3eO~OP3gO!V/WO!q3fO%X3eO'h$TO~O'd)TO!T'VX!U'VX~O!T/dO!U(Za~O]3qO'm3pO~O]3rO~O^3tO~O!e3wO~P*OO_3yO~O_3yO~P*OO#g3{O%y3|O~PFdO`/zO!U4QO&X/yO~P`O!_4SO~O!_4UO!T'ri!U'ri!_'ri!f'ri'h'ri~O!T#Wi!U#Wi~P#.UO#O4VO!T#Wi!U#Wi~O!T!Xi!U!Xi~P#.UO!Q4WO~O_$cO#O4_O'_$cO~O_$cO!_!wO#O4_O'_$cO~O!Z4cO![4cO'u+rO~P!AcO_$cO!_!wO!f$`O!l4dO#O4_O'_$cO'h$TO'v&tO~O!Y4eO!Z4cO![4cO'u+rO~P!AcO!Y4eO!Z4cO![4cO!w4hO!z4iO!{4iO'u+rO~P!AcO_$cO!_!wO!l4dO#O4_O'_$cO'v&tO~O!T'xq!e'xq_'xq'_'xq~P!,hO!T&yO!e'wq~O#Z%PiQ%PiZ%Pi_%Pik%Piy%Pi!c%Pi!d%Pi!f%Pi!l%Pi#_%Pi#`%Pi#a%Pi#b%Pi#c%Pi#d%Pi#e%Pi#f%Pi#g%Pi#i%Pi#k%Pi#m%Pi#n%Pi'_%Pi'l%Pi'v%Pi!e%Pi!Q%Pi!V%Pio%Pi%X%Pi!_%Pi~P$4eO#Z%RiQ%RiZ%Ri_%Rik%Riy%Ri!c%Ri!d%Ri!f%Ri!l%Ri#_%Ri#`%Ri#a%Ri#b%Ri#c%Ri#d%Ri#e%Ri#f%Ri#g%Ri#i%Ri#k%Ri#m%Ri#n%Ri'_%Ri'l%Ri'v%Ri!e%Ri!Q%Ri!V%Rio%Ri%X%Ri!_%Ri~P$5WO#Z$miQ$miZ$mi_$mik$miy$mi!T$mi!c$mi!d$mi!f$mi!l$mi#_$mi#`$mi#a$mi#b$mi#c$mi#d$mi#e$mi#f$mi#g$mi#i$mi#k$mi#m$mi#n$mi'_$mi'l$mi'v$mi!e$mi!Q$mi!V$mi#O$mio$mi%X$mi!_$mi~P!EfOe&ra!T&ra~P!%mO!T&sa!e&sa~P!,hO!T,kO!e'ti~O#q#Ri!T#Ri!U#Ri~P#.UOQ#_Ox!{Oy!|O{!}O!d!yO!f!zO!l#_O'lQOZ#^ik#^i!c#^i#`#^i#a#^i#b#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i#q#^i'v#^i'}#^i(O#^i!T#^i!U#^i~O#_#^i~P$MbO#_:QO~P$MbOQ#_Ox!{Oy!|O{!}O!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO'lQOZ#^i!c#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i#q#^i'v#^i'}#^i(O#^i!T#^i!U#^i~Ok#^i~P% mOk:SO~P% mOQ#_Ok:SOx!{Oy!|O{!}O!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO#c:TO'lQO#i#^i#k#^i#m#^i#n#^i#q#^i'v#^i'}#^i(O#^i!T#^i!U#^i~OZ#^i!c#^i#d#^i#e#^i#f#^i#g#^i~P%#xOZ:`O!c:UO#d:UO#e:UO#f:_O#g:UO~P%#xOQ#_OZ:`Ok:SOx!{Oy!|O{!}O!c:UO!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO#c:TO#d:UO#e:UO#f:_O#g:UO#i:VO'lQO#k#^i#m#^i#n#^i#q#^i'v#^i(O#^i!T#^i!U#^i~O'}#^i~P%&dO'}#OO~P%&dOQ#_OZ:`Ok:SOx!{Oy!|O{!}O!c:UO!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO#c:TO#d:UO#e:UO#f:_O#g:UO#i:VO#k:XO'lQO'}#OO#m#^i#n#^i#q#^i'v#^i!T#^i!U#^i~O(O#^i~P%(oO(O#PO~P%(oOQ#_OZ:`Ok:SOx!{Oy!|O{!}O!c:UO!d!yO!f!zO!l#_O#_:QO#`:RO#a:RO#b:RO#c:TO#d:UO#e:UO#f:_O#g:UO#i:VO#k:XO#m:ZO'lQO'}#OO(O#PO~O#n#^i#q#^i'v#^i!T#^i!U#^i~P%*zO_#oy!T#oy'_#oy!Q#oy!e#oyo#oy!V#oy%X#oy!_#oy~P!,hOP<bOx(ZO{([O'}(^O(O(`O~OQ#^iZ#^ik#^iy#^i!c#^i!d#^i!f#^i!l#^i#_#^i#`#^i#a#^i#b#^i#c#^i#d#^i#e#^i#f#^i#g#^i#i#^i#k#^i#m#^i#n#^i#q#^i'l#^i'v#^i!T#^i!U#^i~P%-oO#q'kX!U'kX~P!FeO#q#ri!T#ri!U#ri~P#.UO!U4zO~O!T&za!U&za~P#.UO!_!wO'v&tO!T&{a!e&{a~O!T-^O!e(Ti~O!T-^O!_!wO!e(Ti~Oe$mq!T$mq#O$mq#q$mq~P!%mO!Q&}a!T&}a~P!EfO!_5RO~O!T-fO!Q(Ui~P!EfO!T-fO!Q(Ui~O!Q5VO~O!_!wO#g5[O~Ok5]O!_!wO'v&tO~O!Q5_O~Oe$oq!T$oq#O$oq#q$oq~P!%mO_$ay!T$ay'_$ay!Q$ay!e$ayo$ay!V$ay%X$ay!_$ay~P!,hO!T2aO!V(Va~O!V&iO%X5dO~O!V&iO%X5dO~P!EfO_#Ry!T#Ry'_#Ry!Q#Ry!e#Ryo#Ry!V#Ry%X#Ry!_#Ry~P!,hOZ5gO~O]5iO'd)pO~O!T.jO!U(]i~O]5lO~O^5mO~O!_4UO~O'm'YO!T'SX!U'SX~O!T3PO!U(Ya~O!f$`O'h$TO_'rX!_'rX!l'rX#O'rX'_'rX'v'rX~O'd5xO~P,OO_$cO!_!wO!l0eO#O0cO'_$cO'v&tO~O!U5{O~P$=tO]&WOl&WO{5|O'm(qO'u+rO~O!Y6QO!Z6PO![6PO!z0mO!{0mO'u+rO~P!AcO!Y6QO!Z6PO![6PO!u6RO!v6RO!z0mO!{0mO'u+rO~P!AcO!Z6PO![6PO'e$iO'm(qO'u+rO~O!V/WO~O!V/WO%X6TO~O!V/WO%X6TO~P!EfOP6YO!V/WO!q6XO%X6TO~OZ6_O!T'Va!U'Va~O!T/dO!U(Zi~O]6bO~O!e6cO~O!e6dO~O!e6eO~O!e6eO~P*OO_6gO~O!_6jO~O!e6kO~O!T'{i!U'{i~P#.UO_$cO'_$cO~P!,hO_$cO#O6qO'_$cO~O_$cO!_!wO#O6qO'_$cO~O!Z6vO![6vO'u+rO~P!AcO_$cO!_!wO!l6wO#O6qO'_$cO'v&tO~O!f$`O'h$TO~P%=QO!Y6xO!Z6vO![6vO'u+rO~P!AcO!T'xy!e'xy_'xy'_'xy~P!,hO#Z$mqQ$mqZ$mq_$mqk$mqy$mq!T$mq!c$mq!d$mq!f$mq!l$mq#_$mq#`$mq#a$mq#b$mq#c$mq#d$mq#e$mq#f$mq#g$mq#i$mq#k$mq#m$mq#n$mq'_$mq'l$mq'v$mq!e$mq!Q$mq!V$mq#O$mqo$mq%X$mq!_$mq~P!EfO#Z$oqQ$oqZ$oq_$oqk$oqy$oq!T$oq!c$oq!d$oq!f$oq!l$oq#_$oq#`$oq#a$oq#b$oq#c$oq#d$oq#e$oq#f$oq#g$oq#i$oq#k$oq#m$oq#n$oq'_$oq'l$oq'v$oq!e$oq!Q$oq!V$oq#O$oqo$oq%X$oq!_$oq~P!EfO!T&si!e&si~P!,hO#q#Rq!T#Rq!U#Rq~P#.UOx.QOy.QO{.ROPua'}ua(Oua!Uua~OQuaZuakua!cua!dua!fua!lua#_ua#`ua#aua#bua#cua#dua#eua#fua#gua#iua#kua#mua#nua#qua'lua'vua!Tua~P%CgOx(ZO{([OP$da'}$da(O$da!U$da~OQ$daZ$dak$day$da!c$da!d$da!f$da!l$da#_$da#`$da#a$da#b$da#c$da#d$da#e$da#f$da#g$da#i$da#k$da#m$da#n$da#q$da'l$da'v$da!T$da~P%EnOx(ZO{([OP$fa'}$fa(O$fa!U$fa~OQ$faZ$fak$fay$fa!c$fa!d$fa!f$fa!l$fa#_$fa#`$fa#a$fa#b$fa#c$fa#d$fa#e$fa#f$fa#g$fa#i$fa#k$fa#m$fa#n$fa#q$fa'l$fa'v$fa!T$fa~P%GuOQ$taZ$tak$tay$ta!c$ta!d$ta!f$ta!l$ta#_$ta#`$ta#a$ta#b$ta#c$ta#d$ta#e$ta#f$ta#g$ta#i$ta#k$ta#m$ta#n$ta#q$ta'l$ta'v$ta!T$ta!U$ta~P%-oO#q$`q!T$`q!U$`q~P#.UO#q$aq!T$aq!U$aq~P#.UO!U7RO~O#q7SO~P!%mO!_!wO!T&{i!e&{i~O!_!wO'v&tO!T&{i!e&{i~O!T-^O!e(Tq~O!Q&}i!T&}i~P!EfO!T-fO!Q(Uq~O!Q7YO~P!EfO!Q7YO~Oe'jy!T'jy~P!%mO!T'Qa!V'Qa~P!EfO!V${q_${q!T${q'_${q~P!EfOZ7aO~O!T.jO!U(]q~O]7dO~O!V&iO%X7eO~O!V&iO%X7eO~P!EfO#O7fO!T'Sa!U'Sa~O!T3PO!U(Yi~P#.UOQ[XZ[Xk[Xx[Xy[X{[X!Q[X!T[X!c[X!d[X!f[X!l[X#O[X#ZdX#_[X#`[X#a[X#b[X#c[X#d[X#e[X#f[X#g[X#i[X#k[X#m[X#n[X#s[X'l[X'v[X'}[X(O[X~O!_$yX#g$yX~P& |O!Z7lO![7lO'e$iO'm(qO'u+rO~O!Y7oO!Z7lO![7lO!z4iO!{4iO'u+rO~P!AcO!V/WO%X7rO~O!V/WO%X7rO~P!EfO]7yO'm7xO~O!T/dO!U(Zq~O!e7{O~O!e7{O~P*OO!e7}O~O!e8OO~O#O8QO!T#Wy!U#Wy~O!T#Wy!U#Wy~P#.UO_$cO#O8VO'_$cO~O_$cO!_!wO#O8VO'_$cO~O!Z8YO![8YO'u+rO~P!AcO_$cO!_!wO!l8ZO#O8VO'_$cO'v&tO~O#q#oy!T#oy!U#oy~P#.UOQ$miZ$mik$miy$mi!c$mi!d$mi!f$mi!l$mi#_$mi#`$mi#a$mi#b$mi#c$mi#d$mi#e$mi#f$mi#g$mi#i$mi#k$mi#m$mi#n$mi#q$mi'l$mi'v$mi!T$mi!U$mi~P%-oOx(ZO{([O(O(`OP%Pi'}%Pi!U%Pi~OQ%PiZ%Pik%Piy%Pi!c%Pi!d%Pi!f%Pi!l%Pi#_%Pi#`%Pi#a%Pi#b%Pi#c%Pi#d%Pi#e%Pi#f%Pi#g%Pi#i%Pi#k%Pi#m%Pi#n%Pi#q%Pi'l%Pi'v%Pi!T%Pi~P&*VOx(ZO{([OP%Ri'}%Ri(O%Ri!U%Ri~OQ%RiZ%Rik%Riy%Ri!c%Ri!d%Ri!f%Ri!l%Ri#_%Ri#`%Ri#a%Ri#b%Ri#c%Ri#d%Ri#e%Ri#f%Ri#g%Ri#i%Ri#k%Ri#m%Ri#n%Ri#q%Ri'l%Ri'v%Ri!T%Ri~P&,^O#q$ay!T$ay!U$ay~P#.UO#q#Ry!T#Ry!U#Ry~P#.UO!_!wO!T&{q!e&{q~O!T-^O!e(Ty~O!Q&}q!T&}q~P!EfO!Q8aO~P!EfO!T.jO!U(]y~O!T3PO!U(Yq~O!Z8mO![8mO'e$iO'm(qO'u+rO~O!V/WO%X8pO~O!V/WO%X8pO~P!EfO!e8sO~O_$cO#O8yO'_$cO~O_$cO!_!wO#O8yO'_$cO~OQ$mqZ$mqk$mqy$mq!c$mq!d$mq!f$mq!l$mq#_$mq#`$mq#a$mq#b$mq#c$mq#d$mq#e$mq#f$mq#g$mq#i$mq#k$mq#m$mq#n$mq#q$mq'l$mq'v$mq!T$mq!U$mq~P%-oOQ$oqZ$oqk$oqy$oq!c$oq!d$oq!f$oq!l$oq#_$oq#`$oq#a$oq#b$oq#c$oq#d$oq#e$oq#f$oq#g$oq#i$oq#k$oq#m$oq#n$oq#q$oq'l$oq'v$oq!T$oq!U$oq~P%-oOe%T!Z!T%T!Z#O%T!Z#q%T!Z~P!%mO!T'Sq!U'Sq~P#.UO!T#W!Z!U#W!Z~P#.UO_$cO#O9]O'_$cO~O#Z%T!ZQ%T!ZZ%T!Z_%T!Zk%T!Zy%T!Z!T%T!Z!c%T!Z!d%T!Z!f%T!Z!l%T!Z#_%T!Z#`%T!Z#a%T!Z#b%T!Z#c%T!Z#d%T!Z#e%T!Z#f%T!Z#g%T!Z#i%T!Z#k%T!Z#m%T!Z#n%T!Z'_%T!Z'l%T!Z'v%T!Z!e%T!Z!Q%T!Z!V%T!Z#O%T!Zo%T!Z%X%T!Z!_%T!Z~P!EfOP<aOx(ZO{([O'}(^O(O(`O~O]!}al!}a!U!}a!Y!}a!Z!}a![!}a!t!}a!u!}a!v!}a!z!}a!{!}a'e!}a'm!}a'u!}a~P&8eOQ%T!ZZ%T!Zk%T!Zy%T!Z!c%T!Z!d%T!Z!f%T!Z!l%T!Z#_%T!Z#`%T!Z#a%T!Z#b%T!Z#c%T!Z#d%T!Z#e%T!Z#f%T!Z#g%T!Z#i%T!Z#k%T!Z#m%T!Z#n%T!Z#q%T!Z'l%T!Z'v%T!Z!T%T!Z!U%T!Z~P%-oO]ualua!Yua!Zua![ua!tua!uua!vua!zua!{ua'eua'mua'uua~P%CgO]$dal$da!Y$da!Z$da![$da!t$da!u$da!v$da!z$da!{$da'e$da'm$da'u$da~P%EnO]$fal$fa!Y$fa!Z$fa![$fa!t$fa!u$fa!v$fa!z$fa!{$fa'e$fa'm$fa'u$fa~P%GuO]$tal$ta!U$ta!Y$ta!Z$ta![$ta!t$ta!u$ta!v$ta!z$ta!{$ta'e$ta'm$ta'u$ta~P&8eO]%Pil%Pi!Y%Pi!Z%Pi![%Pi!t%Pi!u%Pi!v%Pi!z%Pi!{%Pi'e%Pi'm%Pi'u%Pi~P&*VO]%Ril%Ri!Y%Ri!Z%Ri![%Ri!t%Ri!u%Ri!v%Ri!z%Ri!{%Ri'e%Ri'm%Ri'u%Ri~P&,^O]$mil$mi!U$mi!Y$mi!Z$mi![$mi!t$mi!u$mi!v$mi!z$mi!{$mi'e$mi'm$mi'u$mi~P&8eO]$mql$mq!U$mq!Y$mq!Z$mq![$mq!t$mq!u$mq!v$mq!z$mq!{$mq'e$mq'm$mq'u$mq~P&8eO]$oql$oq!U$oq!Y$oq!Z$oq![$oq!t$oq!u$oq!v$oq!z$oq!{$oq'e$oq'm$oq'u$oq~P&8eO]%T!Zl%T!Z!U%T!Z!Y%T!Z!Z%T!Z![%T!Z!t%T!Z!u%T!Z!v%T!Z!z%T!Z!{%T!Z'e%T!Z'm%T!Z'u%T!Z~P&8eOo'nX~P.mOo[X!Q[X!e[X%y[X!V[X%X[X!_[X~P$zO!_dX!e[X!edX'vdX~P;sOQ9yOR9yO]cOb;|Oc!jOicOk9yOlcOmcOrcOt9yOv9yO{RO!OcO!PcO!VSO!a9{O!fUO!i9yO!j9yO!k9yO!l9yO!m9yO!p!iO#x!lO#|^O'd'jO'lQO'uYO(S;zO~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv:cO{#}O!V$OO!a<SO!f#zO#Y:lO#x$[O$e:fO$g:iO$j$]O'd'QO'h$TO'l#wO~O!T:]O!U$ca~O]#uOi$UOk#vOl#uOm#uOr$VOt$WOv:dO{#}O!V$OO!a<TO!f#zO#Y:mO#x$[O$e:gO$g:jO$j$]O'd'QO'h$TO'l#wO~O#h'qO~P&IwO!U[X!UdX~P;sO!_:PO~O#Z:OO~O!_!wO#Z:OO~O#O:aO~O#g:UO~O#O:nO!T'{X!U'{X~O#O:aO!T'yX!U'yX~O#Z:oO~Oe:qO~P!%mO#Z:xO~O#Z:yO~O#Z:zO~O!_!wO#Z:{O~O!_!wO#Z:oO~O#q:|O~P#.UO#Z:}O~O#Z;OO~O#Z;PO~O#Z;QO~O#Z;RO~O#Z;SO~O#Z;TO~O#Z;UO~O!Q;VO~O#q;WO~P!%mO#q;XO~P!%mO#q;YO~P!%mO!Q;ZO~P!EfO!Q;ZO~O!Q;[O~P!EfO!_!wO#g<YO~O!_!wO#g<[O~O#|~!d!t!v!w!z#X#Y#f(S$e$g$j$|%W%X%Y%`%b%e%f%h%j~UT#|(Slx#`!P'a'b'm'b'd$O$Q~",
            goto: "$ i(aPPPPPPPP(bP(rP*fPPPP.WPP.mP4W8X8lP8lPPP8lP:p8lP8lP8lP:tPP:zP;a?yPPP?}PPPP?}BuPPPB{DjP?}PF}PPPPHv?}PPPPPJt?}PPM{NxPPPPN|!!fPP!!n!#pPNx?}?}!'R!*S!/O!/O!2fPPP!2m!5i?}PPPPPPPPPPP!8gP!9yPP?}!;XP?}P?}?}?}?}P?}!<oPP!?nP!BiP!Bm!Bu!By!ByP!?kP!B}!B}P!ExP!E|?}?}!FS!H|8lP8lP8l8lP!JU8l8l!Ld8l# _8l##g8l8l#$T#&e#&e#&i#&q#&e#&}P#&eP8l#'y8l#)g8l8l.WPPP#+XPP#+q#+qP#+qP#,W#+qPP#,^P#,TP#,T#,p!!j#,T#-_#-e#-h(b#-k(bP#-r#-r#-rP(bP(bP(bP(bPP(bP#-x#-{P#-{(bP#.PP#.SP(bP(bP(bP(bP(bP(b(b#.Y#.d#.j#.p#/O#/U#/[#/f#/l#/{#0R#0a#0g#0m#0{#1b#3Y#3h#3n#3t#3z#4Q#4[#4b#4h#4r#5U#5[PPPPPPPP#5bPP#6U#9_P#:u#:|#;UPP#@r#Cb#If#Ii#Il#J|#KPPP#KS#KW#Ku#Lo#Ls#MXPP#M]#Mc#MgP#Mj#Mn#Mq#Na#Nw#N|$ P$ S$ Y$ ]$ a$ emhOSj}!n$b%h%k%l%n*w*|/t/wQ$nmQ$upQ%`yS&[!b+iQ&p!jS(s$O(xQ)n$oQ){$wQ*h%YQ+o&cS+t&i+vQ,W&qQ-w(zQ/c*iY0i+x+y+z+{+|S3X/W3ZU4c0j0l0oU6P3^3_3`S6v4e4hS7l6Q6RQ8Y6xR8m7o$z[ORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]!l'l#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}Q)U$XQ)s$qQ*j%]Q*q%eQ,b:bQ.d)hQ.o)tQ/k*oQ2n.jQ3n/dQ4s:dQ5i2oR9h:cpeOSjy}!n$b%_%h%k%l%n*w*|/t/wR*l%a&dVOSTjkn}!S!W!k!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o$b$s%a%d%e%h%j%k%l%n%r&P&X&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;|;}[!cRU!]!`%}&]Q$hlQ$mmS$rp$wx$|rs!r!u$`$z&e&y&|*P*Q*S*u+b+q,],_/|0z4UQ%UwQ&m!iQ&o!jS(f#z(jS)m$n$oQ)q$qQ*O$yQ*c%WQ*g%YS,V&p&qQ-b(gQ.h)nQ.n)tQ.p)uQ.s)yQ/^*dS/b*h*iQ0v,WQ1q-^Q2m.jQ2q.mQ2v.uQ3m/cQ5O1rQ5h2oQ5k2sQ7`5gR8d7ax#|a!y$Y$Z$_(_(a(i)O)P,h-e.T1p2Y7S;z<V<W<X!Y$km!j$m$n$o&Z&o&p&q(r)m)n+f+s,V,W-o.h0`0f0k0v2U4b4g6t8W8zQ)g$hQ*X%RQ*[%SQ*f%YQ.w*OQ/]*cU/a*g*h*iQ3h/^S3l/b/cS5w3T3WQ6^3mU7j5y5}6OU8k7k7m7nQ9S8lQ9b9T#^<O!w#e#f#z#}&l(U(b(o)d)f)h*W*Z,S-f-h._.a.}/Q/Y/[1z2S2a2d2h2y3e3g5R5[5d6T6Y7e7r8p:e:h:k:r:u:x:};Q;W<Y<[<`<a<bd<P:P:f:i:l:s:v:y;O;R;Xg<Q:_:`:g:j:m:t:w:z;P;S;YW$Ra$T)Q;zS%Rt%_Q%SuQ%TvR*V%P%T$Qa!w!y#e#f#z#}$Y$Z$_&l(U(_(a(b(i(o)O)P)d)f)h*W*Z,S,h-e-f-h.T._.a.}/Q/Y/[1p1z2S2Y2a2d2h2y3e3g5R5[5d6T6Y7S7e7r8p:P:_:`:e:f:g:h:i:j:k:l:m:r:s:t:u:v:w:x:y:z:};O;P;Q;R;S;W;X;Y;z<V<W<X<Y<[<`<a<bT(V#w(WX)V$X:b:c:dU&`!b${+lS'Z!{!|Q)x$tQ/R*]Q2Z.QR5s3P&jcORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}$_#bZ!_!o$f%|&S'O'V'_'`'a'b'c'd'e'f'g'h'i'k'n'r'|)w+Z+g+p,X,g,m,q,s-S.U0T0W0w1R1W1X1Y1Z1[1]1^1_1`1a1b1c1d1g1l2_2k4Y4]4m4q4r4w4x5u6m6p6{7P7Q8S8g8t8w9Z9f9z;jT!XQ!Y&kcORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}Q&^!bR0[+i!W&W!b&[&c&i+i+o+t+v+x+y+z+{+|+}0i0j0l0m0o3]4c4e4h4i6v6x8YS(r$O(xS-o(s(zQ-x({Q/T*_Q2U-wQ2X-zS3T/W3ZS5y3X3`S5}3^3_S7k6P6QQ7m6RS8l7l7oR9T8mlhOSj}!n$b%h%k%l%n*w*|/t/wQ%p!QS&}!v:OQ)k$lQ*a%UQ*b%VQ,T&nS,f'S:oS.V)^:{Q.f)lQ/V*`Q/{+OQ/}+PQ0V+cQ0n+zQ0t,US2`.W;TQ2i.gS2l.i;UQ4X0YQ4[0aQ4k0uQ5f2jQ6n4ZQ6r4aQ6z4lQ8P6kQ8T6sQ8v8UQ9Y8xR9e9[$Y#aZ!_!o%|&S'O'V'_'`'a'b'c'd'e'f'g'h'i'k'n'r'|)w+Z+g+p,X,g,m,q-S.U0T0W0w1R1W1X1Y1Z1[1]1^1_1`1a1b1c1d1g1l2_2k4Y4]4m4q4r4w4x5u6m6p6{7P7Q8S8g8t8w9Z9f9z;jU(}$P'R1fT)b$f,s$Y#`Z!_!o%|&S'O'V'_'`'a'b'c'd'e'f'g'h'i'k'n'r'|)w+Z+g+p,X,g,m,q-S.U0T0W0w1R1W1X1Y1Z1[1]1^1_1`1a1b1c1d1g1l2_2k4Y4]4m4q4r4w4x5u6m6p6{7P7Q8S8g8t8w9Z9f9z;jS']!|#aS)a$f,sQ,t'mR.X)b&jcORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}Q%k{Q%l|Q%n!OQ%o!PR/s*zQ&j!iQ)c$hQ,Q&mS.^)g*OS0q,O,PW2c.Z.[.].wS4j0r0sU5c2e2f2gU7^5b5o5pQ8c7_R9O8fT+u&i+vS+s&i+vU0f+t+x+yU0k+z+{+|S0p+}3]S3W/W3ZU4b0i0j0lQ4f0mQ4g0oS5y3X3`S6O3^3_U6t4c4e4hQ6y4iS7k6P6QQ7n6RS8W6v6xS8l7l7oQ8z8YR9T8mS+u&i+vT3Y/W3ZS&w!q/qQ-a(fQ-m(rU0e+s3V3WQ1v-bS2P-n-xU4d0k0p6OQ4}1qS5Y2V2XU6w4f4g7nQ7U5OQ7]5]R8Z6yQ!xXS&v!q/qQ)_$aQ)i$jQ)o$pQ,Z&wQ-`(fQ-l(rQ-r(uQ.e)jQ/_*eU0d+s3V3WS1u-a-bS2O-m-xQ2R-qQ2T-sQ3j/`W4`0e0k0p6OQ4|1qQ5Q1vS5U2P2XQ5Z2WQ6[3kW6u4d4f4g7nS7T4}5OS7X5V;VQ7Z5YQ7h5vQ7v6]S8X6w6yQ8_7US8`7Y;ZQ8b7]Q8i7iQ8r7wQ8{8ZS8}8a;[Q9Q8jQ9`9RQ9m9aQ9t9nQ;c;^Q;q;hQ;r;iQ;s<UR;x<Z$|WORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%e%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]S!xn!k!l;]#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}R;c;|$|XORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%e%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]Q$ab!Y$jm!j$m$n$o&Z&o&p&q(r)m)n+f+s,V,W-o.h0`0f0k0v2U4b4g6t8W8zS$pn!kQ)j$kQ*e%YW/`*f*g*h*iU3k/a/b/cS5v3T3WS6]3l3mW7i5w5y5}6OQ7w6^W8j7j7k7m7nS9R8k8lS9a9S9TQ9n9b!l;^#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}Q;h;{R;i;|$p]OSTjk}!S!W!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%h%j%k%l%n%r&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]Y!hRU!]!`%}x$|rs!r!u$`$z&e&y&|*P*Q*S*u+b+q,],_/|0z4UQ*r%e!j;_#^#o(O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}R;b&]S&a!b${R0^+l$z[ORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]!l'l#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}R*q%e$|oORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%e%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]S'Z!{!|!m;`#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}!h#WZ!_$f%|&S'O'V'f'g'h'i'n'r)w+Z+p,X,g,m-S.U0w1R1d2_2k4]4m4q6p8S8w9Z9f9z!T:W'k'|+g,s0T0W1W1`1a1b1c1g1l4Y4r4w4x5u6m6{7P7Q8g8t;j!d#YZ!_$f%|&S'O'V'h'i'n'r)w+Z+p,X,g,m-S.U0w1R1d2_2k4]4m4q6p8S8w9Z9f9z!P:Y'k'|+g,s0T0W1W1b1c1g1l4Y4r4w4x5u6m6{7P7Q8g8t;j!`#^Z!_$f%|&S'O'V'n'r)w+Z+p,X,g,m-S.U0w1R1d2_2k4]4m4q6p8S8w9Z9f9zQ1p-[z;}'k'|+g,s0T0W1W1g1l4Y4r4w4x5u6m6{7P7Q8g8t;jQ<V<]Q<W<^R<X<_&jcORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}S#p`#qR1i,w&q_ORSTU`jk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o#q$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,w,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}T#l^#rS#j^#rT'u#m'yT#k^#rT'w#m'y&q`ORSTU`jk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#^#c#g#o#q$b$s%a%d%e%h%j%k%l%n%r%}&P&X&]&d&k&u'S'W'[(O(Y)^)e*R*s*w*|+]+a+d+e,R,Y,k,r,w,x.R.W.`.i/Z/l/m/n/p/t/w/y0Z0c0x1S1h2x3R3U3f3y3{3|4V4_5|6X6g6q7f8Q8V8y9]9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}T#p`#qQ#s`R(Q#q$|bORSTUjk}!S!W!]!`!n!v!z!}#Q#R#S#T#U#V#W#X#Y#Z#[#c#g$b$s%a%d%e%h%j%k%l%n%r%}&P&X&d&k&u'S'W'[(Y)^)e*R*s*w*|+]+e,R,Y,k,r.R.W.`.i/Z/l/m/n/p/t/w/y0c0x1S2x3U3f3y3{3|4_5|6X6g6q8V8y9]!m;{#^#o&](O+a+d,x0Z1h3R4V7f8Q9y9{:O:Q:R:S:T:U:V:W:X:Y:Z:[:]:a:n:o:q:{:|;T;U;}#]dOSUj}!S!W!n!}#o$b%a%d%e%h%j%k%l%n%r&X&k'[(O)e*R*s*w*|+e,R,x.R.`/Z/l/m/n/p/t/w/y1h2x3U3f3y3{3|5|6X6g!^$Pa!y$Y$Z$_(_(a(i)O)P,h-e.T1p2Y7S:P:f:i:l:s:v:y;O;R;X;z<V<W<X#^'R!w#e#f#z#}&l(U(b(o)d)f)h*W*Z,S-f-h._.a.}/Q/Y/[1z2S2a2d2h2y3e3g5R5[5d6T6Y7e7r8p:e:h:k:r:u:x:};Q;W<Y<[<`<a<bQ)Z$]Q-T(Zg1f:_:`:g:j:m:t:w:z;P;S;Yx#{a!y$Y$Z$_(_(a(i)O)P,h-e.T1p2Y7S;z<V<W<XQ(k#|S(u$O(xQ)[$^Q-s(v#^;e!w#e#f#z#}&l(U(b(o)d)f)h*W*Z,S-f-h._.a.}/Q/Y/[1z2S2a2d2h2y3e3g5R5[5d6T6Y7e7r8p:e:h:k:r:u:x:};Q;W<Y<[<`<a<bd;f:P:f:i:l:s:v:y;O;R;Xf;g:_:`:g:j:m:t:w:z;P;S;YQ;k<OQ;l<PQ;m<QQ;n<RQ;o<SR;p<T!^$Pa!y$Y$Z$_(_(a(i)O)P,h-e.T1p2Y7S:P:f:i:l:s:v:y;O;R;X;z<V<W<X#^'R!w#e#f#z#}&l(U(b(o)d)f)h*W*Z,S-f-h._.a.}/Q/Y/[1z2S2a2d2h2y3e3g5R5[5d6T6Y7e7r8p:e:h:k:r:u:x:};Q;W<Y<[<`<a<bg1f:_:`:g:j:m:t:w:z;P;S;YlfOSj}!n$b%h%k%l%n*w*|/t/wQ(n#}Q+V%uQ+W%wR1y-f%S$Qa!w!y#e#f#z#}$Y$Z$_&l(U(_(a(b(i(o)O)P)d)f)h*W*Z,S,h-e-f-h.T._.a.}/Q/Y/[1p1z2S2Y2a2d2h2y3e3g5R5[5d6T6Y7S7e7r8p:P:_:`:e:f:g:h:i:j:k:l:m:r:s:t:u:v:w:x:y:z:};O;P;Q;R;S;W;X;Y;z<V<W<X<Y<[<`<a<bQ*Y%SQ/P*[Q2}/OR5r3OT(w$O(xS(w$O(xT3Y/W3ZQ-q(tQ2W-yQ<U3UR<Z5|Q)i$jQ-r(uQ.e)jQ/_*eQ3j/`Q6[3kQ7h5vQ7v6]Q8i7iQ8r7wQ9Q8jQ9`9RQ9m9aR9t9np(_#x'T)]-d-{-|1P1w2^4{5^8^;d;t;u;v!n:r'P'p(e(m,P,e-P-[-i.Y.].|/O0s1O1x1|2g2|3O3c4o4p5S5W5`5e5p6W7W7[7t8|;w;y<]<^<_[:s9^9k9r9u9v9x]:t1e4v6|8[8]9gr(a#x'T)]-Y-d-{-|1P1w2^4{5^8^;d;t;u;v!p:u'P'p(e(m,P,e-P-[-i.Y.].|/O0s0|1O1x1|2g2|3O3c4o4p5S5W5`5e5p6W7W7[7t8|;w;y<]<^<_^:v9^9k9p9r9u9v9x_:w1e4v6|6}8[8]9gpeOSjy}!n$b%_%h%k%l%n*w*|/t/wQ%[xR*s%epeOSjy}!n$b%_%h%k%l%n*w*|/t/wR%[xQ*^%TR.{*VqeOSjy}!n$b%_%h%k%l%n*w*|/t/wQ/X*cS3d/]/^W6S3a3b3c3hU7q6U6V6WU8n7p7s7tQ9U8oR9c9VQ%cyR*m%_R3q/fR7y6_S$rp$wR.p)uQ%hzR*w%iR*}%oT/u*|/wR+R%pQ+Q%pR0O+RQjOQ!nST$ej!nQ(W#wR-Q(WQ!YQR%z!YQ!^RU&Q!^&R+^Q&R!_R+^&SQ+j&^R0]+jQ,i'TR1Q,iQ,l'VS1T,l1UR1U,mQ+v&iR0g+vS!eR$zU&f!e&g+_Q&g!fR+_&TQ+m&aR0_+mQ&z!sQ,[&xU,`&z,[0{R0{,aQ'y#mR,y'yQ#q`R(P#qQ#dZU'o#d+Y:^Q+Y9zR:^'|Q-_(fW1s-_1t5P7VU1t-`-a-bS5P1u1vR7V5Q$k(]#x'P'T'p(e(m)W)X)],P,c,d,e-P-Y-Z-[-d-i-{-|.Y.].|/O0s0|0}1O1P1e1w1x1|2^2g2|3O3c4o4p4t4u4v4{5S5W5^5`5e5p6W6|6}7O7W7[7t8[8]8^8|9^9g9i9j9k9p9q9r9u9v9x;d;t;u;v;w;y<]<^<_Q-g(mU1{-g1}5TQ1}-iR5T1|Q(x$OR-u(xQ)R$SR.O)RQ2b.YR5a2bQ*T$}R.z*TQ3Q/RS5t3Q7gR7g5uQ*`%UR/U*`Q3Z/WR5z3ZQ/e*jS3o/e6`R6`3qQ.k)qW2p.k2r5j7bQ2r.nQ5j2qR7b5kQ)v$rR.q)vQ/w*|R4P/wWiOSj!nQ%m}Q)`$bQ*v%hQ*x%kQ*y%lQ*{%nQ/r*wS/u*|/wR4O/tQ$dgQ%q!RQ%t!TQ%v!UQ%x!VQ)}$xQ*U%OQ*l%cQ+T%sQ-t(wS/h*m*pQ0P+SQ0Q+VQ0R+WU0b+s3V3WQ2u.tQ2{.|Q3i/_Q3s/jQ3}/sY4^0d0e0k0p6OQ5n2wQ5q2|Q6Z3jQ6a3r[6o4]4`4d4f4g7nQ7c5lQ7u6[Q7z6bW8R6p6u6w6yQ8e7dQ8h7hQ8q7vU8u8S8X8ZQ9P8iQ9W8rS9X8w8{Q9_9QQ9d9ZQ9l9`Q9o9fQ9s9mR9w9tQ$lmQ&n!jU)l$m$n$oQ+c&ZU,U&o&p&qQ-k(rS.g)m)nQ0Y+fQ0a+sS0u,V,WQ2Q-oQ2j.hQ4Z0`S4a0f0kQ4l0vQ5X2US6s4b4gQ8U6tQ8x8WR9[8zS#ya;zR)S$TU$Sa$T;zR-})QQ#xaS'P!w)hQ'T!yS'p#e#fQ(e#zQ(m#}Q)W$YQ)X$ZQ)]$_Q,P&lQ,c:eQ,d:hQ,e:kQ-P(UQ-Y(_Q-Z(aQ-[(bQ-d(iQ-i(oQ-{)OQ-|)Pd.Y)d._/Y2d3e5d6T7e7r8pQ.])fQ.|*WQ/O*ZQ0s,SQ0|:rQ0}:uQ1O:xQ1P,hS1e:_:`Q1w-eQ1x-fQ1|-hQ2^.TQ2g.aQ2|.}Q3O/QQ3c/[Q4o:}Q4p;QQ4t:gQ4u:jQ4v:mQ4{1pQ5S1zQ5W2SQ5^2YQ5`2aQ5e2hQ5p2yQ6W3gQ6|:zQ6}:tQ7O:wQ7W5RQ7[5[Q7t6YQ8[;PQ8];SQ8^7SQ8|;WQ9^:PQ9g;YQ9i:fQ9j:iQ9k:lQ9p:sQ9q:vQ9r:yQ9u;OQ9v;RQ9x;XQ;d;zQ;t<VQ;u<WQ;v<XQ;w<YQ;y<[Q<]<`Q<^<aR<_<blgOSj}!n$b%h%k%l%n*w*|/t/wS!pU%jQ%s!SQ%y!WQ'^!}Q'}#oS*p%a%dQ*t%eQ+S%rQ+`&XQ,O&kQ,o'[Q,}(OQ.[)eQ.x*RQ/o*sU0X+e3U5|Q0r,RQ1k,xQ2[.RQ2f.`Q3b/ZQ3u/lQ3v/mQ3x/nQ3z/pQ4R/yQ4y1hQ5o2xQ6V3fQ6f3yQ6h3{Q6i3|Q7s6XR7|6g#QZOSUj}!S!n!}$b%a%d%e%h%j%k%l%n%r&X&k'[)e*R*s*w*|+e,R.R.`/Z/l/m/n/p/t/w/y2x3U3f3y3{3|5|6X6gQ!_RQ!oTQ$fkS%|!]&PQ&S!`Q'O!vQ'V!zQ'_#QQ'`#RQ'a#SQ'b#TQ'c#UQ'd#VQ'e#WQ'f#XQ'g#YQ'h#ZQ'i#[Q'k#^Q'n#cQ'r#gW'|#o(O,x1hQ)w$sS+Z%}+]S+g&]0ZQ+p&dQ,X&uQ,g'SQ,m'WQ,q9yQ,s9{Q-S(YQ.U)^Q0T+aQ0W+dQ0w,YQ1R,kQ1W:OQ1X:QQ1Y:RQ1Z:SQ1[:TQ1]:UQ1^:VQ1_:WQ1`:XQ1a:YQ1b:ZQ1c:[Q1d,rQ1g:aQ1l:]Q2_.WQ2k.iQ4Y:nQ4]0cQ4m0xQ4q1SQ4r:oQ4w:qQ4x:{Q5u3RQ6m4VQ6p4_Q6{:|Q7P;TQ7Q;UQ8S6qQ8g7fQ8t8QQ8w8VQ9Z8yQ9f9]Q9z!WR;j;}R!aRR&_!bS&Z!b+iS+f&[&cS+s&i+vQ0`+oU0f+t+x+yU0k+z+{+|W0p+}3]3^3_S3V/W3ZU4b0i0j0lS4f0m6RQ4g0oU6t4c4e4hQ6y4iS8W6v6xR8z8YR'U!yR'X!zT!tU$`S!sU$`U$}rs*uS&x!r!uQ,^&yQ,a&|Q.y*SS0y,],_R4n0z`!dR!]!`$z%}&e*P+qh!qUrs!r!u$`&y&|*S,],_0zQ/q*uQ0U+bQ4T/|Q6l4UT;a&]*QT!gR$zS!fR$zS&O!]&eS&T!`*PS+[%}+qT+h&]*QT&b!b${Q#m^R(S#rT'x#m'yR1j,wT(h#z(jR(p#}Q.Z)dQ2e._Q3a/YQ5b2dQ6U3eQ7_5dQ7p6TQ8f7eQ8o7rR9V8plhOSj}!n$b%h%k%l%n*w*|/t/wQ%byR*l%_V%Ors*uR/S*]R*k%]Q$vpR)|$wR)r$qT%fz%iT%gz%iT/v*|/w",
            nodeNames: "\u26A0 extends ArithOp ArithOp InterpolationStart LineComment BlockComment Script ExportDeclaration export Star as VariableName String from ; default FunctionDeclaration async function VariableDefinition > TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression PrivatePropertyName BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
            maxTerm: 338,
            context: Tm,
            nodeProps: [
                ["closedBy", 4, "InterpolationEnd", 43, "]", 53, "}", 68, ")", 136, "JSXSelfCloseEndTag JSXEndTag", 152, "JSXEndTag"],
                ["group", -26, 8, 15, 17, 60, 191, 195, 198, 199, 201, 204, 207, 218, 220, 226, 228, 230, 232, 235, 241, 247, 249, 251, 253, 255, 257, 258, "Statement", -30, 12, 13, 25, 28, 29, 34, 44, 46, 47, 49, 54, 62, 70, 76, 77, 94, 95, 104, 106, 123, 126, 128, 129, 130, 131, 133, 134, 154, 155, 157, "Expression", -23, 24, 26, 30, 33, 35, 37, 158, 160, 162, 163, 165, 166, 167, 169, 170, 171, 173, 174, 175, 185, 187, 189, 190, "Type", -3, 81, 87, 93, "ClassItem"],
                ["openedBy", 31, "InterpolationStart", 48, "[", 52, "{", 67, "(", 135, "JSXStartTag", 147, "JSXStartTag JSXStartCloseTag"]
            ],
            propSources: [zm],
            skippedNodes: [0, 5, 6],
            repeatNodeCount: 28,
            tokenData: "#2T~R!bOX%ZXY%uYZ'kZ[%u[]%Z]^'k^p%Zpq%uqr(Rrs)mst7]tu9guv<avw=bwx>lxyJcyzJyz{Ka{|Lm|}MW}!OLm!O!PMn!P!Q!$v!Q!R!Er!R![!G_![!]!Nc!]!^!N{!^!_# c!_!`#!`!`!a##d!a!b#%s!b!c%Z!c!}9g!}#O#'h#O#P%Z#P#Q#(O#Q#R#(f#R#S9g#S#T#)P#T#o#)g#o#p#,a#p#q#,f#q#r#-S#r#s#-l#s$f%Z$f$g%u$g#BY9g#BY#BZ#.S#BZ$IS9g$IS$I_#.S$I_$I|9g$I|$I}#0q$I}$JO#0q$JO$JT9g$JT$JU#.S$JU$KV9g$KV$KW#.S$KW&FU9g&FU&FV#.S&FV;'S9g;'S;=`<Z<%l?HT9g?HT?HU#.S?HUO9gW%`T$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%ZW%rP;=`<%l%Z7Z%|i$[W'a7ROX%ZXY%uYZ%ZZ[%u[p%Zpq%uq!^%Z!_#o%Z#p$f%Z$f$g%u$g#BY%Z#BY#BZ%u#BZ$IS%Z$IS$I_%u$I_$JT%Z$JT$JU%u$JU$KV%Z$KV$KW%u$KW&FU%Z&FU&FV%u&FV;'S%Z;'S;=`%o<%l?HT%Z?HT?HU%u?HUO%Z7Z'rT$[W'b7RO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&y(YU$[W!l&qO!^%Z!_!`(l!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t(sU#i&l$[WO!^%Z!_!`)V!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t)^T#i&l$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z1i)t]$[W]&ZOY)mYZ*mZr)mrs,js!^)m!^!_-S!_#O)m#O#P1q#P#o)m#o#p-S#p;'S)m;'S;=`7V<%lO)m,^*rX$[WOr*mrs+_s!^*m!^!_+u!_#o*m#o#p+u#p;'S*m;'S;=`,d<%lO*m,^+fT$V,U$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z,U+xTOr+urs,Xs;'S+u;'S;=`,^<%lO+u,U,^O$V,U,U,aP;=`<%l+u,^,gP;=`<%l*m1i,sT$V,U$[W]&ZO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z1a-XX]&ZOY-SYZ+uZr-Srs-ts#O-S#O#P-{#P;'S-S;'S;=`1k<%lO-S1a-{O$V,U]&Z1a.OUOr-Srs.bs;'S-S;'S;=`0y;=`<%l/R<%lO-S1a.iW$V,U]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s<%lO/R&Z/WW]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s<%lO/R&Z/uO]&Z&Z/xRO;'S/R;'S;=`0R;=`O/R&Z0WX]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s;=`<%l/R<%lO/R&Z0vP;=`<%l/R1a1OX]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s;=`<%l-S<%lO/R1a1nP;=`<%l-S1i1vY$[WOr)mrs2fs!^)m!^!_-S!_#o)m#o#p-S#p;'S)m;'S;=`6e;=`<%l/R<%lO)m1i2o]$V,U$[W]&ZOY3hYZ%ZZr3hrs4hs!^3h!^!_/R!_#O3h#O#P5O#P#o3h#o#p/R#p;'S3h;'S;=`6_<%lO3h&c3o]$[W]&ZOY3hYZ%ZZr3hrs4hs!^3h!^!_/R!_#O3h#O#P5O#P#o3h#o#p/R#p;'S3h;'S;=`6_<%lO3h&c4oT$[W]&ZO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c5TW$[WO!^3h!^!_/R!_#o3h#o#p/R#p;'S3h;'S;=`5m;=`<%l/R<%lO3h&c5rX]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s;=`<%l3h<%lO/R&c6bP;=`<%l3h1i6jX]&ZOY/RZr/Rrs/ps#O/R#O#P/u#P;'S/R;'S;=`0s;=`<%l)m<%lO/R1i7YP;=`<%l)m#]7b]$[WOt%Ztu8Zu!^%Z!_!c%Z!c!}8Z!}#R%Z#R#S8Z#S#T%Z#T#o8Z#p$g%Z$g;'S8Z;'S;=`9a<%lO8Z#]8b_$[W'u#TOt%Ztu8Zu!Q%Z!Q![8Z![!^%Z!_!c%Z!c!}8Z!}#R%Z#R#S8Z#S#T%Z#T#o8Z#p$g%Z$g;'S8Z;'S;=`9a<%lO8Z#]9dP;=`<%l8Z,T9ra$[W'm#S'd)s$OSOt%Ztu9gu}%Z}!O:w!O!Q%Z!Q![9g![!^%Z!_!c%Z!c!}9g!}#R%Z#R#S9g#S#T%Z#T#o9g#p$g%Z$g;'S9g;'S;=`<Z<%lO9g[;Oa$[W$OSOt%Ztu:wu}%Z}!O:w!O!Q%Z!Q![:w![!^%Z!_!c%Z!c!}:w!}#R%Z#R#S:w#S#T%Z#T#o:w#p$g%Z$g;'S:w;'S;=`<T<%lO:w[<WP;=`<%l:w,T<^P;=`<%l9g&t<hU#a&l$[WO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t=RT$[W#s&lO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z(h=iW(O(`$[WOv%Zvw>Rw!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t>YU$[W#m&lO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z1i>s]$[W]&ZOY>lYZ?lZw>lwx,jx!^>l!^!_@|!_#O>l#O#PE_#P#o>l#o#p@|#p;'S>l;'S;=`J]<%lO>l,^?qX$[WOw?lwx+_x!^?l!^!_@^!_#o?l#o#p@^#p;'S?l;'S;=`@v<%lO?l,U@aTOw@^wx,Xx;'S@^;'S;=`@p<%lO@^,U@sP;=`<%l@^,^@yP;=`<%l?l1aARX]&ZOY@|YZ@^Zw@|wx-tx#O@|#O#PAn#P;'S@|;'S;=`EX<%lO@|1aAqUOw@|wxBTx;'S@|;'S;=`Dg;=`<%lBt<%lO@|1aB[W$V,U]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da<%lOBt&ZByW]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da<%lOBt&ZCfRO;'SBt;'S;=`Co;=`OBt&ZCtX]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da;=`<%lBt<%lOBt&ZDdP;=`<%lBt1aDlX]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da;=`<%l@|<%lOBt1aE[P;=`<%l@|1iEdY$[WOw>lwxFSx!^>l!^!_@|!_#o>l#o#p@|#p;'S>l;'S;=`Ik;=`<%lBt<%lO>l1iF]]$V,U$[W]&ZOYGUYZ%ZZwGUwx4hx!^GU!^!_Bt!_#OGU#O#PHU#P#oGU#o#pBt#p;'SGU;'S;=`Ie<%lOGU&cG]]$[W]&ZOYGUYZ%ZZwGUwx4hx!^GU!^!_Bt!_#OGU#O#PHU#P#oGU#o#pBt#p;'SGU;'S;=`Ie<%lOGU&cHZW$[WO!^GU!^!_Bt!_#oGU#o#pBt#p;'SGU;'S;=`Hs;=`<%lBt<%lOGU&cHxX]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da;=`<%lGU<%lOBt&cIhP;=`<%lGU1iIpX]&ZOYBtZwBtwx/px#OBt#O#PCc#P;'SBt;'S;=`Da;=`<%l>l<%lOBt1iJ`P;=`<%l>l*qJjT!f*i$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z$PKQT!e#w$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z)ZKjW'e#e#b&l$[WOz%Zz{LS{!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z&tLZU#_&l$[WO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z*qLtUk*i$[WO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z,TM_T!T+{$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z,TMuX$[Wx(dO!O%Z!O!PNb!P!Q%Z!Q![! d![!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z$oNgV$[WO!O%Z!O!PN|!P!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z$o! TT!S$g$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c! k]$[Wl&ZO!Q%Z!Q![! d![!^%Z!_!g%Z!g!h!!d!h#R%Z#R#S! d#S#X%Z#X#Y!!d#Y#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!!i]$[WO{%Z{|!#b|}%Z}!O!#b!O!Q%Z!Q![!$S![!^%Z!_#R%Z#R#S!$S#S#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!#gX$[WO!Q%Z!Q![!$S![!^%Z!_#R%Z#R#S!$S#S#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!$ZX$[Wl&ZO!Q%Z!Q![!$S![!^%Z!_#R%Z#R#S!$S#S#o%Z#p;'S%Z;'S;=`%o<%lO%Z7Z!$}b$[W#`&lOY!&VYZ%ZZz!&Vz{!-n{!P!&V!P!Q!BV!Q!^!&V!^!_!(f!_!`!Ch!`!a!Dm!a!}!&V!}#O!+T#O#P!,v#P#o!&V#o#p!(f#p;'S!&V;'S;=`!-h<%lO!&VX!&^^$[W!PPOY!&VYZ%ZZ!P!&V!P!Q!'Y!Q!^!&V!^!_!(f!_!}!&V!}#O!+T#O#P!,v#P#o!&V#o#p!(f#p;'S!&V;'S;=`!-h<%lO!&VX!'aa$[W!PPO!^%Z!_#Z%Z#Z#[!'Y#[#]%Z#]#^!'Y#^#a%Z#a#b!'Y#b#g%Z#g#h!'Y#h#i%Z#i#j!'Y#j#m%Z#m#n!'Y#n#o%Z#p;'S%Z;'S;=`%o<%lO%ZP!(kX!PPOY!(fZ!P!(f!P!Q!)W!Q!}!(f!}#O!)o#O#P!*n#P;'S!(f;'S;=`!*}<%lO!(fP!)]U!PP#Z#[!)W#]#^!)W#a#b!)W#g#h!)W#i#j!)W#m#n!)WP!)rVOY!)oZ#O!)o#O#P!*X#P#Q!(f#Q;'S!)o;'S;=`!*h<%lO!)oP!*[SOY!)oZ;'S!)o;'S;=`!*h<%lO!)oP!*kP;=`<%l!)oP!*qSOY!(fZ;'S!(f;'S;=`!*}<%lO!(fP!+QP;=`<%l!(fX!+Y[$[WOY!+TYZ%ZZ!^!+T!^!_!)o!_#O!+T#O#P!,O#P#Q!&V#Q#o!+T#o#p!)o#p;'S!+T;'S;=`!,p<%lO!+TX!,TX$[WOY!+TYZ%ZZ!^!+T!^!_!)o!_#o!+T#o#p!)o#p;'S!+T;'S;=`!,p<%lO!+TX!,sP;=`<%l!+TX!,{X$[WOY!&VYZ%ZZ!^!&V!^!_!(f!_#o!&V#o#p!(f#p;'S!&V;'S;=`!-h<%lO!&VX!-kP;=`<%l!&V7Z!-u`$[W!PPOY!-nYZ!.wZz!-nz{!2U{!P!-n!P!Q!@m!Q!^!-n!^!_!4m!_!}!-n!}#O!;l#O#P!?o#P#o!-n#o#p!4m#p;'S!-n;'S;=`!@g<%lO!-n7Z!.|X$[WOz!.wz{!/i{!^!.w!^!_!0w!_#o!.w#o#p!0w#p;'S!.w;'S;=`!2O<%lO!.w7Z!/nZ$[WOz!.wz{!/i{!P!.w!P!Q!0a!Q!^!.w!^!_!0w!_#o!.w#o#p!0w#p;'S!.w;'S;=`!2O<%lO!.w7Z!0hT$[WU7RO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z7R!0zTOz!0wz{!1Z{;'S!0w;'S;=`!1x<%lO!0w7R!1^VOz!0wz{!1Z{!P!0w!P!Q!1s!Q;'S!0w;'S;=`!1x<%lO!0w7R!1xOU7R7R!1{P;=`<%l!0w7Z!2RP;=`<%l!.w7Z!2]`$[W!PPOY!-nYZ!.wZz!-nz{!2U{!P!-n!P!Q!3_!Q!^!-n!^!_!4m!_!}!-n!}#O!;l#O#P!?o#P#o!-n#o#p!4m#p;'S!-n;'S;=`!@g<%lO!-n7Z!3ha$[WU7R!PPO!^%Z!_#Z%Z#Z#[!'Y#[#]%Z#]#^!'Y#^#a%Z#a#b!'Y#b#g%Z#g#h!'Y#h#i%Z#i#j!'Y#j#m%Z#m#n!'Y#n#o%Z#p;'S%Z;'S;=`%o<%lO%Z7R!4r[!PPOY!4mYZ!0wZz!4mz{!5h{!P!4m!P!Q!:b!Q!}!4m!}#O!6|#O#P!9r#P;'S!4m;'S;=`!:[<%lO!4m7R!5m[!PPOY!4mYZ!0wZz!4mz{!5h{!P!4m!P!Q!6c!Q!}!4m!}#O!6|#O#P!9r#P;'S!4m;'S;=`!:[<%lO!4m7R!6jUU7R!PP#Z#[!)W#]#^!)W#a#b!)W#g#h!)W#i#j!)W#m#n!)W7R!7PYOY!6|YZ!0wZz!6|z{!7o{#O!6|#O#P!9S#P#Q!4m#Q;'S!6|;'S;=`!9l<%lO!6|7R!7r[OY!6|YZ!0wZz!6|z{!7o{!P!6|!P!Q!8h!Q#O!6|#O#P!9S#P#Q!4m#Q;'S!6|;'S;=`!9l<%lO!6|7R!8mVU7ROY!)oZ#O!)o#O#P!*X#P#Q!(f#Q;'S!)o;'S;=`!*h<%lO!)o7R!9VVOY!6|YZ!0wZz!6|z{!7o{;'S!6|;'S;=`!9l<%lO!6|7R!9oP;=`<%l!6|7R!9uVOY!4mYZ!0wZz!4mz{!5h{;'S!4m;'S;=`!:[<%lO!4m7R!:_P;=`<%l!4m7R!:ga!PPOz!0wz{!1Z{#Z!0w#Z#[!:b#[#]!0w#]#^!:b#^#a!0w#a#b!:b#b#g!0w#g#h!:b#h#i!0w#i#j!:b#j#m!0w#m#n!:b#n;'S!0w;'S;=`!1x<%lO!0w7Z!;q^$[WOY!;lYZ!.wZz!;lz{!<m{!^!;l!^!_!6|!_#O!;l#O#P!>q#P#Q!-n#Q#o!;l#o#p!6|#p;'S!;l;'S;=`!?i<%lO!;l7Z!<r`$[WOY!;lYZ!.wZz!;lz{!<m{!P!;l!P!Q!=t!Q!^!;l!^!_!6|!_#O!;l#O#P!>q#P#Q!-n#Q#o!;l#o#p!6|#p;'S!;l;'S;=`!?i<%lO!;l7Z!={[$[WU7ROY!+TYZ%ZZ!^!+T!^!_!)o!_#O!+T#O#P!,O#P#Q!&V#Q#o!+T#o#p!)o#p;'S!+T;'S;=`!,p<%lO!+T7Z!>vZ$[WOY!;lYZ!.wZz!;lz{!<m{!^!;l!^!_!6|!_#o!;l#o#p!6|#p;'S!;l;'S;=`!?i<%lO!;l7Z!?lP;=`<%l!;l7Z!?tZ$[WOY!-nYZ!.wZz!-nz{!2U{!^!-n!^!_!4m!_#o!-n#o#p!4m#p;'S!-n;'S;=`!@g<%lO!-n7Z!@jP;=`<%l!-n7Z!@te$[W!PPOz!.wz{!/i{!^!.w!^!_!0w!_#Z!.w#Z#[!@m#[#]!.w#]#^!@m#^#a!.w#a#b!@m#b#g!.w#g#h!@m#h#i!.w#i#j!@m#j#m!.w#m#n!@m#n#o!.w#o#p!0w#p;'S!.w;'S;=`!2O<%lO!.w7Z!B^X$[WT7ROY!BVYZ%ZZ!^!BV!^!_!By!_#o!BV#o#p!By#p;'S!BV;'S;=`!Cb<%lO!BV7R!COST7ROY!ByZ;'S!By;'S;=`!C[<%lO!By7R!C_P;=`<%l!By7Z!CeP;=`<%l!BV&u!Cq^$[W#s&l!PPOY!&VYZ%ZZ!P!&V!P!Q!'Y!Q!^!&V!^!_!(f!_!}!&V!}#O!+T#O#P!,v#P#o!&V#o#p!(f#p;'S!&V;'S;=`!-h<%lO!&V]!Dv^#{S$[W!PPOY!&VYZ%ZZ!P!&V!P!Q!'Y!Q!^!&V!^!_!(f!_!}!&V!}#O!+T#O#P!,v#P#o!&V#o#p!(f#p;'S!&V;'S;=`!-h<%lO!&V&c!Eyf$[Wl&ZO!O%Z!O!P! d!P!Q%Z!Q![!G_![!^%Z!_!g%Z!g!h!!d!h#R%Z#R#S!G_#S#U%Z#U#V!IR#V#X%Z#X#Y!!d#Y#b%Z#b#c!Hk#c#d!Js#d#l%Z#l#m!L_#m#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!Gfa$[Wl&ZO!O%Z!O!P! d!P!Q%Z!Q![!G_![!^%Z!_!g%Z!g!h!!d!h#R%Z#R#S!G_#S#X%Z#X#Y!!d#Y#b%Z#b#c!Hk#c#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!HrT$[Wl&ZO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!IWY$[WO!Q%Z!Q!R!Iv!R!S!Iv!S!^%Z!_#R%Z#R#S!Iv#S#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!I}[$[Wl&ZO!Q%Z!Q!R!Iv!R!S!Iv!S!^%Z!_#R%Z#R#S!Iv#S#b%Z#b#c!Hk#c#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!JxX$[WO!Q%Z!Q!Y!Ke!Y!^%Z!_#R%Z#R#S!Ke#S#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!KlZ$[Wl&ZO!Q%Z!Q!Y!Ke!Y!^%Z!_#R%Z#R#S!Ke#S#b%Z#b#c!Hk#c#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!Ld]$[WO!Q%Z!Q![!M]![!^%Z!_!c%Z!c!i!M]!i#R%Z#R#S!M]#S#T%Z#T#Z!M]#Z#o%Z#p;'S%Z;'S;=`%o<%lO%Z&c!Md_$[Wl&ZO!Q%Z!Q![!M]![!^%Z!_!c%Z!c!i!M]!i#R%Z#R#S!M]#S#T%Z#T#Z!M]#Z#b%Z#b#c!Hk#c#o%Z#p;'S%Z;'S;=`%o<%lO%Z(m!NlT!_V$[W#q(^O!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z!P# ST_w$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z6i# nR'h$Y!c(O#|,_(SP!P!Q# w!^!_# |!_!`#!ZW# |O$^W&l#!RP#c&l!_!`#!U&l#!ZO#s&l&l#!`O#d&l(m#!gV#O(e$[WO!^%Z!_!`(l!`!a#!|!a#o%Z#p;'S%Z;'S;=`%o<%lO%Z&u##TT#Z&m$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z(m##oVe!s#d&l$XS$[WO!^%Z!_!`#$U!`!a#$l!a#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t#$]T#d&l$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t#$sV#c&l$[WO!^%Z!_!`<z!`!a#%Y!a#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t#%aU#c&l$[WO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z(m#%zX'v&q$[WO!O%Z!O!P#&g!P!^%Z!_!a%Z!a!b#&}!b#o%Z#p;'S%Z;'S;=`%o<%lO%Z(i#&nTy(a$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t#'UU$[W#n&lO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z,P#'oT{+w$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z$P#(VT!Q#w$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z&t#(mU#k&l$[WO!^%Z!_!`<z!`#o%Z#p;'S%Z;'S;=`%o<%lO%Z){#)WT$[W'l)sO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z,T#)ra$[W'm#S'd)s$QSOt%Ztu#)gu}%Z}!O#*w!O!Q%Z!Q![#)g![!^%Z!_!c%Z!c!}#)g!}#R%Z#R#S#)g#S#T%Z#T#o#)g#p$g%Z$g;'S#)g;'S;=`#,Z<%lO#)g[#+Oa$[W$QSOt%Ztu#*wu}%Z}!O#*w!O!Q%Z!Q![#*w![!^%Z!_!c%Z!c!}#*w!}#R%Z#R#S#*w#S#T%Z#T#o#*w#p$g%Z$g;'S#*w;'S;=`#,T<%lO#*w[#,WP;=`<%l#*w,T#,^P;=`<%l#)g~#,fO!V~(h#,mV'}(`$[WO!^%Z!_!`<z!`#o%Z#p#q#&}#q;'S%Z;'S;=`%o<%lO%Z(}#-]T!U(soQ$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%ZX#-sT!mP$[WO!^%Z!_#o%Z#p;'S%Z;'S;=`%o<%lO%Z7Z#.at$[W'a7R'm#S'd)s$OSOX%ZXY%uYZ%ZZ[%u[p%Zpq%uqt%Ztu9gu}%Z}!O:w!O!Q%Z!Q![9g![!^%Z!_!c%Z!c!}9g!}#R%Z#R#S9g#S#T%Z#T#o9g#p$f%Z$f$g%u$g#BY9g#BY#BZ#.S#BZ$IS9g$IS$I_#.S$I_$JT9g$JT$JU#.S$JU$KV9g$KV$KW#.S$KW&FU9g&FU&FV#.S&FV;'S9g;'S;=`<Z<%l?HT9g?HT?HU#.S?HUO9g7Z#1Oa$[W'b7R'm#S'd)s$OSOt%Ztu9gu}%Z}!O:w!O!Q%Z!Q![9g![!^%Z!_!c%Z!c!}9g!}#R%Z#R#S9g#S#T%Z#T#o9g#p$g%Z$g;'S9g;'S;=`<Z<%lO9g",
            tokenizers: [Rm, vm, wm, Xm, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, km],
            topRules: {
                Script: [0, 7]
            },
            dialects: {
                jsx: 12739,
                ts: 12741
            },
            dynamicPrecedences: {
                "155": 1,
                "183": 1
            },
            specialized: [{
                term: 296,
                get: n => Wm[n] || -1
            }, {
                term: 305,
                get: n => qm[n] || -1
            }, {
                term: 65,
                get: n => Zm[n] || -1
            }],
            tokenPrec: 12764
        });
    var _m = [We("function ${name}(${params}) {\n	${}\n}", {
            label: "function",
            detail: "definition",
            type: "keyword"
        }), We("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
            label: "for",
            detail: "loop",
            type: "keyword"
        }), We("for (let ${name} of ${collection}) {\n	${}\n}", {
            label: "for",
            detail: "of loop",
            type: "keyword"
        }), We("do {\n	${}\n} while (${})", {
            label: "do",
            detail: "loop",
            type: "keyword"
        }), We("while (${}) {\n	${}\n}", {
            label: "while",
            detail: "loop",
            type: "keyword"
        }), We(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
            label: "try",
            detail: "/ catch block",
            type: "keyword"
        }), We("if (${}) {\n	${}\n}", {
            label: "if",
            detail: "block",
            type: "keyword"
        }), We(`if (\${}) {
	\${}
} else {
	\${}
}`, {
            label: "if",
            detail: "/ else block",
            type: "keyword"
        }), We(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
            label: "class",
            detail: "definition",
            type: "keyword"
        }), We('import {${names}} from "${module}"\n${}', {
            label: "import",
            detail: "named",
            type: "keyword"
        }), We('import ${name} from "${module}"\n${}', {
            label: "import",
            detail: "default",
            type: "keyword"
        })],
        ah = new Os,
        hh = new Set(["Script", "Block", "FunctionExpression", "FunctionDeclaration", "ArrowFunction", "MethodDeclaration", "ForStatement"]);

    function Ei(n) {
        return (e, t) => {
            let i = e.node.getChild("VariableDefinition");
            return i && t(i, n), !0
        }
    }
    var Vm = ["FunctionDeclaration"],
        Um = {
            FunctionDeclaration: Ei("function"),
            ClassDeclaration: Ei("class"),
            ClassExpression: () => !0,
            EnumDeclaration: Ei("constant"),
            TypeAliasDeclaration: Ei("type"),
            NamespaceDeclaration: Ei("namespace"),
            VariableDefinition(n, e) {
                n.matchContext(Vm) || e(n, "variable")
            },
            TypeDefinition(n, e) {
                e(n, "type")
            },
            __proto__: null
        };

    function ch(n, e) {
        let t = ah.get(e);
        if (t) return t;
        let i = [],
            r = !0;

        function s(O, o) {
            let l = n.sliceString(O.from, O.to);
            i.push({
                label: l,
                type: o
            })
        }
        return e.cursor(C.IncludeAnonymous).iterate(O => {
            if (r) r = !1;
            else if (O.name) {
                let o = Um[O.name];
                if (o && o(O, s) || hh.has(O.name)) return !1
            } else if (O.to - O.from > 8192) {
                for (let o of ch(n, O.node)) i.push(o);
                return !1
            }
        }), ah.set(e, i), i
    }
    var uh = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/,
        fh = ["TemplateString", "String", "RegExp", "LineComment", "BlockComment", "VariableDefinition", "TypeDefinition", "Label", "PropertyDefinition", "PropertyName", "PrivatePropertyDefinition", "PrivatePropertyName"];

    function Cm(n) {
        let e = L(n.state).resolveInner(n.pos, -1);
        if (fh.indexOf(e.name) > -1) return null;
        let t = e.name == "VariableName" || e.to - e.from < 20 && uh.test(n.state.sliceDoc(e.from, e.to));
        if (!t && !n.explicit) return null;
        let i = [];
        for (let r = e; r; r = r.parent) hh.has(r.name) && (i = i.concat(ch(n.state.doc, r)));
        return {
            options: i,
            from: t ? e.from : n.pos,
            validFor: uh
        }
    }
    var ot = te.define({
            name: "javascript",
            parser: lh.configure({
                props: [$e.add({
                    IfStatement: ue({
                        except: /^\s*({|else\b)/
                    }),
                    TryStatement: ue({
                        except: /^\s*({|catch\b|finally\b)/
                    }),
                    LabeledStatement: Yl,
                    SwitchBody: n => {
                        let e = n.textAfter,
                            t = /^\s*\}/.test(e),
                            i = /^\s*(case|default)\b/.test(e);
                        return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit
                    },
                    Block: Rn({
                        closing: "}"
                    }),
                    ArrowFunction: n => n.baseIndent + n.unit,
                    "TemplateString BlockComment": () => null,
                    "Statement Property": ue({
                        except: /^{/
                    }),
                    JSXElement(n) {
                        let e = /^\s*<\//.test(n.textAfter);
                        return n.lineIndent(n.node.from) + (e ? 0 : n.unit)
                    },
                    JSXEscape(n) {
                        let e = /\s*\}/.test(n.textAfter);
                        return n.lineIndent(n.node.from) + (e ? 0 : n.unit)
                    },
                    "JSXOpenTag JSXSelfClosingTag" (n) {
                        return n.column(n.node.from) + n.unit
                    }
                }), ge.add({
                    "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression": bt,
                    BlockComment(n) {
                        return {
                            from: n.from + 2,
                            to: n.to - 2
                        }
                    }
                })]
            }),
            languageData: {
                closeBrackets: {
                    brackets: ["(", "[", "{", "'", '"', "`"]
                },
                commentTokens: {
                    line: "//",
                    block: {
                        open: "/*",
                        close: "*/"
                    }
                },
                indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
                wordChars: "$"
            }
        }),
        Vs = ot.configure({
            dialect: "ts"
        }, "typescript"),
        Us = ot.configure({
            dialect: "jsx"
        }),
        Cs = ot.configure({
            dialect: "jsx ts"
        }, "typescript"),
        Am = "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(n => ({
            label: n,
            type: "keyword"
        }));

    function En(n = {}) {
        let e = n.jsx ? n.typescript ? Cs : Us : n.typescript ? Vs : ot;
        return new ce(e, [ot.data.of({
            autocomplete: zn(fh, Zi(_m.concat(Am)))
        }), ot.data.of({
            autocomplete: Cm
        }), n.jsx ? Ym : []])
    }

    function dh(n, e, t = n.length) {
        if (!e) return "";
        let i = e.getChild("JSXIdentifier");
        return i ? n.sliceString(i.from, Math.min(i.to, t)) : ""
    }
    var jm = typeof navigator == "object" && /Android\b/.test(navigator.userAgent),
        Ym = w.inputHandler.of((n, e, t, i) => {
            if ((jm ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !ot.isActiveAt(n.state, e, -1)) return !1;
            let {
                state: r
            } = n, s = r.changeByRange(O => {
                var o, l, a;
                let {
                    head: h
                } = O, c = L(r).resolveInner(h, -1), f;
                if (c.name == "JSXStartTag" && (c = c.parent), i == ">" && c.name == "JSXFragmentTag") return {
                    range: y.cursor(h + 1),
                    changes: {
                        from: h,
                        insert: "><>"
                    }
                };
                if (i == ">" && c.name == "JSXIdentifier") {
                    if (((l = (o = c.parent) === null || o === void 0 ? void 0 : o.lastChild) === null || l === void 0 ? void 0 : l.name) != "JSXEndTag" && (f = dh(r.doc, c.parent, h))) return {
                        range: y.cursor(h + 1),
                        changes: {
                            from: h,
                            insert: `></${f}>`
                        }
                    }
                } else if (i == "/" && c.name == "JSXFragmentTag") {
                    let d = c.parent,
                        p = d == null ? void 0 : d.parent;
                    if (d.from == h - 1 && ((a = p.lastChild) === null || a === void 0 ? void 0 : a.name) != "JSXEndTag" && (f = dh(r.doc, p == null ? void 0 : p.firstChild, h))) {
                        let m = `/${f}>`;
                        return {
                            range: y.cursor(h + m.length),
                            changes: {
                                from: h,
                                insert: m
                            }
                        }
                    }
                }
                return {
                    range: O
                }
            });
            return s.changes.empty ? !1 : (n.dispatch(s, {
                userEvent: "input.type",
                scrollIntoView: !0
            }), !0)
        });
    var Di = ["_blank", "_self", "_top", "_parent"],
        As = ["ascii", "utf-8", "utf-16", "latin1", "latin1"],
        Ys = ["get", "post", "put", "delete"],
        js = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        Pe = ["true", "false"],
        P = {},
        Gm = {
            a: {
                attrs: {
                    href: null,
                    ping: null,
                    type: null,
                    media: null,
                    target: Di,
                    hreflang: null
                }
            },
            abbr: P,
            address: P,
            area: {
                attrs: {
                    alt: null,
                    coords: null,
                    href: null,
                    target: null,
                    ping: null,
                    media: null,
                    hreflang: null,
                    type: null,
                    shape: ["default", "rect", "circle", "poly"]
                }
            },
            article: P,
            aside: P,
            audio: {
                attrs: {
                    src: null,
                    mediagroup: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["none", "metadata", "auto"],
                    autoplay: ["autoplay"],
                    loop: ["loop"],
                    controls: ["controls"]
                }
            },
            b: P,
            base: {
                attrs: {
                    href: null,
                    target: Di
                }
            },
            bdi: P,
            bdo: P,
            blockquote: {
                attrs: {
                    cite: null
                }
            },
            body: P,
            br: P,
            button: {
                attrs: {
                    form: null,
                    formaction: null,
                    name: null,
                    value: null,
                    autofocus: ["autofocus"],
                    disabled: ["autofocus"],
                    formenctype: js,
                    formmethod: Ys,
                    formnovalidate: ["novalidate"],
                    formtarget: Di,
                    type: ["submit", "reset", "button"]
                }
            },
            canvas: {
                attrs: {
                    width: null,
                    height: null
                }
            },
            caption: P,
            center: P,
            cite: P,
            code: P,
            col: {
                attrs: {
                    span: null
                }
            },
            colgroup: {
                attrs: {
                    span: null
                }
            },
            command: {
                attrs: {
                    type: ["command", "checkbox", "radio"],
                    label: null,
                    icon: null,
                    radiogroup: null,
                    command: null,
                    title: null,
                    disabled: ["disabled"],
                    checked: ["checked"]
                }
            },
            data: {
                attrs: {
                    value: null
                }
            },
            datagrid: {
                attrs: {
                    disabled: ["disabled"],
                    multiple: ["multiple"]
                }
            },
            datalist: {
                attrs: {
                    data: null
                }
            },
            dd: P,
            del: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            details: {
                attrs: {
                    open: ["open"]
                }
            },
            dfn: P,
            div: P,
            dl: P,
            dt: P,
            em: P,
            embed: {
                attrs: {
                    src: null,
                    type: null,
                    width: null,
                    height: null
                }
            },
            eventsource: {
                attrs: {
                    src: null
                }
            },
            fieldset: {
                attrs: {
                    disabled: ["disabled"],
                    form: null,
                    name: null
                }
            },
            figcaption: P,
            figure: P,
            footer: P,
            form: {
                attrs: {
                    action: null,
                    name: null,
                    "accept-charset": As,
                    autocomplete: ["on", "off"],
                    enctype: js,
                    method: Ys,
                    novalidate: ["novalidate"],
                    target: Di
                }
            },
            h1: P,
            h2: P,
            h3: P,
            h4: P,
            h5: P,
            h6: P,
            head: {
                children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
            },
            header: P,
            hgroup: P,
            hr: P,
            html: {
                attrs: {
                    manifest: null
                }
            },
            i: P,
            iframe: {
                attrs: {
                    src: null,
                    srcdoc: null,
                    name: null,
                    width: null,
                    height: null,
                    sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
                    seamless: ["seamless"]
                }
            },
            img: {
                attrs: {
                    alt: null,
                    src: null,
                    ismap: null,
                    usemap: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"]
                }
            },
            input: {
                attrs: {
                    alt: null,
                    dirname: null,
                    form: null,
                    formaction: null,
                    height: null,
                    list: null,
                    max: null,
                    maxlength: null,
                    min: null,
                    name: null,
                    pattern: null,
                    placeholder: null,
                    size: null,
                    src: null,
                    step: null,
                    value: null,
                    width: null,
                    accept: ["audio/*", "video/*", "image/*"],
                    autocomplete: ["on", "off"],
                    autofocus: ["autofocus"],
                    checked: ["checked"],
                    disabled: ["disabled"],
                    formenctype: js,
                    formmethod: Ys,
                    formnovalidate: ["novalidate"],
                    formtarget: Di,
                    multiple: ["multiple"],
                    readonly: ["readonly"],
                    required: ["required"],
                    type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"]
                }
            },
            ins: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            kbd: P,
            keygen: {
                attrs: {
                    challenge: null,
                    form: null,
                    name: null,
                    autofocus: ["autofocus"],
                    disabled: ["disabled"],
                    keytype: ["RSA"]
                }
            },
            label: {
                attrs: {
                    for: null,
                    form: null
                }
            },
            legend: P,
            li: {
                attrs: {
                    value: null
                }
            },
            link: {
                attrs: {
                    href: null,
                    type: null,
                    hreflang: null,
                    media: null,
                    sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
                }
            },
            map: {
                attrs: {
                    name: null
                }
            },
            mark: P,
            menu: {
                attrs: {
                    label: null,
                    type: ["list", "context", "toolbar"]
                }
            },
            meta: {
                attrs: {
                    content: null,
                    charset: As,
                    name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
                    "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
                }
            },
            meter: {
                attrs: {
                    value: null,
                    min: null,
                    low: null,
                    high: null,
                    max: null,
                    optimum: null
                }
            },
            nav: P,
            noscript: P,
            object: {
                attrs: {
                    data: null,
                    type: null,
                    name: null,
                    usemap: null,
                    form: null,
                    width: null,
                    height: null,
                    typemustmatch: ["typemustmatch"]
                }
            },
            ol: {
                attrs: {
                    reversed: ["reversed"],
                    start: null,
                    type: ["1", "a", "A", "i", "I"]
                },
                children: ["li", "script", "template", "ul", "ol"]
            },
            optgroup: {
                attrs: {
                    disabled: ["disabled"],
                    label: null
                }
            },
            option: {
                attrs: {
                    disabled: ["disabled"],
                    label: null,
                    selected: ["selected"],
                    value: null
                }
            },
            output: {
                attrs: {
                    for: null,
                    form: null,
                    name: null
                }
            },
            p: P,
            param: {
                attrs: {
                    name: null,
                    value: null
                }
            },
            pre: P,
            progress: {
                attrs: {
                    value: null,
                    max: null
                }
            },
            q: {
                attrs: {
                    cite: null
                }
            },
            rp: P,
            rt: P,
            ruby: P,
            samp: P,
            script: {
                attrs: {
                    type: ["text/javascript"],
                    src: null,
                    async: ["async"],
                    defer: ["defer"],
                    charset: As
                }
            },
            section: P,
            select: {
                attrs: {
                    form: null,
                    name: null,
                    size: null,
                    autofocus: ["autofocus"],
                    disabled: ["disabled"],
                    multiple: ["multiple"]
                }
            },
            slot: {
                attrs: {
                    name: null
                }
            },
            small: P,
            source: {
                attrs: {
                    src: null,
                    type: null,
                    media: null
                }
            },
            span: P,
            strong: P,
            style: {
                attrs: {
                    type: ["text/css"],
                    media: null,
                    scoped: null
                }
            },
            sub: P,
            summary: P,
            sup: P,
            table: P,
            tbody: P,
            td: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null
                }
            },
            template: P,
            textarea: {
                attrs: {
                    dirname: null,
                    form: null,
                    maxlength: null,
                    name: null,
                    placeholder: null,
                    rows: null,
                    cols: null,
                    autofocus: ["autofocus"],
                    disabled: ["disabled"],
                    readonly: ["readonly"],
                    required: ["required"],
                    wrap: ["soft", "hard"]
                }
            },
            tfoot: P,
            th: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null,
                    scope: ["row", "col", "rowgroup", "colgroup"]
                }
            },
            thead: P,
            time: {
                attrs: {
                    datetime: null
                }
            },
            title: P,
            tr: P,
            track: {
                attrs: {
                    src: null,
                    label: null,
                    default: null,
                    kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
                    srclang: null
                }
            },
            ul: {
                children: ["li", "script", "template", "ul", "ol"]
            },
            var: P,
            video: {
                attrs: {
                    src: null,
                    poster: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["auto", "metadata", "none"],
                    autoplay: ["autoplay"],
                    mediagroup: ["movie"],
                    muted: ["muted"],
                    controls: ["controls"]
                }
            },
            wbr: P
        },
        Em = {
            accesskey: null,
            class: null,
            contenteditable: Pe,
            contextmenu: null,
            dir: ["ltr", "rtl", "auto"],
            draggable: ["true", "false", "auto"],
            dropzone: ["copy", "move", "link", "string:", "file:"],
            hidden: ["hidden"],
            id: null,
            inert: ["inert"],
            itemid: null,
            itemprop: null,
            itemref: null,
            itemscope: ["itemscope"],
            itemtype: null,
            lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
            spellcheck: Pe,
            autocorrect: Pe,
            autocapitalize: Pe,
            style: null,
            tabindex: null,
            title: null,
            translate: ["yes", "no"],
            onclick: null,
            rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
            role: "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
            "aria-activedescendant": null,
            "aria-atomic": Pe,
            "aria-autocomplete": ["inline", "list", "both", "none"],
            "aria-busy": Pe,
            "aria-checked": ["true", "false", "mixed", "undefined"],
            "aria-controls": null,
            "aria-describedby": null,
            "aria-disabled": Pe,
            "aria-dropeffect": null,
            "aria-expanded": ["true", "false", "undefined"],
            "aria-flowto": null,
            "aria-grabbed": ["true", "false", "undefined"],
            "aria-haspopup": Pe,
            "aria-hidden": Pe,
            "aria-invalid": ["true", "false", "grammar", "spelling"],
            "aria-label": null,
            "aria-labelledby": null,
            "aria-level": null,
            "aria-live": ["off", "polite", "assertive"],
            "aria-multiline": Pe,
            "aria-multiselectable": Pe,
            "aria-owns": null,
            "aria-posinset": null,
            "aria-pressed": ["true", "false", "mixed", "undefined"],
            "aria-readonly": Pe,
            "aria-relevant": null,
            "aria-required": Pe,
            "aria-selected": ["true", "false", "undefined"],
            "aria-setsize": null,
            "aria-sort": ["ascending", "descending", "none", "other"],
            "aria-valuemax": null,
            "aria-valuemin": null,
            "aria-valuenow": null,
            "aria-valuetext": null
        },
        Mi = class {
            constructor(e, t) {
                this.tags = Object.assign(Object.assign({}, Gm), e), this.globalAttrs = Object.assign(Object.assign({}, Em), t), this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs)
            }
        };
    Mi.default = new Mi;

    function hi(n, e, t = n.length) {
        if (!e) return "";
        let i = e.firstChild,
            r = i && i.getChild("TagName");
        return r ? n.sliceString(r.from, Math.min(r.to, t)) : ""
    }

    function Dn(n, e = !1) {
        for (let t = n.parent; t; t = t.parent)
            if (t.name == "Element")
                if (e) e = !1;
                else return t;
        return null
    }

    function ph(n, e, t) {
        let i = t.tags[hi(n, Dn(e, !0))];
        return (i == null ? void 0 : i.children) || t.allTags
    }

    function Gs(n, e) {
        let t = [];
        for (let i = e; i = Dn(i);) {
            let r = hi(n, i);
            if (r && i.lastChild.name == "CloseTag") break;
            r && t.indexOf(r) < 0 && (e.name == "EndTag" || e.from >= i.firstChild.to) && t.push(r)
        }
        return t
    }
    var mh = /^[:\-\.\w\u00b7-\uffff]*$/;

    function $h(n, e, t, i, r) {
        let s = /\s*>/.test(n.sliceDoc(r, r + 5)) ? "" : ">";
        return {
            from: i,
            to: r,
            options: ph(n.doc, t, e).map(O => ({
                label: O,
                type: "type"
            })).concat(Gs(n.doc, t).map((O, o) => ({
                label: "/" + O,
                apply: "/" + O + s,
                type: "type",
                boost: 99 - o
            }))),
            validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
        }
    }

    function gh(n, e, t, i) {
        let r = /\s*>/.test(n.sliceDoc(i, i + 5)) ? "" : ">";
        return {
            from: t,
            to: i,
            options: Gs(n.doc, e).map((s, O) => ({
                label: s,
                apply: s + r,
                type: "type",
                boost: 99 - O
            })),
            validFor: mh
        }
    }

    function Dm(n, e, t, i) {
        let r = [],
            s = 0;
        for (let O of ph(n.doc, t, e)) r.push({
            label: "<" + O,
            type: "type"
        });
        for (let O of Gs(n.doc, t)) r.push({
            label: "</" + O + ">",
            type: "type",
            boost: 99 - s++
        });
        return {
            from: i,
            to: i,
            options: r,
            validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
        }
    }

    function Mm(n, e, t, i, r) {
        let s = Dn(t),
            O = s ? e.tags[hi(n.doc, s)] : null,
            o = O && O.attrs ? Object.keys(O.attrs).concat(e.globalAttrNames) : e.globalAttrNames;
        return {
            from: i,
            to: r,
            options: o.map(l => ({
                label: l,
                type: "property"
            })),
            validFor: mh
        }
    }

    function Im(n, e, t, i, r) {
        var s;
        let O = (s = t.parent) === null || s === void 0 ? void 0 : s.getChild("AttributeName"),
            o = [],
            l;
        if (O) {
            let a = n.sliceDoc(O.from, O.to),
                h = e.globalAttrs[a];
            if (!h) {
                let c = Dn(t),
                    f = c ? e.tags[hi(n.doc, c)] : null;
                h = (f == null ? void 0 : f.attrs) && f.attrs[a]
            }
            if (h) {
                let c = n.sliceDoc(i, r).toLowerCase(),
                    f = '"',
                    d = '"';
                /^['"]/.test(c) ? (l = c[0] == '"' ? /^[^"]*$/ : /^[^']*$/, f = "", d = n.sliceDoc(r, r + 1) == c[0] ? "" : c[0], c = c.slice(1), i++) : l = /^[^\s<>='"]*$/;
                for (let p of h) o.push({
                    label: p,
                    apply: f + p + d,
                    type: "constant"
                })
            }
        }
        return {
            from: i,
            to: r,
            options: o,
            validFor: l
        }
    }

    function Bm(n, e) {
        let {
            state: t,
            pos: i
        } = e, r = L(t).resolveInner(i), s = r.resolve(i, -1);
        for (let O = i, o; r == s && (o = s.childBefore(O));) {
            let l = o.lastChild;
            if (!l || !l.type.isError || l.from < l.to) break;
            r = s = o, O = l.from
        }
        return s.name == "TagName" ? s.parent && /CloseTag$/.test(s.parent.name) ? gh(t, s, s.from, i) : $h(t, n, s, s.from, i) : s.name == "StartTag" ? $h(t, n, s, i, i) : s.name == "StartCloseTag" || s.name == "IncompleteCloseTag" ? gh(t, s, i, i) : e.explicit && (s.name == "OpenTag" || s.name == "SelfClosingTag") || s.name == "AttributeName" ? Mm(t, n, s, s.name == "AttributeName" ? s.from : i, i) : s.name == "Is" || s.name == "AttributeValue" || s.name == "UnquotedAttributeValue" ? Im(t, n, s, s.name == "Is" ? i : s.from, i) : e.explicit && (r.name == "Element" || r.name == "Text" || r.name == "Document") ? Dm(t, n, s, i) : null
    }

    function Nm(n) {
        let {
            extraTags: e,
            extraGlobalAttributes: t
        } = n, i = t || e ? new Mi(e, t) : Mi.default;
        return r => Bm(i, r)
    }
    var Es = te.define({
        name: "html",
        parser: Na.configure({
            props: [$e.add({
                Element(n) {
                    let e = /^(\s*)(<\/)?/.exec(n.textAfter);
                    return n.node.to <= n.pos + e[0].length ? n.continue() : n.lineIndent(n.node.from) + (e[2] ? 0 : n.unit)
                },
                "OpenTag CloseTag SelfClosingTag" (n) {
                    return n.column(n.node.from) + n.unit
                },
                Document(n) {
                    if (n.pos + /\s*/.exec(n.textAfter)[0].length < n.node.to) return n.continue();
                    let e = null,
                        t;
                    for (let i = n.node;;) {
                        let r = i.lastChild;
                        if (!r || r.name != "Element" || r.to != i.to) break;
                        e = i = r
                    }
                    return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? n.lineIndent(e.from) + n.unit : null
                }
            }), ge.add({
                Element(n) {
                    let e = n.firstChild,
                        t = n.lastChild;
                    return !e || e.name != "OpenTag" ? null : {
                        from: e.to,
                        to: t.name == "CloseTag" ? t.from : n.to
                    }
                }
            })],
            wrap: La([{
                tag: "script",
                attrs: n => n.type == "text/typescript" || n.lang == "ts",
                parser: Vs.parser
            }, {
                tag: "script",
                attrs: n => n.type == "text/jsx",
                parser: Us.parser
            }, {
                tag: "script",
                attrs: n => n.type == "text/typescript-jsx",
                parser: Cs.parser
            }, {
                tag: "script",
                attrs(n) {
                    return !n.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(n.type)
                },
                parser: ot.parser
            }, {
                tag: "style",
                attrs(n) {
                    return (!n.lang || n.lang == "css") && (!n.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(n.type))
                },
                parser: Yn.parser
            }])
        }),
        languageData: {
            commentTokens: {
                block: {
                    open: "<!--",
                    close: "-->"
                }
            },
            indentOnInput: /^\s*<\/\w+\W$/,
            wordChars: "-._"
        }
    });

    function Mn(n = {}) {
        let e = Es;
        return n.matchClosingTags === !1 && (e = e.configure({
            dialect: "noMatch"
        })), n.selfClosingTags === !0 && (e = e.configure({
            dialect: "selfClosing"
        })), new ce(e, [Es.data.of({
            autocomplete: Nm(n)
        }), n.autoCloseTags !== !1 ? Lm : [], En().support, jn().support])
    }
    var Lm = w.inputHandler.of((n, e, t, i) => {
        if (n.composing || n.state.readOnly || e != t || i != ">" && i != "/" || !Es.isActiveAt(n.state, e, -1)) return !1;
        let {
            state: r
        } = n, s = r.changeByRange(O => {
            var o, l, a;
            let {
                head: h
            } = O, c = L(r).resolveInner(h, -1), f;
            if ((c.name == "TagName" || c.name == "StartTag") && (c = c.parent), i == ">" && c.name == "OpenTag") {
                if (((l = (o = c.parent) === null || o === void 0 ? void 0 : o.lastChild) === null || l === void 0 ? void 0 : l.name) != "CloseTag" && (f = hi(r.doc, c.parent, h))) {
                    let d = n.state.doc.sliceString(h, h + 1) === ">",
                        p = `${d?"":">"}</${f}>`;
                    return {
                        range: y.cursor(h + 1),
                        changes: {
                            from: h + (d ? 1 : 0),
                            insert: p
                        }
                    }
                }
            } else if (i == "/" && c.name == "OpenTag") {
                let d = c.parent,
                    p = d == null ? void 0 : d.parent;
                if (d.from == h - 1 && ((a = p.lastChild) === null || a === void 0 ? void 0 : a.name) != "CloseTag" && (f = hi(r.doc, p, h))) {
                    let m = n.state.doc.sliceString(h, h + 1) === ">",
                        $ = `/${f}${m?"":">"}`,
                        g = h + $.length + (m ? 1 : 0);
                    return {
                        range: y.cursor(g),
                        changes: {
                            from: h,
                            insert: $
                        }
                    }
                }
            }
            return {
                range: O
            }
        });
        return s.changes.empty ? !1 : (n.dispatch(s, {
            userEvent: "input.type",
            scrollIntoView: !0
        }), !0)
    });
    var Fm = te.define({
        name: "php",
        parser: qa.configure({
            props: [$e.add({
                IfStatement: ue({
                    except: /^\s*({|else\b|elseif\b|endif\b)/
                }),
                TryStatement: ue({
                    except: /^\s*({|catch\b|finally\b)/
                }),
                SwitchBody: n => {
                    let e = n.textAfter,
                        t = /^\s*\}/.test(e),
                        i = /^\s*(case|default)\b/.test(e);
                    return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit
                },
                ColonBlock: n => n.baseIndent + n.unit,
                "Block EnumBody DeclarationList": Rn({
                    closing: "}"
                }),
                ArrowFunction: n => n.baseIndent + n.unit,
                "String BlockComment": () => null,
                Statement: ue({
                    except: /^({|end(for|foreach|switch|while)\b)/
                })
            }), ge.add({
                "Block EnumBody DeclarationList SwitchBody ArrayExpression ValueList": bt,
                ColonBlock(n) {
                    return {
                        from: n.from + 1,
                        to: n.to
                    }
                },
                BlockComment(n) {
                    return {
                        from: n.from + 2,
                        to: n.to - 2
                    }
                }
            })]
        }),
        languageData: {
            commentTokens: {
                block: {
                    open: "/*",
                    close: "*/"
                },
                line: "//"
            },
            indentOnInput: /^\s*(?:case |default:|end(?:if|for(?:each)?|switch|while)|else(?:if)?|\{|\})$/,
            wordChars: "$",
            closeBrackets: {
                stringPrefixes: ["b", "B"]
            }
        }
    });

    function Qh(n = {}) {
        let e = [],
            t;
        if (n.baseLanguage !== null)
            if (n.baseLanguage) t = n.baseLanguage;
            else {
                let i = Mn({
                    matchClosingTags: !1
                });
                e.push(i.support), t = i.language
            }
        return new ce(Fm.configure({
            wrap: t && kn(i => i.type.isTop ? {
                parser: t.parser,
                overlay: r => r.name == "Text"
            } : null),
            top: n.plain ? "Program" : "Template"
        }), e)
    }
    var Hm = he({
            String: u.string,
            Number: u.number,
            "True False": u.bool,
            PropertyName: u.propertyName,
            Null: u.null,
            ",": u.separator,
            "[ ]": u.squareBracket,
            "{ }": u.brace
        }),
        yh = ie.deserialize({
            version: 14,
            states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",
            stateData: "#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",
            goto: "!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
            nodeNames: "\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",
            maxTerm: 25,
            nodeProps: [
                ["openedBy", 7, "{", 12, "["],
                ["closedBy", 8, "}", 13, "]"]
            ],
            propSources: [Hm],
            skippedNodes: [0],
            repeatNodeCount: 2,
            tokenData: "(p~RaXY!WYZ!W]^!Wpq!Wrs!]|}$i}!O$n!Q!R$w!R![&V![!]&h!}#O&m#P#Q&r#Y#Z&w#b#c'f#h#i'}#o#p(f#q#r(k~!]Oc~~!`Upq!]qr!]rs!rs#O!]#O#P!w#P~!]~!wOe~~!zXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#g~#jR!Q![#s!c!i#s#T#Z#s~#vR!Q![$P!c!i$P#T#Z$P~$SR!Q![$]!c!i$]#T#Z$]~$`R!Q![!]!c!i!]#T#Z!]~$nOh~~$qQ!Q!R$w!R![&V~$|RT~!O!P%V!g!h%k#X#Y%k~%YP!Q![%]~%bRT~!Q![%]!g!h%k#X#Y%k~%nR{|%w}!O%w!Q![%}~%zP!Q![%}~&SPT~!Q![%}~&[ST~!O!P%V!Q![&V!g!h%k#X#Y%k~&mOg~~&rO]~~&wO[~~&zP#T#U&}~'QP#`#a'T~'WP#g#h'Z~'^P#X#Y'a~'fOR~~'iP#i#j'l~'oP#`#a'r~'uP#`#a'x~'}OS~~(QP#f#g(T~(WP#i#j(Z~(^P#X#Y(a~(fOQ~~(kOW~~(pOV~",
            tokenizers: [0],
            topRules: {
                JsonText: [0, 1]
            },
            tokenPrec: 0
        });
    var Km = te.define({
        name: "json",
        parser: yh.configure({
            props: [$e.add({
                Object: ue({
                    except: /^\s*\}/
                }),
                Array: ue({
                    except: /^\s*\]/
                })
            }), ge.add({
                "Object Array": bt
            })]
        }),
        languageData: {
            closeBrackets: {
                brackets: ["[", "{", '"']
            },
            indentOnInput: /^\s*[\}\]]$/
        }
    });

    function Sh() {
        return new ce(Km)
    }
    var Ds = 1,
        Jm = 2,
        e$ = 3,
        t$ = 4,
        i$ = 5,
        n$ = 35,
        r$ = 36,
        s$ = 37,
        O$ = 11,
        o$ = 13;

    function l$(n) {
        return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161
    }

    function a$(n) {
        return n == 9 || n == 10 || n == 13 || n == 32
    }
    var bh = null,
        Ph = null,
        xh = 0;

    function Ms(n, e) {
        let t = n.pos + e;
        if (Ph == n && xh == t) return bh;
        for (; a$(n.peek(e));) e++;
        let i = "";
        for (;;) {
            let r = n.peek(e);
            if (!l$(r)) break;
            i += String.fromCharCode(r), e++
        }
        return Ph = n, xh = t, bh = i || null
    }

    function Th(n, e) {
        this.name = n, this.parent = e, this.hash = e ? e.hash : 0;
        for (let t = 0; t < n.length; t++) this.hash += (this.hash << 4) + n.charCodeAt(t) + (n.charCodeAt(t) << 8)
    }
    var h$ = new Vt({
            start: null,
            shift(n, e, t, i) {
                return e == Ds ? new Th(Ms(i, 1) || "", n) : n
            },
            reduce(n, e) {
                return e == O$ && n ? n.parent : n
            },
            reuse(n, e, t, i) {
                let r = e.type.id;
                return r == Ds || r == o$ ? new Th(Ms(i, 1) || "", n) : n
            },
            hash(n) {
                return n ? n.hash : 0
            },
            strict: !1
        }),
        c$ = new E((n, e) => {
            if (n.next == 60) {
                if (n.advance(), n.next == 47) {
                    n.advance();
                    let t = Ms(n, 0);
                    if (!t) return n.acceptToken(i$);
                    if (e.context && t == e.context.name) return n.acceptToken(Jm);
                    for (let i = e.context; i; i = i.parent)
                        if (i.name == t) return n.acceptToken(e$, -2);
                    n.acceptToken(t$)
                } else if (n.next != 33 && n.next != 63) return n.acceptToken(Ds)
            }
        }, {
            contextual: !0
        });

    function Is(n, e) {
        return new E(t => {
            for (let i = 0, r = 0;; r++) {
                if (t.next < 0) {
                    r && t.acceptToken(n);
                    break
                }
                if (t.next == e.charCodeAt(i)) {
                    if (i++, i == e.length) {
                        r > e.length && t.acceptToken(n, 1 - e.length);
                        break
                    }
                } else i = t.next == e.charCodeAt(0) ? 1 : 0;
                t.advance()
            }
        })
    }
    var u$ = Is(n$, "-->"),
        f$ = Is(r$, "?>"),
        d$ = Is(s$, "]]>"),
        p$ = he({
            Text: u.content,
            "StartTag StartCloseTag EndTag SelfCloseEndTag": u.angleBracket,
            TagName: u.tagName,
            "MismatchedCloseTag/Tagname": [u.tagName, u.invalid],
            AttributeName: u.attributeName,
            AttributeValue: u.attributeValue,
            Is: u.definitionOperator,
            "EntityReference CharacterReference": u.character,
            Comment: u.blockComment,
            ProcessingInst: u.processingInstruction,
            DoctypeDecl: u.documentMeta,
            Cdata: u.special(u.string)
        }),
        kh = ie.deserialize({
            version: 14,
            states: ",SOQOaOOOrOxO'#CfOzOpO'#CiO!tOaO'#CgOOOP'#Cg'#CgO!{OrO'#CrO#TOtO'#CsO#]OpO'#CtOOOP'#DS'#DSOOOP'#Cv'#CvQQOaOOOOOW'#Cw'#CwO#eOxO,59QOOOP,59Q,59QOOOO'#Cx'#CxO#mOpO,59TO#uO!bO,59TOOOP'#C{'#C{O$TOaO,59RO$[OpO'#CoOOOP,59R,59ROOOQ'#C|'#C|O$dOrO,59^OOOP,59^,59^OOOS'#C}'#C}O$lOtO,59_OOOP,59_,59_O$tOpO,59`O$|OpO,59`OOOP-E6t-E6tOOOW-E6u-E6uOOOP1G.l1G.lOOOO-E6v-E6vO%UO!bO1G.oO%UO!bO1G.oO%dOpO'#CkO%lO!bO'#CyO%zO!bO1G.oOOOP1G.o1G.oOOOP1G.w1G.wOOOP-E6y-E6yOOOP1G.m1G.mO&VOpO,59ZO&_OpO,59ZOOOQ-E6z-E6zOOOP1G.x1G.xOOOS-E6{-E6{OOOP1G.y1G.yO&gOpO1G.zO&gOpO1G.zOOOP1G.z1G.zO&oO!bO7+$ZO&}O!bO7+$ZOOOP7+$Z7+$ZOOOP7+$c7+$cO'YOpO,59VO'bOpO,59VO'jO!bO,59eOOOO-E6w-E6wO'xOpO1G.uO'xOpO1G.uOOOP1G.u1G.uO(QOpO7+$fOOOP7+$f7+$fO(YO!bO<<GuOOOP<<Gu<<GuOOOP<<G}<<G}O'bOpO1G.qO'bOpO1G.qO(eO#tO'#CnOOOO1G.q1G.qO(sOpO7+$aOOOP7+$a7+$aOOOP<<HQ<<HQOOOPAN=aAN=aOOOPAN=iAN=iO'bOpO7+$]OOOO7+$]7+$]OOOO'#Cz'#CzO({O#tO,59YOOOO,59Y,59YOOOP<<G{<<G{OOOO<<Gw<<GwOOOO-E6x-E6xOOOO1G.t1G.t",
            stateData: ")Z~OPQOSVOTWOVWOWWOXWOiXOxPO}TO!PUO~OuZOw]O~O^`Oy^O~OPQOQcOSVOTWOVWOWWOXWOxPO}TO!PUO~ORdO~P!SOseO|gO~OthO!OjO~O^lOy^O~OuZOwoO~O^qOy^O~O[vO`sOdwOy^O~ORyO~P!SO^{Oy^O~OseO|}O~OthO!O!PO~O^!QOy^O~O[!SOy^O~O[!VO`sOd!WOy^O~Oa!YOy^O~Oy^O[mX`mXdmX~O[!VO`sOd!WO~O^!]Oy^O~O[!_Oy^O~O[!aOy^O~O[!cO`sOd!dOy^O~O[!cO`sOd!dO~Oa!eOy^O~Oy^Oz!gO~Oy^O[ma`madma~O[!jOy^O~O[!kOy^O~O[!lO`sOd!mO~OW!pOX!pOz!rO{!pO~O[!sOy^O~OW!pOX!pOz!vO{!pO~O",
            goto: "%[wPPPPPPPPPPxxP!OP!UPP!_!iP!oxxxP!u!{#R$Z$j$p$v$|PPPP%SXWORYbXRORYb_t`qru!T!U!bQ!h!YS!o!e!fR!t!nQdRRybXSORYbQYORmYQ[PRn[Q_QQkVjp_krz!R!T!X!Z!^!`!f!i!nQr`QzcQ!RlQ!TqQ!XsQ!ZtQ!^{Q!`!QQ!f!YQ!i!]R!n!eQu`S!UqrU![u!U!bR!b!TQ!q!gR!u!qQbRRxbQfTR|fQiUR!OiSXOYTaRb",
            nodeNames: "\u26A0 StartTag StartCloseTag MissingCloseTag StartCloseTag StartCloseTag Document Text EntityReference CharacterReference Cdata Element EndTag OpenTag TagName Attribute AttributeName Is AttributeValue CloseTag SelfCloseEndTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag DoctypeDecl",
            maxTerm: 47,
            context: h$,
            nodeProps: [
                ["closedBy", 1, "SelfCloseEndTag EndTag", 13, "CloseTag MissingCloseTag"],
                ["openedBy", 12, "StartTag StartCloseTag", 19, "OpenTag", 20, "StartTag"]
            ],
            propSources: [p$],
            skippedNodes: [0],
            repeatNodeCount: 8,
            tokenData: "Az~R!WOX$kXY%rYZ%rZ]$k]^%r^p$kpq%rqr$krs&tsv$kvw'Uw}$k}!O(q!O!P$k!P!Q*n!Q![$k![!]+z!]!^$k!^!_/s!_!`=i!`!a>U!a!b>q!b!c$k!c!}+z!}#P$k#P#Q?}#Q#R$k#R#S+z#S#T$k#T#o+z#o%W$k%W%o+z%o%p$k%p&a+z&a&b$k&b1p+z1p4U$k4U4d+z4d4e$k4e$IS+z$IS$I`$k$I`$Ib+z$Ib$Kh$k$Kh%#t+z%#t&/x$k&/x&Et+z&Et&FV$k&FV;'S+z;'S;:j/S;:j?&r$k?&r?Ah+z?Ah?BY$k?BY?Mn+z?Mn~$kX$rUVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$kP%ZRVPOv%Uw!^%U!_~%UW%iR{WOr%dsv%dw~%d_%{]VP{WyUOX$kXY%rYZ%rZ]$k]^%r^p$kpq%rqr$krs%Usv$kw!^$k!^!_%d!_~$kZ&{RzYVPOv%Uw!^%U!_~%U~'XTOp'hqs'hst(Pt!]'h!^~'h~'kTOp'hqs'ht!]'h!]!^'z!^~'h~(POW~~(SROp(]q!](]!^~(]~(`SOp(]q!](]!]!^(l!^~(]~(qOX~Z(xWVP{WOr$krs%Usv$kw}$k}!O)b!O!^$k!^!_%d!_~$kZ)iWVP{WOr$krs%Usv$kw!^$k!^!_%d!_!`$k!`!a*R!a~$kZ*[U|QVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$k]*uWVP{WOr$krs%Usv$kw!^$k!^!_%d!_!`$k!`!a+_!a~$k]+hUdSVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$k_,V}`S^QVP{WOr$krs%Usv$kw}$k}!O+z!O!P+z!P!Q$k!Q![+z![!]+z!]!^$k!^!_%d!_!c$k!c!}+z!}#R$k#R#S+z#S#T$k#T#o+z#o$}$k$}%O+z%O%W$k%W%o+z%o%p$k%p&a+z&a&b$k&b1p+z1p4U+z4U4d+z4d4e$k4e$IS+z$IS$I`$k$I`$Ib+z$Ib$Je$k$Je$Jg+z$Jg$Kh$k$Kh%#t+z%#t&/x$k&/x&Et+z&Et&FV$k&FV;'S+z;'S;:j/S;:j?&r$k?&r?Ah+z?Ah?BY$k?BY?Mn+z?Mn~$k_/ZWVP{WOr$krs%Usv$kw!^$k!^!_%d!_;=`$k;=`<%l+z<%l~$kX/xU{WOq%dqr0[sv%dw!a%d!a!b=X!b~%dX0aZ{WOr%dsv%dw}%d}!O1S!O!f%d!f!g1x!g!}%d!}#O5s#O#W%d#W#X:k#X~%dX1XT{WOr%dsv%dw}%d}!O1h!O~%dX1oR}P{WOr%dsv%dw~%dX1}T{WOr%dsv%dw!q%d!q!r2^!r~%dX2cT{WOr%dsv%dw!e%d!e!f2r!f~%dX2wT{WOr%dsv%dw!v%d!v!w3W!w~%dX3]T{WOr%dsv%dw!{%d!{!|3l!|~%dX3qT{WOr%dsv%dw!r%d!r!s4Q!s~%dX4VT{WOr%dsv%dw!g%d!g!h4f!h~%dX4kV{WOr4frs5Qsv4fvw5Qw!`4f!`!a5c!a~4fP5TRO!`5Q!`!a5^!a~5QP5cOiPX5jRiP{WOr%dsv%dw~%dX5xV{WOr%dsv%dw!e%d!e!f6_!f#V%d#V#W8w#W~%dX6dT{WOr%dsv%dw!f%d!f!g6s!g~%dX6xT{WOr%dsv%dw!c%d!c!d7X!d~%dX7^T{WOr%dsv%dw!v%d!v!w7m!w~%dX7rT{WOr%dsv%dw!c%d!c!d8R!d~%dX8WT{WOr%dsv%dw!}%d!}#O8g#O~%dX8nR{WxPOr%dsv%dw~%dX8|T{WOr%dsv%dw#W%d#W#X9]#X~%dX9bT{WOr%dsv%dw#T%d#T#U9q#U~%dX9vT{WOr%dsv%dw#h%d#h#i:V#i~%dX:[T{WOr%dsv%dw#T%d#T#U8R#U~%dX:pT{WOr%dsv%dw#c%d#c#d;P#d~%dX;UT{WOr%dsv%dw#V%d#V#W;e#W~%dX;jT{WOr%dsv%dw#h%d#h#i;y#i~%dX<OT{WOr%dsv%dw#m%d#m#n<_#n~%dX<dT{WOr%dsv%dw#d%d#d#e<s#e~%dX<xT{WOr%dsv%dw#X%d#X#Y4f#Y~%dX=`R!PP{WOr%dsv%dw~%dZ=rUaQVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$k_>_U[UVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$kZ>xWVP{WOr$krs%Usv$kw!^$k!^!_%d!_!`$k!`!a?b!a~$kZ?kU!OQVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$kZ@UWVP{WOr$krs%Usv$kw!^$k!^!_%d!_#P$k#P#Q@n#Q~$kZ@uWVP{WOr$krs%Usv$kw!^$k!^!_%d!_!`$k!`!aA_!a~$kZAhUwQVP{WOr$krs%Usv$kw!^$k!^!_%d!_~$k",
            tokenizers: [c$, u$, f$, d$, 0, 1, 2, 3],
            topRules: {
                Document: [0, 6]
            },
            tokenPrec: 0
        });

    function In(n, e) {
        let t = e && e.getChild("TagName");
        return t ? n.sliceString(t.from, t.to) : ""
    }

    function Bs(n, e) {
        let t = e && e.firstChild;
        return !t || t.name != "OpenTag" ? "" : In(n, t)
    }

    function m$(n, e, t) {
        let i = e && e.getChildren("Attribute").find(s => s.from <= t && s.to >= t),
            r = i && i.getChild("AttributeName");
        return r ? n.sliceString(r.from, r.to) : ""
    }

    function Ns(n) {
        for (let e = n && n.parent; e; e = e.parent)
            if (e.name == "Element") return e;
        return null
    }

    function $$(n, e) {
        var t;
        let i = L(n).resolveInner(e, -1),
            r = null;
        for (let s = i; !r && s.parent; s = s.parent)(s.name == "OpenTag" || s.name == "CloseTag" || s.name == "SelfClosingTag" || s.name == "MismatchedCloseTag") && (r = s);
        if (r && (r.to > e || r.lastChild.type.isError)) {
            let s = r.parent;
            if (i.name == "TagName") return r.name == "CloseTag" || r.name == "MismatchedCloseTag" ? {
                type: "closeTag",
                from: i.from,
                context: s
            } : {
                type: "openTag",
                from: i.from,
                context: Ns(s)
            };
            if (i.name == "AttributeName") return {
                type: "attrName",
                from: i.from,
                context: r
            };
            if (i.name == "AttributeValue") return {
                type: "attrValue",
                from: i.from,
                context: r
            };
            let O = i == r || i.name == "Attribute" ? i.childBefore(e) : i;
            return (O == null ? void 0 : O.name) == "StartTag" ? {
                type: "openTag",
                from: e,
                context: Ns(s)
            } : (O == null ? void 0 : O.name) == "StartCloseTag" && O.to <= e ? {
                type: "closeTag",
                from: e,
                context: s
            } : (O == null ? void 0 : O.name) == "Is" ? {
                type: "attrValue",
                from: e,
                context: r
            } : O ? {
                type: "attrName",
                from: e,
                context: r
            } : null
        } else if (i.name == "StartCloseTag") return {
            type: "closeTag",
            from: e,
            context: i.parent
        };
        for (; i.parent && i.to == e && !((t = i.lastChild) === null || t === void 0 ? void 0 : t.type.isError);) i = i.parent;
        return i.name == "Element" || i.name == "Text" || i.name == "Document" ? {
            type: "tag",
            from: e,
            context: i.name == "Element" ? i : Ns(i)
        } : null
    }
    var vh = class {
            constructor(e, t, i) {
                this.attrs = t, this.attrValues = i, this.children = [], this.name = e.name, this.completion = Object.assign(Object.assign({
                    type: "type"
                }, e.completion || {}), {
                    label: this.name
                }), this.openCompletion = Object.assign(Object.assign({}, this.completion), {
                    label: "<" + this.name
                }), this.closeCompletion = Object.assign(Object.assign({}, this.completion), {
                    label: "</" + this.name + ">",
                    boost: 2
                }), this.closeNameCompletion = Object.assign(Object.assign({}, this.completion), {
                    label: this.name + ">"
                }), this.text = e.textContent ? e.textContent.map(r => ({
                    label: r,
                    type: "text"
                })) : []
            }
        },
        Ls = /^[:\-\.\w\u00b7-\uffff]*$/;

    function wh(n) {
        return Object.assign(Object.assign({
            type: "property"
        }, n.completion || {}), {
            label: n.name
        })
    }

    function Xh(n) {
        return typeof n == "string" ? {
            label: `"${n}"`,
            type: "constant"
        } : /^"/.test(n.label) ? n : Object.assign(Object.assign({}, n), {
            label: `"${n.label}"`
        })
    }

    function g$(n, e) {
        let t = [],
            i = [],
            r = Object.create(null);
        for (let l of e) {
            let a = wh(l);
            t.push(a), l.global && i.push(a), l.values && (r[l.name] = l.values.map(Xh))
        }
        let s = [],
            O = [],
            o = Object.create(null);
        for (let l of n) {
            let a = i,
                h = r;
            l.attributes && (a = a.concat(l.attributes.map(f => typeof f == "string" ? t.find(d => d.label == f) || {
                label: f,
                type: "property"
            } : (f.values && (h == r && (h = Object.create(h)), h[f.name] = f.values.map(Xh)), wh(f)))));
            let c = new vh(l, a, h);
            o[c.name] = c, s.push(c), l.top && O.push(c)
        }
        O.length || (O = s);
        for (let l = 0; l < s.length; l++) {
            let a = n[l],
                h = s[l];
            if (a.children)
                for (let c of a.children) o[c] && h.children.push(o[c]);
            else h.children = s
        }
        return l => {
            var a;
            let {
                doc: h
            } = l.state, c = $$(l.state, l.pos);
            if (!c || c.type == "tag" && !l.explicit) return null;
            let {
                type: f,
                from: d,
                context: p
            } = c;
            if (f == "openTag") {
                let m = O,
                    $ = Bs(h, p);
                if ($) {
                    let g = o[$];
                    m = (g == null ? void 0 : g.children) || s
                }
                return {
                    from: d,
                    options: m.map(g => g.completion),
                    validFor: Ls
                }
            } else if (f == "closeTag") {
                let m = Bs(h, p);
                return m ? {
                    from: d,
                    to: l.pos + (h.sliceString(l.pos, l.pos + 1) == ">" ? 1 : 0),
                    options: [((a = o[m]) === null || a === void 0 ? void 0 : a.closeNameCompletion) || {
                        label: m + ">",
                        type: "type"
                    }],
                    validFor: Ls
                } : null
            } else if (f == "attrName") {
                let m = o[In(h, p)];
                return {
                    from: d,
                    options: (m == null ? void 0 : m.attrs) || i,
                    validFor: Ls
                }
            } else if (f == "attrValue") {
                let m = m$(h, p, d);
                if (!m) return null;
                let $ = o[In(h, p)],
                    g = (($ == null ? void 0 : $.attrValues) || r)[m];
                return !g || !g.length ? null : {
                    from: d,
                    to: l.pos + (h.sliceString(l.pos, l.pos + 1) == '"' ? 1 : 0),
                    options: g,
                    validFor: /^"[^"]*"?$/
                }
            } else if (f == "tag") {
                let m = Bs(h, p),
                    $ = o[m],
                    g = [],
                    S = p && p.lastChild;
                m && (!S || S.name != "CloseTag" || In(h, S) != m) && g.push($ ? $.closeCompletion : {
                    label: "</" + m + ">",
                    type: "type",
                    boost: 2
                });
                let k = g.concat((($ == null ? void 0 : $.children) || (p ? s : O)).map(x => x.openCompletion));
                if (p && ($ == null ? void 0 : $.text.length)) {
                    let x = p.firstChild;
                    x.to > l.pos - 20 && !/\S/.test(l.state.sliceDoc(x.to, l.pos)) && (k = k.concat($.text))
                }
                return {
                    from: d,
                    options: k,
                    validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
                }
            } else return null
        }
    }
    var Rh = te.define({
        name: "xml",
        parser: kh.configure({
            props: [$e.add({
                Element(n) {
                    let e = /^\s*<\//.test(n.textAfter);
                    return n.lineIndent(n.node.from) + (e ? 0 : n.unit)
                },
                "OpenTag CloseTag SelfClosingTag" (n) {
                    return n.column(n.node.from) + n.unit
                }
            }), ge.add({
                Element(n) {
                    let e = n.firstChild,
                        t = n.lastChild;
                    return !e || e.name != "OpenTag" ? null : {
                        from: e.to,
                        to: t.name == "CloseTag" ? t.from : n.to
                    }
                }
            })]
        }),
        languageData: {
            commentTokens: {
                block: {
                    open: "<!--",
                    close: "-->"
                }
            },
            indentOnInput: /^\s*<\/$/
        }
    });

    function zh(n = {}) {
        return new ce(Rh, Rh.data.of({
            autocomplete: g$(n.elements || [], n.attributes || [])
        }))
    }
    var Q$ = 36,
        Wh = 1,
        y$ = 2,
        Bn = 3,
        Fs = 4,
        S$ = 5,
        b$ = 6,
        P$ = 7,
        x$ = 8,
        T$ = 9,
        k$ = 10,
        v$ = 11,
        w$ = 12,
        X$ = 13,
        R$ = 14,
        z$ = 15,
        W$ = 16,
        q$ = 17,
        qh = 18,
        Z$ = 19,
        Zh = 20,
        _h = 21,
        Vh = 22,
        _$ = 23,
        V$ = 24;

    function Hs(n) {
        return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 48 && n <= 57
    }

    function U$(n) {
        return n >= 48 && n <= 57 || n >= 97 && n <= 102 || n >= 65 && n <= 70
    }

    function Ut(n, e, t) {
        for (let i = !1;;) {
            if (n.next < 0) return;
            if (n.next == e && !i) {
                n.advance();
                return
            }
            i = t && !i && n.next == 92, n.advance()
        }
    }

    function C$(n) {
        for (;;) {
            if (n.next < 0 || n.peek(1) < 0) return;
            if (n.next == 36 && n.peek(1) == 36) {
                n.advance(2);
                return
            }
            n.advance()
        }
    }

    function Uh(n, e) {
        for (; !(n.next != 95 && !Hs(n.next));) e != null && (e += String.fromCharCode(n.next)), n.advance();
        return e
    }

    function A$(n) {
        if (n.next == 39 || n.next == 34 || n.next == 96) {
            let e = n.next;
            n.advance(), Ut(n, e, !1)
        } else Uh(n)
    }

    function Ch(n, e) {
        for (; n.next == 48 || n.next == 49;) n.advance();
        e && n.next == e && n.advance()
    }

    function Ah(n, e) {
        for (;;) {
            if (n.next == 46) {
                if (e) break;
                e = !0
            } else if (n.next < 48 || n.next > 57) break;
            n.advance()
        }
        if (n.next == 69 || n.next == 101)
            for (n.advance(), (n.next == 43 || n.next == 45) && n.advance(); n.next >= 48 && n.next <= 57;) n.advance()
    }

    function Yh(n) {
        for (; !(n.next < 0 || n.next == 10);) n.advance()
    }

    function ci(n, e) {
        for (let t = 0; t < e.length; t++)
            if (e.charCodeAt(t) == n) return !0;
        return !1
    }
    var jh = ` 	\r
`;

    function Gh(n, e, t) {
        let i = Object.create(null);
        i.true = i.false = S$, i.null = i.unknown = b$;
        for (let r of n.split(" ")) r && (i[r] = Zh);
        for (let r of e.split(" ")) r && (i[r] = _h);
        for (let r of (t || "").split(" ")) r && (i[r] = V$);
        return i
    }
    var Ct = "array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ",
        At = "absolute action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded case cast catalog check close collate collation column commit condition connect connection constraint constraints constructor continue corresponding count create cross cube current current_date current_default_transform_group current_transform_group_for_type current_path current_role current_time current_timestamp current_user cursor cycle data day deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exists exit external fetch first for foreign found from free full function general get global go goto grant group grouping handle having hold hour identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local localtime localtimestamp locator loop map match method minute modifies module month names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search second section select session session_user set sets signal similar size some space specific specifictype sql sqlexception sqlstate sqlwarning start state static system_user table temporary then timezone_hour timezone_minute to trailing transaction translation treat trigger under undo union unique unnest until update usage user using value values view when whenever where while with without work write year zone ",
        Ks = {
            backslashEscapes: !1,
            hashComments: !1,
            spaceAfterDashes: !1,
            slashComments: !1,
            doubleQuotedStrings: !1,
            doubleDollarQuotedStrings: !1,
            unquotedBitLiterals: !1,
            treatBitsAsBytes: !1,
            charSetCasts: !1,
            operatorChars: "*+-%<>!=&|~^/",
            specialVar: "?",
            identifierQuotes: '"',
            words: Gh(At, Ct)
        };

    function Y$(n, e, t, i) {
        let r = {};
        for (let s in Ks) r[s] = (n.hasOwnProperty(s) ? n : Ks)[s];
        return e && (r.words = Gh(e, t || "", i)), r
    }

    function Eh(n) {
        return new E(e => {
            var t;
            let {
                next: i
            } = e;
            if (e.advance(), ci(i, jh)) {
                for (; ci(e.next, jh);) e.advance();
                e.acceptToken(Q$)
            } else if (i == 36 && e.next == 36 && n.doubleDollarQuotedStrings) C$(e), e.acceptToken(Bn);
            else if (i == 39 || i == 34 && n.doubleQuotedStrings) Ut(e, i, n.backslashEscapes), e.acceptToken(Bn);
            else if (i == 35 && n.hashComments || i == 47 && e.next == 47 && n.slashComments) Yh(e), e.acceptToken(Wh);
            else if (i == 45 && e.next == 45 && (!n.spaceAfterDashes || e.peek(1) == 32)) Yh(e), e.acceptToken(Wh);
            else if (i == 47 && e.next == 42) {
                e.advance();
                for (let r = -1, s = 1; !(e.next < 0);)
                    if (e.advance(), r == 42 && e.next == 47) {
                        if (s--, !s) {
                            e.advance();
                            break
                        }
                        r = -1
                    } else r == 47 && e.next == 42 ? (s++, r = -1) : r = e.next;
                e.acceptToken(y$)
            } else if ((i == 101 || i == 69) && e.next == 39) e.advance(), Ut(e, 39, !0);
            else if ((i == 110 || i == 78) && e.next == 39 && n.charSetCasts) e.advance(), Ut(e, 39, n.backslashEscapes), e.acceptToken(Bn);
            else if (i == 95 && n.charSetCasts)
                for (let r = 0;; r++) {
                    if (e.next == 39 && r > 1) {
                        e.advance(), Ut(e, 39, n.backslashEscapes), e.acceptToken(Bn);
                        break
                    }
                    if (!Hs(e.next)) break;
                    e.advance()
                } else if (i == 40) e.acceptToken(P$);
                else if (i == 41) e.acceptToken(x$);
            else if (i == 123) e.acceptToken(T$);
            else if (i == 125) e.acceptToken(k$);
            else if (i == 91) e.acceptToken(v$);
            else if (i == 93) e.acceptToken(w$);
            else if (i == 59) e.acceptToken(X$);
            else if (n.unquotedBitLiterals && i == 48 && e.next == 98) e.advance(), Ch(e), e.acceptToken(Vh);
            else if ((i == 98 || i == 66) && (e.next == 39 || e.next == 34)) {
                let r = e.next;
                e.advance(), n.treatBitsAsBytes ? (Ut(e, r, n.backslashEscapes), e.acceptToken(_$)) : (Ch(e, r), e.acceptToken(Vh))
            } else if (i == 48 && (e.next == 120 || e.next == 88) || (i == 120 || i == 88) && e.next == 39) {
                let r = e.next == 39;
                for (e.advance(); U$(e.next);) e.advance();
                r && e.next == 39 && e.advance(), e.acceptToken(Fs)
            } else if (i == 46 && e.next >= 48 && e.next <= 57) Ah(e, !0), e.acceptToken(Fs);
            else if (i == 46) e.acceptToken(R$);
            else if (i >= 48 && i <= 57) Ah(e, !1), e.acceptToken(Fs);
            else if (ci(i, n.operatorChars)) {
                for (; ci(e.next, n.operatorChars);) e.advance();
                e.acceptToken(z$)
            } else if (ci(i, n.specialVar)) e.next == i && e.advance(), A$(e), e.acceptToken(q$);
            else if (ci(i, n.identifierQuotes)) Ut(e, i, !1), e.acceptToken(Z$);
            else if (i == 58 || i == 44) e.acceptToken(W$);
            else if (Hs(i)) {
                let r = Uh(e, String.fromCharCode(i));
                e.acceptToken(e.next == 46 ? qh : (t = n.words[r.toLowerCase()]) !== null && t !== void 0 ? t : qh)
            }
        })
    }
    var Dh = Eh(Ks),
        j$ = ie.deserialize({
            version: 14,
            states: "%vQ]QQOOO#wQRO'#DSO$OQQO'#CwO%eQQO'#CxO%lQQO'#CyO%sQQO'#CzOOQQ'#DS'#DSOOQQ'#C}'#C}O'UQRO'#C{OOQQ'#Cv'#CvOOQQ'#C|'#C|Q]QQOOQOQQOOO'`QQO'#DOO(xQRO,59cO)PQQO,59cO)UQQO'#DSOOQQ,59d,59dO)cQQO,59dOOQQ,59e,59eO)jQQO,59eOOQQ,59f,59fO)qQQO,59fOOQQ-E6{-E6{OOQQ,59b,59bOOQQ-E6z-E6zOOQQ,59j,59jOOQQ-E6|-E6|O+VQRO1G.}O+^QQO,59cOOQQ1G/O1G/OOOQQ1G/P1G/POOQQ1G/Q1G/QP+kQQO'#C}O+rQQO1G.}O)PQQO,59cO,PQQO'#Cw",
            stateData: ",[~OtOSPOSQOS~ORUOSUOTUOUUOVROXSOZTO]XO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O^]ORvXSvXTvXUvXVvXXvXZvX]vX_vX`vXavXbvXcvXdvXevXfvXgvXhvX~OsvX~P!jOa_Ob_Oc_O~ORUOSUOTUOUUOVROXSOZTO^tO_UO`UOa`Ob`Oc`OdUOeUOfUOgUOhUO~OWaO~P$ZOYcO~P$ZO[eO~P$ZORUOSUOTUOUUOVROXSOZTO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O]hOsoX~P%zOajObjOcjO~O^]ORkaSkaTkaUkaVkaXkaZka]ka_ka`kaakabkackadkaekafkagkahka~Oska~P'kO^]O~OWvXYvX[vX~P!jOWnO~P$ZOYoO~P$ZO[pO~P$ZO^]ORkiSkiTkiUkiVkiXkiZki]ki_ki`kiakibkickidkiekifkigkihki~Oski~P)xOWkaYka[ka~P'kO]hO~P$ZOWkiYki[ki~P)xOasObsOcsO~O",
            goto: "#hwPPPPPPPPPPPPPPPPPPPPPPPPPPx||||!Y!^!d!xPPP#[TYOZeUORSTWZbdfqT[OZQZORiZSWOZQbRQdSQfTZgWbdfqQ^PWk^lmrQl_Qm`RrseVORSTWZbdfq",
            nodeNames: "\u26A0 LineComment BlockComment String Number Bool Null ( ) [ ] { } ; . Operator Punctuation SpecialVar Identifier QuotedIdentifier Keyword Type Bits Bytes Builtin Script Statement CompositeIdentifier Parens Braces Brackets Statement",
            maxTerm: 38,
            skippedNodes: [0, 1, 2],
            repeatNodeCount: 3,
            tokenData: "RORO",
            tokenizers: [0, Dh],
            topRules: {
                Script: [0, 25]
            },
            tokenPrec: 0
        });

    function Js(n) {
        let e = n.cursor().moveTo(n.from, -1);
        for (;
            /Comment/.test(e.name);) e.moveTo(e.from, -1);
        return e.node
    }

    function Ii(n, e) {
        let t = n.sliceString(e.from, e.to),
            i = /^([`'"])(.*)\1$/.exec(t);
        return i ? i[2] : t
    }

    function Nn(n) {
        return n && (n.name == "Identifier" || n.name == "QuotedIdentifier")
    }

    function G$(n, e) {
        if (e.name == "CompositeIdentifier") {
            let t = [];
            for (let i = e.firstChild; i; i = i.nextSibling) Nn(i) && t.push(Ii(n, i));
            return t
        }
        return [Ii(n, e)]
    }

    function Mh(n, e) {
        for (let t = [];;) {
            if (!e || e.name != ".") return t;
            let i = Js(e);
            if (!Nn(i)) return t;
            t.unshift(Ii(n, i)), e = Js(i)
        }
    }

    function D$(n, e) {
        let t = L(n).resolveInner(e, -1),
            i = E$(n.doc, t);
        return t.name == "Identifier" || t.name == "QuotedIdentifier" || t.name == "Keyword" ? {
            from: t.from,
            quoted: t.name == "QuotedIdentifier" ? n.doc.sliceString(t.from, t.from + 1) : null,
            parents: Mh(n.doc, Js(t)),
            aliases: i
        } : t.name == "." ? {
            from: e,
            quoted: null,
            parents: Mh(n.doc, t),
            aliases: i
        } : {
            from: e,
            quoted: null,
            parents: [],
            empty: !0,
            aliases: i
        }
    }
    var M$ = new Set("where group having order union intersect except all distinct limit offset fetch for".split(" "));

    function E$(n, e) {
        let t;
        for (let r = e; !t; r = r.parent) {
            if (!r) return null;
            r.name == "Statement" && (t = r)
        }
        let i = null;
        for (let r = t.firstChild, s = !1, O = null; r; r = r.nextSibling) {
            let o = r.name == "Keyword" ? n.sliceString(r.from, r.to).toLowerCase() : null,
                l = null;
            if (!s) s = o == "from";
            else if (o == "as" && O && Nn(r.nextSibling)) l = Ii(n, r.nextSibling);
            else {
                if (o && M$.has(o)) break;
                O && Nn(r) && (l = Ii(n, r))
            }
            l && (i || (i = Object.create(null)), i[l] = G$(n, O)), O = /Identifier$/.test(r.name) ? r : null
        }
        return i
    }

    function I$(n, e) {
        return n ? e.map(t => Object.assign(Object.assign({}, t), {
            label: n + t.label + n,
            apply: void 0
        })) : e
    }
    var B$ = /^\w*$/,
        N$ = /^[`'"]?\w*[`'"]?$/,
        Ln = class {
            constructor() {
                this.list = [], this.children = void 0
            }
            child(e) {
                let t = this.children || (this.children = Object.create(null));
                return t[e] || (t[e] = new Ln)
            }
            childCompletions(e) {
                return this.children ? Object.keys(this.children).filter(t => t).map(t => ({
                    label: t,
                    type: e
                })) : []
            }
        };

    function L$(n, e, t, i) {
        let r = new Ln,
            s = r.child(i || "");
        for (let O in n) {
            let o = O.indexOf("."),
                a = (o > -1 ? r.child(O.slice(0, o)) : s).child(o > -1 ? O.slice(o + 1) : O);
            a.list = n[O].map(h => typeof h == "string" ? {
                label: h,
                type: "property"
            } : h)
        }
        s.list = (e || s.childCompletions("type")).concat(t ? s.child(t).list : []);
        for (let O in r.children) {
            let o = r.child(O);
            o.list.length || (o.list = o.childCompletions("type"))
        }
        return r.list = s.list.concat(r.childCompletions("type")), O => {
            let {
                parents: o,
                from: l,
                quoted: a,
                empty: h,
                aliases: c
            } = D$(O.state, O.pos);
            if (h && !O.explicit) return null;
            c && o.length == 1 && (o = c[o[0]] || o);
            let f = r;
            for (let m of o) {
                for (; !f.children || !f.children[m];)
                    if (f == r) f = s;
                    else if (f == s && t) f = f.child(t);
                else return null;
                f = f.child(m)
            }
            let d = a && O.state.sliceDoc(O.pos, O.pos + 1) == a,
                p = f.list;
            return f == r && c && (p = p.concat(Object.keys(c).map(m => ({
                label: m,
                type: "constant"
            })))), {
                from: l,
                to: d ? O.pos + 1 : void 0,
                options: I$(a, p),
                validFor: a ? N$ : B$
            }
        }
    }

    function F$(n, e) {
        let t = Object.keys(n).map(i => ({
            label: e ? i.toUpperCase() : i,
            type: n[i] == _h ? "type" : n[i] == Zh ? "keyword" : "variable",
            boost: -1
        }));
        return zn(["QuotedIdentifier", "SpecialVar", "String", "LineComment", "BlockComment", "."], Zi(t))
    }
    var H$ = j$.configure({
            props: [$e.add({
                Statement: ue()
            }), ge.add({
                Statement(n) {
                    return {
                        from: n.firstChild.to,
                        to: n.to
                    }
                },
                BlockComment(n) {
                    return {
                        from: n.from + 2,
                        to: n.to - 2
                    }
                }
            }), he({
                Keyword: u.keyword,
                Type: u.typeName,
                Builtin: u.standard(u.name),
                Bits: u.number,
                Bytes: u.string,
                Bool: u.bool,
                Null: u.null,
                Number: u.number,
                String: u.string,
                Identifier: u.name,
                QuotedIdentifier: u.special(u.string),
                SpecialVar: u.special(u.name),
                LineComment: u.lineComment,
                BlockComment: u.blockComment,
                Operator: u.operator,
                "Semi Punctuation": u.punctuation,
                "( )": u.paren,
                "{ }": u.brace,
                "[ ]": u.squareBracket
            })]
        }),
        Ie = class {
            constructor(e, t) {
                this.dialect = e, this.language = t
            }
            get extension() {
                return this.language.extension
            }
            static define(e) {
                let t = Y$(e, e.keywords, e.types, e.builtin),
                    i = te.define({
                        name: "sql",
                        parser: H$.configure({
                            tokenizers: [{
                                from: Dh,
                                to: Eh(t)
                            }]
                        }),
                        languageData: {
                            commentTokens: {
                                line: "--",
                                block: {
                                    open: "/*",
                                    close: "*/"
                                }
                            },
                            closeBrackets: {
                                brackets: ["(", "[", "{", "'", '"', "`"]
                            }
                        }
                    });
                return new Ie(t, i)
            }
        };

    function K$(n, e = !1) {
        return F$(n.dialect.words, e)
    }

    function J$(n, e = !1) {
        return n.language.data.of({
            autocomplete: K$(n, e)
        })
    }

    function eg(n) {
        return n.schema ? L$(n.schema, n.tables, n.defaultTable, n.defaultSchema) : () => null
    }

    function tg(n) {
        return n.schema ? (n.dialect || Ih).language.data.of({
            autocomplete: eg(n)
        }) : []
    }

    function Bh(n = {}) {
        let e = n.dialect || Ih;
        return new ce(e.language, [tg(n), J$(e, !!n.upperCaseKeywords)])
    }
    var Ih = Ie.define({}),
        EQ = Ie.define({
            charSetCasts: !0,
            doubleDollarQuotedStrings: !0,
            operatorChars: "+-*/<>=~!@#%^&|`?",
            specialVar: "",
            keywords: At + "a abort abs absent access according ada admin aggregate alias also always analyse analyze array_agg array_max_cardinality asensitive assert assignment asymmetric atomic attach attribute attributes avg backward base64 begin_frame begin_partition bernoulli bit_length blocked bom c cache called cardinality catalog_name ceil ceiling chain char_length character_length character_set_catalog character_set_name character_set_schema characteristics characters checkpoint class class_origin cluster coalesce cobol collation_catalog collation_name collation_schema collect column_name columns command_function command_function_code comment comments committed concurrently condition_number configuration conflict connection_name constant constraint_catalog constraint_name constraint_schema contains content control conversion convert copy corr cost covar_pop covar_samp csv cume_dist current_catalog current_row current_schema cursor_name database datalink datatype datetime_interval_code datetime_interval_precision db debug defaults defined definer degree delimiter delimiters dense_rank depends derived detach detail dictionary disable discard dispatch dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue document dump dynamic_function dynamic_function_code element elsif empty enable encoding encrypted end_frame end_partition endexec enforced enum errcode error event every exclude excluding exclusive exp explain expression extension extract family file filter final first_value flag floor following force foreach fortran forward frame_row freeze fs functions fusion g generated granted greatest groups handler header hex hierarchy hint id ignore ilike immediately immutable implementation implicit import include including increment indent index indexes info inherit inherits inline insensitive instance instantiable instead integrity intersection invoker isnull k key_member key_type label lag last_value lead leakproof least length library like_regex link listen ln load location lock locked log logged lower m mapping matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text min minvalue mod mode more move multiset mumps name namespace nfc nfd nfkc nfkd nil normalize normalized nothing notice notify notnull nowait nth_value ntile nullable nullif nulls number occurrences_regex octet_length octets off offset oids operator options ordering others over overlay overriding owned owner p parallel parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partition pascal passing passthrough password percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding prepared print_strict_params procedural procedures program publication query quote raise range rank reassign recheck recovery refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex rename repeatable replace replica requiring reset respect restart restore result_oid returned_cardinality returned_length returned_octet_length returned_sqlstate returning reverse routine_catalog routine_name routine_schema routines row_count row_number rowtype rule scale schema_name schemas scope scope_catalog scope_name scope_schema security selective self sensitive sequence sequences serializable server server_name setof share show simple skip slice snapshot source specific_name sqlcode sqlerror sqrt stable stacked standalone statement statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time t table_name tables tablesample tablespace temp template ties token top_level_count transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex trigger_catalog trigger_name trigger_schema trim trim_array truncate trusted type types uescape unbounded uncommitted unencrypted unlink unlisten unlogged unnamed untyped upper uri use_column use_variable user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema vacuum valid validate validator value_of var_pop var_samp varbinary variable_conflict variadic verbose version versioning views volatile warning whitespace width_bucket window within wrapper xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate yes",
            types: Ct + "bigint int8 bigserial serial8 varbit bool box bytea cidr circle precision float8 inet int4 json jsonb line lseg macaddr macaddr8 money numeric pg_lsn point polygon float4 int2 smallserial serial2 serial serial4 text timetz timestamptz tsquery tsvector txid_snapshot uuid xml"
        }),
        Nh = "accessible algorithm analyze asensitive authors auto_increment autocommit avg avg_row_length binlog btree cache catalog_name chain change changed checkpoint checksum class_origin client_statistics coalesce code collations columns comment committed completion concurrent consistent contains contributors convert database databases day_hour day_microsecond day_minute day_second delay_key_write delayed delimiter des_key_file dev_pop dev_samp deviance directory disable discard distinctrow div dual dumpfile enable enclosed ends engine engines enum errors escaped even event events every explain extended fast field fields flush force found_rows fulltext grants handler hash high_priority hosts hour_microsecond hour_minute hour_second ignore ignore_server_ids import index index_statistics infile innodb insensitive insert_method install invoker iterate keys kill linear lines list load lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modify mutex mysql_errno no_write_to_binlog offline offset one online optimize optionally outfile pack_keys parser partition partitions password phase plugin plugins prev processlist profile profiles purge query quick range read_write rebuild recover regexp relaylog remove rename reorganize repair repeatable replace require resume rlike row_format rtree schedule schema_name schemas second_microsecond security sensitive separator serializable server share show slave slow snapshot soname spatial sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result ssl starting starts std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace terminated triggers truncate uncommitted uninstall unlock upgrade use use_frm user_resources user_statistics utc_date utc_time utc_timestamp variables views warnings xa xor year_month zerofill",
        Lh = Ct + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int1 int2 int3 int4 int8 float4 float8 varbinary varcharacter precision datetime unsigned signed",
        Fh = "charset clear edit ego help nopager notee nowarning pager print prompt quit rehash source status system tee",
        DQ = Ie.define({
            operatorChars: "*+-%<>!=&|^",
            charSetCasts: !0,
            doubleQuotedStrings: !0,
            unquotedBitLiterals: !0,
            hashComments: !0,
            spaceAfterDashes: !0,
            specialVar: "@?",
            identifierQuotes: "`",
            keywords: At + "group_concat " + Nh,
            types: Lh,
            builtin: Fh
        }),
        MQ = Ie.define({
            operatorChars: "*+-%<>!=&|^",
            charSetCasts: !0,
            doubleQuotedStrings: !0,
            unquotedBitLiterals: !0,
            hashComments: !0,
            spaceAfterDashes: !0,
            specialVar: "@?",
            identifierQuotes: "`",
            keywords: At + "always generated groupby_concat hard persistent shutdown soft virtual " + Nh,
            types: Lh,
            builtin: Fh
        }),
        IQ = Ie.define({
            keywords: At + "trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock pivot readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx unpivot updlock with",
            types: Ct + "bigint smallint smallmoney tinyint money real text nvarchar ntext varbinary image hierarchyid uniqueidentifier sql_variant xml",
            builtin: "binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id",
            operatorChars: "*+-%<>!=^&|/",
            specialVar: "@"
        }),
        BQ = Ie.define({
            keywords: At + "abort analyze attach autoincrement conflict database detach exclusive fail glob ignore index indexed instead isnull notnull offset plan pragma query raise regexp reindex rename replace temp vacuum virtual",
            types: Ct + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int2 int8 unsigned signed real",
            builtin: "auth backup bail changes clone databases dbinfo dump echo eqp explain fullschema headers help import imposter indexes iotrace lint load log mode nullvalue once print prompt quit restore save scanstats separator shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width",
            operatorChars: "*+-%<>!=&|/~",
            identifierQuotes: '`"',
            specialVar: "@:?$"
        }),
        NQ = Ie.define({
            keywords: "add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime infinity NaN",
            types: Ct + "ascii bigint blob counter frozen inet list map static text timeuuid tuple uuid varint",
            slashComments: !0
        }),
        LQ = Ie.define({
            keywords: At + "abort accept access add all alter and any arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body by case cast char_base check close cluster clusters colauth column comment commit compress connected constant constraint crash create current currval cursor data_base database dba deallocate debugoff debugon declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry exception exception_init exchange exclusive exists external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base of off offline on online only option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw rebuild record ref references refresh rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work",
            builtin: "appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define echo editfile embedded feedback flagger flush heading headsep instance linesize lno loboffset logsource longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar repfooter repheader serveroutput shiftinout show showmode spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout timing trimout trimspool ttitle underline verify version wrap",
            types: Ct + "ascii bfile bfilename bigserial bit blob dec long number nvarchar nvarchar2 serial smallint string text uid varchar2 xml",
            operatorChars: "*/+-%<>!=~",
            doubleQuotedStrings: !0,
            charSetCasts: !0
        });
    var Fn = n => {
        var {
            theme: e,
            settings: t,
            styles: i
        } = n, r = {
            "&": {
                backgroundColor: t.background,
                color: t.foreground
            },
            ".cm-gutters": {}
        };
        t.fontFamily && (r["&.cm-editor .cm-scroller"] = {
            fontFamily: t.fontFamily
        }), t.gutterBackground && (r[".cm-gutters"].backgroundColor = t.gutterBackground), t.gutterForeground && (r[".cm-gutters"].color = t.gutterForeground), t.gutterBorder && (r[".cm-gutters"].borderRightColor = t.gutterBorder), t.caret && (r[".cm-content"] = {
            caretColor: t.caret
        }, r[".cm-cursor, .cm-dropCursor"] = {
            borderLeftColor: t.caret
        });
        var s = {};
        t.gutterActiveForeground && (s.color = t.gutterActiveForeground), t.lineHighlight && (r[".cm-activeLine"] = {
            backgroundColor: t.lineHighlight
        }, s.backgroundColor = t.lineHighlight), r[".cm-activeLineGutter"] = s, t.selection && (r["&.cm-focused .cm-selectionBackground, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"] = {
            backgroundColor: t.selection
        }), t.selectionMatch && (r["& .cm-selectionMatch"] = {
            backgroundColor: t.selectionMatch
        });
        var O = w.theme(r, {
                dark: e === "dark"
            }),
            o = qt.define(i),
            l = [O, Gl(o)];
        return l
    };
    var ig = Fn({
            theme: "dark",
            settings: {
                background: "#292A30",
                foreground: "#CECFD0",
                caret: "#fff",
                selection: "#727377",
                selectionMatch: "#727377",
                lineHighlight: "#2F3239"
            },
            styles: [{
                tag: [u.comment, u.quote],
                color: "#7F8C98"
            }, {
                tag: [u.keyword],
                color: "#FF7AB2",
                fontWeight: "bold"
            }, {
                tag: [u.string, u.meta],
                color: "#FF8170"
            }, {
                tag: [u.typeName],
                color: "#DABAFF"
            }, {
                tag: [u.definition(u.variableName)],
                color: "#6BDFFF"
            }, {
                tag: [u.name],
                color: "#6BAA9F"
            }, {
                tag: [u.variableName],
                color: "#ACF2E4"
            }, {
                tag: [u.regexp, u.link],
                color: "#FF8170"
            }]
        }),
        eO = ig;
    var ng = Fn({
            theme: "light",
            settings: {
                background: "#fff",
                foreground: "#3D3D3D",
                selection: "#BBDFFF",
                selectionMatch: "#BBDFFF",
                gutterBackground: "#fff",
                gutterForeground: "#AFAFAF",
                lineHighlight: "#EDF4FF"
            },
            styles: [{
                tag: [u.comment, u.quote],
                color: "#707F8D"
            }, {
                tag: [u.typeName, u.typeOperator],
                color: "#aa0d91"
            }, {
                tag: [u.keyword],
                color: "#aa0d91",
                fontWeight: "bold"
            }, {
                tag: [u.string, u.meta],
                color: "#D23423"
            }, {
                tag: [u.name],
                color: "#032f62"
            }, {
                tag: [u.typeName],
                color: "#522BB2"
            }, {
                tag: [u.variableName],
                color: "#23575C"
            }, {
                tag: [u.definition(u.variableName)],
                color: "#327A9E"
            }, {
                tag: [u.regexp, u.link],
                color: "#0e0eff"
            }]
        }),
        tO = ng;
    var Hh = new wt,
        Kh = n => {
            n.data("filamentCodeField", ({
                state: e,
                displayMode: t,
                language: i,
                disabled: r,
                withLineNumbers: s,
                withAutocompletion: O
            }) => ({
                state: e,
                codeMirror: null,
                parsers: {
                    php: Qh,
                    javascript: En,
                    json: Sh,
                    html: Mn,
                    css: jn,
                    xml: zh,
                    sql: Bh
                },
                init() {
                    this.codeMirror = new w({
                        doc: this.state,
                        extensions: this.buildExtensionsArray(),
                        parent: this.$refs.codeBlock
                    }), t && this.$watch("state", o => {
                        this.codeMirror.dispatch({
                            changes: {
                                from: 0,
                                to: this.codeMirror.state.doc.length,
                                insert: o
                            }
                        })
                    }), window.addEventListener("dark-mode-toggled", o => {
                        this.codeMirror.dispatch({
                            effects: Hh.reconfigure(o.detail === "dark" ? eO : tO)
                        })
                    })
                },
                buildExtensionsArray() {
                    let o;
                    typeof theme == "undefined" ? o = "light" : theme === "system" ? o = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : o = theme;
                    let l = [this.parsers[i](), ii.of([Ll]), Hh.of(o === "light" ? tO : eO), w.contentAttributes.of({
                        contenteditable: !r && !t
                    }), w.lineWrapping];
                    return t || l.push(w.updateListener.of(a => {
                        a.docChanged && (this.state = a.state.doc.toString())
                    })), O && l.push(da()), s && l.push(pl()), l
                }
            }))
        };
    document.addEventListener("alpine:init", () => {
        window.Alpine.plugin(Kh)
    });
})();