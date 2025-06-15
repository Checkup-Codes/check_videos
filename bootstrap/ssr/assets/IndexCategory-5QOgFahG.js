import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-DD9TQ4Qr.js";
import _sfc_main$2 from "./Screen-pBXsE-TD.js";
import "@inertiajs/vue3";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutWrite-DSbOPmiZ.js";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-DDuBwssf.js";
import "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./PerformanceMonitorButton-8xVocVYa.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./useSidebar-x6qG5wqp.js";
import "./SidebarLayoutCategory-Bvgdi9eP.js";
import "./CategoryTree-D62Ka97f.js";
import "./CheckScreen-G62taWZ6.js";
import "./IntroScreen-CgMhf5vf.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexCategoryPage"
}, {
  __name: "IndexCategory",
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
