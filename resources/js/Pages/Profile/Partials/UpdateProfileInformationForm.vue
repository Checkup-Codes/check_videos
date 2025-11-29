<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';

defineProps<{
  mustVerifyEmail?: Boolean;
  status?: String;
}>();

const user = usePage().props.auth.user;

const form = useForm({
  name: user.name,
  email: user.email,
});

// Field refs for scroll to error
const nameRef = ref<HTMLElement | null>(null);
const emailRef = ref<HTMLElement | null>(null);

// Frontend validation errors
const errors = ref({
  name: '',
  email: '',
});

// Validate form
const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    (errors.value as Record<string, string>)[key] = '';
  });

  let hasErrors = false;

  if (!form.name || form.name.trim() === '') {
    errors.value.name = 'İsim zorunludur.';
    hasErrors = true;
  }

  if (!form.email || form.email.trim() === '') {
    errors.value.email = 'E-posta zorunludur.';
    hasErrors = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = 'Geçerli bir e-posta adresi girin.';
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
      { ref: nameRef, error: errors.value.name },
      { ref: emailRef, error: errors.value.email },
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
const submitForm = () => {
  const hasErrors = validateForm();

  if (!hasErrors) {
    form.patch(route('profile.update'), {
      onError: (serverErrors) => {
        Object.assign(errors.value, serverErrors);
        scrollToError();
      },
    });
  }
};

// Listen for sidebar form actions
let sidebarSubmitHandler: (() => void) | null = null;

onMounted(() => {
  sidebarSubmitHandler = () => {
    submitForm();
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
      <h2 class="mb-4 text-sm font-semibold text-foreground">Profil Bilgileri</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div ref="nameRef">
            <label for="name" class="mb-1 block text-sm font-medium text-foreground">İsim</label>
            <input
              id="name"
              type="text"
              :value="form.name"
              @input="form.name = ($event.target as HTMLInputElement).value"
              autocomplete="name"
              placeholder="Adınız"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.name || form.errors.name }"
            />
            <p v-if="errors.name || form.errors.name" class="mt-1 text-xs text-destructive">
              {{ errors.name || form.errors.name }}
            </p>
          </div>

          <div ref="emailRef">
            <label for="email" class="mb-1 block text-sm font-medium text-foreground">E-posta</label>
            <input
              id="email"
              type="email"
              :value="form.email"
              @input="form.email = ($event.target as HTMLInputElement).value"
              autocomplete="username"
              placeholder="ornek@email.com"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.email || form.errors.email }"
            />
            <p v-if="errors.email || form.errors.email" class="mt-1 text-xs text-destructive">
              {{ errors.email || form.errors.email }}
            </p>
          </div>
        </div>

        <div
          v-if="mustVerifyEmail && user.email_verified_at === null"
          class="rounded-md border border-border bg-muted/50 p-3"
        >
          <p class="text-sm text-foreground">
            E-posta adresiniz doğrulanmamış.
            <Link
              :href="route('verification.send')"
              method="post"
              as="button"
              class="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Doğrulama e-postasını tekrar gönder.
            </Link>
          </p>
          <div
            v-show="status === 'verification-link-sent'"
            class="mt-2 text-sm font-medium text-green-600 dark:text-green-400"
          >
            Yeni bir doğrulama bağlantısı e-posta adresinize gönderildi.
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
