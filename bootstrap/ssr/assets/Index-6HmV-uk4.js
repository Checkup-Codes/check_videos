import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _imports_0 = "/build/assets/checkup_codes_logo-DYmYY9xz.png";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center bg-gray-100" }, _attrs))}><header class="text-center"><img${ssrRenderAttr("src", _imports_0)} alt="Yakup Sarı" class="mx-auto h-96 w-96 rounded-full"><h2 class="animate__animated animate__fadeInDown mb-4 text-4xl font-bold">Check-up Codes</h2><p class="animate__animated animate__fadeInUp mb-6 text-lg">Kodlarınızı Yenileyin, Bilginizi Tazeleyin.</p></header></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Index as default
};
