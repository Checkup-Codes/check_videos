import { inject, computed, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5 p-3" }, _attrs))} data-v-03f8d3e3><!--[-->`);
      ssrRenderList(filteredParentCategories.value, (category) => {
        _push(`<div class="space-y-1" data-v-03f8d3e3><div class="${ssrRenderClass([
          "group relative overflow-hidden rounded-xl border transition-all duration-200",
          url.value === `/categories/${category.slug}` ? "border-primary/50 bg-primary shadow-sm shadow-primary/10" : "border-border/50 bg-card/50 hover:border-border hover:bg-accent/50 hover:shadow-sm"
        ])}" data-v-03f8d3e3>`);
        if (url.value === `/categories/${category.slug}`) {
          _push(`<div class="absolute left-0 top-0 h-full w-1 bg-primary" data-v-03f8d3e3></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("categories.show", { category: category.slug }),
          class: ["block p-3", { "pl-4": url.value === `/categories/${category.slug}` }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between gap-2" data-v-03f8d3e3${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-2" data-v-03f8d3e3${_scopeId}>`);
              if (category.status === "hidden") {
                _push2(`<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" title="Gizli kategori" data-v-03f8d3e3${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasLinkOnlyWrites(category)) {
                _push2(`<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" title="Sadece link yazıları" data-v-03f8d3e3${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h4 class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-primary-foreground" : "text-foreground", "truncate text-xs font-semibold tracking-tight"])}"${ssrRenderAttr("title", category.name)} data-v-03f8d3e3${_scopeId}>${ssrInterpolate(category.name)}</h4></div><div class="flex shrink-0 items-center gap-1.5" data-v-03f8d3e3${_scopeId}>`);
              if (category.children.length) {
                _push2(`<button class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "text-primary-foreground/80 hover:bg-primary-foreground/10" : "", "inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"])}" data-v-03f8d3e3${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  class: ["h-3.5 w-3.5 transition-transform duration-200", { "rotate-180": !isCollapsed(category.id) }]
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground", "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"])}" data-v-03f8d3e3${_scopeId}>${ssrInterpolate(getTotalWriteCount(category))}</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-2" }, [
                    category.status === "hidden" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                      title: "Gizli kategori"
                    }, [
                      createVNode(_sfc_main$1, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true),
                    hasLinkOnlyWrites(category) ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
                      title: "Sadece link yazıları"
                    }, [
                      createVNode(_sfc_main$2, { class: "h-3 w-3" })
                    ])) : createCommentVNode("", true),
                    createVNode("h4", {
                      class: ["truncate text-xs font-semibold tracking-tight", url.value === `/categories/${category.slug}` ? "text-primary-foreground" : "text-foreground"],
                      title: category.name
                    }, toDisplayString(category.name), 11, ["title"])
                  ]),
                  createVNode("div", { class: "flex shrink-0 items-center gap-1.5" }, [
                    category.children.length ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => toggleCollapse(category.id), ["prevent", "stop"]),
                      class: ["inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1", url.value === `/categories/${category.slug}` ? "text-primary-foreground/80 hover:bg-primary-foreground/10" : ""]
                    }, [
                      createVNode(_sfc_main$3, {
                        class: ["h-3.5 w-3.5 transition-transform duration-200", { "rotate-180": !isCollapsed(category.id) }]
                      }, null, 8, ["class"])
                    ], 10, ["onClick"])) : createCommentVNode("", true),
                    createVNode("div", {
                      class: ["inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold", url.value === `/categories/${category.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"]
                    }, toDisplayString(getTotalWriteCount(category)), 3)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="${ssrRenderClass([url.value === `/categories/${category.slug}` ? "bg-primary/5" : "bg-accent/30", "pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"])}" data-v-03f8d3e3></div>`);
        if (category.children.length) {
          _push(`<div class="mt-1.5 space-y-1 pl-3" style="${ssrRenderStyle(!isCollapsed(category.id) ? null : { display: "none" })}" data-v-03f8d3e3><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<div data-v-03f8d3e3><div class="${ssrRenderClass([
              "group relative overflow-hidden rounded-lg border transition-all duration-200",
              url.value === `/categories/${child.slug}` ? "border-primary/40 bg-primary/90 shadow-sm" : "border-border/40 bg-card/40 hover:border-border/60 hover:bg-accent/40"
            ])}" data-v-03f8d3e3>`);
            if (url.value === `/categories/${child.slug}`) {
              _push(`<div class="absolute left-0 top-0 h-full w-0.5 bg-primary" data-v-03f8d3e3></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.show", { category: child.slug }),
              class: ["block p-2.5", { "pl-3": url.value === `/categories/${child.slug}` }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between gap-2" data-v-03f8d3e3${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-1.5" data-v-03f8d3e3${_scopeId}>`);
                  if (child.status === "hidden" || child.parent_hidden) {
                    _push2(`<span class="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" title="Gizli kategori" data-v-03f8d3e3${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$1, { class: "h-2.5 w-2.5" }, null, _parent2, _scopeId));
                    _push2(`</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "text-primary-foreground" : "text-foreground", "truncate text-[11px] font-semibold"])}"${ssrRenderAttr("title", child.name)} data-v-03f8d3e3${_scopeId}>${ssrInterpolate(child.name)}</span></div><div class="flex shrink-0 items-center gap-1" data-v-03f8d3e3${_scopeId}>`);
                  if (child.children.length) {
                    _push2(`<button class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "text-primary-foreground/80 hover:bg-primary-foreground/10" : "", "inline-flex h-5 w-5 items-center justify-center rounded-md text-xs transition-all duration-200 hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"])}" data-v-03f8d3e3${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$3, {
                      class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(child.id) }]
                    }, null, _parent2, _scopeId));
                    _push2(`</button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/70 text-secondary-foreground", "inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold"])}" data-v-03f8d3e3${_scopeId}>${ssrInterpolate(getTotalWriteCount(child))}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                      createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-1.5" }, [
                        child.status === "hidden" || child.parent_hidden ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex h-4 w-4 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                          title: "Gizli kategori"
                        }, [
                          createVNode(_sfc_main$1, { class: "h-2.5 w-2.5" })
                        ])) : createCommentVNode("", true),
                        createVNode("span", {
                          class: ["truncate text-[11px] font-semibold", url.value === `/categories/${child.slug}` ? "text-primary-foreground" : "text-foreground"],
                          title: child.name
                        }, toDisplayString(child.name), 11, ["title"])
                      ]),
                      createVNode("div", { class: "flex shrink-0 items-center gap-1" }, [
                        child.children.length ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: withModifiers(($event) => toggleCollapse(child.id), ["prevent", "stop"]),
                          class: ["inline-flex h-5 w-5 items-center justify-center rounded-md text-xs transition-all duration-200 hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1", url.value === `/categories/${child.slug}` ? "text-primary-foreground/80 hover:bg-primary-foreground/10" : ""]
                        }, [
                          createVNode(_sfc_main$3, {
                            class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": !isCollapsed(child.id) }]
                          }, null, 8, ["class"])
                        ], 10, ["onClick"])) : createCommentVNode("", true),
                        createVNode("div", {
                          class: ["inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold", url.value === `/categories/${child.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/70 text-secondary-foreground"]
                        }, toDisplayString(getTotalWriteCount(child)), 3)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="${ssrRenderClass([url.value === `/categories/${child.slug}` ? "bg-primary/5" : "bg-accent/30", "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"])}" data-v-03f8d3e3></div>`);
            if (child.children.length) {
              _push(`<div class="mt-1 space-y-1 pl-2.5" style="${ssrRenderStyle(!isCollapsed(child.id) ? null : { display: "none" })}" data-v-03f8d3e3><!--[-->`);
              ssrRenderList(child.children, (subChild) => {
                _push(`<div data-v-03f8d3e3><div class="${ssrRenderClass([
                  "group relative overflow-hidden rounded-md border transition-all duration-200",
                  url.value === `/categories/${subChild.slug}` ? "border-primary/30 bg-primary/80 shadow-sm" : "border-border/30 bg-card/30 hover:border-border/50 hover:bg-accent/30"
                ])}" data-v-03f8d3e3>`);
                if (url.value === `/categories/${subChild.slug}`) {
                  _push(`<div class="absolute left-0 top-0 h-full w-0.5 bg-primary" data-v-03f8d3e3></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("categories.show", { category: subChild.slug }),
                  class: ["block p-2", { "pl-2.5": url.value === `/categories/${subChild.slug}` }]
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<div class="flex items-center justify-between gap-1.5" data-v-03f8d3e3${_scopeId}><div class="flex min-w-0 flex-1 items-center gap-1.5" data-v-03f8d3e3${_scopeId}>`);
                      if (subChild.status === "hidden" || subChild.parent_hidden) {
                        _push2(`<span class="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" title="Gizli kategori" data-v-03f8d3e3${_scopeId}>`);
                        _push2(ssrRenderComponent(_sfc_main$1, { class: "h-2 w-2" }, null, _parent2, _scopeId));
                        _push2(`</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`<span class="${ssrRenderClass([
                        url.value === `/categories/${subChild.slug}` ? "text-primary-foreground" : "text-foreground",
                        "truncate text-[10px] font-semibold"
                      ])}"${ssrRenderAttr("title", subChild.name)} data-v-03f8d3e3${_scopeId}>${ssrInterpolate(subChild.name)}</span></div><div class="${ssrRenderClass([url.value === `/categories/${subChild.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/60 text-secondary-foreground", "inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold"])}" data-v-03f8d3e3${_scopeId}>${ssrInterpolate(getTotalWriteCount(subChild))}</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between gap-1.5" }, [
                          createVNode("div", { class: "flex min-w-0 flex-1 items-center gap-1.5" }, [
                            subChild.status === "hidden" || subChild.parent_hidden ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                              title: "Gizli kategori"
                            }, [
                              createVNode(_sfc_main$1, { class: "h-2 w-2" })
                            ])) : createCommentVNode("", true),
                            createVNode("span", {
                              class: [
                                "truncate text-[10px] font-semibold",
                                url.value === `/categories/${subChild.slug}` ? "text-primary-foreground" : "text-foreground"
                              ],
                              title: subChild.name
                            }, toDisplayString(subChild.name), 11, ["title"])
                          ]),
                          createVNode("div", {
                            class: ["inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold", url.value === `/categories/${subChild.slug}` ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary/60 text-secondary-foreground"]
                          }, toDisplayString(getTotalWriteCount(subChild)), 3)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`<div class="${ssrRenderClass([url.value === `/categories/${subChild.slug}` ? "bg-primary/5" : "bg-accent/30", "pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"])}" data-v-03f8d3e3></div></div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredParentCategories.value.length === 0) {
        _push(`<div class="flex h-40 flex-col items-center justify-center gap-2 text-center" data-v-03f8d3e3><div class="rounded-full bg-muted/50 p-3" data-v-03f8d3e3><svg class="h-6 w-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-03f8d3e3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" data-v-03f8d3e3></path></svg></div><p class="text-xs font-medium text-muted-foreground" data-v-03f8d3e3>Henüz kategori bulunmuyor</p></div>`);
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
const CategoryTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03f8d3e3"]]);
export {
  CategoryTree as default
};
