import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-BzwoG4_t.js";
import "./GoBackButton-CwBeSdRG.js";
import _sfc_main$2 from "./WriteUpdateForm-DLVq_hiC.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Form-C0ycMiS1.js";
import "./RichTextEditor-BF3onje2.js";
import "quill";
/* empty css                    */
import "./Button-pCBa8YYf.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="${ssrRenderClass([
              "group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 text-xl font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md"
            ])}"${_scopeId}><span class=""${_scopeId}>Yazıyı Güncelle</span></h1>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: [
                "group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 text-xl font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md"
              ] }, [
                createVNode("span", { class: "" }, "Yazıyı Güncelle")
              ]),
              createVNode(_sfc_main$2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
