import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$4 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePack: Object,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.languagePack.name,
      description: props.languagePack.description || "",
      language: props.languagePack.language
    });
    const processing = ref(false);
    const deleteLanguagePack = () => {
      if (confirm("Bu dil paketini silmek istediğinizden emin misiniz?")) {
        processing.value = true;
        router.delete(route("rendition.language-packs.destroy", props.languagePack.id), {
          onSuccess: () => {
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        });
      }
    };
    const submitForm = () => {
      processing.value = true;
      form.put(route("rendition.language-packs.update", props.languagePack.id), {
        onSuccess: () => {
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const goBack = () => {
      router.visit(route("rendition.language-packs.index"));
    };
    const errors = usePage().props.errors;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/rendition/language-packs" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Dil Paketi Düzenle" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Paket Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input input-bordered w-full" required${_scopeId2}>`);
                  if (unref(errors).name) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(errors).name)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Açıklama</span></label><textarea rows="3" class="textarea textarea-bordered w-full"${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea>`);
                  if (unref(errors).description) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(errors).description)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Dil Kodu (2 karakter)</span></label><select class="select select-bordered w-full" required${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId2}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId2}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId2}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId2}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId2}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId2}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId2}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId2}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId2}>Arapça (AR)</option></select>`);
                  if (unref(errors).language) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(unref(errors).language)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="divider"${_scopeId2}></div><div class="flex justify-end gap-2"${_scopeId2}><button type="button" class="btn btn-error"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId2}>`);
                  if (processing.value) {
                    _push3(`<span class="loading loading-spinner loading-sm"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(processing.value ? "Siliniyor..." : "Sil")}</button><button type="button" class="btn btn-ghost"${_scopeId2}>İptal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId2}>`);
                  if (processing.value) {
                    _push3(`<span class="loading loading-spinner loading-sm"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Paket Adı")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          class: "input input-bordered w-full",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(errors).name ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).name), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Açıklama")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "3",
                          class: "textarea textarea-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        unref(errors).description ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).description), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Dil Kodu (2 karakter)")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).language = $event,
                          class: "select select-bordered w-full",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Dil seçiniz"),
                          createVNode("option", { value: "tr" }, "Türkçe (TR)"),
                          createVNode("option", { value: "en" }, "İngilizce (EN)"),
                          createVNode("option", { value: "de" }, "Almanca (DE)"),
                          createVNode("option", { value: "fr" }, "Fransızca (FR)"),
                          createVNode("option", { value: "es" }, "İspanyolca (ES)"),
                          createVNode("option", { value: "it" }, "İtalyanca (IT)"),
                          createVNode("option", { value: "ru" }, "Rusça (RU)"),
                          createVNode("option", { value: "ar" }, "Arapça (AR)")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).language]
                        ]),
                        unref(errors).language ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).language), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex justify-end gap-2" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: deleteLanguagePack,
                          class: "btn btn-error",
                          disabled: processing.value
                        }, [
                          processing.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "loading loading-spinner loading-sm"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(processing.value ? "Siliniyor..." : "Sil"), 1)
                        ], 8, ["disabled"]),
                        createVNode("button", {
                          type: "button",
                          onClick: goBack,
                          class: "btn btn-ghost"
                        }, "İptal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: processing.value
                        }, [
                          processing.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "loading loading-spinner loading-sm"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 1)
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/rendition/language-packs" }),
              createVNode(_sfc_main$3, { title: "Dil Paketi Düzenle" }),
              createVNode(_sfc_main$4, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Paket Adı")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        class: "input input-bordered w-full",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      unref(errors).name ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).name), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Açıklama")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: "textarea textarea-bordered w-full"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(errors).description ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).description), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Dil Kodu (2 karakter)")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).language = $event,
                        class: "select select-bordered w-full",
                        required: ""
                      }, [
                        createVNode("option", {
                          value: "",
                          disabled: ""
                        }, "Dil seçiniz"),
                        createVNode("option", { value: "tr" }, "Türkçe (TR)"),
                        createVNode("option", { value: "en" }, "İngilizce (EN)"),
                        createVNode("option", { value: "de" }, "Almanca (DE)"),
                        createVNode("option", { value: "fr" }, "Fransızca (FR)"),
                        createVNode("option", { value: "es" }, "İspanyolca (ES)"),
                        createVNode("option", { value: "it" }, "İtalyanca (IT)"),
                        createVNode("option", { value: "ru" }, "Rusça (RU)"),
                        createVNode("option", { value: "ar" }, "Arapça (AR)")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).language]
                      ]),
                      unref(errors).language ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).language), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: deleteLanguagePack,
                        class: "btn btn-error",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "loading loading-spinner loading-sm"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(processing.value ? "Siliniyor..." : "Sil"), 1)
                      ], 8, ["disabled"]),
                      createVNode("button", {
                        type: "button",
                        onClick: goBack,
                        class: "btn btn-ghost"
                      }, "İptal"),
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-primary",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "loading loading-spinner loading-sm"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 1)
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
