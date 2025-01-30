import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-CgarqrzG.js";
import _sfc_main$2 from "./Screen-Bi-zBeee.js";
import "./FlashMessage-D4SjMXTN.js";
import "./SidebarLayoutWrite-tCB3khio.js";
import "./TopSubsidebar-BzzRvyod.js";
import "@inertiajs/vue3";
import "./Button-CWlX4hVa.js";
import "./WriteList-2xIXzYKi.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CheckSubsidebar-CzPQxoDS.js";
import "./SidebarLayoutCategory-DHDd1MjA.js";
import "./CheckScreen-J_xllE7d.js";
import "./TopScreen-DGs2djGh.js";
import "./WriteCreateForm-Ctz6JmbK.js";
import "./Form-DJzmk4H_.js";
import "./RichTextEditor-DMNxOCyR.js";
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
