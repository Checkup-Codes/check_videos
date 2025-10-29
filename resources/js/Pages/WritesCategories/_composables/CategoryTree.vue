<template>
  <div ref="scrollContainer" class="category-tree-container space-y-1 overflow-y-auto p-3">
    <!-- Expand/Collapse and Filter buttons -->
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <!-- Expand/Collapse All Button -->
      <div v-if="enableExpandCollapse" class="flex gap-2">
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'bg-base-content text-base-100': areAllExpanded }"
          @click="handleToggleExpand"
          :title="areAllExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': areAllExpanded }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          <span v-if="!props.isCollapsed" class="ml-1">{{ areAllExpanded ? 'Daralt' : 'Genişlet' }}</span>
        </button>
      </div>

      <!-- Responsive filter buttons for logged-in users -->
      <div v-if="isAdmin" class="hidden gap-2 sm:flex">
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-neutral': adminFilter === 'all' }"
          @click="adminFilter = 'all'"
        >
          <span v-if="props.isCollapsed">
            <!-- List icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
          <span v-else>Tümü</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-neutral': adminFilter === 'public' }"
          @click="adminFilter = 'public'"
        >
          <span v-if="props.isCollapsed">
            <!-- Globe icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
              />
            </svg>
          </span>
          <span v-else>Herkese Açık</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-neutral': adminFilter === 'link_only' }"
          @click="adminFilter = 'link_only'"
        >
          <span v-if="props.isCollapsed">
            <!-- Link icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
              />
            </svg>
          </span>
          <span v-else>Sadece Link</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'btn-neutral': adminFilter === 'hidden' }"
          @click="adminFilter = 'hidden'"
        >
          <span v-if="props.isCollapsed">
            <!-- Lock icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
              />
            </svg>
          </span>
          <span v-else>Gizli</span>
        </button>
      </div>
      <!-- Mobile: show filter icon -->
      <div class="relative inline-block sm:hidden">
        <button @click="showFilterMenu = !showFilterMenu" class="btn btn-ghost btn-xs">
          <!-- Heroicons funnel icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
            />
          </svg>
        </button>
        <div
          v-if="showFilterMenu"
          class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="flex flex-col gap-1 py-1">
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-neutral': adminFilter === 'all' }"
              @click="
                adminFilter = 'all';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-neutral': adminFilter === 'public' }"
              @click="
                adminFilter = 'public';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-neutral': adminFilter === 'link_only' }"
              @click="
                adminFilter = 'link_only';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'btn-neutral': adminFilter === 'hidden' }"
              @click="
                adminFilter = 'hidden';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Category List -->
    <div class="space-y-2">
      <div v-for="category in filteredParentCategories" :key="category.id">
        <div
          :class="[
            'rounded-lg bg-base-100 transition-all duration-200',
            url === `/categories/${category.slug}` ? 'bg-base-content text-base-100' : 'hover:bg-base-300',
          ]"
        >
          <!-- Ana kategori başlığı -->
          <Link :href="route('categories.show', { category: category.slug })" class="block p-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <!-- Status icons -->
                <span v-if="category.status === 'hidden'" class="text-warning" title="Gizli kategori">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span v-if="hasLinkOnlyWrites(category)" class="text-info" title="Sadece link yazıları">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <h3
                  class="max-w-[120px] truncate text-sm font-medium leading-tight"
                  :class="url === `/categories/${category.slug}` ? 'text-base-100' : 'text-base-content'"
                  :title="category.name"
                >
                  {{ category.name }}
                </h3>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="category.children.length"
                  @click.prevent.stop="toggleCollapse(category.id)"
                  class="btn btn-ghost btn-xs btn-square"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 transition-transform"
                    :class="{ 'rotate-180': !isCollapsed(category.id) }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="badge badge-sm">{{ getTotalWriteCount(category) }}</div>
              </div>
            </div>
          </Link>

          <!-- Alt kategoriler - dal mantığı ile -->
          <div v-if="category.children.length" class="relative px-3 pb-3" v-show="!isCollapsed(category.id)">
            <!-- Ana dikey çizgi -->
            <div class="absolute left-6 top-0 h-full w-px bg-base-300"></div>

            <div class="space-y-1">
              <div v-for="(child, index) in category.children" :key="child.id" class="relative">
                <!-- Yatay çizgi alt kategoriye -->
                <div class="absolute left-6 top-3 h-px w-4 bg-base-300"></div>

                <!-- Alt kategori -->
                <div class="ml-8">
                  <Link
                    :href="route('categories.show', { category: child.slug })"
                    :class="[
                      'block rounded-md p-2 transition-all duration-200',
                      url === `/categories/${child.slug}` ? 'bg-base-content text-base-100' : 'hover:bg-base-300',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <!-- Status icons -->
                        <span
                          v-if="child.status === 'hidden' || child.parent_hidden"
                          class="text-warning"
                          title="Gizli kategori"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span
                          class="max-w-[100px] truncate text-sm font-medium"
                          :class="
                            url === `/categories/${child.slug}` || url === `/categories/${category.slug}`
                              ? 'text-base-100'
                              : 'text-base-content'
                          "
                          :title="child.name"
                          >{{ child.name }}</span
                        >
                      </div>
                      <div class="flex items-center gap-2">
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
                        <div class="badge badge-xs">{{ getTotalWriteCount(child) }}</div>
                      </div>
                    </div>
                  </Link>

                  <!-- Üçüncü seviye kategoriler - dal mantığı ile -->
                  <div v-if="child.children.length" class="relative mt-1" v-show="!isCollapsed(child.id)">
                    <!-- Alt kategoriden dikey çizgi -->
                    <div class="absolute left-4 top-0 h-full w-px bg-base-300"></div>

                    <div v-for="(subChild, subIndex) in child.children" :key="subChild.id" class="relative">
                      <!-- Yatay çizgi üçüncü seviyeye -->
                      <div class="absolute left-4 top-3 h-px w-4 bg-base-300"></div>

                      <!-- Üçüncü seviye kategori -->
                      <div class="ml-8">
                        <Link
                          :href="route('categories.show', { category: subChild.slug })"
                          :class="[
                            'block rounded-md p-2 transition-all duration-200',
                            url === `/categories/${subChild.slug}`
                              ? 'bg-base-content text-base-100'
                              : 'hover:bg-base-300',
                          ]"
                        >
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <!-- Status icons -->
                              <span
                                v-if="subChild.status === 'hidden' || subChild.parent_hidden"
                                class="text-warning"
                                title="Gizli kategori"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                              <span
                                class="max-w-[80px] truncate text-xs font-medium"
                                :class="
                                  url === `/categories/${subChild.slug}` || url === `/categories/${category.slug}`
                                    ? 'text-base-100'
                                    : 'text-base-content'
                                "
                                :title="subChild.name"
                                >{{ subChild.name }}</span
                              >
                            </div>
                            <div class="badge badge-xs">{{ getTotalWriteCount(subChild) }}</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Boş durum -->
      <div
        v-if="filteredParentCategories.length === 0"
        class="flex h-32 items-center justify-center text-center opacity-50"
      >
        <div>Henüz kategori bulunmuyor</div>
      </div>
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
  expandAll: { type: Boolean, default: false },
  enableExpandCollapse: { type: Boolean, default: false },
});

