<template>
  <div v-if="message" class="fixed right-4 top-4 z-50">
    <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
      <strong class="font-bold">Başarılı! </strong>
      <span class="block sm:inline">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  message: String,
});

const localMessage = ref(props.message);

watchEffect(() => {
  if (localMessage.value) {
    setTimeout(() => {
      localMessage.value = null;
    }, 3000);
  }
});
</script>
