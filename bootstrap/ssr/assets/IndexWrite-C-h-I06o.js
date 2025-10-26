import { computed, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { useStore } from "vuex";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-BRPEmI6M.js";
import _sfc_main$2 from "./Screen-xDlHe8N0.js";
import "./FlashMessage-BW5JKxN1.js";
import "./SidebarLayoutWrite-jJPhFWlF.js";
import "./TopSubsidebar-jFf3ITV_.js";
import "./WriteList-cZOZxBc4.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./CheckSubsidebar-Dj7LcfAL.js";
import "./SubSidebarScreen-40SPmOW7.js";
import "./useSidebar-DbOjWDc5.js";
import "./SidebarLayoutCategory-CfdTiXOt.js";
import "./CategoryTree-CCIAyO4r.js";
import "./CheckScreen-CRdImGzx.js";
import "./IntroScreen-CgMhf5vf.js";
import "./useGsapAnimation-B7nwxQKS.js";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/SplitText.js";
import "gsap/TextPlugin.js";
import "gsap/MotionPathPlugin.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexWritePage"
}, {
  __name: "IndexWrite",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useStore();
    const currentTheme = computed(() => store.getters["Theme/getCurrentTheme"]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Yazılar Listesi</title><meta name="description" content="Tüm blog yazılarının görüntülendiği liste sayfası"${_scopeId}><meta name="keywords" content="yazılar, blog yazıları, içerik listesi"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Yazılar Listesi"),
              createVNode("meta", {
                name: "description",
                content: "Tüm blog yazılarının görüntülendiği liste sayfası"
              }),
              createVNode("meta", {
                name: "keywords",
                content: "yazılar, blog yazıları, içerik listesi"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { class: currentTheme.value }, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/IndexWrite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
