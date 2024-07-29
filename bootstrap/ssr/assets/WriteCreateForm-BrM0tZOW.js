import { ref, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "WriteCreateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const categories = ref(props.categories);
    const form = useForm({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "draft",
      category_id: "",
      cover_image: ""
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
        form.content = quill.root.innerHTML;
      });
    });
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg container mx-auto p-6" }, _attrs))}><h1 class="mb-4 text-2xl font-bold">Yeni yazı oluştur</h1><form><div class="mb-4"><label for="title" class="${ssrRenderClass(linkedStyle)}">Başlık:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="${ssrRenderClass(linkedStyle2)}" required></div><div class="mb-4"><label for="slug" class="${ssrRenderClass(linkedStyle)}">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}" required></div><div class="mb-4"><label for="content" class="${ssrRenderClass(linkedStyle)}">İçerik:</label><div class="quill-editor h-96"></div></div><div class="mb-4"><label for="published_at" class="${ssrRenderClass(linkedStyle)}">Yayınlama tarihi:</label><input${ssrRenderAttr("value", unref(form).published_at)} type="datetime-local" id="published_at" class="${ssrRenderClass(linkedStyle2)}"></div><div class="mb-4"><label for="summary" class="${ssrRenderClass(linkedStyle)}">Özet:</label><textarea id="summary" class="${ssrRenderClass(linkedStyle2)}" rows="3">${ssrInterpolate(unref(form).summary)}</textarea></div><div class="mb-4"><label for="status" class="${ssrRenderClass(linkedStyle)}">Durumu:</label><select id="status" class="mt-1 block w-full"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayında</option></select></div><div class="mb-4"><label for="category_id" class="${ssrRenderClass(linkedStyle)}">Kategori:</label><select id="category_id" class="mt-1 block w-full"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Kategori seç</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-4"><label for="cover_image" class="${ssrRenderClass(linkedStyle)}">Kapak resmi:</label><input${ssrRenderAttr("value", unref(form).cover_image)} type="text" id="cover_image" class="${ssrRenderClass(linkedStyle2)}"></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Create Write</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Create/WriteCreateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
