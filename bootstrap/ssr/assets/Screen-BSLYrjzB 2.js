import { ref, watch, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-faNUnK3u.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/rendition/language-packs" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Yeni Dil Paketi Oluştur" }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-2xl"${_scopeId}><div class="rounded-lg border border-base-300 bg-base-100 p-6"${_scopeId}><form class="space-y-5"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Paket Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content" placeholder="Örn: Temel İngilizce Kelimeler" required${_scopeId}>`);
            if (unref(errors).name) {
              _push2(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(errors).name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Açıklama</label><textarea rows="3" class="placeholder-base-content/50 w-full resize-none rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content" placeholder="Bu paket hakkında kısa bir açıklama yazın..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(errors).description) {
              _push2(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(errors).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Dil Kodu</label><select class="w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(errors).language)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content" placeholder="temel-ingilizce-kelimeler" required${_scopeId}>`);
            if (unref(errors).slug) {
              _push2(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(errors).slug)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>JSON Dosyası İçe Aktar</label><div class="relative"${_scopeId}><input type="file" accept=".json" class="w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content file:mr-3 file:rounded file:border-0 file:bg-base-content file:px-3 file:py-1 file:text-sm file:font-medium file:text-base-100 hover:file:bg-base-300 hover:file:text-base-content"${_scopeId}></div><p class="text-base-content/70 text-xs"${_scopeId}> Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz. </p>`);
            if (unref(errors).import_file) {
              _push2(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(errors).import_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end gap-3 pt-4"${_scopeId}><button type="button" class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"${_scopeId}> İptal </button><button type="submit" class="rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/rendition/language-packs" }),
              createVNode(_sfc_main$3, { title: "Yeni Dil Paketi Oluştur" }),
              createVNode("div", { class: "mx-auto max-w-2xl" }, [
                createVNode("div", { class: "rounded-lg border border-base-300 bg-base-100 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-5"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-base-content" }, "Paket Adı"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        class: "placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content",
                        placeholder: "Örn: Temel İngilizce Kelimeler",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      unref(errors).name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-error"
                      }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-base-content" }, "Açıklama"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: "placeholder-base-content/50 w-full resize-none rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content",
                        placeholder: "Bu paket hakkında kısa bir açıklama yazın..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(errors).description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-error"
                      }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-base-content" }, "Dil Kodu"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).language = $event,
                        class: "w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content",
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
                        class: "text-sm text-error"
                      }, toDisplayString(unref(errors).language), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-base-content" }, "Slug"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        type: "text",
                        class: "placeholder-base-content/50 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content",
                        placeholder: "temel-ingilizce-kelimeler",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).slug]
                      ]),
                      unref(errors).slug ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-error"
                      }, toDisplayString(unref(errors).slug), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-base-content" }, "JSON Dosyası İçe Aktar"),
                      createVNode("div", { class: "relative" }, [
                        createVNode("input", {
                          type: "file",
                          accept: ".json",
                          onChange: handleFileUpload,
                          class: "w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content file:mr-3 file:rounded file:border-0 file:bg-base-content file:px-3 file:py-1 file:text-sm file:font-medium file:text-base-100 hover:file:bg-base-300 hover:file:text-base-content"
                        }, null, 32)
                      ]),
                      createVNode("p", { class: "text-base-content/70 text-xs" }, " Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz. "),
                      unref(errors).import_file ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-error"
                      }, toDisplayString(unref(errors).import_file), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: goBack,
                        class: "rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                      }, " İptal "),
                      createVNode("button", {
                        type: "submit",
                        class: "rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-base-100 border-t-transparent"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 1)
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
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
