import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, ref, onMounted, createTextVNode, watch, onUnmounted, inject, provide, createSSRApp, h as h$1 } from "vue";
import { usePage, Link, Head, createInertiaApp } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot } from "vue/server-renderer";
import { useStore, createStore } from "vuex";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faCog, faIndustry, faBook, faPencilAlt, faBookmark, faCube, faSync, faFolder, faLink, faShareAlt, faGlobe, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithub, faYoutube, faLinkedin, faMedium, faTwitter, faTiktok, faPinterest } from "@fortawesome/free-brands-svg-icons";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
}(), l = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(o2);
  let r2 = e2;
  return s(e2) && !s(o2) && (r2 = function(t3, e3) {
    const o3 = e3 && e3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (let e4 = 0; e4 < t3.length; ++e4) void 0 !== t3[e4] && (o3[e4] = t3[e4]);
    return o3;
  }(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, r2);
}, c = 1024, a = function(t3, e2) {
  return [].concat(t3, e2);
}, f = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, p = Object.prototype.hasOwnProperty, y = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, d = Array.isArray, h = Array.prototype.push, b = function(t3, e2) {
  h.apply(t3, d(e2) ? e2 : [e2]);
}, m = Date.prototype.toISOString, g = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += c) {
    const e3 = i2.length >= c ? i2.slice(t4, t4 + c) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = u[n3] : n3 < 2048 ? o3[o3.length] = u[192 | n3 >> 6] + u[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = u[224 | n3 >> 12] + u[128 | n3 >> 6 & 63] + u[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = u[240 | n3 >> 18] + u[128 | n3 >> 12 & 63] + u[128 | n3 >> 6 & 63] + u[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return m.call(t3);
}, skipNulls: false, strictNullHandling: false }, w = {}, v = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, p2, y2, h2, m2, j2, $2, E2) {
  let O2 = t3, T2 = E2, R2 = 0, S2 = false;
  for (; void 0 !== (T2 = T2.get(w)) && !S2; ) {
    const e3 = T2.get(t3);
    if (R2 += 1, void 0 !== e3) {
      if (e3 === R2) throw new RangeError("Cyclic object value");
      S2 = true;
    }
    void 0 === T2.get(w) && (R2 = 0);
  }
  if ("function" == typeof c2 ? O2 = c2(e2, O2) : O2 instanceof Date ? O2 = y2(O2) : "comma" === o2 && d(O2) && (O2 = f(O2, function(t4) {
    return t4 instanceof Date ? y2(t4) : t4;
  })), null === O2) {
    if (i2) return l2 && !j2 ? l2(e2, g.encoder, $2, "key", h2) : e2;
    O2 = "";
  }
  if ("string" == typeof (I2 = O2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  }(O2)) return l2 ? [m2(j2 ? e2 : l2(e2, g.encoder, $2, "key", h2)) + "=" + m2(l2(O2, g.encoder, $2, "value", h2))] : [m2(e2) + "=" + m2(String(O2))];
  var I2;
  const A2 = [];
  if (void 0 === O2) return A2;
  let D2;
  if ("comma" === o2 && d(O2)) j2 && l2 && (O2 = f(O2, l2)), D2 = [{ value: O2.length > 0 ? O2.join(",") || null : void 0 }];
  else if (d(c2)) D2 = c2;
  else {
    const t4 = Object.keys(O2);
    D2 = a2 ? t4.sort(a2) : t4;
  }
  const _2 = u2 ? e2.replace(/\./g, "%2E") : e2, k = n2 && d(O2) && 1 === O2.length ? _2 + "[]" : _2;
  if (r2 && d(O2) && 0 === O2.length) return k + "[]";
  for (let e3 = 0; e3 < D2.length; ++e3) {
    const f2 = D2[e3], g2 = "object" == typeof f2 && void 0 !== f2.value ? f2.value : O2[f2];
    if (s2 && null === g2) continue;
    const T3 = p2 && u2 ? f2.replace(/\./g, "%2E") : f2, S3 = d(O2) ? "function" == typeof o2 ? o2(k, T3) : k : k + (p2 ? "." + T3 : "[" + T3 + "]");
    E2.set(t3, R2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(w, E2), b(A2, v(g2, S3, o2, n2, r2, i2, s2, u2, "comma" === o2 && j2 && d(O2) ? null : l2, c2, a2, p2, y2, h2, m2, j2, $2, I3));
  }
  return A2;
}, j = Object.prototype.hasOwnProperty, $ = Array.isArray, E = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, T = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, R = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && j.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let c2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && c2 < o2.depth; ) {
    if (c2 += 1, !o2.plainObjects && j.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : T(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = o3.allowEmptyArrays && "" === r3 ? [] : [].concat(r3);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  }(l2, e2, o2, n2);
};
function S(t3, e2) {
  const o2 = /* @__PURE__ */ function(t4) {
    return E;
  }();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, p2;
      -1 === l2 ? (c2 = e3.decoder(t5, E.decoder, s2, "key"), p2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), E.decoder, s2, "key"), p2 = f(T(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, E.decoder, s2, "value");
      })), p2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (p2 = O(p2)), t5.indexOf("[]=") > -1 && (p2 = $(p2) ? [p2] : p2);
      const y2 = j.call(o3, c2);
      y2 && "combine" === e3.duplicates ? o3[c2] = a(o3[c2], p2) : y2 && "last" !== e3.duplicates || (o3[c2] = p2);
    }
    return o3;
  }(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = R(s2, n2[s2], o2, "string" == typeof t3);
    r2 = l(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    }(e3), t4;
  }(r2);
}
class I {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: S(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class A extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new I(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + function(t3, e3) {
      let o2 = t3;
      const i2 = function(t4) {
        if (!t4) return g;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || g.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!p.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = g.filter;
        if (("function" == typeof t4.filter || d(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in y ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : g.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : g.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || g.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : g.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : g.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? g.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : g.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : g.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : g.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : g.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : g.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : g.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : g.strictNullHandling };
      }(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : d(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = y[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || b(l2, v(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const h2 = l2.join(i2.delimiter);
      let m2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (m2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? m2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new I(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new I(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      if (!i2.hasOwnProperty(o2[r2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
        o2[r2] = "id";
      }
      return t({}, e3, { [r2]: i2[o2[r2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function D(t3, e2, o2, n2) {
  const r2 = new A(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const _ = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => D(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "mr-2 h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/GoBack.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const GoBackSvg = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$7 = {
  __name: "NavItem",
  __ssrInlineRender: true,
  props: {
    href: String,
    icon: [String, Array],
    label: String,
    external: Boolean,
    isCompact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const dynamicIcon = computed(() => {
      return Array.isArray(props.icon) ? props.icon : props.icon;
    });
    const page = usePage();
    const currentUrl = computed(() => page.url);
    const isActive = computed(() => {
      const isRoot = props.href === "/";
      return isRoot ? currentUrl.value === props.href : currentUrl.value.startsWith(props.href);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: ["flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium", {
          "bg-accent text-accent-foreground": isActive.value,
          "text-foreground hover:bg-accent hover:text-accent-foreground": !isActive.value,
          "justify-center px-2": __props.isCompact
        }],
        title: __props.isCompact ? __props.label : ""
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ "mx-auto gap-0": __props.isCompact, "gap-3": !__props.isCompact }, "flex items-center"])}" data-v-1a823181${_scopeId}><div class="flex h-5 w-5 flex-shrink-0 items-center justify-center" data-v-1a823181${_scopeId}>`);
            if (__props.icon === "home") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "grid") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "lock") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "trash") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "speech") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "user-plus") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "book-open") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "user") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "volume-up") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "chart-bar") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "search") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-pencil") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-book") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-globe") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-sync") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-project-diagram") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-cogs") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-1a823181${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-tools") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-1a823181${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-laptop-code") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-photo-video") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-bookmark") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-share-alt") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-language") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-chalkboard-teacher") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-user-circle") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1a823181${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1a823181${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-1a823181${_scopeId}></path></svg>`);
            } else {
              _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
                icon: dynamicIcon.value,
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div class="${ssrRenderClass([{ "w-0 opacity-0": __props.isCompact, "w-auto opacity-100": !__props.isCompact }, "overflow-hidden"])}" data-v-1a823181${_scopeId}><span class="whitespace-nowrap text-sm font-medium" data-v-1a823181${_scopeId}>${ssrInterpolate(__props.label)}</span></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["flex items-center", { "mx-auto gap-0": __props.isCompact, "gap-3": !__props.isCompact }]
              }, [
                createVNode("div", { class: "flex h-5 w-5 flex-shrink-0 items-center justify-center" }, [
                  __props.icon === "home" ? (openBlock(), createBlock("svg", {
                    key: 0,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    })
                  ])) : __props.icon === "grid" ? (openBlock(), createBlock("svg", {
                    key: 1,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    })
                  ])) : __props.icon === "lock" ? (openBlock(), createBlock("svg", {
                    key: 2,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    })
                  ])) : __props.icon === "trash" ? (openBlock(), createBlock("svg", {
                    key: 3,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ])) : __props.icon === "speech" ? (openBlock(), createBlock("svg", {
                    key: 4,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    })
                  ])) : __props.icon === "user-plus" ? (openBlock(), createBlock("svg", {
                    key: 5,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    })
                  ])) : __props.icon === "users" ? (openBlock(), createBlock("svg", {
                    key: 6,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    })
                  ])) : __props.icon === "book-open" ? (openBlock(), createBlock("svg", {
                    key: 7,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ])) : __props.icon === "palette" ? (openBlock(), createBlock("svg", {
                    key: 8,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    })
                  ])) : __props.icon === "user" ? (openBlock(), createBlock("svg", {
                    key: 9,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    })
                  ])) : __props.icon === "volume-up" ? (openBlock(), createBlock("svg", {
                    key: 10,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    })
                  ])) : __props.icon === "chart-bar" ? (openBlock(), createBlock("svg", {
                    key: 11,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    })
                  ])) : __props.icon === "search" ? (openBlock(), createBlock("svg", {
                    key: 12,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-pencil" ? (openBlock(), createBlock("svg", {
                    key: 13,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ])) : __props.icon === "fa-solid fa-book" ? (openBlock(), createBlock("svg", {
                    key: 14,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ])) : __props.icon === "fa-solid fa-globe" ? (openBlock(), createBlock("svg", {
                    key: 15,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-sync" ? (openBlock(), createBlock("svg", {
                    key: 16,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ])) : __props.icon === "fa-solid fa-project-diagram" ? (openBlock(), createBlock("svg", {
                    key: 17,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    })
                  ])) : __props.icon === "fa-solid fa-users" ? (openBlock(), createBlock("svg", {
                    key: 18,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-cogs" ? (openBlock(), createBlock("svg", {
                    key: 19,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-tools" ? (openBlock(), createBlock("svg", {
                    key: 20,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-laptop-code" ? (openBlock(), createBlock("svg", {
                    key: 21,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    })
                  ])) : __props.icon === "fa-solid fa-photo-video" ? (openBlock(), createBlock("svg", {
                    key: 22,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    })
                  ])) : __props.icon === "fa-solid fa-bookmark" ? (openBlock(), createBlock("svg", {
                    key: 23,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    })
                  ])) : __props.icon === "fa-solid fa-share-alt" ? (openBlock(), createBlock("svg", {
                    key: 24,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    })
                  ])) : __props.icon === "fa-solid fa-language" ? (openBlock(), createBlock("svg", {
                    key: 25,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    })
                  ])) : __props.icon === "fa-solid fa-chalkboard-teacher" ? (openBlock(), createBlock("svg", {
                    key: 26,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  ])) : __props.icon === "fa-solid fa-user-circle" ? (openBlock(), createBlock("svg", {
                    key: 27,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])) : __props.icon === "fa-solid fa-palette" ? (openBlock(), createBlock("svg", {
                    key: 28,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    })
                  ])) : (openBlock(), createBlock(unref(FontAwesomeIcon), {
                    key: 29,
                    icon: dynamicIcon.value,
                    class: "h-5 w-5"
                  }, null, 8, ["icon"]))
                ]),
                createVNode("div", {
                  class: ["overflow-hidden", { "w-0 opacity-0": __props.isCompact, "w-auto opacity-100": !__props.isCompact }]
                }, [
                  createVNode("span", { class: "whitespace-nowrap text-sm font-medium" }, toDisplayString(__props.label), 1)
                ], 2)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/NavItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const NavItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1a823181"]]);
const _sfc_main$6 = {
  __name: "SocialLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    icon: {
      type: [String, Array],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isCompact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.href,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "hover:bg-base-200/50 flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:scale-110",
        title: __props.label
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(FontAwesomeIcon), {
        icon: __props.icon,
        class: "text-base-content/70 h-4 w-4 hover:text-base-content"
      }, null, _parent));
      _push(`</a>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/SocialLink.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SocialLinks",
  __ssrInlineRender: true,
  props: {
    isCompact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const socialLinks = ref([]);
    const platformIcons = {
      Instagram: ["fab", "instagram"],
      Youtube: ["fab", "youtube"],
      Github: ["fab", "github"],
      Linkedin: ["fab", "linkedin"],
      Medium: ["fab", "medium"],
      Twitter: ["fab", "twitter"],
      X: ["fab", "twitter"],
      Facebook: ["fab", "facebook"],
      Tiktok: ["fab", "tiktok"],
      Pinterest: ["fab", "pinterest"],
      default: ["fas", "link"]
    };
    const getSocialIcon = (platform) => {
      return platformIcons[platform] || platformIcons.default;
    };
    onMounted(async () => {
      try {
        const response = await axios.get("/api/social-media");
        socialLinks.value = response.data;
      } catch (error) {
        console.error("Sosyal medya linkleri yüklenirken hata oluştu:", error);
        socialLinks.value = [
          {
            id: 1,
            platform: "Instagram",
            url: "https://instagram.com/notiriel",
            is_active: true
          },
          {
            id: 2,
            platform: "Youtube",
            url: "https://youtube.com/@notiriel",
            is_active: true
          },
          {
            id: 3,
            platform: "Github",
            url: "https://github.com/notiriel",
            is_active: true
          }
        ];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center space-x-2 transition-all duration-500 ease-out" }, _attrs))}><!--[-->`);
      ssrRenderList(socialLinks.value, (link) => {
        _push(`<!--[-->`);
        if (link.is_active) {
          _push(ssrRenderComponent(_sfc_main$6, {
            href: link.url,
            icon: getSocialIcon(link.platform),
            label: link.platform,
            "is-compact": __props.isCompact
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/SocialLinks.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "PageActions",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "desktop"
      // 'desktop' or 'mobile'
    },
    onLinkClick: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isWriteShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/writes/") && url !== "/writes" && url !== "/writes/create") {
        return true;
      }
      const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
      if (categoryWritePattern.test(url) && !url.includes("/create") && !url.includes("/edit") && url.split("/").length === 4) {
        return true;
      }
      return false;
    });
    const isWriteEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/writes/") && url.includes("/edit");
    });
    const isCategoryShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/categories/") && url !== "/categories" && url !== "/categories/create") {
        const parts = url.split("/").filter((part) => part.length > 0);
        if (parts.length === 2 && parts[0] === "categories" && !parts[1].includes("edit")) {
          return true;
        }
      }
      return false;
    });
    const isCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/categories/") && url.includes("/edit");
    });
    const isWordShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/rendition/words/") && url !== "/rendition/words" && url !== "/rendition/words/create";
    });
    const isVersionShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/versions/") && url !== "/versions" && url !== "/versions/create";
    });
    const isTestCategoryShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/test-categories/") && url !== "/test-categories" && url !== "/test-categories/create") {
        const parts = url.split("/").filter((part) => part.length > 0);
        if (parts.length === 2 && parts[0] === "test-categories" && !parts[1].includes("edit")) {
          return true;
        }
      }
      return false;
    });
    const isTestCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/test-categories/") && url.includes("/edit");
    });
    const isTestShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/tests/") && url !== "/tests" && url !== "/tests/create" && !url.includes("/take") && !url.includes("/edit");
    });
    const isTestEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/tests/") && url.includes("/edit");
    });
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const write = computed(() => page.props.write || null);
    const category = computed(() => page.props.category || null);
    const word = computed(() => page.props.word || null);
    const version = computed(() => page.props.version || null);
    const testCategory = computed(() => page.props.category || null);
    const test = computed(() => page.props.test || null);
    const containerClass = computed(() => {
      return props.variant === "mobile" ? "flex flex-col gap-2" : "flex items-center gap-2";
    });
    const editButtonClass = computed(() => {
      const base = props.variant === "mobile" ? "flex w-full items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" : "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
      return base;
    });
    const deleteButtonClass = computed(() => {
      const base = props.variant === "mobile" ? "flex w-full items-center gap-3 rounded-md border border-destructive bg-background px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground" : "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-destructive bg-background px-3 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
      return base;
    });
    const iconClass = computed(() => {
      return props.variant === "mobile" ? "h-4 w-4" : "h-3.5 w-3.5";
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isWriteShowPage.value && !isWriteEditPage.value && isLoggedIn.value && write.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.edit", write.value.id),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isWriteEditPage.value && isLoggedIn.value && write.value) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: deleteButtonClass.value }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button>`);
      } else if (isCategoryShowPage.value && !isCategoryEditPage.value && isLoggedIn.value && category.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.edit", category.value.id),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isCategoryEditPage.value && isLoggedIn.value && category.value) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: deleteButtonClass.value }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button>`);
      } else if (isWordShowPage.value && isLoggedIn.value && word.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("rendition.words.edit", word.value.id),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isVersionShowPage.value && isLoggedIn.value && version.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("versions.edit", version.value.id),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isTestCategoryShowPage.value && !isTestCategoryEditPage.value && isLoggedIn.value && testCategory.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("test-categories.edit", testCategory.value.slug),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isTestCategoryEditPage.value && isLoggedIn.value && testCategory.value) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: deleteButtonClass.value }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button>`);
      } else if (isTestShowPage.value && !isTestEditPage.value && isLoggedIn.value && test.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClass.value }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("tests.edit", test.value.slug),
          class: editButtonClass.value,
          onClick: __props.onLinkClick
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: iconClass.value
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ], 2)),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass(deleteButtonClass.value)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button></div>`);
      } else if (isTestEditPage.value && isLoggedIn.value && test.value) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: deleteButtonClass.value }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> Sil </button>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/PageActions.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "HeaderLayout",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Header"
    }
  },
  emits: ["toggleSidebar"],
  setup(__props, { emit: __emit }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const seoTitle = computed(() => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
      return ((_c2 = (_b2 = (_a2 = page.props) == null ? void 0 : _a2.screen) == null ? void 0 : _b2.seo) == null ? void 0 : _c2.title) || ((_e2 = (_d2 = page.props) == null ? void 0 : _d2.seo) == null ? void 0 : _e2.title) || ((_h2 = (_g2 = (_f2 = page.props) == null ? void 0 : _f2.app) == null ? void 0 : _g2.seo) == null ? void 0 : _h2.title) || ((_j2 = (_i2 = page.props) == null ? void 0 : _i2.app) == null ? void 0 : _j2.description) || "Check-up Codes";
    });
    const isMenuOpen = ref(false);
    const showProfileDropdown = ref(false);
    const page = usePage();
    const store2 = useStore();
    const imagePath = ref("");
    const auth = ref(null);
    const appName = computed(() => usePage().props.app.name);
    const title = ref("");
    ref(false);
    ref("English");
    const searchQuery = ref("");
    const searchResults = ref({ articles: [], categories: [] });
    const showSearchResults = ref(false);
    const isSearching = ref(false);
    const searchTimeout = ref(null);
    const selectedIndex = ref(-1);
    ref([]);
    const searchInputRef = ref(null);
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    const logoPath = ref(
      ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.logo) || ((_e = (_d = page.props) == null ? void 0 : _d.seo) == null ? void 0 : _e.logo) || ((_h = (_g = (_f = page.props) == null ? void 0 : _f.app) == null ? void 0 : _g.seo) == null ? void 0 : _h.logo) || ((_j = (_i = page.props) == null ? void 0 : _i.app) == null ? void 0 : _j.logo) || null
    );
    const logoAlt = computed(() => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
      return ((_c2 = (_b2 = (_a2 = page.props) == null ? void 0 : _a2.screen) == null ? void 0 : _b2.seo) == null ? void 0 : _c2.logo_alt) || ((_e2 = (_d2 = page.props) == null ? void 0 : _d2.seo) == null ? void 0 : _e2.logo_alt) || ((_h2 = (_g2 = (_f2 = page.props) == null ? void 0 : _f2.app) == null ? void 0 : _g2.seo) == null ? void 0 : _h2.logo_alt) || seoTitle.value || "Logo";
    });
    const isLoading = ref(false);
    const handleImageError = () => {
      logoPath.value = null;
    };
    const isDarkMode = computed(() => {
      return currentTheme.value.includes("dark");
    });
    const currentThemeName = computed(() => {
      const theme = currentTheme.value;
      const themeMap = {
        light: "Light",
        dark: "Dark"
      };
      return themeMap[theme] || theme;
    });
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isActiveRoute = (path) => {
      const currentUrl = page.url;
      if (path === "/") {
        return currentUrl === "/" || currentUrl === "";
      }
      return currentUrl.startsWith(path);
    };
    const isWriteShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/writes/") && url !== "/writes" && url !== "/writes/create") {
        return true;
      }
      const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
      if (categoryWritePattern.test(url) && !url.includes("/create") && !url.includes("/edit") && url.split("/").length === 4) {
        return true;
      }
      return false;
    });
    const isCategoryShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/categories/") && url !== "/categories" && url !== "/categories/create") {
        const parts = url.split("/").filter((part) => part.length > 0);
        if (parts.length === 2 && parts[0] === "categories" && !parts[1].includes("edit")) {
          return true;
        }
      }
      return false;
    });
    const isAdminPanelPage = computed(() => {
      const url = page.url;
      return url.startsWith("/dashboard") || url.startsWith("/media") || url.startsWith("/social-media") || url.startsWith("/seo");
    });
    const isVersionShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/versions/") && url !== "/versions" && url !== "/versions/create";
    });
    const isWordShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/rendition/words/") && url !== "/rendition/words" && url !== "/rendition/words/create";
    });
    const isTestCategoryShowPage = computed(() => {
      const url = page.url;
      if (url.startsWith("/test-categories/") && url !== "/test-categories" && url !== "/test-categories/create") {
        const parts = url.split("/").filter((part) => part.length > 0);
        if (parts.length === 2 && parts[0] === "test-categories" && !parts[1].includes("edit")) {
          return true;
        }
      }
      return false;
    });
    const isTestCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/test-categories/") && url.includes("/edit");
    });
    const isTestShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/tests/") && url !== "/tests" && url !== "/tests/create" && !url.includes("/take") && !url.includes("/edit");
    });
    const isTestEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/tests/") && url.includes("/edit");
    });
    computed(() => {
      return isWordShowPage.value && !word.value && pack.value;
    });
    const isWriteCreatePage = computed(() => {
      return page.url === "/writes/create";
    });
    const isWriteEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/writes/") && url.includes("/edit");
    });
    const isCategoryCreatePage = computed(() => {
      return page.url === "/categories/create";
    });
    const isCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/categories/") && url.includes("/edit");
    });
    const isFormProcessing = ref(false);
    computed(() => page.props.write || null);
    computed(() => page.props.category || null);
    const word = computed(() => page.props.word || null);
    computed(() => page.props.version || null);
    const pack = computed(() => page.props.pack || null);
    watch(
      () => page.props.value,
      (newProps) => {
        var _a2;
        if (newProps && newProps.auth) {
          auth.value = newProps.auth;
          if ((_a2 = auth.value) == null ? void 0 : _a2.user) {
            imagePath.value = auth.value.user.imagePath || "/images/default.png";
          }
        }
      },
      { immediate: true }
    );
    watch(
      () => page.url,
      () => {
        closeMenu();
      }
    );
    const basePath = computed(() => {
      const url = page.url;
      const parts = url.split("/").filter((part) => part);
      if (!parts.length) return null;
      const pathMap = {
        rendition: "rendition/words"
        //  academy: 'academy/courses',
      };
      return pathMap[parts[0]] || parts[0];
    });
    const closeMenu = () => {
      isMenuOpen.value = false;
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
    const highlightText = (text) => {
      if (!text || !searchQuery.value) return text;
      const query = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${query})`, "gi");
      const highlightClass = "bg-primary/20 text-primary font-medium px-0.5 rounded";
      return text.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
    };
    const handleKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        event.stopPropagation();
        if (searchInputRef.value) {
          searchInputRef.value.focus();
          showSearchResults.value = true;
        }
      }
    };
    let clickOutsideHandler = null;
    let formProcessingHandler = null;
    onMounted(() => {
      formProcessingHandler = (event) => {
        isFormProcessing.value = event.detail.processing || false;
      };
      window.addEventListener("formProcessingState", formProcessingHandler);
      clickOutsideHandler = (event) => {
        const profileDropdownElement = event.target.closest(".profile-dropdown-container");
        if (showProfileDropdown.value && !profileDropdownElement) {
          showProfileDropdown.value = false;
        }
      };
      document.addEventListener("click", clickOutsideHandler);
      document.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      if (formProcessingHandler) {
        window.removeEventListener("formProcessingState", formProcessingHandler);
      }
      document.removeEventListener("keydown", handleKeydown);
      if (clickOutsideHandler) {
        document.removeEventListener("click", clickOutsideHandler);
      }
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60" data-v-875a991e><div class="flex h-12 items-center justify-between px-3 sm:px-4 lg:hidden" data-v-875a991e>`);
      if (basePath.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: `/${basePath.value}`,
          class: "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(GoBackSvg, { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(GoBackSvg, { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-10" data-v-875a991e></div>`);
      }
      _push(`<div class="flex items-center space-x-2" data-v-875a991e><div class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20" data-v-875a991e>`);
      if (logoPath.value && !isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-875a991e>`);
      } else {
        _push(`<span class="text-xs font-semibold text-primary" data-v-875a991e>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-sm font-semibold text-foreground transition-colors hover:text-foreground/80"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(title.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(title.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-875a991e><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-875a991e></path></svg></button></div><div class="hidden h-12 items-center justify-between px-4 lg:flex" data-v-875a991e><div class="flex items-center space-x-4" data-v-875a991e><div class="flex items-center space-x-2.5" data-v-875a991e><div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20" data-v-875a991e>`);
      if (logoPath.value && !isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-875a991e>`);
      } else {
        _push(`<span class="text-sm font-semibold text-primary" data-v-875a991e>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-base font-semibold text-foreground transition-colors hover:text-foreground/80"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(seoTitle.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(seoTitle.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mx-6 flex-1 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl" data-v-875a991e><div class="relative" data-v-875a991e><div class="relative" data-v-875a991e><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-875a991e><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-875a991e></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ara..." class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" data-v-875a991e><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" data-v-875a991e><kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100" data-v-875a991e>⌘K</kbd></div></div>`);
      if (showSearchResults.value && (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0 || searchQuery.value.length > 0)) {
        _push(`<div class="search-results-dropdown absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[32rem] w-full min-w-[400px] overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] xl:min-w-[800px] 2xl:min-w-[900px]" data-v-875a991e>`);
        if (isSearching.value) {
          _push(`<div class="flex items-center justify-center p-4" data-v-875a991e><div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" data-v-875a991e></div><span class="ml-2 text-sm text-muted-foreground" data-v-875a991e>Aranıyor...</span></div>`);
        } else if (searchQuery.value.length > 0 && (!searchResults.value.articles || searchResults.value.articles.length === 0) && (!searchResults.value.categories || searchResults.value.categories.length === 0)) {
          _push(`<div class="flex flex-col items-center justify-center p-6 text-center" data-v-875a991e><div class="mb-2 text-muted-foreground" data-v-875a991e><svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-875a991e></path></svg></div><span class="text-sm text-muted-foreground" data-v-875a991e>&quot;${ssrInterpolate(searchQuery.value)}&quot; için sonuç bulunamadı</span></div>`);
        } else if (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0) {
          _push(`<div class="py-2" data-v-875a991e>`);
          if (searchResults.value.articles && searchResults.value.articles.length > 0) {
            _push(`<div class="mb-3" data-v-875a991e><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-875a991e>Yazılar</div><!--[-->`);
            ssrRenderList(searchResults.value.articles, (article, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", index)} class="${ssrRenderClass([
                "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
                selectedIndex.value === index ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
              ])}" data-v-875a991e><div class="text-sm font-medium leading-none" data-v-875a991e>${highlightText(article.title) ?? ""}</div><div class="mt-0.5 text-xs leading-tight text-muted-foreground" data-v-875a991e>${highlightText(article.excerpt) ?? ""}</div>`);
              if (article.category) {
                _push(`<div class="mt-1" data-v-875a991e><span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" data-v-875a991e>${ssrInterpolate(article.category)}</span></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (searchResults.value.categories && searchResults.value.categories.length > 0) {
            _push(`<div class="mb-3" data-v-875a991e><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-875a991e> Kategoriler </div><!--[-->`);
            ssrRenderList(searchResults.value.categories, (category, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", searchResults.value.articles.length + index)} class="${ssrRenderClass([
                "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
                selectedIndex.value === searchResults.value.articles.length + index ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
              ])}" data-v-875a991e><div class="text-sm font-medium leading-none" data-v-875a991e>${highlightText(category.name) ?? ""}</div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="py-2" data-v-875a991e><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-875a991e> Hızlı Eylemler </div><div data-selected-index="0" class="${ssrRenderClass([
            "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
            selectedIndex.value === 0 ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
          ])}" data-v-875a991e><div class="text-sm font-medium" data-v-875a991e>Tüm Yazıları Görüntüle</div><div class="mt-0.5 text-xs text-muted-foreground" data-v-875a991e>Tüm yayınlanmış yazıları görüntüle</div></div><div data-selected-index="1" class="${ssrRenderClass([
            "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
            selectedIndex.value === 1 ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
          ])}" data-v-875a991e><div class="text-sm font-medium" data-v-875a991e>Tüm Kategorileri Görüntüle</div><div class="mt-0.5 text-xs text-muted-foreground" data-v-875a991e>Tüm kategorileri görüntüle</div></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center space-x-2" data-v-875a991e><div class="hidden items-center space-x-1 xl:flex" data-v-875a991e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/dashboard",
        class: "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Panel `);
          } else {
            return [
              createTextVNode(" Panel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://youtu.be/FPsx8xHLR1k?si=nZnBfqjYQun9R06h" target="_blank" class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-875a991e> Destek </a></div>`);
      if (!isLoggedIn.value) {
        _push(`<div class="tooltip tooltip-bottom" data-tip="Aramıza Katıl" data-v-875a991e>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/join-us",
          class: "block"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-875a991e${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-875a991e${_scopeId}></path></svg></button>`);
            } else {
              return [
                createVNode("button", { class: "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    })
                  ]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-875a991e>`);
      if (isDarkMode.value) {
        _push(`<svg class="h-3.5 w-3.5 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-875a991e><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-875a991e></path></svg>`);
      } else {
        _push(`<svg class="h-3.5 w-3.5 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-875a991e><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-875a991e></path></svg>`);
      }
      _push(`</button>`);
      if (isLoggedIn.value) {
        _push(`<div class="profile-dropdown-container relative inline-block" data-v-875a991e><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": showProfileDropdown.value }, "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" title="Profil" data-v-875a991e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-875a991e></path></svg></button>`);
        if (showProfileDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg" data-v-875a991e><div class="flex flex-col gap-1 p-1" data-v-875a991e>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("profile.edit"),
            class: "inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showProfileDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-875a991e${_scopeId}></path></svg> Profil `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "mr-2 h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    })
                  ])),
                  createTextVNode(" Profil ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button type="button" class="inline-flex h-7 w-full items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground" data-v-875a991e><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-875a991e></path></svg> Çıkış Yap </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 xl:hidden" data-v-875a991e><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-875a991e></path></svg></button></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "opacity-100" : "opacity-0", "fixed inset-0 z-50 transition-all duration-300 ease-out"])}" data-v-875a991e><div class="bg-base-content/20 absolute inset-0 backdrop-blur-sm" data-v-875a991e></div><div class="relative flex h-full items-end justify-center" data-v-875a991e><div class="${ssrRenderClass([isMenuOpen.value ? "translate-y-0" : "translate-y-full", "w-full max-w-sm transform transition-all duration-300 ease-out"])}" data-v-875a991e><div class="border-border bg-popover mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-lg border shadow-lg" data-v-875a991e><div class="flex justify-center pb-2 pt-4" data-v-875a991e><div class="bg-muted h-1.5 w-16 rounded-full" data-v-875a991e></div></div><div class="px-4 pb-6 sm:px-6" data-v-875a991e>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "mb-4 block",
          onClick: closeMenu
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center space-x-3 rounded-lg border border-border bg-card p-3" data-v-875a991e${_scopeId}><div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10" data-v-875a991e${_scopeId}>`);
              if (logoPath.value && !isLoading.value) {
                _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-875a991e${_scopeId}>`);
              } else {
                _push2(`<span class="text-sm font-bold text-primary" data-v-875a991e${_scopeId}>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
              }
              _push2(`</div><div data-v-875a991e${_scopeId}><h3 class="text-card-foreground text-base font-semibold" data-v-875a991e${_scopeId}>${ssrInterpolate(seoTitle.value)}</h3><p class="text-muted-foreground text-xs" data-v-875a991e${_scopeId}>${ssrInterpolate(appName.value)}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center space-x-3 rounded-lg border border-border bg-card p-3" }, [
                  createVNode("div", { class: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10" }, [
                    logoPath.value && !isLoading.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: logoPath.value,
                      alt: logoAlt.value,
                      class: "h-full w-full object-cover",
                      onError: handleImageError
                    }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-sm font-bold text-primary"
                    }, toDisplayString(seoTitle.value.charAt(0).toUpperCase()), 1))
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-card-foreground text-base font-semibold" }, toDisplayString(seoTitle.value), 1),
                    createVNode("p", { class: "text-muted-foreground text-xs" }, toDisplayString(appName.value), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-2" data-v-875a991e><div class="space-y-1" data-v-875a991e>`);
        _push(ssrRenderComponent(NavItem, {
          href: "/",
          icon: "home",
          label: "Ana Sayfa"
        }, null, _parent));
        _push(ssrRenderComponent(NavItem, {
          href: "/writes",
          icon: "fa-solid fa-pencil",
          label: "Yazılar"
        }, null, _parent));
        _push(ssrRenderComponent(NavItem, {
          href: "/categories",
          icon: "fa-solid fa-book",
          label: "Kategoriler"
        }, null, _parent));
        _push(ssrRenderComponent(NavItem, {
          href: "/test-categories",
          icon: "fa-solid fa-clipboard-question",
          label: "Testler"
        }, null, _parent));
        if (isLoggedIn.value) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(NavItem, {
            href: "/rendition/words",
            icon: "fa-solid fa-globe",
            label: "Kelimeler"
          }, null, _parent));
          _push(ssrRenderComponent(NavItem, {
            href: "/versions",
            icon: "fa-solid fa-sync",
            label: "Versiyonlar"
          }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (isLoggedIn.value && (isWriteCreatePage.value || isWriteEditPage.value || isCategoryCreatePage.value || isCategoryEditPage.value || _ctx.isTestCreatePage || isTestEditPage.value || _ctx.isTestCategoryCreatePage || isTestCategoryEditPage.value)) {
          _push(`<div class="border-t border-border pt-3" data-v-875a991e><div class="space-y-2" data-v-875a991e>`);
          if (isWriteCreatePage.value || isCategoryCreatePage.value || _ctx.isTestCreatePage || _ctx.isTestCategoryCreatePage) {
            _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="flex w-full items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" data-v-875a991e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-875a991e></path></svg><span data-v-875a991e>Sıfırla</span></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50" data-v-875a991e>`);
          if (isFormProcessing.value) {
            _push(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-875a991e><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-875a991e></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-875a991e></path></svg>`);
          } else {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-875a991e></path></svg>`);
          }
          _push(`<span data-v-875a991e>${ssrInterpolate(isFormProcessing.value ? isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelleniyor..." : "Kaydediliyor..." : isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelle" : "Kaydet")}</span></button></div></div>`);
        } else if (isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-875a991e><div class="space-y-1" data-v-875a991e><div class="text-muted-foreground mb-1 px-3 text-xs font-medium uppercase" data-v-875a991e>Yeni Oluştur</div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/writes/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Yazı</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ])),
                  createVNode("span", null, "Yeni Yazı")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/categories/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Kategori</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ])),
                  createVNode("span", null, "Yeni Kategori")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/rendition/words/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Kelime</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    })
                  ])),
                  createVNode("span", null, "Yeni Kelime")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/rendition/language-packs/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Kelime Paketi</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    })
                  ])),
                  createVNode("span", null, "Yeni Kelime Paketi")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/versions/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Versiyon</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ])),
                  createVNode("span", null, "Yeni Versiyon")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/tests/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Test</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])),
                  createVNode("span", null, "Yeni Test")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/test-categories/create",
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Yeni Test Kategorisi</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])),
                  createVNode("span", null, "Yeni Test Kategorisi")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isLoggedIn.value && (isWriteShowPage.value || isWriteEditPage.value || isCategoryShowPage.value || isCategoryEditPage.value || isWordShowPage.value || isVersionShowPage.value || isTestCategoryShowPage.value || isTestCategoryEditPage.value || isTestShowPage.value || isTestEditPage.value)) {
          _push(`<div class="border-t border-border pt-3" data-v-875a991e>`);
          _push(ssrRenderComponent(_sfc_main$4, {
            variant: "mobile",
            "on-link-click": closeMenu
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-875a991e><div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-875a991e> Hesap </div><div class="space-y-1" data-v-875a991e>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("profile.edit"),
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Profil</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    })
                  ])),
                  createVNode("span", null, "Profil")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10" data-v-875a991e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-875a991e></path></svg><span data-v-875a991e>Çıkış Yap</span></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isAdminPanelPage.value && isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-875a991e><div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-875a991e> Panel </div><div class="space-y-1" data-v-875a991e>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: [
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActiveRoute("/dashboard") ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"
            ],
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Dashboard</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    })
                  ])),
                  createVNode("span", null, "Dashboard")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("media.index"),
            class: [
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActiveRoute("/media") ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"
            ],
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Medya Yönetimi</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ])),
                  createVNode("span", null, "Medya Yönetimi")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("social-media.index"),
            class: [
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActiveRoute("/social-media") ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"
            ],
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>Sosyal Medya Yönetimi</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    })
                  ])),
                  createVNode("span", null, "Sosyal Medya Yönetimi")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("seo.edit"),
            class: [
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActiveRoute("/seo") ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"
            ],
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-875a991e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" data-v-875a991e${_scopeId}></path></svg><span data-v-875a991e${_scopeId}>SEO Yönetimi</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    })
                  ])),
                  createVNode("span", null, "SEO Yönetimi")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!isLoggedIn.value) {
          _push(`<div class="mt-4 border-t border-border pt-3" data-v-875a991e><a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank" data-v-875a991e><div class="rounded-md bg-primary/10 p-3 text-center transition-colors hover:bg-primary/20" data-v-875a991e><span class="text-sm font-medium text-primary" data-v-875a991e>Powered by Notiriel</span></div></a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isLoggedIn.value) {
          _push(`<div class="mt-3" data-v-875a991e>`);
          _push(ssrRenderComponent(_sfc_main$5, { "is-compact": false }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4 flex flex-col items-center space-y-2" data-v-875a991e><button class="flex items-center space-x-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" data-v-875a991e>`);
        if (isDarkMode.value) {
          _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-875a991e><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-875a991e></path></svg>`);
        } else {
          _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-875a991e><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-875a991e></path></svg>`);
        }
        _push(`<span class="text-sm font-medium" data-v-875a991e>${ssrInterpolate(currentThemeName.value)}</span></button><p class="text-xs text-muted-foreground" data-v-875a991e>Notiriel - Tüm Hakları Saklıdır</p></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/HeaderLayout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HeaderLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-875a991e"]]);
const _sfc_main$2 = {
  __name: "TabNavItem",
  __ssrInlineRender: true,
  props: {
    href: String,
    icon: [String, Array],
    label: String,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const store2 = useStore();
    const props = __props;
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    computed(() => {
      return currentTheme.value.includes("dark");
    });
    const dynamicIcon = computed(() => {
      return Array.isArray(props.icon) ? props.icon : props.icon;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: ["group relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-3 py-2 h-9", [
          __props.isActive ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        ]]
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ "scale-110": __props.isActive }, "flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300"])}"${_scopeId}>`);
            if (__props.icon === "home") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-pencil") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-book") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-globe") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-sync") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg>`);
            } else {
              _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
                icon: dynamicIcon.value,
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><span class="whitespace-nowrap"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-300", { "scale-110": __props.isActive }]
              }, [
                __props.icon === "home" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  })
                ])) : __props.icon === "fa-solid fa-pencil" ? (openBlock(), createBlock("svg", {
                  key: 1,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  })
                ])) : __props.icon === "fa-solid fa-book" ? (openBlock(), createBlock("svg", {
                  key: 2,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  })
                ])) : __props.icon === "fa-solid fa-globe" ? (openBlock(), createBlock("svg", {
                  key: 3,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])) : __props.icon === "fa-solid fa-sync" ? (openBlock(), createBlock("svg", {
                  key: 4,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  })
                ])) : (openBlock(), createBlock(unref(FontAwesomeIcon), {
                  key: 5,
                  icon: dynamicIcon.value,
                  class: "h-4 w-4"
                }, null, 8, ["icon"]))
              ], 2),
              createVNode("span", { class: "whitespace-nowrap" }, toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/TabNavItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SidebarLayout",
  __ssrInlineRender: true,
  props: {
    isCompact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const page = usePage();
    const store2 = useStore();
    const showWriteFilterDropdown = ref(false);
    const writeFilter = ref("all");
    const showAdminPanelDropdown = ref(false);
    const showCreateDropdown = ref(false);
    const isFormProcessing = ref(false);
    const injectedCategories = inject("categories", []);
    computed(() => {
      if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
        return injectedCategories;
      }
      if (page.props.categories && Array.isArray(page.props.categories) && page.props.categories.length > 0) {
        return page.props.categories;
      }
      return [];
    });
    const areAllCategoriesExpanded = computed(() => store2.getters["CategorySidebar/collapsedSet"].size === 0);
    let clickOutsideHandler = null;
    onMounted(() => {
      const savedFilter = localStorage.getItem("writeListFilter");
      if (savedFilter) {
        writeFilter.value = savedFilter;
      }
      clickOutsideHandler = (event) => {
        const dropdownElement = event.target.closest(".write-filter-dropdown-container");
        const adminDropdownElement = event.target.closest(".admin-panel-dropdown-container");
        const createDropdownElement = event.target.closest(".create-dropdown-container");
        if (showWriteFilterDropdown.value && !dropdownElement) {
          showWriteFilterDropdown.value = false;
        }
        if (showAdminPanelDropdown.value && !adminDropdownElement) {
          showAdminPanelDropdown.value = false;
        }
        if (showCreateDropdown.value && !createDropdownElement) {
          showCreateDropdown.value = false;
        }
      };
      const handleRouteChange = () => {
        if (!isActiveRoute("/writes")) {
          showWriteFilterDropdown.value = false;
        }
      };
      watch(() => page.url, handleRouteChange);
      document.addEventListener("click", clickOutsideHandler);
    });
    onUnmounted(() => {
      if (clickOutsideHandler) {
        document.removeEventListener("click", clickOutsideHandler);
      }
    });
    const getFilterLabel = (filter) => {
      const filterLabels = {
        all: "Tümü",
        published: "Herkese Açık",
        link_only: "Sadece Link",
        private: "Gizli"
      };
      return filterLabels[filter] || "Tümü";
    };
    const writesLabel = computed(() => {
      const currentUrl = page.url;
      const isOnWritesPage = currentUrl.startsWith("/writes") && currentUrl !== "/writes/create";
      if (isLoggedIn.value && writeFilter.value !== "all" && isOnWritesPage) {
        return `Yazılar: ${getFilterLabel(writeFilter.value)}`;
      }
      return "Yazılar";
    });
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    computed(() => {
      return currentTheme.value === "dark";
    });
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isActiveRoute = (path) => {
      const currentUrl = page.url;
      if (path === "/") {
        return currentUrl === "/" || currentUrl === "";
      }
      return currentUrl.startsWith(path);
    };
    computed(() => {
      const url = page.url;
      if (url.startsWith("/writes/") && url !== "/writes" && url !== "/writes/create") {
        return true;
      }
      const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
      if (categoryWritePattern.test(url) && !url.includes("/create") && !url.includes("/edit") && url.split("/").length === 4) {
        return true;
      }
      return false;
    });
    computed(() => {
      const url = page.url;
      if (url.startsWith("/categories/") && url !== "/categories" && url !== "/categories/create") {
        const parts = url.split("/").filter((part) => part.length > 0);
        if (parts.length === 2 && parts[0] === "categories" && !parts[1].includes("edit")) {
          return true;
        }
      }
      return false;
    });
    const isAdminPanelPage = computed(() => {
      const url = page.url;
      return url.startsWith("/dashboard") || url.startsWith("/media") || url.startsWith("/social-media") || url.startsWith("/seo");
    });
    computed(() => {
      const url = page.url;
      return url.startsWith("/versions/") && url !== "/versions" && url !== "/versions/create";
    });
    const isWordShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/rendition/words/") && url !== "/rendition/words" && url !== "/rendition/words/create";
    });
    const isLanguagePackShowPage = computed(() => {
      return isWordShowPage.value && !word.value && pack.value;
    });
    const isWriteCreatePage = computed(() => {
      return page.url === "/writes/create";
    });
    const isWriteEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/writes/") && url.includes("/edit");
    });
    const isCategoryCreatePage = computed(() => {
      return page.url === "/categories/create";
    });
    const isCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/categories/") && url.includes("/edit");
    });
    const isTestCreatePage = computed(() => {
      return page.url === "/tests/create";
    });
    const isTestEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/tests/") && url.includes("/edit");
    });
    const isTestCategoryCreatePage = computed(() => {
      return page.url === "/test-categories/create";
    });
    const isTestCategoryEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/test-categories/") && url.includes("/edit");
    });
    let formProcessingHandler = null;
    onMounted(() => {
      formProcessingHandler = (event) => {
        isFormProcessing.value = event.detail.processing || false;
      };
      window.addEventListener("formProcessingState", formProcessingHandler);
    });
    onUnmounted(() => {
      if (formProcessingHandler) {
        window.removeEventListener("formProcessingState", formProcessingHandler);
      }
    });
    computed(() => page.props.write || null);
    computed(() => page.props.category || null);
    const word = computed(() => page.props.word || null);
    computed(() => page.props.version || null);
    const pack = computed(() => page.props.pack || null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "sticky top-12 z-40 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block" }, _attrs))} data-v-47c47c94><div class="flex h-9 items-center justify-between px-3" data-v-47c47c94><div class="flex items-center gap-0.5" data-v-47c47c94>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/",
        icon: "home",
        label: "Ana Sayfa",
        "is-active": isActiveRoute("/")
      }, null, _parent));
      _push(`<div class="write-filter-dropdown-container relative inline-flex items-center" data-v-47c47c94>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/writes",
        icon: "fa-solid fa-pencil",
        label: writesLabel.value,
        "is-active": isActiveRoute("/writes")
      }, null, _parent));
      if (isLoggedIn.value) {
        _push(`<div class="relative -ml-0.5 flex items-center gap-0.5" data-v-47c47c94>`);
        if (writeFilter.value !== "all" && isActiveRoute("/writes")) {
          _push(`<button class="inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" title="Filtreyi temizle" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-47c47c94></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative" data-v-47c47c94><button class="${ssrRenderClass([[
          showWriteFilterDropdown.value && isActiveRoute("/writes") ? "bg-accent text-accent-foreground" : "",
          !isActiveRoute("/writes") ? "opacity-40 cursor-not-allowed" : ""
        ], "inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}"${ssrIncludeBooleanAttr(!isActiveRoute("/writes")) ? " disabled" : ""} title="Filtrele" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z" data-v-47c47c94></path></svg></button>`);
        if (showWriteFilterDropdown.value && isActiveRoute("/writes")) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-36 rounded-md border border-border bg-popover shadow-md" data-v-47c47c94><div class="flex flex-col p-1" data-v-47c47c94><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "all" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-47c47c94></path></svg> Tümü </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "published" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><circle cx="12" cy="12" r="10" data-v-47c47c94></circle><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" data-v-47c47c94></path></svg> Herkese Açık </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "link_only" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" data-v-47c47c94></path></svg> Sadece Link </button><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": writeFilter.value === "private" }, "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z" data-v-47c47c94></path></svg> Gizli </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="category-collapse-dropdown-container relative inline-flex items-center" data-v-47c47c94>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/categories",
        icon: "fa-solid fa-book",
        label: "Kategoriler",
        "is-active": isActiveRoute("/categories")
      }, null, _parent));
      _push(`<button class="${ssrRenderClass([
        isActiveRoute("/categories") && areAllCategoriesExpanded.value ? "bg-accent text-accent-foreground" : "",
        "relative -ml-0.5 inline-flex h-7 w-6 items-center justify-center rounded text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
      ])}"${ssrIncludeBooleanAttr(!isActiveRoute("/categories")) ? " disabled" : ""}${ssrRenderAttr(
        "title",
        isActiveRoute("/categories") ? areAllCategoriesExpanded.value ? "Tümünü Daralt" : "Tümünü Genişlet" : "Kategoriler sayfasında kullanılabilir"
      )} data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": areAllCategoriesExpanded.value && isActiveRoute("/categories") }, "h-3 w-3 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-47c47c94></path></svg></button></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/test-categories",
        icon: "fa-solid fa-clipboard-question",
        label: "Testler",
        "is-active": isActiveRoute("/test-categories") || isActiveRoute("/tests")
      }, null, _parent));
      if (isLoggedIn.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/rendition/words",
          icon: "fa-solid fa-globe",
          label: "Kelimeler",
          "is-active": isActiveRoute("/rendition")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/versions",
          icon: "fa-solid fa-sync",
          label: "Versiyonlar",
          "is-active": isActiveRoute("/versions")
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1.5" data-v-47c47c94>`);
      _push(ssrRenderComponent(_sfc_main$4, { variant: "desktop" }, null, _parent));
      if (isLoggedIn.value && (isWriteCreatePage.value || isWriteEditPage.value || isCategoryCreatePage.value || isCategoryEditPage.value || isTestCreatePage.value || isTestEditPage.value || isTestCategoryCreatePage.value || isTestCategoryEditPage.value)) {
        _push(`<div class="flex items-center gap-1.5" data-v-47c47c94>`);
        if (isWriteCreatePage.value || isCategoryCreatePage.value || isTestCreatePage.value || isTestCategoryCreatePage.value) {
          _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" title="Formu sıfırla" data-v-47c47c94> Sıfırla </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="inline-flex h-7 items-center justify-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"${ssrRenderAttr("title", isWriteEditPage.value || isCategoryEditPage.value ? "Değişiklikleri kaydet" : "Yazıyı kaydet")} data-v-47c47c94>`);
        if (isFormProcessing.value) {
          _push(`<svg class="h-3 w-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-47c47c94><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-47c47c94></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-47c47c94></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-47c47c94></path></svg>`);
        }
        _push(` ${ssrInterpolate(isFormProcessing.value ? isWriteEditPage.value || isCategoryEditPage.value ? "Güncelleniyor..." : "Kaydediliyor..." : isWriteEditPage.value || isCategoryEditPage.value ? "Güncelle" : "Kaydet")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<div class="create-dropdown-container relative inline-block" data-v-47c47c94><button class="${ssrRenderClass([{ "bg-primary/90": showCreateDropdown.value }, "inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" title="Yeni içerik oluştur" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" data-v-47c47c94></path></svg></button>`);
        if (showCreateDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-md" data-v-47c47c94><div class="flex flex-col p-1" data-v-47c47c94>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/writes/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-47c47c94${_scopeId}></path></svg> Yeni Yazı `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ])),
                  createTextVNode(" Yeni Yazı ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/categories/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-47c47c94${_scopeId}></path></svg> Yeni Kategori `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ])),
                  createTextVNode(" Yeni Kategori ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/rendition/words/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-47c47c94${_scopeId}></path></svg> Yeni Kelime `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    })
                  ])),
                  createTextVNode(" Yeni Kelime ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/rendition/language-packs/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-47c47c94${_scopeId}></path></svg> Yeni Kelime Paketi `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    })
                  ])),
                  createTextVNode(" Yeni Kelime Paketi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/versions/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-47c47c94${_scopeId}></path></svg> Yeni Versiyon `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ])),
                  createTextVNode(" Yeni Versiyon ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/tests/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-47c47c94${_scopeId}></path></svg> Yeni Test `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])),
                  createTextVNode(" Yeni Test ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/test-categories/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-47c47c94${_scopeId}></path></svg> Yeni Test Kategorisi `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])),
                  createTextVNode(" Yeni Test Kategorisi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (isLanguagePackShowPage.value && isLoggedIn.value && pack.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("rendition.language-packs.edit", pack.value.id),
          class: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          title: "Paketi düzenle"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-47c47c94${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isAdminPanelPage.value && isLoggedIn.value) {
        _push(`<div class="admin-panel-dropdown-container relative inline-block" data-v-47c47c94><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": showAdminPanelDropdown.value }, "inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-47c47c94><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-47c47c94></path></svg> Panel <svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": showAdminPanelDropdown.value }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-47c47c94></path></svg></button>`);
        if (showAdminPanelDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-md" data-v-47c47c94><div class="flex flex-col p-1" data-v-47c47c94>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": isActiveRoute("/dashboard") }],
            onClick: ($event) => showAdminPanelDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-47c47c94${_scopeId}></path></svg> Dashboard `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    })
                  ])),
                  createTextVNode(" Dashboard ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("media.index"),
            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": isActiveRoute("/media") }],
            onClick: ($event) => showAdminPanelDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-47c47c94${_scopeId}></path></svg> Medya Yönetimi `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ])),
                  createTextVNode(" Medya Yönetimi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("social-media.index"),
            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": isActiveRoute("/social-media") }],
            onClick: ($event) => showAdminPanelDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-47c47c94${_scopeId}></path></svg> Sosyal Medya Yönetimi `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    })
                  ])),
                  createTextVNode(" Sosyal Medya Yönetimi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("seo.edit"),
            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": isActiveRoute("/seo") }],
            onClick: ($event) => showAdminPanelDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-47c47c94${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" data-v-47c47c94${_scopeId}></path></svg> SEO Yönetimi `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3.5 w-3.5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    })
                  ])),
                  createTextVNode(" SEO Yönetimi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isLoggedIn.value) {
        _push(`<div class="hidden md:flex" data-v-47c47c94>`);
        _push(ssrRenderComponent(_sfc_main$5, { "is-compact": true }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/SidebarLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SidebarLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-47c47c94"]]);
const _sfc_main = {
  __name: "MainLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const title = computed(() => {
      const pageTitle = page.props.title;
      const appName = page.props.app.name;
      return pageTitle ? `${pageTitle} - ${appName}` : appName;
    });
    const showSidebar = ref(false);
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    };
    const isCompactMode = computed(() => {
      const currentUrl = page.url;
      const urlParts = currentUrl.split("/").filter((part) => part);
      if (urlParts[0] === "writes" && urlParts.length > 1) {
        const secondPart = urlParts[1];
        return secondPart === "create" || secondPart === "edit" || secondPart && secondPart !== "index";
      }
      if (urlParts[0] === "categories" && urlParts.length > 1) {
        const secondPart = urlParts[1];
        return secondPart === "create" || secondPart === "edit" || secondPart && secondPart !== "index";
      }
      return false;
    });
    const contentWrapperClass = computed(() => {
      const baseClass = "flex-1 transition-all duration-500 ease-out";
      const isIndexPage = page.url === "/" || page.url === "";
      const isWritesPage = page.url.startsWith("/writes");
      const isCategoriesPage = page.url.startsWith("/categories");
      const isLoginPage = page.url.startsWith("/login");
      const isRenditionPage = page.url.startsWith("/rendition");
      const isVersionsPage = page.url.startsWith("/versions");
      const isDashboardPage = page.url.startsWith("/dashboard");
      const isMediaPage = page.url.startsWith("/media");
      const isSocialMediaPage = page.url.startsWith("/social-media");
      const isSeoPage = page.url.startsWith("/seo");
      const isThemeManagementPage = page.url.startsWith("/theme-management");
      if (isIndexPage || isWritesPage || isCategoriesPage || isLoginPage || isRenditionPage || isVersionsPage || isDashboardPage || isMediaPage || isSocialMediaPage || isSeoPage || isThemeManagementPage) {
        return `${baseClass} overflow-hidden`;
      }
      return baseClass;
    });
    const writes = page.props.writes || [];
    provide("writes", writes);
    const categories = page.props.categories || [];
    provide("categories", categories);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(title.value)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(title.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex h-screen flex-col bg-background text-foreground transition-colors duration-300 px-3">`);
      _push(ssrRenderComponent(HeaderLayout, { onToggleSidebar: toggleSidebar }, null, _parent));
      _push(ssrRenderComponent(SidebarLayout, {
        "is-compact": isCompactMode.value,
        onLinkClicked: toggleSidebar
      }, null, _parent));
      _push(`<div class="${ssrRenderClass(contentWrapperClass.value)}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const state$3 = () => ({
  activeMenu: "home"
});
const mutations$3 = {
  SET_ACTIVE_MENU(state2, menu) {
    state2.activeMenu = menu;
  }
};
const actions$3 = {
  setActiveMenu({ commit }, menu) {
    commit("SET_ACTIVE_MENU", menu);
  }
};
const getters$3 = {
  activeMenu: (state2) => state2.activeMenu
};
const ActiveMenu = {
  namespaced: true,
  state: state$3,
  mutations: mutations$3,
  actions: actions$3,
  getters: getters$3
};
const state$2 = () => ({
  bookmarks: [],
  bookmarkCategories: []
});
const mutations$2 = {
  SET_BOOKMARKS(state2, bookmarks) {
    state2.bookmarks = bookmarks;
  },
  SET_BOOKMARKS_CATEGORIES(state2, categories) {
    state2.bookmarkCategories = categories;
  },
  ADD_BOOKMARK(state2, bookmark) {
    state2.bookmarks.push(bookmark);
  },
  UPDATE_BOOKMARK(state2, updatedBookmark) {
    const index = state2.bookmarks.findIndex((b2) => b2.id === updatedBookmark.id);
    if (index !== -1) {
      state2.bookmarks.splice(index, 1, updatedBookmark);
    }
  },
  DELETE_BOOKMARK(state2, bookmarkId) {
    state2.bookmarks = state2.bookmarks.filter((b2) => b2.id !== bookmarkId);
  }
};
const actions$2 = {
  async fetchBookmarks({ commit }) {
    try {
      const response = await axios.get("/api/v1/bookmarks");
      commit("SET_BOOKMARKS", response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  },
  async fetchBookmarkCategories({ commit }) {
    try {
      const response = await axios.get("/api/v1/bookmark-categories");
      commit("SET_BOOKMARKS_CATEGORIES", response.data.bookmarks);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching bookmark categories:", error);
    }
  },
  async addBookmark({ commit }, bookmark) {
    try {
      const response = await axios.post("/api/v1/bookmarks", bookmark);
      commit("ADD_BOOKMARK", response.data);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  },
  async updateBookmark({ commit }, bookmark) {
    try {
      const response = await axios.put(`/api/v1/bookmarks/${bookmark.id}`, bookmark);
      commit("UPDATE_BOOKMARK", response.data);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  },
  async deleteBookmark({ commit }, bookmarkId) {
    try {
      await axios.delete(`/api/v1/bookmarks/${bookmarkId}`);
      commit("DELETE_BOOKMARK", bookmarkId);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  }
};
const getters$2 = {
  bookmarks: (state2) => state2.bookmarks
};
const Bookmarks = {
  namespaced: true,
  state: state$2,
  mutations: mutations$2,
  actions: actions$2,
  getters: getters$2
};
const state$1 = () => ({
  writes: [],
  collapsed: false
});
const mutations$1 = {
  SET_WRITES(state2, writes) {
    state2.writes = writes;
  },
  SET_COLLAPSED(state2, value) {
    state2.collapsed = value;
  }
};
const actions$1 = {
  //   async fetchWrites({ commit }) {
  //     try {
  //       const response = await axios.get('/api/v1/writes');
  //       commit('SET_WRITES', response.data.writes);
  //     } catch (error) {
  //       console.error('Error fetching writes:', error);
  //     }
  //   },
};
const getters$1 = {
  writes: (state2) => state2.writes,
  isCollapsed: (state2) => state2.collapsed
};
const Writes = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1,
  actions: actions$1,
  getters: getters$1
};
const Theme = {
  namespaced: true,
  state: {
    currentTheme: localStorage.getItem("theme") || "light"
  },
  mutations: {
    // Sadece .dark class'ını toggle eder - CSS'teki renkler otomatik değişir
    setTheme(state2, theme) {
      state2.currentTheme = theme;
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  },
  actions: {
    changeTheme({ commit }, theme) {
      commit("setTheme", theme);
    },
    initTheme({ commit, state: state2 }) {
      commit("setTheme", state2.currentTheme);
    },
    toggleTheme({ commit, state: state2 }) {
      commit("setTheme", state2.currentTheme === "light" ? "dark" : "light");
    }
  },
  getters: {
    getCurrentTheme: (state2) => state2.currentTheme,
    isDarkTheme: (state2) => state2.currentTheme === "dark"
  }
};
const state = () => ({
  collapsed: /* @__PURE__ */ new Set()
});
const mutations = {
  TOGGLE_COLLAPSE(state2, id) {
    if (state2.collapsed.has(id)) {
      state2.collapsed.delete(id);
    } else {
      state2.collapsed.add(id);
    }
    state2.collapsed = new Set(state2.collapsed);
  },
  EXPAND_ALL(state2) {
    state2.collapsed = /* @__PURE__ */ new Set();
  },
  COLLAPSE_ALL(state2, allIds) {
    state2.collapsed = new Set(allIds);
  }
};
const actions = {
  toggleCollapse({ commit }, id) {
    commit("TOGGLE_COLLAPSE", id);
  },
  expandAll({ commit }) {
    commit("EXPAND_ALL");
  },
  collapseAll({ commit }, allIds) {
    commit("COLLAPSE_ALL", allIds);
  }
};
const getters = {
  isCollapsed: (state2) => (id) => state2.collapsed.has(id),
  collapsedSet: (state2) => state2.collapsed
};
const CategorySidebar = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
const store = createStore({
  modules: {
    ActiveMenu,
    Writes,
    Bookmarks,
    Theme,
    CategorySidebar
  }
});
const solidIcons = [
  faHome,
  faCog,
  faIndustry,
  faBook,
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe,
  faSun,
  faMoon
];
const brandIcons = [faInstagram, faGithub, faYoutube, faLinkedin, faMedium, faTwitter, faTiktok, faPinterest];
const initializeIcons = () => {
  library.add(...solidIcons, ...brandIcons);
};
function render(page) {
  initializeIcons();
  return createInertiaApp({
    page,
    resolve: async (name) => {
      const page2 = (await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-sRjXXmNx.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Bm1FWiOi.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CrV4Xi13.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-BFT6rCyC.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-MPSkIPiF.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-gXEKt2rp.js"), "./Pages/Bookmarks/CreateBookmarks.vue": () => import("./assets/CreateBookmarks-DVJTJcy3.js"), "./Pages/Bookmarks/EditBookmarks.vue": () => import("./assets/EditBookmarks-DZrKHk0d.js"), "./Pages/Bookmarks/IndexBookmarks.vue": () => import("./assets/IndexBookmarks-BH0g04d3.js"), "./Pages/Bookmarks/ShowBookmarks.vue": () => import("./assets/ShowBookmarks-B_Ty2lxF.js"), "./Pages/Bookmarks/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-B16ebHBN.js"), "./Pages/Category/TypescriptTutorial.vue": () => import("./assets/TypescriptTutorial-UDcIixY-.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-DakEfyw-.js"), "./Pages/Equipments/Create/Screen.vue": () => import("./assets/Screen-D1PJcqvP.js"), "./Pages/Equipments/CreateEquipment.vue": () => import("./assets/CreateEquipment-CxmoL0yv.js"), "./Pages/Equipments/Edit/Screen.vue": () => import("./assets/Screen-Ca5kb9UJ.js"), "./Pages/Equipments/EditEquipment.vue": () => import("./assets/EditEquipment-D2FCZljd.js"), "./Pages/Equipments/Index/Screen.vue": () => import("./assets/Screen-Cuce7w9O.js"), "./Pages/Equipments/IndexEquipment.vue": () => import("./assets/IndexEquipment-BqyUdMbS.js"), "./Pages/Equipments/ShowEquipment.vue": () => import("./assets/ShowEquipment-Di6pVRrk.js"), "./Pages/Excalidraw.vue": () => import("./assets/Excalidraw-5bxgffy3.js"), "./Pages/FBVersions/Versions/Create/Screen.vue": () => import("./assets/Screen-COB41vb5.js"), "./Pages/FBVersions/Versions/CreateVersion.vue": () => import("./assets/CreateVersion-B7E_U4Wk.js"), "./Pages/FBVersions/Versions/Edit/Screen.vue": () => import("./assets/Screen-5r_sPds6.js"), "./Pages/FBVersions/Versions/EditVersion.vue": () => import("./assets/EditVersion-XoD9Dsus.js"), "./Pages/FBVersions/Versions/Index/Screen.vue": () => import("./assets/Screen-BmaGrTyH.js"), "./Pages/FBVersions/Versions/IndexVersion.vue": () => import("./assets/IndexVersion-DoLvhfA8.js"), "./Pages/FBVersions/Versions/Show/Screen.vue": () => import("./assets/Screen-BirpD2RG.js"), "./Pages/FBVersions/Versions/ShowVersion.vue": () => import("./assets/ShowVersion-h21UdoGO.js"), "./Pages/FBVersions/_components/VersionList.vue": () => import("./assets/VersionList-CEVMYLL5.js"), "./Pages/FBVersions/_layouts/LayoutFBVersions.vue": () => import("./assets/LayoutFBVersions-CBxbOQZ8.js"), "./Pages/FBVersions/_layouts/SidebarLayoutVersion.vue": () => import("./assets/SidebarLayoutVersion-wzzH9sRu.js"), "./Pages/Index/Factory.vue": () => import("./assets/Factory-2ZHSsfDx.js"), "./Pages/Index/Index.vue": () => import("./assets/Index-zhWjniTa.js"), "./Pages/JoinUs/Index.vue": () => import("./assets/Index-D3YooWAL.js"), "./Pages/Lessons/Create/Screen.vue": () => import("./assets/Screen-BPSGiJmO.js"), "./Pages/Lessons/CreateLesson.vue": () => import("./assets/CreateLesson-S7LbqP0M.js"), "./Pages/Lessons/Edit/Screen.vue": () => import("./assets/Screen-DWpenVUd.js"), "./Pages/Lessons/EditLesson.vue": () => import("./assets/EditLesson-CRjhXrol.js"), "./Pages/Lessons/Index/Screen.vue": () => import("./assets/Screen-DuKoq3Xc.js"), "./Pages/Lessons/IndexLesson.vue": () => import("./assets/IndexLesson-B3yBz852.js"), "./Pages/Lessons/Show/Screen.vue": () => import("./assets/Screen-DLvSDSEY.js"), "./Pages/Lessons/ShowLesson.vue": () => import("./assets/ShowLesson-CVJmKWuO.js"), "./Pages/Lessons/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-Dj2LdwWi.js"), "./Pages/Lessons/_layouts/SidebarLayoutLesson.vue": () => import("./assets/SidebarLayoutLesson-3ph7vEE9.js"), "./Pages/Media/Index.vue": () => import("./assets/Index-CU1hrLcf.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-Cxi0k0Dk.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-D66YmZYS.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-DUHglCIa.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-Dp6jjNY2.js"), "./Pages/Projects/Customers/Create/Screen.vue": () => import("./assets/Screen-CuKaKnWq.js"), "./Pages/Projects/Customers/CreateCustomer.vue": () => import("./assets/CreateCustomer-BC_muZw2.js"), "./Pages/Projects/Customers/Edit/Screen.vue": () => import("./assets/Screen-Cg3GkLpP.js"), "./Pages/Projects/Customers/EditCustomer.vue": () => import("./assets/EditCustomer-De79v4Wi.js"), "./Pages/Projects/Customers/Index/Screen.vue": () => import("./assets/Screen-DoHAontP.js"), "./Pages/Projects/Customers/IndexCustomer.vue": () => import("./assets/IndexCustomer-C8yFZiYO.js"), "./Pages/Projects/Customers/Show/Screen.vue": () => import("./assets/Screen-CKUyiJ5u.js"), "./Pages/Projects/Customers/ShowCustomer.vue": () => import("./assets/ShowCustomer-DLeY267K.js"), "./Pages/Projects/Index/Screen.vue": () => import("./assets/Screen-CKKw3u0F.js"), "./Pages/Projects/Project/Create/Screen.vue": () => import("./assets/Screen-BRcvz-DP.js"), "./Pages/Projects/Project/CreateProject.vue": () => import("./assets/CreateProject-CTwD4vFd.js"), "./Pages/Projects/Project/Edit/Screen.vue": () => import("./assets/Screen-C_iXs8Z5.js"), "./Pages/Projects/Project/EditProject.vue": () => import("./assets/EditProject-ezy_yTz5.js"), "./Pages/Projects/Project/Index/Screen.vue": () => import("./assets/Screen-DfDUaFxc.js"), "./Pages/Projects/Project/IndexProject.vue": () => import("./assets/IndexProject-BZZydqoN.js"), "./Pages/Projects/Project/Show/Screen.vue": () => import("./assets/Screen-B84QTM_L.js"), "./Pages/Projects/Project/ShowProject.vue": () => import("./assets/ShowProject-Bu9ZGgCH.js"), "./Pages/Projects/Services/Create/Screen.vue": () => import("./assets/Screen-Ck1zZRtr.js"), "./Pages/Projects/Services/CreateService.vue": () => import("./assets/CreateService-BGCA1zk0.js"), "./Pages/Projects/Services/Edit/Screen.vue": () => import("./assets/Screen-jAyYNsej.js"), "./Pages/Projects/Services/EditService.vue": () => import("./assets/EditService-Dx0TH1n6.js"), "./Pages/Projects/Services/Index/Screen.vue": () => import("./assets/Screen-DtsoGuso.js"), "./Pages/Projects/Services/Index/ServiceItem.vue": () => import("./assets/ServiceItem-Dv3XwMme.js"), "./Pages/Projects/Services/IndexService.vue": () => import("./assets/IndexService-k86MJeo6.js"), "./Pages/Projects/Services/Show/Screen.vue": () => import("./assets/Screen-CkiAq9Qd.js"), "./Pages/Projects/Services/ShowService.vue": () => import("./assets/ShowService-DfwqeOC1.js"), "./Pages/Projects/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-BH0qsqUS.js"), "./Pages/Projects/_layouts/LayoutProjects.vue": () => import("./assets/LayoutProjects-Dsp3IFJe.js"), "./Pages/Projects/_layouts/SidebarLayoutProject.vue": () => import("./assets/SidebarLayoutProject-C4x7YDcn.js"), "./Pages/Rendition/LanguagePacks/Create/Screen.vue": () => import("./assets/Screen-BlaOY-5j.js"), "./Pages/Rendition/LanguagePacks/CreateLanguagePacks.vue": () => import("./assets/CreateLanguagePacks-Js16eT3Y.js"), "./Pages/Rendition/LanguagePacks/Edit/Screen.vue": () => import("./assets/Screen-CsS-RI-9.js"), "./Pages/Rendition/LanguagePacks/EditLanguagePacks.vue": () => import("./assets/EditLanguagePacks-DR4DMGQd.js"), "./Pages/Rendition/LanguagePacks/Index/PacksTable.vue": () => import("./assets/PacksTable-BRaypF59.js"), "./Pages/Rendition/LanguagePacks/Index/Screen.vue": () => import("./assets/Screen-Dxh7U0UK.js"), "./Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue": () => import("./assets/IndexLanguagePacks-DaTrGqZn.js"), "./Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue": () => import("./assets/ShowLanguagePacks-o7e_kA6f.js"), "./Pages/Rendition/LanguagePacks/Words.vue": () => import("./assets/Words-DPQThnyW.js"), "./Pages/Rendition/LanguagePacks/Words/Screen.vue": () => import("./assets/Screen-VDfznxoB.js"), "./Pages/Rendition/Words/Create/Screen.vue": () => import("./assets/Screen-CegQR5Ik.js"), "./Pages/Rendition/Words/CreateWord.vue": () => import("./assets/CreateWord-D1slFN0q.js"), "./Pages/Rendition/Words/Edit/Screen.vue": () => import("./assets/Screen-COq-tEG9.js"), "./Pages/Rendition/Words/EditWord.vue": () => import("./assets/EditWord-DQBJVQX-.js"), "./Pages/Rendition/Words/Index/Screen.vue": () => import("./assets/Screen-s5G_cjeJ.js"), "./Pages/Rendition/Words/IndexWord.vue": () => import("./assets/IndexWord-BX93xMyz.js"), "./Pages/Rendition/Words/Show/Screen.vue": () => import("./assets/Screen-DqCIELYr.js"), "./Pages/Rendition/Words/ShowWord.vue": () => import("./assets/ShowWord-BF9v09n4.js"), "./Pages/Rendition/_components/MultipleChoice.vue": () => import("./assets/MultipleChoice-u5pTSo_A.js"), "./Pages/Rendition/_components/TranslateWord.vue": () => import("./assets/TranslateWord-CGHthvW-.js"), "./Pages/Rendition/_components/WordCompletion.vue": () => import("./assets/WordCompletion-CSmlEb1_.js"), "./Pages/Rendition/_components/WordsTable.vue": () => import("./assets/WordsTable-D4oJJB5N.js"), "./Pages/Rendition/_layouts/LayoutRendition.vue": () => import("./assets/LayoutRendition-DF8pYZkU.js"), "./Pages/Rendition/_layouts/SidebarPackGame.vue": () => import("./assets/SidebarPackGame-B-T1nrbq.js"), "./Pages/Rendition/_layouts/SidebarRendition.vue": () => import("./assets/SidebarRendition-DjXs2hnm.js"), "./Pages/Seo/Create.vue": () => import("./assets/Create-CUD49S05.js"), "./Pages/Seo/Edit.vue": () => import("./assets/Edit-D6y1GpJA.js"), "./Pages/Seo/Index.vue": () => import("./assets/Index-DQYkelsi.js"), "./Pages/SocialMedia/Index.vue": () => import("./assets/Index-DUoBKF7m.js"), "./Pages/SoftwareProducts/Create.vue": () => import("./assets/Create-BdSBTOmf.js"), "./Pages/SoftwareProducts/Edit.vue": () => import("./assets/Edit-BvkfhlLO.js"), "./Pages/SoftwareProducts/Index.vue": () => import("./assets/Index-BDG1qC-T.js"), "./Pages/SoftwareProducts/Show.vue": () => import("./assets/Show-C4u6lUfx.js"), "./Pages/SoftwareProducts/component/Box.vue": () => import("./assets/Box-CvUfE-UW.js"), "./Pages/SoftwareProducts/component/ConfirmModal.vue": () => import("./assets/ConfirmModal-8bTg5PxV.js"), "./Pages/SoftwareProducts/component/SPAddress.vue": () => import("./assets/SPAddress-C4B-URBw.js"), "./Pages/SoftwareProducts/component/SPPrice.vue": () => import("./assets/SPPrice-DDe_ZJN3.js"), "./Pages/SoftwareProducts/component/SPSpaces.vue": () => import("./assets/SPSpaces-C-9fwGUn.js"), "./Pages/TestCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-wPC1KaEz.js"), "./Pages/TestCategories/Categories/Create/TestCategoriesCreateForm.vue": () => import("./assets/TestCategoriesCreateForm-BbuUxS0K.js"), "./Pages/TestCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-BR0zNETk.js"), "./Pages/TestCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-BDfXsBcr.js"), "./Pages/TestCategories/Categories/Edit/TestCategoriesEditForm.vue": () => import("./assets/TestCategoriesEditForm-B842GjX9.js"), "./Pages/TestCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-BZ5nz9-N.js"), "./Pages/TestCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-DDlq1h4u.js"), "./Pages/TestCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-Cg1MyM4W.js"), "./Pages/TestCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-BxyOGMzr.js"), "./Pages/TestCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-BdeUg1_n.js"), "./Pages/TestCategories/Tests/Create/Screen.vue": () => import("./assets/Screen-B1GBnFe4.js"), "./Pages/TestCategories/Tests/Create/TestCreateForm.vue": () => import("./assets/TestCreateForm-Cm3aj6bh.js"), "./Pages/TestCategories/Tests/CreateTest.vue": () => import("./assets/CreateTest-DpkjRnXC.js"), "./Pages/TestCategories/Tests/Edit/Screen.vue": () => import("./assets/Screen-CUaqceDQ.js"), "./Pages/TestCategories/Tests/Edit/TestUpdateForm.vue": () => import("./assets/TestUpdateForm-Dox7qfab.js"), "./Pages/TestCategories/Tests/EditTest.vue": () => import("./assets/EditTest-Cbk9q9X6.js"), "./Pages/TestCategories/Tests/Index/Screen.vue": () => import("./assets/Screen-Cx9CrwyX.js"), "./Pages/TestCategories/Tests/IndexTest.vue": () => import("./assets/IndexTest-3AvlTuC5.js"), "./Pages/TestCategories/Tests/Result/Screen.vue": () => import("./assets/Screen-CthOyeFn.js"), "./Pages/TestCategories/Tests/Show/Screen.vue": () => import("./assets/Screen-CJcQ5CLf.js"), "./Pages/TestCategories/Tests/ShowTest.vue": () => import("./assets/ShowTest-Dl9488XA.js"), "./Pages/TestCategories/Tests/Take/Screen.vue": () => import("./assets/Screen-CQFTAzxW.js"), "./Pages/TestCategories/Tests/TakeTest.vue": () => import("./assets/TakeTest-BtpHhuBN.js"), "./Pages/TestCategories/Tests/TestResult.vue": () => import("./assets/TestResult-BlGeQhpr.js"), "./Pages/TestCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-mQ-15a0V.js"), "./Pages/TestCategories/_composables/TestList.vue": () => import("./assets/TestList-D_f7BfrK.js"), "./Pages/TestCategories/_layouts/LayoutTestCategories.vue": () => import("./assets/LayoutTestCategories-CPJEl1HF.js"), "./Pages/TestCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-DhpuPQAL.js"), "./Pages/TestCategories/_layouts/SidebarLayoutTest.vue": () => import("./assets/SidebarLayoutTest-tzEkhXZS.js"), "./Pages/ThemeManagement.vue": () => import("./assets/ThemeManagement-DgzGwL0z.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-bSatZHEn.js"), "./Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue": () => import("./assets/CategoriesCreateFrom-LFKkqJl6.js"), "./Pages/WritesCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-GdVasAqA.js"), "./Pages/WritesCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-BfUFy5T6.js"), "./Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue": () => import("./assets/CategoriesEditFrom-BKupmvHY.js"), "./Pages/WritesCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-D939D8w4.js"), "./Pages/WritesCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-B_SmYD9k.js"), "./Pages/WritesCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-DWCmbl6T.js"), "./Pages/WritesCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-3GEUqJe4.js"), "./Pages/WritesCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-C7td838w.js"), "./Pages/WritesCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-DewLp7qC.js"), "./Pages/WritesCategories/Categories/WriteByCategory.vue": () => import("./assets/WriteByCategory-D4kz7VoL.js"), "./Pages/WritesCategories/Categories/WriteByCategory/Screen.vue": () => import("./assets/Screen-DPnJi06J.js"), "./Pages/WritesCategories/Writes/Create/FormField.vue": () => import("./assets/FormField-DPlgYte7.js"), "./Pages/WritesCategories/Writes/Create/Screen.vue": () => import("./assets/Screen-C2IOay4C.js"), "./Pages/WritesCategories/Writes/Create/WriteCreateForm.vue": () => import("./assets/WriteCreateForm-Cu9CekRJ.js"), "./Pages/WritesCategories/Writes/CreateWrite.vue": () => import("./assets/CreateWrite-DnSTyHWc.js"), "./Pages/WritesCategories/Writes/Edit/Screen.vue": () => import("./assets/Screen-DxfVo2fY.js"), "./Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue": () => import("./assets/WriteUpdateForm-Ckkv7BMQ.js"), "./Pages/WritesCategories/Writes/EditWrite.vue": () => import("./assets/EditWrite-B4K6DZAb.js"), "./Pages/WritesCategories/Writes/Index/Screen.vue": () => import("./assets/Screen-BbDZ2Q-R.js"), "./Pages/WritesCategories/Writes/IndexWrite.vue": () => import("./assets/IndexWrite-BXzs50kE.js"), "./Pages/WritesCategories/Writes/Show/Screen.vue": () => import("./assets/Screen-aw3aqb5-.js"), "./Pages/WritesCategories/Writes/ShowWrite.vue": () => import("./assets/ShowWrite-DWXn_mXH.js"), "./Pages/WritesCategories/_components/RichTextEditor.vue": () => import("./assets/RichTextEditor-DOsunnna.js"), "./Pages/WritesCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-C_YNeSgy.js"), "./Pages/WritesCategories/_composables/WriteList.vue": () => import("./assets/WriteList-DDi5QWJr.js"), "./Pages/WritesCategories/_layouts/LayoutWritesCategories.vue": () => import("./assets/LayoutWritesCategories-gAUIZUtn.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-DWwJO5Tq.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue": () => import("./assets/SidebarLayoutWrite-65-dY_yA.js") }))).default;
      page2.layout = page2.layout || _sfc_main;
      return page2;
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h$1(App, props) });
      app.use(plugin).use(_).use(store).component("font-awesome-icon", FontAwesomeIcon);
      return app;
    },
    progress: false
  });
}
export {
  GoBackSvg as G,
  _export_sfc as _,
  render as default
};
