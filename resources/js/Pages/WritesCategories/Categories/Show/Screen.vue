<template>
  <CheckScreen>
    <TopScreen :title="category.name" />

    <div v-if="auth.user" class="mx-5 text-right">
      <Button @click="editCategory"> Kategoriyi düzenle </Button>
    </div>

    <div class="h-[calc(84vh)] w-full max-w-full overflow-y-scroll rounded-lg bg-white p-5">
      <div v-if="isGridView" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div
          v-for="write in writes"
          :key="write.id"
          class="rounded-lg border bg-gray-100 shadow transition hover:shadow-lg"
        >
          <Link :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })">
            <img
              :src="write.cover_image || 'https://via.placeholder.com/300x200'"
              alt="Kapak Resmi"
              class="h-48 w-full rounded-t-lg object-cover"
            />
            <div class="p-4">
              <h3 class="mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600">
                {{ write.title }}
              </h3>
              <p class="mb-3 text-sm text-gray-600">{{ truncateSummary(write.meta_description) }}</p>
              <div class="flex justify-between text-sm text-gray-500">
                <!-- <span>Yazar: Yakup Sarı</span> -->
                <span>{{ formatDate(write.published_at) }}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <!-- Liste Görünümü -->
      <div v-else class="space-y-4">
        <div
          v-for="write in writes"
          :key="write.id"
          class="flex items-center space-x-4 rounded-lg border bg-gray-50 p-4 shadow hover:shadow-md"
        >
          <!-- <img
            :src="write.cover_image || 'https://via.placeholder.com/150x100'"
            alt="Kapak Resmi"
            class="h-24 w-32 rounded object-cover"
          /> -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600">
              <Link :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })">
                {{ write.title }}
              </Link>
            </h3>
            <p class="mt-2 text-sm text-gray-600">{{ truncateSummary(write.meta_description) }}</p>
            <div class="mt-2 text-sm text-gray-500">
              <!-- <span>Yazar: Yakup Sarı</span> -->
              <span class="">{{ formatDate(write.published_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="writes.length === 0" class="mt-6 text-center text-gray-500">
        Bu kategoriye ait yazı bulunmamaktadır.
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

const { props } = usePage();
const writes = ref(props.writes || []);
const category = ref(props.category);
const auth = props.auth;

const isGridView = ref(false);
const flashSuccess = ref(props.flash.success);

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

const editCategory = () => {
  if (category.value?.id) {
    const editUrl = `/categories/${category.value.id}/edit`;
    window.location.href = editUrl;
  } else {
    console.error('Kategori ID bulunamadı.');
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const truncateSummary = (summary) => {
  if (!summary) return 'Açıklama bulunmamaktadır.';
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
