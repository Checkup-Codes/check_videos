import { computed, inject, ref, watch, onMounted, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DNDkVWuC.js";
import { _ as _sfc_main$2 } from "./SubSidebarScreen-BaVEfKio.js";
import CategoryTree from "./CategoryTree-DOrljEAa.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutCategory"
}, {
  __name: "SidebarLayoutCategory",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    useSidebar();
    const store = useStore();
    const page = usePage();
    const isLoggedIn = computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isListView = computed(() => {
      const url = page.url;
      return url.startsWith("/tests") && !url.startsWith("/test-categories");
    });
    const injectedCategories = inject("categories", []);
    const categories = computed(() => {
      if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
        return injectedCategories;
      }
      if (page.props.categories && Array.isArray(page.props.categories) && page.props.categories.length > 0) {
        return page.props.categories;
      }
      return [];
    });
    const areAllCategoriesExpanded = computed(() => store.getters["CategorySidebar/collapsedSet"].size === 0);
    const getLinkClasses = () => "";
    const showCategories = ref(true);
    const categoryTreeRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const scrollableRef = ref(null);
    const emit = __emit;
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    const getAllCategoryIds = (categories2) => {
      if (!categories2 || !Array.isArray(categories2) || categories2.length === 0) {
        return [];
      }
      let ids = [];
      categories2.forEach((category) => {
        if (category && category.id) {
          ids.push(category.id);
          if (category.children && Array.isArray(category.children) && category.children.length > 0) {
            ids = ids.concat(getAllCategoryIds(category.children));
          }
        }
      });
      return ids;
    };
    const toggleAllCategories = () => {
      const cats = categories.value;
      if (!cats || cats.length === 0) {
        console.warn("Categories not available for toggle");
        return;
      }
      if (areAllCategoriesExpanded.value) {
        const allIds = getAllCategoryIds(cats);
        if (allIds.length > 0) {
          store.dispatch("CategorySidebar/collapseAll", allIds);
        }
      } else {
        store.dispatch("CategorySidebar/expandAll");
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
    });
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      localStorage.setItem("testCategorySidebarScroll", scrollTop);
    };
    onMounted(() => {
      if (scrollableRef.value) {
        scrollableRef.value.addEventListener && scrollableRef.value.addEventListener("scroll", handleScroll);
        if (scrollableRef.value.$el) {
          scrollableRef.value.$el.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem("testCategorySidebarScroll");
          if (savedScroll) {
            scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isLoggedIn.value) {
              _push2(`<div class="shrink-0 border-b border-border bg-background/95 p-2" data-v-8b3d174c${_scopeId}><div class="flex items-center justify-between gap-2" data-v-8b3d174c${_scopeId}><div class="flex items-center gap-1" data-v-8b3d174c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/tests",
                class: [
                  "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                  isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                ],
                title: "Liste görünümü"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8b3d174c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-8b3d174c${_scopeId2}></path></svg>`);
                    if (!isNarrow.value) {
                      _push3(`<span data-v-8b3d174c${_scopeId2}>Liste</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4 6h16M4 12h16M4 18h16"
                        })
                      ])),
                      !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: "/test-categories",
                class: [
                  "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                  !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                ],
                title: "Kategori görünümü"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8b3d174c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-8b3d174c${_scopeId2}></path></svg>`);
                    if (!isNarrow.value) {
                      _push3(`<span data-v-8b3d174c${_scopeId2}>Kategori</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        })
                      ])),
                      !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center gap-1" data-v-8b3d174c${_scopeId}><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": areAllCategoriesExpanded.value }, "inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}"${ssrRenderAttr("title", areAllCategoriesExpanded.value ? "Tümünü Daralt" : "Tümünü Genişlet")} data-v-8b3d174c${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": areAllCategoriesExpanded.value }, "h-3 w-3 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-8b3d174c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" data-v-8b3d174c${_scopeId}></path></svg><span class="text-xs" data-v-8b3d174c${_scopeId}>${ssrInterpolate(areAllCategoriesExpanded.value ? "Daralt" : "Genişlet")}</span></button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0 overflow-y-auto overscroll-none"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (showCategories.value) {
                    _push3(ssrRenderComponent(CategoryTree, {
                      ref_key: "categoryTreeRef",
                      ref: categoryTreeRef,
                      getLinkClasses,
                      expandAll: areAllCategoriesExpanded.value,
                      isCollapsed: isNarrow.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    showCategories.value ? (openBlock(), createBlock(CategoryTree, {
                      key: 0,
                      ref_key: "categoryTreeRef",
                      ref: categoryTreeRef,
                      getLinkClasses,
                      expandAll: areAllCategoriesExpanded.value,
                      isCollapsed: isNarrow.value
                    }, null, 8, ["expandAll", "isCollapsed"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              isLoggedIn.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "shrink-0 border-b border-border bg-background/95 p-2"
              }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(Link), {
                      href: "/tests",
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Liste görünümü"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M4 6h16M4 12h16M4 18h16"
                          })
                        ])),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createVNode(unref(Link), {
                      href: "/test-categories",
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Kategori görünümü"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-3 w-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ])),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode("button", {
                      onClick: toggleAllCategories,
                      class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": areAllCategoriesExpanded.value }],
                      title: areAllCategoriesExpanded.value ? "Tümünü Daralt" : "Tümünü Genişlet"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": areAllCategoriesExpanded.value }],
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
                      ], 2)),
                      createVNode("span", { class: "text-xs" }, toDisplayString(areAllCategoriesExpanded.value ? "Daralt" : "Genişlet"), 1)
                    ], 10, ["title"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0 overflow-y-auto overscroll-none"
              }, {
                default: withCtx(() => [
                  showCategories.value ? (openBlock(), createBlock(CategoryTree, {
                    key: 0,
                    ref_key: "categoryTreeRef",
                    ref: categoryTreeRef,
                    getLinkClasses,
                    expandAll: areAllCategoriesExpanded.value,
                    isCollapsed: isNarrow.value
                  }, null, 8, ["expandAll", "isCollapsed"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b3d174c"]]);
export {
  SidebarLayoutCategory as default
};
