import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Link, router, usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Button-CxoVCCz0.js";
import { _ as _sfc_main$3 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$4 } from "./TopScreen-DnNmtdW-.js";
const _sfc_main$1 = {
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
        router.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white text-gray-800 container p-5" }, _attrs))}><div class="prose-lg ql-container-custom prose-custom prose mb-8">${__props.content ?? ""}</div><div class="rounded-md border-gray-200 bg-white p-3 shadow-inner"><h2 class="text-gray-800-light mb-3 text-xl font-semibold">Özet</h2><div class="rounded-md bg-white break-words p-4">${ssrInterpolate(__props.summary)}</div></div>`);
      if (__props.user) {
        _push(`<div class="mt-4 flex justify-end space-x-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${__props.id}/edit`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, { class: "rounded-md" }, {
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
                createVNode(_sfc_main$2, { class: "rounded-md" }, {
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
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "rounded-md",
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TextScreen.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const auth = props.auth;
    const navigateToWriteWithDraw = () => {
      const slug = write.value.slug;
      const url = `/writes/${slug}?draw=1`;
      router.visit(url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              title: write.value.title,
              onClick: navigateToWriteWithDraw
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              content: write.value.content,
              summary: write.value.summary,
              id: write.value.id,
              user: unref(auth).user
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                title: write.value.title,
                onClick: navigateToWriteWithDraw
              }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                content: write.value.content,
                summary: write.value.summary,
                id: write.value.id,
                user: unref(auth).user
              }, null, 8, ["content", "summary", "id", "user"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
