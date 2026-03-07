<script setup lang="ts">
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, onMounted, onBeforeUnmount } from 'vue';

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

// Animation states
const isLoaded = ref(false);
const passwordFocused = ref(false);

// Eye tracking logic
const leftEye = ref<SVGCircleElement | null>(null);
const rightEye = ref<SVGCircleElement | null>(null);
const eyeRadius = 6;
const eyeCenterY = 28;
const eyeLeftX = 35;
const eyeRightX = 65;

function moveEyes(e: MouseEvent) {
  const svg = document.getElementById('cat-face');
  if (!svg || passwordFocused.value) return;
  const rect = svg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  [leftEye.value, rightEye.value].forEach((eye, i) => {
    if (!eye) return;
    const cx = i === 0 ? eyeLeftX : eyeRightX;
    const dx = mouseX - cx;
    const dy = mouseY - eyeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 6;
    const ratio = dist > maxDist ? maxDist / dist : 1;
    eye.setAttribute('cx', (cx + dx * ratio * 0.15).toString());
    eye.setAttribute('cy', (eyeCenterY + dy * ratio * 0.15).toString());
  });
}

onMounted(() => {
  document.body.style.overflow = 'hidden';
  window.addEventListener('mousemove', moveEyes);
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('mousemove', moveEyes);
});
</script>

