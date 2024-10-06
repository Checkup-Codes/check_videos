import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      version: "",
      release_date: "",
      description: "",
      features: [{ feature_name: "", feature_detail: "" }],
      bugs: [{ bug_name: "", bug_detail: "" }]
    });
    const errors = ref({
      version: "",
      release_date: "",
      description: "",
      features: "",
      bugs: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto bg-screen-bg p-6" }, _attrs))}><h1 class="mb-4 text-2xl font-bold">Yeni Version oluştur</h1><form class="space-y-6"><div class="space-y-2"><label for="version" class="block text-sm font-medium text-gray-700">Version</label><input${ssrRenderAttr("value", unref(form).version)} type="text" id="version" class="w-full rounded-md border-gray-300 shadow-sm">`);
      if (errors.value.version) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.version)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2"><label for="release_date" class="block text-sm font-medium text-gray-700">Yayınlanma Tarihi</label><input${ssrRenderAttr("value", unref(form).release_date)} type="date" id="release_date" class="w-full rounded-md border-gray-300 shadow-sm">`);
      if (errors.value.release_date) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.release_date)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2"><label for="description" class="block text-sm font-medium text-gray-700">Açıklama</label><textarea id="description" class="w-full rounded-md border-gray-300 shadow-sm">${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-4"><h3 class="text-lg font-semibold">Yeni Özellikler</h3><!--[-->`);
      ssrRenderList(unref(form).features, (feature, index) => {
        _push(`<div class="space-y-2"><input${ssrRenderAttr("value", feature.feature_name)} placeholder="Yeni Özellik ismi" class="w-full rounded-md border-gray-300 shadow-sm"><input${ssrRenderAttr("value", feature.feature_detail)} placeholder="Açıklaması" class="w-full rounded-md border-gray-300 shadow-sm"><button type="button" class="text-red-600 hover:underline">Kaldır</button></div>`);
      });
      _push(`<!--]-->`);
      if (errors.value.features) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.features)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="text-blue-600 hover:underline">Yeni Özellik Ekle</button></div><div class="space-y-4"><h3 class="text-lg font-semibold">Bugs</h3><!--[-->`);
      ssrRenderList(unref(form).bugs, (bug, index) => {
        _push(`<div class="space-y-2"><input${ssrRenderAttr("value", bug.bug_name)} placeholder="Yeni Bug İsmi" class="w-full rounded-md border-gray-300 shadow-sm"><input${ssrRenderAttr("value", bug.bug_detail)} placeholder="Bug Çözüm Açıklaması" class="w-full rounded-md border-gray-300 shadow-sm"><button type="button" class="text-red-600 hover:underline">Kaldır</button></div>`);
      });
      _push(`<!--]-->`);
      if (errors.value.bugs) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.bugs)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="text-blue-600 hover:underline">Yeni Bug ekle</button></div><button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white">Submit</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
