<template>
  <div class="overflow-hidden border-b-2 border-base-300 lg:relative">
    <div class="flex h-12 items-center justify-between px-5 text-sm font-semibold">
      <span class="">{{ title }}</span>
      <div class="flex items-center gap-2">
        <!-- Performance monitor slot -->
        <slot name="actions"></slot>

        <button
          v-if="showExpandCollapseButton"
          @click="$emit('toggle-expand')"
          class="btn btn-ghost btn-xs"
          :title="isExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isExpanded" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <Link v-if="userName && href" :href="href" class="text-primary-500">
          <Button :title="title" size="xsmall"> + </Button>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import { Link } from '@inertiajs/vue3';
const { props } = usePage();

// Check if user is authenticated
const userName = props.auth?.user?.name;

// Define component props
const vueProps = defineProps({
  title: String,
  href: String,
  showExpandCollapseButton: {
    type: Boolean,
    default: false,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle-expand']);
</script>
