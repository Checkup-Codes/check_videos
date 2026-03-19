import { defineComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import "@inertiajs/vue3";
import "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    tenant: {}
  },
  setup(__props) {
    const formatBytes = (bytes, precision = 2) => {
      const units = ["B", "KB", "MB", "GB", "TB"];
      let size = bytes;
      let unitIndex = 0;
      while (size > 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      return `${size.toFixed(precision)} ${units[unitIndex]}`;
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1e3);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><a href="/tenants" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"${_scopeId}> ← Geri </a><h1 class="text-3xl font-bold text-slate-900 dark:text-white"${_scopeId}> 📊 ${ssrInterpolate(__props.tenant.name)}</h1></div><div class="flex items-center gap-4"${_scopeId}><a${ssrRenderAttr("href", `https://${__props.tenant.domain}`)} target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline font-medium"${_scopeId}>${ssrInterpolate(__props.tenant.domain)} ↗ </a><span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"${_scopeId}>${ssrInterpolate(__props.tenant.type)}</span></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Database</h3><span class="text-3xl"${_scopeId}>💾</span></div><div class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>Boyut:</span><span class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tenant.database.size_formatted)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>Tablolar:</span><span class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tenant.database.tables)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>İsim:</span><span class="font-mono text-sm text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tenant.database.name)}</span></div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Storage</h3><span class="text-3xl"${_scopeId}>📁</span></div><div class="space-y-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>Boyut:</span><span class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tenant.storage.size_formatted)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>Dosyalar:</span><span class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tenant.storage.files)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-slate-600 dark:text-slate-400"${_scopeId}>Klasörler:</span><span class="font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(((_a = __props.tenant.storage.folders) == null ? void 0 : _a.length) || 0)}</span></div></div></div><div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Toplam Kullanım</h3><span class="text-3xl"${_scopeId}>📈</span></div><div class="space-y-2"${_scopeId}><div class="text-4xl font-bold"${_scopeId}>${ssrInterpolate(formatBytes(__props.tenant.database.size + __props.tenant.storage.size))}</div><div class="text-blue-100 text-sm"${_scopeId}> Database + Storage </div></div></div></div>`);
            if (__props.tenant.database.exists && __props.tenant.database.table_details) {
              _push2(`<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8"${_scopeId}><div class="p-6 border-b border-slate-200 dark:border-slate-700"${_scopeId}><h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"${_scopeId}><span${_scopeId}>💾</span> Database Tabloları </h2><p class="text-sm text-slate-600 dark:text-slate-400 mt-1"${_scopeId}> Toplam ${ssrInterpolate(__props.tenant.database.tables)} tablo </p></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Tablo Adı</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Satırlar</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Data</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Index</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Toplam</th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tenant.database.table_details, (table) => {
                _push2(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"${_scopeId}><td class="px-6 py-3 font-mono text-sm text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(table.name)}</td><td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(table.rows.toLocaleString())}</td><td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(formatBytes(table.data_size))}</td><td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(formatBytes(table.index_size))}</td><td class="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(table.total_size_formatted)}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.tenant.storage.exists && __props.tenant.storage.folders) {
              _push2(`<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8"${_scopeId}><div class="p-6 border-b border-slate-200 dark:border-slate-700"${_scopeId}><h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"${_scopeId}><span${_scopeId}>📁</span> Storage Klasörleri </h2><p class="text-sm text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(__props.tenant.storage.path)}</p></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Klasör</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Dosyalar</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Resimler</th><th class="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Boyut</th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tenant.storage.folders, (folder) => {
                _push2(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"${_scopeId}><td class="px-6 py-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-xl"${_scopeId}>📂</span><span class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(folder.name)}</span></div></td><td class="px-6 py-3 text-right text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(folder.files.toLocaleString())}</td><td class="px-6 py-3 text-right"${_scopeId}><span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-sm font-medium"${_scopeId}> 🖼️ ${ssrInterpolate(folder.images)}</span></td><td class="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(folder.size_formatted)}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.tenant.env.exists) {
              _push2(`<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"${_scopeId}><div class="p-6 border-b border-slate-200 dark:border-slate-700"${_scopeId}><h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"${_scopeId}><span${_scopeId}>⚙️</span> Environment Konfigürasyonu </h2><p class="text-sm text-slate-600 dark:text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(__props.tenant.env.path)} • ${ssrInterpolate(__props.tenant.env.size_formatted)} • Son değişiklik: ${ssrInterpolate(formatDate(__props.tenant.env.modified_at))}</p></div><div class="p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tenant.env.config, (value, key) => {
                _push2(`<div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg"${_scopeId}><div class="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1"${_scopeId}>${ssrInterpolate(key)}</div><div class="font-mono text-sm text-slate-900 dark:text-white break-all"${_scopeId}>${ssrInterpolate(value)}</div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                      createVNode("a", {
                        href: "/tenants",
                        class: "px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                      }, " ← Geri "),
                      createVNode("h1", { class: "text-3xl font-bold text-slate-900 dark:text-white" }, " 📊 " + toDisplayString(__props.tenant.name), 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("a", {
                        href: `https://${__props.tenant.domain}`,
                        target: "_blank",
                        class: "text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      }, toDisplayString(__props.tenant.domain) + " ↗ ", 9, ["href"]),
                      createVNode("span", { class: "px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium" }, toDisplayString(__props.tenant.type), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Database"),
                        createVNode("span", { class: "text-3xl" }, "💾")
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "Boyut:"),
                          createVNode("span", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(__props.tenant.database.size_formatted), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "Tablolar:"),
                          createVNode("span", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(__props.tenant.database.tables), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "İsim:"),
                          createVNode("span", { class: "font-mono text-sm text-slate-900 dark:text-white" }, toDisplayString(__props.tenant.database.name), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Storage"),
                        createVNode("span", { class: "text-3xl" }, "📁")
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "Boyut:"),
                          createVNode("span", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(__props.tenant.storage.size_formatted), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "Dosyalar:"),
                          createVNode("span", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(__props.tenant.storage.files), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-600 dark:text-slate-400" }, "Klasörler:"),
                          createVNode("span", { class: "font-bold text-slate-900 dark:text-white" }, toDisplayString(((_b = __props.tenant.storage.folders) == null ? void 0 : _b.length) || 0), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold" }, "Toplam Kullanım"),
                        createVNode("span", { class: "text-3xl" }, "📈")
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "text-4xl font-bold" }, toDisplayString(formatBytes(__props.tenant.database.size + __props.tenant.storage.size)), 1),
                        createVNode("div", { class: "text-blue-100 text-sm" }, " Database + Storage ")
                      ])
                    ])
                  ]),
                  __props.tenant.database.exists && __props.tenant.database.table_details ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8"
                  }, [
                    createVNode("div", { class: "p-6 border-b border-slate-200 dark:border-slate-700" }, [
                      createVNode("h2", { class: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" }, [
                        createVNode("span", null, "💾"),
                        createTextVNode(" Database Tabloları ")
                      ]),
                      createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, " Toplam " + toDisplayString(__props.tenant.database.tables) + " tablo ", 1)
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Tablo Adı"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Satırlar"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Data"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Index"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Toplam")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-slate-200 dark:divide-slate-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.tenant.database.table_details, (table) => {
                            return openBlock(), createBlock("tr", {
                              key: table.name,
                              class: "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            }, [
                              createVNode("td", { class: "px-6 py-3 font-mono text-sm text-slate-900 dark:text-white" }, toDisplayString(table.name), 1),
                              createVNode("td", { class: "px-6 py-3 text-right text-slate-600 dark:text-slate-400" }, toDisplayString(table.rows.toLocaleString()), 1),
                              createVNode("td", { class: "px-6 py-3 text-right text-slate-600 dark:text-slate-400" }, toDisplayString(formatBytes(table.data_size)), 1),
                              createVNode("td", { class: "px-6 py-3 text-right text-slate-600 dark:text-slate-400" }, toDisplayString(formatBytes(table.index_size)), 1),
                              createVNode("td", { class: "px-6 py-3 text-right font-semibold text-slate-900 dark:text-white" }, toDisplayString(table.total_size_formatted), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  __props.tenant.storage.exists && __props.tenant.storage.folders ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8"
                  }, [
                    createVNode("div", { class: "p-6 border-b border-slate-200 dark:border-slate-700" }, [
                      createVNode("h2", { class: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" }, [
                        createVNode("span", null, "📁"),
                        createTextVNode(" Storage Klasörleri ")
                      ]),
                      createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, toDisplayString(__props.tenant.storage.path), 1)
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Klasör"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Dosyalar"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Resimler"),
                            createVNode("th", { class: "px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "Boyut")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-slate-200 dark:divide-slate-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.tenant.storage.folders, (folder) => {
                            return openBlock(), createBlock("tr", {
                              key: folder.name,
                              class: "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            }, [
                              createVNode("td", { class: "px-6 py-3" }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("span", { class: "text-xl" }, "📂"),
                                  createVNode("span", { class: "font-medium text-slate-900 dark:text-white" }, toDisplayString(folder.name), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-3 text-right text-slate-600 dark:text-slate-400" }, toDisplayString(folder.files.toLocaleString()), 1),
                              createVNode("td", { class: "px-6 py-3 text-right" }, [
                                createVNode("span", { class: "px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-sm font-medium" }, " 🖼️ " + toDisplayString(folder.images), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-3 text-right font-semibold text-slate-900 dark:text-white" }, toDisplayString(folder.size_formatted), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  __props.tenant.env.exists ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                  }, [
                    createVNode("div", { class: "p-6 border-b border-slate-200 dark:border-slate-700" }, [
                      createVNode("h2", { class: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" }, [
                        createVNode("span", null, "⚙️"),
                        createTextVNode(" Environment Konfigürasyonu ")
                      ]),
                      createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, toDisplayString(__props.tenant.env.path) + " • " + toDisplayString(__props.tenant.env.size_formatted) + " • Son değişiklik: " + toDisplayString(formatDate(__props.tenant.env.modified_at)), 1)
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.tenant.env.config, (value, key) => {
                          return openBlock(), createBlock("div", {
                            key,
                            class: "p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
                          }, [
                            createVNode("div", { class: "text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1" }, toDisplayString(key), 1),
                            createVNode("div", { class: "font-mono text-sm text-slate-900 dark:text-white break-all" }, toDisplayString(value), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tenants/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
