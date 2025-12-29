import { computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./FlashMessage-C3JOGPFR.js";
import { usePage, Head } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "LayoutJourney"
}, {
  __name: "LayoutJourney",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const flashSuccess = computed(() => {
      var _a;
      return (_a = page.props.flash) == null ? void 0 : _a.message;
    });
    const browserTitle = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return ((_c = (_b = (_a = page.props) == null ? void 0 : _a.screen) == null ? void 0 : _b.seo) == null ? void 0 : _c.title) || ((_f = (_e = (_d = page.props) == null ? void 0 : _d.app) == null ? void 0 : _e.seo) == null ? void 0 : _f.title) || "Yolculuk";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: browserTitle.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { message: flashSuccess.value }, null, _parent));
      _push(`<div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]">`);
      ssrRenderSlot(_ctx.$slots, "screen", {}, null, _push, _parent);
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/_layouts/LayoutJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
