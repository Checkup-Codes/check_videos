import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const truncateDescription = (description) => {
      if (!description) return "Açıklama bulunmamaktadır.";
      return description.length > 100 ? description.slice(0, 100) + "..." : description;
    };
    computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null,
        pack_id: params.get("pack_id") || null
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-base-100 rounded-lg p-6 shadow-lg" data-v-e758e19d${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-e758e19d${_scopeId}><div class="flex-1" data-v-e758e19d${_scopeId}><h1 class="text-2xl font-bold" data-v-e758e19d${_scopeId}>Dil Paketleri</h1></div><div class="flex gap-2" data-v-e758e19d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("rendition.language-packs.create"),
              class: "btn btn-sm btn-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Paket `);
                } else {
                  return [
                    createTextVNode(" Yeni Paket ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="divider my-2" data-v-e758e19d${_scopeId}></div><div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" data-v-e758e19d${_scopeId}><!--[-->`);
            ssrRenderList(__props.languagePacks, (pack) => {
              _push2(`<div class="card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl" data-v-e758e19d${_scopeId}><div class="card-body" data-v-e758e19d${_scopeId}><div class="flex items-center justify-between" data-v-e758e19d${_scopeId}><h2 class="card-title" data-v-e758e19d${_scopeId}>${ssrInterpolate(pack.name)}</h2><div class="badge badge-outline" data-v-e758e19d${_scopeId}>${ssrInterpolate(pack.language)}</div></div><p class="text-sm opacity-80" data-v-e758e19d${_scopeId}>${ssrInterpolate(truncateDescription(pack.description))}</p><div class="card-actions mt-3 justify-between" data-v-e758e19d${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.show", { word: pack.slug }),
                class: "btn btn-sm btn-outline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Kelimeleri Göster `);
                  } else {
                    return [
                      createTextVNode(" Kelimeleri Göster ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="badge badge-lg" data-v-e758e19d${_scopeId}>${ssrInterpolate(pack.word_count || 0)} kelime</div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (__props.languagePacks.length === 0) {
              _push2(`<div class="alert alert-info mt-6" data-v-e758e19d${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-e758e19d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e758e19d${_scopeId}></path></svg><span data-v-e758e19d${_scopeId}>Hiç dil paketi bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-base-100 rounded-lg p-6 shadow-lg" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "text-2xl font-bold" }, "Dil Paketleri")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("rendition.language-packs.create"),
                      class: "btn btn-sm btn-primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Yeni Paket ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "divider my-2" }),
                createVNode("div", { class: "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePacks, (pack) => {
                    return openBlock(), createBlock("div", {
                      key: pack.id,
                      class: "card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
                    }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h2", { class: "card-title" }, toDisplayString(pack.name), 1),
                          createVNode("div", { class: "badge badge-outline" }, toDisplayString(pack.language), 1)
                        ]),
                        createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateDescription(pack.description)), 1),
                        createVNode("div", { class: "card-actions mt-3 justify-between" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("rendition.words.show", { word: pack.slug }),
                            class: "btn btn-sm btn-outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kelimeleri Göster ")
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          createVNode("div", { class: "badge badge-lg" }, toDisplayString(pack.word_count || 0) + " kelime", 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                __props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "alert alert-info mt-6"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    class: "h-6 w-6 shrink-0 stroke-current"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])),
                  createVNode("span", null, "Hiç dil paketi bulunmamaktadır.")
                ])) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e758e19d"]]);
export {
  Screen as default
};
