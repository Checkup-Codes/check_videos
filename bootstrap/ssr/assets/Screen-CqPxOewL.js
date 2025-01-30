import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      title: "",
      slug: "",
      playlist_id: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-screen-bg container mx-auto p-6" }, _attrs))}><h1 class="mb-4 text-2xl font-bold">Yeni Ders oluştur</h1><form><div class="mb-4"><label for="title" class="${ssrRenderClass(linkedStyle)}">İsim:</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.title) {
        _push(`<p class="text-sm text-red-500">İsmi unuttun !</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="slug" class="${ssrRenderClass(linkedStyle)}">Slug:</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" id="slug" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.slug) {
        _push(`<p class="text-sm text-red-500">Slug deriz biz Türkçesi meçhul.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="playlist_id" class="${ssrRenderClass(linkedStyle)}">Play List ID:</label><input${ssrRenderAttr("value", unref(form).playlist_id)} type="text" id="playlist_id" class="${ssrRenderClass(linkedStyle2)}">`);
      if (unref(form).errors.playlist_id) {
        _push(`<p class="text-sm text-red-500"> Millet doğru girerken hata yapmamalı sen yazmıyon! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Dersi oluştur</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Create/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
