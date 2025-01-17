import { ref, onMounted, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$2 } from "./TopScreen-iJi3lh6W.js";
import { _ as _sfc_main$3 } from "./ExcalidrawComponent-CtSFVtqc.js";
import { _ as _sfc_main$4 } from "./Button-CWlX4hVa.js";
import { _ as _sfc_main$1 } from "./CheckScreen-BMk2_E2_.js";
/* empty css                             */
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    ref(props.categories);
    const auth = props.auth;
    const showDraw = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showDraw.value = true;
      } else {
        showDraw.value = props.showDraw || false;
      }
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
    });
    const toggleContent = () => {
      showDraw.value = !showDraw.value;
      const url = new URL(window.location.href);
      if (showDraw.value) {
        url.searchParams.set("draw", "1");
      } else {
        url.searchParams.delete("draw");
      }
      window.history.pushState({}, "", url);
    };
    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      showDraw.value = urlParams.has("draw");
    });
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: write.value.title,
              onClick: toggleContent
            }, null, _parent2, _scopeId));
            if (showDraw.value) {
              _push2(`<div class="rounded-lg bg-white shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, { write: write.value }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="h-[calc(84vh)] w-full max-w-full overflow-y-auto overflow-x-hidden break-words rounded-lg bg-white lg:p-5"
${_scopeId}><div class="container mx-auto p-4"${_scopeId}><div class="prose prose-lg ql-container-custom mb-8 p-5 lg:pl-1"${_scopeId}>${write.value.content ?? ""}</div><div class="rounded-lg bg-gray-50 p-3 shadow-inner"${_scopeId}><h2 class="mb-3 text-xl font-semibold text-gray-800"${_scopeId}>Özet</h2><div class="break-words rounded-md p-4 text-gray-700"${_scopeId}>${ssrInterpolate(write.value.summary)}</div></div>`);
              if (unref(auth).user) {
                _push2(`<div class="mt-5 flex justify-end space-x-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/writes/${write.value.id}/edit`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_sfc_main$4, null, {
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
                        createVNode(_sfc_main$4, null, {
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
                _push2(ssrRenderComponent(_sfc_main$4, {
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
              _push2(`</div></div>`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: write.value.title,
                onClick: toggleContent
              }, null, 8, ["title"]),
              showDraw.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-lg bg-white shadow-sm"
              }, [
                createVNode(_sfc_main$3, { write: write.value }, null, 8, ["write"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5"
              }, [
                createVNode("div", { class: "container mx-auto p-4" }, [
                  createVNode("div", {
                    class: "prose prose-lg ql-container-custom mb-8 p-5 lg:pl-1",
                    innerHTML: write.value.content
                  }, null, 8, ["innerHTML"]),
                  createVNode("div", { class: "rounded-lg bg-gray-50 p-3 shadow-inner" }, [
                    createVNode("h2", { class: "mb-3 text-xl font-semibold text-gray-800" }, "Özet"),
                    createVNode("div", { class: "break-words rounded-md p-4 text-gray-700" }, toDisplayString(write.value.summary), 1)
                  ]),
                  unref(auth).user ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-5 flex justify-end space-x-3"
                  }, [
                    createVNode(unref(Link), {
                      href: `/writes/${write.value.id}/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, null, {
                          default: withCtx(() => [
                            createTextVNode(" Yazıyı Düzenle ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(_sfc_main$4, {
                      onClick: ($event) => deleteWrite(write.value.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Yazıyı Sil ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true)
                ])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
