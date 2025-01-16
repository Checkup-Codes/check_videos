import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutFBVersions-Bgqxz-UM.js";
import _sfc_main$2 from "./Screen-Dwm6SPr6.js";
import "./FlashMessage-D4SjMXTN.js";
import "./SidebarLayoutVersion-zyMMmVLK.js";
import "@inertiajs/vue3";
import "./TopSubsidebar-CmUzX1D9.js";
import "./Button-CWlX4hVa.js";
import "./VersionList-BFcNgt_6.js";
import "dayjs";
import "./CheckScreen-BMk2_E2_.js";
import "dayjs/locale/tr.js";
const _sfc_main = {
  __name: "ShowVersion",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/ShowVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
