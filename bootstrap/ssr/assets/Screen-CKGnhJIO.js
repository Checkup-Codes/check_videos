import { computed, ref, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, vModelSelect, Fragment, renderList, withKeys, vModelCheckbox, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    word: Object,
    languagePacks: { type: Array, default: () => [] },
    screen: Object,
    error: String
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    const props = __props;
    const errors = computed(() => usePage().props.errors);
    const processing = ref(false);
    const newSynonym = ref("");
    const currentLanguagePackIds = ((_b = (_a = props.word) == null ? void 0 : _a.language_packs) == null ? void 0 : _b.map((pack) => pack.id)) || [];
    const exampleSentences = ((_d = (_c = props.word) == null ? void 0 : _c.example_sentences) == null ? void 0 : _d.map((s) => s.sentence)) || [];
    const exampleTranslations = ((_f = (_e = props.word) == null ? void 0 : _e.example_sentences) == null ? void 0 : _f.map((s) => s.translation)) || [];
    const synonyms = ((_h = (_g = props.word) == null ? void 0 : _g.synonyms) == null ? void 0 : _h.map((s) => s.synonym)) || [];
    const form = useForm({
      word: ((_i = props.word) == null ? void 0 : _i.word) || "",
      definition: ((_j = props.word) == null ? void 0 : _j.definition) || "",
      meanings: ((_l = (_k = props.word) == null ? void 0 : _k.meanings) == null ? void 0 : _l.length) > 0 ? props.word.meanings.map((m) => ({ meaning: m.meaning, is_primary: m.is_primary })) : [{ meaning: "", is_primary: true }],
      type: ((_m = props.word) == null ? void 0 : _m.type) || "",
      language: ((_n = props.word) == null ? void 0 : _n.language) || "en",
      learning_status: ((_o = props.word) == null ? void 0 : _o.learning_status) || 0,
      flag: ((_p = props.word) == null ? void 0 : _p.flag) || false,
      difficulty_level: ((_q = props.word) == null ? void 0 : _q.difficulty_level) || 2,
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
          var _a2, _b2;
          if (_push2) {
            if (props.error) {
              _push2(`<div class="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><svg class="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span class="text-sm text-destructive"${_scopeId}>${ssrInterpolate(props.error)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!props.word && !props.error) {
              _push2(`<div class="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4"${_scopeId}><p class="text-sm text-yellow-800 dark:text-yellow-200"${_scopeId}>Kelime bulunamadı.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/rendition/words",
                class: "mt-2 inline-block text-sm underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Kelime listesine dön`);
                  } else {
                    return [
                      createTextVNode("Kelime listesine dön")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.word) {
              _push2(`<div class="space-y-6 py-6"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(props.word.word)}</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Kelime bilgilerini düzenleyin</p></div>`);
              if (!props.word.is_complete) {
                _push2(`<span class="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300"${_scopeId}> Yarım Kalan </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><form class="space-y-6"${_scopeId}><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Temel Bilgiler</h2><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Kelime</label><input${ssrRenderAttr("value", unref(form).word)} type="text" class="${ssrRenderClass([{ "border-destructive": errors.value.word }, "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}" required${_scopeId}>`);
              if (errors.value.word) {
                _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.word)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Dil</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "en") : ssrLooseEqual(unref(form).language, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "tr") : ssrLooseEqual(unref(form).language, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "de") : ssrLooseEqual(unref(form).language, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "fr") : ssrLooseEqual(unref(form).language, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(form).language) ? ssrLooseContain(unref(form).language, "es") : ssrLooseEqual(unref(form).language, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option></select></div></div></div><div class="rounded-xl bg-card p-6 ring-1 ring-border/50"${_scopeId}><div class="mb-4"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Anlam</h2>`);
              if (!props.word.is_complete) {
                _push2(`<p class="text-xs text-yellow-600 dark:text-yellow-400"${_scopeId}> En az bir anlam girerek kelimeyi tamamlayın </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).meanings, (meaning, index) => {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><input${ssrRenderAttr("value", meaning.meaning)} type="text"${ssrRenderAttr("placeholder", `${index + 1}. anlam`)} class="${ssrRenderClass([{ "border-yellow-500": !props.word.is_complete && index === 0 && !meaning.meaning }, "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}"${_scopeId}><label class="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground"${_scopeId}><input type="radio" name="primaryMeaning"${ssrIncludeBooleanAttr(meaning.is_primary) ? " checked" : ""} class="h-3.5 w-3.5"${_scopeId}> Birincil </label>`);
                if (unref(form).meanings.length > 1) {
                  _push2(`<button type="button" class="rounded-lg p-2 text-destructive hover:bg-destructive/10"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><button type="button" class="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Anlam Ekle </button></div></div><details class="group rounded-xl bg-card ring-1 ring-border/50" open${_scopeId}><summary class="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground"${_scopeId}><span${_scopeId}>Detaylar</span><svg class="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"${_scopeId}></path></svg></summary><div class="space-y-6 border-t border-border p-6"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}> Definition (Öğrenilen Dilde Tanım) </label><textarea rows="3" placeholder="Enter the definition in the learning language (e.g., &#39;A vehicle with four wheels&#39;)" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}>${ssrInterpolate(unref(form).definition)}</textarea><p class="text-xs text-muted-foreground"${_scopeId}> Kelimenin öğrenilen dildeki tanımını girin (örn: &quot;Car&quot; için &quot;A vehicle with four wheels&quot;) </p></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-3"${_scopeId}><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Tür</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Seçiniz</option><option value="noun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "noun") : ssrLooseEqual(unref(form).type, "noun")) ? " selected" : ""}${_scopeId}>İsim (Noun)</option><option value="verb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "verb") : ssrLooseEqual(unref(form).type, "verb")) ? " selected" : ""}${_scopeId}>Fiil (Verb)</option><option value="adjective"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adjective") : ssrLooseEqual(unref(form).type, "adjective")) ? " selected" : ""}${_scopeId}>Sıfat (Adjective)</option><option value="adverb"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "adverb") : ssrLooseEqual(unref(form).type, "adverb")) ? " selected" : ""}${_scopeId}>Zarf (Adverb)</option><option value="pronoun"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pronoun") : ssrLooseEqual(unref(form).type, "pronoun")) ? " selected" : ""}${_scopeId}>Zamir (Pronoun)</option><option value="preposition"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preposition") : ssrLooseEqual(unref(form).type, "preposition")) ? " selected" : ""}${_scopeId}>Edat (Preposition)</option><option value="conjunction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "conjunction") : ssrLooseEqual(unref(form).type, "conjunction")) ? " selected" : ""}${_scopeId}>Bağlaç (Conjunction)</option><option value="interjection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "interjection") : ssrLooseEqual(unref(form).type, "interjection")) ? " selected" : ""}${_scopeId}>Ünlem (Interjection)</option><option value="phrase"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "phrase") : ssrLooseEqual(unref(form).type, "phrase")) ? " selected" : ""}${_scopeId}>Deyim (Phrase)</option></select></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Zorluk</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 1) : ssrLooseEqual(unref(form).difficulty_level, 1)) ? " selected" : ""}${_scopeId}>Kolay</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 2) : ssrLooseEqual(unref(form).difficulty_level, 2)) ? " selected" : ""}${_scopeId}>Orta</option><option${ssrRenderAttr("value", 3)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 3) : ssrLooseEqual(unref(form).difficulty_level, 3)) ? " selected" : ""}${_scopeId}>Zor</option><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, 4) : ssrLooseEqual(unref(form).difficulty_level, 4)) ? " selected" : ""}${_scopeId}>Çok Zor</option></select></div><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Öğrenme Durumu</label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId}><option${ssrRenderAttr("value", 0)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 0) : ssrLooseEqual(unref(form).learning_status, 0)) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 1) : ssrLooseEqual(unref(form).learning_status, 1)) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option${ssrRenderAttr("value", 2)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).learning_status) ? ssrLooseContain(unref(form).learning_status, 2) : ssrLooseEqual(unref(form).learning_status, 2)) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div></div><div class="grid grid-cols-2 gap-4 sm:grid-cols-4"${_scopeId}><div class="rounded-lg bg-muted/50 p-3 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(props.word.review_count || 0)}</div><div class="text-xs text-muted-foreground"${_scopeId}>İnceleme</div></div><div class="rounded-lg bg-muted/50 p-3 text-center"${_scopeId}><div class="text-2xl font-bold text-destructive"${_scopeId}>${ssrInterpolate(props.word.incorrect_count || 0)}</div><div class="text-xs text-muted-foreground"${_scopeId}>Yanlış</div></div><div class="rounded-lg bg-muted/50 p-3 text-center"${_scopeId}><div class="text-lg font-bold text-foreground"${_scopeId}>${ssrInterpolate((_a2 = props.word.language) == null ? void 0 : _a2.toUpperCase())}</div><div class="text-xs text-muted-foreground"${_scopeId}>Dil</div></div><div class="rounded-lg bg-muted/50 p-3 text-center"${_scopeId}><label class="flex cursor-pointer flex-col items-center gap-1"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).flag) ? ssrLooseContain(unref(form).flag, null) : unref(form).flag) ? " checked" : ""} class="h-5 w-5 rounded"${_scopeId}><span class="text-xs text-muted-foreground"${_scopeId}>Öne Çıkar</span></label></div></div>`);
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
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value || !unref(form).word.trim()) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Kaydediliyor..." : "Güncelle")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.error ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4"
              }, [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5 text-destructive",
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
                  ])),
                  createVNode("span", { class: "text-sm text-destructive" }, toDisplayString(props.error), 1)
                ])
              ])) : createCommentVNode("", true),
              !props.word && !props.error ? (openBlock(), createBlock("div", {
                key: 1,
                class: "rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4"
              }, [
                createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, "Kelime bulunamadı."),
                createVNode(unref(Link), {
                  href: "/rendition/words",
                  class: "mt-2 inline-block text-sm underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Kelime listesine dön")
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              props.word ? (openBlock(), createBlock("div", {
                key: 2,
                class: "space-y-6 py-6"
              }, [
                createVNode("div", { class: "flex items-start justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(props.word.word), 1),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Kelime bilgilerini düzenleyin")
                  ]),
                  !props.word.is_complete ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300"
                  }, " Yarım Kalan ")) : createCommentVNode("", true)
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "rounded-xl bg-card p-6 ring-1 ring-border/50" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold text-foreground" }, "Temel Bilgiler"),
                    createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-foreground" }, "Kelime"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).word = $event,
                          type: "text",
                          class: ["w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary", { "border-destructive": errors.value.word }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).word]
                        ]),
                        errors.value.word ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-destructive"
                        }, toDisplayString(errors.value.word), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-foreground" }, "Dil"),
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
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Anlam"),
                      !props.word.is_complete ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-yellow-600 dark:text-yellow-400"
                      }, " En az bir anlam girerek kelimeyi tamamlayın ")) : createCommentVNode("", true)
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
                            class: ["flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary", { "border-yellow-500": !props.word.is_complete && index === 0 && !meaning.meaning }],
                            onKeydown: withKeys(withModifiers(($event) => addMeaningAndFocus(index), ["prevent"]), ["enter"])
                          }, null, 42, ["onUpdate:modelValue", "placeholder", "onKeydown"]), [
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
                  createVNode("details", {
                    class: "group rounded-xl bg-card ring-1 ring-border/50",
                    open: ""
                  }, [
                    createVNode("summary", { class: "flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground" }, [
                      createVNode("span", null, "Detaylar"),
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-foreground" }, " Definition (Öğrenilen Dilde Tanım) "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).definition = $event,
                          rows: "3",
                          placeholder: "Enter the definition in the learning language (e.g., 'A vehicle with four wheels')",
                          class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).definition]
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, ' Kelimenin öğrenilen dildeki tanımını girin (örn: "Car" için "A vehicle with four wheels") ')
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-3" }, [
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
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, "Öğrenme Durumu"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).learning_status = $event,
                            class: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          }, [
                            createVNode("option", { value: 0 }, "Öğrenilmedi"),
                            createVNode("option", { value: 1 }, "Öğreniliyor"),
                            createVNode("option", { value: 2 }, "Öğrenildi")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).learning_status]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4 sm:grid-cols-4" }, [
                        createVNode("div", { class: "rounded-lg bg-muted/50 p-3 text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(props.word.review_count || 0), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground" }, "İnceleme")
                        ]),
                        createVNode("div", { class: "rounded-lg bg-muted/50 p-3 text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-destructive" }, toDisplayString(props.word.incorrect_count || 0), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground" }, "Yanlış")
                        ]),
                        createVNode("div", { class: "rounded-lg bg-muted/50 p-3 text-center" }, [
                          createVNode("div", { class: "text-lg font-bold text-foreground" }, toDisplayString((_b2 = props.word.language) == null ? void 0 : _b2.toUpperCase()), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground" }, "Dil")
                        ]),
                        createVNode("div", { class: "rounded-lg bg-muted/50 p-3 text-center" }, [
                          createVNode("label", { class: "flex cursor-pointer flex-col items-center gap-1" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(form).flag = $event,
                              class: "h-5 w-5 rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).flag]
                            ]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "Öne Çıkar")
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
                      disabled: processing.value || !unref(form).word.trim(),
                      class: "rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    }, toDisplayString(processing.value ? "Kaydediliyor..." : "Güncelle"), 9, ["disabled"])
                  ])
                ], 32)
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
