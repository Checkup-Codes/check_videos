import { mergeProps, useSSRContext, ref, watch, onBeforeUnmount } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: "grid grid-cols-1 lg:grid-cols-subsidebar h-screen overflow-hidden overscroll-none scrollbar-hide"
    },
    isCollapsed: {
      type: Boolean
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: __props.isCollapsed ? __props.infoClass : "h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)] overflow-hidden"
      }, _attrs))}>`);
      if (__props.isCollapsed) {
        ssrRenderSlot(_ctx.$slots, "sidebar", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "FlashMessage",
  __ssrInlineRender: true,
  props: {
    message: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localMessage = ref(props.message);
    let timeoutId = null;
    watch(
      () => props.message,
      (newMessage) => {
        localMessage.value = newMessage;
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (newMessage) {
          timeoutId = setTimeout(() => {
            localMessage.value = null;
            timeoutId = null;
            emit("close");
          }, 3e3);
        }
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-4 top-4 z-50 w-full max-w-sm" }, _attrs))}><div class="relative flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 shadow-lg backdrop-blur-sm" role="alert"><div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div><div class="flex-1"><p class="text-sm font-medium text-foreground">${ssrInterpolate(__props.message)}</p></div><button class="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Notifications/FlashMessage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
