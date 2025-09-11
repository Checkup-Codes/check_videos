import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import ServiceItem from "./ServiceItem-Ihxuygsp.js";
import { _ as _sfc_main$1 } from "./CheckScreen-BIqwcPls.js";
import { _ as _sfc_main$2 } from "./TopScreen-DnNmtdW-.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Servisler" }, null, _parent2, _scopeId));
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-2d1166b6${_scopeId}><div class="card-body p-6" data-v-2d1166b6${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-2d1166b6${_scopeId}><div data-v-2d1166b6${_scopeId}></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services/create",
              class: "btn btn-primary btn-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-2d1166b6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-2d1166b6${_scopeId2}></path></svg> Yeni Servis `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "mr-1 h-4 w-4"
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
              _push2(`<div class="alert alert-info" data-v-2d1166b6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-2d1166b6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2d1166b6${_scopeId}></path></svg><span data-v-2d1166b6${_scopeId}>Henüz servis bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<ul class="menu w-full bg-base-100" data-v-2d1166b6${_scopeId}><!--[-->`);
              ssrRenderList(parents.value, (parent) => {
                _push2(ssrRenderComponent(ServiceItem, {
                  key: parent.id,
                  service: parent,
                  "all-services": services.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></ul>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Servisler" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div"),
                    createVNode(unref(Link), {
                      href: "/services/create",
                      class: "btn btn-primary btn-sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-4 w-4"
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
                    class: "alert alert-info"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      class: "h-6 w-6 shrink-0 stroke-current"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("span", null, "Henüz servis bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("ul", {
                    key: 1,
                    class: "menu w-full bg-base-100"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(parents.value, (parent) => {
                      return openBlock(), createBlock(ServiceItem, {
                        key: parent.id,
                        service: parent,
                        "all-services": services.value
                      }, null, 8, ["service", "all-services"]);
                    }), 128))
                  ]))
                ])
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d1166b6"]]);
export {
  Screen as default
};
