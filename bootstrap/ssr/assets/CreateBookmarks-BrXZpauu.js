import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@inertiajs/vue3";
import "vue/server-renderer";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`Create`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/CreateBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateBookmarks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  CreateBookmarks as default
};
