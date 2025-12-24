import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { S as SidebarLayoutProject } from "./SidebarLayoutProject-iS8_o4aq.js";
import { usePage } from "@inertiajs/vue3";
import "./SubSidebarScreen-DNe7gM-E.js";
import "vuex";
import "./IconBolt-Dji8lGsB.js";
import "./IconFolder-BkG6LNKa.js";
import "./IconUsers-FdijcrvF.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "CheckLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const sidebarStyle = props.screen.isMobileSidebar ? "" : "hidden lg:block";
    props.screen.name;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid h-full grid-cols-1 lg:grid-cols-subsidebar" }, _attrs))}><div>`);
      _push(ssrRenderComponent(SidebarLayoutProject, { class: unref(sidebarStyle) }, null, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_layouts/CheckLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
