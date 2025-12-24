import { computed, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const parentOptions = computed(() => props.services || []);
    const errors = ref({
      name: "",
      slug: "",
      description: "",
      price: "",
      parent_id: ""
    });
    const form = useForm({
      name: "",
      description: "",
      price: null,
      parent_id: null
    });
    form.processing = false;
    const searchQuery = ref("");
    const showDropdown = ref(false);
    const filteredCategories = computed(() => {
      if (!searchQuery.value) return parentOptions.value;
      return parentOptions.value.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const selectParent = (parent) => {
      form.parent_id = parent.id;
      searchQuery.value = parent.name;
      showDropdown.value = false;
    };
    const hideDropdownWithDelay = () => {
      setTimeout(() => {
        showDropdown.value = false;
      }, 200);
    };
    const handleSubmit = () => {
      form.post("/services", {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services",
              class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg> Servislere Dön `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 19l-7-7 7-7"
                      })
                    ])),
                    createTextVNode(" Servislere Dön ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="mt-4 text-2xl font-semibold text-foreground"${_scopeId}>Yeni Servis</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Yeni bir servis oluşturun</p></div><form class="space-y-6"${_scopeId}><div class="rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><div class="space-y-5"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Servis Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Örn: Web Geliştirme" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
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
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Üst Kategori</label><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ara ve seç..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (showDropdown.value && filteredCategories.value.length) {
              _push2(`<ul class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-lg"${_scopeId}><!--[-->`);
              ssrRenderList(filteredCategories.value, (parent) => {
                _push2(`<li class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"${_scopeId}>${ssrInterpolate(parent.name)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (errors.value.parent_id || unref(form).errors.parent_id) {
              _push2(`<p class="mt-1.5 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.parent_id || unref(form).errors.parent_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="flex items-center justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services",
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
            _push2(` ${ssrInterpolate(unref(form).processing ? "Oluşturuluyor..." : "Oluştur")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode(unref(Link), {
                    href: "/services",
                    class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 19l-7-7 7-7"
                        })
                      ])),
                      createTextVNode(" Servislere Dön ")
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "mt-4 text-2xl font-semibold text-foreground" }, "Yeni Servis"),
                  createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Yeni bir servis oluşturun")
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
                          createVNode("div", { class: "relative" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              type: "text",
                              placeholder: "Ara ve seç...",
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }],
                              onFocus: ($event) => showDropdown.value = true,
                              onBlur: hideDropdownWithDelay
                            }, null, 42, ["onUpdate:modelValue", "onFocus"]), [
                              [vModelText, searchQuery.value]
                            ]),
                            showDropdown.value && filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                              key: 0,
                              class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-lg"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredCategories.value, (parent) => {
                                return openBlock(), createBlock("li", {
                                  key: parent.id,
                                  onMousedown: withModifiers(($event) => selectParent(parent), ["prevent"]),
                                  class: "cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                }, toDisplayString(parent.name), 41, ["onMousedown"]);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          errors.value.parent_id || unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1.5 text-xs text-destructive"
                          }, toDisplayString(errors.value.parent_id || unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                    createVNode(unref(Link), {
                      href: "/services",
                      class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }),
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
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Oluşturuluyor..." : "Oluştur"), 1)
                    ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
