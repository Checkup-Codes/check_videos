<template>
  <div ref="scrollContainer" class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]">
    <div class="min-h-full">
      <div v-for="version in versions" :key="version.id">
        <Link
          :href="`/versions/${version.version}`"
          :class="getLinkClasses(`/versions/${version.version}`)"
          class="block rounded-sm border-b-[1px] bg-white duration-200 ease-in-out hover:border-gray-300"
        >
          <div class="px-4 py-3">
            <div class="text-md font-semibold text-gray-800">
              {{ version.version }}
            </div>
            <div class="flex items-center">
              <div class="text-sm text-gray-600">
                {{ version.release_date }}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

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
    ? 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 bg-primary-200 text-black shadow-inner'
    : 'block cursor-pointer text-sm rounded-lg text-black transition-all duration-200 hover:bg-primary-300 hover:shadow-inner';
};
</script>
