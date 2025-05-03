<template>
  <div ref="scrollContainer" class="w-full overflow-y-auto">
    <div class="min-h-full">
      <ul class="menu bg-base-100 rounded-box w-full">
        <li v-for="category in parentCategories" :key="category.id" class="mb-1">
          <div class="flex w-full items-center">
            <Link
              :href="route('categories.show', { category: category.slug })"
              :class="[getLinkClasses(`/categories/${category.slug}`), 'flex flex-grow items-center font-medium']"
            >
              <!-- Lock icon for hidden category -->
              <span v-if="category.status === 'hidden'" class="text-neutral-content mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span class="text-base">{{ category.name }}</span>
            </Link>
            <div class="flex items-center">
              <button
                v-if="category.children.length"
                @click="toggleCollapse(category.id)"
                class="btn btn-ghost btn-xs mr-1 px-1"
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
              <div class="badge badge-sm badge-neutral">{{ getTotalWriteCount(category) }}</div>
            </div>
          </div>

          <!-- Subcategories -->
          <ul v-if="category.children.length" class="menu-sm pl-4" v-show="!isCollapsed(category.id)">
            <li v-for="child in category.children" :key="child.id" class="mt-1">
              <div class="flex w-full items-center">
                <Link
                  :href="route('categories.show', { category: child.slug })"
                  :class="[getLinkClasses(`/categories/${child.slug}`), 'flex flex-grow items-center']"
                >
                  <!-- Lock icon for hidden category -->
                  <span v-if="child.status === 'hidden' || child.parent_hidden" class="text-neutral-content mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span class="text-sm">{{ child.name }}</span>
                </Link>
                <div class="flex items-center">
                  <button
                    v-if="child.children.length"
                    @click="toggleCollapse(child.id)"
                    class="btn btn-ghost btn-xs mr-1 px-1"
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
                  <div class="badge badge-sm badge-neutral">{{ getTotalWriteCount(child) }}</div>
                </div>
              </div>

              <!-- Third-level categories -->
              <ul v-if="child.children.length" class="menu-xs pl-3" v-show="!isCollapsed(child.id)">
                <li v-for="subChild in child.children" :key="subChild.id" class="mt-1">
                  <div class="flex w-full items-center">
                    <Link
                      :href="route('categories.show', { category: subChild.slug })"
                      :class="[getLinkClasses(`/categories/${subChild.slug}`), 'flex flex-grow items-center']"
                    >
                      <!-- Lock icon for hidden category -->
                      <span
                        v-if="subChild.status === 'hidden' || subChild.parent_hidden"
                        class="text-neutral-content mr-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      <span class="text-xs">{{ subChild.name }}</span>
                    </Link>
                    <div class="badge badge-sm badge-neutral">{{ getTotalWriteCount(subChild) }}</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
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
    required: true,
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:expandAll']);
const { url } = usePage();

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
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
