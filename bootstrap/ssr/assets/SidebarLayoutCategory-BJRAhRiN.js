import { computed, inject, ref, watch, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$5 } from "./SubSidebarScreen-DNe7gM-E.js";
import CategoryTree from "./CategoryTree-BDcqhHJ6.js";
import { u as useSidebar } from "./useSidebar-D-dtiIC8.js";
import { useStore } from "vuex";
import _sfc_main$2 from "./IconMenu-D3qnKg3d.js";
import _sfc_main$3 from "./IconFolder-BMytUC2M.js";
import _sfc_main$4 from "./IconChevronDown-ClwhHkE5.js";
import { _ as _export_sfc } from "../ssr.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
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
    computed(() => {
      return !!(page.props.auth && page.props.auth.user);
    });
    const isListView = computed(() => {
      return false;
    });
    const injectedCategories = inject("categories", []);
    const categories = computed(() => {
      const categoriesValue = (injectedCategories == null ? void 0 : injectedCategories.value) ?? injectedCategories;
      if (categoriesValue && Array.isArray(categoriesValue) && categoriesValue.length > 0) {
        return categoriesValue;
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
    let scrollHandler = null;
    const getScrollElement = () => {
      var _a, _b, _c;
      if ((_b = (_a = scrollableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.value) {
        return scrollableRef.value.$el.value;
      }
      if ((_c = scrollableRef.value) == null ? void 0 : _c.$el) {
        return scrollableRef.value.$el;
      }
      return scrollableRef.value;
    };
    const saveScrollPosition = () => {
      const scrollElement = getScrollElement();
      if (scrollElement) {
        const scrollTop = scrollElement.scrollTop || 0;
        store.dispatch("CategorySidebar/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["CategorySidebar/scrollPosition"];
          if (savedPosition > 0) {
            scrollElement.scrollTop = savedPosition;
          }
        }
      });
    };
    const setupScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && !scrollHandler) {
        scrollHandler = () => saveScrollPosition();
        scrollElement.addEventListener("scroll", scrollHandler, { passive: true });
      }
    };
    const removeScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && scrollHandler) {
        scrollElement.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onActivated(() => {
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onDeactivated(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    onBeforeUnmount(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-2" data-v-50262e05${_scopeId}><div class="flex items-center justify-between gap-2" data-v-50262e05${_scopeId}><div class="flex items-center gap-1" data-v-50262e05${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("writes.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Liste görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-50262e05${_scopeId2}>Liste</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("categories.index"),
              class: [
                "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ],
              title: "Kategori görünümü"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  if (!isNarrow.value) {
                    _push3(`<span data-v-50262e05${_scopeId2}>Kategori</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                    !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-1" data-v-50262e05${_scopeId}><button class="${ssrRenderClass([{ "bg-accent text-accent-foreground": areAllCategoriesExpanded.value }, "inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"])}"${ssrRenderAttr("title", areAllCategoriesExpanded.value ? "Tümünü Daralt" : "Tümünü Genişlet")} data-v-50262e05${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": areAllCategoriesExpanded.value }]
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs" data-v-50262e05${_scopeId}>${ssrInterpolate(areAllCategoriesExpanded.value ? "Daralt" : "Genişlet")}</span></button></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
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
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-2" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("writes.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Liste görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Liste")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("categories.index"),
                      class: [
                        "inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors",
                        !isListView.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      ],
                      title: "Kategori görünümü"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { class: "h-3 w-3" }),
                        !isNarrow.value ? (openBlock(), createBlock("span", { key: 0 }, "Kategori")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["href", "class"])
                  ]),
                  createVNode("div", { class: "flex items-center gap-1" }, [
                    createVNode("button", {
                      onClick: toggleAllCategories,
                      class: ["inline-flex h-6 items-center gap-1 rounded px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", { "bg-accent text-accent-foreground": areAllCategoriesExpanded.value }],
                      title: areAllCategoriesExpanded.value ? "Tümünü Daralt" : "Tümünü Genişlet"
                    }, [
                      createVNode(_sfc_main$4, {
                        class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": areAllCategoriesExpanded.value }]
                      }, null, 8, ["class"]),
                      createVNode("span", { class: "text-xs" }, toDisplayString(areAllCategoriesExpanded.value ? "Daralt" : "Genişlet"), 1)
                    ], 10, ["title"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$5, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-50262e05"]]);
export {
  SidebarLayoutCategory as default
};
