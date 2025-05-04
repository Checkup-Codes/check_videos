import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-CJYmxvrp.js";
import Screen from "./Screen-mKNgQjUl.js";
import "./FlashMessage-CRuOLMV3.js";
import "./ToggleSubSidebarButton-C0YTLScw.js";
import "./SidebarRendition-Dymg3bMU.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./TopSubsidebar-BQHVYzYO.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./CheckScreen-Dy3gXO5k.js";
const _sfc_main = {
  __name: "ShowLanguagePacks",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    languagePack: Object,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Screen, props, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Screen, props, null, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/ShowLanguagePacks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
