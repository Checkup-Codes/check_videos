import { ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./Screen-C0NFw9wV.js";
import { useSSRContext } from "vue";
import "@inertiajs/vue3";
import "./CheckScreen-BzwoG4_t.js";
const _sfc_main = {
  __name: "CreateVersion",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/CreateVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
