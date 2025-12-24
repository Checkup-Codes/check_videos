import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, Fragment, renderList, toDisplayString, withDirectives, vModelRadio, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "CreateWorkspace",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      images: [],
      status: "published",
      products: []
    });
    const imagePreviews = ref([]);
    const handleImagesChange = (event) => {
      const files = Array.from(event.target.files);
      form.images = files;
      imagePreviews.value = files.map((file) => URL.createObjectURL(file));
    };
    const removeImage = (index) => {
      form.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };
    const addProduct = () => {
      form.products.push({
        name: "",
        features: "",
        link: ""
      });
    };
    const removeProduct = (index) => {
      form.products.splice(index, 1);
    };
    const submit = () => {
      const formData = new FormData();
      form.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      formData.append("status", form.status);
      form.products.forEach((product, index) => {
        formData.append(`products[${index}][name]`, product.name);
        if (product.features) formData.append(`products[${index}][features]`, product.features);
        if (product.link) formData.append(`products[${index}][link]`, product.link);
      });
      form.transform(() => formData).post("/workspace", {
        forceFormData: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl py-8"${_scopeId}><div class="mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/workspace",
              class: "mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg> Geri `);
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
                    createTextVNode(" Geri ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-3xl font-bold tracking-tight text-foreground"${_scopeId}>Yeni Çalışma Alanı</h1><p class="mt-2 text-muted-foreground"${_scopeId}>Çalışma alanınızı ve ürünlerinizi ekleyin.</p></div><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="images" class="mb-2 block text-sm font-medium text-foreground"${_scopeId}> Resimler </label><div class="relative"${_scopeId}><input id="images" type="file" accept="image/*" multiple class="w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"${_scopeId}></div>`);
            if (imagePreviews.value.length > 0) {
              _push2(`<div class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(imagePreviews.value, (preview, index) => {
                _push2(`<div class="relative group"${_scopeId}><img${ssrRenderAttr("src", preview)} alt="Preview" class="h-32 w-full rounded-lg border border-border object-cover"${_scopeId}><button type="button" class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.images) {
              _push2(`<p class="mt-1 text-sm text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.images)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId}>Durum</label><div class="flex gap-4"${_scopeId}><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "published")) ? " checked" : ""} value="published" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Yayınla</span></label><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "draft")) ? " checked" : ""} value="draft" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Taslak</span></label></div></div><div class="rounded-lg border border-border bg-card p-6"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Ürünler</h2><button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Ürün Ekle </button></div>`);
            if (unref(form).products.length === 0) {
              _push2(`<div class="py-8 text-center text-sm text-muted-foreground"${_scopeId}> Henüz ürün eklenmedi. </div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).products, (product, index) => {
                _push2(`<div class="rounded-lg border border-border bg-background p-4"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-sm font-medium text-foreground"${_scopeId}>Ürün ${ssrInterpolate(index + 1)}</h3><button type="button" class="rounded-lg p-1.5 text-destructive transition-colors hover:bg-destructive/10"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label${ssrRenderAttr("for", `product-name-${index}`)} class="mb-1 block text-xs font-medium text-foreground"${_scopeId}> İsim <span class="text-destructive"${_scopeId}>*</span></label><input${ssrRenderAttr("id", `product-name-${index}`)}${ssrRenderAttr("value", product.name)} type="text" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ürün adı" required${_scopeId}></div><div${_scopeId}><label${ssrRenderAttr("for", `product-features-${index}`)} class="mb-1 block text-xs font-medium text-foreground"${_scopeId}> Özellikler </label><textarea${ssrRenderAttr("id", `product-features-${index}`)} rows="3" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ürün özelliklerini buraya yazın..."${_scopeId}>${ssrInterpolate(product.features)}</textarea></div><div${_scopeId}><label${ssrRenderAttr("for", `product-link-${index}`)} class="mb-1 block text-xs font-medium text-foreground"${_scopeId}> Satın Alma Linki </label><input${ssrRenderAttr("id", `product-link-${index}`)}${ssrRenderAttr("value", product.link)} type="url" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://..."${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div class="flex items-center gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/workspace",
              class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode(unref(Link), {
                    href: "/workspace",
                    class: "mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
                      createTextVNode(" Geri ")
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "text-3xl font-bold tracking-tight text-foreground" }, "Yeni Çalışma Alanı"),
                  createVNode("p", { class: "mt-2 text-muted-foreground" }, "Çalışma alanınızı ve ürünlerinizi ekleyin.")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "images",
                      class: "mb-2 block text-sm font-medium text-foreground"
                    }, " Resimler "),
                    createVNode("div", { class: "relative" }, [
                      createVNode("input", {
                        id: "images",
                        type: "file",
                        accept: "image/*",
                        multiple: "",
                        onChange: handleImagesChange,
                        class: "w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                      }, null, 32)
                    ]),
                    imagePreviews.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(imagePreviews.value, (preview, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "relative group"
                        }, [
                          createVNode("img", {
                            src: preview,
                            alt: "Preview",
                            class: "h-32 w-full rounded-lg border border-border object-cover"
                          }, null, 8, ["src"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => removeImage(index),
                            class: "absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          }, [
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
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    unref(form).errors.images ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "mt-1 text-sm text-destructive"
                    }, toDisplayString(unref(form).errors.images), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Durum"),
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("label", { class: "flex cursor-pointer items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          value: "published",
                          class: "h-4 w-4 border-input text-primary focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(form).status]
                        ]),
                        createVNode("span", { class: "text-sm text-foreground" }, "Yayınla")
                      ]),
                      createVNode("label", { class: "flex cursor-pointer items-center gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          value: "draft",
                          class: "h-4 w-4 border-input text-primary focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, unref(form).status]
                        ]),
                        createVNode("span", { class: "text-sm text-foreground" }, "Taslak")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-6" }, [
                    createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Ürünler"),
                      createVNode("button", {
                        type: "button",
                        onClick: addProduct,
                        class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      }, [
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
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Ürün Ekle ")
                      ])
                    ]),
                    unref(form).products.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-8 text-center text-sm text-muted-foreground"
                    }, " Henüz ürün eklenmedi. ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).products, (product, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "rounded-lg border border-border bg-background p-4"
                        }, [
                          createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-sm font-medium text-foreground" }, "Ürün " + toDisplayString(index + 1), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeProduct(index),
                              class: "rounded-lg p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                            }, [
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
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: `product-name-${index}`,
                                class: "mb-1 block text-xs font-medium text-foreground"
                              }, [
                                createTextVNode(" İsim "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ], 8, ["for"]),
                              withDirectives(createVNode("input", {
                                id: `product-name-${index}`,
                                "onUpdate:modelValue": ($event) => product.name = $event,
                                type: "text",
                                class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                                placeholder: "Ürün adı",
                                required: ""
                              }, null, 8, ["id", "onUpdate:modelValue"]), [
                                [vModelText, product.name]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: `product-features-${index}`,
                                class: "mb-1 block text-xs font-medium text-foreground"
                              }, " Özellikler ", 8, ["for"]),
                              withDirectives(createVNode("textarea", {
                                id: `product-features-${index}`,
                                "onUpdate:modelValue": ($event) => product.features = $event,
                                rows: "3",
                                class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                                placeholder: "Ürün özelliklerini buraya yazın..."
                              }, null, 8, ["id", "onUpdate:modelValue"]), [
                                [vModelText, product.features]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: `product-link-${index}`,
                                class: "mb-1 block text-xs font-medium text-foreground"
                              }, " Satın Alma Linki ", 8, ["for"]),
                              withDirectives(createVNode("input", {
                                id: `product-link-${index}`,
                                "onUpdate:modelValue": ($event) => product.link = $event,
                                type: "url",
                                class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                                placeholder: "https://..."
                              }, null, 8, ["id", "onUpdate:modelValue"]), [
                                [vModelText, product.link]
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "flex items-center gap-3 pt-4" }, [
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
                      ])) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 1)
                    ], 8, ["disabled"]),
                    createVNode(unref(Link), {
                      href: "/workspace",
                      class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Workspace/CreateWorkspace.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
