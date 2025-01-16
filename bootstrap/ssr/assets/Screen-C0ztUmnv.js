import { ref, onMounted, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TopScreen-iJi3lh6W.js";
import { _ as _sfc_main$1 } from "./CheckScreen-BMk2_E2_.js";
import { _ as _sfc_main$3 } from "./Button-CWlX4hVa.js";
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
      return new Date(dateString).toLocaleDateString(void 0, options);
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: category.value.name
            }, null, _parent2, _scopeId));
            if (unref(auth).user) {
              _push2(`<div class="mx-5 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, { onClick: editCategory }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Kategoriyi düzenle `);
                  } else {
                    return [
                      createTextVNode(" Kategoriyi düzenle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll rounded-lg bg-white p-5"${_scopeId}>`);
            if (isGridView.value) {
              _push2(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(writes.value, (write) => {
                _push2(`<div class="rounded-lg border bg-gray-100 shadow transition hover:shadow-lg"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", write.cover_image || "https://via.placeholder.com/300x200")} alt="Kapak Resmi" class="h-48 w-full rounded-t-lg object-cover"${_scopeId2}><div class="p-4"${_scopeId2}><h3 class="mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600"${_scopeId2}>${ssrInterpolate(write.title)}</h3><p class="mb-3 text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(truncateSummary(write.meta_description))}</p><div class="flex justify-between text-sm text-gray-500"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(formatDate(write.published_at))}</span></div></div>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: write.cover_image || "https://via.placeholder.com/300x200",
                          alt: "Kapak Resmi",
                          class: "h-48 w-full rounded-t-lg object-cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "p-4" }, [
                          createVNode("h3", { class: "mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600" }, toDisplayString(write.title), 1),
                          createVNode("p", { class: "mb-3 text-sm text-gray-600" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                          createVNode("div", { class: "flex justify-between text-sm text-gray-500" }, [
                            createVNode("span", null, toDisplayString(formatDate(write.published_at)), 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(writes.value, (write) => {
                _push2(`<div class="flex items-center space-x-4 rounded-lg border bg-gray-50 p-4 shadow hover:shadow-md"${_scopeId}><div class="flex-1"${_scopeId}><h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(write.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(write.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><p class="mt-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(truncateSummary(write.meta_description))}</p><div class="mt-2 text-sm text-gray-500"${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(formatDate(write.published_at))}</span></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (writes.value.length === 0) {
              _push2(`<div class="mt-6 text-center text-gray-500"${_scopeId}> Bu kategoriye ait yazı bulunmamaktadır. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: category.value.name
              }, null, 8, ["title"]),
              unref(auth).user ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mx-5 text-right"
              }, [
                createVNode(_sfc_main$3, { onClick: editCategory }, {
                  default: withCtx(() => [
                    createTextVNode(" Kategoriyi düzenle ")
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll rounded-lg bg-white p-5" }, [
                isGridView.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                    return openBlock(), createBlock("div", {
                      key: write.id,
                      class: "rounded-lg border bg-gray-100 shadow transition hover:shadow-lg"
                    }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug })
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: write.cover_image || "https://via.placeholder.com/300x200",
                            alt: "Kapak Resmi",
                            class: "h-48 w-full rounded-t-lg object-cover"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h3", { class: "mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600" }, toDisplayString(write.title), 1),
                            createVNode("p", { class: "mb-3 text-sm text-gray-600" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                            createVNode("div", { class: "flex justify-between text-sm text-gray-500" }, [
                              createVNode("span", null, toDisplayString(formatDate(write.published_at)), 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(writes.value, (write) => {
                    return openBlock(), createBlock("div", {
                      key: write.id,
                      class: "flex items-center space-x-4 rounded-lg border bg-gray-50 p-4 shadow hover:shadow-md"
                    }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-800 hover:text-blue-600" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("categories.showByCategory", { category: category.value.slug, slug: write.slug })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(write.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]),
                        createVNode("p", { class: "mt-2 text-sm text-gray-600" }, toDisplayString(truncateSummary(write.meta_description)), 1),
                        createVNode("div", { class: "mt-2 text-sm text-gray-500" }, [
                          createVNode("span", { class: "" }, toDisplayString(formatDate(write.published_at)), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ])),
                writes.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-6 text-center text-gray-500"
                }, " Bu kategoriye ait yazı bulunmamaktadır. ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
