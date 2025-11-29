<script setup lang="ts">
import Modal from '@/Components/Modal.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);
const passwordRef = ref<HTMLElement | null>(null);

const form = useForm({
  password: '',
});

// Frontend validation errors
const errors = ref({
  password: '',
});

// Validate form
const validateForm = () => {
  errors.value.password = '';
  
  if (!form.password || form.password.trim() === '') {
    errors.value.password = 'Şifre zorunludur.';
    return true;
  }

  return false;
};

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;
  nextTick(() => passwordInput.value?.focus());
};

const deleteUser = () => {
  const hasErrors = validateForm();
  
  if (!hasErrors) {
    form.delete(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: (serverErrors) => {
        Object.assign(errors.value, serverErrors);
        passwordInput.value?.focus();
      },
      onFinish: () => {
        form.reset();
      },
    });
  } else {
    passwordInput.value?.focus();
  }
};

const closeModal = () => {
  confirmingUserDeletion.value = false;
  form.reset();
  errors.value.password = '';
};
</script>

<template>
  <div class="space-y-4">
    <div class="border-t border-border pt-6">
      <h2 class="mb-4 text-sm font-semibold text-foreground">Hesabı Sil</h2>
      <p class="mb-4 text-sm text-muted-foreground">
        Hesabınız silindiğinde, tüm kaynaklarınız ve verileriniz kalıcı olarak silinecektir. Hesabınızı silmeden önce,
        saklamak istediğiniz verileri indirin.
      </p>

    <button
      @click="confirmUserDeletion"
      class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-destructive bg-background px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      Hesabı Sil
    </button>

    <Modal :show="confirmingUserDeletion" @close="closeModal" max-width="md">
      <div class="p-6">
        <h2 class="text-lg font-semibold text-foreground">Hesabınızı silmek istediğinizden emin misiniz?</h2>

        <p class="mt-2 text-sm text-muted-foreground">
          Hesabınız silindiğinde, tüm kaynaklarınız ve verileriniz kalıcı olarak silinecektir. Hesabınızı kalıcı olarak
          silmek istediğinizi onaylamak için şifrenizi girin.
        </p>

        <div ref="passwordRef" class="mt-6">
          <label for="password" class="mb-1 block text-sm font-medium text-foreground">Şifre</label>
          <input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            placeholder="Şifrenizi girin"
            class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.password || form.errors.password }"
            @keyup.enter="deleteUser"
          />
          <p v-if="errors.password || form.errors.password" class="mt-1 text-xs text-destructive">
            {{ errors.password || form.errors.password }}
          </p>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="closeModal"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            İptal
          </button>
          <button
            @click="deleteUser"
            :disabled="form.processing"
            class="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-destructive bg-destructive px-4 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            {{ form.processing ? 'Siliniyor...' : 'Hesabı Sil' }}
          </button>
        </div>
      </div>
    </Modal>
    </div>
  </div>
</template>
