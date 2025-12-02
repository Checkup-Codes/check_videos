import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutTestCategories-CZhCQUiP.js";
import _sfc_main$2 from "./Screen-BxyOGMzr.js";
import "@inertiajs/vue3";
import "./FlashMessage-CQHak4HA.js";
import "./SidebarLayoutTest-BOaa4SWM.js";
import "./TestList-b5Xw0B8n.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-DNDkVWuC.js";
import "./SubSidebarScreen-BaVEfKio.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-C3knlPuT.js";
import "./CategoryTree-DOrljEAa.js";
import "./CheckScreen-juRHZR4N.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "ShowCategoryPage"
}, {
  __name: "ShowCategory",
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Categories/ShowCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
