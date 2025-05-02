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
              <div class="badge badge-sm badge-outline">{{ getTotalWriteCount(category) }}</div>
            </div>
          </div>

          <!-- Alt Kategoriler -->
          <ul v-if="category.children.length" class="menu-sm pl-4" v-show="!isCollapsed(category.id)">
            <li v-for="child in category.children" :key="child.id" class="mt-1">
              <div class="flex w-full items-center">
                <Link
                  :href="route('categories.show', { category: child.slug })"
                  :class="[getLinkClasses(`/categories/${child.slug}`), 'flex flex-grow items-center']"
                >
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
                  <div class="badge badge-sm badge-outline">{{ getTotalWriteCount(child) }}</div>
                </div>
              </div>

              <!-- Alt Alt Kategoriler -->
              <ul v-if="child.children.length" class="menu-xs pl-3" v-show="!isCollapsed(child.id)">
                <li v-for="subChild in child.children" :key="subChild.id" class="mt-1">
                  <div class="flex w-full items-center">
                    <Link
                      :href="route('categories.show', { category: subChild.slug })"
                      :class="[getLinkClasses(`/categories/${subChild.slug}`), 'flex flex-grow items-center']"
                    >
                      <span class="text-xs">{{ subChild.name }}</span>
                    </Link>
                    <div class="badge badge-sm badge-outline">{{ subChild.writes_count || 0 }}</div>
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
import { ref, watch, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

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

// Bir kategori ve alt kategorilerindeki toplam yazı sayısını hesapla
const getTotalWriteCount = (category) => {
  let total = category.writes_count || 0;

  if (category.children && category.children.length) {
    category.children.forEach((child) => {
      total += getTotalWriteCount(child);
    });
  }

  return total;
};

// Tüm kategorileri daralt veya genişlet
const expandAllCategories = (expand = true) => {
  collapsedCategories.value.clear();

  if (!expand) {
    // Daralt - tüm kategorileri collapsed olarak işaretle
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

// Tekil kategori için daralt/genişlet
const toggleCollapse = (categoryId) => {
  if (collapsedCategories.value.has(categoryId)) {
    collapsedCategories.value.delete(categoryId);
  } else {
    collapsedCategories.value.add(categoryId);
  }
};

const isCollapsed = (categoryId) => {
  return collapsedCategories.value.has(categoryId);
};

// expandAll prop değiştiğinde
watch(
  () => props.expandAll,
  (newVal) => {
    expandAllCategories(newVal);
  },
  { immediate: true }
);

// Dışa aktarılan metodlar
defineExpose({
  expandAllCategories,
});
</script>

<style scoped>
.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)):not(.active):focus,
.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)):not(.active):hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)).active {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  border-left: 3px solid #000;
}

.badge-outline {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.65rem;
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Prevent link from wrapping around badge */
li > div {
  align-items: center;
}
</style>
