import { ref, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const form = useForm({
      name: "",
      description: "",
      my_comment: "",
      extended_comment_link: "",
      link: "",
      preview_image: "",
      bookmark_category_id: "",
      order: 0
    });
    const categoryRef = ref(null);
    const nameRef = ref(null);
    const linkRef = ref(null);
    const previewImageRef = ref(null);
    const descriptionRef = ref(null);
    const myCommentRef = ref(null);
    const extendedCommentLinkRef = ref(null);
    const fetchPreviewImage = () => {
    };
    const submit = () => {
      form.post("/bookmarks", {
        onError: (errors) => {
          var _a;
          console.error("Create errors:", errors);
          const firstErrorField = Object.keys(errors)[0];
          const refMap = {
            bookmark_category_id: categoryRef,
            name: nameRef,
            link: linkRef,
            preview_image: previewImageRef,
            description: descriptionRef,
            my_comment: myCommentRef,
            extended_comment_link: extendedCommentLinkRef
          };
          if ((_a = refMap[firstErrorField]) == null ? void 0 : _a.value) {
            refMap[firstErrorField].value.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4 py-6"${_scopeId}><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}> Kategori <span class="text-destructive"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.bookmark_category_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).bookmark_category_id) ? ssrLooseContain(unref(form).bookmark_category_id, "") : ssrLooseEqual(unref(form).bookmark_category_id, "")) ? " selected" : ""}${_scopeId}>Kategori Seçin</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).bookmark_category_id) ? ssrLooseContain(unref(form).bookmark_category_id, category.id) : ssrLooseEqual(unref(form).bookmark_category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.bookmark_category_id) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.bookmark_category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}> İsim <span class="text-destructive"${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).name)} placeholder="Yer imi adı" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}> Link <span class="text-destructive"${_scopeId}>*</span></label><input type="url"${ssrRenderAttr("value", unref(form).link)} placeholder="https://..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.link }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (unref(form).errors.link) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.link)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Ön İzleme Resmi (URL)</label><input type="url"${ssrRenderAttr("value", unref(form).preview_image)} placeholder="https://..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.preview_image }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (unref(form).errors.preview_image) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.preview_image)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId}> Link&#39;ten otomatik olarak alınabilir veya manuel olarak eklenebilir </p></div></div><div class="md:col-span-2"${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Açıklama</label><textarea placeholder="Kısa açıklama..." rows="2" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.description }, "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="md:col-span-2"${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Kendi Yorumum</label><textarea placeholder="Bu yer imi hakkındaki düşünceleriniz, notlarınız..." rows="4" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.my_comment }, "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>${ssrInterpolate(unref(form).my_comment)}</textarea>`);
            if (unref(form).errors.my_comment) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.my_comment)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="md:col-span-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Genişletilmiş Yorum Linki</label><input type="url"${ssrRenderAttr("value", unref(form).extended_comment_link)} placeholder="https://..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.extended_comment_link }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}>`);
            if (unref(form).errors.extended_comment_link) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(form).errors.extended_comment_link)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId}> Bu yer imi ile ilgili detaylı yorumunuzun veya referansınızın linki </p></div></div></div><div class="flex justify-end gap-2 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/bookmarks",
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              disabled: unref(form).processing
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
            _push2(`<button type="submit" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="mr-1 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4 py-6" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "categoryRef",
                      ref: categoryRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                          createTextVNode(" Kategori "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).bookmark_category_id = $event,
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.bookmark_category_id }],
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Kategori Seçin"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).bookmark_category_id]
                        ]),
                        unref(form).errors.bookmark_category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.bookmark_category_id), 1)) : createCommentVNode("", true)
                      ])
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "nameRef",
                      ref: nameRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                          createTextVNode(" İsim "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Yer imi adı",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ])
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "linkRef",
                      ref: linkRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                          createTextVNode(" Link "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "url",
                          "onUpdate:modelValue": ($event) => unref(form).link = $event,
                          placeholder: "https://...",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.link }],
                          required: "",
                          onBlur: fetchPreviewImage
                        }, null, 42, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).link]
                        ]),
                        unref(form).errors.link ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.link), 1)) : createCommentVNode("", true)
                      ])
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "previewImageRef",
                      ref: previewImageRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Ön İzleme Resmi (URL)"),
                        withDirectives(createVNode("input", {
                          type: "url",
                          "onUpdate:modelValue": ($event) => unref(form).preview_image = $event,
                          placeholder: "https://...",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.preview_image }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).preview_image]
                        ]),
                        unref(form).errors.preview_image ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.preview_image), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Link'ten otomatik olarak alınabilir veya manuel olarak eklenebilir ")
                      ])
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "descriptionRef",
                      ref: descriptionRef
                    }, [
                      createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Açıklama"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        placeholder: "Kısa açıklama...",
                        rows: "2",
                        class: ["flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.description }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(form).errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-destructive"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "myCommentRef",
                      ref: myCommentRef
                    }, [
                      createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Kendi Yorumum"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).my_comment = $event,
                        placeholder: "Bu yer imi hakkındaki düşünceleriniz, notlarınız...",
                        rows: "4",
                        class: ["flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.my_comment }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).my_comment]
                      ]),
                      unref(form).errors.my_comment ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-destructive"
                      }, toDisplayString(unref(form).errors.my_comment), 1)) : createCommentVNode("", true)
                    ], 512),
                    createVNode("div", {
                      class: "md:col-span-2",
                      ref_key: "extendedCommentLinkRef",
                      ref: extendedCommentLinkRef
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Genişletilmiş Yorum Linki"),
                        withDirectives(createVNode("input", {
                          type: "url",
                          "onUpdate:modelValue": ($event) => unref(form).extended_comment_link = $event,
                          placeholder: "https://...",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.extended_comment_link }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).extended_comment_link]
                        ]),
                        unref(form).errors.extended_comment_link ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(unref(form).errors.extended_comment_link), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Bu yer imi ile ilgili detaylı yorumunuzun veya referansınızın linki ")
                      ])
                    ], 512)
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                    createVNode(unref(Link), {
                      href: "/bookmarks",
                      class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" İptal ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("button", {
                      type: "submit",
                      class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
                      disabled: unref(form).processing
                    }, [
                      unref(form).processing ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "mr-1 h-4 w-4 animate-spin",
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
                        class: "mr-1 h-4 w-4",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
