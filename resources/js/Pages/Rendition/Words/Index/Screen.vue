<template>
  <CheckScreen>
    <div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll break-words rounded-lg bg-white lg:p-5">
      <div class="container mx-auto p-4">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th>Kelime</th>
              <th>Türkçe</th>
              <th>İngilizce</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="word in words" :key="word.id">
              <td>{{ word.word }}</td>
              <td>{{ word.meaning }}</td>
              <td>{{ word.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
  words: Array,
  screen: Object,
});

console.log(props);
</script>
