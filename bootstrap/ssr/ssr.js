import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, ref, onMounted, watch, onUnmounted, createTextVNode, provide, createSSRApp, h as h$1 } from "vue";
import { usePage, Link, Head, createInertiaApp } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
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
const _sfc_main$7 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "mr-2 h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/GoBack.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const GoBackSvg = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$6 = {
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
        class: ["flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-500 ease-out", {
          "bg-base-content text-base-100": isActive.value,
          "text-base-content hover:bg-base-300": !isActive.value,
          "justify-center px-2": __props.isCompact
        }],
        title: __props.isCompact ? __props.label : ""
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ "mx-auto gap-0": __props.isCompact, "gap-3": !__props.isCompact }, "flex items-center transition-all duration-500 ease-out"])}"${_scopeId}><div class="flex h-5 w-5 flex-shrink-0 items-center justify-center"${_scopeId}>`);
            if (__props.icon === "home") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg>`);
            } else if (__props.icon === "grid") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "lock") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "trash") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg>`);
            } else if (__props.icon === "speech") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "user-plus") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "book-open") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"${_scopeId}></path></svg>`);
            } else if (__props.icon === "palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"${_scopeId}></path></svg>`);
            } else if (__props.icon === "user") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "volume-up") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "chart-bar") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "search") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-pencil") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-book") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-globe") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-sync") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-project-diagram") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-cogs") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-tools") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-laptop-code") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-photo-video") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-bookmark") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-share-alt") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-language") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-chalkboard-teacher") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-user-circle") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"${_scopeId}></path></svg>`);
            } else {
              _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
                icon: dynamicIcon.value,
                class: "h-5 w-5 transition-all duration-500 ease-out"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div class="${ssrRenderClass([{ "w-0 opacity-0": __props.isCompact, "w-auto opacity-100": !__props.isCompact }, "overflow-hidden transition-all duration-500 ease-out"])}"${_scopeId}><span class="whitespace-nowrap text-sm font-medium"${_scopeId}>${ssrInterpolate(__props.label)}</span></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["flex items-center transition-all duration-500 ease-out", { "mx-auto gap-0": __props.isCompact, "gap-3": !__props.isCompact }]
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
                    class: "h-5 w-5 transition-all duration-500 ease-out"
                  }, null, 8, ["icon"]))
                ]),
                createVNode("div", {
                  class: ["overflow-hidden transition-all duration-500 ease-out", { "w-0 opacity-0": __props.isCompact, "w-auto opacity-100": !__props.isCompact }]
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/NavItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/SocialLink.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
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
          _push(ssrRenderComponent(_sfc_main$5, {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/SocialLinks.vue");
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
        dark: "Dark",
        "neon-light": "Neon Light",
        "neon-dark": "Neon Dark",
        "lotr-light": "LOTR Light",
        "lotr-dark": "LOTR Dark",
        custom: "Custom"
      };
      return themeMap[theme] || theme;
    });
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
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
      const highlightClass = isDarkMode.value ? "bg-yellow-600/30 text-yellow-300" : "bg-yellow-200 text-yellow-900";
      return text.replace(regex, `<mark class="${highlightClass} px-1 rounded">$1</mark>`);
    };
    const handleKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search..."]');
        if (searchInput) {
          searchInput.focus();
          showSearchResults.value = true;
        }
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header class="${ssrRenderClass([currentTheme.value, "border-base-200/60 bg-base-100/95 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-md transition-all duration-300"])}" data-v-79ce3c43><div class="flex h-14 items-center justify-between px-4 sm:px-6 lg:hidden" data-v-79ce3c43>`);
      if (basePath.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: `/${basePath.value}`,
          class: "hover:bg-base-200/80 btn btn-ghost btn-sm rounded-xl px-3 transition-all duration-200"
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
        _push(`<div class="w-10" data-v-79ce3c43></div>`);
      }
      _push(`<div class="flex items-center space-x-2" data-v-79ce3c43><div class="bg-primary/10 flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg" data-v-79ce3c43>`);
      if (logoPath.value && !isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-79ce3c43>`);
      } else {
        _push(`<span class="text-xs font-bold text-primary" data-v-79ce3c43>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-sm font-semibold text-base-content transition-colors duration-200 hover:text-primary"
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
      _push(`</div><button class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-xl px-3 transition-all duration-200" data-v-79ce3c43><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-79ce3c43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-79ce3c43></path></svg></button></div><div class="hidden h-16 items-center justify-between px-6 lg:flex" data-v-79ce3c43><div class="flex items-center space-x-4" data-v-79ce3c43><div class="flex items-center space-x-3" data-v-79ce3c43><div class="bg-primary/10 ring-primary/20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ring-1" data-v-79ce3c43>`);
      if (logoPath.value && !isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-79ce3c43>`);
      } else {
        _push(`<span class="text-sm font-bold text-primary" data-v-79ce3c43>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-lg font-semibold text-base-content transition-colors duration-200 hover:text-primary"
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
      _push(`</div></div><div class="mx-8 max-w-lg flex-1" data-v-79ce3c43><div class="relative" data-v-79ce3c43><div class="relative" data-v-79ce3c43><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4" data-v-79ce3c43><svg class="${ssrRenderClass([isDarkMode.value ? "text-gray-400" : "text-gray-500", "h-4 w-4"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-79ce3c43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-79ce3c43></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ara..." class="${ssrRenderClass([[
        isDarkMode.value ? "border-gray-600/60 bg-gray-800/90 text-gray-100 placeholder-gray-400 focus:border-blue-500/40 focus:ring-blue-500/20" : "border-gray-300/60 bg-white/90 text-gray-900 placeholder-gray-500 focus:border-blue-500/40 focus:ring-blue-500/20"
      ], "search-input w-full rounded-lg border py-3 pl-12 pr-16 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"])}" data-v-79ce3c43><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4" data-v-79ce3c43><kbd class="${ssrRenderClass([
        isDarkMode.value ? "border-gray-600/60 bg-gray-700/60 text-gray-300" : "border-gray-300/60 bg-gray-100/60 text-gray-600",
        "rounded border px-2 py-1 text-xs font-semibold"
      ])}" data-v-79ce3c43>⌘K</kbd></div></div>`);
      if (showSearchResults.value && (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0 || searchQuery.value.length > 0)) {
        _push(`<div class="${ssrRenderClass([isDarkMode.value ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white", "search-results-dropdown absolute left-0 right-0 top-full z-50 mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border shadow-2xl"])}" data-v-79ce3c43>`);
        if (isSearching.value) {
          _push(`<div class="p-4 text-center" data-v-79ce3c43><div class="inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-primary" data-v-79ce3c43></div><span class="${ssrRenderClass([isDarkMode.value ? "text-gray-300" : "text-gray-600", "ml-2 text-sm"])}" data-v-79ce3c43>Aranıyor...</span></div>`);
        } else if (searchQuery.value.length > 0 && (!searchResults.value.articles || searchResults.value.articles.length === 0) && (!searchResults.value.categories || searchResults.value.categories.length === 0)) {
          _push(`<div class="p-6 text-center" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-500" : "text-gray-400", "mb-2"])}" data-v-79ce3c43><svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79ce3c43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-79ce3c43></path></svg></div><span class="${ssrRenderClass([isDarkMode.value ? "text-gray-300" : "text-gray-600", "text-sm"])}" data-v-79ce3c43>&quot;${ssrInterpolate(searchQuery.value)}&quot; için sonuç bulunamadı</span></div>`);
        } else if (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0) {
          _push(`<div class="py-2" data-v-79ce3c43>`);
          if (searchResults.value.articles && searchResults.value.articles.length > 0) {
            _push(`<div class="mb-3" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "border-gray-600 text-gray-400" : "border-gray-200 text-gray-600", "border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"])}" data-v-79ce3c43> Yazılar </div><!--[-->`);
            ssrRenderList(searchResults.value.articles, (article, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", index)} class="${ssrRenderClass([
                "cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0",
                isDarkMode.value ? "border-gray-700 hover:bg-gray-700" : "border-gray-50 hover:bg-gray-50",
                selectedIndex.value === index ? isDarkMode.value ? "border-blue-500 bg-blue-900/30" : "border-blue-200 bg-blue-50" : ""
              ])}" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-200" : "text-gray-800", "text-sm font-semibold leading-none"])}" data-v-79ce3c43>${highlightText(article.title) ?? ""}</div><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-400" : "text-gray-700", "mt-0.5 text-xs leading-tight"])}" data-v-79ce3c43>${highlightText(article.excerpt) ?? ""}</div>`);
              if (article.category) {
                _push(`<div class="mt-1" data-v-79ce3c43><span class="${ssrRenderClass([isDarkMode.value ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-800", "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"])}" data-v-79ce3c43>${ssrInterpolate(article.category)}</span></div>`);
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
            _push(`<div class="mb-3" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "border-gray-600 text-gray-400" : "border-gray-200 text-gray-600", "border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"])}" data-v-79ce3c43> Kategoriler </div><!--[-->`);
            ssrRenderList(searchResults.value.categories, (category, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", searchResults.value.articles.length + index)} class="${ssrRenderClass([
                "cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0",
                isDarkMode.value ? "border-gray-700 hover:bg-gray-700" : "border-gray-50 hover:bg-gray-50",
                selectedIndex.value === searchResults.value.articles.length + index ? isDarkMode.value ? "border-blue-500 bg-blue-900/30" : "border-blue-200 bg-blue-50" : ""
              ])}" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-200" : "text-gray-800", "text-sm font-semibold leading-none"])}" data-v-79ce3c43>${highlightText(category.name) ?? ""}</div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="py-2" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "border-gray-600 text-gray-400" : "border-gray-200 text-gray-600", "border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"])}" data-v-79ce3c43> Hızlı Eylemler </div><div data-selected-index="0" class="${ssrRenderClass([
            "cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0",
            isDarkMode.value ? "border-gray-700 hover:bg-gray-700" : "border-gray-50 hover:bg-gray-50",
            selectedIndex.value === 0 ? isDarkMode.value ? "border-blue-500 bg-blue-900/30" : "border-blue-200 bg-blue-50" : ""
          ])}" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-200" : "text-gray-800", "text-sm font-semibold"])}" data-v-79ce3c43> Tüm Yazıları Görüntüle </div><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-400" : "text-gray-700", "mt-0.5 text-xs"])}" data-v-79ce3c43> Tüm yayınlanmış yazıları görüntüle </div></div><div data-selected-index="1" class="${ssrRenderClass([
            "cursor-pointer border-b px-3 py-2 transition-colors duration-200 last:border-b-0",
            isDarkMode.value ? "border-gray-700 hover:bg-gray-700" : "border-gray-50 hover:bg-gray-50",
            selectedIndex.value === 1 ? isDarkMode.value ? "border-blue-500 bg-blue-900/30" : "border-blue-200 bg-blue-50" : ""
          ])}" data-v-79ce3c43><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-200" : "text-gray-800", "text-sm font-semibold"])}" data-v-79ce3c43> Tüm Kategorileri Görüntüle </div><div class="${ssrRenderClass([isDarkMode.value ? "text-gray-400" : "text-gray-700", "mt-0.5 text-xs"])}" data-v-79ce3c43> Tüm kategorileri görüntüle </div></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center space-x-4" data-v-79ce3c43><div class="hidden items-center space-x-6 xl:flex" data-v-79ce3c43>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/dashboard",
        class: "text-base-content/80 text-sm font-medium transition-colors duration-200 hover:text-base-content"
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
      _push(`<a href="https://youtu.be/FPsx8xHLR1k?si=nZnBfqjYQun9R06h" target="_blank" class="text-base-content/80 text-sm font-medium transition-colors duration-200 hover:text-base-content" data-v-79ce3c43> Destek </a></div><button class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-lg px-3 transition-all duration-200" data-v-79ce3c43>`);
      if (isDarkMode.value) {
        _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-79ce3c43><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-79ce3c43></path></svg>`);
      } else {
        _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-79ce3c43><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-79ce3c43></path></svg>`);
      }
      _push(`</button><button class="hover:bg-base-200/80 btn btn-ghost btn-sm rounded-lg px-3 transition-all duration-200 xl:hidden" data-v-79ce3c43><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-79ce3c43><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-79ce3c43></path></svg></button></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "opacity-100" : "opacity-0", "fixed inset-0 z-50 transition-all duration-300 ease-out"])}" data-v-79ce3c43><div class="bg-base-content/20 absolute inset-0 backdrop-blur-sm" data-v-79ce3c43></div><div class="relative flex h-full items-end justify-center" data-v-79ce3c43><div class="${ssrRenderClass([isMenuOpen.value ? "translate-y-0" : "translate-y-full", "w-full max-w-sm transform transition-all duration-300 ease-out"])}" data-v-79ce3c43><div class="border-base-200/40 bg-base-100/95 mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl backdrop-blur-xl" data-v-79ce3c43><div class="flex justify-center pb-2 pt-4" data-v-79ce3c43><div class="bg-base-300/60 h-1.5 w-16 rounded-full" data-v-79ce3c43></div></div><div class="px-4 pb-6 sm:px-6" data-v-79ce3c43>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "mb-4 block"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-base-200/50 flex items-center space-x-3 rounded-2xl p-3 backdrop-blur-sm" data-v-79ce3c43${_scopeId}><div class="bg-primary/10 ring-primary/20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1" data-v-79ce3c43${_scopeId}>`);
              if (logoPath.value && !isLoading.value) {
                _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-79ce3c43${_scopeId}>`);
              } else {
                _push2(`<span class="text-sm font-bold text-primary" data-v-79ce3c43${_scopeId}>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
              }
              _push2(`</div><div data-v-79ce3c43${_scopeId}><h3 class="text-base font-semibold text-base-content" data-v-79ce3c43${_scopeId}>${ssrInterpolate(seoTitle.value)}</h3><p class="text-base-content/60 text-xs" data-v-79ce3c43${_scopeId}>${ssrInterpolate(appName.value)}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-base-200/50 flex items-center space-x-3 rounded-2xl p-3 backdrop-blur-sm" }, [
                  createVNode("div", { class: "bg-primary/10 ring-primary/20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1" }, [
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
                    createVNode("h3", { class: "text-base font-semibold text-base-content" }, toDisplayString(seoTitle.value), 1),
                    createVNode("p", { class: "text-base-content/60 text-xs" }, toDisplayString(appName.value), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-2" data-v-79ce3c43><div class="space-y-1" data-v-79ce3c43>`);
        _push(ssrRenderComponent(_sfc_main$6, {
          href: "/",
          icon: "home",
          label: "Ana Sayfa"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          href: "/writes",
          icon: "fa-solid fa-pencil",
          label: "Yazılar"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, {
          href: "/categories",
          icon: "fa-solid fa-book",
          label: "Kategoriler"
        }, null, _parent));
        _push(`</div><div class="border-base-200/40 border-t pt-3" data-v-79ce3c43>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/dashboard",
          class: "block"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-primary/5 hover:bg-primary/10 border-primary/20 flex items-center space-x-3 rounded-2xl border p-3 transition-all duration-200" data-v-79ce3c43${_scopeId}><div class="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-xl" data-v-79ce3c43${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79ce3c43${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-79ce3c43${_scopeId}></path></svg></div><div data-v-79ce3c43${_scopeId}><h4 class="text-sm font-semibold text-primary" data-v-79ce3c43${_scopeId}>Panel</h4><p class="text-primary/70 text-xs" data-v-79ce3c43${_scopeId}>Yönetim Paneli</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-primary/5 hover:bg-primary/10 border-primary/20 flex items-center space-x-3 rounded-2xl border p-3 transition-all duration-200" }, [
                  createVNode("div", { class: "bg-primary/10 flex h-8 w-8 items-center justify-center rounded-xl" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-4 w-4 text-primary",
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
                    ]))
                  ]),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-sm font-semibold text-primary" }, "Panel"),
                    createVNode("p", { class: "text-primary/70 text-xs" }, "Yönetim Paneli")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (isLoggedIn.value) {
          _push(`<div class="space-y-1" data-v-79ce3c43><div class="border-base-200/40 border-t pt-3" data-v-79ce3c43><h4 class="text-base-content/60 mb-2 text-xs font-semibold uppercase tracking-wider" data-v-79ce3c43>Yönetim</h4>`);
          _push(ssrRenderComponent(_sfc_main$6, {
            href: "/rendition/words",
            icon: "fa-solid fa-globe",
            label: "Kelimeler"
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$6, {
            href: "/versions",
            icon: "fa-solid fa-sync",
            label: "Versiyonlar"
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!isLoggedIn.value) {
          _push(`<div class="border-base-200/40 mt-4 border-t pt-3" data-v-79ce3c43><a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank" data-v-79ce3c43><div class="bg-primary/5 hover:bg-primary/10 rounded-2xl p-3 text-center transition-all duration-200" data-v-79ce3c43><span class="text-sm font-medium text-primary" data-v-79ce3c43>Powered by Notiriel</span></div></a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isLoggedIn.value) {
          _push(`<div class="mt-3" data-v-79ce3c43>`);
          _push(ssrRenderComponent(_sfc_main$4, { "is-compact": false }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4 flex flex-col items-center space-y-2" data-v-79ce3c43><button class="bg-base-200/50 hover:bg-base-200/80 flex items-center space-x-2 rounded-2xl px-3 py-2 backdrop-blur-sm transition-all duration-200" data-v-79ce3c43>`);
        if (isDarkMode.value) {
          _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-79ce3c43><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-79ce3c43></path></svg>`);
        } else {
          _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-79ce3c43><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-79ce3c43></path></svg>`);
        }
        _push(`<span class="text-sm font-medium text-base-content" data-v-79ce3c43>${ssrInterpolate(currentThemeName.value)}</span></button><p class="text-base-content/50 text-xs" data-v-79ce3c43>Notiriel - Tüm Hakları Saklıdır</p></div></div></div></div></div></div>`);
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
const HeaderLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-79ce3c43"]]);
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
    const props = __props;
    const dynamicIcon = computed(() => {
      return Array.isArray(props.icon) ? props.icon : props.icon;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: ["flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200", {
          "bg-base-content text-base-100 shadow-sm": __props.isActive,
          "text-base-content/70 hover:bg-base-200/50 hover:text-base-content": !__props.isActive
        }]
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-4 w-4 flex-shrink-0 items-center justify-center"${_scopeId}>`);
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
              createVNode("div", { class: "flex h-4 w-4 flex-shrink-0 items-center justify-center" }, [
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
              ]),
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
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: ["border-base-200/60 bg-base-100/95 sticky top-14 z-40 w-full border-b shadow-sm backdrop-blur-md transition-all duration-300", currentTheme.value]
      }, _attrs))} data-v-423ad2f0><div class="flex h-12 items-center justify-between px-4 sm:px-6" data-v-423ad2f0><div class="flex items-center space-x-1" data-v-423ad2f0>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/",
        icon: "home",
        label: "Ana Sayfa",
        "is-active": isActiveRoute("/")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/writes",
        icon: "fa-solid fa-pencil",
        label: "Yazılar",
        "is-active": isActiveRoute("/writes")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/categories",
        icon: "fa-solid fa-book",
        label: "Kategoriler",
        "is-active": isActiveRoute("/categories")
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
      _push(`</div><div class="flex items-center space-x-2" data-v-423ad2f0>`);
      if (!isLoggedIn.value) {
        _push(`<div data-v-423ad2f0>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/join-us",
          class: "block"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="bg-base-200/50 hover:bg-base-200/80 border-base-300/60 flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-base-content transition-all duration-200 hover:scale-105" data-v-423ad2f0${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-423ad2f0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-423ad2f0${_scopeId}></path></svg><span class="hidden sm:inline" data-v-423ad2f0${_scopeId}>Aramıza Katıl</span></button>`);
            } else {
              return [
                createVNode("button", { class: "bg-base-200/50 hover:bg-base-200/80 border-base-300/60 flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-sm font-medium text-base-content transition-all duration-200 hover:scale-105" }, [
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
                  ])),
                  createVNode("span", { class: "hidden sm:inline" }, "Aramıza Katıl")
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
      if (!isLoggedIn.value) {
        _push(`<div class="hidden md:flex" data-v-423ad2f0>`);
        _push(ssrRenderComponent(_sfc_main$4, { "is-compact": true }, null, _parent));
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
const SidebarLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-423ad2f0"]]);
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
      _push(`<div class="flex h-screen flex-col">`);
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
    // Default tema 'light' olarak ayarlanıyor
    currentTheme: localStorage.getItem("theme") || "light",
    // Mevcut temalar - sadece 4 tema
    availableThemes: [
      "light",
      "dark",
      "lotr-light",
      "lotr-dark",
      "custom"
    ],
    customTheme: JSON.parse(localStorage.getItem("customTheme")) || {
      primary: "#570df8",
      secondary: "#f000b8",
      accent: "#37cdbe",
      neutral: "#3d4451",
      "base-100": "#ffffff",
      borderRadius: "0.5rem",
      animationSpeed: "0.3s",
      neonEffect: false,
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }
  },
  mutations: {
    // Temayı değiştirme işlemi
    setTheme(state2, theme) {
      document.documentElement.classList.remove(state2.currentTheme);
      state2.currentTheme = theme;
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.add(theme);
    },
    // Custom tema güncelleme
    updateCustomTheme(state2, customTheme) {
      state2.customTheme = { ...state2.customTheme, ...customTheme };
      localStorage.setItem("customTheme", JSON.stringify(state2.customTheme));
      if (state2.currentTheme === "custom") {
        this.dispatch("Theme/applyCustomTheme");
      }
    }
  },
  actions: {
    // Temayı değiştirme action'ı
    changeTheme({ commit }, theme) {
      commit("setTheme", theme);
    },
    // Temayı başlatma action'ı (uygulama başladığında çağrılır)
    initTheme({ commit, state: state2 }) {
      commit("setTheme", state2.currentTheme);
    },
    // Temayı değiştirme (toggle) action'ı - artık sadece light/dark arası geçiş değil
    toggleTheme({ commit, state: state2 }) {
      const currentIndex = state2.availableThemes.indexOf(state2.currentTheme);
      const nextIndex = (currentIndex + 1) % state2.availableThemes.length;
      const newTheme = state2.availableThemes[nextIndex];
      commit("setTheme", newTheme);
    },
    // Custom tema uygulama
    applyCustomTheme({ state: state2 }) {
      const custom = state2.customTheme;
      const root = document.documentElement;
      root.style.setProperty("--p", this.hexToHsl(custom.primary));
      root.style.setProperty("--s", this.hexToHsl(custom.secondary));
      root.style.setProperty("--a", this.hexToHsl(custom.accent));
      root.style.setProperty("--n", this.hexToHsl(custom.neutral));
      root.style.setProperty("--b1", this.hexToHsl(custom["base-100"]));
      root.style.setProperty("--border-radius", custom.borderRadius);
      root.style.setProperty("--animation-duration", custom.animationSpeed);
      root.style.setProperty("--shadow", custom.shadow);
      if (custom.neonEffect) {
        root.classList.add("neon-effect");
      } else {
        root.classList.remove("neon-effect");
      }
    },
    // Hex'i HSL'ye çevirme yardımcı fonksiyonu
    hexToHsl(hex) {
      const r2 = parseInt(hex.slice(1, 3), 16) / 255;
      const g2 = parseInt(hex.slice(3, 5), 16) / 255;
      const b2 = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r2, g2, b2);
      const min = Math.min(r2, g2, b2);
      let h2, s2, l2 = (max + min) / 2;
      if (max === min) {
        h2 = s2 = 0;
      } else {
        const d2 = max - min;
        s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
        switch (max) {
          case r2:
            h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
            break;
          case g2:
            h2 = (b2 - r2) / d2 + 2;
            break;
          case b2:
            h2 = (r2 - g2) / d2 + 4;
            break;
        }
        h2 /= 6;
      }
      return `${Math.round(h2 * 360)} ${Math.round(s2 * 100)}% ${Math.round(l2 * 100)}%`;
    }
  },
  getters: {
    // Mevcut temayı döndürür
    getCurrentTheme: (state2) => state2.currentTheme,
    // Mevcut temanın dark olup olmadığını kontrol eder (tema adından)
    isDarkTheme: (state2) => state2.currentTheme.includes("-dark"),
    // Tüm temaları döndürür
    getAvailableThemes: (state2) => state2.availableThemes,
    // Custom tema ayarlarını döndürür
    getCustomTheme: (state2) => state2.customTheme
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
      const page2 = (await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-D2pyyl3o.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-iewKjDeR.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-Dgu2Dqku.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DLkJfJPy.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DwYl_D6H.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C7XCA-UH.js"), "./Pages/Bookmarks/CreateBookmarks.vue": () => import("./assets/CreateBookmarks-DVJTJcy3.js"), "./Pages/Bookmarks/EditBookmarks.vue": () => import("./assets/EditBookmarks-DZrKHk0d.js"), "./Pages/Bookmarks/IndexBookmarks.vue": () => import("./assets/IndexBookmarks-BH0g04d3.js"), "./Pages/Bookmarks/ShowBookmarks.vue": () => import("./assets/ShowBookmarks-B_Ty2lxF.js"), "./Pages/Bookmarks/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-B16ebHBN.js"), "./Pages/Category/TypescriptTutorial.vue": () => import("./assets/TypescriptTutorial-UDcIixY-.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-CmRi6M2Q.js"), "./Pages/Equipments/Create/Screen.vue": () => import("./assets/Screen-D1PJcqvP.js"), "./Pages/Equipments/CreateEquipment.vue": () => import("./assets/CreateEquipment-CxmoL0yv.js"), "./Pages/Equipments/Edit/Screen.vue": () => import("./assets/Screen-Ca5kb9UJ.js"), "./Pages/Equipments/EditEquipment.vue": () => import("./assets/EditEquipment-D2FCZljd.js"), "./Pages/Equipments/Index/Screen.vue": () => import("./assets/Screen-Cuce7w9O.js"), "./Pages/Equipments/IndexEquipment.vue": () => import("./assets/IndexEquipment-BqyUdMbS.js"), "./Pages/Equipments/ShowEquipment.vue": () => import("./assets/ShowEquipment-Di6pVRrk.js"), "./Pages/Excalidraw.vue": () => import("./assets/Excalidraw-COkoWgJA.js"), "./Pages/FBVersions/Versions/Create/Screen.vue": () => import("./assets/Screen-DEDlkjfY.js"), "./Pages/FBVersions/Versions/CreateVersion.vue": () => import("./assets/CreateVersion-zZ1_C1Sk.js"), "./Pages/FBVersions/Versions/Edit/Screen.vue": () => import("./assets/Screen-C2MPdh29.js"), "./Pages/FBVersions/Versions/EditVersion.vue": () => import("./assets/EditVersion-qrY2qf-M.js"), "./Pages/FBVersions/Versions/Index/Screen.vue": () => import("./assets/Screen-AxbBzWrw.js"), "./Pages/FBVersions/Versions/IndexVersion.vue": () => import("./assets/IndexVersion-Ku3wR8PN.js"), "./Pages/FBVersions/Versions/Show/Screen.vue": () => import("./assets/Screen-C4r_2aqi.js"), "./Pages/FBVersions/Versions/ShowVersion.vue": () => import("./assets/ShowVersion-BRtGySUP.js"), "./Pages/FBVersions/_components/VersionList.vue": () => import("./assets/VersionList-Cxpbo4dz.js"), "./Pages/FBVersions/_layouts/LayoutFBVersions.vue": () => import("./assets/LayoutFBVersions-D-3z_W46.js"), "./Pages/FBVersions/_layouts/SidebarLayoutVersion.vue": () => import("./assets/SidebarLayoutVersion-BVzUDliT.js"), "./Pages/Index/Factory.vue": () => import("./assets/Factory-2ZHSsfDx.js"), "./Pages/Index/Index.vue": () => import("./assets/Index-Cfr7LIsq.js"), "./Pages/JoinUs/Index.vue": () => import("./assets/Index-D3YooWAL.js"), "./Pages/Lessons/Create/Screen.vue": () => import("./assets/Screen-C_zJR5W6.js"), "./Pages/Lessons/CreateLesson.vue": () => import("./assets/CreateLesson-BdK85FE0.js"), "./Pages/Lessons/Edit/Screen.vue": () => import("./assets/Screen-BIGv4yRk.js"), "./Pages/Lessons/EditLesson.vue": () => import("./assets/EditLesson-BXuyA3Fa.js"), "./Pages/Lessons/Index/Screen.vue": () => import("./assets/Screen-COK5gTIC.js"), "./Pages/Lessons/IndexLesson.vue": () => import("./assets/IndexLesson-Czh3NSQP.js"), "./Pages/Lessons/Show/Screen.vue": () => import("./assets/Screen-D9mPvPnk.js"), "./Pages/Lessons/ShowLesson.vue": () => import("./assets/ShowLesson-DXWCzM0S.js"), "./Pages/Lessons/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-Dj2LdwWi.js"), "./Pages/Lessons/_layouts/SidebarLayoutLesson.vue": () => import("./assets/SidebarLayoutLesson-3ph7vEE9.js"), "./Pages/Media/Index.vue": () => import("./assets/Index-D8eQb6DD.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-Dmbfpic2.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-DJI974tw.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-CAmWPjB2.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-BN4qvP9g.js"), "./Pages/Projects/Customers/Create/Screen.vue": () => import("./assets/Screen-CuKaKnWq.js"), "./Pages/Projects/Customers/CreateCustomer.vue": () => import("./assets/CreateCustomer-Cq42zQHM.js"), "./Pages/Projects/Customers/Edit/Screen.vue": () => import("./assets/Screen-Cg3GkLpP.js"), "./Pages/Projects/Customers/EditCustomer.vue": () => import("./assets/EditCustomer-DihqQILB.js"), "./Pages/Projects/Customers/Index/Screen.vue": () => import("./assets/Screen-CbDVgiS8.js"), "./Pages/Projects/Customers/IndexCustomer.vue": () => import("./assets/IndexCustomer-CdBAsXs1.js"), "./Pages/Projects/Customers/Show/Screen.vue": () => import("./assets/Screen-CKUyiJ5u.js"), "./Pages/Projects/Customers/ShowCustomer.vue": () => import("./assets/ShowCustomer-CJ2lZwpV.js"), "./Pages/Projects/Index/Screen.vue": () => import("./assets/Screen-C6my2wqQ.js"), "./Pages/Projects/Project/Create/Screen.vue": () => import("./assets/Screen-BD0t5PUo.js"), "./Pages/Projects/Project/CreateProject.vue": () => import("./assets/CreateProject-BwBuXSve.js"), "./Pages/Projects/Project/Edit/Screen.vue": () => import("./assets/Screen-COZdjjT4.js"), "./Pages/Projects/Project/EditProject.vue": () => import("./assets/EditProject-DFFY6Atm.js"), "./Pages/Projects/Project/Index/Screen.vue": () => import("./assets/Screen-Be-Qf1mt.js"), "./Pages/Projects/Project/IndexProject.vue": () => import("./assets/IndexProject-qul7rajk.js"), "./Pages/Projects/Project/Show/Screen.vue": () => import("./assets/Screen-DPAD_UWW.js"), "./Pages/Projects/Project/ShowProject.vue": () => import("./assets/ShowProject-BT12wfSj.js"), "./Pages/Projects/Services/Create/Screen.vue": () => import("./assets/Screen-BxK4l4tj.js"), "./Pages/Projects/Services/CreateService.vue": () => import("./assets/CreateService-CfEJHd6b.js"), "./Pages/Projects/Services/Edit/Screen.vue": () => import("./assets/Screen-DFQa1l77.js"), "./Pages/Projects/Services/EditService.vue": () => import("./assets/EditService-DcoWlLAi.js"), "./Pages/Projects/Services/Index/Screen.vue": () => import("./assets/Screen-DN-VwkoY.js"), "./Pages/Projects/Services/Index/ServiceItem.vue": () => import("./assets/ServiceItem-Dv3XwMme.js"), "./Pages/Projects/Services/IndexService.vue": () => import("./assets/IndexService-CHAd6lVS.js"), "./Pages/Projects/Services/Show/Screen.vue": () => import("./assets/Screen-CkiAq9Qd.js"), "./Pages/Projects/Services/ShowService.vue": () => import("./assets/ShowService-BkIB3WBU.js"), "./Pages/Projects/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-BZ0X4-VT.js"), "./Pages/Projects/_layouts/LayoutProjects.vue": () => import("./assets/LayoutProjects-C-eqyV38.js"), "./Pages/Projects/_layouts/SidebarLayoutProject.vue": () => import("./assets/SidebarLayoutProject-DdQs40CN.js"), "./Pages/Rendition/LanguagePacks/Create/Screen.vue": () => import("./assets/Screen-BSLYrjzB.js"), "./Pages/Rendition/LanguagePacks/CreateLanguagePacks.vue": () => import("./assets/CreateLanguagePacks-BcocukJI.js"), "./Pages/Rendition/LanguagePacks/Edit/Screen.vue": () => import("./assets/Screen-DRM6xlHs.js"), "./Pages/Rendition/LanguagePacks/EditLanguagePacks.vue": () => import("./assets/EditLanguagePacks-BHI4OoE-.js"), "./Pages/Rendition/LanguagePacks/Index/PacksTable.vue": () => import("./assets/PacksTable-C3Yp8ebQ.js"), "./Pages/Rendition/LanguagePacks/Index/Screen.vue": () => import("./assets/Screen-BiYrm4op.js"), "./Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue": () => import("./assets/IndexLanguagePacks-C6qNLGNF.js"), "./Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue": () => import("./assets/ShowLanguagePacks-B-b4wjk9.js"), "./Pages/Rendition/LanguagePacks/Words.vue": () => import("./assets/Words-CeY5T71t.js"), "./Pages/Rendition/LanguagePacks/Words/Screen.vue": () => import("./assets/Screen-CjpsJ4o8.js"), "./Pages/Rendition/Words/Create/Screen.vue": () => import("./assets/Screen-B8oWRPGJ.js"), "./Pages/Rendition/Words/CreateWord.vue": () => import("./assets/CreateWord-Bp2BZmkb.js"), "./Pages/Rendition/Words/Edit/Screen.vue": () => import("./assets/Screen-C_AVKPNO.js"), "./Pages/Rendition/Words/EditWord.vue": () => import("./assets/EditWord-BP30Eenp.js"), "./Pages/Rendition/Words/Index/Screen.vue": () => import("./assets/Screen-d3tcixV9.js"), "./Pages/Rendition/Words/IndexWord.vue": () => import("./assets/IndexWord-CGr_yiD-.js"), "./Pages/Rendition/Words/Show/Screen.vue": () => import("./assets/Screen-DMpfeaOe.js"), "./Pages/Rendition/Words/ShowWord.vue": () => import("./assets/ShowWord-PIcXiKOI.js"), "./Pages/Rendition/_components/MultipleChoice.vue": () => import("./assets/MultipleChoice-Bv7hz5PR.js"), "./Pages/Rendition/_components/TranslateWord.vue": () => import("./assets/TranslateWord-N_wPB8Op.js"), "./Pages/Rendition/_components/WordCompletion.vue": () => import("./assets/WordCompletion-CBRJ0lDw.js"), "./Pages/Rendition/_components/WordsTable.vue": () => import("./assets/WordsTable-BqU-bMcA.js"), "./Pages/Rendition/_layouts/LayoutRendition.vue": () => import("./assets/LayoutRendition-CFqfA1Wg.js"), "./Pages/Rendition/_layouts/SidebarPackGame.vue": () => import("./assets/SidebarPackGame-B1kPwqje.js"), "./Pages/Rendition/_layouts/SidebarRendition.vue": () => import("./assets/SidebarRendition-smcKkIIx.js"), "./Pages/Seo/Create.vue": () => import("./assets/Create-lsJluahX.js"), "./Pages/Seo/Edit.vue": () => import("./assets/Edit-B9BGxOdX.js"), "./Pages/Seo/Index.vue": () => import("./assets/Index-D9T-zS5Z.js"), "./Pages/SocialMedia/Index.vue": () => import("./assets/Index-Rw6sCta6.js"), "./Pages/SoftwareProducts/Create.vue": () => import("./assets/Create-BdSBTOmf.js"), "./Pages/SoftwareProducts/Edit.vue": () => import("./assets/Edit-BvkfhlLO.js"), "./Pages/SoftwareProducts/Index.vue": () => import("./assets/Index-BDG1qC-T.js"), "./Pages/SoftwareProducts/Show.vue": () => import("./assets/Show-C4u6lUfx.js"), "./Pages/SoftwareProducts/component/Box.vue": () => import("./assets/Box-CvUfE-UW.js"), "./Pages/SoftwareProducts/component/ConfirmModal.vue": () => import("./assets/ConfirmModal-8bTg5PxV.js"), "./Pages/SoftwareProducts/component/SPAddress.vue": () => import("./assets/SPAddress-C4B-URBw.js"), "./Pages/SoftwareProducts/component/SPPrice.vue": () => import("./assets/SPPrice-DDe_ZJN3.js"), "./Pages/SoftwareProducts/component/SPSpaces.vue": () => import("./assets/SPSpaces-C-9fwGUn.js"), "./Pages/ThemeManagement.vue": () => import("./assets/ThemeManagement-zVsk9www.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-bSatZHEn.js"), "./Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue": () => import("./assets/CategoriesCreateFrom-kQrBvJAp.js"), "./Pages/WritesCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-DazoT8qe.js"), "./Pages/WritesCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-D6aOs1Z5.js"), "./Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue": () => import("./assets/CategoriesEditFrom-DKzwSiRi.js"), "./Pages/WritesCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-DTvjCtYg.js"), "./Pages/WritesCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-DXqdvho8.js"), "./Pages/WritesCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-pRdFyd0U.js"), "./Pages/WritesCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-D_W9iVB2.js"), "./Pages/WritesCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-CT0NLY0R.js"), "./Pages/WritesCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-DbU0bh4h.js"), "./Pages/WritesCategories/Categories/WriteByCategory.vue": () => import("./assets/WriteByCategory-BDh0IM7_.js"), "./Pages/WritesCategories/Categories/WriteByCategory/Screen.vue": () => import("./assets/Screen-BiZHJ2bp.js"), "./Pages/WritesCategories/Writes/Create/FormField.vue": () => import("./assets/FormField-B5B8BMWT.js"), "./Pages/WritesCategories/Writes/Create/Screen.vue": () => import("./assets/Screen-ClOf9Rh6.js"), "./Pages/WritesCategories/Writes/Create/WriteCreateForm.vue": () => import("./assets/WriteCreateForm-CYEsKg2g.js"), "./Pages/WritesCategories/Writes/CreateWrite.vue": () => import("./assets/CreateWrite-9ZEQl7Jv.js"), "./Pages/WritesCategories/Writes/Edit/Screen.vue": () => import("./assets/Screen-CChFP1FF.js"), "./Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue": () => import("./assets/WriteUpdateForm-DoXsSG05.js"), "./Pages/WritesCategories/Writes/EditWrite.vue": () => import("./assets/EditWrite-CRN3qYms.js"), "./Pages/WritesCategories/Writes/Index/Screen.vue": () => import("./assets/Screen-DfxMLCLj.js"), "./Pages/WritesCategories/Writes/IndexWrite.vue": () => import("./assets/IndexWrite-nOzQBv1k.js"), "./Pages/WritesCategories/Writes/Show/Screen.vue": () => import("./assets/Screen-DpAL-k9R.js"), "./Pages/WritesCategories/Writes/ShowWrite.vue": () => import("./assets/ShowWrite-BSFjoSxu.js"), "./Pages/WritesCategories/_components/RichTextEditor.vue": () => import("./assets/RichTextEditor-BMVmBhat.js"), "./Pages/WritesCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-CCIAyO4r.js"), "./Pages/WritesCategories/_composables/WriteList.vue": () => import("./assets/WriteList-cZOZxBc4.js"), "./Pages/WritesCategories/_layouts/LayoutWritesCategories.vue": () => import("./assets/LayoutWritesCategories-BRPEmI6M.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-CfdTiXOt.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue": () => import("./assets/SidebarLayoutWrite-jJPhFWlF.js") }))).default;
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
