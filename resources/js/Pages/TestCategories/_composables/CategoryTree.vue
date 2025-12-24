<template>
  <div class="space-y-1 p-2">
    <div v-for="category in filteredCategories" :key="category.id" class="space-y-1">
      <Link
        :href="`/test-categories/${category.slug}`"
        :class="[
          'block rounded-md px-3 py-2 text-sm transition-colors',
          isActive(category) ? 'bg-accent font-medium text-accent-foreground' : 'text-foreground hover:bg-accent/50',
        ]"
      >
        <div class="flex items-center justify-between">
          <span class="truncate">{{ category.name }}</span>
          <span
            v-if="category.tests_count"
            class="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground"
          >
            {{ category.tests_count }}
          </span>
        </div>
      </Link>
      <!-- Children -->
      <div v-if="category.children && category.children.length > 0" class="ml-4 space-y-0.5">
        <Link
          v-for="child in category.children"
          :key="child.id"
          :href="`/test-categories/${child.slug}`"
          :class="[
            'block rounded-md px-3 py-1.5 text-sm transition-colors',
            isActive(child) ? 'bg-accent font-medium text-accent-foreground' : 'text-foreground hover:bg-accent/50',
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="truncate">{{ child.name }}</span>
            <span
              v-if="child.tests_count"
              class="inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
            >
              {{ child.tests_count }}
            </span>
          </div>
        </Link>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredCategories.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50"
    >
      <div>Henüz kategori bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';

defineOptions({ name: 'CategoryTree' });

const props = defineProps({
  isCollapsed: { type: Boolean, default: false },
});

const page = usePage();

// Inject categories - handle both computed ref and plain array
const injectedCategories = inject('categories', []);

const categories = computed(() => {
  const categoriesValue = injectedCategories?.value ?? injectedCategories;
  return Array.isArray(categoriesValue) ? categoriesValue : [];
});

const filteredCategories = computed(() => {
  return categories.value.filter((cat) => {
    if (page.props.isAdmin) return true;
    return cat.status === 'public';
  });
});

const isActive = (category) => {
  const currentUrl = window.location.pathname;
  return currentUrl.includes(`/test-categories/${category.slug}`);
};

defineExpose({ filteredCategories });
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
