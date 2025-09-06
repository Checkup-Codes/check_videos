import { ref, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "TopSubsidebar",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    },
    showExpandCollapseButton: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-expand", "toggle-width"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const { props: pageProps } = usePage();
    const userName = (_b = (_a = pageProps.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name;
    const isNarrow = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden border-b-2 border-base-300 bg-base-100 lg:relative" }, _attrs))}><div class="flex h-12 items-center justify-between px-4 text-sm font-semibold text-base-content"><span class="cursor-pointer transition-colors duration-200 hover:text-primary"${ssrRenderAttr("title", isNarrow.value ? "Genişlet" : "Daralt")}>${ssrInterpolate(__props.title)}</span><div class="flex items-center gap-2">`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
      if (__props.showExpandCollapseButton) {
        _push(`<button class="btn btn-ghost btn-xs hover:bg-base-200"${ssrRenderAttr("title", __props.isExpanded ? "Tümünü Daralt" : "Tümünü Genişlet")}><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": __props.isExpanded }, "h-4 w-4 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(userName) && __props.href) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "hover:bg-primary-focus group flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-content transition-all duration-200",
          title: `Yeni ${((_a2 = __props.title) == null ? void 0 : _a2.toLowerCase()) || "öğe"} ekle`,
          onClick: () => {
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-3 w-3 transition-transform duration-200 group-hover:scale-110",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 4v16m8-8H4"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TopSubsidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
