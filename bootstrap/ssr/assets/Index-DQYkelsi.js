import { onMounted, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import "vuex";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    seoData: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      console.log("SEO Data:", props.seoData);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><div class="mb-6"${_scopeId}><div class="mt-2 text-sm text-gray-500"${_scopeId}>Toplam Kayıt: ${ssrInterpolate(__props.seoData.length)}</div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"${_scopeId}> Route </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"${_scopeId}> Başlık </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"${_scopeId}> Açıklama </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"${_scopeId}> İşlemler </th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.seoData, (seo) => {
              _push2(`<tr${_scopeId}><td class="whitespace-nowrap px-6 py-4"${_scopeId}>${ssrInterpolate(seo.route)}</td><td class="whitespace-nowrap px-6 py-4"${_scopeId}>${ssrInterpolate(seo.title)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(seo.description)}</td><td class="whitespace-nowrap px-6 py-4"${_scopeId}><div class="flex space-x-3"${_scopeId}>`);
              if (seo.route === "home") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("seo.edit", seo.id),
                  class: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Düzenle `);
                    } else {
                      return [
                        createTextVNode(" Düzenle ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("div", { class: "mt-2 text-sm text-gray-500" }, "Toplam Kayıt: " + toDisplayString(__props.seoData.length), 1)
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300" }, " Route "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300" }, " Başlık "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300" }, " Açıklama "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300" }, " İşlemler ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.seoData, (seo) => {
                              return openBlock(), createBlock("tr", {
                                key: seo.id
                              }, [
                                createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, toDisplayString(seo.route), 1),
                                createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, toDisplayString(seo.title), 1),
                                createVNode("td", { class: "px-6 py-4" }, toDisplayString(seo.description), 1),
                                createVNode("td", { class: "whitespace-nowrap px-6 py-4" }, [
                                  createVNode("div", { class: "flex space-x-3" }, [
                                    seo.route === "home" ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: _ctx.route("seo.edit", seo.id),
                                      class: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Düzenle ")
                                      ]),
                                      _: 1
                                    }, 8, ["href"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seo/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
