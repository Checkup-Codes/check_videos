import { withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    screen: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table class="w-full table-auto"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Kelime</th><th${_scopeId}>Türkçe</th><th${_scopeId}>İngilizce</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.words, (word) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(word.word)}</td><td${_scopeId}>${ssrInterpolate(word.meaning)}</td><td${_scopeId}>${ssrInterpolate(word.type)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("table", { class: "w-full table-auto" }, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Kelime"),
                    createVNode("th", null, "Türkçe"),
                    createVNode("th", null, "İngilizce")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.words, (word) => {
                    return openBlock(), createBlock("tr", {
                      key: word.id
                    }, [
                      createVNode("td", null, toDisplayString(word.word), 1),
                      createVNode("td", null, toDisplayString(word.meaning), 1),
                      createVNode("td", null, toDisplayString(word.type), 1)
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
