import { ref, resolveComponent, unref, withCtx, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckLayout-C1FAqO2C.js";
import _sfc_main$2 from "./SidebarLayoutVersion-0fzPds7V.js";
import { usePage, Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const sidebarStyle = props.isMobileSidebar ? "" : "hidden lg:block";
    const screenName = props.name;
    const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - ";
    const isSidebarCollapsed = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ToggleButton = resolveComponent("ToggleButton");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_component_ToggleButton, {
          isCollapsed: true,
          toggle: _ctx.collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1, { isCollapsed: isSidebarCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(screenName) === "versions") {
              _push2(ssrRenderComponent(_sfc_main$2, { class: unref(sidebarStyle) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              unref(screenName) === "versions" ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "screen")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_layouts/CheckLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
