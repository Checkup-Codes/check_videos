import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-CZReNaVa.js";
import _sfc_main$2 from "./Screen-2WazZY_R.js";
import "@inertiajs/vue3";
import "./FlashMessage-UOn86LUE.js";
import "./SidebarLayoutWrite-kBVOqnWj.js";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-D52ZVP2Y.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./PerformanceMonitorButton-Do3MyRT-.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./SubSidebarScreen-DnJaJXGw.js";
import "./useSidebar-x6qG5wqp.js";
import "./SidebarLayoutCategory-D0kfvBHa.js";
import "./CategoryTree-DbNC7_Q2.js";
import "./CheckScreen-Fo9jcdnI.js";
import "./TopScreen-DnNmtdW-.js";
import "./GoBackButton-u55EQwn1.js";
import "./CategoriesEditFrom-DKzwSiRi.js";
const _sfc_main = {
  __name: "EditCategory",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/EditCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
