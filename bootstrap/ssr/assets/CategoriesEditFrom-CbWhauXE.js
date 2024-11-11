import { watch, mergeProps, withCtx, unref, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./CForm-9VrrqWSp.js";
import { _ as _sfc_main$3 } from "./CButton-Bo0n3h7o.js";
const _sfc_main = {
  __name: "CategoriesEditFrom",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    props.auth;
    const form = useForm({
      name: "",
      slug: ""
    });
    watch(
      () => props.category,
      (newCategory) => {
        form.name = newCategory.name;
        form.slug = newCategory.slug;
      },
      { immediate: true }
    );
    const updateWrite = () => {
      form.put(route("categories.update", { category: props.category.id })).then(() => {
      }).catch((error) => {
      });
    };
    const deleteCategory = (categoryId) => {
      if (confirm("Bu kategoriyi çöpe mi atıyoruz ?")) {
        form.delete(route("categories.destroy", { category: props.category.id })).then(() => {
        }).catch((error) => {
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-10 w-full max-w-full overflow-auto bg-screen-bg px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto p-4"><h1 class="mb-4 text-2xl font-bold">Kategoriyi Düzenle</h1><p class="mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700">Kategorileri için düzenle.</p>`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmit: updateWrite }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              id: "title",
              label: "İsim"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).slug,
              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
              id: "slug",
              label: "Slug"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { type: "submit" }, {
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
                id: "title",
                label: "İsim"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).slug,
                "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                id: "slug",
                label: "Slug"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_sfc_main$3, { type: "submit" }, {
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
