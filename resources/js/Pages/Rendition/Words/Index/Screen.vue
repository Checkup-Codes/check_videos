<template>
  <CheckScreen>
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
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';

const props = defineProps({
  words: Array,
  screen: Object,
});
</script>
