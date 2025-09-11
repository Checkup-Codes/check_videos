import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutFBVersions-9pijwww0.js";
import _sfc_main$2 from "./Screen-p6Xr2R5v.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutVersion-CagSrnvB.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-DaB40CC2.js";
import "./TopSubsidebar-CDC7ECSa.js";
import "./VersionList-nzCJkvRK.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "./CheckScreen-BIqwcPls.js";
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
