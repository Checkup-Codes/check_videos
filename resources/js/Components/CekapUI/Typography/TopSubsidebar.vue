<template>
  <div
    class="relative z-10 shrink-0 border-b border-border bg-background overflow-hidden transition-all duration-300"
  >
    <div
      class="relative flex h-9 items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
    >
      <span
        @click="toggleWidth"
        class="hover:text-foreground cursor-pointer transition-colors duration-200"
        :title="isNarrow ? 'Genişlet' : 'Daralt'"
      >
        {{ title }}
      </span>

      <div class="flex items-center gap-1.5">
        <!-- Performance monitor slot -->
        <slot name="actions"></slot>

        <button
          v-if="showExpandCollapseButton"
          @click.stop="$emit('toggle-expand')"
          class="hover:bg-accent hover:text-accent-foreground flex h-6 w-6 items-center justify-center rounded-md px-1 transition-all duration-200 text-muted-foreground"
          :title="isExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 transition-transform duration-200"
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
          class="bg-accent/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground group flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200"
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

<style scoped>
/* Ensure header background is not affected by parent bg-muted */
.relative.z-10.shrink-0 {
  background: hsl(var(--background)) !important;
}
</style>
