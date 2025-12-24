import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderClass } from "vue/server-renderer";
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    },
    isCollapsed: {
      type: Boolean
    },
    showSidebarOnMobile: {
      type: Boolean,
      default: void 0
      // undefined = auto (show on mobile if collapsed)
    },
    showMainContentOnMobile: {
      type: Boolean,
      default: void 0
      // undefined = auto (show on mobile)
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          __props.isCollapsed ? "flex flex-col lg:grid lg:grid-cols-subsidebar h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)]" : "h-[calc(100vh-3rem)] lg:h-[calc(100vh-5.5rem)]",
          "overflow-hidden overscroll-none scrollbar-hide"
        ]
      }, _attrs))}>`);
      if (__props.isCollapsed && (__props.showSidebarOnMobile === void 0 || __props.showSidebarOnMobile === true)) {
        _push(`<div class="sidebar-container flex flex-col min-h-0 flex-1 lg:h-full overflow-hidden">`);
        ssrRenderSlot(_ctx.$slots, "sidebar", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([
        "main-content-container min-h-0 flex-1 lg:h-full overflow-hidden",
        __props.showMainContentOnMobile === false ? "hidden lg:block" : ""
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
