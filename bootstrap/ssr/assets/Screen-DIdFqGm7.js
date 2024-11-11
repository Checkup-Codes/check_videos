import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GoBackButton-CwBeSdRG.js";
import _sfc_main$2 from "./CategoriesEditFrom-CbWhauXE.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CForm-9VrrqWSp.js";
import "./CButton-Bo0n3h7o.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg px-3 pt-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { url: "/categories" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
