var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i8 = 0, fns = array[flags >> 1], n9 = fns && fns.length; i8 < n9; i8++) flags & 1 ? fns[i8].call(self) : value = fns[i8].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k3 = flags & 7, s5 = !!(flags & 8), p4 = !!(flags & 16);
  var j3 = k3 > 3 ? array.length + 1 : k3 ? s5 ? 1 : 2 : 0, key = __decoratorStrings[k3 + 5];
  var initializers = k3 > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
  var desc = k3 && (!p4 && !s5 && (target = target.prototype), k3 < 5 && (k3 > 3 || !p4) && __getOwnPropDesc(k3 < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x3) {
    return __privateSet(this, extra, x3);
  } }, name));
  k3 ? p4 && k3 < 4 && __name(extra, (k3 > 2 ? "set " : k3 > 1 ? "get " : "") + name) : __name(target, name);
  for (var i8 = decorators.length - 1; i8 >= 0; i8--) {
    ctx = __decoratorContext(k3, name, done = {}, array[3], extraInitializers);
    if (k3) {
      ctx.static = s5, ctx.private = p4, access = ctx.access = { has: p4 ? (x3) => __privateIn(target, x3) : (x3) => name in x3 };
      if (k3 ^ 3) access.get = p4 ? (x3) => (k3 ^ 1 ? __privateGet : __privateMethod)(x3, target, k3 ^ 4 ? extra : desc.get) : (x3) => x3[name];
      if (k3 > 2) access.set = p4 ? (x3, y4) => __privateSet(x3, target, y4, k3 ^ 4 ? extra : desc.set) : (x3, y4) => x3[name] = y4;
    }
    it = (0, decorators[i8])(k3 ? k3 < 4 ? p4 ? extra : desc[key] : k3 > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k3 ^ 4 || it === void 0) __expectFn(it) && (k3 > 4 ? initializers.unshift(it) : k3 ? p4 ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k3 || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p4 ? k3 ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t7, e12, o10) {
    if (this._$cssResult$ = true, o10 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7, this.t = e12;
  }
  get styleSheet() {
    let t7 = this.o;
    const s5 = this.t;
    if (e && void 0 === t7) {
      const e12 = void 0 !== s5 && 1 === s5.length;
      e12 && (t7 = o.get(s5)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e12 && o.set(s5, t7));
    }
    return t7;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
var i = (t7, ...e12) => {
  const o10 = 1 === t7.length ? t7[0] : e12.reduce((e13, s5, o11) => e13 + ((t8) => {
    if (true === t8._$cssResult$) return t8.cssText;
    if ("number" == typeof t8) return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t7[o11 + 1], t7[0]);
  return new n(o10, t7, s);
};
var S = (s5, o10) => {
  if (e) s5.adoptedStyleSheets = o10.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
  else for (const e12 of o10) {
    const o11 = document.createElement("style"), n9 = t.litNonce;
    void 0 !== n9 && o11.setAttribute("nonce", n9), o11.textContent = e12.cssText, s5.appendChild(o11);
  }
};
var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e12 = "";
  for (const s5 of t8.cssRules) e12 += s5.cssText;
  return r(e12);
})(t7) : t7;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t7, s5) => t7;
var u = { toAttribute(t7, s5) {
  switch (s5) {
    case Boolean:
      t7 = t7 ? l : null;
      break;
    case Object:
    case Array:
      t7 = null == t7 ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, s5) {
  let i8 = t7;
  switch (s5) {
    case Boolean:
      i8 = null !== t7;
      break;
    case Number:
      i8 = null === t7 ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t7);
      } catch (t8) {
        i8 = null;
      }
  }
  return i8;
} };
var f = (t7, s5) => !i2(t7, s5);
var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
  static addInitializer(t7) {
    this._$Ei(), (this.l ??= []).push(t7);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t7, s5 = y) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t7, s5), !s5.noAccessor) {
      const i8 = Symbol(), r10 = this.getPropertyDescriptor(t7, i8, s5);
      void 0 !== r10 && e2(this.prototype, t7, r10);
    }
  }
  static getPropertyDescriptor(t7, s5, i8) {
    const { get: e12, set: h6 } = r2(this.prototype, t7) ?? { get() {
      return this[s5];
    }, set(t8) {
      this[s5] = t8;
    } };
    return { get() {
      return e12?.call(this);
    }, set(s6) {
      const r10 = e12?.call(this);
      h6.call(this, s6), this.requestUpdate(t7, r10, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    return this.elementProperties.get(t7) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t7 = n2(this);
    t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t8 = this.properties, s5 = [...h(t8), ...o2(t8)];
      for (const i8 of s5) this.createProperty(i8, t8[i8]);
    }
    const t7 = this[Symbol.metadata];
    if (null !== t7) {
      const s5 = litPropertyMetadata.get(t7);
      if (void 0 !== s5) for (const [t8, i8] of s5) this.elementProperties.set(t8, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t8, s5] of this.elementProperties) {
      const i8 = this._$Eu(t8, s5);
      void 0 !== i8 && this._$Eh.set(i8, t8);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i8 = [];
    if (Array.isArray(s5)) {
      const e12 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e12) i8.unshift(c(s6));
    } else void 0 !== s5 && i8.push(c(s5));
    return i8;
  }
  static _$Eu(t7, s5) {
    const i8 = s5.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
  }
  addController(t7) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
  }
  removeController(t7) {
    this._$EO?.delete(t7);
  }
  _$E_() {
    const t7 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i8 of s5.keys()) this.hasOwnProperty(i8) && (t7.set(i8, this[i8]), delete this[i8]);
    t7.size > 0 && (this._$Ep = t7);
  }
  createRenderRoot() {
    const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t7, this.constructor.elementStyles), t7;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t7) => t7.hostDisconnected?.());
  }
  attributeChangedCallback(t7, s5, i8) {
    this._$AK(t7, i8);
  }
  _$EC(t7, s5) {
    const i8 = this.constructor.elementProperties.get(t7), e12 = this.constructor._$Eu(t7, i8);
    if (void 0 !== e12 && true === i8.reflect) {
      const r10 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u).toAttribute(s5, i8.type);
      this._$Em = t7, null == r10 ? this.removeAttribute(e12) : this.setAttribute(e12, r10), this._$Em = null;
    }
  }
  _$AK(t7, s5) {
    const i8 = this.constructor, e12 = i8._$Eh.get(t7);
    if (void 0 !== e12 && this._$Em !== e12) {
      const t8 = i8.getPropertyOptions(e12), r10 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
      this._$Em = e12, this[e12] = r10.fromAttribute(s5, t8.type), this._$Em = null;
    }
  }
  requestUpdate(t7, s5, i8) {
    if (void 0 !== t7) {
      if (i8 ??= this.constructor.getPropertyOptions(t7), !(i8.hasChanged ?? f)(this[t7], s5)) return;
      this.P(t7, s5, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t7, s5, i8) {
    this._$AL.has(t7) || this._$AL.set(t7, s5), true === i8.reflect && this._$Em !== t7 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t7);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.scheduleUpdate();
    return null != t7 && await t7, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t9, s6] of this._$Ep) this[t9] = s6;
        this._$Ep = void 0;
      }
      const t8 = this.constructor.elementProperties;
      if (t8.size > 0) for (const [s6, i8] of t8) true !== i8.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i8);
    }
    let t7 = false;
    const s5 = this._$AL;
    try {
      t7 = this.shouldUpdate(s5), t7 ? (this.willUpdate(s5), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s5)) : this._$EU();
    } catch (s6) {
      throw t7 = false, this._$EU(), s6;
    }
    t7 && this._$AE(s5);
  }
  willUpdate(t7) {
  }
  _$AE(t7) {
    this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this._$Ej &&= this._$Ej.forEach((t8) => this._$EC(t8, this[t8])), this._$EU();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
var a2 = Array.isArray;
var u2 = (t7) => a2(t7) || "function" == typeof t7?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t7) => (i8, ...s5) => ({ _$litType$: t7, strings: i8, values: s5 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t7, i8) {
  if (!a2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i8) : i8;
}
var V = (t7, i8) => {
  const s5 = t7.length - 1, o10 = [];
  let r10, l6 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c7 = f2;
  for (let i9 = 0; i9 < s5; i9++) {
    const s6 = t7[i9];
    let a5, u6, d4 = -1, y4 = 0;
    for (; y4 < s6.length && (c7.lastIndex = y4, u6 = c7.exec(s6), null !== u6); ) y4 = c7.lastIndex, c7 === f2 ? "!--" === u6[1] ? c7 = v : void 0 !== u6[1] ? c7 = _ : void 0 !== u6[2] ? ($.test(u6[2]) && (r10 = RegExp("</" + u6[2], "g")), c7 = m) : void 0 !== u6[3] && (c7 = m) : c7 === m ? ">" === u6[0] ? (c7 = r10 ?? f2, d4 = -1) : void 0 === u6[1] ? d4 = -2 : (d4 = c7.lastIndex - u6[2].length, a5 = u6[1], c7 = void 0 === u6[3] ? m : '"' === u6[3] ? g : p2) : c7 === g || c7 === p2 ? c7 = m : c7 === v || c7 === _ ? c7 = f2 : (c7 = m, r10 = void 0);
    const x3 = c7 === m && t7[i9 + 1].startsWith("/>") ? " " : "";
    l6 += c7 === f2 ? s6 + n3 : d4 >= 0 ? (o10.push(a5), s6.slice(0, d4) + e3 + s6.slice(d4) + h2 + x3) : s6 + h2 + (-2 === d4 ? i9 : x3);
  }
  return [P(t7, l6 + (t7[s5] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), o10];
};
var N = class _N {
  constructor({ strings: t7, _$litType$: s5 }, n9) {
    let r10;
    this.parts = [];
    let c7 = 0, a5 = 0;
    const u6 = t7.length - 1, d4 = this.parts, [f6, v3] = V(t7, s5);
    if (this.el = _N.createElement(f6, n9), C.currentNode = this.el.content, 2 === s5 || 3 === s5) {
      const t8 = this.el.content.firstChild;
      t8.replaceWith(...t8.childNodes);
    }
    for (; null !== (r10 = C.nextNode()) && d4.length < u6; ) {
      if (1 === r10.nodeType) {
        if (r10.hasAttributes()) for (const t8 of r10.getAttributeNames()) if (t8.endsWith(e3)) {
          const i8 = v3[a5++], s6 = r10.getAttribute(t8).split(h2), e12 = /([.?@])?(.*)/.exec(i8);
          d4.push({ type: 1, index: c7, name: e12[2], strings: s6, ctor: "." === e12[1] ? H : "?" === e12[1] ? I : "@" === e12[1] ? L : k }), r10.removeAttribute(t8);
        } else t8.startsWith(h2) && (d4.push({ type: 6, index: c7 }), r10.removeAttribute(t8));
        if ($.test(r10.tagName)) {
          const t8 = r10.textContent.split(h2), s6 = t8.length - 1;
          if (s6 > 0) {
            r10.textContent = i3 ? i3.emptyScript : "";
            for (let i8 = 0; i8 < s6; i8++) r10.append(t8[i8], l2()), C.nextNode(), d4.push({ type: 2, index: ++c7 });
            r10.append(t8[s6], l2());
          }
        }
      } else if (8 === r10.nodeType) if (r10.data === o3) d4.push({ type: 2, index: c7 });
      else {
        let t8 = -1;
        for (; -1 !== (t8 = r10.data.indexOf(h2, t8 + 1)); ) d4.push({ type: 7, index: c7 }), t8 += h2.length - 1;
      }
      c7++;
    }
  }
  static createElement(t7, i8) {
    const s5 = r3.createElement("template");
    return s5.innerHTML = t7, s5;
  }
};
function S2(t7, i8, s5 = t7, e12) {
  if (i8 === T) return i8;
  let h6 = void 0 !== e12 ? s5._$Co?.[e12] : s5._$Cl;
  const o10 = c3(i8) ? void 0 : i8._$litDirective$;
  return h6?.constructor !== o10 && (h6?._$AO?.(false), void 0 === o10 ? h6 = void 0 : (h6 = new o10(t7), h6._$AT(t7, s5, e12)), void 0 !== e12 ? (s5._$Co ??= [])[e12] = h6 : s5._$Cl = h6), void 0 !== h6 && (i8 = S2(t7, h6._$AS(t7, i8.values), h6, e12)), i8;
}
var M = class {
  constructor(t7, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t7) {
    const { el: { content: i8 }, parts: s5 } = this._$AD, e12 = (t7?.creationScope ?? r3).importNode(i8, true);
    C.currentNode = e12;
    let h6 = C.nextNode(), o10 = 0, n9 = 0, l6 = s5[0];
    for (; void 0 !== l6; ) {
      if (o10 === l6.index) {
        let i9;
        2 === l6.type ? i9 = new R(h6, h6.nextSibling, this, t7) : 1 === l6.type ? i9 = new l6.ctor(h6, l6.name, l6.strings, this, t7) : 6 === l6.type && (i9 = new z(h6, this, t7)), this._$AV.push(i9), l6 = s5[++n9];
      }
      o10 !== l6?.index && (h6 = C.nextNode(), o10++);
    }
    return C.currentNode = r3, e12;
  }
  p(t7) {
    let i8 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t7, s5, i8), i8 += s5.strings.length - 2) : s5._$AI(t7[i8])), i8++;
  }
};
var R = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t7, i8, s5, e12) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t7, this._$AB = i8, this._$AM = s5, this.options = e12, this._$Cv = e12?.isConnected ?? true;
  }
  get parentNode() {
    let t7 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t7?.nodeType && (t7 = i8.parentNode), t7;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t7, i8 = this) {
    t7 = S2(this, t7, i8), c3(t7) ? t7 === E || null == t7 || "" === t7 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t7 !== this._$AH && t7 !== T && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
  }
  O(t7) {
    return this._$AA.parentNode.insertBefore(t7, this._$AB);
  }
  T(t7) {
    this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
  }
  _(t7) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
  }
  $(t7) {
    const { values: i8, _$litType$: s5 } = t7, e12 = "number" == typeof s5 ? this._$AC(t7) : (void 0 === s5.el && (s5.el = N.createElement(P(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e12) this._$AH.p(i8);
    else {
      const t8 = new M(e12, this), s6 = t8.u(this.options);
      t8.p(i8), this.T(s6), this._$AH = t8;
    }
  }
  _$AC(t7) {
    let i8 = A.get(t7.strings);
    return void 0 === i8 && A.set(t7.strings, i8 = new N(t7)), i8;
  }
  k(t7) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s5, e12 = 0;
    for (const h6 of t7) e12 === i8.length ? i8.push(s5 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s5 = i8[e12], s5._$AI(h6), e12++;
    e12 < i8.length && (this._$AR(s5 && s5._$AB.nextSibling, e12), i8.length = e12);
  }
  _$AR(t7 = this._$AA.nextSibling, i8) {
    for (this._$AP?.(false, true, i8); t7 && t7 !== this._$AB; ) {
      const i9 = t7.nextSibling;
      t7.remove(), t7 = i9;
    }
  }
  setConnected(t7) {
    void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t7, i8, s5, e12, h6) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t7, this.name = i8, this._$AM = e12, this.options = h6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = E;
  }
  _$AI(t7, i8 = this, s5, e12) {
    const h6 = this.strings;
    let o10 = false;
    if (void 0 === h6) t7 = S2(this, t7, i8, 0), o10 = !c3(t7) || t7 !== this._$AH && t7 !== T, o10 && (this._$AH = t7);
    else {
      const e13 = t7;
      let n9, r10;
      for (t7 = h6[0], n9 = 0; n9 < h6.length - 1; n9++) r10 = S2(this, e13[s5 + n9], i8, n9), r10 === T && (r10 = this._$AH[n9]), o10 ||= !c3(r10) || r10 !== this._$AH[n9], r10 === E ? t7 = E : t7 !== E && (t7 += (r10 ?? "") + h6[n9 + 1]), this._$AH[n9] = r10;
    }
    o10 && !e12 && this.j(t7);
  }
  j(t7) {
    t7 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t7) {
    this.element[this.name] = t7 === E ? void 0 : t7;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t7) {
    this.element.toggleAttribute(this.name, !!t7 && t7 !== E);
  }
};
var L = class extends k {
  constructor(t7, i8, s5, e12, h6) {
    super(t7, i8, s5, e12, h6), this.type = 5;
  }
  _$AI(t7, i8 = this) {
    if ((t7 = S2(this, t7, i8, 0) ?? E) === T) return;
    const s5 = this._$AH, e12 = t7 === E && s5 !== E || t7.capture !== s5.capture || t7.once !== s5.once || t7.passive !== s5.passive, h6 = t7 !== E && (s5 === E || e12);
    e12 && this.element.removeEventListener(this.name, this, s5), h6 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
  }
  handleEvent(t7) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
  }
};
var z = class {
  constructor(t7, i8, s5) {
    this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t7) {
    S2(this, t7);
  }
};
var Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
var j = t2.litHtmlPolyfillSupport;
j?.(N, R), (t2.litHtmlVersions ??= []).push("3.2.1");
var B = (t7, i8, s5) => {
  const e12 = s5?.renderBefore ?? i8;
  let h6 = e12._$litPart$;
  if (void 0 === h6) {
    const t8 = s5?.renderBefore ?? null;
    e12._$litPart$ = h6 = new R(i8.insertBefore(l2(), t8), t8, void 0, s5 ?? {});
  }
  return h6._$AI(t7), h6;
};

