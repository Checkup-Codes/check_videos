import { mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { G as GoBackSvg } from "../app2.js";
const _sfc_main = {
  __name: "GoBackButton",
  __ssrInlineRender: true,
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex lg:hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: __props.url,
        class: "flex items-center p-2 text-black hover:text-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(GoBackSvg, null, null, _parent2, _scopeId));
            _push2(` Geri `);
          } else {
            return [
              createVNode(GoBackSvg),
              createTextVNode(" Geri ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/GoBackButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
