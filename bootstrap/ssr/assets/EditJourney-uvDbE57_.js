import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, withDirectives, vModelText, toDisplayString, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-BImd-DHt.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import "./FlashMessage-D-FCyLof.js";
import "./SidebarLayoutJourney-C_y6Q3RS.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./JourneyTimeline-Da0328av.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
    const submit = () => {
      form.post(`/journey/${props.entry.id}`, {
        forceFormData: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mx-auto max-w-2xl py-8"${_scopeId2}><div class="mb-8"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: `/journey/${__props.entry.id}`,
                    class: "mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId3}></path></svg> Geri `);
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
                  }, _parent3, _scopeId2));
                  _push3(`<h1 class="text-3xl font-bold tracking-tight text-foreground"${_scopeId2}>Kaydı Düzenle</h1><p class="mt-2 text-muted-foreground"${_scopeId2}>Yolculuk kaydını güncelleyin.</p></div><form class="space-y-6"${_scopeId2}><div${_scopeId2}><label for="entry_date" class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}> Tarih <span class="text-destructive"${_scopeId2}>*</span></label><input id="entry_date"${ssrRenderAttr("value", unref(form).entry_date)} type="date" class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" required${_scopeId2}>`);
                  if (unref(form).errors.entry_date) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.entry_date)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label for="title" class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}> Başlık <span class="text-destructive"${_scopeId2}>*</span></label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Bu günün başlığı..." required${_scopeId2}>`);
                  if (unref(form).errors.title) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label for="description" class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}> Açıklama </label><textarea id="description" rows="6" class="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Bu gün hakkında notlarınız..."${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea>`);
                  if (unref(form).errors.description) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (__props.entry.image && !imagePreview.value) {
                    _push3(`<div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Mevcut Görsel</label><div class="overflow-hidden rounded-lg border border-border"${_scopeId2}><img${ssrRenderAttr("src", `/storage/${__props.entry.image}`)}${ssrRenderAttr("alt", __props.entry.title)} class="h-48 w-full object-cover"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div${_scopeId2}><label for="image" class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(__props.entry.image ? "Görseli Değiştir" : "Görsel Ekle")}</label><div class="relative"${_scopeId2}><input id="image" type="file" accept="image/*" class="w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"${_scopeId2}></div>`);
                  if (imagePreview.value) {
                    _push3(`<div class="mt-3 overflow-hidden rounded-lg border border-border"${_scopeId2}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="h-48 w-full object-cover"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(form).errors.image) {
                    _push3(`<p class="mt-1 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div${_scopeId2}><label class="mb-2 block text-sm font-medium text-foreground"${_scopeId2}>Durum</label><div class="flex gap-4"${_scopeId2}><label class="flex cursor-pointer items-center gap-2"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "published")) ? " checked" : ""} value="published" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId2}><span class="text-sm text-foreground"${_scopeId2}>Yayınla</span></label><label class="flex cursor-pointer items-center gap-2"${_scopeId2}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).status, "draft")) ? " checked" : ""} value="draft" class="h-4 w-4 border-input text-primary focus:ring-primary"${_scopeId2}><span class="text-sm text-foreground"${_scopeId2}>Taslak</span></label></div></div><div class="flex items-center gap-3 pt-4"${_scopeId2}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId2}>`);
                  if (unref(form).processing) {
                    _push3(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId2}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId2}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId2}></path></svg>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(unref(form).processing ? "Güncelleniyor..." : "Güncelle")}</button>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: `/journey/${__props.entry.id}`,
                    class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` İptal `);
                      } else {
                        return [
                          createTextVNode(" İptal ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mx-auto max-w-2xl py-8" }, [
                      createVNode("div", { class: "mb-8" }, [
                        createVNode(unref(Link), {
                          href: `/journey/${__props.entry.id}`,
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
                        }, 8, ["href"]),
                        createVNode("h1", { class: "text-3xl font-bold tracking-tight text-foreground" }, "Kaydı Düzenle"),
                        createVNode("p", { class: "mt-2 text-muted-foreground" }, "Yolculuk kaydını güncelleyin.")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "entry_date",
                            class: "mb-2 block text-sm font-medium text-foreground"
                          }, [
                            createTextVNode(" Tarih "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "entry_date",
                            "onUpdate:modelValue": ($event) => unref(form).entry_date = $event,
                            type: "date",
                            class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).entry_date]
                          ]),
                          unref(form).errors.entry_date ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.entry_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "title",
                            class: "mb-2 block text-sm font-medium text-foreground"
                          }, [
                            createTextVNode(" Başlık "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "title",
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                            placeholder: "Bu günün başlığı...",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "description",
                            class: "mb-2 block text-sm font-medium text-foreground"
                          }, " Açıklama "),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "6",
                            class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                            placeholder: "Bu gün hakkında notlarınız..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                        ]),
                        __props.entry.image && !imagePreview.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Mevcut Görsel"),
                          createVNode("div", { class: "overflow-hidden rounded-lg border border-border" }, [
                            createVNode("img", {
                              src: `/storage/${__props.entry.image}`,
                              alt: __props.entry.title,
                              class: "h-48 w-full object-cover"
                            }, null, 8, ["src", "alt"])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "image",
                            class: "mb-2 block text-sm font-medium text-foreground"
                          }, toDisplayString(__props.entry.image ? "Görseli Değiştir" : "Görsel Ekle"), 1),
                          createVNode("div", { class: "relative" }, [
                            createVNode("input", {
                              id: "image",
                              type: "file",
                              accept: "image/*",
                              onChange: handleImageChange,
                              class: "w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                            }, null, 32)
                          ]),
                          imagePreview.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-3 overflow-hidden rounded-lg border border-border"
                          }, [
                            createVNode("img", {
                              src: imagePreview.value,
                              alt: "Preview",
                              class: "h-48 w-full object-cover"
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true),
                          unref(form).errors.image ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
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
                            createTextVNode(" " + toDisplayString(unref(form).processing ? "Güncelleniyor..." : "Güncelle"), 1)
                          ], 8, ["disabled"]),
                          createVNode(unref(Link), {
                            href: `/journey/${__props.entry.id}`,
                            class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" İptal ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ], 32)
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
                  createVNode("div", { class: "mx-auto max-w-2xl py-8" }, [
                    createVNode("div", { class: "mb-8" }, [
                      createVNode(unref(Link), {
                        href: `/journey/${__props.entry.id}`,
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
                      }, 8, ["href"]),
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight text-foreground" }, "Kaydı Düzenle"),
                      createVNode("p", { class: "mt-2 text-muted-foreground" }, "Yolculuk kaydını güncelleyin.")
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "entry_date",
                          class: "mb-2 block text-sm font-medium text-foreground"
                        }, [
                          createTextVNode(" Tarih "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "entry_date",
                          "onUpdate:modelValue": ($event) => unref(form).entry_date = $event,
                          type: "date",
                          class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).entry_date]
                        ]),
                        unref(form).errors.entry_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.entry_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "title",
                          class: "mb-2 block text-sm font-medium text-foreground"
                        }, [
                          createTextVNode(" Başlık "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "title",
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                          placeholder: "Bu günün başlığı...",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.title ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "description",
                          class: "mb-2 block text-sm font-medium text-foreground"
                        }, " Açıklama "),
                        withDirectives(createVNode("textarea", {
                          id: "description",
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "6",
                          class: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                          placeholder: "Bu gün hakkında notlarınız..."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      __props.entry.image && !imagePreview.value ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "mb-2 block text-sm font-medium text-foreground" }, "Mevcut Görsel"),
                        createVNode("div", { class: "overflow-hidden rounded-lg border border-border" }, [
                          createVNode("img", {
                            src: `/storage/${__props.entry.image}`,
                            alt: __props.entry.title,
                            class: "h-48 w-full object-cover"
                          }, null, 8, ["src", "alt"])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "image",
                          class: "mb-2 block text-sm font-medium text-foreground"
                        }, toDisplayString(__props.entry.image ? "Görseli Değiştir" : "Görsel Ekle"), 1),
                        createVNode("div", { class: "relative" }, [
                          createVNode("input", {
                            id: "image",
                            type: "file",
                            accept: "image/*",
                            onChange: handleImageChange,
                            class: "w-full cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                          }, null, 32)
                        ]),
                        imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 overflow-hidden rounded-lg border border-border"
                        }, [
                          createVNode("img", {
                            src: imagePreview.value,
                            alt: "Preview",
                            class: "h-48 w-full object-cover"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        unref(form).errors.image ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
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
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Güncelleniyor..." : "Güncelle"), 1)
                        ], 8, ["disabled"]),
                        createVNode(unref(Link), {
                          href: `/journey/${__props.entry.id}`,
                          class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" İptal ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/EditJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
