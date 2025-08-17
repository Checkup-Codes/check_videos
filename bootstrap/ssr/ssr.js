import { mergeProps, useSSRContext, ref, computed, unref, withCtx, createVNode, toDisplayString, onMounted, watch, createTextVNode, provide, createSSRApp, h as h$1 } from "vue";
import { usePage, Link, Head, createInertiaApp } from "@inertiajs/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import axios from "axios";
import { useStore, createStore } from "vuex";
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
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "mr-2 h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/GoBack.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const GoBackSvg = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$8 = {
  __name: "ProfileCard",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const { props } = usePage();
    const seoTitle = ref(((_b = (_a = props == null ? void 0 : props.screen) == null ? void 0 : _a.seo) == null ? void 0 : _b.title) ?? "Seo Title");
    ref(((_d = (_c = props == null ? void 0 : props.screen) == null ? void 0 : _c.seo) == null ? void 0 : _d.description) ?? "Seo Description");
    const logoPath = ref(((_f = (_e = props == null ? void 0 : props.screen) == null ? void 0 : _e.seo) == null ? void 0 : _f.logo) ?? "");
    const logoAlt = ref("Logo");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-fit cursor-pointer items-center gap-4 rounded-lg p-4" }, _attrs))} data-v-539c0545><div class="avatar" data-v-539c0545><div class="h-10 w-10 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100" data-v-539c0545>`);
      if (!isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full rounded-full object-cover" data-v-539c0545>`);
      } else {
        _push(`<div class="h-full w-full rounded-full bg-base-200" data-v-539c0545><div class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200" data-v-539c0545></div></div>`);
      }
      _push(`</div></div><div class="flex flex-col" data-v-539c0545>`);
      if (!isLoading.value) {
        _push(`<div class="font-semibold text-base-content" data-v-539c0545>${ssrInterpolate(seoTitle.value ?? "Seo Title")}</div>`);
      } else {
        _push(`<div class="space-y-2" data-v-539c0545><div class="h-5 w-32 animate-pulse rounded bg-base-200" data-v-539c0545></div><div class="h-4 w-40 animate-pulse rounded bg-base-200" data-v-539c0545></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/ProfileCard.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ProfileCard = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-539c0545"]]);
const _sfc_main$7 = {
  __name: "NavItem",
  __ssrInlineRender: true,
  props: {
    href: String,
    icon: [String, Array],
    label: String,
    external: Boolean
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
        class: ["flex w-full items-center justify-between rounded-lg border px-3 py-1.5 backdrop-blur-md transition-all duration-200", {
          // Aktif durumda: tema uyumlu ve zıt kontrast
          "border-primary bg-primary text-primary-content shadow-md": isActive.value,
          // Pasif durumda: yumuşak görünüm
          "border-base-200 bg-base-200 text-base-content hover:bg-base-300": !isActive.value
        }]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FontAwesomeIcon), {
              icon: dynamicIcon.value,
              class: ["h-4 w-4 transition-colors duration-200", isActive.value ? "text-primary-content" : "text-base-content"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="${ssrRenderClass([isActive.value ? "text-primary-content" : "text-base-content", "font-sans text-sm transition-colors duration-200"])}"${_scopeId}>${ssrInterpolate(__props.label)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(unref(FontAwesomeIcon), {
                  icon: dynamicIcon.value,
                  class: ["h-4 w-4 transition-colors duration-200", isActive.value ? "text-primary-content" : "text-base-content"]
                }, null, 8, ["icon", "class"]),
                createVNode("span", {
                  class: ["font-sans text-sm transition-colors duration-200", isActive.value ? "text-primary-content" : "text-base-content"]
                }, toDisplayString(__props.label), 3)
              ])
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
const _sfc_main$6 = {
  __name: "MainNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const isLoggedIn = computed(() => !!(page.props.auth && page.props.auth.user));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "w-full space-y-1 bg-base-200 px-2" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        href: "/",
        icon: "home",
        label: "Ana Sayfa"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, {
        href: "/writes",
        icon: "fa-solid fa-pencil",
        label: "Yazılar"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, {
        href: "/categories",
        icon: "fa-solid fa-book",
        label: "Kategoriler"
      }, null, _parent));
      if (isLoggedIn.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          href: "/rendition/words",
          icon: "fa-solid fa-globe",
          label: "Kelimeler"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(ssrRenderComponent(_sfc_main$7, {
          href: "/versions",
          icon: "fa-solid fa-sync",
          label: "Versiyonlar"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/MainNavigation.vue");
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
    shortcut: {
      type: String,
      default: null
    },
    matchPath: {
      type: String,
      default: ""
      // örnek: '/twitter'
    }
  },
  setup(__props) {
    const props = __props;
    const isActive = computed(() => {
      return props.matchPath && window.location.href.includes(props.matchPath);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.href,
        target: "_blank",
        rel: "noopener noreferrer",
        class: ["flex w-full items-center justify-between rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200", {
          "border-primary bg-primary text-primary-content shadow-md": isActive.value,
          "border-base-200 bg-base-200 text-base-content hover:bg-base-300": !isActive.value
        }],
        title: __props.label
      }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(FontAwesomeIcon), {
        icon: __props.icon,
        class: "h-5 w-5 text-base-content"
      }, null, _parent));
      _push(`<span class="text-sm font-medium text-base-content">${ssrInterpolate(__props.label)}</span></div>`);
      if (__props.shortcut) {
        _push(`<div class="badge text-xs">${ssrInterpolate(__props.shortcut)}</div>`);
      } else {
        _push(`<!---->`);
      }
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
      // TikTok ikonu artık mevcut
      Pinterest: ["fab", "pinterest"],
      // Pinterest ikonu artık mevcut
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
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "w-full bg-base-200 px-2" }, _attrs))}><h3 class="border-t-2 border-base-300 px-3 py-3 text-xs">Hesaplar</h3><!--[-->`);
      ssrRenderList(socialLinks.value, (link) => {
        _push(`<!--[-->`);
        if (link.is_active) {
          _push(ssrRenderComponent(_sfc_main$5, {
            href: link.url,
            icon: getSocialIcon(link.platform),
            label: link.platform
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav>`);
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
  __name: "ThemeSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const store2 = useStore();
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    store2.dispatch("Theme/initTheme");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "btn btn-ghost" }, _attrs))}>`);
      if (currentTheme.value === "light") {
        _push(`<svg class="h-6 w-6 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg>`);
      } else {
        _push(`<svg class="h-6 w-6 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/ThemeSwitcher.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
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
    ref("");
    const isMenuOpen = ref(false);
    const page = usePage();
    const imagePath = ref("");
    const auth = ref(null);
    const appName = computed(() => usePage().props.app.name);
    const title = ref("");
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
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header class="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-base-200 bg-base-100 px-4 sm:px-5 lg:hidden" data-v-69c01a67>`);
      if (basePath.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: `/${basePath.value}`,
          class: "btn btn-ghost btn-sm px-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(GoBackSvg, { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(GoBackSvg, { class: "h-5 w-5" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-8" data-v-69c01a67></div>`);
      }
      _push(`<div class="px-3 py-1 font-bold uppercase text-primary" data-v-69c01a67>`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
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
      _push(`</div><button class="btn btn-ghost btn-sm px-2" data-v-69c01a67><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-69c01a67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-v-69c01a67></path></svg></button></header>`);
      if (isMenuOpen.value) {
        _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "opacity-100" : "opacity-0", "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"])}" data-v-69c01a67></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "translate-y-0" : "translate-y-full", "drawer-content drawer-end fixed inset-x-0 bottom-0 z-50 transform transition-all duration-300 ease-in-out"])}" data-v-69c01a67><div class="max-h-[90vh] overflow-y-auto rounded-t-xl border border-base-200 bg-base-100 pb-6 pt-4 shadow-lg" data-v-69c01a67><div class="mb-4 flex justify-center" data-v-69c01a67><div class="h-1 w-10 rounded-full bg-base-300" data-v-69c01a67></div></div><div class="px-4" data-v-69c01a67>`);
      _push(ssrRenderComponent(ProfileCard, { imagePath: imagePath.value }, null, _parent));
      _push(`<div class="mt-4" data-v-69c01a67>`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`</div><div class="mt-4" data-v-69c01a67>`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div><div class="mt-6 flex flex-col items-center" data-v-69c01a67>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<p class="text-base-content/60 mt-2 text-xs" data-v-69c01a67>${ssrInterpolate(appName.value)} - Tüm Hakları Saklıdır</p></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/HeaderLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const HeaderLayout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-69c01a67"]]);
const _sfc_main$1 = {
  __name: "SidebarLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 p-1 font-sans" }, _attrs))}><div>`);
      _push(ssrRenderComponent(ProfileCard, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div><div class="absolute inset-x-0 bottom-0 py-4 text-center">`);
      _push(ssrRenderComponent(_sfc_main$3, { class: "mx-auto" }, null, _parent));
      _push(`<p class="text-base-content/60 mt-2 text-xs">${ssrInterpolate(_ctx.seoTitle)} - Tüm Hakları Saklıdır</p></div></aside>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/SidebarLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const sidebarClass = "fixed inset-y-0 left-0 z-40 hidden overflow-hidden lg:block lg:w-52 ";
const contentWrapperClass = "lg:pl-52 ";
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
    const writes = page.props.writes || [];
    provide("writes", writes);
    const categories = page.props.categories || [];
    provide("categories", categories);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
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
      _push(ssrRenderComponent(_sfc_main$1, {
        class: sidebarClass,
        onLinkClicked: toggleSidebar
      }, null, _parent));
      _push(`<div class="${ssrRenderClass(contentWrapperClass)}">`);
      _push(ssrRenderComponent(HeaderLayout, { onToggleSidebar: toggleSidebar }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><!--]-->`);
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
    // Mevcut temalar
    availableThemes: ["light", "dark", "nature", "ocean"]
  },
  mutations: {
    // Temayı değiştirme işlemi
    setTheme(state2, theme) {
      document.documentElement.classList.remove(state2.currentTheme);
      state2.currentTheme = theme;
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.add(theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
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
    }
  },
  getters: {
    // Mevcut temayı döndürür
    getCurrentTheme: (state2) => state2.currentTheme,
    // Mevcut temanın dark olup olmadığını kontrol eder
    isDarkTheme: (state2) => state2.currentTheme === "dark",
    // Tüm temaları döndürür
    getAvailableThemes: (state2) => state2.availableThemes
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
      const page2 = (await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-Dtyi0Psq.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-CYn5tjWk.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CWm06mam.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-BTVdWxKD.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DMapKcwL.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-BuYpNThj.js"), "./Pages/Bookmarks/CreateBookmarks.vue": () => import("./assets/CreateBookmarks-oxJSX3Zs.js"), "./Pages/Bookmarks/EditBookmarks.vue": () => import("./assets/EditBookmarks-S8tvKBtq.js"), "./Pages/Bookmarks/IndexBookmarks.vue": () => import("./assets/IndexBookmarks-BH0g04d3.js"), "./Pages/Bookmarks/ShowBookmarks.vue": () => import("./assets/ShowBookmarks-B_Ty2lxF.js"), "./Pages/Bookmarks/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-B16ebHBN.js"), "./Pages/Category/TypescriptTutorial.vue": () => import("./assets/TypescriptTutorial-BIFkOjAm.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard--8wQ9fbl.js"), "./Pages/Equipments/Create/Screen.vue": () => import("./assets/Screen-D1PJcqvP.js"), "./Pages/Equipments/CreateEquipment.vue": () => import("./assets/CreateEquipment-CxmoL0yv.js"), "./Pages/Equipments/Edit/Screen.vue": () => import("./assets/Screen-Ca5kb9UJ.js"), "./Pages/Equipments/EditEquipment.vue": () => import("./assets/EditEquipment-D2FCZljd.js"), "./Pages/Equipments/Index/Screen.vue": () => import("./assets/Screen-0oDP1m6D.js"), "./Pages/Equipments/IndexEquipment.vue": () => import("./assets/IndexEquipment-B5M-6hUX.js"), "./Pages/Excalidraw.vue": () => import("./assets/Excalidraw-CzTXdE6L.js"), "./Pages/FBVersions/Versions/Create/Screen.vue": () => import("./assets/Screen-DgH6DI7f.js"), "./Pages/FBVersions/Versions/CreateVersion.vue": () => import("./assets/CreateVersion-h8KKYEb1.js"), "./Pages/FBVersions/Versions/Edit/Screen.vue": () => import("./assets/Screen-BO1zHluN.js"), "./Pages/FBVersions/Versions/EditVersion.vue": () => import("./assets/EditVersion-Bs0796um.js"), "./Pages/FBVersions/Versions/Index/Screen.vue": () => import("./assets/Screen-Dm5Zz5vf.js"), "./Pages/FBVersions/Versions/IndexVersion.vue": () => import("./assets/IndexVersion-CFp6vxju.js"), "./Pages/FBVersions/Versions/Show/Screen.vue": () => import("./assets/Screen-AXGXfjnc.js"), "./Pages/FBVersions/Versions/ShowVersion.vue": () => import("./assets/ShowVersion-CG24Ol4f.js"), "./Pages/FBVersions/_components/VersionList.vue": () => import("./assets/VersionList-BfMi4ShN.js"), "./Pages/FBVersions/_layouts/LayoutFBVersions.vue": () => import("./assets/LayoutFBVersions-BTgyeXST.js"), "./Pages/FBVersions/_layouts/SidebarLayoutVersion.vue": () => import("./assets/SidebarLayoutVersion-CODwvLUq.js"), "./Pages/Index/Factory.vue": () => import("./assets/Factory-DmE-vk79.js"), "./Pages/Index/Index.vue": () => import("./assets/Index-Blx240Cy.js"), "./Pages/Lessons/Create/Screen.vue": () => import("./assets/Screen-Dwo-Tpw_.js"), "./Pages/Lessons/CreateLesson.vue": () => import("./assets/CreateLesson-DIaSWFL0.js"), "./Pages/Lessons/Edit/Screen.vue": () => import("./assets/Screen-DHB0fXpk.js"), "./Pages/Lessons/EditLesson.vue": () => import("./assets/EditLesson-DSw3l3wo.js"), "./Pages/Lessons/Index/Screen.vue": () => import("./assets/Screen-CTLysX6N.js"), "./Pages/Lessons/IndexLesson.vue": () => import("./assets/IndexLesson-DKTokM2_.js"), "./Pages/Lessons/Show/Screen.vue": () => import("./assets/Screen-CclpGuFF.js"), "./Pages/Lessons/ShowLesson.vue": () => import("./assets/ShowLesson-Dt8eGtw5.js"), "./Pages/Lessons/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-DfZzYfmn.js"), "./Pages/Lessons/_layouts/SidebarLayoutLesson.vue": () => import("./assets/SidebarLayoutLesson-jj_1q1DG.js"), "./Pages/Media/Index.vue": () => import("./assets/Index-huDI-Jnl.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-BgQESGEk.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-Be_bBQG7.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-BQubgQVL.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-BdwUb7fq.js"), "./Pages/Projects/Customers/Create/Screen.vue": () => import("./assets/Screen-5FHnxqQb.js"), "./Pages/Projects/Customers/CreateCustomer.vue": () => import("./assets/CreateCustomer-C_qWD06n.js"), "./Pages/Projects/Customers/Edit/Screen.vue": () => import("./assets/Screen-hI5uRr7M.js"), "./Pages/Projects/Customers/EditCustomer.vue": () => import("./assets/EditCustomer-B3NIkDyS.js"), "./Pages/Projects/Customers/Index/Screen.vue": () => import("./assets/Screen-HqTvWdJS.js"), "./Pages/Projects/Customers/IndexCustomer.vue": () => import("./assets/IndexCustomer-Bfr1m2IG.js"), "./Pages/Projects/Customers/Show/Screen.vue": () => import("./assets/Screen-CKUyiJ5u.js"), "./Pages/Projects/Customers/ShowCustomer.vue": () => import("./assets/ShowCustomer-ciwDw4eM.js"), "./Pages/Projects/Index/Screen.vue": () => import("./assets/Screen-DZR-YK0d.js"), "./Pages/Projects/Project/Create/Screen.vue": () => import("./assets/Screen-DhiL3wst.js"), "./Pages/Projects/Project/CreateProject.vue": () => import("./assets/CreateProject-vNcKO-8i.js"), "./Pages/Projects/Project/Edit/Screen.vue": () => import("./assets/Screen-4f6ySIa6.js"), "./Pages/Projects/Project/EditProject.vue": () => import("./assets/EditProject-cbhybHdl.js"), "./Pages/Projects/Project/Index/Screen.vue": () => import("./assets/Screen-BH63YaNC.js"), "./Pages/Projects/Project/IndexProject.vue": () => import("./assets/IndexProject-D80_MW1R.js"), "./Pages/Projects/Project/Show/Screen.vue": () => import("./assets/Screen-Fp1RjbpB.js"), "./Pages/Projects/Project/ShowProject.vue": () => import("./assets/ShowProject-CEQqzf4q.js"), "./Pages/Projects/Services/Create/Screen.vue": () => import("./assets/Screen-D1jN7KYC.js"), "./Pages/Projects/Services/CreateService.vue": () => import("./assets/CreateService-TLlR-zkU.js"), "./Pages/Projects/Services/Edit/Screen.vue": () => import("./assets/Screen-DY3HAQWh.js"), "./Pages/Projects/Services/EditService.vue": () => import("./assets/EditService-CLqDfDIQ.js"), "./Pages/Projects/Services/Index/Screen.vue": () => import("./assets/Screen-D4Ajg8SU.js"), "./Pages/Projects/Services/Index/ServiceItem.vue": () => import("./assets/ServiceItem-B68mDLai.js"), "./Pages/Projects/Services/IndexService.vue": () => import("./assets/IndexService-CGczms4T.js"), "./Pages/Projects/Services/Show/Screen.vue": () => import("./assets/Screen-CkiAq9Qd.js"), "./Pages/Projects/Services/ShowService.vue": () => import("./assets/ShowService-UOZ51mz2.js"), "./Pages/Projects/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-LlIdInKJ.js"), "./Pages/Projects/_layouts/LayoutProjects.vue": () => import("./assets/LayoutProjects-DXAlsolR.js"), "./Pages/Projects/_layouts/SidebarLayoutProject.vue": () => import("./assets/SidebarLayoutProject-BcM3cXoB.js"), "./Pages/Rendition/LanguagePacks/Create/Screen.vue": () => import("./assets/Screen-8Qbhzv7K.js"), "./Pages/Rendition/LanguagePacks/CreateLanguagePacks.vue": () => import("./assets/CreateLanguagePacks-BRhkgGu3.js"), "./Pages/Rendition/LanguagePacks/Edit/Screen.vue": () => import("./assets/Screen-AzDno8VR.js"), "./Pages/Rendition/LanguagePacks/EditLanguagePacks.vue": () => import("./assets/EditLanguagePacks-IkmZGWkI.js"), "./Pages/Rendition/LanguagePacks/Index/PacksTable.vue": () => import("./assets/PacksTable-BTpeotDN.js"), "./Pages/Rendition/LanguagePacks/Index/Screen.vue": () => import("./assets/Screen-Ce6UTNC3.js"), "./Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue": () => import("./assets/IndexLanguagePacks-CADfKUw3.js"), "./Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue": () => import("./assets/ShowLanguagePacks-D6Vv5Cib.js"), "./Pages/Rendition/LanguagePacks/Words.vue": () => import("./assets/Words-BaxgF0A1.js"), "./Pages/Rendition/LanguagePacks/Words/Screen.vue": () => import("./assets/Screen-DwjQwEVF.js"), "./Pages/Rendition/Words/Create/Screen.vue": () => import("./assets/Screen-DZ1UnzuD.js"), "./Pages/Rendition/Words/CreateWord.vue": () => import("./assets/CreateWord-CGt-gR88.js"), "./Pages/Rendition/Words/Edit/Screen.vue": () => import("./assets/Screen-PBKzBWLh.js"), "./Pages/Rendition/Words/EditWord.vue": () => import("./assets/EditWord-BdgbQKG0.js"), "./Pages/Rendition/Words/Index/Screen.vue": () => import("./assets/Screen-0F9X1ttu.js"), "./Pages/Rendition/Words/Index/WordTable.vue": () => import("./assets/WordTable-5TYN-Est.js"), "./Pages/Rendition/Words/IndexWord.vue": () => import("./assets/IndexWord-vr9KnC-B.js"), "./Pages/Rendition/Words/Show/Screen.vue": () => import("./assets/Screen--L0y_0ol.js"), "./Pages/Rendition/Words/ShowWord.vue": () => import("./assets/ShowWord-qyhfcfsn.js"), "./Pages/Rendition/_components/MultipleChoice.vue": () => import("./assets/MultipleChoice-BJVRV-to.js"), "./Pages/Rendition/_components/TranslateWord.vue": () => import("./assets/TranslateWord-C_EqYf5d.js"), "./Pages/Rendition/_components/WordCompletion.vue": () => import("./assets/WordCompletion-CPGcKJBv.js"), "./Pages/Rendition/_components/WordsTable.vue": () => import("./assets/WordsTable-BqU-bMcA.js"), "./Pages/Rendition/_layouts/LayoutRendition.vue": () => import("./assets/LayoutRendition-B1FOpLRy.js"), "./Pages/Rendition/_layouts/SidebarPackGame.vue": () => import("./assets/SidebarPackGame-DwWxEN60.js"), "./Pages/Rendition/_layouts/SidebarRendition.vue": () => import("./assets/SidebarRendition-DNTtVGWL.js"), "./Pages/Seo/Create.vue": () => import("./assets/Create-DeMVpgsB.js"), "./Pages/Seo/Edit.vue": () => import("./assets/Edit-CsfYpaln.js"), "./Pages/Seo/Index.vue": () => import("./assets/Index-DcEDaAT4.js"), "./Pages/SocialMedia/Index.vue": () => import("./assets/Index-CJH8L_fZ.js"), "./Pages/SoftwareProducts/Create.vue": () => import("./assets/Create-avQ24DMD.js"), "./Pages/SoftwareProducts/Edit.vue": () => import("./assets/Edit-CldSJyvx.js"), "./Pages/SoftwareProducts/Index.vue": () => import("./assets/Index-Be4cyEyz.js"), "./Pages/SoftwareProducts/Show.vue": () => import("./assets/Show-7XdlwgLi.js"), "./Pages/SoftwareProducts/component/Box.vue": () => import("./assets/Box-D23LJ2w_.js"), "./Pages/SoftwareProducts/component/ConfirmModal.vue": () => import("./assets/ConfirmModal-8bTg5PxV.js"), "./Pages/SoftwareProducts/component/SPAddress.vue": () => import("./assets/SPAddress-C4B-URBw.js"), "./Pages/SoftwareProducts/component/SPPrice.vue": () => import("./assets/SPPrice-DDe_ZJN3.js"), "./Pages/SoftwareProducts/component/SPSpaces.vue": () => import("./assets/SPSpaces-C-9fwGUn.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-D6Jmvwhf.js"), "./Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue": () => import("./assets/CategoriesCreateFrom-kQrBvJAp.js"), "./Pages/WritesCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-Bm3r9KGn.js"), "./Pages/WritesCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-DUAblvz2.js"), "./Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue": () => import("./assets/CategoriesEditFrom-DKzwSiRi.js"), "./Pages/WritesCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-Cx_LmM4I.js"), "./Pages/WritesCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-Bw6ziyEH.js"), "./Pages/WritesCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-pBXsE-TD.js"), "./Pages/WritesCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-lyN-Ltl6.js"), "./Pages/WritesCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-BJP-FW_C.js"), "./Pages/WritesCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-C6N6bxQH.js"), "./Pages/WritesCategories/Categories/WriteByCategory.vue": () => import("./assets/WriteByCategory-kuB6Qnaq.js"), "./Pages/WritesCategories/Categories/WriteByCategory/Screen.vue": () => import("./assets/Screen-CmlBpHmQ.js"), "./Pages/WritesCategories/Writes/Create/FormField.vue": () => import("./assets/FormField-B5B8BMWT.js"), "./Pages/WritesCategories/Writes/Create/Screen.vue": () => import("./assets/Screen-DdeLh71H.js"), "./Pages/WritesCategories/Writes/Create/WriteCreateForm.vue": () => import("./assets/WriteCreateForm-DbyMOnrp.js"), "./Pages/WritesCategories/Writes/CreateWrite.vue": () => import("./assets/CreateWrite-lncqcI4r.js"), "./Pages/WritesCategories/Writes/Edit/Screen.vue": () => import("./assets/Screen-CuUnp7yM.js"), "./Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue": () => import("./assets/WriteUpdateForm-BtNI_-dQ.js"), "./Pages/WritesCategories/Writes/EditWrite.vue": () => import("./assets/EditWrite-9saVuTyd.js"), "./Pages/WritesCategories/Writes/Index/Screen.vue": () => import("./assets/Screen-DVPwIO-t.js"), "./Pages/WritesCategories/Writes/IndexWrite.vue": () => import("./assets/IndexWrite-7idNWNvC.js"), "./Pages/WritesCategories/Writes/Show/Screen.vue": () => import("./assets/Screen-DX0ztiUf.js"), "./Pages/WritesCategories/Writes/ShowWrite.vue": () => import("./assets/ShowWrite-Cg6RDc3h.js"), "./Pages/WritesCategories/_components/RichTextEditor.vue": () => import("./assets/RichTextEditor-DZBGhVV7.js"), "./Pages/WritesCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-CJ6HP-0T.js"), "./Pages/WritesCategories/_composables/WriteList.vue": () => import("./assets/WriteList-Cx8WJOoq.js"), "./Pages/WritesCategories/_layouts/LayoutWritesCategories.vue": () => import("./assets/LayoutWritesCategories-CPF3dvB-.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-Bdz45y_k.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue": () => import("./assets/SidebarLayoutWrite-BOhyuYe7.js") }))).default;
      page2.layout = page2.layout || _sfc_main;
      return page2;
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h$1(App, props) });
      app.use(plugin).use(k).use(store).component("font-awesome-icon", FontAwesomeIcon);
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
