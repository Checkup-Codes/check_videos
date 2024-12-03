<
<template>
  <Screen>
    <div class="rounded-lg bg-white p-6 shadow-lg">
      <div class="flex justify-between">
        <h1 class="mb-4 text-3xl font-bold">{{ version.version }}</h1>
        <Link v-if="props.auth.user" :href="`/versions/${version.id}/edit`" class="underline"
          >Bu versiyonu düzenler misin</Link
        >
      </div>
      <p class="text-gray-500">{{ formattedDate(version.created_at) }}</p>

      <div v-if="version.features.length > 0" class="mt-6">
        <h2 class="mb-2 text-xl font-semibold">Özellikler:</h2>
        <ul class="list-inside list-disc">
          <li v-for="feature in version.features" :key="feature.id">
            <strong>{{ feature.feature_name }}:</strong> {{ feature.feature_detail }}
          </li>
        </ul>
      </div>

      <div v-if="version.bugs.length > 0" class="mt-6">
        <h2 class="mb-2 text-xl font-semibold">Düzeltilen Hatalar:</h2>
        <ul class="list-inside list-disc">
          <li v-for="bug in version.bugs" :key="bug.id">
            <strong>{{ bug.bug_name }}:</strong> {{ bug.bug_detail }}
          </li>
        </ul>
      </div>
    </div>
  </Screen>
</template>

<script setup>
import { ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import Screen from '@/Components/CekapUI/Modals/CheckScreen.vue';

import 'dayjs/locale/tr';

dayjs.locale('tr');

const { props } = usePage();
const version = ref(props.version);

function formattedDate(date) {
  return dayjs(date).format('D MMMM YYYY, HH:mm');
}
</script>
>
