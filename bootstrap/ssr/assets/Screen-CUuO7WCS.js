import { withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-Djbvotax.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import _sfc_main$3 from "./CategoriesCreateFrom-kQrBvJAp.js";
import "./TopScreen-DnNmtdW-.js";
import { usePage } from "@inertiajs/vue3";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CreateCategoryScreen"
}, {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const categories = props.categories;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/categories" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { categories: unref(categories) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/categories" }),
              createVNode(_sfc_main$3, { categories: unref(categories) }, null, 8, ["categories"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
