import { ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import "@ckeditor/ckeditor5-build-classic";
import _sfc_main$1 from "./SidebarLayoutCategory-CDiteJJC.js";
import "./CloseX-DYZEBRsx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "CreateCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    ref(props.categories);
    const form = useForm({
      name: "",
      slug: ""
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
      _push(`<div class="container mx-auto p-4"><h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1><form><div class="mb-4"><label for="title" class="${ssrRenderClass(linkedStyle)}">İsim:</label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="title" class="${ssrRenderClass(linkedStyle2)}" required></div><div class="mb-4"><label for="slug" class="${ssrRenderClass(linkedStyle)}">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}" required></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Kategori Oluştur </button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/CreateCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
