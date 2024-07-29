import { ref, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "CategoriesCreateFrom",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-10 w-full max-w-full overflow-auto bg-screen-bg p-2 shadow-md lg:mt-0" }, _attrs))} data-v-1190d516><div class="container mx-auto p-4" data-v-1190d516><h1 class="mb-4 text-2xl font-bold" data-v-1190d516>Kategori Oluştur</h1><form data-v-1190d516><div class="mb-4" data-v-1190d516><label for="name" class="${ssrRenderClass(linkedStyle)}" data-v-1190d516>İsim:</label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="name" class="${ssrRenderClass(linkedStyle2)}" required data-v-1190d516></div><div class="mb-4" data-v-1190d516><label for="slug" class="${ssrRenderClass(linkedStyle)}" data-v-1190d516>Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}" required data-v-1190d516></div><div class="mb-4" data-v-1190d516><label for="description" class="${ssrRenderClass(linkedStyle)}" data-v-1190d516>Açıklama:</label><div class="h-96" data-v-1190d516></div></div><div class="mb-4" data-v-1190d516><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600" data-v-1190d516> Kategori Oluştur </button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoriesCreateFrom = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1190d516"]]);
export {
  CategoriesCreateFrom as default
};
