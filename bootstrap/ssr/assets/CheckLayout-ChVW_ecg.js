import { mergeProps, useSSRContext, ref, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$3 from "./SidebarLayoutWrite-DUXLk1hx.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-BbGQaw8W.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./CategoryMenu-DmYz_UpQ.js";
import "./CButton-Bo0n3h7o.js";
import "./WriteList-D32Nlkza.js";
const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Modals/CCheckLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CToggleButton",
  __ssrInlineRender: true,
  props: {
    isCollapsed: Boolean,
    toggle: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["fixed top-1/2 z-50 h-8 w-8 -translate-y-1/2 transform items-center rounded-full bg-black pb-0.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600 hover:shadow-xl", [__props.isCollapsed ? "left-[611px]" : "left-[211px]"]]
      }, _attrs))} data-v-eaaba8ca><span class="items-center text-xl" data-v-eaaba8ca> ⇔</span></button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/CToggleButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ToggleButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-eaaba8ca"]]);
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const sidebarStyle = props.screen.isMobileSidebar ? "" : "hidden lg:block";
    const screenName = props.screen.name;
    const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + " - ";
    const isCollapsed = ref(true);
    const collapseSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: titleName }, null, _parent));
      _push(ssrRenderComponent(ToggleButton, {
        isCollapsed: isCollapsed.value,
        toggle: collapseSidebar
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { isCollapsed: isCollapsed.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(screenName) === "writes") {
              _push2(`<div${_scopeId}>`);
              if (isCollapsed.value) {
                _push2(ssrRenderComponent(_sfc_main$3, { class: unref(sidebarStyle) }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(screenName) === "categories") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(SidebarLayoutCategory, { class: unref(sidebarStyle) }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              unref(screenName) === "writes" ? (openBlock(), createBlock("div", { key: 0 }, [
                isCollapsed.value ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 0,
                  class: unref(sidebarStyle)
                }, null, 8, ["class"])) : createCommentVNode("", true)
              ])) : unref(screenName) === "categories" ? (openBlock(), createBlock("div", { key: 1 }, [
                createVNode(SidebarLayoutCategory, { class: unref(sidebarStyle) }, null, 8, ["class"])
              ])) : createCommentVNode("", true),
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
