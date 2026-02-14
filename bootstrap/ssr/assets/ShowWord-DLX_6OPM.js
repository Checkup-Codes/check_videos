import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-CwUDeho-.js";
import Screen from "./Screen-CdwG-CTg.js";
import "./CheckLayout-3_RH6d5N.js";
import "./FlashMessage-C3JOGPFR.js";
import "./SidebarRendition-CHS7-F_9.js";
import "@inertiajs/vue3";
import "vuex";
import "./SubSidebarScreen-DNe7gM-E.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckScreen-DjaYf9so.js";
import "./MultipleChoice-u5pTSo_A.js";
import "./TranslateWord-CGHthvW-.js";
import "gsap";
import "./WordCompletion-CSmlEb1_.js";
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
