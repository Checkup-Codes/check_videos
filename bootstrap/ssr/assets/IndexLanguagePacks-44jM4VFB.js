import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-CKPSF0es.js";
import Screen from "./Screen-0LuPcDJY.js";
import "./FlashMessage-CRU0HHDP.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./SidebarRendition-Bq8nhRRx.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./TopSubsidebar-7f19mFMx.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckScreen-G62taWZ6.js";
const _sfc_main = {
  __name: "IndexLanguagePacks",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/IndexLanguagePacks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