// node_modules/lit-element/lit-element.js
var r4 = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t7 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t7.firstChild, t7;
  }
  update(t7) {
    const s5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(s5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
r4._$litElement$ = true, r4["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: r4 });
var i4 = globalThis.litElementPolyfillSupport;
i4?.({ LitElement: r4 });
(globalThis.litElementVersions ??= []).push("4.1.1");

// node_modules/@webwriter/lit/index.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __knownSymbol2 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __decoratorStart2 = (base) => [, , , __create2(base?.[__knownSymbol2("metadata")] ?? null)];
var __decoratorStrings2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn2 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError2("Function expected") : fn;
var __decoratorContext2 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings2[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError2("Already initialized") : fns.push(__expectFn2(fn || null)) });
var __decoratorMetadata2 = (array, target) => __defNormalProp2(target, __knownSymbol2("metadata"), array[3]);
var __runInitializers2 = (array, flags, self, value) => {
  for (var i32 = 0, fns = array[flags >> 1], n52 = fns && fns.length; i32 < n52; i32++) flags & 1 ? fns[i32].call(self) : value = fns[i32].call(self, value);
  return value;
};
var __decorateElement2 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k22 = flags & 7, s22 = !!(flags & 8), p22 = !!(flags & 16);
  var j22 = k22 > 3 ? array.length + 1 : k22 ? s22 ? 1 : 2 : 0, key = __decoratorStrings2[k22 + 5];
  var initializers = k22 > 3 && (array[j22 - 1] = []), extraInitializers = array[j22] || (array[j22] = []);
  var desc = k22 && (!p22 && !s22 && (target = target.prototype), k22 < 5 && (k22 > 3 || !p22) && __getOwnPropDesc2(k22 < 4 ? target : { get [name]() {
    return __privateGet2(this, extra);
  }, set [name](x22) {
    return __privateSet2(this, extra, x22);
  } }, name));
  k22 ? p22 && k22 < 4 && __name2(extra, (k22 > 2 ? "set " : k22 > 1 ? "get " : "") + name) : __name2(target, name);
  for (var i32 = decorators.length - 1; i32 >= 0; i32--) {
    ctx = __decoratorContext2(k22, name, done = {}, array[3], extraInitializers);
    if (k22) {
      ctx.static = s22, ctx.private = p22, access = ctx.access = { has: p22 ? (x22) => __privateIn2(target, x22) : (x22) => name in x22 };
      if (k22 ^ 3) access.get = p22 ? (x22) => (k22 ^ 1 ? __privateGet2 : __privateMethod2)(x22, target, k22 ^ 4 ? extra : desc.get) : (x22) => x22[name];
      if (k22 > 2) access.set = p22 ? (x22, y22) => __privateSet2(x22, target, y22, k22 ^ 4 ? extra : desc.set) : (x22, y22) => x22[name] = y22;
    }
    it = (0, decorators[i32])(k22 ? k22 < 4 ? p22 ? extra : desc[key] : k22 > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k22 ^ 4 || it === void 0) __expectFn2(it) && (k22 > 4 ? initializers.unshift(it) : k22 ? p22 ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError2("Object expected");
    else __expectFn2(fn = it.get) && (desc.get = fn), __expectFn2(fn = it.set) && (desc.set = fn), __expectFn2(fn = it.init) && initializers.unshift(fn);
  }
  return k22 || __decoratorMetadata2(array, target), desc && __defProp2(target, name, desc), p22 ? k22 ^ 4 ? extra : desc : target;
};
var __publicField2 = (obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateIn2 = (member, obj) => Object(obj) !== obj ? __typeError2('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet2 = (obj, member, value, setter) => (__accessCheck2(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod2 = (obj, member, method) => (__accessCheck2(obj, member, "access private method"), method);
var t3 = globalThis;
var e4 = t3.ShadowRoot && (void 0 === t3.ShadyCSS || t3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s3 = Symbol();
var o4 = /* @__PURE__ */ new WeakMap();
var n4 = class {
  constructor(t22, e42, o42) {
    if (this._$cssResult$ = true, o42 !== s3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t22, this.t = e42;
  }
  get styleSheet() {
    let t22 = this.o;
    const s22 = this.t;
    if (e4 && void 0 === t22) {
      const e42 = void 0 !== s22 && 1 === s22.length;
      e42 && (t22 = o4.get(s22)), void 0 === t22 && ((this.o = t22 = new CSSStyleSheet()).replaceSync(this.cssText), e42 && o4.set(s22, t22));
    }
    return t22;
  }
  toString() {
    return this.cssText;
  }
};
var r5 = (t22) => new n4("string" == typeof t22 ? t22 : t22 + "", void 0, s3);
var S3 = (s22, o42) => {
  if (e4) s22.adoptedStyleSheets = o42.map((t22) => t22 instanceof CSSStyleSheet ? t22 : t22.styleSheet);
  else for (const e42 of o42) {
    const o52 = document.createElement("style"), n52 = t3.litNonce;
    void 0 !== n52 && o52.setAttribute("nonce", n52), o52.textContent = e42.cssText, s22.appendChild(o52);
  }
};
var c4 = e4 ? (t22) => t22 : (t22) => t22 instanceof CSSStyleSheet ? ((t32) => {
  let e42 = "";
  for (const s22 of t32.cssRules) e42 += s22.cssText;
  return r5(e42);
})(t22) : t22;
var { is: i22, defineProperty: e22, getOwnPropertyDescriptor: r22, getOwnPropertyNames: h3, getOwnPropertySymbols: o22, getPrototypeOf: n22 } = Object;
var a3 = globalThis;
var c22 = a3.trustedTypes;
var l3 = c22 ? c22.emptyScript : "";
var p3 = a3.reactiveElementPolyfillSupport;
var d3 = (t22, s22) => t22;
var u3 = { toAttribute(t22, s22) {
  switch (s22) {
    case Boolean:
      t22 = t22 ? l3 : null;
      break;
    case Object:
    case Array:
      t22 = null == t22 ? t22 : JSON.stringify(t22);
  }
  return t22;
}, fromAttribute(t22, s22) {
  let i32 = t22;
  switch (s22) {
    case Boolean:
      i32 = null !== t22;
      break;
    case Number:
      i32 = null === t22 ? null : Number(t22);
      break;
    case Object:
    case Array:
      try {
        i32 = JSON.parse(t22);
      } catch (t32) {
        i32 = null;
      }
  }
  return i32;
} };
var f3 = (t22, s22) => !i22(t22, s22);
var y3 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
Symbol.metadata ??= Symbol("metadata"), a3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b3 = class extends HTMLElement {
  static addInitializer(t22) {
    this._$Ei(), (this.l ??= []).push(t22);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t22, s22 = y3) {
    if (s22.state && (s22.attribute = false), this._$Ei(), this.elementProperties.set(t22, s22), !s22.noAccessor) {
      const i32 = Symbol(), r42 = this.getPropertyDescriptor(t22, i32, s22);
      void 0 !== r42 && e22(this.prototype, t22, r42);
    }
  }
  static getPropertyDescriptor(t22, s22, i32) {
    const { get: e42, set: h42 } = r22(this.prototype, t22) ?? { get() {
      return this[s22];
    }, set(t32) {
      this[s22] = t32;
    } };
    return { get() {
      return e42?.call(this);
    }, set(s32) {
      const r42 = e42?.call(this);
      h42.call(this, s32), this.requestUpdate(t22, r42, i32);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t22) {
    return this.elementProperties.get(t22) ?? y3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d3("elementProperties"))) return;
    const t22 = n22(this);
    t22.finalize(), void 0 !== t22.l && (this.l = [...t22.l]), this.elementProperties = new Map(t22.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d3("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d3("properties"))) {
      const t32 = this.properties, s22 = [...h3(t32), ...o22(t32)];
      for (const i32 of s22) this.createProperty(i32, t32[i32]);
    }
    const t22 = this[Symbol.metadata];
    if (null !== t22) {
      const s22 = litPropertyMetadata.get(t22);
      if (void 0 !== s22) for (const [t32, i32] of s22) this.elementProperties.set(t32, i32);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t32, s22] of this.elementProperties) {
      const i32 = this._$Eu(t32, s22);
      void 0 !== i32 && this._$Eh.set(i32, t32);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s22) {
    const i32 = [];
    if (Array.isArray(s22)) {
      const e42 = new Set(s22.flat(1 / 0).reverse());
      for (const s32 of e42) i32.unshift(c4(s32));
    } else void 0 !== s22 && i32.push(c4(s22));
    return i32;
  }
  static _$Eu(t22, s22) {
    const i32 = s22.attribute;
    return false === i32 ? void 0 : "string" == typeof i32 ? i32 : "string" == typeof t22 ? t22.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t22) => this.enableUpdating = t22), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t22) => t22(this));
  }
  addController(t22) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t22), void 0 !== this.renderRoot && this.isConnected && t22.hostConnected?.();
  }
  removeController(t22) {
    this._$EO?.delete(t22);
  }
  _$E_() {
    const t22 = /* @__PURE__ */ new Map(), s22 = this.constructor.elementProperties;
    for (const i32 of s22.keys()) this.hasOwnProperty(i32) && (t22.set(i32, this[i32]), delete this[i32]);
    t22.size > 0 && (this._$Ep = t22);
  }
  createRenderRoot() {
    const t22 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S3(t22, this.constructor.elementStyles), t22;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t22) => t22.hostConnected?.());
  }
  enableUpdating(t22) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t22) => t22.hostDisconnected?.());
  }
  attributeChangedCallback(t22, s22, i32) {
    this._$AK(t22, i32);
  }
  _$EC(t22, s22) {
    const i32 = this.constructor.elementProperties.get(t22), e42 = this.constructor._$Eu(t22, i32);
    if (void 0 !== e42 && true === i32.reflect) {
      const r42 = (void 0 !== i32.converter?.toAttribute ? i32.converter : u3).toAttribute(s22, i32.type);
      this._$Em = t22, null == r42 ? this.removeAttribute(e42) : this.setAttribute(e42, r42), this._$Em = null;
    }
  }
  _$AK(t22, s22) {
    const i32 = this.constructor, e42 = i32._$Eh.get(t22);
    if (void 0 !== e42 && this._$Em !== e42) {
      const t32 = i32.getPropertyOptions(e42), r42 = "function" == typeof t32.converter ? { fromAttribute: t32.converter } : void 0 !== t32.converter?.fromAttribute ? t32.converter : u3;
      this._$Em = e42, this[e42] = r42.fromAttribute(s22, t32.type), this._$Em = null;
    }
  }
  requestUpdate(t22, s22, i32) {
    if (void 0 !== t22) {
      if (i32 ??= this.constructor.getPropertyOptions(t22), !(i32.hasChanged ?? f3)(this[t22], s22)) return;
      this.P(t22, s22, i32);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t22, s22, i32) {
    this._$AL.has(t22) || this._$AL.set(t22, s22), true === i32.reflect && this._$Em !== t22 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t22);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t32) {
      Promise.reject(t32);
    }
    const t22 = this.scheduleUpdate();
    return null != t22 && await t22, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t42, s32] of this._$Ep) this[t42] = s32;
        this._$Ep = void 0;
      }
      const t32 = this.constructor.elementProperties;
      if (t32.size > 0) for (const [s32, i32] of t32) true !== i32.wrapped || this._$AL.has(s32) || void 0 === this[s32] || this.P(s32, this[s32], i32);
    }
    let t22 = false;
    const s22 = this._$AL;
    try {
      t22 = this.shouldUpdate(s22), t22 ? (this.willUpdate(s22), this._$EO?.forEach((t32) => t32.hostUpdate?.()), this.update(s22)) : this._$EU();
    } catch (s32) {
      throw t22 = false, this._$EU(), s32;
    }
    t22 && this._$AE(s22);
  }
  willUpdate(t22) {
  }
  _$AE(t22) {
    this._$EO?.forEach((t32) => t32.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t22)), this.updated(t22);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t22) {
    return true;
  }
  update(t22) {
    this._$Ej &&= this._$Ej.forEach((t32) => this._$EC(t32, this[t32])), this._$EU();
  }
  updated(t22) {
  }
  firstUpdated(t22) {
  }
};
b3.elementStyles = [], b3.shadowRootOptions = { mode: "open" }, b3[d3("elementProperties")] = /* @__PURE__ */ new Map(), b3[d3("finalized")] = /* @__PURE__ */ new Map(), p3?.({ ReactiveElement: b3 }), (a3.reactiveElementVersions ??= []).push("2.0.4");
var n32 = globalThis;
var c32 = n32.trustedTypes;
var h22 = c32 ? c32.createPolicy("lit-html", { createHTML: (t22) => t22 }) : void 0;
var f22 = "$lit$";
var v2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var m2 = "?" + v2;
var _2 = `<${m2}>`;
var w2 = document;
var lt = () => w2.createComment("");
var st = (t22) => null === t22 || "object" != typeof t22 && "function" != typeof t22;
var g2 = Array.isArray;
var $2 = (t22) => g2(t22) || "function" == typeof t22?.[Symbol.iterator];
var x2 = "[ 	\n\f\r]";
var T2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var E2 = /-->/g;
var k2 = />/g;
var O = RegExp(`>|${x2}(?:([^\\s"'>=/]+)(${x2}*=${x2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var S22 = /'/g;
var j2 = /"/g;
var M2 = /^(?:script|style|textarea|title)$/i;
var P2 = (t22) => (i32, ...s22) => ({ _$litType$: t22, strings: i32, values: s22 });
var ke = P2(1);
var Oe = P2(2);
var Se = P2(3);
var R2 = Symbol.for("lit-noChange");
var D = Symbol.for("lit-nothing");
var V2 = /* @__PURE__ */ new WeakMap();
var I2 = w2.createTreeWalker(w2, 129);
function N2(t22, i32) {
  if (!g2(t22) || !t22.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== h22 ? h22.createHTML(i32) : i32;
}
var U = (t22, i32) => {
  const s22 = t22.length - 1, e42 = [];
  let h42, o42 = 2 === i32 ? "<svg>" : 3 === i32 ? "<math>" : "", n52 = T2;
  for (let i42 = 0; i42 < s22; i42++) {
    const s32 = t22[i42];
    let r42, l22, c42 = -1, a22 = 0;
    for (; a22 < s32.length && (n52.lastIndex = a22, l22 = n52.exec(s32), null !== l22); ) a22 = n52.lastIndex, n52 === T2 ? "!--" === l22[1] ? n52 = E2 : void 0 !== l22[1] ? n52 = k2 : void 0 !== l22[2] ? (M2.test(l22[2]) && (h42 = RegExp("</" + l22[2], "g")), n52 = O) : void 0 !== l22[3] && (n52 = O) : n52 === O ? ">" === l22[0] ? (n52 = h42 ?? T2, c42 = -1) : void 0 === l22[1] ? c42 = -2 : (c42 = n52.lastIndex - l22[2].length, r42 = l22[1], n52 = void 0 === l22[3] ? O : '"' === l22[3] ? j2 : S22) : n52 === j2 || n52 === S22 ? n52 = O : n52 === E2 || n52 === k2 ? n52 = T2 : (n52 = O, h42 = void 0);
    const u22 = n52 === O && t22[i42 + 1].startsWith("/>") ? " " : "";
    o42 += n52 === T2 ? s32 + _2 : c42 >= 0 ? (e42.push(r42), s32.slice(0, c42) + f22 + s32.slice(c42) + v2 + u22) : s32 + v2 + (-2 === c42 ? i42 : u22);
  }
  return [N2(t22, o42 + (t22[s22] || "<?>") + (2 === i32 ? "</svg>" : 3 === i32 ? "</math>" : "")), e42];
};
var B2 = class _B {
  constructor({ strings: t22, _$litType$: i32 }, s22) {
    let e42;
    this.parts = [];
    let h42 = 0, o42 = 0;
    const n52 = t22.length - 1, r42 = this.parts, [l22, a22] = U(t22, i32);
    if (this.el = _B.createElement(l22, s22), I2.currentNode = this.el.content, 2 === i32 || 3 === i32) {
      const t32 = this.el.content.firstChild;
      t32.replaceWith(...t32.childNodes);
    }
    for (; null !== (e42 = I2.nextNode()) && r42.length < n52; ) {
      if (1 === e42.nodeType) {
        if (e42.hasAttributes()) for (const t32 of e42.getAttributeNames()) if (t32.endsWith(f22)) {
          const i42 = a22[o42++], s32 = e42.getAttribute(t32).split(v2), n62 = /([.?@])?(.*)/.exec(i42);
          r42.push({ type: 1, index: h42, name: n62[2], strings: s32, ctor: "." === n62[1] ? Y : "?" === n62[1] ? Z2 : "@" === n62[1] ? q : G }), e42.removeAttribute(t32);
        } else t32.startsWith(v2) && (r42.push({ type: 6, index: h42 }), e42.removeAttribute(t32));
        if (M2.test(e42.tagName)) {
          const t32 = e42.textContent.split(v2), i42 = t32.length - 1;
          if (i42 > 0) {
            e42.textContent = c32 ? c32.emptyScript : "";
            for (let s32 = 0; s32 < i42; s32++) e42.append(t32[s32], lt()), I2.nextNode(), r42.push({ type: 2, index: ++h42 });
            e42.append(t32[i42], lt());
          }
        }
      } else if (8 === e42.nodeType) if (e42.data === m2) r42.push({ type: 2, index: h42 });
      else {
        let t32 = -1;
        for (; -1 !== (t32 = e42.data.indexOf(v2, t32 + 1)); ) r42.push({ type: 7, index: h42 }), t32 += v2.length - 1;
      }
      h42++;
    }
  }
  static createElement(t22, i32) {
    const s22 = w2.createElement("template");
    return s22.innerHTML = t22, s22;
  }
};
function z2(t22, i32, s22 = t22, e42) {
  if (i32 === R2) return i32;
  let h42 = void 0 !== e42 ? s22.o?.[e42] : s22.l;
  const o42 = st(i32) ? void 0 : i32._$litDirective$;
  return h42?.constructor !== o42 && (h42?._$AO?.(false), void 0 === o42 ? h42 = void 0 : (h42 = new o42(t22), h42._$AT(t22, s22, e42)), void 0 !== e42 ? (s22.o ??= [])[e42] = h42 : s22.l = h42), void 0 !== h42 && (i32 = z2(t22, h42._$AS(t22, i32.values), h42, e42)), i32;
}
var F = class {
  constructor(t22, i32) {
    this._$AV = [], this._$AN = void 0, this._$AD = t22, this._$AM = i32;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t22) {
    const { el: { content: i32 }, parts: s22 } = this._$AD, e42 = (t22?.creationScope ?? w2).importNode(i32, true);
    I2.currentNode = e42;
    let h42 = I2.nextNode(), o42 = 0, n52 = 0, r42 = s22[0];
    for (; void 0 !== r42; ) {
      if (o42 === r42.index) {
        let i42;
        2 === r42.type ? i42 = new et(h42, h42.nextSibling, this, t22) : 1 === r42.type ? i42 = new r42.ctor(h42, r42.name, r42.strings, this, t22) : 6 === r42.type && (i42 = new K(h42, this, t22)), this._$AV.push(i42), r42 = s22[++n52];
      }
      o42 !== r42?.index && (h42 = I2.nextNode(), o42++);
    }
    return I2.currentNode = w2, e42;
  }
  p(t22) {
    let i32 = 0;
    for (const s22 of this._$AV) void 0 !== s22 && (void 0 !== s22.strings ? (s22._$AI(t22, s22, i32), i32 += s22.strings.length - 2) : s22._$AI(t22[i32])), i32++;
  }
};
var et = class _et {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(t22, i32, s22, e42) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t22, this._$AB = i32, this._$AM = s22, this.options = e42, this.v = e42?.isConnected ?? true;
  }
  get parentNode() {
    let t22 = this._$AA.parentNode;
    const i32 = this._$AM;
    return void 0 !== i32 && 11 === t22?.nodeType && (t22 = i32.parentNode), t22;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t22, i32 = this) {
    t22 = z2(this, t22, i32), st(t22) ? t22 === D || null == t22 || "" === t22 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t22 !== this._$AH && t22 !== R2 && this._(t22) : void 0 !== t22._$litType$ ? this.$(t22) : void 0 !== t22.nodeType ? this.T(t22) : $2(t22) ? this.k(t22) : this._(t22);
  }
  O(t22) {
    return this._$AA.parentNode.insertBefore(t22, this._$AB);
  }
  T(t22) {
    this._$AH !== t22 && (this._$AR(), this._$AH = this.O(t22));
  }
  _(t22) {
    this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t22 : this.T(w2.createTextNode(t22)), this._$AH = t22;
  }
  $(t22) {
    const { values: i32, _$litType$: s22 } = t22, e42 = "number" == typeof s22 ? this._$AC(t22) : (void 0 === s22.el && (s22.el = B2.createElement(N2(s22.h, s22.h[0]), this.options)), s22);
    if (this._$AH?._$AD === e42) this._$AH.p(i32);
    else {
      const t32 = new F(e42, this), s32 = t32.u(this.options);
      t32.p(i32), this.T(s32), this._$AH = t32;
    }
  }
  _$AC(t22) {
    let i32 = V2.get(t22.strings);
    return void 0 === i32 && V2.set(t22.strings, i32 = new B2(t22)), i32;
  }
  k(t22) {
    g2(this._$AH) || (this._$AH = [], this._$AR());
    const i32 = this._$AH;
    let s22, e42 = 0;
    for (const h42 of t22) e42 === i32.length ? i32.push(s22 = new _et(this.O(lt()), this.O(lt()), this, this.options)) : s22 = i32[e42], s22._$AI(h42), e42++;
    e42 < i32.length && (this._$AR(s22 && s22._$AB.nextSibling, e42), i32.length = e42);
  }
  _$AR(t22 = this._$AA.nextSibling, i32) {
    for (this._$AP?.(false, true, i32); t22 && t22 !== this._$AB; ) {
      const i42 = t22.nextSibling;
      t22.remove(), t22 = i42;
    }
  }
  setConnected(t22) {
    void 0 === this._$AM && (this.v = t22, this._$AP?.(t22));
  }
};
var G = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t22, i32, s22, e42, h42) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t22, this.name = i32, this._$AM = e42, this.options = h42, s22.length > 2 || "" !== s22[0] || "" !== s22[1] ? (this._$AH = Array(s22.length - 1).fill(new String()), this.strings = s22) : this._$AH = D;
  }
  _$AI(t22, i32 = this, s22, e42) {
    const h42 = this.strings;
    let o42 = false;
    if (void 0 === h42) t22 = z2(this, t22, i32, 0), o42 = !st(t22) || t22 !== this._$AH && t22 !== R2, o42 && (this._$AH = t22);
    else {
      const e52 = t22;
      let n52, r42;
      for (t22 = h42[0], n52 = 0; n52 < h42.length - 1; n52++) r42 = z2(this, e52[s22 + n52], i32, n52), r42 === R2 && (r42 = this._$AH[n52]), o42 ||= !st(r42) || r42 !== this._$AH[n52], r42 === D ? t22 = D : t22 !== D && (t22 += (r42 ?? "") + h42[n52 + 1]), this._$AH[n52] = r42;
    }
    o42 && !e42 && this.j(t22);
  }
  j(t22) {
    t22 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t22 ?? "");
  }
};
var Y = class extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t22) {
    this.element[this.name] = t22 === D ? void 0 : t22;
  }
};
var Z2 = class extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t22) {
    this.element.toggleAttribute(this.name, !!t22 && t22 !== D);
  }
};
var q = class extends G {
  constructor(t22, i32, s22, e42, h42) {
    super(t22, i32, s22, e42, h42), this.type = 5;
  }
  _$AI(t22, i32 = this) {
    if ((t22 = z2(this, t22, i32, 0) ?? D) === R2) return;
    const s22 = this._$AH, e42 = t22 === D && s22 !== D || t22.capture !== s22.capture || t22.once !== s22.once || t22.passive !== s22.passive, h42 = t22 !== D && (s22 === D || e42);
    e42 && this.element.removeEventListener(this.name, this, s22), h42 && this.element.addEventListener(this.name, this, t22), this._$AH = t22;
  }
  handleEvent(t22) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t22) : this._$AH.handleEvent(t22);
  }
};
var K = class {
  constructor(t22, i32, s22) {
    this.element = t22, this.type = 6, this._$AN = void 0, this._$AM = i32, this.options = s22;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t22) {
    z2(this, t22);
  }
};
var Re = n32.litHtmlPolyfillSupport;
Re?.(B2, et), (n32.litHtmlVersions ??= []).push("3.2.0");
var Q = (t22, i32, s22) => {
  const e42 = s22?.renderBefore ?? i32;
  let h42 = e42._$litPart$;
  if (void 0 === h42) {
    const t32 = s22?.renderBefore ?? null;
    e42._$litPart$ = h42 = new et(i32.insertBefore(lt(), t32), t32, void 0, s22 ?? {});
  }
  return h42._$AI(t22), h42;
};
var h32 = class extends b3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    const t22 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t22.firstChild, t22;
  }
  update(t22) {
    const e42 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t22), this.o = Q(e42, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(false);
  }
  render() {
    return R2;
  }
};
h32._$litElement$ = true, h32["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: h32 });
var f32 = globalThis.litElementPolyfillSupport;
f32?.({ LitElement: h32 });
(globalThis.litElementVersions ??= []).push("4.1.0");
var o32 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
var r32 = (t22 = o32, e42, r42) => {
  const { kind: n52, metadata: i32 } = r42;
  let s22 = globalThis.litPropertyMetadata.get(i32);
  if (void 0 === s22 && globalThis.litPropertyMetadata.set(i32, s22 = /* @__PURE__ */ new Map()), s22.set(r42.name, t22), "accessor" === n52) {
    const { name: o42 } = r42;
    return { set(r52) {
      const n62 = e42.get.call(this);
      e42.set.call(this, r52), this.requestUpdate(o42, n62, t22);
    }, init(e52) {
      return void 0 !== e52 && this.P(o42, void 0, t22), e52;
    } };
  }
  if ("setter" === n52) {
    const { name: o42 } = r42;
    return function(r52) {
      const n62 = this[o42];
      e42.call(this, r52), this.requestUpdate(o42, n62, t22);
    };
  }
  throw Error("Unsupported decorator location: " + n52);
};
function n42(t22) {
  return (e42, o42) => "object" == typeof o42 ? r32(t22, e42, o42) : ((t32, e52, o52) => {
    const r42 = e52.hasOwnProperty(o52);
    return e52.constructor.createProperty(o52, r42 ? { ...t32, wrapped: true } : t32), r42 ? Object.getOwnPropertyDescriptor(e52, o52) : void 0;
  })(t22, e42, o42);
}
var appliedClassMixins = /* @__PURE__ */ new WeakMap();
function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;
  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }
    klass = Object.getPrototypeOf(klass);
  }
  return false;
}
function dedupeMixin(mixin) {
  return (superClass) => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}
var version = "3.0.0";
var versions = window.scopedElementsVersions || (window.scopedElementsVersions = []);
if (!versions.includes(version)) {
  versions.push(version);
}
var ScopedElementsMixinImplementation = (superclass) => (
  /** @type {ScopedElementsHost} */
  class ScopedElementsHost extends superclass {
    /**
     * Obtains the scoped elements definitions map if specified.
     *
     * @type {ScopedElementsMap=}
     */
    static scopedElements;
    static get scopedElementsVersion() {
      return version;
    }
    /** @type {CustomElementRegistry=} */
    static __registry;
    /**
     * Obtains the CustomElementRegistry associated to the ShadowRoot.
     *
     * @returns {CustomElementRegistry=}
     */
    get registry() {
      return (
        /** @type {typeof ScopedElementsHost} */
        this.constructor.__registry
      );
    }
    /**
     * Set the CustomElementRegistry associated to the ShadowRoot
     *
     * @param {CustomElementRegistry} registry
     */
    set registry(registry2) {
      this.constructor.__registry = registry2;
    }
    /**
     * @param {ShadowRootInit} options
     * @returns {ShadowRoot}
     */
    attachShadow(options) {
      const { scopedElements } = (
        /** @type {typeof ScopedElementsHost} */
        this.constructor
      );
      const shouldCreateRegistry = !this.registry || // @ts-ignore
      this.registry === this.constructor.__registry && !Object.prototype.hasOwnProperty.call(this.constructor, "__registry");
      if (shouldCreateRegistry) {
        this.registry = new CustomElementRegistry();
        for (const [tagName, klass] of Object.entries(scopedElements ?? {})) {
          this.registry.define(tagName, klass);
        }
      }
      return super.attachShadow({
        ...options,
        // The polyfill currently expects the registry to be passed as `customElements`
        customElements: this.registry,
        // But the proposal has moved forward, and renamed it to `registry`
        // For backwards compatibility, we pass it as both
        registry: this.registry
      });
    }
  }
);
var ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);
var ScopedElementsMixinImplementation2 = (superclass) => (
  /** @type {ScopedElementsHost} */
  class ScopedElementsHost extends ScopedElementsMixin(superclass) {
    createRenderRoot() {
      const { shadowRootOptions, elementStyles } = (
        /** @type {TypeofLitElement} */
        this.constructor
      );
      const shadowRoot = this.attachShadow(shadowRootOptions);
      this.renderOptions.creationScope = shadowRoot;
      S3(shadowRoot, elementStyles);
      this.renderOptions.renderBefore ??= shadowRoot.firstChild;
      return shadowRoot;
    }
  }
);
var ScopedElementsMixin2 = dedupeMixin(ScopedElementsMixinImplementation2);
var _lang_dec;
var _contentEditable_dec;
var _a;
var _init;
var _contentEditable;
var _lang;
var LitElementWw = class extends (_a = ScopedElementsMixin2(h32), _contentEditable_dec = [n42({ type: String, attribute: true, reflect: true })], _lang_dec = [n42({ type: String, attribute: true, reflect: true })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers2(_init, 5, this);
    __publicField2(this, "options");
    __publicField2(this, "actions", {});
    __publicField2(this, "localize");
    __privateAdd2(this, _contentEditable, __runInitializers2(_init, 8, this)), __runInitializers2(_init, 11, this);
    __privateAdd2(this, _lang, "");
    __publicField2(this, "_inTransaction", false);
  }
  get lang() {
    return (__privateGet2(this, _lang) || this.parentElement?.closest("[lang]")?.lang) ?? "";
  }
  set lang(value) {
    __privateSet2(this, _lang, value);
    this.localize.setLocale(value).finally(() => this.requestUpdate("lang"));
  }
  connectedCallback() {
    super.connectedCallback();
    this.localize.setLocale(this.lang).finally(() => this.requestUpdate());
    this.getAttributeNames().forEach((k22) => this.setAttribute(k22, this.getAttribute(k22)));
  }
};
_init = __decoratorStart2(_a);
_contentEditable = /* @__PURE__ */ new WeakMap();
_lang = /* @__PURE__ */ new WeakMap();
__decorateElement2(_init, 4, "contentEditable", _contentEditable_dec, LitElementWw, _contentEditable);
__decorateElement2(_init, 3, "lang", _lang_dec, LitElementWw);
__decoratorMetadata2(_init, LitElementWw);
__publicField2(LitElementWw, "shadowRootOptions", { ...h32.shadowRootOptions });
__publicField2(LitElementWw, "scopedElements", {});
__publicField2(LitElementWw, "options", {});
__publicField2(LitElementWw, "actions", {});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t4 = (t7) => (e12, o10) => {
  void 0 !== o10 ? o10.addInitializer(() => {
    customElements.define(t7, e12);
  }) : customElements.define(t7, e12);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r6 = (t7 = o5, e12, r10) => {
  const { kind: n9, metadata: i8 } = r10;
  let s5 = globalThis.litPropertyMetadata.get(i8);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i8, s5 = /* @__PURE__ */ new Map()), s5.set(r10.name, t7), "accessor" === n9) {
    const { name: o10 } = r10;
    return { set(r11) {
      const n10 = e12.get.call(this);
      e12.set.call(this, r11), this.requestUpdate(o10, n10, t7);
    }, init(e13) {
      return void 0 !== e13 && this.P(o10, void 0, t7), e13;
    } };
  }
  if ("setter" === n9) {
    const { name: o10 } = r10;
    return function(r11) {
      const n10 = this[o10];
      e12.call(this, r11), this.requestUpdate(o10, n10, t7);
    };
  }
  throw Error("Unsupported decorator location: " + n9);
};
function n5(t7) {
  return (e12, o10) => "object" == typeof o10 ? r6(t7, e12, o10) : ((t8, e13, o11) => {
    const r10 = e13.hasOwnProperty(o11);
    return e13.constructor.createProperty(o11, r10 ? { ...t8, wrapped: true } : t8), r10 ? Object.getOwnPropertyDescriptor(e13, o11) : void 0;
  })(t7, e12, o10);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r7(r10) {
  return n5({ ...r10, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e5 = (e12, t7, c7) => (c7.configurable = true, c7.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e12, t7, c7), c7);

// node_modules/@lit/reactive-element/decorators/query.js
function e6(e12, r10) {
  return (n9, s5, i8) => {
    const o10 = (t7) => t7.renderRoot?.querySelector(e12) ?? null;
    if (r10) {
      const { get: e13, set: r11 } = "object" == typeof s5 ? n9 : i8 ?? (() => {
        const t7 = Symbol();
        return { get() {
          return this[t7];
        }, set(e14) {
          this[t7] = e14;
        } };
      })();
      return e5(n9, s5, { get() {
        let t7 = e13.call(this);
        return void 0 === t7 && (t7 = o10(this), (null !== t7 || this.hasUpdated) && r11.call(this, t7)), t7;
      } });
    }
    return e5(n9, s5, { get() {
      return o10(this);
    } });
  };
}

// widgets/src/helper/line-helper.ts
function getConnectorCoordinates(svgCanvas, connector, zoom) {
  const connectorRect = connector?.getBoundingClientRect();
  const offsetX = connector?.getBoundingClientRect().width / 2;
  const offsetY = connector?.getBoundingClientRect().height / 2;
  const x3 = (connectorRect?.left - svgCanvas?.getBoundingClientRect()?.left + offsetX - 9 * zoom) / zoom;
  const y4 = (connectorRect?.top - svgCanvas?.getBoundingClientRect()?.top + offsetY - 9 * zoom) / zoom;
  return { x: x3, y: y4 };
}
function getMouseCoordinates(svgCanvas, mouseX, mouseY, zoom) {
  const workspaceX = svgCanvas.getBoundingClientRect().left;
  const workspaceY = svgCanvas.getBoundingClientRect().top;
  const relativeX = mouseX - workspaceX;
  const relativeY = mouseY - workspaceY;
  const scaledRelativeX = relativeX / zoom;
  const scaledRelativeY = relativeY / zoom;
  return { x: scaledRelativeX, y: scaledRelativeY };
}
function calculatePath(svgCanvas, startCon, endCon, zoom) {
  let startConnector;
  let endConnector;
  if (startCon.type === "input" && endCon.type === "output") {
    startConnector = endCon;
    endConnector = startCon;
  } else if (startCon.type === "output" && endCon.type === "input") {
    startConnector = startCon;
    endConnector = endCon;
  } else {
    return;
  }
  const points = [];
  const padding = 15;
  const offsetX = 5;
  const start = {
    x: getConnectorCoordinates(svgCanvas, startConnector, zoom).x,
    y: getConnectorCoordinates(svgCanvas, startConnector, zoom).y,
    type: startConnector?.id?.substring(startConnector.id.length - 3)
  };
  const end = {
    x: getConnectorCoordinates(svgCanvas, endConnector, zoom).x,
    y: getConnectorCoordinates(svgCanvas, endConnector, zoom).y,
    type: endConnector?.id?.substring(endConnector.id.length - 3)
  };
  points.push({ x: start.x, y: start.y });
  const isAbove = end.y < start.y;
  const isLeft = end.x < start.x + offsetX + padding;
  if (isLeft) {
    if (start.type === "Out" || start.type === "ut2" || start.type === "ut3") {
      points.push({ x: start.x + padding, y: start.y });
      if (end.type === "In1" || end.type === "In2") {
        points.push({ x: start.x + padding, y: (start.y + end.y) / 2 });
        points.push({ x: end.x - padding, y: (start.y + end.y) / 2 });
        points.push({ x: end.x - padding, y: end.y });
      }
    }
  } else {
    if (start.type === "Out" || start.type === "ut2" || start.type === "ut3") {
      if (isAbove) {
        points.push({ x: start.x + padding - offsetX, y: start.y });
        if (end.type === "In1") {
          points.pop();
          points.push({ x: (start.x + end.x) / 2 - offsetX, y: start.y });
          points.push({ x: (start.x + end.x) / 2 - offsetX, y: end.y });
        } else if (end.type === "In2") {
          points.pop();
          points.push({ x: (start.x + end.x) / 2 + offsetX, y: start.y });
          points.push({ x: (start.x + end.x) / 2 + offsetX, y: end.y });
        }
      } else {
        points.push({ x: start.x + padding + offsetX, y: start.y });
        if (end.type === "In1") {
          points.pop();
          points.push({ x: (start.x + end.x) / 2 + offsetX, y: start.y });
          points.push({ x: (start.x + end.x) / 2 + offsetX, y: end.y });
        } else if (end.type === "In2") {
          points.pop();
          points.push({ x: (start.x + end.x) / 2 - offsetX, y: start.y });
          points.push({ x: (start.x + end.x) / 2 - offsetX, y: end.y });
        }
      }
    }
  }
  points.push({ x: end.x, y: end.y });
  return points;
}
function calculatePathToMouse(svgCanvas, connector, zoom, mouseX, mouseY, x1 = -9, y1 = -9, x22 = -9, y22 = -9) {
  let start;
  let end;
  if (connector.type === "input") {
    start = {
      x: mouseX,
      y: mouseY,
      type: "Out"
    };
    end = {
      x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
      y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
      type: connector?.id?.substring(connector.id.length - 3)
    };
  } else if (connector.type === "output") {
    start = {
      x: getConnectorCoordinates(svgCanvas, connector, zoom).x,
      y: getConnectorCoordinates(svgCanvas, connector, zoom).y,
      type: connector?.id?.substring(connector.id.length - 3)
    };
    end = {
      x: mouseX,
      y: mouseY,
      type: "In1"
    };
  } else {
    return;
  }
  const points = [];
  const padding = 15;
  points.push({ x: start.x, y: start.y });
  const isLeft = end.x < start.x;
  if (start.type === "Out" || start.type === "ut2" || start.type === "ut3") {
    points.push({ x: start.x + padding, y: start.y });
    if (end.type === "In1" || end.type === "In2") {
      if (start.y === end.y && isLeft) {
        points.push({ x: start.x + padding, y: start.y + padding });
        points.push({ x: end.x - padding, y: start.y + padding });
        points.push({ x: end.x - padding, y: end.y });
      } else if (isLeft) {
        points.push({ x: start.x + padding, y: (start.y + end.y) / 2 });
        points.push({ x: end.x - padding, y: (start.y + end.y) / 2 });
        points.push({ x: end.x - padding, y: end.y });
      } else {
        points.pop();
        points.push({ x: (start.x + end.x) / 2, y: start.y });
        points.push({ x: (start.x + end.x) / 2, y: end.y });
      }
    }
  }
  points.push({ x: end.x, y: end.y });
  return points;
}
function updateLines(widget, movedGate) {
  const moveLines = [];
  widget.lineElements.forEach((lineObject) => {
    const startConnector = lineObject.start;
    const endConnector = lineObject.end;
    if (startConnector.id === movedGate.conIn1?.id || startConnector.id === movedGate.conIn2?.id || startConnector.id === movedGate.conOut?.id || startConnector.id === movedGate.conOut2?.id || endConnector.id === movedGate.conIn1?.id || endConnector.id === movedGate.conIn2?.id || endConnector.id === movedGate.conOut?.id || endConnector.id === movedGate.conOut2?.id) {
      moveLines.push(lineObject);
    }
  });
  moveLines.forEach((line) => {
    const startConnector = line.start;
    const endConnector = line.end;
    const svgPath = line.lineSVG;
    const points = calculatePath(widget.svgCanvas, startConnector, endConnector, widget.zoom);
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i8 = 1; i8 < points.length; i8++) {
      path += ` L ${points[i8].x} ${points[i8].y}`;
    }
    svgPath.setAttribute("d", path);
  });
}
function createLine(widget, startCon, endCon) {
  let startConnector;
  let endConnector;
  if (startCon.type === "input" && endCon.type === "output") {
    startConnector = endCon;
    endConnector = startCon;
  } else if (startCon.type === "output" && endCon.type === "input") {
    startConnector = startCon;
    endConnector = endCon;
  } else {
    return;
  }
  const points = calculatePath(widget.svgCanvas, startCon, endCon, widget.zoom);
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i8 = 1; i8 < points.length; i8++) {
    path += ` L ${points[i8].x} ${points[i8].y}`;
  }
  const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svgPath.setAttribute("d", path);
  svgPath.setAttribute("id", "line" + widget.lineID);
  svgPath.classList.add("svgLine");
  widget.lineID++;
  const lineObject = {
    start: startConnector,
    end: endConnector,
    lineSVG: svgPath
  };
  widget.lineElements = [...widget.lineElements, lineObject];
  svgPath.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const deletePathID = svgPath.getAttribute("id");
    widget.lineElements.forEach((line, index) => {
      if (line.lineSVG.id === deletePathID) {
        const deletePath = svgPath;
        deletePath.remove();
        widget.lineElements.splice(index, 1);
      }
    });
  });
  widget.svgCanvas.appendChild(svgPath);
  console.log(widget.lineElements);
  let entry = startCon.id + "|" + endCon.id;
  console.log(entry);
  if (!widget.reflectCons.includes(entry)) {
    widget.reflectCons += widget.reflectCons != "" ? "," : "";
    widget.reflectCons += entry;
  }
}
function updateLineColor(widget) {
  const lineElements = widget.getLineElements();
  let svgPath;
  lineElements.forEach((line) => {
    svgPath = line.lineSVG;
    if (line.start.value === true || line.end.value === true) {
      svgPath.classList.add("svgLineTrue");
    } else {
      svgPath.classList.remove("svgLineTrue");
    }
  });
}
function resetLines(widget) {
  widget.lineElements.forEach((line) => {
    line.lineSVG.classList.remove("svgLineTrue");
  });
}

// widgets/src/helper/gate-helper.ts
function addGate(widget, event, load) {
  const gateType = load != void 0 ? load[0] : event.dataTransfer.getData("type");
  let newGate;
  if (gateType !== "INPUT" && gateType !== "OUTPUT" && gateType !== "SPLITTER") {
    if (!checkIfGateAllowed(widget, gateType)) {
      return;
    }
  }
  switch (gateType) {
    case "NOT":
      newGate = widget.shadowRoot.createElement("not-gate");
      newGate.id = "notGate" + widget.gateID;
      break;
    case "AND":
      newGate = widget.shadowRoot.createElement("and-gate");
      newGate.id = "andGate" + widget.gateID;
      break;
    case "OR":
      newGate = widget.shadowRoot.createElement("or-gate");
      newGate.id = "orGate" + widget.gateID;
      break;
    case "NAND":
      newGate = widget.shadowRoot.createElement("nand-gate");
      newGate.id = "nandGate" + widget.gateID;
      break;
    case "NOR":
      newGate = widget.shadowRoot.createElement("nor-gate");
      newGate.id = "norGate" + widget.gateID;
      break;
    case "XNOR":
      newGate = widget.shadowRoot.createElement("xnor-gate");
      newGate.id = "xnorGate" + widget.gateID;
      break;
    case "XOR":
      newGate = widget.shadowRoot.createElement("xor-gate");
      newGate.id = "xorGate" + widget.gateID;
      break;
    case "INPUT":
      newGate = widget.shadowRoot.createElement("input-gate");
      newGate.id = "inputGate" + widget.gateID;
      newGate.input1 = false;
      break;
    case "OUTPUT":
      newGate = widget.shadowRoot.createElement("output-gate");
      newGate.id = "outputGate" + widget.gateID;
      break;
    case "SPLITTER":
      newGate = widget.shadowRoot.createElement("splitter-gate");
      newGate.id = "splitterGate" + widget.gateID;
      break;
  }
  newGate.style.position = "absolute";
  if (load == void 0) {
    var grabPosX = parseFloat(event.dataTransfer.getData("offsetX"));
    var grabPosY = parseFloat(event.dataTransfer.getData("offsetY"));
    var mouseX = event.clientX;
    var mouseY = event.clientY;
  }
  const offsetX = widget.wsDrag.getBoundingClientRect().left;
  const workspaceX = widget.wsDrag.getBoundingClientRect().left;
  const workspaceY = widget.wsDrag.getBoundingClientRect().top;
  const relativeX = mouseX - workspaceX;
  const relativeY = mouseY - workspaceY;
  const scaledRelativeX = relativeX / widget.zoom;
  const scaledRelativeY = relativeY / widget.zoom;
  newGate.style.left = load != void 0 ? load[1] : scaledRelativeX - grabPosX + "px";
  newGate.style.top = load != void 0 ? load[2] : scaledRelativeY - grabPosY + "px";
  widget.gateID++;
  newGate.movable = true;
  newGate.widget = widget;
  widget.wsDrag.appendChild(newGate);
  widget.gateElements = [...widget.gateElements, newGate];
  if (load == void 0) {
    widget.reflectGates += widget.reflectGates != "" ? "," : "";
    widget.reflectGates += widget.gateID - 1 + "|" + gateType + "|" + newGate.style.left + "|" + newGate.style.top;
  }
}
function moveGate(widget, event) {
  const id = event.dataTransfer.getData("id");
  const draggedGate = widget.gateElements.find((gate) => gate.id === id);
  const grabPosX = parseFloat(event.dataTransfer.getData("offsetX")) / widget.zoom;
  const grabPosY = parseFloat(event.dataTransfer.getData("offsetY")) / widget.zoom;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const workspaceX = widget.wsDrag.getBoundingClientRect().left;
  const workspaceY = widget.wsDrag.getBoundingClientRect().top;
  const relativeX = mouseX - workspaceX;
  const relativeY = mouseY - workspaceY;
  const scaledRelativeX = relativeX / widget.zoom;
  const scaledRelativeY = relativeY / widget.zoom;
  draggedGate.style.left = scaledRelativeX - grabPosX + "px";
  draggedGate.style.top = scaledRelativeY - grabPosY + "px";
  updateLines(widget, draggedGate);
  let gatesArr = widget.reflectGates.split(",");
  for (let i8 = 0; i8 < gatesArr.length; i8++) {
    if (Number.parseInt(gatesArr[i8][0]) === Number.parseInt(id.match(/^([a-zA-Z]+)(\d+)$/)[2])) {
      let arr = gatesArr[i8].split("|");
      arr[2] = draggedGate.style.left;
      arr[3] = draggedGate.style.top;
      gatesArr[i8] = arr.toString().replaceAll(",", "|");
    }
  }
  ;
  widget.reflectGates = gatesArr.toString();
}
function transferOutputToNextGate(widget, gate) {
  const nextLineArray = widget.lineElements.filter(
    (lineObject) => lineObject.start.id === gate.conOut?.id || lineObject.end.id === gate.conOut?.id || lineObject.start.id === gate.conOut2?.id || lineObject.end.id === gate.conOut2?.id
  );
  nextLineArray?.forEach((nextLine) => {
    let nextConnector;
    if (nextLine) {
      if (nextLine?.start.id === gate.conOut?.id || nextLine?.start.id === gate.conOut2?.id) {
        nextConnector = nextLine.end;
      } else if (nextLine?.end.id === gate.conOut?.id || nextLine?.end.id === gate.conOut2?.id) {
        nextConnector = nextLine.start;
      }
    }
    if (nextConnector) {
      const nextGate = widget.gateElements.find(
        (gate2) => gate2.conIn1?.id === nextConnector.id || gate2.conIn2?.id === nextConnector.id
      );
      if (nextGate.conIn1.id === nextConnector.id) {
        nextGate.input1 = gate.output;
      } else if (nextGate.conIn2.id === nextConnector.id) {
        nextGate.input2 = gate.output;
      }
    }
  });
}
function checkIfGateAllowed(widget, gateType) {
  const gatesOfSameType = widget.gateElements.filter((gate) => gate.gatetype === gateType);
  switch (gateType) {
    case "NOT":
      if (widget.notGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.notGateAllowed) {
        return true;
      }
      break;
    case "AND":
      if (widget.andGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.andGateAllowed) {
        return true;
      }
      break;
    case "OR":
      if (widget.orGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.orGateAllowed) {
        return true;
      }
      break;
    case "NAND":
      if (widget.nandGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.nandGateAllowed) {
        return true;
      }
      break;
    case "NOR":
      if (widget.norGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.norGateAllowed) {
        return true;
      }
      break;
    case "XNOR":
      if (widget.xnorGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.xnorGateAllowed) {
        return true;
      }
      break;
    case "XOR":
      if (widget.xorGateAllowed < 0) {
        return true;
      }
      if (gatesOfSameType.length < widget.xorGateAllowed) {
        return true;
      }
      break;
    default:
      break;
  }
  return false;
}
function gateCounter(widget, gateType) {
  const gatesOfSameType = widget.gateElements.filter((gate) => gate.gatetype === gateType);
  switch (gateType) {
    case "NOT":
      if (widget.notGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.notGateAllowed;
      break;
    case "AND":
      if (widget.andGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.andGateAllowed;
      break;
    case "OR":
      if (widget.orGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.orGateAllowed;
      break;
    case "NAND":
      if (widget.nandGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.nandGateAllowed;
      break;
    case "NOR":
      if (widget.norGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.norGateAllowed;
      break;
    case "XNOR":
      if (widget.xnorGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.xnorGateAllowed;
      break;
    case "XOR":
      if (widget.xorGateAllowed === -1) {
        return;
      }
      return gatesOfSameType.length + "/" + widget.xorGateAllowed;
      break;
    default:
      break;
  }
}
function isDropOverTrashIcon(widget, event) {
  const trashCanRect = widget.workspaceContainer.querySelector(".trashCanIcon").getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  return mouseX >= trashCanRect.left && mouseX <= trashCanRect.right && mouseY >= trashCanRect.top && mouseY <= trashCanRect.bottom;
}
function resetGates(widget) {
  widget.gateElements.forEach((gate) => {
    if (gate.gatetype !== "INPUT") {
      gate.output = void 0;
      gate.output2 = void 0;
      gate.input1 = void 0;
      gate.input2 = void 0;
    }
    if (gate.gatetype === "OUTPUT") {
      gate.input1 = false;
      gate.output = false;
    }
    gate.resetConnectorColor();
    gate.classList.remove("gateTrue");
  });
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FW7UWQXB.js
var tooltip_styles_default = i`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3KSWVBQ5.js
var popup_styles_default = i`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var translations = /* @__PURE__ */ new Map();
var fallback;
var documentDirection = "ltr";
var documentLanguage = "en";
var isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });
}
function registerTranslation(...translation2) {
  translation2.map((t7) => {
    const code = t7.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t7));
    } else {
      translations.set(code, t7);
    }
    if (!fallback) {
      fallback = t7;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a5, _b;
    const locale = new Intl.Locale(lang.replace(/_/g, "-"));
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a5 = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a5 === void 0 ? void 0 : _a5.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return { locale, language, region, primary, secondary };
  }
  exists(key, options) {
    var _a5;
    const { primary, secondary } = this.getTranslationData((_a5 = options.lang) !== null && _a5 !== void 0 ? _a5 : this.lang());
    options = Object.assign({ includeFallback: false }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (num) => {
    if (num === 0) return "No options selected";
    if (num === 1) return "1 option selected";
    return `${num} options selected`;
  },
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);
var en_default = translation;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js
var LocalizeController2 = class extends LocalizeController {
};
registerTranslation(en_default);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
var component_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js
var __defProp3 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError3 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a5, b4) => {
  for (var prop in b4 || (b4 = {}))
    if (__hasOwnProp.call(b4, prop))
      __defNormalProp3(a5, prop, b4[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b4)) {
      if (__propIsEnum.call(b4, prop))
        __defNormalProp3(a5, prop, b4[prop]);
    }
  return a5;
};
var __spreadProps = (a5, b4) => __defProps(a5, __getOwnPropDescs(b4));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
    if (decorator = decorators[i8])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp3(target, key, result);
  return result;
};
var __accessCheck3 = (obj, member, msg) => member.has(obj) || __typeError3("Cannot " + msg);
var __privateGet3 = (obj, member, getter) => (__accessCheck3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd3 = (obj, member, value) => member.has(obj) ? __typeError3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet3 = (obj, member, value, setter) => (__accessCheck3(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.PFOQ5QRR.js
var _hasRecordedInitialProperties;
var ShoelaceElement = class extends r4 {
  constructor() {
    super();
    __privateAdd3(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
      this.constructor.define(name, component);
    });
  }
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
  /* eslint-enable */
  static define(name, elementConstructor = this, options = {}) {
    const currentlyRegisteredConstructor = customElements.get(name);
    if (!currentlyRegisteredConstructor) {
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {
        }, options);
      }
      return;
    }
    let newVersion = " (unknown version)";
    let existingVersion = newVersion;
    if ("version" in elementConstructor && elementConstructor.version) {
      newVersion = " v" + elementConstructor.version;
    }
    if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
      existingVersion = " v" + currentlyRegisteredConstructor.version;
    }
    if (newVersion && existingVersion && newVersion === existingVersion) {
      return;
    }
    console.warn(
      `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
    );
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet3(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet3(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
};
_hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
ShoelaceElement.version = "2.20.0";
ShoelaceElement.dependencies = {};
__decorateClass([
  n5()
], ShoelaceElement.prototype, "dir", 2);
__decorateClass([
  n5()
], ShoelaceElement.prototype, "lang", 2);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v3) => ({
  x: v3,
  y: v3
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x3,
    y: y4,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y4,
    left: x3,
    right: x3 + width,
    bottom: y4 + height,
    x: x3,
    y: y4
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x3,
    y: y4
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i8 = 0; i8 < validMiddleware.length; i8++) {
    const {
      name,
      fn
    } = validMiddleware[i8];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x3,
      y: y4,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x3 = nextX != null ? nextX : x3;
    y4 = nextY != null ? nextY : y4;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x3,
          y: y4
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i8 = -1;
    }
  }
  return {
    x: x3,
    y: y4,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state2, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x3,
    y: y4,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state2;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state2);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x3,
    y: y4,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state2) {
    const {
      x: x3,
      y: y4,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state2;
    const {
      element,
      padding = 0
    } = evaluate(options, state2) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x3,
      y: y4
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state2) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state2);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d4) => d4.overflows[0] <= 0).sort((a5, b4) => a5.overflows[1] - b4.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d4) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d4.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d4) => [d4.placement, d4.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a5, b4) => a5[1] - b4[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state2, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state2);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state2) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x3,
        y: y4,
        placement,
        middlewareData
      } = state2;
      const diffCoords = await convertValueToCoords(state2, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x3 + diffCoords.x,
        y: y4 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state2) {
      const {
        x: x3,
        y: y4,
        placement
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x4,
              y: y5
            } = _ref;
            return {
              x: x4,
              y: y5
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state2);
      const coords = {
        x: x3,
        y: y4
      };
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state2,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x3,
          y: limitedCoords.y - y4,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state2) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state2;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state2);
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state2.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state2.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state2.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state2,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e12) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css2 = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css2[value] ? css2[value] !== "none" : false) || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css2 = getComputedStyle2(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $4
  } = getCssDimensions(domElement);
  let x3 = ($4 ? round(rect.width) : rect.width) / width;
  let y4 = ($4 ? round(rect.height) : rect.height) / height;
  if (!x3 || !Number.isFinite(x3)) {
    x3 = 1;
  }
  if (!y4 || !Number.isFinite(y4)) {
    y4 = 1;
  }
  return {
    x: x3,
    y: y4
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x3 = (clientRect.left + visualOffsets.x) / scale.x;
  let y4 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x3 *= iframeScale.x;
      y4 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x3 += left;
      y4 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x3,
    y: y4
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x3 = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y4 = htmlRect.top + scroll.scrollTop;
  return {
    x: x3,
    y: y4
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x3 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y4 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x3 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x3 = 0;
  let y4 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x3 = visualViewport.offsetLeft;
      y4 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x3 = left * scale.x;
  const y4 = top * scale.y;
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x3 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y4 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x3,
    y: y4,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a5, b4) {
  return a5.x === b4.x && a5.y === b4.y && a5.width === b4.width && a5.height === b4.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e12) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update2, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update2, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update2);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update2();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update2();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update2();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update2);
      ancestorResize && ancestor.removeEventListener("resize", update2);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/lit-html/directive.js
