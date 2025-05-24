import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function useCategoryTree() {
  const { props, url } = usePage();
  const categories = ref(props.categories || []);
  const parentCategories = ref([]);
  const areAllCategoriesExpanded = ref(false);

  // Build hierarchical category tree from flat list
  const buildCategoryTree = () => {
    if (!categories.value || !categories.value.length) {
      parentCategories.value = [];
      return;
    }

    const map = {};
    const roots = [];

    // Create map of categories with empty children arrays
    categories.value.forEach((category) => {
      if (category && category.id) {
        map[category.id] = { ...category, children: [] };
      }
    });

    // Populate children arrays and identify root categories
    categories.value.forEach((category) => {
      if (!category) return;

      if (category.parent_id && map[category.parent_id]) {
        map[category.parent_id]?.children.push(map[category.id]);
      } else if (!category.parent_id) {
        roots.push(map[category.id]);
      }
    });

    parentCategories.value = roots;
  };

  // Determine active link style based on current URL
  const getLinkClasses = (href) => {
    return url === href ? 'font-medium !text-primary' : '';
  };

  // Toggle expansion state of all categories
  const toggleAllCategories = () => {
    areAllCategoriesExpanded.value = !areAllCategoriesExpanded.value;
  };

  onMounted(() => {
    buildCategoryTree();
  });

  return {
    categories,
    parentCategories,
    areAllCategoriesExpanded,
    getLinkClasses,
    toggleAllCategories
  };
} 