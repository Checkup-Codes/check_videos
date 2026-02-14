import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "BulkImportTab",
  __ssrInlineRender: true,
  props: {
    languagePacks: { type: Array, default: () => [] }
  },
  emits: ["cancel"],
  setup(__props) {
    const jsonInput = ref("");
    const jsonError = ref("");
    const processing = ref(false);
    const showFormatInfo = ref(false);
    const selectedPacks = ref([]);
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
        _push(`<div class="space-y-3"><label class="text-sm font-medium text-foreground">Dil Paketlerine Ekle (Opsiyonel)</label><div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
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
