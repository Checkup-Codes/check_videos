import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "TopScreen",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="${ssrRenderClass([
        "group mb-4 flex h-[50px] cursor-pointer select-none items-center justify-between border-b pl-3 font-extrabold text-gray-800 lg:text-2xl"
      ])}"><span class="${ssrRenderClass([__props.title.length > 30 ? "sm:text-md text-sm md:text-lg lg:text-xl" : "text-2xl sm:text-3xl md:text-4xl"])}">${ssrInterpolate(__props.title)}</span></h1></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TopScreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
