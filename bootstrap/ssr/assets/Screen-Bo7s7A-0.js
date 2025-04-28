import { ref, computed, onMounted, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import _sfc_main$3 from "./WordsTable-BqU-bMcA.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
    error: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const isLoading = ref(true);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Kelimeler" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold text-gray-800"${_scopeId}>Kelime Listesi</h2><p class="text-sm text-gray-600"${_scopeId}> Toplam Kelime Sayısı: ${ssrInterpolate(isLoading.value ? "..." : props.words ? props.words.length : 0)}</p></div>`);
            if (isLoggedIn.value) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"${_scopeId}> Yeni Kelime Ekle </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              words: props.words,
              isLoading: isLoading.value,
              showActions: isLoggedIn.value
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Kelimeler" }),
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold text-gray-800" }, "Kelime Listesi"),
                    createVNode("p", { class: "text-sm text-gray-600" }, " Toplam Kelime Sayısı: " + toDisplayString(isLoading.value ? "..." : props.words ? props.words.length : 0), 1)
                  ]),
                  isLoggedIn.value ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: _ctx.route("rendition.words.create"),
                    class: "hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
                  }, " Yeni Kelime Ekle ", 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode(_sfc_main$3, {
                  words: props.words,
                  isLoading: isLoading.value,
                  showActions: isLoggedIn.value
                }, null, 8, ["words", "isLoading", "showActions"])
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
