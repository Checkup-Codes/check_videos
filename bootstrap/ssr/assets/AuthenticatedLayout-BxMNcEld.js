import { defineComponent, ref, computed, onMounted, onBeforeUnmount, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { useStore } from "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const store = useStore();
    usePage();
    computed(() => store.getters["Theme/getCurrentTheme"]);
    onMounted(() => {
      document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-base-100 h-screen overflow-hidden">`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-base-200 shadow"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="overflow-y-auto" style="${ssrRenderStyle({ "height": "calc(100vh - 6rem)" })}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
