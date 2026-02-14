import { computed, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import _sfc_main$1 from "./LayoutRendition-CwUDeho-.js";
import _sfc_main$2 from "./Screen-DDPY4chx.js";
import "./CheckLayout-3_RH6d5N.js";
import "./FlashMessage-C3JOGPFR.js";
import "./SidebarRendition-CHS7-F_9.js";
import "@inertiajs/vue3";
import "./SubSidebarScreen-DNe7gM-E.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "IndexLanguagePacks",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ class: currentTheme.value }, _attrs), {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, props, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, props, null, 16)
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
