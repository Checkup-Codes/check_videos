import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const customer = props.customer;
    const formatDate = (dateString) => {
      if (!dateString) return "Not Available";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-3xl font-semibold text-gray-700">Müşteri Detayı</h1><div class="w-full max-w-md rounded-lg bg-white p-6 shadow"><p class="text-lg font-semibold text-gray-800">${ssrInterpolate(unref(customer).first_name)} ${ssrInterpolate(unref(customer).last_name)}</p><p class="text-gray-500">${ssrInterpolate(unref(customer).email)}</p><div class="mt-4 space-y-2"><p><strong>Telefon:</strong> ${ssrInterpolate(unref(customer).phone || "N/A")}</p><p><strong>Adres:</strong> ${ssrInterpolate(unref(customer).address || "N/A")}</p><p><strong>Şehir:</strong> ${ssrInterpolate(unref(customer).city || "N/A")}</p><p><strong>Bölge:</strong> ${ssrInterpolate(unref(customer).state || "N/A")}</p><p><strong>Posta Kodu:</strong> ${ssrInterpolate(unref(customer).postal_code || "N/A")}</p><p><strong>Ülke:</strong> ${ssrInterpolate(unref(customer).country || "N/A")}</p><p><strong>Oluşturulma Tarihi:</strong> ${ssrInterpolate(formatDate(unref(customer).created_at))}</p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
