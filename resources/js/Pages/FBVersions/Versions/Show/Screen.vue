<template>
  <CheckScreen>
    <div class="rounded-lg bg-white p-6 text-gray-800">
      <div class="mb-4 flex items-center justify-between border-b pb-4">
        <h1 class="text-2xl font-medium text-gray-800">{{ version.version }}</h1>
        <Link
          v-if="props.auth.user"
          :href="`/versions/${version.id}/edit`"
          class="text-sm font-medium text-gray-800-light hover:text-gray-800"
        >
          Bu versiyonu düzenle
        </Link>
      </div>
      <p class="text-sm text-gray-800">{{ version.release_date }}</p>

      <div v-if="version.features.length > 0" class="mt-6">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">Özellikler</h2>
        <ul class="space-y-2">
          <li v-for="feature in version.features" :key="feature.id" class="flex items-start">
            <span class="mr-2 text-blue-500">&#8226;</span>
            <div>
              <strong class="font-bold text-gray-800">{{ feature.feature_name }}:</strong>
              <span class="whitespace-pre-line text-gray-800">{{ feature.feature_detail }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="version.bugs.length > 0" class="mt-6">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">Düzeltilen Hatalar</h2>
        <ul class="space-y-2">
          <li v-for="bug in version.bugs" :key="bug.id" class="flex items-start">
            <span class="mr-2 text-red-500">&#8226;</span>
            <div>
              <strong class="text-gray-800">{{ bug.bug_name }}:</strong>
              <span class="text-gray-800">{{ bug.bug_detail }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';

import 'dayjs/locale/tr';

dayjs.locale('tr');

const { props } = usePage();
const version = ref(props.version);
</script>
