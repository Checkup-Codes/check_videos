<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="KATEGORİLER" href="/categories/create" />
    <div ref="scrollContainer" class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]">
      <div class="min-h-full" v-show="showCategories">
        <ul>
          <li v-for="category in parentCategories" :key="category.id" class="mb-2">
            <!-- Ana Kategori -->
            <Link
              :href="route('categories.show', { category: category.slug })"
              :class="getLinkClasses(`/categories/${category.slug}`)"
              class="block py-2 text-base font-medium text-gray-700"
            >
              {{ category.name }}
            </Link>

            <!-- Alt Kategoriler -->
            <ul v-if="category.children.length" class="pl-4">
              <li v-for="child in category.children" :key="child.id" class="mt-1">
                <Link
                  :href="route('categories.show', { category: child.slug })"
                  :class="getLinkClasses(`/categories/${child.slug}`)"
                  class="block py-1 text-sm text-gray-600"
                >
                  {{ child.name }}
                </Link>

                <!-- Alt Alt Kategoriler -->
                <ul v-if="child.children.length" class="border-gray-300 pl-4">
                  <li v-for="subChild in child.children" :key="subChild.id" class="mt-1">
                    <Link
                      :href="route('categories.show', { category: subChild.slug })"
                      :class="getLinkClasses(`/categories/${subChild.slug}`)"
                      class="block py-1 text-xs text-gray-500"
                    >
                      {{ subChild.name }}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Modals/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';

const { props, url } = usePage();
const categories = ref(props.categories || []);
const writes = ref(props.writes || []);
const parentCategories = ref([]);
const showCategories = ref(true);
const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
const toggleSidebar = () => {
  showCategories.value = !showCategories.value;
};

const getLinkClasses = (href) => {
  return url === href
    ? 'px-4 border-l-4 text-gray-800 border-primary-500 bg-primary-100 shadow-inner hover:bg-primary-100'
    : 'px-4 bg-white text-gray-800';
};

const calculateCategoryCounts = () => {
  const counts = {};
  writes.value.forEach((write) => {
    if (write.category_id) {
      counts[write.category_id] = (counts[write.category_id] || 0) + 1;
    }
  });

  categories.value.forEach((category) => {
    category.writeCount = counts[category.id] || 0;
  });
};

const buildCategoryTree = () => {
  const map = {};
  const roots = [];

  categories.value.forEach((category) => {
    map[category.id] = { ...category, children: [] };
  });

  categories.value.forEach((category) => {
    if (category.parent_id) {
      map[category.parent_id]?.children.push(map[category.id]);
    } else {
      roots.push(map[category.id]);
    }
  });

  parentCategories.value = roots;
};

onMounted(() => {
  calculateCategoryCounts();
  buildCategoryTree();
});
</script>
