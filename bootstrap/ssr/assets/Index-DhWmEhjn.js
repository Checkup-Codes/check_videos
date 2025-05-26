import { ref, onMounted, onBeforeUnmount, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-Fo9jcdnI.js";
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
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1" data-v-4f81199a${_scopeId}><header class="relative z-10 flex h-full items-center justify-center text-gray-800" data-v-4f81199a${_scopeId}><div class="text-center" data-v-4f81199a${_scopeId}><div class="relative mx-auto h-96 w-96" data-v-4f81199a${_scopeId}>`);
            if (!isLoading.value) {
              _push2(`<!--[-->`);
              if (logoPath.value !== "/images/checkup_codes_logo.png") {
                _push2(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full rounded-full object-cover" data-v-4f81199a${_scopeId}>`);
              } else {
                _push2(`<img src="/images/checkup_codes_logo.png" alt="Default Logo" class="h-full w-full rounded-full object-cover" data-v-4f81199a${_scopeId}>`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="animate-pulse" data-v-4f81199a${_scopeId}><div class="h-96 w-96 rounded-full bg-base-200" data-v-4f81199a${_scopeId}><div class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200" data-v-4f81199a${_scopeId}></div></div><div class="mx-auto mt-4 h-8 w-64 rounded bg-base-200" data-v-4f81199a${_scopeId}></div><div class="mx-auto mt-2 h-4 w-48 rounded bg-base-200" data-v-4f81199a${_scopeId}></div></div>`);
            }
            _push2(`</div>`);
            if (!isLoading.value) {
              _push2(`<h2 class="animate__animated animate__fadeInDown text-4xl font-bold" data-v-4f81199a${_scopeId}>${ssrInterpolate(seoTitle.value)}</h2>`);
            } else {
              _push2(`<!---->`);
            }
            if (!isLoading.value) {
              _push2(`<p class="animate__animated animate__fadeInUp text-lg" data-v-4f81199a${_scopeId}>${ssrInterpolate(seoDescription.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></header></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "vantaRef",
                ref: vantaRef,
                class: "h-screen-minus-12 w-full overflow-hidden overscroll-none lg:h-screen-minus-1"
              }, [
                createVNode("header", { class: "relative z-10 flex h-full items-center justify-center text-gray-800" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("div", { class: "relative mx-auto h-96 w-96" }, [
                      !isLoading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        logoPath.value !== "/images/checkup_codes_logo.png" ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: logoPath.value,
                          alt: logoAlt.value,
                          class: "h-full w-full rounded-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: "/images/checkup_codes_logo.png",
                          alt: "Default Logo",
                          class: "h-full w-full rounded-full object-cover"
                        }))
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "animate-pulse"
                      }, [
                        createVNode("div", { class: "h-96 w-96 rounded-full bg-base-200" }, [
                          createVNode("div", { class: "animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-base-200 via-base-100 to-base-200" })
                        ]),
                        createVNode("div", { class: "mx-auto mt-4 h-8 w-64 rounded bg-base-200" }),
                        createVNode("div", { class: "mx-auto mt-2 h-4 w-48 rounded bg-base-200" })
                      ]))
                    ]),
                    !isLoading.value ? (openBlock(), createBlock("h2", {
                      key: 0,
                      class: "animate__animated animate__fadeInDown text-4xl font-bold"
                    }, toDisplayString(seoTitle.value), 1)) : createCommentVNode("", true),
                    !isLoading.value ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "animate__animated animate__fadeInUp text-lg"
                    }, toDisplayString(seoDescription.value), 1)) : createCommentVNode("", true)
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4f81199a"]]);
export {
  Index as default
};
