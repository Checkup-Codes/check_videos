<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';

const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);
const passwordConfirmationInput = ref<HTMLInputElement | null>(null);

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

// Field refs for scroll to error
const currentPasswordRef = ref<HTMLElement | null>(null);
const passwordRef = ref<HTMLElement | null>(null);
const passwordConfirmationRef = ref<HTMLElement | null>(null);

// Frontend validation errors
const errors = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
});

// Validate form
const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });
  
  let hasErrors = false;

  if (!form.current_password || form.current_password.trim() === '') {
    errors.value.current_password = 'Mevcut şifre zorunludur.';
    hasErrors = true;
  }

  if (!form.password || form.password.trim() === '') {
    errors.value.password = 'Yeni şifre zorunludur.';
    hasErrors = true;
  } else if (form.password.length < 8) {
    errors.value.password = 'Şifre en az 8 karakter olmalıdır.';
    hasErrors = true;
  }

  if (!form.password_confirmation || form.password_confirmation.trim() === '') {
    errors.value.password_confirmation = 'Şifre onayı zorunludur.';
    hasErrors = true;
  } else if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = 'Şifreler eşleşmiyor.';
    hasErrors = true;
  }

  if (hasErrors) {
    scrollToError();
  }

  return hasErrors;
};

// Scroll to first error
const scrollToError = () => {
  nextTick(() => {
    const errorFields = [
      { ref: currentPasswordRef, error: errors.value.current_password },
      { ref: passwordRef, error: errors.value.password },
      { ref: passwordConfirmationRef, error: errors.value.password_confirmation },
    ];

    for (const field of errorFields) {
      if (field.error && field.ref.value) {
        field.ref.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nextTick(() => {
          const inputElement = field.ref.value?.querySelector('input');
          if (inputElement) {
            inputElement.focus();
          }
        });
        break;
      }
    }
  });
};

// Submit form
const updatePassword = () => {
  const hasErrors = validateForm();
  
  if (!hasErrors) {
    form.put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
      },
      onError: (serverErrors) => {
        Object.assign(errors.value, serverErrors);
        scrollToError();
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordInput.value?.focus();
        }
        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordInput.value?.focus();
        }
      },
    });
  }
};

// Listen for sidebar form actions
let sidebarSubmitHandler: (() => void) | null = null;

onMounted(() => {
  sidebarSubmitHandler = () => {
    updatePassword();
  };
  window.addEventListener('sidebarFormSubmit', sidebarSubmitHandler);
});

onUnmounted(() => {
  if (sidebarSubmitHandler) {
    window.removeEventListener('sidebarFormSubmit', sidebarSubmitHandler);
  }
});

// Watch form processing state
watch(
  () => form.processing,
  (processing) => {
    window.dispatchEvent(new CustomEvent('formProcessingState', { detail: { processing } }));
  }
);
</script>

<template>
  <div class="space-y-4">
    <div class="border-t border-border pt-6">
      <h2 class="mb-4 text-sm font-semibold text-foreground">Şifre Güncelle</h2>
      <form @submit.prevent="updatePassword" class="space-y-4">
      <div class="grid grid-cols-1 gap-4">
        <div ref="currentPasswordRef">
          <label for="current_password" class="mb-1 block text-sm font-medium text-foreground">Mevcut Şifre</label>
          <input
            id="current_password"
            ref="currentPasswordInput"
            v-model="form.current_password"
            type="password"
            autocomplete="current-password"
            placeholder="Mevcut şifrenizi girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.current_password || form.errors.current_password }"
          />
          <p v-if="errors.current_password || form.errors.current_password" class="mt-1 text-xs text-destructive">
            {{ errors.current_password || form.errors.current_password }}
          </p>
        </div>

        <div ref="passwordRef">
          <label for="password" class="mb-1 block text-sm font-medium text-foreground">Yeni Şifre</label>
          <input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            placeholder="Yeni şifrenizi girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.password || form.errors.password }"
          />
          <p v-if="errors.password || form.errors.password" class="mt-1 text-xs text-destructive">
            {{ errors.password || form.errors.password }}
          </p>
        </div>

        <div ref="passwordConfirmationRef">
          <label for="password_confirmation" class="mb-1 block text-sm font-medium text-foreground">Şifre Onayı</label>
          <input
            id="password_confirmation"
            ref="passwordConfirmationInput"
            v-model="form.password_confirmation"
            type="password"
            autocomplete="new-password"
            placeholder="Yeni şifrenizi tekrar girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.password_confirmation || form.errors.password_confirmation }"
          />
          <p v-if="errors.password_confirmation || form.errors.password_confirmation" class="mt-1 text-xs text-destructive">
            {{ errors.password_confirmation || form.errors.password_confirmation }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 pt-2">
        <Transition
          enter-active-class="transition ease-in-out"
          enter-from-class="opacity-0"
          leave-active-class="transition ease-in-out"
          leave-to-class="opacity-0"
        >
          <p v-if="form.recentlySuccessful" class="text-sm text-muted-foreground">Kaydedildi.</p>
        </Transition>
        <button
          type="submit"
          :disabled="form.processing"
          class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <svg
            v-if="form.processing"
            class="h-4 w-4 animate-spin"
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
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
        </button>
      </div>
      </form>
    </div>
  </div>
</template>
