import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))} data-v-055528d5><h1 class="mb-8 text-3xl font-semibold text-gray-700" data-v-055528d5>Yeni Müşteri Oluştur</h1><form class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow" data-v-055528d5><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>İlk İsmi</label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" class="input" required data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Soy Adı</label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" class="input" required data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>E-posta</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="input" required data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Telefon</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" class="input" data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Adres</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="input" data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Şehir</label><input${ssrRenderAttr("value", unref(form).city)} type="text" class="input" data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Bölge</label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="input" data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Posta Kodu</label><input${ssrRenderAttr("value", unref(form).postal_code)} type="text" class="input" data-v-055528d5></div><div data-v-055528d5><label class="block text-gray-700" data-v-055528d5>Ülke</label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="input" data-v-055528d5></div><button type="submit" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700" data-v-055528d5> Müşteriyi Kaydet </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-055528d5"]]);
export {
  Screen as default
};
