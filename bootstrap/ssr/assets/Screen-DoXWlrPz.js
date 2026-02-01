import { computed, ref, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, withKeys, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import _sfc_main$2 from "./BulkImportTab-DKBKZPdS.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePacks: { type: Array, default: () => [] },
    incompleteWords: { type: Array, default: () => [] },
    incompleteWordsCount: { type: Number, default: 0 },
    // Toplam yarım kalan sayısı
    error: String,
    screen: Object
  },
  setup(__props) {
    const errors = computed(() => usePage().props.errors);
    const processing = ref(false);
    const newSynonym = ref("");
    const showIncompleteList = ref(false);
    const activeTab = ref("single");
    const form = useForm({
      word: "",
      meanings: [{ meaning: "", is_primary: true }],
      type: "",
      language: "en",
      difficulty_level: 2,
      learning_status: 0,
      flag: false,
      language_pack_ids: [],
      example_sentences: [],
      example_translations: [],
      synonyms: []
    });
    const duplicateCheck = ref({
      checking: false,
      exists: false,
      existingWord: null,
      message: ""
    });
    let checkTimer = null;
    const checkForDuplicate = async () => {
      if (!form.word || !form.language) {
        duplicateCheck.value = {
          checking: false,
          exists: false,
          existingWord: null,
          message: ""
        };
        return;
      }
      duplicateCheck.value.checking = true;
      try {
        const response = await axios.post(route("rendition.words.check-duplicate"), {
          word: form.word,
          language: form.language,
          type: form.type || null
        });
        if (response.data.exists) {
          duplicateCheck.value = {
            checking: false,
            exists: true,
            existingWord: response.data.word,
            message: response.data.message
          };
        } else {
          duplicateCheck.value = {
            checking: false,
            exists: false,
            existingWord: null,
            message: ""
          };
        }
      } catch (error) {
        console.error("Duplicate check error:", error);
        duplicateCheck.value.checking = false;
      }
    };
    const debouncedCheck = () => {
      clearTimeout(checkTimer);
      checkTimer = setTimeout(() => {
        checkForDuplicate();
      }, 500);
    };
    watch([() => form.word, () => form.language, () => form.type], () => {
      debouncedCheck();
    });
    const editExistingWord = () => {
      if (duplicateCheck.value.existingWord) {
        router.visit(duplicateCheck.value.existingWord.edit_url);
      }
    };
    const getWordTypeLabel = (type) => {
      const types = {
        noun: "İsim",
        verb: "Fiil",
        adjective: "Sıfat",
        adverb: "Zarf",
        pronoun: "Zamir",
        preposition: "Edat",
        conjunction: "Bağlaç",
        interjection: "Ünlem",
        phrase: "Deyim"
      };
      return types[type] || type;
    };
    const togglePack = (packId) => {
      const index = form.language_pack_ids.indexOf(packId);
      if (index > -1) {
        form.language_pack_ids.splice(index, 1);
      } else {
        form.language_pack_ids.push(packId);
      }
    };
    const addMeaning = () => {
      form.meanings.push({ meaning: "", is_primary: false });
    };
    const addMeaningAndFocus = async (currentIndex) => {
      form.meanings.push({ meaning: "", is_primary: false });
      await nextTick();
      const inputs = document.querySelectorAll('input[placeholder*="anlam"]');
      if (inputs[currentIndex + 1]) {
        inputs[currentIndex + 1].focus();
      }
    };
    const removeMeaning = (index) => {
      form.meanings.splice(index, 1);
    };
    const setPrimaryMeaning = (index) => {
      form.meanings.forEach((m, i) => {
        m.is_primary = i === index;
      });
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
      if (!form.word.trim()) return;
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
            _push2(`<div class="space-y-6 py-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>Yeni Kelime</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Tek kelime veya toplu olarak ekleyebilirsiniz</p></div><div class="flex gap-2 border-b border-border"${_scopeId}><button class="${ssrRenderClass([activeTab.value === "single" ? "text-primary" : "text-muted-foreground hover:text-foreground", "relative px-4 py-2 text-sm font-medium transition-colors"])}"${_scopeId}> Tek Kelime `);
            if (activeTab.value === "single") {
              _push2(`<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button class="${ssrRenderClass([activeTab.value === "bulk" ? "text-primary" : "text-muted-foreground hover:text-foreground", "relative px-4 py-2 text-sm font-medium transition-colors"])}"${_scopeId}> Toplu Ekleme `);
            if (activeTab.value === "bulk") {
              _push2(`<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div>`);
            if (activeTab.value === "single") {
              _push2(`<div${_scopeId}>`);
              if (__props.incompleteWordsCount > 0) {
                _push2(`<div class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><div class="flex-1"${_scopeId}><h3 class="font-medium text-yellow-800 dark:text-yellow-200"${_scopeId}>${ssrInterpolate(__props.incompleteWordsCount)} yarım kalan kelime var </h3><p class="mt-1 text-sm text-yellow-700 dark:text-yellow-300"${_scopeId}> Bu kelimelerin anlamları henüz girilmemiş. </p><button class="mt-2 text-sm font-medium text-yellow-800 underline hover:no-underline dark:text-yellow-200"${_scopeId}>${ssrInterpolate(showIncompleteList.value ? "Gizle" : "Tamamla")}</button></div></div>`);
                if (showIncompleteList.value) {
                  _push2(`<div class="mt-4 space-y-2"${_scopeId}><!--[-->`);
                  ssrRenderList(__props.incompleteWords, (word) => {
                    _push2(ssrRenderComponent(unref(Link), {
                      key: word.id,
                      href: `/rendition/words/${word.id}/edit`,
                      class: "flex items-center justify-between rounded-md border border-yellow-500/20 bg-background p-3 transition-colors hover:bg-accent"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}><span class="font-medium text-foreground"${_scopeId2}>${ssrInterpolate(word.word)}</span><span class="ml-2 text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(word.language.toUpperCase())}</span>`);
                          if (word.type) {
                            _push3(`<span class="ml-2 text-xs text-muted-foreground"${_scopeId2}>(${ssrInterpolate(getWordTypeLabel(word.type))})</span>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div><div class="flex items-center gap-2 text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(word.created_at)}</span><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(word.word), 1),
                              createVNode("span", { class: "ml-2 text-xs text-muted-foreground" }, toDisplayString(word.language.toUpperCase()), 1),
                              word.type ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "ml-2 text-xs text-muted-foreground"
                              }, "(" + toDisplayString(getWordTypeLabel(word.type)) + ")", 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                              createVNode("span", null, toDisplayString(word.created_at), 1),
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
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                  if (__props.incompleteWordsCount > 20) {
                    _push2(`<p class="text-xs text-center text-muted-foreground pt-2"${_scopeId}> ... ve ${ssrInterpolate(__props.incompleteWordsCount - 20)} kelime daha </p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<form class="space-y-6"${_scopeId}><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Temel Bilgiler</h2><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}> Kelime <span class="text-destructive"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).word)} type="text" placeholder="Kelimeyi girin..." class="${ssrRenderClass([{ "border-destructive": errors.value.word || duplicateCheck.value.exists }, "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}" required${_scopeId}>`);
              if (errors.value.word) {
                _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.word)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (duplicateCheck.value.checking) {
                _push2(`<p class="text-xs text-muted-foreground"${_scopeId}><span class="inline-block animate-spin"${_scopeId}>⏳</span> Kontrol ediliyor... </p>`);
              } else {
                _push2(`<!---->`);
              }
              if (duplicateCheck.value.exists) {
                _push2(`<div class="rounded-lg border border-destructive/30 bg-destructive/10 p-3"${_scopeId}><div class="flex items-start gap-2"${_scopeId}><svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><div class="flex-1"${_scopeId}><p class="text-xs font-medium text-destructive"${_scopeId}>${ssrInterpolate(duplicateCheck.value.message)}</p><button type="button" class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-destructive underline hover:no-underline"${_scopeId}> Mevcut kelimeyi düzenle <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}> Dil <span class="text-destructive"${_scopeId}>*</span></label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option></select></div></div></div><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Anlam</h2><p class="text-xs text-muted-foreground"${_scopeId}>Boş bırakırsanız &quot;yarım kalan&quot; olarak kaydedilir</p></div></div><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).meanings, (meaning, index) => {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><input${ssrRenderAttr("value", meaning.meaning)} type="text"${ssrRenderAttr("placeholder", `${index + 1}. anlam`)} class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><label class="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground"${_scopeId}><input type="radio" name="primaryMeaning"${ssrIncludeBooleanAttr(meaning.is_primary) ? " checked" : ""} class="h-3.5 w-3.5"${_scopeId}> Birincil </label>`);
                if (unref(form).meanings.length > 1) {
                  _push2(`<button type="button" class="rounded-lg p-2 text-destructive hover:bg-destructive/10"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><button type="button" class="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Anlam Ekle </button></div></div><details class="group rounded-xl bg-card ring-1 ring-border/50"${_scopeId}><summary class="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground"${_scopeId}><span${_scopeId}>Detaylar (Opsiyonel)</span><svg class="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"${_scopeId}></path></svg></summary><div class="space-y-6 border-t border-border p-6"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Tür</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Seçiniz</option><option value="noun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "noun") : ssrLooseEqual(unref(form).type, "noun")) ? " selected" : ""}${_scopeId}>İsim (Noun)</option><option value="verb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "verb") : ssrLooseEqual(unref(form).type, "verb")) ? " selected" : ""}${_scopeId}>Fiil (Verb)</option><option value="adjective"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adjective") : ssrLooseEqual(unref(form).type, "adjective")) ? " selected" : ""}${_scopeId}>Sıfat (Adjective)</option><option value="adverb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adverb") : ssrLooseEqual(unref(form).type, "adverb")) ? " selected" : ""}${_scopeId}>Zarf (Adverb)</option><option value="pronoun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pronoun") : ssrLooseEqual(unref(form).type, "pronoun")) ? " selected" : ""}${_scopeId}>Zamir (Pronoun)</option><option value="preposition"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preposition") : ssrLooseEqual(unref(form).type, "preposition")) ? " selected" : ""}${_scopeId}>Edat (Preposition)</option><option value="conjunction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "conjunction") : ssrLooseEqual(unref(form).type, "conjunction")) ? " selected" : ""}${_scopeId}>Bağlaç (Conjunction)</option><option value="interjection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "interjection") : ssrLooseEqual(unref(form).type, "interjection")) ? " selected" : ""}${_scopeId}>Ünlem (Interjection)</option><option value="phrase"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "phrase") : ssrLooseEqual(unref(form).type, "phrase")) ? " selected" : ""}${_scopeId}>Deyim (Phrase)</option></select></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Zorluk</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 1) : ssrLooseEqual(unref(form).difficulty_level, 1)) ? " selected" : ""}${_scopeId}>Kolay</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 2) : ssrLooseEqual(unref(form).difficulty_level, 2)) ? " selected" : ""}${_scopeId}>Orta</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 3) : ssrLooseEqual(unref(form).difficulty_level, 3)) ? " selected" : ""}${_scopeId}>Zor</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 4) : ssrLooseEqual(unref(form).difficulty_level, 4)) ? " selected" : ""}${_scopeId}>Çok Zor</option></select></div></div>`);
              if (__props.languagePacks.length > 0) {
                _push2(`<div class="space-y-3"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Dil Paketleri</label><div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
                ssrRenderList(__props.languagePacks, (pack) => {
                  _push2(`<button type="button" class="${ssrRenderClass([unref(form).language_pack_ids.includes(pack.id) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50", "flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors"])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(pack.name)}</span><span class="text-xs opacity-70"${_scopeId}>${ssrInterpolate(pack.language.toUpperCase())}</span></button>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="space-y-3"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Örnek Cümleler</label><!--[-->`);
              ssrRenderList(unref(form).example_sentences, (_2, index) => {
                _push2(`<div class="flex gap-2"${_scopeId}><input${ssrRenderAttr("value", unref(form).example_sentences[index])} type="text" placeholder="Örnek cümle..." class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><input${ssrRenderAttr("value", unref(form).example_translations[index])} type="text" placeholder="Çeviri..." class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><button type="button" class="rounded-lg p-2 text-destructive hover:bg-destructive/10"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
              });
              _push2(`<!--]--><button type="button" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Örnek Cümle Ekle </button></div><div class="space-y-3"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Eş Anlamlılar</label><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).synonyms, (synonym, index) => {
                _push2(`<span class="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"${_scopeId}>${ssrInterpolate(synonym)} <button type="button" class="ml-1 text-muted-foreground hover:text-destructive"${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></span>`);
              });
              _push2(`<!--]--></div><div class="flex gap-2"${_scopeId}><input${ssrRenderAttr("value", newSynonym.value)} type="text" placeholder="Eş anlamlı kelime..." class="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><button type="button" class="rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"${_scopeId}> Ekle </button></div></div></div></details><div class="flex items-center justify-end gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/rendition/words",
                class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` İptal `);
                  } else {
                    return [
                      createTextVNode(" İptal ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value || !unref(form).word.trim() || duplicateCheck.value.exists || duplicateCheck.value.checking) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Kaydet")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "bulk") {
              _push2(ssrRenderComponent(_sfc_main$2, {
                "language-packs": __props.languagePacks,
                onCancel: ($event) => activeTab.value = "single"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 py-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-2xl font-bold text-foreground" }, "Yeni Kelime"),
                  createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tek kelime veya toplu olarak ekleyebilirsiniz")
                ]),
                createVNode("div", { class: "flex gap-2 border-b border-border" }, [
                  createVNode("button", {
                    onClick: ($event) => activeTab.value = "single",
                    class: ["relative px-4 py-2 text-sm font-medium transition-colors", activeTab.value === "single" ? "text-primary" : "text-muted-foreground hover:text-foreground"]
                  }, [
                    createTextVNode(" Tek Kelime "),
                    activeTab.value === "single" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    })) : createCommentVNode("", true)
                  ], 10, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => activeTab.value = "bulk",
                    class: ["relative px-4 py-2 text-sm font-medium transition-colors", activeTab.value === "bulk" ? "text-primary" : "text-muted-foreground hover:text-foreground"]
                  }, [
                    createTextVNode(" Toplu Ekleme "),
                    activeTab.value === "bulk" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    })) : createCommentVNode("", true)
                  ], 10, ["onClick"])
                ]),
                activeTab.value === "single" ? (openBlock(), createBlock("div", { key: 0 }, [
                  __props.incompleteWordsCount > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"
                  }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      (openBlock(), createBlock("svg", {
                        class: "mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        })
                      ])),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h3", { class: "font-medium text-yellow-800 dark:text-yellow-200" }, toDisplayString(__props.incompleteWordsCount) + " yarım kalan kelime var ", 1),
                        createVNode("p", { class: "mt-1 text-sm text-yellow-700 dark:text-yellow-300" }, " Bu kelimelerin anlamları henüz girilmemiş. "),
                        createVNode("button", {
                          onClick: ($event) => showIncompleteList.value = !showIncompleteList.value,
                          class: "mt-2 text-sm font-medium text-yellow-800 underline hover:no-underline dark:text-yellow-200"
                        }, toDisplayString(showIncompleteList.value ? "Gizle" : "Tamamla"), 9, ["onClick"])
                      ])
                    ]),
                    showIncompleteList.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-4 space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.incompleteWords, (word) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: word.id,
                          href: `/rendition/words/${word.id}/edit`,
                          class: "flex items-center justify-between rounded-md border border-yellow-500/20 bg-background p-3 transition-colors hover:bg-accent"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(word.word), 1),
                              createVNode("span", { class: "ml-2 text-xs text-muted-foreground" }, toDisplayString(word.language.toUpperCase()), 1),
                              word.type ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "ml-2 text-xs text-muted-foreground"
                              }, "(" + toDisplayString(getWordTypeLabel(word.type)) + ")", 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                              createVNode("span", null, toDisplayString(word.created_at), 1),
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
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"]);
                      }), 128)),
                      __props.incompleteWordsCount > 20 ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-center text-muted-foreground pt-2"
                      }, " ... ve " + toDisplayString(__props.incompleteWordsCount - 20) + " kelime daha ", 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                      createVNode("h2", { class: "mb-4 text-lg font-semibold text-foreground" }, "Temel Bilgiler"),
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, [
                            createTextVNode(" Kelime "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).word = $event,
                            type: "text",
                            placeholder: "Kelimeyi girin...",
                            class: ["w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary", { "border-destructive": errors.value.word || duplicateCheck.value.exists }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).word]
                          ]),
                          errors.value.word ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(errors.value.word), 1)) : createCommentVNode("", true),
                          duplicateCheck.value.checking ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-xs text-muted-foreground"
                          }, [
                            createVNode("span", { class: "inline-block animate-spin" }, "⏳"),
                            createTextVNode(" Kontrol ediliyor... ")
                          ])) : createCommentVNode("", true),
                          duplicateCheck.value.exists ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "rounded-lg border border-destructive/30 bg-destructive/10 p-3"
                          }, [
                            createVNode("div", { class: "flex items-start gap-2" }, [
                              (openBlock(), createBlock("svg", {
                                class: "mt-0.5 h-4 w-4 flex-shrink-0 text-destructive",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                })
                              ])),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-destructive" }, toDisplayString(duplicateCheck.value.message), 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: editExistingWord,
                                  class: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-destructive underline hover:no-underline"
                                }, [
                                  createTextVNode(" Mevcut kelimeyi düzenle "),
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
                                      d: "M9 5l7 7-7 7"
                                    })
                                  ]))
                                ])
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, [
                            createTextVNode(" Dil "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).language = $event,
                            class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          }, [
                            createVNode("option", { value: "en" }, "İngilizce (EN)"),
                            createVNode("option", { value: "tr" }, "Türkçe (TR)"),
                            createVNode("option", { value: "de" }, "Almanca (DE)"),
                            createVNode("option", { value: "fr" }, "Fransızca (FR)"),
                            createVNode("option", { value: "es" }, "İspanyolca (ES)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).language]
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Anlam"),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, 'Boş bırakırsanız "yarım kalan" olarak kaydedilir')
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).meanings, (meaning, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex items-center gap-3"
                          }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => meaning.meaning = $event,
                              type: "text",
                              placeholder: `${index + 1}. anlam`,
                              class: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                              onKeydown: withKeys(withModifiers(($event) => addMeaningAndFocus(index), ["prevent"]), ["enter"])
                            }, null, 40, ["onUpdate:modelValue", "placeholder", "onKeydown"]), [
                              [vModelText, meaning.meaning]
                            ]),
                            createVNode("label", { class: "flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground" }, [
                              createVNode("input", {
                                type: "radio",
                                name: "primaryMeaning",
                                checked: meaning.is_primary,
                                onChange: ($event) => setPrimaryMeaning(index),
                                class: "h-3.5 w-3.5"
                              }, null, 40, ["checked", "onChange"]),
                              createTextVNode(" Birincil ")
                            ]),
                            unref(form).meanings.length > 1 ? (openBlock(), createBlock("button", {
                              key: 0,
                              type: "button",
                              onClick: ($event) => removeMeaning(index),
                              class: "rounded-lg p-2 text-destructive hover:bg-destructive/10"
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
                        }), 128)),
                        createVNode("button", {
                          type: "button",
                          onClick: addMeaning,
                          class: "inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
                              d: "M12 4v16m8-8H4"
                            })
                          ])),
                          createTextVNode(" Anlam Ekle ")
                        ])
                      ])
                    ]),
                    createVNode("details", { class: "group rounded-xl bg-card ring-1 ring-border/50" }, [
                      createVNode("summary", { class: "flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground" }, [
                        createVNode("span", null, "Detaylar (Opsiyonel)"),
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 transition-transform group-open:rotate-180",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "space-y-6 border-t border-border p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-foreground" }, "Tür"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).type = $event,
                              class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            }, [
                              createVNode("option", { value: "" }, "Seçiniz"),
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
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-foreground" }, "Zorluk"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                              class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            }, [
                              createVNode("option", { value: 1 }, "Kolay"),
                              createVNode("option", { value: 2 }, "Orta"),
                              createVNode("option", { value: 3 }, "Zor"),
                              createVNode("option", { value: 4 }, "Çok Zor")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).difficulty_level]
                            ])
                          ])
                        ]),
                        __props.languagePacks.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, "Dil Paketleri"),
                          createVNode("div", { class: "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePacks, (pack) => {
                              return openBlock(), createBlock("button", {
                                key: pack.id,
                                type: "button",
                                onClick: ($event) => togglePack(pack.id),
                                class: ["flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors", unref(form).language_pack_ids.includes(pack.id) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"]
                              }, [
                                createVNode("span", null, toDisplayString(pack.name), 1),
                                createVNode("span", { class: "text-xs opacity-70" }, toDisplayString(pack.language.toUpperCase()), 1)
                              ], 10, ["onClick"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, "Örnek Cümleler"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).example_sentences, (_2, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "flex gap-2"
                            }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).example_sentences[index] = $event,
                                type: "text",
                                placeholder: "Örnek cümle...",
                                class: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).example_sentences[index]]
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).example_translations[index] = $event,
                                type: "text",
                                placeholder: "Çeviri...",
                                class: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).example_translations[index]]
                              ]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeExampleSentence(index),
                                class: "rounded-lg p-2 text-destructive hover:bg-destructive/10"
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
                            ]);
                          }), 128)),
                          createVNode("button", {
                            type: "button",
                            onClick: addExampleSentence,
                            class: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
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
                                d: "M12 4v16m8-8H4"
                              })
                            ])),
                            createTextVNode(" Örnek Cümle Ekle ")
                          ])
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, "Eş Anlamlılar"),
                          createVNode("div", { class: "flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).synonyms, (synonym, index) => {
                              return openBlock(), createBlock("span", {
                                key: index,
                                class: "inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                              }, [
                                createTextVNode(toDisplayString(synonym) + " ", 1),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSynonym(index),
                                  class: "ml-1 text-muted-foreground hover:text-destructive"
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
                              placeholder: "Eş anlamlı kelime...",
                              class: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                              onKeydown: withKeys(withModifiers(addSynonym, ["prevent"]), ["enter"])
                            }, null, 40, ["onUpdate:modelValue", "onKeydown"]), [
                              [vModelText, newSynonym.value]
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: addSynonym,
                              class: "rounded-lg border border-input px-3 py-2 text-sm hover:bg-accent"
                            }, " Ekle ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                      createVNode(unref(Link), {
                        href: "/rendition/words",
                        class: "rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value || !unref(form).word.trim() || duplicateCheck.value.exists || duplicateCheck.value.checking,
                        class: "rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      }, toDisplayString(processing.value ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
                    ])
                  ], 32)
                ])) : createCommentVNode("", true),
                activeTab.value === "bulk" ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 1,
                  "language-packs": __props.languagePacks,
                  onCancel: ($event) => activeTab.value = "single"
                }, null, 8, ["language-packs", "onCancel"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
