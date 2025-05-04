<template>
  <CheckScreen>
    <div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200">
      <div class="card-body p-4 sm:p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex-1">
            <h1
              v-if="auth.user"
              @click="editCategory"
              class="cursor-pointer text-xl font-bold hover:opacity-80 sm:text-2xl"
            >
              {{ category.name }}
              <span class="badge badge-outline ml-2">{{ category.writes_count || writes.length }} yazı</span>
            </h1>
            <h1 v-else class="text-xl font-bold sm:text-2xl">
              {{ category.name }}
              <span class="badge badge-outline ml-2">{{ category.writes_count || writes.length }} yazı</span>
            </h1>
          </div>
          <div class="flex gap-2">
            <button
              @click="toggleView"
              class="btn btn-ghost btn-sm"
              :title="isGridView ? 'Liste Görünümü' : 'Kart Görünümü'"
            >
              <svg
                v-if="isGridView"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="divider my-2"></div>

        <!-- Grid View -->
        <div v-if="isGridView" class="grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="write in writes"
            :key="write.id"
            class="card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md"
          >
            <figure v-if="write.cover_image">
              <img
                :src="write.cover_image || 'https://via.placeholder.com/300x200'"
                alt="Kapak Resmi"
                class="h-40 w-full object-cover"
              />
            </figure>
            <div class="card-body p-4">
              <Link
                :href="
                  route('categories.showByCategory', {
                    category: category.slug,
                    slug: write.slug,
                  })
                "
                class="hover:text-primary"
              >
                <h2 class="card-title text-base sm:text-lg">{{ write.title }}</h2>
                <p class="mt-2 text-xs opacity-70 sm:text-sm">{{ truncateSummary(write.meta_description) }}</p>
                <div class="card-actions mt-3 justify-end">
                  <div class="badge badge-outline badge-sm">{{ formatDate(write.published_at) }}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-3 sm:space-y-4">
          <div
            v-for="write in writes"
            :key="write.id"
            class="card border border-base-200 bg-base-100 p-3 shadow-sm transition-all hover:shadow-md sm:p-4"
          >
            <div class="card-body p-0">
              <h2 class="card-title text-base sm:text-lg">
                <Link
                  :href="
                    route('categories.showByCategory', {
                      category: category.slug,
                      slug: write.slug,
                    })
                  "
                  class="hover:text-primary"
                >
                  {{ write.title }}
                </Link>
              </h2>
              <p class="mt-1 text-xs opacity-70 sm:text-sm">{{ truncateSummary(write.meta_description) }}</p>
              <div class="card-actions mt-2 justify-end">
                <div class="badge badge-outline badge-sm">{{ formatDate(write.published_at) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="writes.length === 0" class="alert alert-info mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Bu kategoriye ait yazı bulunmamaktadır.</span>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import GoBackButton from '@/Components/GoBackButton.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

/**
 * Component name definition
 */
defineOptions({
  name: 'ShowCategoryScreen',
});

/**
 * Get category data from page props
 */
const { props } = usePage();
const category = ref(props.category || {});
const writes = ref(props.writes || []);
const auth = props.auth;

const isGridView = ref(false);
const flashSuccess = ref(props.flash?.success);

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Compute category status for display
 */
const categoryStatus = computed(() => {
  return category.value.status === 'public' ? 'Açık' : 'Gizli';
});

/**
 * Navigate to edit page
 */
const editCategory = () => {
  router.visit(route('categories.edit', { category: category.value.slug }));
};

const toggleView = () => {
  isGridView.value = !isGridView.value;
  localStorage.setItem('categoryViewMode', isGridView.value ? 'grid' : 'list');
};

const truncateSummary = (summary) => {
  if (!summary) return 'Açıklama bulunmamaktadır.';
  return summary.length > 100 ? summary.slice(0, 100) + '...' : summary;
};

onMounted(() => {
  // Restore view preference from localStorage
  const savedViewMode = localStorage.getItem('categoryViewMode');
  if (savedViewMode) {
    isGridView.value = savedViewMode === 'grid';
  }

  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});
</script>

<style scoped>
/* Responsive styling */
@media (max-width: 640px) {
  .card-title {
    font-size: 1rem;
    line-height: 1.3;
  }

  .badge {
    font-size: 0.65rem;
  }
}
</style>
