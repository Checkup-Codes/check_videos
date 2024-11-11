<template>
  <div class="flex lg:hidden">
    <Link :href="url" class="flex items-center p-2 text-black hover:text-gray-700">
      <GoBackSvg />
      Geri
    </Link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Link } from '@inertiajs/vue3';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
