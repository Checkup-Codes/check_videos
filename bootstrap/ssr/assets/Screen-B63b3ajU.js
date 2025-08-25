import { computed, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, withModifiers, withDirectives, vModelText, Fragment, renderList, vModelCheckbox, vModelSelect, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
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
    word: Object,
    languagePacks: Array,
    screen: Object,
    error: String
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const props = __props;
    const errors = computed(() => usePage().props.errors);
    const processing = ref(false);
    const showAdvancedOptions = ref(false);
    const newSynonym = ref("");
    const currentLanguagePackIds = ((_b = (_a = props.word) == null ? void 0 : _a.language_packs) == null ? void 0 : _b.map((pack) => pack.id)) || [];
    const exampleSentences = ((_d = (_c = props.word) == null ? void 0 : _c.example_sentences) == null ? void 0 : _d.map((sentence) => sentence.sentence)) || [];
    const exampleTranslations = ((_f = (_e = props.word) == null ? void 0 : _e.example_sentences) == null ? void 0 : _f.map((sentence) => sentence.translation)) || [];
    const synonyms = ((_h = (_g = props.word) == null ? void 0 : _g.synonyms) == null ? void 0 : _h.map((synonym) => synonym.synonym)) || [];
    const form = useForm({
      word: ((_i = props.word) == null ? void 0 : _i.word) || "",
      meanings: ((_k = (_j = props.word) == null ? void 0 : _j.meanings) == null ? void 0 : _k.length) > 0 ? props.word.meanings.map((meaning) => ({
        meaning: meaning.meaning,
        is_primary: meaning.is_primary
      })) : [{ meaning: "", is_primary: true }],
      type: ((_l = props.word) == null ? void 0 : _l.type) || "",
      language: ((_m = props.word) == null ? void 0 : _m.language) || "en",
      learning_status: ((_n = props.word) == null ? void 0 : _n.learning_status) || 0,
      flag: ((_o = props.word) == null ? void 0 : _o.flag) || false,
      difficulty_level: ((_p = props.word) == null ? void 0 : _p.difficulty_level) || 2,
      language_pack_ids: currentLanguagePackIds,
      example_sentences: exampleSentences,
      example_translations: exampleTranslations,
      synonyms
    });
    const togglePack = (packId) => {
      const index = form.language_pack_ids.indexOf(packId);
      if (index > -1) {
        form.language_pack_ids.splice(index, 1);
      } else {
        form.language_pack_ids.push(packId);
      }
    };
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
    const addMeaning = () => {
      form.meanings.push({ meaning: "", is_primary: false });
    };
    const removeMeaning = (index) => {
      form.meanings.splice(index, 1);
    };
    const setPrimaryMeaning = (index) => {
      form.meanings.forEach((meaning, i) => {
        meaning.is_primary = i === index;
      });
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
      form.put(route("rendition.words.update", props.word.id), {
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
            if (props.error) {
              _push2(`<div class="mx-6 mt-6 rounded-md bg-red-50 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-red-800"${_scopeId}>${ssrInterpolate(props.error)}</h3></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!props.word && !props.error) {
              _push2(`<div class="mx-6 mt-6 rounded-md bg-yellow-50 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-yellow-800"${_scopeId}>Kelime bulunamadı veya yüklenemedi.</h3><div class="mt-2"${_scopeId}><a href="/rendition/words" class="text-sm font-medium text-yellow-800 underline"${_scopeId}>Kelime listesine dön</a></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.word) {
              _push2(`<div class="card bg-base-100 shadow-lg"${_scopeId}><div class="card-body p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="text-center"${_scopeId}><h1 class="text-2xl font-bold text-base-content"${_scopeId}>Kelime Düzenle</h1><p class="text-base-content/70"${_scopeId}>${ssrInterpolate(props.word.word)} kelimesinin bilgilerini güncelleyin</p></div><div class="space-y-4"${_scopeId}><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text font-semibold"${_scopeId}>Kelime</span></label><input type="text"${ssrRenderAttr("value", unref(form).word)} class="input-bordered input input-lg w-full" placeholder="Kelimeyi girin..." required${_scopeId}>`);
              if (errors.value.word) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.word)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text font-semibold"${_scopeId}>Anlamlar</span></label><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).meanings, (meaning, index) => {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><input type="text"${ssrRenderAttr("value", meaning.meaning)} class="input-bordered input w-full"${ssrRenderAttr("placeholder", `${index + 1}. anlam`)} required${_scopeId}><div class="form-control"${_scopeId}><label class="label cursor-pointer gap-2"${_scopeId}><span class="label-text text-xs"${_scopeId}>Birincil</span><input type="radio" name="primaryMeaning"${ssrIncludeBooleanAttr(meaning.is_primary) ? " checked" : ""} class="radio radio-primary radio-sm"${_scopeId}></label></div>`);
                if (unref(form).meanings.length > 1) {
                  _push2(`<button type="button" class="btn btn-error btn-outline btn-sm btn-circle"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
              if (errors.value.meanings) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.meanings)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-3"${_scopeId}><button type="button" class="btn btn-outline btn-sm w-full"${_scopeId}><svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg> Yeni Anlam Ekle </button></div></div></div><div class="space-y-4"${_scopeId}><div class="divider"${_scopeId}><span class="font-semibold text-base-content"${_scopeId}>Dil Paketleri</span></div>`);
              if (props.languagePacks.length === 0) {
                _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz dil paketi bulunmamaktadır.</span></div>`);
              } else {
                _push2(`<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
                ssrRenderList(props.languagePacks, (pack) => {
                  _push2(`<div class="${ssrRenderClass([{ "ring-2 ring-primary": unref(form).language_pack_ids.includes(pack.id) }, "card cursor-pointer bg-base-200 transition-colors hover:bg-base-300"])}"${_scopeId}><div class="card-body p-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-base-content"${_scopeId}>${ssrInterpolate(pack.name)}</h3><p class="text-base-content/70 text-sm"${_scopeId}>${ssrInterpolate(pack.description)}</p></div><div class="badge badge-primary"${_scopeId}>${ssrInterpolate(pack.language.toUpperCase())}</div></div><div class="text-base-content/60 mt-2 text-xs"${_scopeId}>${ssrInterpolate(pack.word_count || 0)} kelime</div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              if (errors.value.language_pack_ids) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.language_pack_ids)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="collapse collapse-arrow bg-base-200"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(showAdvancedOptions.value) ? ssrLooseContain(showAdvancedOptions.value, null) : showAdvancedOptions.value) ? " checked" : ""}${_scopeId}><div class="collapse-title font-semibold text-base-content"${_scopeId}>Daha Fazla Seçenek</div><div class="collapse-content"${_scopeId}><div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2"${_scopeId}><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Tür</span></label><select class="select-bordered select w-full"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Tür seçiniz</option><option value="noun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "noun") : ssrLooseEqual(unref(form).type, "noun")) ? " selected" : ""}${_scopeId}>İsim (Noun)</option><option value="verb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "verb") : ssrLooseEqual(unref(form).type, "verb")) ? " selected" : ""}${_scopeId}>Fiil (Verb)</option><option value="adjective"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adjective") : ssrLooseEqual(unref(form).type, "adjective")) ? " selected" : ""}${_scopeId}>Sıfat (Adjective)</option><option value="adverb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adverb") : ssrLooseEqual(unref(form).type, "adverb")) ? " selected" : ""}${_scopeId}>Zarf (Adverb)</option><option value="pronoun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pronoun") : ssrLooseEqual(unref(form).type, "pronoun")) ? " selected" : ""}${_scopeId}>Zamir (Pronoun)</option><option value="preposition"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preposition") : ssrLooseEqual(unref(form).type, "preposition")) ? " selected" : ""}${_scopeId}>Edat (Preposition)</option><option value="conjunction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "conjunction") : ssrLooseEqual(unref(form).type, "conjunction")) ? " selected" : ""}${_scopeId}>Bağlaç (Conjunction)</option><option value="interjection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "interjection") : ssrLooseEqual(unref(form).type, "interjection")) ? " selected" : ""}${_scopeId}>Ünlem (Interjection)</option><option value="phrase"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "phrase") : ssrLooseEqual(unref(form).type, "phrase")) ? " selected" : ""}${_scopeId}>Deyim (Phrase)</option></select>`);
              if (errors.value.type) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.type)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Dil</span></label><select class="select-bordered select w-full"${_scopeId}><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
              if (errors.value.language) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.language)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Zorluk Seviyesi</span></label><select class="select-bordered select w-full"${_scopeId}><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 1) : ssrLooseEqual(unref(form).difficulty_level, 1)) ? " selected" : ""}${_scopeId}>Kolay</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 2) : ssrLooseEqual(unref(form).difficulty_level, 2)) ? " selected" : ""}${_scopeId}>Orta</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 3) : ssrLooseEqual(unref(form).difficulty_level, 3)) ? " selected" : ""}${_scopeId}>Zor</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 4) : ssrLooseEqual(unref(form).difficulty_level, 4)) ? " selected" : ""}${_scopeId}>Çok Zor</option></select>`);
              if (errors.value.difficulty_level) {
                _push2(`<label class="label"${_scopeId}><span class="label-text-alt text-error"${_scopeId}>${ssrInterpolate(errors.value.difficulty_level)}</span></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Öğrenme Durumu</span></label><select class="select-bordered select w-full"${_scopeId}><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 0) : ssrLooseEqual(unref(form).learning_status, 0)) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 1) : ssrLooseEqual(unref(form).learning_status, 1)) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 2) : ssrLooseEqual(unref(form).learning_status, 2)) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div><div class="form-control"${_scopeId}><label class="label cursor-pointer"${_scopeId}><span class="label-text"${_scopeId}>Öne Çıkar</span><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).flag) ? ssrLooseContain(unref(form).flag, null) : unref(form).flag) ? " checked" : ""} class="checkbox checkbox-primary"${_scopeId}></label></div></div><div class="divider"${_scopeId}>İstatistikler</div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="stats shadow"${_scopeId}><div class="stat"${_scopeId}><div class="stat-title"${_scopeId}>Yanlış Sayısı</div><div class="stat-value"${_scopeId}>${ssrInterpolate(props.word.incorrect_count)}</div></div></div><div class="stats shadow"${_scopeId}><div class="stat"${_scopeId}><div class="stat-title"${_scopeId}>Toplam İnceleme</div><div class="stat-value"${_scopeId}>${ssrInterpolate(props.word.review_count)}</div></div></div></div><div class="divider"${_scopeId}>Örnek Cümleler</div><div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).example_sentences, (sentence, index) => {
                _push2(`<div class="grid grid-cols-1 gap-3 md:grid-cols-2"${_scopeId}><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Cümle ${ssrInterpolate(index + 1)}</span></label><input${ssrRenderAttr("value", unref(form).example_sentences[index])} class="input-bordered input w-full" placeholder="Örnek cümle..."${_scopeId}></div><div class="flex items-end gap-2"${_scopeId}><div class="form-control w-full"${_scopeId}><label class="label"${_scopeId}><span class="label-text"${_scopeId}>Çeviri</span></label><input${ssrRenderAttr("value", unref(form).example_translations[index])} class="input-bordered input w-full" placeholder="Cümle çevirisi..."${_scopeId}></div><button type="button" class="btn btn-error btn-outline btn-sm btn-circle mb-2"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
              });
              _push2(`<!--]--><button type="button" class="btn btn-outline btn-sm"${_scopeId}><svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg> Örnek Cümle Ekle </button></div><div class="divider"${_scopeId}>Eş Anlamlılar</div><div class="space-y-4"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).synonyms, (synonym, index) => {
                _push2(`<div class="badge badge-outline badge-lg gap-1"${_scopeId}>${ssrInterpolate(synonym)} <button type="button" class="btn btn-ghost btn-xs btn-circle"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
              });
              _push2(`<!--]--></div><div class="flex gap-2"${_scopeId}><input${ssrRenderAttr("value", newSynonym.value)} type="text" class="input-bordered input w-full" placeholder="Yeni eş anlamlı kelime"${_scopeId}><button type="button" class="btn btn-outline"${_scopeId}><svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg> Ekle </button></div></div></div></div><div class="divider"${_scopeId}></div><div class="flex justify-end gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.index"),
                class: "btn btn-outline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg> İptal `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "mr-2 h-4 w-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                        })
                      ])),
                      createTextVNode(" İptal ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button type="submit" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>`);
              if (processing.value) {
                _push2(`<span class="loading loading-spinner loading-sm"${_scopeId}></span>`);
              } else {
                _push2(`<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
              }
              _push2(` Değişiklikleri Kaydet </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/rendition/words" }),
              props.error ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mx-6 mt-6 rounded-md bg-red-50 p-4"
              }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex-shrink-0" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-red-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "ml-3" }, [
                    createVNode("h3", { class: "text-sm font-medium text-red-800" }, toDisplayString(props.error), 1)
                  ])
                ])
              ])) : createCommentVNode("", true),
              !props.word && !props.error ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mx-6 mt-6 rounded-md bg-yellow-50 p-4"
              }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex-shrink-0" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-yellow-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "ml-3" }, [
                    createVNode("h3", { class: "text-sm font-medium text-yellow-800" }, "Kelime bulunamadı veya yüklenemedi."),
                    createVNode("div", { class: "mt-2" }, [
                      createVNode("a", {
                        href: "/rendition/words",
                        class: "text-sm font-medium text-yellow-800 underline"
                      }, "Kelime listesine dön")
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              props.word ? (openBlock(), createBlock("div", {
                key: 2,
                class: "card bg-base-100 shadow-lg"
              }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "text-2xl font-bold text-base-content" }, "Kelime Düzenle"),
                      createVNode("p", { class: "text-base-content/70" }, toDisplayString(props.word.word) + " kelimesinin bilgilerini güncelleyin", 1)
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "form-control w-full" }, [
                        createVNode("label", { class: "label" }, [
                          createVNode("span", { class: "label-text font-semibold" }, "Kelime")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).word = $event,
                          class: "input-bordered input input-lg w-full",
                          placeholder: "Kelimeyi girin...",
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
                          createVNode("span", { class: "label-text font-semibold" }, "Anlamlar")
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).meanings, (meaning, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "flex items-center gap-3"
                            }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => meaning.meaning = $event,
                                class: "input-bordered input w-full",
                                placeholder: `${index + 1}. anlam`,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, meaning.meaning]
                              ]),
                              createVNode("div", { class: "form-control" }, [
                                createVNode("label", { class: "label cursor-pointer gap-2" }, [
                                  createVNode("span", { class: "label-text text-xs" }, "Birincil"),
                                  createVNode("input", {
                                    type: "radio",
                                    name: "primaryMeaning",
                                    checked: meaning.is_primary,
                                    onChange: ($event) => setPrimaryMeaning(index),
                                    class: "radio radio-primary radio-sm"
                                  }, null, 40, ["checked", "onChange"])
                                ])
                              ]),
                              unref(form).meanings.length > 1 ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                onClick: ($event) => removeMeaning(index),
                                class: "btn btn-error btn-outline btn-sm btn-circle"
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
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ]),
                        errors.value.meanings ? (openBlock(), createBlock("label", {
                          key: 0,
                          class: "label"
                        }, [
                          createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.meanings), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: addMeaning,
                            class: "btn btn-outline btn-sm w-full"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "mr-2 h-4 w-4",
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
                            createTextVNode(" Yeni Anlam Ekle ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "divider" }, [
                        createVNode("span", { class: "font-semibold text-base-content" }, "Dil Paketleri")
                      ]),
                      props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "alert alert-info"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-6 w-6 shrink-0 stroke-current"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, "Henüz dil paketi bulunmamaktadır.")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.languagePacks, (pack) => {
                          return openBlock(), createBlock("div", {
                            key: pack.id,
                            class: ["card cursor-pointer bg-base-200 transition-colors hover:bg-base-300", { "ring-2 ring-primary": unref(form).language_pack_ids.includes(pack.id) }],
                            onClick: ($event) => togglePack(pack.id)
                          }, [
                            createVNode("div", { class: "card-body p-4" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "font-semibold text-base-content" }, toDisplayString(pack.name), 1),
                                  createVNode("p", { class: "text-base-content/70 text-sm" }, toDisplayString(pack.description), 1)
                                ]),
                                createVNode("div", { class: "badge badge-primary" }, toDisplayString(pack.language.toUpperCase()), 1)
                              ]),
                              createVNode("div", { class: "text-base-content/60 mt-2 text-xs" }, toDisplayString(pack.word_count || 0) + " kelime", 1)
                            ])
                          ], 10, ["onClick"]);
                        }), 128))
                      ])),
                      errors.value.language_pack_ids ? (openBlock(), createBlock("label", {
                        key: 2,
                        class: "label"
                      }, [
                        createVNode("span", { class: "label-text-alt text-error" }, toDisplayString(errors.value.language_pack_ids), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "collapse collapse-arrow bg-base-200" }, [
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => showAdvancedOptions.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, showAdvancedOptions.value]
                      ]),
                      createVNode("div", { class: "collapse-title font-semibold text-base-content" }, "Daha Fazla Seçenek"),
                      createVNode("div", { class: "collapse-content" }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 pt-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "form-control w-full" }, [
                            createVNode("label", { class: "label" }, [
                              createVNode("span", { class: "label-text" }, "Tür")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).type = $event,
                              class: "select-bordered select w-full"
                            }, [
                              createVNode("option", { value: "" }, "Tür seçiniz"),
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
                              class: "select-bordered select w-full"
                            }, [
                              createVNode("option", { value: "en" }, "İngilizce (EN)"),
                              createVNode("option", { value: "tr" }, "Türkçe (TR)"),
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
                              class: "select-bordered select w-full"
                            }, [
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
                              class: "select-bordered select w-full"
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
                                class: "checkbox checkbox-primary"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).flag]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "divider" }, "İstatistikler"),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "stats shadow" }, [
                            createVNode("div", { class: "stat" }, [
                              createVNode("div", { class: "stat-title" }, "Yanlış Sayısı"),
                              createVNode("div", { class: "stat-value" }, toDisplayString(props.word.incorrect_count), 1)
                            ])
                          ]),
                          createVNode("div", { class: "stats shadow" }, [
                            createVNode("div", { class: "stat" }, [
                              createVNode("div", { class: "stat-title" }, "Toplam İnceleme"),
                              createVNode("div", { class: "stat-value" }, toDisplayString(props.word.review_count), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "divider" }, "Örnek Cümleler"),
                        createVNode("div", { class: "space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (sentence, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "grid grid-cols-1 gap-3 md:grid-cols-2"
                            }, [
                              createVNode("div", { class: "form-control w-full" }, [
                                createVNode("label", { class: "label" }, [
                                  createVNode("span", { class: "label-text" }, "Cümle " + toDisplayString(index + 1), 1)
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                                  class: "input-bordered input w-full",
                                  placeholder: "Örnek cümle..."
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
                                    class: "input-bordered input w-full",
                                    placeholder: "Cümle çevirisi..."
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).example_translations[index]]
                                  ])
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeExampleSentence(index),
                                  class: "btn btn-error btn-outline btn-sm btn-circle mb-2"
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
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "mr-1 h-4 w-4",
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
                            createTextVNode(" Örnek Cümle Ekle ")
                          ])
                        ]),
                        createVNode("div", { class: "divider" }, "Eş Anlamlılar"),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "badge badge-outline badge-lg gap-1"
                              }, [
                                createTextVNode(toDisplayString(synonym) + " ", 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSynonym(index),
                                  class: "btn btn-ghost btn-xs btn-circle"
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
                              class: "input-bordered input w-full",
                              placeholder: "Yeni eş anlamlı kelime",
                              onKeyup: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                            }, null, 40, ["onUpdate:modelValue", "onKeyup"]), [
                              [vModelText, newSynonym.value]
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: addSynonym,
                              class: "btn btn-outline"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "mr-1 h-4 w-4",
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
                              createTextVNode(" Ekle ")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "divider" }),
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("rendition.words.index"),
                        class: "btn btn-outline"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "mr-2 h-4 w-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-primary btn-lg",
                        disabled: processing.value
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "loading loading-spinner loading-sm"
                        })) : (openBlock(), createBlock("svg", {
                          key: 1,
                          class: "mr-2 h-5 w-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M5 13l4 4L19 7"
                          })
                        ])),
                        createTextVNode(" Değişiklikleri Kaydet ")
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
