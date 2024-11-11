import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import "./CButton-Bo0n3h7o.js";
const _sfc_main = {
  __name: "CategoryMenu",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    route: Function
  },
  setup(__props) {
    usePage();
    const { props: pageProps } = usePage();
    pageProps.auth;
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative border-b-2 border-color-one px-3" }, _attrs))}><div class="flex items-center justify-between"><div class="py-3 text-sm font-semibold"><span class="px-3 py-1">YAZILAR</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/CategoryMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