const categories = inject('categories', []);
const isAdmin = inject('isAdmin', false);
const adminFilter = ref('all');
const showFilterMenu = ref(false);

// Recursive filter for status only
function filterCategories(categories, status) {
  return categories
    .map((cat) => {
      // Recursively filter children first
      const filteredChildren = filterCategories(cat.children || [], status);
      // Status filter
      let matchesStatus = true;
      if (isAdmin && status !== 'all') {
        if (status === 'public') matchesStatus = cat.status !== 'hidden' && cat.status !== 'link_only';
        else matchesStatus = cat.status === status;
      }
      // Show this category if:
      // - It matches status
      // - OR any child matches (filteredChildren not empty)
      if (matchesStatus || filteredChildren.length > 0) {
        return {
          ...cat,
          children: filteredChildren,
        };
      }
      // Otherwise, don't include this category
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a));
}

const parentCategories = computed(() =>
  categories
    .filter((cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === 'null' || cat.parent_id === 0)
    .sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a))
);

const filteredParentCategories = computed(() => filterCategories(parentCategories.value, adminFilter.value));

const emit = defineEmits(['update:expandAll', 'toggle-expand']);
const page = usePage();
const url = computed(() => page.url);

const scrollContainer = ref(null);
const store = useStore();

// Check if all categories are expanded
const areAllExpanded = computed(() => {
  return store.getters['CategorySidebar/collapsedSet'].size === 0;
});

// Handle toggle expand/collapse all
const handleToggleExpand = () => {
  emit('toggle-expand');
};

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
.category-tree-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Custom scrollbar styling */
.category-tree-container::-webkit-scrollbar {
  width: 6px;
}

.category-tree-container::-webkit-scrollbar-track {
  background: transparent;
}

.category-tree-container::-webkit-scrollbar-thumb {
  background-color: rgba(var(--color-base-300), 0.5);
  border-radius: 3px;
}

@media (prefers-color-scheme: dark) {
  .category-tree-container::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-base-100), 0.5);
  }
}

/* Line clamp utility for title truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
