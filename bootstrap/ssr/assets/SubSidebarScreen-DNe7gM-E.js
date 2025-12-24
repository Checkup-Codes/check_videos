import { computed, mergeProps, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "CheckSubsidebar",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    },
    isNarrow: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => {
      const baseClasses = `${props.infoClass} bg-muted overscroll-none border-r border-border subsidebar-enhanced`;
      return props.isNarrow ? `${baseClasses} subsidebar-narrow` : baseClasses;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [computedClass.value, "flex flex-col h-full"]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckSubsidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SubSidebarScreen",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    }
  },
  setup(__props, { expose: __expose }) {
    const containerRef = ref(null);
    __expose({
      $el: containerRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: [__props.infoClass, "subsidebarscreen-container"]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/SubSidebarScreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
