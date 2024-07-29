import { ref, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
const _sfc_main = {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = props.write;
    const categories = ref(props.categories);
    props.auth;
    const form = useForm({
      title: write.title,
      slug: write.slug,
      content: write.content,
      summary: write.summary,
      status: write.status,
      category_id: write.category_id,
      cover_image: write.cover_image
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
      quill.root.innerHTML = form.content;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg mx-auto max-w-[97%] rounded-lg p-6 shadow-md" }, _attrs))}><h1 class="mb-6 text-3xl font-bold">Yazıyı Güncelle</h1><form><div class="mb-4"><label for="title" class="mb-1 block text-sm font-bold">Başlık:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="slug" class="mb-1 block text-sm font-bold">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="content" class="mb-1 block text-sm font-bold">İçerik:</label><div class="h-96"></div></div><div class="mb-4"><label for="summary" class="mb-1 block text-sm font-bold">Özet:</label><textarea id="summary" class="mt-1 block w-full rounded" rows="3">${ssrInterpolate(unref(form).summary)}</textarea></div><div class="mb-4"><label for="category_id" class="mb-1 block text-sm font-bold">Kategori:</label><select id="category_id" class="mt-1 block w-full"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Kategori seç</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-4"><label for="status" class="mb-1 block text-sm font-bold">Durum:</label><select id="status" class="mt-1 block w-full"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayında</option></select></div><div class="mb-4"><label for="cover_image" class="mb-1 block text-sm font-bold">Kapak resmi:</label><input${ssrRenderAttr("value", unref(form).cover_image)} type="text" id="cover_image" class="mt-1 block w-full rounded"></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Update Write</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
