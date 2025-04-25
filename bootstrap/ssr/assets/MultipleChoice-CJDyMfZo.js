import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "MultipleChoice",
  __ssrInlineRender: true,
  props: {
    gameType: String,
    packSlug: String
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const allPacks = page.props.languagePacks || [];
    computed(() => {
      if (!props.packSlug) return null;
      return allPacks.find((pack) => pack.slug === props.packSlug);
    });
    const words = ref([]);
    const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
    const currentQuestionIndex = ref(0);
    const selectedAnswer = ref(null);
    const userResponses = ref([]);
    const quizFinished = ref(false);
    onMounted(() => {
      console.log("Pack slug:", props.packSlug);
      console.log("All packs:", allPacks);
      const foundPack = allPacks.find((pack) => pack.slug === props.packSlug);
      console.log("Found pack:", foundPack);
      if (foundPack && foundPack.words && foundPack.words.length) {
        console.log("Loading words from found pack, words count:", foundPack.words.length);
        words.value = [...foundPack.words].sort(() => Math.random() - 0.5);
      } else if (allPacks.length > 0 && allPacks[0].words && allPacks[0].words.length) {
        console.log("Fallback to first pack, words count:", allPacks[0].words.length);
        words.value = [...allPacks[0].words].sort(() => Math.random() - 0.5);
      } else {
        console.log("No words found in any pack");
      }
    });
    const currentWord = computed(() => words.value.length ? words.value[currentQuestionIndex.value] : null);
    const shuffledOptions = computed(() => {
      if (!currentWord.value) return [];
      let options = words.value.filter((word) => word.id !== currentWord.value.id);
      options = options.sort(() => Math.random() - 0.5).slice(0, 3);
      options.push(currentWord.value);
      return options.sort(() => Math.random() - 0.5);
    });
    const feedbackMessage = computed(() => {
      if (!currentWord.value) return "";
      return selectedAnswer.value === currentWord.value.id ? "Correct!" : `Wrong! The correct answer is: ${currentWord.value.meaning}`;
    });
    const isLastQuestion = computed(() => words.value.length && currentQuestionIndex.value === words.value.length - 1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}>`);
      if (quizFinished.value) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed</h2><p class="mb-4 text-gray-600">Here&#39;s how you did:</p><ul class="space-y-2 text-left text-sm text-gray-800"><!--[-->`);
        ssrRenderList(userResponses.value, (response) => {
          var _a, _b;
          _push(`<li class="flex justify-between rounded-md bg-gray-50 px-4 py-2"><span class="${ssrRenderClass(response.correct ? "text-green-600" : "text-red-600")}">${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span>${ssrInterpolate(response.correct ? "✓" : "✗")} `);
          if (!response.correct) {
            _push(`<span class="ml-2 text-xs text-gray-500"> (Correct: ${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "Unknown")}) </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></li>`);
        });
        _push(`<!--]--></ul><button class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"> Restart Quiz </button></div>`);
      } else {
        _push(`<div class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">`);
        if (words.value.length) {
          _push(`<span class="absolute right-4 top-3 text-xs text-gray-400">${ssrInterpolate(currentQuestionIndex.value + 1)}/${ssrInterpolate(words.value.length)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (currentWord.value) {
          _push(`<h2 class="mb-4 text-xl font-semibold text-gray-900">${ssrInterpolate(currentWord.value.word)}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col gap-3"><!--[-->`);
        ssrRenderList(shuffledOptions.value, (option) => {
          _push(`<button class="${ssrRenderClass([
            "w-full rounded-lg px-4 py-3 text-sm font-medium transition focus:outline-none",
            selectedAnswer.value && option.id === currentWord.value.id ? "bg-green-500 text-white" : selectedAnswer.value && option.id === selectedAnswer.value ? "bg-red-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          ])}">${ssrInterpolate(option.meaning)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (selectedAnswer.value) {
          _push(`<p class="mt-4 text-sm text-gray-700">${ssrInterpolate(feedbackMessage.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedAnswer.value) {
          _push(`<button class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">${ssrInterpolate(isLastQuestion.value ? "Analyze" : "Next")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/MultipleChoice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
