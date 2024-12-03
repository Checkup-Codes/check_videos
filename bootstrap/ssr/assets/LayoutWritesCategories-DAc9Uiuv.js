import { ref, watchEffect, mergeProps, useSSRContext, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, renderSlot } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./CheckLayout-C1FAqO2C.js";
import _sfc_main$4 from "./SidebarLayoutWrite-DRIGwEfS.js";
import _sfc_main$5 from "./SidebarLayoutCategory-BDDjI4DB.js";
import { _ as _sfc_main$2 } from "./CheckSubsidebar-BzF3tbsH.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./TopSubsidebar-CTQhPuSn.js";
import "./WriteList-Dvr0sWzx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "FlashMessage",
  __ssrInlineRender: true,
  props: {
    message: String
  },
  setup(__props) {
    const props = __props;
    const localMessage = ref(props.message);
    watchEffect(() => {
      if (localMessage.value) {
        setTimeout(() => {
          localMessage.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed right-4 top-4 z-50" }, _attrs))}><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Başarılı! </strong><span class="block sm:inline">${ssrInterpolate(__props.message)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Notifications/FlashMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "LayoutWritesCategories",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const isMobile = props.screen.isMobileSidebar;
    const sidebarStyle = isMobile ? "" : "hidden lg:block";
    const screenName = props.screen.name;
    const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - ";
    const flashSuccess = ref(props.flash.success);
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
            if (isSidebarCollapsed.value && unref(screenName) === "writes") {
              _push2(ssrRenderComponent(_sfc_main$4, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else if (isSidebarCollapsed.value && unref(screenName) === "categories") {
              _push2(ssrRenderComponent(_sfc_main$5, {
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass(unref(isMobile) ? "hidden" : "block")}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              isSidebarCollapsed.value && unref(screenName) === "writes" ? (openBlock(), createBlock(_sfc_main$4, {
                key: 0,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : isSidebarCollapsed.value && unref(screenName) === "categories" ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                "onUpdate:isCollapsed": handleSidebarCollapse,
                class: unref(sidebarStyle)
              }, null, 8, ["class"])) : createCommentVNode("", true),
              createVNode("div", {
                class: unref(isMobile) ? "hidden" : "block"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
