import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "@inertiajs/inertia";
import _sfc_main$1 from "./GoBackButton-DuDuOUOx.js";
import { _ as _sfc_main$2 } from "./ExcalidrawComponent-B65HjL1S.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const categories = ref(props.categories);
    const auth = props.auth;
    const showMerhaba = ref(false);
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg bg-screen-bg p-2 shadow-md lg:mt-0" }, _attrs))}><div class="block lg:hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div class="pl-3 sm:px-10 md:grid md:grid-cols-12 lg:px-10 lg:pt-5"><div class="my-auto md:col-span-9"><h1 class="text-3xl font-bold">${ssrInterpolate(write.value.title)}</h1><div class="hidden text-sm text-gray-500 lg:block">Kategori: ${ssrInterpolate(getCategoryName(write.value.category_id))}</div></div><div class="flex items-end justify-end space-x-5 text-center md:col-span-3">`);
      if (write.value.hasDraw) {
        _push(`<div class="flex justify-end"><button class="rounded-md px-3 py-1 text-black shadow-md shadow-blue-200">${ssrInterpolate(showMerhaba.value ? "Yazıya Dön" : "Drawina Git")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth).user) {
        _push(`<div class="flex justify-end pt-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${write.value.id}/edit`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="rounded-md px-3 py-1 text-black shadow-md shadow-blue-200"${_scopeId}>Yazıyı Düzenle</div>`);
            } else {
              return [
                createVNode("div", { class: "rounded-md px-3 py-1 text-black shadow-md shadow-blue-200" }, "Yazıyı Düzenle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (showMerhaba.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$2, { write: write.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="flex items-center justify-between"></div><div class="p-4 lg:p-8"><div class="prose prose-lg ql-container-custom mb-6">${write.value.content ?? ""}</div><div class="rounded-lg bg-gray-100 p-4"><h2 class="mb-2 text-xl font-semibold">Özet</h2><p>${ssrInterpolate(write.value.summary)}</p></div>`);
        if (unref(auth).user) {
          _push(`<div class="flex"><button class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"> Yazıyı sil </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
