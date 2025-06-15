import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "WordTable",
  __ssrInlineRender: true,
  props: {
    words: Array,
    screen: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white px-5 text-gray-800" }, _attrs))}><table class="w-full table-auto"><thead><tr><th>Kelime</th><th>Türkçe</th><th>İngilizce</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.words, (word) => {
        _push(`<tr><td>${ssrInterpolate(word.word)}</td><td>${ssrInterpolate(word.meaning)}</td><td>${ssrInterpolate(word.type)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/WordTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
