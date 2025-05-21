import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-DF-hVI8M.js";
import _sfc_main$2 from "./Screen-BYYGe-uN.js";
import "./FlashMessage-UOn86LUE.js";
import "./SidebarLayoutWrite-a46KTBQG.js";
import "./TopSubsidebar-7f19mFMx.js";
import "./WriteList-0lUwuK0D.js";
import "./PerformanceMonitorButton-Co6U4sf0.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "./ToggleSubSidebarButton-CGpJUvUl.js";
import "./CheckSubsidebar-aKe8eBeC.js";
import "./SubSidebarScreen-DnJaJXGw.js";
import "./SidebarLayoutCategory-C6CggC3Y.js";
import "./CategoryTree-CpFCN71z.js";
import "./CheckScreen-Djbvotax.js";
import "./IntroScreen-CgMhf5vf.js";
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
