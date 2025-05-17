<template>
  <div ref="scrollContainer" class="space-y-1 p-3">
    <ul class="">
      <li v-for="category in parentCategories" :key="category.id" class="mb-1">
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
            <!-- Lock icon for hidden category -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span v-if="category.status === 'hidden'" class="opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span class="font-medium">{{ category.name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="badge badge-sm">{{ getTotalWriteCount(category) }}</div>
              </div>
            </div>
          </Link>
          <button
            v-if="category.children.length"
            @click="toggleCollapse(category.id)"
            class="btn btn-ghost btn-sm btn-square ml-1"
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
                  </div>
                  <div class="badge badge-xs">{{ getTotalWriteCount(child) }}</div>
                </div>
              </Link>
              <button
                v-if="child.children.length"
                @click="toggleCollapse(child.id)"
                class="btn btn-ghost btn-xs btn-square ml-1"
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
import { ref, watch, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

// Component name definition for dev tools
defineOptions({
  name: 'CategoryTree',
});

const props = defineProps({
  parentCategories: {
    type: Array,
    required: true,
  },
  getLinkClasses: {
    type: Function,
    required: false,
    default: () => '',
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:expandAll']);
const page = usePage();
const url = computed(() => page.url);

const scrollContainer = ref(null);
const collapsedCategories = ref(new Set());

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
  collapsedCategories.value.clear();

  if (!expand) {
    // Collapse - mark all categories as collapsed
    props.parentCategories.forEach((category) => {
      collapsedCategories.value.add(category.id);

      if (category.children && category.children.length) {
        category.children.forEach((child) => {
          collapsedCategories.value.add(child.id);

          if (child.children && child.children.length) {
            child.children.forEach((subChild) => {
              collapsedCategories.value.add(subChild.id);
            });
          }
        });
      }
    });
  }
};

// Toggle collapse state for a single category
const toggleCollapse = (categoryId) => {
  if (collapsedCategories.value.has(categoryId)) {
    collapsedCategories.value.delete(categoryId);
  } else {
    collapsedCategories.value.add(categoryId);
  }
};

// Check if a category is collapsed
const isCollapsed = (categoryId) => {
  return collapsedCategories.value.has(categoryId);
};

// Watch for changes to expandAll prop
watch(
  () => props.expandAll,
  (newVal) => {
    expandAllCategories(newVal);
  },
  { immediate: true }
);

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
