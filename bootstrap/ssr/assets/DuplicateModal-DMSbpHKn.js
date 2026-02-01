import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "DuplicateModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    duplicates: { type: Array, default: () => [] },
    packIds: { type: Array, default: () => [] },
    packNames: { type: Array, default: () => [] }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedWords = ref([]);
    const processing = ref(false);
    watch(() => props.show, (newVal) => {
      if (newVal) {
        selectedWords.value = props.duplicates.map((d) => d.id);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" }, _attrs))}><div class="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg"><div class="mb-6"><h2 class="text-xl font-semibold text-foreground">Mevcut Kelimeler Bulundu</h2><p class="mt-2 text-sm text-muted-foreground">${ssrInterpolate(__props.duplicates.length)} kelime zaten sistemde mevcut. Bu kelimeleri seçilen paketlere eklemek ister misiniz? </p></div><div class="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4"><div class="flex items-start gap-3"><svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="flex-1"><h3 class="font-medium text-foreground">Seçilen Paketler</h3><div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(__props.packNames, (pack) => {
          _push(`<span class="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">${ssrInterpolate(pack)}</span>`);
        });
        _push(`<!--]--></div></div></div></div><div class="mb-6 max-h-96 space-y-2 overflow-y-auto"><!--[-->`);
        ssrRenderList(__props.duplicates, (duplicate, index) => {
          _push(`<div class="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"><div class="flex-1"><div class="font-medium text-foreground">${ssrInterpolate(duplicate.word)}</div>`);
          if (duplicate.current_packs.length > 0) {
            _push(`<div class="mt-1 text-xs text-muted-foreground"> Mevcut paketler: ${ssrInterpolate(duplicate.current_packs.join(", "))}</div>`);
          } else {
            _push(`<div class="mt-1 text-xs text-muted-foreground"> Henüz hiçbir pakette değil </div>`);
          }
          _push(`</div><div class="ml-4"><input type="checkbox"${ssrRenderAttr("id", `word-${index}`)}${ssrIncludeBooleanAttr(Array.isArray(selectedWords.value) ? ssrLooseContain(selectedWords.value, duplicate.id) : selectedWords.value) ? " checked" : ""}${ssrRenderAttr("value", duplicate.id)} class="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"></div></div>`);
        });
        _push(`<!--]--></div><div class="mb-6 flex items-center gap-2"><input type="checkbox" id="select-all"${ssrIncludeBooleanAttr(selectedWords.value.length === __props.duplicates.length) ? " checked" : ""} class="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"><label for="select-all" class="text-sm font-medium text-foreground"> Tümünü Seç (${ssrInterpolate(selectedWords.value.length)}/${ssrInterpolate(__props.duplicates.length)}) </label></div><div class="flex items-center justify-end gap-3"><button class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"> İptal </button><button${ssrIncludeBooleanAttr(selectedWords.value.length === 0 || processing.value) ? " disabled" : ""} class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(processing.value ? "Ekleniyor..." : `${selectedWords.value.length} Kelimeyi Paketlere Ekle`)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/DuplicateModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
