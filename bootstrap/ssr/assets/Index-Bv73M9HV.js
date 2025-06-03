import { ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import "./CheckScreen-G62taWZ6.js";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import axios from "axios";
import { _ as _export_sfc } from "../ssr.js";
import "@inertiajs/vue3";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const seoTitle = ref("");
    const seoDescription = ref("");
    const logoPath = ref("/images/checkup_codes_logo.png");
    const logoAlt = ref("Logo");
    const isLoading = ref(true);
    const vantaRef = ref(null);
    let vantaEffect = null;
    onMounted(async () => {
      var _a, _b, _c;
      try {
        const seoResponse = await axios.get("/api/seo/home");
        if ((_a = seoResponse.data) == null ? void 0 : _a.title) seoTitle.value = seoResponse.data.title;
        if ((_b = seoResponse.data) == null ? void 0 : _b.description) seoDescription.value = seoResponse.data.description;
        const logoResponse = await axios.get("/api/logo");
        if ((_c = logoResponse.data) == null ? void 0 : _c.image_path) {
          logoPath.value = logoResponse.data.image_path;
          logoAlt.value = logoResponse.data.alt_text;
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 500);
      }
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
          spacing: 15
        });
      }
    });
    onBeforeUnmount(() => {
      if (vantaEffect) vantaEffect.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[calc(100h)] overflow-hidden" }, _attrs))} data-v-0cc8870c><div class="h-screen-minus-12 overflow-y-auto overscroll-none lg:h-screen-minus" data-v-0cc8870c><div class="h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1" data-v-0cc8870c><header class="relative z-10 flex h-full items-center justify-center text-gray-800" data-v-0cc8870c><div class="text-center" data-v-0cc8870c><div class="relative mx-auto h-96 w-96" data-v-0cc8870c>`);
      if (!isLoading.value) {
        _push(`<!--[-->`);
        if (logoPath.value !== "/images/checkup_codes_logo.png") {
          _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full rounded-full object-cover" data-v-0cc8870c>`);
        } else {
          _push(`<img src="/images/checkup_codes_logo.png" alt="Default Logo" class="h-full w-full rounded-full object-cover" data-v-0cc8870c>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="animate-pulse" data-v-0cc8870c><div class="h-96 w-96 rounded-full bg-base-200" data-v-0cc8870c><div class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200" data-v-0cc8870c></div></div><div class="mx-auto mt-4 h-8 w-64 rounded bg-base-200" data-v-0cc8870c></div><div class="mx-auto mt-2 h-4 w-48 rounded bg-base-200" data-v-0cc8870c></div></div>`);
      }
      _push(`</div>`);
      if (!isLoading.value) {
        _push(`<h2 class="animate__animated animate__fadeInDown text-4xl font-bold" data-v-0cc8870c>${ssrInterpolate(seoTitle.value)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (!isLoading.value) {
        _push(`<p class="animate__animated animate__fadeInUp text-lg" data-v-0cc8870c>${ssrInterpolate(seoDescription.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0cc8870c"]]);
export {
  Index as default
};
