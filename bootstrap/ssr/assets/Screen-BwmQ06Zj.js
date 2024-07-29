import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "@inertiajs/inertia";
import _sfc_main$1 from "./GoBackButton-DuDuOUOx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const write = ref(props.write);
    const categories = ref(props.categories);
    const auth = props.auth;
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg mx-auto mt-10 w-full max-w-full overflow-auto rounded-lg p-2 shadow-md lg:mt-0" }, _attrs))}><div class="flex items-center justify-between"><div class="hidden text-sm text-gray-500 lg:block">Kategori: ${ssrInterpolate(getCategoryName(write.value.category_id))}</div><div class="block lg:hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
      if (unref(auth).user) {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/writes/${write.value.id}/edit`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="m-2 rounded p-2 text-center font-bold text-black underline"${_scopeId}>Yazıyı Düzenle</div>`);
            } else {
              return [
                createVNode("div", { class: "m-2 rounded p-2 text-center font-bold text-black underline" }, "Yazıyı Düzenle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-4 lg:p-8"><h1 class="mb-6 text-3xl font-bold">${ssrInterpolate(write.value.title)}</h1><div class="prose prose-lg ql-container-custom mb-6">${write.value.content ?? ""}</div><div class="rounded-lg bg-gray-100 p-4"><h2 class="mb-2 text-xl font-semibold">Özet</h2><p>${ssrInterpolate(write.value.summary)}</p></div>`);
      if (unref(auth).user) {
        _push(`<div class="flex"><button class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"> Yazıyı sil </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
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
