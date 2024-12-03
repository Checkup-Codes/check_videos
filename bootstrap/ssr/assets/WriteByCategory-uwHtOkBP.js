import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutWritesCategories-DAc9Uiuv.js";
import _sfc_main$2 from "./Screen-Dv2rRcr_.js";
import "./CheckLayout-C1FAqO2C.js";
import "./SidebarLayoutWrite-DRIGwEfS.js";
import "./TopSubsidebar-CTQhPuSn.js";
import "./WriteList-Dvr0sWzx.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CheckSubsidebar-BzF3tbsH.js";
import "./SidebarLayoutCategory-BDDjI4DB.js";
import "@inertiajs/inertia";
import "./Button-pCBa8YYf.js";
import "./CheckScreen-BzwoG4_t.js";
const _sfc_main = {
  __name: "WriteByCategory",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
