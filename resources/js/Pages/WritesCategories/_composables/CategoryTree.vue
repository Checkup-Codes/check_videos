<template>
  <div class="space-y-1 p-3">
    <!-- Category List -->
        <div v-for="category in filteredParentCategories" :key="category.id">
          <!-- Ana kategori -->
          <div
            :class="[
              'group rounded-md transition-colors',
              url === `/categories/${category.slug}` ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50',
            ]"
          >
            <Link :href="route('categories.show', { category: category.slug })" class="block px-3 py-2">
              <div class="flex items-center justify-between">
                <div class="flex min-w-0 flex-1 items-center gap-2">
                  <!-- Status icons -->
                  <span v-if="category.status === 'hidden'" class="shrink-0 text-yellow-500" title="Gizli kategori">
                    <IconLock class="h-3 w-3" />
                  </span>
                  <span v-if="hasLinkOnlyWrites(category)" class="shrink-0 text-primary" title="Sadece link yazıları">
                    <IconLink class="h-3 w-3" />
                  </span>
                  <h3
                    class="truncate text-[10px] font-normal"
                    :class="url === `/categories/${category.slug}` ? 'text-accent-foreground' : 'text-foreground'"
                    :title="category.name"
                    style="font-family: 'Satoshi', system-ui, sans-serif; font-weight: 400;"
                  >
                    {{ category.name }}
                  </h3>
                </div>
                <div class="flex shrink-0 items-center gap-2">
                  <button
                    v-if="category.children.length"
                    @click.prevent.stop="toggleCollapse(category.id)"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <IconChevronDown
                      class="h-3 w-3 transition-transform duration-200"
                      :class="{ 'rotate-180': !isCollapsed(category.id) }"
                    />
                  </button>
                  <div
                    class="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground"
                  >
                    {{ getTotalWriteCount(category) }}
                  </div>
                </div>
              </div>
            </Link>

            <!-- Alt kategoriler -->
            <div v-if="category.children.length" class="pb-1" v-show="!isCollapsed(category.id)">
              <div class="space-y-0.5 pl-4">
                <div v-for="child in category.children" :key="child.id">
                  <div
                    :class="[
                      'group rounded-md transition-colors',
                      url === `/categories/${child.slug}` ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50',
                    ]"
                  >
                    <Link :href="route('categories.show', { category: child.slug })" class="block px-3 py-1.5">
                      <div class="flex items-center justify-between">
                        <div class="flex min-w-0 flex-1 items-center gap-2">
                          <!-- Status icons -->
                          <span
                            v-if="child.status === 'hidden' || child.parent_hidden"
                            class="shrink-0 text-yellow-500"
                            title="Gizli kategori"
                          >
                            <IconLock class="h-3 w-3" />
                          </span>
                          <span
                            class="truncate text-[10px] font-normal"
                            :class="url === `/categories/${child.slug}` ? 'text-accent-foreground' : 'text-foreground'"
                            :title="child.name"
                            style="font-family: 'Satoshi', system-ui, sans-serif; font-weight: 400;"
                          >
                            {{ child.name }}
                          </span>
                        </div>
                        <div class="flex shrink-0 items-center gap-2">
                          <button
                            v-if="child.children.length"
                            @click.prevent.stop="toggleCollapse(child.id)"
                            class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                          >
                            <IconChevronDown
                              class="h-3 w-3 transition-transform duration-200"
                              :class="{ 'rotate-180': !isCollapsed(child.id) }"
                            />
                          </button>
                          <div
                            class="inline-flex items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                          >
                            {{ getTotalWriteCount(child) }}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <!-- Üçüncü seviye kategoriler -->
                    <div v-if="child.children.length" class="pb-1" v-show="!isCollapsed(child.id)">
                      <div class="space-y-0.5 pl-4">
                        <div v-for="subChild in child.children" :key="subChild.id">
                          <div
                            :class="[
                              'group rounded-md transition-colors',
                              url === `/categories/${subChild.slug}`
                                ? 'bg-accent text-accent-foreground'
                                : 'hover:bg-accent/50',
                            ]"
                          >
                            <Link
                              :href="route('categories.show', { category: subChild.slug })"
                              class="block px-3 py-1.5"
                            >
                              <div class="flex items-center justify-between">
                                <div class="flex min-w-0 flex-1 items-center gap-2">
                                  <!-- Status icons -->
                                  <span
                                    v-if="subChild.status === 'hidden' || subChild.parent_hidden"
                                    class="shrink-0 text-yellow-500"
                                    title="Gizli kategori"
                                  >
                                    <IconLock class="h-3 w-3" />
                                  </span>
                                  <span
                                    class="truncate text-[9px] font-normal"
                                    :class="
                                      url === `/categories/${subChild.slug}`
                                        ? 'text-accent-foreground'
                                        : 'text-foreground'
                                    "
                                    :title="subChild.name"
                                    style="font-family: 'Satoshi', system-ui, sans-serif; font-weight: 400;"
                                  >
                                    {{ subChild.name }}
                                  </span>
                                </div>
                                <div
                                  class="inline-flex shrink-0 items-center rounded-full border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                                >
                                  {{ getTotalWriteCount(subChild) }}
                                </div>
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
        </div>

    <!-- Boş durum -->
    <div
      v-if="filteredParentCategories.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground opacity-50"
    >
      <div>Henüz kategori bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, inject, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import IconLock from '../_components/icons/IconLock.vue';
import IconLink from '../_components/icons/IconLink.vue';
import IconChevronDown from '../_components/icons/IconChevronDown.vue';

// Component name definition for dev tools
defineOptions({
  name: 'CategoryTree',
});

const props = defineProps({
  isCollapsed: { type: Boolean, default: false },
  expandAll: { type: Boolean, default: false },
});

// Inject categories - can be a computed ref or array
const injectedCategories = inject('categories', []);
const categories = computed(() => {
  const categoriesValue = injectedCategories?.value ?? injectedCategories;
  return Array.isArray(categoriesValue) ? categoriesValue : [];
});
const isAdmin = inject('isAdmin', false);
const adminFilter = ref('all');
const showFilterMenu = ref(false);

const page = usePage();

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
  categories.value
    .filter((cat) => !cat.parent_id || cat.parent_id === null || cat.parent_id === 'null' || cat.parent_id === 0)
    .sort((a, b) => getTotalWriteCount(b) - getTotalWriteCount(a))
);

const filteredParentCategories = computed(() => filterCategories(parentCategories.value, adminFilter.value));

const emit = defineEmits(['update:expandAll']);
const url = computed(() => page.url);

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
});
</script>

<style scoped>
/* Line clamp utility for title truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
