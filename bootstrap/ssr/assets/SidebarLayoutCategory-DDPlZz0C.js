import { computed, inject, ref, watch, onMounted, mergeProps, withCtx, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-DaB40CC2.js";
import { _ as _sfc_main$3 } from "./SubSidebarScreen-BKy3Ou2K.js";
import CategoryTree from "./CategoryTree-Bo3u88OW.js";
import { _ as _sfc_main$2 } from "./TopSubsidebar-CDC7ECSa.js";
import { u as useSidebar } from "./useSidebar-DbOjWDc5.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
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
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const categories = inject("categories", []);
    computed(
      () => categories.filter(
        (cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === "null" || cat.parent_id === 0
      )
    );
    const areAllCategoriesExpanded = computed(() => store.getters["CategorySidebar/collapsedSet"].size === 0);
    const getLinkClasses = () => "";
    const showCategories = ref(true);
    const categoryTreeRef = ref(null);
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const scrollableRef = ref(null);
    const emit = __emit;
    const handleWidthToggle = (value) => {
      isNarrow.value = value;
      store.commit("Writes/SET_COLLAPSED", value);
    };
    watch(isNarrow, (newValue) => {
      emit("update:isNarrow", newValue);
    });
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
    });
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      localStorage.setItem("categorySidebarScroll", scrollTop);
    };
    const getAllCategoryIds = (categories2) => {
      let ids = [];
      categories2.forEach((category) => {
        ids.push(category.id);
        if (category.children && category.children.length > 0) {
          ids = ids.concat(getAllCategoryIds(category.children));
        }
      });
      return ids;
    };
    const toggleAllCategories = () => {
      if (areAllCategoriesExpanded.value) {
        const allIds = getAllCategoryIds(categories);
        store.dispatch("CategorySidebar/collapseAll", allIds);
      } else {
        store.dispatch("CategorySidebar/expandAll");
      }
    };
    onMounted(() => {
      if (scrollableRef.value) {
        scrollableRef.value.addEventListener && scrollableRef.value.addEventListener("scroll", handleScroll);
        if (scrollableRef.value.$el) {
          scrollableRef.value.$el.addEventListener("scroll", handleScroll);
          const savedScroll = localStorage.getItem("categorySidebarScroll");
          if (savedScroll) {
            scrollableRef.value.$el.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        isNarrow: isNarrow.value,
        class: currentTheme.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "KATEGORİLER",
              href: "/categories/create",
              showExpandCollapseButton: true,
              isExpanded: areAllCategoriesExpanded.value,
              onToggleExpand: toggleAllCategories,
              onToggleWidth: handleWidthToggle,
              class: "border-base-200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "scrollableRef",
              ref: scrollableRef
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
              createVNode(_sfc_main$2, {
                title: "KATEGORİLER",
                href: "/categories/create",
                showExpandCollapseButton: true,
                isExpanded: areAllCategoriesExpanded.value,
                onToggleExpand: toggleAllCategories,
                onToggleWidth: handleWidthToggle,
                class: "border-base-200"
              }, null, 8, ["isExpanded"]),
              createVNode(_sfc_main$3, {
                ref_key: "scrollableRef",
                ref: scrollableRef
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
const SidebarLayoutCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b1e5910"]]);
export {
  SidebarLayoutCategory as default
};
