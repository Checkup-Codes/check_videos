import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const form = useForm({
      id: props.service.id,
      name: props.service.name || "",
      description: props.service.description || "",
      price: props.service.price || "",
      parent_id: props.service.parent_id || null,
      subCategories: props.service.subCategories || []
    });
    const parentOptions = computed(() => {
      return props.services.filter((s) => s.id !== form.id);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-3xl font-bold text-gray-700">Hizmeti Düzenle</h1><form class="w-full max-w-lg space-y-8"><div class="rounded-lg border border-gray-200 bg-white p-6 shadow"><label class="mb-2 block font-medium text-gray-700">Hizmet Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none" placeholder="Hizmet adını girin"><label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Açıklaması</label><textarea class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none" placeholder="Hizmet açıklamasını girin" rows="3">${ssrInterpolate(unref(form).description)}</textarea><label class="mb-2 mt-4 block font-medium text-gray-700">Fiyat (USD)</label><input${ssrRenderAttr("value", unref(form).price)} type="number" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none" placeholder="Fiyatı girin"><label class="mb-2 mt-4 block font-medium text-gray-700">Üst Kategori</label><select class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, null) : ssrLooseEqual(unref(form).parent_id, null)) ? " selected" : ""}>Yok</option><!--[-->`);
      ssrRenderList(parentOptions.value, (parent) => {
        _push(`<option${ssrRenderAttr("value", parent.id)}>${ssrInterpolate(parent.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="rounded-lg border border-gray-200 bg-white p-6 shadow"><h2 class="mb-4 text-xl font-semibold text-blue-600">Alt Kategoriler</h2><ul class="space-y-6"><!--[-->`);
      ssrRenderList(unref(form).subCategories, (subCategory, index) => {
        _push(`<li class="border-l-4 border-gray-200 pl-4"><label class="block font-medium text-gray-700">Alt Kategori Adı</label><input${ssrRenderAttr("value", subCategory.name)} type="text" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none" placeholder="Alt kategori adını girin"><label class="mt-4 block font-medium text-gray-700">Fiyat (USD)</label><input${ssrRenderAttr("value", subCategory.price)} type="number" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none" placeholder="Alt kategori fiyatını girin"><button class="mt-3 text-red-500 hover:text-red-600"> Alt Kategoriyi Kaldır </button></li>`);
      });
      _push(`<!--]--></ul><button class="mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> Yeni Alt Kategori Ekle </button></div><div class="flex space-x-4"><button type="submit" class="flex-1 rounded bg-green-500 p-3 font-semibold text-white shadow-md hover:bg-green-600"> Değişiklikleri Kaydet </button><button class="flex-1 rounded bg-red-500 p-3 font-semibold text-white shadow-md hover:bg-red-600"> Hizmeti Sil </button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
