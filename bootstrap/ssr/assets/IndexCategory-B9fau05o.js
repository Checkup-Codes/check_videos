import { computed, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import _sfc_main$1 from "./LayoutWritesCategories-DpxNIN3Q.js";
import _sfc_main$2 from "./Screen-Dgm0Ep8Y.js";
import "@inertiajs/vue3";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-DWbgubFD.js";
import "./TopSubsidebar-CDC7ECSa.js";
import "./WriteList-08ZCbF3x.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DaB40CC2.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-UYHjV0nJ.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CategoryTree-Bo3u88OW.js";
import "./CheckScreen-BmKXHPDi.js";
import "./IntroScreen-CgMhf5vf.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexCategoryPage"
}, {
  __name: "IndexCategory",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/IndexCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
