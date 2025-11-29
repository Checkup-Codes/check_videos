<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div v-if="message" class="fixed right-4 top-4 z-50 w-full max-w-sm">
      <div
        class="relative flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 shadow-lg backdrop-blur-sm"
        role="alert"
      >
        <!-- Success Icon -->
        <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <!-- Message -->
        <div class="flex-1">
          <p class="text-sm font-medium text-foreground">{{ message }}</p>
        </div>
        <!-- Close Button -->
        <button
          @click="closeMessage"
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  message: String,
});

const localMessage = ref(props.message);
let timeoutId = null;

const closeMessage = () => {
  localMessage.value = null;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

watchEffect(() => {
  if (localMessage.value) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      localMessage.value = null;
      timeoutId = null;
    }, 5000);
  }
});
</script>
