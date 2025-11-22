import { ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
import { _ as _sfc_main$2 } from "./IntroScreen-CaL0i34h.js";
import { u as useGsapFadeIn } from "./useGsapAnimation-B7nwxQKS.js";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const introRef = ref(null);
    useGsapFadeIn(introRef, { duration: 0.8, ease: "power2.out" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "introRef",
              ref: introRef,
              title: "Yazılar"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                ref_key: "introRef",
                ref: introRef,
                title: "Yazılar"
              }, null, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
