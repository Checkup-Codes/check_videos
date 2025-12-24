<template>
  <div class="space-y-1 p-2">
    <Link
      v-for="test in filteredTests"
      :key="test.id"
      :href="getTestRoute(test)"
      :class="[
        'block rounded-lg p-3',
        isActive(test) ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:bg-accent',
      ]"
    >
      <h3
        class="line-clamp-2 text-sm font-medium leading-tight"
        :class="isActive(test) ? 'text-primary-foreground' : 'text-foreground'"
      >
        {{ test.title }}
      </h3>
      <div
        class="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"
        :class="isActive(test) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{{ test.total_questions }} soru</span>
          </span>
          <span v-if="test.total_points" class="flex items-center gap-1">
            <span>{{ test.total_points }} puan</span>
          </span>
        </div>
      </div>
    </Link>

    <div
      v-if="filteredTests.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground"
    >
      <div>Henüz test bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';

defineOptions({ name: 'TestList' });

const props = defineProps({
  tests: { type: Array, default: () => [] },
  isCollapsed: { type: Boolean, default: false },
});

const page = usePage();

// Inject tests - handle both computed ref and plain array
const injectedTests = inject('tests', []);

const filteredTests = computed(() => {
  // Props tests first
  if (props.tests && props.tests.length > 0) {
    return props.tests;
  }
  // Handle both computed ref and plain array
  const testsValue = injectedTests?.value ?? injectedTests;
  return Array.isArray(testsValue) ? testsValue : [];
});

const getTestRoute = (test) => `/tests/${test.slug}`;

const isActive = (test) => {
  const currentUrl = window.location.pathname;
  return currentUrl.includes(`/tests/${test.slug}`);
};

defineExpose({ filteredTests });
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
