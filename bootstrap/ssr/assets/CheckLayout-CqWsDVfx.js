import { mergeProps, useSSRContext, ref, unref, withCtx, openBlock, createBlock, createCommentVNode, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./SidebarLayoutWrite-CN0_n9Fg.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-BbGQaw8W.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CategoryMenu-DmYz_UpQ.js";
import "./CButton-Bo0n3h7o.js";
import "./WriteList-D32Nlkza.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "CCheckLayout",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: "grid mt-12 lg:mt-0 h-full grid-cols-1 lg:grid-cols-subsidebar"
    },
    isCollapsed: {
      type: Boolean
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: __props.isCollapsed ? __props.infoClass : ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Modals/CCheckLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const sidebarStyle = props.screen.isMobileSidebar ? "" : "hidden lg:block";
    const screenName = props.screen.name;
    const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - ";
    const isSidebarCollapsed = ref(true);
    const handleSidebarCollapse = (newState) => {
      isSidebarCollapsed.value = newState;
      console.log("Sidebar collapsed state updated:", newState);
    };
    const collapseSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName }, null, _parent));
      if (!isSidebarCollapsed.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1, { isCollapsed: isSidebarCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && unref(screenName) === "writes") {
              _push2(ssrRenderComponent(_sfc_main$3, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else if (isSidebarCollapsed.value && unref(screenName) === "categories") {
              _push2(ssrRenderComponent(SidebarLayoutCategory, { class: unref(sidebarStyle) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              isSidebarCollapsed.value && unref(screenName) === "writes" ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : isSidebarCollapsed.value && unref(screenName) === "categories" ? (openBlock(), createBlock(SidebarLayoutCategory, {
                key: 1,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/CheckLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
