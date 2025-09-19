import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, ref, onMounted, watch, createTextVNode, provide, createSSRApp, h as h$1 } from "vue";
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
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "mr-2 h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Svg/GoBack.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const GoBackSvg = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$5 = {
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
        class: ["flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200", {
          "bg-base-content text-base-100": isActive.value,
          "text-base-content hover:bg-base-300": !isActive.value,
          "justify-center px-2": __props.isCompact
        }],
        title: __props.isCompact ? __props.label : ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ "mx-auto gap-0": __props.isCompact }, "flex items-center gap-3"])}"${_scopeId}><div class="flex h-5 w-5 items-center justify-center"${_scopeId}>`);
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
                class: "h-5 w-5 transition-colors duration-200"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div>`);
            if (!__props.isCompact) {
              _push2(`<span class="text-sm font-medium transition-colors duration-200"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: ["flex items-center gap-3", { "mx-auto gap-0": __props.isCompact }]
              }, [
                createVNode("div", { class: "flex h-5 w-5 items-center justify-center" }, [
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
                    class: "h-5 w-5 transition-colors duration-200"
                  }, null, 8, ["icon"]))
                ]),
                !__props.isCompact ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-sm font-medium transition-colors duration-200"
                }, toDisplayString(__props.label), 1)) : createCommentVNode("", true)
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/NavItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
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
        class: ["flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-base-100 hover:shadow-sm", {
          "justify-center px-2": __props.isCompact
        }],
        title: __props.isCompact ? __props.label : ""
      }, _attrs))}><div class="${ssrRenderClass([{ "mx-auto gap-0": __props.isCompact }, "flex items-center gap-3"])}">`);
      _push(ssrRenderComponent(unref(FontAwesomeIcon), {
        icon: __props.icon,
        class: "h-5 w-5 text-base-content"
      }, null, _parent));
      if (!__props.isCompact) {
        _push(`<span class="text-sm font-medium text-base-content">${ssrInterpolate(__props.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></a>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_components/SocialLink.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["space-y-1", { "text-center": __props.isCompact }]
      }, _attrs))}><!--[-->`);
      ssrRenderList(socialLinks.value, (link) => {
        _push(`<!--[-->`);
        if (link.is_active) {
          _push(ssrRenderComponent(_sfc_main$4, {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/_composable/SocialLinks.vue");
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
    var _a, _b, _c;
    ref("");
    const isMenuOpen = ref(false);
    const page = usePage();
    const store2 = useStore();
    const imagePath = ref("");
    const auth = ref(null);
    const appName = computed(() => usePage().props.app.name);
    const title = ref("");
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    const logoPath = ref((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.logo);
    const logoAlt = ref("Logo");
    const isLoading = ref(false);
    const handleImageError = () => {
      logoPath.value = "/images/default-logo.png";
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header class="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-base-200 bg-base-100 px-4 sm:px-5 lg:hidden" data-v-366a3bb0>`);
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
        _push(`<div class="w-8" data-v-366a3bb0></div>`);
      }
      _push(`<div class="px-3 py-1 font-bold uppercase text-primary" data-v-366a3bb0>`);
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
      _push(`</div><button class="btn btn-ghost btn-sm px-2" data-v-366a3bb0><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-366a3bb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-v-366a3bb0></path></svg></button></header>`);
      if (isMenuOpen.value) {
        _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "opacity-100" : "opacity-0", "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"])}" data-v-366a3bb0></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([isMenuOpen.value ? "translate-y-0" : "translate-y-full", "drawer-content drawer-end fixed inset-x-0 bottom-0 z-50 transform transition-all duration-300 ease-in-out"])}" data-v-366a3bb0><div class="max-h-[90vh] overflow-y-auto rounded-t-xl border border-base-200 bg-base-100 pb-6 pt-4 shadow-lg" data-v-366a3bb0><div class="mb-4 flex justify-center" data-v-366a3bb0><div class="h-1 w-10 rounded-full bg-base-300" data-v-366a3bb0></div></div><div class="px-4" data-v-366a3bb0>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 rounded-lg border border-base-300 bg-base-100 px-4 py-3 shadow-sm" data-v-366a3bb0${_scopeId}><div class="flex items-center space-x-3" data-v-366a3bb0${_scopeId}><div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-neutral" data-v-366a3bb0${_scopeId}>`);
            if (logoPath.value && !isLoading.value) {
              _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover" data-v-366a3bb0${_scopeId}>`);
            } else {
              _push2(`<span class="text-sm font-bold text-neutral-content" data-v-366a3bb0${_scopeId}>${ssrInterpolate(appName.value.charAt(0))}</span>`);
            }
            _push2(`</div><div data-v-366a3bb0${_scopeId}><h3 class="font-semibold text-base-content" data-v-366a3bb0${_scopeId}>${ssrInterpolate(appName.value)}</h3></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 rounded-lg border border-base-300 bg-base-100 px-4 py-3 shadow-sm" }, [
                createVNode("div", { class: "flex items-center space-x-3" }, [
                  createVNode("div", { class: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-neutral" }, [
                    logoPath.value && !isLoading.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: logoPath.value,
                      alt: logoAlt.value,
                      class: "h-full w-full object-cover",
                      onError: handleImageError
                    }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-sm font-bold text-neutral-content"
                    }, toDisplayString(appName.value.charAt(0)), 1))
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-semibold text-base-content" }, toDisplayString(appName.value), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!isLoggedIn.value) {
        _push(`<div class="mb-4" data-v-366a3bb0><a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank" data-v-366a3bb0><button class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200" data-v-366a3bb0><div class="flex items-center justify-center space-x-3" data-v-366a3bb0><span class="text-sm font-medium text-base-content" data-v-366a3bb0>Powered by : Notiriel</span></div></button></a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4 space-y-1" data-v-366a3bb0>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/",
        icon: "home",
        label: "Ana Sayfa"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/dashboard",
        icon: "chart-bar",
        label: "Panel"
      }, null, _parent));
      _push(`</div><div class="mb-4 space-y-1" data-v-366a3bb0>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/writes",
        icon: "fa-solid fa-pencil",
        label: "Yazılar"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/categories",
        icon: "fa-solid fa-book",
        label: "Kategoriler"
      }, null, _parent));
      _push(`</div>`);
      if (isLoggedIn.value) {
        _push(`<div class="mb-4 space-y-1" data-v-366a3bb0>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          href: "/rendition/words",
          icon: "fa-solid fa-globe",
          label: "Kelimeler"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<div class="mb-4 space-y-1" data-v-366a3bb0>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          href: "/versions",
          icon: "fa-solid fa-sync",
          label: "Versiyonlar"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isLoggedIn.value) {
        _push(`<div class="mb-4 space-y-1 border-t border-base-300 pt-4" data-v-366a3bb0>`);
        _push(ssrRenderComponent(_sfc_main$3, { "is-compact": false }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-6 flex flex-col items-center" data-v-366a3bb0><div class="mb-3" data-v-366a3bb0><button class="btn btn-ghost btn-sm" data-v-366a3bb0>`);
      if (isDarkMode.value) {
        _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-366a3bb0><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" data-v-366a3bb0></path></svg>`);
      } else {
        _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-366a3bb0><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" data-v-366a3bb0></path></svg>`);
      }
      _push(`</button><p class="text-base-content/40 mt-1 text-xs" data-v-366a3bb0>${ssrInterpolate(currentThemeName.value)}</p></div><p class="text-base-content/60 mt-2 text-xs" data-v-366a3bb0>Notiriel - Tüm Hakları Saklıdır</p></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/HeaderLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const HeaderLayout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-366a3bb0"]]);
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
    var _a, _b, _c;
    const page = usePage();
    const store2 = useStore();
    const currentTheme = computed(() => store2.getters["Theme/getCurrentTheme"]);
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const appName = computed(() => {
      var _a2, _b2;
      return ((_b2 = (_a2 = page.props) == null ? void 0 : _a2.app) == null ? void 0 : _b2.name) ?? "Check Videos";
    });
    computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = page.props) == null ? void 0 : _a2.screen) == null ? void 0 : _b2.seo) == null ? void 0 : _c2.title) ?? "Check Videos";
    });
    const logoPath = ref((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.logo);
    const logoAlt = ref("Logo");
    const isLoading = ref(false);
    const handleImageError = () => {
      logoPath.value = "/images/default-logo.png";
    };
    const isDarkMode = computed(() => {
      return currentTheme.value.includes("dark");
    });
    const currentThemeName = computed(() => {
      const theme = currentTheme.value;
      const themeMap = {
        light: "Light",
        dark: "Dark",
        "lotr-light": "LOTR Light",
        "lotr-dark": "LOTR Dark",
        custom: "Custom"
      };
      return themeMap[theme] || theme;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 px-4 font-sans", currentTheme.value]
      }, _attrs))}><div class="space-y-1">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-2 py-5"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="${ssrRenderClass([{ "w-full justify-center": __props.isCompact }, "flex items-center space-x-3"])}"${_scopeId}><div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-neutral"${_scopeId}>`);
            if (logoPath.value && !isLoading.value) {
              _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<span class="text-sm font-bold text-neutral-content"${_scopeId}>${ssrInterpolate(appName.value.charAt(0))}</span>`);
            }
            _push2(`</div>`);
            if (!__props.isCompact) {
              _push2(`<div${_scopeId}><h3 class="font-semibold text-base-content"${_scopeId}>${ssrInterpolate(appName.value)}</h3></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-2 py-5" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", {
                    class: ["flex items-center space-x-3", { "w-full justify-center": __props.isCompact }]
                  }, [
                    createVNode("div", { class: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-neutral" }, [
                      logoPath.value && !isLoading.value ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: logoPath.value,
                        alt: logoAlt.value,
                        class: "h-full w-full object-cover",
                        onError: handleImageError
                      }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-sm font-bold text-neutral-content"
                      }, toDisplayString(appName.value.charAt(0)), 1))
                    ]),
                    !__props.isCompact ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("h3", { class: "font-semibold text-base-content" }, toDisplayString(appName.value), 1)
                    ])) : createCommentVNode("", true)
                  ], 2)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass({ "text-center": __props.isCompact })}">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/",
        icon: "home",
        label: "Ana Sayfa",
        "is-compact": __props.isCompact
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/dashboard",
        icon: "chart-bar",
        label: "Panel",
        "is-compact": __props.isCompact
      }, null, _parent));
      _push(`</div><div class="${ssrRenderClass({ "text-center": __props.isCompact })}">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/writes",
        icon: "fa-solid fa-pencil",
        label: "Yazılar",
        "is-compact": __props.isCompact
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: "/categories",
        icon: "fa-solid fa-book",
        label: "Kategoriler",
        "is-compact": __props.isCompact
      }, null, _parent));
      _push(`</div>`);
      if (isLoggedIn.value) {
        _push(`<div class="${ssrRenderClass({ "text-center": __props.isCompact })}">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          href: "/rendition/words",
          icon: "fa-solid fa-globe",
          label: "Kelimeler",
          "is-compact": __props.isCompact
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<div class="${ssrRenderClass({ "text-center": __props.isCompact })}">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          href: "/versions",
          icon: "fa-solid fa-sync",
          label: "Versiyonlar",
          "is-compact": __props.isCompact
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<div class="${ssrRenderClass({ "text-center": __props.isCompact })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "text-center": __props.isCompact }, "space-y-1 border-t border-base-300 pt-4"])}">`);
      _push(ssrRenderComponent(_sfc_main$3, { "is-compact": __props.isCompact }, null, _parent));
      _push(`</div></div><div class="absolute inset-x-0 bottom-0 py-4 text-center"><div class="mb-3"><button class="btn btn-ghost btn-sm">`);
      if (isDarkMode.value) {
        _push(`<svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg>`);
      } else {
        _push(`<svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg>`);
      }
      _push(`</button>`);
      if (!__props.isCompact) {
        _push(`<p class="text-base-content/40 mt-1 text-xs">${ssrInterpolate(currentThemeName.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!isLoggedIn.value) {
        _push(`<div class="space-y-1 p-4"><a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank"><button class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200"><div class="${ssrRenderClass([{ "justify-center": __props.isCompact }, "flex items-center space-x-3"])}">`);
        if (!__props.isCompact) {
          _push(`<span class="mx-auto items-center text-sm font-medium text-base-content">Powered by : Notiriel</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></button></a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.isCompact) {
        _push(`<p class="text-base-content/60 mt-2 text-xs">Notiriel - Tüm Hakları Saklıdır</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout/SidebarLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
    const sidebarClass = computed(() => {
      const baseClass = "fixed inset-y-0 left-0 z-40 hidden overflow-hidden lg:block";
      const widthClass = isCompactMode.value ? "lg:w-24" : "lg:w-64";
      return `${baseClass} ${widthClass}`;
    });
    const contentWrapperClass = computed(() => {
      const baseClass = "";
      const paddingClass = isCompactMode.value ? "lg:pl-24" : "lg:pl-64";
      return `${baseClass} ${paddingClass}`;
    });
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
        class: sidebarClass.value,
        "is-compact": isCompactMode.value,
        onLinkClicked: toggleSidebar
      }, null, _parent));
      _push(`<div class="${ssrRenderClass(contentWrapperClass.value)}">`);
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
      const page2 = (await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-Diprr4J0.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-SBqO7rhx.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CWm06mam.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-B4pUEFUM.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-CcBdQgyd.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C7XCA-UH.js"), "./Pages/Bookmarks/CreateBookmarks.vue": () => import("./assets/CreateBookmarks-DVJTJcy3.js"), "./Pages/Bookmarks/EditBookmarks.vue": () => import("./assets/EditBookmarks-DZrKHk0d.js"), "./Pages/Bookmarks/IndexBookmarks.vue": () => import("./assets/IndexBookmarks-BH0g04d3.js"), "./Pages/Bookmarks/ShowBookmarks.vue": () => import("./assets/ShowBookmarks-B_Ty2lxF.js"), "./Pages/Bookmarks/SidebarLayoutBookmarks.vue": () => import("./assets/SidebarLayoutBookmarks-B16ebHBN.js"), "./Pages/Category/TypescriptTutorial.vue": () => import("./assets/TypescriptTutorial-BIFkOjAm.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-DcObxRRZ.js"), "./Pages/Equipments/Create/Screen.vue": () => import("./assets/Screen-D1PJcqvP.js"), "./Pages/Equipments/CreateEquipment.vue": () => import("./assets/CreateEquipment-CxmoL0yv.js"), "./Pages/Equipments/Edit/Screen.vue": () => import("./assets/Screen-Ca5kb9UJ.js"), "./Pages/Equipments/EditEquipment.vue": () => import("./assets/EditEquipment-D2FCZljd.js"), "./Pages/Equipments/Index/Screen.vue": () => import("./assets/Screen-Cuce7w9O.js"), "./Pages/Equipments/IndexEquipment.vue": () => import("./assets/IndexEquipment-BqyUdMbS.js"), "./Pages/Equipments/ShowEquipment.vue": () => import("./assets/ShowEquipment-Di6pVRrk.js"), "./Pages/Excalidraw.vue": () => import("./assets/Excalidraw-COkoWgJA.js"), "./Pages/FBVersions/Versions/Create/Screen.vue": () => import("./assets/Screen-B1aKMe3o.js"), "./Pages/FBVersions/Versions/CreateVersion.vue": () => import("./assets/CreateVersion-CypGIztQ.js"), "./Pages/FBVersions/Versions/Edit/Screen.vue": () => import("./assets/Screen-B7-Opera.js"), "./Pages/FBVersions/Versions/EditVersion.vue": () => import("./assets/EditVersion-DOZjXRPN.js"), "./Pages/FBVersions/Versions/Index/Screen.vue": () => import("./assets/Screen-DF-Z5rTm.js"), "./Pages/FBVersions/Versions/IndexVersion.vue": () => import("./assets/IndexVersion-A0RWc5qc.js"), "./Pages/FBVersions/Versions/Show/Screen.vue": () => import("./assets/Screen-p6Xr2R5v.js"), "./Pages/FBVersions/Versions/ShowVersion.vue": () => import("./assets/ShowVersion-B3X-W3Jf.js"), "./Pages/FBVersions/_components/VersionList.vue": () => import("./assets/VersionList-nzCJkvRK.js"), "./Pages/FBVersions/_layouts/LayoutFBVersions.vue": () => import("./assets/LayoutFBVersions-C9YQcVkT.js"), "./Pages/FBVersions/_layouts/SidebarLayoutVersion.vue": () => import("./assets/SidebarLayoutVersion-DXZV6XKO.js"), "./Pages/Index/Factory.vue": () => import("./assets/Factory-2ZHSsfDx.js"), "./Pages/Index/Index.vue": () => import("./assets/Index-BPBSSKKK.js"), "./Pages/Lessons/Create/Screen.vue": () => import("./assets/Screen-BHpRgc6f.js"), "./Pages/Lessons/CreateLesson.vue": () => import("./assets/CreateLesson-DznJMyr9.js"), "./Pages/Lessons/Edit/Screen.vue": () => import("./assets/Screen-C1fuSFiJ.js"), "./Pages/Lessons/EditLesson.vue": () => import("./assets/EditLesson-BvkF_0LS.js"), "./Pages/Lessons/Index/Screen.vue": () => import("./assets/Screen-A0T4iGRk.js"), "./Pages/Lessons/IndexLesson.vue": () => import("./assets/IndexLesson-CiC9hvQY.js"), "./Pages/Lessons/Show/Screen.vue": () => import("./assets/Screen-mCCOGiqB.js"), "./Pages/Lessons/ShowLesson.vue": () => import("./assets/ShowLesson-BkYbjaDK.js"), "./Pages/Lessons/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-DfZzYfmn.js"), "./Pages/Lessons/_layouts/SidebarLayoutLesson.vue": () => import("./assets/SidebarLayoutLesson-jj_1q1DG.js"), "./Pages/Media/Index.vue": () => import("./assets/Index-D7zwUoij.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-0kVD1Nk8.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-DVCHwD4r.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-DUxQgeJZ.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm--eQ_BEVm.js"), "./Pages/Projects/Customers/Create/Screen.vue": () => import("./assets/Screen-C-SZSGJW.js"), "./Pages/Projects/Customers/CreateCustomer.vue": () => import("./assets/CreateCustomer-g2IIVNbI.js"), "./Pages/Projects/Customers/Edit/Screen.vue": () => import("./assets/Screen-1rnCPCA3.js"), "./Pages/Projects/Customers/EditCustomer.vue": () => import("./assets/EditCustomer-DkN6YEzm.js"), "./Pages/Projects/Customers/Index/Screen.vue": () => import("./assets/Screen-lKIRc-Lq.js"), "./Pages/Projects/Customers/IndexCustomer.vue": () => import("./assets/IndexCustomer-DmCLcWGR.js"), "./Pages/Projects/Customers/Show/Screen.vue": () => import("./assets/Screen-CKUyiJ5u.js"), "./Pages/Projects/Customers/ShowCustomer.vue": () => import("./assets/ShowCustomer-Bj6G47SX.js"), "./Pages/Projects/Index/Screen.vue": () => import("./assets/Screen-B6t5PWcV.js"), "./Pages/Projects/Project/Create/Screen.vue": () => import("./assets/Screen-Dvuemb7K.js"), "./Pages/Projects/Project/CreateProject.vue": () => import("./assets/CreateProject-CikUDj7Y.js"), "./Pages/Projects/Project/Edit/Screen.vue": () => import("./assets/Screen-zybByy8c.js"), "./Pages/Projects/Project/EditProject.vue": () => import("./assets/EditProject-DSNi1xHJ.js"), "./Pages/Projects/Project/Index/Screen.vue": () => import("./assets/Screen-C5ierOhU.js"), "./Pages/Projects/Project/IndexProject.vue": () => import("./assets/IndexProject-B5iJ4J14.js"), "./Pages/Projects/Project/Show/Screen.vue": () => import("./assets/Screen-zh9Qj1HZ.js"), "./Pages/Projects/Project/ShowProject.vue": () => import("./assets/ShowProject-DLWRBjvw.js"), "./Pages/Projects/Services/Create/Screen.vue": () => import("./assets/Screen-CZpNBDDn.js"), "./Pages/Projects/Services/CreateService.vue": () => import("./assets/CreateService-DVVkBOHf.js"), "./Pages/Projects/Services/Edit/Screen.vue": () => import("./assets/Screen-zkayUJT1.js"), "./Pages/Projects/Services/EditService.vue": () => import("./assets/EditService-74OuDAQI.js"), "./Pages/Projects/Services/Index/Screen.vue": () => import("./assets/Screen-BT4SHy7Y.js"), "./Pages/Projects/Services/Index/ServiceItem.vue": () => import("./assets/ServiceItem-Ihxuygsp.js"), "./Pages/Projects/Services/IndexService.vue": () => import("./assets/IndexService-DoI91aqv.js"), "./Pages/Projects/Services/Show/Screen.vue": () => import("./assets/Screen-CkiAq9Qd.js"), "./Pages/Projects/Services/ShowService.vue": () => import("./assets/ShowService-CFa_KzHu.js"), "./Pages/Projects/_layouts/CheckLayout.vue": () => import("./assets/CheckLayout-LlIdInKJ.js"), "./Pages/Projects/_layouts/LayoutProjects.vue": () => import("./assets/LayoutProjects-C54SUwEv.js"), "./Pages/Projects/_layouts/SidebarLayoutProject.vue": () => import("./assets/SidebarLayoutProject-BcM3cXoB.js"), "./Pages/Rendition/LanguagePacks/Create/Screen.vue": () => import("./assets/Screen-D1VpNqa4.js"), "./Pages/Rendition/LanguagePacks/CreateLanguagePacks.vue": () => import("./assets/CreateLanguagePacks-BAgiGG5f.js"), "./Pages/Rendition/LanguagePacks/Edit/Screen.vue": () => import("./assets/Screen-DWy3GIJo.js"), "./Pages/Rendition/LanguagePacks/EditLanguagePacks.vue": () => import("./assets/EditLanguagePacks-CPHcoHaY.js"), "./Pages/Rendition/LanguagePacks/Index/PacksTable.vue": () => import("./assets/PacksTable-bEZMX89U.js"), "./Pages/Rendition/LanguagePacks/Index/Screen.vue": () => import("./assets/Screen-BE8gahWk.js"), "./Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue": () => import("./assets/IndexLanguagePacks-D8A-V6bI.js"), "./Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue": () => import("./assets/ShowLanguagePacks-D7zRo3XZ.js"), "./Pages/Rendition/LanguagePacks/Words.vue": () => import("./assets/Words-059BKp-B.js"), "./Pages/Rendition/LanguagePacks/Words/Screen.vue": () => import("./assets/Screen-DXzPtFXl.js"), "./Pages/Rendition/Words/Create/Screen.vue": () => import("./assets/Screen-CLKTaeXz.js"), "./Pages/Rendition/Words/CreateWord.vue": () => import("./assets/CreateWord-BqmkbIwS.js"), "./Pages/Rendition/Words/Edit/Screen.vue": () => import("./assets/Screen-BlUbMlMy.js"), "./Pages/Rendition/Words/EditWord.vue": () => import("./assets/EditWord-DuBlvZj9.js"), "./Pages/Rendition/Words/Index/Screen.vue": () => import("./assets/Screen-DnbsER8W.js"), "./Pages/Rendition/Words/IndexWord.vue": () => import("./assets/IndexWord-CGba-BcL.js"), "./Pages/Rendition/Words/Show/Screen.vue": () => import("./assets/Screen-Cw6u8Ga2.js"), "./Pages/Rendition/Words/ShowWord.vue": () => import("./assets/ShowWord-Uc5fpGuI.js"), "./Pages/Rendition/_components/MultipleChoice.vue": () => import("./assets/MultipleChoice-B9iPBUYP.js"), "./Pages/Rendition/_components/TranslateWord.vue": () => import("./assets/TranslateWord-BZUIwaCp.js"), "./Pages/Rendition/_components/WordCompletion.vue": () => import("./assets/WordCompletion-D6EQHJ8m.js"), "./Pages/Rendition/_components/WordsTable.vue": () => import("./assets/WordsTable-BqU-bMcA.js"), "./Pages/Rendition/_layouts/LayoutRendition.vue": () => import("./assets/LayoutRendition-BRzErygV.js"), "./Pages/Rendition/_layouts/SidebarPackGame.vue": () => import("./assets/SidebarPackGame-Dv4IIZA0.js"), "./Pages/Rendition/_layouts/SidebarRendition.vue": () => import("./assets/SidebarRendition-CXz13BDA.js"), "./Pages/Seo/Create.vue": () => import("./assets/Create-BRdXUaxN.js"), "./Pages/Seo/Edit.vue": () => import("./assets/Edit-DTfkQryQ.js"), "./Pages/Seo/Index.vue": () => import("./assets/Index-DYcxatp1.js"), "./Pages/SocialMedia/Index.vue": () => import("./assets/Index-CbGmwi4q.js"), "./Pages/SoftwareProducts/Create.vue": () => import("./assets/Create-B4Oi8qLw.js"), "./Pages/SoftwareProducts/Edit.vue": () => import("./assets/Edit-DJ-sG-Av.js"), "./Pages/SoftwareProducts/Index.vue": () => import("./assets/Index-CifLqXBt.js"), "./Pages/SoftwareProducts/Show.vue": () => import("./assets/Show-C4u6lUfx.js"), "./Pages/SoftwareProducts/component/Box.vue": () => import("./assets/Box-CvUfE-UW.js"), "./Pages/SoftwareProducts/component/ConfirmModal.vue": () => import("./assets/ConfirmModal-8bTg5PxV.js"), "./Pages/SoftwareProducts/component/SPAddress.vue": () => import("./assets/SPAddress-C4B-URBw.js"), "./Pages/SoftwareProducts/component/SPPrice.vue": () => import("./assets/SPPrice-DDe_ZJN3.js"), "./Pages/SoftwareProducts/component/SPSpaces.vue": () => import("./assets/SPSpaces-C-9fwGUn.js"), "./Pages/ThemeManagement.vue": () => import("./assets/ThemeManagement-D-YHl4nd.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-D6Jmvwhf.js"), "./Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue": () => import("./assets/CategoriesCreateFrom-kQrBvJAp.js"), "./Pages/WritesCategories/Categories/Create/Screen.vue": () => import("./assets/Screen-DqU9EWtn.js"), "./Pages/WritesCategories/Categories/CreateCategory.vue": () => import("./assets/CreateCategory-CCS4blEU.js"), "./Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue": () => import("./assets/CategoriesEditFrom-DKzwSiRi.js"), "./Pages/WritesCategories/Categories/Edit/Screen.vue": () => import("./assets/Screen-CnkxkABc.js"), "./Pages/WritesCategories/Categories/EditCategory.vue": () => import("./assets/EditCategory-CHwaS-F0.js"), "./Pages/WritesCategories/Categories/Index/Screen.vue": () => import("./assets/Screen-BuKk7A2L.js"), "./Pages/WritesCategories/Categories/IndexCategory.vue": () => import("./assets/IndexCategory-D8jQ8ZCg.js"), "./Pages/WritesCategories/Categories/Show/Screen.vue": () => import("./assets/Screen-B2GrieGw.js"), "./Pages/WritesCategories/Categories/ShowCategory.vue": () => import("./assets/ShowCategory-rmbKvgSK.js"), "./Pages/WritesCategories/Categories/WriteByCategory.vue": () => import("./assets/WriteByCategory-CU7JmYq0.js"), "./Pages/WritesCategories/Categories/WriteByCategory/Screen.vue": () => import("./assets/Screen-DacBQccN.js"), "./Pages/WritesCategories/Writes/Create/FormField.vue": () => import("./assets/FormField-B5B8BMWT.js"), "./Pages/WritesCategories/Writes/Create/Screen.vue": () => import("./assets/Screen-iVhxR6Ca.js"), "./Pages/WritesCategories/Writes/Create/WriteCreateForm.vue": () => import("./assets/WriteCreateForm-BZ2VoCCz.js"), "./Pages/WritesCategories/Writes/CreateWrite.vue": () => import("./assets/CreateWrite-C6BpF4zP.js"), "./Pages/WritesCategories/Writes/Edit/Screen.vue": () => import("./assets/Screen-dPy19pcZ.js"), "./Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue": () => import("./assets/WriteUpdateForm-Cpua6oKE.js"), "./Pages/WritesCategories/Writes/EditWrite.vue": () => import("./assets/EditWrite-DHxwKL7i.js"), "./Pages/WritesCategories/Writes/Index/Screen.vue": () => import("./assets/Screen-DUfwpacl.js"), "./Pages/WritesCategories/Writes/IndexWrite.vue": () => import("./assets/IndexWrite-BAfzf8d0.js"), "./Pages/WritesCategories/Writes/Show/Screen.vue": () => import("./assets/Screen-dvrVPQPw.js"), "./Pages/WritesCategories/Writes/ShowWrite.vue": () => import("./assets/ShowWrite-4hvAfBCk.js"), "./Pages/WritesCategories/_components/RichTextEditor.vue": () => import("./assets/RichTextEditor-OP0dOd6Z.js"), "./Pages/WritesCategories/_composables/CategoryTree.vue": () => import("./assets/CategoryTree-Bt1TVaOS.js"), "./Pages/WritesCategories/_composables/WriteList.vue": () => import("./assets/WriteList-CC4IW1P8.js"), "./Pages/WritesCategories/_layouts/LayoutWritesCategories.vue": () => import("./assets/LayoutWritesCategories-BZIx0N8k.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue": () => import("./assets/SidebarLayoutCategory-txDEUcg-.js"), "./Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue": () => import("./assets/SidebarLayoutWrite-Di0mqd82.js") }))).default;
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
