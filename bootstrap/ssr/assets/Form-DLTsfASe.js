import { mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, renderSlot, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import _sfc_main$1 from "./Card-qmctt-Ej.js";
import _sfc_main$2 from "./Button-DRijrITN.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Form"
    },
    submitText: {
      type: String,
      default: "Kaydet"
    },
    submitVariant: {
      type: String,
      default: "primary"
    },
    loading: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const onSubmit = () => {
      emit("submit");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: __props.title,
        elevated: true,
        class: "mx-auto max-w-4xl"
      }, _attrs), {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "icon")
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "action", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "action")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<div class="divider"${_scopeId}></div><div class="flex justify-end space-x-3"${_scopeId}>`);
            if (__props.showCancel) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                type: "button",
                variant: "ghost",
                onClick: ($event) => _ctx.$emit("cancel")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` İptal `);
                  } else {
                    return [
                      createTextVNode(" İptal ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              type: "submit",
              variant: __props.submitVariant,
              loading: __props.loading,
              disabled: __props.loading
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.submitText)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.submitText), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(onSubmit, ["prevent"]),
                class: "space-y-6"
              }, [
                renderSlot(_ctx.$slots, "default"),
                createVNode("div", { class: "divider" }),
                createVNode("div", { class: "flex justify-end space-x-3" }, [
                  __props.showCancel ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 0,
                    type: "button",
                    variant: "ghost",
                    onClick: ($event) => _ctx.$emit("cancel")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" İptal ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    type: "submit",
                    variant: __props.submitVariant,
                    loading: __props.loading,
                    disabled: __props.loading
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.submitText), 1)
                    ]),
                    _: 1
                  }, 8, ["variant", "loading", "disabled"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
