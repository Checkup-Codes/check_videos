import { inject, computed, ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import _sfc_main$1 from "./IconLock-DLKK0TNF.js";
import _sfc_main$2 from "./IconLink-D_NS_GoN.js";
import _sfc_main$3 from "./IconChevronDown-ClwhHkE5.js";
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
    const injectedCategories = inject("categories", []);
    const categories = computed(() => {
      const categoriesValue = (injectedCategories == null ? void 0 : injectedCategories.value) ?? injectedCategories;
      return Array.isArray(categoriesValue) ? categoriesValue : [];
    });
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
      () => categories.value.filter((cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === "null" || cat.parent_id === 0).sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a))
    );
    const filteredParentCategories = computed(() => filterCategories(parentCategories.value, adminFilter.value));
    const url = computed(() => page.url);
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
      expandAllCategories
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1 p-3" }, _attrs))} data-v-3b49b491><!--[-->`);
      ssrRenderList(filteredParentCategories.value, (category) => {
        _push(`<div data-v-3b49b491><div class="${ssrRenderClass([
          "group rounded-md transition-colors",
          url.value === `/categories/${category.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
        ])}" data-v-3b49b491>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: "block px-3 py-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between" data-v-3b49b491${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-3b49b491${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-3b49b491${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasLinkOnlyWrites(category)) {
                _push2(`<span class="shrink-0 text-primary" title="Sadece link yazıları" data-v-3b49b491${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h3 class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-accent-foreground" : "text-foreground", "truncate text-sm font-medium"])}"${ssrRenderAttr("title", category.name)} data-v-3b49b491${_scopeId}>${ssrInterpolate(category.name)}</h3></div><div class="flex shrink-0 items-center gap-2" data-v-3b49b491${_scopeId}>`);
              if (category.children.length) {
                _push2(`<button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-3b49b491${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(category.id) }]
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground" data-v-3b49b491${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "shrink-0 text-yellow-500",
                      title: "Gizli kategori"
                    }, [
                      createVNode(_sfc_main$1, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true),
                    hasLinkOnlyWrites(category) ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "shrink-0 text-primary",
                      title: "Sadece link yazıları"
                    }, [
                      createVNode(_sfc_main$2, { class: "h-3 w-3" })
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
                      createVNode(_sfc_main$3, {
                        class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(category.id) }]
                      }, null, 8, ["class"])
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
          _push(`<div class="pb-1" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-3b49b491><div class="space-y-0.5 pl-4" data-v-3b49b491><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<div data-v-3b49b491><div class="${ssrRenderClass([
              "group rounded-md transition-colors",
              url.value === `/categories/${child.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
            ])}" data-v-3b49b491>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: "block px-3 py-1.5"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between" data-v-3b49b491${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-3b49b491${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-3b49b491${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                    _push2(`</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "text-accent-foreground" : "text-foreground", "truncate text-sm font-medium"])}"${ssrRenderAttr("title", child.name)} data-v-3b49b491${_scopeId}>${ssrInterpolate(child.name)}</span></div><div class="flex shrink-0 items-center gap-2" data-v-3b49b491${_scopeId}>`);
                  if (child.children.length) {
                    _push2(`<button class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-v-3b49b491${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$3, {
                      class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(child.id) }]
                    }, null, _parent2, _scopeId));
                    _push2(`</button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-v-3b49b491${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "shrink-0 text-yellow-500",
                          title: "Gizli kategori"
                        }, [
                          createVNode(_sfc_main$1, { class: "h-3 w-3" })
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
                          createVNode(_sfc_main$3, {
                            class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(child.id) }]
                          }, null, 8, ["class"])
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
              _push(`<div class="pb-1" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-3b49b491><div class="space-y-0.5 pl-4" data-v-3b49b491><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<div data-v-3b49b491><div class="${ssrRenderClass([
                  "group rounded-md transition-colors",
                  url.value === `/categories/${subChild.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                ])}" data-v-3b49b491>`);
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: "block px-3 py-1.5"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between" data-v-3b49b491${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-3b49b491${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="shrink-0 text-yellow-500" title="Gizli kategori" data-v-3b49b491${_scopeId}>`);
                        _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                        _push2(`</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="${ssrRenderClass([
                        url.value === `/categories/${subChild.slug}` ? "text-accent-foreground" : "text-foreground",
                        "truncate text-xs font-medium"
                      ])}"${ssrRenderAttr("title", subChild.name)} data-v-3b49b491${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="inline-flex shrink-0 items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-v-3b49b491${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "shrink-0 text-yellow-500",
                              title: "Gizli kategori"
                            }, [
                              createVNode(_sfc_main$1, { class: "h-3 w-3" })
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
        _push(`<div class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50" data-v-3b49b491><div data-v-3b49b491>Henüz kategori bulunmuyor</div></div>`);
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
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b49b491"]]);
export {
  CategoryTree as default
};
