import { ref, computed, onMounted, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./RichTextEditor-B396xrd-.js";
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
    const flattenCategories = (categories2) => {
      const flat = [];
      const seenIds = /* @__PURE__ */ new Set();
      const traverse = (cats) => {
        if (!cats || !Array.isArray(cats)) return;
        cats.forEach((cat) => {
          if (cat && cat.id && !seenIds.has(cat.id)) {
            seenIds.add(cat.id);
            flat.push(cat);
            if (cat.children && Array.isArray(cat.children) && cat.children.length > 0) {
              traverse(cat.children);
            }
          }
        });
      };
      traverse(categories2);
      return flat;
    };
    const categoriesRaw = ref(props.categories || []);
    const categories = computed(() => flattenCategories(categoriesRaw.value));
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
    const showCategoryList = ref(false);
    const showStatusList = ref(false);
    ref(null);
    ref(null);
    const filteredStatuses = computed(() => {
      if (!statusSearch.value) return statusOptions;
      const searchTerm = statusSearch.value.toLowerCase();
      return statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
    });
    const getCategoryPath = (categoryId) => {
      if (!categoryId || !categories.value || categories.value.length === 0) return "";
      const findCategory = (id) => {
        return categories.value.find((cat) => cat.id === id);
      };
      const buildPath = (id, path2 = []) => {
        const category = findCategory(id);
        if (!category) return path2;
        path2.unshift(category.name);
        if (category.parent_id) {
          return buildPath(category.parent_id, path2);
        }
        return path2;
      };
      const path = buildPath(categoryId);
      if (path.length > 1) {
        return path.slice(0, -1).join(" > ");
      }
      return "";
    };
    const getFullCategoryPath = (categoryId) => {
      if (!categoryId || !categories.value || categories.value.length === 0) return "";
      const findCategory = (id) => {
        return categories.value.find((cat) => cat.id === id);
      };
      const buildPath = (id, path2 = []) => {
        const category = findCategory(id);
        if (!category) return path2;
        path2.unshift(category.name);
        if (category.parent_id) {
          return buildPath(category.parent_id, path2);
        }
        return path2;
      };
      const path = buildPath(categoryId);
      return path.join(" > ");
    };
    const filteredCategories = computed(() => {
      if (!categories.value || categories.value.length === 0) return [];
      if (!categorySearch.value) {
        const uniqueCategories2 = [];
        const seenIds2 = /* @__PURE__ */ new Set();
        categories.value.forEach((category) => {
          if (category && category.id && !seenIds2.has(category.id)) {
            seenIds2.add(category.id);
            uniqueCategories2.push(category);
          }
        });
        return uniqueCategories2;
      }
      const searchTerm = categorySearch.value.toLowerCase();
      const uniqueCategories = [];
      const seenIds = /* @__PURE__ */ new Set();
      categories.value.forEach((category) => {
        if (!category || !category.name || seenIds.has(category.id)) return;
        const nameMatch = category.name.toLowerCase().includes(searchTerm);
        const path = getCategoryPath(category.id);
        const pathMatch = path.toLowerCase().includes(searchTerm);
        const fullPath = getFullCategoryPath(category.id);
        const fullPathMatch = fullPath.toLowerCase().includes(searchTerm);
        if (nameMatch || pathMatch || fullPathMatch) {
          seenIds.add(category.id);
          uniqueCategories.push(category);
        }
      });
      return uniqueCategories;
    });
    onMounted(() => {
      const currentStatus = statusOptions.find((s) => s.value === form.status);
      if (currentStatus) {
        statusSearch.value = currentStatus.label;
      }
      if (form.category_id) {
        const category = categories.value.find((c) => c.id === form.category_id);
        if (category) {
          const fullPath = getFullCategoryPath(category.id);
          categorySearch.value = fullPath;
        }
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          showCategoryList.value = false;
          showStatusList.value = false;
        }
      });
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card rounded-lg border border-border bg-card text-card-foreground shadow-sm" }, _attrs))}><div class="p-6"><div class="mb-4 flex items-center justify-between"><div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><h2 class="text-lg font-semibold text-card-foreground">Yeni Yazı Oluştur</h2></div></div><form class="space-y-6"><div class="grid grid-cols-1 gap-6 md:grid-cols-2"><div class="md:col-span-2"><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Başlık</label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).title)} placeholder="Yazının başlığını girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.title || unref(form).errors.title }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.title || unref(form).errors.title) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.title || unref(form).errors.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Slug</label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).slug)} placeholder="örnek-yazı-slug" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.slug || unref(form).errors.slug) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Yayınlama Tarihi</label><div class="flex space-x-2"><input type="date"${ssrRenderAttr("value", publishDateObj.value.date)} class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at
      }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"><input type="time"${ssrRenderAttr("value", publishDateObj.value.time)} class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at
      }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.published_at || unref(form).errors.published_at) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.published_at || unref(form).errors.published_at)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="md:col-span-2"><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Özet</label><div class="relative"><textarea placeholder="Yazının kısa özeti" rows="3" class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.summary || unref(form).errors.summary
      }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">${ssrInterpolate(unref(form).summary)}</textarea></div>`);
      if (errors.value.summary || unref(form).errors.summary) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.summary || unref(form).errors.summary)}</p>`);
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
      _push(`</div><div><label class="mb-2 block text-sm font-medium text-foreground">Durumu</label><div class="relative w-full"><div class="relative"><input type="text"${ssrRenderAttr("value", statusSearch.value)} placeholder="Durum seçin veya arayın..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.status || unref(form).errors.status }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" tabindex="0">`);
      if (statusSearch.value) {
        _push(`<button class="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showStatusList.value && filteredStatuses.value.length > 0) {
        _push(`<ul tabindex="0" class="absolute z-[1] mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"><!--[-->`);
        ssrRenderList(filteredStatuses.value, (status) => {
          _push(`<li class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"><span class="font-medium">${ssrInterpolate(status.label)}</span></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-2 block text-sm font-medium text-foreground">Kategori</label><div class="relative w-full"><div class="relative"><input type="text"${ssrRenderAttr("value", categorySearch.value)} placeholder="Kategori seçin veya arayın..." class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.category_id || unref(form).errors.category_id
      }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" tabindex="0">`);
      if (categorySearch.value) {
        _push(`<button class="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showCategoryList.value && filteredCategories.value && filteredCategories.value.length > 0) {
        _push(`<ul tabindex="0" class="absolute z-[1] mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"><div class="flex flex-col gap-0.5"><span class="font-medium">${ssrInterpolate(category.name)}</span>`);
          if (getCategoryPath(category.id)) {
            _push(`<span class="text-xs text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg> ${ssrInterpolate(getCategoryPath(category.id))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.category_id || unref(form).errors.category_id) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Etiketler</label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).tags)} placeholder="etiket1, etiket2, etiket3" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.tags || unref(form).errors.tags }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.tags || unref(form).errors.tags) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.tags || unref(form).errors.tags)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">SEO Anahtar Kelimeleri</label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).seo_keywords)} placeholder="anahtar1, anahtar2, anahtar3" class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.seo_keywords || unref(form).errors.seo_keywords
      }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.seo_keywords || unref(form).errors.seo_keywords) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.seo_keywords || unref(form).errors.seo_keywords)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">SEO Meta Açıklaması</label><div class="relative"><textarea placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)" class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.meta_description || unref(form).errors.meta_description
      }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" maxlength="160" rows="2">${ssrInterpolate(unref(form).meta_description)}</textarea><div class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(((_a = unref(form).meta_description) == null ? void 0 : _a.length) || 0)}/160</div></div>`);
      if (errors.value.meta_description || unref(form).errors.meta_description) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(errors.value.meta_description || unref(form).errors.meta_description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-1 text-xs text-muted-foreground"><span>İpucu: Bu açıklama arama sonuçlarında gösterilir. Boş bırakırsanız, özet kısmı kullanılacaktır.</span></div></div></div><div><div class="mb-4 w-full"><label class="mb-2 block text-sm font-medium text-foreground">Görüntülenme Sayısı</label><div class="relative"><input type="number"${ssrRenderAttr("value", unref(form).views_count)} class="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" readonly></div></div></div><div class="flex items-center space-x-2"><label class="flex cursor-pointer items-center gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"><span class="text-sm font-medium text-foreground">Çizim İçerir</span></label></div></div><div class="my-6 border-t border-border"></div><div class="flex justify-end space-x-3"><button type="button" class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Sıfırla </button><button type="submit" class="${ssrRenderClass([{ "cursor-not-allowed opacity-50": unref(form).processing }, "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"])}"${ssrIncludeBooleanAttr(unref(form).processing || !unref(form).title || !unref(form).slug || !unref(form).content || !unref(form).category_id) ? " disabled" : ""}${ssrRenderAttr(
        "title",
        unref(form).processing ? "Kaydediliyor..." : !unref(form).title || !unref(form).slug || !unref(form).content || !unref(form).category_id ? "Lütfen gerekli alanları doldurun" : "Yazıyı kaydet"
      )}>`);
      if (unref(form).processing) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Yazıyı Kaydet")}</button></div></form></div></div>`);
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
