import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, createTextVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutCertificates-D0hTtwkH.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutCertificate-C3idRv1l.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./FlashMessage-C3JOGPFR.js";
const _sfc_main = {
  __name: "EditCertificate",
  __ssrInlineRender: true,
  props: {
    certificate: Object,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.certificate.title,
      issuer: props.certificate.issuer,
      description: props.certificate.description,
      image: null,
      issue_date: props.certificate.issue_date,
      expiry_date: props.certificate.expiry_date,
      credential_id: props.certificate.credential_id,
      credential_url: props.certificate.credential_url,
      skills: props.certificate.skills || [],
      status: props.certificate.status,
      display_order: props.certificate.display_order,
      _method: "PUT"
    });
    const imagePreview = ref(props.certificate.image);
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };
    const addSkill = () => {
      form.skills.push("");
    };
    const removeSkill = (index) => {
      form.skills.splice(index, 1);
    };
    const submit = () => {
      form.post(route("certificates.update", props.certificate.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6 pt-12 sm:p-8 sm:pt-16"${_scopeId2}><div class="mx-auto max-w-3xl"${_scopeId2}><h1 class="mb-8 text-2xl font-bold text-foreground"${_scopeId2}>Sertifika Düzenle</h1><form class="space-y-6"${_scopeId2}><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Başlık <span class="text-destructive"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Sertifika adı"${_scopeId2}>`);
                  if (unref(form).errors.title) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Veren Kurum <span class="text-destructive"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(form).issuer)} type="text" required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Örn: Coursera, Udemy, Microsoft"${_scopeId2}>`);
                  if (unref(form).errors.issuer) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.issuer)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Açıklama</label><textarea rows="4" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Sertifika hakkında detaylar..."${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Sertifika Görseli</label><div class="flex items-center gap-4"${_scopeId2}><input type="file" accept="image/*" class="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"${_scopeId2}></div>`);
                  if (imagePreview.value) {
                    _push3(`<div class="mt-4"${_scopeId2}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="h-48 rounded-lg border border-border object-contain"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(form).errors.image) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId2}><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Alınma Tarihi <span class="text-destructive"${_scopeId2}>*</span></label><input${ssrRenderAttr("value", unref(form).issue_date)} type="date" required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId2}>`);
                  if (unref(form).errors.issue_date) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.issue_date)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Geçerlilik Sonu</label><input${ssrRenderAttr("value", unref(form).expiry_date)} type="date" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId2}></div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId2}><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Sertifika ID</label><input${ssrRenderAttr("value", unref(form).credential_id)} type="text" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ABC123XYZ"${_scopeId2}></div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Doğrulama URL</label><input${ssrRenderAttr("value", unref(form).credential_url)} type="url" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://..."${_scopeId2}></div></div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Beceriler</label><div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(form).skills, (skill, index) => {
                    _push3(`<div class="flex gap-2"${_scopeId2}><input${ssrRenderAttr("value", unref(form).skills[index])} type="text" class="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Beceri adı"${_scopeId2}><button type="button" class="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId2}></path></svg></button></div>`);
                  });
                  _push3(`<!--]--><button type="button" class="inline-flex items-center gap-2 text-sm text-primary hover:underline"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Beceri Ekle </button></div></div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Durum <span class="text-destructive"${_scopeId2}>*</span></label><select required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId2}><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}${_scopeId2}>Aktif</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "expired") : ssrLooseEqual(unref(form).status, "expired")) ? " selected" : ""}${_scopeId2}>Süresi Doldu</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId2}>Taslak</option></select></div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Sıralama</label><input${ssrRenderAttr("value", unref(form).display_order)} type="number" min="0" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0"${_scopeId2}><p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Küçük sayılar önce gösterilir</p></div><div class="flex items-center justify-end gap-3 border-t border-border pt-6"${_scopeId2}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId2}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                      createVNode("div", { class: "mx-auto max-w-3xl" }, [
                        createVNode("h1", { class: "mb-8 text-2xl font-bold text-foreground" }, "Sertifika Düzenle"),
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Başlık "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "Sertifika adı"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).title]
                            ]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Veren Kurum "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).issuer = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "Örn: Coursera, Udemy, Microsoft"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).issuer]
                            ]),
                            unref(form).errors.issuer ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.issuer), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Açıklama"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "Sertifika hakkında detaylar..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sertifika Görseli"),
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: handleImageUpload,
                                class: "block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                              }, null, 32)
                            ]),
                            imagePreview.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4"
                            }, [
                              createVNode("img", {
                                src: imagePreview.value,
                                alt: "Preview",
                                class: "h-48 rounded-lg border border-border object-contain"
                              }, null, 8, ["src"])
                            ])) : createCommentVNode("", true),
                            unref(form).errors.image ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                                createTextVNode("Alınma Tarihi "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).issue_date = $event,
                                type: "date",
                                required: "",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).issue_date]
                              ]),
                              unref(form).errors.issue_date ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.issue_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Geçerlilik Sonu"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).expiry_date = $event,
                                type: "date",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).expiry_date]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sertifika ID"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).credential_id = $event,
                                type: "text",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                placeholder: "ABC123XYZ"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).credential_id]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Doğrulama URL"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).credential_url = $event,
                                type: "url",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                placeholder: "https://..."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).credential_url]
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Beceriler"),
                            createVNode("div", { class: "space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(form).skills, (skill, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "flex gap-2"
                                }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).skills[index] = $event,
                                    type: "text",
                                    class: "flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                    placeholder: "Beceri adı"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).skills[index]]
                                  ]),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => removeSkill(index),
                                    class: "rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-4 w-4",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
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
                              }), 128)),
                              createVNode("button", {
                                type: "button",
                                onClick: addSkill,
                                class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-4 w-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  })
                                ])),
                                createTextVNode(" Beceri Ekle ")
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Durum "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).status = $event,
                              required: "",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            }, [
                              createVNode("option", { value: "active" }, "Aktif"),
                              createVNode("option", { value: "expired" }, "Süresi Doldu"),
                              createVNode("option", { value: "draft" }, "Taslak")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).status]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sıralama"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).display_order = $event,
                              type: "number",
                              min: "0",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "0"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [
                                vModelText,
                                unref(form).display_order,
                                void 0,
                                { number: true }
                              ]
                            ]),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Küçük sayılar önce gösterilir")
                          ]),
                          createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-border pt-6" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: unref(form).processing,
                              class: "rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                    createVNode("div", { class: "mx-auto max-w-3xl" }, [
                      createVNode("h1", { class: "mb-8 text-2xl font-bold text-foreground" }, "Sertifika Düzenle"),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                            createTextVNode("Başlık "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            required: "",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                            placeholder: "Sertifika adı"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                            createTextVNode("Veren Kurum "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).issuer = $event,
                            type: "text",
                            required: "",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                            placeholder: "Örn: Coursera, Udemy, Microsoft"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).issuer]
                          ]),
                          unref(form).errors.issuer ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.issuer), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Açıklama"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                            placeholder: "Sertifika hakkında detaylar..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sertifika Görseli"),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              onChange: handleImageUpload,
                              class: "block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                            }, null, 32)
                          ]),
                          imagePreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4"
                          }, [
                            createVNode("img", {
                              src: imagePreview.value,
                              alt: "Preview",
                              class: "h-48 rounded-lg border border-border object-contain"
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true),
                          unref(form).errors.image ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Alınma Tarihi "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).issue_date = $event,
                              type: "date",
                              required: "",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).issue_date]
                            ]),
                            unref(form).errors.issue_date ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.issue_date), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Geçerlilik Sonu"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).expiry_date = $event,
                              type: "date",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).expiry_date]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sertifika ID"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).credential_id = $event,
                              type: "text",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "ABC123XYZ"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).credential_id]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Doğrulama URL"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).credential_url = $event,
                              type: "url",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                              placeholder: "https://..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).credential_url]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Beceriler"),
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).skills, (skill, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "flex gap-2"
                              }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).skills[index] = $event,
                                  type: "text",
                                  class: "flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                  placeholder: "Beceri adı"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).skills[index]]
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSkill(index),
                                  class: "rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
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
                            }), 128)),
                            createVNode("button", {
                              type: "button",
                              onClick: addSkill,
                              class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                })
                              ])),
                              createTextVNode(" Beceri Ekle ")
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, [
                            createTextVNode("Durum "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).status = $event,
                            required: "",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          }, [
                            createVNode("option", { value: "active" }, "Aktif"),
                            createVNode("option", { value: "expired" }, "Süresi Doldu"),
                            createVNode("option", { value: "draft" }, "Taslak")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).status]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Sıralama"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).display_order = $event,
                            type: "number",
                            min: "0",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                            placeholder: "0"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(form).display_order,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Küçük sayılar önce gösterilir")
                        ]),
                        createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-border pt-6" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: "rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                          }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Certificates/EditCertificate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
