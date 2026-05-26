import { computed, mergeProps, useSSRContext, ref, useSlots } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../ssr.js";
const _sfc_main$3 = {
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
        class: [computedClass.value, "relative z-10 flex flex-col h-full"]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckSubsidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/SubSidebarScreen.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SubSidebarHeader",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const hasTitle = computed(() => !!(props.title || props.description));
    const isCustomOnly = computed(() => !!slots.default && !hasTitle.value && !slots.actions);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-10 shrink-0 border-b border-border bg-background px-2 py-1.5" }, _attrs))} data-v-4ab2a6d1>`);
      if (isCustomOnly.value) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<div class="flex min-w-0 flex-nowrap items-center gap-1.5" data-v-4ab2a6d1>`);
        if (hasTitle.value) {
          _push(`<div class="min-w-0 flex-1 truncate leading-none" data-v-4ab2a6d1>`);
          if (__props.title) {
            _push(`<span class="text-xs font-semibold text-foreground" data-v-4ab2a6d1>${ssrInterpolate(__props.title)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.description) {
            _push(`<span class="text-[10px] text-muted-foreground" data-v-4ab2a6d1>${ssrInterpolate(__props.title ? " · " : "")}${ssrInterpolate(__props.description)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$slots.actions) {
          _push(`<div class="ml-auto flex shrink-0 flex-nowrap items-center gap-1 overflow-x-auto scrollbar-hide" data-v-4ab2a6d1>`);
          ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Layout/SubSidebarHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SubSidebarHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4ab2a6d1"]]);
const _sfc_main = {
  __name: "SubSidebarContent",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["space-y-1 px-2 py-2 sm:px-3", props.class]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Layout/SubSidebarContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  SubSidebarHeader as S,
  _sfc_main$3 as _,
  _sfc_main$2 as a,
  _sfc_main as b
};
