import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
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
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Dil Paketi Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md"${_scopeId}><form${_scopeId}><div class="mb-6"${_scopeId}><label for="name" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Paket Adı</label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" required${_scopeId}>`);
            if (unref(errors).name) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-6"${_scopeId}><label for="description" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Açıklama</label><textarea id="description" rows="3" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(errors).description) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-6"${_scopeId}><label for="language" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Dil Kodu (2 karakter)</label><select id="language" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).language)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="rounded-md bg-black px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(processing.value ? "Siliniyor..." : "Sil")}</button><button type="button" class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> İptal </button><button type="submit" class="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Dil Paketi Düzenle" }),
              createVNode("div", { class: "mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"])
                }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("label", {
                      for: "name",
                      class: "mb-1 block text-sm font-medium text-gray-700"
                    }, "Paket Adı"),
                    withDirectives(createVNode("input", {
                      id: "name",
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).name]
                    ]),
                    unref(errors).name ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-1 text-sm text-red-500"
                    }, toDisplayString(unref(errors).name), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("label", {
                      for: "description",
                      class: "mb-1 block text-sm font-medium text-gray-700"
                    }, "Açıklama"),
                    withDirectives(createVNode("textarea", {
                      id: "description",
                      "onUpdate:modelValue": ($event) => unref(form).description = $event,
                      rows: "3",
                      class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).description]
                    ]),
                    unref(errors).description ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-1 text-sm text-red-500"
                    }, toDisplayString(unref(errors).description), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("label", {
                      for: "language",
                      class: "mb-1 block text-sm font-medium text-gray-700"
                    }, "Dil Kodu (2 karakter)"),
                    withDirectives(createVNode("select", {
                      id: "language",
                      "onUpdate:modelValue": ($event) => unref(form).language = $event,
                      class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500",
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
                    unref(errors).language ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-1 text-sm text-red-500"
                    }, toDisplayString(unref(errors).language), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: deleteLanguagePack,
                      class: "rounded-md bg-black px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
                      disabled: processing.value
                    }, toDisplayString(processing.value ? "Siliniyor..." : "Sil"), 9, ["disabled"]),
                    createVNode("button", {
                      type: "button",
                      onClick: goBack,
                      class: "rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    }, " İptal "),
                    createVNode("button", {
                      type: "submit",
                      class: "rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500",
                      disabled: processing.value
                    }, toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
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
