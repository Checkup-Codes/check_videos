import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "WordsTable",
  __ssrInlineRender: true,
  props: {
    words: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref("");
    const languageFilter = ref("");
    const filteredWords = computed(() => {
      if (!props.words) return [];
      return props.words.filter((word) => {
        if (!word) return false;
        const matchesSearch = !searchQuery.value.trim() || word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLanguage = !languageFilter.value || word.language && word.language === languageFilter.value;
        return matchesSearch && matchesLanguage;
      });
    });
    const calculateSuccessRate = (word) => {
      var _a;
      if (!word) return 0;
      const reviewCount = word.review_count || 0;
      const incorrectCount = word.incorrect_count || 0;
      const difficulty = word.difficulty || 1;
      const sentenceCount = ((_a = word.sentences) == null ? void 0 : _a.length) || 0;
      const lastReviewDate = word.last_review_date ? new Date(word.last_review_date) : null;
      const now = /* @__PURE__ */ new Date();
      const reviewFactor = Math.min(reviewCount / 10, 1);
      const accuracy = reviewCount > 0 ? 1 - incorrectCount / reviewCount : 0;
      const difficultyFactor = 1 - (difficulty - 1) / 3;
      const sentenceFactor = Math.min(sentenceCount / 5, 1);
      const daysSinceLastReview = lastReviewDate ? (now - lastReviewDate) / (1e3 * 60 * 60 * 24) : 30;
      const recencyFactor = Math.max(0, 1 - daysSinceLastReview / 30);
      const penaltyFactor = Math.max(0, 1 - incorrectCount * 0.2);
      const successRate = Math.round(
        (accuracy * 0.3 + reviewFactor * 0.2 + difficultyFactor * 0.15 + sentenceFactor * 0.15 + recencyFactor * 0.1 + penaltyFactor * 0.1) * 100
      );
      return successRate;
    };
    const getSuccessStatus = (successRate) => {
      if (successRate >= 80) return "Çok İyi";
      if (successRate >= 60) return "İyi";
      if (successRate >= 40) return "Orta";
      if (successRate >= 20) return "Zayıf";
      return "Çok Zayıf";
    };
    const getSuccessColor = (successRate) => {
      if (successRate >= 80) return "text-green-600 dark:text-green-400";
      if (successRate >= 60) return "text-green-500 dark:text-green-400";
      if (successRate >= 40) return "text-yellow-500 dark:text-yellow-400";
      if (successRate >= 20) return "text-orange-500 dark:text-orange-400";
      return "text-red-500 dark:text-red-400";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden rounded-lg border bg-card shadow-sm" }, _attrs))}><div class="border-b border-border p-4"><div class="flex flex-wrap gap-4"><div class="min-w-[200px] flex-1"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime veya anlam ara..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></div><div class="min-w-[200px] flex-1"><select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><option value=""${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "") : ssrLooseEqual(languageFilter.value, "")) ? " selected" : ""}>Tüm Diller</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "tr") : ssrLooseEqual(languageFilter.value, "tr")) ? " selected" : ""}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "en") : ssrLooseEqual(languageFilter.value, "en")) ? " selected" : ""}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "de") : ssrLooseEqual(languageFilter.value, "de")) ? " selected" : ""}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "fr") : ssrLooseEqual(languageFilter.value, "fr")) ? " selected" : ""}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "es") : ssrLooseEqual(languageFilter.value, "es")) ? " selected" : ""}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "it") : ssrLooseEqual(languageFilter.value, "it")) ? " selected" : ""}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "ru") : ssrLooseEqual(languageFilter.value, "ru")) ? " selected" : ""}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "ar") : ssrLooseEqual(languageFilter.value, "ar")) ? " selected" : ""}>Arapça (AR)</option></select></div><button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"> Filtreleri Temizle </button></div></div>`);
      if (__props.isLoading) {
        _push(`<div class="p-8 text-center"><div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div><p class="mt-2 text-muted-foreground">Kelime listesi yükleniyor...</p></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-border"><thead class="bg-muted"><tr><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Kelime</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Anlam</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tür</th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"> Başarı Durumu </th>`);
        if (__props.showActions) {
          _push(`<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"> İşlemler </th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr></thead><tbody class="divide-y divide-border bg-background">`);
        if (filteredWords.value.length === 0) {
          _push(`<tr class="text-center"><td${ssrRenderAttr("colspan", __props.showActions ? 5 : 4)} class="px-6 py-4 text-sm text-muted-foreground">${ssrInterpolate(searchQuery.value || languageFilter.value ? "Arama kriterlerine uygun kelime bulunamadı." : "Henüz kelime bulunmamaktadır.")}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(filteredWords.value, (word) => {
          _push(`<tr class="hover:bg-muted/50"><td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">${ssrInterpolate((word == null ? void 0 : word.word) || "-")}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">${ssrInterpolate((word == null ? void 0 : word.meaning) || "-")}</td><td class="whitespace-nowrap px-6 py-4 text-sm capitalize text-muted-foreground">${ssrInterpolate((word == null ? void 0 : word.type) || "-")}</td><td class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground"><span class="${ssrRenderClass(getSuccessColor(calculateSuccessRate(word)))}">${ssrInterpolate(getSuccessStatus(calculateSuccessRate(word)))}</span><span class="ml-1 text-xs text-muted-foreground/70"> (${ssrInterpolate(calculateSuccessRate(word))}%) </span></td>`);
          if (__props.showActions) {
            _push(`<td class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground"><div class="flex space-x-3">`);
            if (word == null ? void 0 : word.id) {
              _push(`<a${ssrRenderAttr("href", _ctx.route("rendition.words.edit", word.id))} class="text-muted-foreground hover:text-primary transition-colors" title="Düzenle"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg></a>`);
            } else {
              _push(`<!---->`);
            }
            if ((word == null ? void 0 : word.id) && (word == null ? void 0 : word.word)) {
              _push(`<button class="text-muted-foreground hover:text-destructive transition-colors" title="Sil"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`<div class="border-t border-border bg-muted px-6 py-4"><p class="text-sm text-muted-foreground">Toplam Kelime Sayısı: ${ssrInterpolate(filteredWords.value.length)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/WordsTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
