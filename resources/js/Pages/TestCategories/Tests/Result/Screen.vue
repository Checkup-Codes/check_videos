<template>
  <CheckScreen>
    <div class="mx-auto max-w-4xl space-y-6 p-6">
      <!-- Result Summary -->
      <div class="space-y-4 rounded-lg border border-border bg-card p-6">
        <div class="text-center">
          <h1 class="mb-2 text-3xl font-bold text-foreground">Test Sonucu</h1>
          <p class="text-muted-foreground">{{ result.test?.title }}</p>
        </div>

        <!-- Score Circle -->
        <div class="flex justify-center">
          <div class="relative h-32 w-32">
            <svg class="h-32 w-32 -rotate-90 transform">
              <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none" class="text-muted" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                stroke-width="8"
                fill="none"
                :stroke-dasharray="`${scoreCircumference} ${totalCircumference}`"
                class="text-primary transition-all duration-500"
                :class="scoreColor"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold" :class="scoreColor">{{ Math.round(result.score) }}</span>
              <span class="text-xs text-muted-foreground">puan</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-lg border border-border bg-background p-4 text-center">
            <div class="text-2xl font-bold text-foreground">{{ result.correct_answers }}</div>
            <div class="text-sm text-muted-foreground">Doğru</div>
          </div>
          <div class="rounded-lg border border-border bg-background p-4 text-center">
            <div class="text-2xl font-bold text-foreground">
              {{ result.total_questions - result.correct_answers }}
            </div>
            <div class="text-sm text-muted-foreground">Yanlış</div>
          </div>
          <div class="rounded-lg border border-border bg-background p-4 text-center">
            <div class="text-2xl font-bold text-foreground">{{ result.total_questions }}</div>
            <div class="text-sm text-muted-foreground">Toplam</div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div v-if="result.time_taken" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ formatTime(result.time_taken) }}</span>
          </div>
          <div v-if="result.completed_at" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{{ formatDate(result.completed_at) }}</span>
          </div>
        </div>

        <!-- Share Section (for guests) -->
        <div v-if="isGuest" class="border-t border-border pt-4">
          <h3 class="mb-4 text-lg font-semibold text-foreground">Sonucunu Paylaş</h3>
          <div class="space-y-4">
            <div class="rounded-md border border-input bg-background p-4">
              <p class="mb-2 text-sm text-muted-foreground">Paylaşılabilir mesaj:</p>
              <p class="whitespace-pre-wrap font-medium text-foreground" id="shareMessage">{{ shareMessage }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="copyToClipboard"
                class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {{ copyButtonText }}
              </button>
              <button
                v-if="canShare"
                @click="shareResult"
                class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Questions Review -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-foreground">Sorular ve Cevaplar</h2>
        <div class="space-y-6">
          <div
            v-for="(answer, index) in resultAnswers"
            :key="answer.id || index"
            class="space-y-4 rounded-lg border border-border bg-card p-6"
            :class="{
              'border-green-500 bg-green-50 dark:bg-green-950': answer.is_correct,
              'border-red-500 bg-red-50 dark:bg-red-950': !answer.is_correct,
            }"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center gap-2">
                  <span
                    class="rounded-md px-2 py-1 text-sm font-semibold"
                    :class="answer.is_correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
                  >
                    Soru {{ index + 1 }}
                  </span>
                  <span
                    v-if="answer.is_correct"
                    class="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Doğru
                  </span>
                  <span v-else class="flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Yanlış
                  </span>
                </div>
                <p class="whitespace-pre-wrap text-lg font-medium text-foreground">
                  {{ answer.question?.question_text }}
                </p>
              </div>
            </div>

            <!-- Options for Multiple Choice Questions -->
            <div v-if="getQuestionOptions(answer.question).length > 0" class="space-y-2">
              <div
                v-for="(option, optIndex) in getQuestionOptions(answer.question)"
                :key="option.id"
                class="flex items-start gap-3 rounded-lg border p-3"
                :class="getOptionClass(option, answer)"
              >
                <span class="font-medium text-muted-foreground">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <span class="flex-1 whitespace-pre-wrap text-foreground">{{ option.option_text }}</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="option.is_correct"
                    class="rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white"
                  >
                    Doğru Cevap
                  </span>
                  <span
                    v-if="answer.selected_option_ids && answer.selected_option_ids.includes(option.id)"
                    class="rounded-md px-2 py-1 text-xs font-medium text-white"
                    :class="option.is_correct ? 'bg-green-600' : 'bg-red-500'"
                  >
                    Sizin Seçiminiz
                  </span>
                </div>
              </div>
            </div>

            <!-- True/False Answer Display -->
            <div v-else-if="answer.answer_text !== null && answer.answer_text !== undefined" class="space-y-2">
              <div class="rounded-lg border p-4" :class="answer.is_correct ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-muted-foreground mb-1">Sizin Cevabınız:</p>
                    <p class="text-lg font-semibold" :class="answer.is_correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
                      {{ answer.answer_text === 'true' || answer.answer_text === true ? 'Doğru' : 'Yanlış' }}
                    </p>
                  </div>
                  <div v-if="!answer.is_correct">
                    <p class="text-sm text-muted-foreground mb-1">Doğru Cevap:</p>
                    <p class="text-lg font-semibold text-green-700 dark:text-green-300">
                      {{ answer.question?.correct_answer === 'true' || answer.question?.correct_answer === true || answer.question?.correct_answer === 1 ? 'Doğru' : 'Yanlış' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Explanation -->
            <div
              v-if="answer.question?.explanation"
              class="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950"
            >
              <div class="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="text-sm font-medium text-blue-900 dark:text-blue-100">Açıklama:</p>
                  <p class="mt-1 whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200">
                    {{ answer.question.explanation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Summary Section -->
      <div class="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 class="text-xl font-semibold text-foreground">Detaylı Özet</h2>
        <p class="text-sm text-muted-foreground">
          Test sonuçlarınızın detaylı özetini oluşturun ve paylaşın.
        </p>
        <div class="flex gap-2">
          <button
            @click="generateDetailedSummary"
            class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Detaylı Özet Çıkar
          </button>
          <button
            v-if="detailedSummary"
            @click="copyDetailedSummary"
            class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {{ detailedSummaryCopyText }}
          </button>
        </div>
        <div
          v-if="detailedSummary"
          class="mt-4 max-h-96 overflow-y-auto rounded-md border border-input bg-background p-4"
        >
          <pre class="whitespace-pre-wrap text-sm text-foreground">{{ detailedSummary }}</pre>
        </div>
      </div>

      <!-- Actions (for logged in users) -->
      <div v-if="!isGuest" class="flex gap-4">
        <Link
          :href="`/tests/${result.test?.slug}`"
          class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Teste Geri Dön
        </Link>
        <Link
          href="/tests"
          class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
  return 2 * Math.PI * 56; // radius = 56
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

// Get option class based on correctness and selection
const getOptionClass = (option, answer) => {
  const isSelected = answer.selected_option_ids && answer.selected_option_ids.includes(option.id);
  const isCorrect = option.is_correct;
  
  // If option is correct and selected - green
  if (isCorrect && isSelected) {
    return 'border-green-500 bg-green-100 dark:bg-green-900';
  }
  
  // If option is correct but not selected - light green (show what should have been selected)
  if (isCorrect && !isSelected) {
    return 'border-green-300 bg-green-50 dark:bg-green-950';
  }
  
  // If option is incorrect but selected - red
  if (!isCorrect && isSelected) {
    return 'border-red-500 bg-red-100 dark:bg-red-900';
  }
  
  // Default - not selected and not correct
  return 'border-border bg-background';
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
  const score = Math.round(result.score || 0);
  const correctAnswers = result.correct_answers || 0;
  const totalQuestions = result.total_questions || 0;
  const wrongAnswers = totalQuestions - correctAnswers;
  const timeTaken = result.time_taken ? formatTime(result.time_taken) : 'Belirtilmemiş';
  const completedAt = result.completed_at ? formatDate(result.completed_at) : 'Belirtilmemiş';

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

  // Performance evaluation
  if (score >= 80) {
    summary += `🎉 DEĞERLENDİRME: Mükemmel! Çok başarılı bir performans sergiledınız.\n`;
  } else if (score >= 60) {
    summary += `👍 DEĞERLENDİRME: İyi! Başarılı bir performans, ancak geliştirilecek alanlar var.\n`;
  } else if (score >= 40) {
    summary += `📚 DEĞERLENDİRME: Orta seviye. Konuları tekrar gözden geçirmeniz önerilir.\n`;
  } else {
    summary += `💪 DEĞERLENDİRME: Geliştirilmeli. Konuları detaylı çalışmanız gerekiyor.\n`;
  }

  summary += `\n═══════════════════════════════════════════════════════════
SORU DETAYLARI
═══════════════════════════════════════════════════════════\n\n`;

  // Add each question detail
  resultAnswers.value.forEach((answer, index) => {
    const questionNumber = index + 1;
    const questionText = answer.question?.question_text || 'Soru metni bulunamadı';
    const isCorrect = answer.is_correct;
    const explanation = answer.question?.explanation || '';
    const options = getQuestionOptions(answer.question);
    const questionType = answer.question?.question_type || 'multiple_choice';
    
    // Determine question type and format accordingly
    if (questionType === 'true_false' || (options.length === 0 && answer.answer_text !== null)) {
      // True/False question
      const userAnswer = answer.answer_text === 'true' || answer.answer_text === true ? 'Doğru' : 'Yanlış';
      const correctAnswer = answer.question?.correct_answer === 'true' || answer.question?.correct_answer === true || answer.question?.correct_answer === 1 ? 'Doğru' : 'Yanlış';
      
      summary += `SORU ${questionNumber} (Doğru/Yanlış):\n`;
      summary += `${questionText}\n\n`;
      summary += `Sizin Cevabınız: ${userAnswer}\n`;
      summary += `Doğru Cevap: ${correctAnswer}\n`;
      summary += `Sonuç: ${isCorrect ? '✅ DOĞRU' : '❌ YANLIŞ'}\n`;
    } else {
      // Multiple choice question (single or multiple correct answers)
      const correctOptions = options.filter(opt => opt.is_correct);
      const selectedOptions = options.filter(opt => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id));
      const isMultipleChoice = correctOptions.length > 1;

      summary += `SORU ${questionNumber}${isMultipleChoice ? ' (Çoktan Seçmeli - Birden Fazla Doğru Cevap)' : ' (Çoktan Seçmeli)'}:\n`;
      summary += `${questionText}\n\n`;

      // Add options
      options.forEach((option, optIndex) => {
        const optionLetter = String.fromCharCode(65 + optIndex);
        const optionText = option.option_text;
        const isCorrectOption = option.is_correct;
        const isSelectedOption = answer.selected_option_ids && answer.selected_option_ids.includes(option.id);

        let prefix = `${optionLetter}) `;
        
        if (isCorrectOption && isSelectedOption) {
          prefix = `✅ ${optionLetter}) `;
          summary += `${prefix}${optionText} [DOĞRU CEVAP - SİZİN SEÇİMİNİZ]\n`;
        } else if (isCorrectOption) {
          prefix = `✅ ${optionLetter}) `;
          summary += `${prefix}${optionText} [DOĞRU CEVAP]\n`;
        } else if (isSelectedOption) {
          prefix = `❌ ${optionLetter}) `;
          summary += `${prefix}${optionText} [SİZİN SEÇİMİNİZ - YANLIŞ]\n`;
        } else {
          summary += `${prefix}${optionText}\n`;
        }
      });

      summary += `\n`;
      
      // Show detailed result for multiple choice
      if (isMultipleChoice) {
        const correctlySelected = selectedOptions.filter(opt => opt.is_correct).length;
        const incorrectlySelected = selectedOptions.filter(opt => !opt.is_correct).length;
        const missedCorrect = correctOptions.filter(opt => !answer.selected_option_ids || !answer.selected_option_ids.includes(opt.id)).length;
        
        summary += `Sonuç: ${isCorrect ? '✅ DOĞRU' : '❌ YANLIŞ'}\n`;
        summary += `Detay: ${correctlySelected}/${correctOptions.length} doğru seçenek işaretlendi`;
        if (incorrectlySelected > 0) {
          summary += `, ${incorrectlySelected} yanlış seçenek işaretlendi`;
        }
        if (missedCorrect > 0) {
          summary += `, ${missedCorrect} doğru seçenek kaçırıldı`;
        }
        summary += `\n`;
      } else {
        summary += `Sonuç: ${isCorrect ? '✅ DOĞRU' : '❌ YANLIŞ'}\n`;
      }
    }

    if (explanation) {
      summary += `\n💡 Açıklama: ${explanation}\n`;
    }

    summary += `\n─────────────────────────────────────────────────────────\n\n`;
  });

  summary += `═══════════════════════════════════════════════════════════
YANLIŞ CEVAPLANAN SORULAR
═══════════════════════════════════════════════════════════\n\n`;

  const wrongAnsweredQuestions = resultAnswers.value.filter((answer) => !answer.is_correct);

  if (wrongAnsweredQuestions.length === 0) {
    summary += `🎉 Tebrikler! Tüm soruları doğru cevapladınız.\n\n`;
  } else {
    wrongAnsweredQuestions.forEach((answer, index) => {
      const originalIndex = resultAnswers.value.indexOf(answer) + 1;
      const questionText = answer.question?.question_text || 'Soru metni bulunamadı';
      const options = getQuestionOptions(answer.question);
      const questionType = answer.question?.question_type || 'multiple_choice';

      summary += `${index + 1}. Soru ${originalIndex}`;
      
      if (questionType === 'true_false' || (options.length === 0 && answer.answer_text !== null)) {
        // True/False question
        const userAnswer = answer.answer_text === 'true' || answer.answer_text === true ? 'Doğru' : 'Yanlış';
        const correctAnswer = answer.question?.correct_answer === 'true' || answer.question?.correct_answer === true || answer.question?.correct_answer === 1 ? 'Doğru' : 'Yanlış';
        
        summary += ` (Doğru/Yanlış):\n`;
        summary += `${questionText}\n\n`;
        summary += `Sizin Cevabınız: ${userAnswer}\n`;
        summary += `Doğru Cevap: ${correctAnswer}\n`;
      } else {
        // Multiple choice question
        const correctOptions = options.filter((opt) => opt.is_correct);
        const selectedOptions = options.filter(
          (opt) => answer.selected_option_ids && answer.selected_option_ids.includes(opt.id)
        );
        const isMultipleChoice = correctOptions.length > 1;

        summary += `${isMultipleChoice ? ' (Çoktan Seçmeli)' : ''}:\n`;
        summary += `${questionText}\n\n`;
        summary += `Sizin Seçimleriniz: ${selectedOptions.map((opt) => opt.option_text).join(', ') || 'Cevap verilmedi'}\n`;
        
        if (isMultipleChoice) {
          summary += `Doğru Cevaplar: ${correctOptions.map((opt) => opt.option_text).join(', ')}\n`;
          
          // Show what went wrong
          const correctlySelected = selectedOptions.filter(opt => opt.is_correct);
          const incorrectlySelected = selectedOptions.filter(opt => !opt.is_correct);
          const missedCorrect = correctOptions.filter(opt => !answer.selected_option_ids || !answer.selected_option_ids.includes(opt.id));
          
          if (incorrectlySelected.length > 0) {
            summary += `Yanlış Seçilenler: ${incorrectlySelected.map((opt) => opt.option_text).join(', ')}\n`;
          }
          if (missedCorrect.length > 0) {
            summary += `Kaçırılan Doğru Cevaplar: ${missedCorrect.map((opt) => opt.option_text).join(', ')}\n`;
          }
        } else {
          summary += `Doğru Cevap: ${correctOptions[0]?.option_text || 'Belirtilmemiş'}\n`;
        }
      }

      if (answer.question?.explanation) {
        summary += `Açıklama: ${answer.question.explanation}\n`;
      }

      summary += `\n`;
    });
  }

  summary += `═══════════════════════════════════════════════════════════
ÖNERİLER
═══════════════════════════════════════════════════════════\n\n`;

  if (wrongAnswers > 0) {
    summary += `• Yanlış cevapladığınız ${wrongAnswers} soruyu tekrar gözden geçirin.\n`;
    summary += `• Açıklamaları dikkatlice okuyarak konuları pekiştirin.\n`;
  }

  if (score < 80) {
    summary += `• Test konularını tekrar çalışmanız önerilir.\n`;
    summary += `• Benzer testleri çözerek pratik yapabilirsiniz.\n`;
  }

  summary += `• Güçlü yönlerinizi koruyun ve zayıf yönlerinizi geliştirin.\n`;

  summary += `\n═══════════════════════════════════════════════════════════\n`;
  summary += `Bu rapor Checkupcodes tarafından otomatik olarak oluşturulmuştur.\n`;
  summary += `${window.location.origin}\n`;
  summary += `═══════════════════════════════════════════════════════════\n`;

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
