import { ref, watch, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    screen: Object
  },
  setup(__props) {
    const form = useForm({
      name: "",
      slug: "",
      description: "",
      language: "",
      import_file: null
    });
    const processing = ref(false);
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.import_file = file;
      }
    };
    const submitForm = () => {
      processing.value = true;
      form.post(route("rendition.language-packs.store"), {
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
    watch(
      () => form.name,
      (newName) => {
        form.slug = generateSlug(newName);
      }
    );
    const generateSlug = (text) => {
      return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+|-+$/g, "");
    };
    const errors = usePage().props.errors;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-xl font-bold text-foreground sm:text-2xl"${_scopeId}>Yeni Dil Paketi Oluştur</h1><p class="text-muted-foreground mt-1 text-sm"${_scopeId}>Yeni bir dil paketi oluşturun ve kelimelerinizi organize edin</p></div><form class="space-y-4"${_scopeId}><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Paket Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Örn: Temel İngilizce Kelimeler" required${_scopeId}>`);
            if (unref(errors).name) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(errors).name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Dil Kodu</label><select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(errors).language)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="temel-ingilizce-kelimeler" required${_scopeId}>`);
            if (unref(errors).slug) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(errors).slug)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Açıklama</label><textarea rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Bu paket hakkında kısa bir açıklama yazın..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(errors).description) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(errors).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-1.5"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>JSON Dosyası İçe Aktar</label><div class="relative"${_scopeId}><input type="file" accept=".json" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:hover:bg-accent file:hover:text-accent-foreground"${_scopeId}></div><p class="text-muted-foreground text-xs"${_scopeId}> Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz. </p>`);
            if (unref(errors).import_file) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(unref(errors).import_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end"${_scopeId}><button type="button" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}> İptal </button><button type="submit" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
            if (processing.value) {
              _push2(`<svg class="mr-2 h-3 w-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h1", { class: "text-xl font-bold text-foreground sm:text-2xl" }, "Yeni Dil Paketi Oluştur"),
                  createVNode("p", { class: "text-muted-foreground mt-1 text-sm" }, "Yeni bir dil paketi oluşturun ve kelimelerinizi organize edin")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Paket Adı"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      placeholder: "Örn: Temel İngilizce Kelimeler",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).name]
                    ]),
                    unref(errors).name ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Dil Kodu"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => unref(form).language = $event,
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
                      class: "text-xs text-destructive"
                    }, toDisplayString(unref(errors).language), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Slug"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                      type: "text",
                      class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      placeholder: "temel-ingilizce-kelimeler",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).slug]
                    ]),
                    unref(errors).slug ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(unref(errors).slug), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Açıklama"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      rows: "3",
                      class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      placeholder: "Bu paket hakkında kısa bir açıklama yazın..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    unref(errors).description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "JSON Dosyası İçe Aktar"),
                    createVNode("div", { class: "relative" }, [
                      createVNode("input", {
                        type: "file",
                        accept: ".json",
                        onChange: handleFileUpload,
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:hover:bg-accent file:hover:text-accent-foreground"
                      }, null, 32)
                    ]),
                    createVNode("p", { class: "text-muted-foreground text-xs" }, " Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz. "),
                    unref(errors).import_file ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-destructive"
                    }, toDisplayString(unref(errors).import_file), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: goBack,
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, " İptal "),
                    createVNode("button", {
                      type: "submit",
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
                      disabled: processing.value
                    }, [
                      processing.value ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "mr-2 h-3 w-3 animate-spin",
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
                      createTextVNode(" " + toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
