import { ref, onMounted, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$2 } from "./GoBackButton-CwBeSdRG.js";
import { _ as _sfc_main$4 } from "./ExcalidrawComponent-DGcJLj0k.js";
import { _ as _sfc_main$3 } from "./CButton-Bo0n3h7o.js";
import { _ as _sfc_main$1 } from "./CScreen-Cx3_QK48.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const categories = ref(props.categories);
    const auth = props.auth;
    const showMerhaba = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showMerhaba.value = true;
      } else {
        showMerhaba.value = props.showMerhaba || false;
      }
    });
    const deleteWrite = (id) => {
      if (confirm("Are you sure you want to delete this write?")) {
        Inertia.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block px-3 lg:hidden"${_scopeId}><div class="flex justify-between px-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/writes" }, null, _parent2, _scopeId));
            if (write.value.hasDraw) {
              _push2(`<div class=""${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$3, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="rounded-lg bg-white p-4 shadow-sm sm:px-10 lg:grid lg:grid-cols-12 lg:px-10 lg:pt-5"${_scopeId}><div class="my-auto w-auto lg:col-span-9"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(write.value.title)}</h1><div class="mt-2 hidden text-sm text-gray-500 lg:block"${_scopeId}><span class="font-medium"${_scopeId}>Kategori:</span> ${ssrInterpolate(getCategoryName(write.value.category_id))}</div></div><div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex"${_scopeId}>`);
            if (write.value.hasDraw) {
              _push2(`<div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$3, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showMerhaba.value) {
              _push2(`<div class="rounded-lg bg-white shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, { write: write.value }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="mt-3 rounded-lg bg-white p-4 shadow-sm lg:pb-10"${_scopeId}><div class="prose prose-lg ql-container-custom mb-8 lg:pl-1"${_scopeId}>${write.value.content ?? ""}</div><div class="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"${_scopeId}><h2 class="mb-4 text-2xl font-semibold text-gray-800"${_scopeId}>Özet</h2><p class="leading-relaxed text-gray-700"${_scopeId}>${ssrInterpolate(write.value.summary)}</p></div>`);
              if (unref(auth).user) {
                _push2(`<div class="mt-5 flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/writes/${write.value.id}/edit`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_sfc_main$3, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Yazıyı Düzenle `);
                          } else {
                            return [
                              createTextVNode(" Yazıyı Düzenle ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_sfc_main$3, null, {
                          default: withCtx(() => [
                            createTextVNode(" Yazıyı Düzenle ")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$3, {
                  onClick: ($event) => deleteWrite(write.value.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Yazıyı Sil `);
                    } else {
                      return [
                        createTextVNode(" Yazıyı Sil ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode("div", { class: "block px-3 lg:hidden" }, [
                createVNode("div", { class: "flex justify-between px-3" }, [
                  createVNode(_sfc_main$2, { url: "/writes" }),
                  write.value.hasDraw ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ""
                  }, [
                    createVNode(unref(Link), {
                      href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", { class: "rounded-lg bg-white p-4 shadow-sm sm:px-10 lg:grid lg:grid-cols-12 lg:px-10 lg:pt-5" }, [
                createVNode("div", { class: "my-auto w-auto lg:col-span-9" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, toDisplayString(write.value.title), 1),
                  createVNode("div", { class: "mt-2 hidden text-sm text-gray-500 lg:block" }, [
                    createVNode("span", { class: "font-medium" }, "Kategori:"),
                    createTextVNode(" " + toDisplayString(getCategoryName(write.value.category_id)), 1)
                  ])
                ]),
                createVNode("div", { class: "hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex" }, [
                  write.value.hasDraw ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center"
                  }, [
                    createVNode(unref(Link), {
                      href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showMerhaba.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-lg bg-white shadow-sm"
              }, [
                createVNode(_sfc_main$4, { write: write.value }, null, 8, ["write"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "mt-3 rounded-lg bg-white p-4 shadow-sm lg:pb-10"
              }, [
                createVNode("div", {
                  class: "prose prose-lg ql-container-custom mb-8 lg:pl-1",
                  innerHTML: write.value.content
                }, null, 8, ["innerHTML"]),
                createVNode("div", { class: "mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm" }, [
                  createVNode("h2", { class: "mb-4 text-2xl font-semibold text-gray-800" }, "Özet"),
                  createVNode("p", { class: "leading-relaxed text-gray-700" }, toDisplayString(write.value.summary), 1)
                ]),
                unref(auth).user ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-5 flex justify-end"
                }, [
                  createVNode(unref(Link), {
                    href: `/writes/${write.value.id}/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createTextVNode(" Yazıyı Düzenle ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$3, {
                    onClick: ($event) => deleteWrite(write.value.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Yazıyı Sil ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
