import { mergeProps, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "ToggleSubSidebarButton",
  __ssrInlineRender: true,
  props: {
    isCollapsed: Boolean,
    toggle: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 transform items-center rounded-full border-2 bg-white pb-0.5 text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl lg:absolute lg:block", [__props.isCollapsed ? "left-52" : "-right-4"]]
      }, _attrs))}><span class="items-center text-xl"> ⇔</span></button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "CheckSubsidebar",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => {
      return `${props.infoClass} border-color-one relative border-r`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: computedClass.value }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Modals/CheckSubsidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
