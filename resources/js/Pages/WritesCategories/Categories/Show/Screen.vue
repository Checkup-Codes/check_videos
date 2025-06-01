<template>
  <CheckScreen>
    <div class="p-4 sm:p-6">
      <!-- Kategori Başlığı ve Admin Kontrolleri -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex-1">
          <h1 class="text-xl font-bold sm:text-2xl">
            {{ category.name }}
            <span class="badge badge-outline ml-2">{{ category.writes_count || writes.length }} yazı</span>
            <span v-if="category.status === 'private'" class="badge badge-warning ml-2">Gizli</span>
          </h1>
          <p v-if="category.description" class="mt-2 text-sm text-gray-600">{{ category.description }}</p>
        </div>

        <!-- Admin Kontrolleri -->
        <div v-if="auth.user" class="flex gap-2">
          <button @click="editCategory" class="btn btn-outline btn-sm" title="Kategoriyi Düzenle">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Düzenle
          </button>
          <Link :href="route('writes.create', { category: category.id })" class="btn btn-primary btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Yeni Yazı
          </Link>
        </div>
      </div>

      <div class="divider my-2"></div>

      <!-- Liste Görünümü -->
      <div class="space-y-4">
        <div
          v-for="write in paginatedWrites"
          :key="write.id"
          class="card border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md"
        >
          <div class="card-body p-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
              <!-- Kapak Resmi -->
              <div v-if="write.cover_image" class="flex-shrink-0">
                <img
                  :src="write.cover_image"
                  alt="Kapak Resmi"
                  class="h-20 w-20 rounded-lg object-cover sm:h-16 sm:w-24"
                  loading="lazy"
                  :srcset="`${write.cover_image} 1x, ${write.cover_image} 2x`"
                />
              </div>

              <!-- İçerik -->
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between">
                  <div class="min-w-0 flex-1">
                    <Link
                      :href="
                        route('categories.showByCategory', {
                          category: category.slug,
                          slug: write.slug,
                        })
                      "
                      class="hover:text-primary"
                    >
                      <div class="mb-2 flex items-center gap-2">
                        <!-- Durum İkonları -->
                        <span v-if="write.status === 'link_only'" class="text-primary" title="Dış Bağlantı">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span v-if="write.status === 'private'" class="text-warning" title="Gizli Yazı">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
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
                        <span v-if="write.status === 'draft'" class="text-gray-500" title="Taslak">
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </span>

                        <h3 class="truncate text-lg font-semibold">{{ write.title }}</h3>
                      </div>

                      <p class="mb-2 line-clamp-2 text-sm text-gray-600">
                        {{ truncateSummary(write.meta_description || write.summary) }}
                      </p>
                    </Link>

                    <!-- Meta Bilgiler -->
                    <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span class="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ formatDate(write.published_at || write.created_at) }}
                      </span>

                      <span v-if="write.reading_time" class="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {{ write.reading_time }} dk okuma
                      </span>

                      <span class="badge badge-outline badge-xs">
                        {{ getStatusText(write.status) }}
                      </span>
                    </div>
                  </div>

                  <!-- Admin Yazı Kontrolleri -->
                  <div v-if="auth.user" class="ml-4 flex flex-col gap-1">
                    <Link :href="route('writes.edit', write.id)" class="btn btn-ghost btn-xs" title="Yazıyı Düzenle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button @click="deleteWrite(write)" class="btn btn-ghost btn-xs text-error" title="Yazıyı Sil">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-center">
        <div class="join">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="['btn btn-sm join-item', currentPage === page ? 'btn-primary' : 'btn-outline']"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <!-- Boş Durum -->
      <div v-if="filteredWrites.length === 0" class="alert alert-info mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Bu kategoriye ait {{ auth.user ? 'yazı' : 'yayınlanmış yazı' }} bulunmamaktadır.</span>
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

// Pagination
const itemsPerPage = 10;
const currentPage = ref(1);

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
 * Paginated writes
 */
const paginatedWrites = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredWrites.value.slice(start, end);
});

/**
 * Total number of pages
 */
const totalPages = computed(() => {
  return Math.ceil(filteredWrites.value.length / itemsPerPage);
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

/**
 * Get status text for display
 * @param {string} status - Write status
 * @returns {string} Status text in Turkish
 */
const getStatusText = (status) => {
  const statusMap = {
    published: 'Yayında',
    draft: 'Taslak',
    private: 'Gizli',
    link_only: 'Dış Bağlantı',
  };
  return statusMap[status] || status;
};

/**
 * Delete write with confirmation
 * @param {Object} write - Write object to delete
 */
const deleteWrite = (write) => {
  if (confirm(`"${write.title}" yazısını silmek istediğinizden emin misiniz?`)) {
    router.delete(route('writes.destroy', write.id), {
      preserveScroll: true,
      onSuccess: () => {
        // Remove from local array to update UI immediately
        const index = writes.value.findIndex((w) => w.id === write.id);
        if (index > -1) {
          writes.value.splice(index, 1);
        }
      },
      onError: (errors) => {
        console.error('Yazı silinirken hata oluştu:', errors);
        alert('Yazı silinirken bir hata oluştu.');
      },
    });
  }
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
/* Line clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive styling */
@media (max-width: 640px) {
  .card-title {
    font-size: 1rem;
    line-height: 1.3;
  }

  .badge {
    font-size: 0.65rem;
  }

  /* Stack admin controls vertically on mobile */
  .admin-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Hover effects */
.card:hover {
  transform: translateY(-1px);
}

/* Admin button styling */
.btn-xs {
  min-height: 1.5rem;
  height: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
}

/* Status icon styling */
.status-icon {
  flex-shrink: 0;
}

/* Truncate text utility */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
