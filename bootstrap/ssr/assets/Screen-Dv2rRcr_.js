import { ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$2 } from "./Button-pCBa8YYf.js";
import { _ as _sfc_main$1 } from "./CheckScreen-BzwoG4_t.js";
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
      Inertia.visit(url);
    };
    const deleteWrite = (id) => {
      if (confirm("Are you sure you want to delete this write?")) {
        Inertia.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="${ssrRenderClass([
              "group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md",
              write.value.title.length > 30 ? "text-xl" : "text-2xl"
            ])}"${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(write.value.title)}</span></h1><div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5"${_scopeId}><div class="prose prose-lg ql-container-custom mb-8 lg:pl-1"${_scopeId}>${write.value.content ?? ""}</div><div class="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"${_scopeId}><h2 class="mb-4 text-2xl font-semibold text-gray-800"${_scopeId}>Özet</h2><p class="leading-relaxed text-gray-700"${_scopeId}>${ssrInterpolate(write.value.summary)}</p></div>`);
            if (unref(auth).user) {
              _push2(`<div class="mt-5 flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/writes/${write.value.id}/edit`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Yazıyı Düzenle `);
                        } else {
                          return [
                            createTextVNode(" Yazıyı Düzenle ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createTextVNode(" Yazıyı Düzenle ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, {
                onClick: ($event) => deleteWrite(write.value.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Yazıyı Sil `);
                  } else {
                    return [
                      createTextVNode(" Yazıyı Sil ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("h1", {
                onClick: navigateToWriteWithDraw,
                class: [
                  "group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md",
                  write.value.title.length > 30 ? "text-xl" : "text-2xl"
                ]
              }, [
                createVNode("span", { class: "" }, toDisplayString(write.value.title), 1)
              ], 2),
              createVNode("div", { class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5" }, [
                createVNode("div", {
                  class: "prose prose-lg ql-container-custom mb-8 lg:pl-1",
                  innerHTML: write.value.content
                }, null, 8, ["innerHTML"]),
                createVNode("div", { class: "mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm" }, [
                  createVNode("h2", { class: "mb-4 text-2xl font-semibold text-gray-800" }, "Özet"),
                  createVNode("p", { class: "leading-relaxed text-gray-700" }, toDisplayString(write.value.summary), 1)
                ]),
                unref(auth).user ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-5 flex justify-end"
                }, [
                  createVNode(unref(Link), {
                    href: `/writes/${write.value.id}/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createTextVNode(" Yazıyı Düzenle ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$2, {
                    onClick: ($event) => deleteWrite(write.value.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Yazıyı Sil ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/WriteByCategory/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
