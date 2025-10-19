import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "SPSpaces",
  __ssrInlineRender: true,
  props: {
    product: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><span class="font-bold">${ssrInterpolate(__props.product.stock)}</span> stok <span class="text-gray-800">| </span><span class="font-bold">${ssrInterpolate(__props.product.version)}</span> version <span class="text-gray-800">| </span><span class="font-bold">${ssrInterpolate(__props.product.platform)}</span></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/component/SPSpaces.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
