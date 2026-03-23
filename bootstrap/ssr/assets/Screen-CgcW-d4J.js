import { ref, computed, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
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
      return 2 * Math.PI * 56;
    });
    const scoreCircumference = computed(() => {
      const score = result.score || 0;
      return score / 100 * totalCircumference.value;
    });
    const getQuestionOptions = (question) => {
      if (!question || !question.options) return [];
      return question.options.sort((a, b) => (a.order || 0) - (b.order || 0));
    };
    const getOptionClass = (option, answer) => {
      const isSelected = answer.selected_option_ids && answer.selected_option_ids.includes(option.id);
      const isCorrect = option.is_correct;
      if (isCorrect && isSelected) {
        return "border-green-500 bg-green-100 dark:bg-green-900";
      }
      if (isCorrect && !isSelected) {
        return "border-green-300 bg-green-50 dark:bg-green-950";
      }
      if (!isCorrect && isSelected) {
        return "border-red-500 bg-red-100 dark:bg-red-900";
      }
      return "border-border bg-background";
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
      const score = Math.round(result.score || 0);
      const correctAnswers = result.correct_answers || 0;
      const totalQuestions = result.total_questions || 0;
      const wrongAnswers = totalQuestions - correctAnswers;
      const timeTaken = result.time_taken ? formatTime(result.time_taken) : "Belirtilmemiş";
      const completedAt = result.completed_at ? formatDate(result.completed_at) : "Belirtilmemiş";
      let summary = `═══════════════════════════════════════════════════════════
TEST SONUÇ RAPORU
═══════════════════════════════════════════════════════════

📋 TEST BİLGİLERİ
─────────────────────────────────────────────────────────
Test Adı: ${testTitle}
Katılımcı: ${participantName}
Tamamlanma Tarihi: ${completedAt}
Süre: ${timeTaken}

📊 GENEL SONUÇ
─────────────────────────────────────────────────────────
Toplam Puan: ${score}/100
Doğru Cevap: ${correctAnswers}
Yanlış Cevap: ${wrongAnswers}
Toplam Soru: ${totalQuestions}
Başarı Oranı: %${score}

`;
      if (score >= 80) {
        summary += `🎉 DEĞERLENDİRME: Mükemmel! Çok başarılı bir performans sergiledınız.
`;
      } else if (score >= 60) {
        summary += `👍 DEĞERLENDİRME: İyi! Başarılı bir performans, ancak geliştirilecek alanlar var.
`;
      } else if (score >= 40) {
        summary += `📚 DEĞERLENDİRME: Orta seviye. Konuları tekrar gözden geçirmeniz önerilir.
`;
      } else {
        summary += `💪 DEĞERLENDİRME: Geliştirilmeli. Konuları detaylı çalışmanız gerekiyor.
`;
      }
      summary += `
═══════════════════════════════════════════════════════════
SORU DETAYLARI
═══════════════════════════════════════════════════════════

`;
      resultAnswers.value.forEach((answer, index) => {
        var _a2, _b, _c, _d, _e, _f;
        const questionNumber = index + 1;
        const questionText = ((_a2 = answer.question) == null ? void 0 : _a2.question_text) || "Soru metni bulunamadı";
        const isCorrect = answer.is_correct;
        const explanation = ((_b = answer.question) == null ? void 0 : _b.explanation) || "";
        const options = getQuestionOptions(answer.question);
        const questionType = ((_c = answer.question) == null ? void 0 : _c.question_type) || "multiple_choice";
        if (questionType === "true_false" || options.length === 0 && answer.answer_text !== null) {
          const userAnswer = answer.answer_text === "true" || answer.answer_text === true ? "Doğru" : "Yanlış";
          const correctAnswer = ((_d = answer.question) == null ? void 0 : _d.correct_answer) === "true" || ((_e = answer.question) == null ? void 0 : _e.correct_answer) === true || ((_f = answer.question) == null ? void 0 : _f.correct_answer) === 1 ? "Doğru" : "Yanlış";
          summary += `SORU ${questionNumber} (Doğru/Yanlış):
`;
          summary += `${questionText}

`;
          summary += `Sizin Cevabınız: ${userAnswer}
`;
          summary += `Doğru Cevap: ${correctAnswer}
`;
          summary += `Sonuç: ${isCorrect ? "✅ DOĞRU" : "❌ YANLIŞ"}
`;
        } else {
          const correctOptions = options.filter((opt) => opt.is_correct);
          const selectedOptions = options.filter((opt) => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id));
          const isMultipleChoice = correctOptions.length > 1;
          summary += `SORU ${questionNumber}${isMultipleChoice ? " (Çoktan Seçmeli - Birden Fazla Doğru Cevap)" : " (Çoktan Seçmeli)"}:
`;
          summary += `${questionText}

`;
          options.forEach((option, optIndex) => {
            const optionLetter = String.fromCharCode(65 + optIndex);
            const optionText = option.option_text;
            const isCorrectOption = option.is_correct;
            const isSelectedOption = answer.selected_option_ids && answer.selected_option_ids.includes(option.id);
            let prefix = `${optionLetter}) `;
            if (isCorrectOption && isSelectedOption) {
              prefix = `✅ ${optionLetter}) `;
              summary += `${prefix}${optionText} [DOĞRU CEVAP - SİZİN SEÇİMİNİZ]
`;
            } else if (isCorrectOption) {
              prefix = `✅ ${optionLetter}) `;
              summary += `${prefix}${optionText} [DOĞRU CEVAP]
`;
            } else if (isSelectedOption) {
              prefix = `❌ ${optionLetter}) `;
              summary += `${prefix}${optionText} [SİZİN SEÇİMİNİZ - YANLIŞ]
`;
            } else {
              summary += `${prefix}${optionText}
`;
            }
          });
          summary += `
`;
          if (isMultipleChoice) {
            const correctlySelected = selectedOptions.filter((opt) => opt.is_correct).length;
            const incorrectlySelected = selectedOptions.filter((opt) => !opt.is_correct).length;
            const missedCorrect = correctOptions.filter((opt) => !answer.selected_option_ids || !answer.selected_option_ids.includes(opt.id)).length;
            summary += `Sonuç: ${isCorrect ? "✅ DOĞRU" : "❌ YANLIŞ"}
`;
            summary += `Detay: ${correctlySelected}/${correctOptions.length} doğru seçenek işaretlendi`;
            if (incorrectlySelected > 0) {
              summary += `, ${incorrectlySelected} yanlış seçenek işaretlendi`;
            }
            if (missedCorrect > 0) {
              summary += `, ${missedCorrect} doğru seçenek kaçırıldı`;
            }
            summary += `
`;
          } else {
            summary += `Sonuç: ${isCorrect ? "✅ DOĞRU" : "❌ YANLIŞ"}
`;
          }
        }
        if (explanation) {
          summary += `
💡 Açıklama: ${explanation}
`;
        }
        summary += `
─────────────────────────────────────────────────────────

`;
      });
      summary += `═══════════════════════════════════════════════════════════
YANLIŞ CEVAPLANAN SORULAR
═══════════════════════════════════════════════════════════

`;
      const wrongAnsweredQuestions = resultAnswers.value.filter((answer) => !answer.is_correct);
      if (wrongAnsweredQuestions.length === 0) {
        summary += `🎉 Tebrikler! Tüm soruları doğru cevapladınız.

`;
      } else {
        wrongAnsweredQuestions.forEach((answer, index) => {
          var _a2, _b, _c, _d, _e, _f, _g;
          const originalIndex = resultAnswers.value.indexOf(answer) + 1;
          const questionText = ((_a2 = answer.question) == null ? void 0 : _a2.question_text) || "Soru metni bulunamadı";
          const options = getQuestionOptions(answer.question);
          const questionType = ((_b = answer.question) == null ? void 0 : _b.question_type) || "multiple_choice";
          summary += `${index + 1}. Soru ${originalIndex}`;
          if (questionType === "true_false" || options.length === 0 && answer.answer_text !== null) {
            const userAnswer = answer.answer_text === "true" || answer.answer_text === true ? "Doğru" : "Yanlış";
            const correctAnswer = ((_c = answer.question) == null ? void 0 : _c.correct_answer) === "true" || ((_d = answer.question) == null ? void 0 : _d.correct_answer) === true || ((_e = answer.question) == null ? void 0 : _e.correct_answer) === 1 ? "Doğru" : "Yanlış";
            summary += ` (Doğru/Yanlış):
`;
            summary += `${questionText}

`;
            summary += `Sizin Cevabınız: ${userAnswer}
`;
            summary += `Doğru Cevap: ${correctAnswer}
`;
          } else {
            const correctOptions = options.filter((opt) => opt.is_correct);
            const selectedOptions = options.filter(
              (opt) => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id)
            );
            const isMultipleChoice = correctOptions.length > 1;
            summary += `${isMultipleChoice ? " (Çoktan Seçmeli)" : ""}:
`;
            summary += `${questionText}

`;
            summary += `Sizin Seçimleriniz: ${selectedOptions.map((opt) => opt.option_text).join(", ") || "Cevap verilmedi"}
`;
            if (isMultipleChoice) {
              summary += `Doğru Cevaplar: ${correctOptions.map((opt) => opt.option_text).join(", ")}
`;
              selectedOptions.filter((opt) => opt.is_correct);
              const incorrectlySelected = selectedOptions.filter((opt) => !opt.is_correct);
              const missedCorrect = correctOptions.filter((opt) => !answer.selected_option_ids || !answer.selected_option_ids.includes(opt.id));
              if (incorrectlySelected.length > 0) {
                summary += `Yanlış Seçilenler: ${incorrectlySelected.map((opt) => opt.option_text).join(", ")}
`;
              }
              if (missedCorrect.length > 0) {
                summary += `Kaçırılan Doğru Cevaplar: ${missedCorrect.map((opt) => opt.option_text).join(", ")}
`;
              }
            } else {
              summary += `Doğru Cevap: ${((_f = correctOptions[0]) == null ? void 0 : _f.option_text) || "Belirtilmemiş"}
`;
            }
          }
          if ((_g = answer.question) == null ? void 0 : _g.explanation) {
            summary += `Açıklama: ${answer.question.explanation}
`;
          }
          summary += `
`;
        });
      }
      summary += `═══════════════════════════════════════════════════════════
ÖNERİLER
═══════════════════════════════════════════════════════════

`;
      if (wrongAnswers > 0) {
        summary += `• Yanlış cevapladığınız ${wrongAnswers} soruyu tekrar gözden geçirin.
`;
        summary += `• Açıklamaları dikkatlice okuyarak konuları pekiştirin.
`;
      }
      if (score < 80) {
        summary += `• Test konularını tekrar çalışmanız önerilir.
`;
        summary += `• Benzer testleri çözerek pratik yapabilirsiniz.
`;
      }
      summary += `• Güçlü yönlerinizi koruyun ve zayıf yönlerinizi geliştirin.
`;
      summary += `
═══════════════════════════════════════════════════════════
`;
      summary += `Bu rapor Checkupcodes tarafından otomatik olarak oluşturulmuştur.
`;
      summary += `${window.location.origin}
`;
      summary += `═══════════════════════════════════════════════════════════
`;
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
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl space-y-6 p-6"${_scopeId}><div class="space-y-4 rounded-lg border border-border bg-card p-6"${_scopeId}><div class="text-center"${_scopeId}><h1 class="mb-2 text-3xl font-bold text-foreground"${_scopeId}>Test Sonucu</h1><p class="text-muted-foreground"${_scopeId}>${ssrInterpolate((_a = unref(result).test) == null ? void 0 : _a.title)}</p></div><div class="flex justify-center"${_scopeId}><div class="relative h-32 w-32"${_scopeId}><svg class="h-32 w-32 -rotate-90 transform"${_scopeId}><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none" class="text-muted"${_scopeId}></circle><circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none"${ssrRenderAttr("stroke-dasharray", `${scoreCircumference.value} ${totalCircumference.value}`)} class="${ssrRenderClass([scoreColor.value, "text-primary transition-all duration-500"])}"${_scopeId}></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center"${_scopeId}><span class="${ssrRenderClass([scoreColor.value, "text-3xl font-bold"])}"${_scopeId}>${ssrInterpolate(Math.round(unref(result).score))}</span><span class="text-xs text-muted-foreground"${_scopeId}>puan</span></div></div></div><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).correct_answers)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Doğru</div></div><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).total_questions - unref(result).correct_answers)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Yanlış</div></div><div class="rounded-lg border border-border bg-background p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(result).total_questions)}</div><div class="text-sm text-muted-foreground"${_scopeId}>Toplam</div></div></div><div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"${_scopeId}>`);
            if (unref(result).time_taken) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(formatTime(unref(result).time_taken))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(result).completed_at) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(formatDate(unref(result).completed_at))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(isGuest)) {
              _push2(`<div class="border-t border-border pt-4"${_scopeId}><h3 class="mb-4 text-lg font-semibold text-foreground"${_scopeId}>Sonucunu Paylaş</h3><div class="space-y-4"${_scopeId}><div class="rounded-md border border-input bg-background p-4"${_scopeId}><p class="mb-2 text-sm text-muted-foreground"${_scopeId}>Paylaşılabilir mesaj:</p><p class="whitespace-pre-wrap font-medium text-foreground" id="shareMessage"${_scopeId}>${ssrInterpolate(shareMessage.value)}</p></div><div class="flex gap-2"${_scopeId}><button class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(copyButtonText.value)}</button>`);
              if (canShare.value) {
                _push2(`<button class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg> Paylaş </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><h2 class="text-xl font-semibold text-foreground"${_scopeId}>Sorular ve Cevaplar</h2><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(resultAnswers.value, (answer, index) => {
              var _a2, _b2, _c2, _d2, _e;
              _push2(`<div class="${ssrRenderClass([{
                "border-green-500 bg-green-50 dark:bg-green-950": answer.is_correct,
                "border-red-500 bg-red-50 dark:bg-red-950": !answer.is_correct
              }, "space-y-4 rounded-lg border border-border bg-card p-6"])}"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="mb-2 flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass([answer.is_correct ? "bg-green-500 text-white" : "bg-red-500 text-white", "rounded-md px-2 py-1 text-sm font-semibold"])}"${_scopeId}> Soru ${ssrInterpolate(index + 1)}</span>`);
              if (answer.is_correct) {
                _push2(`<span class="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Doğru </span>`);
              } else {
                _push2(`<span class="flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg> Yanlış </span>`);
              }
              _push2(`</div><p class="whitespace-pre-wrap text-lg font-medium text-foreground"${_scopeId}>${ssrInterpolate((_a2 = answer.question) == null ? void 0 : _a2.question_text)}</p></div></div>`);
              if (getQuestionOptions(answer.question).length > 0) {
                _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(getQuestionOptions(answer.question), (option, optIndex) => {
                  _push2(`<div class="${ssrRenderClass([getOptionClass(option, answer), "flex items-start gap-3 rounded-lg border p-3"])}"${_scopeId}><span class="font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(String.fromCharCode(65 + optIndex))}.</span><span class="flex-1 whitespace-pre-wrap text-foreground"${_scopeId}>${ssrInterpolate(option.option_text)}</span><div class="flex flex-wrap gap-2"${_scopeId}>`);
                  if (option.is_correct) {
                    _push2(`<span class="rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white"${_scopeId}> Doğru Cevap </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (answer.selected_option_ids && answer.selected_option_ids.includes(option.id)) {
                    _push2(`<span class="${ssrRenderClass([option.is_correct ? "bg-green-600" : "bg-red-500", "rounded-md px-2 py-1 text-xs font-medium text-white"])}"${_scopeId}> Sizin Seçiminiz </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else if (answer.answer_text !== null && answer.answer_text !== void 0) {
                _push2(`<div class="space-y-2"${_scopeId}><div class="${ssrRenderClass([answer.is_correct ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950", "rounded-lg border p-4"])}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Sizin Cevabınız:</p><p class="${ssrRenderClass([answer.is_correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300", "text-lg font-semibold"])}"${_scopeId}>${ssrInterpolate(answer.answer_text === "true" || answer.answer_text === true ? "Doğru" : "Yanlış")}</p></div>`);
                if (!answer.is_correct) {
                  _push2(`<div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Doğru Cevap:</p><p class="text-lg font-semibold text-green-700 dark:text-green-300"${_scopeId}>${ssrInterpolate(((_b2 = answer.question) == null ? void 0 : _b2.correct_answer) === "true" || ((_c2 = answer.question) == null ? void 0 : _c2.correct_answer) === true || ((_d2 = answer.question) == null ? void 0 : _d2.correct_answer) === 1 ? "Doğru" : "Yanlış")}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_e = answer.question) == null ? void 0 : _e.explanation) {
                _push2(`<div class="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950"${_scopeId}><div class="flex items-start gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><div${_scopeId}><p class="text-sm font-medium text-blue-900 dark:text-blue-100"${_scopeId}>Açıklama:</p><p class="mt-1 whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200"${_scopeId}>${ssrInterpolate(answer.question.explanation)}</p></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div><div class="space-y-4 rounded-lg border border-border bg-card p-6"${_scopeId}><h2 class="text-xl font-semibold text-foreground"${_scopeId}>Detaylı Özet</h2><p class="text-sm text-muted-foreground"${_scopeId}> Test sonuçlarınızın detaylı özetini oluşturun ve paylaşın. </p><div class="flex gap-2"${_scopeId}><button class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg> Detaylı Özet Çıkar </button>`);
            if (detailedSummary.value) {
              _push2(`<button class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(detailedSummaryCopyText.value)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (detailedSummary.value) {
              _push2(`<div class="mt-4 max-h-96 overflow-y-auto rounded-md border border-input bg-background p-4"${_scopeId}><pre class="whitespace-pre-wrap text-sm text-foreground"${_scopeId}>${ssrInterpolate(detailedSummary.value)}</pre></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (!unref(isGuest)) {
              _push2(`<div class="flex gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/tests/${(_b = unref(result).test) == null ? void 0 : _b.slug}`,
                class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
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
                class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
              createVNode("div", { class: "mx-auto max-w-4xl space-y-6 p-6" }, [
                createVNode("div", { class: "space-y-4 rounded-lg border border-border bg-card p-6" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h1", { class: "mb-2 text-3xl font-bold text-foreground" }, "Test Sonucu"),
                    createVNode("p", { class: "text-muted-foreground" }, toDisplayString((_c = unref(result).test) == null ? void 0 : _c.title), 1)
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "relative h-32 w-32" }, [
                      (openBlock(), createBlock("svg", { class: "h-32 w-32 -rotate-90 transform" }, [
                        createVNode("circle", {
                          cx: "64",
                          cy: "64",
                          r: "56",
                          stroke: "currentColor",
                          "stroke-width": "8",
                          fill: "none",
                          class: "text-muted"
                        }),
                        createVNode("circle", {
                          cx: "64",
                          cy: "64",
                          r: "56",
                          stroke: "currentColor",
                          "stroke-width": "8",
                          fill: "none",
                          "stroke-dasharray": `${scoreCircumference.value} ${totalCircumference.value}`,
                          class: ["text-primary transition-all duration-500", scoreColor.value]
                        }, null, 10, ["stroke-dasharray"])
                      ])),
                      createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center" }, [
                        createVNode("span", {
                          class: ["text-3xl font-bold", scoreColor.value]
                        }, toDisplayString(Math.round(unref(result).score)), 3),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, "puan")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).correct_answers), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Doğru")
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).total_questions - unref(result).correct_answers), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Yanlış")
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-background p-4 text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(result).total_questions), 1),
                      createVNode("div", { class: "text-sm text-muted-foreground" }, "Toplam")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap justify-center gap-4 text-sm text-muted-foreground" }, [
                    unref(result).time_taken ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(formatTime(unref(result).time_taken)), 1)
                    ])) : createCommentVNode("", true),
                    unref(result).completed_at ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-2"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(formatDate(unref(result).completed_at)), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  unref(isGuest) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-t border-border pt-4"
                  }, [
                    createVNode("h3", { class: "mb-4 text-lg font-semibold text-foreground" }, "Sonucunu Paylaş"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "rounded-md border border-input bg-background p-4" }, [
                        createVNode("p", { class: "mb-2 text-sm text-muted-foreground" }, "Paylaşılabilir mesaj:"),
                        createVNode("p", {
                          class: "whitespace-pre-wrap font-medium text-foreground",
                          id: "shareMessage"
                        }, toDisplayString(shareMessage.value), 1)
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("button", {
                          onClick: copyToClipboard,
                          class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(copyButtonText.value), 1)
                        ]),
                        canShare.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: shareResult,
                          class: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            })
                          ])),
                          createTextVNode(" Paylaş ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h2", { class: "text-xl font-semibold text-foreground" }, "Sorular ve Cevaplar"),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(resultAnswers.value, (answer, index) => {
                      var _a2, _b2, _c2, _d2, _e;
                      return openBlock(), createBlock("div", {
                        key: answer.id || index,
                        class: ["space-y-4 rounded-lg border border-border bg-card p-6", {
                          "border-green-500 bg-green-50 dark:bg-green-950": answer.is_correct,
                          "border-red-500 bg-red-50 dark:bg-red-950": !answer.is_correct
                        }]
                      }, [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                              createVNode("span", {
                                class: ["rounded-md px-2 py-1 text-sm font-semibold", answer.is_correct ? "bg-green-500 text-white" : "bg-red-500 text-white"]
                              }, " Soru " + toDisplayString(index + 1), 3),
                              answer.is_correct ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ])),
                                createTextVNode(" Doğru ")
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-4 w-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M6 18L18 6M6 6l12 12"
                                  })
                                ])),
                                createTextVNode(" Yanlış ")
                              ]))
                            ]),
                            createVNode("p", { class: "whitespace-pre-wrap text-lg font-medium text-foreground" }, toDisplayString((_a2 = answer.question) == null ? void 0 : _a2.question_text), 1)
                          ])
                        ]),
                        getQuestionOptions(answer.question).length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(getQuestionOptions(answer.question), (option, optIndex) => {
                            return openBlock(), createBlock("div", {
                              key: option.id,
                              class: ["flex items-start gap-3 rounded-lg border p-3", getOptionClass(option, answer)]
                            }, [
                              createVNode("span", { class: "font-medium text-muted-foreground" }, toDisplayString(String.fromCharCode(65 + optIndex)) + ".", 1),
                              createVNode("span", { class: "flex-1 whitespace-pre-wrap text-foreground" }, toDisplayString(option.option_text), 1),
                              createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                option.is_correct ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white"
                                }, " Doğru Cevap ")) : createCommentVNode("", true),
                                answer.selected_option_ids && answer.selected_option_ids.includes(option.id) ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ["rounded-md px-2 py-1 text-xs font-medium text-white", option.is_correct ? "bg-green-600" : "bg-red-500"]
                                }, " Sizin Seçiminiz ", 2)) : createCommentVNode("", true)
                              ])
                            ], 2);
                          }), 128))
                        ])) : answer.answer_text !== null && answer.answer_text !== void 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode("div", {
                            class: ["rounded-lg border p-4", answer.is_correct ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"]
                          }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Sizin Cevabınız:"),
                                createVNode("p", {
                                  class: ["text-lg font-semibold", answer.is_correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"]
                                }, toDisplayString(answer.answer_text === "true" || answer.answer_text === true ? "Doğru" : "Yanlış"), 3)
                              ]),
                              !answer.is_correct ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Doğru Cevap:"),
                                createVNode("p", { class: "text-lg font-semibold text-green-700 dark:text-green-300" }, toDisplayString(((_b2 = answer.question) == null ? void 0 : _b2.correct_answer) === "true" || ((_c2 = answer.question) == null ? void 0 : _c2.correct_answer) === true || ((_d2 = answer.question) == null ? void 0 : _d2.correct_answer) === 1 ? "Doğru" : "Yanlış"), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ], 2)
                        ])) : createCommentVNode("", true),
                        ((_e = answer.question) == null ? void 0 : _e.explanation) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950"
                        }, [
                          createVNode("div", { class: "flex items-start gap-2" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-medium text-blue-900 dark:text-blue-100" }, "Açıklama:"),
                              createVNode("p", { class: "mt-1 whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200" }, toDisplayString(answer.question.explanation), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ], 2);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "space-y-4 rounded-lg border border-border bg-card p-6" }, [
                  createVNode("h2", { class: "text-xl font-semibold text-foreground" }, "Detaylı Özet"),
                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Test sonuçlarınızın detaylı özetini oluşturun ve paylaşın. "),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("button", {
                      onClick: generateDetailedSummary,
                      class: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])),
                      createTextVNode(" Detaylı Özet Çıkar ")
                    ]),
                    detailedSummary.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: copyDetailedSummary,
                      class: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(detailedSummaryCopyText.value), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  detailedSummary.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 max-h-96 overflow-y-auto rounded-md border border-input bg-background p-4"
                  }, [
                    createVNode("pre", { class: "whitespace-pre-wrap text-sm text-foreground" }, toDisplayString(detailedSummary.value), 1)
                  ])) : createCommentVNode("", true)
                ]),
                !unref(isGuest) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex gap-4"
                }, [
                  createVNode(unref(Link), {
                    href: `/tests/${(_d = unref(result).test) == null ? void 0 : _d.slug}`,
                    class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Teste Geri Dön ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(unref(Link), {
                    href: "/tests",
                    class: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
