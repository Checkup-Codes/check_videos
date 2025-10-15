import { ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const seoTitle = ref(props.screen.seo.title);
    const seoDescription = ref(props.screen.seo.description);
    const logoPath = ref(props.screen.seo.logo);
    const logoAlt = ref("Logo");
    const vantaRef = ref(null);
    let vantaEffect = null;
    const isLoading = ref(false);
    onMounted(async () => {
      document.body.style.overflow = "hidden";
      if (!vantaEffect) {
        vantaEffect = NET({
          el: vantaRef.value,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 8965375,
          backgroundColor: 16317180,
          points: 12,
          maxDistance: 25,
          spacing: 15,
          material: {
            vertexColors: true
          }
        });
      }
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      if (vantaEffect) vantaEffect.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "vantaRef",
        ref: vantaRef,
        class: "h-full w-full overflow-hidden"
      }, _attrs))} data-v-c721a185><header class="relative z-10 flex h-full items-center justify-center text-gray-800" data-v-c721a185><div class="text-center" data-v-c721a185><div class="relative mx-auto h-96 w-96" data-v-c721a185>`);
      if (!isLoading.value) {
        _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full rounded-full object-cover" data-v-c721a185>`);
      } else {
        _push(`<div class="animate-pulse" data-v-c721a185><div class="h-96 w-96 rounded-full bg-base-200" data-v-c721a185><div class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200" data-v-c721a185></div></div><div class="mx-auto mt-4 h-8 w-64 rounded bg-base-200" data-v-c721a185></div><div class="mx-auto mt-2 h-4 w-48 rounded bg-base-200" data-v-c721a185></div></div>`);
      }
      _push(`</div>`);
      if (!isLoading.value) {
        _push(`<h2 class="animate__animated animate__fadeInDown text-4xl font-bold" data-v-c721a185>${ssrInterpolate(seoTitle.value)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (!isLoading.value) {
        _push(`<p class="animate__animated animate__fadeInUp text-lg" data-v-c721a185>${ssrInterpolate(seoDescription.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c721a185"]]);
export {
  Index as default
};
