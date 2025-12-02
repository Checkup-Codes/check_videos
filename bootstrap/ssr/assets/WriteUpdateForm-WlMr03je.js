import { ref, computed, onMounted, nextTick, watch, onUnmounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import _sfc_main$1 from "./RichTextEditor-DOsunnna.js";
import "quill";
/* empty css                      */
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "WriteUpdateForm"
}, {
  __name: "WriteUpdateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const titleRef = ref(null);
    const slugRef = ref(null);
    const publishedAtRef = ref(null);
    const summaryRef = ref(null);
    const contentRef = ref(null);
    const statusRef = ref(null);
    const categoryRef = ref(null);
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
    const writeData = ref(props.write);
    const categorySearch = ref("");
    const showCategoryList = ref(false);
    ref(null);
    const statusOptions = [
      { value: "published", label: "Herkese Açık" },
      { value: "private", label: "Gizli" },
      { value: "link_only", label: "Sadece Link" }
    ];
    const statusSearch = ref("");
    const showStatusList = ref(false);
    ref(null);
    const filteredStatuses = computed(() => {
      if (!statusSearch.value) return statusOptions;
      const currentStatus = statusOptions.find((s) => s.value === form.status);
      if (currentStatus && statusSearch.value === currentStatus.label) {
        return statusOptions;
      }
      const searchTerm = statusSearch.value.toLowerCase();
      return statusOptions.filter((status) => status.label.toLowerCase().includes(searchTerm));
    });
    const form = useForm({
      title: writeData.value.title || "",
      slug: writeData.value.slug || "",
      content: writeData.value.content || "",
      published_at: writeData.value.published_at || "",
      summary: writeData.value.summary || "",
      status: writeData.value.status || "published",
      category_id: writeData.value.category_id || "",
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
      seo_keywords: "",
      meta_description: "",
      tags: ""
    });
    const publishDateObj = ref({
      date: "",
      time: ""
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
    const isInitialMount = ref(true);
    onMounted(() => {
      if (form.published_at) {
        const dateObj = new Date(form.published_at);
        if (!isNaN(dateObj.getTime())) {
          publishDateObj.value.date = dateObj.toISOString().split("T")[0];
          publishDateObj.value.time = dateObj.toTimeString().substring(0, 5);
        }
      }
      if (form.category_id) {
        const category = categories.value.find((c) => c.id === form.category_id);
        if (category) {
          const fullPath = getFullCategoryPath(category.id);
          categorySearch.value = fullPath;
        }
      }
      const currentStatus = statusOptions.find((s) => s.value === form.status);
      if (currentStatus) {
        statusSearch.value = currentStatus.label;
      }
      if (form.slug && form.slug !== "") {
        isSlugManuallyChanged.value = true;
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          showCategoryList.value = false;
          showStatusList.value = false;
        }
      });
      nextTick(() => {
        setTimeout(() => {
          isInitialMount.value = false;
        }, 100);
      });
    });
    watch(
      publishDateObj.value,
      () => {
        if (isInitialMount.value) {
          return;
        }
        if (publishDateObj.value.date && publishDateObj.value.time) {
          form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
        }
      },
      { deep: true }
    );
    const scrollToError = () => {
      nextTick(() => {
        var _a;
        const errorFields = [
          { ref: titleRef, error: errors.value.title || form.errors.title },
          { ref: slugRef, error: errors.value.slug || form.errors.slug },
          { ref: contentRef, error: errors.value.content || form.errors.content },
          { ref: categoryRef, error: errors.value.category_id || form.errors.category_id },
          { ref: publishedAtRef, error: errors.value.published_at || form.errors.published_at },
          { ref: summaryRef, error: errors.value.summary || form.errors.summary },
          { ref: statusRef, error: errors.value.status || form.errors.status }
        ];
        const firstError = errorFields.find((field) => field.error);
        if (firstError && ((_a = firstError.ref) == null ? void 0 : _a.value)) {
          firstError.ref.value.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          const input = firstError.ref.value.querySelector("input, textarea");
          if (input) {
            setTimeout(() => input.focus(), 300);
          }
        }
      });
    };
    const validateForm = () => {
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      let hasErrors = false;
      if (!form.title || form.title.trim() === "") {
        errors.value.title = "Başlık zorunludur.";
        hasErrors = true;
      }
      if (!form.slug || form.slug.trim() === "") {
        errors.value.slug = "Slug zorunludur.";
        hasErrors = true;
      }
      if (!form.content || form.content.trim() === "" || form.content === "<p><br></p>") {
        errors.value.content = "İçerik zorunludur.";
        hasErrors = true;
      }
      if (!form.category_id) {
        errors.value.category_id = "Kategori seçilmelidir.";
        hasErrors = true;
      }
      if (publishDateObj.value.date && publishDateObj.value.time) {
        form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
      } else {
        form.published_at = null;
      }
      if (hasErrors) {
        scrollToError();
      }
      return !hasErrors;
    };
    const LOCAL_STORAGE_KEY = `write_edit_form_${writeData.value.id || writeData.value.slug || "unknown"}`;
    watch(
      form,
      (newVal) => {
        if (isInitialMount.value) {
          return;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
      },
      { deep: true }
    );
    watch(
      () => form.processing,
      (processing) => {
        window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing } }));
      }
    );
    let sidebarSubmitHandler = null;
    onMounted(() => {
      form.processing = false;
      window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing: false } }));
      sidebarSubmitHandler = () => {
        updateWrite();
      };
      window.addEventListener("sidebarFormSubmit", sidebarSubmitHandler);
    });
    onUnmounted(() => {
      if (sidebarSubmitHandler) {
        window.removeEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      }
    });
    const updateWrite = () => {
      if (!validateForm()) {
        return;
      }
      form.put(route("writes.update", { write: writeData.value.slug }), {
        onSuccess: () => {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          router.visit(route("writes.show", { write: form.slug }));
        },
        onError: (serverErrors) => {
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              if (errors.value.hasOwnProperty(key)) {
                errors.value[key] = serverErrors[key];
              }
            });
            scrollToError();
          }
        }
      });
    };
    let isSlugManuallyChanged = ref(false);
    watch(
      () => form.title,
      (newTitle) => {
        if (!isSlugManuallyChanged.value && newTitle) {
          form.slug = newTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").trim();
        }
      }
    );
    watch(
      () => form.slug,
      (newSlug, oldSlug) => {
        if (oldSlug !== void 0 && newSlug !== oldSlug && oldSlug !== "") {
          isSlugManuallyChanged.value = true;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 py-6" }, _attrs))}><form class="space-y-4"><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div class="md:col-span-2"><label class="mb-1 block text-sm font-medium text-foreground">Başlık</label><input type="text"${ssrRenderAttr("value", unref(form).title)} placeholder="Yazının başlığını girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.title || unref(form).errors.title }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.title || unref(form).errors.title) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.title || unref(form).errors.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Slug</label><input type="text"${ssrRenderAttr("value", unref(form).slug)} placeholder="örnek-yazı-slug" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.slug || unref(form).errors.slug) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Yayınlama Tarihi</label><div class="flex gap-2"><input type="date"${ssrRenderAttr("value", publishDateObj.value.date)} class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at
      }, "flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"><input type="time"${ssrRenderAttr("value", publishDateObj.value.time)} class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at
      }, "flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.published_at || unref(form).errors.published_at) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.published_at || unref(form).errors.published_at)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="md:col-span-2"><label class="mb-1 block text-sm font-medium text-foreground">Özet</label><textarea rows="2" placeholder="Yazının kısa özeti" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.summary || unref(form).errors.summary }, "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">${ssrInterpolate(unref(form).summary)}</textarea>`);
      if (errors.value.summary || unref(form).errors.summary) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.summary || unref(form).errors.summary)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="md:col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: unref(form).content,
        "onUpdate:modelValue": ($event) => unref(form).content = $event,
        label: "İçerik",
        error: errors.value.content || unref(form).errors.content,
        placeholder: "İçeriği buraya yazın...",
        height: "400px"
      }, null, _parent));
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Durumu</label><div class="relative"><input type="text"${ssrRenderAttr("value", statusSearch.value)} placeholder="Durum seçin..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.status || unref(form).errors.status }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" tabindex="0">`);
      if (statusSearch.value) {
        _push(`<button class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      if (showStatusList.value && filteredStatuses.value.length > 0) {
        _push(`<ul tabindex="0" class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-border bg-popover shadow-lg"><!--[-->`);
        ssrRenderList(filteredStatuses.value, (status) => {
          _push(`<li class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent">${ssrInterpolate(status.label)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Kategori</label><div class="relative"><input type="text"${ssrRenderAttr("value", categorySearch.value)} placeholder="Kategori seçin..." class="${ssrRenderClass([{
        "border-destructive focus-visible:ring-destructive": errors.value.category_id || unref(form).errors.category_id
      }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" tabindex="0">`);
      if (categorySearch.value) {
        _push(`<button class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      if (showCategoryList.value && filteredCategories.value && filteredCategories.value.length > 0) {
        _push(`<ul tabindex="0" class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-border bg-popover shadow-lg"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent"><div class="flex flex-col"><span>${ssrInterpolate(category.name)}</span>`);
          if (getCategoryPath(category.id)) {
            _push(`<span class="text-xs text-muted-foreground">${ssrInterpolate(getCategoryPath(category.id))}</span>`);
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
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Etiketler</label><input type="text"${ssrRenderAttr("value", unref(form).tags)} placeholder="etiket1, etiket2, etiket3" class="${ssrRenderClass([{ "border-destructive": errors.value.tags || unref(form).errors.tags }, "flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.tags || unref(form).errors.tags) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.tags || unref(form).errors.tags)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">SEO Anahtar Kelimeleri</label><input type="text"${ssrRenderAttr("value", unref(form).seo_keywords)} placeholder="anahtar1, anahtar2, anahtar3" class="${ssrRenderClass([{ "border-destructive": errors.value.seo_keywords || unref(form).errors.seo_keywords }, "flex h-9 w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.seo_keywords || unref(form).errors.seo_keywords) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.seo_keywords || unref(form).errors.seo_keywords)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">SEO Meta Açıklaması</label><textarea placeholder="Arama motorları için kısa bir açıklama (max 160 karakter)" class="${ssrRenderClass([{ "border-destructive": errors.value.meta_description || unref(form).errors.meta_description }, "flex min-h-[60px] w-full rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"])}" maxlength="160" rows="2">${ssrInterpolate(unref(form).meta_description)}</textarea><div class="mt-1 flex items-center justify-between">`);
      if (errors.value.meta_description || unref(form).errors.meta_description) {
        _push(`<p class="text-xs text-destructive">${ssrInterpolate(errors.value.meta_description || unref(form).errors.meta_description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-xs text-muted-foreground">${ssrInterpolate(((_a = unref(form).meta_description) == null ? void 0 : _a.length) || 0)}/160</span></div></div><div><label class="mb-1 block text-sm font-medium text-foreground">Görüntülenme Sayısı</label><input type="number"${ssrRenderAttr("value", unref(form).views_count)} class="flex h-9 w-full rounded border border-input bg-muted px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50" readonly></div><div class="flex items-center"><label class="flex cursor-pointer items-center gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hasDraw) ? ssrLooseContain(unref(form).hasDraw, null) : unref(form).hasDraw) ? " checked" : ""} class="h-4 w-4 rounded border-input text-primary"><span class="text-xs text-foreground">Çizim İçerir</span></label></div></div><div class="flex justify-end gap-2 pt-2"><button type="submit" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>`);
      if (unref(form).processing) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Güncelleniyor..." : "Güncelle")}</button></div></form></div>`);
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
