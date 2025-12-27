import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-CJ7QJRBs.js";
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "EditJourney",
  __ssrInlineRender: true,
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };
    const form = useForm({
      entry_date: formatDateForInput(props.entry.entry_date),
      title: props.entry.title,
      description: props.entry.description || "",
      image: null,
      status: props.entry.status,
      _method: "PUT"
    });
    const imagePreview = ref(null);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };
    const handleDrop = (event) => {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };
    const clearImage = () => {
      form.image = null;
      imagePreview.value = null;
    };
    const submit = () => {
      form.post(`/journey/${props.entry.id}`, {
        forceFormData: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-2xl px-4 py-6 sm:px-6"${_scopeId}><form class="space-y-5"${_scopeId}><div${_scopeId}><label class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Başlık <span class="text-destructive"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.title }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}" placeholder="Bu günün başlığı..." required${_scopeId}>`);
            if (unref(form).errors.title) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}> Tarih <span class="text-destructive"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).entry_date)} type="date" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.entry_date }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}" required${_scopeId}>`);
            if (unref(form).errors.entry_date) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.entry_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}>Açıklama</label><textarea rows="5" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.description }, "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}" placeholder="Bu gün hakkında notlarınız..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}>Görsel</label><div class="relative flex min-h-[140px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"${_scopeId}><input type="file" accept="image/*" class="hidden"${_scopeId}>`);
            if (!imagePreview.value && !__props.entry.image) {
              _push2(`<div class="text-center p-4"${_scopeId}><svg class="mx-auto h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><p class="mt-2 text-sm text-muted-foreground"${_scopeId}>Tıklayın veya sürükleyin</p></div>`);
            } else {
              _push2(`<img${ssrRenderAttr("src", imagePreview.value || `/storage/${__props.entry.image}`)} alt="Preview" class="h-full max-h-[200px] w-full rounded-md object-cover"${_scopeId}>`);
            }
            _push2(`</div>`);
            if (imagePreview.value || __props.entry.image) {
              _push2(`<button type="button" class="mt-2 text-xs text-destructive hover:underline"${_scopeId}> Görseli Kaldır </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.image) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.image)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1.5 block text-sm font-medium text-foreground"${_scopeId}>Durum</label><div class="flex gap-4"${_scopeId}><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "published")) ? " checked" : ""} value="published" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Yayınla</span></label><label class="flex cursor-pointer items-center gap-2"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "draft")) ? " checked" : ""} value="draft" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId}><span class="text-sm text-foreground"${_scopeId}>Taslak</span></label></div></div><div class="flex items-center justify-end gap-3 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/journey/${__props.entry.id}`,
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Güncelleniyor..." : "Güncelle")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-2xl px-4 py-6 sm:px-6" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-5"
                }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-1.5 block text-sm font-medium text-foreground" }, [
                      createTextVNode(" Başlık "),
                      createVNode("span", { class: "text-destructive" }, "*")
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).title = $event,
                      type: "text",
                      class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", { "border-destructive": unref(form).errors.title }],
                      placeholder: "Bu günün başlığı...",
                      required: ""
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).title]
                    ]),
                    unref(form).errors.title ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-1 text-xs text-destructive"
                    }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-1.5 block text-sm font-medium text-foreground" }, [
                      createTextVNode(" Tarih "),
                      createVNode("span", { class: "text-destructive" }, "*")
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).entry_date = $event,
                      type: "date",
                      class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", { "border-destructive": unref(form).errors.entry_date }],
                      required: ""
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).entry_date]
                    ]),
                    unref(form).errors.entry_date ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-1 text-xs text-destructive"
                    }, toDisplayString(unref(form).errors.entry_date), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-1.5 block text-sm font-medium text-foreground" }, "Açıklama"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      rows: "5",
                      class: ["flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", { "border-destructive": unref(form).errors.description }],
                      placeholder: "Bu gün hakkında notlarınız..."
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    unref(form).errors.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-1 text-xs text-destructive"
                    }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-1.5 block text-sm font-medium text-foreground" }, "Görsel"),
                    createVNode("div", {
                      class: "relative flex min-h-[140px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50",
                      onClick: ($event) => _ctx.$refs.imageInput.click(),
                      onDragover: withModifiers(() => {
                      }, ["prevent"]),
                      onDrop: withModifiers(handleDrop, ["prevent"])
                    }, [
                      createVNode("input", {
                        ref: "imageInput",
                        type: "file",
                        accept: "image/*",
                        onChange: handleImageChange,
                        class: "hidden"
                      }, null, 544),
                      !imagePreview.value && !__props.entry.image ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center p-4"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mx-auto h-10 w-10 text-muted-foreground",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "1.5",
                            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          })
                        ])),
                        createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, "Tıklayın veya sürükleyin")
                      ])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: imagePreview.value || `/storage/${__props.entry.image}`,
                        alt: "Preview",
                        class: "h-full max-h-[200px] w-full rounded-md object-cover"
                      }, null, 8, ["src"]))
                    ], 40, ["onClick", "onDragover"]),
                    imagePreview.value || __props.entry.image ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      onClick: clearImage,
                      class: "mt-2 text-xs text-destructive hover:underline"
                    }, " Görseli Kaldır ")) : createCommentVNode("", true),
                    unref(form).errors.image ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "mt-1 text-xs text-destructive"
                    }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "mb-1.5 block text-sm font-medium text-foreground" }, "Durum"),
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
                  createVNode("div", { class: "flex items-center justify-end gap-3 pt-2" }, [
                    createVNode(unref(Link), {
                      href: `/journey/${__props.entry.id}`,
                      class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                    }, [
                      unref(form).processing ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "h-4 w-4 animate-spin",
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
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Güncelleniyor..." : "Güncelle"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/EditJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
