import { ssrRenderTeleport, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { ref, computed, watch, onUnmounted, useSSRContext } from "vue";
import { _ as _export_sfc } from "../ssr.js";
const _sfc_main = {
  __name: "ImageCropper",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    imageSrc: { type: String, default: "" }
  },
  emits: ["crop", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    ref(null);
    const scale = ref(1);
    const posX = ref(0);
    const posY = ref(0);
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    ref(0);
    ref(0);
    const imageStyle = computed(() => ({
      transform: `translate(${posX.value}px, ${posY.value}px) scale(${scale.value})`,
      transformOrigin: "center center"
    }));
    const onDrag = (e) => {
      if (!isDragging.value) return;
      e.preventDefault();
      const point = e.touches ? e.touches[0] : e;
      posX.value = point.clientX - startX.value;
      posY.value = point.clientY - startY.value;
    };
    const stopDrag = () => {
      isDragging.value = false;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", stopDrag);
    };
    const reset = () => {
      scale.value = 1;
      posX.value = 0;
      posY.value = 0;
    };
    watch(() => props.show, (newVal) => {
      if (newVal) {
        reset();
      }
    });
    onUnmounted(() => {
      stopDrag();
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" data-v-9937c924><div class="w-full max-w-4xl rounded-xl bg-card shadow-2xl" data-v-9937c924><div class="flex items-center justify-between border-b border-border px-6 py-4" data-v-9937c924><h3 class="text-lg font-semibold text-foreground" data-v-9937c924>Resmi Konumlandır</h3><button class="text-muted-foreground hover:text-foreground" data-v-9937c924><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9937c924><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-9937c924></path></svg></button></div><div class="relative bg-black p-6" data-v-9937c924><div class="relative mx-auto aspect-video max-h-[50vh] overflow-hidden rounded-lg border-2 border-primary" data-v-9937c924><img${ssrRenderAttr("src", __props.imageSrc)} style="${ssrRenderStyle(imageStyle.value)}" class="absolute cursor-move select-none" draggable="false" data-v-9937c924></div><div class="mt-4 flex items-center justify-center gap-4" data-v-9937c924><button class="rounded-lg bg-muted p-2 text-foreground hover:bg-muted/80"${ssrIncludeBooleanAttr(scale.value <= 1) ? " disabled" : ""} data-v-9937c924><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9937c924><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-v-9937c924></path></svg></button><input type="range"${ssrRenderAttr("value", scale.value)} min="1" max="3" step="0.1" class="h-2 w-48 cursor-pointer appearance-none rounded-lg bg-muted" data-v-9937c924><button class="rounded-lg bg-muted p-2 text-foreground hover:bg-muted/80"${ssrIncludeBooleanAttr(scale.value >= 3) ? " disabled" : ""} data-v-9937c924><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9937c924><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-9937c924></path></svg></button></div></div><div class="border-t border-border px-6 py-3" data-v-9937c924><p class="text-center text-sm text-muted-foreground" data-v-9937c924> Resmi sürükleyerek konumlandırın </p></div><div class="flex items-center justify-end gap-3 border-t border-border px-6 py-4" data-v-9937c924><button class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent" data-v-9937c924> İptal </button><button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90" data-v-9937c924> Kaydet </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ImageCropper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageCropper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9937c924"]]);
export {
  ImageCropper as I
};
