import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "BulkImportTab",
  __ssrInlineRender: true,
  emits: ["cancel"],
  setup(__props) {
    const { props } = usePage();
    const categories = props.categories || [];
    const testInfo = ref({
      title: "",
      slug: "",
      description: "",
      status: "draft",
      category_id: null,
      time_limit: null
    });
    const jsonInput = ref("");
    const jsonError = ref("");
    const processing = ref(false);
    const showFormatInfo = ref(false);
    const parsedQuestions = computed(() => {
      if (!jsonInput.value.trim()) {
        jsonError.value = "";
        return null;
      }
      try {
        const parsed = JSON.parse(jsonInput.value);
        const questions = Array.isArray(parsed) ? parsed : parsed.questions || [];
        if (!Array.isArray(questions)) {
          jsonError.value = "Sorular bir dizi olmalıdır";
          return null;
        }
        if (questions.length === 0) {
          jsonError.value = "En az 1 soru eklenmelidir";
          return null;
        }
        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          if (!q.question_text) {
            jsonError.value = `${i + 1}. soruda 'question_text' alanı zorunludur`;
            return null;
          }
          if (!q.question_type) {
            jsonError.value = `${i + 1}. soruda 'question_type' alanı zorunludur`;
            return null;
          }
          if (!["single_choice", "multiple_choice", "true_false"].includes(q.question_type)) {
            jsonError.value = `${i + 1}. soruda geçersiz 'question_type': ${q.question_type}`;
            return null;
          }
          if (q.question_type === "single_choice" || q.question_type === "multiple_choice") {
            if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
              jsonError.value = `${i + 1}. soru (çoktan seçmeli) en az 2 seçenek içermelidir`;
              return null;
            }
            const hasCorrect = q.options.some((opt) => opt.is_correct);
            if (!hasCorrect) {
              jsonError.value = `${i + 1}. soruda en az 1 doğru seçenek olmalıdır`;
              return null;
            }
          }
          if (q.question_type === "true_false") {
            if (q.correct_answer === void 0 || q.correct_answer === null) {
              jsonError.value = `${i + 1}. soru (doğru/yanlış) 'correct_answer' alanı içermelidir`;
              return null;
            }
          }
        }
        jsonError.value = "";
        return questions;
      } catch (e) {
        jsonError.value = "Geçersiz JSON formatı: " + e.message;
        return null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="rounded-xl border border-border bg-card p-6 space-y-4"><h3 class="text-lg font-semibold text-foreground">Test Bilgileri</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium text-foreground"> Test Başlığı <span class="text-destructive">*</span></label><input${ssrRenderAttr("value", testInfo.value.title)} type="text" placeholder="Örn: JavaScript Temelleri" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium text-foreground"> Slug <span class="text-destructive">*</span></label><input${ssrRenderAttr("value", testInfo.value.slug)} type="text" placeholder="javascript-temelleri" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium text-foreground"> Kategori <span class="text-destructive">*</span></label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(testInfo.value.category_id) ? ssrLooseContain(testInfo.value.category_id, null) : ssrLooseEqual(testInfo.value.category_id, null)) ? " selected" : ""}>Kategori Seçin</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(testInfo.value.category_id) ? ssrLooseContain(testInfo.value.category_id, category.id) : ssrLooseEqual(testInfo.value.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium text-foreground"> Durum <span class="text-destructive">*</span></label><select class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(testInfo.value.status) ? ssrLooseContain(testInfo.value.status, "draft") : ssrLooseEqual(testInfo.value.status, "draft")) ? " selected" : ""}>Taslak</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(testInfo.value.status) ? ssrLooseContain(testInfo.value.status, "published") : ssrLooseEqual(testInfo.value.status, "published")) ? " selected" : ""}>Yayınlandı</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(testInfo.value.status) ? ssrLooseContain(testInfo.value.status, "private") : ssrLooseEqual(testInfo.value.status, "private")) ? " selected" : ""}>Özel</option></select></div><div class="space-y-2"><label class="text-sm font-medium text-foreground">Süre Limiti (dakika)</label><input${ssrRenderAttr("value", testInfo.value.time_limit)} type="number" min="0" placeholder="Boş bırakılabilir" class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"></div></div><div class="space-y-2"><label class="text-sm font-medium text-foreground">Açıklama</label><textarea rows="3" placeholder="Test hakkında kısa bir açıklama..." class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(testInfo.value.description)}</textarea></div></div><div class="rounded-xl border border-primary/20 bg-primary/5 p-4"><div class="flex items-start gap-3"><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="flex-1"><h3 class="font-medium text-foreground">Toplu Soru Ekleme</h3><p class="mt-1 text-sm text-muted-foreground"> Sadece soruları JSON formatında ekleyin. Test bilgileri yukarıdaki formdan alınacak. </p><button class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(showFormatInfo.value ? "Formatı Gizle" : "Format Bilgisi")}</button></div></div></div>`);
      if (showFormatInfo.value) {
        _push(`<div class="rounded-xl border border-border bg-card p-6"><h3 class="mb-4 text-lg font-semibold text-foreground">JSON Format Örneği</h3><div class="space-y-4"><div><h4 class="mb-2 text-sm font-medium text-foreground">Basit Format (Tek Doğru Cevap)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  &quot;title&quot;: &quot;JavaScript Temelleri Testi&quot;,
  &quot;slug&quot;: &quot;javascript-temelleri-testi&quot;,
  &quot;description&quot;: &quot;JavaScript temel konularını test edin&quot;,
  &quot;status&quot;: &quot;published&quot;,
  &quot;questions&quot;: [
    {
      &quot;question_text&quot;: &quot;JavaScript hangi tür bir dildir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;Derlenmiş dil&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;Yorumlanmış dil&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;Makine dili&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;Assembly dili&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;let ve const arasındaki fark nedir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;let yeniden atanabilir, const atanamaz&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;Fark yoktur&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;const daha hızlıdır&quot;, &quot;is_correct&quot;: false }
      ]
    }
  ]
}</code></pre></div><div><h4 class="mb-2 text-sm font-medium text-foreground">Detaylı Format (Karışık Soru Tipleri)</h4><pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs"><code>{
  &quot;title&quot;: &quot;Web Geliştirme Quiz&quot;,
  &quot;slug&quot;: &quot;web-gelistirme-quiz&quot;,
  &quot;description&quot;: &quot;HTML, CSS ve JavaScript bilginizi test edin&quot;,
  &quot;status&quot;: &quot;published&quot;,
  &quot;category_id&quot;: null,
  &quot;questions&quot;: [
    {
      &quot;question_text&quot;: &quot;HTML&#39;de başlık etiketi hangisidir?&quot;,
      &quot;question_type&quot;: &quot;single_choice&quot;,
      &quot;points&quot;: 10,
      &quot;order&quot;: 1,
      &quot;explanation&quot;: &quot;h1-h6 etiketleri başlık için kullanılır&quot;,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;&lt;title&gt;&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;&lt;h1&gt;&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;&lt;header&gt;&quot;, &quot;is_correct&quot;: false },
        { &quot;option_text&quot;: &quot;&lt;head&gt;&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;CSS&#39;de renk tanımlamak için kullanılabilecek formatlar nelerdir?&quot;,
      &quot;question_type&quot;: &quot;multiple_choice&quot;,
      &quot;points&quot;: 15,
      &quot;order&quot;: 2,
      &quot;explanation&quot;: &quot;Birden fazla doğru cevap var&quot;,
      &quot;options&quot;: [
        { &quot;option_text&quot;: &quot;HEX (#FF0000)&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;RGB (rgb(255,0,0))&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;HSL (hsl(0,100%,50%))&quot;, &quot;is_correct&quot;: true },
        { &quot;option_text&quot;: &quot;BIN (bin(11111111))&quot;, &quot;is_correct&quot;: false }
      ]
    },
    {
      &quot;question_text&quot;: &quot;JavaScript&#39;te değişken tanımlamak için var, let ve const kullanılır&quot;,
      &quot;question_type&quot;: &quot;true_false&quot;,
      &quot;points&quot;: 5,
      &quot;order&quot;: 3,
      &quot;correct_answer&quot;: true,
      &quot;explanation&quot;: &quot;var, let ve const kullanılır&quot;
    }
  ]
}</code></pre></div><div class="rounded-lg border border-border bg-muted/30 p-4"><h4 class="mb-3 text-sm font-semibold text-foreground">Alan Açıklamaları</h4><dl class="space-y-2 text-xs"><div class="border-b border-border pb-2"><dt class="font-semibold text-foreground">Test Alanları:</dt></div><div><dt class="font-medium text-foreground">title <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Test başlığı (zorunlu)</dd></div><div><dt class="font-medium text-foreground">slug <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">URL dostu slug (zorunlu)</dd></div><div><dt class="font-medium text-foreground">description</dt><dd class="text-muted-foreground">Test açıklaması (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">status</dt><dd class="text-muted-foreground">Durum: draft, published, private (varsayılan: draft)</dd></div><div><dt class="font-medium text-foreground">category_id</dt><dd class="text-muted-foreground">Kategori ID&#39;si (opsiyonel)</dd></div><div class="border-b border-border pb-2 pt-3"><dt class="font-semibold text-foreground">Soru Alanları:</dt></div><div><dt class="font-medium text-foreground">question_text <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru metni (zorunlu)</dd></div><div><dt class="font-medium text-foreground">question_type <span class="text-destructive">*</span></dt><dd class="text-muted-foreground">Soru tipi: single_choice (tek doğru), multiple_choice (çoklu doğru), true_false (doğru/yanlış) - zorunlu</dd></div><div><dt class="font-medium text-foreground">points</dt><dd class="text-muted-foreground">Puan (varsayılan: 10)</dd></div><div><dt class="font-medium text-foreground">order</dt><dd class="text-muted-foreground">Sıra numarası (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">explanation</dt><dd class="text-muted-foreground">Açıklama (opsiyonel)</dd></div><div><dt class="font-medium text-foreground">options</dt><dd class="text-muted-foreground">Seçenekler dizisi (single_choice ve multiple_choice için zorunlu)</dd></div><div><dt class="font-medium text-foreground">correct_answer</dt><dd class="text-muted-foreground">Doğru cevap (true_false için: true/false - zorunlu)</dd></div></dl></div><div class="flex flex-wrap gap-2"><button type="button" class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"> Basit Şablon Yükle </button><button type="button" class="rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent"> Detaylı Şablon Yükle </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2"><label class="text-sm font-medium text-foreground"> Sorular (JSON) <span class="text-destructive">*</span></label><textarea rows="20" placeholder="[{&quot;question_text&quot;: &quot;Soru metni?&quot;, &quot;question_type&quot;: &quot;single_choice&quot;, &quot;options&quot;: [...]}]" class="${ssrRenderClass([{ "border-destructive": jsonError.value }, "w-full rounded-lg border border-input bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"])}">${ssrInterpolate(jsonInput.value)}</textarea>`);
      if (jsonError.value) {
        _push(`<p class="text-xs text-destructive">${ssrInterpolate(jsonError.value)}</p>`);
      } else if (parsedQuestions.value) {
        _push(`<p class="text-xs text-green-600 dark:text-green-400"> ✓ ${ssrInterpolate(parsedQuestions.value.length)} soru tespit edildi </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-end gap-3"><button type="button" class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"> İptal </button><button type="button"${ssrIncludeBooleanAttr(processing.value || !testInfo.value.title || !testInfo.value.slug || !testInfo.value.category_id || !jsonInput.value.trim() || jsonError.value || !parsedQuestions.value) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(processing.value ? "Oluşturuluyor..." : "Test Oluştur")}</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Create/BulkImportTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
