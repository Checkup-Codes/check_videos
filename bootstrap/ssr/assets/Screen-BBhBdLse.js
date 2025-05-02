import { computed, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$4 from "./Card-qmctt-Ej.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = computed(() => props.services || []);
    const customers = computed(() => props.customers || []);
    const form = useForm({
      project_name: "",
      customer_id: "",
      services: []
    });
    const handleSubmit = () => {
      form.post("/projects");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/projects" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Yeni Proje Oluştur" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6" data-v-8c59045e${_scopeId2}><div class="divider" data-v-8c59045e${_scopeId2}>Proje Bilgileri</div><div class="form-control w-full" data-v-8c59045e${_scopeId2}><label class="label" data-v-8c59045e${_scopeId2}><span class="label-text" data-v-8c59045e${_scopeId2}>Proje Adı</span></label><input${ssrRenderAttr("value", unref(form).project_name)} type="text" class="input input-bordered w-full" required data-v-8c59045e${_scopeId2}></div><div class="form-control w-full" data-v-8c59045e${_scopeId2}><label class="label" data-v-8c59045e${_scopeId2}><span class="label-text" data-v-8c59045e${_scopeId2}>Müşteri Seçin</span></label><select class="select select-bordered w-full" required data-v-8c59045e${_scopeId2}><option disabled value="" data-v-8c59045e${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}${_scopeId2}>Bir müşteri seçin</option><!--[-->`);
                  ssrRenderList(customers.value, (customer) => {
                    _push3(`<option${ssrRenderAttr("value", customer.id)} data-v-8c59045e${_scopeId2}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="divider" data-v-8c59045e${_scopeId2}>Servisler</div><div class="form-control" data-v-8c59045e${_scopeId2}><label class="label" data-v-8c59045e${_scopeId2}><span class="label-text" data-v-8c59045e${_scopeId2}>Servis Seçin</span></label>`);
                  if (!services.value || services.value.length === 0) {
                    _push3(`<div class="alert alert-info" data-v-8c59045e${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-8c59045e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8c59045e${_scopeId2}></path></svg><span data-v-8c59045e${_scopeId2}>Henüz servis bulunmamaktadır.</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2" data-v-8c59045e${_scopeId2}><!--[-->`);
                  ssrRenderList(services.value, (service) => {
                    _push3(`<div class="form-control" data-v-8c59045e${_scopeId2}><label class="label cursor-pointer justify-start gap-2" data-v-8c59045e${_scopeId2}><input type="checkbox"${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).services) ? ssrLooseContain(unref(form).services, service.id) : unref(form).services) ? " checked" : ""} class="checkbox checkbox-primary" data-v-8c59045e${_scopeId2}><span class="label-text" data-v-8c59045e${_scopeId2}>${ssrInterpolate(service.name)}</span></label></div>`);
                  });
                  _push3(`<!--]--></div></div><div class="divider" data-v-8c59045e${_scopeId2}></div><div class="flex justify-end gap-2" data-v-8c59045e${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/projects",
                    class: "btn btn-ghost"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`İptal`);
                      } else {
                        return [
                          createTextVNode("İptal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<button type="submit" class="btn btn-primary" data-v-8c59045e${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8c59045e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-8c59045e${_scopeId2}></path></svg> Projeyi Kaydet </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "divider" }, "Proje Bilgileri"),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Proje Adı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).project_name = $event,
                          type: "text",
                          class: "input input-bordered w-full",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).project_name]
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Müşteri Seçin")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                          class: "select select-bordered w-full",
                          required: ""
                        }, [
                          createVNode("option", {
                            disabled: "",
                            value: ""
                          }, "Bir müşteri seçin"),
                          (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                            return openBlock(), createBlock("option", {
                              key: customer.id,
                              value: customer.id
                            }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).customer_id]
                        ])
                      ]),
                      createVNode("div", { class: "divider" }, "Servisler"),
                      createVNode("div", { class: "form-control" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Servis Seçin")
                        ]),
                        !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
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
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-2 grid grid-cols-1 gap-2 md:grid-cols-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                            return openBlock(), createBlock("div", {
                              key: service.id,
                              class: "form-control"
                            }, [
                              createVNode("label", { class: "label cursor-pointer justify-start gap-2" }, [
                                withDirectives(createVNode("input", {
                                  type: "checkbox",
                                  value: service.id,
                                  "onUpdate:modelValue": ($event) => unref(form).services = $event,
                                  class: "checkbox checkbox-primary"
                                }, null, 8, ["value", "onUpdate:modelValue"]), [
                                  [vModelCheckbox, unref(form).services]
                                ]),
                                createVNode("span", { class: "label-text" }, toDisplayString(service.name), 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex justify-end gap-2" }, [
                        createVNode(unref(Link), {
                          href: "/projects",
                          class: "btn btn-ghost"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("İptal")
                          ]),
                          _: 1
                        }),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "mr-1 h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            })
                          ])),
                          createTextVNode(" Projeyi Kaydet ")
                        ])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/projects" }),
              createVNode(_sfc_main$3, { title: "Yeni Proje Oluştur" }),
              createVNode(_sfc_main$4, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "divider" }, "Proje Bilgileri"),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Proje Adı")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).project_name = $event,
                        type: "text",
                        class: "input input-bordered w-full",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).project_name]
                      ])
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Müşteri Seçin")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                        class: "select select-bordered w-full",
                        required: ""
                      }, [
                        createVNode("option", {
                          disabled: "",
                          value: ""
                        }, "Bir müşteri seçin"),
                        (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                          return openBlock(), createBlock("option", {
                            key: customer.id,
                            value: customer.id
                          }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).customer_id]
                      ])
                    ]),
                    createVNode("div", { class: "divider" }, "Servisler"),
                    createVNode("div", { class: "form-control" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Servis Seçin")
                      ]),
                      !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
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
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-2 grid grid-cols-1 gap-2 md:grid-cols-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                          return openBlock(), createBlock("div", {
                            key: service.id,
                            class: "form-control"
                          }, [
                            createVNode("label", { class: "label cursor-pointer justify-start gap-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                value: service.id,
                                "onUpdate:modelValue": ($event) => unref(form).services = $event,
                                class: "checkbox checkbox-primary"
                              }, null, 8, ["value", "onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).services]
                              ]),
                              createVNode("span", { class: "label-text" }, toDisplayString(service.name), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(unref(Link), {
                        href: "/projects",
                        class: "btn btn-ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("İptal")
                        ]),
                        _: 1
                      }),
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-primary"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mr-1 h-5 w-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M5 13l4 4L19 7"
                          })
                        ])),
                        createTextVNode(" Projeyi Kaydet ")
                      ])
                    ])
                  ], 32)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c59045e"]]);
export {
  Screen as default
};
