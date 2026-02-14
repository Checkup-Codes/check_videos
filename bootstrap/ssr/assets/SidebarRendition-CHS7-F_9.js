import { computed, inject, ref, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./SubSidebarScreen-DNe7gM-E.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarRendition"
}, {
  __name: "SidebarRendition",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const injectedLanguagePacks = inject("languagePacks", []);
    const languagePacks = computed(() => {
      if (page.props.languagePacks && Array.isArray(page.props.languagePacks) && page.props.languagePacks.length > 0) {
        const packs2 = page.props.languagePacks;
        return packs2.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
      }
      const packsValue = (injectedLanguagePacks == null ? void 0 : injectedLanguagePacks.value) ?? injectedLanguagePacks;
      const packs = Array.isArray(packsValue) ? packsValue : [];
      return packs.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
    });
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const scrollableRef = ref(null);
    const getLinkClasses = (href) => {
      const url = page.url;
      return url === href || url.startsWith(href + "/");
    };
    let scrollHandler = null;
    const getScrollElement = () => {
      var _a, _b, _c;
      if ((_b = (_a = scrollableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.value) {
        return scrollableRef.value.$el.value;
      }
      if ((_c = scrollableRef.value) == null ? void 0 : _c.$el) {
        return scrollableRef.value.$el;
      }
      return scrollableRef.value;
    };
    const saveScrollPosition = () => {
      const scrollElement = getScrollElement();
      if (scrollElement) {
        const scrollTop = scrollElement.scrollTop || 0;
        store.dispatch("Rendition/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["Rendition/scrollPosition"];
          if (savedPosition > 0) {
            scrollElement.scrollTop = savedPosition;
          }
        }
      });
    };
    const setupScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && !scrollHandler) {
        scrollHandler = () => saveScrollPosition();
        scrollElement.addEventListener("scroll", scrollHandler, { passive: true });
      }
    };
    const removeScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && scrollHandler) {
        scrollElement.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onActivated(() => {
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onDeactivated(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    onBeforeUnmount(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        isNarrow: isNarrow.value,
        class: currentTheme.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-3" data-v-ca77a2a9${_scopeId}><div class="flex items-center justify-between gap-2" data-v-ca77a2a9${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-ca77a2a9${_scopeId}>Kelime Paketleri</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-1 p-2" data-v-ca77a2a9${_scopeId2}><!--[-->`);
                  ssrRenderList(languagePacks.value, (languagePack) => {
                    _push3(ssrRenderComponent(unref(Link), {
                      key: languagePack.id,
                      href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                      class: [
                        "block rounded-lg p-3 transition-all duration-200",
                        getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                      ]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex w-full items-center justify-between" data-v-ca77a2a9${_scopeId3}><div class="flex-1" data-v-ca77a2a9${_scopeId3}><h4 class="${ssrRenderClass([
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground",
                            "text-[11px] font-medium leading-tight"
                          ])}" data-v-ca77a2a9${_scopeId3}>${ssrInterpolate(languagePack.name)}</h4><div class="${ssrRenderClass([
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground",
                            "text-[10px] uppercase"
                          ])}" data-v-ca77a2a9${_scopeId3}>${ssrInterpolate(languagePack.language)}</div></div><div class="${ssrRenderClass([
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground" : "border-border bg-secondary text-secondary-foreground",
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
                          ])}" data-v-ca77a2a9${_scopeId3}>${ssrInterpolate(languagePack.word_count || 0)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("h4", {
                                  class: [
                                    "text-[11px] font-medium leading-tight",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                  ]
                                }, toDisplayString(languagePack.name), 3),
                                createVNode("div", {
                                  class: [
                                    "text-[10px] uppercase",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                  ]
                                }, toDisplayString(languagePack.language), 3)
                              ]),
                              createVNode("div", {
                                class: [
                                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground" : "border-border bg-secondary text-secondary-foreground"
                                ]
                              }, toDisplayString(languagePack.word_count || 0), 3)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-1 p-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(languagePacks.value, (languagePack) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: languagePack.id,
                          href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                          class: [
                            "block rounded-lg p-3 transition-all duration-200",
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex w-full items-center justify-between" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("h4", {
                                  class: [
                                    "text-[11px] font-medium leading-tight",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                  ]
                                }, toDisplayString(languagePack.name), 3),
                                createVNode("div", {
                                  class: [
                                    "text-[10px] uppercase",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                  ]
                                }, toDisplayString(languagePack.language), 3)
                              ]),
                              createVNode("div", {
                                class: [
                                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground" : "border-border bg-secondary text-secondary-foreground"
                                ]
                              }, toDisplayString(languagePack.word_count || 0), 3)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-3" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-muted-foreground" }, "Kelime Paketleri")
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-1 p-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(languagePacks.value, (languagePack) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: languagePack.id,
                        href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                        class: [
                          "block rounded-lg p-3 transition-all duration-200",
                          getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"
                        ]
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex w-full items-center justify-between" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("h4", {
                                class: [
                                  "text-[11px] font-medium leading-tight",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                ]
                              }, toDisplayString(languagePack.name), 3),
                              createVNode("div", {
                                class: [
                                  "text-[10px] uppercase",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                ]
                              }, toDisplayString(languagePack.language), 3)
                            ]),
                            createVNode("div", {
                              class: [
                                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                                getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground" : "border-border bg-secondary text-secondary-foreground"
                              ]
                            }, toDisplayString(languagePack.word_count || 0), 3)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href", "class"]);
                    }), 128))
                  ])
                ]),
                _: 1
              }, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/SidebarRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarRendition = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca77a2a9"]]);
export {
  SidebarRendition as default
};
