<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="closeModal"
  >
    <div class="w-full max-w-2xl rounded-lg border border-border bg-background shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-border p-6">
        <div>
          <h3 class="text-xl font-semibold text-foreground">AI ile Çizim Oluştur</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Çizmek istediğiniz diyagramı açıklayın, AI sizin için oluştursun
          </p>
        </div>
        <button
          @click="closeModal"
          class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Examples -->
        <div class="mb-4 rounded-lg border border-border bg-muted/50 p-4">
          <p class="mb-2 text-sm font-medium text-foreground">Örnek Açıklamalar:</p>
          <ul class="space-y-1 text-sm text-muted-foreground">
            <li>• "Kullanıcı kayıt sürecini gösteren bir akış diyagramı çiz"</li>
            <li>• "3 kutulu basit bir sistem mimarisi diyagramı: Frontend, Backend, Database"</li>
            <li>• "E-ticaret sipariş sürecini adımlarıyla göster"</li>
          </ul>
        </div>

        <!-- Textarea -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-foreground">
            Çizim Açıklaması
          </label>
          <textarea
            v-model="prompt"
            :disabled="isGenerating"
            rows="6"
            class="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Örnek: Bir kullanıcı giriş yapıyor, sistem kimlik doğrulaması yapıyor, başarılıysa dashboard'a yönlendiriyor, değilse hata mesajı gösteriyor..."
          ></textarea>
          <p class="mt-1 text-xs text-muted-foreground">
            {{ prompt.length }}/2000 karakter (minimum 10)
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/50 dark:text-red-200"
        >
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-4 rounded-lg border border-green-300 bg-green-100 p-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/50 dark:text-green-200"
        >
          {{ successMessage }}
        </div>

        <!-- Loading State -->
        <div
          v-if="isGenerating"
          class="mb-4 rounded-lg border border-blue-300 bg-blue-100 p-4 dark:border-blue-700 dark:bg-blue-900/50"
        >
          <div class="flex items-center gap-3">
            <svg
              class="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                Çizim oluşturuluyor...
              </p>
              <p class="text-xs text-blue-600 dark:text-blue-300">
                Bu işlem 10-30 saniye sürebilir
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2 border-t border-border p-6">
        <button
          @click="closeModal"
          :disabled="isGenerating"
          class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          İptal
        </button>
        <button
          @click="generateDiagram"
          :disabled="isGenerating || prompt.length < 10"
          class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            v-if="!isGenerating"
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {{ isGenerating ? 'Oluşturuluyor...' : 'Çizim Oluştur' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  writeId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close', 'success']);

const prompt = ref('');
const isGenerating = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Reset form when modal opens
watch(() => props.show, (newValue) => {
  if (newValue) {
    prompt.value = '';
    errorMessage.value = '';
    successMessage.value = '';
  }
});

const closeModal = () => {
  if (!isGenerating.value) {
    emit('close');
  }
};

const generateDiagram = async () => {
  if (prompt.value.length < 10) {
    errorMessage.value = 'Lütfen en az 10 karakter uzunluğunda bir açıklama girin.';
    return;
  }

  errorMessage.value = '';
  successMessage.value = '';
  isGenerating.value = true;

  try {
    const response = await axios.post(`/writes/${props.writeId}/generate-diagram`, {
      prompt: prompt.value
    });

    if (response.data.success) {
      successMessage.value = response.data.message;
      
      // Wait a bit to show success message, then close and reload
      setTimeout(() => {
        emit('success');
        emit('close');
        // Reload page to show new diagram
        window.location.reload();
      }, 1500);
    } else {
      errorMessage.value = response.data.error || 'Bir hata oluştu.';
    }
  } catch (error) {
    console.error('Diagram generation error:', error);
    
    if (error.response?.data?.error) {
      errorMessage.value = error.response.data.error;
    } else if (error.response?.status === 401) {
      errorMessage.value = 'Bu işlem için giriş yapmalısınız.';
    } else if (error.response?.status === 422) {
      errorMessage.value = 'Lütfen geçerli bir açıklama girin (10-2000 karakter).';
    } else {
      errorMessage.value = 'Çizim oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.';
    }
  } finally {
    isGenerating.value = false;
  }
};
</script>
