import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutProjects-DXAlsolR.js";
import _sfc_main$2 from "./Screen-D4phAlyJ.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutProject-BcM3cXoB.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-DaB40CC2.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckScreen-BmKXHPDi.js";
import "./TopScreen-DnNmtdW-.js";
import "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "CreateService",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/CreateService.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
