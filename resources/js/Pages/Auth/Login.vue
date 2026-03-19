<script setup lang="ts">
import InputError from '@/Components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

defineProps<{
  canResetPassword?: boolean;
  status?: string;
}>();

const form = useForm({
  email: '',
  password: '',
  remember: false,
});

const submit = () => {
  form.post(route('login'), {
    onFinish: () => {
      form.reset('password');
    },
  });
};

const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <Head title="Giriş Yap" />
  
  <div class="fixed inset-0 flex items-center justify-center overflow-auto bg-gradient-to-br from-background via-background to-muted/20 px-4">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="animate-blob absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/10"></div>
      <div class="animate-blob animation-delay-2000 absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/15 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/8"></div>
      <div class="animate-blob animation-delay-4000 absolute -bottom-20 left-1/2 h-96 w-96 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/5"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] opacity-40"></div>
    </div>

    <!-- Login Card -->
    <div 
      class="relative z-10 my-auto w-full max-w-sm transform transition-all duration-700 ease-out"
      :class="isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'"
    >
      <div class="rounded-3xl border border-border/50 bg-card/95 p-10 shadow-2xl backdrop-blur-xl dark:bg-card/90">
        <!-- Header -->
        <div class="mb-8 text-center">
          <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
            <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="mb-2 text-2xl font-bold text-foreground">Giriş Yap</h1>
          <p class="text-sm text-muted-foreground">Hesabınıza erişin</p>
        </div>

        <!-- Status Message -->
        <div
          v-if="status"
          class="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400"
        >
          {{ status }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="submit" class="space-y-5">
          <!-- Email Input -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              required
              autofocus
              autocomplete="username"
              class="flex h-12 w-full rounded-xl border border-input bg-background/60 px-4 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-background/40"
              :class="{ 'border-destructive focus:ring-destructive/20': form.errors.email }"
              placeholder="ornek@email.com"
            />
            <InputError v-if="form.errors.email" :message="form.errors.email" />
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-foreground">Şifre</label>
            <input
              id="password"
              type="password"
              v-model="form.password"
              required
              autocomplete="current-password"
              class="flex h-12 w-full rounded-xl border border-input bg-background/60 px-4 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-background/40"
              :class="{ 'border-destructive focus:ring-destructive/20': form.errors.password }"
              placeholder="••••••••"
            />
            <InputError v-if="form.errors.password" :message="form.errors.password" />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="group relative mt-6 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/90 font-semibold text-sm text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :disabled="form.processing"
          >
            <span class="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative z-10 flex items-center gap-2">
              <svg
                v-if="form.processing"
                class="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ form.processing ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(30px, 10px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 10s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
