import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-DaN4jc2P.js";
import _sfc_main$2 from "./Screen-h3oJJrTO.js";
import "./FlashMessage-CRuOLMV3.js";
import "./SidebarLayoutWrite-DfZovOKj.js";
import "./TopSubsidebar-7f19mFMx.js";
import "@inertiajs/vue3";
import "./WriteList-B98i3MP6.js";
import "./PerformanceMonitorButton-Co6U4sf0.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckSubsidebar-BZirZ79m.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./SidebarLayoutCategory-VBuuKr-J.js";
import "./CategoryTree-rf0huwvq.js";
import "./CheckScreen-C9UKQisk.js";
import "./IntroScreen-CgMhf5vf.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexWritePage"
}, {
  __name: "IndexWrite",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/IndexWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
