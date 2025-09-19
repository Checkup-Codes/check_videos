<template>
  <div class="overflow-hidden border-b-2 border-base-300 bg-base-100 lg:relative">
    <div class="flex h-12 items-center justify-between px-4 text-sm font-semibold text-base-content">
      <span
        @click="toggleWidth"
        class="hover:text-base-content/70 cursor-pointer transition-colors duration-200"
        :title="isNarrow ? 'Genişlet' : 'Daralt'"
      >
        {{ title }}
      </span>

      <div class="flex items-center gap-2">
        <!-- Performance monitor slot -->
        <slot name="actions"></slot>

        <button
          v-if="showExpandCollapseButton"
          @click.stop="$emit('toggle-expand')"
          class="btn btn-ghost btn-xs hover:bg-base-200"
          :title="isExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Link
          v-if="userName && href"
          :href="href"
          class="group flex h-6 w-6 items-center justify-center rounded-full bg-base-content text-base-100 transition-all duration-200 hover:bg-base-300"
          :title="`Yeni ${title?.toLowerCase() || 'öğe'} ekle`"
          @click.stop
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
const { props: pageProps } = usePage();

// Check if user is authenticated
const userName = pageProps.auth?.user?.name;

// Define component props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: null,
  },
  showExpandCollapseButton: {
    type: Boolean,
    default: false,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle-expand', 'toggle-width']);

const isNarrow = ref(false);

/**
 * Toggle sidebar width and emit event
 */
const toggleWidth = () => {
  isNarrow.value = !isNarrow.value;
  emit('toggle-width', isNarrow.value);
};
</script>
