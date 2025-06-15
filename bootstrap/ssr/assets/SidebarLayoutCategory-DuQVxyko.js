import { ref, onMounted, watch, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DaB40CC2.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import { _ as _sfc_main$3 } from "./SubSidebarScreen-BKy3Ou2K.js";
import CategoryTree from "./CategoryTree-B0nYkkua.js";
import PerformanceMonitorButton from "./PerformanceMonitorButton-8xVocVYa.js";
import { _ as _sfc_main$2 } from "./TopSubsidebar-FcJAXk0J.js";
import { u as useSidebar } from "./useSidebar-x6qG5wqp.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
function useCategoryTree() {
  const { props, url } = usePage();
  const categories = ref(props.categories || []);
  const parentCategories = ref([]);
  const areAllCategoriesExpanded = ref(true);
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
  const getLinkClasses = (href) => {
    return url === href ? "font-medium !text-primary" : "";
  };
  const toggleAllCategories = () => {
    areAllCategoriesExpanded.value = !areAllCategoriesExpanded.value;
  };
  onMounted(() => {
    buildCategoryTree();
  });
  return {
    categories,
    parentCategories,
    areAllCategoriesExpanded,
    getLinkClasses,
    toggleAllCategories
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutCategory"
}, {
  __name: "SidebarLayoutCategory",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    const { shouldShowPerformanceMonitor, performanceData } = useSidebar();
    const { parentCategories, areAllCategoriesExpanded, getLinkClasses, toggleAllCategories } = useCategoryTree();
    const showCategories = ref(true);
    const categoryTreeRef = ref(null);
    const isNarrow = ref(false);
    const emit = __emit;
    const handleWidthToggle = (value) => {
      isNarrow.value = value;
    };
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "KATEGORİLER",
              href: "/categories/create",
              showExpandCollapseButton: true,
              isExpanded: unref(areAllCategoriesExpanded),
              onToggleExpand: unref(toggleAllCategories),
              onToggleWidth: handleWidthToggle,
              class: "border-base-200"
            }, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(shouldShowPerformanceMonitor)) {
                    _push3(ssrRenderComponent(PerformanceMonitorButton, { performance: unref(performanceData) }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(shouldShowPerformanceMonitor) ? (openBlock(), createBlock(PerformanceMonitorButton, {
                      key: 0,
                      performance: unref(performanceData)
                    }, null, 8, ["performance"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (showCategories.value) {
                    _push3(ssrRenderComponent(CategoryTree, {
                      ref_key: "categoryTreeRef",
                      ref: categoryTreeRef,
                      parentCategories: unref(parentCategories),
                      getLinkClasses: unref(getLinkClasses),
                      expandAll: unref(areAllCategoriesExpanded)
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
                      parentCategories: unref(parentCategories),
                      getLinkClasses: unref(getLinkClasses),
                      expandAll: unref(areAllCategoriesExpanded)
                    }, null, 8, ["parentCategories", "getLinkClasses", "expandAll"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: "KATEGORİLER",
                href: "/categories/create",
                showExpandCollapseButton: true,
                isExpanded: unref(areAllCategoriesExpanded),
                onToggleExpand: unref(toggleAllCategories),
                onToggleWidth: handleWidthToggle,
                class: "border-base-200"
              }, {
                actions: withCtx(() => [
                  unref(shouldShowPerformanceMonitor) ? (openBlock(), createBlock(PerformanceMonitorButton, {
                    key: 0,
                    performance: unref(performanceData)
                  }, null, 8, ["performance"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["isExpanded", "onToggleExpand"]),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  showCategories.value ? (openBlock(), createBlock(CategoryTree, {
                    key: 0,
                    ref_key: "categoryTreeRef",
                    ref: categoryTreeRef,
                    parentCategories: unref(parentCategories),
                    getLinkClasses: unref(getLinkClasses),
                    expandAll: unref(areAllCategoriesExpanded)
                  }, null, 8, ["parentCategories", "getLinkClasses", "expandAll"])) : createCommentVNode("", true)
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
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94d54f5e"]]);
export {
  SidebarLayoutCategory as default
};
