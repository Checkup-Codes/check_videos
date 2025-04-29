<template>
  <div class="container bg-white px-5 text-gray-800">
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
</template>

<script setup>
const props = defineProps({
  words: Array,
  screen: Object,
});
</script>
