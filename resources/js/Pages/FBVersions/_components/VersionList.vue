<template>
  <CheckSubsidebar>
    <div v-for="version in versions" class="border-gray-200" :key="version.id">
      <Link
        :href="`/versions/${version.version}`"
        :class="getLinkClasses(`/versions/${version.version}`)"
        class="block rounded-sm duration-200 ease-in-out"
      >
        <div class="px-3 py-2">
          <div class="text-sm font-semibold">
            {{ version.version }}
          </div>
          <div class="flex items-center">
            <div class="text-sm">
              {{ version.release_date }}
            </div>
          </div>
        </div>
      </Link>
    </div>
    <ThemeCustomizer />
  </CheckSubsidebar>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Modals/CheckSubsidebar.vue';

// Props tanımı
const props = defineProps({
  versions: {
    type: Array,
    required: true,
  },
  currentUrl: {
    type: String,
    required: true,
  },
});

const getLinkClasses = (href) => {
  return props.currentUrl === `${href}`
    ? 'px-4 border-l-4 text-gray-800 border-primary-500 bg-primary-100 shadow-inner hover:bg-primary-100'
    : 'px-4 bg-white text-gray-800';
};
</script>
