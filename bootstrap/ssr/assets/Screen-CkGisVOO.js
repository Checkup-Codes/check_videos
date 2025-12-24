import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$2 from "./ServiceItem-DTEIIbIp.js";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = computed(() => props.services || []);
    const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-semibold text-foreground"${_scopeId}>Servisler</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Tüm servisleri görüntüleyin ve yönetin</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services/create",
              class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId2}></path></svg> Yeni Servis `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "h-4 w-4"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 4.5v15m7.5-7.5h-15"
                      })
                    ])),
                    createTextVNode(" Yeni Servis ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!parents.value || parents.value.length === 0) {
              _push2(`<div class="flex items-center gap-3 rounded-lg border border-border bg-card p-8 text-center"${_scopeId}><div class="mx-auto"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="mx-auto h-12 w-12 text-muted-foreground/50" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><p class="mt-4 text-sm font-medium text-foreground"${_scopeId}>Henüz servis bulunmamaktadır</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Yeni bir servis oluşturmak için yukarıdaki butonu kullanın</p></div></div>`);
            } else {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(parents.value, (parent) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: parent.id,
                  service: parent,
                  "all-services": services.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-semibold text-foreground" }, "Servisler"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tüm servisleri görüntüleyin ve yönetin")
                  ]),
                  createVNode(unref(Link), {
                    href: "/services/create",
                    class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 4.5v15m7.5-7.5h-15"
                        })
                      ])),
                      createTextVNode(" Yeni Servis ")
                    ]),
                    _: 1
                  })
                ]),
                !parents.value || parents.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center gap-3 rounded-lg border border-border bg-card p-8 text-center"
                }, [
                  createVNode("div", { class: "mx-auto" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      class: "mx-auto h-12 w-12 text-muted-foreground/50",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("p", { class: "mt-4 text-sm font-medium text-foreground" }, "Henüz servis bulunmamaktadır"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Yeni bir servis oluşturmak için yukarıdaki butonu kullanın")
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(parents.value, (parent) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      key: parent.id,
                      service: parent,
                      "all-services": services.value
                    }, null, 8, ["service", "all-services"]);
                  }), 128))
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
