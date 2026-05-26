import { ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "BulkImportTab",
  __ssrInlineRender: true,
  props: {
    languagePacks: { type: Array, default: () => [] }
  },
  emits: ["cancel"],
  setup(__props) {
    const page = usePage();
    const jsonInput = ref("");
    const jsonError = ref("");
    const serverErrors = ref([]);
    const processing = ref(false);
    const showFormatInfo = ref(false);
    const selectedPacks = ref([]);
    const flattenValidationErrors = (errors) => {
      if (!errors || typeof errors !== "object") {
        return [];
      }
      const lines = [];
      Object.entries(errors).forEach(([key, value]) => {
        const messages = Array.isArray(value) ? value : [value];
        messages.forEach((message) => {
          if (!message) return;
          const wordMatch = key.match(/^words\.(\d+)\.(.+)$/);
          if (wordMatch) {
            const wordIndex = Number(wordMatch[1]) + 1;
            const field = wordMatch[2];
            lines.push(`${wordIndex}. kelime (${field}): ${message}`);
            return;
          }
          if (key === "words") {
            lines.push(String(message));
            return;
          }
          lines.push(`${key}: ${message}`);
        });
      });
      return lines;
    };
    const syncServerErrorsFromPage = () => {
      var _a, _b, _c, _d, _e;
      const pageErrors = flattenValidationErrors(page.props.errors);
      const flashError = (_a = page.props.flash) == null ? void 0 : _a.error;
      const bulkResults = (_b = page.props.flash) == null ? void 0 : _b.bulkResults;
      if (pageErrors.length > 0) {
        serverErrors.value = pageErrors;
        return;
      }
      if ((_c = bulkResults == null ? void 0 : bulkResults.errors) == null ? void 0 : _c.length) {
        serverErrors.value = bulkResults.errors.map(
          (item) => `${item.index + 1}. kelime (${item.word}): ${item.error}`
        );
        return;
      }
      if (flashError && !(((_d = bulkResults == null ? void 0 : bulkResults.duplicates) == null ? void 0 : _d.length) || ((_e = bulkResults == null ? void 0 : bulkResults.linked) == null ? void 0 : _e.length))) {
        serverErrors.value = [flashError];
        return;
      }
      serverErrors.value = [];
    };
    const bulkSummary = computed(() => {
      var _a, _b, _c, _d, _e;
      const bulkResults = (_a = page.props.flash) == null ? void 0 : _a.bulkResults;
      const flashError = (_b = page.props.flash) == null ? void 0 : _b.error;
      const flashSuccess = (_c = page.props.flash) == null ? void 0 : _c.success;
      if (flashError && ((_d = bulkResults == null ? void 0 : bulkResults.duplicates) == null ? void 0 : _d.length) && !((_e = bulkResults == null ? void 0 : bulkResults.linked) == null ? void 0 : _e.length)) {
        return {
          isError: true,
          title: "Kelime pakete eklenemedi",
          message: flashError,
          details: [
            "Bu kelimeler sözlükte zaten kayıtlı.",
            "Pakete eklemek için yukarıdan en az bir dil paketi seçip tekrar gönderin."
          ]
        };
      }
      if (flashError && bulkResults) {
        return {
          isError: true,
          title: "Toplu ekleme tamamlanamadı",
          message: flashError,
          details: (bulkResults.errors || []).map(
            (item) => `${item.index + 1}. kelime (${item.word}): ${item.error}`
          )
        };
      }
      if (flashSuccess && bulkResults) {
        const duplicateWords = (bulkResults.duplicates || []).slice(0, 5).map((item) => `${item.index + 1}. ${item.word}`);
        return {
          isError: false,
          title: "Toplu ekleme özeti",
          message: flashSuccess,
          details: duplicateWords.length ? [`Zaten kayıtlı örnekler: ${duplicateWords.join(", ")}${bulkResults.duplicates.length > 5 ? "…" : ""}`] : []
        };
      }
      return null;
    });
    watch(
      () => {
        var _a, _b;
        return [page.props.errors, (_a = page.props.flash) == null ? void 0 : _a.error, (_b = page.props.flash) == null ? void 0 : _b.bulkResults];
      },
      () => syncServerErrorsFromPage(),
      { deep: true, immediate: true }
    );
    const parsedWords = computed(() => {
      if (!jsonInput.value.trim()) {
        jsonError.value = "";
        return [];
      }
      try {
        const parsed = JSON.parse(jsonInput.value);
        if (!Array.isArray(parsed)) {
          jsonError.value = "JSON bir dizi (array) olmalıdır";
          return [];
        }
        for (let i = 0; i < parsed.length; i++) {
          const word = parsed[i];
          if (!word.word || !word.language) {
            jsonError.value = `${i + 1}. kelimede 'word' ve 'language' alanları zorunludur`;
            return [];
          }
          const hasMeaning = Array.isArray(word.meanings) && word.meanings.some((m) => {
            var _a;
            return (_a = typeof m === "string" ? m : m == null ? void 0 : m.meaning) == null ? void 0 : _a.trim();
          }) || typeof word.meaning === "string" && word.meaning.trim();
          if (!hasMeaning) {
            jsonError.value = `${i + 1}. kelimede anlam zorunludur. "meanings" veya "meaning" alanı ekleyin`;
            return [];
          }
          const language = String(word.language).trim().toLowerCase();
          if (language.length !== 2) {
            jsonError.value = `${i + 1}. kelimede dil kodu tam 2 harf olmalıdır (örn: en, tr). Gönderilen: "${word.language}"`;
            return [];
          }
          if (word.difficulty_level !== void 0 && word.difficulty_level !== null && word.difficulty_level !== "") {
            const level = Number(word.difficulty_level);
            if (Number.isNaN(level) || level < 1 || level > 4) {
              jsonError.value = `${i + 1}. kelimede difficulty_level 1 ile 4 arasında olmalıdır`;
              return [];
            }
          }
        }
        jsonError.value = "";
        return parsed;
      } catch (e) {
        jsonError.value = "Geçersiz JSON formatı: " + e.message;
        return [];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="rounded-xl border border-primary/20 bg-primary/5 p-4"><div class="flex items-start gap-3"><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="flex-1"><h3 class="font-medium text-foreground">Toplu Kelime Ekleme</h3><p class="mt-1 text-sm text-muted-foreground"> JSON formatında birden fazla kelime ekleyebilirsiniz. Format örneği için bilgi butonuna tıklayın. </p><button class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(showFormatInfo.value ? "Formatı Gizle" : "Format Bilgisi")}</button></div></div></div>`);
      if (showFormatInfo.value) {
        _push(`<div class="rounded-xl border border-border bg-card p-6"><h3 class="mb-4 text-lg font-semibold text-foreground">JSON Format Örneği</h3><div class="space-y-4"><div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Sadece Kelime + Anlam)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    &quot;word&quot;: &quot;hello&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;merhaba&quot;, &quot;is_primary&quot;: true }
    ]
  },
  {
    &quot;word&quot;: &quot;goodbye&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;hoşça kal&quot;, &quot;is_primary&quot;: true }
    ]
  }
]</code></pre></div><div><h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Tüm Alanlar)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>[
  {
    &quot;word&quot;: &quot;run&quot;,
    &quot;definition&quot;: &quot;to move at a speed faster than a walk&quot;,
    &quot;language&quot;: &quot;en&quot;,
    &quot;type&quot;: &quot;verb&quot;,
    &quot;difficulty_level&quot;: 2,
    &quot;meanings&quot;: [
      { &quot;meaning&quot;: &quot;koşmak&quot;, &quot;is_primary&quot;: true },
      { &quot;meaning&quot;: &quot;çalıştırmak&quot;, &quot;is_primary&quot;: false }
    ],
    &quot;example_sentences&quot;: [&quot;I run every morning&quot;, &quot;The program runs smoothly&quot;],
    &quot;example_translations&quot;: [&quot;Her sabah koşarım&quot;, &quot;Program sorunsuz çalışıyor&quot;],
    &quot;synonyms&quot;: [&quot;jog&quot;, &quot;sprint&quot;]
  }
]</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div><dt class="font-medium text-foreground">word <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Kelime (zorunlu)</dd></div><div><dt class="font-medium text-foreground">definition</dt><dd class="text-muted-foreground">Kelimenin öğrenilen dildeki tanımı (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">language <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Dil kodu: en, tr, de, fr, es (zorunlu)</dd></div><div><dt class="font-medium text-foreground">type</dt><dd class="text-muted-foreground">Tür: noun, verb, adjective, adverb, vb. (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">difficulty_level</dt><dd class="text-muted-foreground">Zorluk: 1-4 arası (varsayılan: 2)</dd></div><div><dt class="font-medium text-foreground">meanings</dt><dd class="text-muted-foreground">Anlamlar dizisi (opsiyonel ama önerilen)</dd></div></dl></div><div class="flex flex-wrap gap-2"><button class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"> Basit Şablon Yükle </button><button class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"> Detaylı Şablon Yükle </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (bulkSummary.value) {
        _push(`<div class="${ssrRenderClass([bulkSummary.value.isError ? "border-destructive/30 bg-destructive/5" : "border-primary/30 bg-primary/5", "rounded-xl border p-4"])}"><h3 class="${ssrRenderClass([bulkSummary.value.isError ? "text-destructive" : "text-foreground", "font-medium"])}">${ssrInterpolate(bulkSummary.value.title)}</h3><p class="mt-1 text-sm text-muted-foreground">${ssrInterpolate(bulkSummary.value.message)}</p>`);
        if (bulkSummary.value.details.length) {
          _push(`<ul class="mt-3 max-h-40 space-y-1 overflow-y-auto text-sm"><!--[-->`);
          ssrRenderList(bulkSummary.value.details, (detail, index) => {
            _push(`<li class="break-words text-destructive"> • ${ssrInterpolate(detail)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (serverErrors.value.length > 0) {
        _push(`<div class="rounded-xl border border-destructive/30 bg-destructive/5 p-4"><div class="flex items-start gap-3"><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><div class="min-w-0 flex-1"><h3 class="font-medium text-destructive">Toplu ekleme başarısız</h3><p class="mt-1 text-sm text-muted-foreground">${ssrInterpolate(serverErrors.value.length)} doğrulama hatası bulundu. Aşağıdaki satırları düzeltip tekrar deneyin. </p><ul class="mt-3 max-h-48 space-y-1 overflow-y-auto text-sm text-destructive"><!--[-->`);
        ssrRenderList(serverErrors.value, (error, index) => {
          _push(`<li class="break-words"> • ${ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2"><label class="text-sm font-medium text-foreground"> JSON Verisi <span class="text-destructive">*</span></label><textarea rows="15" placeholder="[{&quot;word&quot;: &quot;hello&quot;, &quot;language&quot;: &quot;en&quot;, &quot;meanings&quot;: [{&quot;meaning&quot;: &quot;merhaba&quot;}]}]" class="${ssrRenderClass([{ "border-destructive": jsonError.value }, "w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}">${ssrInterpolate(jsonInput.value)}</textarea>`);
      if (jsonError.value) {
        _push(`<p class="text-xs text-destructive">${ssrInterpolate(jsonError.value)}</p>`);
      } else if (parsedWords.value.length > 0) {
        _push(`<p class="text-xs text-green-600 dark:text-green-400"> ✓ ${ssrInterpolate(parsedWords.value.length)} kelime tespit edildi </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.languagePacks.length > 0) {
        _push(`<div class="space-y-3"><div><label class="text-sm font-medium text-foreground">Dil Paketine Ekle</label><p class="mt-1 text-xs text-muted-foreground"> Zorunlu değil ama önerilir. Sözlükte zaten kayıtlı kelimeler yalnızca seçtiğiniz pakete eklenir. </p></div>`);
        if (selectedPacks.value.length === 0) {
          _push(`<div class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200"> Henüz paket seçilmedi — mevcut kelimeler pakette görünmeyecek. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(__props.languagePacks, (pack) => {
          _push(`<button type="button" class="${ssrRenderClass([selectedPacks.value.includes(pack.id) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50", "flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors"])}"><span>${ssrInterpolate(pack.name)}</span><span class="text-xs opacity-70">${ssrInterpolate(pack.language.toUpperCase())}</span></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-end gap-3"><button type="button" class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"> İptal </button><button${ssrIncludeBooleanAttr(processing.value || !jsonInput.value.trim() || jsonError.value || parsedWords.value.length === 0) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(processing.value ? "Ekleniyor..." : `${parsedWords.value.length} Kelime Ekle`)}</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Create/BulkImportTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
