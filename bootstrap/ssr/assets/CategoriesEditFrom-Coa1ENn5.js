import { ref, computed, watch, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CategoriesEditFrom",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const { props } = usePage();
    const categories = ref(props.categories || []);
    const currentCategory = ref(props.category || {});
    const form = useForm({
      name: currentCategory.value.name || "",
      slug: currentCategory.value.slug || "",
      parent_id: currentCategory.value.parent_id || null
    });
    const parentSearch = ref(((_a = props.category.parent) == null ? void 0 : _a.name) || "");
    const parentCategoryName = ref(((_b = props.category.parent) == null ? void 0 : _b.name) || "");
    const showParentList = ref(false);
    const isLoading = ref(false);
    ref(null);
    const filteredCategories = computed(() => {
      if (!categories.value || categories.value.length === 0) return [];
      return categories.value.filter(
        (category) => category && category.id !== currentCategory.value.id && (!parentSearch.value || category.name && category.name.toLowerCase().includes(parentSearch.value.toLowerCase()))
      );
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
      if (!categories.value || categories.value.length === 0) {
        fetchCategories();
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
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.categories) {
          categories.value = data.categories;
          console.log("Kategoriler yüklendi:", categories.value.length);
        }
      } catch (error) {
        console.error("Kategoriler yüklenirken hata:", error);
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-base-100 mx-auto mt-10 w-full max-w-full px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto p-4"><div class="card bg-base-100 shadow-xl"><div class="card-body"><h2 class="card-title text-primary">Kategori Düzenle</h2><p class="text-sm opacity-80"> Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz. </p><div class="divider"></div><form><div class="form-control w-full"><label class="label"><span class="label-text">İsim</span></label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="input input-bordered w-full" placeholder="Kategori ismi">`);
      if (unref(form).errors.name) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(unref(form).errors.name)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-control mt-4 w-full"><label class="label"><span class="label-text">Slug</span></label><input type="text"${ssrRenderAttr("value", unref(form).slug)} class="input input-bordered w-full" placeholder="kategori-slug">`);
      if (unref(form).errors.slug) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(unref(form).errors.slug)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-control mt-4 w-full"><label class="label"><span class="label-text">Üst Kategori</span></label><div class="relative w-full"><input type="text"${ssrRenderAttr("value", parentSearch.value)} class="input input-bordered w-full" placeholder="Üst kategori ara">`);
      if (showParentList.value && filteredCategories.value.length > 0) {
        _push(`<div class="absolute z-30 mt-1 w-full"><ul class="menu bg-base-100 rounded-box border-base-300 max-h-60 w-full overflow-y-auto border p-2 shadow-lg"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li><a class="hover:bg-primary hover:text-primary-content">${ssrInterpolate(category.name)}</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).parent_id) {
        _push(`<div class="mt-2 flex items-center"><div class="badge badge-primary">${ssrInterpolate(parentCategoryName.value)}</div><button type="button" class="btn btn-ghost btn-xs ml-2" aria-label="Üst kategoriyi kaldır"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(form).errors.parent_id) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(unref(form).errors.parent_id)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-6 flex justify-between"><button type="button" class="btn btn-error btn-outline"> Kategoriyi Sil </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing || isFormDisabled.value) ? " disabled" : ""}>`);
      if (unref(form).processing) {
        _push(`<span class="loading loading-spinner loading-sm"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Kategoriyi Güncelle </button></div></form></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
