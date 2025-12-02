import { ref, computed, watch, onMounted, onUnmounted, mergeProps, unref, useSSRContext, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "TestCategoriesCreateForm",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
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
      name: "",
      slug: "",
      parent_id: null,
      status: "public",
      description: ""
    });
    form.processing = false;
    const nameRef = ref(null);
    const slugRef = ref(null);
    const parentIdRef = ref(null);
    const statusRef = ref(null);
    const descriptionRef = ref(null);
    const errors = ref({
      name: "",
      slug: "",
      parent_id: "",
      status: "",
      description: ""
    });
    const parentSearch = ref("");
    const parentCategoryName = ref("");
    const showParentList = ref(false);
    const isLoading = ref(false);
    ref(null);
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
      if (!parentSearch.value) {
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
      const searchTerm = parentSearch.value.toLowerCase();
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
    const validateForm = () => {
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      let hasErrors = false;
      if (!form.name || form.name.trim() === "") {
        errors.value.name = "İsim zorunludur.";
        hasErrors = true;
      }
      if (!form.slug || form.slug.trim() === "") {
        errors.value.slug = "Slug zorunludur.";
        hasErrors = true;
      }
      if (hasErrors) {
        scrollToError();
      }
      return hasErrors;
    };
    const scrollToError = () => {
      nextTick(() => {
        const errorFields = [
          { ref: nameRef, error: errors.value.name },
          { ref: slugRef, error: errors.value.slug },
          { ref: parentIdRef, error: errors.value.parent_id },
          { ref: statusRef, error: errors.value.status },
          { ref: descriptionRef, error: errors.value.description }
        ];
        for (const field of errorFields) {
          if (field.error && field.ref.value) {
            field.ref.value.scrollIntoView({ behavior: "smooth", block: "center" });
            nextTick(() => {
              const inputElement = field.ref.value.querySelector("input, select, textarea");
              if (inputElement) {
                inputElement.focus();
              }
            });
            break;
          }
        }
      });
    };
    const resetForm = () => {
      form.reset();
      form.processing = false;
      form.status = "public";
      form.description = "";
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      parentSearch.value = "";
      parentCategoryName.value = "";
      form.parent_id = null;
    };
    watch(
      () => form.name,
      (newName) => {
        if (!newName) return;
        form.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    const submitForm = () => {
      const hasErrors = validateForm();
      if (!hasErrors) {
        form.post(route("test-categories.store"), {
          onSuccess: () => {
            router.visit(route("test-categories.index"));
          },
          onError: (serverErrors) => {
            Object.assign(errors.value, serverErrors);
            scrollToError();
          }
        });
      }
    };
    let sidebarSubmitHandler = null;
    let sidebarResetHandler = null;
    onMounted(() => {
      form.processing = false;
      if (!categoriesRaw.value || categoriesRaw.value.length === 0) {
        fetchCategories();
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          showParentList.value = false;
        }
      });
      sidebarSubmitHandler = () => {
        submitForm();
      };
      window.addEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      sidebarResetHandler = () => {
        resetForm();
      };
      window.addEventListener("sidebarFormReset", sidebarResetHandler);
    });
    onUnmounted(() => {
      if (sidebarSubmitHandler) {
        window.removeEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      }
      if (sidebarResetHandler) {
        window.removeEventListener("sidebarFormReset", sidebarResetHandler);
      }
    });
    watch(
      () => form.processing,
      (processing) => {
        window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing } }));
      }
    );
    const fetchCategories = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(route("test-categories.index"), {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        categoriesRaw.value = data.categories || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 py-6" }, _attrs))}><form class="space-y-4"><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div class="md:col-span-2"><div><label class="mb-1 block text-sm font-medium text-foreground">İsim</label><input type="text"${ssrRenderAttr("value", unref(form).name)} placeholder="Kategori ismi" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.name || unref(form).errors.name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.name || unref(form).errors.name) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.name || unref(form).errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="mb-1 block text-sm font-medium text-foreground">Slug</label><input type="text"${ssrRenderAttr("value", unref(form).slug)} placeholder="kategori-slug" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.slug || unref(form).errors.slug) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><div class="mb-1 flex items-center gap-2"><label class="text-sm font-medium text-foreground">Üst Kategori</label>`);
      if (unref(form).parent_id) {
        _push(`<div class="flex items-center gap-1.5"><span class="text-xs text-muted-foreground">:</span><span class="text-sm text-foreground">${ssrInterpolate(parentCategoryName.value)}</span>`);
        if (getCategoryPath(unref(form).parent_id)) {
          _push(`<span class="text-xs text-muted-foreground"> (${ssrInterpolate(getCategoryPath(unref(form).parent_id))}) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="flex h-4 w-4 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive" aria-label="Kaldır"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative w-full"><input type="text"${ssrRenderAttr("value", parentSearch.value)} placeholder="Üst kategori ara (opsiyonel)" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.parent_id || unref(form).errors.parent_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (showParentList.value && filteredCategories.value.length > 0) {
        _push(`<div class="absolute z-30 mt-1 w-full rounded-md border border-border bg-popover shadow-lg"><ul class="max-h-60 w-full overflow-y-auto p-1"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li class="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"><div class="flex flex-col gap-0.5"><span class="font-medium">${ssrInterpolate(category.name)}</span>`);
          if (getCategoryPath(category.id)) {
            _push(`<span class="text-xs text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg> ${ssrInterpolate(getCategoryPath(category.id))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.parent_id || unref(form).errors.parent_id) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.parent_id || unref(form).errors.parent_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Durum</label><select${ssrRenderAttr("value", unref(form).status)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.status || unref(form).errors.status }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"><option value="public">Açık</option><option value="private">Özel</option><option value="hidden">Gizli</option></select>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="md:col-span-2"><label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label><textarea placeholder="Kategori açıklaması (opsiyonel)" rows="3" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }, "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description || unref(form).errors.description) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.description || unref(form).errors.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex justify-end gap-2 pt-2"><button type="button" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Sıfırla </button><button type="submit" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>`);
      if (unref(form).processing) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kategoriyi Kaydet")}</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Categories/Create/TestCategoriesCreateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
