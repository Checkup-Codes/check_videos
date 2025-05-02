import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-8Va6LGwE.js";
import _sfc_main$2 from "./Screen-ZwbkzF_C.js";
import "./FlashMessage-BmCYiqI9.js";
import "./SidebarLayoutWrite-By6QMvGY.js";
import "./TopSubsidebar-ChFM9Ijr.js";
import "@inertiajs/vue3";
import "./Button-CxoVCCz0.js";
import "./WriteList-CMiuScR5.js";
import "./ToggleSubSidebarButton-C4Kqliz4.js";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./SidebarLayoutCategory-Du_Sgofk.js";
import "./CategoryTree-Dihevhi3.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./IntroScreen-Cfx-GXRi.js";
const _sfc_main = {
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/IndexCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
