<template>
  <div ref="scrollContainer" class="space-y-1 p-3">
    <!-- Search bar for all users -->
    <div class="mb-3">
      <input v-model="searchQuery" type="text" class="input-bordered input w-full" placeholder="Kategori ara..." />
    </div>
    <!-- Filter buttons for logged-in users -->
    <div v-if="isAdmin" class="mb-3 flex gap-2">
      <button class="btn btn-xs" :class="{ 'btn-primary': adminFilter === 'all' }" @click="adminFilter = 'all'">
        Tümü
      </button>
      <button class="btn btn-xs" :class="{ 'btn-primary': adminFilter === 'public' }" @click="adminFilter = 'public'">
        Herkese Açık
      </button>
      <button
        class="btn btn-xs"
        :class="{ 'btn-primary': adminFilter === 'link_only' }"
        @click="adminFilter = 'link_only'"
      >
        Sadece Link
      </button>
      <button class="btn btn-xs" :class="{ 'btn-primary': adminFilter === 'hidden' }" @click="adminFilter = 'hidden'">
        Gizli
      </button>
    </div>
    <ul class="">
      <li v-for="category in filteredParentCategories" :key="category.id" class="mb-1">
        <div class="flex w-full items-center">
          <Link
            :href="route('categories.show', { category: category.slug })"
            :class="[
              'block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200',
              url === `/categories/${category.slug}`
                ? 'border-primary bg-primary text-primary-content shadow-md'
                : 'border-base-200 bg-base-200 text-base-content hover:bg-base-300',
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <!-- Lock icon for hidden category -->
                <span v-if="category.status === 'hidden'" class="opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span
                  v-if="hasLinkOnlyWrites(category)"
                  :class="[url === `/categories/${category.slug}` ? 'text-primary-content' : 'text-primary']"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span class="font-medium">{{ category.name }}</span>
                <button
                  v-if="category.children.length"
                  @click.prevent.stop="toggleCollapse(category.id)"
                  class="btn btn-ghost btn-sm btn-square"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-transform"
                    :class="{ 'rotate-180': !isCollapsed(category.id) }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-2">
                <div class="badge badge-sm">{{ getTotalWriteCount(category) }}</div>
              </div>
            </div>
          </Link>
        </div>

        <!-- Subcategories -->
        <ul v-if="category.children.length" class="mt-1 pl-4" v-show="!isCollapsed(category.id)">
          <li v-for="child in category.children" :key="child.id" class="mb-1">
            <div class="flex w-full items-center">
              <Link
                :href="route('categories.show', { category: child.slug })"
                :class="[
                  'block flex-grow items-center rounded-lg border px-3 py-2 backdrop-blur-md transition-all duration-200',
                  url === `/categories/${child.slug}`
                    ? 'border-primary bg-primary text-primary-content shadow-md'
                    : 'border-base-200 bg-base-200 text-base-content hover:bg-base-300',
                ]"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <!-- Lock icon for hidden category -->
                    <span v-if="child.status === 'hidden' || child.parent_hidden" class="opacity-70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>{{ child.name }}</span>
                    <button
                      v-if="child.children.length"
                      @click.prevent.stop="toggleCollapse(child.id)"
                      class="btn btn-ghost btn-xs btn-square"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 transition-transform"
                        :class="{ 'rotate-180': !isCollapsed(child.id) }"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div class="badge badge-xs">{{ getTotalWriteCount(child) }}</div>
                </div>
              </Link>
            </div>

            <!-- Third-level categories -->
            <ul v-if="child.children.length" class="mt-1 pl-3" v-show="!isCollapsed(child.id)">
              <li v-for="subChild in child.children" :key="subChild.id" class="mt-1">
                <div class="flex w-full items-center">
                  <Link
                    :href="route('categories.show', { category: subChild.slug })"
                    :class="[
                      'block flex-grow items-center rounded-lg border px-3 py-1.5 text-xs backdrop-blur-md transition-all duration-200',
                      url === `/categories/${subChild.slug}`
                        ? 'border-primary bg-primary text-primary-content shadow-md'
                        : 'border-base-200 bg-base-200 text-base-content hover:bg-base-300',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <!-- Lock icon for hidden category -->
                        <span v-if="subChild.status === 'hidden' || subChild.parent_hidden" class="opacity-70">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span>{{ subChild.name }}</span>
                      </div>
                      <div class="badge badge-xs">{{ getTotalWriteCount(subChild) }}</div>
                    </div>
                  </Link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Boş durum -->
    <div v-if="parentCategories.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz kategori bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, inject, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'CategoryTree',
});

const props = defineProps({
  isCollapsed: { type: Boolean, default: false },
});

const categories = inject('categories', []);
const isAdmin = inject('isAdmin', false);
const searchQuery = ref('');
const adminFilter = ref('all');

// Recursive filter for search and status
function filterCategories(categories, search, status) {
  return categories
    .map((cat) => {
      // Recursively filter children first
      const filteredChildren = filterCategories(cat.children || [], search, status);
      // Search filter
      const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
      // Status filter
      let matchesStatus = true;
      if (isAdmin && status !== 'all') {
        if (status === 'public') matchesStatus = cat.status !== 'hidden' && cat.status !== 'link_only';
        else matchesStatus = cat.status === status;
      }
      // Show this category if:
      // - It matches search+status
      // - OR any child matches (filteredChildren not empty)
      if ((matchesSearch && matchesStatus) || filteredChildren.length > 0) {
        return {
          ...cat,
          children: filteredChildren,
        };
      }
      // Otherwise, don't include this category
      return null;
    })
    .filter(Boolean);
}

const parentCategories = computed(() =>
  categories.filter(
    (cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === 'null' || cat.parent_id === 0
  )
);

const filteredParentCategories = computed(() =>
  filterCategories(parentCategories.value, searchQuery.value, adminFilter.value)
);

const emit = defineEmits(['update:expandAll']);
const page = usePage();
const url = computed(() => page.url);

const scrollContainer = ref(null);
const store = useStore();

// Calculate total write count for a category and its children
const getTotalWriteCount = (category) => {
  // Start with the category's own write count
  let total = category.writes_count || 0;

  // Add write counts from children (recursively)
  if (category.children && category.children.length) {
    category.children.forEach((child) => {
      total += getTotalWriteCount(child);
    });
  }

  return total;
};

// Expand or collapse all categories
const expandAllCategories = (expand = true) => {
  store.dispatch('CategorySidebar/expandAllCategories', expand);
};

// Toggle collapse state for a single category
const toggleCollapse = (categoryId) => {
  store.dispatch('CategorySidebar/toggleCollapse', categoryId);
};

// Check if a category is collapsed
const isCollapsed = (categoryId) => {
  return store.getters['CategorySidebar/isCollapsed'](categoryId);
};

// Check if category or its children have link_only writes
const hasLinkOnlyWrites = (category) => {
  // Check if category has any writes with link_only status
  const hasLinkOnly = category.writes?.some((write) => write.status === 'link_only');
  if (hasLinkOnly) return true;

  // Check children recursively
  if (category.children?.length) {
    return category.children.some((child) => hasLinkOnlyWrites(child));
  }

  return false;
};

// Watch for changes to expandAll prop
// watch(
//   () => props.expandAll,
//   (newVal) => {
//     expandAllCategories(newVal);
//   },
//   { immediate: true }
// );

// Expose methods to parent component
defineExpose({
  expandAllCategories,
  scrollContainer,
});
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 128, 128, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .overflow-y-auto {
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
