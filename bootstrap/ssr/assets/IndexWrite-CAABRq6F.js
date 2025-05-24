import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-CZReNaVa.js";
import _sfc_main$2 from "./Screen-OYkAlO7l.js";
import "./FlashMessage-UOn86LUE.js";
import "./SidebarLayoutWrite-kBVOqnWj.js";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-D52ZVP2Y.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./PerformanceMonitorButton-Do3MyRT-.js";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./SubSidebarScreen-DnJaJXGw.js";
import "./useSidebar-x6qG5wqp.js";
import "./SidebarLayoutCategory-D0kfvBHa.js";
import "./CategoryTree-DbNC7_Q2.js";
import "./CheckScreen-Fo9jcdnI.js";
import "./IntroScreen-CgMhf5vf.js";
import "./useGsapAnimation-c70eqEdq.js";
import "gsap";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "IndexWritePage"
}, {
  __name: "IndexWrite",
  __ssrInlineRender: true,
  setup(__props) {
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
      _push(ssrRenderComponent(_sfc_main$1, null, {
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
