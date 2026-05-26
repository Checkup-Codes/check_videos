import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "PageHeader",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6" }, _attrs))}>`);
      if (_ctx.$slots.actions) {
        _push(`<div class="flex flex-wrap items-center justify-between gap-3 gap-y-2"><div class="min-w-0 flex-1"><h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">${ssrInterpolate(__props.title)}</h1>`);
        if (__props.description) {
          _push(`<p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex shrink-0 items-center">`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!--[--><h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">${ssrInterpolate(__props.title)}</h1>`);
        if (__props.description) {
          _push(`<p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Layout/PageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
