import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./CheckLayout-ChVW_ecg.js";
import _sfc_main$2 from "./Screen-79Pktqbg.js";
import "./SidebarLayoutWrite-DUXLk1hx.js";
import "./CategoryMenu-DmYz_UpQ.js";
import "@inertiajs/vue3";
import "./CButton-Bo0n3h7o.js";
import "./WriteList-D32Nlkza.js";
import "./SidebarLayoutCategory-BbGQaw8W.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CScreen-Cx3_QK48.js";
import "./GoBackButton-CwBeSdRG.js";
import "./WriteCreateForm-BOIj2bcV.js";
import "./CForm-9VrrqWSp.js";
import "./CRichTextEditor-DmaWZ1Ex.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "CreateWrite",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/CreateWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
