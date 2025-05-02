import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./LayoutRendition-DerKBSmG.js";
import _sfc_main$2 from "./Screen-lhsmbvtK.js";
import "./FlashMessage-BmCYiqI9.js";
import "./ToggleSubSidebarButton-C4Kqliz4.js";
import "./SidebarRendition-BzQzb2Wj.js";
import "@inertiajs/vue3";
import "./CheckSubsidebar-BLfYMtJv.js";
import "./TopSubsidebar-ChFM9Ijr.js";
import "./Button-CxoVCCz0.js";
import "./SubSidebarScreen-q45DpGfz.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CheckScreen-CM3g7Drr.js";
import "./Card-qmctt-Ej.js";
const _sfc_main = {
  __name: "IndexWord",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/IndexWord.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