var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t7) => (...e12) => ({ _$litDirective$: t7, values: e12 });
var i5 = class {
  constructor(t7) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t7, e12, i8) {
    this._$Ct = t7, this._$AM = e12, this._$Ci = i8;
  }
  _$AS(t7, e12) {
    return this.update(t7, e12);
  }
  update(t7, e12) {
    return this.render(...e12);
  }
};

// node_modules/lit-html/directives/class-map.js
var e8 = e7(class extends i5 {
  constructor(t7) {
    if (super(t7), t7.type !== t5.ATTRIBUTE || "class" !== t7.name || t7.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return " " + Object.keys(t7).filter((s5) => t7[s5]).join(" ") + " ";
  }
  update(s5, [i8]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
      for (const t7 in i8) i8[t7] && !this.nt?.has(t7) && this.st.add(t7);
      return this.render(i8);
    }
    const r10 = s5.element.classList;
    for (const t7 of this.st) t7 in i8 || (r10.remove(t7), this.st.delete(t7));
    for (const t7 in i8) {
      const s6 = !!i8[t7];
      s6 === this.st.has(t7) || this.nt?.has(t7) || (s6 ? (r10.add(t7), this.st.add(t7)) : (r10.remove(t7), this.st.delete(t7)));
    }
    return T;
  }
});

