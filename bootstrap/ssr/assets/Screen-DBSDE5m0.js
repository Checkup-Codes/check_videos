import { ref, onMounted, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props, url } = usePage();
    ref(props.writes);
    ref(props.categories);
    const category = ref(props.category);
    const flashSuccess = ref(props.flash.success);
    const auth = props.auth;
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-full overflow-auto bg-screen-bg px-5 lg:mt-0" }, _attrs))}><div class="container mx-auto min-h-screen p-4"><div class="hidden md:flex">`);
      if (unref(auth).user) {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/categories/${category.value.slug}/edit`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mx-2 rounded p-1 text-center font-bold text-black underline"${_scopeId}>Kategori İsmini Düzenle</div>`);
            } else {
              return [
                createVNode("div", { class: "mx-2 rounded p-1 text-center font-bold text-black underline" }, "Kategori İsmini Düzenle")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="h-screen items-center justify-center bg-screen-bg text-black"><div class="text-center"><h2 class="mb-4 text-4xl font-bold">Kategoriler : ${ssrInterpolate(category.value.name)}</h2></div></header></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Categories/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
