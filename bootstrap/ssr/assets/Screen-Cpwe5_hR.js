import { withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./GoBackButton-CwBeSdRG.js";
import _sfc_main$4 from "./CategoriesCreateFrom-Vp4uEyGb.js";
import { _ as _sfc_main$3 } from "./TopScreen-DGs2djGh.js";
import { usePage } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Form-DJzmk4H_.js";
import "./Button-CWlX4hVa.js";
const _sfc_main = {
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
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Kategori Oluştur" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { categories: unref(categories) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/categories" }),
              createVNode(_sfc_main$3, { title: "Kategori Oluştur" }),
              createVNode(_sfc_main$4, { categories: unref(categories) }, null, 8, ["categories"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
