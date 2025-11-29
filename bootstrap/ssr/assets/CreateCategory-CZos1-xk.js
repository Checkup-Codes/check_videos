import { computed, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import _sfc_main$1 from "./LayoutWritesCategories-FY-nyCYo.js";
import _sfc_main$2 from "./Screen-GdVasAqA.js";
import "@inertiajs/vue3";
import "./FlashMessage-CANvN5nm.js";
import "./SidebarLayoutWrite-65-dY_yA.js";
import "./WriteList-DDi5QWJr.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DfwdLh-u.js";
import "./SubSidebarScreen-DMn-8f1h.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-DWwJO5Tq.js";
import "./CategoryTree-C_YNeSgy.js";
import "./CheckScreen-juRHZR4N.js";
import "./GoBackButton-u55EQwn1.js";
import "./CategoriesCreateFrom-LFKkqJl6.js";
import "./TopScreen-DnNmtdW-.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateCategoryPage"
}, {
  __name: "CreateCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ class: currentTheme.value }, _attrs), {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/CreateCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
