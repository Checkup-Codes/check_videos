import { ref, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
import _sfc_main$1 from "./SidebarLayoutCategory-CDiteJJC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CloseX-DYZEBRsx.js";
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
      slug: "",
      description: ""
    });
    const quillEditor = ref(null);
    onMounted(() => {
      const quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"]
          ]
        }
      });
      quill.on("text-change", () => {
        form.description = quill.root.innerHTML;
      });
    });
    watch(
      () => form.name,
      (newName) => {
        form.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid h-full grid-cols-1 lg:grid-cols-subsidebar" }, _attrs))} data-v-41d6b9ad><div class="block px-4 pt-3 lg:hidden" data-v-41d6b9ad><button class="flex items-center p-2 text-black hover:text-gray-700" data-v-41d6b9ad><svg class="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-41d6b9ad><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-41d6b9ad></path></svg> Geri </button></div>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "hidden lg:block" }, null, _parent));
      _push(`<div class="container mx-auto p-4" data-v-41d6b9ad><h1 class="mb-4 text-2xl font-bold" data-v-41d6b9ad>Kategori Oluştur</h1><form data-v-41d6b9ad><div class="mb-4" data-v-41d6b9ad><label for="name" class="${ssrRenderClass(linkedStyle)}" data-v-41d6b9ad>İsim:</label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="name" class="${ssrRenderClass(linkedStyle2)}" required data-v-41d6b9ad></div><div class="mb-4" data-v-41d6b9ad><label for="slug" class="${ssrRenderClass(linkedStyle)}" data-v-41d6b9ad>Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}" required data-v-41d6b9ad></div><div class="mb-4" data-v-41d6b9ad><label for="description" class="${ssrRenderClass(linkedStyle)}" data-v-41d6b9ad>Açıklama:</label><div class="h-96" data-v-41d6b9ad></div></div><div class="mb-4" data-v-41d6b9ad><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600" data-v-41d6b9ad> Kategori Oluştur </button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/CreateCategory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateCategory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41d6b9ad"]]);
export {
  CreateCategory as default
};
