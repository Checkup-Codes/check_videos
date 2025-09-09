import { ref, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./RichTextEditor-OP0dOd6Z.js";
import "quill";
/* empty css                    */
/* empty css                             */
const LOCAL_STORAGE_KEY = "write_create_form";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteCreateForm"
}, {
  __name: "WriteCreateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    ref(props.categories || []);
    const form = useForm({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "draft",
      category_id: "",
      seo_keywords: "",
      meta_description: "",
      tags: "",
      views_count: 0,
      hasDraw: false
    });
    form.processing = false;
    const errors = ref({
      title: "",
      slug: "",
      content: "",
      published_at: "",
      summary: "",
      status: "",
      category_id: "",
      seo_keywords: "",
      meta_description: "",
      tags: ""
    });
    const publishDateObj = ref({
      date: "",
      time: ""
    });
    const statusOptions = [
      { value: "draft", label: "Şablon" },
      { value: "published", label: "Yayında" },
      { value: "private", label: "Gizli" },
      { value: "link_only", label: "Sadece Link" }
    ];
    const statusSearch = ref("");
    const categorySearch = ref("");
    const filteredStatuses = ref(statusOptions);
    const filteredCategories = ref(props.categories || []);
    onMounted(() => {
      const currentStatus = statusOptions.find((s) => s.value === form.status);
      if (currentStatus) {
        statusSearch.value = currentStatus.label;
      }
      if (form.category_id) {
        const category = props.categories.find((c) => c.id === form.category_id);
        if (category) {
          categorySearch.value = category.name;
        }
      }
    });
    onMounted(() => {
      const now = /* @__PURE__ */ new Date();
      publishDateObj.value.date = now.toISOString().split("T")[0];
      publishDateObj.value.time = now.toTimeString().slice(0, 5);
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
    watch(
      form,
      (newVal) => {
        const { processing, ...formData } = newVal;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      },
      { deep: true }
    );
    onMounted(() => {
      form.processing = false;
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const { processing, ...formData } = parsed;
          if (Object.keys(formData).length > 0 && (formData.title || formData.content || formData.category_id)) {
            Object.assign(form, formData);
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
      form.processing = false;
      console.log("Form mounted. Processing:", form.processing);
      console.log("Form data:", form.data());
    });
    watch(
      () => form.title,
      (newTitle) => {
        const turkishToEnglish = {
          ı: "i",
          İ: "i",
          ğ: "g",
          Ğ: "g",
          ü: "u",
          Ü: "u",
          ş: "s",
          Ş: "s",
          ö: "o",
          Ö: "o",
          ç: "c",
          Ç: "c"
        };
        let slug = newTitle;
        Object.entries(turkishToEnglish).forEach(([turkish, english]) => {
          slug = slug.replace(new RegExp(turkish, "g"), english);
        });
        form.slug = slug.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-body p-6"><div class="card-title flex items-center justify-between"><div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><h2 class="text-gray-800 dark:text-white">Yeni Yazı Oluştur</h2></div></div><form class="space-y-6"><div class="grid grid-cols-1 gap-6 md:grid-cols-2"><div class="md:col-span-2"><div class="form-control w-full"><label class="label"><span class="label-text">Başlık</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).title)} placeholder="Yazının başlığını girin" class="${ssrRenderClass([{ "input-error": errors.value.title || unref(form).errors.title }, "input-bordered input w-full"])}"></div>`);
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
      _push(`</div></div><div class="md:col-span-2"><div class="form-control w-full"><label class="label"><span class="label-text">Özet</span></label><div class="relative"><textarea placeholder="Yazının kısa özeti" rows="3" class="${ssrRenderClass([{ "textarea-error": errors.value.summary || unref(form).errors.summary }, "textarea-bordered textarea w-full"])}">${ssrInterpolate(unref(form).summary)}</textarea></div>`);
      if (errors.value.summary || unref(form).errors.summary) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.summary || unref(form).errors.summary)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="md:col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: unref(form).content,
        "onUpdate:modelValue": ($event) => unref(form).content = $event,
        label: "İçerik",
        error: errors.value.content || unref(form).errors.content,
        placeholder: "İçeriği buraya yazın...",
        height: "400px"
      }, null, _parent));
      _push(`</div><div><label class="label"><span class="label-text">Durumu</span></label><div class="dropdown w-full"><div class="relative"><input type="text"${ssrRenderAttr("value", statusSearch.value)} placeholder="Durum seçin veya arayın..." class="${ssrRenderClass([{ "input-error": errors.value.status || unref(form).errors.status }, "input-bordered input w-full pr-10"])}" tabindex="0">`);
      if (statusSearch.value) {
        _push(`<button class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (filteredStatuses.value.length > 0) {
        _push(`<ul tabindex="0" class="dropdown-content menu z-[1] max-h-60 w-full overflow-y-auto rounded-box bg-base-100 p-2 shadow"><!--[-->`);
        ssrRenderList(filteredStatuses.value, (status) => {
          _push(`<li><a>${ssrInterpolate(status.label)}</a></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="label"><span class="label-text">Kategori</span></label><div class="dropdown w-full"><div class="relative"><input type="text"${ssrRenderAttr("value", categorySearch.value)} placeholder="Kategori seçin veya arayın..." class="${ssrRenderClass([{ "input-error": errors.value.category_id || unref(form).errors.category_id }, "input-bordered input w-full pr-10"])}" tabindex="0">`);
      if (categorySearch.value) {
        _push(`<button class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (filteredCategories.value && filteredCategories.value.length > 0) {
        _push(`<ul tabindex="0" class="dropdown-content menu z-[1] max-h-60 w-full overflow-y-auto rounded-box bg-base-100 p-2 shadow"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li><a>${ssrInterpolate(category.name)}</a></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.category_id || unref(form).errors.category_id) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><div class="form-control w-full"><label class="label"><span class="label-text">Etiketler</span></label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).tags)} placeholder="etiket1, etiket2, etiket3" class="${ssrRenderClass([{ "input-error": errors.value.tags || unref(form).errors.tags }, "input-bordered input w-full"])}"></div>`);
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
      _push(`<div class="mt-1 text-xs text-gray-500"><span>İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span></div></div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Görüntülenme Sayısı</span></label><div class="relative"><input type="number"${ssrRenderAttr("value", unref(form).views_count)} class="input-bordered input w-full" readonly></div></div></div><div class="flex items-center space-x-2"><label class="label cursor-pointer justify-start gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="checkbox checkbox-neutral"><span class="label-text">Çizim İçerir</span></label></div></div><div class="divider"></div><div class="flex justify-end space-x-3"><button type="button" class="btn btn-outline"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>Sıfırla</button><button type="submit" class="${ssrRenderClass([{ loading: unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing || !unref(form).title || !unref(form).slug || !unref(form).content || !unref(form).category_id) ? " disabled" : ""}${ssrRenderAttr(
        "title",
        unref(form).processing ? "Kaydediliyor..." : !unref(form).title || !unref(form).slug || !unref(form).content || !unref(form).category_id ? "Lütfen gerekli alanları doldurun" : "Yazıyı kaydet"
      )}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Yazıyı Kaydet")}</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Create/WriteCreateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
