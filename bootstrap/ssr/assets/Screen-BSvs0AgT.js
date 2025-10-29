import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
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
      slug: props.languagePack.slug || "",
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
            _push2(`<div class="card-body p-4 sm:p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-xl font-bold sm:text-2xl"${_scopeId}>Dil Paketi Düzenle</h1><p class="text-base-content/60 mt-1 text-sm"${_scopeId}>Paket bilgilerini güncelleyin</p></div><form class="space-y-4"${_scopeId}><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Paket Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1" placeholder="Örn: Temel İngilizce Kelimeler" required${_scopeId}>`);
            if (unref(errors).name) {
              _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(unref(errors).name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1" placeholder="temel-ingilizce-kelimeler" required${_scopeId}>`);
            if (unref(errors).slug) {
              _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(unref(errors).slug)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Dil Kodu</label><select class="border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(unref(errors).language)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Açıklama</label><textarea rows="3" class="placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full resize-none rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1" placeholder="Bu paket hakkında kısa bir açıklama yazın..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(errors).description) {
              _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(unref(errors).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between"${_scopeId}><button type="button" class="border-error/30 bg-error/10 hover:bg-error/20 rounded-lg border px-4 py-2 text-sm font-medium text-error transition-colors disabled:opacity-50"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-error border-t-transparent"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Siliniyor..." : "Sil")}</button><div class="flex gap-2"${_scopeId}><button type="button" class="border-base-300/50 rounded-lg border bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-200"${_scopeId}> İptal </button><button type="submit" class="rounded-lg bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition-colors hover:bg-base-300 hover:text-base-content disabled:opacity-50"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "card-body p-4 sm:p-6" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h1", { class: "text-xl font-bold sm:text-2xl" }, "Dil Paketi Düzenle"),
                  createVNode("p", { class: "text-base-content/60 mt-1 text-sm" }, "Paket bilgilerini güncelleyin")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Paket Adı"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1",
                      placeholder: "Örn: Temel İngilizce Kelimeler",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).name]
                    ]),
                    unref(errors).name ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-error"
                    }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Slug"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                      type: "text",
                      class: "placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1",
                      placeholder: "temel-ingilizce-kelimeler",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).slug]
                    ]),
                    unref(errors).slug ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-error"
                    }, toDisplayString(unref(errors).slug), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Dil Kodu"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(form).language = $event,
                      class: "border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1",
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
                    unref(errors).language ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-error"
                    }, toDisplayString(unref(errors).language), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Açıklama"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      rows: "3",
                      class: "placeholder-base-content/50 border-base-300/50 bg-base-50 focus:border-base-content/50 focus:ring-base-content/20 w-full resize-none rounded-lg border px-3 py-2 text-sm text-base-content transition-colors focus:bg-base-100 focus:outline-none focus:ring-1",
                      placeholder: "Bu paket hakkında kısa bir açıklama yazın..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    unref(errors).description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-error"
                    }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-between" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: deleteLanguagePack,
                      class: "border-error/30 bg-error/10 hover:bg-error/20 rounded-lg border px-4 py-2 text-sm font-medium text-error transition-colors disabled:opacity-50",
                      disabled: processing.value
                    }, [
                      processing.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-error border-t-transparent"
                      })) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(processing.value ? "Siliniyor..." : "Sil"), 1)
                    ], 8, ["disabled"]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: goBack,
                        class: "border-base-300/50 rounded-lg border bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-200"
                      }, " İptal "),
                      createVNode("button", {
                        type: "submit",
                        class: "rounded-lg bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition-colors hover:bg-base-300 hover:text-base-content disabled:opacity-50",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 1)
                      ], 8, ["disabled"])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
