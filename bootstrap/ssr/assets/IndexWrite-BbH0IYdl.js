import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-DlHb7uiG.js";
import _sfc_main$2 from "./Screen-GQMNZrAe.js";
import "./FlashMessage-CRuOLMV3.js";
import "./SidebarLayoutWrite-Bb3iMkvD.js";
import "./TopSubsidebar-DqjiDOjY.js";
import "@inertiajs/vue3";
import "./WriteList-BUr_6Sxs.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ToggleSubSidebarButton-C4Kqliz4.js";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./SidebarLayoutCategory-CA_QOkNE.js";
import "./CategoryTree-jbxmBuN-.js";
import "./CheckScreen-CM3g7Drr.js";
import "./IntroScreen-CgMhf5vf.js";
const _sfc_main = {
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/IndexWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
