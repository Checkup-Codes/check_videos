import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutProjects-DXAlsolR.js";
import Screen from "./Screen-BH63YaNC.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarLayoutProject-BcM3cXoB.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-DaB40CC2.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckScreen-G62taWZ6.js";
import "./TopScreen-DnNmtdW-.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexProject",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Screen, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Screen)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/IndexProject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
