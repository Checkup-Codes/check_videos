import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { computed, useSSRContext } from "vue";
const _sfc_main = {
  __name: "SPPrice",
  __ssrInlineRender: true,
  props: {
    price: [Number, String]
  },
  setup(__props) {
    const props = __props;
    const formattedPrice = computed(
      () => Number(props.price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}>${ssrInterpolate(formattedPrice.value)}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/component/SPPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
