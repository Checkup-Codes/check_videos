import { ref, watch, unref, withCtx, createVNode, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import "./Badge-BLykgubL.js";
import "./Button-DRijrITN.js";
import "./Card-qmctt-Ej.js";
import _sfc_main$2 from "./Form-DLTsfASe.js";
import "./ItemList-BMhf5pOx.js";
import _sfc_main$4 from "./RichTextEditor-Dw4E-YzI.js";
import _sfc_main$3 from "./TextField-C0ZHhnba.js";
import _sfc_main$1 from "./KeyboardShortcutDisabler-CZ9a0rUV.js";
import "quill";
/* empty css                    */
const _sfc_main = {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = props.write;
    const categories = ref(props.categories);
    const form = useForm({
      title: write.title,
      slug: write.slug,
      content: write.content,
      summary: write.summary,
      status: write.status,
      category_id: write.category_id,
      cover_image: write.cover_image,
      seo_keywords: write.seo_keywords,
      tags: write.tags,
      views_count: write.views_count,
      hasDraw: write.hasDraw ? true : false
    });
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      summary: "",
      category_id: "",
      status: "",
      cover_image: "",
      seo_keywords: "",
      tags: "",
      views_count: "",
      hasDraw: ""
    });
    const validateForm = () => {
      errors.value.title = form.title ? "" : "Başlık zorunludur.";
      errors.value.slug = form.slug ? "" : "Slug zorunludur.";
      errors.value.content = form.content ? "" : "İçerik zorunludur.";
      errors.value.summary = form.summary ? "" : "Özet zorunludur.";
      errors.value.category_id = form.category_id ? "" : "Kategori seçilmelidir.";
      errors.value.status = form.status ? "" : "Durum seçilmelidir.";
    };
    const updateWrite = () => {
      validateForm();
      if (!Object.values(errors.value).some((error) => error !== "")) {
        form.put(route("writes.update", write.id), {
          onSuccess: () => {
            router.visit(route("dashboard"));
          },
          onError: (errors2) => {
            console.error("Form submission errors:", errors2);
          }
        });
      }
    };
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              title: "Yazıyı Güncelle",
              submitText: "Güncelle",
              loading: unref(form).processing,
              onSubmit: updateWrite
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId2}><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    label: "Başlık",
                    placeholder: "Yazının başlığını girin",
                    error: errors.value.title || unref(form).errors.title
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).slug,
                    "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                    label: "Slug",
                    placeholder: "örnek-yazı-slug",
                    error: errors.value.slug || unref(form).errors.slug
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).summary,
                    "onUpdate:modelValue": ($event) => unref(form).summary = $event,
                    label: "Özet",
                    type: "textarea",
                    rows: "3",
                    placeholder: "Yazının kısa özeti",
                    error: errors.value.summary || unref(form).errors.summary
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    modelValue: unref(form).content,
                    "onUpdate:modelValue": ($event) => unref(form).content = $event,
                    label: "İçerik",
                    height: "400px",
                    error: errors.value.content || unref(form).errors.content
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Kategori</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.category_id || unref(form).errors.category_id }, "select select-bordered w-full"])}"${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId2}>Kategori seç</option><!--[-->`);
                  ssrRenderList(categories.value, (category) => {
                    _push3(`<option${ssrRenderAttr("value", category.id)}${_scopeId2}>${ssrInterpolate(category.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                  if (errors.value.category_id || unref(form).errors.category_id) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Durumu</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.status || unref(form).errors.status }, "select select-bordered w-full"])}"${_scopeId2}><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId2}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}${_scopeId2}>Yayında</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}${_scopeId2}>Gizli</option></select>`);
                  if (errors.value.status || unref(form).errors.status) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.status || unref(form).errors.status)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).cover_image,
                    "onUpdate:modelValue": ($event) => unref(form).cover_image = $event,
                    label: "Kapak Resmi URL",
                    placeholder: "https://example.com/image.jpg",
                    error: errors.value.cover_image || unref(form).errors.cover_image
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).tags,
                    "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                    label: "Etiketler",
                    placeholder: "etiket1, etiket2, etiket3",
                    error: errors.value.tags || unref(form).errors.tags
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).seo_keywords,
                    "onUpdate:modelValue": ($event) => unref(form).seo_keywords = $event,
                    label: "SEO Anahtar Kelimeleri",
                    placeholder: "anahtar1, anahtar2, anahtar3",
                    error: errors.value.seo_keywords || unref(form).errors.seo_keywords
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: unref(form).views_count,
                    "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
                    label: "Görüntülenme Sayısı",
                    type: "number",
                    readonly: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center space-x-2"${_scopeId2}><label class="label cursor-pointer justify-start gap-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="checkbox checkbox-primary"${_scopeId2}><span class="label-text"${_scopeId2}>Çizim İçerir</span></label></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          label: "Başlık",
                          placeholder: "Yazının başlığını girin",
                          error: errors.value.title || unref(form).errors.title
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).slug,
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          label: "Slug",
                          placeholder: "örnek-yazı-slug",
                          error: errors.value.slug || unref(form).errors.slug
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).summary,
                          "onUpdate:modelValue": ($event) => unref(form).summary = $event,
                          label: "Özet",
                          type: "textarea",
                          rows: "3",
                          placeholder: "Yazının kısa özeti",
                          error: errors.value.summary || unref(form).errors.summary
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode(unref(_sfc_main$4), {
                          modelValue: unref(form).content,
                          "onUpdate:modelValue": ($event) => unref(form).content = $event,
                          label: "İçerik",
                          height: "400px",
                          error: errors.value.content || unref(form).errors.content
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Kategori")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                          class: ["select select-bordered w-full", { "select-error": errors.value.category_id || unref(form).errors.category_id }]
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Kategori seç"),
                          (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).category_id]
                        ]),
                        errors.value.category_id || unref(form).errors.category_id ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.category_id || unref(form).errors.category_id), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Durumu")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          class: ["select select-bordered w-full", { "select-error": errors.value.status || unref(form).errors.status }]
                        }, [
                          createVNode("option", { value: "draft" }, "Şablon"),
                          createVNode("option", { value: "published" }, "Yayında"),
                          createVNode("option", { value: "private" }, "Gizli")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).status]
                        ]),
                        errors.value.status || unref(form).errors.status ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.status || unref(form).errors.status), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).cover_image,
                          "onUpdate:modelValue": ($event) => unref(form).cover_image = $event,
                          label: "Kapak Resmi URL",
                          placeholder: "https://example.com/image.jpg",
                          error: errors.value.cover_image || unref(form).errors.cover_image
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).tags,
                          "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                          label: "Etiketler",
                          placeholder: "etiket1, etiket2, etiket3",
                          error: errors.value.tags || unref(form).errors.tags
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).seo_keywords,
                          "onUpdate:modelValue": ($event) => unref(form).seo_keywords = $event,
                          label: "SEO Anahtar Kelimeleri",
                          placeholder: "anahtar1, anahtar2, anahtar3",
                          error: errors.value.seo_keywords || unref(form).errors.seo_keywords
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$3), {
                          modelValue: unref(form).views_count,
                          "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
                          label: "Görüntülenme Sayısı",
                          type: "number",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode("label", { class: "label cursor-pointer justify-start gap-2" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => unref(form).hasDraw = $event,
                            class: "checkbox checkbox-primary"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).hasDraw]
                          ]),
                          createVNode("span", { class: "label-text" }, "Çizim İçerir")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), {
                title: "Yazıyı Güncelle",
                submitText: "Güncelle",
                loading: unref(form).processing,
                onSubmit: updateWrite
              }, {
                icon: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ]))
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).title,
                        "onUpdate:modelValue": ($event) => unref(form).title = $event,
                        label: "Başlık",
                        placeholder: "Yazının başlığını girin",
                        error: errors.value.title || unref(form).errors.title
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).slug,
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        label: "Slug",
                        placeholder: "örnek-yazı-slug",
                        error: errors.value.slug || unref(form).errors.slug
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).summary,
                        "onUpdate:modelValue": ($event) => unref(form).summary = $event,
                        label: "Özet",
                        type: "textarea",
                        rows: "3",
                        placeholder: "Yazının kısa özeti",
                        error: errors.value.summary || unref(form).errors.summary
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode(unref(_sfc_main$4), {
                        modelValue: unref(form).content,
                        "onUpdate:modelValue": ($event) => unref(form).content = $event,
                        label: "İçerik",
                        height: "400px",
                        error: errors.value.content || unref(form).errors.content
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Kategori")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                        class: ["select select-bordered w-full", { "select-error": errors.value.category_id || unref(form).errors.category_id }]
                      }, [
                        createVNode("option", {
                          value: "",
                          disabled: ""
                        }, "Kategori seç"),
                        (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                          return openBlock(), createBlock("option", {
                            key: category.id,
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]);
                        }), 128))
                      ], 10, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).category_id]
                      ]),
                      errors.value.category_id || unref(form).errors.category_id ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.category_id || unref(form).errors.category_id), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Durumu")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).status = $event,
                        class: ["select select-bordered w-full", { "select-error": errors.value.status || unref(form).errors.status }]
                      }, [
                        createVNode("option", { value: "draft" }, "Şablon"),
                        createVNode("option", { value: "published" }, "Yayında"),
                        createVNode("option", { value: "private" }, "Gizli")
                      ], 10, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).status]
                      ]),
                      errors.value.status || unref(form).errors.status ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.status || unref(form).errors.status), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).cover_image,
                        "onUpdate:modelValue": ($event) => unref(form).cover_image = $event,
                        label: "Kapak Resmi URL",
                        placeholder: "https://example.com/image.jpg",
                        error: errors.value.cover_image || unref(form).errors.cover_image
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).tags,
                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                        label: "Etiketler",
                        placeholder: "etiket1, etiket2, etiket3",
                        error: errors.value.tags || unref(form).errors.tags
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).seo_keywords,
                        "onUpdate:modelValue": ($event) => unref(form).seo_keywords = $event,
                        label: "SEO Anahtar Kelimeleri",
                        placeholder: "anahtar1, anahtar2, anahtar3",
                        error: errors.value.seo_keywords || unref(form).errors.seo_keywords
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$3), {
                        modelValue: unref(form).views_count,
                        "onUpdate:modelValue": ($event) => unref(form).views_count = $event,
                        label: "Görüntülenme Sayısı",
                        type: "number",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode("label", { class: "label cursor-pointer justify-start gap-2" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).hasDraw = $event,
                          class: "checkbox checkbox-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).hasDraw]
                        ]),
                        createVNode("span", { class: "label-text" }, "Çizim İçerir")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
