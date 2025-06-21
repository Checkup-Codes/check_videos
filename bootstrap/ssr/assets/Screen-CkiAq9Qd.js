import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const service = props.service;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-100 p-6" }, _attrs))}><div class="w-full max-w-lg rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold text-gray-800">${ssrInterpolate(unref(service).name)}</h1>`);
      if (unref(service).description) {
        _push(`<p class="mb-4 text-gray-600">${ssrInterpolate(unref(service).description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="font-semibold text-gray-800"> Fiyat: `);
      if (unref(service).price) {
        _push(`<span>${ssrInterpolate(unref(service).price)} USD</span>`);
      } else {
        _push(`<span class="text-gray-500">Uygun Değil</span>`);
      }
      _push(`</p>`);
      if (unref(service).parent_category) {
        _push(`<div class="mt-6"><h2 class="text-lg font-semibold text-gray-700">Üst Kategori</h2><p class="font-medium text-gray-800">${ssrInterpolate(unref(service).parent_category.name)}</p><p class="text-gray-600">${ssrInterpolate(unref(service).parent_category.description)}</p><p class="font-semibold text-gray-800"> Fiyat: `);
        if (unref(service).parent_category.price) {
          _push(`<span>${ssrInterpolate(unref(service).parent_category.price)} USD</span>`);
        } else {
          _push(`<span class="text-gray-500">Uygun Değil</span>`);
        }
        _push(`</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(service).sub_categories && unref(service).sub_categories.length) {
        _push(`<div class="mt-6"><h2 class="mb-4 text-lg font-semibold text-blue-600">Alt Kategoriler</h2><ul class="space-y-4"><!--[-->`);
        ssrRenderList(unref(service).sub_categories, (subCategory) => {
          _push(`<li class="border-l-4 border-gray-200 pl-4"><p class="font-medium text-gray-700">${ssrInterpolate(subCategory.name)}</p>`);
          if (subCategory.description) {
            _push(`<p class="text-gray-500">${ssrInterpolate(subCategory.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="font-semibold text-gray-800"> Fiyat: `);
          if (subCategory.price) {
            _push(`<span>${ssrInterpolate(subCategory.price)} USD</span>`);
          } else {
            _push(`<span class="text-gray-500">Uygun Değil</span>`);
          }
          _push(`</p></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
