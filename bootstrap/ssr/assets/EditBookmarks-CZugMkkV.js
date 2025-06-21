import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.js";
/* empty css      */
import "@inertiajs/vue3";
import "@inertiajs/progress";
import "vue/server-renderer";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`ada`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/EditBookmarks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditBookmarks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  EditBookmarks as default
};
