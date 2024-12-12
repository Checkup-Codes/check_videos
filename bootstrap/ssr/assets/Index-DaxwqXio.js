import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-BzwoG4_t.js";
const _imports_0 = "/build/assets/elselif_logo-DaTki8PR.png";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="text-center"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Yakup Sarı" class="mx-auto my-auto h-96 w-96 rounded-full"${_scopeId}></header>`);
          } else {
            return [
              createVNode("header", { class: "text-center" }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: "Yakup Sarı",
                  class: "mx-auto my-auto h-96 w-96 rounded-full"
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
