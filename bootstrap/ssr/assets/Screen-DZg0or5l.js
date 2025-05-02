import { computed, ref, withCtx, unref, createBlock, createCommentVNode, openBlock, Fragment, renderList, createVNode, withDirectives, createTextVNode, toDisplayString, vModelCheckbox, vModelText, withKeys, withModifiers, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$3 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    error: String,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const errors = computed(() => usePage().props.errors);
    const processing = ref(false);
    const newSynonym = ref("");
    const form = useForm({
      word: "",
      meaning: "",
      type: "",
      language: "",
      difficulty_level: "",
      learning_status: 0,
      flag: false,
      language_pack_ids: [],
      example_sentences: [""],
      example_translations: [""],
      synonyms: []
    });
    const addExampleSentence = () => {
      form.example_sentences.push("");
      form.example_translations.push("");
    };
    const removeExampleSentence = (index) => {
      form.example_sentences.splice(index, 1);
      form.example_translations.splice(index, 1);
    };
    const addSynonym = () => {
      if (newSynonym.value.trim()) {
        form.synonyms.push(newSynonym.value.trim());
        newSynonym.value = "";
      }
    };
    const removeSynonym = (index) => {
      form.synonyms.splice(index, 1);
    };
    const submitForm = () => {
      processing.value = true;
      const validSentences = [];
      const validTranslations = [];
      form.example_sentences.forEach((sentence, index) => {
        if (sentence.trim()) {
          validSentences.push(sentence);
          validTranslations.push(form.example_translations[index] || "");
        }
      });
      form.example_sentences = validSentences;
      form.example_translations = validTranslations;
      form.post(route("rendition.words.store"), {
        onSuccess: () => {
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/rendition/words" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="divider"${_scopeId2}>Temel Bilgiler</div><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId2}><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Kelime</span></label><input type="text"${ssrRenderAttr("value", unref(form).word)} class="input input-bordered w-full" required${_scopeId2}>`);
                  if (errors.value.word) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.word)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Anlam</span></label><input type="text"${ssrRenderAttr("value", unref(form).meaning)} class="input input-bordered w-full" required${_scopeId2}>`);
                  if (errors.value.meaning) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.meaning)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Tür</span></label><select class="select select-bordered w-full" required${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId2}>Tür seçiniz</option><option value="noun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "noun") : ssrLooseEqual(unref(form).type, "noun")) ? " selected" : ""}${_scopeId2}>İsim (Noun)</option><option value="verb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "verb") : ssrLooseEqual(unref(form).type, "verb")) ? " selected" : ""}${_scopeId2}>Fiil (Verb)</option><option value="adjective"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adjective") : ssrLooseEqual(unref(form).type, "adjective")) ? " selected" : ""}${_scopeId2}>Sıfat (Adjective)</option><option value="adverb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adverb") : ssrLooseEqual(unref(form).type, "adverb")) ? " selected" : ""}${_scopeId2}>Zarf (Adverb)</option><option value="pronoun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pronoun") : ssrLooseEqual(unref(form).type, "pronoun")) ? " selected" : ""}${_scopeId2}>Zamir (Pronoun)</option><option value="preposition"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preposition") : ssrLooseEqual(unref(form).type, "preposition")) ? " selected" : ""}${_scopeId2}>Edat (Preposition)</option><option value="conjunction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "conjunction") : ssrLooseEqual(unref(form).type, "conjunction")) ? " selected" : ""}${_scopeId2}>Bağlaç (Conjunction)</option><option value="interjection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "interjection") : ssrLooseEqual(unref(form).type, "interjection")) ? " selected" : ""}${_scopeId2}>Ünlem (Interjection)</option><option value="phrase"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "phrase") : ssrLooseEqual(unref(form).type, "phrase")) ? " selected" : ""}${_scopeId2}>Deyim (Phrase)</option></select>`);
                  if (errors.value.type) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.type)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Dil</span></label><select class="select select-bordered w-full" required${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId2}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId2}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId2}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId2}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId2}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId2}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId2}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId2}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId2}>Arapça (AR)</option></select>`);
                  if (errors.value.language) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.language)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Zorluk Seviyesi</span></label><select class="select select-bordered w-full" required${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "") : ssrLooseEqual(unref(form).difficulty_level, "")) ? " selected" : ""}${_scopeId2}>Zorluk seviyesi seçiniz</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 1) : ssrLooseEqual(unref(form).difficulty_level, 1)) ? " selected" : ""}${_scopeId2}>Kolay</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 2) : ssrLooseEqual(unref(form).difficulty_level, 2)) ? " selected" : ""}${_scopeId2}>Orta</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 3) : ssrLooseEqual(unref(form).difficulty_level, 3)) ? " selected" : ""}${_scopeId2}>Zor</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 4) : ssrLooseEqual(unref(form).difficulty_level, 4)) ? " selected" : ""}${_scopeId2}>Çok Zor</option></select>`);
                  if (errors.value.difficulty_level) {
                    _push3(`<label class="label"${_scopeId2}><span class="label-text-alt text-error"${_scopeId2}>${ssrInterpolate(errors.value.difficulty_level)}</span></label>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="form-control w-full"${_scopeId2}><label class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Öğrenme Durumu</span></label><select class="select select-bordered w-full"${_scopeId2}><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 0) : ssrLooseEqual(unref(form).learning_status, 0)) ? " selected" : ""}${_scopeId2}>Öğrenilmedi</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 1) : ssrLooseEqual(unref(form).learning_status, 1)) ? " selected" : ""}${_scopeId2}>Öğreniliyor</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 2) : ssrLooseEqual(unref(form).learning_status, 2)) ? " selected" : ""}${_scopeId2}>Öğrenildi</option></select></div><div class="form-control"${_scopeId2}><label class="label cursor-pointer"${_scopeId2}><span class="label-text"${_scopeId2}>Öne Çıkar</span><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).flag) ? ssrLooseContain(unref(form).flag, null) : unref(form).flag) ? " checked" : ""} class="checkbox"${_scopeId2}></label></div></div><div class="divider"${_scopeId2}>Dil Paketleri</div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (props.languagePacks.length === 0) {
                          _push4(`<div class="text-sm opacity-70"${_scopeId3}> Henüz dil paketi bulunmamaktadır. </div>`);
                        } else {
                          _push4(`<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"${_scopeId3}><!--[-->`);
                          ssrRenderList(props.languagePacks, (pack) => {
                            _push4(`<div class="form-control"${_scopeId3}><label class="label cursor-pointer"${_scopeId3}><span class="label-text"${_scopeId3}>${ssrInterpolate(pack.name)} <span class="badge badge-sm badge-outline ml-1"${_scopeId3}>${ssrInterpolate(pack.language)}</span></span><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language_pack_ids) ? ssrLooseContain(unref(form).language_pack_ids, pack.id) : unref(form).language_pack_ids) ? " checked" : ""}${ssrRenderAttr("value", pack.id)} class="checkbox checkbox-sm"${_scopeId3}></label></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        }
                        if (errors.value.language_pack_ids) {
                          _push4(`<label class="label"${_scopeId3}><span class="label-text-alt text-error"${_scopeId3}>${ssrInterpolate(errors.value.language_pack_ids)}</span></label>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-sm opacity-70"
                          }, " Henüz dil paketi bulunmamaktadır. ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.languagePacks, (pack) => {
                              return openBlock(), createBlock("div", {
                                key: pack.id,
                                class: "form-control"
                              }, [
                                createVNode("label", { class: "label cursor-pointer" }, [
                                  createVNode("span", { class: "label-text" }, [
                                    createTextVNode(toDisplayString(pack.name) + " ", 1),
                                    createVNode("span", { class: "badge badge-sm badge-outline ml-1" }, toDisplayString(pack.language), 1)
                                  ]),
                                  withDirectives(createVNode("input", {
                                    type: "checkbox",
                                    "onUpdate:modelValue": ($event) => unref(form).language_pack_ids = $event,
                                    value: pack.id,
                                    class: "checkbox checkbox-sm"
                                  }, null, 8, ["onUpdate:modelValue", "value"]), [
                                    [vModelCheckbox, unref(form).language_pack_ids]
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])),
                          errors.value.language_pack_ids ? (openBlock(), createBlock("label", {
                            key: 2,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language_pack_ids), 1)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="divider"${_scopeId2}>Örnek Cümleler</div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(form).example_sentences, (sentence, index) => {
                          _push4(`<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId3}><div class="form-control w-full"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Cümle ${ssrInterpolate(index + 1)}</span></label><input${ssrRenderAttr("value", unref(form).example_sentences[index])} class="input input-bordered w-full"${_scopeId3}></div><div class="flex items-end gap-2"${_scopeId3}><div class="form-control w-full"${_scopeId3}><label class="label"${_scopeId3}><span class="label-text"${_scopeId3}>Çeviri</span></label><input${ssrRenderAttr("value", unref(form).example_translations[index])} class="input input-bordered w-full"${_scopeId3}></div><button type="button" class="btn btn-circle btn-outline btn-sm btn-error mb-2"${_scopeId3}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId3}></path></svg></button></div></div>`);
                        });
                        _push4(`<!--]--><button type="button" class="btn btn-outline btn-sm"${_scopeId3}>Örnek Cümle Ekle</button>`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (sentence, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"
                            }, [
                              createVNode("div", { class: "form-control w-full" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Cümle " + toDisplayString(index + 1), 1)
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                                  class: "input input-bordered w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).example_sentences[index]]
                                ])
                              ]),
                              createVNode("div", { class: "flex items-end gap-2" }, [
                                createVNode("div", { class: "form-control w-full" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Çeviri")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).example_translations[index] = $event,
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).example_translations[index]]
                                  ])
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeExampleSentence(index),
                                  class: "btn btn-circle btn-outline btn-sm btn-error mb-2"
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
                              ])
                            ]);
                          }), 128)),
                          createVNode("button", {
                            type: "button",
                            onClick: addExampleSentence,
                            class: "btn btn-outline btn-sm"
                          }, "Örnek Cümle Ekle")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="divider"${_scopeId2}>Eş Anlamlılar</div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-4 flex flex-wrap gap-2"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(form).synonyms, (synonym, index) => {
                          _push4(`<div class="badge badge-lg badge-outline gap-1"${_scopeId3}>${ssrInterpolate(synonym)} <button type="button" class="btn btn-circle btn-ghost btn-xs"${_scopeId3}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId3}></path></svg></button></div>`);
                        });
                        _push4(`<!--]--></div><div class="flex gap-2"${_scopeId3}><input${ssrRenderAttr("value", newSynonym.value)} type="text" class="input input-bordered w-full" placeholder="Yeni eş anlamlı kelime"${_scopeId3}><button type="button" class="btn btn-outline"${_scopeId3}>Ekle</button></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "mb-4 flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "badge badge-lg badge-outline gap-1"
                              }, [
                                createTextVNode(toDisplayString(synonym) + " ", 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSynonym(index),
                                  class: "btn btn-circle btn-ghost btn-xs"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-3 w-3",
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
                            }), 128))
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => newSynonym.value = $event,
                              type: "text",
                              class: "input input-bordered w-full",
                              placeholder: "Yeni eş anlamlı kelime",
                              onKeyup: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                            }, null, 40, ["onUpdate:modelValue", "onKeyup"]), [
                              [vModelText, newSynonym.value]
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: addSynonym,
                              class: "btn btn-outline"
                            }, "Ekle")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="divider"${_scopeId2}></div><div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("rendition.words.index"),
                    class: "btn btn-ghost"
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
                  _push3(`<button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId2}>`);
                  if (processing.value) {
                    _push3(`<span class="loading loading-spinner loading-sm"${_scopeId2}></span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Kaydet </button></div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "divider" }, "Temel Bilgiler"),
                      createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Kelime")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).word = $event,
                            class: "input input-bordered w-full",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).word]
                          ]),
                          errors.value.word ? (openBlock(), createBlock("label", {
                            key: 0,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.word), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Anlam")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(form).meaning = $event,
                            class: "input input-bordered w-full",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).meaning]
                          ]),
                          errors.value.meaning ? (openBlock(), createBlock("label", {
                            key: 0,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.meaning), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Tür")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            class: "select select-bordered w-full",
                            required: ""
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "Tür seçiniz"),
                            createVNode("option", { value: "noun" }, "İsim (Noun)"),
                            createVNode("option", { value: "verb" }, "Fiil (Verb)"),
                            createVNode("option", { value: "adjective" }, "Sıfat (Adjective)"),
                            createVNode("option", { value: "adverb" }, "Zarf (Adverb)"),
                            createVNode("option", { value: "pronoun" }, "Zamir (Pronoun)"),
                            createVNode("option", { value: "preposition" }, "Edat (Preposition)"),
                            createVNode("option", { value: "conjunction" }, "Bağlaç (Conjunction)"),
                            createVNode("option", { value: "interjection" }, "Ünlem (Interjection)"),
                            createVNode("option", { value: "phrase" }, "Deyim (Phrase)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).type]
                          ]),
                          errors.value.type ? (openBlock(), createBlock("label", {
                            key: 0,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.type), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Dil")
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
                          errors.value.language ? (openBlock(), createBlock("label", {
                            key: 0,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Zorluk Seviyesi")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                            class: "select select-bordered w-full",
                            required: ""
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "Zorluk seviyesi seçiniz"),
                            createVNode("option", { value: 1 }, "Kolay"),
                            createVNode("option", { value: 2 }, "Orta"),
                            createVNode("option", { value: 3 }, "Zor"),
                            createVNode("option", { value: 4 }, "Çok Zor")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).difficulty_level]
                          ]),
                          errors.value.difficulty_level ? (openBlock(), createBlock("label", {
                            key: 0,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.difficulty_level), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-control w-full" }, [
                          createVNode("label", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Öğrenme Durumu")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).learning_status = $event,
                            class: "select select-bordered w-full"
                          }, [
                            createVNode("option", { value: 0 }, "Öğrenilmedi"),
                            createVNode("option", { value: 1 }, "Öğreniliyor"),
                            createVNode("option", { value: 2 }, "Öğrenildi")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).learning_status]
                          ])
                        ]),
                        createVNode("div", { class: "form-control" }, [
                          createVNode("label", { class: "label cursor-pointer" }, [
                            createVNode("span", { class: "label-text" }, "Öne Çıkar"),
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(form).flag = $event,
                              class: "checkbox"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).flag]
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "divider" }, "Dil Paketleri"),
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-sm opacity-70"
                          }, " Henüz dil paketi bulunmamaktadır. ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.languagePacks, (pack) => {
                              return openBlock(), createBlock("div", {
                                key: pack.id,
                                class: "form-control"
                              }, [
                                createVNode("label", { class: "label cursor-pointer" }, [
                                  createVNode("span", { class: "label-text" }, [
                                    createTextVNode(toDisplayString(pack.name) + " ", 1),
                                    createVNode("span", { class: "badge badge-sm badge-outline ml-1" }, toDisplayString(pack.language), 1)
                                  ]),
                                  withDirectives(createVNode("input", {
                                    type: "checkbox",
                                    "onUpdate:modelValue": ($event) => unref(form).language_pack_ids = $event,
                                    value: pack.id,
                                    class: "checkbox checkbox-sm"
                                  }, null, 8, ["onUpdate:modelValue", "value"]), [
                                    [vModelCheckbox, unref(form).language_pack_ids]
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])),
                          errors.value.language_pack_ids ? (openBlock(), createBlock("label", {
                            key: 2,
                            class: "label"
                          }, [
                            createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language_pack_ids), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "divider" }, "Örnek Cümleler"),
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (sentence, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"
                            }, [
                              createVNode("div", { class: "form-control w-full" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Cümle " + toDisplayString(index + 1), 1)
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                                  class: "input input-bordered w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).example_sentences[index]]
                                ])
                              ]),
                              createVNode("div", { class: "flex items-end gap-2" }, [
                                createVNode("div", { class: "form-control w-full" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text" }, "Çeviri")
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).example_translations[index] = $event,
                                    class: "input input-bordered w-full"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).example_translations[index]]
                                  ])
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeExampleSentence(index),
                                  class: "btn btn-circle btn-outline btn-sm btn-error mb-2"
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
                              ])
                            ]);
                          }), 128)),
                          createVNode("button", {
                            type: "button",
                            onClick: addExampleSentence,
                            class: "btn btn-outline btn-sm"
                          }, "Örnek Cümle Ekle")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "divider" }, "Eş Anlamlılar"),
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-4 flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "badge badge-lg badge-outline gap-1"
                              }, [
                                createTextVNode(toDisplayString(synonym) + " ", 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSynonym(index),
                                  class: "btn btn-circle btn-ghost btn-xs"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-3 w-3",
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
                            }), 128))
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => newSynonym.value = $event,
                              type: "text",
                              class: "input input-bordered w-full",
                              placeholder: "Yeni eş anlamlı kelime",
                              onKeyup: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                            }, null, 40, ["onUpdate:modelValue", "onKeyup"]), [
                              [vModelText, newSynonym.value]
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: addSynonym,
                              class: "btn btn-outline"
                            }, "Ekle")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "divider" }),
                      createVNode("div", { class: "flex justify-end gap-2" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("rendition.words.index"),
                          class: "btn btn-ghost"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" İptal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: processing.value
                        }, [
                          processing.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "loading loading-spinner loading-sm"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Kaydet ")
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
              createVNode(_sfc_main$2, { url: "/rendition/words" }),
              createVNode(_sfc_main$3, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "divider" }, "Temel Bilgiler"),
                    createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Kelime")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).word = $event,
                          class: "input input-bordered w-full",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).word]
                        ]),
                        errors.value.word ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.word), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Anlam")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).meaning = $event,
                          class: "input input-bordered w-full",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).meaning]
                        ]),
                        errors.value.meaning ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.meaning), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Tür")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).type = $event,
                          class: "select select-bordered w-full",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Tür seçiniz"),
                          createVNode("option", { value: "noun" }, "İsim (Noun)"),
                          createVNode("option", { value: "verb" }, "Fiil (Verb)"),
                          createVNode("option", { value: "adjective" }, "Sıfat (Adjective)"),
                          createVNode("option", { value: "adverb" }, "Zarf (Adverb)"),
                          createVNode("option", { value: "pronoun" }, "Zamir (Pronoun)"),
                          createVNode("option", { value: "preposition" }, "Edat (Preposition)"),
                          createVNode("option", { value: "conjunction" }, "Bağlaç (Conjunction)"),
                          createVNode("option", { value: "interjection" }, "Ünlem (Interjection)"),
                          createVNode("option", { value: "phrase" }, "Deyim (Phrase)")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).type]
                        ]),
                        errors.value.type ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.type), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Dil")
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
                        errors.value.language ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Zorluk Seviyesi")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                          class: "select select-bordered w-full",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Zorluk seviyesi seçiniz"),
                          createVNode("option", { value: 1 }, "Kolay"),
                          createVNode("option", { value: 2 }, "Orta"),
                          createVNode("option", { value: 3 }, "Zor"),
                          createVNode("option", { value: 4 }, "Çok Zor")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).difficulty_level]
                        ]),
                        errors.value.difficulty_level ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.difficulty_level), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Öğrenme Durumu")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).learning_status = $event,
                          class: "select select-bordered w-full"
                        }, [
                          createVNode("option", { value: 0 }, "Öğrenilmedi"),
                          createVNode("option", { value: 1 }, "Öğreniliyor"),
                          createVNode("option", { value: 2 }, "Öğrenildi")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).learning_status]
                        ])
                      ]),
                      createVNode("div", { class: "form-control" }, [
                        createVNode("label", { class: "label cursor-pointer" }, [
                          createVNode("span", { class: "label-text" }, "Öne Çıkar"),
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => unref(form).flag = $event,
                            class: "checkbox"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).flag]
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "divider" }, "Dil Paketleri"),
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm opacity-70"
                        }, " Henüz dil paketi bulunmamaktadır. ")) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.languagePacks, (pack) => {
                            return openBlock(), createBlock("div", {
                              key: pack.id,
                              class: "form-control"
                            }, [
                              createVNode("label", { class: "label cursor-pointer" }, [
                                createVNode("span", { class: "label-text" }, [
                                  createTextVNode(toDisplayString(pack.name) + " ", 1),
                                  createVNode("span", { class: "badge badge-sm badge-outline ml-1" }, toDisplayString(pack.language), 1)
                                ]),
                                withDirectives(createVNode("input", {
                                  type: "checkbox",
                                  "onUpdate:modelValue": ($event) => unref(form).language_pack_ids = $event,
                                  value: pack.id,
                                  class: "checkbox checkbox-sm"
                                }, null, 8, ["onUpdate:modelValue", "value"]), [
                                  [vModelCheckbox, unref(form).language_pack_ids]
                                ])
                              ])
                            ]);
                          }), 128))
                        ])),
                        errors.value.language_pack_ids ? (openBlock(), createBlock("label", {
                          key: 2,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language_pack_ids), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "divider" }, "Örnek Cümleler"),
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (sentence, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"
                          }, [
                            createVNode("div", { class: "form-control w-full" }, [
                              createVNode("label", { class: "label" }, [
                                createVNode("span", { class: "label-text" }, "Cümle " + toDisplayString(index + 1), 1)
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                                class: "input input-bordered w-full"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).example_sentences[index]]
                              ])
                            ]),
                            createVNode("div", { class: "flex items-end gap-2" }, [
                              createVNode("div", { class: "form-control w-full" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Çeviri")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).example_translations[index] = $event,
                                  class: "input input-bordered w-full"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).example_translations[index]]
                                ])
                              ]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeExampleSentence(index),
                                class: "btn btn-circle btn-outline btn-sm btn-error mb-2"
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
                            ])
                          ]);
                        }), 128)),
                        createVNode("button", {
                          type: "button",
                          onClick: addExampleSentence,
                          class: "btn btn-outline btn-sm"
                        }, "Örnek Cümle Ekle")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "divider" }, "Eş Anlamlılar"),
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-4 flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "badge badge-lg badge-outline gap-1"
                            }, [
                              createTextVNode(toDisplayString(synonym) + " ", 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeSynonym(index),
                                class: "btn btn-circle btn-ghost btn-xs"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3 w-3",
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
                          }), 128))
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => newSynonym.value = $event,
                            type: "text",
                            class: "input input-bordered w-full",
                            placeholder: "Yeni eş anlamlı kelime",
                            onKeyup: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                          }, null, 40, ["onUpdate:modelValue", "onKeyup"]), [
                            [vModelText, newSynonym.value]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: addSynonym,
                            class: "btn btn-outline"
                          }, "Ekle")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("rendition.words.index"),
                        class: "btn btn-ghost"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-primary",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "loading loading-spinner loading-sm"
                        })) : createCommentVNode("", true),
                        createTextVNode(" Kaydet ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
