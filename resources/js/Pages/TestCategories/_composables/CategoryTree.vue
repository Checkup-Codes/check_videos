<template>
  <div class="flex h-full min-h-0 flex-col">
    <div
      ref="scrollContainer"
      class="category-tree-container min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-none p-3"
    >
      <div class="space-y-1">
        <div v-for="category in filteredCategories" :key="category.id" class="space-y-1">
          <Link
            :href="`/test-categories/${category.slug}`"
            :class="[
              'block rounded-md px-2 py-1.5 text-sm transition-colors',
              isActive(category) ? 'bg-accent font-medium text-accent-foreground' : 'text-foreground hover:bg-accent/50',
            ]"
          >
            <div class="flex items-center justify-between">
              <span>{{ category.name }}</span>
              <span v-if="category.tests_count" class="text-xs text-muted-foreground">
                ({{ category.tests_count }})
              </span>
            </div>
          </Link>
          <div v-if="category.children && category.children.length > 0" class="ml-4 space-y-1">
            <Link
              v-for="child in category.children"
              :key="child.id"
              :href="`/test-categories/${child.slug}`"
              :class="[
                'block rounded-md px-2 py-1.5 text-sm transition-colors',
                isActive(child) ? 'bg-accent font-medium text-accent-foreground' : 'text-foreground hover:bg-accent/50',
              ]"
            >
              <div class="flex items-center justify-between">
                <span>{{ child.name }}</span>
                <span v-if="child.tests_count" class="text-xs text-muted-foreground">
                  ({{ child.tests_count }})
                </span>
              </div>
            </Link>
          </div>
        </div>
        <!-- Boş durum -->
        <div
          v-if="filteredCategories.length === 0"
          class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50"
        >
          <div>Henüz kategori bulunmuyor</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const { props: pageProps } = usePage();
const categories = inject('categories', []);

const filteredCategories = computed(() => {
  return categories.filter((cat) => {
    if (pageProps.isAdmin) return true;
    return cat.status === 'public';
  });
});

const isActive = (category) => {
  const currentUrl = window.location.pathname;
  return currentUrl.includes(`/test-categories/${category.slug}`);
};

const scrollContainer = ref(null);

defineExpose({ scrollContainer });
</script>

<style scoped>
.category-tree-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.category-tree-container::-webkit-scrollbar {
  width: 6px;
}

.category-tree-container::-webkit-scrollbar-track {
  background: transparent;
}

.category-tree-container::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted));
  border-radius: 3px;
}
</style>

