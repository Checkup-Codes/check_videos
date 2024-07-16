<template>
  <div class="block pt-3 lg:hidden">
    <button @click="goBack" class="flex items-center p-2 text-black hover:text-gray-700">
      <GoBackSvg />
      Geri
    </button>
  </div>
</template>

<script setup>
import GoBackSvg from '@/Shared/Svg/GoBack.vue';

const goBack = () => {
  window.history.back();
};
</script>
