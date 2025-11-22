import { ref, computed, watch, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "CategoriesEditFrom"
}, {
  __name: "CategoriesEditFrom",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
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
    const { props } = usePage();
    const categoriesRaw = ref(props.categories || []);
    const categories = computed(() => flattenCategories(categoriesRaw.value));
    const currentCategory = ref(props.category || {});
    const form = useForm({
      name: currentCategory.value.name || "",
      slug: currentCategory.value.slug || "",
      parent_id: currentCategory.value.parent_id || null,
      status: currentCategory.value.status || "public"
    });
    const parentSearch = ref(((_a = props.category.parent) == null ? void 0 : _a.name) || "");
    const parentCategoryName = ref(((_b = props.category.parent) == null ? void 0 : _b.name) || "");
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
      const getChildIds = (categoryId, childIds2 = /* @__PURE__ */ new Set()) => {
        const children = categories.value.filter((cat) => cat.parent_id === categoryId);
        children.forEach((child) => {
          childIds2.add(child.id);
          getChildIds(child.id, childIds2);
        });
        return childIds2;
      };
      const excludedIds = /* @__PURE__ */ new Set([currentCategory.value.id]);
      const childIds = getChildIds(currentCategory.value.id);
      childIds.forEach((id) => excludedIds.add(id));
      let filtered = categories.value.filter(
        (category) => category && category.id && !excludedIds.has(category.id)
      );
      if (parentSearch.value) {
        const searchTerm = parentSearch.value.toLowerCase();
        const uniqueCategories2 = [];
        const seenIds2 = /* @__PURE__ */ new Set();
        filtered.forEach((category) => {
          if (!category || !category.name || seenIds2.has(category.id)) return;
          const nameMatch = category.name.toLowerCase().includes(searchTerm);
          const path = getCategoryPath(category.id);
          const pathMatch = path.toLowerCase().includes(searchTerm);
          const fullPath = getFullCategoryPath(category.id);
          const fullPathMatch = fullPath.toLowerCase().includes(searchTerm);
          if (nameMatch || pathMatch || fullPathMatch) {
            seenIds2.add(category.id);
            uniqueCategories2.push(category);
          }
        });
        return uniqueCategories2;
      }
      const uniqueCategories = [];
      const seenIds = /* @__PURE__ */ new Set();
      filtered.forEach((category) => {
        if (category && category.id && !seenIds.has(category.id)) {
          seenIds.add(category.id);
          uniqueCategories.push(category);
        }
      });
      return uniqueCategories;
    });
    const isFormDisabled = computed(() => {
      return !form.name || !form.slug;
    });
    watch(
      () => form.name,
      (newName) => {
        if (!newName) return;
        form.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    onMounted(() => {
      if (!categoriesRaw.value || categoriesRaw.value.length === 0) {
        fetchCategories();
      }
      if (form.parent_id) {
        const category = categories.value.find((c) => c.id === form.parent_id);
        if (category) {
          const fullPath = getFullCategoryPath(category.id);
          parentSearch.value = fullPath;
          parentCategoryName.value = category.name;
        }
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          showParentList.value = false;
        }
      });
    });
    const fetchCategories = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(route("categories.index"), {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-6 w-full max-w-full px-3 sm:px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto p-0 sm:p-4"><div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm"><div class="p-4 sm:p-6"><div class="mb-4"><h2 class="text-lg font-semibold text-card-foreground">Kategori Düzenle</h2><p class="mt-1 text-sm text-muted-foreground"> Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz. </p></div><div class="my-4 border-t border-border"></div><form class="space-y-6"><div class="w-full"><label class="mb-2 block text-sm font-medium text-foreground">İsim</label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.name }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="Kategori ismi">`);
      if (unref(form).errors.name) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(unref(form).errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full"><label class="mb-2 block text-sm font-medium text-foreground">Slug</label><input type="text"${ssrRenderAttr("value", unref(form).slug)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.slug }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="kategori-slug">`);
      if (unref(form).errors.slug) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full"><label class="mb-2 block text-sm font-medium text-foreground">Üst Kategori</label><div class="relative w-full"><input type="text"${ssrRenderAttr("value", parentSearch.value)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.parent_id }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" placeholder="Üst kategori ara">`);
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
      if (unref(form).parent_id) {
        _push(`<div class="mt-2 flex items-center gap-2"><div class="inline-flex flex-col items-start rounded-full border border-border bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"><span>${ssrInterpolate(parentCategoryName.value)}</span>`);
        if (getCategoryPath(unref(form).parent_id)) {
          _push(`<span class="text-[10px] font-normal opacity-80">${ssrInterpolate(getCategoryPath(unref(form).parent_id))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="button" class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" aria-label="Remove parent category"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(form).errors.parent_id) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(unref(form).errors.parent_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full"><label class="mb-2 block text-sm font-medium text-foreground">Durum</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": unref(form).errors.status }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"><option value="public"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "public") : ssrLooseEqual(unref(form).status, "public")) ? " selected" : ""}>Açık</option><option value="hidden"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "hidden") : ssrLooseEqual(unref(form).status, "hidden")) ? " selected" : ""}>Gizli</option></select>`);
      if (unref(form).errors.status) {
        _push(`<p class="mt-1 text-sm text-destructive">${ssrInterpolate(unref(form).errors.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-5 flex flex-col justify-between gap-3 sm:flex-row"><button type="button" class="order-2 inline-flex h-9 items-center justify-center rounded-md border border-destructive/20 bg-background px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:order-1"> Kategoriyi Sil </button><button type="submit" class="order-1 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:order-2"${ssrIncludeBooleanAttr(unref(form).processing || isFormDisabled.value) ? " disabled" : ""}>`);
      if (unref(form).processing) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Kategoriyi Güncelle </button></div></form></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
