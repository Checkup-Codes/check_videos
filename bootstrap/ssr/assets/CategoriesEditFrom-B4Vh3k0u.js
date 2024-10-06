import { watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CategoriesEditFrom",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const auth = props.auth;
    const form = useForm({
      name: "",
      slug: ""
    });
    watch(
      () => props.category,
      (newCategory) => {
        form.name = newCategory.name;
        form.slug = newCategory.slug;
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-white p-2 shadow-md lg:mt-0" }, _attrs))}><div class="container mx-auto p-4"><h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1><form><div class="mb-4"><label for="title" class="mb-1 block text-sm font-bold">İsim:</label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="title" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="slug" class="mb-1 block text-sm font-bold">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="mt-1 block w-full rounded" required></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Kategoriyi güncelle </button></div></form>`);
      if (unref(auth).user) {
        _push(`<div class="flex"><button class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"> Kategoriyi sil </button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
