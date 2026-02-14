import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutWritesCategories-Ci5MgHaL.js";
import _sfc_main$2 from "./Screen-AbTAB4i6.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutWrite-CNQEejXt.js";
import "./WriteList-C2J5hA5n.js";
import "vuex";
import "./IconCalendar-BeMkwtmn.js";
import "./IconEye-C4IDtysD.js";
import "./IconLock-DLKK0TNF.js";
import "./IconLink-D_NS_GoN.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./useSidebar-D-dtiIC8.js";
import "./IconMenu-D3qnKg3d.js";
import "./IconFolder-BMytUC2M.js";
import "./IconX-B1Q85S0Q.js";
import "./IconFilter-Cx1-Qiq_.js";
import "./SidebarLayoutCategory-BJRAhRiN.js";
import "./CategoryTree-BDcqhHJ6.js";
import "./IconChevronDown-ClwhHkE5.js";
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
import "./IntroScreen-CaL0i34h.js";
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
