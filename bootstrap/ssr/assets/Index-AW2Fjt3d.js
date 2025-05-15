import { ref, onMounted, onBeforeUnmount, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-Djbvotax.js";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import axios from "axios";
const _imports_0 = "/build/assets/checkup_codes_logo-DYmYY9xz.png";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const seoTitle = ref("");
    const seoDescription = ref("");
    const vantaRef = ref(null);
    let vantaEffect = null;
    onMounted(() => {
      axios.get("/api/seo/home").then(({ data }) => {
        if (data == null ? void 0 : data.title) seoTitle.value = data.title;
        if (data == null ? void 0 : data.description) seoDescription.value = data.description;
      }).catch((err) => console.error("SEO fetch error:", err));
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
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1"${_scopeId}><header class="relative z-10 flex h-full items-center justify-center text-gray-800"${_scopeId}><div class="text-center"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Yakup Sarı" class="mx-auto h-96 w-96 rounded-full"${_scopeId}><h2 class="animate__animated animate__fadeInDown text-4xl font-bold"${_scopeId}>${ssrInterpolate(seoTitle.value)}</h2><p class="animate__animated animate__fadeInUp text-lg"${_scopeId}>${ssrInterpolate(seoDescription.value)}</p></div></header></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "vantaRef",
                ref: vantaRef,
                class: "h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1"
              }, [
                createVNode("header", { class: "relative z-10 flex h-full items-center justify-center text-gray-800" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "Yakup Sarı",
                      class: "mx-auto h-96 w-96 rounded-full"
                    }),
                    createVNode("h2", { class: "animate__animated animate__fadeInDown text-4xl font-bold" }, toDisplayString(seoTitle.value), 1),
                    createVNode("p", { class: "animate__animated animate__fadeInUp text-lg" }, toDisplayString(seoDescription.value), 1)
                  ])
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
