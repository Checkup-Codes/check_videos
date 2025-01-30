import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Button-CWlX4hVa.js";
import { Inertia } from "@inertiajs/inertia";
const _sfc_main = {
  __name: "TextScreen",
  __ssrInlineRender: true,
  props: {
    content: String,
    summary: String,
    id: Number,
    user: Object
  },
  setup(__props) {
    const onDelete = () => {
      if (confirm("Are you sure you want to delete this write?")) {
        Inertia.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-theme-background p-5 text-theme-text" }, _attrs))}><div class="prose prose-lg ql-container-custom prose-custom mb-8">${__props.content ?? ""}</div><div class="rounded-theme border-theme bg-theme-background p-3 shadow-inner"><h2 class="mb-3 text-xl font-semibold text-theme-text-light">Özet</h2><div class="break-words rounded-theme bg-theme-background p-4">${ssrInterpolate(__props.summary)}</div></div>`);
      if (__props.user) {
        _push(`<div class="mt-4 flex justify-end space-x-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${__props.id}/edit`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, { class: "rounded-theme" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Yazıyı Düzenle `);
                  } else {
                    return [
                      createTextVNode(" Yazıyı Düzenle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$1, { class: "rounded-theme" }, {
                  default: withCtx(() => [
                    createTextVNode(" Yazıyı Düzenle ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "rounded-theme",
          onClick: onDelete
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Yazıyı Sil `);
            } else {
              return [
                createTextVNode(" Yazıyı Sil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TextScreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
