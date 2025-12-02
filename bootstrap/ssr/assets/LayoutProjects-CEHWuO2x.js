import { computed, ref, unref, withCtx, createBlock, createCommentVNode, createVNode, openBlock, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./FlashMessage-CQHak4HA.js";
import _sfc_main$3 from "./SidebarLayoutProject-_NJcxtU1.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CheckSubsidebar-DNDkVWuC.js";
const _sfc_main = {
  __name: "LayoutProjects",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const isMobile = props.screen.isMobileSidebar;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = props.screen.name;
    const titleName = computed(() => {
      return (screenName ? screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - " : "") + "Projeler";
    });
    const flashSuccess = ref(((_a = props.flash) == null ? void 0 : _a.success) || "");
    const isSidebarCollapsed = ref(true);
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { isCollapsed: isSidebarCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value) {
              _push2(ssrRenderComponent(_sfc_main$3, {
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
              isSidebarCollapsed.value ? (openBlock(), createBlock(_sfc_main$3, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/LayoutProjects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
