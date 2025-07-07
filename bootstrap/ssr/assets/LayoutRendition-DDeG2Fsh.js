import { ref, unref, withCtx, createBlock, createCommentVNode, createVNode, openBlock, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./FlashMessage-CRU0HHDP.js";
import { _ as _sfc_main$2 } from "./ToggleSubSidebarButton-CGpJUvUl.js";
import SidebarRendition from "./SidebarRendition-CZ6D6HJU.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CheckSubsidebar-DaB40CC2.js";
import "./TopSubsidebar-DjuRh74I.js";
import "./SubSidebarScreen-BKy3Ou2K.js";
import "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "LayoutRendition",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const { props } = usePage();
    const isMobile = ((_a = props.screen) == null ? void 0 : _a.isMobileSidebar) || false;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = ((_b = props.screen) == null ? void 0 : _b.name) || "";
    const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - Rendition";
    const flashSuccess = ref((_c = props.flash) == null ? void 0 : _c.success);
    const isSidebarCollapsed = ref(true);
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    const collapseSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, { isCollapsed: isSidebarCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && (unref(screenName) === "words" || unref(screenName) === "packs")) {
              _push2(ssrRenderComponent(SidebarRendition, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass(unref(isMobile) ? "hidden lg:block" : "block")}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              isSidebarCollapsed.value && (unref(screenName) === "words" || unref(screenName) === "packs") ? (openBlock(), createBlock(SidebarRendition, {
                key: 0,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode("div", {
                class: unref(isMobile) ? "hidden lg:block" : "block"
              }, [
                renderSlot(_ctx.$slots, "screen")
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_layouts/LayoutRendition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
