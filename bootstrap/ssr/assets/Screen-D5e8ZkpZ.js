import { computed, ref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import _sfc_main$5 from "./PacksTable-CvsOiqDb.js";
import _sfc_main$3 from "./MultipleChoice-CJDyMfZo.js";
import _sfc_main$4 from "./TranslateWord-BxOYPDXb.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const queryParams = computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null,
        pack_id: params.get("pack_id") || null
      };
    });
    ref([
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Çeviri", route: "translation" },
      { name: "Eşleştirme", route: "matching" },
      { name: "Hızlı Yanıt", route: "fast-response" },
      { name: "Kelime Tahmini", route: "word-guess" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Dil Paketleri" }, null, _parent2, _scopeId));
            if (queryParams.value.game == "multiple-choice") {
              _push2(ssrRenderComponent(_sfc_main$3, {
                gameType: queryParams.value.game,
                packId: queryParams.value.pack_id
              }, null, _parent2, _scopeId));
            } else if (queryParams.value.game == "fill-in-the-blank") {
              _push2(ssrRenderComponent(_sfc_main$4, {
                gameType: queryParams.value.game,
                packId: queryParams.value.pack_id
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$5, { languagePacks: __props.languagePacks }, null, _parent2, _scopeId));
            }
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Dil Paketleri" }),
              queryParams.value.game == "multiple-choice" ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                gameType: queryParams.value.game,
                packId: queryParams.value.pack_id
              }, null, 8, ["gameType", "packId"])) : queryParams.value.game == "fill-in-the-blank" ? (openBlock(), createBlock(_sfc_main$4, {
                key: 1,
                gameType: queryParams.value.game,
                packId: queryParams.value.pack_id
              }, null, 8, ["gameType", "packId"])) : (openBlock(), createBlock(_sfc_main$5, {
                key: 2,
                languagePacks: __props.languagePacks
              }, null, 8, ["languagePacks"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
