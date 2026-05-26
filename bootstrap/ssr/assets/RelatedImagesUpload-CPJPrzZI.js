import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ZoomableImage-iVeXa9el.js";
import "../ssr.js";
import "@inertiajs/vue3";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "RelatedImagesUpload",
  __ssrInlineRender: true,
  props: {
    entityId: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "Görseller"
    },
    initialImages: {
      type: Array,
      default: () => []
    }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const images = ref([...props.initialImages]);
    const uploading = ref(false);
    const deletingId = ref(null);
    const error = ref("");
    watch(
      () => props.initialImages,
      (value) => {
        images.value = [...value || []];
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><label class="block text-xs font-medium text-foreground">${ssrInterpolate(__props.label)}</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(images.value, (image, imageIndex) => {
        _push(`<div class="group relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          src: image.image_path,
          alt: image.alt_text || __props.label,
          gallery: images.value,
          index: imageIndex,
          "wrapper-class": "h-full w-full",
          "img-class": "h-full w-full object-cover"
        }, null, _parent));
        _push(`<button type="button" class="absolute right-0.5 top-0.5 z-[2] flex h-5 w-5 items-center justify-center rounded-full bg-background/90 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"${ssrIncludeBooleanAttr(deletingId.value === image.id) ? " disabled" : ""}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      });
      _push(`<!--]--><label class="${ssrRenderClass([{ "pointer-events-none opacity-50": uploading.value }, "flex h-16 w-16 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"])}"><input type="file" multiple accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml" class="hidden">`);
      if (!uploading.value) {
        _push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>`);
      } else {
        _push(`<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
      }
      _push(`</label></div>`);
      if (error.value) {
        _push(`<p class="text-xs text-destructive">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-xs text-muted-foreground">İlk görsel kapak olarak kullanılır. PNG, JPG, WEBP — en fazla 2MB</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_components/RelatedImagesUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
