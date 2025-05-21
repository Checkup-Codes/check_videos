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
        </div>

        <div class="divider my-2"></div>

        <!-- Grid View -->
        <div class="grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="write in filteredWrites"
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
                <div class="flex items-center gap-2">
                  <span v-if="write.status === 'link_only'" class="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span v-if="write.status === 'private'" class="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <h2 class="card-title text-base sm:text-lg">{{ write.title }}</h2>
                </div>
                <p class="mt-2 text-xs opacity-70 sm:text-sm">{{ truncateSummary(write.meta_description) }}</p>
                <div class="card-actions mt-3 justify-end">
                  <div class="badge badge-outline badge-sm">{{ formatDate(write.published_at) }}</div>
                </div>
              </Link>
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
import { usePage, Link, router } from '@inertiajs/vue3';
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
const flashSuccess = ref(props.flash?.success);

/**
 * Filter writes based on user role and status
 */
const filteredWrites = computed(() => {
  if (auth.user) {
    // Admin can see all writes
    return writes.value;
  } else {
    // Regular users can only see published writes
    return writes.value.filter((write) => write.status === 'published');
  }
});

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
  router.visit(route('categories.edit', { category: category.value.id }));
};

const truncateSummary = (summary) => {
  if (!summary) return 'Açıklama bulunmamaktadır.';

  // Eğer içerik HTML etiketleri içeriyorsa, temizleyerek metin olarak işle
  if (summary.includes('<') && summary.includes('>')) {
    // Geçici bir div oluştur ve HTML'i yükle
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = summary;

    // Düz metni çıkar
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    // Metni kısalt
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  }

  // HTML içermeyen düz metin için doğrudan kısalt
  return summary.length > 100 ? summary.slice(0, 100) + '...' : summary;
};

onMounted(() => {
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

/* Quill specific styles for truncated content */
:deep(.ql-align-right) {
  text-align: right;
}

:deep(.ql-align-center) {
  text-align: center;
}

:deep(.ql-align-justify) {
  text-align: justify;
}

:deep(.ql-font-monospace) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

:deep([style*='color:']) {
  /* Colors are handled by inline styles */
}

:deep([style*='background-color:']) {
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
}
</style>
