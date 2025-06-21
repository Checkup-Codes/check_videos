import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "SPAddress",
  __ssrInlineRender: true,
  props: {
    product: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}>${ssrInterpolate(__props.product.platform)} ${ssrInterpolate(__props.product.category)}, ${ssrInterpolate(__props.product.name)}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/component/SPAddress.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
