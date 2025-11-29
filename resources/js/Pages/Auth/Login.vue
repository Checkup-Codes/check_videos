<script setup lang="ts">
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
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

// Eye tracking logic
const leftEye = ref<SVGCircleElement | null>(null);
const rightEye = ref<SVGCircleElement | null>(null);
const eyeRadius = 7;
const eyeCenterY = 32;
const eyeLeftX = 32;
const eyeRightX = 64;
const passwordFocused = ref(false);

function moveEyes(e: MouseEvent) {
  const svg = document.getElementById('tom-face');
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  [leftEye.value, rightEye.value].forEach((eye, i) => {
    if (!eye) return;
    const cx = i === 0 ? eyeLeftX : eyeRightX;
    const dx = mouseX - cx;
    const dy = mouseY - eyeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 8;
    const ratio = dist > maxDist ? maxDist / dist : 1;
    eye.setAttribute('cx', (cx + dx * ratio * 0.2).toString());
    eye.setAttribute('cy', (eyeCenterY + dy * ratio * 0.2).toString());
  });
}

onMounted(() => {
  // Prevent body scrolling on login page
  document.body.style.overflow = 'hidden';

  window.addEventListener('mousemove', moveEyes);
});

onBeforeUnmount(() => {
  // Restore body scrolling when leaving login page
  document.body.style.overflow = '';

  window.removeEventListener('mousemove', moveEyes);
});
</script>

<template>
  <GuestLayout>
    <Head title="Giriş Yap" />
    
    <div class="w-full max-w-md space-y-6">
      <!-- Tom Fun Header -->
      <div class="mb-8 flex select-none flex-col items-center">
        <svg id="tom-face" width="100" height="70" viewBox="0 0 100 70" class="mb-2">
          <!-- Cat head -->
          <ellipse
            cx="48"
            cy="40"
            rx="38"
            ry="28"
            :fill="'hsl(var(--muted))'"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="2"
          />
          <!-- Left ear -->
          <polygon
            points="10,30 28,10 36,32"
            :fill="'hsl(var(--muted))'"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="2"
          />
          <!-- Right ear -->
          <polygon
            points="86,30 68,10 60,32"
            :fill="'hsl(var(--muted))'"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="2"
          />
          <!-- Left eye white -->
          <ellipse
            :cx="eyeLeftX"
            :cy="eyeCenterY"
            rx="12"
            ry="14"
            fill="hsl(var(--background))"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="1.5"
          />
          <!-- Right eye white -->
          <ellipse
            :cx="eyeRightX"
            :cy="eyeCenterY"
            rx="12"
            ry="14"
            fill="hsl(var(--background))"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="1.5"
          />
          <!-- Left pupil -->
          <circle
            v-if="!passwordFocused"
            ref="leftEye"
            :cx="eyeLeftX"
            :cy="eyeCenterY"
            :r="eyeRadius"
            :fill="'hsl(var(--foreground))'"
          />
          <!-- Right pupil -->
          <circle
            v-if="!passwordFocused"
            ref="rightEye"
            :cx="eyeRightX"
            :cy="eyeCenterY"
            :r="eyeRadius"
            :fill="'hsl(var(--foreground))'"
          />
          <!-- Eyelids when password focused -->
          <rect
            v-if="passwordFocused"
            :x="eyeLeftX - 12"
            :y="eyeCenterY - 14"
            width="24"
            height="28"
            rx="12"
            :fill="'hsl(var(--muted))'"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="1.5"
          />
          <rect
            v-if="passwordFocused"
            :x="eyeRightX - 12"
            :y="eyeCenterY - 14"
            width="24"
            height="28"
            rx="12"
            :fill="'hsl(var(--muted))'"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="1.5"
          />
          <!-- Nose -->
          <ellipse
            cx="48"
            cy="48"
            rx="6"
            ry="4"
            fill="hsl(var(--primary))"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="1.5"
          />
          <!-- Smile -->
          <path
            d="M40 56 Q48 62 56 56"
            :stroke="'hsl(var(--foreground))'"
            stroke-width="2"
            fill="none"
          />
        </svg>
        <h1 class="text-2xl font-semibold text-foreground">Giriş Yap</h1>
        <p class="mt-1 text-sm text-muted-foreground">Hesabınıza giriş yapın</p>
      </div>

      <!-- Status Message -->
      <div
        v-if="status"
        class="rounded-md border border-primary/50 bg-primary/10 px-4 py-3 text-sm text-primary"
      >
        {{ status }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="submit" class="space-y-4">
        <!-- Email Input -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            autofocus
            autocomplete="username"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{
              'border-destructive focus-visible:ring-destructive': form.errors.email,
            }"
            placeholder="ornek@email.com"
          />
          <InputError v-if="form.errors.email" class="mt-1" :message="form.errors.email" />
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-foreground">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            required
            autocomplete="current-password"
            @focus="passwordFocused = true"
            @blur="passwordFocused = false"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{
              'border-destructive focus-visible:ring-destructive': form.errors.password,
            }"
            placeholder="••••••••"
          />
          <InputError v-if="form.errors.password" class="mt-1" :message="form.errors.password" />
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex cursor-pointer items-center gap-2">
            <Checkbox name="remember" v-model:checked="form.remember" />
            <span class="text-sm text-foreground">Beni hatırla</span>
          </label>
          <Link
            v-if="canResetPassword"
            :href="route('password.request')"
            class="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Şifremi unuttum
          </Link>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :disabled="form.processing"
        >
          <svg
            v-if="form.processing"
            class="mr-2 h-4 w-4 animate-spin"
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
          {{ form.processing ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>
    </div>
  </GuestLayout>
</template>
