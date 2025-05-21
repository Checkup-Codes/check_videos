import { ref, computed, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import "./GoBackButton-u55EQwn1.js";
import { _ as _sfc_main$1 } from "./CheckScreen-Djbvotax.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const category = ref(props.category || {});
    const writes = ref(props.writes || []);
    const auth = props.auth;
    const flashSuccess = ref((_a = props.flash) == null ? void 0 : _a.success);
    const filteredWrites = computed(() => {
      if (auth.user) {
        return writes.value;
      } else {
        return writes.value.filter((write) => write.status === "published");
      }
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    computed(() => {
      return category.value.status === "public" ? "Açık" : "Gizli";
    });
    const editCategory = () => {
      router.visit(route("categories.edit", { category: category.value.id }));
    };
    const truncateSummary = (summary) => {
      if (!summary) return "Açıklama bulunmamaktadır.";
      if (summary.includes("<") && summary.includes(">")) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = summary;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        return plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;
      }
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
            _push2(`<div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200" data-v-9fd9dd46${_scopeId}><div class="card-body p-4 sm:p-6" data-v-9fd9dd46${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-9fd9dd46${_scopeId}><div class="flex-1" data-v-9fd9dd46${_scopeId}>`);
            if (unref(auth).user) {
              _push2(`<h1 class="cursor-pointer text-xl font-bold hover:opacity-80 sm:text-2xl" data-v-9fd9dd46${_scopeId}>${ssrInterpolate(category.value.name)} <span class="badge badge-outline ml-2" data-v-9fd9dd46${_scopeId}>${ssrInterpolate(category.value.writes_count || writes.value.length)} yazı</span></h1>`);
            } else {
              _push2(`<h1 class="text-xl font-bold sm:text-2xl" data-v-9fd9dd46${_scopeId}>${ssrInterpolate(category.value.name)} <span class="badge badge-outline ml-2" data-v-9fd9dd46${_scopeId}>${ssrInterpolate(category.value.writes_count || writes.value.length)} yazı</span></h1>`);
            }
            _push2(`</div></div><div class="divider my-2" data-v-9fd9dd46${_scopeId}></div><div class="grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" data-v-9fd9dd46${_scopeId}><!--[-->`);
            ssrRenderList(filteredWrites.value, (write) => {
              _push2(`<div class="card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md" data-v-9fd9dd46${_scopeId}>`);
              if (write.cover_image) {
                _push2(`<figure data-v-9fd9dd46${_scopeId}><img${ssrRenderAttr("src", write.cover_image || "https://via.placeholder.com/300x200")} alt="Kapak Resmi" class="h-40 w-full object-cover" data-v-9fd9dd46${_scopeId}></figure>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="card-body p-4" data-v-9fd9dd46${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("categories.showByCategory", {
                  category: category.value.slug,
                  slug: write.slug
                }),
                class: "hover:text-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2" data-v-9fd9dd46${_scopeId2}>`);
                    if (write.status === "link_only") {
                      _push3(`<span class="text-primary" data-v-9fd9dd46${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-9fd9dd46${_scopeId2}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-9fd9dd46${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (write.status === "private") {
                      _push3(`<span class="text-primary" data-v-9fd9dd46${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-9fd9dd46${_scopeId2}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-9fd9dd46${_scopeId2}></path></svg></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<h2 class="card-title text-base sm:text-lg" data-v-9fd9dd46${_scopeId2}>${ssrInterpolate(write.title)}</h2></div><p class="mt-2 text-xs opacity-70 sm:text-sm" data-v-9fd9dd46${_scopeId2}>${ssrInterpolate(truncateSummary(write.meta_description))}</p><div class="card-actions mt-3 justify-end" data-v-9fd9dd46${_scopeId2}><div class="badge badge-outline badge-sm" data-v-9fd9dd46${_scopeId2}>${ssrInterpolate(formatDate(write.published_at))}</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        write.status === "link_only" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-primary"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        write.status === "private" ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-primary"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        createVNode("h2", { class: "card-title text-base sm:text-lg" }, toDisplayString(write.title), 1)
                      ]),
                      createVNode("p", { class: "mt-2 text-xs opacity-70 sm:text-sm" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                      createVNode("div", { class: "card-actions mt-3 justify-end" }, [
                        createVNode("div", { class: "badge badge-outline badge-sm" }, toDisplayString(formatDate(write.published_at)), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (writes.value.length === 0) {
              _push2(`<div class="alert alert-info mt-6" data-v-9fd9dd46${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-9fd9dd46${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-9fd9dd46${_scopeId}></path></svg><span data-v-9fd9dd46${_scopeId}>Bu kategoriye ait yazı bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "card border border-base-200 bg-base-100 shadow-md transition-all duration-200" }, [
                createVNode("div", { class: "card-body p-4 sm:p-6" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex-1" }, [
                      unref(auth).user ? (openBlock(), createBlock("h1", {
                        key: 0,
                        onClick: editCategory,
                        class: "cursor-pointer text-xl font-bold hover:opacity-80 sm:text-2xl"
                      }, [
                        createTextVNode(toDisplayString(category.value.name) + " ", 1),
                        createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(category.value.writes_count || writes.value.length) + " yazı", 1)
                      ])) : (openBlock(), createBlock("h1", {
                        key: 1,
                        class: "text-xl font-bold sm:text-2xl"
                      }, [
                        createTextVNode(toDisplayString(category.value.name) + " ", 1),
                        createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(category.value.writes_count || writes.value.length) + " yazı", 1)
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "divider my-2" }),
                  createVNode("div", { class: "grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredWrites.value, (write) => {
                      return openBlock(), createBlock("div", {
                        key: write.id,
                        class: "card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md"
                      }, [
                        write.cover_image ? (openBlock(), createBlock("figure", { key: 0 }, [
                          createVNode("img", {
                            src: write.cover_image || "https://via.placeholder.com/300x200",
                            alt: "Kapak Resmi",
                            class: "h-40 w-full object-cover"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "card-body p-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("categories.showByCategory", {
                              category: category.value.slug,
                              slug: write.slug
                            }),
                            class: "hover:text-primary"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                write.status === "link_only" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-primary"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-5 w-5",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                                      "clip-rule": "evenodd"
                                    })
                                  ]))
                                ])) : createCommentVNode("", true),
                                write.status === "private" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-primary"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-5 w-5",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                      "clip-rule": "evenodd"
                                    })
                                  ]))
                                ])) : createCommentVNode("", true),
                                createVNode("h2", { class: "card-title text-base sm:text-lg" }, toDisplayString(write.title), 1)
                              ]),
                              createVNode("p", { class: "mt-2 text-xs opacity-70 sm:text-sm" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                              createVNode("div", { class: "card-actions mt-3 justify-end" }, [
                                createVNode("div", { class: "badge badge-outline badge-sm" }, toDisplayString(formatDate(write.published_at)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ])
                      ]);
                    }), 128))
                  ]),
                  writes.value.length === 0 ? (openBlock(), createBlock("div", {
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
                    createVNode("span", null, "Bu kategoriye ait yazı bulunmamaktadır.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fd9dd46"]]);
export {
  Screen as default
};
