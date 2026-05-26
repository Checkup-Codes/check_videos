import { withCtx, createVNode, openBlock, createBlock, renderSlot, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-ChCDBWK6.js";
const _sfc_main = {
  __name: "ProjectsPageFrame",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl px-1 py-4 sm:px-2"${_scopeId}>`);
            if (__props.title || __props.description || _ctx.$slots.header) {
              _push2(`<header class="mb-4"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                if (__props.title) {
                  _push2(`<h1 class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(__props.title)}</h1>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.description) {
                  _push2(`<p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</header>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl px-1 py-4 sm:px-2" }, [
                __props.title || __props.description || _ctx.$slots.header ? (openBlock(), createBlock("header", {
                  key: 0,
                  class: "mb-4"
                }, [
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    __props.title ? (openBlock(), createBlock("h1", {
                      key: 0,
                      class: "text-lg font-semibold text-foreground"
                    }, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
                    __props.description ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-xs text-muted-foreground"
                    }, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_components/ProjectsPageFrame.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
