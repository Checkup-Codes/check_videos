import { ref, onMounted, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import axios from "axios";
const _imports_0 = "/build/assets/checkup_codes_logo-DYmYY9xz.png";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const seoTitle = ref("");
    const seoDescription = ref("");
    onMounted(async () => {
      try {
        const response = await axios.get("/api/seo/home");
        if (response.data) {
          if (response.data.title) {
            seoTitle.value = response.data.title;
          }
          if (response.data.description) {
            seoDescription.value = response.data.description;
          }
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="flex h-[100%] items-center justify-center text-theme-text"${_scopeId}><div class="text-center"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Yakup Sarı" class="mx-auto h-96 w-96 rounded-full"${_scopeId}><h2 class="animate__animated animate__fadeInDown text-4xl font-bold"${_scopeId}>${ssrInterpolate(seoTitle.value)}</h2><p class="animate__animated animate__fadeInUp text-lg"${_scopeId}>${ssrInterpolate(seoDescription.value)}</p></div></header>`);
          } else {
            return [
              createVNode("header", { class: "flex h-[100%] items-center justify-center text-theme-text" }, [
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
