import { ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./RichTextEditor-BVwYD6_Q.js";
import "quill";
/* empty css                    */
import "../app.js";
/* empty css      */
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteCreateForm"
}, {
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
      seo_keywords: "",
      meta_description: "",
      tags: "",
      views_count: 0,
      hasDraw: false
    });
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
      () => form.title,
      (newTitle) => {
        if (!form.slug || form.slug === "") {
          form.slug = newTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
        }
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
      _push(`</div><div><label class="label"><span class="label-text">Durumu</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.status || unref(form).errors.status }, "select-bordered select w-full bg-base-100 text-neutral-content"])}"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Şablon</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayında</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}>Gizli</option><option value="link_only"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "link_only") : ssrLooseEqual(unref(form).status, "link_only")) ? " selected" : ""}>Sadece Link</option></select>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="label"><span class="label-text">Kategori</span></label><select class="${ssrRenderClass([{ "select-error": errors.value.category_id || unref(form).errors.category_id }, "select-bordered select w-full bg-base-100 text-neutral-content"])}"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Kategori seç</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select>`);
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
      _push(`<div class="mt-1 text-xs text-gray-500"><span>İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span></div></div></div><div><div class="form-control w-full"><label class="label"><span class="label-text">Görüntülenme Sayısı</span></label><div class="relative"><input type="number"${ssrRenderAttr("value", unref(form).views_count)} class="input-bordered input w-full" readonly></div></div></div><div class="flex items-center space-x-2"><label class="label cursor-pointer justify-start gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="checkbox checkbox-neutral"><span class="label-text">Çizim İçerir</span></label></div></div><div class="divider"></div><div class="flex justify-end space-x-3"><button type="submit" class="${ssrRenderClass([{ loading: unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Yazıyı Kaydet </button></div></form></div></div>`);
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
