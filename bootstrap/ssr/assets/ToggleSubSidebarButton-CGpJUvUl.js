import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "ToggleSubSidebarButton",
  __ssrInlineRender: true,
  props: {
    isCollapsed: Boolean,
    toggle: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["top-1/2 z-50 hidden h-8 w-8 translate-y-1/2 transform items-center rounded-full border-2 bg-base-300 text-base-content shadow-lg lg:absolute lg:block", [__props.isCollapsed ? "lg:left-60 xl:left-[270px]" : "lg:right-[calc(100%-41rem)] xl:right-[calc(100%-43rem)]"]]
      }, _attrs))}><span class="items-center text-xl"> ⇔</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
