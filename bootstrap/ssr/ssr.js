import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, ref, onMounted, defineComponent, watch, onUnmounted, createTextVNode, createCommentVNode, provide, createSSRApp, h as h$1 } from "vue";
import { usePage, Link, router, Head, createInertiaApp } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderTeleport, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
const _sfc_main$b = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "mr-2 h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/GoBack.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const GoBackSvg = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$a = {
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
            _push2(`<div class="${ssrRenderClass([{ "mx-auto gap-0": __props.isCompact, "gap-3": !__props.isCompact }, "flex items-center"])}" data-v-408a9067${_scopeId}><div class="flex h-5 w-5 flex-shrink-0 items-center justify-center" data-v-408a9067${_scopeId}>`);
            if (__props.icon === "home") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "grid") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "lock") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "trash") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "speech") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "user-plus") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "book-open") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "user") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "volume-up") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "chart-bar") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "search") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-pencil") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-book") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-globe") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-sync") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-project-diagram") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-users") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-cogs") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-408a9067${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-tools") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-408a9067${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-laptop-code") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-photo-video") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-bookmark") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-share-alt") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-language") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-chalkboard-teacher") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-user-circle") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-palette") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-clipboard-question") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-bolt") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-road") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" data-v-408a9067${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-briefcase") {
              _push2(`<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-408a9067${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-408a9067${_scopeId}></path></svg>`);
            } else {
              _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
                icon: dynamicIcon.value,
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div class="${ssrRenderClass([{ "w-0 opacity-0": __props.isCompact, "w-auto opacity-100": !__props.isCompact }, "overflow-hidden"])}" data-v-408a9067${_scopeId}><span class="whitespace-nowrap text-sm font-medium" data-v-408a9067${_scopeId}>${ssrInterpolate(__props.label)}</span></div></div>`);
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
                  ])) : __props.icon === "fa-solid fa-clipboard-question" ? (openBlock(), createBlock("svg", {
                    key: 29,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])) : __props.icon === "fa-solid fa-bolt" ? (openBlock(), createBlock("svg", {
                    key: 30,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                    })
                  ])) : __props.icon === "fa-solid fa-road" ? (openBlock(), createBlock("svg", {
                    key: 31,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    })
                  ])) : __props.icon === "fa-solid fa-briefcase" ? (openBlock(), createBlock("svg", {
                    key: 32,
                    class: "h-5 w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  ])) : (openBlock(), createBlock(unref(FontAwesomeIcon), {
                    key: 33,
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/NavItem.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const NavItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-408a9067"]]);
const _sfc_main$9 = {
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/SocialLink.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
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
          _push(ssrRenderComponent(_sfc_main$9, {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/SocialLinks.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "default",
      validator: (value) => [
        "default",
        "primary",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link"
      ].includes(value)
    },
    size: {
      type: String,
      default: "default",
      validator: (value) => ["default", "sm", "lg", "icon"].includes(value)
    },
    outline: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const variantClass = computed(() => {
      const base = "hover:opacity-90";
      if (props.outline || props.variant === "outline") {
        return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      }
      switch (props.variant) {
        case "primary":
          return `bg-primary text-primary-foreground hover:bg-primary/90 ${base}`;
        case "secondary":
          return `bg-secondary text-secondary-foreground hover:bg-secondary/80 ${base}`;
        case "destructive":
          return `bg-destructive text-destructive-foreground hover:bg-destructive/90 ${base}`;
        case "ghost":
          return "hover:bg-accent hover:text-accent-foreground";
        case "link":
          return "text-primary underline-offset-4 hover:underline";
        default:
          return `bg-primary text-primary-foreground hover:bg-primary/90 ${base}`;
      }
    });
    const sizeClass = computed(() => {
      switch (props.size) {
        case "sm":
          return "h-8 rounded-md px-3 text-xs";
        case "lg":
          return "h-11 rounded-md px-8";
        case "icon":
          return "h-10 w-10";
        default:
          return "h-10 px-4 py-2";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClass.value,
          sizeClass.value,
          { "w-full": __props.block },
          { "rounded-full": __props.circle }
        ],
        disabled: __props.disabled || __props.loading
      }, _attrs))}>`);
      if (__props.loading) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.loading) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Button.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    maxWidth: { default: "2xl" },
    closeable: { type: Boolean, default: true }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "visible";
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e2) => {
      if (e2.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "visible";
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0" scroll-region style="${ssrRenderStyle(__props.show ? null : { display: "none" })}"><div class="fixed inset-0 transform transition-all" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}"><div class="absolute inset-0 bg-background/80 backdrop-blur-sm"></div></div><div class="${ssrRenderClass([maxWidthClass.value, "relative transform overflow-hidden rounded-lg border border-border bg-background shadow-lg transition-all sm:w-full"])}" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "DeleteConfirmationModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Silmeyi Onayla"
    },
    message: {
      type: String,
      required: true
    },
    warning: {
      type: String,
      default: ""
    },
    isDeleting: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleClose = () => {
      if (!props.isDeleting) {
        emit("close");
      }
    };
    const handleConfirm = () => {
      if (!props.isDeleting) {
        emit("confirm");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$6, mergeProps({
        show: __props.isOpen,
        "max-width": "sm",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-5"${_scopeId}><h3 class="mb-1.5 text-center text-sm font-semibold text-foreground sm:text-base"${_scopeId}>${ssrInterpolate(__props.title)}</h3><p class="mb-3 text-center text-xs text-muted-foreground sm:text-sm"${_scopeId}>${ssrInterpolate(__props.message)}</p>`);
            if (__props.warning) {
              _push2(`<p class="mb-4 rounded border border-border bg-muted/30 p-2 text-center text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.warning)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-col gap-2 sm:flex-row sm:gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              onClick: handleClose,
              variant: "outline",
              size: "sm",
              class: "h-8 flex-1 border-input bg-background text-xs text-foreground hover:bg-accent hover:text-accent-foreground sm:h-9 sm:text-sm",
              disabled: __props.isDeleting
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` İptal `);
                } else {
                  return [
                    createTextVNode(" İptal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              onClick: handleConfirm,
              variant: "outline",
              size: "sm",
              class: "h-8 flex-1 border-foreground bg-foreground text-xs text-background hover:bg-foreground/90 sm:h-9 sm:text-sm",
              loading: __props.isDeleting,
              disabled: __props.isDeleting
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.isDeleting ? "Siliniyor..." : "Sil")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.isDeleting ? "Siliniyor..." : "Sil"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-5" }, [
                createVNode("h3", { class: "mb-1.5 text-center text-sm font-semibold text-foreground sm:text-base" }, toDisplayString(__props.title), 1),
                createVNode("p", { class: "mb-3 text-center text-xs text-muted-foreground sm:text-sm" }, toDisplayString(__props.message), 1),
                __props.warning ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "mb-4 rounded border border-border bg-muted/30 p-2 text-center text-xs text-muted-foreground"
                }, toDisplayString(__props.warning), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "flex flex-col gap-2 sm:flex-row sm:gap-2" }, [
                  createVNode(_sfc_main$7, {
                    onClick: handleClose,
                    variant: "outline",
                    size: "sm",
                    class: "h-8 flex-1 border-input bg-background text-xs text-foreground hover:bg-accent hover:text-accent-foreground sm:h-9 sm:text-sm",
                    disabled: __props.isDeleting
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" İptal ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_sfc_main$7, {
                    onClick: handleConfirm,
                    variant: "outline",
                    size: "sm",
                    class: "h-8 flex-1 border-foreground bg-foreground text-xs text-background hover:bg-foreground/90 sm:h-9 sm:text-sm",
                    loading: __props.isDeleting,
                    disabled: __props.isDeleting
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.isDeleting ? "Siliniyor..." : "Sil"), 1)
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Dialog/DeleteConfirmationModal.vue");
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
    const isJourneyShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/journey/") && url !== "/journey" && url !== "/journey/create" && !url.includes("/journey/edit");
    });
    const isJourneyEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/journey/") && url.includes("/edit");
    });
    const isServiceShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/services/") && url !== "/services" && url !== "/services/create" && !url.includes("/edit");
    });
    const isServiceEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/services/") && url.includes("/edit");
    });
    const isWorkspaceShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url !== "/workspace" && url !== "/workspace/create" && !url.includes("/edit");
    });
    const isWorkspaceEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url.includes("/edit");
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
    const journey = computed(() => page.props.entry || null);
    const service = computed(() => page.props.service || null);
    const workspace = computed(() => page.props.workspace || null);
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
    const showDeleteModal = ref(false);
    const isDeleting = ref(false);
    const deleteModalTitle = ref("");
    const deleteModalMessage = ref("");
    const deleteModalWarning = ref("");
    const pendingDeleteAction = ref(null);
    const openDeleteModal = (title, message, warning = "", action) => {
      deleteModalTitle.value = title;
      deleteModalMessage.value = message;
      deleteModalWarning.value = warning;
      pendingDeleteAction.value = action;
      showDeleteModal.value = true;
    };
    const closeDeleteModal = () => {
      if (!isDeleting.value) {
        showDeleteModal.value = false;
        pendingDeleteAction.value = null;
        deleteModalTitle.value = "";
        deleteModalMessage.value = "";
        deleteModalWarning.value = "";
      }
    };
    const confirmDelete = async () => {
      if (pendingDeleteAction.value) {
        isDeleting.value = true;
        try {
          await pendingDeleteAction.value();
          showDeleteModal.value = false;
          pendingDeleteAction.value = null;
          deleteModalTitle.value = "";
          deleteModalMessage.value = "";
          deleteModalWarning.value = "";
        } catch (error) {
          console.error("Error during delete:", error);
        } finally {
          isDeleting.value = false;
        }
      }
    };
    const deleteWrite = async (id) => {
      const currentUrl = page.url;
      const isCategoryWritePage = /^\/categories\/[^/]+\/[^/]+$/.test(currentUrl);
      const performDelete = async () => {
        await router.delete(route("writes.destroy", { write: id }), {
          onSuccess: () => {
            if (isCategoryWritePage) {
              const urlParts = currentUrl.split("/").filter((part) => part.length > 0);
              if (urlParts.length >= 2 && urlParts[0] === "categories") {
                const categorySlug = urlParts[1];
                router.visit(route("categories.show", { category: categorySlug }));
              } else {
                router.visit(route("writes.index"));
              }
            } else {
              router.visit(route("writes.index"));
            }
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting write:", errors);
            alert("Yazı silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Yazıyı Sil",
        "Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteCategory = async (id) => {
      const performDelete = async () => {
        await router.delete(route("categories.destroy", id), {
          onSuccess: () => {
            router.visit(route("categories.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting category:", errors);
            alert("Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Kategoriyi Sil",
        "Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteWord = async (id) => {
      const performDelete = async () => {
        await router.delete(route("rendition.words.destroy", id), {
          onSuccess: () => {
            router.visit(route("rendition.words.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting word:", errors);
            alert("Kelime silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Kelimeyi Sil",
        "Bu kelimeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteVersion = async (id) => {
      const performDelete = async () => {
        await router.delete(route("versions.destroy", id), {
          onSuccess: () => {
            router.visit(route("versions.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting version:", errors);
            alert("Versiyon silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Versiyonu Sil",
        "Bu versiyonu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteTestCategory = async (slugOrId) => {
      const performDelete = async () => {
        var _a;
        const slug = ((_a = testCategory.value) == null ? void 0 : _a.slug) || slugOrId;
        await router.delete(route("test-categories.destroy", { category: slug }), {
          onSuccess: () => {
            router.visit(route("test-categories.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting test category:", errors);
            alert("Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Test Kategorisini Sil",
        "Bu test kategorisini silmek istediğinizden emin misiniz?",
        "Altındaki tüm testler ve alt kategoriler de silinecektir. Bu işlem geri alınamaz.",
        performDelete
      );
    };
    const deleteTest = async (slugOrId) => {
      const performDelete = async () => {
        var _a;
        const slug = ((_a = test.value) == null ? void 0 : _a.slug) || slugOrId;
        await router.delete(route("tests.destroy", { test: slug }), {
          onSuccess: () => {
            router.visit(route("tests.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting test:", errors);
            alert("Test silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Testi Sil",
        "Bu testi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteJourney = async (id) => {
      const performDelete = async () => {
        await router.delete(route("journey.destroy", id), {
          onSuccess: () => {
            router.visit(route("journey.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting journey:", errors);
            alert("Yolculuk kaydı silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Yolculuk Kaydını Sil",
        "Bu yolculuk kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteLanguagePack = async (id) => {
      const performDelete = async () => {
        await router.delete(route("rendition.language-packs.destroy", id), {
          onSuccess: () => {
            router.visit(route("rendition.language-packs.index"));
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting language pack:", errors);
            alert("Kelime paketi silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Kelime Paketini Sil",
        "Bu kelime paketini silmek istediğinizden emin misiniz?",
        "Paket içindeki tüm kelimeler de silinecektir. Bu işlem geri alınamaz.",
        performDelete
      );
    };
    const deleteService = async (id) => {
      const performDelete = async () => {
        await router.delete(`/services/${id}`, {
          onSuccess: () => {
            router.visit("/services");
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting service:", errors);
            alert("Servis silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Servisi Sil",
        "Bu servisi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "",
        performDelete
      );
    };
    const deleteWorkspace = async (id) => {
      const performDelete = async () => {
        await router.delete(`/workspace/${id}`, {
          onSuccess: () => {
            router.visit("/workspace");
            if (props.variant === "mobile" && props.onLinkClick) {
              props.onLinkClick();
            }
          },
          onError: (errors) => {
            console.error("Error deleting workspace:", errors);
            alert("Çalışma alanı silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
      };
      openDeleteModal(
        "Çalışma Alanını Sil",
        "Bu çalışma alanını silmek istediğinizden emin misiniz?",
        "Çalışma alanına ait tüm ürünler de silinecektir. Bu işlem geri alınamaz.",
        performDelete
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$5, {
        "is-open": showDeleteModal.value,
        title: deleteModalTitle.value,
        message: deleteModalMessage.value,
        warning: deleteModalWarning.value,
        "is-deleting": isDeleting.value,
        onClose: closeDeleteModal,
        onConfirm: confirmDelete
      }, null, _parent));
      if (isWriteShowPage.value && !isWriteEditPage.value && isLoggedIn.value && write.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("writes.edit", write.value.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWrite(write.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isWriteEditPage.value && isLoggedIn.value && write.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWrite(write.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isCategoryShowPage.value && !isCategoryEditPage.value && isLoggedIn.value && category.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.edit", category.value.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteCategory(category.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isCategoryEditPage.value && isLoggedIn.value && category.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteCategory(category.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isWordShowPage.value && isLoggedIn.value && word.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("rendition.words.edit", word.value.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWord(word.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (_ctx.isLanguagePackShowPage && isLoggedIn.value && _ctx.pack) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("rendition.language-packs.edit", _ctx.pack.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteLanguagePack(_ctx.pack.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isVersionShowPage.value && isLoggedIn.value && version.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("versions.edit", version.value.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteVersion(version.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isTestCategoryShowPage.value && !isTestCategoryEditPage.value && isLoggedIn.value && testCategory.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("test-categories.edit", testCategory.value.slug),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteTestCategory(testCategory.value.slug || testCategory.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isTestCategoryEditPage.value && isLoggedIn.value && testCategory.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteTestCategory(testCategory.value.slug || testCategory.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isTestShowPage.value && !isTestEditPage.value && isLoggedIn.value && test.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("tests.edit", test.value.slug),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteTest(test.value.slug || test.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isTestEditPage.value && isLoggedIn.value && test.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteTest(test.value.slug || test.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isJourneyShowPage.value && !isJourneyEditPage.value && isLoggedIn.value && journey.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("journey.edit", journey.value.id),
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteJourney(journey.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isJourneyEditPage.value && isLoggedIn.value && journey.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteJourney(journey.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isServiceShowPage.value && !isServiceEditPage.value && isLoggedIn.value && service.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/services/${service.value.id}/edit`,
          onClick: __props.onLinkClick,
          class: editButtonClass.value
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg>`);
              if (__props.variant === "mobile") {
                _push2(`<span${_scopeId}>Düzenle</span>`);
              } else {
                _push2(`<!---->`);
              }
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
                __props.variant === "mobile" ? (openBlock(), createBlock("span", { key: 0 }, "Düzenle")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteService(service.value.id),
          variant: __props.variant === "mobile" ? "destructive" : "outline",
          size: __props.variant === "mobile" ? "default" : "sm",
          class: deleteButtonClass.value
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg>`);
              if (__props.variant === "mobile") {
                _push2(`<span${_scopeId}>Sil</span>`);
              } else {
                _push2(`<!---->`);
              }
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
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ], 2)),
                __props.variant === "mobile" ? (openBlock(), createBlock("span", { key: 0 }, "Sil")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isServiceEditPage.value && isLoggedIn.value && service.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteService(service.value.id),
          variant: __props.variant === "mobile" ? "destructive" : "outline",
          size: __props.variant === "mobile" ? "default" : "sm",
          class: deleteButtonClass.value
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass(iconClass.value)}"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg>`);
              if (__props.variant === "mobile") {
                _push2(`<span${_scopeId}>Sil</span>`);
              } else {
                _push2(`<!---->`);
              }
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
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ], 2)),
                __props.variant === "mobile" ? (openBlock(), createBlock("span", { key: 0 }, "Sil")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isWorkspaceShowPage.value && !isWorkspaceEditPage.value && isLoggedIn.value && workspace.value) {
        _push(`<div class="${ssrRenderClass(containerClass.value)}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/workspace/${workspace.value.id}/edit`,
          onClick: __props.onLinkClick,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWorkspace(workspace.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isWorkspaceEditPage.value && isLoggedIn.value && workspace.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWorkspace(workspace.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
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
    const page = usePage();
    const seoTitle = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.siteName) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.siteName) || ((_i = (_h = (_g = page.props) == null ? void 0 : _g.app) == null ? void 0 : _h.seo) == null ? void 0 : _i.title) || ((_k = (_j = page.props) == null ? void 0 : _j.app) == null ? void 0 : _k.name) || "Check-up Codes";
    });
    computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || ((_h = (_g = page.props) == null ? void 0 : _g.app) == null ? void 0 : _h.name) || "Check-up Codes";
    });
    const isMenuOpen = ref(false);
    const showProfileDropdown = ref(false);
    const showMobileCreateDropdown = ref(false);
    const store2 = useStore();
    const imagePath = ref("");
    const auth = ref(null);
    const appName = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props) == null ? void 0 : _a.app) == null ? void 0 : _b.name) || "Check-up Codes";
    });
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
    const logoPath = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.logo) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.logo) || null;
    });
    const logoAlt = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.logo_alt) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.logo_alt) || seoTitle.value || "Logo";
    });
    const isLoading = ref(false);
    const logoError = ref(false);
    const handleImageError = () => {
      logoError.value = true;
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
    const workspaceCount = computed(() => {
      return page.props.workspaceCount || 0;
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
    const isJourneyShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/journey/") && url !== "/journey" && url !== "/journey/create" && !url.includes("/journey/edit");
    });
    const isJourneyEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/journey/") && url.includes("/edit");
    });
    const isServiceShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/services/") && url !== "/services" && url !== "/services/create" && !url.includes("/edit");
    });
    const isServiceEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/services/") && url.includes("/edit");
    });
    const isWorkspaceShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url !== "/workspace" && url !== "/workspace/create" && !url.includes("/edit");
    });
    const isWorkspaceEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url.includes("/edit");
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
    const isFormProcessing = ref(false);
    computed(() => page.props.write || null);
    computed(() => page.props.category || null);
    const word = computed(() => page.props.word || null);
    computed(() => page.props.version || null);
    const pack = computed(() => page.props.pack || null);
    watch(
      () => page.props.value,
      (newProps) => {
        var _a;
        if (newProps && newProps.auth) {
          auth.value = newProps.auth;
          if ((_a = auth.value) == null ? void 0 : _a.user) {
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
      showMobileCreateDropdown.value = false;
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
      _push(`<!--[--><header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60" data-v-86125225><div class="flex h-12 items-center justify-between px-3 sm:px-4 lg:hidden" data-v-86125225>`);
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
        _push(`<div class="w-10" data-v-86125225></div>`);
      }
      _push(`<div class="flex items-center space-x-2" data-v-86125225><div class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20" data-v-86125225>`);
      if (logoPath.value && !logoError.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-86125225>`);
      } else {
        _push(`<span class="text-xs font-semibold text-primary" data-v-86125225>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
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
      _push(`</div><button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-86125225><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-86125225></path></svg></button></div><div class="hidden h-12 items-center justify-between px-4 lg:flex" data-v-86125225><div class="flex items-center space-x-4" data-v-86125225><div class="flex items-center space-x-2.5" data-v-86125225><div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-primary/10 ring-1 ring-primary/20" data-v-86125225>`);
      if (logoPath.value && !logoError.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-86125225>`);
      } else {
        _push(`<span class="text-sm font-semibold text-primary" data-v-86125225>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
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
      _push(`</div></div><div class="mx-6 flex-1 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl" data-v-86125225><div class="relative" data-v-86125225><div class="relative" data-v-86125225><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" data-v-86125225><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-86125225></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ara..." class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" data-v-86125225><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" data-v-86125225><kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100" data-v-86125225>⌘K</kbd></div></div>`);
      if (showSearchResults.value && (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0 || searchQuery.value.length > 0)) {
        _push(`<div class="search-results-dropdown absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[32rem] w-full min-w-[400px] overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] xl:min-w-[800px] 2xl:min-w-[900px]" data-v-86125225>`);
        if (isSearching.value) {
          _push(`<div class="flex items-center justify-center p-4" data-v-86125225><div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" data-v-86125225></div><span class="ml-2 text-sm text-muted-foreground" data-v-86125225>Aranıyor...</span></div>`);
        } else if (searchQuery.value.length > 0 && (!searchResults.value.articles || searchResults.value.articles.length === 0) && (!searchResults.value.categories || searchResults.value.categories.length === 0)) {
          _push(`<div class="flex flex-col items-center justify-center p-6 text-center" data-v-86125225><div class="mb-2 text-muted-foreground" data-v-86125225><svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-86125225></path></svg></div><span class="text-sm text-muted-foreground" data-v-86125225>&quot;${ssrInterpolate(searchQuery.value)}&quot; için sonuç bulunamadı</span></div>`);
        } else if (searchResults.value.articles && searchResults.value.articles.length > 0 || searchResults.value.categories && searchResults.value.categories.length > 0) {
          _push(`<div class="py-2" data-v-86125225>`);
          if (searchResults.value.articles && searchResults.value.articles.length > 0) {
            _push(`<div class="mb-3" data-v-86125225><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-86125225>Yazılar</div><!--[-->`);
            ssrRenderList(searchResults.value.articles, (article, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", index)} class="${ssrRenderClass([
                "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
                selectedIndex.value === index ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
              ])}" data-v-86125225><div class="text-sm font-medium leading-none" data-v-86125225>${highlightText(article.title) ?? ""}</div><div class="mt-0.5 text-xs leading-tight text-muted-foreground" data-v-86125225>${highlightText(article.excerpt) ?? ""}</div>`);
              if (article.category) {
                _push(`<div class="mt-1" data-v-86125225><span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" data-v-86125225>${ssrInterpolate(article.category)}</span></div>`);
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
            _push(`<div class="mb-3" data-v-86125225><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-86125225> Kategoriler </div><!--[-->`);
            ssrRenderList(searchResults.value.categories, (category, index) => {
              _push(`<div${ssrRenderAttr("data-selected-index", searchResults.value.articles.length + index)} class="${ssrRenderClass([
                "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
                selectedIndex.value === searchResults.value.articles.length + index ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
              ])}" data-v-86125225><div class="text-sm font-medium leading-none" data-v-86125225>${highlightText(category.name) ?? ""}</div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="py-2" data-v-86125225><div class="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" data-v-86125225> Hızlı Eylemler </div><div data-selected-index="0" class="${ssrRenderClass([
            "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
            selectedIndex.value === 0 ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
          ])}" data-v-86125225><div class="text-sm font-medium" data-v-86125225>Tüm Yazıları Görüntüle</div><div class="mt-0.5 text-xs text-muted-foreground" data-v-86125225>Tüm yayınlanmış yazıları görüntüle</div></div><div data-selected-index="1" class="${ssrRenderClass([
            "cursor-pointer border-b border-border px-3 py-2 transition-colors last:border-b-0",
            selectedIndex.value === 1 ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
          ])}" data-v-86125225><div class="text-sm font-medium" data-v-86125225>Tüm Kategorileri Görüntüle</div><div class="mt-0.5 text-xs text-muted-foreground" data-v-86125225>Tüm kategorileri görüntüle</div></div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center space-x-2" data-v-86125225><div class="hidden items-center space-x-1 xl:flex" data-v-86125225>`);
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
      _push(`<a href="https://youtu.be/FPsx8xHLR1k?si=nZnBfqjYQun9R06h" target="_blank" class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-86125225> Destek </a></div>`);
      if (!isLoggedIn.value) {
        _push(`<div class="tooltip tooltip-bottom" data-tip="Aramıza Katıl" data-v-86125225>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/join-us",
          class: "block"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-86125225${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-86125225${_scopeId}></path></svg></button>`);
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
      _push(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-86125225>`);
      if (isDarkMode.value) {
        _push(`<svg class="h-3.5 w-3.5 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-86125225><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-86125225></path></svg>`);
      } else {
        _push(`<svg class="h-3.5 w-3.5 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-86125225><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-86125225></path></svg>`);
      }
      _push(`</button>`);
      if (isLoggedIn.value) {
        _push(`<div class="profile-dropdown-container relative inline-block" data-v-86125225><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": showProfileDropdown.value }, "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" title="Profil" data-v-86125225><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-86125225></path></svg></button>`);
        if (showProfileDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg" data-v-86125225><div class="flex flex-col gap-1 p-1" data-v-86125225>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("profile.edit"),
            class: "inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showProfileDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-86125225${_scopeId}></path></svg> Profil `);
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
          _push(`<button type="button" class="inline-flex h-7 w-full items-center rounded-md px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground" data-v-86125225><svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-86125225></path></svg> Çıkış Yap </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 xl:hidden" data-v-86125225><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" data-v-86125225></path></svg></button></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "opacity-100" : "opacity-0", "fixed inset-0 z-50 transition-all duration-300 ease-out"])}" data-v-86125225><div class="bg-base-content/20 absolute inset-0 backdrop-blur-sm" data-v-86125225></div><div class="relative flex h-full items-end justify-center" data-v-86125225><div class="${ssrRenderClass([isMenuOpen.value ? "translate-y-0" : "translate-y-full", "w-full max-w-sm transform transition-all duration-300 ease-out"])}" data-v-86125225><div class="mx-4 mb-4 max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-popover shadow-lg" data-v-86125225><div class="flex justify-center pb-2 pt-4" data-v-86125225><div class="h-1.5 w-16 rounded-full bg-muted" data-v-86125225></div></div><div class="px-4 pb-6 sm:px-6" data-v-86125225>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "mb-4 block",
          onClick: closeMenu
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center space-x-3 rounded-lg border border-border bg-card p-3" data-v-86125225${_scopeId}><div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10" data-v-86125225${_scopeId}>`);
              if (logoPath.value && !isLoading.value) {
                _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-86125225${_scopeId}>`);
              } else {
                _push2(`<span class="text-sm font-bold text-primary" data-v-86125225${_scopeId}>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span>`);
              }
              _push2(`</div><div data-v-86125225${_scopeId}><h3 class="text-base font-semibold text-card-foreground" data-v-86125225${_scopeId}>${ssrInterpolate(seoTitle.value)}</h3><p class="text-xs text-muted-foreground" data-v-86125225${_scopeId}>${ssrInterpolate(appName.value)}</p></div></div>`);
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
                    createVNode("h3", { class: "text-base font-semibold text-card-foreground" }, toDisplayString(seoTitle.value), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(appName.value), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-2" data-v-86125225><div class="space-y-1" data-v-86125225>`);
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
          href: "/journey",
          icon: "fa-solid fa-road",
          label: "Yolculuk"
        }, null, _parent));
        if (isLoggedIn.value || workspaceCount.value > 0) {
          _push(ssrRenderComponent(NavItem, {
            href: "/workspace",
            icon: "fa-solid fa-briefcase",
            label: "Çalışma Alanım"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (isLoggedIn.value) {
          _push(ssrRenderComponent(NavItem, {
            href: "/bookmarks",
            icon: "fa-solid fa-bookmark",
            label: "Yer İmleri"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (isLoggedIn.value) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(NavItem, {
            href: "/test-categories",
            icon: "fa-solid fa-clipboard-question",
            label: "Testler"
          }, null, _parent));
          _push(ssrRenderComponent(NavItem, {
            href: "/rendition/words",
            icon: "fa-solid fa-globe",
            label: "Kelimeler"
          }, null, _parent));
          _push(ssrRenderComponent(NavItem, {
            href: "/services",
            icon: "fa-solid fa-bolt",
            label: "Servisler"
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
          _push(`<div class="border-t border-border pt-3" data-v-86125225><div class="space-y-2" data-v-86125225>`);
          if (isWriteCreatePage.value || isCategoryCreatePage.value || _ctx.isTestCreatePage || _ctx.isTestCategoryCreatePage) {
            _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="flex w-full items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" data-v-86125225><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-86125225></path></svg><span data-v-86125225>Sıfırla</span></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button${ssrIncludeBooleanAttr(isFormProcessing.value) ? " disabled" : ""} class="flex w-full items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50" data-v-86125225>`);
          if (isFormProcessing.value) {
            _push(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-86125225><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-86125225></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-86125225></path></svg>`);
          } else {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-86125225></path></svg>`);
          }
          _push(`<span data-v-86125225>${ssrInterpolate(isFormProcessing.value ? isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelleniyor..." : "Kaydediliyor..." : isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelle" : "Kaydet")}</span></button></div></div>`);
        } else if (isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-86125225><button class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" data-v-86125225><span class="text-xs font-medium uppercase text-muted-foreground" data-v-86125225>Yeni Oluştur</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": showMobileCreateDropdown.value }, "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-86125225></path></svg></button>`);
          if (showMobileCreateDropdown.value) {
            _push(`<div class="mt-2 space-y-3 pl-3" data-v-86125225><div data-v-86125225><div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Yazılar </div><div class="space-y-0.5" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/writes/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Yazı</span>`);
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
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Kategori Ekle</span>`);
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
                    createVNode("span", null, "Yeni Kategori Ekle")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div></div><div data-v-86125225><div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Kelimeler </div><div class="space-y-0.5" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/rendition/words/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Kelime</span>`);
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
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Kelime Paketi</span>`);
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
            _push(`</div></div><div data-v-86125225><div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Testler </div><div class="space-y-0.5" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/tests/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Test</span>`);
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
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Test Kategorisi</span>`);
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
            _push(`</div></div><div data-v-86125225><div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Projeler </div><div class="space-y-0.5" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/projects/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Proje</span>`);
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
                        d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      })
                    ])),
                    createVNode("span", null, "Yeni Proje")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(unref(Link), {
              href: "/customers/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Müşteri</span>`);
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
                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      })
                    ])),
                    createVNode("span", null, "Yeni Müşteri")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(unref(Link), {
              href: "/services/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Servis</span>`);
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
                        d: "M13 10V3L4 14h7v7l9-11h-7z"
                      })
                    ])),
                    createVNode("span", null, "Yeni Servis")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div></div><div data-v-86125225><div class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Yer İmleri </div><div class="space-y-0.5" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/bookmarks/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Yer İmi</span>`);
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
                        d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      })
                    ])),
                    createVNode("span", null, "Yeni Yer İmi")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(unref(Link), {
              href: "/bookmark-categories/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Yer İmi Kategorisi</span>`);
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
                        d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      })
                    ])),
                    createVNode("span", null, "Yeni Yer İmi Kategorisi")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div></div><div class="border-t border-border pt-2" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/versions/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Versiyon</span>`);
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
            _push(`</div><div class="border-t border-border pt-2" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/journey/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Yolculuk</span>`);
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
                        d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      })
                    ])),
                    createVNode("span", null, "Yeni Yolculuk")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div><div class="border-t border-border pt-2" data-v-86125225>`);
            _push(ssrRenderComponent(unref(Link), {
              href: "/workspace/create",
              class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              onClick: closeMenu
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Yeni Çalışma Alanı</span>`);
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
                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      })
                    ])),
                    createVNode("span", null, "Yeni Çalışma Alanı")
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
        if (isLoggedIn.value && (isWriteShowPage.value || isWriteEditPage.value || isCategoryShowPage.value || isCategoryEditPage.value || isWordShowPage.value || isLanguagePackShowPage.value || isVersionShowPage.value || isTestCategoryShowPage.value || isTestCategoryEditPage.value || isTestShowPage.value || isTestEditPage.value || isJourneyShowPage.value || isJourneyEditPage.value || isServiceShowPage.value || isServiceEditPage.value || isWorkspaceShowPage.value || isWorkspaceEditPage.value)) {
          _push(`<div class="border-t border-border pt-3" data-v-86125225>`);
          _push(ssrRenderComponent(_sfc_main$4, {
            variant: "mobile",
            "on-link-click": closeMenu
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-86125225><div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Hesap </div><div class="space-y-1" data-v-86125225>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("profile.edit"),
            class: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: closeMenu
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Profil</span>`);
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
          _push(`<button type="button" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10" data-v-86125225><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-86125225></path></svg><span data-v-86125225>Çıkış Yap</span></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isAdminPanelPage.value && isLoggedIn.value) {
          _push(`<div class="border-t border-border pt-3" data-v-86125225><div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-86125225> Panel </div><div class="space-y-1" data-v-86125225>`);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Dashboard</span>`);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Medya Yönetimi</span>`);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>Sosyal Medya Yönetimi</span>`);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-86125225${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" data-v-86125225${_scopeId}></path></svg><span data-v-86125225${_scopeId}>SEO Yönetimi</span>`);
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
          _push(`<div class="mt-4 border-t border-border pt-3" data-v-86125225><a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank" data-v-86125225><div class="rounded-md bg-primary/10 p-3 text-center transition-colors hover:bg-primary/20" data-v-86125225><span class="text-sm font-medium text-primary" data-v-86125225>Powered by Notiriel</span></div></a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isLoggedIn.value) {
          _push(`<div class="mt-3" data-v-86125225>`);
          _push(ssrRenderComponent(_sfc_main$8, { "is-compact": false }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4 flex flex-col items-center space-y-2" data-v-86125225><button class="flex items-center space-x-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" data-v-86125225>`);
        if (isDarkMode.value) {
          _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-86125225><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-86125225></path></svg>`);
        } else {
          _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-86125225><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-86125225></path></svg>`);
        }
        _push(`<span class="text-sm font-medium" data-v-86125225>${ssrInterpolate(currentThemeName.value)}</span></button><p class="text-xs text-muted-foreground" data-v-86125225>Notiriel - Tüm Hakları Saklıdır</p></div></div></div></div></div></div>`);
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
const HeaderLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-86125225"]]);
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
            } else if (__props.icon === "fa-solid fa-clipboard-question") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-bolt") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-road") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"${_scopeId}></path></svg>`);
            } else if (__props.icon === "fa-solid fa-briefcase") {
              _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg>`);
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
                ])) : __props.icon === "fa-solid fa-clipboard-question" ? (openBlock(), createBlock("svg", {
                  key: 5,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])) : __props.icon === "fa-solid fa-bolt" ? (openBlock(), createBlock("svg", {
                  key: 6,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                  })
                ])) : __props.icon === "fa-solid fa-road" ? (openBlock(), createBlock("svg", {
                  key: 7,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  })
                ])) : __props.icon === "fa-solid fa-briefcase" ? (openBlock(), createBlock("svg", {
                  key: 8,
                  class: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  })
                ])) : (openBlock(), createBlock(unref(FontAwesomeIcon), {
                  key: 9,
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
    const showAdminPanelDropdown = ref(false);
    const showCreateDropdown = ref(false);
    const isFormProcessing = ref(false);
    let clickOutsideHandler = null;
    onMounted(() => {
      clickOutsideHandler = (event) => {
        const adminDropdownElement = event.target.closest(".admin-panel-dropdown-container");
        const createDropdownElement = event.target.closest(".create-dropdown-container");
        if (showAdminPanelDropdown.value && !adminDropdownElement) {
          showAdminPanelDropdown.value = false;
        }
        if (showCreateDropdown.value && !createDropdownElement) {
          showCreateDropdown.value = false;
        }
      };
      document.addEventListener("click", clickOutsideHandler);
    });
    onUnmounted(() => {
      if (clickOutsideHandler) {
        document.removeEventListener("click", clickOutsideHandler);
      }
    });
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    computed(() => {
      return currentTheme.value === "dark";
    });
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const workspaceCount = computed(() => {
      return page.props.workspaceCount || 0;
    });
    const bookmarkCount = computed(() => {
      return page.props.bookmarkCount || 0;
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
    const isWorkspaceShowPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url !== "/workspace" && url !== "/workspace/create" && !url.includes("/edit");
    });
    const isWorkspaceEditPage = computed(() => {
      const url = page.url;
      return url.startsWith("/workspace/") && url.includes("/edit");
    });
    const handleFormSubmit = () => {
      if (isFormProcessing.value) return;
      window.dispatchEvent(new CustomEvent("sidebarFormSubmit"));
    };
    const handleFormReset = () => {
      if (isFormProcessing.value) return;
      window.dispatchEvent(new CustomEvent("sidebarFormReset"));
    };
    let formProcessingHandler = null;
    onMounted(() => {
      isFormProcessing.value = false;
      formProcessingHandler = (event) => {
        isFormProcessing.value = event.detail.processing || false;
      };
      window.addEventListener("formProcessingState", formProcessingHandler);
    });
    onUnmounted(() => {
      if (formProcessingHandler) {
        window.removeEventListener("formProcessingState", formProcessingHandler);
      }
      isFormProcessing.value = false;
    });
    watch(
      () => page.url,
      () => {
        isFormProcessing.value = false;
      }
    );
    computed(() => page.props.write || null);
    computed(() => page.props.category || null);
    const word = computed(() => page.props.word || null);
    computed(() => page.props.version || null);
    const pack = computed(() => page.props.pack || null);
    const deleteLanguagePack = async (id) => {
      if (!confirm(
        "Bu kelime paketini silmek istediğinizden emin misiniz? Paket içindeki tüm kelimeler de silinecektir. Bu işlem geri alınamaz."
      )) {
        return;
      }
      try {
        await router.delete(route("rendition.language-packs.destroy", id), {
          onSuccess: () => {
            router.visit(route("rendition.language-packs.index"));
          }
        });
      } catch (error) {
        console.error("Error deleting language pack:", error);
      }
    };
    const deleteWorkspace = async (id) => {
      if (!confirm(
        "Bu çalışma alanını silmek istediğinizden emin misiniz? Çalışma alanına ait tüm ürünler de silinecektir. Bu işlem geri alınamaz."
      )) {
        return;
      }
      try {
        await router.delete(`/workspace/${id}`, {
          onSuccess: () => {
            router.visit(route("workspace.index"));
          }
        });
      } catch (error) {
        console.error("Error deleting workspace:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "sticky top-12 z-40 hidden w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block" }, _attrs))} data-v-c2d0a2c5><div class="flex h-9 items-center justify-between px-3" data-v-c2d0a2c5><div class="flex items-center gap-0.5" data-v-c2d0a2c5>`);
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
        "is-active": isActiveRoute("/writes") || isActiveRoute("/categories")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        href: "/journey",
        icon: "fa-solid fa-road",
        label: "Yolculuk",
        "is-active": isActiveRoute("/journey")
      }, null, _parent));
      if (isLoggedIn.value || workspaceCount.value > 0) {
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/workspace",
          icon: "fa-solid fa-briefcase",
          label: "Çalışma Alanım",
          "is-active": isActiveRoute("/workspace")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (bookmarkCount.value > 0) {
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/bookmarks",
          icon: "fa-solid fa-bookmark",
          label: "Yer İmleri",
          "is-active": isActiveRoute("/bookmarks")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/test-categories",
          icon: "fa-solid fa-clipboard-question",
          label: "Testler",
          "is-active": isActiveRoute("/test-categories") || isActiveRoute("/tests")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/rendition/words",
          icon: "fa-solid fa-globe",
          label: "Kelimeler",
          "is-active": isActiveRoute("/rendition")
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          href: "/services",
          icon: "fa-solid fa-bolt",
          label: "Servisler",
          "is-active": isActiveRoute("/services") || isActiveRoute("/projects") || isActiveRoute("/customers")
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
      _push(`</div><div class="flex items-center gap-1.5" data-v-c2d0a2c5>`);
      _push(ssrRenderComponent(_sfc_main$4, { variant: "desktop" }, null, _parent));
      if (isLanguagePackShowPage.value && isLoggedIn.value && pack.value) {
        _push(`<div class="flex items-center gap-2" data-v-c2d0a2c5>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("rendition.language-packs.edit", pack.value.id),
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-c2d0a2c5${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteLanguagePack(pack.value.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-c2d0a2c5${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isWorkspaceShowPage.value && !isWorkspaceEditPage.value && isLoggedIn.value && _ctx.workspace) {
        _push(`<div class="flex items-center gap-2" data-v-c2d0a2c5>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/workspace/${_ctx.workspace.id}/edit`,
          class: "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" data-v-c2d0a2c5${_scopeId}></path></svg> Düzenle `);
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
                ])),
                createTextVNode(" Düzenle ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: ($event) => deleteWorkspace(_ctx.workspace.id),
          variant: "outline",
          size: "sm",
          class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1.5 h-3.5 w-3.5" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-c2d0a2c5${_scopeId}></path></svg> Sil `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "mr-1.5 h-3.5 w-3.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  })
                ])),
                createTextVNode(" Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value && (isWriteCreatePage.value || isWriteEditPage.value || isCategoryCreatePage.value || isCategoryEditPage.value || isTestCreatePage.value || isTestEditPage.value || isTestCategoryCreatePage.value || isTestCategoryEditPage.value)) {
        _push(`<div class="flex items-center gap-1.5" data-v-c2d0a2c5>`);
        if (isWriteCreatePage.value || isCategoryCreatePage.value || isTestCreatePage.value || isTestCategoryCreatePage.value) {
          _push(ssrRenderComponent(_sfc_main$7, {
            onClick: handleFormReset,
            disabled: isFormProcessing.value,
            variant: "outline",
            size: "sm",
            class: "h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
            title: "Formu sıfırla"
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sıfırla `);
              } else {
                return [
                  createTextVNode(" Sıfırla ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$7, {
          onClick: handleFormSubmit,
          disabled: isFormProcessing.value,
          loading: isFormProcessing.value,
          variant: "default",
          size: "sm",
          class: "h-8 bg-foreground text-background hover:bg-foreground/90",
          title: isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Değişiklikleri kaydet" : "Kaydet"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!isFormProcessing.value) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-c2d0a2c5${_scopeId}></path></svg>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(isFormProcessing.value ? isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelleniyor..." : "Kaydediliyor..." : isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelle" : "Kaydet")}`);
            } else {
              return [
                !isFormProcessing.value ? (openBlock(), createBlock("svg", {
                  key: 0,
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "mr-1.5 h-3.5 w-3.5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M5 13l4 4L19 7"
                  })
                ])) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isFormProcessing.value ? isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelleniyor..." : "Kaydediliyor..." : isWriteEditPage.value || isCategoryEditPage.value || isTestEditPage.value || isTestCategoryEditPage.value ? "Güncelle" : "Kaydet"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<div class="create-dropdown-container relative inline-block" data-v-c2d0a2c5><button class="${ssrRenderClass([{ "bg-primary/90": showCreateDropdown.value }, "inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" title="Yeni içerik oluştur" data-v-c2d0a2c5><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" data-v-c2d0a2c5></path></svg></button>`);
        if (showCreateDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-52 rounded-md border border-border bg-popover shadow-md" data-v-c2d0a2c5><div class="flex flex-col p-1.5" data-v-c2d0a2c5><div class="mb-1.5" data-v-c2d0a2c5><div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-c2d0a2c5> Yazılar </div><div class="flex flex-col gap-0.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/writes/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Yazı `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Kategori Ekle `);
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
                  createTextVNode(" Yeni Kategori Ekle ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div><div class="mb-1.5" data-v-c2d0a2c5><div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-c2d0a2c5> Kelimeler </div><div class="flex flex-col gap-0.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/rendition/words/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Kelime `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Kelime Paketi `);
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
          _push(`</div></div><div class="mb-1.5" data-v-c2d0a2c5><div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-c2d0a2c5> Testler </div><div class="flex flex-col gap-0.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/tests/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Test `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Test Kategorisi `);
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
          _push(`</div></div><div class="mb-1.5" data-v-c2d0a2c5><div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-c2d0a2c5> Projeler </div><div class="flex flex-col gap-0.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/projects/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Proje `);
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
                      d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    })
                  ])),
                  createTextVNode(" Yeni Proje ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/customers/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Müşteri `);
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
                      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    })
                  ])),
                  createTextVNode(" Yeni Müşteri ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/services/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Servis `);
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
                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                    })
                  ])),
                  createTextVNode(" Yeni Servis ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div><div class="mb-1.5" data-v-c2d0a2c5><div class="mb-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-c2d0a2c5> Yer İmleri </div><div class="flex flex-col gap-0.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/bookmarks/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Yer İmi `);
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
                      d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    })
                  ])),
                  createTextVNode(" Yeni Yer İmi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: "/bookmark-categories/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Yer İmi Kategorisi `);
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
                      d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    })
                  ])),
                  createTextVNode(" Yeni Yer İmi Kategorisi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div><div class="border-t border-border pt-1.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/versions/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Versiyon `);
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
          _push(`</div><div class="border-t border-border pt-1.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/journey/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Yolculuk `);
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
                      d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    })
                  ])),
                  createTextVNode(" Yeni Yolculuk ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="border-t border-border pt-1.5" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: "/workspace/create",
            class: "inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: ($event) => showCreateDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-c2d0a2c5${_scopeId}></path></svg> Yeni Çalışma Alanı `);
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
                      d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  ])),
                  createTextVNode(" Yeni Çalışma Alanı ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isAdminPanelPage.value && isLoggedIn.value) {
        _push(`<div class="admin-panel-dropdown-container relative inline-block" data-v-c2d0a2c5><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": showAdminPanelDropdown.value }, "inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"])}" data-v-c2d0a2c5><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-c2d0a2c5></path></svg> Panel <svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": showAdminPanelDropdown.value }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-c2d0a2c5></path></svg></button>`);
        if (showAdminPanelDropdown.value) {
          _push(`<div class="absolute right-0 top-full z-50 mt-1 w-44 rounded-md border border-border bg-popover shadow-md" data-v-c2d0a2c5><div class="flex flex-col p-1" data-v-c2d0a2c5>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: ["inline-flex h-7 items-center gap-2 rounded-sm px-2 text-xs font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": isActiveRoute("/dashboard") }],
            onClick: ($event) => showAdminPanelDropdown.value = false
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-c2d0a2c5${_scopeId}></path></svg> Dashboard `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-c2d0a2c5${_scopeId}></path></svg> Medya Yönetimi `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-c2d0a2c5${_scopeId}></path></svg> Sosyal Medya Yönetimi `);
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
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-c2d0a2c5${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" data-v-c2d0a2c5${_scopeId}></path></svg> SEO Yönetimi `);
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
        _push(`<div class="hidden md:flex" data-v-c2d0a2c5>`);
        _push(ssrRenderComponent(_sfc_main$8, { "is-compact": true }, null, _parent));
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
const SidebarLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c2d0a2c5"]]);
const _sfc_main = {
  __name: "MainLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const title = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || ((_h = (_g = page.props) == null ? void 0 : _g.app) == null ? void 0 : _h.name) || "Check-up Codes";
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
const state$7 = () => ({
  activeMenu: "home"
});
const mutations$7 = {
  SET_ACTIVE_MENU(state2, menu) {
    state2.activeMenu = menu;
  }
};
const actions$7 = {
  setActiveMenu({ commit }, menu) {
    commit("SET_ACTIVE_MENU", menu);
  }
};
const getters$7 = {
  activeMenu: (state2) => state2.activeMenu
};
const ActiveMenu = {
  namespaced: true,
  state: state$7,
  mutations: mutations$7,
  actions: actions$7,
  getters: getters$7
};
const state$6 = () => ({
  bookmarks: [],
  bookmarkCategories: []
});
const mutations$6 = {
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
const actions$6 = {
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
const getters$6 = {
  bookmarks: (state2) => state2.bookmarks
};
const Bookmarks = {
  namespaced: true,
  state: state$6,
  mutations: mutations$6,
  actions: actions$6,
  getters: getters$6
};
const state$5 = () => ({
  writes: [],
  collapsed: false,
  scrollPosition: 0,
  filter: "all"
});
const mutations$5 = {
  SET_WRITES(state2, writes) {
    state2.writes = writes;
  },
  SET_COLLAPSED(state2, value) {
    state2.collapsed = value;
  },
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  },
  SET_FILTER(state2, filter) {
    state2.filter = filter;
  }
};
const actions$5 = {
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  },
  setFilter({ commit }, filter) {
    commit("SET_FILTER", filter);
  }
};
const getters$5 = {
  writes: (state2) => state2.writes,
  isCollapsed: (state2) => state2.collapsed,
  scrollPosition: (state2) => state2.scrollPosition,
  filter: (state2) => state2.filter
};
const Writes = {
  namespaced: true,
  state: state$5,
  mutations: mutations$5,
  actions: actions$5,
  getters: getters$5
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
const state$4 = () => ({
  collapsed: /* @__PURE__ */ new Set(),
  scrollPosition: 0
});
const mutations$4 = {
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
  },
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  }
};
const actions$4 = {
  toggleCollapse({ commit }, id) {
    commit("TOGGLE_COLLAPSE", id);
  },
  expandAll({ commit }) {
    commit("EXPAND_ALL");
  },
  collapseAll({ commit }, allIds) {
    commit("COLLAPSE_ALL", allIds);
  },
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  }
};
const getters$4 = {
  isCollapsed: (state2) => (id) => state2.collapsed.has(id),
  collapsedSet: (state2) => state2.collapsed,
  scrollPosition: (state2) => state2.scrollPosition
};
const CategorySidebar = {
  namespaced: true,
  state: state$4,
  mutations: mutations$4,
  actions: actions$4,
  getters: getters$4
};
const state$3 = () => ({
  scrollPosition: 0
});
const mutations$3 = {
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  }
};
const actions$3 = {
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  }
};
const getters$3 = {
  scrollPosition: (state2) => state2.scrollPosition
};
const Projects = {
  namespaced: true,
  state: state$3,
  mutations: mutations$3,
  actions: actions$3,
  getters: getters$3
};
const state$2 = () => ({
  scrollPosition: 0
});
const mutations$2 = {
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  }
};
const actions$2 = {
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  }
};
const getters$2 = {
  scrollPosition: (state2) => state2.scrollPosition
};
const Rendition = {
  namespaced: true,
  state: state$2,
  mutations: mutations$2,
  actions: actions$2,
  getters: getters$2
};
const state$1 = () => ({
  scrollPosition: 0
});
const mutations$1 = {
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  }
};
const actions$1 = {
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  }
};
const getters$1 = {
  scrollPosition: (state2) => state2.scrollPosition
};
const Versions = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1,
  actions: actions$1,
  getters: getters$1
};
const state = () => ({
  scrollPosition: 0
});
const mutations = {
  SET_SCROLL_POSITION(state2, position) {
    state2.scrollPosition = position;
  }
};
const actions = {
  setScrollPosition({ commit }, position) {
    commit("SET_SCROLL_POSITION", position);
  }
};
const getters = {
  scrollPosition: (state2) => state2.scrollPosition
};
const Journey = {
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
    CategorySidebar,
    Projects,
    Rendition,
    Versions,
    Journey
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
      const page2 = (await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-sRjXXmNx.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Bm1FWiOi.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CrV4Xi13.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-BFT6rCyC.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-MPSkIPiF.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-gXEKt2rp.js"), "./Pages/Bookmarks/Create/Screen.vue": () => import("./assets/Screen-D8TYZc5t.js"), "./Pages/Bookmarks/CreateBookmark.vue": () => import("./assets/CreateBookmark-vav_5P28.js"), "./Pages/Bookmarks/CreateBookmarks.vue": () => import("./assets/CreateBookmarks-DVJTJcy3.js"), "./Pages/Bookmarks/CreateCategory.vue": () => import("./assets/CreateCategory-BD7PHiEK.js"), "./Pages/Bookmarks/CreateCategory/Screen.vue": () => import("./assets/Screen-CnqZGqJD.js"), "./Pages/Bookmarks/Edit/Screen.vue": () => import("./assets/Screen-CprJ-W9o.js"), "./Pages/Bookmarks/EditBookmark.vue": () => import("./assets/EditBookmark-C2RtKWy0.js"), "./Pages/Bookmarks/EditBookmarks.vue": () => import("./assets/EditBookmarks-DZrKHk0d.js"), "./Pages/Bookmarks/Index/Screen.vue": () => import("./assets/Screen-DTtNC-ex.js"), "./Pages/Bookmarks/IndexBookmarks.vue": () => import("./assets/IndexBookmarks-D7_psssR.js"), "./Pages/Bookmarks/Show/Screen.vue": () => import("./assets/Screen-D4WUel-r.js"), "./Pages/Bookmarks/ShowBookmark.vue": () => import("./assets/ShowBookmark-DfrqlghI.js"), "./Pages/Bookmarks/ShowBookmarks.vue": () => import("./assets/ShowBookmarks-B_Ty2lxF.js"), "./Pages/Bookmarks/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-B16ebHBN.js"), "./Pages/Bookmarks/_components/CategoryList.vue": () => import("./assets/CategoryList-DHavE1bp.js"), "./Pages/Bookmarks/_layouts/LayoutBookmarks.vue": () => import("./assets/LayoutBookmarks-CHaP1v8n.js"), "./Pages/Bookmarks/_layouts/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-BYKTJlEI.js"), "./Pages/Category/TypescriptTutorial.vue": () => import("./assets/TypescriptTutorial-UDcIixY-.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-DakEfyw-.js"), "./Pages/Equipments/Create/Screen.vue": () => import("./assets/Screen-D1PJcqvP.js"), "./Pages/Equipments/CreateEquipment.vue": () => import("./assets/CreateEquipment-CxmoL0yv.js"), "./Pages/Equipments/Edit/Screen.vue": () => import("./assets/Screen-Ca5kb9UJ.js"), "./Pages/Equipments/EditEquipment.vue": () => import("./assets/EditEquipment-D2FCZljd.js"), "./Pages/Equipments/Index/Screen.vue": () => import("./assets/Screen-Cuce7w9O.js"), "./Pages/Equipments/IndexEquipment.vue": () => import("./assets/IndexEquipment-BqyUdMbS.js"), "./Pages/Equipments/ShowEquipment.vue": () => import("./assets/ShowEquipment-Di6pVRrk.js"), "./Pages/Excalidraw.vue": () => import("./assets/Excalidraw-CIpKdsHo.js"), "./Pages/FBVersions/Versions/Create/Screen.vue": () => import("./assets/Screen-CdAT18gP.js"), "./Pages/FBVersions/Versions/CreateVersion.vue": () => import("./assets/CreateVersion-Csl1G6De.js"), "./Pages/FBVersions/Versions/Edit/Screen.vue": () => import("./assets/Screen-B3Qa9K4k.js"), "./Pages/FBVersions/Versions/EditVersion.vue": () => import("./assets/EditVersion-DnbXSm2C.js"), "./Pages/FBVersions/Versions/Index/Screen.vue": () => import("./assets/Screen-D-ArRANW.js"), "./Pages/FBVersions/Versions/IndexVersion.vue": () => import("./assets/IndexVersion-BGG0r3cb.js"), "./Pages/FBVersions/Versions/Show/Screen.vue": () => import("./assets/Screen-DiNV7Fu4.js"), "./Pages/FBVersions/Versions/ShowVersion.vue": () => import("./assets/ShowVersion-Dgj08tnM.js"), "./Pages/FBVersions/_components/VersionList.vue": () => import("./assets/VersionList-DVzPtux-.js"), "./Pages/FBVersions/_layouts/LayoutFBVersions.vue": () => import("./assets/LayoutFBVersions-5CZZLhnu.js"), "./Pages/FBVersions/_layouts/SidebarLayoutVersion.vue": () => import("./assets/SidebarLayoutVersion-fCq_005T.js"), "./Pages/Index/Factory.vue": () => import("./assets/Factory-2ZHSsfDx.js"), "./Pages/Index/Index.vue": () => import("./assets/Index-zhWjniTa.js"), "./Pages/JoinUs/Index.vue": () => import("./assets/Index-D3YooWAL.js"), "./Pages/Journey/CreateJourney.vue": () => import("./assets/CreateJourney-BfB3MUgH.js"), "./Pages/Journey/EditJourney.vue": () => import("./assets/EditJourney-CBzsE3F8.js"), "./Pages/Journey/IndexJourney.vue": () => import("./assets/IndexJourney-D10SODD7.js"), "./Pages/Journey/ShowJourney.vue": () => import("./assets/ShowJourney-BHUidtqS.js"), "./Pages/Journey/_components/JourneyTimeline.vue": () => import("./assets/JourneyTimeline-Da0328av.js"), "./Pages/Journey/_layouts/LayoutJourney.vue": () => import("./assets/LayoutJourney-CJ7QJRBs.js"), "./Pages/Journey/_layouts/SidebarLayoutJourney.vue": () => import("./assets/SidebarLayoutJourney-C_y6Q3RS.js"), "./Pages/Lessons/Create/Screen.vue": () => import("./assets/Screen-DM2qDQnp.js"), "./Pages/Lessons/CreateLesson.vue": () => import("./assets/CreateLesson-CDEx7idw.js"), "./Pages/Lessons/Edit/Screen.vue": () => import("./assets/Screen-BZ2DssE-.js"), "./Pages/Lessons/EditLesson.vue": () => import("./assets/EditLesson-CmhufXGU.js"), "./Pages/Lessons/Index/Screen.vue": () => import("./assets/Screen-incOXbjn.js"), "./Pages/Lessons/IndexLesson.vue": () => import("./assets/IndexLesson-CvNRFODW.js"), "./Pages/Lessons/Show/Screen.vue": () => import("./assets/Screen-ART9Tt8f.js"), "./Pages/Lessons/ShowLesson.vue": () => import("./assets/ShowLesson-CmGb7Ysw.js"), "./Pages/Lessons/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-Dj2LdwWi.js"), "./Pages/Lessons/_layouts/SidebarLayoutLesson.vue": () => import("./assets/SidebarLayoutLesson-3ph7vEE9.js"), "./Pages/Media/Index.vue": () => import("./assets/Index-OPV2Ro6n.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-DfcbY7Kz.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-BO_TUPd8.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-DUHglCIa.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-Dp6jjNY2.js"), "./Pages/Projects/Customers/Create/Screen.vue": () => import("./assets/Screen-BkyEbISs.js"), "./Pages/Projects/Customers/CreateCustomer.vue": () => import("./assets/CreateCustomer-B6tdm3gE.js"), "./Pages/Projects/Customers/Edit/Screen.vue": () => import("./assets/Screen-Dr4NGv4w.js"), "./Pages/Projects/Customers/EditCustomer.vue": () => import("./assets/EditCustomer-CXukem62.js"), "./Pages/Projects/Customers/Index/Screen.vue": () => import("./assets/Screen-PgVKME_n.js"), "./Pages/Projects/Customers/IndexCustomer.vue": () => import("./assets/IndexCustomer-BN7rpGUu.js"), "./Pages/Projects/Customers/Show/Screen.vue": () => import("./assets/Screen-DFvSGk2x.js"), "./Pages/Projects/Customers/ShowCustomer.vue": () => import("./assets/ShowCustomer-D9t3p9vk.js"), "./Pages/Projects/Index/Screen.vue": () => import("./assets/Screen-ChWE9CPu.js"), "./Pages/Projects/Project/Create/Screen.vue": () => import("./assets/Screen-BtP0Q_Xg.js"), "./Pages/Projects/Project/CreateProject.vue": () => import("./assets/CreateProject-DSPZFbAO.js"), "./Pages/Projects/Project/Edit/Screen.vue": () => import("./assets/Screen-CN_lp82D.js"), "./Pages/Projects/Project/EditProject.vue": () => import("./assets/EditProject-BfOBF_yf.js"), "./Pages/Projects/Project/Index/Screen.vue": () => import("./assets/Screen-CgAEJyJm.js"), "./Pages/Projects/Project/IndexProject.vue": () => import("./assets/IndexProject-DGjuVl4E.js"), "./Pages/Projects/Project/Show/Screen.vue": () => import("./assets/Screen-BUZusBj3.js"), "./Pages/Projects/Project/ShowProject.vue": () => import("./assets/ShowProject-tHK17VqK.js"), "./Pages/Projects/Services/Create/Screen.vue": () => import("./assets/Screen-CaFootcz.js"), "./Pages/Projects/Services/CreateService.vue": () => import("./assets/CreateService-BibUne7B.js"), "./Pages/Projects/Services/Edit/Screen.vue": () => import("./assets/Screen-BqxHLZOh.js"), "./Pages/Projects/Services/EditService.vue": () => import("./assets/EditService-BcjO2lG7.js"), "./Pages/Projects/Services/Index/Screen.vue": () => import("./assets/Screen-CkGisVOO.js"), "./Pages/Projects/Services/Index/ServiceItem.vue": () => import("./assets/ServiceItem-DTEIIbIp.js"), "./Pages/Projects/Services/IndexService.vue": () => import("./assets/IndexService-CvrQNm6b.js"), "./Pages/Projects/Services/Show/Screen.vue": () => import("./assets/Screen-6MiujRrJ.js"), "./Pages/Projects/Services/ShowService.vue": () => import("./assets/ShowService-Bsk5gJlD.js"), "./Pages/Projects/_components/icons/IconBolt.vue": () => import("./assets/IconBolt-Dji8lGsB.js"), "./Pages/Projects/_components/icons/IconFolder.vue": () => import("./assets/IconFolder-BkG6LNKa.js"), "./Pages/Projects/_components/icons/IconUsers.vue": () => import("./assets/IconUsers-FdijcrvF.js"), "./Pages/Projects/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-DB7hxOeI.js"), "./Pages/Projects/_layouts/LayoutProjects.vue": () => import("./assets/LayoutProjects-a6Q62vfq.js"), "./Pages/Projects/_layouts/SidebarLayoutProject.vue": () => import("./assets/SidebarLayoutProject-iS8_o4aq.js").then((n2) => n2.a), "./Pages/Rendition/LanguagePacks/Create/Screen.vue": () => import("./assets/Screen-DdkV-zMN.js"), "./Pages/Rendition/LanguagePacks/CreateLanguagePacks.vue": () => import("./assets/CreateLanguagePacks-Dj7mxMPV.js"), "./Pages/Rendition/LanguagePacks/Edit/Screen.vue": () => import("./assets/Screen-Dp5E3BB-.js"), "./Pages/Rendition/LanguagePacks/EditLanguagePacks.vue": () => import("./assets/EditLanguagePacks-6HwwfMVb.js"), "./Pages/Rendition/LanguagePacks/Index/PacksTable.vue": () => import("./assets/PacksTable-DQKGCB3I.js"), "./Pages/Rendition/LanguagePacks/Index/Screen.vue": () => import("./assets/Screen-DDPY4chx.js"), "./Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue": () => import("./assets/IndexLanguagePacks-hBiHZtn9.js"), "./Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue": () => import("./assets/ShowLanguagePacks-B6gb_cWN.js"), "./Pages/Rendition/LanguagePacks/Words.vue": () => import("./assets/Words-B38stB4g.js"), "./Pages/Rendition/LanguagePacks/Words/Screen.vue": () => import("./assets/Screen-CbRE3i8d.js"), "./Pages/Rendition/Words/Create/Screen.vue": () => import("./assets/Screen-bZtiAuB8.js"), "./Pages/Rendition/Words/CreateWord.vue": () => import("./assets/CreateWord-DEeR0c_i.js"), "./Pages/Rendition/Words/Edit/Screen.vue": () => import("./assets/Screen-C3F1PZjQ.js"), "./Pages/Rendition/Words/EditWord.vue": () => import("./assets/EditWord-f9rxbb-E.js"), "./Pages/Rendition/Words/Index/Screen.vue": () => import("./assets/Screen-DL_ttfec.js"), "./Pages/Rendition/Words/IndexWord.vue": () => import("./assets/IndexWord-CufaxAmx.js"), "./Pages/Rendition/Words/Show/Screen.vue": () => import("./assets/Screen-ChqaxEE4.js"), "./Pages/Rendition/Words/ShowWord.vue": () => import("./assets/ShowWord-OQP_1epY.js"), "./Pages/Rendition/_components/MultipleChoice.vue": () => import("./assets/MultipleChoice-u5pTSo_A.js"), "./Pages/Rendition/_components/TranslateWord.vue": () => import("./assets/TranslateWord-CGHthvW-.js"), "./Pages/Rendition/_components/WordCompletion.vue": () => import("./assets/WordCompletion-CSmlEb1_.js"), "./Pages/Rendition/_components/WordsTable.vue": () => import("./assets/WordsTable-D4oJJB5N.js"), "./Pages/Rendition/_layouts/LayoutRendition.vue": () => import("./assets/LayoutRendition-CiyznIbi.js"), "./Pages/Rendition/_layouts/SidebarPackGame.vue": () => import("./assets/SidebarPackGame-BohImo3f.js"), "./Pages/Rendition/_layouts/SidebarRendition.vue": () => import("./assets/SidebarRendition-DdfzZZvV.js"), "./Pages/Seo/Edit.vue": () => import("./assets/Edit-CPmBybze.js"), "./Pages/SocialMedia/Index.vue": () => import("./assets/Index-DUoBKF7m.js"), "./Pages/SoftwareProducts/Create.vue": () => import("./assets/Create-BdSBTOmf.js"), "./Pages/SoftwareProducts/Edit.vue": () => import("./assets/Edit-BvkfhlLO.js"), "./Pages/SoftwareProducts/Index.vue": () => import("./assets/Index-BDG1qC-T.js"), "./Pages/SoftwareProducts/Show.vue": () => import("./assets/Show-C4u6lUfx.js"), "./Pages/SoftwareProducts/component/Box.vue": () => import("./assets/Box-CvUfE-UW.js"), "./Pages/SoftwareProducts/component/ConfirmModal.vue": () => import("./assets/ConfirmModal-8bTg5PxV.js"), "./Pages/SoftwareProducts/component/SPAddress.vue": () => import("./assets/SPAddress-C4B-URBw.js"), "./Pages/SoftwareProducts/component/SPPrice.vue": () => import("./assets/SPPrice-DDe_ZJN3.js"), "./Pages/SoftwareProducts/component/SPSpaces.vue": () => import("./assets/SPSpaces-C-9fwGUn.js"), "./Pages/TestCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-oA6Dpjd5.js"), "./Pages/TestCategories/Categories/Create/TestCategoriesCreateForm.vue": () => import("./assets/TestCategoriesCreateForm-Cv1Y0aHh.js"), "./Pages/TestCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-CxrSmm7w.js"), "./Pages/TestCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-CbtZaEeE.js"), "./Pages/TestCategories/Categories/Edit/TestCategoriesEditForm.vue": () => import("./assets/TestCategoriesEditForm-BgZbJV2x.js"), "./Pages/TestCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-C8kIv-qK.js"), "./Pages/TestCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-KRqHDmjp.js"), "./Pages/TestCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-D1MI4oWT.js"), "./Pages/TestCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-kPOatNtS.js"), "./Pages/TestCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-BoiyF-fG.js"), "./Pages/TestCategories/Tests/Create/Screen.vue": () => import("./assets/Screen-ARCPWqVU.js"), "./Pages/TestCategories/Tests/Create/TestCreateForm.vue": () => import("./assets/TestCreateForm-CTBUft-n.js"), "./Pages/TestCategories/Tests/CreateTest.vue": () => import("./assets/CreateTest-BYnxZDtW.js"), "./Pages/TestCategories/Tests/Edit/Screen.vue": () => import("./assets/Screen-CGwn5qL1.js"), "./Pages/TestCategories/Tests/Edit/TestUpdateForm.vue": () => import("./assets/TestUpdateForm-BuL-K3Xv.js"), "./Pages/TestCategories/Tests/EditTest.vue": () => import("./assets/EditTest-lkdaLiXH.js"), "./Pages/TestCategories/Tests/Index/Screen.vue": () => import("./assets/Screen-Ciz9MVFk.js"), "./Pages/TestCategories/Tests/IndexTest.vue": () => import("./assets/IndexTest-DbyxdI6E.js"), "./Pages/TestCategories/Tests/Result/Screen.vue": () => import("./assets/Screen-BmGItcjg.js"), "./Pages/TestCategories/Tests/Show/Screen.vue": () => import("./assets/Screen-BMVvcXYa.js"), "./Pages/TestCategories/Tests/ShowTest.vue": () => import("./assets/ShowTest-CkxPXJKW.js"), "./Pages/TestCategories/Tests/Take/Screen.vue": () => import("./assets/Screen-DTZ2WR7N.js"), "./Pages/TestCategories/Tests/TakeTest.vue": () => import("./assets/TakeTest-CnrbD5hD.js"), "./Pages/TestCategories/Tests/TestResult.vue": () => import("./assets/TestResult-CBdC1xtz.js"), "./Pages/TestCategories/_components/icons/IconChevronDown.vue": () => import("./assets/IconChevronDown-phZsUDO_.js"), "./Pages/TestCategories/_components/icons/IconFolder.vue": () => import("./assets/IconFolder-Q1UwPFvL.js"), "./Pages/TestCategories/_components/icons/IconMenu.vue": () => import("./assets/IconMenu-BWjMD6eg.js"), "./Pages/TestCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-BQUdblcd.js"), "./Pages/TestCategories/_composables/TestList.vue": () => import("./assets/TestList-Cnc-dGHw.js"), "./Pages/TestCategories/_layouts/LayoutTestCategories.vue": () => import("./assets/LayoutTestCategories-DSEtnDd9.js"), "./Pages/TestCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-DuiiNfDc.js"), "./Pages/TestCategories/_layouts/SidebarLayoutTest.vue": () => import("./assets/SidebarLayoutTest-Wfdg74yQ.js"), "./Pages/ThemeManagement.vue": () => import("./assets/ThemeManagement-DgzGwL0z.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-bSatZHEn.js"), "./Pages/Workspace/CreateWorkspace.vue": () => import("./assets/CreateWorkspace-BjhyVNka.js"), "./Pages/Workspace/EditWorkspace.vue": () => import("./assets/EditWorkspace-f2EwcqZg.js"), "./Pages/Workspace/IndexWorkspace.vue": () => import("./assets/IndexWorkspace-Buv164-N.js"), "./Pages/Workspace/ShowWorkspace.vue": () => import("./assets/ShowWorkspace-DKEPOK-f.js"), "./Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue": () => import("./assets/CategoriesCreateFrom-LFKkqJl6.js"), "./Pages/WritesCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-VPmegtjY.js"), "./Pages/WritesCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-Trby1Juv.js"), "./Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue": () => import("./assets/CategoriesEditFrom-B90DVaYU.js"), "./Pages/WritesCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-CNLWobtL.js"), "./Pages/WritesCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-hLCo-aDY.js"), "./Pages/WritesCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-D0ZfctUC.js"), "./Pages/WritesCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-CwOkPRxx.js"), "./Pages/WritesCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-CFumEUOU.js"), "./Pages/WritesCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-fgEF_oFB.js"), "./Pages/WritesCategories/Categories/WriteByCategory.vue": () => import("./assets/WriteByCategory-CnAhSkUa.js"), "./Pages/WritesCategories/Categories/WriteByCategory/Screen.vue": () => import("./assets/Screen-CHtEFuP_.js"), "./Pages/WritesCategories/Writes/Create/FormField.vue": () => import("./assets/FormField-DPlgYte7.js"), "./Pages/WritesCategories/Writes/Create/Screen.vue": () => import("./assets/Screen-r3UqpihP.js"), "./Pages/WritesCategories/Writes/Create/WriteCreateForm.vue": () => import("./assets/WriteCreateForm-BGkTS-QQ.js"), "./Pages/WritesCategories/Writes/CreateWrite.vue": () => import("./assets/CreateWrite-fFHz-NiV.js"), "./Pages/WritesCategories/Writes/Edit/Screen.vue": () => import("./assets/Screen-CAJ5xBNI.js"), "./Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue": () => import("./assets/WriteUpdateForm-CG9VE9cQ.js"), "./Pages/WritesCategories/Writes/EditWrite.vue": () => import("./assets/EditWrite-D76wS4vQ.js"), "./Pages/WritesCategories/Writes/Index/Screen.vue": () => import("./assets/Screen-AbTAB4i6.js"), "./Pages/WritesCategories/Writes/IndexWrite.vue": () => import("./assets/IndexWrite-BfYhSdmn.js"), "./Pages/WritesCategories/Writes/Show/Screen.vue": () => import("./assets/Screen-oGSYDD_2.js"), "./Pages/WritesCategories/Writes/ShowWrite.vue": () => import("./assets/ShowWrite-B9BqQSGa.js"), "./Pages/WritesCategories/_components/RichTextEditor.vue": () => import("./assets/RichTextEditor-CQGJN3ey.js"), "./Pages/WritesCategories/_components/icons/IconCalendar.vue": () => import("./assets/IconCalendar-BeMkwtmn.js"), "./Pages/WritesCategories/_components/icons/IconChevronDown.vue": () => import("./assets/IconChevronDown-ClwhHkE5.js"), "./Pages/WritesCategories/_components/icons/IconEye.vue": () => import("./assets/IconEye-C4IDtysD.js"), "./Pages/WritesCategories/_components/icons/IconFilter.vue": () => import("./assets/IconFilter-Cx1-Qiq_.js"), "./Pages/WritesCategories/_components/icons/IconFolder.vue": () => import("./assets/IconFolder-BMytUC2M.js"), "./Pages/WritesCategories/_components/icons/IconLink.vue": () => import("./assets/IconLink-D_NS_GoN.js"), "./Pages/WritesCategories/_components/icons/IconLock.vue": () => import("./assets/IconLock-DLKK0TNF.js"), "./Pages/WritesCategories/_components/icons/IconMenu.vue": () => import("./assets/IconMenu-D3qnKg3d.js"), "./Pages/WritesCategories/_components/icons/IconX.vue": () => import("./assets/IconX-B1Q85S0Q.js"), "./Pages/WritesCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-B5h1I9f2.js"), "./Pages/WritesCategories/_composables/WriteList.vue": () => import("./assets/WriteList-CFPHcfRh.js"), "./Pages/WritesCategories/_layouts/LayoutWritesCategories.vue": () => import("./assets/LayoutWritesCategories-a4reyl9R.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-Cbpoywvz.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue": () => import("./assets/SidebarLayoutWrite-BsqXc61V.js") }))).default;
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
  _sfc_main$6 as a,
  _sfc_main$7 as b,
  render as default
};
