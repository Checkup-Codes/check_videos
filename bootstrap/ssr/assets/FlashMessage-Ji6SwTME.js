import { mergeProps, useSSRContext, ref, watchEffect } from "vue";
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
        class: __props.isCollapsed ? __props.infoClass : ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "sidebar", {}, null, _push, _parent);
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
  setup(__props) {
    const props = __props;
    const localMessage = ref(props.message);
    watchEffect(() => {
      if (localMessage.value) {
        setTimeout(() => {
          localMessage.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-4 top-4 z-50" }, _attrs))}><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(__props.message)}</span></div></div>`);
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
