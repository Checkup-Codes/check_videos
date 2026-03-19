<template>
  <div class="space-y-1.5 p-3">
    <!-- Category List -->
        <div v-for="category in filteredParentCategories" :key="category.id" class="space-y-1">
          <!-- Ana kategori -->
          <div
            :class="[
              'group relative overflow-hidden rounded-xl border transition-all duration-200',
              url === `/categories/${category.slug}`
                ? 'border-primary/50 bg-primary shadow-sm shadow-primary/10'
                : 'border-border/50 bg-card/50 hover:border-border hover:bg-accent/50 hover:shadow-sm',
            ]"
          >
            <!-- Active indicator -->
            <div
              v-if="url === `/categories/${category.slug}`"
              class="absolute left-0 top-0 h-full w-1 bg-primary"
            ></div>

            <Link :href="route('categories.show', { category: category.slug })" class="block p-3" :class="{ 'pl-4': url === `/categories/${category.slug}` }">
              <div class="flex items-center justify-between gap-2">
                <div class="flex min-w-0 flex-1 items-center gap-2">
                  <!-- Status icons -->
                  <span
                    v-if="category.status === 'hidden'"
                    class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                    title="Gizli kategori"
                  >
                    <IconLock class="h-3 w-3" />
                  </span>
                  <span
                    v-if="hasLinkOnlyWrites(category)"
                    class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                    title="Sadece link yazıları"
                  >
                    <IconLink class="h-3 w-3" />
                  </span>
                  <h4
                    class="truncate text-xs font-semibold tracking-tight"
                    :class="url === `/categories/${category.slug}` ? 'text-primary-foreground' : 'text-foreground'"
                    :title="category.name"
                  >
                    {{ category.name }}
                  </h4>
                </div>
                <div class="flex shrink-0 items-center gap-1.5">
                  <button
                    v-if="category.children.length"
                    @click.prevent.stop="toggleCollapse(category.id)"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                    :class="url === `/categories/${category.slug}` ? 'text-primary-foreground/80 hover:bg-primary-foreground/10' : ''"
                  >
                    <IconChevronDown
                      class="h-3.5 w-3.5 transition-transform duration-200"
                      :class="{ 'rotate-180': !isCollapsed(category.id) }"
                    />
                  </button>
                  <div
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
                    :class="url === `/categories/${category.slug}` ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary/80 text-secondary-foreground'"
                  >
                    {{ getTotalWriteCount(category) }}
                  </div>
                </div>
              </div>
            </Link>

            <!-- Hover effect overlay -->
            <div
              class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              :class="url === `/categories/${category.slug}` ? 'bg-primary/5' : 'bg-accent/30'"
            ></div>

            <!-- Alt kategoriler -->
            <div v-if="category.children.length" class="mt-1.5 space-y-1 pl-3" v-show="!isCollapsed(category.id)">
              <div v-for="child in category.children" :key="child.id">
                <div
                  :class="[
                    'group relative overflow-hidden rounded-lg border transition-all duration-200',
                    url === `/categories/${child.slug}`
                      ? 'border-primary/40 bg-primary/90 shadow-sm'
                      : 'border-border/40 bg-card/40 hover:border-border/60 hover:bg-accent/40',
                  ]"
                >
                  <!-- Active indicator -->
                  <div
                    v-if="url === `/categories/${child.slug}`"
                    class="absolute left-0 top-0 h-full w-0.5 bg-primary"
                  ></div>

                  <Link :href="route('categories.show', { category: child.slug })" class="block p-2.5" :class="{ 'pl-3': url === `/categories/${child.slug}` }">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex min-w-0 flex-1 items-center gap-1.5">
                        <!-- Status icons -->
                        <span
                          v-if="child.status === 'hidden' || child.parent_hidden"
                          class="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          title="Gizli kategori"
                        >
                          <IconLock class="h-2.5 w-2.5" />
                        </span>
                        <span
                          class="truncate text-[11px] font-semibold"
                          :class="url === `/categories/${child.slug}` ? 'text-primary-foreground' : 'text-foreground'"
                          :title="child.name"
                        >
                          {{ child.name }}
                        </span>
                      </div>
                      <div class="flex shrink-0 items-center gap-1">
                        <button
                          v-if="child.children.length"
                          @click.prevent.stop="toggleCollapse(child.id)"
                          class="inline-flex h-5 w-5 items-center justify-center rounded-md text-xs transition-all duration-200 hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                          :class="url === `/categories/${child.slug}` ? 'text-primary-foreground/80 hover:bg-primary-foreground/10' : ''"
                        >
                          <IconChevronDown
                            class="h-3 w-3 transition-transform duration-200"
                            :class="{ 'rotate-180': !isCollapsed(child.id) }"
                          />
                        </button>
                        <div
                          class="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                          :class="url === `/categories/${child.slug}` ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary/70 text-secondary-foreground'"
                        >
                          {{ getTotalWriteCount(child) }}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <!-- Hover effect -->
                  <div
                    class="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    :class="url === `/categories/${child.slug}` ? 'bg-primary/5' : 'bg-accent/30'"
                  ></div>

                  <!-- Üçüncü seviye kategoriler -->
                  <div v-if="child.children.length" class="mt-1 space-y-1 pl-2.5" v-show="!isCollapsed(child.id)">
                    <div v-for="subChild in child.children" :key="subChild.id">
                      <div
                        :class="[
                          'group relative overflow-hidden rounded-md border transition-all duration-200',
                          url === `/categories/${subChild.slug}`
                            ? 'border-primary/30 bg-primary/80 shadow-sm'
                            : 'border-border/30 bg-card/30 hover:border-border/50 hover:bg-accent/30',
                        ]"
                      >
                        <!-- Active indicator -->
                        <div
                          v-if="url === `/categories/${subChild.slug}`"
                          class="absolute left-0 top-0 h-full w-0.5 bg-primary"
                        ></div>

                        <Link
                          :href="route('categories.show', { category: subChild.slug })"
                          class="block p-2"
                          :class="{ 'pl-2.5': url === `/categories/${subChild.slug}` }"
                        >
                          <div class="flex items-center justify-between gap-1.5">
                            <div class="flex min-w-0 flex-1 items-center gap-1.5">
                              <!-- Status icons -->
                              <span
                                v-if="subChild.status === 'hidden' || subChild.parent_hidden"
                                class="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                title="Gizli kategori"
                              >
                                <IconLock class="h-2 w-2" />
                              </span>
                              <span
                                class="truncate text-[10px] font-semibold"
                                :class="
                                  url === `/categories/${subChild.slug}`
                                    ? 'text-primary-foreground'
                                    : 'text-foreground'
                                "
                                :title="subChild.name"
                              >
                                {{ subChild.name }}
                              </span>
                            </div>
                            <div
                              class="inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                              :class="url === `/categories/${subChild.slug}` ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary/60 text-secondary-foreground'"
                            >
                              {{ getTotalWriteCount(subChild) }}
                            </div>
                          </div>
                        </Link>

                        <!-- Hover effect -->
                        <div
                          class="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          :class="url === `/categories/${subChild.slug}` ? 'bg-primary/5' : 'bg-accent/30'"
                        ></div>
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
      class="flex h-40 flex-col items-center justify-center gap-2 text-center"
    >
      <div class="rounded-full bg-muted/50 p-3">
        <svg class="h-6 w-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      </div>
      <p class="text-xs font-medium text-muted-foreground">Henüz kategori bulunmuyor</p>
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
