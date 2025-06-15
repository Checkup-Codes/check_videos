import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    title: String,
    message: String,
    isVisible: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isVisible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" }, _attrs))}><div class="rounded bg-white p-6 shadow-md"><h2 class="mb-4 text-lg">${ssrInterpolate(__props.title)}</h2><p>${ssrInterpolate(__props.message)}</p><div class="mt-4 flex justify-end"><button class="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700">Cancel</button><button class="rounded bg-red-500 px-4 py-2 text-white">Delete</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/component/ConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
