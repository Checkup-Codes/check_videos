import { onMounted, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "KeyboardShortcutDisabler",
  __ssrInlineRender: true,
  setup(__props) {
    const keysToDisable = ["1", "2", "3", "4", "5", "6", "m", "t", "l"];
    const handleKeyDown = (event) => {
      if (keysToDisable.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeyDown, true);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyDown, true);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "keyboard-shortcut-disabler" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/KeyboardShortcutDisabler.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
