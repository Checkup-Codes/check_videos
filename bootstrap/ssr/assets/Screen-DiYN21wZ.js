import { computed, ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
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
    const parentOptions = computed(() => props.services || []);
    const nameRef = ref(null);
    const slugRef = ref(null);
    const descriptionRef = ref(null);
    const priceRef = ref(null);
    const parentIdRef = ref(null);
    const errors = ref({
      name: "",
      slug: "",
      description: "",
      price: "",
      parent_id: ""
    });
    const form = useForm({
      name: "",
      slug: "",
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
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/services" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Yeni Servis Oluştur" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="space-y-4"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Servis Bilgileri</h3><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Servis Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Servis adı" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.name || unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.name || unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Servis Kısa Adı</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" placeholder="Servis kısa adı" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.slug || unref(form).errors.slug) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Servis Açıklaması</label><textarea rows="4" placeholder="Servis açıklaması" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }, "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (errors.value.description || unref(form).errors.description) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.description || unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Fiyat</label><div class="flex"${_scopeId}><input${ssrRenderAttr("value", unref(form).price)} type="number" placeholder="Fiyat" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }, "flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><span class="inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground"${_scopeId}> USD </span></div>`);
            if (errors.value.price || unref(form).errors.price) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.price || unref(form).errors.price)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Üst Kategori</label><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Üst kategori arayın ve seçin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (showDropdown.value && filteredCategories.value.length) {
              _push2(`<ul class="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"${_scopeId}><!--[-->`);
              ssrRenderList(filteredCategories.value, (parent) => {
                _push2(`<li class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"${_scopeId}>${ssrInterpolate(parent.name)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (errors.value.parent_id || unref(form).errors.parent_id) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.parent_id || unref(form).errors.parent_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex justify-end gap-2 border-t border-border pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/services",
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            _push2(`<button type="submit" class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Oluşturuluyor..." : "Servisi Oluştur")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/services" }),
              createVNode(_sfc_main$3, { title: "Yeni Servis Oluştur" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Servis Bilgileri"),
                      createVNode("div", {
                        ref_key: "nameRef",
                        ref: nameRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Servis Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Servis adı",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        errors.value.name || unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.name || unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "slugRef",
                        ref: slugRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Servis Kısa Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          type: "text",
                          placeholder: "Servis kısa adı",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).slug]
                        ]),
                        errors.value.slug || unref(form).errors.slug ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.slug || unref(form).errors.slug), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "descriptionRef",
                        ref: descriptionRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Servis Açıklaması"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "4",
                          placeholder: "Servis açıklaması",
                          class: ["flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        errors.value.description || unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.description || unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "priceRef",
                        ref: priceRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Fiyat"),
                        createVNode("div", { class: "flex" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).price = $event,
                            type: "number",
                            placeholder: "Fiyat",
                            class: ["flex h-9 flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.price || unref(form).errors.price }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).price]
                          ]),
                          createVNode("span", { class: "inline-flex h-9 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground" }, " USD ")
                        ]),
                        errors.value.price || unref(form).errors.price ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.price || unref(form).errors.price), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "parentIdRef",
                        ref: parentIdRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Üst Kategori"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            placeholder: "Üst kategori arayın ve seçin",
                            class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }],
                            onFocus: ($event) => showDropdown.value = true,
                            onBlur: hideDropdownWithDelay
                          }, null, 42, ["onUpdate:modelValue", "onFocus"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          showDropdown.value && filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                            key: 0,
                            class: "absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"
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
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.parent_id || unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                      ], 512)
                    ]),
                    createVNode("div", { class: "flex justify-end gap-2 border-t border-border pt-4" }, [
                      createVNode(unref(Link), {
                        href: "/services",
                        class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }),
                      createVNode("button", {
                        type: "submit",
                        class: "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Oluşturuluyor..." : "Servisi Oluştur"), 1)
                      ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