<template>
  <Head title="Giriş Yap" />
  
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 px-4 pb-8 pt-8 sm:pt-8 lg:pt-5">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="animate-blob absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-primary/10"></div>
      <div class="animate-blob animation-delay-2000 absolute -right-20 top-20 h-96 w-96 rounded-full bg-secondary/20 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-secondary/10"></div>
      <div class="animate-blob animation-delay-4000 absolute -bottom-20 left-1/2 h-96 w-96 rounded-full bg-accent/20 mix-blend-multiply blur-3xl filter dark:mix-blend-screen dark:bg-accent/10"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>

    <!-- Login Card -->
    <div 
      class="relative z-10 mx-auto w-full max-w-md transform transition-all duration-700 ease-out"
      :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="rounded-2xl border border-border/50 bg-card/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-card/90 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <!-- Cat Avatar -->
        <div class="mb-5 flex flex-col items-center">
          <div 
            class="relative mb-3 transform transition-transform duration-500 hover:scale-110"
            :class="isLoaded ? 'scale-100' : 'scale-75'"
          >
            <!-- Glow effect behind cat -->
            <div class="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-2xl"></div>
            
            <svg id="cat-face" width="90" height="75" viewBox="0 0 100 80" class="drop-shadow-2xl">
              <!-- Cat head -->
              <ellipse cx="50" cy="45" rx="35" ry="28" class="fill-muted stroke-primary/30 dark:fill-muted/80 dark:stroke-primary/50" stroke-width="2" />
              <!-- Left ear -->
              <polygon points="18,35 30,8 40,35" class="fill-muted stroke-primary/30 dark:fill-muted/80 dark:stroke-primary/50" stroke-width="2" />
              <polygon points="22,32 30,14 36,32" class="fill-primary/30 dark:fill-primary/40" />
              <!-- Right ear -->
              <polygon points="82,35 70,8 60,35" class="fill-muted stroke-primary/30 dark:fill-muted/80 dark:stroke-primary/50" stroke-width="2" />
              <polygon points="78,32 70,14 64,32" class="fill-primary/30 dark:fill-primary/40" />
              <!-- Left eye white -->
              <ellipse :cx="eyeLeftX" :cy="eyeCenterY" rx="10" ry="12" class="fill-background stroke-foreground/30 dark:fill-background/90" stroke-width="1.5" />
              <!-- Right eye white -->
              <ellipse :cx="eyeRightX" :cy="eyeCenterY" rx="10" ry="12" class="fill-background stroke-foreground/30 dark:fill-background/90" stroke-width="1.5" />
              <!-- Left pupil -->
              <circle
                v-if="!passwordFocused"
                ref="leftEye"
                :cx="eyeLeftX"
                :cy="eyeCenterY"
                :r="eyeRadius"
                class="fill-foreground transition-all duration-100 dark:fill-primary"
              />
              <!-- Right pupil -->
              <circle
                v-if="!passwordFocused"
                ref="rightEye"
                :cx="eyeRightX"
                :cy="eyeCenterY"
                :r="eyeRadius"
                class="fill-foreground transition-all duration-100 dark:fill-primary"
              />
              <!-- Closed eyes when password focused -->
              <g v-if="passwordFocused">
                <path :d="`M${eyeLeftX - 8} ${eyeCenterY} Q${eyeLeftX} ${eyeCenterY + 5} ${eyeLeftX + 8} ${eyeCenterY}`" class="stroke-foreground dark:stroke-primary" stroke-width="2.5" fill="none" />
                <path :d="`M${eyeRightX - 8} ${eyeCenterY} Q${eyeRightX} ${eyeCenterY + 5} ${eyeRightX + 8} ${eyeCenterY}`" class="stroke-foreground dark:stroke-primary" stroke-width="2.5" fill="none" />
              </g>
              <!-- Nose -->
              <ellipse cx="50" cy="48" rx="5" ry="3" class="fill-primary dark:fill-primary/80" />
              <!-- Mouth -->
              <path d="M44 54 Q50 60 56 54" class="stroke-foreground/60 dark:stroke-foreground/70" stroke-width="2" fill="none" />
              <!-- Whiskers -->
              <g class="stroke-foreground/40 dark:stroke-foreground/50" stroke-width="1.5">
                <line x1="20" y1="45" x2="35" y2="48" />
                <line x1="20" y1="50" x2="35" y2="50" />
                <line x1="20" y1="55" x2="35" y2="52" />
                <line x1="80" y1="45" x2="65" y2="48" />
                <line x1="80" y1="50" x2="65" y2="50" />
                <line x1="80" y1="55" x2="65" y2="52" />
              </g>
            </svg>
          </div>
          <h1 
            class="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-2xl font-bold text-transparent transition-all duration-500 delay-100 dark:from-primary dark:to-primary/60"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            Hoş Geldiniz
          </h1>
          <p 
            class="mt-1 text-xs text-muted-foreground transition-all duration-500 delay-200 dark:text-muted-foreground/80"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            Hesabınıza giriş yapın
          </p>
        </div>

        <!-- Status Message -->
        <div
          v-if="status"
          class="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-600 backdrop-blur-sm dark:border-green-500/40 dark:bg-green-500/20 dark:text-green-400"
        >
          {{ status }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="submit" class="space-y-4">
          <!-- Email Input -->
          <div 
            class="space-y-1.5 transition-all duration-500 delay-300"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            <label for="email" class="text-xs font-semibold text-foreground dark:text-foreground/90">Email</label>
            <div class="relative group">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-primary">
                <svg class="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                v-model="form.email"
                required
                autofocus
                autocomplete="username"
                class="flex h-10 w-full rounded-lg border border-input bg-background/60 px-3 py-2 pl-10 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-background/40 dark:hover:bg-background/60 dark:focus:bg-background/80"
                :class="{ 'border-destructive focus:ring-destructive/30 hover:border-destructive': form.errors.email }"
                placeholder="ornek@email.com"
              />
            </div>
            <InputError v-if="form.errors.email" :message="form.errors.email" />
          </div>

          <!-- Password Input -->
          <div 
            class="space-y-1.5 transition-all duration-500 delay-400"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            <label for="password" class="text-xs font-semibold text-foreground dark:text-foreground/90">Şifre</label>
            <div class="relative group">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-primary">
                <svg class="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                v-model="form.password"
                required
                autocomplete="current-password"
                @focus="passwordFocused = true"
                @blur="passwordFocused = false"
                class="flex h-10 w-full rounded-lg border border-input bg-background/60 px-3 py-2 pl-10 text-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-background/40 dark:hover:bg-background/60 dark:focus:bg-background/80"
                :class="{ 'border-destructive focus:ring-destructive/30 hover:border-destructive': form.errors.password }"
                placeholder="••••••••"
              />
            </div>
            <InputError v-if="form.errors.password" :message="form.errors.password" />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div 
            class="flex items-center justify-between pt-1 transition-all duration-500 delay-500"
            :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            <label class="flex cursor-pointer items-center gap-2 group">
              <Checkbox name="remember" v-model:checked="form.remember" />
              <span class="text-xs text-muted-foreground transition-colors group-hover:text-foreground">Beni hatırla</span>
            </label>
            <Link
              v-if="canResetPassword"
              :href="route('password.request')"
              class="text-xs font-semibold text-primary transition-all hover:text-primary/80 hover:underline hover:underline-offset-4"
            >
              Şifremi unuttum
            </Link>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="group relative h-10 w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/90 font-semibold text-sm text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:shadow-primary/20 dark:hover:shadow-primary/40"
            :class="[
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              'transition-all duration-500 delay-600'
            ]"
            :disabled="form.processing"
          >
            <span class="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg
                v-if="form.processing"
                class="h-4 w-4 animate-spin"
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

        <!-- Divider -->
        <div 
          class="my-5 flex items-center gap-4 transition-all duration-500 delay-700"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <span class="text-xs font-medium text-muted-foreground">veya</span>
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        <!-- Register Link -->
        <Link
          href="/join-us"
          class="group flex h-10 w-full items-center justify-center gap-2 rounded-lg border-2 border-border bg-background/60 font-semibold text-sm text-foreground transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:bg-accent hover:text-accent-foreground hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-background/40 dark:hover:bg-accent/80"
          :class="[
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            'transition-all duration-500 delay-800'
          ]"
        >
          <svg class="h-4 w-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Kayıt Ol
        </Link>

        <!-- Back to Home -->
        <div 
          class="mt-4 text-center transition-all duration-500 delay-900"
          :class="isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        >
          <Link href="/" class="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <svg class="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>
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

/* Custom scrollbar for dark mode */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}
</style>
