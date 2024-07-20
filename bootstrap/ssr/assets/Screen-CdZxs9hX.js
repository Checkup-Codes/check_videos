import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./GoBackButton-DuDuOUOx.js";
import _sfc_main$2 from "./WriteCreateForm-CT6eXtJM.js";
import { useSSRContext } from "vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "@ckeditor/ckeditor5-build-classic";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
