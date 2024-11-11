import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = props.services;
    const customers = props.customers;
    const project = props.project;
    const form = useForm({
      project_name: project.project_name || "",
      customer_id: project.customer_id || "",
      services: project.services ? project.services.map((service) => service.id) : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))} data-v-bdcf939a><h1 class="mb-8 text-3xl font-semibold text-gray-700" data-v-bdcf939a>Projeyi Düzenle</h1><form class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow" data-v-bdcf939a><div data-v-bdcf939a><label class="block text-gray-700" data-v-bdcf939a>Proje Adı</label><input${ssrRenderAttr("value", unref(form).project_name)} type="text" class="input" required data-v-bdcf939a></div><div data-v-bdcf939a><label class="block text-gray-700" data-v-bdcf939a>Müşteri Seçin</label><select class="input" required data-v-bdcf939a><option disabled value="" data-v-bdcf939a${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}>Bir müşteri seçin</option><!--[-->`);
      ssrRenderList(unref(customers), (customer) => {
        _push(`<option${ssrRenderAttr("value", customer.id)} data-v-bdcf939a>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-bdcf939a><label class="block text-gray-700" data-v-bdcf939a>Servis Seçin</label><!--[-->`);
      ssrRenderList(unref(services), (service) => {
        _push(`<div class="flex items-center space-x-2" data-v-bdcf939a><input type="checkbox"${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).services) ? ssrLooseContain(unref(form).services, service.id) : unref(form).services) ? " checked" : ""} class="checkbox" data-v-bdcf939a><span data-v-bdcf939a>${ssrInterpolate(service.name)}</span></div>`);
      });
      _push(`<!--]--></div><button type="submit" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700" data-v-bdcf939a> Projeyi Güncelle </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdcf939a"]]);
export {
  Screen as default
};
