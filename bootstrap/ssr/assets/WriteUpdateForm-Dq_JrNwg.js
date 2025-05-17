import { ref, onMounted, watch, onUnmounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
import "../ssr.js";
import axios from "axios";
import "lodash";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteUpdateForm"
}, {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const categories = ref(props.categories);
    const writeData = ref(props.write);
    const form = useForm({
      title: writeData.value.title || "",
      slug: writeData.value.slug || "",
      content: writeData.value.content || "",
      published_at: writeData.value.published_at || "",
      summary: writeData.value.summary || "",
      status: writeData.value.status || "draft",
      category_id: writeData.value.category_id || "",
      cover_image: writeData.value.cover_image || "",
      seo_keywords: writeData.value.seo_keywords || "",
      meta_description: writeData.value.meta_description || "",
      tags: writeData.value.tags || "",
      views_count: writeData.value.views_count || 0,
      hasDraw: writeData.value.hasDraw || false
    });
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "",
      category_id: "",
      cover_image: "",
      seo_keywords: "",
      meta_description: "",
      tags: ""
    });
    const publishDateObj = ref({
      date: "",
      time: ""
    });
    onMounted(() => {
      if (form.published_at) {
        const dateObj = new Date(form.published_at);
        if (!isNaN(dateObj.getTime())) {
          publishDateObj.value.date = dateObj.toISOString().split("T")[0];
          publishDateObj.value.time = dateObj.toTimeString().substring(0, 5);
        }
      }
    });
    watch(
      publishDateObj.value,
      () => {
        if (publishDateObj.value.date && publishDateObj.value.time) {
          form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
        }
      },
      { deep: true }
    );
    let isSlugManuallyChanged = true;
    watch(
      () => form.title,
      (newTitle) => {
        if (!isSlugManuallyChanged) {
          form.slug = newTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
        }
      }
    );
    watch(
      () => form.slug,
      (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
          isSlugManuallyChanged = true;
        }
      }
    );
    watch(
      () => form.slug,
      (newSlug) => {
        if (newSlug === "") {
          isSlugManuallyChanged = false;
        }
      }
    );
    const quillEditor = ref(null);
    let quill;
    let isInitialContentSet = false;
    const editorLoading = ref(false);
    const errorMessage = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastType = ref("alert-info");
    const daisyColors = [
      "#570DF8",
      // primary
      "#F000B8",
      // secondary
      "#37CDBE",
      // accent
      "#3ABFF8",
      // info
      "#36D399",
      // success
      "#FBBD23",
      // warning
      "#F87272",
      // error
      "#1f2937",
      // neutral
      "#2A303C",
      // base-100
      "#ffffff",
      // white
      "#000000"
      // black
    ];
    const showToastMessage = (message, type = "alert-info") => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3e3);
    };
    const imageHandler = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        var _a, _b;
        const file = input.files[0];
        if (!file) return;
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          showToastMessage("Sadece JPEG, PNG veya GIF formatları desteklenmektedir.", "alert-error");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          showToastMessage("Resim boyutu 10MB'dan küçük olmalıdır.", "alert-error");
          return;
        }
        editorLoading.value = true;
        errorMessage.value = "";
        try {
          const range = quill.getSelection();
          const placeholderId = "img-loading-" + Date.now();
          const placeholderHtml = `
        <div id="${placeholderId}" class="skeleton-placeholder w-full my-4">
          <div class="skeleton h-32 w-full rounded-lg"></div>
          <div class="flex justify-center mt-2">
            <span class="loading loading-dots loading-md"></span>
          </div>
        </div>
      `;
          quill.clipboard.dangerouslyPasteHTML(range.index, placeholderHtml);
          const formData = new FormData();
          formData.append("image", file);
          const csrf = document.head.querySelector('meta[name="csrf-token"]');
          const headers = {
            "Content-Type": "multipart/form-data"
          };
          if (csrf) {
            headers["X-CSRF-TOKEN"] = csrf.getAttribute("content");
          }
          const response = await axios.post("/image-upload", formData, {
            headers,
            withCredentials: true
          });
          if (response.data.success && response.data.url) {
            const placeholderElement = document.getElementById(placeholderId);
            if (placeholderElement) {
              const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
              quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);
              quill.insertEmbed(placeholderIndex, "image", response.data.url);
            } else {
              quill.insertEmbed(range.index, "image", response.data.url);
            }
            showToastMessage("Resim başarıyla yüklendi", "alert-success");
          } else {
            const placeholderElement = document.getElementById(placeholderId);
            if (placeholderElement) {
              const placeholderIndex = quill.getIndex(quill.scroll.descendant(Node, placeholderElement)[0][0]);
              quill.deleteText(placeholderIndex, placeholderElement.outerHTML.length);
            }
            console.error("Resim yüklenemedi");
            showToastMessage("Resim yüklenirken bir hata oluştu.", "alert-error");
          }
        } catch (error) {
          console.error("Resim yükleme hatası:", error);
          showToastMessage(
            "Resim yüklenirken bir hata oluştu: " + (((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || error.message),
            "alert-error"
          );
        } finally {
          editorLoading.value = false;
        }
      };
    };
    onMounted(() => {
      quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ color: daisyColors }, { background: daisyColors }],
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"]
            ],
            handlers: {
              // Özel resim yükleme handler'ı
              image: imageHandler
            }
          }
        },
        placeholder: "İçeriği buraya yazın...",
        bounds: quillEditor.value,
        // Daha büyük içerikler için sınırlamaları kaldır
        maxLength: Infinity
      });
      quill.on("text-change", () => {
        try {
          const content = quill.root.innerHTML;
          form.content = content;
        } catch (error) {
          console.error("Content update error:", error);
        }
      });
      setTimeout(() => {
        if (form.content && !isInitialContentSet) {
          try {
            quill.root.innerHTML = form.content;
            isInitialContentSet = true;
          } catch (error) {
            console.error("Initial content load error:", error);
          }
        }
      }, 100);
      quillEditor.value.style.height = "400px";
      if (quillEditor.value) {
        quillEditor.value.classList.add("daisy-quill-editor");
      }
    });
    let debounceTimer = null;
    watch(
      () => form.content,
      (newValue) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (quill && newValue !== quill.root.innerHTML) {
            try {
              quill.root.innerHTML = newValue || "";
            } catch (error) {
              console.error("Content update error in watcher:", error);
            }
          }
        }, 300);
      }
    );
    onUnmounted(() => {
      if (quill) {
        quill = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-body p-6"><div class="card-title flex items-center justify-between"><div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><h2 class="text-gray-800 dark:text-white">Yazıyı Güncelle</h2></div></div><form class="space-y-6"><div class="grid grid-cols-1 gap-6 md:grid-cols-2"><div class="md:col-span-2"><div class="form-control w-full"><label class="label"><span class="label-text">Başlık</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).title)} placeholder="Yazının başlığını girin" class="${ssrRenderClass([{ "input-error": errors.value.title || unref(form).errors.title }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.title || unref(form).errors.title) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.title || unref(form).errors.title)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Slug</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).slug)} placeholder="örnek-yazı-slug" class="${ssrRenderClass([{ "input-error": errors.value.slug || unref(form).errors.slug }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.slug || unref(form).errors.slug) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Yayınlama Tarihi</span></label><div class="flex space-x-2"><input type="date"${ssrRenderAttr("value", publishDateObj.value.date)} class="${ssrRenderClass([{ "input-error": errors.value.published_at || unref(form).errors.published_at }, "input-bordered input w-full"])}"><input type="time"${ssrRenderAttr("value", publishDateObj.value.time)} class="${ssrRenderClass([{ "input-error": errors.value.published_at || unref(form).errors.published_at }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.published_at || unref(form).errors.published_at) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.published_at || unref(form).errors.published_at)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="md:col-span-2"><div class="form-control w-full"><label class="label"><span class="label-text">Özet</span></label><div class="relative"><textarea rows="3" placeholder="Yazının kısa özeti" class="${ssrRenderClass([{ "textarea-error": errors.value.summary || unref(form).errors.summary }, "textarea-bordered textarea w-full"])}">${ssrInterpolate(unref(form).summary)}</textarea></div>`);
      if (errors.value.summary || unref(form).errors.summary) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.summary || unref(form).errors.summary)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="md:col-span-2"><div class="form-control w-full"><label class="label"><span class="label-text">İçerik</span></label><div class="relative"><div class="${ssrRenderClass([{ "border-error": errors.value.content || unref(form).errors.content }, "min-h-[300px] rounded border border-base-300 bg-base-100 p-3"])}" style="${ssrRenderStyle({ "height": "400px" })}"></div>`);
      if (editorLoading.value) {
        _push(`<div class="upload-loading-overlay bg-base-100/50 absolute inset-0 z-20 flex items-center justify-center"><div class="flex flex-col items-center gap-2"><span class="loading loading-spinner loading-lg text-primary"></span><span class="text-sm">Resim yükleniyor...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.content || unref(form).errors.content) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.content || unref(form).errors.content)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      if (showToast.value) {
        _push(`<div class="toast toast-end z-50"><div class="${ssrRenderClass(`alert ${toastType.value}`)}"><span>${ssrInterpolate(toastMessage.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="label"><span class="label-text">Kategori</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.category_id || unref(form).errors.category_id }, "select-bordered select w-full"])}"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Kategori seç</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (errors.value.category_id || unref(form).errors.category_id) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="label"><span class="label-text">Durumu</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.status || unref(form).errors.status }, "select-bordered select w-full"])}"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayında</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}>Gizli</option></select>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><div class="form-control w-full"><label class="label"><span class="label-text">Kapak Resmi URL</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).cover_image)} placeholder="https://example.com/image.jpg" class="${ssrRenderClass([{ "input-error": errors.value.cover_image || unref(form).errors.cover_image }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.cover_image || unref(form).errors.cover_image) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.cover_image || unref(form).errors.cover_image)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Etiketler</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).tags)} placeholder="etiket1, etiket2, etiket3" class="${ssrRenderClass([{ "input-error": errors.value.tags || unref(form).errors.tags }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.tags || unref(form).errors.tags) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.tags || unref(form).errors.tags)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">SEO Anahtar Kelimeleri</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).seo_keywords)} placeholder="anahtar1, anahtar2, anahtar3" class="${ssrRenderClass([{ "input-error": errors.value.seo_keywords || unref(form).errors.seo_keywords }, "input-bordered input w-full"])}"></div>`);
      if (errors.value.seo_keywords || unref(form).errors.seo_keywords) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.seo_keywords || unref(form).errors.seo_keywords)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">SEO Meta Açıklaması</span></label><div class="relative"><textarea placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)" class="${ssrRenderClass([{ "textarea-error": errors.value.meta_description || unref(form).errors.meta_description }, "textarea-bordered textarea w-full"])}" maxlength="160" rows="2">${ssrInterpolate(unref(form).meta_description)}</textarea><div class="mt-1 text-xs text-gray-500">${ssrInterpolate(((_a = unref(form).meta_description) == null ? void 0 : _a.length) || 0)}/160</div></div>`);
      if (errors.value.meta_description || unref(form).errors.meta_description) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.meta_description || unref(form).errors.meta_description)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-1 text-xs text-gray-500"><span>İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span></div></div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Görüntülenme Sayısı</span></label><div class="relative"><input type="number"${ssrRenderAttr("value", unref(form).views_count)} class="input-bordered input w-full" readonly></div></div></div><div class="flex items-center space-x-2"><label class="label cursor-pointer justify-start gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="checkbox checkbox-primary"><span class="label-text">Çizim İçerir</span></label></div></div><div class="divider"></div><div class="flex justify-end space-x-3"><button type="submit" class="${ssrRenderClass([{ loading: unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Güncelle </button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
