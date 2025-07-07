import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const customer = props.customer;
    const form = useForm({
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
      city: customer.city || "",
      state: customer.state || "",
      postal_code: customer.postal_code || "",
      country: customer.country || ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))} data-v-aea898f0><h1 class="mb-8 text-3xl font-semibold text-gray-700" data-v-aea898f0>Müşteri Bilgisini Güncelle</h1><form class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow" data-v-aea898f0><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>İlk İsmi</label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" class="input" required data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Soy İsmi</label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" class="input" required data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>E-posta</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="input" required data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Telefon</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" class="input" data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Adres</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="input" data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Şehir</label><input${ssrRenderAttr("value", unref(form).city)} type="text" class="input" data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Bölge</label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="input" data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Posta Kodu</label><input${ssrRenderAttr("value", unref(form).postal_code)} type="text" class="input" data-v-aea898f0></div><div data-v-aea898f0><label class="block text-gray-700" data-v-aea898f0>Ülke</label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="input" data-v-aea898f0></div><button type="submit" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700" data-v-aea898f0> Müşteriyi Güncelle </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aea898f0"]]);
export {
  Screen as default
};
