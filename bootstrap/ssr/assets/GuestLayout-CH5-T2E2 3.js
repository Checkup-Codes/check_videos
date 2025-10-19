import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center bg-base-200 text-base-content transition-colors duration-300 dark:bg-base-300 dark:text-base-content" }, _attrs))}><div class="mb-4 text-2xl font-bold">${ssrInterpolate(title.value)} Admin</div><div class="w-full max-w-md rounded-xl border border-base-300 bg-base-100 p-8 shadow-lg dark:bg-base-200">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
