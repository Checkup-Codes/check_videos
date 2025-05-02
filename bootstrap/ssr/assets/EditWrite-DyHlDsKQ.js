import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-8Va6LGwE.js";
import _sfc_main$2 from "./Screen-BAJGxVeV.js";
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
import "./WriteUpdateForm-D3219Uxf.js";
import "./Badge-BLykgubL.js";
import "./Button-DRijrITN.js";
import "./Card-qmctt-Ej.js";
import "./Form-DLTsfASe.js";
import "./ItemList-BMhf5pOx.js";
import "./RichTextEditor-Dw4E-YzI.js";
import "quill";
/* empty css                    */
import "./TextField-C0ZHhnba.js";
import "./KeyboardShortcutDisabler-CZ9a0rUV.js";
import "./CheckScreen-CM3g7Drr.js";
const _sfc_main = {
  __name: "EditWrite",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/EditWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
