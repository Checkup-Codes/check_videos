import { inject, ref, computed, onMounted, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CategoryTree"
}, {
  __name: "CategoryTree",
  __ssrInlineRender: true,
  props: {
    isCollapsed: { type: Boolean, default: false }
  },
  emits: ["update:expandAll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const categories = inject("categories", []);
    const isAdmin = inject("isAdmin", false);
    const searchQuery = ref("");
    const adminFilter = ref("all");
    function filterCategories(categories2, search, status) {
      return categories2.map((cat) => {
        const filteredChildren = filterCategories(cat.children || [], search, status);
        const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
        let matchesStatus = true;
        if (isAdmin && status !== "all") {
          if (status === "public") matchesStatus = cat.status !== "hidden" && cat.status !== "link_only";
          else matchesStatus = cat.status === status;
        }
        if (matchesSearch && matchesStatus || filteredChildren.length > 0) {
          return {
            ...cat,
            children: filteredChildren
          };
        }
        return null;
      }).filter(Boolean);
    }
    const parentCategories = computed(
      () => categories.filter(
        (cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === "null" || cat.parent_id === 0
      )
    );
    const filteredParentCategories = computed(
      () => filterCategories(parentCategories.value, searchQuery.value, adminFilter.value)
    );
    const page = usePage();
    const url = computed(() => page.url);
    const scrollContainer = ref(null);
    const store = useStore();
    const getTotalWriteCount = (category) => {
      let total = category.writes_count || 0;
      if (category.children && category.children.length) {
        category.children.forEach((child) => {
          total += getTotalWriteCount(child);
        });
      }
      return total;
    };
    const expandAllCategories = (expand = true) => {
      store.dispatch("CategorySidebar/expandAllCategories", expand);
    };
    const toggleCollapse = (categoryId) => {
      store.dispatch("CategorySidebar/toggleCollapse", categoryId);
    };
    const isCollapsed = (categoryId) => {
      return store.getters["CategorySidebar/isCollapsed"](categoryId);
    };
    const hasLinkOnlyWrites = (category) => {
      var _a, _b;
      const hasLinkOnly = (_a = category.writes) == null ? void 0 : _a.some((write) => write.status === "link_only");
      if (hasLinkOnly) return true;
      if ((_b = category.children) == null ? void 0 : _b.length) {
        return category.children.some((child) => hasLinkOnlyWrites(child));
      }
      return false;
    };
    __expose({
      expandAllCategories,
      scrollContainer
    });
    onMounted(() => {
      console.log("CategoryTree categories:", categories);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "scrollContainer",
        ref: scrollContainer,
        class: "space-y-1 p-3"
      }, _attrs))} data-v-4c1946fd><div class="mb-3" data-v-4c1946fd><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="input-bordered input w-full" placeholder="Kategori ara..." data-v-4c1946fd></div>`);
      if (unref(isAdmin)) {
        _push(`<div class="mb-3 flex gap-2" data-v-4c1946fd><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "all" }, "btn btn-xs"])}" data-v-4c1946fd> Tümü </button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "public" }, "btn btn-xs"])}" data-v-4c1946fd> Herkese Açık </button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "link_only" }, "btn btn-xs"])}" data-v-4c1946fd> Sadece Link </button><button class="${ssrRenderClass([{ "btn-primary": adminFilter.value === "hidden" }, "btn btn-xs"])}" data-v-4c1946fd> Gizli </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="" data-v-4c1946fd><!--[-->`);
      ssrRenderList(filteredParentCategories.value, (category) => {
        _push(`<li class="mb-1" data-v-4c1946fd><div class="flex w-full items-center" data-v-4c1946fd>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: [
            "block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200",
            url.value === `/categories/${category.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-4c1946fd${_scopeId}><div class="flex items-center gap-2" data-v-4c1946fd${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="opacity-70" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-4c1946fd${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-4c1946fd${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasLinkOnlyWrites(category)) {
                _push2(`<span class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-primary-content" : "text-primary"])}" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-v-4c1946fd${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-4c1946fd${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="font-medium" data-v-4c1946fd${_scopeId}>${ssrInterpolate(category.name)}</span>`);
              if (category.children.length) {
                _push2(`<button class="btn btn-ghost btn-sm btn-square" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(category.id) }, "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4c1946fd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4c1946fd${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center gap-2" data-v-4c1946fd${_scopeId}><div class="badge badge-sm" data-v-4c1946fd${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "opacity-70"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
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
                    hasLinkOnlyWrites(category) ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: [url.value === `/categories/${category.slug}` ? "text-primary-content" : "text-primary"]
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ], 2)) : createCommentVNode("", true),
                    createVNode("span", { class: "font-medium" }, toDisplayString(category.name), 1),
                    category.children.length ? (openBlock(), createBlock("button", {
                      key: 2,
                      onClick: withModifiers(($event) => toggleCollapse(category.id), ["prevent", "stop"]),
                      class: "btn btn-ghost btn-sm btn-square"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: ["h-4 w-4 transition-transform", { "rotate-180": !isCollapsed(category.id) }],
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ], 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "badge badge-sm" }, toDisplayString(getTotalWriteCount(category)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
        if (category.children.length) {
          _push(`<ul class="mt-1 pl-4" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-4c1946fd><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<li class="mb-1" data-v-4c1946fd><div class="flex w-full items-center" data-v-4c1946fd>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: [
                "block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200",
                url.value === `/categories/${child.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-4c1946fd${_scopeId}><div class="flex items-center gap-2" data-v-4c1946fd${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="opacity-70" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" data-v-4c1946fd${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-4c1946fd${_scopeId}></path></svg></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span data-v-4c1946fd${_scopeId}>${ssrInterpolate(child.name)}</span>`);
                  if (child.children.length) {
                    _push2(`<button class="btn btn-ghost btn-xs btn-square" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(child.id) }, "h-3 w-3 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4c1946fd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4c1946fd${_scopeId}></path></svg></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="badge badge-xs" data-v-4c1946fd${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "opacity-70"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3.5 w-3.5",
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
                        createVNode("span", null, toDisplayString(child.name), 1),
                        child.children.length ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: withModifiers(($event) => toggleCollapse(child.id), ["prevent", "stop"]),
                          class: "btn btn-ghost btn-xs btn-square"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: ["h-3 w-3 transition-transform", { "rotate-180": !isCollapsed(child.id) }],
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M19 9l-7 7-7-7"
                            })
                          ], 2))
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(child)), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
            if (child.children.length) {
              _push(`<ul class="mt-1 pl-3" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-4c1946fd><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<li class="mt-1" data-v-4c1946fd><div class="flex w-full items-center" data-v-4c1946fd>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: [
                    "block flex-grow items-center rounded-lg border px-3 py-1.5 text-xs backdrop-blur-md transition-all duration-200",
                    url.value === `/categories/${subChild.slug}` ? "border-primary bg-primary text-primary-content shadow-md" : "border-base-200 bg-base-200 text-base-content hover:bg-base-300"
                  ]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between" data-v-4c1946fd${_scopeId}><div class="flex items-center gap-2" data-v-4c1946fd${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="opacity-70" data-v-4c1946fd${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" data-v-4c1946fd${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-4c1946fd${_scopeId}></path></svg></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span data-v-4c1946fd${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="badge badge-xs" data-v-4c1946fd${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "opacity-70"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3 w-3",
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
                            createVNode("span", null, toDisplayString(subChild.name), 1)
                          ]),
                          createVNode("div", { class: "badge badge-xs" }, toDisplayString(getTotalWriteCount(subChild)), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div></li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      if (parentCategories.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center opacity-50" data-v-4c1946fd><div data-v-4c1946fd>Henüz kategori bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composables/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c1946fd"]]);
export {
  CategoryTree as default
};
