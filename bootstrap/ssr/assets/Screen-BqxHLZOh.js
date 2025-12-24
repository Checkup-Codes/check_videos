import { computed, ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const service = computed(() => props.service || {});
    const errors = ref({
      name: "",
      description: "",
      price: "",
      parent_id: ""
    });
    const serviceId = computed(() => service.value.id);
    const form = useForm({
      name: service.value.name || "",
      description: service.value.description || "",
      price: service.value.price || null,
      parent_id: service.value.sub_category_id || null
    });
    form.processing = false;
    const parentOptions = computed(() => {
      return (props.services || []).filter((s) => s.id !== serviceId.value);
    });
    const handleSubmit = () => {
      form.put(`/services/${serviceId.value}`, {
        onSuccess: () => {
          router.visit("/services");
        },
        onError: (serverErrors) => {
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              if (errors.value.hasOwnProperty(key)) {
                errors.value[key] = serverErrors[key];
              }
            });
          }
        }
      });
    };
    const deleteService = () => {
      if (confirm("Bu servisi silmek istediğinize emin misiniz?")) {
        router.delete(`/services/${serviceId.value}`, {
          onSuccess: () => {
            router.visit("/services");
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl font-semibold text-foreground"${_scopeId}>Servisi Düzenle</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(service.value.name)}</p></div><form class="space-y-6"${_scopeId}><div class="rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Servis Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Örn: Web Geliştirme" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.name || unref(form).errors.name) {
              _push2(`<p class="mt-1.5 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.name || unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Açıklama</label><textarea rows="8" placeholder="Servis hakkında detaylı açıklama yazabilirsiniz..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }, "flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description || unref(form).errors.description) {
              _push2(`<p class="mt-1.5 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.description || unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 gap-5 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Fiyat</label><div class="relative"${_scopeId}><input${ssrRenderAttr("value", unref(form).price)} type="number" step="0.01" placeholder="0.00" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"${_scopeId}>₺</span></div>`);
            if (errors.value.price || unref(form).errors.price) {
              _push2(`<p class="mt-1.5 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.price || unref(form).errors.price)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Üst Kategori</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, null) : ssrLooseEqual(unref(form).parent_id, null)) ? " selected" : ""}${_scopeId}>Yok</option><!--[-->`);
            ssrRenderList(parentOptions.value, (parent) => {
              _push2(`<option${ssrRenderAttr("value", parent.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, parent.id) : ssrLooseEqual(unref(form).parent_id, parent.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(parent.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.parent_id || unref(form).errors.parent_id) {
              _push2(`<p class="mt-1.5 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.parent_id || unref(form).errors.parent_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="flex items-center justify-between gap-3"${_scopeId}><button type="button" class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Sil </button><div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/services/${serviceId.value}`,
              class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            _push2(`<button type="submit" class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h1", { class: "text-2xl font-semibold text-foreground" }, "Servisi Düzenle"),
                  createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(service.value.name), 1)
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-6 shadow-sm" }, [
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Servis Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Örn: Web Geliştirme",
                          class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        errors.value.name || unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1.5 text-xs text-destructive"
                        }, toDisplayString(errors.value.name || unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Açıklama"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "8",
                          placeholder: "Servis hakkında detaylı açıklama yazabilirsiniz...",
                          class: ["flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y", { "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        errors.value.description || unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1.5 text-xs text-destructive"
                        }, toDisplayString(errors.value.description || unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Fiyat"),
                          createVNode("div", { class: "relative" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).price = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "0.00",
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).price]
                            ]),
                            createVNode("span", { class: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "₺")
                          ]),
                          errors.value.price || unref(form).errors.price ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1.5 text-xs text-destructive"
                          }, toDisplayString(errors.value.price || unref(form).errors.price), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Üst Kategori"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                            class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }]
                          }, [
                            createVNode("option", { value: null }, "Yok"),
                            (openBlock(true), createBlock(Fragment, null, renderList(parentOptions.value, (parent) => {
                              return openBlock(), createBlock("option", {
                                key: parent.id,
                                value: parent.id
                              }, toDisplayString(parent.name), 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).parent_id]
                          ]),
                          errors.value.parent_id || unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1.5 text-xs text-destructive"
                          }, toDisplayString(errors.value.parent_id || unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                    createVNode("button", {
                      onClick: withModifiers(deleteService, ["prevent"]),
                      type: "button",
                      class: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        })
                      ])),
                      createTextVNode(" Sil ")
                    ]),
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode(unref(Link), {
                        href: `/services/${serviceId.value}`,
                        class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        disabled: unref(form).processing
                      }, [
                        unref(form).processing ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "h-4 w-4 animate-spin",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])) : (openBlock(), createBlock("svg", {
                          key: 1,
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M5 13l4 4L19 7"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 1)
                      ], 8, ["disabled"])
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
