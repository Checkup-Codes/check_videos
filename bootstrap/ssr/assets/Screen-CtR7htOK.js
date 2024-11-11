import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const project = props.project;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-3xl font-semibold text-gray-700">${ssrInterpolate(unref(project).project_name)}</h1><div class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow"><div><h2 class="text-lg font-semibold text-gray-800">Müşteri Bilgileri</h2><p><strong>Ad:</strong> ${ssrInterpolate(unref(project).customer.first_name)} ${ssrInterpolate(unref(project).customer.last_name)}</p><p><strong>E-posta:</strong> ${ssrInterpolate(unref(project).customer.email)}</p><p><strong>Telefon:</strong> ${ssrInterpolate(unref(project).customer.phone)}</p></div><div><h2 class="text-lg font-semibold text-gray-800">Servisler</h2>`);
      if (unref(project).services.length) {
        _push(`<ul class="space-y-2"><!--[-->`);
        ssrRenderList(unref(project).services, (service) => {
          _push(`<li><strong>${ssrInterpolate(service.name)}</strong> - ${ssrInterpolate(service.description || "Açıklama bulunmamaktadır")}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p class="text-gray-500">Bu projeye atanmış servis bulunmamaktadır.</p>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
