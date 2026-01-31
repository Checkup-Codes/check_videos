<template>
  <LayoutWritesCategories>
    <template #screen>
      <CheckScreen>
        <div class="py-8">
          <!-- Search Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-foreground">Arama Sonuçları</h1>
            <p class="mt-2 text-lg text-muted-foreground">
              "<span class="font-semibold text-foreground">{{ searchQuery }}</span>" için
              <span class="font-semibold text-primary">{{ articles.total }}</span> yazı ve
              <span class="font-semibold text-primary">{{ categories.length }}</span> kategori bulundu
            </p>
          </div>

          <!-- Categories Section -->
          <div v-if="categories.length > 0" class="mb-8">
            <h2 class="mb-4 text-xl font-semibold text-foreground">Kategoriler</h2>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <Link
                v-for="category in categories"
                :key="category.id"
                :href="category.url"
                class="flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span class="truncate text-sm font-medium text-card-foreground">{{ category.name }}</span>
              </Link>
            </div>
          </div>

          <!-- Articles Section -->
          <div>
            <h2 class="mb-4 text-xl font-semibold text-foreground">Yazılar</h2>
            
            <!-- No Results -->
            <div v-if="articles.data.length === 0" class="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mb-4 h-16 w-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 class="mb-2 text-lg font-semibold text-foreground">Sonuç Bulunamadı</h3>
              <p class="text-sm text-muted-foreground">
                "{{ searchQuery }}" için hiçbir yazı bulunamadı. Farklı anahtar kelimeler deneyin.
              </p>
            </div>

            <!-- Articles Grid -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link
                v-for="article in articles.data"
                :key="article.id"
                :href="article.url"
                class="group flex flex-col rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
              >
                <div class="flex flex-1 flex-col p-6">
                  <!-- Category Badge -->
                  <div v-if="article.category" class="mb-3">
                    <span class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {{ article.category.name }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary" v-html="highlightText(article.title)"></h3>

                  <!-- Excerpt -->
                  <p class="mb-4 line-clamp-3 text-sm text-muted-foreground" v-html="highlightText(article.excerpt)"></p>

                  <!-- Footer -->
                  <div class="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span v-if="article.published_at">{{ formatDate(article.published_at) }}</span>
                    <span class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Devamını Oku
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <!-- Pagination -->
            <div v-if="articles.data.length > 0 && (articles.prev_page_url || articles.next_page_url)" class="mt-8 flex items-center justify-center gap-2">
              <Link
                v-if="articles.prev_page_url"
                :href="articles.prev_page_url"
                class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Önceki
              </Link>
              
              <span class="text-sm text-muted-foreground">
                Sayfa {{ articles.current_page }} / {{ articles.last_page }}
              </span>
              
              <Link
                v-if="articles.next_page_url"
                :href="articles.next_page_url"
                class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sonraki
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </CheckScreen>
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  articles: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  screen: {
    type: Object,
    default: () => ({})
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const highlightText = (text) => {
  if (!text || !props.searchQuery) return text;
  
  const query = props.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${query})`, 'gi');
  const highlightClass = 'bg-primary/20 text-primary font-medium px-0.5 rounded';
  return text.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>
