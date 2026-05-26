import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "PageShell",
  __ssrInlineRender: true,
  props: {
    /**
     * wide: grid/list pages (max 1400px)
     * content: create/edit forms (max 768px)
     * detail: show pages and single-column views (max 896px)
     */
    width: {
      type: String,
      default: "wide",
      validator: (value) => ["wide", "content", "detail"].includes(value)
    },
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const widthClasses = {
      wide: "max-w-[1400px]",
      content: "max-w-3xl",
      detail: "max-w-4xl"
    };
    const shellClasses = computed(() => [
      "mx-auto px-4 py-6 sm:px-6 sm:py-8",
      widthClasses[props.width],
      props.class
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: shellClasses.value }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Layout/PageShell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
