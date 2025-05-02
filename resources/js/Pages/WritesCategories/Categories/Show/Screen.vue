<template>
  <CheckScreen>
    <Card elevated>
      <div class="mb-4 flex items-center justify-between">
        <div class="flex-1">
          <h1
            v-if="auth.user"
            @click="editCategory"
            class="text-base-contentx cursor-pointer text-2xl font-bold hover:opacity-80"
          >
            {{ category.name }} <span class="badge badge-outline ml-2">{{ writes.length }} yazı</span>
          </h1>
          <h1 v-else class="text-2xl font-bold">
            {{ category.name }} <span class="badge badge-outline ml-2">{{ writes.length }} yazı</span>
          </h1>
        </div>
        <!--
        <div class="flex gap-2">
          <Button
            @click="toggleView"
            variant="ghost"
            size="sm"
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
          </Button>
        </div>
        -->
      </div>

      <div class="divider my-2"></div>

      <div v-if="isGridView" class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div
          v-for="write in writes"
          :key="write.id"
          class="card card-compact bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <figure>
            <img
              :src="write.cover_image || 'https://via.placeholder.com/300x200'"
              alt="Kapak Resmi"
              class="h-48 w-full object-cover"
            />
          </figure>
          <div class="card-body">
            <Link
              :href="
                route('categories.showByCategory', {
                  category: category.slug,
                  slug: write.slug,
                })
              "
            >
              <h2 class="card-title">{{ write.title }}</h2>
              <p class="text-sm opacity-80">{{ truncateSummary(write.meta_description) }}</p>
              <div class="card-actions mt-3 justify-end">
                <div class="badge badge-outline">{{ formatDate(write.published_at) }}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <!-- Liste Görünümü -->
      <div v-else class="space-y-4">
        <div
          v-for="write in writes"
          :key="write.id"
          class="card card-side bg-base-100 shadow-md transition-shadow hover:shadow-lg"
        >
          <div class="card-body">
            <h2 class="card-title">
              <Link
                :href="
                  route('categories.showByCategory', {
                    category: category.slug,
                    slug: write.slug,
                  })
                "
              >
                {{ write.title }}
              </Link>
            </h2>
            <p class="text-sm opacity-80">{{ truncateSummary(write.meta_description) }}</p>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">{{ formatDate(write.published_at) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="writes.length === 0" class="alert alert-info mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Bu kategoriye ait yazı bulunmamaktadır.</span>
      </div>
    </Card>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import { Card, Button } from '@/Pages/WritesCategories/_components';

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
  return new Date(dateString).toLocaleDateString('tr-TR', options);
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

<style scoped>
.badge-outline {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  vertical-align: middle;
}
</style>
