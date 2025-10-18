import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutFBVersions-D-3z_W46.js";
import _sfc_main$2 from "./Screen-C2MPdh29.js";
import "./FlashMessage-BW5JKxN1.js";
import "./SidebarLayoutVersion-BVzUDliT.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-Dj7LcfAL.js";
import "./TopSubsidebar-jFf3ITV_.js";
import "./VersionList-Cxpbo4dz.js";
import "./SubSidebarScreen-40SPmOW7.js";
import "./CheckScreen-faNUnK3u.js";
import "./TopScreen-DnNmtdW-.js";
const _sfc_main = {
  __name: "EditVersion",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/EditVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
