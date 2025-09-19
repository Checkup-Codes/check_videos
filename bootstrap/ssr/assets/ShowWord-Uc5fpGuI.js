import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-BRzErygV.js";
import Screen from "./Screen-Cw6u8Ga2.js";
import "./FlashMessage-CRU0HHDP.js";
import "./SidebarRendition-CXz13BDA.js";
import "@inertiajs/vue3";
import "vuex";
import "./CheckSubsidebar-DaB40CC2.js";
import "./TopSubsidebar-DW1eDitX.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckScreen-BIqwcPls.js";
import "./MultipleChoice-B9iPBUYP.js";
import "./TranslateWord-BZUIwaCp.js";
import "gsap";
import "./WordCompletion-D6EQHJ8m.js";
const _sfc_main = {
  __name: "ShowWord",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
    pack: Object,
    error: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps(props, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/ShowWord.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