// node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function e9(t7) {
  return i6(t7);
}
function r8(t7) {
  return t7.assignedSlot ? t7.assignedSlot : t7.parentNode instanceof ShadowRoot ? t7.parentNode.host : t7.parentNode;
}
function i6(e12) {
  for (let t7 = e12; t7; t7 = r8(t7)) if (t7 instanceof Element && "none" === getComputedStyle(t7).display) return null;
  for (let n9 = r8(e12); n9; n9 = r8(n9)) {
    if (!(n9 instanceof Element)) continue;
    const e13 = getComputedStyle(n9);
    if ("contents" !== e13.display) {
      if ("static" !== e13.position || isContainingBlock(e13)) return n9;
      if ("BODY" === n9.tagName) return n9;
    }
  }
  return null;
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R37ISJMH.js
function isVirtualElement(e12) {
  return e12 !== null && typeof e12 === "object" && "getBoundingClientRect" in e12 && ("contextElement" in e12 ? e12 instanceof Element : true);
}
var SlPopup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
    this.hoverBridge = false;
    this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl) {
        const anchorRect = this.anchorEl.getBoundingClientRect();
        const popupRect = this.popup.getBoundingClientRect();
        const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
        let topLeftX = 0;
        let topLeftY = 0;
        let topRightX = 0;
        let topRightY = 0;
        let bottomLeftX = 0;
        let bottomLeftY = 0;
        let bottomRightX = 0;
        let bottomRightY = 0;
        if (isVertical) {
          if (anchorRect.top < popupRect.top) {
            topLeftX = anchorRect.left;
            topLeftY = anchorRect.bottom;
            topRightX = anchorRect.right;
            topRightY = anchorRect.bottom;
            bottomLeftX = popupRect.left;
            bottomLeftY = popupRect.top;
            bottomRightX = popupRect.right;
            bottomRightY = popupRect.top;
          } else {
            topLeftX = popupRect.left;
            topLeftY = popupRect.bottom;
            topRightX = popupRect.right;
            topRightY = popupRect.bottom;
            bottomLeftX = anchorRect.left;
            bottomLeftY = anchorRect.top;
            bottomRightX = anchorRect.right;
            bottomRightY = anchorRect.top;
          }
        } else {
          if (anchorRect.left < popupRect.left) {
            topLeftX = anchorRect.right;
            topLeftY = anchorRect.top;
            topRightX = popupRect.left;
            topRightY = popupRect.top;
            bottomLeftX = anchorRect.right;
            bottomLeftY = anchorRect.bottom;
            bottomRightX = popupRect.left;
            bottomRightY = popupRect.bottom;
          } else {
            topLeftX = popupRect.right;
            topLeftY = popupRect.top;
            topRightX = anchorRect.left;
            topRightY = anchorRect.top;
            bottomLeftX = popupRect.right;
            bottomLeftY = popupRect.bottom;
            bottomRightX = anchorRect.left;
            bottomRightY = anchorRect.bottom;
          }
        }
        this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
        this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
        this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
        this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
        this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
        this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
        this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
        this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (this.anchorEl && this.active) {
      this.start();
    }
  }
  start() {
    if (!this.anchorEl || !this.active) {
      return;
    }
    this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      // The offset middleware goes first
      offset2({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        size2({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        flip2({
          boundary: this.flipBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        shift2({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        size2({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        arrow2({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    const getOffsetParent2 = this.strategy === "absolute" ? (element) => platform.getOffsetParent(element, e9) : platform.getOffsetParent;
    computePosition2(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy,
      platform: __spreadProps(__spreadValues({}, platform), {
        getOffsetParent: getOffsetParent2
      })
    }).then(({ x: x3, y: y4, middlewareData, placement }) => {
      const isRtl = this.localize.dir() === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x3}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    requestAnimationFrame(() => this.updateHoverBridge());
    this.emit("sl-reposition");
  }
  render() {
    return x`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e8({
      "popup-hover-bridge": true,
      "popup-hover-bridge--visible": this.hoverBridge && this.active
    })}
      ></span>

      <div
        part="popup"
        class=${e8({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? x`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = [component_styles_default, popup_styles_default];
__decorateClass([
  e6(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass([
  e6(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass([
  n5()
], SlPopup.prototype, "anchor", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass([
  n5({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass([
  n5({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass([
  n5({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass([
  n5({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass([
  n5({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  n5({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass([
  n5({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p4) => p4.trim()).filter((p4) => p4 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  n5({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass([
  n5({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  n5({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass([
  n5({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass([
  n5()
], SlPopup.prototype, "sync", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  n5({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
__decorateClass([
  n5({ attribute: "hover-bridge", type: Boolean })
], SlPopup.prototype, "hoverBridge", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = delay.toString().toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        animation.cancel();
        requestAnimationFrame(resolve);
      });
    })
  );
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property2) => {
        const key = property2;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.A6P554PO.js
var SlTooltip = class extends ShoelaceElement {
  constructor() {
    super();
    this.localize = new LocalizeController2(this);
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
    this.handleBlur = () => {
      if (this.hasTrigger("focus")) {
        this.hide();
      }
    };
    this.handleClick = () => {
      if (this.hasTrigger("click")) {
        if (this.open) {
          this.hide();
        } else {
          this.show();
        }
      }
    };
    this.handleFocus = () => {
      if (this.hasTrigger("focus")) {
        this.show();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        this.hide();
      }
    };
    this.handleMouseOver = () => {
      if (this.hasTrigger("hover")) {
        const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.show(), delay);
      }
    };
    this.handleMouseOut = () => {
      if (this.hasTrigger("hover")) {
        const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
      }
    };
    this.addEventListener("blur", this.handleBlur, true);
    this.addEventListener("focus", this.handleFocus, true);
    this.addEventListener("click", this.handleClick);
    this.addEventListener("mouseover", this.handleMouseOver);
    this.addEventListener("mouseout", this.handleMouseOut);
  }
  disconnectedCallback() {
    var _a5;
    super.disconnectedCallback();
    (_a5 = this.closeWatcher) == null ? void 0 : _a5.destroy();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  async handleOpenChange() {
    var _a5, _b;
    if (this.open) {
      if (this.disabled) {
        return;
      }
      this.emit("sl-show");
      if ("CloseWatcher" in window) {
        (_a5 = this.closeWatcher) == null ? void 0 : _a5.destroy();
        this.closeWatcher = new CloseWatcher();
        this.closeWatcher.onclose = () => {
          this.hide();
        };
      } else {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
      }
      await stopAnimations(this.body);
      this.body.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.reposition();
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      (_b = this.closeWatcher) == null ? void 0 : _b.destroy();
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      await stopAnimations(this.body);
      const { keyframes, options } = getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.active = false;
      this.body.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  //
  // NOTE: Tooltip is a bit unique in that we're using aria-live instead of aria-labelledby to trick screen readers into
  // announcing the content. It works really well, but it violates an accessibility rule. We're also adding the
  // aria-describedby attribute to a slot, which is required by <sl-popup> to correctly locate the first assigned
  // element, otherwise positioning is incorrect.
  //
  render() {
    return x`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e8({
      tooltip: true,
      "tooltip--open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open ? "polite" : "off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `;
  }
};
SlTooltip.styles = [component_styles_default, tooltip_styles_default];
SlTooltip.dependencies = { "sl-popup": SlPopup };
__decorateClass([
  e6("slot:not([name])")
], SlTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  e6(".tooltip__body")
], SlTooltip.prototype, "body", 2);
__decorateClass([
  e6("sl-popup")
], SlTooltip.prototype, "popup", 2);
__decorateClass([
  n5()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  n5()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  n5({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  n5()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  n5({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch(["content", "distance", "hoist", "placement", "skidding"])
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: "ease" }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js
var spinner_styles_default = i`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MK453YAN.js
var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return x`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = [component_styles_default, spinner_styles_default];

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3RPBFEDE.js
var formCollections = /* @__PURE__ */ new WeakMap();
var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
var checkValidityOverloads = /* @__PURE__ */ new WeakMap();
var userInteractedControls = /* @__PURE__ */ new WeakSet();
var interactions = /* @__PURE__ */ new WeakMap();
var FormControlController = class {
  constructor(host, options) {
    this.handleFormData = (event) => {
      const disabled = this.options.disabled(this.host);
      const name = this.options.name(this.host);
      const value = this.options.value(this.host);
      const isButton = this.host.tagName.toLowerCase() === "sl-button";
      if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            event.formData.append(name, val.toString());
          });
        } else {
          event.formData.append(name, value.toString());
        }
      }
    };
    this.handleFormSubmit = (event) => {
      var _a5;
      const disabled = this.options.disabled(this.host);
      const reportValidity = this.options.reportValidity;
      if (this.form && !this.form.noValidate) {
        (_a5 = formCollections.get(this.form)) == null ? void 0 : _a5.forEach((control) => {
          this.setUserInteracted(control, true);
        });
      }
      if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    this.handleFormReset = () => {
      this.options.setValue(this.host, this.options.defaultValue(this.host));
      this.setUserInteracted(this.host, false);
      interactions.set(this.host, []);
    };
    this.handleInteraction = (event) => {
      const emittedEvents = interactions.get(this.host);
      if (!emittedEvents.includes(event.type)) {
        emittedEvents.push(event.type);
      }
      if (emittedEvents.length === this.options.assumeInteractionOn.length) {
        this.setUserInteracted(this.host, true);
      }
    };
    this.checkFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.checkValidity === "function") {
            if (!element.checkValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    this.reportFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.reportValidity === "function") {
            if (!element.reportValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    (this.host = host).addController(this);
    this.options = __spreadValues({
      form: (input) => {
        const formId = input.form;
        if (formId) {
          const root = input.getRootNode();
          const form = root.querySelector(`#${formId}`);
          if (form) {
            return form;
          }
        }
        return input.closest("form");
      },
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => {
        var _a5;
        return (_a5 = input.disabled) != null ? _a5 : false;
      },
      reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
      setValue: (input, value) => input.value = value,
      assumeInteractionOn: ["sl-input"]
    }, options);
  }
  hostConnected() {
    const form = this.options.form(this.host);
    if (form) {
      this.attachForm(form);
    }
    interactions.set(this.host, []);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.addEventListener(event, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm();
    interactions.delete(this.host);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.removeEventListener(event, this.handleInteraction);
    });
  }
  hostUpdated() {
    const form = this.options.form(this.host);
    if (!form) {
      this.detachForm();
    }
    if (form && this.form !== form) {
      this.detachForm();
      this.attachForm(form);
    }
    if (this.host.hasUpdated) {
      this.setValidity(this.host.validity.valid);
    }
  }
  attachForm(form) {
    if (form) {
      this.form = form;
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
      if (!checkValidityOverloads.has(this.form)) {
        checkValidityOverloads.set(this.form, this.form.checkValidity);
        this.form.checkValidity = () => this.checkFormValidity();
      }
    } else {
      this.form = void 0;
    }
  }
  detachForm() {
    if (!this.form) return;
    const formCollection = formCollections.get(this.form);
    if (!formCollection) {
      return;
    }
    formCollection.delete(this.host);
    if (formCollection.size <= 0) {
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
      if (checkValidityOverloads.has(this.form)) {
        this.form.checkValidity = checkValidityOverloads.get(this.form);
        checkValidityOverloads.delete(this.form);
      }
      this.form = void 0;
    }
  }
  setUserInteracted(el, hasInteracted) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }
    el.requestUpdate();
  }
  doAction(type, submitter) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if (submitter.hasAttribute(attr)) {
            button.setAttribute(attr, submitter.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    var _a5;
    return (_a5 = this.form) != null ? _a5 : null;
  }
  /** Resets the form, restoring all the control to their default value */
  reset(submitter) {
    this.doAction("reset", submitter);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(submitter) {
    this.doAction("submit", submitter);
  }
  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(isValid) {
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.has(host));
    const required = Boolean(host.required);
    host.toggleAttribute("data-required", required);
    host.toggleAttribute("data-optional", !required);
    host.toggleAttribute("data-invalid", !isValid);
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
    host.toggleAttribute("data-user-valid", isValid && hasInteracted);
  }
  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }
  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originalInvalidEvent) {
    const slInvalidEvent = new CustomEvent("sl-invalid", {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {}
    });
    if (!originalInvalidEvent) {
      slInvalidEvent.preventDefault();
    }
    if (!this.host.dispatchEvent(slInvalidEvent)) {
      originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
    }
  }
};
var validValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});
var valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  valueMissing: true
}));
var customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  customError: true
}));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js
var button_styles_default = i`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    this.handleSlotChange = (event) => {
      const slot = event.target;
      if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
        this.host.requestUpdate();
      }
    };
    (this.host = host).addController(this);
    this.slotNames = slotNames;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
};
function getTextContent(slot) {
  if (!slot) {
    return "";
  }
  const nodes = slot.assignedNodes({ flatten: true });
  let text = "";
  [...nodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s5) => {
        return /shoelace(\.min)?\.js($|\?)/.test(s5.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s5.src);
      });
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
var library = {
  name: "default",
  resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
};
var library_default_default = library;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js
var icon_styles_default = i`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// node_modules/lit-html/directive-helpers.js
var { I: t6 } = Z;
var e10 = (o10, t7) => void 0 === t7 ? void 0 !== o10?._$litType$ : o10?._$litType$ === t7;
var f4 = (o10) => void 0 === o10.strings;
var u4 = {};
var m3 = (o10, t7 = u4) => o10._$AH = t7;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4GJTAPTW.js
var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var SlIcon = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.initialRender = false;
    this.svg = null;
    this.label = "";
    this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(url, library2) {
    var _a5;
    let fileData;
    if (library2 == null ? void 0 : library2.spriteSheet) {
      this.svg = x`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
      return this.svg;
    }
    try {
      fileData = await fetch(url, { mode: "cors" });
      if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch (e12) {
      return RETRYABLE_ERROR;
    }
    try {
      const div = document.createElement("div");
      div.innerHTML = await fileData.text();
      const svg = div.firstElementChild;
      if (((_a5 = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a5.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
      if (!parser) parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");
      const svgEl = doc.body.querySelector("svg");
      if (!svgEl) return CACHEABLE_ERROR;
      svgEl.part.add("svg");
      return document.adoptNode(svgEl);
    } catch (e12) {
      return CACHEABLE_ERROR;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.initialRender = true;
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getIconSource() {
    const library2 = getIconLibrary(this.library);
    if (this.name && library2) {
      return {
        url: library2.resolver(this.name),
        fromLibrary: true
      };
    }
    return {
      url: this.src,
      fromLibrary: false
    };
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a5;
    const { url, fromLibrary } = this.getIconSource();
    const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.resolveIcon(url, library2);
      iconCache.set(url, iconResolver);
    }
    if (!this.initialRender) {
      return;
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getIconSource().url) {
      return;
    }
    if (e10(svg)) {
      this.svg = svg;
      if (library2) {
        await this.updateComplete;
        const shadowSVG = this.shadowRoot.querySelector("[part='svg']");
        if (typeof library2.mutator === "function" && shadowSVG) {
          library2.mutator(shadowSVG);
        }
      }
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.emit("sl-error");
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a5 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a5.call(library2, this.svg);
        this.emit("sl-load");
    }
  }
  render() {
    return this.svg;
  }
};
SlIcon.styles = [component_styles_default, icon_styles_default];
__decorateClass([
  r7()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  n5({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  n5()
], SlIcon.prototype, "src", 2);
__decorateClass([
  n5()
], SlIcon.prototype, "label", 2);
__decorateClass([
  n5({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("label")
], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["name", "src", "library"])
], SlIcon.prototype, "setIcon", 1);

// node_modules/lit-html/static.js
var a4 = Symbol.for("");
var o6 = (t7) => {
  if (t7?.r === a4) return t7?._$litStatic$;
};
var i7 = (t7, ...r10) => ({ _$litStatic$: r10.reduce((r11, e12, a5) => r11 + ((t8) => {
  if (void 0 !== t8._$litStatic$) return t8._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t8}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e12) + t7[a5 + 1], t7[0]), r: a4 });
var l4 = /* @__PURE__ */ new Map();
var n6 = (t7) => (r10, ...e12) => {
  const a5 = e12.length;
  let s5, i8;
  const n9 = [], u6 = [];
  let c7, $4 = 0, f6 = false;
  for (; $4 < a5; ) {
    for (c7 = r10[$4]; $4 < a5 && void 0 !== (i8 = e12[$4], s5 = o6(i8)); ) c7 += s5 + r10[++$4], f6 = true;
    $4 !== a5 && u6.push(i8), n9.push(c7), $4++;
  }
  if ($4 === a5 && n9.push(r10[a5]), f6) {
    const t8 = n9.join("$$lit$$");
    void 0 === (r10 = l4.get(t8)) && (n9.raw = n9, l4.set(t8, r10 = n9)), e12 = u6;
  }
  return t7(r10, ...e12);
};
var u5 = n6(x);
var c5 = n6(b2);
var $3 = n6(w);

// node_modules/lit-html/directives/if-defined.js
var o7 = (o10) => o10 ?? E;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KEXJVXAU.js
var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["click"]
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
    this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return this.button.validity;
    }
    return validValidityState;
  }
  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return this.button.validationMessage;
    }
    return "";
  }
  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick() {
    if (this.type === "submit") {
      this.formControlController.submit(this);
    }
    if (this.type === "reset") {
      this.formControlController.reset(this);
    }
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.formControlController.setValidity(this.disabled);
    }
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i7`a` : i7`button`;
    return u5`
      <${tag}
        part="base"
        class=${e8({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink && !this.disabled ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? u5` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? u5`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = [component_styles_default, button_styles_default];
SlButton.dependencies = {
  "sl-icon": SlIcon,
  "sl-spinner": SlSpinner
};
__decorateClass([
  e6(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  r7()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  r7()
], SlButton.prototype, "invalid", 2);
__decorateClass([
  n5()
], SlButton.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  n5()
], SlButton.prototype, "type", 2);
__decorateClass([
  n5()
], SlButton.prototype, "name", 2);
__decorateClass([
  n5()
], SlButton.prototype, "value", 2);
__decorateClass([
  n5()
], SlButton.prototype, "href", 2);
__decorateClass([
  n5()
], SlButton.prototype, "target", 2);
__decorateClass([
  n5()
], SlButton.prototype, "rel", 2);
__decorateClass([
  n5()
], SlButton.prototype, "download", 2);
__decorateClass([
  n5()
], SlButton.prototype, "form", 2);
__decorateClass([
  n5({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass([
  n5({ attribute: "formenctype" })
], SlButton.prototype, "formEnctype", 2);
__decorateClass([
  n5({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass([
  n5({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass([
  n5({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlButton.prototype, "handleDisabledChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VVA35HTY.js
var menu_styles_default = i`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GIGQL3HG.js
var SlMenu = class extends ShoelaceElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menu");
  }
  handleClick(event) {
    const menuItemTypes = ["menuitem", "menuitemcheckbox"];
    const composedPath = event.composedPath();
    const target = composedPath.find((el) => {
      var _a5;
      return menuItemTypes.includes(((_a5 = el == null ? void 0 : el.getAttribute) == null ? void 0 : _a5.call(el, "role")) || "");
    });
    if (!target) return;
    const closestMenu = composedPath.find((el) => {
      var _a5;
      return ((_a5 = el == null ? void 0 : el.getAttribute) == null ? void 0 : _a5.call(el, "role")) === "menu";
    });
    const clickHasSubmenu = closestMenu !== this;
    if (clickHasSubmenu) return;
    const item = target;
    if (item.type === "checkbox") {
      item.checked = !item.checked;
    }
    this.emit("sl-select", { detail: { item } });
  }
  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      const item = this.getCurrentItem();
      event.preventDefault();
      event.stopPropagation();
      item == null ? void 0 : item.click();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const items = this.getAllItems();
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;
      if (items.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === "ArrowDown") {
          index++;
        } else if (event.key === "ArrowUp") {
          index--;
        } else if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = items.length - 1;
        }
        if (index < 0) {
          index = items.length - 1;
        }
        if (index > items.length - 1) {
          index = 0;
        }
        this.setCurrentItem(items[index]);
        items[index].focus();
      }
    }
  }
  handleMouseDown(event) {
    const target = event.target;
    if (this.isMenuItem(target)) {
      this.setCurrentItem(target);
    }
  }
  handleSlotChange() {
    const items = this.getAllItems();
    if (items.length > 0) {
      this.setCurrentItem(items[0]);
    }
  }
  isMenuItem(item) {
    var _a5;
    return item.tagName.toLowerCase() === "sl-menu-item" || ["menuitem", "menuitemcheckbox", "menuitemradio"].includes((_a5 = item.getAttribute("role")) != null ? _a5 : "");
  }
  /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
  getAllItems() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
      if (el.inert || !this.isMenuItem(el)) {
        return false;
      }
      return true;
    });
  }
  /**
   * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
   * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
   */
  getCurrentItem() {
    return this.getAllItems().find((i8) => i8.getAttribute("tabindex") === "0");
  }
  /**
   * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
   * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
   */
  setCurrentItem(item) {
    const items = this.getAllItems();
    items.forEach((i8) => {
      i8.setAttribute("tabindex", i8 === item ? "0" : "-1");
    });
  }
  render() {
    return x`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `;
  }
};
SlMenu.styles = [component_styles_default, menu_styles_default];
__decorateClass([
  e6("slot")
], SlMenu.prototype, "defaultSlot", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KZJNDGFO.js
var menu_item_styles_default = i`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;

// node_modules/lit-html/async-directive.js
var s4 = (i8, t7) => {
  const e12 = i8._$AN;
  if (void 0 === e12) return false;
  for (const i9 of e12) i9._$AO?.(t7, false), s4(i9, t7);
  return true;
};
var o8 = (i8) => {
  let t7, e12;
  do {
    if (void 0 === (t7 = i8._$AM)) break;
    e12 = t7._$AN, e12.delete(i8), i8 = t7;
  } while (0 === e12?.size);
};
var r9 = (i8) => {
  for (let t7; t7 = i8._$AM; i8 = t7) {
    let e12 = t7._$AN;
    if (void 0 === e12) t7._$AN = e12 = /* @__PURE__ */ new Set();
    else if (e12.has(i8)) break;
    e12.add(i8), c6(t7);
  }
};
function h4(i8) {
  void 0 !== this._$AN ? (o8(this), this._$AM = i8, r9(this)) : this._$AM = i8;
}
function n7(i8, t7 = false, e12 = 0) {
  const r10 = this._$AH, h6 = this._$AN;
  if (void 0 !== h6 && 0 !== h6.size) if (t7) if (Array.isArray(r10)) for (let i9 = e12; i9 < r10.length; i9++) s4(r10[i9], false), o8(r10[i9]);
  else null != r10 && (s4(r10, false), o8(r10));
  else s4(this, i8);
}
var c6 = (i8) => {
  i8.type == t5.CHILD && (i8._$AP ??= n7, i8._$AQ ??= h4);
};
var f5 = class extends i5 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i8, t7, e12) {
    super._$AT(i8, t7, e12), r9(this), this.isConnected = i8._$AU;
  }
  _$AO(i8, t7 = true) {
    i8 !== this.isConnected && (this.isConnected = i8, i8 ? this.reconnected?.() : this.disconnected?.()), t7 && (s4(this, i8), o8(this));
  }
  setValue(t7) {
    if (f4(this._$Ct)) this._$Ct._$AI(t7, this);
    else {
      const i8 = [...this._$Ct._$AH];
      i8[this._$Ci] = t7, this._$Ct._$AI(i8, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/ref.js
var e11 = () => new h5();
var h5 = class {
};
var o9 = /* @__PURE__ */ new WeakMap();
var n8 = e7(class extends f5 {
  render(i8) {
    return E;
  }
  update(i8, [s5]) {
    const e12 = s5 !== this.Y;
    return e12 && void 0 !== this.Y && this.rt(void 0), (e12 || this.lt !== this.ct) && (this.Y = s5, this.ht = i8.options?.host, this.rt(this.ct = i8.element)), E;
  }
  rt(t7) {
    if (this.isConnected || (t7 = void 0), "function" == typeof this.Y) {
      const i8 = this.ht ?? globalThis;
      let s5 = o9.get(i8);
      void 0 === s5 && (s5 = /* @__PURE__ */ new WeakMap(), o9.set(i8, s5)), void 0 !== s5.get(this.Y) && this.Y.call(this.ht, void 0), s5.set(this.Y, t7), void 0 !== t7 && this.Y.call(this.ht, t7);
    } else this.Y.value = t7;
  }
  get lt() {
    return "function" == typeof this.Y ? o9.get(this.ht ?? globalThis)?.get(this.Y) : this.Y?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZLIGP6HZ.js
var SubmenuController = class {
  constructor(host, hasSlotController) {
    this.popupRef = e11();
    this.enableSubmenuTimer = -1;
    this.isConnected = false;
    this.isPopupConnected = false;
    this.skidding = 0;
    this.submenuOpenDelay = 100;
    this.handleMouseMove = (event) => {
      this.host.style.setProperty("--safe-triangle-cursor-x", `${event.clientX}px`);
      this.host.style.setProperty("--safe-triangle-cursor-y", `${event.clientY}px`);
    };
    this.handleMouseOver = () => {
      if (this.hasSlotController.test("submenu")) {
        this.enableSubmenu();
      }
    };
    this.handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
        case "Tab":
          this.disableSubmenu();
          break;
        case "ArrowLeft":
          if (event.target !== this.host) {
            event.preventDefault();
            event.stopPropagation();
            this.host.focus();
            this.disableSubmenu();
          }
          break;
        case "ArrowRight":
        case "Enter":
        case " ":
          this.handleSubmenuEntry(event);
          break;
        default:
          break;
      }
    };
    this.handleClick = (event) => {
      var _a5;
      if (event.target === this.host) {
        event.preventDefault();
        event.stopPropagation();
      } else if (event.target instanceof Element && (event.target.tagName === "sl-menu-item" || ((_a5 = event.target.role) == null ? void 0 : _a5.startsWith("menuitem")))) {
        this.disableSubmenu();
      }
    };
    this.handleFocusOut = (event) => {
      if (event.relatedTarget && event.relatedTarget instanceof Element && this.host.contains(event.relatedTarget)) {
        return;
      }
      this.disableSubmenu();
    };
    this.handlePopupMouseover = (event) => {
      event.stopPropagation();
    };
    this.handlePopupReposition = () => {
      const submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']");
      const menu = submenuSlot == null ? void 0 : submenuSlot.assignedElements({ flatten: true }).filter((el) => el.localName === "sl-menu")[0];
      const isRtl = getComputedStyle(this.host).direction === "rtl";
      if (!menu) {
        return;
      }
      const { left, top, width, height } = menu.getBoundingClientRect();
      this.host.style.setProperty("--safe-triangle-submenu-start-x", `${isRtl ? left + width : left}px`);
      this.host.style.setProperty("--safe-triangle-submenu-start-y", `${top}px`);
      this.host.style.setProperty("--safe-triangle-submenu-end-x", `${isRtl ? left + width : left}px`);
      this.host.style.setProperty("--safe-triangle-submenu-end-y", `${top + height}px`);
    };
    (this.host = host).addController(this);
    this.hasSlotController = hasSlotController;
  }
  hostConnected() {
    if (this.hasSlotController.test("submenu") && !this.host.disabled) {
      this.addListeners();
    }
  }
  hostDisconnected() {
    this.removeListeners();
  }
  hostUpdated() {
    if (this.hasSlotController.test("submenu") && !this.host.disabled) {
      this.addListeners();
      this.updateSkidding();
    } else {
      this.removeListeners();
    }
  }
  addListeners() {
    if (!this.isConnected) {
      this.host.addEventListener("mousemove", this.handleMouseMove);
      this.host.addEventListener("mouseover", this.handleMouseOver);
      this.host.addEventListener("keydown", this.handleKeyDown);
      this.host.addEventListener("click", this.handleClick);
      this.host.addEventListener("focusout", this.handleFocusOut);
      this.isConnected = true;
    }
    if (!this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.addEventListener("mouseover", this.handlePopupMouseover);
        this.popupRef.value.addEventListener("sl-reposition", this.handlePopupReposition);
        this.isPopupConnected = true;
      }
    }
  }
  removeListeners() {
    if (this.isConnected) {
      this.host.removeEventListener("mousemove", this.handleMouseMove);
      this.host.removeEventListener("mouseover", this.handleMouseOver);
      this.host.removeEventListener("keydown", this.handleKeyDown);
      this.host.removeEventListener("click", this.handleClick);
      this.host.removeEventListener("focusout", this.handleFocusOut);
      this.isConnected = false;
    }
    if (this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.removeEventListener("mouseover", this.handlePopupMouseover);
        this.popupRef.value.removeEventListener("sl-reposition", this.handlePopupReposition);
        this.isPopupConnected = false;
      }
    }
  }
  handleSubmenuEntry(event) {
    const submenuSlot = this.host.renderRoot.querySelector("slot[name='submenu']");
    if (!submenuSlot) {
      console.error("Cannot activate a submenu if no corresponding menuitem can be found.", this);
      return;
    }
    let menuItems = null;
    for (const elt of submenuSlot.assignedElements()) {
      menuItems = elt.querySelectorAll("sl-menu-item, [role^='menuitem']");
      if (menuItems.length !== 0) {
        break;
      }
    }
    if (!menuItems || menuItems.length === 0) {
      return;
    }
    menuItems[0].setAttribute("tabindex", "0");
    for (let i8 = 1; i8 !== menuItems.length; ++i8) {
      menuItems[i8].setAttribute("tabindex", "-1");
    }
    if (this.popupRef.value) {
      event.preventDefault();
      event.stopPropagation();
      if (this.popupRef.value.active) {
        if (menuItems[0] instanceof HTMLElement) {
          menuItems[0].focus();
        }
      } else {
        this.enableSubmenu(false);
        this.host.updateComplete.then(() => {
          if (menuItems[0] instanceof HTMLElement) {
            menuItems[0].focus();
          }
        });
        this.host.requestUpdate();
      }
    }
  }
  setSubmenuState(state2) {
    if (this.popupRef.value) {
      if (this.popupRef.value.active !== state2) {
        this.popupRef.value.active = state2;
        this.host.requestUpdate();
      }
    }
  }
  // Shows the submenu. Supports disabling the opening delay, e.g. for keyboard events that want to set the focus to the
  // newly opened menu.
  enableSubmenu(delay = true) {
    if (delay) {
      window.clearTimeout(this.enableSubmenuTimer);
      this.enableSubmenuTimer = window.setTimeout(() => {
        this.setSubmenuState(true);
      }, this.submenuOpenDelay);
    } else {
      this.setSubmenuState(true);
    }
  }
  disableSubmenu() {
    window.clearTimeout(this.enableSubmenuTimer);
    this.setSubmenuState(false);
  }
  // Calculate the space the top of a menu takes-up, for aligning the popup menu-item with the activating element.
  updateSkidding() {
    var _a5;
    if (!((_a5 = this.host.parentElement) == null ? void 0 : _a5.computedStyleMap)) {
      return;
    }
    const styleMap = this.host.parentElement.computedStyleMap();
    const attrs = ["padding-top", "border-top-width", "margin-top"];
    const skidding = attrs.reduce((accumulator, attr) => {
      var _a22;
      const styleValue = (_a22 = styleMap.get(attr)) != null ? _a22 : new CSSUnitValue(0, "px");
      const unitValue = styleValue instanceof CSSUnitValue ? styleValue : new CSSUnitValue(0, "px");
      const pxValue = unitValue.to("px");
      return accumulator - pxValue.value;
    }, 0);
    this.skidding = skidding;
  }
  isExpanded() {
    return this.popupRef.value ? this.popupRef.value.active : false;
  }
  renderSubmenu() {
    const isRtl = getComputedStyle(this.host).direction === "rtl";
    if (!this.isConnected) {
      return x` <slot name="submenu" hidden></slot> `;
    }
    return x`
      <sl-popup
        ${n8(this.popupRef)}
        placement=${isRtl ? "left-start" : "right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JGDQQFMA.js
var SlMenuItem = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.type = "normal";
    this.checked = false;
    this.value = "";
    this.loading = false;
    this.disabled = false;
    this.hasSlotController = new HasSlotController(this, "submenu");
    this.submenuController = new SubmenuController(this, this.hasSlotController);
    this.handleHostClick = (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    this.handleMouseOver = (event) => {
      this.focus();
      event.stopPropagation();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleHostClick);
    this.addEventListener("mouseover", this.handleMouseOver);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleHostClick);
    this.removeEventListener("mouseover", this.handleMouseOver);
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("slotchange", { bubbles: true, composed: false, cancelable: false });
    }
  }
  handleCheckedChange() {
    if (this.checked && this.type !== "checkbox") {
      this.checked = false;
      console.error('The checked attribute can only be used on menu items with type="checkbox"', this);
      return;
    }
    if (this.type === "checkbox") {
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.removeAttribute("aria-checked");
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleTypeChange() {
    if (this.type === "checkbox") {
      this.setAttribute("role", "menuitemcheckbox");
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.setAttribute("role", "menuitem");
      this.removeAttribute("aria-checked");
    }
  }
  /** Returns a text label based on the contents of the menu item's default slot. */
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }
  isSubmenu() {
    return this.hasSlotController.test("submenu");
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const isSubmenuExpanded = this.submenuController.isExpanded();
    return x`
      <div
        id="anchor"
        part="base"
        class=${e8({
      "menu-item": true,
      "menu-item--rtl": isRtl,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled,
      "menu-item--loading": this.loading,
      "menu-item--has-submenu": this.isSubmenu(),
      "menu-item--submenu-expanded": isSubmenuExpanded
    })}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${isSubmenuExpanded ? true : false}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading ? x` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> ` : ""}
      </div>
    `;
  }
};
SlMenuItem.styles = [component_styles_default, menu_item_styles_default];
SlMenuItem.dependencies = {
  "sl-icon": SlIcon,
  "sl-popup": SlPopup,
  "sl-spinner": SlSpinner
};
__decorateClass([
  e6("slot:not([name])")
], SlMenuItem.prototype, "defaultSlot", 2);
__decorateClass([
  e6(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  n5()
], SlMenuItem.prototype, "type", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  n5()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "loading", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  watch("checked")
], SlMenuItem.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlMenuItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("type")
], SlMenuItem.prototype, "handleTypeChange", 1);

// widgets/src/styles.ts
var Styles = i`
    :host {
        display: block;
        font-family: Arial, sans-serif;
    }

    .allowSimButton {
        top: 10px;
        left: 100px;
        position: absolute;
        z-index: 10;
    }

    :host(:not([contenteditable='true']):not([contenteditable=''])) .optionsMenu {
        display: none;
    }
    .author-only {
        display: block;
    }

    .sidebar {
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 4px;
        height: max-content;
        z-index: 2;
    }

    .sidebar-item {
        display: flex;
    }

    .sidebar-counter {
        font-size: 70%;
    }

    .sidebar-item-label {
        font-size: 100%;
        margin-left: 10px;
        margin-right: 10px;
    }

    .simulateCheckbox {
        top: 10px;
        left: 10px;
        position: absolute;
        z-index: 10;
    }

    .flipSwitch {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    }

    .container {
        display: flex;
        height: max-content;
    }

    .workspaceContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .workspaceArea {
        position: absolute;
        border: 1px solid black;
        width: 3000px;
        height: 2000px;
        background: #ffffff;
    }

    .trashCanIcon {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: black;
        background: #ffffff;
        border: 1px solid lightgray;
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        z-index: 30;
        transition: background 0.2s;
    }
    .trashCanIconDragOver {
        background: #de2b2b;
        color: white;
    }

    .svgArea {
        position: absolute;
        overflow: auto;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: default;
    }

    .svgLine {
        stroke: #303030;
        fill: none;
        stroke-width: 2;
        transition: stroke-width 0.1s;
    }

    .svgLine:hover {
        stroke-width: 4;
    }

    .svgLineTrue {
        stroke: green;
    }

    .gate {
        border: 1px groove #000;
        border-top: none;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        line-height: 20%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }
    .gateDisabled {
        border: 1px groove #da0d0d;
        border-top: none;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        line-height: 20%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }
    .gateTrue {
        background: lightgreen;
    }

    .gate:focus {
        outline: none;
    }
    .gate:active {
        outline: none;
    }

    .gatepointer {
        cursor: pointer;
        align-items: center;
        position: relative;
        text-align: center;
        top: -50%;
        font-size: 80%;
    }

    .in-out {
        border: 1px solid #000;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 4px;
        text-align: center;
        display: table;
        line-height: 10%;
        text-align: center;
        user-select: none;
        background: white;
        position: relative;
        cursor: grab;
    }

    .textClass {
        font-family: Arial;
        font-size: 500%;
    }
    .gateText {
        font-family: Arial;
        font-size: 65%;
        text-align: center;
        position: absolute;
        top: -13px;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
    }

    .svgTest {
        background-color: lightgreen;
    }

    table {
        padding: 2px;
        padding-top: 5px;
        font-size: 100%;
        width: 100%;
        table-layout: fixed;
        border-radius: 2px;
    }

    .flippedGate {
        margin-top: 2px;
        font-size: 38%;
        table-layout: fixed;
        width: 100%;
        height: 100%;
    }

    td.highlight {
        background-color: #8da7fc;
    }

    th,
    td {
        background-color: #f2f2f2;
        color: black;
        text-align: center;
    }

    .vertical-line {
        border-radius: 0px;
        border-left: 0.5px solid black;
        background-color: white;
        padding: 0px;
        margin: 0px;
        width: 0px;
    }

    hr {
        margin: 0;
        border: none;
        border-left: 1px solid black;
    }

    th {
        background-color: #b4b4b4;
    }

    sl-menu {
        position: fixed;
    }
    sl-tooltip {
        z-index: 10;
        box-shadow: none;
        --max-width: 200px;
    }

    .tooltipcontent {
        color: black;
    }

    .tooltip-button {
        position: absolute;
        top: -7px;
        left: 30px;
        z-index: 13;
        background-color: transparent;
    }

    .contextMenuGates {
        z-index: 30;
    }

    .connector {
        display: block;
        width: 25px;
        height: 25px;
        cursor: pointer;
        z-index: 5;
        text-align: left;
        line-height: 13px;
    }
    .dot{
        height: 7.5px;
        width: 7.5px;
        background-color: #000000;
        border-radius: 50%;
        display: inline-block;

    }
    .dotTrue {
        height: 7.5px;
        width: 7.5px;
        background-color: green;
        border-radius: 50%;
        display: inline-block;
    }

    .dotError {
        height: 7.5px;
        width: 7.5px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }

    .optionsMenu {
        position: relative;
        display: flex;
        flex-direction: column;
        line-height: 0%;
        font-size: 80%;
    }

    .optionsCheckbox {
        padding-left: 2px;
        padding-right: 2px;
    }

    .optionsItem {
        position: relative;
        display: flex;
        align-items: center;
        padding: 2px;
        margin: 2px;
    }

    sl-input {
        width: 70px;
    }
`;

// widgets/src/gates/gate.ts
var _contextMenu_dec, _showTruthTable_dec, _conOut2_dec, _conOut_dec, _conIn2_dec, _conIn1_dec, _id_dec, _movable_dec, _gatetype_dec, _output2_dec, _output_dec, _input2_dec, _input1_dec, _a2, _init2, _input1, _input2, _output, _output2, _gatetype, _movable, _id, _conIn1, _conIn2, _conOut, _conOut2, _showTruthTable, _contextMenu;
var _Gate = class _Gate extends (_a2 = LitElementWw, _input1_dec = [n5({ type: Boolean })], _input2_dec = [n5({ type: Boolean })], _output_dec = [n5({ type: Boolean })], _output2_dec = [n5({ type: Boolean })], _gatetype_dec = [n5({ type: String })], _movable_dec = [n5({ type: Boolean })], _id_dec = [n5({ type: String })], _conIn1_dec = [n5({ type: Object })], _conIn2_dec = [n5({ type: Object })], _conOut_dec = [n5({ type: Object })], _conOut2_dec = [n5({ type: Object })], _showTruthTable_dec = [n5({ type: Boolean })], _contextMenu_dec = [e6("#contextMenu")], _a2) {
  constructor() {
    super();
    __publicField(this, "widget");
    __privateAdd(this, _input1, __runInitializers(_init2, 8, this, null)), __runInitializers(_init2, 11, this);
    __privateAdd(this, _input2, __runInitializers(_init2, 12, this, null)), __runInitializers(_init2, 15, this);
    __privateAdd(this, _output, __runInitializers(_init2, 16, this, null)), __runInitializers(_init2, 19, this);
    __privateAdd(this, _output2, __runInitializers(_init2, 20, this, null)), __runInitializers(_init2, 23, this);
    __privateAdd(this, _gatetype, __runInitializers(_init2, 24, this, null)), __runInitializers(_init2, 27, this);
    __privateAdd(this, _movable, __runInitializers(_init2, 28, this, false)), __runInitializers(_init2, 31, this);
    __privateAdd(this, _id, __runInitializers(_init2, 32, this, null)), __runInitializers(_init2, 35, this);
    __privateAdd(this, _conIn1, __runInitializers(_init2, 36, this, null)), __runInitializers(_init2, 39, this);
    __privateAdd(this, _conIn2, __runInitializers(_init2, 40, this, null)), __runInitializers(_init2, 43, this);
    __privateAdd(this, _conOut, __runInitializers(_init2, 44, this, null)), __runInitializers(_init2, 47, this);
    __privateAdd(this, _conOut2, __runInitializers(_init2, 48, this, null)), __runInitializers(_init2, 51, this);
    __privateAdd(this, _showTruthTable, __runInitializers(_init2, 52, this, false)), __runInitializers(_init2, 55, this);
    __privateAdd(this, _contextMenu, __runInitializers(_init2, 56, this)), __runInitializers(_init2, 59, this);
    this.addEventListener("dragstart", this.handleDragStart);
    this.addEventListener("dragend", this.handleDragEnd);
    this.addEventListener("contextmenu", this.handleContextMenu);
    this.input1 = null;
    this.input2 = null;
    this.output = false;
    this.output2 = false;
    this.movable = false;
    this.showTruthTable = false;
  }
  static get scopedElements() {
    return {
      "sl-tooltip": SlTooltip,
      "sl-button": SlButton,
      "sl-popup": SlPopup,
      "sl-icon": SlIcon,
      "sl-menu": SlMenu,
      "sl-menu-item": SlMenuItem
    };
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    let slot;
    if (this.shadowRoot) {
      let slot2;
      switch (this.gatetype) {
        case "INPUT":
          slot2 = this.shadowRoot.querySelector('slot[name="con3"]');
          this.createConnectors(slot2, 3);
          break;
        case "OUTPUT":
          slot2 = this.shadowRoot.querySelector('slot[name="con1"]');
          this.createConnectors(slot2, 0);
          break;
        case "NOT":
          slot2 = this.shadowRoot.querySelector('slot[name="con1"]');
          this.createConnectors(slot2, 0);
          slot2 = this.shadowRoot.querySelector('slot[name="con3"]');
          this.createConnectors(slot2, 3);
          break;
        case "SPLITTER":
          slot2 = this.shadowRoot.querySelector('slot[name="con1"]');
          this.createConnectors(slot2, 0);
          slot2 = this.shadowRoot.querySelector('slot[name="con3"]');
          this.createConnectors(slot2, 4);
          slot2 = this.shadowRoot.querySelector('slot[name="con4"]');
          this.createConnectors(slot2, 5);
          break;
        default:
          for (let i8 = 1; i8 <= 3; i8++) {
            slot2 = this.shadowRoot.querySelector('slot[name="con' + i8 + '"]');
            this.createConnectors(slot2, i8);
          }
      }
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    const widget = this.widget;
    if (this.movable === true) {
      if (this.gatetype === "INPUT" && changedProperties.has("input1")) {
        this.calculateOutput();
        this.updateConnectorColor();
        transferOutputToNextGate(this.widget, this);
      }
      if (widget.simulate === true) {
        if (this.gatetype === "OUTPUT" && changedProperties.has("input1")) {
          this.calculateOutput();
          this.updateConnectorColor();
        } else if (changedProperties.has("input1") || changedProperties.has("input2")) {
          this.calculateOutput();
          transferOutputToNextGate(this.widget, this);
          this.updateConnectorColor();
        }
      }
      if (changedProperties.has("showTruthTable")) {
        if (this.showTruthTable) {
          this.renderTruthTable();
        }
      }
      updateLineColor(widget);
    }
  }
  handleDragStart(event) {
    _Gate.movedGate = event.target;
    _Gate.x = event.clientX;
    _Gate.y = event.clientY;
    const tooltip = this.shadowRoot.querySelector(".tooltip");
    if (tooltip) {
      if (tooltip.open) {
        event.preventDefault();
        tooltip.hide();
      }
    }
    event.dataTransfer.setData("type", this.gatetype);
    const offsetX = event.clientX - this.getBoundingClientRect().left;
    const offsetY = event.clientY - this.getBoundingClientRect().top;
    event.dataTransfer.setData("offsetX", offsetX);
    event.dataTransfer.setData("offsetY", offsetY);
    event.dataTransfer.setData("movable", this.movable);
    event.dataTransfer.setData("id", this.id);
    this.hideContextMenu();
    if (this.movable) {
      this.style.opacity = "0.001";
    }
  }
  handleDragEnd(event) {
    event.preventDefault();
    if (this.movable) {
      this.style.opacity = "";
    }
  }
  handleContextMenu(event) {
    event.preventDefault();
    if (this.movable) {
      if (this.contextMenu.style.display === "none") {
        this.showContextMenu(event);
      } else {
        this.hideContextMenu();
      }
    }
  }
  calculateOutput() {
  }
  changeInput1() {
    this.input1 = !this.input1;
  }
  changeInput2() {
    this.input2 = !this.input2;
  }
  showContextMenu(event) {
    const gateElements = this.widget.getGateElements();
    gateElements.forEach((gate) => {
      gate.hideContextMenu();
    });
    if (this.contextMenu) {
      if (this.movable === true) {
        const zoom = this.widget.zoom;
        const gateX = this.getBoundingClientRect().x;
        const gateY = this.getBoundingClientRect().y;
        const svgCanvas = this.widget.wsDrag;
        const offsetX = getMouseCoordinates(svgCanvas, event.clientX, event.clientY, zoom).x;
        const offsetY = getMouseCoordinates(svgCanvas, event.clientX, event.clientY, zoom).y;
        this.style.zIndex = "30";
        this.contextMenu.style.display = "block";
        this.contextMenu.style.left = `${offsetX}px`;
        this.contextMenu.style.top = `${offsetY}px`;
        this.contextMenu.style.transform = `scale(${1 / zoom})`;
      }
    }
  }
  hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = "none";
      this.style.zIndex = "10";
    }
  }
  deleteGate() {
    const workspace = document.querySelector("webwriter-logic-circuit");
    const gateElements = workspace.getGateElements();
    const lineElements = workspace.getLineElements();
    if (workspace.isDrawingLine) {
      workspace.isDrawingLine = false;
      workspace.svgPathToMouse.setAttribute("d", "");
      workspace.startConnector = null;
    }
    gateElements.forEach((gate, index2) => {
      if (this === gate) {
        this.remove();
        gateElements.splice(index2, 1);
      }
    });
    const pathsToDelete = lineElements?.filter(
      (line) => line.start === this.conIn1 || line.start === this.conIn2 || line.start === this.conOut || line.start === this.conOut2 || line.end === this.conIn1 || line.end === this.conIn2 || line.end === this.conOut || line.end === this.conOut2
    );
    let lineElementsUpdated = [];
    workspace.lineElements.forEach((line) => {
      if (pathsToDelete.includes(line)) {
        line.lineSVG.remove();
        let consArr2 = this.widget.reflectCons.split(",");
        let index2 = -1;
        for (let i8 = 0; i8 < consArr2.length; i8++) {
          if (consArr2[i8].includes(line.start.id) && consArr2[i8].includes(line.end.id)) {
            index2 = i8;
          }
        }
        ;
        consArr2.splice(index2, 1);
        this.widget.reflectCons = consArr2.toString();
      } else {
        lineElementsUpdated.push(line);
      }
    });
    workspace.lineElements = lineElementsUpdated;
    let consArr = this.widget.reflectGates.split(",");
    let index = -1;
    for (let i8 = 0; i8 < consArr.length; i8++) {
      if (Number.parseInt(consArr[i8][0]) === Number.parseInt(this.id.match(/^([a-zA-Z]+)(\d+)$/)[2])) {
        index = i8;
      }
    }
    ;
    consArr.splice(index, 1);
    this.widget.reflectGates = consArr.toString();
    this.hideContextMenu();
  }
  createConnectors(slot, n9) {
    if (this.movable) {
      const connector = this.widget.shadowRoot.createElement("connector-element");
      connector.style.position = "absolute";
      connector.widget = this.widget;
      switch (n9) {
        case 0:
          connector.id = this.id + "In1";
          connector.type = "input";
          connector.style.left = "-7%";
          connector.style.top = "44%";
          this.conIn1 = connector;
          break;
        case 1:
          connector.id = this.id + "In1";
          connector.type = "input";
          connector.style.left = "-7%";
          connector.style.top = "25%";
          this.conIn1 = connector;
          break;
        case 2:
          connector.id = this.id + "In2";
          connector.type = "input";
          connector.style.left = "-7%";
          connector.style.top = "63%";
          this.conIn2 = connector;
          break;
        case 3:
          connector.id = this.id + "Out";
          connector.type = "output";
          connector.style.left = "94%";
          connector.style.top = "44%";
          this.conOut = connector;
          break;
        case 4:
          connector.id = this.id + "Out2";
          connector.type = "output";
          connector.style.left = "94%";
          connector.style.top = "23%";
          this.conOut = connector;
          break;
        case 5:
          connector.id = this.id + "Out3";
          connector.type = "output";
          connector.style.left = "94%";
          connector.style.top = "64%";
          this.conOut2 = connector;
      }
      slot.appendChild(connector);
    }
  }
  updateConnectorColor() {
    let connectorDot;
    let con;
    const slotIn1 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con1']");
    const slotIn2 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con2']");
    const slotOut = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con3']");
    const slotOut2 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con4']");
    if (this.gatetype === "INPUT") {
      if (this.output === true) {
        this.shadowRoot.querySelector(".gate").classList.add("gateTrue");
      } else {
        this.shadowRoot.querySelector(".gate").classList.remove("gateTrue");
      }
    }
    if (this.widget.simulate === true) {
      if (this.gatetype == "OUTPUT") {
        if (this.input1 === true) {
          this.shadowRoot.querySelector(".gate").classList.add("gateTrue");
          this.requestUpdate();
        } else {
          this.shadowRoot.querySelector(".gate").classList.remove("gateTrue");
        }
      }
      if (slotOut) {
        connectorDot = slotOut.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
        con = slotOut.querySelector("connector-element");
        if (connectorDot && this.output === true) {
          connectorDot.classList.add("dotTrue");
          con.value = true;
        } else if (connectorDot) {
          connectorDot.classList.remove("dotTrue");
          con.value = false;
        }
      }
      if (slotOut2) {
        connectorDot = slotOut2.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
        con = slotOut2.querySelector("connector-element");
        if (connectorDot && this.output === true) {
          connectorDot.classList.add("dotTrue");
          con.value = true;
        } else if (connectorDot) {
          connectorDot.classList.remove("dotTrue");
          con.value = false;
        }
      }
      if (slotIn1) {
        connectorDot = slotIn1.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
        con = slotIn1.querySelector("connector-element");
        if (connectorDot && this.input1 === true) {
          connectorDot.classList.add("dotTrue");
          con.value = true;
        } else if (connectorDot) {
          connectorDot.classList.remove("dotTrue");
          con.value = false;
        }
      }
      if (slotIn2) {
        connectorDot = slotIn2.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
        con = slotIn2.querySelector("connector-element");
        if (connectorDot && this.input2 === true) {
          connectorDot.classList.add("dotTrue");
          con.value = true;
        } else if (connectorDot) {
          connectorDot.classList.remove("dotTrue");
          con.value = false;
        }
      }
    }
  }
  resetConnectorColor() {
    let connector;
    let con;
    const slotIn1 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con1']");
    const slotIn2 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con2']");
    const slotOut = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con3']");
    const slotOut2 = this.shadowRoot.querySelector(".gate").querySelector("slot[name='con4']");
    if (this.gatetype === "OUTPUT") {
      this.shadowRoot.querySelector(".gate").classList.remove("gateTrue");
    }
    if (slotOut) {
      connector = slotOut.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
      con = slotOut.querySelector("connector-element");
      if (connector) {
        connector.classList.remove("dotTrue");
        connector.classList.remove("dotError");
        con.value = false;
      }
    }
    if (slotOut2) {
      connector = slotOut2.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
      con = slotOut2.querySelector("connector-element");
      if (connector) {
        connector.classList.remove("dotTrue");
        connector.classList.remove("dotError");
        con.value = false;
      }
    }
    if (slotIn1) {
      connector = slotIn1.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
      con = slotIn1.querySelector("connector-element");
      if (connector) {
        connector.classList.remove("dotTrue");
        connector.classList.remove("dotError");
        con.value = false;
      }
    }
    if (slotIn2) {
      connector = slotIn2.querySelector("connector-element").shadowRoot.querySelector(".connector").children[0];
      con = slotIn2.querySelector("connector-element");
      if (connector) {
        connector.classList.remove("dotTrue");
        connector.classList.remove("dotError");
        con.value = false;
      }
    }
  }
  truthTableHTML() {
  }
  flipGate() {
    if (this.shadowRoot.getElementById("flipCheckbox").checked) {
      this.showTruthTable = false;
    } else {
      this.showTruthTable = true;
    }
    this.hideContextMenu();
  }
  renderTruthTable() {
    const truthTable = this.truthTableHTML();
    const rows = this.shadowRoot.querySelectorAll("tr");
    rows.forEach((row) => {
      row.querySelectorAll("td").forEach((td) => {
        td.classList.remove("highlight");
      });
    });
    const widget = this.widget;
    const highlightedRow = Number(this.input1) << 1 | Number(this.input2);
    if (widget.simulate === true) {
      if (rows[highlightedRow]) {
        let row = rows[highlightedRow];
        row.querySelectorAll("td").forEach((td) => {
          td.classList.add("highlight");
        });
        if (this.gatetype === "SPLITTER") {
          row = rows[highlightedRow + 1];
        }
        row.querySelectorAll("td").forEach((td) => {
          td.classList.add("highlight");
        });
      }
    }
    return x` <div class="flippedGate">${truthTable}</div> `;
  }
};
_init2 = __decoratorStart(_a2);
_input1 = new WeakMap();
_input2 = new WeakMap();
_output = new WeakMap();
_output2 = new WeakMap();
_gatetype = new WeakMap();
_movable = new WeakMap();
_id = new WeakMap();
_conIn1 = new WeakMap();
_conIn2 = new WeakMap();
_conOut = new WeakMap();
_conOut2 = new WeakMap();
_showTruthTable = new WeakMap();
_contextMenu = new WeakMap();
__decorateElement(_init2, 4, "input1", _input1_dec, _Gate, _input1);
__decorateElement(_init2, 4, "input2", _input2_dec, _Gate, _input2);
__decorateElement(_init2, 4, "output", _output_dec, _Gate, _output);
__decorateElement(_init2, 4, "output2", _output2_dec, _Gate, _output2);
__decorateElement(_init2, 4, "gatetype", _gatetype_dec, _Gate, _gatetype);
__decorateElement(_init2, 4, "movable", _movable_dec, _Gate, _movable);
__decorateElement(_init2, 4, "id", _id_dec, _Gate, _id);
__decorateElement(_init2, 4, "conIn1", _conIn1_dec, _Gate, _conIn1);
__decorateElement(_init2, 4, "conIn2", _conIn2_dec, _Gate, _conIn2);
__decorateElement(_init2, 4, "conOut", _conOut_dec, _Gate, _conOut);
__decorateElement(_init2, 4, "conOut2", _conOut2_dec, _Gate, _conOut2);
__decorateElement(_init2, 4, "showTruthTable", _showTruthTable_dec, _Gate, _showTruthTable);
__decorateElement(_init2, 4, "contextMenu", _contextMenu_dec, _Gate, _contextMenu);
__decoratorMetadata(_init2, _Gate);
__publicField(_Gate, "movedGate");
__publicField(_Gate, "x");
__publicField(_Gate, "y");
__publicField(_Gate, "styles", Styles);
var Gate = _Gate;

// widgets/src/gates/not-gate.ts
var NOTGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "NOT";
  }
  calculateOutput() {
    this.output = !this.input1;
  }
  handleClick(event) {
    event.preventDefault();
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">NOT</p>

                <slot name="con1"></slot>
                <slot name="con3"></slot>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M105,111.3 V 400.7 L 365.5,256 Z M 16,247 v 18 h 71 v -18 z m 400,-14 c -12.8,0 -23,10.2 -23,23 0,12.8 10.2,23 23,23 12.8,0 23,-10.2 23,-23 0,-12.8 -10.2,-23 -23,-23 z m 40,14 c 0.6,2.9 1,5.9 1,9 0,3.1 -0.4,6.1 -1,9 h 40 v -18 z"
                />
            </svg>
        `;
  }
  renderTruthTable() {
    const truthTable = this.truthTableHTML();
    const rows = this.shadowRoot.querySelectorAll("tr");
    rows.forEach((row) => {
      row.querySelectorAll("td").forEach((td) => {
        td.classList.remove("highlight");
      });
    });
    const widget = document.querySelector("lukasww-logicgates");
    const highlightedRow = this.input1 ? 1 : 0;
    if (widget.simulate === true) {
      if (rows[highlightedRow]) {
        const row = rows[highlightedRow];
        row.querySelectorAll("td").forEach((td) => {
          td.classList.add("highlight");
        });
      }
    }
    return x` <div class="flippedGate">${truthTable}</div> `;
  }
};

// widgets/src/gates/and-gate.ts
var ANDGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "AND";
  }
  calculateOutput() {
    this.output = this.input1 && this.input2;
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">AND</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>

            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M105 105v302h151c148 0 148-302 0-302H105zm-89 46v18h71v-18H16zm368.8 96c.2 6 .2 12 0 18H496v-18H384.8zM16 343v18h71v-18H16z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/input.ts
var Input = class extends Gate {
  constructor() {
    super();
    this.gatetype = "INPUT";
    this.output = false;
  }
  changeInput() {
    this.output = !this.output;
  }
  calculateOutput() {
    this.output = this.input1;
  }
  render() {
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                <p class="gateText">Input</p>
                <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg"></svg>
                <slot name="con3"></slot>
                <div class="gatepointer" @click=${this.changeInput1}>${this.output}</div>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
};

// widgets/src/gates/nand-gate.ts
var NANDGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "NAND";
  }
  calculateOutput() {
    this.output = !(this.input1 && this.input2);
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">NAND</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M105 105v302h151c148 0 148-302 0-302H105zm-89 46v18h71v-18H16zm400 82c-12.8 0-23 10.2-23 23s10.2 23 23 23 23-10.2 23-23-10.2-23-23-23zm40 14c.6 2.9 1 5.9 1 9 0 3.1-.4 6.1-1 9h40v-18h-40zM16 343v18h71v-18H16z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/nor-gate.ts
var NORGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "NOR";
  }
  calculateOutput() {
    this.output = !(this.input1 || this.input2);
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">NOR</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M116.6 105c40 45.9 60.4 98.4 60.4 151 0 52.6-20.4 105.1-60.4 151H192c34.1 0 81.9-34 119.3-71.4 18.7-18.6 35.1-37.9 46.6-53.3 5.8-7.6 10.4-14.4 13.4-19.4 1.4-2.5 2.5-4.7 3.2-6.1.1-.4.2-.5.2-.8 0-.3-.1-.5-.2-.9-.6-1.4-1.7-3.5-3.2-6-3-5.1-7.5-11.8-13.2-19.5-11.3-15.4-27.5-34.6-46.1-53.2C274.8 139 227.1 105 192 105h-75.4zM16 151v18h122.2c-3-6.1-6.3-12.1-9.9-18H16zm400 82c-12.8 0-23 10.2-23 23s10.2 23 23 23 23-10.2 23-23-10.2-23-23-23zm40 14c.6 2.9 1 5.9 1 9 0 3.1-.4 6.1-1 9h40v-18h-40zM16 343v18h112.3c3.6-5.9 6.9-11.9 9.9-18H16z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/or-gate.ts
var ORGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "OR";
  }
  calculateOutput() {
    this.output = this.input1 || this.input2;
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">OR</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M116.6 407c40-45.9 60.4-98.4 60.4-151 0-52.6-20.4-105.1-60.4-151H192c34.1 0 81.9 34 119.3 71.4 18.7 18.6 35.1 37.9 46.6 53.3 5.8 7.6 10.4 14.4 13.4 19.4 1.4 2.5 2.5 4.7 3.2 6.1.1.4.2.5.2.8 0 .3-.1.5-.2.9-.6 1.4-1.7 3.5-3.2 6-3 5.1-7.5 11.8-13.2 19.5-11.3 15.4-27.5 34.6-46.1 53.2C274.8 373 227.1 407 192 407zM16 361v-18h122.2c-3 6.1-6.3 12.1-9.9 18zm374.5-96c.2-.3.4-.7.5-1 1.1-2.4 2-4.4 2-8 0-3.6-1-5.6-2-8-.1-.3-.3-.7-.5-1H496v18zM16 169v-18h112.3c3.6 5.9 6.9 11.9 9.9 18z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/output.ts
var Output = class extends Gate {
  constructor() {
    super();
    this.gatetype = "OUTPUT";
  }
  calculateOutput() {
    this.output = this.input1;
    this.requestUpdate();
  }
  render() {
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                <p class="gateText">Output</p>
                <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg"></svg>
                <slot name="con1"></slot>
                <div class="gatepointer">${this.output}</div>
            </div>
            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
};

// widgets/src/gates/xnor-gate.ts
var XNORGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "XNOR";
  }
  calculateOutput() {
    this.output = this.input1 === this.input2;
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">XNOR</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>

            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M53.86 89.17L42.14 102.8c17.99 15.4 32.89 31.6 44.81 48.2H16v18h82.58C114.9 197.3 123 226.7 123 256c0 29.3-8.1 58.7-24.42 87H16v18h70.95c-11.92 16.6-26.82 32.8-44.81 48.2l11.72 13.6c22.59-19.4 40.85-40.1 54.74-61.8h19.7c3.6-5.9 6.9-11.9 9.9-18H119c14.6-28.2 22-57.5 22-87s-7.4-58.8-22-87h19.2c-3-6.1-6.3-12.1-9.9-18h-19.7c-13.88-21.7-32.15-42.5-54.74-61.83zM116.6 105c40 45.9 60.4 98.4 60.4 151 0 52.6-20.4 105.1-60.4 151H192c34.1 0 81.9-34 119.3-71.4 18.7-18.6 35.1-37.9 46.6-53.3 5.8-7.6 10.4-14.4 13.4-19.4 1.4-2.5 2.5-4.7 3.2-6.1.1-.4.2-.5.2-.8 0-.3-.1-.5-.2-.9-.6-1.4-1.7-3.5-3.2-6-3-5.1-7.5-11.8-13.2-19.5-11.3-15.4-27.5-34.6-46.1-53.2C274.8 139 227.1 105 192 105h-75.4zM416 233c-12.8 0-23 10.2-23 23s10.2 23 23 23 23-10.2 23-23-10.2-23-23-23zm40 14c.6 2.9 1 5.9 1 9 0 3.1-.4 6.1-1 9h40v-18h-40z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/xor-gate.ts
var XORGate = class extends Gate {
  constructor() {
    super();
    this.gatetype = "XOR";
  }
  calculateOutput() {
    this.output = this.input1 !== this.input2;
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">XOR</p>

                <slot name="con1"></slot>
                <slot name="con2"></slot>
                <slot name="con3"></slot>
            </div>

            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg
                position="relative"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#000000"
                    d="M53.86 89.17L42.14 102.8c17.99 15.4 32.89 31.6 44.81 48.2H16v18h82.58C114.9 197.3 123 226.7 123 256c0 29.3-8.1 58.7-24.42 87H16v18h70.95c-11.92 16.6-26.82 32.8-44.81 48.2l11.72 13.6c22.59-19.4 40.85-40.1 54.74-61.8h19.7c3.6-5.9 6.9-11.9 9.9-18H119c14.6-28.2 22-57.5 22-87s-7.4-58.8-22-87h19.2c-3-6.1-6.3-12.1-9.9-18h-19.7c-13.88-21.7-32.15-42.5-54.74-61.83zM116.6 105c40 45.9 60.4 98.4 60.4 151 0 52.6-20.4 105.1-60.4 151H192c34.1 0 81.9-34 119.3-71.4 18.7-18.6 35.1-37.9 46.6-53.3 5.8-7.6 10.4-14.4 13.4-19.4 1.4-2.5 2.5-4.7 3.2-6.1.1-.4.2-.5.2-.8 0-.3-.1-.5-.2-.9-.6-1.4-1.7-3.5-3.2-6-3-5.1-7.5-11.8-13.2-19.5-11.3-15.4-27.5-34.6-46.1-53.2C274.8 139 227.1 105 192 105h-75.4zm273.9 142c.2.3.4.7.5 1 1.1 2.4 2 4.4 2 8 0 3.6-1 5.6-2 8-.1.3-.3.7-.5 1H496v-18H390.5z"
                />
            </svg>
        `;
  }
};

// widgets/src/gates/splitter.ts
var Splitter = class extends Gate {
  constructor() {
    super();
    this.gatetype = "SPLITTER";
    this.output2 = false;
  }
  calculateOutput() {
    this.output = this.input1;
    this.output2 = this.input1;
  }
  render() {
    const content = this.showTruthTable && this.movable ? this.renderTruthTable() : this.renderSVG();
    return x`
            <div class="gate" draggable="true" id="${this.id}" tabindex="-1">
                ${content}
                <p class="gateText">Splitter</p>

                <slot name="con1"></slot>
                <slot name="con3"></slot>
                <slot name="con4"></slot>
            </div>

            <sl-menu class="contextMenuGates" id="contextMenu" style="display: none;">
                <sl-menu-item id="flipCheckbox" type="checkbox" @click="${() => this.flipGate()}"
                    >Show Truthtable</sl-menu-item
                >
                <sl-menu-item @click="${() => this.deleteGate()}">Delete</sl-menu-item>
            </sl-menu>
        `;
  }
  truthTableHTML() {
    return x`
            <table>
                <tr>
                    <td rowspan="2">0</td>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="vertical-line"></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td rowspan="2">1</td>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
                <tr>
                    <td class="vertical-line"></td>
                    <td>1</td>
                </tr>
            </table>
        `;
  }
  renderSVG() {
    const truthTable = this.truthTableHTML();
    return x`
            <sl-tooltip class="tooltip" placement="right" trigger="click">
                <div class="tooltipcontent" slot="content">
                    <table>
                        <tr>
                            <th>Input</th>
                            <td class="vertical-line"></td>
                            <th>Output</th>
                        </tr>
                    </table>
                    ${truthTable}
                </div>
                ${this.movable ? x`` : x`<sl-button class="tooltip-button" variant="text" size="small">i</sl-button>`}
            </sl-tooltip>

            <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#000000"
                    d="M 16 254 v 18 h 199 v 110 h 240 v -18 h -222 v -210 h 222 v -18 h -240 V 254 L 16 254 Z"
                />
            </svg>
        `;
  }
};

// widgets/src/connector.ts
var _value_dec, _y_dec, _x_dec, _type_dec, _id_dec2, _a3, _init3, _id2, _type, _x, _y, _value;
var ConnectorElement = class extends (_a3 = r4, _id_dec2 = [r7()], _type_dec = [r7()], _x_dec = [r7()], _y_dec = [r7()], _value_dec = [r7()], _a3) {
  constructor() {
    super();
    __publicField(this, "widget");
    __privateAdd(this, _id2, __runInitializers(_init3, 8, this, "")), __runInitializers(_init3, 11, this);
    __privateAdd(this, _type, __runInitializers(_init3, 12, this, "")), __runInitializers(_init3, 15, this);
    __privateAdd(this, _x, __runInitializers(_init3, 16, this, 0)), __runInitializers(_init3, 19, this);
    __privateAdd(this, _y, __runInitializers(_init3, 20, this, 0)), __runInitializers(_init3, 23, this);
    __privateAdd(this, _value, __runInitializers(_init3, 24, this, null)), __runInitializers(_init3, 27, this);
    this.addEventListener("mousedown", this.handleMouseDown);
  }
  handleMouseDown(event) {
    event.preventDefault();
    const clickedElement = event.target;
    const widget = this.widget;
    for (const line of widget.lineElements) {
      if (clickedElement === line.start || clickedElement === line.end) {
        widget.startConnector = null;
        widget.endConnector = null;
        widget.isDrawingLine = false;
        widget.svgPathToMouse.setAttribute("d", "");
        console.error("Only one connection allowed");
        return;
      }
    }
    if (widget.startConnector === null) {
      widget.startConnector = clickedElement;
      widget.isDrawingLine = true;
    } else if (widget.endConnector === null) {
      widget.endConnector = clickedElement;
      if (widget.startConnector.type !== widget.endConnector.type && widget.startConnector.parentNode.parentNode !== widget.endConnector.parentNode.parentNode) {
        createLine(widget, widget.startConnector, widget.endConnector);
      } else {
        console.error("Connector are from the same type");
      }
      widget.startConnector = null;
      widget.endConnector = null;
      widget.isDrawingLine = false;
      widget.svgPathToMouse.setAttribute("d", "");
    }
  }
  render() {
    return x` <div class="connector" id="${this.id}">
            <span class="dot"></span>
        </div> `;
  }
};
_init3 = __decoratorStart(_a3);
_id2 = new WeakMap();
_type = new WeakMap();
_x = new WeakMap();
_y = new WeakMap();
_value = new WeakMap();
__decorateElement(_init3, 4, "id", _id_dec2, ConnectorElement, _id2);
__decorateElement(_init3, 4, "type", _type_dec, ConnectorElement, _type);
__decorateElement(_init3, 4, "x", _x_dec, ConnectorElement, _x);
__decorateElement(_init3, 4, "y", _y_dec, ConnectorElement, _y);
__decorateElement(_init3, 4, "value", _value_dec, ConnectorElement, _value);
__decoratorMetadata(_init3, ConnectorElement);
__publicField(ConnectorElement, "styles", Styles);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2OUC42YY.js
var button_group_styles_default = i`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UEYUGH42.js
var SlButtonGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.disableRole = false;
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--focus", true);
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--focus", false);
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--hover", true);
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--hover", false);
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button) {
        button.toggleAttribute("data-sl-button-group__button", true);
        button.toggleAttribute("data-sl-button-group__button--first", index === 0);
        button.toggleAttribute("data-sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.toggleAttribute("data-sl-button-group__button--last", index === slottedElements.length - 1);
        button.toggleAttribute(
          "data-sl-button-group__button--radio",
          button.tagName.toLowerCase() === "sl-radio-button"
        );
      }
    });
  }
  render() {
    return x`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlButtonGroup.styles = [component_styles_default, button_group_styles_default];
__decorateClass([
  e6("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  r7()
], SlButtonGroup.prototype, "disableRole", 2);
__decorateClass([
  n5()
], SlButtonGroup.prototype, "label", 2);
function findButton(el) {
  var _a5;
  const selector = "sl-button, sl-radio-button";
  return (_a5 = el.closest(selector)) != null ? _a5 : el.querySelector(selector);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js
var icon_button_styles_default = i`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HLJ2JR6P.js
var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i7`a` : i7`button`;
    return u5`
      <${tag}
        part="base"
        class=${e8({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : "button")}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o7(this.name)}
          library=${o7(this.library)}
          src=${o7(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = [component_styles_default, icon_button_styles_default];
SlIconButton.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  r7()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.EU44RQUN.js
var switch_styles_default = i`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function(name, old, value) {
    var _a5;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || u;
      const fromAttribute = typeof converter === "function" ? converter : (_a5 = converter == null ? void 0 : converter.fromAttribute) != null ? _a5 : u.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js
var form_control_styles_default = i`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// node_modules/lit-html/directives/live.js
var l5 = e7(class extends i5 {
  constructor(r10) {
    if (super(r10), r10.type !== t5.PROPERTY && r10.type !== t5.ATTRIBUTE && r10.type !== t5.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!f4(r10)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r10) {
    return r10;
  }
  update(i8, [t7]) {
    if (t7 === T || t7 === E) return t7;
    const o10 = i8.element, l6 = i8.name;
    if (i8.type === t5.PROPERTY) {
      if (t7 === o10[l6]) return T;
    } else if (i8.type === t5.BOOLEAN_ATTRIBUTE) {
      if (!!t7 === o10.hasAttribute(l6)) return T;
    } else if (i8.type === t5.ATTRIBUTE && o10.getAttribute(l6) === t7 + "") return T;
    return m3(i8), t7;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5D46J4QT.js
var SlSwitch = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasSlotController = new HasSlotController(this, "help-text");
    this.hasFocus = false;
    this.title = "";
    this.name = "";
    this.size = "medium";
    this.disabled = false;
    this.checked = false;
    this.defaultChecked = false;
    this.form = "";
    this.required = false;
    this.helpText = "";
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleInput() {
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleClick() {
    this.checked = !this.checked;
    this.emit("sl-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      this.emit("sl-change");
      this.emit("sl-input");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.formControlController.updateValidity();
  }
  handleDisabledChange() {
    this.formControlController.setValidity(true);
  }
  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return x`
      <div
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="base"
          class=${e8({
      switch: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
      "switch--focused": this.hasFocus,
      "switch--small": this.size === "small",
      "switch--medium": this.size === "medium",
      "switch--large": this.size === "large"
    })}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${o7(this.value)}
            .checked=${l5(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${hasHelpText ? "false" : "true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlSwitch.styles = [component_styles_default, form_control_styles_default, switch_styles_default];
__decorateClass([
  e6('input[type="checkbox"]')
], SlSwitch.prototype, "input", 2);
__decorateClass([
  r7()
], SlSwitch.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlSwitch.prototype, "title", 2);
__decorateClass([
  n5()
], SlSwitch.prototype, "name", 2);
__decorateClass([
  n5()
], SlSwitch.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], SlSwitch.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSwitch.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSwitch.prototype, "checked", 2);
__decorateClass([
  defaultValue("checked")
], SlSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  n5({ reflect: true })
], SlSwitch.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSwitch.prototype, "required", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlSwitch.prototype, "helpText", 2);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleDisabledChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R3NF57O3.js
var checkbox_styles_default = i`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AHFQSUH3.js
var SlCheckbox = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasSlotController = new HasSlotController(this, "help-text");
    this.hasFocus = false;
    this.title = "";
    this.name = "";
    this.size = "medium";
    this.disabled = false;
    this.checked = false;
    this.indeterminate = false;
    this.defaultChecked = false;
    this.form = "";
    this.required = false;
    this.helpText = "";
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.emit("sl-change");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleInput() {
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStateChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.formControlController.updateValidity();
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /**
   * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
   * the custom validation message, call this method with an empty string.
   */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return x`
      <div
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="base"
          class=${e8({
      checkbox: true,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate,
      "checkbox--small": this.size === "small",
      "checkbox--medium": this.size === "medium",
      "checkbox--large": this.size === "large"
    })}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${o7(this.value)}
            .indeterminate=${l5(this.indeterminate)}
            .checked=${l5(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked ? " control--checked" : ""}${this.indeterminate ? " control--indeterminate" : ""}"
            class="checkbox__control"
          >
            ${this.checked ? x`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                ` : ""}
            ${!this.checked && this.indeterminate ? x`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                ` : ""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${hasHelpText ? "false" : "true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlCheckbox.styles = [component_styles_default, form_control_styles_default, checkbox_styles_default];
SlCheckbox.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6('input[type="checkbox"]')
], SlCheckbox.prototype, "input", 2);
__decorateClass([
  r7()
], SlCheckbox.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "title", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "name", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], SlCheckbox.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "checked", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  defaultValue("checked")
], SlCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  n5({ reflect: true })
], SlCheckbox.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "required", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlCheckbox.prototype, "helpText", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleStateChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js
var input_styles_default = i`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NS24TQAP.js
var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.title = "";
    this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
    this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
  }
  //
  // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
  // can be set before the component is rendered.
  //
  /**
   * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
   */
  get valueAsDate() {
    var _a5;
    this.__dateInput.type = this.type;
    this.__dateInput.value = this.value;
    return ((_a5 = this.input) == null ? void 0 : _a5.valueAsDate) || this.__dateInput.valueAsDate;
  }
  set valueAsDate(newValue) {
    this.__dateInput.type = this.type;
    this.__dateInput.valueAsDate = newValue;
    this.value = this.__dateInput.value;
  }
  /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
  get valueAsNumber() {
    var _a5;
    this.__numberInput.value = this.value;
    return ((_a5 = this.input) == null ? void 0 : _a5.valueAsNumber) || this.__numberInput.valueAsNumber;
  }
  set valueAsNumber(newValue) {
    this.__numberInput.valueAsNumber = newValue;
    this.value = this.__numberInput.value;
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.emit("sl-clear");
      this.emit("sl-input");
      this.emit("sl-change");
    }
    this.input.focus();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.formControlController.updateValidity();
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formControlController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
    return x`
      <div
        part="form-control"
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e8({
      input: true,
      // Sizes
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      // States
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o7(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o7(this.placeholder)}
              minlength=${o7(this.minlength)}
              maxlength=${o7(this.maxlength)}
              min=${o7(this.min)}
              max=${o7(this.max)}
              step=${o7(this.step)}
              .value=${l5(this.value)}
              autocapitalize=${o7(this.autocapitalize)}
              autocomplete=${o7(this.autocomplete)}
              autocorrect=${o7(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o7(this.pattern)}
              enterkeyhint=${o7(this.enterkeyhint)}
              inputmode=${o7(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? x`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? x`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? x`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : x`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
SlInput.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  r7()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlInput.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass([
  n5()
], SlInput.prototype, "name", 2);
__decorateClass([
  n5()
], SlInput.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass([
  n5()
], SlInput.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass([
  n5({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  n5()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass([
  n5({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass([
  n5({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass([
  n5({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  n5()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  n5({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  n5({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  n5()
], SlInput.prototype, "min", 2);
__decorateClass([
  n5()
], SlInput.prototype, "max", 2);
__decorateClass([
  n5()
], SlInput.prototype, "step", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocorrect", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocomplete", 2);
__decorateClass([
  n5({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass([
  n5()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n5({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass([
  n5()
], SlInput.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);

// widgets/src/assets/icons.ts
var trash = x` <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    class="bi bi-trash"
    viewBox="0 0 16 16"
>
    <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
    />
    <path
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
    />
</svg>`;

// widgets/webwriter-logic-circuit.ts
var workspaceWidth = 3e3;
var workspaceHeight = 2e3;
var workspaceOffsetX = -workspaceWidth / 2;
var workspaceOffsetY = -workspaceHeight / 2;
var _simCheckbox_dec, _wsDrag_dec, _workspaceContainer_dec, _svgCanvas_dec, _endConnector_dec, _startConnector_dec, _isDrawingLine_dec, _isDragging_dec, _splitterAllowed_dec, _xorGateAllowed_dec, _xnorGateAllowed_dec, _norGateAllowed_dec, _nandGateAllowed_dec, _orGateAllowed_dec, _andGateAllowed_dec, _notGateAllowed_dec, _allowSimulation_dec, _simulate_dec, _dragStartY_dec, _dragStartX_dec, _zoom_dec, _lineID_dec, _gateID_dec, _reflectCons_dec, _reflectGates_dec, _gateElements_dec, _lineElements_dec, _a4, _LogicCircuit_decorators, _init4, _lineElements, _gateElements, _reflectGates, _reflectCons, _gateID, _lineID, _zoom, _dragStartX, _dragStartY, _simulate, _allowSimulation, _notGateAllowed, _andGateAllowed, _orGateAllowed, _nandGateAllowed, _norGateAllowed, _xnorGateAllowed, _xorGateAllowed, _splitterAllowed, _isDragging, _isDrawingLine, _startConnector, _endConnector, _svgCanvas, _workspaceContainer, _wsDrag, _simCheckbox;
_LogicCircuit_decorators = [t4("webwriter-logic-circuit")];
var LogicCircuit = class extends (_a4 = LitElementWw, _lineElements_dec = [n5({ type: Array })], _gateElements_dec = [n5({ type: Array })], _reflectGates_dec = [n5({ type: String, reflect: true })], _reflectCons_dec = [n5({ type: String, reflect: true })], _gateID_dec = [n5({ type: Number })], _lineID_dec = [n5({ type: Number })], _zoom_dec = [n5({ type: Number })], _dragStartX_dec = [n5({ type: Number })], _dragStartY_dec = [n5({ type: Number })], _simulate_dec = [n5({ type: Boolean })], _allowSimulation_dec = [n5({ type: Number, attribute: true, reflect: true })], _notGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _andGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _orGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _nandGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _norGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _xnorGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _xorGateAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _splitterAllowed_dec = [n5({ type: Number, attribute: true, reflect: true })], _isDragging_dec = [n5({ type: Boolean })], _isDrawingLine_dec = [r7()], _startConnector_dec = [r7()], _endConnector_dec = [r7()], _svgCanvas_dec = [e6("#svgCanvas")], _workspaceContainer_dec = [e6("#workspace")], _wsDrag_dec = [e6("#workspaceDraggable")], _simCheckbox_dec = [e6("#simCheckbox")], _a4) {
  constructor() {
    super(...arguments);
    __privateAdd(this, _lineElements, __runInitializers(_init4, 8, this, [])), __runInitializers(_init4, 11, this);
    __privateAdd(this, _gateElements, __runInitializers(_init4, 12, this, [])), __runInitializers(_init4, 15, this);
    __privateAdd(this, _reflectGates, __runInitializers(_init4, 16, this, "")), __runInitializers(_init4, 19, this);
    __privateAdd(this, _reflectCons, __runInitializers(_init4, 20, this, "")), __runInitializers(_init4, 23, this);
    __privateAdd(this, _gateID, __runInitializers(_init4, 24, this, 0)), __runInitializers(_init4, 27, this);
    __privateAdd(this, _lineID, __runInitializers(_init4, 28, this, 0)), __runInitializers(_init4, 31, this);
    __privateAdd(this, _zoom, __runInitializers(_init4, 32, this, 1)), __runInitializers(_init4, 35, this);
    __privateAdd(this, _dragStartX, __runInitializers(_init4, 36, this, 0)), __runInitializers(_init4, 39, this);
    __privateAdd(this, _dragStartY, __runInitializers(_init4, 40, this, 0)), __runInitializers(_init4, 43, this);
    __privateAdd(this, _simulate, __runInitializers(_init4, 44, this, false)), __runInitializers(_init4, 47, this);
    __privateAdd(this, _allowSimulation, __runInitializers(_init4, 48, this, 1)), __runInitializers(_init4, 51, this);
    __privateAdd(this, _notGateAllowed, __runInitializers(_init4, 52, this, -1)), __runInitializers(_init4, 55, this);
    __privateAdd(this, _andGateAllowed, __runInitializers(_init4, 56, this, -1)), __runInitializers(_init4, 59, this);
    __privateAdd(this, _orGateAllowed, __runInitializers(_init4, 60, this, -1)), __runInitializers(_init4, 63, this);
    __privateAdd(this, _nandGateAllowed, __runInitializers(_init4, 64, this, -1)), __runInitializers(_init4, 67, this);
    __privateAdd(this, _norGateAllowed, __runInitializers(_init4, 68, this, -1)), __runInitializers(_init4, 71, this);
    __privateAdd(this, _xnorGateAllowed, __runInitializers(_init4, 72, this, -1)), __runInitializers(_init4, 75, this);
    __privateAdd(this, _xorGateAllowed, __runInitializers(_init4, 76, this, -1)), __runInitializers(_init4, 79, this);
    __privateAdd(this, _splitterAllowed, __runInitializers(_init4, 80, this, -1)), __runInitializers(_init4, 83, this);
    __privateAdd(this, _isDragging, __runInitializers(_init4, 84, this, false)), __runInitializers(_init4, 87, this);
    __privateAdd(this, _isDrawingLine, __runInitializers(_init4, 88, this, false)), __runInitializers(_init4, 91, this);
    __privateAdd(this, _startConnector, __runInitializers(_init4, 92, this, null)), __runInitializers(_init4, 95, this);
    __privateAdd(this, _endConnector, __runInitializers(_init4, 96, this, null)), __runInitializers(_init4, 99, this);
    __privateAdd(this, _svgCanvas, __runInitializers(_init4, 100, this)), __runInitializers(_init4, 103, this);
    __privateAdd(this, _workspaceContainer, __runInitializers(_init4, 104, this)), __runInitializers(_init4, 107, this);
    __privateAdd(this, _wsDrag, __runInitializers(_init4, 108, this)), __runInitializers(_init4, 111, this);
    __privateAdd(this, _simCheckbox, __runInitializers(_init4, 112, this)), __runInitializers(_init4, 115, this);
    __publicField(this, "getGateElements", () => this.gateElements);
    __publicField(this, "getLineElements", () => this.lineElements);
    __publicField(this, "svgPathToMouse", null);
  }
  static get scopedElements() {
    return {
      "not-gate": NOTGate,
      "and-gate": ANDGate,
      "input-gate": Input,
      "nand-gate": NANDGate,
      "nor-gate": NORGate,
      "or-gate": ORGate,
      "output-gate": Output,
      "xnor-gate": XNORGate,
      "xor-gate": XORGate,
      "splitter-gate": Splitter,
      "connector-element": ConnectorElement,
      "sl-button": SlButton,
      "sl-button-group": SlButtonGroup,
      "sl-icon-button": SlIconButton,
      "sl-icon": SlIcon,
      "sl-tooltip": SlTooltip,
      "sl-popup": SlPopup,
      "sl-switch": SlSwitch,
      "sl-menu": SlMenu,
      "sl-menu-item": SlMenuItem,
      "sl-checkbox": SlCheckbox,
      "sl-input": SlInput
    };
  }
  render() {
    return x`
            <div class="container">
                <div class="sidebar">
                    <div style=${this.notGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <not-gate></not-gate>
                        <p class="sidebar-counter">${gateCounter(this, "NOT")}</p>
                    </div>

                    <div style=${this.andGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <and-gate></and-gate>
                        <p class="sidebar-counter">${gateCounter(this, "AND")}</p>
                    </div>

                    <div style=${this.orGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <or-gate></or-gate>
                        <p class="sidebar-counter">${gateCounter(this, "OR")}</p>
                    </div>

                    <div style=${this.nandGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <nand-gate></nand-gate>
                        <p class="sidebar-counter">${gateCounter(this, "NAND")}</p>
                    </div>

                    <div style=${this.norGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <nor-gate></nor-gate>
                        <p class="sidebar-counter">${gateCounter(this, "NOR")}</p>
                    </div>

                    <div style=${this.xnorGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <xnor-gate></xnor-gate>
                        <p class="sidebar-counter">${gateCounter(this, "XNOR")}</p>
                    </div>

                    <div style=${this.xorGateAllowed === 0 ? "display: none;" : ""} class="sidebar-item">
                        <xor-gate></xor-gate>
                        <p class="sidebar-counter">${gateCounter(this, "XOR")}</p>
                    </div>

                    <splitter-gate></splitter-gate>
                    <input-gate></input-gate>
                    <output-gate></output-gate>
                </div>

                <div class="workspaceContainer" id="workspace">
                    <sl-checkbox id="simCheckbox" class="simulateCheckbox" @sl-change=${() => this.simulateCircuit()}
                        >Simulate</sl-checkbox
                    >

                    <sl-switch class="flipSwitch" id="switch" @sl-change=${() => this.handleFlipAllGates()}
                        >Show all Truthtables</sl-switch
                    >

                    <div class="trashCanIcon" style="font-size: 35px;">${trash}</div>

                    <div class="workspaceArea" id="workspaceDraggable">
                        <svg class="svgArea" id="svgCanvas"></svg>
                    </div>
                </div>
            </div>

            <div part="options" class="optionsMenu">
                <sl-checkbox class="optionsCheckbox" @sl-change=${() => this.handleAllowSimulation()} checked
                    >Allow Simulation</sl-checkbox
                >
                <p></p>
                <p>Limit max. number of Gates:</p>

                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "notGateAllowed")}
                        .value=${this.notGateAllowed >= 0 ? this.notGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>NOT-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "andGateAllowed")}
                        .value=${this.andGateAllowed >= 0 ? this.andGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>AND-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "orGateAllowed")}
                        .value=${this.orGateAllowed >= 0 ? this.orGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>OR-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "nandGateAllowed")}
                        .value=${this.nandGateAllowed >= 0 ? this.nandGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>NAND-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "norGateAllowed")}
                        .value=${this.norGateAllowed >= 0 ? this.norGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>NOR-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "xnorGateAllowed")}
                        .value=${this.xnorGateAllowed >= 0 ? this.xnorGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>XNOR-Gates</p>
                </div>
                <div class="optionsItem">
                    <sl-input
                        class="optionsCheckbox"
                        type="number"
                        size="small"
                        @sl-change=${(e12) => this.handleInputChange(e12, "xorGateAllowed")}
                        .value=${this.xorGateAllowed >= 0 ? this.xorGateAllowed : ""}
                        min="0"
                    ></sl-input>
                    <p>XOR-Gates</p>
                </div>
            </div>
        `;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("allowSimulation")) {
      if (this.allowSimulation === 1) {
        this.simCheckbox.style.display = "block";
      } else {
        this.simCheckbox.style.display = "none";
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("contextmenu", this.handleContextMenu);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("mousemove", this.handleMouseMove);
    this.removeEventListener("mouseup", this.handleMouseUp);
  }
  firstUpdated() {
    this.workspaceContainer.addEventListener("drop", this.handleDrop.bind(this));
    this.workspaceContainer.addEventListener("dragover", this.handleDragOver.bind(this));
    this.workspaceContainer.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.workspaceContainer.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.workspaceContainer.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.workspaceContainer.addEventListener("mouseout", this.handleMouseOut.bind(this));
    this.workspaceContainer.addEventListener("wheel", this.handleWheel.bind(this));
    this.wsDrag.style.width = workspaceWidth + "px";
    this.wsDrag.style.height = workspaceHeight + "px";
    this.wsDrag.style.transform = `translate(${workspaceOffsetX}px,${workspaceOffsetY}px) scale(${this.zoom})`;
    this.svgPathToMouse = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.svgPathToMouse.setAttribute("d", "");
    this.svgPathToMouse.setAttribute("stroke", "black");
    this.svgPathToMouse.setAttribute("fill", "none");
    this.svgPathToMouse.setAttribute("stroke-width", "3");
    this.svgPathToMouse.setAttribute("id", "lineToMouse");
    this.svgCanvas.appendChild(this.svgPathToMouse);
    if (this.reflectGates.length > 0) {
      this.reflectGates.split(",").forEach((gate) => {
        addGate(this, null, gate.split("|").splice(1));
      });
    }
    if (this.reflectCons.length > 0) {
      this.reflectCons.split(",").forEach((con) => {
        let startID = con.split("|")[0];
        let endID = con.split("|")[1];
        let start, end;
        this.shadowRoot.querySelector(".workspaceArea").childNodes.forEach((node) => {
          if (node.nodeName.includes("GATE")) {
            setTimeout(() => {
              if (startID.includes(node.shadowRoot.querySelector("div").id)) {
                let gate = node.shadowRoot.querySelector("div");
                let connectorArr = gate.querySelectorAll("slot");
                connectorArr.forEach((slot) => {
                  if (slot.children[0].id === startID) {
                    start = slot.childNodes.item(0);
                  }
                });
              }
              if (endID.includes(node.shadowRoot.querySelector("div").id)) {
                let gate = node.shadowRoot.querySelector("div");
                let connectorArr = gate.querySelectorAll("slot");
                connectorArr.forEach((slot) => {
                  if (slot.children[0].id === endID) {
                    end = slot.childNodes.item(0);
                  }
                });
              }
              createLine(this, start, end);
            }, 1);
          }
        });
      });
    }
  }
  handleAllowSimulation() {
    if (this.allowSimulation === 0) {
      this.resetCircuit();
      this.simCheckbox.checked = false;
      this.allowSimulation = 1;
    } else {
      this.allowSimulation = 0;
    }
  }
  handleFlipAllGates() {
    if (this.shadowRoot.getElementById("switch").checked === false) {
      this.gateElements.forEach((gate) => {
        if (gate.gatetype !== "INPUT" && gate.gatetype !== "OUTPUT") {
          gate.shadowRoot.getElementById("flipCheckbox").checked = false;
          gate.showTruthTable = false;
        }
      });
    } else {
      this.gateElements.forEach((gate) => {
        if (gate.gatetype !== "INPUT" && gate.gatetype !== "OUTPUT") {
          gate.shadowRoot.getElementById("flipCheckbox").checked = true;
          gate.showTruthTable = true;
        }
      });
    }
  }
  handleMouseDown(event) {
    if (event.target === this.svgCanvas) {
      this.isDragging = true;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      if (this.isDrawingLine) {
        this.isDrawingLine = false;
        this.startConnector = null;
        this.svgPathToMouse.setAttribute("d", "");
      }
      this.gateElements.forEach((gate) => {
        gate.hideContextMenu();
      });
    }
  }
  handleMouseMove(event) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;
      workspaceOffsetX = workspaceOffsetX + deltaX;
      workspaceOffsetY = workspaceOffsetY + deltaY;
      this.calculateBoundaries();
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.transformWorkspace();
    }
    if (this.isDrawingLine) {
      const { x: startX, y: startY } = getConnectorCoordinates(this.svgCanvas, this.startConnector, this.zoom);
      const { x: endX, y: endY } = getMouseCoordinates(
        this.svgCanvas,
        event.clientX,
        event.clientY - 4,
        this.zoom
      );
      let path;
      if (this.startConnector.type === "output") {
        path = `M ${startX} ${startY}`;
      } else {
        path = `M ${endX} ${endY}`;
      }
      const points = calculatePathToMouse(this.svgCanvas, this.startConnector, this.zoom, endX, endY);
      for (let i8 = 1; i8 < points.length; i8++) {
        path += ` L ${points[i8].x} ${points[i8].y}`;
      }
      this.svgPathToMouse.setAttribute("d", path);
    }
  }
  transformWorkspace() {
    const workspace = this.wsDrag;
    workspace.style.transform = `translate(${workspaceOffsetX}px,${workspaceOffsetY}px) scale(${this.zoom})`;
  }
  handleMouseUp() {
    this.isDragging = false;
  }
  handleWheel(event) {
    event.preventDefault();
    this.gateElements.forEach((gate) => {
      gate.hideContextMenu();
    });
    const delta = event.deltaY;
    this.zoom -= delta * 1e-3;
    this.zoom = Math.min(Math.max(this.zoom, 0.5), 2.5);
    this.transformWorkspace();
    this.calculateBoundaries();
    this.transformWorkspace();
  }
  handleMouseOut(event) {
    updateLines(this, Gate.movedGate);
    this.isDragging = false;
  }
  handleContextMenu(event) {
    event.preventDefault();
  }
  handleDragOver(event) {
    event.preventDefault();
    const draggedGate = Gate.movedGate;
    const mouseStartX = Gate.x;
    const mouseStartY = Gate.y;
    let deltaX = (event.clientX - mouseStartX) / this.zoom;
    let deltaY = (event.clientY - mouseStartY) / this.zoom;
    const moveLines = [];
    this.lineElements.forEach((lineObject) => {
      const startConnector = lineObject.start;
      const endConnector = lineObject.end;
      if (startConnector.id === draggedGate.conIn1?.id || startConnector.id === draggedGate.conIn2?.id || startConnector.id === draggedGate.conOut?.id || startConnector.id === draggedGate.conOut2?.id || endConnector.id === draggedGate.conIn1?.id || endConnector.id === draggedGate.conIn2?.id || endConnector.id === draggedGate.conOut?.id || endConnector.id === draggedGate.conOut2?.id) {
        moveLines.push(lineObject);
      }
    });
    moveLines.forEach((line) => {
      const startConnector = line.start;
      const endConnector = line.end;
      const svgPath = line.lineSVG;
      let points;
      if (startConnector.id === draggedGate.conIn1?.id || startConnector.id === draggedGate.conIn2?.id || startConnector.id === draggedGate.conOut?.id || startConnector.id === draggedGate.conOut2?.id) {
        points = calculatePath(this.svgCanvas, startConnector, endConnector, this.zoom, deltaX, deltaY, 0, 0);
      } else {
        points = calculatePath(this.svgCanvas, startConnector, endConnector, this.zoom, 0, 0, deltaX, deltaY);
      }
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i8 = 1; i8 < points.length; i8++) {
        path += ` L ${points[i8].x} ${points[i8].y}`;
      }
      svgPath.setAttribute("d", path);
    });
    const isOverTrash = isDropOverTrashIcon(this, event);
    if (isOverTrash) {
      this.workspaceContainer.querySelector(".trashCanIcon").classList.add("trashCanIconDragOver");
    } else {
      this.workspaceContainer.querySelector(".trashCanIcon").classList.remove("trashCanIconDragOver");
    }
  }
  handleDrop(event) {
    event.preventDefault();
    const isOverTrash = isDropOverTrashIcon(this, event);
    if (event.dataTransfer.getData("movable") === "false") {
      if (!isOverTrash) {
        addGate(this, event);
      }
    } else if (event.dataTransfer.getData("movable") === "true") {
      const id = event.dataTransfer.getData("id");
      const gateToMove = this.gateElements.find((gate) => gate.id === id);
      if (isOverTrash) {
        this.handleDropTrashCan(event);
      } else {
        moveGate(this, event);
      }
    }
    this.workspaceContainer.querySelector(".trashCanIcon").classList.remove("trashCanIconDragOver");
  }
  handleDropTrashCan(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const trashGate = this.gateElements.find((gate) => gate.id === id);
    trashGate.deleteGate();
  }
  handleInputChange(event, propertyName) {
    const inputValue = parseInt(event.target.value);
    if (isNaN(inputValue) || inputValue < 0 || event.target.value.trim() === "") {
      this[propertyName] = -1;
    } else {
      this[propertyName] = inputValue;
    }
  }
  simulateCircuit() {
    const simCheckbox = this.simCheckbox;
    if (simCheckbox.checked) {
      this.simulate = true;
      this.resetCircuit();
      const inputGates = this.gateElements?.filter((gate) => gate.gatetype === "INPUT");
      inputGates.forEach((gate) => {
        gate.calculateOutput();
        gate.updateConnectorColor();
        transferOutputToNextGate(this, gate);
      });
    } else {
      this.simulate = false;
      this.resetCircuit();
    }
  }
  resetCircuit() {
    resetGates(this);
    resetLines(this);
    this.requestUpdate();
  }
  calculateBoundaries() {
    if (workspaceOffsetX > (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 + 2) {
      workspaceOffsetX = (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 + 2;
    }
    if (workspaceOffsetY > (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 + 2) {
      workspaceOffsetY = (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 + 2;
    }
    if (workspaceOffsetX < -this.wsDrag.getBoundingClientRect().width + this.workspaceContainer.getBoundingClientRect().width + (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 - 2) {
      workspaceOffsetX = -this.wsDrag.getBoundingClientRect().width + this.workspaceContainer.getBoundingClientRect().width + (this.wsDrag.getBoundingClientRect().width - workspaceWidth) / 2 - 2;
    }
    if (workspaceOffsetY < -this.wsDrag.getBoundingClientRect().height + this.workspaceContainer.getBoundingClientRect().height + (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 - 2) {
      workspaceOffsetY = -this.wsDrag.getBoundingClientRect().height + this.workspaceContainer.getBoundingClientRect().height + (this.wsDrag.getBoundingClientRect().height - workspaceHeight) / 2 - 2;
    }
  }
};
_init4 = __decoratorStart(_a4);
_lineElements = new WeakMap();
_gateElements = new WeakMap();
_reflectGates = new WeakMap();
_reflectCons = new WeakMap();
_gateID = new WeakMap();
_lineID = new WeakMap();
_zoom = new WeakMap();
_dragStartX = new WeakMap();
_dragStartY = new WeakMap();
_simulate = new WeakMap();
_allowSimulation = new WeakMap();
_notGateAllowed = new WeakMap();
_andGateAllowed = new WeakMap();
_orGateAllowed = new WeakMap();
_nandGateAllowed = new WeakMap();
_norGateAllowed = new WeakMap();
_xnorGateAllowed = new WeakMap();
_xorGateAllowed = new WeakMap();
_splitterAllowed = new WeakMap();
_isDragging = new WeakMap();
_isDrawingLine = new WeakMap();
_startConnector = new WeakMap();
_endConnector = new WeakMap();
_svgCanvas = new WeakMap();
_workspaceContainer = new WeakMap();
_wsDrag = new WeakMap();
_simCheckbox = new WeakMap();
__decorateElement(_init4, 4, "lineElements", _lineElements_dec, LogicCircuit, _lineElements);
__decorateElement(_init4, 4, "gateElements", _gateElements_dec, LogicCircuit, _gateElements);
__decorateElement(_init4, 4, "reflectGates", _reflectGates_dec, LogicCircuit, _reflectGates);
__decorateElement(_init4, 4, "reflectCons", _reflectCons_dec, LogicCircuit, _reflectCons);
__decorateElement(_init4, 4, "gateID", _gateID_dec, LogicCircuit, _gateID);
__decorateElement(_init4, 4, "lineID", _lineID_dec, LogicCircuit, _lineID);
__decorateElement(_init4, 4, "zoom", _zoom_dec, LogicCircuit, _zoom);
__decorateElement(_init4, 4, "dragStartX", _dragStartX_dec, LogicCircuit, _dragStartX);
__decorateElement(_init4, 4, "dragStartY", _dragStartY_dec, LogicCircuit, _dragStartY);
__decorateElement(_init4, 4, "simulate", _simulate_dec, LogicCircuit, _simulate);
__decorateElement(_init4, 4, "allowSimulation", _allowSimulation_dec, LogicCircuit, _allowSimulation);
__decorateElement(_init4, 4, "notGateAllowed", _notGateAllowed_dec, LogicCircuit, _notGateAllowed);
__decorateElement(_init4, 4, "andGateAllowed", _andGateAllowed_dec, LogicCircuit, _andGateAllowed);
__decorateElement(_init4, 4, "orGateAllowed", _orGateAllowed_dec, LogicCircuit, _orGateAllowed);
__decorateElement(_init4, 4, "nandGateAllowed", _nandGateAllowed_dec, LogicCircuit, _nandGateAllowed);
__decorateElement(_init4, 4, "norGateAllowed", _norGateAllowed_dec, LogicCircuit, _norGateAllowed);
__decorateElement(_init4, 4, "xnorGateAllowed", _xnorGateAllowed_dec, LogicCircuit, _xnorGateAllowed);
__decorateElement(_init4, 4, "xorGateAllowed", _xorGateAllowed_dec, LogicCircuit, _xorGateAllowed);
__decorateElement(_init4, 4, "splitterAllowed", _splitterAllowed_dec, LogicCircuit, _splitterAllowed);
__decorateElement(_init4, 4, "isDragging", _isDragging_dec, LogicCircuit, _isDragging);
__decorateElement(_init4, 4, "isDrawingLine", _isDrawingLine_dec, LogicCircuit, _isDrawingLine);
__decorateElement(_init4, 4, "startConnector", _startConnector_dec, LogicCircuit, _startConnector);
__decorateElement(_init4, 4, "endConnector", _endConnector_dec, LogicCircuit, _endConnector);
__decorateElement(_init4, 4, "svgCanvas", _svgCanvas_dec, LogicCircuit, _svgCanvas);
__decorateElement(_init4, 4, "workspaceContainer", _workspaceContainer_dec, LogicCircuit, _workspaceContainer);
__decorateElement(_init4, 4, "wsDrag", _wsDrag_dec, LogicCircuit, _wsDrag);
__decorateElement(_init4, 4, "simCheckbox", _simCheckbox_dec, LogicCircuit, _simCheckbox);
LogicCircuit = __decorateElement(_init4, 0, "LogicCircuit", _LogicCircuit_decorators, LogicCircuit);
__publicField(LogicCircuit, "shadowRootOptions", {
  ...LitElementWw.shadowRootOptions,
  delegatesFocus: true
});
__publicField(LogicCircuit, "styles", Styles);
__runInitializers(_init4, 1, LogicCircuit);
export {
  LogicCircuit as default
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@webwriter/lit/index.js:
  (*! Bundled license information:
  
  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/custom-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/property.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/state.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/event-options.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/base.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-all.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-async.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-elements.js:
    (**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-nodes.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
