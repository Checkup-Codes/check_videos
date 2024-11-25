import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CScreen-CmV3l44j.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="flex h-[100%] items-center justify-center text-black"${_scopeId}><div class="text-center"${_scopeId}><h2 class="mb-4 text-4xl font-bold"${_scopeId}>Yazılar</h2></div></header>`);
          } else {
            return [
              createVNode("header", { class: "flex h-[100%] items-center justify-center text-black" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("h2", { class: "mb-4 text-4xl font-bold" }, "Yazılar")
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
