<template>
  <SubSidebarHeader :title="title" :description="description">
    <template #actions>
      <slot name="actions" />
      <button
        v-if="showExpandCollapseButton"
        @click.stop="$emit('toggle-expand')"
        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        :title="`Yeni ${title?.toLowerCase() || 'öğe'} ekle`"
        @click.stop
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </template>
  </SubSidebarHeader>
</template>

<script setup>
import { usePage, Link } from '@inertiajs/vue3';
import SubSidebarHeader from '@/Components/CekapUI/Layout/SubSidebarHeader.vue';

const { props: pageProps } = usePage();
const userName = pageProps.auth?.user?.name;

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
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

defineEmits(['toggle-expand', 'toggle-width']);
</script>
