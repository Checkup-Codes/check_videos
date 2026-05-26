import { computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./IconBolt-Dji8lGsB.js";
import _sfc_main$2 from "./IconFolder-BkG6LNKa.js";
import _sfc_main$3 from "./IconUsers-FdijcrvF.js";
import { c as useModuleVisibility } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "ProjectsModuleTabs",
  __ssrInlineRender: true,
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    embedded: {
      type: Boolean,
      default: false
    },
    showLabels: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const showCustomers = useModuleVisibility("customers");
    const page = usePage();
    const currentView = computed(() => {
      const url = page.url || "";
      if (url.startsWith("/projects")) {
        return "projects";
      }
      if (url.startsWith("/customers")) {
        return "customers";
      }
      return "services";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: __props.embedded ? "" : "shrink-0 border-b border-border bg-background px-2 py-2"
      }, _attrs))}><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("services.index"),
        class: ["inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors", [
          __props.compact ? "h-5 px-1.5" : "h-8 flex-1 px-2",
          currentView.value === "services" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        ]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { class: "h-3.5 w-3.5 shrink-0" }, null, _parent2, _scopeId));
            if (__props.showLabels) {
              _push2(`<span${_scopeId}>Hizmetler</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, { class: "h-3.5 w-3.5 shrink-0" }),
              __props.showLabels ? (openBlock(), createBlock("span", { key: 0 }, "Hizmetler")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("projects.index"),
        class: ["inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors", [
          __props.compact ? "h-5 px-1.5" : "h-8 flex-1 px-2",
          currentView.value === "projects" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        ]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { class: "h-3.5 w-3.5 shrink-0" }, null, _parent2, _scopeId));
            if (__props.showLabels) {
              _push2(`<span${_scopeId}>Projeler</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, { class: "h-3.5 w-3.5 shrink-0" }),
              __props.showLabels ? (openBlock(), createBlock("span", { key: 0 }, "Projeler")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(showCustomers)) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("customers.index"),
          class: ["inline-flex items-center justify-center gap-1 rounded-md text-xs font-medium transition-colors", [
            __props.compact ? "h-5 px-1.5" : "h-8 flex-1 px-2",
            currentView.value === "customers" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          ]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, { class: "h-3.5 w-3.5 shrink-0" }, null, _parent2, _scopeId));
              if (__props.showLabels) {
                _push2(`<span${_scopeId}>Müşteriler</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_sfc_main$3, { class: "h-3.5 w-3.5 shrink-0" }),
                __props.showLabels ? (openBlock(), createBlock("span", { key: 0 }, "Müşteriler")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/_components/ProjectsModuleTabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
