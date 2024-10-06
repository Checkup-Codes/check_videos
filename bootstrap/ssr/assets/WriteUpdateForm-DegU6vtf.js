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
    const form = useForm({
      title: write.title,
      slug: write.slug,
      content: write.content,
      summary: write.summary,
      status: write.status,
      category_id: write.category_id,
      cover_image: write.cover_image,
      seo_keywords: write.seo_keywords,
      tags: write.tags,
      views_count: write.views_count,
      hasDraw: write.hasDraw ? true : false
    });
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      summary: "",
      category_id: "",
      status: "",
      cover_image: "",
      seo_keywords: "",
      tags: "",
      views_count: "",
      hasDraw: ""
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-[97%] rounded-lg bg-screen-bg p-6 shadow-md" }, _attrs))}><h1 class="mb-6 text-3xl font-bold">Yazıyı Güncelle</h1><form><div class="mb-4"><label for="title" class="mb-1 block text-sm font-bold">Başlık:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="mt-1 block w-full rounded">`);
      if (errors.value.title) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="slug" class="mb-1 block text-sm font-bold">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="mt-1 block w-full rounded">`);
      if (errors.value.slug) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="content" class="mb-1 block text-sm font-bold">İçerik:</label><div class="h-96"></div>`);
      if (errors.value.content) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.content)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="summary" class="mb-1 block text-sm font-bold">Özet:</label><textarea id="summary" class="mt-1 block w-full rounded" rows="3">${ssrInterpolate(unref(form).summary)}</textarea>`);
      if (errors.value.summary) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.summary)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="category_id" class="mb-1 block text-sm font-bold">Kategori:</label><select id="category_id" class="mt-1 block w-full"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Kategori seç</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (errors.value.category_id) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.category_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="status" class="mb-1 block text-sm font-bold">Durum:</label><select id="status" class="mt-1 block w-full"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayında</option></select>`);
      if (errors.value.status) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="cover_image" class="mb-1 block text-sm font-bold">Kapak resmi:</label><input${ssrRenderAttr("value", unref(form).cover_image)} type="text" id="cover_image" class="mt-1 block w-full">`);
      if (errors.value.cover_image) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.cover_image)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="seo_keywords" class="mb-1 block text-sm font-bold">SEO Anahtar Kelimeleri:</label><input${ssrRenderAttr("value", unref(form).seo_keywords)} type="text" id="seo_keywords" class="mt-1 block w-full">`);
      if (errors.value.seo_keywords) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.seo_keywords)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="tags" class="mb-1 block text-sm font-bold">Etiketler:</label><input${ssrRenderAttr("value", unref(form).tags)} type="text" id="tags" class="mt-1 block w-full">`);
      if (errors.value.tags) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.tags)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="views_count" class="mb-1 block text-sm font-bold">Görüntülenme Sayısı:</label><input${ssrRenderAttr("value", unref(form).views_count)} type="number" id="views_count" class="mt-1 block w-full" readonly></div><div class="mb-4"><label for="hasDraw" class="mb-1 block text-sm font-bold">Çizim Var Mı? </label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} type="checkbox" id="hasDraw"></div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Update Write</button></div></form></div>`);
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
