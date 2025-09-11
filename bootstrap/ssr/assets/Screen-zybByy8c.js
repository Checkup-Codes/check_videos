import { computed, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BIqwcPls.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
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
    const customers = computed(() => props.customers || []);
    const project = computed(() => props.project || {});
    const form = useForm({
      project_name: project.value.project_name || "",
      customer_id: project.value.customer_id || "",
      services: project.value.services ? project.value.services.map((service) => service.id) : []
    });
    const handleSubmit = () => {
      form.put(`/projects/${project.value.id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              url: `/projects/${project.value.id}`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Projeyi Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-d13e4fce${_scopeId}><div class="card-body p-6" data-v-d13e4fce${_scopeId}><form class="space-y-6" data-v-d13e4fce${_scopeId}><div class="divider" data-v-d13e4fce${_scopeId}>Proje Bilgileri</div><div class="form-control w-full" data-v-d13e4fce${_scopeId}><label class="label" data-v-d13e4fce${_scopeId}><span class="label-text" data-v-d13e4fce${_scopeId}>Proje Adı</span></label><input${ssrRenderAttr("value", unref(form).project_name)} type="text" class="input-bordered input w-full" required data-v-d13e4fce${_scopeId}></div><div class="form-control w-full" data-v-d13e4fce${_scopeId}><label class="label" data-v-d13e4fce${_scopeId}><span class="label-text" data-v-d13e4fce${_scopeId}>Müşteri Seçin</span></label><select class="select-bordered select w-full" required data-v-d13e4fce${_scopeId}><option disabled value="" data-v-d13e4fce${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}${_scopeId}>Bir müşteri seçin</option><!--[-->`);
            ssrRenderList(customers.value, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)} data-v-d13e4fce${_scopeId}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="divider" data-v-d13e4fce${_scopeId}>Servisler</div><div class="form-control" data-v-d13e4fce${_scopeId}><label class="label" data-v-d13e4fce${_scopeId}><span class="label-text" data-v-d13e4fce${_scopeId}>Servis Seçin</span></label>`);
            if (!services.value || services.value.length === 0) {
              _push2(`<div class="alert alert-info" data-v-d13e4fce${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-d13e4fce${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d13e4fce${_scopeId}></path></svg><span data-v-d13e4fce${_scopeId}>Henüz servis bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2" data-v-d13e4fce${_scopeId}><!--[-->`);
            ssrRenderList(services.value, (service) => {
              _push2(`<div class="form-control" data-v-d13e4fce${_scopeId}><label class="label cursor-pointer justify-start gap-2" data-v-d13e4fce${_scopeId}><input type="checkbox"${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).services) ? ssrLooseContain(unref(form).services, service.id) : unref(form).services) ? " checked" : ""} class="checkbox checkbox-primary" data-v-d13e4fce${_scopeId}><span class="label-text" data-v-d13e4fce${_scopeId}>${ssrInterpolate(service.name)}</span></label></div>`);
            });
            _push2(`<!--]--></div></div><div class="divider" data-v-d13e4fce${_scopeId}></div><div class="flex justify-end gap-2" data-v-d13e4fce${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/projects/${project.value.id}`,
              class: "btn btn-ghost"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`İptal`);
                } else {
                  return [
                    createTextVNode("İptal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="btn btn-primary" data-v-d13e4fce${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d13e4fce${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-d13e4fce${_scopeId}></path></svg> Projeyi Güncelle </button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                url: `/projects/${project.value.id}`
              }, null, 8, ["url"]),
              createVNode(_sfc_main$3, { title: "Projeyi Düzenle" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
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
                        class: "input-bordered input w-full",
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
                        class: "select-bordered select w-full",
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
                        href: `/projects/${project.value.id}`,
                        class: "btn btn-ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("İptal")
                        ]),
                        _: 1
                      }, 8, ["href"]),
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
                        createTextVNode(" Projeyi Güncelle ")
                      ])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d13e4fce"]]);
export {
  Screen as default
};
