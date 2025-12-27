import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import axios from "axios";
const _sfc_main = {
  __name: "WriteImageUploader",
  __ssrInlineRender: true,
  props: {
    writeId: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: "writes"
    }
  },
  emits: ["insert-image"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const isExpanded = ref(true);
    const isDragging = ref(false);
    const isUploading = ref(false);
    const errorMessage = ref("");
    const toastMessage = ref("");
    const uploadedImages = ref([]);
    onMounted(async () => {
      if (props.writeId) {
        await loadImages();
      }
    });
    const loadImages = async () => {
      try {
        const response = await axios.get("/api/write-images", {
          params: {
            category: props.category,
            related_id: props.writeId
          }
        });
        uploadedImages.value = response.data.images || [];
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };
    __expose({
      uploadedImages,
      loadImages
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg border border-border bg-card" }, _attrs))}><div class="flex items-center justify-between border-b border-border px-4 py-3"><h3 class="text-sm font-medium text-foreground">Resim Yükle</h3><button type="button" class="text-muted-foreground hover:text-foreground"><svg class="${ssrRenderClass([{ "rotate-180": isExpanded.value }, "h-5 w-5 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div><div class="p-4 space-y-4" style="${ssrRenderStyle(isExpanded.value ? null : { display: "none" })}"><div class="${ssrRenderClass([{ "border-primary bg-primary/5": isDragging.value }, "flex justify-center rounded-md border-2 border-dashed border-border px-4 py-6 transition-colors"])}"><div class="space-y-1 text-center"><svg class="mx-auto h-10 w-10 text-muted-foreground" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="flex text-sm text-muted-foreground"><label class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"><span>Resim Seç</span><input type="file" multiple accept="image/*" class="sr-only"></label><p class="pl-1">veya sürükle bırak</p></div><p class="text-xs text-muted-foreground">PNG, JPG, GIF - max 5MB</p></div></div>`);
      if (isUploading.value) {
        _push(`<div class="flex items-center gap-2 text-sm text-muted-foreground"><svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Yükleniyor... </div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (uploadedImages.value.length > 0) {
        _push(`<div class="space-y-2"><p class="text-xs font-medium text-muted-foreground">Yüklenen Resimler (Editöre sürükleyin)</p><div class="grid grid-cols-3 gap-2"><!--[-->`);
        ssrRenderList(uploadedImages.value, (image) => {
          _push(`<div class="group relative aspect-square overflow-hidden rounded-md border border-border cursor-grab active:cursor-grabbing" draggable="true"><img${ssrRenderAttr("src", image.image_path)}${ssrRenderAttr("alt", image.alt_text)} class="h-full w-full object-cover"><div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"><button type="button" class="rounded-full bg-primary p-1.5 text-primary-foreground hover:bg-primary/90" title="URL Kopyala"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button><button type="button" class="rounded-full bg-green-600 p-1.5 text-white hover:bg-green-700" title="Editöre Ekle"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button><button type="button" class="rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90" title="Sil"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (toastMessage.value) {
        _push(`<div class="fixed bottom-4 right-4 z-50 rounded-lg bg-foreground px-4 py-2 text-background shadow-lg">${ssrInterpolate(toastMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/WriteImageUploader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
