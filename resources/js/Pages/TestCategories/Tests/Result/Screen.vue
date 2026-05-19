<template>
  <CheckScreen infoClass="test-result-screen">
    <div class="mx-auto max-w-5xl space-y-5 px-3 py-4 pb-24 sm:px-4 sm:py-6 lg:pb-10">
      <section class="rounded-lg border border-border/70 bg-card p-4 sm:p-6">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div class="min-w-0">
            <p class="text-xs font-medium text-muted-foreground">Test sonucu</p>
            <h1 class="mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {{ result.test?.title || 'Test' }}
            </h1>
            <div class="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span v-if="result.completed_at">{{ formatDate(result.completed_at) }}</span>
              <span v-if="result.time_taken">{{ formatTime(result.time_taken) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 rounded-md border border-border bg-background p-3">
            <div class="relative h-20 w-20">
              <svg class="h-20 w-20 -rotate-90 transform" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="54" stroke="currentColor" stroke-width="8" fill="none" class="text-muted" />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="none"
                  :stroke-dasharray="`${scoreCircumference} ${totalCircumference}`"
                  class="transition-all duration-500"
                  :class="scoreColor"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-semibold" :class="scoreColor">{{ scoreValue }}</span>
                <span class="text-[10px] text-muted-foreground">puan</span>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-foreground">{{ scoreLabel }}</p>
              <p class="mt-1 text-xs text-muted-foreground">
                {{ result.correct_answers || 0 }} doğru, {{ wrongAnswers }} yanlış
              </p>
            </div>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div
            v-for="stat in resultStats"
            :key="stat.label"
            class="rounded-md border border-border/70 bg-background p-3"
          >
            <p class="text-xl font-semibold text-foreground">{{ stat.value }}</p>
            <p class="mt-1 text-xs text-muted-foreground">{{ stat.label }}</p>
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-border/70 bg-card p-4 sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-base font-semibold text-foreground">Detaylı özet</h2>
            <p class="mt-1 text-sm text-muted-foreground">Kısa, okunabilir ve paylaşılabilir bir sonuç metni üretir.</p>
          </div>
          <div class="grid gap-2 sm:flex sm:items-center">
            <button
              @click="generateDetailedSummary"
              class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Detaylı Özet Çıkar
            </button>
            <button
              v-if="detailedSummary"
              @click="copyDetailedSummary"
              class="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
            >
              {{ detailedSummaryCopyText }}
            </button>
          </div>
        </div>

        <div v-if="detailedSummary" class="mt-4 rounded-md border border-border bg-background p-4">
          <pre class="whitespace-pre-wrap break-words text-sm leading-6 text-foreground">{{ detailedSummary }}</pre>
        </div>
      </section>

      <section v-if="isGuest" class="rounded-lg border border-border/70 bg-card p-4 sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <h2 class="text-base font-semibold text-foreground">Paylaş</h2>
            <p id="shareMessage" class="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
              {{ shareMessage }}
            </p>
          </div>
          <div class="grid shrink-0 gap-2 sm:min-w-36">
            <button
              @click="copyToClipboard"
              class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {{ copyButtonText }}
            </button>
            <button
              v-if="canShare"
              @click="shareResult"
              class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Paylaş
            </button>
          </div>
        </div>
      </section>

      <section class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-lg font-semibold text-foreground">Sorular ve Cevaplar</h2>
          <span class="text-xs text-muted-foreground">{{ resultAnswers.length }} soru</span>
        </div>
        <div class="space-y-3">
          <div
            v-for="(answer, index) in resultAnswers"
            :key="answer.id || index"
            class="space-y-3 rounded-lg border border-border/70 bg-card p-4"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-medium text-muted-foreground">Soru {{ index + 1 }}</span>
                <span
                  v-if="answer.is_correct"
                  class="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
                >
                  Doğru
                </span>
                <span
                  v-else
                  class="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"
                >
                  Yanlış
                </span>
              </div>

              <div v-if="!answer.is_correct" class="rounded-md bg-green-50 px-3 py-2 dark:bg-green-950/60">
                <div class="sm:text-right">
                  <p class="mb-0.5 text-xs text-green-700/80 dark:text-green-300/80">Doğru cevap</p>
                  <p class="text-sm font-semibold text-green-700 dark:text-green-400">
                    <span v-if="getQuestionOptions(answer.question).length > 0">
                      {{
                        getQuestionOptions(answer.question)
                          .filter((opt) => opt.is_correct)
                          .map((opt) => opt.option_text)
                          .join(', ')
                      }}
                    </span>
                    <span v-else>
                      {{
                        answer.question?.correct_answer === 'true' ||
                        answer.question?.correct_answer === true ||
                        answer.question?.correct_answer === 1
                          ? 'Doğru'
                          : 'Yanlış'
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <p class="whitespace-pre-wrap text-sm text-foreground">
              {{ answer.question?.question_text }}
            </p>

            <!-- Options for Multiple Choice Questions -->
            <div v-if="getQuestionOptions(answer.question).length > 0" class="space-y-1.5">
              <div
                v-for="(option, optIndex) in getQuestionOptions(answer.question)"
                :key="option.id"
                class="flex items-start gap-2 rounded-md border p-2.5 transition-colors"
                :class="
                  answer.selected_option_ids && answer.selected_option_ids.includes(option.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                "
              >
                <span class="text-sm font-medium text-muted-foreground">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <span class="flex-1 whitespace-pre-wrap text-sm text-foreground">{{ option.option_text }}</span>
                <span
                  v-if="answer.selected_option_ids && answer.selected_option_ids.includes(option.id)"
                  class="text-xs font-medium text-primary"
                >
                  Seçildi
                </span>
              </div>
            </div>

            <!-- True/False Answer Display -->
            <div v-else-if="answer.answer_text !== null && answer.answer_text !== undefined" class="flex gap-2">
              <div
                class="flex-1 rounded-md border p-3 transition-colors"
                :class="
                  answer.answer_text === 'true' || answer.answer_text === true
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                "
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-foreground">Doğru</p>
                  <span
                    v-if="answer.answer_text === 'true' || answer.answer_text === true"
                    class="text-xs text-primary"
                  >
                    Seçildi
                  </span>
                </div>
              </div>
              <div
                class="flex-1 rounded-md border p-3 transition-colors"
                :class="
                  answer.answer_text === 'false' || answer.answer_text === false
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                "
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-foreground">Yanlış</p>
                  <span
                    v-if="answer.answer_text === 'false' || answer.answer_text === false"
                    class="text-xs text-primary"
                  >
                    Seçildi
                  </span>
                </div>
              </div>
            </div>

            <details v-if="answer.question?.explanation" class="rounded-md border border-border bg-background p-3">
              <summary class="cursor-pointer text-xs font-medium text-muted-foreground">Açıklama</summary>
              <p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground">
                {{ answer.question.explanation }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- Actions (for logged in users) -->
      <div v-if="!isGuest" class="grid gap-2 sm:flex">
        <Link
          :href="`/tests/${result.test?.slug}`"
          class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Teste Geri Dön
        </Link>
        <Link
          href="/tests"
          class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Diğer Testler
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const result = props.result || {};
const isGuest = props.isGuest || false;
const copyButtonText = ref('Mesajı Kopyala');
const detailedSummary = ref('');
const detailedSummaryCopyText = ref('Özeti Kopyala');

const scoreValue = computed(() => Math.round(result.score || 0));
const wrongAnswers = computed(() => Math.max((result.total_questions || 0) - (result.correct_answers || 0), 0));
const resultStats = computed(() => [
  { label: 'Doğru', value: result.correct_answers || 0 },
  { label: 'Yanlış', value: wrongAnswers.value },
  { label: 'Toplam', value: result.total_questions || 0 },
  { label: 'Başarı', value: `%${scoreValue.value}` },
]);

const scoreLabel = computed(() => {
  if (scoreValue.value >= 80) return 'Güçlü sonuç';
  if (scoreValue.value >= 60) return 'Geliştirilebilir sonuç';
  return 'Tekrar gerektiren sonuç';
});

// Handle different result structures for logged in vs guest
const resultAnswers = computed(() => {
  if (isGuest && result.answers) {
    // For guests, group answers by question_id since multiple options can be selected
    const groupedAnswers = {};
    result.answers.forEach((answer) => {
      const questionId = answer.question.id;
      if (!groupedAnswers[questionId]) {
        groupedAnswers[questionId] = {
          id: `guest-answer-${questionId}`,
          question: answer.question,
          selected_option_ids: [],
          is_correct: answer.is_correct,
          answer_text: answer.answer_text,
        };
      }
      if (answer.option_id) {
        groupedAnswers[questionId].selected_option_ids.push(answer.option_id);
      }
    });
    return Object.values(groupedAnswers);
  }

  // For logged in users, group answers by question_id
  if (result.answers) {
    const groupedAnswers = {};
    result.answers.forEach((answer) => {
      const questionId = answer.question?.id || answer.question_id;
      if (!groupedAnswers[questionId]) {
        groupedAnswers[questionId] = {
          id: answer.id,
          question: answer.question,
          selected_option_ids: [],
          is_correct: answer.is_correct,
          answer_text: answer.answer_text,
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

// Score color based on percentage
const scoreColor = computed(() => {
  const score = result.score || 0;
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
});

// Circle progress
const totalCircumference = computed(() => {
  return 2 * Math.PI * 54; // radius = 54
});

const scoreCircumference = computed(() => {
  const score = result.score || 0;
  return (score / 100) * totalCircumference.value;
});

// Get question options (assuming question has options relation)
const getQuestionOptions = (question) => {
  if (!question || !question.options) return [];
  return question.options.sort((a, b) => (a.order || 0) - (b.order || 0));
};

// Format time
const formatTime = (seconds) => {
  if (!seconds) return '';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes > 0) {
    return `${minutes} dakika ${secs} saniye`;
  }
  return `${secs} saniye`;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Check if Web Share API is available
const canShare = computed(() => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
});

// Share message
const shareMessage = computed(() => {
  const testTitle = result.test?.title || 'Test';
  const participantName = result.participant_name || 'Ben';
  const score = Math.round(result.score || 0);
  const totalQuestions = result.total_questions || 0;
  const testSlug = result.test?.slug;

  if (!testSlug) {
    return '';
  }

  const testUrl = window.location.origin + `/tests/${testSlug}/take`;

  return `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin? ${testUrl}`;
});

// Copy to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareMessage.value);
    copyButtonText.value = 'Kopyalandı!';
    setTimeout(() => {
      copyButtonText.value = 'Mesajı Kopyala';
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = shareMessage.value;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      copyButtonText.value = 'Kopyalandı!';
      setTimeout(() => {
        copyButtonText.value = 'Mesajı Kopyala';
      }, 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
    document.body.removeChild(textArea);
  }
};

// Share using Web Share API
const shareResult = async () => {
  const testTitle = result.test?.title || 'Test';
  const participantName = result.participant_name || 'Ben';
  const score = Math.round(result.score || 0);
  const totalQuestions = result.total_questions || 0;
  const testSlug = result.test?.slug;

  if (!testSlug) {
    return;
  }

  const testUrl = window.location.origin + `/tests/${testSlug}/take`;

  const shareData = {
    title: `Test Sonucu: ${testTitle}`,
    text: `${participantName}, Checkupcodes'taki "${testTitle}" testinden ${totalQuestions} soruluk sınavda ${score} puan aldı. Sen de dener misin?`,
    url: testUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    }
  } catch (err) {
    // User cancelled or error occurred
    if (err.name !== 'AbortError') {
      console.error('Paylaşım hatası:', err);
    }
  }
};

// Generate detailed summary
const generateDetailedSummary = () => {
  const testTitle = result.test?.title || 'Test';
  const participantName = result.participant_name || 'Katılımcı';
  const score = scoreValue.value;
  const correctAnswers = result.correct_answers || 0;
  const totalQuestions = result.total_questions || 0;
  const wrongAnswerCount = wrongAnswers.value;
  const timeTaken = result.time_taken ? formatTime(result.time_taken) : 'Belirtilmemiş';
  const completedAt = result.completed_at ? formatDate(result.completed_at) : 'Belirtilmemiş';
  const wrongAnsweredQuestions = resultAnswers.value.filter((answer) => !answer.is_correct);

  let summary = `${testTitle} - Sonuç Özeti\n\n`;
  summary += `Katılımcı: ${participantName}\n`;
  summary += `Puan: ${score}/100\n`;
  summary += `Sonuç: ${correctAnswers}/${totalQuestions} doğru, ${wrongAnswerCount} yanlış\n`;
  summary += `Süre: ${timeTaken}\n`;
  summary += `Tarih: ${completedAt}\n\n`;

  if (score >= 80) {
    summary += `Genel değerlendirme: Konuya hakimiyet güçlü görünüyor. Yanlış veya boş kalan sorular kısa tekrar için yeterli olabilir.\n\n`;
  } else if (score >= 60) {
    summary += `Genel değerlendirme: Temel bilgi var, ancak bazı başlıklar tekrar edilmeli. Özellikle yanlış yapılan sorular üzerinden ilerlemek faydalı olur.\n\n`;
  } else {
    summary += `Genel değerlendirme: Konu tekrarına ihtiyaç var. Önce yanlış yapılan soruların açıklamalarını, ardından temel kavramları yeniden gözden geçirmek iyi olur.\n\n`;
  }

  summary += `Soru Notları\n`;
  resultAnswers.value.forEach((answer, index) => {
    const questionNumber = index + 1;
    const questionText = answer.question?.question_text || 'Soru metni bulunamadı';
    const isCorrect = answer.is_correct;
    const explanation = answer.question?.explanation || '';
    const options = getQuestionOptions(answer.question);
    const questionType = answer.question?.question_type || 'multiple_choice';

    summary += `\n${questionNumber}. ${isCorrect ? 'Doğru' : 'Yanlış'} - ${questionText}\n`;

    if (questionType === 'true_false' || (options.length === 0 && answer.answer_text !== null)) {
      const userAnswer = answer.answer_text === 'true' || answer.answer_text === true ? 'Doğru' : 'Yanlış';
      const correctAnswer =
        answer.question?.correct_answer === 'true' ||
        answer.question?.correct_answer === true ||
        answer.question?.correct_answer === 1
          ? 'Doğru'
          : 'Yanlış';

      summary += `Verilen cevap: ${userAnswer}\n`;
      if (!isCorrect) summary += `Doğru cevap: ${correctAnswer}\n`;
    } else {
      const correctOptions = options.filter((opt) => opt.is_correct);
      const selectedOptions = options.filter(
        (opt) => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id)
      );

      summary += `Verilen cevap: ${selectedOptions.map((opt) => opt.option_text).join(', ') || 'Cevap verilmedi'}\n`;
      if (!isCorrect) summary += `Doğru cevap: ${correctOptions.map((opt) => opt.option_text).join(', ')}\n`;
    }

    if (explanation) {
      summary += `Açıklama: ${explanation}\n`;
    }
  });

  summary += `\nTekrar önerisi: `;
  summary += wrongAnsweredQuestions.length
    ? `${wrongAnsweredQuestions.length} yanlış soruyu açıklamalarıyla tekrar et ve benzer sorularla pekiştir.`
    : `Tüm sorular doğru. Bilgiyi kalıcı yapmak için testi daha sonra tekrar çöz.`;

  detailedSummary.value = summary;
};

// Copy detailed summary to clipboard
const copyDetailedSummary = async () => {
  try {
    await navigator.clipboard.writeText(detailedSummary.value);
    detailedSummaryCopyText.value = 'Kopyalandı!';
    setTimeout(() => {
      detailedSummaryCopyText.value = 'Özeti Kopyala';
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = detailedSummary.value;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      detailedSummaryCopyText.value = 'Kopyalandı!';
      setTimeout(() => {
        detailedSummaryCopyText.value = 'Özeti Kopyala';
      }, 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
    document.body.removeChild(textArea);
  }
};
</script>
