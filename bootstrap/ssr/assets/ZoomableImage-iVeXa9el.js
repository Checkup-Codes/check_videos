import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { a as useImageLightbox } from "../ssr.js";
const _sfc_main = {
  __name: "ZoomableImage",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    },
    imgClass: {
      type: String,
      default: ""
    },
    wrapperClass: {
      type: String,
      default: ""
    },
    gallery: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    useImageLightbox();
    computed(() => {
      var _a;
      if ((_a = props.gallery) == null ? void 0 : _a.length) {
        return props.gallery;
      }
      return [{ src: props.src, alt: props.alt }];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["group relative", __props.wrapperClass]
      }, _attrs))}><img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("alt", __props.alt)} class="${ssrRenderClass([__props.imgClass, "cursor-zoom-in"])}"><button type="button" class="absolute bottom-1 right-1 z-[1] flex h-6 w-6 items-center justify-center rounded-md bg-background/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background" title="Büyüt"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Image/ZoomableImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
