import { watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./SidebarLayoutCategory-CDiteJJC.js";
import "./CloseX-DYZEBRsx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EditCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const category = props.category;
    const auth = props.auth;
    const form = useForm({
      name: category.name,
      slug: category.slug
    });
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid h-full grid-cols-1 lg:grid-cols-subsidebar" }, _attrs))}><div class="block px-4 pt-3 lg:hidden"><button class="flex items-center p-2 text-black hover:text-gray-700"><svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Geri </button></div>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "hidden lg:block" }, null, _parent));
      _push(`<div class="container mx-auto p-4"><h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1><form><div class="mb-4"><label for="title" class="mb-1 block text-sm font-bold">İsim:</label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="title" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="slug" class="mb-1 block text-sm font-bold">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="mt-1 block w-full rounded" required></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Kategoriyi güncelle </button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/EditCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
