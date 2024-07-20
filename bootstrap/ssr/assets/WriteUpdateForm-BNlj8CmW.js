import { watch, resolveComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const _sfc_main = {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = props.write;
    const categories = props.categories;
    const form = useForm({
      title: write.title,
      slug: write.slug,
      content: write.content,
      author_id: write.author_id,
      published_at: write.published_at,
      summary: write.summary,
      status: write.status,
      category_id: write.category_id,
      cover_image: write.cover_image
    });
    const editor = ClassicEditor;
    const editorConfig = {
      height: "400px"
    };
    watch(
      () => form.title,
      (newTitle) => {
        form.slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ckeditor = resolveComponent("ckeditor");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-[97%] rounded-lg bg-white p-6 shadow-md" }, _attrs))}><h1 class="mb-6 text-3xl font-bold">Yazıyı Güncelle</h1><form><div class="mb-4"><label for="title" class="mb-1 block text-sm font-bold">Başlık:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="slug" class="mb-1 block text-sm font-bold">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="content" class="mb-1 block text-sm font-bold">İçerik:</label>`);
      _push(ssrRenderComponent(_component_ckeditor, {
        editor: unref(editor),
        modelValue: unref(form).content,
        "onUpdate:modelValue": ($event) => unref(form).content = $event,
        config: editorConfig
      }, null, _parent));
      _push(`</div><div class="mb-4"><label for="author_id" class="mb-1 block text-sm font-bold">Yazar id:</label><input${ssrRenderAttr("value", unref(form).author_id)} type="number" id="author_id" class="mt-1 block w-full rounded" required></div><div class="mb-4"><label for="published_at" class="mb-1 block text-sm font-bold">Yayınlanma Tarihi:</label><input${ssrRenderAttr("value", unref(form).published_at)} type="datetime-local" id="published_at" class="mt-1 block w-full rounded"></div><div class="mb-4"><label for="summary" class="mb-1 block text-sm font-bold">Özet:</label><textarea id="summary" class="mt-1 block w-full rounded" rows="3">${ssrInterpolate(unref(form).summary)}</textarea></div><div class="mb-4"><label for="category_id" class="${ssrRenderClass(_ctx.linkedStyle)}">Kategori:</label><select id="category_id" class="mt-1 block w-full"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
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
