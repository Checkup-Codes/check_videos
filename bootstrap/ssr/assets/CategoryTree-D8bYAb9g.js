import { inject, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
    isCollapsed: { type: Boolean, default: false },
    expandAll: { type: Boolean, default: false }
  },
  emits: ["update:expandAll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const categories = inject("categories", []);
    const isAdmin = inject("isAdmin", false);
    const adminFilter = ref("all");
    ref(false);
    const page = usePage();
    function filterCategories(categories2, status) {
      return categories2.map((cat) => {
        const filteredChildren = filterCategories(cat.children || [], status);
        let matchesStatus = true;
        if (isAdmin && status !== "all") {
          if (status === "public") matchesStatus = cat.status !== "hidden" && cat.status !== "link_only";
          else matchesStatus = cat.status === status;
        }
        if (matchesStatus || filteredChildren.length > 0) {
          return {
            ...cat,
            children: filteredChildren
          };
        }
        return null;
      }).filter(Boolean).sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a));
    }
    const parentCategories = computed(
      () => categories.filter((cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === "null" || cat.parent_id === 0).sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a))
    );
    const filteredParentCategories = computed(() => filterCategories(parentCategories.value, adminFilter.value));
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full min-h-0 flex-col" }, _attrs))} data-v-dd800413><div class="category-tree-container min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-none p-3" data-v-dd800413><div class="space-y-1" data-v-dd800413><!--[-->`);
      ssrRenderList(filteredParentCategories.value, (category) => {
        _push(`<div data-v-dd800413><div class="${ssrRenderClass([
          "group rounded-md transition-colors",
          url.value === `/categories/${category.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
        ])}" data-v-dd800413>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: "block px-3 py-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-dd800413${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-dd800413${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-dd800413${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-dd800413${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasLinkOnlyWrites(category)) {
                _push2(`<span class="shrink-0 text-primary" title="Sadece link yazıları" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-dd800413${_scopeId}><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" data-v-dd800413${_scopeId}></path></svg></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h3 class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-accent-foreground" : "text-foreground", "truncate text-sm font-medium"])}"${ssrRenderAttr("title", category.name)} data-v-dd800413${_scopeId}>${ssrInterpolate(category.name)}</h3></div><div class="flex shrink-0 items-center gap-2" data-v-dd800413${_scopeId}>`);
              if (category.children.length) {
                _push2(`<button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(category.id) }, "h-3 w-3 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-dd800413${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-dd800413${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground" data-v-dd800413${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "shrink-0 text-yellow-500",
                      title: "Gizli kategori"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
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
                      class: "shrink-0 text-primary",
                      title: "Sadece link yazıları"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])) : createCommentVNode("", true),
                    createVNode("h3", {
                      class: ["truncate text-sm font-medium", url.value === `/categories/${category.slug}` ? "text-accent-foreground" : "text-foreground"],
                      title: category.name
                    }, toDisplayString(category.name), 11, ["title"])
                  ]),
                  createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                    category.children.length ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => toggleCollapse(category.id), ["prevent", "stop"]),
                      class: "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(category.id) }],
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground" }, toDisplayString(getTotalWriteCount(category)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (category.children.length) {
          _push(`<div class="pb-1" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-dd800413><div class="space-y-0.5 pl-4" data-v-dd800413><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<div data-v-dd800413><div class="${ssrRenderClass([
              "group rounded-md transition-colors",
              url.value === `/categories/${child.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
            ])}" data-v-dd800413>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: "block px-3 py-1.5"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-dd800413${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-dd800413${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-dd800413${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-dd800413${_scopeId}></path></svg></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "text-accent-foreground" : "text-foreground", "truncate text-sm font-medium"])}"${ssrRenderAttr("title", child.name)} data-v-dd800413${_scopeId}>${ssrInterpolate(child.name)}</span></div><div class="flex shrink-0 items-center gap-2" data-v-dd800413${_scopeId}>`);
                  if (child.children.length) {
                    _push2(`<button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !isCollapsed(child.id) }, "h-3 w-3 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-dd800413${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-dd800413${_scopeId}></path></svg></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-v-dd800413${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "shrink-0 text-yellow-500",
                          title: "Gizli kategori"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3 w-3",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ])) : createCommentVNode("", true),
                        createVNode("span", {
                          class: ["truncate text-sm font-medium", url.value === `/categories/${child.slug}` ? "text-accent-foreground" : "text-foreground"],
                          title: child.name
                        }, toDisplayString(child.name), 11, ["title"])
                      ]),
                      createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                        child.children.length ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: withModifiers(($event) => toggleCollapse(child.id), ["prevent", "stop"]),
                          class: "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(child.id) }],
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M19 9l-7 7-7-7"
                            })
                          ], 2))
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" }, toDisplayString(getTotalWriteCount(child)), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (child.children.length) {
              _push(`<div class="pb-1" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-dd800413><div class="space-y-0.5 pl-4" data-v-dd800413><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<div data-v-dd800413><div class="${ssrRenderClass([
                  "group rounded-md transition-colors",
                  url.value === `/categories/${subChild.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                ])}" data-v-dd800413>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: "block px-3 py-1.5"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between" data-v-dd800413${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-dd800413${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-dd800413${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-dd800413${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" data-v-dd800413${_scopeId}></path></svg></span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="${ssrRenderClass([
                        url.value === `/categories/${subChild.slug}` ? "text-accent-foreground" : "text-foreground",
                        "truncate text-xs font-medium"
                      ])}"${ssrRenderAttr("title", subChild.name)} data-v-dd800413${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="inline-flex shrink-0 items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-v-dd800413${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "shrink-0 text-yellow-500",
                              title: "Gizli kategori"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-3 w-3",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ])) : createCommentVNode("", true),
                            createVNode("span", {
                              class: [
                                "truncate text-xs font-medium",
                                url.value === `/categories/${subChild.slug}` ? "text-accent-foreground" : "text-foreground"
                              ],
                              title: subChild.name
                            }, toDisplayString(subChild.name), 11, ["title"])
                          ]),
                          createVNode("div", { class: "inline-flex shrink-0 items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" }, toDisplayString(getTotalWriteCount(subChild)), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div></div>`);
              });
              _push(`<!--]--></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredParentCategories.value.length === 0) {
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50" data-v-dd800413><div data-v-dd800413>Henüz kategori bulunmuyor</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_composables/CategoryTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd800413"]]);
export {
  CategoryTree as default
};
