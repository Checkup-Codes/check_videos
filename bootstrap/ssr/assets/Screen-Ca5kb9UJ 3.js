import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const equipment = props.equipment;
    const form = useForm({
      name: equipment.name,
      slug: equipment.slug,
      specs: equipment.specs,
      link: equipment.link
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto min-h-screen p-8" }, _attrs))}><h1 class="mb-4 text-2xl font-bold">Edit Equipment</h1><form><div class="mb-4"><label class="mb-1 block text-gray-700">Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full border border-gray-300 p-2"></div><div class="mb-4"><label class="mb-1 block text-gray-700">Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="w-full border border-gray-300 p-2"></div><div class="mb-4"><label class="mb-1 block text-gray-700">Specs</label><textarea class="w-full border border-gray-300 p-2">${ssrInterpolate(unref(form).specs)}</textarea></div><div class="mb-4"><label class="mb-1 block text-gray-700">Link</label><input${ssrRenderAttr("value", unref(form).link)} type="url" class="w-full border border-gray-300 p-2"></div><button type="submit" class="bg-gray-600 px-4 py-2 text-white">Update</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Equipments/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
