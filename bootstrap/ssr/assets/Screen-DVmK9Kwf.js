import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import dayjs from "dayjs";
import "dayjs/locale/tr.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    dayjs.locale("tr");
    const { props } = usePage();
    const version = ref(props.version);
    function formattedDate(date) {
      return dayjs(date).format("D MMMM YYYY, HH:mm");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-6" }, _attrs))}><div class="rounded-lg bg-white p-6 shadow-lg"><div class="flex justify-between"><h1 class="mb-4 text-3xl font-bold">${ssrInterpolate(version.value.version)}</h1>`);
      if (unref(props).auth.user) {
        _push(ssrRenderComponent(unref(Link), {
          href: `/versions/${version.value.id}/edit`,
          class: "underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Bu versiyonu düzenler misin`);
            } else {
              return [
                createTextVNode("Bu versiyonu düzenler misin")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-500">${ssrInterpolate(formattedDate(version.value.created_at))}</p>`);
      if (version.value.features.length > 0) {
        _push(`<div class="mt-6"><h2 class="mb-2 text-xl font-semibold">Özellikler:</h2><ul class="list-inside list-disc"><!--[-->`);
        ssrRenderList(version.value.features, (feature) => {
          _push(`<li><strong>${ssrInterpolate(feature.feature_name)}:</strong> ${ssrInterpolate(feature.feature_detail)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (version.value.bugs.length > 0) {
        _push(`<div class="mt-6"><h2 class="mb-2 text-xl font-semibold">Düzeltilen Hatalar:</h2><ul class="list-inside list-disc"><!--[-->`);
        ssrRenderList(version.value.bugs, (bug) => {
          _push(`<li><strong>${ssrInterpolate(bug.bug_name)}:</strong> ${ssrInterpolate(bug.bug_detail)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
