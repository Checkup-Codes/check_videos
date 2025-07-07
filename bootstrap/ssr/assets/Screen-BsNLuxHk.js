import { ref, watch, withCtx, unref, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-BoI3jD68.js";
import "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
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
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Paket Adı</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="input-bordered input w-full" required${_scopeId}>`);
            if (unref(errors).name) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(errors).name)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Açıklama</span></label><textarea rows="3" class="textarea-bordered textarea w-full"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(errors).description) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(errors).description)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Dil Kodu (2 karakter)</span></label><select class="select-bordered select w-full" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(errors).language)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Slug</span></label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="input-bordered input w-full" required${_scopeId}>`);
            if (unref(errors).slug) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(errors).slug)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>JSON Dosyası İçe Aktar (Opsiyonel)</span></label><input type="file" accept=".json" class="file-input-bordered file-input w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text-alt"${_scopeId}>Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz.</span></label>`);
            if (unref(errors).import_file) {
              _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(unref(errors).import_file)}</span></label>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="divider"${_scopeId}></div><div class="flex justify-end gap-2"${_scopeId}><button type="button" class="btn btn-ghost"${_scopeId}>İptal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="loading loading-spinner loading-sm"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/rendition/language-packs" }),
              createVNode(_sfc_main$3, { title: "Yeni Dil Paketi Oluştur" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
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
                        class: "input-bordered input w-full",
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
                        class: "textarea-bordered textarea w-full"
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
                        class: "select-bordered select w-full",
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
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "Slug")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        type: "text",
                        class: "input-bordered input w-full",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).slug]
                      ]),
                      unref(errors).slug ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).slug), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-control w-full" }, [
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text" }, "JSON Dosyası İçe Aktar (Opsiyonel)")
                      ]),
                      createVNode("input", {
                        type: "file",
                        accept: ".json",
                        onChange: handleFileUpload,
                        class: "file-input-bordered file-input w-full"
                      }, null, 32),
                      createVNode("label", { class: "label" }, [
                        createVNode("span", { class: "label-text-alt" }, "Daha önce dışa aktarılmış bir JSON dosyasını yükleyerek kelimeleri otomatik olarak içe aktarabilirsiniz.")
                      ]),
                      unref(errors).import_file ? (openBlock(), createBlock("label", {
                        key: 0,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(unref(errors).import_file), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
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
