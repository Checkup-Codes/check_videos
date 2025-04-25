import { ref, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelSelect, vModelCheckbox, Fragment, renderList, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    word: Object,
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const currentLanguagePackIds = props.word.language_packs.map((pack) => pack.id);
    const exampleSentences = props.word.example_sentences.map((sentence) => sentence.sentence);
    const exampleTranslations = props.word.example_sentences.map((sentence) => sentence.translation);
    const synonyms = props.word.synonyms.map((synonym) => synonym.synonym);
    const form = useForm({
      word: props.word.word,
      meaning: props.word.meaning,
      type: props.word.type,
      language: props.word.language,
      learning_status: props.word.learning_status,
      flag: props.word.flag,
      difficulty_level: props.word.difficulty_level,
      language_pack_ids: currentLanguagePackIds,
      example_sentences: exampleSentences,
      example_translations: exampleTranslations,
      synonyms
    });
    const processing = ref(false);
    const newSynonym = ref("");
    const getLanguageName = (code) => {
      const languages = {
        tr: "Türkçe",
        en: "İngilizce",
        de: "Almanca",
        fr: "Fransızca",
        es: "İspanyolca",
        it: "İtalyanca",
        ru: "Rusça",
        ar: "Arapça"
      };
      return languages[code] || code;
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
    const submitForm = () => {
      processing.value = true;
      form.put(route("rendition.words.update", props.word.id), {
        onSuccess: () => {
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const goBack = () => {
      router.visit(route("rendition.words.index"));
    };
    const errors = usePage().props.errors;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Kelime Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md"${_scopeId}><form${_scopeId}><div class="grid grid-cols-1 gap-6 md:grid-cols-2"${_scopeId}><div class="col-span-1 md:col-span-2"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-gray-700"${_scopeId}>Temel Bilgiler</h3></div><div class="mb-4"${_scopeId}><label for="word" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Kelime</label><input id="word"${ssrRenderAttr("value", unref(form).word)} type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2" required${_scopeId}>`);
            if (unref(errors).word) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).word)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="meaning" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Anlam</label><input id="meaning"${ssrRenderAttr("value", unref(form).meaning)} type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2" required${_scopeId}>`);
            if (unref(errors).meaning) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).meaning)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="type" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Tür</label><select id="type" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Tür seçiniz</option><option value="noun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "noun") : ssrLooseEqual(unref(form).type, "noun")) ? " selected" : ""}${_scopeId}>İsim (Noun)</option><option value="verb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "verb") : ssrLooseEqual(unref(form).type, "verb")) ? " selected" : ""}${_scopeId}>Fiil (Verb)</option><option value="adjective"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adjective") : ssrLooseEqual(unref(form).type, "adjective")) ? " selected" : ""}${_scopeId}>Sıfat (Adjective)</option><option value="adverb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adverb") : ssrLooseEqual(unref(form).type, "adverb")) ? " selected" : ""}${_scopeId}>Zarf (Adverb)</option><option value="pronoun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pronoun") : ssrLooseEqual(unref(form).type, "pronoun")) ? " selected" : ""}${_scopeId}>Zamir (Pronoun)</option><option value="preposition"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preposition") : ssrLooseEqual(unref(form).type, "preposition")) ? " selected" : ""}${_scopeId}>Edat (Preposition)</option><option value="conjunction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "conjunction") : ssrLooseEqual(unref(form).type, "conjunction")) ? " selected" : ""}${_scopeId}>Bağlaç (Conjunction)</option><option value="interjection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "interjection") : ssrLooseEqual(unref(form).type, "interjection")) ? " selected" : ""}${_scopeId}>Ünlem (Interjection)</option><option value="phrase"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "phrase") : ssrLooseEqual(unref(form).type, "phrase")) ? " selected" : ""}${_scopeId}>Deyim (Phrase)</option></select>`);
            if (unref(errors).type) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="language" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Dil</label><select id="language" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "") : ssrLooseEqual(unref(form).language, "")) ? " selected" : ""}${_scopeId}>Dil seçiniz</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "it") : ssrLooseEqual(unref(form).language, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ru") : ssrLooseEqual(unref(form).language, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "ar") : ssrLooseEqual(unref(form).language, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select>`);
            if (unref(errors).language) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).language)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="difficulty_level" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Zorluk Seviyesi</label><select id="difficulty_level" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "") : ssrLooseEqual(unref(form).difficulty_level, "")) ? " selected" : ""}${_scopeId}>Zorluk seviyesi seçiniz</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 1) : ssrLooseEqual(unref(form).difficulty_level, 1)) ? " selected" : ""}${_scopeId}>Kolay</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 2) : ssrLooseEqual(unref(form).difficulty_level, 2)) ? " selected" : ""}${_scopeId}>Orta</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 3) : ssrLooseEqual(unref(form).difficulty_level, 3)) ? " selected" : ""}${_scopeId}>Zor</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 4) : ssrLooseEqual(unref(form).difficulty_level, 4)) ? " selected" : ""}${_scopeId}>Çok Zor</option></select>`);
            if (unref(errors).difficulty_level) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).difficulty_level)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><label for="learning_status" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Öğrenme Durumu</label><select id="learning_status" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"${_scopeId}><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 0) : ssrLooseEqual(unref(form).learning_status, 0)) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 1) : ssrLooseEqual(unref(form).learning_status, 1)) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 2) : ssrLooseEqual(unref(form).learning_status, 2)) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select>`);
            if (unref(errors).learning_status) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).learning_status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-4"${_scopeId}><div class="flex items-center"${_scopeId}><input id="flag"${ssrIncludeBooleanAttr(Array.isArray(unref(form).flag) ? ssrLooseContain(unref(form).flag, null) : unref(form).flag) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black"${_scopeId}><label for="flag" class="ml-2 block text-sm text-gray-700"${_scopeId}>Öne Çıkar</label></div>`);
            if (unref(errors).flag) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).flag)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-span-1 mb-4 md:col-span-2"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-gray-700"${_scopeId}>İstatistikler</h3><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div class="rounded-md bg-gray-50 p-3"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>Yanlış Sayısı</div><div class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(props.word.incorrect_count)}</div></div><div class="rounded-md bg-gray-50 p-3"${_scopeId}><div class="text-sm text-gray-500"${_scopeId}>Toplam İnceleme</div><div class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(props.word.review_count)}</div></div></div></div><div class="col-span-1 mb-4 md:col-span-2"${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Dil Paketleri</label><div class="max-h-60 overflow-y-auto rounded-md border border-gray-300 p-3"${_scopeId}>`);
            if (props.languagePacks.length === 0) {
              _push2(`<div class="text-sm text-gray-500"${_scopeId}> Henüz dil paketi bulunmamaktadır. </div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 gap-2 md:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList(props.languagePacks, (pack) => {
                _push2(`<div class="flex items-center"${_scopeId}><input${ssrRenderAttr("id", `pack-${pack.id}`)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).language_pack_ids) ? ssrLooseContain(unref(form).language_pack_ids, pack.id) : unref(form).language_pack_ids) ? " checked" : ""}${ssrRenderAttr("value", pack.id)} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-500"${_scopeId}><label${ssrRenderAttr("for", `pack-${pack.id}`)} class="ml-2 block text-sm text-gray-700"${_scopeId}>${ssrInterpolate(pack.name)} (${ssrInterpolate(getLanguageName(pack.language))}) </label></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
            if (unref(errors).language_pack_ids) {
              _push2(`<div class="mt-1 text-sm text-red-500"${_scopeId}>${ssrInterpolate(unref(errors).language_pack_ids)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-span-1 md:col-span-2"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-gray-700"${_scopeId}>Örnek Cümleler</h3><!--[-->`);
            ssrRenderList(unref(form).example_sentences, (sentence, index) => {
              _push2(`<div class="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label${ssrRenderAttr("for", `sentence-${index}`)} class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Cümle</label><input${ssrRenderAttr("id", `sentence-${index}`)}${ssrRenderAttr("value", unref(form).example_sentences[index])} type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}></div><div class="flex items-end"${_scopeId}><div class="flex-grow"${_scopeId}><label${ssrRenderAttr("for", `translation-${index}`)} class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Çeviri</label><input${ssrRenderAttr("id", `translation-${index}`)}${ssrRenderAttr("value", unref(form).example_translations[index])} type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"${_scopeId}></div><button type="button" class="ml-2 px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></div>`);
            });
            _push2(`<!--]--><button type="button" class="mt-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> Örnek Cümle Ekle </button></div><div class="col-span-1 mb-6 md:col-span-2"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-gray-700"${_scopeId}>Eş Anlamlılar</h3><div class="mb-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).synonyms, (synonym, index) => {
              _push2(`<div class="flex items-center rounded-full bg-gray-100 px-3 py-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(synonym)}</span><button type="button" class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
            });
            _push2(`<!--]--></div><div class="flex"${_scopeId}><input${ssrRenderAttr("value", newSynonym.value)} type="text" placeholder="Eş anlamlı kelime ekleyin" class="flex-grow rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}><button type="button" class="rounded-r-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> Ekle </button></div></div></div><div class="mt-6 flex justify-end space-x-3"${_scopeId}><button type="button" class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> İptal </button><button type="submit" class="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Kelime Düzenle" }),
              createVNode("div", { class: "mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md" }, [
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"])
                }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2" }, [
                    createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-gray-700" }, "Temel Bilgiler")
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "word",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Kelime"),
                      withDirectives(createVNode("input", {
                        id: "word",
                        "onUpdate:modelValue": ($event) => unref(form).word = $event,
                        type: "text",
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).word]
                      ]),
                      unref(errors).word ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).word), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "meaning",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Anlam"),
                      withDirectives(createVNode("input", {
                        id: "meaning",
                        "onUpdate:modelValue": ($event) => unref(form).meaning = $event,
                        type: "text",
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).meaning]
                      ]),
                      unref(errors).meaning ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).meaning), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "type",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Tür"),
                      withDirectives(createVNode("select", {
                        id: "type",
                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2",
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
                      unref(errors).type ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).type), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "language",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Dil"),
                      withDirectives(createVNode("select", {
                        id: "language",
                        "onUpdate:modelValue": ($event) => unref(form).language = $event,
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2",
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
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "difficulty_level",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Zorluk Seviyesi"),
                      withDirectives(createVNode("select", {
                        id: "difficulty_level",
                        "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2",
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
                      unref(errors).difficulty_level ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).difficulty_level), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "learning_status",
                        class: "mb-1 block text-sm font-medium text-gray-700"
                      }, "Öğrenme Durumu"),
                      withDirectives(createVNode("select", {
                        id: "learning_status",
                        "onUpdate:modelValue": ($event) => unref(form).learning_status = $event,
                        class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
                      }, [
                        createVNode("option", { value: 0 }, "Öğrenilmedi"),
                        createVNode("option", { value: 1 }, "Öğreniliyor"),
                        createVNode("option", { value: 2 }, "Öğrenildi")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).learning_status]
                      ]),
                      unref(errors).learning_status ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).learning_status), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        withDirectives(createVNode("input", {
                          id: "flag",
                          "onUpdate:modelValue": ($event) => unref(form).flag = $event,
                          type: "checkbox",
                          class: "h-4 w-4 rounded border-gray-300 text-black"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).flag]
                        ]),
                        createVNode("label", {
                          for: "flag",
                          class: "ml-2 block text-sm text-gray-700"
                        }, "Öne Çıkar")
                      ]),
                      unref(errors).flag ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).flag), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "col-span-1 mb-4 md:col-span-2" }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-gray-700" }, "İstatistikler"),
                      createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                        createVNode("div", { class: "rounded-md bg-gray-50 p-3" }, [
                          createVNode("div", { class: "text-sm text-gray-500" }, "Yanlış Sayısı"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(props.word.incorrect_count), 1)
                        ]),
                        createVNode("div", { class: "rounded-md bg-gray-50 p-3" }, [
                          createVNode("div", { class: "text-sm text-gray-500" }, "Toplam İnceleme"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(props.word.review_count), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-span-1 mb-4 md:col-span-2" }, [
                      createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Dil Paketleri"),
                      createVNode("div", { class: "max-h-60 overflow-y-auto rounded-md border border-gray-300 p-3" }, [
                        props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-500"
                        }, " Henüz dil paketi bulunmamaktadır. ")) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "grid grid-cols-1 gap-2 md:grid-cols-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.languagePacks, (pack) => {
                            return openBlock(), createBlock("div", {
                              key: pack.id,
                              class: "flex items-center"
                            }, [
                              withDirectives(createVNode("input", {
                                id: `pack-${pack.id}`,
                                "onUpdate:modelValue": ($event) => unref(form).language_pack_ids = $event,
                                value: pack.id,
                                type: "checkbox",
                                class: "h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-500"
                              }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                                [vModelCheckbox, unref(form).language_pack_ids]
                              ]),
                              createVNode("label", {
                                for: `pack-${pack.id}`,
                                class: "ml-2 block text-sm text-gray-700"
                              }, toDisplayString(pack.name) + " (" + toDisplayString(getLanguageName(pack.language)) + ") ", 9, ["for"])
                            ]);
                          }), 128))
                        ]))
                      ]),
                      unref(errors).language_pack_ids ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-500"
                      }, toDisplayString(unref(errors).language_pack_ids), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-gray-700" }, "Örnek Cümleler"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (sentence, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "mb-3 grid grid-cols-1 gap-4 md:grid-cols-2"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: `sentence-${index}`,
                              class: "mb-1 block text-sm font-medium text-gray-700"
                            }, "Cümle", 8, ["for"]),
                            withDirectives(createVNode("input", {
                              id: `sentence-${index}`,
                              "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                              type: "text",
                              class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            }, null, 8, ["id", "onUpdate:modelValue"]), [
                              [vModelText, unref(form).example_sentences[index]]
                            ])
                          ]),
                          createVNode("div", { class: "flex items-end" }, [
                            createVNode("div", { class: "flex-grow" }, [
                              createVNode("label", {
                                for: `translation-${index}`,
                                class: "mb-1 block text-sm font-medium text-gray-700"
                              }, "Çeviri", 8, ["for"]),
                              withDirectives(createVNode("input", {
                                id: `translation-${index}`,
                                "onUpdate:modelValue": ($event) => unref(form).example_translations[index] = $event,
                                type: "text",
                                class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
                              }, null, 8, ["id", "onUpdate:modelValue"]), [
                                [vModelText, unref(form).example_translations[index]]
                              ])
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeExampleSentence(index),
                              class: "ml-2 px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ])
                        ]);
                      }), 128)),
                      createVNode("button", {
                        type: "button",
                        onClick: addExampleSentence,
                        class: "mt-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      }, " Örnek Cümle Ekle ")
                    ]),
                    createVNode("div", { class: "col-span-1 mb-6 md:col-span-2" }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-gray-700" }, "Eş Anlamlılar"),
                      createVNode("div", { class: "mb-2 flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex items-center rounded-full bg-gray-100 px-3 py-1"
                          }, [
                            createVNode("span", null, toDisplayString(synonym), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeSynonym(index),
                              class: "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                xmlns: "http://www.w3.org/2000/svg"
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
                      createVNode("div", { class: "flex" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => newSynonym.value = $event,
                          type: "text",
                          placeholder: "Eş anlamlı kelime ekleyin",
                          class: "flex-grow rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500",
                          onKeydown: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                        }, null, 40, ["onUpdate:modelValue", "onKeydown"]), [
                          [vModelText, newSynonym.value]
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: addSynonym,
                          class: "rounded-r-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        }, " Ekle ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 flex justify-end space-x-3" }, [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
