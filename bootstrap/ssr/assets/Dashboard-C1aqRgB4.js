import { defineComponent, computed, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import { Head, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    modules: {}
  },
  setup(__props) {
    const store = useStore();
    const selectedFont = computed(() => store.getters["Theme/getFont"]);
    const changeFont = (font) => {
      store.dispatch("Theme/changeFont", font);
    };
    const iconMap = {
      pencil: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      award: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      bookmark: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
      clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    };
    const moduleLabels = {
      writes: "Yazılar",
      journeys: "Yolculuk",
      certificates: "Sertifikalar",
      workspaces: "Çalışma Alanı",
      bookmarks: "Yer İmleri",
      tests: "Testler",
      words: "Kelimeler",
      services: "Servisler",
      versions: "Versiyonlar"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto max-w-7xl space-y-8 p-6"${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-semibold tracking-tight"${_scopeId}>Dashboard</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>İçeriklerinize hızlı erişim</p></div><div class="inline-flex items-center rounded-lg border bg-card p-1 shadow-sm"${_scopeId}><button class="${ssrRenderClass([
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              selectedFont.value === "inter" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            ])}"${_scopeId}> Inter </button><button class="${ssrRenderClass([
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              selectedFont.value === "geist" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            ])}"${_scopeId}> Geist </button></div></div><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.modules, (module, key) => {
              _push2(ssrRenderComponent(unref(Link), {
                key,
                href: _ctx.route(module.route),
                class: "group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-6"${_scopeId2}><div class="mb-4 flex items-start justify-between"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="text-sm font-medium text-muted-foreground"${_scopeId2}>${ssrInterpolate(moduleLabels[key])}</p><p class="text-3xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(module.count)}</p></div><div class="rounded-lg bg-primary/10 p-2.5"${_scopeId2}><svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", iconMap[module.icon])}${_scopeId2}></path></svg></div></div>`);
                    if (module.count > 0) {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(module.recent.slice(0, 2), (item, idx) => {
                        _push3(`<div class="rounded-md bg-muted/50 px-3 py-2"${_scopeId2}><p class="truncate text-xs font-medium text-foreground"${_scopeId2}>${ssrInterpolate(item.title || item.name || item.word || item.version || `${key.slice(0, -1)} ${idx + 1}`)}</p></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<div class="flex h-20 items-center justify-center rounded-md bg-muted/50"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Henüz içerik yok</p></div>`);
                    }
                    _push3(`<div class="mt-4 flex items-center text-xs font-medium text-primary"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(module.count > 0 ? "Tümünü gör" : "Yeni ekle")}</span><svg class="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-4 flex items-start justify-between" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, toDisplayString(moduleLabels[key]), 1),
                            createVNode("p", { class: "text-3xl font-bold tabular-nums" }, toDisplayString(module.count), 1)
                          ]),
                          createVNode("div", { class: "rounded-lg bg-primary/10 p-2.5" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-5 w-5 text-primary",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: iconMap[module.icon]
                              }, null, 8, ["d"])
                            ]))
                          ])
                        ]),
                        module.count > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(module.recent.slice(0, 2), (item, idx) => {
                            return openBlock(), createBlock("div", {
                              key: idx,
                              class: "rounded-md bg-muted/50 px-3 py-2"
                            }, [
                              createVNode("p", { class: "truncate text-xs font-medium text-foreground" }, toDisplayString(item.title || item.name || item.word || item.version || `${key.slice(0, -1)} ${idx + 1}`), 1)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex h-20 items-center justify-center rounded-md bg-muted/50"
                        }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Henüz içerik yok")
                        ])),
                        createVNode("div", { class: "mt-4 flex items-center text-xs font-medium text-primary" }, [
                          createVNode("span", null, toDisplayString(module.count > 0 ? "Tümünü gör" : "Yeni ekle"), 1),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 5l7 7-7 7"
                            })
                          ]))
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto max-w-7xl space-y-8 p-6" }, [
                createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-semibold tracking-tight" }, "Dashboard"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "İçeriklerinize hızlı erişim")
                  ]),
                  createVNode("div", { class: "inline-flex items-center rounded-lg border bg-card p-1 shadow-sm" }, [
                    createVNode("button", {
                      onClick: ($event) => changeFont("inter"),
                      class: [
                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                        selectedFont.value === "inter" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      ]
                    }, " Inter ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => changeFont("geist"),
                      class: [
                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                        selectedFont.value === "geist" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      ]
                    }, " Geist ", 10, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.modules, (module, key) => {
                    return openBlock(), createBlock(unref(Link), {
                      key,
                      href: _ctx.route(module.route),
                      class: "group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "mb-4 flex items-start justify-between" }, [
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, toDisplayString(moduleLabels[key]), 1),
                              createVNode("p", { class: "text-3xl font-bold tabular-nums" }, toDisplayString(module.count), 1)
                            ]),
                            createVNode("div", { class: "rounded-lg bg-primary/10 p-2.5" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-5 w-5 text-primary",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: iconMap[module.icon]
                                }, null, 8, ["d"])
                              ]))
                            ])
                          ]),
                          module.count > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(module.recent.slice(0, 2), (item, idx) => {
                              return openBlock(), createBlock("div", {
                                key: idx,
                                class: "rounded-md bg-muted/50 px-3 py-2"
                              }, [
                                createVNode("p", { class: "truncate text-xs font-medium text-foreground" }, toDisplayString(item.title || item.name || item.word || item.version || `${key.slice(0, -1)} ${idx + 1}`), 1)
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex h-20 items-center justify-center rounded-md bg-muted/50"
                          }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Henüz içerik yok")
                          ])),
                          createVNode("div", { class: "mt-4 flex items-center text-xs font-medium text-primary" }, [
                            createVNode("span", null, toDisplayString(module.count > 0 ? "Tümünü gör" : "Yeni ekle"), 1),
                            (openBlock(), createBlock("svg", {
                              class: "ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
