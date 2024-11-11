import { ref, onMounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$1 } from "./GoBackButton-CwBeSdRG.js";
import { _ as _sfc_main$3 } from "./ExcalidrawComponent-Dh-f7fGS.js";
import { _ as _sfc_main$2 } from "./CButton-Bo0n3h7o.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const categories = ref(props.categories);
    const auth = props.auth;
    const showMerhaba = ref(false);
    onMounted(() => {
      if (window.location.pathname.includes("categories")) {
        showMerhaba.value = true;
      } else {
        showMerhaba.value = props.showMerhaba || false;
      }
    });
    const deleteWrite = (id) => {
      if (confirm("Are you sure you want to delete this write?")) {
        Inertia.delete(route("writes.destroy", id)).then(() => {
        }).catch((error) => {
          console.error("Error deleting write:", error);
        });
      }
    };
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-full overflow-auto rounded-lg bg-screen-bg p-2 shadow-md" }, _attrs))}><div class="block lg:hidden"><div class="flex justify-between px-3">`);
      _push(ssrRenderComponent(_sfc_main$1, { url: "/writes" }, null, _parent));
      if (write.value.hasDraw) {
        _push(`<div class="">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="rounded-lg bg-white p-4 shadow-sm sm:px-10 lg:grid lg:grid-cols-12 lg:px-10 lg:pt-5"><div class="my-auto w-auto lg:col-span-9"><h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate(write.value.title)}</h1><div class="mt-2 hidden text-sm text-gray-500 lg:block"><span class="font-medium">Kategori:</span> ${ssrInterpolate(getCategoryName(write.value.category_id))}</div></div><div class="hidden justify-center space-y-2 md:col-span-3 md:mt-0 md:flex">`);
      if (write.value.hasDraw) {
        _push(`<div class="flex items-center">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${write.value.slug}?showMerhaba=${showMerhaba.value ? 0 : 1}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(showMerhaba.value ? "Yazıya Dön" : "Çizimine Git"), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (showMerhaba.value) {
        _push(`<div class="rounded-lg bg-white shadow-sm">`);
        _push(ssrRenderComponent(_sfc_main$3, { write: write.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="mt-6 rounded-lg bg-white p-4 pb-16 shadow-sm lg:pb-0"><div class="prose prose-lg ql-container-custom mb-8 lg:pl-1">${write.value.content ?? ""}</div><div class="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"><h2 class="mb-4 text-2xl font-semibold text-gray-800">Özet</h2><p class="leading-relaxed text-gray-700">${ssrInterpolate(write.value.summary)}</p></div>`);
        if (unref(auth).user) {
          _push(`<div class="mt-5 flex justify-end">`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/writes/${write.value.id}/edit`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_sfc_main$2, null, {
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
          }, _parent));
          _push(ssrRenderComponent(_sfc_main$2, {
            onClick: ($event) => deleteWrite(write.value.id)
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
      }
      _push(`</div>`);
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
