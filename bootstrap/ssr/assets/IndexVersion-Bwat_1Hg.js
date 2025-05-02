import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutFBVersions-iT68qbH7.js";
import _sfc_main$2 from "./Screen-Xh3iipte.js";
import "./FlashMessage-BmCYiqI9.js";
import "./SidebarLayoutVersion-B6O9RSJ6.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./ToggleSubSidebarButton-C4Kqliz4.js";
import "./TopSubsidebar-ChFM9Ijr.js";
import "./Button-CxoVCCz0.js";
import "./VersionList-BhW2HACk.js";
import "./CheckScreen-CM3g7Drr.js";
import "./IntroScreen-Cfx-GXRi.js";
const _sfc_main = {
  __name: "IndexVersion",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/IndexVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
