import { ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const result = props.result || {};
    const isGuest = props.isGuest || false;
    const copyButtonText = ref("Mesajı Kopyala");
    const detailedSummary = ref("");
    const detailedSummaryCopyText = ref("Özeti Kopyala");
    const scoreValue = computed(() => Math.round(result.score || 0));
    const wrongAnswers = computed(() => Math.max((result.total_questions || 0) - (result.correct_answers || 0), 0));
    const resultStats = computed(() => [
      { label: "Doğru", value: result.correct_answers || 0 },
      { label: "Yanlış", value: wrongAnswers.value },
      { label: "Toplam", value: result.total_questions || 0 },
      { label: "Başarı", value: `%${scoreValue.value}` }
    ]);
    const scoreLabel = computed(() => {
      if (scoreValue.value >= 80) return "Güçlü sonuç";
      if (scoreValue.value >= 60) return "Geliştirilebilir sonuç";
      return "Tekrar gerektiren sonuç";
    });
    const resultAnswers = computed(() => {
      if (isGuest && result.answers) {
        const groupedAnswers = {};
        result.answers.forEach((answer) => {
          const questionId = answer.question.id;
          if (!groupedAnswers[questionId]) {
            groupedAnswers[questionId] = {
              id: `guest-answer-${questionId}`,
              question: answer.question,
              selected_option_ids: [],
              is_correct: answer.is_correct,
              answer_text: answer.answer_text
            };
          }
          if (answer.option_id) {
            groupedAnswers[questionId].selected_option_ids.push(answer.option_id);
          }
        });
        return Object.values(groupedAnswers);
      }
      if (result.answers) {
        const groupedAnswers = {};
        result.answers.forEach((answer) => {
          var _a;
          const questionId = ((_a = answer.question) == null ? void 0 : _a.id) || answer.question_id;
          if (!groupedAnswers[questionId]) {
            groupedAnswers[questionId] = {
              id: answer.id,
              question: answer.question,
              selected_option_ids: [],
              is_correct: answer.is_correct,
              answer_text: answer.answer_text
            };
          }
          if (answer.option_id) {
            groupedAnswers[questionId].selected_option_ids.push(answer.option_id);
          }
        });
        return Object.values(groupedAnswers);
      }
      return [];
    });
    const scoreColor = computed(() => {
      const score = result.score || 0;
      if (score >= 80) return "text-green-500";
      if (score >= 60) return "text-yellow-500";
      return "text-red-500";
    });
    const totalCircumference = computed(() => {
      return 2 * Math.PI * 54;
    });
    const scoreCircumference = computed(() => {
      const score = result.score || 0;
      return score / 100 * totalCircumference.value;
    });
    const getQuestionOptions = (question) => {
      if (!question || !question.options) return [];
      return question.options.sort((a, b) => (a.order || 0) - (b.order || 0));
    };
    const formatTime = (seconds) => {
      if (!seconds) return "";
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      if (minutes > 0) {
        return `${minutes} dakika ${secs} saniye`;
      }
      return `${secs} saniye`;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const canShare = computed(() => {
      return typeof navigator !== "undefined" && "share" in navigator;
    });
    const shareMessage = computed(() => {
      var _a, _b;
      const testTitle = ((_a = result.test) == null ? void 0 : _a.title) || "Test";
      const participantName = result.participant_name || "Ben";
      const score = Math.round(result.score || 0);
      const totalQuestions = result.total_questions || 0;
      const testSlug = (_b = result.test) == null ? void 0 : _b.slug;
      if (!testSlug) {
        return "";
      }
      const testUrl = window.location.origin + `/tests/${testSlug}/take`;
      return `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin? ${testUrl}`;
    });
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(shareMessage.value);
        copyButtonText.value = "Kopyalandı!";
        setTimeout(() => {
          copyButtonText.value = "Mesajı Kopyala";
        }, 2e3);
      } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = shareMessage.value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          copyButtonText.value = "Kopyalandı!";
          setTimeout(() => {
            copyButtonText.value = "Mesajı Kopyala";
          }, 2e3);
        } catch (err2) {
          console.error("Kopyalama hatası:", err2);
        }
        document.body.removeChild(textArea);
      }
    };
    const shareResult = async () => {
      var _a, _b;
      const testTitle = ((_a = result.test) == null ? void 0 : _a.title) || "Test";
      const participantName = result.participant_name || "Ben";
      const score = Math.round(result.score || 0);
      const totalQuestions = result.total_questions || 0;
      const testSlug = (_b = result.test) == null ? void 0 : _b.slug;
      if (!testSlug) {
        return;
      }
      const testUrl = window.location.origin + `/tests/${testSlug}/take`;
      const shareData = {
        title: `Test Sonucu: ${testTitle}`,
        text: `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin?`,
        url: testUrl
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Paylaşım hatası:", err);
        }
      }
    };
    const generateDetailedSummary = () => {
      var _a;
      const testTitle = ((_a = result.test) == null ? void 0 : _a.title) || "Test";
      const participantName = result.participant_name || "Katılımcı";
      const score = scoreValue.value;
      const correctAnswers = result.correct_answers || 0;
      const totalQuestions = result.total_questions || 0;
      const wrongAnswerCount = wrongAnswers.value;
      const timeTaken = result.time_taken ? formatTime(result.time_taken) : "Belirtilmemiş";
      const completedAt = result.completed_at ? formatDate(result.completed_at) : "Belirtilmemiş";
      const wrongAnsweredQuestions = resultAnswers.value.filter((answer) => !answer.is_correct);
      let summary = `${testTitle} - Sonuç Özeti

`;
      summary += `Katılımcı: ${participantName}
`;
      summary += `Puan: ${score}/100
`;
      summary += `Sonuç: ${correctAnswers}/${totalQuestions} doğru, ${wrongAnswerCount} yanlış
`;
      summary += `Süre: ${timeTaken}
`;
      summary += `Tarih: ${completedAt}

`;
      if (score >= 80) {
        summary += `Genel değerlendirme: Konuya hakimiyet güçlü görünüyor. Yanlış veya boş kalan sorular kısa tekrar için yeterli olabilir.

`;
      } else if (score >= 60) {
        summary += `Genel değerlendirme: Temel bilgi var, ancak bazı başlıklar tekrar edilmeli. Özellikle yanlış yapılan sorular üzerinden ilerlemek faydalı olur.

`;
      } else {
        summary += `Genel değerlendirme: Konu tekrarına ihtiyaç var. Önce yanlış yapılan soruların açıklamalarını, ardından temel kavramları yeniden gözden geçirmek iyi olur.

`;
      }
      summary += `Soru Notları
`;
      resultAnswers.value.forEach((answer, index) => {
        var _a2, _b, _c, _d, _e, _f;
        const questionNumber = index + 1;
        const questionText = ((_a2 = answer.question) == null ? void 0 : _a2.question_text) || "Soru metni bulunamadı";
        const isCorrect = answer.is_correct;
        const explanation = ((_b = answer.question) == null ? void 0 : _b.explanation) || "";
        const options = getQuestionOptions(answer.question);
        const questionType = ((_c = answer.question) == null ? void 0 : _c.question_type) || "multiple_choice";
        summary += `
${questionNumber}. ${isCorrect ? "Doğru" : "Yanlış"} - ${questionText}
`;
        if (questionType === "true_false" || options.length === 0 && answer.answer_text !== null) {
          const userAnswer = answer.answer_text === "true" || answer.answer_text === true ? "Doğru" : "Yanlış";
          const correctAnswer = ((_d = answer.question) == null ? void 0 : _d.correct_answer) === "true" || ((_e = answer.question) == null ? void 0 : _e.correct_answer) === true || ((_f = answer.question) == null ? void 0 : _f.correct_answer) === 1 ? "Doğru" : "Yanlış";
          summary += `Verilen cevap: ${userAnswer}
`;
          if (!isCorrect) summary += `Doğru cevap: ${correctAnswer}
`;
        } else {
          const correctOptions = options.filter((opt) => opt.is_correct);
          const selectedOptions = options.filter(
            (opt) => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id)
          );
          summary += `Verilen cevap: ${selectedOptions.map((opt) => opt.option_text).join(", ") || "Cevap verilmedi"}
`;
          if (!isCorrect) summary += `Doğru cevap: ${correctOptions.map((opt) => opt.option_text).join(", ")}
`;
        }
        if (explanation) {
          summary += `Açıklama: ${explanation}
`;
        }
      });
      summary += `
Tekrar önerisi: `;
      summary += wrongAnsweredQuestions.length ? `${wrongAnsweredQuestions.length} yanlış soruyu açıklamalarıyla tekrar et ve benzer sorularla pekiştir.` : `Tüm sorular doğru. Bilgiyi kalıcı yapmak için testi daha sonra tekrar çöz.`;
      detailedSummary.value = summary;
    };
    const copyDetailedSummary = async () => {
      try {
        await navigator.clipboard.writeText(detailedSummary.value);
        detailedSummaryCopyText.value = "Kopyalandı!";
        setTimeout(() => {
          detailedSummaryCopyText.value = "Özeti Kopyala";
        }, 2e3);
      } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = detailedSummary.value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          detailedSummaryCopyText.value = "Kopyalandı!";
          setTimeout(() => {
            detailedSummaryCopyText.value = "Özeti Kopyala";
          }, 2e3);
        } catch (err2) {
          console.error("Kopyalama hatası:", err2);
        }
        document.body.removeChild(textArea);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ infoClass: "test-result-screen" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="mx-auto max-w-5xl space-y-5 px-3 py-4 pb-24 sm:px-4 sm:py-6 lg:pb-10"${_scopeId}><section class="rounded-lg border border-border/70 bg-card p-4 sm:p-6"${_scopeId}><div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"${_scopeId}><div class="min-w-0"${_scopeId}><p class="text-xs font-medium text-muted-foreground"${_scopeId}>Test sonucu</p><h1 class="mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl"${_scopeId}>${ssrInterpolate(((_a = unref(result).test) == null ? void 0 : _a.title) || "Test")}</h1><div class="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground"${_scopeId}>`);
            if (unref(result).completed_at) {
              _push2(`<span${_scopeId}>${ssrInterpolate(formatDate(unref(result).completed_at))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(result).time_taken) {
              _push2(`<span${_scopeId}>${ssrInterpolate(formatTime(unref(result).time_taken))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex items-center gap-4 rounded-md border border-border bg-background p-3"${_scopeId}><div class="relative h-20 w-20"${_scopeId}><svg class="h-20 w-20 -rotate-90 transform" viewBox="0 0 128 128"${_scopeId}><circle cx="64" cy="64" r="54" stroke="currentColor" stroke-width="8" fill="none" class="text-muted"${_scopeId}></circle><circle cx="64" cy="64" r="54" stroke="currentColor" stroke-width="8" fill="none"${ssrRenderAttr("stroke-dasharray", `${scoreCircumference.value} ${totalCircumference.value}`)} class="${ssrRenderClass([scoreColor.value, "transition-all duration-500"])}"${_scopeId}></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center"${_scopeId}><span class="${ssrRenderClass([scoreColor.value, "text-2xl font-semibold"])}"${_scopeId}>${ssrInterpolate(scoreValue.value)}</span><span class="text-[10px] text-muted-foreground"${_scopeId}>puan</span></div></div><div${_scopeId}><p class="text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(scoreLabel.value)}</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(result).correct_answers || 0)} doğru, ${ssrInterpolate(wrongAnswers.value)} yanlış </p></div></div></div><div class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(resultStats.value, (stat) => {
              _push2(`<div class="rounded-md border border-border/70 bg-background p-3"${_scopeId}><p class="text-xl font-semibold text-foreground"${_scopeId}>${ssrInterpolate(stat.value)}</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(stat.label)}</p></div>`);
            });
            _push2(`<!--]--></div></section><section class="rounded-lg border border-border/70 bg-card p-4 sm:p-5"${_scopeId}><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h2 class="text-base font-semibold text-foreground"${_scopeId}>Detaylı özet</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>Kısa, okunabilir ve paylaşılabilir bir sonuç metni üretir.</p></div><div class="grid gap-2 sm:flex sm:items-center"${_scopeId}><button class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"${_scopeId}> Detaylı Özet Çıkar </button>`);
            if (detailedSummary.value) {
              _push2(`<button class="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"${_scopeId}>${ssrInterpolate(detailedSummaryCopyText.value)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (detailedSummary.value) {
              _push2(`<div class="mt-4 rounded-md border border-border bg-background p-4"${_scopeId}><pre class="whitespace-pre-wrap break-words text-sm leading-6 text-foreground"${_scopeId}>${ssrInterpolate(detailedSummary.value)}</pre></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
            if (unref(isGuest)) {
              _push2(`<section class="rounded-lg border border-border/70 bg-card p-4 sm:p-5"${_scopeId}><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="min-w-0"${_scopeId}><h2 class="text-base font-semibold text-foreground"${_scopeId}>Paylaş</h2><p id="shareMessage" class="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground"${_scopeId}>${ssrInterpolate(shareMessage.value)}</p></div><div class="grid shrink-0 gap-2 sm:min-w-36"${_scopeId}><button class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"${_scopeId}>${ssrInterpolate(copyButtonText.value)}</button>`);
              if (canShare.value) {
                _push2(`<button class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"${_scopeId}> Paylaş </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="space-y-3"${_scopeId}><div class="flex items-center justify-between gap-3"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Sorular ve Cevaplar</h2><span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(resultAnswers.value.length)} soru</span></div><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(resultAnswers.value, (answer, index) => {
              var _a2, _b2, _c2, _d2, _e;
              _push2(`<div class="space-y-3 rounded-lg border border-border/70 bg-card p-4"${_scopeId}><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="flex flex-wrap items-center gap-2"${_scopeId}><span class="text-xs font-medium text-muted-foreground"${_scopeId}>Soru ${ssrInterpolate(index + 1)}</span>`);
              if (answer.is_correct) {
                _push2(`<span class="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300"${_scopeId}> Doğru </span>`);
              } else {
                _push2(`<span class="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"${_scopeId}> Yanlış </span>`);
              }
              _push2(`</div>`);
              if (!answer.is_correct) {
                _push2(`<div class="rounded-md bg-green-50 px-3 py-2 dark:bg-green-950/60"${_scopeId}><div class="sm:text-right"${_scopeId}><p class="mb-0.5 text-xs text-green-700/80 dark:text-green-300/80"${_scopeId}>Doğru cevap</p><p class="text-sm font-semibold text-green-700 dark:text-green-400"${_scopeId}>`);
                if (getQuestionOptions(answer.question).length > 0) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(getQuestionOptions(answer.question).filter((opt) => opt.is_correct).map((opt) => opt.option_text).join(", "))}</span>`);
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(((_a2 = answer.question) == null ? void 0 : _a2.correct_answer) === "true" || ((_b2 = answer.question) == null ? void 0 : _b2.correct_answer) === true || ((_c2 = answer.question) == null ? void 0 : _c2.correct_answer) === 1 ? "Doğru" : "Yanlış")}</span>`);
                }
                _push2(`</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="whitespace-pre-wrap text-sm text-foreground"${_scopeId}>${ssrInterpolate((_d2 = answer.question) == null ? void 0 : _d2.question_text)}</p>`);
              if (getQuestionOptions(answer.question).length > 0) {
                _push2(`<div class="space-y-1.5"${_scopeId}><!--[-->`);
                ssrRenderList(getQuestionOptions(answer.question), (option, optIndex) => {
                  _push2(`<div class="${ssrRenderClass([
                    answer.selected_option_ids && answer.selected_option_ids.includes(option.id) ? "border-primary bg-primary/5" : "border-border bg-background",
                    "flex items-start gap-2 rounded-md border p-2.5 transition-colors"
                  ])}"${_scopeId}><span class="text-sm font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(String.fromCharCode(65 + optIndex))}.</span><span class="flex-1 whitespace-pre-wrap text-sm text-foreground"${_scopeId}>${ssrInterpolate(option.option_text)}</span>`);
                  if (answer.selected_option_ids && answer.selected_option_ids.includes(option.id)) {
                    _push2(`<span class="text-xs font-medium text-primary"${_scopeId}> Seçildi </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else if (answer.answer_text !== null && answer.answer_text !== void 0) {
                _push2(`<div class="flex gap-2"${_scopeId}><div class="${ssrRenderClass([
                  answer.answer_text === "true" || answer.answer_text === true ? "border-primary bg-primary/5" : "border-border bg-background",
                  "flex-1 rounded-md border p-3 transition-colors"
                ])}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><p class="text-sm font-medium text-foreground"${_scopeId}>Doğru</p>`);
                if (answer.answer_text === "true" || answer.answer_text === true) {
                  _push2(`<span class="text-xs text-primary"${_scopeId}> Seçildi </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="${ssrRenderClass([
                  answer.answer_text === "false" || answer.answer_text === false ? "border-primary bg-primary/5" : "border-border bg-background",
                  "flex-1 rounded-md border p-3 transition-colors"
                ])}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><p class="text-sm font-medium text-foreground"${_scopeId}>Yanlış</p>`);
                if (answer.answer_text === "false" || answer.answer_text === false) {
                  _push2(`<span class="text-xs text-primary"${_scopeId}> Seçildi </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_e = answer.question) == null ? void 0 : _e.explanation) {
                _push2(`<details class="rounded-md border border-border bg-background p-3"${_scopeId}><summary class="cursor-pointer text-xs font-medium text-muted-foreground"${_scopeId}>Açıklama</summary><p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground"${_scopeId}>${ssrInterpolate(answer.question.explanation)}</p></details>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></section>`);
            if (!unref(isGuest)) {
              _push2(`<div class="grid gap-2 sm:flex"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/tests/${(_b = unref(result).test) == null ? void 0 : _b.slug}`,
                class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Teste Geri Dön `);
                  } else {
                    return [
                      createTextVNode(" Teste Geri Dön ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: "/tests",
                class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Diğer Testler `);
                  } else {
                    return [
                      createTextVNode(" Diğer Testler ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-5xl space-y-5 px-3 py-4 pb-24 sm:px-4 sm:py-6 lg:pb-10" }, [
                createVNode("section", { class: "rounded-lg border border-border/70 bg-card p-4 sm:p-6" }, [
                  createVNode("div", { class: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between" }, [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Test sonucu"),
                      createVNode("h1", { class: "mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl" }, toDisplayString(((_c = unref(result).test) == null ? void 0 : _c.title) || "Test"), 1),
                      createVNode("div", { class: "mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground" }, [
                        unref(result).completed_at ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(unref(result).completed_at)), 1)) : createCommentVNode("", true),
                        unref(result).time_taken ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(formatTime(unref(result).time_taken)), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-4 rounded-md border border-border bg-background p-3" }, [
                      createVNode("div", { class: "relative h-20 w-20" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-20 w-20 -rotate-90 transform",
                          viewBox: "0 0 128 128"
                        }, [
                          createVNode("circle", {
                            cx: "64",
                            cy: "64",
                            r: "54",
                            stroke: "currentColor",
                            "stroke-width": "8",
                            fill: "none",
                            class: "text-muted"
                          }),
                          createVNode("circle", {
                            cx: "64",
                            cy: "64",
                            r: "54",
                            stroke: "currentColor",
                            "stroke-width": "8",
                            fill: "none",
                            "stroke-dasharray": `${scoreCircumference.value} ${totalCircumference.value}`,
                            class: ["transition-all duration-500", scoreColor.value]
                          }, null, 10, ["stroke-dasharray"])
                        ])),
                        createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center" }, [
                          createVNode("span", {
                            class: ["text-2xl font-semibold", scoreColor.value]
                          }, toDisplayString(scoreValue.value), 3),
                          createVNode("span", { class: "text-[10px] text-muted-foreground" }, "puan")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(scoreLabel.value), 1),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(unref(result).correct_answers || 0) + " doğru, " + toDisplayString(wrongAnswers.value) + " yanlış ", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(resultStats.value, (stat) => {
                      return openBlock(), createBlock("div", {
                        key: stat.label,
                        class: "rounded-md border border-border/70 bg-background p-3"
                      }, [
                        createVNode("p", { class: "text-xl font-semibold text-foreground" }, toDisplayString(stat.value), 1),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(stat.label), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("section", { class: "rounded-lg border border-border/70 bg-card p-4 sm:p-5" }, [
                  createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-base font-semibold text-foreground" }, "Detaylı özet"),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Kısa, okunabilir ve paylaşılabilir bir sonuç metni üretir.")
                    ]),
                    createVNode("div", { class: "grid gap-2 sm:flex sm:items-center" }, [
                      createVNode("button", {
                        onClick: generateDetailedSummary,
                        class: "inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                      }, " Detaylı Özet Çıkar "),
                      detailedSummary.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: copyDetailedSummary,
                        class: "inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
                      }, toDisplayString(detailedSummaryCopyText.value), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  detailedSummary.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 rounded-md border border-border bg-background p-4"
                  }, [
                    createVNode("pre", { class: "whitespace-pre-wrap break-words text-sm leading-6 text-foreground" }, toDisplayString(detailedSummary.value), 1)
                  ])) : createCommentVNode("", true)
                ]),
                unref(isGuest) ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "rounded-lg border border-border/70 bg-card p-4 sm:p-5"
                }, [
                  createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" }, [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("h2", { class: "text-base font-semibold text-foreground" }, "Paylaş"),
                      createVNode("p", {
                        id: "shareMessage",
                        class: "mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground"
                      }, toDisplayString(shareMessage.value), 1)
                    ]),
                    createVNode("div", { class: "grid shrink-0 gap-2 sm:min-w-36" }, [
                      createVNode("button", {
                        onClick: copyToClipboard,
                        class: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      }, toDisplayString(copyButtonText.value), 1),
                      canShare.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: shareResult,
                        class: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      }, " Paylaş ")) : createCommentVNode("", true)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("section", { class: "space-y-3" }, [
                  createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Sorular ve Cevaplar"),
                    createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(resultAnswers.value.length) + " soru", 1)
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(resultAnswers.value, (answer, index) => {
                      var _a2, _b2, _c2, _d2, _e;
                      return openBlock(), createBlock("div", {
                        key: answer.id || index,
                        class: "space-y-3 rounded-lg border border-border/70 bg-card p-4"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                            createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Soru " + toDisplayString(index + 1), 1),
                            answer.is_correct ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
                            }, " Doğru ")) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"
                            }, " Yanlış "))
                          ]),
                          !answer.is_correct ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-md bg-green-50 px-3 py-2 dark:bg-green-950/60"
                          }, [
                            createVNode("div", { class: "sm:text-right" }, [
                              createVNode("p", { class: "mb-0.5 text-xs text-green-700/80 dark:text-green-300/80" }, "Doğru cevap"),
                              createVNode("p", { class: "text-sm font-semibold text-green-700 dark:text-green-400" }, [
                                getQuestionOptions(answer.question).length > 0 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(getQuestionOptions(answer.question).filter((opt) => opt.is_correct).map((opt) => opt.option_text).join(", ")), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(((_a2 = answer.question) == null ? void 0 : _a2.correct_answer) === "true" || ((_b2 = answer.question) == null ? void 0 : _b2.correct_answer) === true || ((_c2 = answer.question) == null ? void 0 : _c2.correct_answer) === 1 ? "Doğru" : "Yanlış"), 1))
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("p", { class: "whitespace-pre-wrap text-sm text-foreground" }, toDisplayString((_d2 = answer.question) == null ? void 0 : _d2.question_text), 1),
                        getQuestionOptions(answer.question).length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-1.5"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(getQuestionOptions(answer.question), (option, optIndex) => {
                            return openBlock(), createBlock("div", {
                              key: option.id,
                              class: [
                                "flex items-start gap-2 rounded-md border p-2.5 transition-colors",
                                answer.selected_option_ids && answer.selected_option_ids.includes(option.id) ? "border-primary bg-primary/5" : "border-border bg-background"
                              ]
                            }, [
                              createVNode("span", { class: "text-sm font-medium text-muted-foreground" }, toDisplayString(String.fromCharCode(65 + optIndex)) + ".", 1),
                              createVNode("span", { class: "flex-1 whitespace-pre-wrap text-sm text-foreground" }, toDisplayString(option.option_text), 1),
                              answer.selected_option_ids && answer.selected_option_ids.includes(option.id) ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs font-medium text-primary"
                              }, " Seçildi ")) : createCommentVNode("", true)
                            ], 2);
                          }), 128))
                        ])) : answer.answer_text !== null && answer.answer_text !== void 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex gap-2"
                        }, [
                          createVNode("div", {
                            class: [
                              "flex-1 rounded-md border p-3 transition-colors",
                              answer.answer_text === "true" || answer.answer_text === true ? "border-primary bg-primary/5" : "border-border bg-background"
                            ]
                          }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("p", { class: "text-sm font-medium text-foreground" }, "Doğru"),
                              answer.answer_text === "true" || answer.answer_text === true ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs text-primary"
                              }, " Seçildi ")) : createCommentVNode("", true)
                            ])
                          ], 2),
                          createVNode("div", {
                            class: [
                              "flex-1 rounded-md border p-3 transition-colors",
                              answer.answer_text === "false" || answer.answer_text === false ? "border-primary bg-primary/5" : "border-border bg-background"
                            ]
                          }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("p", { class: "text-sm font-medium text-foreground" }, "Yanlış"),
                              answer.answer_text === "false" || answer.answer_text === false ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs text-primary"
                              }, " Seçildi ")) : createCommentVNode("", true)
                            ])
                          ], 2)
                        ])) : createCommentVNode("", true),
                        ((_e = answer.question) == null ? void 0 : _e.explanation) ? (openBlock(), createBlock("details", {
                          key: 2,
                          class: "rounded-md border border-border bg-background p-3"
                        }, [
                          createVNode("summary", { class: "cursor-pointer text-xs font-medium text-muted-foreground" }, "Açıklama"),
                          createVNode("p", { class: "mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground" }, toDisplayString(answer.question.explanation), 1)
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ]),
                !unref(isGuest) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "grid gap-2 sm:flex"
                }, [
                  createVNode(unref(Link), {
                    href: `/tests/${(_d = unref(result).test) == null ? void 0 : _d.slug}`,
                    class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Teste Geri Dön ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: "/tests",
                    class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Diğer Testler ")
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Result/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
