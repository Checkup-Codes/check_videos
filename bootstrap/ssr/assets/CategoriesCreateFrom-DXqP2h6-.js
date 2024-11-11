import { mergeProps, useSSRContext, watch, withCtx, createTextVNode, unref, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./CForm-9VrrqWSp.js";
import { _ as _sfc_main$4 } from "./CButton-Bo0n3h7o.js";
const _sfc_main$1 = {
  __name: "CFromDesc",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: "mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({ class: __props.infoClass }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/CFromDesc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "CategoriesCreateFrom",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      slug: ""
    });
    const createWrite = () => {
      form.post(route("categories.store")).then(() => {
      });
    };
    watch(
      () => form.name,
      (newName) => {
        form.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-10 w-full max-w-full overflow-auto bg-screen-bg px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto p-4"><h1 class="mb-4 text-2xl font-bold">Kategori Oluştur</h1>`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kategorileriniz için kategoriler oluşturun.`);
          } else {
            return [
              createTextVNode("Kategorileriniz için kategoriler oluşturun.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { onSubmit: createWrite }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              id: "name",
              label: "İsim"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: unref(form).slug,
              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
              id: "slug",
              label: "Slug"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { type: "submit" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Kategori Oluştur`);
                } else {
                  return [
                    createTextVNode("Kategori Oluştur")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                modelValue: unref(form).name,
                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                id: "name",
                label: "İsim"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_sfc_main$3, {
                modelValue: unref(form).slug,
                "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                id: "slug",
                label: "Slug"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_sfc_main$4, { type: "submit" }, {
                default: withCtx(() => [
                  createTextVNode("Kategori Oluştur")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
