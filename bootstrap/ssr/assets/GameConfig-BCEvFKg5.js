import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
const _sfc_main = {
  __name: "GameConfig",
  __ssrInlineRender: true,
  emits: ["start-game"],
  setup(__props, { emit: __emit }) {
    const config = ref({
      questionCount: 10,
      wordSelection: "random",
      difficulty: "all",
      learningStatus: "all"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" }, _attrs))}><h2 class="mb-4 text-xl font-semibold text-gray-900">Oyun Ayarları</h2><div class="mb-4"><label for="questionCount" class="mb-1 block text-sm font-medium text-gray-700">Soru Sayısı</label><div class="flex items-center gap-2"><input type="range" id="questionCount"${ssrRenderAttr("value", config.value.questionCount)} min="5" max="20" class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"><span class="text-sm font-medium text-gray-700">${ssrInterpolate(config.value.questionCount)}</span></div></div><div class="mb-4"><label class="mb-1 block text-sm font-medium text-gray-700">Kelime Seçimi</label><div class="space-y-2"><div class="flex items-center"><input type="radio" id="random"${ssrIncludeBooleanAttr(ssrLooseEqual(config.value.wordSelection, "random")) ? " checked" : ""} value="random" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"><label for="random" class="ml-2 block text-sm text-gray-700">Rastgele</label></div><div class="flex items-center"><input type="radio" id="difficult"${ssrIncludeBooleanAttr(ssrLooseEqual(config.value.wordSelection, "difficult")) ? " checked" : ""} value="difficult" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"><label for="difficult" class="ml-2 block text-sm text-gray-700">Zor Kelimeler</label></div><div class="flex items-center"><input type="radio" id="easy"${ssrIncludeBooleanAttr(ssrLooseEqual(config.value.wordSelection, "easy")) ? " checked" : ""} value="easy" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"><label for="easy" class="ml-2 block text-sm text-gray-700">Kolay Kelimeler</label></div></div></div><div class="mb-4"><label for="difficulty" class="mb-1 block text-sm font-medium text-gray-700">Zorluk Seviyesi</label><select id="difficulty" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(config.value.difficulty) ? ssrLooseContain(config.value.difficulty, "all") : ssrLooseEqual(config.value.difficulty, "all")) ? " selected" : ""}>Tüm Seviyeler</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(config.value.difficulty) ? ssrLooseContain(config.value.difficulty, "1") : ssrLooseEqual(config.value.difficulty, "1")) ? " selected" : ""}>Kolay</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(config.value.difficulty) ? ssrLooseContain(config.value.difficulty, "2") : ssrLooseEqual(config.value.difficulty, "2")) ? " selected" : ""}>Orta</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(config.value.difficulty) ? ssrLooseContain(config.value.difficulty, "3") : ssrLooseEqual(config.value.difficulty, "3")) ? " selected" : ""}>Zor</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(config.value.difficulty) ? ssrLooseContain(config.value.difficulty, "4") : ssrLooseEqual(config.value.difficulty, "4")) ? " selected" : ""}>Çok Zor</option></select></div><div class="mb-6"><label for="learningStatus" class="mb-1 block text-sm font-medium text-gray-700">Öğrenme Durumu</label><select id="learningStatus" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(config.value.learningStatus) ? ssrLooseContain(config.value.learningStatus, "all") : ssrLooseEqual(config.value.learningStatus, "all")) ? " selected" : ""}>Tüm Durumlar</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(config.value.learningStatus) ? ssrLooseContain(config.value.learningStatus, "0") : ssrLooseEqual(config.value.learningStatus, "0")) ? " selected" : ""}>Öğrenilmedi</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(config.value.learningStatus) ? ssrLooseContain(config.value.learningStatus, "1") : ssrLooseEqual(config.value.learningStatus, "1")) ? " selected" : ""}>Öğreniliyor</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(config.value.learningStatus) ? ssrLooseContain(config.value.learningStatus, "2") : ssrLooseEqual(config.value.learningStatus, "2")) ? " selected" : ""}>Öğrenildi</option></select></div><button class="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"> Oyunu Başlat </button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/GameConfig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
