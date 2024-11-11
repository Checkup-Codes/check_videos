import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const parentOptions = props.services;
    const form = useForm({
      name: "",
      slug: "",
      description: "",
      price: null,
      parent_id: null
    });
    const searchQuery = ref("");
    const showDropdown = ref(false);
    const filteredCategories = computed(() => {
      return parentOptions.filter((parent) => parent.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-100 p-6" }, _attrs))}><h1 class="mb-8 text-3xl font-bold text-gray-700">Yeni Hizmet Oluştur</h1><form class="w-full max-w-md space-y-6"><div class="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"><label class="mb-2 block font-medium text-gray-700">Hizmet Adı</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Hizmet adı" required><label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Kısa Adı</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Hizmet kısa adı" required><label class="mb-2 mt-4 block font-medium text-gray-700">Hizmet Açıklaması</label><textarea class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Hizmet açıklaması" rows="3" required>${ssrInterpolate(unref(form).description)}</textarea><label class="mb-2 mt-4 block font-medium text-gray-700">Fiyat</label><input${ssrRenderAttr("value", unref(form).price)} type="number" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Fiyat (USD)"><label class="mb-2 mt-4 block font-medium text-gray-700">Üst Kategori</label><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Üst kategori arayın ve seçin">`);
      if (showDropdown.value && filteredCategories.value.length) {
        _push(`<ul class="absolute mt-1 w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-lg"><!--[-->`);
        ssrRenderList(filteredCategories.value, (parent) => {
          _push(`<li class="cursor-pointer px-4 py-2 hover:bg-blue-100">${ssrInterpolate(parent.name)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="w-full rounded bg-blue-500 p-3 font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-600"> Hizmeti Oluştur </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
