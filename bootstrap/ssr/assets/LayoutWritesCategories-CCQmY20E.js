import { ref, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./CCheckLayout-CgvqhBPB.js";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./SidebarLayoutWrite-7pxdoOXf.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-DjoZm_fv.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CategoryMenu-Bv95_yN1.js";
import "./CButton-Bo0n3h7o.js";
import "./WriteList-CJ_NaMV2.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "LayoutWritesCategories",
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
        _push(ssrRenderComponent(_sfc_main$1, {
          isCollapsed: true,
          toggle: collapseSidebar
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, { isCollapsed: isSidebarCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSidebarCollapsed.value && unref(screenName) === "writes") {
              _push2(ssrRenderComponent(_sfc_main$3, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else if (isSidebarCollapsed.value && unref(screenName) === "categories") {
              _push2(ssrRenderComponent(SidebarLayoutCategory, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="lg:block"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              isSidebarCollapsed.value && unref(screenName) === "writes" ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : isSidebarCollapsed.value && unref(screenName) === "categories" ? (openBlock(), createBlock(SidebarLayoutCategory, {
                key: 1,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode("div", { class: "lg:block" }, [
                renderSlot(_ctx.$slots, "screen")
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
