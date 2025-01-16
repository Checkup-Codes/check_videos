import { ref, computed, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./Form-C0ycMiS1.js";
import { _ as _sfc_main$3 } from "./Button-CWlX4hVa.js";
const _sfc_main = {
  __name: "CategoriesEditFrom",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { props } = usePage();
    const categories = ref(props.categories || []);
    const form = useForm({
      name: props.category.name || "",
      slug: props.category.slug || "",
      parent_id: props.category.parent_id || null
    });
    const parentSearch = ref(((_a = props.category.parent) == null ? void 0 : _a.name) || "");
    const filteredCategories = computed(() => {
      if (!parentSearch.value) {
        return categories.value;
      }
      return categories.value.filter((category) => category.name.toLowerCase().includes(parentSearch.value.toLowerCase()));
    });
    const selectParentCategory = (category) => {
      form.parent_id = category.id;
      parentSearch.value = category.name;
    };
    const fetchCategories = async () => {
      const response = await fetch(route("categories.index"), { headers: { Accept: "application/json" } });
      const data = await response.json();
      categories.value = data.categories || [];
    };
    const updateCategory = () => {
      form.put(route("categories.update", { category: props.category.id })).then(() => {
        fetchCategories();
      });
    };
    const deleteCategory = (categoryId) => {
      if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
        form.delete(route("categories.destroy", { category: categoryId })).then(() => {
          fetchCategories();
        });
      }
    };
    watch(
      () => form.name,
      (newName) => {
        form.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    fetchCategories();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto p-4"><p class="mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700"> Kategorileriniz için düzenlemeler yapabilirsiniz. İsterseniz bir üst kategori seçebilirsiniz. </p>`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmit: updateCategory }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              id: "name",
              label: "İsim"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).slug,
              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
              id: "slug",
              label: "Slug"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-4"${_scopeId}><label for="parent_id_input" class="block text-sm font-medium text-gray-700"${_scopeId}>Üst Kategori</label><input type="text" id="parent_id_input"${ssrRenderAttr("value", parentSearch.value)} placeholder="Üst kategori arayın" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"${_scopeId}>`);
            if (filteredCategories.value.length) {
              _push2(`<ul class="mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm"${_scopeId}><!--[-->`);
              ssrRenderList(filteredCategories.value, (category) => {
                _push2(`<li class="cursor-pointer px-4 py-2 hover:bg-gray-100"${_scopeId}>${ssrInterpolate(category.name)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<p class="mt-2 text-sm text-gray-500"${_scopeId}>Sonuç bulunamadı.</p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              type: "submit",
              class: "mt-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Kategoriyi Güncelle`);
                } else {
                  return [
                    createTextVNode("Kategoriyi Güncelle")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).name,
                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                id: "name",
                label: "İsim"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).slug,
                "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                id: "slug",
                label: "Slug"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "mt-4" }, [
                createVNode("label", {
                  for: "parent_id_input",
                  class: "block text-sm font-medium text-gray-700"
                }, "Üst Kategori"),
                withDirectives(createVNode("input", {
                  type: "text",
                  id: "parent_id_input",
                  "onUpdate:modelValue": ($event) => parentSearch.value = $event,
                  placeholder: "Üst kategori arayın",
                  class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, parentSearch.value]
                ]),
                filteredCategories.value.length ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredCategories.value, (category) => {
                    return openBlock(), createBlock("li", {
                      key: category.id,
                      onClick: ($event) => selectParentCategory(category),
                      class: "cursor-pointer px-4 py-2 hover:bg-gray-100"
                    }, toDisplayString(category.name), 9, ["onClick"]);
                  }), 128))
                ])) : (openBlock(), createBlock("p", {
                  key: 1,
                  class: "mt-2 text-sm text-gray-500"
                }, "Sonuç bulunamadı."))
              ]),
              createVNode(_sfc_main$3, {
                type: "submit",
                class: "mt-4"
              }, {
                default: withCtx(() => [
                  createTextVNode("Kategoriyi Güncelle")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        onClick: ($event) => deleteCategory(unref(props).category.id),
        variant: "outline",
        class: "m-2 ml-auto text-black"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kategoriyi Sil `);
          } else {
            return [
              createTextVNode(" Kategoriyi Sil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
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
