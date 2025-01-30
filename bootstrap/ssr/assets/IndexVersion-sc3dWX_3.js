import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutFBVersions-BSURScL8.js";
import _sfc_main$2 from "./Screen-BZNx8I94.js";
import "./FlashMessage-D4SjMXTN.js";
import "./SidebarLayoutVersion-DdUPiXZc.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-CzPQxoDS.js";
import "./TopSubsidebar-BzzRvyod.js";
import "./Button-CWlX4hVa.js";
import "./VersionList-DHYuUGEf.js";
import "./CheckScreen-J_xllE7d.js";
import "./IntroScreen-B01_yNp7.js";
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
