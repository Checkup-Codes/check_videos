import { computed, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DNDkVWuC.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-BaVEfKio.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "SidebarRendition",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const languagePacks = computed(() => {
      const packs = props.languagePacks || [];
      return packs.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
    });
    const isNarrow = ref(false);
    const scrollableRef = ref(null);
    const getLinkClasses = (href) => {
      return url === href ? "active" : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        isNarrow: isNarrow.value,
        class: currentTheme.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full overflow-y-auto" data-v-6c1f5380${_scopeId2}><div class="min-h-full space-y-1 p-3" data-v-6c1f5380${_scopeId2}><!--[-->`);
                  ssrRenderList(languagePacks.value, (languagePack) => {
                    _push3(`<div class="${ssrRenderClass([
                      getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted",
                      "rounded-lg bg-background p-3 transition-all duration-200"
                    ])}" data-v-6c1f5380${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                      class: "flex w-full items-center justify-between"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex-1" data-v-6c1f5380${_scopeId3}><div class="${ssrRenderClass([
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground",
                            "text-sm font-medium leading-tight"
                          ])}" data-v-6c1f5380${_scopeId3}>${ssrInterpolate(languagePack.name)}</div><div class="${ssrRenderClass([
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground",
                            "text-xs uppercase"
                          ])}" data-v-6c1f5380${_scopeId3}>${ssrInterpolate(languagePack.language)}</div></div><div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" data-v-6c1f5380${_scopeId3}>${ssrInterpolate(languagePack.word_count || 0)}</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", {
                                class: [
                                  "text-sm font-medium leading-tight",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                ]
                              }, toDisplayString(languagePack.name), 3),
                              createVNode("div", {
                                class: [
                                  "text-xs uppercase",
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                ]
                              }, toDisplayString(languagePack.language), 3)
                            ]),
                            createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(languagePack.word_count || 0), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full overflow-y-auto" }, [
                      createVNode("div", { class: "min-h-full space-y-1 p-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(languagePacks.value, (languagePack) => {
                          return openBlock(), createBlock("div", {
                            key: languagePack.id,
                            class: [
                              "rounded-lg bg-background p-3 transition-all duration-200",
                              getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                            ]
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                              class: "flex w-full items-center justify-between"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", {
                                    class: [
                                      "text-sm font-medium leading-tight",
                                      getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                    ]
                                  }, toDisplayString(languagePack.name), 3),
                                  createVNode("div", {
                                    class: [
                                      "text-xs uppercase",
                                      getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                    ]
                                  }, toDisplayString(languagePack.language), 3)
                                ]),
                                createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(languagePack.word_count || 0), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ], 2);
                        }), 128))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-full overflow-y-auto" }, [
                    createVNode("div", { class: "min-h-full space-y-1 p-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(languagePacks.value, (languagePack) => {
                        return openBlock(), createBlock("div", {
                          key: languagePack.id,
                          class: [
                            "rounded-lg bg-background p-3 transition-all duration-200",
                            getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                          ]
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                            class: "flex w-full items-center justify-between"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("div", {
                                  class: [
                                    "text-sm font-medium leading-tight",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground" : "text-foreground"
                                  ]
                                }, toDisplayString(languagePack.name), 3),
                                createVNode("div", {
                                  class: [
                                    "text-xs uppercase",
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? "text-primary-foreground/70" : "text-muted-foreground"
                                  ]
                                }, toDisplayString(languagePack.language), 3)
                              ]),
                              createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(languagePack.word_count || 0), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ], 2);
                      }), 128))
                    ])
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/SidebarRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarRendition = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c1f5380"]]);
export {
  SidebarRendition as default
};
