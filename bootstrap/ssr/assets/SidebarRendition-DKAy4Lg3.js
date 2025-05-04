import { ref, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-BZirZ79m.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { _ as _sfc_main$3 } from "./TopSubsidebar-7f19mFMx.js";
import { _ as _sfc_main$4 } from "./SubSidebarScreen-q45DpGfz.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "SidebarRendition",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props, url } = usePage();
    const languagePacks = props.languagePacks || [];
    props.auth;
    const isCollapsed = ref(true);
    const emit = __emit;
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("update:isCollapsed", isCollapsed.value);
    };
    const getLinkClasses = (href) => {
      return url === href ? "active" : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              isCollapsed: false,
              toggle: collapseSidebar
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "DİL PAKETLERİ",
              href: _ctx.route("rendition.language-packs.create")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full overflow-y-auto" data-v-2d57a932${_scopeId2}><div class="min-h-full" data-v-2d57a932${_scopeId2}><ul class="menu w-full rounded-box bg-base-100" data-v-2d57a932${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(languagePacks), (languagePack) => {
                    _push3(`<li class="mb-1" data-v-2d57a932${_scopeId2}><div class="flex w-full items-center" data-v-2d57a932${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                      class: [
                        getLinkClasses(`/rendition/words/${languagePack.slug}`),
                        "flex flex-grow items-center font-medium"
                      ]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-base" data-v-2d57a932${_scopeId3}>${ssrInterpolate(languagePack.name)}</span><span class="text-base-content/70 ml-2 text-xs uppercase" data-v-2d57a932${_scopeId3}>${ssrInterpolate(languagePack.language)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-base" }, toDisplayString(languagePack.name), 1),
                            createVNode("span", { class: "text-base-content/70 ml-2 text-xs uppercase" }, toDisplayString(languagePack.language), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="badge badge-outline badge-sm" data-v-2d57a932${_scopeId2}>${ssrInterpolate(languagePack.word_count || 0)}</div></div></li>`);
                  });
                  _push3(`<!--]--></ul></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full overflow-y-auto" }, [
                      createVNode("div", { class: "min-h-full" }, [
                        createVNode("ul", { class: "menu w-full rounded-box bg-base-100" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(languagePacks), (languagePack) => {
                            return openBlock(), createBlock("li", {
                              key: languagePack.id,
                              class: "mb-1"
                            }, [
                              createVNode("div", { class: "flex w-full items-center" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                                  class: [
                                    getLinkClasses(`/rendition/words/${languagePack.slug}`),
                                    "flex flex-grow items-center font-medium"
                                  ]
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-base" }, toDisplayString(languagePack.name), 1),
                                    createVNode("span", { class: "text-base-content/70 ml-2 text-xs uppercase" }, toDisplayString(languagePack.language), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"]),
                                createVNode("div", { class: "badge badge-outline badge-sm" }, toDisplayString(languagePack.word_count || 0), 1)
                              ])
                            ]);
                          }), 128))
                        ])
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
                isCollapsed: false,
                toggle: collapseSidebar
              }),
              createVNode(_sfc_main$3, {
                title: "DİL PAKETLERİ",
                href: _ctx.route("rendition.language-packs.create")
              }, null, 8, ["href"]),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-full overflow-y-auto" }, [
                    createVNode("div", { class: "min-h-full" }, [
                      createVNode("ul", { class: "menu w-full rounded-box bg-base-100" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(languagePacks), (languagePack) => {
                          return openBlock(), createBlock("li", {
                            key: languagePack.id,
                            class: "mb-1"
                          }, [
                            createVNode("div", { class: "flex w-full items-center" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("rendition.words.show", { word: languagePack.slug }),
                                class: [
                                  getLinkClasses(`/rendition/words/${languagePack.slug}`),
                                  "flex flex-grow items-center font-medium"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-base" }, toDisplayString(languagePack.name), 1),
                                  createVNode("span", { class: "text-base-content/70 ml-2 text-xs uppercase" }, toDisplayString(languagePack.language), 1)
                                ]),
                                _: 2
                              }, 1032, ["href", "class"]),
                              createVNode("div", { class: "badge badge-outline badge-sm" }, toDisplayString(languagePack.word_count || 0), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
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
const SidebarRendition = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d57a932"]]);
export {
  SidebarRendition as default
};
