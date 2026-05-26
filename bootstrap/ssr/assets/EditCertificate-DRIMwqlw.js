import { ref, withCtx, unref, createVNode, withModifiers, createTextVNode, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutCertificates-C-R2ygJ9.js";
import { _ as _sfc_main$2 } from "./CheckScreen-ChCDBWK6.js";
import { _ as _sfc_main$3 } from "./PageShell-DjZZ5koh.js";
import { _ as _sfc_main$4 } from "./PageHeader-FZ8QTap0.js";
import "./CheckLayout-ULa51pW8.js";
import "./FlashMessage-DLOdJQqX.js";
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
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { width: "content" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, {
                          title: "Sertifika Düzenle",
                          description: "Sertifika bilgilerini güncelleyin"
                        }, null, _parent4, _scopeId3));
                        _push4(`<form class="space-y-4"${_scopeId3}><div${_scopeId3}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId3}>Başlık <span class="text-destructive"${_scopeId3}>*</span></label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.title }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="Sertifika adı"${_scopeId3}>`);
                        if (unref(form).errors.title) {
                          _push4(`<p class="mt-1 text-xs text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId3}>Veren Kurum <span class="text-destructive"${_scopeId3}>*</span></label><input${ssrRenderAttr("value", unref(form).issuer)} type="text" required class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.issuer }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="Örn: Coursera, Udemy, Microsoft"${_scopeId3}>`);
                        if (unref(form).errors.issuer) {
                          _push4(`<p class="mt-1 text-xs text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.issuer)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId3}>Açıklama</label><textarea rows="4" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.description }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="Sertifika hakkında detaylar..."${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="mt-1 text-xs text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Sertifika Görseli</label><div class="flex items-center gap-4"${_scopeId3}><input type="file" accept="image/*" class="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"${_scopeId3}></div>`);
                        if (imagePreview.value) {
                          _push4(`<div class="mt-4"${_scopeId3}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="h-48 rounded-lg border border-border object-contain"${_scopeId3}></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(form).errors.image) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId3}><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Alınma Tarihi <span class="text-destructive"${_scopeId3}>*</span></label><input${ssrRenderAttr("value", unref(form).issue_date)} type="date" required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId3}>`);
                        if (unref(form).errors.issue_date) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.issue_date)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Geçerlilik Sonu</label><input${ssrRenderAttr("value", unref(form).expiry_date)} type="date" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId3}></div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId3}><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Sertifika ID</label><input${ssrRenderAttr("value", unref(form).credential_id)} type="text" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ABC123XYZ"${_scopeId3}></div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Doğrulama URL</label><input${ssrRenderAttr("value", unref(form).credential_url)} type="url" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://..."${_scopeId3}></div></div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Beceriler</label><div class="space-y-2"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(form).skills, (skill, index) => {
                          _push4(`<div class="flex gap-2"${_scopeId3}><input${ssrRenderAttr("value", unref(form).skills[index])} type="text" class="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Beceri adı"${_scopeId3}><button type="button" class="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"${_scopeId3}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId3}></path></svg></button></div>`);
                        });
                        _push4(`<!--]--><button type="button" class="inline-flex items-center gap-2 text-sm text-primary hover:underline"${_scopeId3}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId3}></path></svg> Beceri Ekle </button></div></div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Durum <span class="text-destructive"${_scopeId3}>*</span></label><select required class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId3}><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}${_scopeId3}>Aktif</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "expired") : ssrLooseEqual(unref(form).status, "expired")) ? " selected" : ""}${_scopeId3}>Süresi Doldu</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId3}>Taslak</option></select></div><div${_scopeId3}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId3}>Sıralama</label><input${ssrRenderAttr("value", unref(form).display_order)} type="number" min="0" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0"${_scopeId3}><p class="mt-1 text-xs text-muted-foreground"${_scopeId3}>Küçük sayılar önce gösterilir</p></div><div class="flex justify-end gap-2 pt-2"${_scopeId3}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${_scopeId3}>`);
                        if (unref(form).processing) {
                          _push4(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId3}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId3}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId3}></path></svg>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></div></form>`);
                      } else {
                        return [
                          createVNode(_sfc_main$4, {
                            title: "Sertifika Düzenle",
                            description: "Sertifika bilgilerini güncelleyin"
                          }),
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                                createTextVNode("Başlık "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                type: "text",
                                required: "",
                                class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.title }],
                                placeholder: "Sertifika adı"
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).title]
                              ]),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-xs text-destructive"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                                createTextVNode("Veren Kurum "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).issuer = $event,
                                type: "text",
                                required: "",
                                class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.issuer }],
                                placeholder: "Örn: Coursera, Udemy, Microsoft"
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).issuer]
                              ]),
                              unref(form).errors.issuer ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-xs text-destructive"
                              }, toDisplayString(unref(form).errors.issuer), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Açıklama"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                rows: "4",
                                class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.description }],
                                placeholder: "Sertifika hakkında detaylar..."
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).description]
                              ]),
                              unref(form).errors.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-xs text-destructive"
                              }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
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
                            createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                              createVNode("button", {
                                type: "submit",
                                disabled: unref(form).processing,
                                class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                              }, [
                                unref(form).processing ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "mr-2 h-4 w-4 animate-spin",
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
                              ], 8, ["disabled"])
                            ])
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, { width: "content" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, {
                          title: "Sertifika Düzenle",
                          description: "Sertifika bilgilerini güncelleyin"
                        }),
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Başlık "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              type: "text",
                              required: "",
                              class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.title }],
                              placeholder: "Sertifika adı"
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).title]
                            ]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                              createTextVNode("Veren Kurum "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).issuer = $event,
                              type: "text",
                              required: "",
                              class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.issuer }],
                              placeholder: "Örn: Coursera, Udemy, Microsoft"
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).issuer]
                            ]),
                            unref(form).errors.issuer ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs text-destructive"
                            }, toDisplayString(unref(form).errors.issuer), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Açıklama"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.description }],
                              placeholder: "Sertifika hakkında detaylar..."
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-xs text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
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
                          createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: unref(form).processing,
                              class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            }, [
                              unref(form).processing ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "mr-2 h-4 w-4 animate-spin",
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
                            ], 8, ["disabled"])
                          ])
                        ], 32)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, { width: "content" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, {
                        title: "Sertifika Düzenle",
                        description: "Sertifika bilgilerini güncelleyin"
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                            createTextVNode("Başlık "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            required: "",
                            class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.title }],
                            placeholder: "Sertifika adı"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-destructive"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, [
                            createTextVNode("Veren Kurum "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).issuer = $event,
                            type: "text",
                            required: "",
                            class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.issuer }],
                            placeholder: "Örn: Coursera, Udemy, Microsoft"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).issuer]
                          ]),
                          unref(form).errors.issuer ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-destructive"
                          }, toDisplayString(unref(form).errors.issuer), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Açıklama"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": unref(form).errors.description }],
                            placeholder: "Sertifika hakkında detaylar..."
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-xs text-destructive"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
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
                        createVNode("div", { class: "flex justify-end gap-2 pt-2" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "mr-2 h-4 w-4 animate-spin",
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
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ]),
                    _: 1
                  })
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
