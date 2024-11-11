import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import ServiceItem from "./ServiceItem-Bnf_wR0n.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@fortawesome/vue-fontawesome";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = computed(() => props.services || []);
    const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))} data-v-41d1171e><h1 class="mb-8 text-2xl font-bold text-gray-800" data-v-41d1171e>Hizmetler</h1><ul data-v-41d1171e><!--[-->`);
      ssrRenderList(parents.value, (parent) => {
        _push(ssrRenderComponent(ServiceItem, {
          key: parent.id,
          service: parent,
          "all-services": services.value
        }, null, _parent));
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41d1171e"]]);
export {
  Screen as default
};
