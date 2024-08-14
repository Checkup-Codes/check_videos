import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import _sfc_main$1 from "./SidebarLayoutWrite-BkQ_SGIZ.js";
import SidebarLayoutCategory from "./SidebarLayoutCategory-CKZU4msA.js";
import { usePage } from "@inertiajs/vue3";
import "./CloseX-DYZEBRsx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const sidebarStyle = props.screen.isMobileSidebar ? "" : "hidden lg:block";
    const screenName = props.screen.name;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid h-full grid-cols-1 lg:grid-cols-subsidebar" }, _attrs))}>`);
      if (unref(screenName) === "writes") {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$1, { class: unref(sidebarStyle) }, null, _parent));
        _push(`</div>`);
      } else if (unref(screenName) === "categories") {
        _push(`<div>`);
        _push(ssrRenderComponent(SidebarLayoutCategory, { class: unref(sidebarStyle) }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push, _parent);
      _push(`</div>`);
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
