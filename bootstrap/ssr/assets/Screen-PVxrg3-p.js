import { ref, onMounted, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import "./Badge-BLykgubL.js";
import "./Button-DRijrITN.js";
import _sfc_main$2 from "./Card-qmctt-Ej.js";
import "./Form-DLTsfASe.js";
import "./ItemList-BMhf5pOx.js";
import "./RichTextEditor-Dw4E-YzI.js";
import "./TextField-C0ZHhnba.js";
import "./KeyboardShortcutDisabler-CZ9a0rUV.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const writes = ref(props.writes || []);
    const category = ref(props.category);
    const auth = props.auth;
    const isGridView = ref(false);
    const flashSuccess = ref(props.flash.success);
    const editCategory = () => {
      var _a;
      if ((_a = category.value) == null ? void 0 : _a.id) {
        const editUrl = `/categories/${category.value.id}/edit`;
        window.location.href = editUrl;
      } else {
        console.error("Kategori ID bulunamadı.");
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Tarih Yok";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("tr-TR", options);
    };
    const truncateSummary = (summary) => {
      if (!summary) return "Açıklama bulunmamaktadır.";
      return summary.length > 100 ? summary.slice(0, 100) + "..." : summary;
    };
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mb-4 flex items-center justify-between" data-v-13112299${_scopeId2}><div class="flex-1" data-v-13112299${_scopeId2}>`);
                  if (unref(auth).user) {
                    _push3(`<h1 class="text-base-contentx cursor-pointer text-2xl font-bold hover:opacity-80" data-v-13112299${_scopeId2}>${ssrInterpolate(category.value.name)} <span class="badge badge-outline ml-2" data-v-13112299${_scopeId2}>${ssrInterpolate(writes.value.length)} yazı</span></h1>`);
                  } else {
                    _push3(`<h1 class="text-2xl font-bold" data-v-13112299${_scopeId2}>${ssrInterpolate(category.value.name)} <span class="badge badge-outline ml-2" data-v-13112299${_scopeId2}>${ssrInterpolate(writes.value.length)} yazı</span></h1>`);
                  }
                  _push3(`</div></div><div class="divider my-2" data-v-13112299${_scopeId2}></div>`);
                  if (isGridView.value) {
                    _push3(`<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" data-v-13112299${_scopeId2}><!--[-->`);
                    ssrRenderList(writes.value, (write) => {
                      _push3(`<div class="card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl" data-v-13112299${_scopeId2}><figure data-v-13112299${_scopeId2}><img${ssrRenderAttr("src", write.cover_image || "https://via.placeholder.com/300x200")} alt="Kapak Resmi" class="h-48 w-full object-cover" data-v-13112299${_scopeId2}></figure><div class="card-body" data-v-13112299${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("categories.showByCategory", {
                          category: category.value.slug,
                          slug: write.slug
                        })
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<h2 class="card-title" data-v-13112299${_scopeId3}>${ssrInterpolate(write.title)}</h2><p class="text-sm opacity-80" data-v-13112299${_scopeId3}>${ssrInterpolate(truncateSummary(write.meta_description))}</p><div class="card-actions mt-3 justify-end" data-v-13112299${_scopeId3}><div class="badge badge-outline" data-v-13112299${_scopeId3}>${ssrInterpolate(formatDate(write.published_at))}</div></div>`);
                          } else {
                            return [
                              createVNode("h2", { class: "card-title" }, toDisplayString(write.title), 1),
                              createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                              createVNode("div", { class: "card-actions mt-3 justify-end" }, [
                                createVNode("div", { class: "badge badge-outline" }, toDisplayString(formatDate(write.published_at)), 1)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="space-y-4" data-v-13112299${_scopeId2}><!--[-->`);
                    ssrRenderList(writes.value, (write) => {
                      _push3(`<div class="card card-side bg-base-100 shadow-md transition-shadow hover:shadow-lg" data-v-13112299${_scopeId2}><div class="card-body" data-v-13112299${_scopeId2}><h2 class="card-title" data-v-13112299${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("categories.showByCategory", {
                          category: category.value.slug,
                          slug: write.slug
                        })
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(write.title)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(write.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</h2><p class="text-sm opacity-80" data-v-13112299${_scopeId2}>${ssrInterpolate(truncateSummary(write.meta_description))}</p><div class="card-actions justify-end" data-v-13112299${_scopeId2}><div class="badge badge-outline" data-v-13112299${_scopeId2}>${ssrInterpolate(formatDate(write.published_at))}</div></div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                  if (writes.value.length === 0) {
                    _push3(`<div class="alert alert-info mt-6" data-v-13112299${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-13112299${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-13112299${_scopeId2}></path></svg><span data-v-13112299${_scopeId2}>Bu kategoriye ait yazı bulunmamaktadır.</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                      createVNode("div", { class: "flex-1" }, [
                        unref(auth).user ? (openBlock(), createBlock("h1", {
                          key: 0,
                          onClick: editCategory,
                          class: "text-base-contentx cursor-pointer text-2xl font-bold hover:opacity-80"
                        }, [
                          createTextVNode(toDisplayString(category.value.name) + " ", 1),
                          createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(writes.value.length) + " yazı", 1)
                        ])) : (openBlock(), createBlock("h1", {
                          key: 1,
                          class: "text-2xl font-bold"
                        }, [
                          createTextVNode(toDisplayString(category.value.name) + " ", 1),
                          createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(writes.value.length) + " yazı", 1)
                        ]))
                      ])
                    ]),
                    createVNode("div", { class: "divider my-2" }),
                    isGridView.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                        return openBlock(), createBlock("div", {
                          key: write.id,
                          class: "card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
                        }, [
                          createVNode("figure", null, [
                            createVNode("img", {
                              src: write.cover_image || "https://via.placeholder.com/300x200",
                              alt: "Kapak Resmi",
                              class: "h-48 w-full object-cover"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "card-body" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("categories.showByCategory", {
                                category: category.value.slug,
                                slug: write.slug
                              })
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "card-title" }, toDisplayString(write.title), 1),
                                createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                                createVNode("div", { class: "card-actions mt-3 justify-end" }, [
                                  createVNode("div", { class: "badge badge-outline" }, toDisplayString(formatDate(write.published_at)), 1)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                        return openBlock(), createBlock("div", {
                          key: write.id,
                          class: "card card-side bg-base-100 shadow-md transition-shadow hover:shadow-lg"
                        }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("h2", { class: "card-title" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("categories.showByCategory", {
                                  category: category.value.slug,
                                  slug: write.slug
                                })
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(write.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                            createVNode("div", { class: "card-actions justify-end" }, [
                              createVNode("div", { class: "badge badge-outline" }, toDisplayString(formatDate(write.published_at)), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])),
                    writes.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 2,
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
                      createVNode("span", null, "Bu kategoriye ait yazı bulunmamaktadır.")
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex-1" }, [
                      unref(auth).user ? (openBlock(), createBlock("h1", {
                        key: 0,
                        onClick: editCategory,
                        class: "text-base-contentx cursor-pointer text-2xl font-bold hover:opacity-80"
                      }, [
                        createTextVNode(toDisplayString(category.value.name) + " ", 1),
                        createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(writes.value.length) + " yazı", 1)
                      ])) : (openBlock(), createBlock("h1", {
                        key: 1,
                        class: "text-2xl font-bold"
                      }, [
                        createTextVNode(toDisplayString(category.value.name) + " ", 1),
                        createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(writes.value.length) + " yazı", 1)
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "divider my-2" }),
                  isGridView.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                      return openBlock(), createBlock("div", {
                        key: write.id,
                        class: "card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
                      }, [
                        createVNode("figure", null, [
                          createVNode("img", {
                            src: write.cover_image || "https://via.placeholder.com/300x200",
                            alt: "Kapak Resmi",
                            class: "h-48 w-full object-cover"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "card-body" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("categories.showByCategory", {
                              category: category.value.slug,
                              slug: write.slug
                            })
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "card-title" }, toDisplayString(write.title), 1),
                              createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                              createVNode("div", { class: "card-actions mt-3 justify-end" }, [
                                createVNode("div", { class: "badge badge-outline" }, toDisplayString(formatDate(write.published_at)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                      return openBlock(), createBlock("div", {
                        key: write.id,
                        class: "card card-side bg-base-100 shadow-md transition-shadow hover:shadow-lg"
                      }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("h2", { class: "card-title" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("categories.showByCategory", {
                                category: category.value.slug,
                                slug: write.slug
                              })
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(write.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          createVNode("p", { class: "text-sm opacity-80" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                          createVNode("div", { class: "card-actions justify-end" }, [
                            createVNode("div", { class: "badge badge-outline" }, toDisplayString(formatDate(write.published_at)), 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])),
                  writes.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 2,
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
                    createVNode("span", null, "Bu kategoriye ait yazı bulunmamaktadır.")
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-13112299"]]);
export {
  Screen as default
};
