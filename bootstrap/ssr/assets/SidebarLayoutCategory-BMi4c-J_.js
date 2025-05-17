import { ref, computed, onMounted, onBeforeUnmount, withCtx, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-aKe8eBeC.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import { _ as _sfc_main$4 } from "./SubSidebarScreen-DnJaJXGw.js";
import CategoryTree from "./CategoryTree-DZ94wjxJ.js";
import PerformanceMonitorButton from "./PerformanceMonitorButton-Co6U4sf0.js";
import { _ as _sfc_main$3 } from "./TopSubsidebar-7f19mFMx.js";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutCategory"
}, {
  __name: "SidebarLayoutCategory",
  __ssrInlineRender: true,
  emits: ["update:isCollapsed"],
  setup(__props, { emit: __emit }) {
    const { props, url } = usePage();
    const categories = ref(props.categories || []);
    ref(props.writes || []);
    const parentCategories = ref([]);
    const showCategories = ref(true);
    const isCollapsed = ref(true);
    const areAllCategoriesExpanded = ref(false);
    const categoryTreeRef = ref(null);
    const emit = __emit;
    const shouldShowPerformanceMonitor = computed(() => {
      return !!props.isAdmin && !!props.performance && Object.keys(props.performance).length > 0;
    });
    const performanceData = computed(() => props.performance || {});
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("update:isCollapsed", isCollapsed.value);
    };
    const toggleAllCategories = () => {
      areAllCategoriesExpanded.value = !areAllCategoriesExpanded.value;
      if (categoryTreeRef.value) {
        categoryTreeRef.value.expandAllCategories(areAllCategoriesExpanded.value);
      }
    };
    const getLinkClasses = (href) => {
      return url === href ? "font-medium !text-primary" : "";
    };
    const buildCategoryTree = () => {
      if (!categories.value || !categories.value.length) {
        parentCategories.value = [];
        return;
      }
      const map = {};
      const roots = [];
      categories.value.forEach((category) => {
        if (category && category.id) {
          map[category.id] = { ...category, children: [] };
        }
      });
      categories.value.forEach((category) => {
        var _a;
        if (!category) return;
        if (category.parent_id && map[category.parent_id]) {
          (_a = map[category.parent_id]) == null ? void 0 : _a.children.push(map[category.id]);
        } else if (!category.parent_id) {
          roots.push(map[category.id]);
        }
      });
      parentCategories.value = roots;
    };
    onMounted(() => {
      buildCategoryTree();
    });
    onBeforeUnmount(() => {
      categoryTreeRef.value = null;
      parentCategories.value = [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              isCollapsed: false,
              toggle: collapseSidebar,
              class: "btn-ghost"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "KATEGORİLER",
              href: "/categories/create",
              showExpandCollapseButton: true,
              isExpanded: areAllCategoriesExpanded.value,
              onToggleExpand: toggleAllCategories,
              class: "border-base-200"
            }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (shouldShowPerformanceMonitor.value) {
                    _push3(ssrRenderComponent(PerformanceMonitorButton, { performance: performanceData.value }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    shouldShowPerformanceMonitor.value ? (openBlock(), createBlock(PerformanceMonitorButton, {
                      key: 0,
                      performance: performanceData.value
                    }, null, 8, ["performance"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (showCategories.value) {
                    _push3(ssrRenderComponent(CategoryTree, {
                      ref_key: "categoryTreeRef",
                      ref: categoryTreeRef,
                      parentCategories: parentCategories.value,
                      getLinkClasses,
                      expandAll: areAllCategoriesExpanded.value
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
                      parentCategories: parentCategories.value,
                      getLinkClasses,
                      expandAll: areAllCategoriesExpanded.value
                    }, null, 8, ["parentCategories", "expandAll"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                isCollapsed: false,
                toggle: collapseSidebar,
                class: "btn-ghost"
              }),
              createVNode(_sfc_main$3, {
                title: "KATEGORİLER",
                href: "/categories/create",
                showExpandCollapseButton: true,
                isExpanded: areAllCategoriesExpanded.value,
                onToggleExpand: toggleAllCategories,
                class: "border-base-200"
              }, {
                actions: withCtx(() => [
                  shouldShowPerformanceMonitor.value ? (openBlock(), createBlock(PerformanceMonitorButton, {
                    key: 0,
                    performance: performanceData.value
                  }, null, 8, ["performance"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["isExpanded"]),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  showCategories.value ? (openBlock(), createBlock(CategoryTree, {
                    key: 0,
                    ref_key: "categoryTreeRef",
                    ref: categoryTreeRef,
                    parentCategories: parentCategories.value,
                    getLinkClasses,
                    expandAll: areAllCategoriesExpanded.value
                  }, null, 8, ["parentCategories", "expandAll"])) : createCommentVNode("", true)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-21bc6253"]]);
export {
  SidebarLayoutCategory as default
};
