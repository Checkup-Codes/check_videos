import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CScreen-CmV3l44j.js";
import { _ as _sfc_main$2 } from "./GoBackButton-CwBeSdRG.js";
import _sfc_main$3 from "./WriteUpdateForm-M0UDvSfR.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CForm-9VrrqWSp.js";
import "./CRichTextEditor-DmaWZ1Ex.js";
import "quill";
/* empty css                    */
import "./CButton-Bo0n3h7o.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/writes" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/writes" }),
              createVNode(_sfc_main$3)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
