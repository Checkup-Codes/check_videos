<script setup lang="ts">
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
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
const eyeOffset = 8;
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
  window.addEventListener('mousemove', moveEyes);
});
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveEyes);
});
</script>

<template>
  <GuestLayout>
    <Head title="Log in" />
    <!-- Tom Fun Header -->
    <div class="mb-6 flex select-none flex-col items-center">
      <svg id="tom-face" width="100" height="70" viewBox="0 0 100 70" class="mb-2">
        <!-- Cat head -->
        <ellipse cx="48" cy="40" rx="38" ry="28" fill="#bfc9d1" stroke="#333" stroke-width="2" />
        <!-- Left ear -->
        <polygon points="10,30 28,10 36,32" fill="#bfc9d1" stroke="#333" stroke-width="2" />
        <!-- Right ear -->
        <polygon points="86,30 68,10 60,32" fill="#bfc9d1" stroke="#333" stroke-width="2" />
        <!-- Left eye white -->
        <ellipse :cx="eyeLeftX" :cy="eyeCenterY" rx="12" ry="14" fill="#fff" stroke="#333" stroke-width="1.5" />
        <!-- Right eye white -->
        <ellipse :cx="eyeRightX" :cy="eyeCenterY" rx="12" ry="14" fill="#fff" stroke="#333" stroke-width="1.5" />
        <!-- Left pupil -->
        <circle v-if="!passwordFocused" ref="leftEye" :cx="eyeLeftX" :cy="eyeCenterY" :r="eyeRadius" fill="#222" />
        <!-- Right pupil -->
        <circle v-if="!passwordFocused" ref="rightEye" :cx="eyeRightX" :cy="eyeCenterY" :r="eyeRadius" fill="#222" />
        <!-- Eyelids when password focused -->
        <rect
          v-if="passwordFocused"
          :x="eyeLeftX - 12"
          :y="eyeCenterY - 14"
          width="24"
          height="28"
          rx="12"
          fill="#bfc9d1"
          stroke="#333"
          stroke-width="1.5"
        />
        <rect
          v-if="passwordFocused"
          :x="eyeRightX - 12"
          :y="eyeCenterY - 14"
          width="24"
          height="28"
          rx="12"
          fill="#bfc9d1"
          stroke="#333"
          stroke-width="1.5"
        />
        <!-- Nose -->
        <ellipse cx="48" cy="48" rx="6" ry="4" fill="#e57373" stroke="#333" stroke-width="1.5" />
        <!-- Smile -->
        <path d="M40 56 Q48 62 56 56" stroke="#333" stroke-width="2" fill="none" />
      </svg>
    </div>
    <!-- End Fun Header -->
    <div v-if="status" class="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
      {{ status }}
    </div>
    <form @submit.prevent="submit" class="space-y-6">
      <div>
        <label for="email" class="label">
          <span class="label-text text-base-content">Email</span>
        </label>
        <input
          id="email"
          type="email"
          class="input-bordered input w-full bg-base-100 text-base-content"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />
        <InputError class="mt-2" :message="form.errors.email" />
      </div>
      <div>
        <label for="password" class="label">
          <span class="label-text text-base-content">Password</span>
        </label>
        <input
          id="password"
          type="password"
          class="input-bordered input w-full bg-base-100 text-base-content"
          v-model="form.password"
          required
          autocomplete="current-password"
          @focus="passwordFocused = true"
          @blur="passwordFocused = false"
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>
      <div class="flex items-center justify-between">
        <label class="flex cursor-pointer items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <span class="ml-2 text-sm text-base-content">Remember me</span>
        </label>
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="hover:text-primary-focus text-sm text-primary underline focus:outline-none"
        >
          Forgot your password?
        </Link>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :class="{ 'opacity-50': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </button>
      </div>
    </form>
  </GuestLayout>
</template>
