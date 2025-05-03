<template>
  <CheckScreen>
    <div class="mb-5">
      <!-- Mobil ekranlarda başlık ve geri düğmesi düzenlemesi -->
      <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <GoBackButton href="/lessons" />
        <div class="w-full sm:w-auto">
          <h2 class="truncate text-xl font-bold text-primary sm:text-2xl">{{ lesson.title }}</h2>
        </div>
      </div>

      <!-- Card component directly implemented -->
      <div
        class="card mt-5 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
      >
        <div class="card-body p-6">
          <!-- Loading Indicator -->
          <div v-if="loading" class="flex justify-center p-8">
            <span class="loading loading-spinner loading-lg"></span>
          </div>

          <div v-else>
            <div v-if="videos.length === 0" class="p-4">
              <div class="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Bu oynatma listesinde görüntülenecek video bulunamadı.</span>
              </div>
            </div>

            <ul v-else class="divide-y">
              <li v-for="video in videos" :key="video.id" class="py-4 hover:bg-base-100">
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <!-- Video thumbnail -->
                  <div class="relative mb-3 md:mb-0 md:w-1/3">
                    <a
                      :href="`https://www.youtube.com/watch?v=${video.id}`"
                      target="_blank"
                      class="aspect-w-16 aspect-h-9 block overflow-hidden rounded-lg"
                    >
                      <img :src="video.thumbnail" alt="Video thumbnail" class="h-full w-full object-cover" />
                      <div
                        class="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-1 py-0.5 text-xs text-white"
                      >
                        {{ video.duration }}
                      </div>
                    </a>
                  </div>

                  <!-- Video details -->
                  <div class="flex flex-col justify-between md:w-2/3">
                    <div>
                      <h3 class="mb-1 text-base font-medium leading-tight">
                        {{ video.title }}
                      </h3>
                      <div class="mb-3 flex space-x-4 text-xs text-gray-500">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {{ formatNumber(video.viewCount) }} görüntülenme
                        </div>
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          {{ formatNumber(video.likeCount) }}
                        </div>
                      </div>
                    </div>

                    <div class="flex space-x-2">
                      <a
                        :href="`https://www.youtube.com/watch?v=${video.id}`"
                        target="_blank"
                        class="btn btn-primary btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mr-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        İzle
                      </a>
                      <button class="btn btn-outline btn-sm" @click="toggleChecked(video)">
                        <svg
                          v-if="isChecked(video.id)"
                          xmlns="http://www.w3.org/2000/svg"
                          class="mr-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span v-if="isChecked(video.id)">İzlendi</span>
                        <span v-else>İzlenmedi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!-- Pagination - Mobil uyumlu -->
            <div class="flex justify-center overflow-x-auto p-4">
              <div class="join">
                <button
                  :disabled="currentPage === 1"
                  @click="goToPage(1)"
                  class="btn btn-sm join-item"
                  :class="currentPage === 1 ? 'btn-active' : ''"
                >
                  1
                </button>

                <span v-if="currentPage > 3" class="btn btn-disabled btn-sm join-item">...</span>

                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  class="btn btn-sm join-item"
                  :class="currentPage === page ? 'btn-active' : ''"
                >
                  {{ page }}
                </button>

                <span v-if="currentPage < totalPages - 2" class="btn btn-disabled btn-sm join-item">...</span>

                <button
                  v-if="totalPages > 1"
                  :disabled="currentPage === totalPages"
                  @click="goToPage(totalPages)"
                  class="btn btn-sm join-item"
                  :class="currentPage === totalPages ? 'btn-active' : ''"
                >
                  {{ totalPages }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';
import GoBackButton from '@/Components/GoBackButton.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const lesson = ref(props.lesson);
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const playlistId = ref(lesson.value.playlist_id);
const videos = ref([]);
const loading = ref(false);

const currentPage = ref(1);
const nextPageToken = ref(null);
const prevPageToken = ref(null);
const maxResultsPerPage = 10;
const totalVideos = ref(0);

// İzlenen videoların yerel depolamada saklanması
const checkedVideos = ref([]);

onMounted(() => {
  fetchVideos();
  loadCheckedVideos();
});

const loadCheckedVideos = () => {
  const savedCheckedVideos = localStorage.getItem(`checkedVideos_${lesson.value.id}`);
  if (savedCheckedVideos) {
    checkedVideos.value = JSON.parse(savedCheckedVideos);
  }
};

const saveCheckedVideos = () => {
  localStorage.setItem(`checkedVideos_${lesson.value.id}`, JSON.stringify(checkedVideos.value));
};

const isChecked = (videoId) => {
  return checkedVideos.value.includes(videoId);
};

const toggleChecked = (video) => {
  const index = checkedVideos.value.indexOf(video.id);
  if (index === -1) {
    checkedVideos.value.push(video.id);
  } else {
    checkedVideos.value.splice(index, 1);
  }
  saveCheckedVideos();
};

// Rakamları kısaltarak formatla (örn: 1000 -> 1K)
const formatNumber = (numStr) => {
  if (!numStr) return '0';

  const num = parseInt(numStr.replace(/,/g, ''));
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return numStr;
};

const fetchVideos = async (pageToken = '') => {
  loading.value = true;
  videos.value = [];

  try {
    const playlistResponse = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet',
        playlistId: playlistId.value,
        maxResults: maxResultsPerPage,
        pageToken: pageToken,
        key: API_KEY,
      },
    });

    const videoIds = playlistResponse.data.items.map((item) => item.snippet.resourceId.videoId);
    totalVideos.value = playlistResponse.data.pageInfo.totalResults;

    const videoDetailsResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    });

    videos.value = videoDetailsResponse.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount ? item.statistics.viewCount.toLocaleString() : '0',
      likeCount: item.statistics.likeCount ? item.statistics.likeCount.toLocaleString() : '0',
    }));

    nextPageToken.value = playlistResponse.data.nextPageToken || null;
    prevPageToken.value = pageToken ? pageToken : null;
  } catch (error) {
    console.error('Error fetching videos:', error);
  } finally {
    loading.value = false;
  }
};

const totalPages = computed(() => Math.ceil(totalVideos.value / maxResultsPerPage));

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;

  if (currentPage.value > 2 && currentPage.value < total - 1) {
    for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
      pages.push(i);
    }
  } else if (currentPage.value <= 2) {
    for (let i = 2; i <= Math.min(3, total - 1); i++) {
      pages.push(i);
    }
  } else if (currentPage.value >= total - 1) {
    for (let i = Math.max(total - 2, 2); i < total; i++) {
      pages.push(i);
    }
  }

  return pages;
});

const goToPage = (page) => {
  currentPage.value = page;
  fetchVideos(page === 1 ? '' : nextPageToken.value);
};

const parseDuration = (isoDuration) => {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = isoDuration.match(regex);
  const hours = matches[1] ? matches[1].slice(0, -1) : '00';
  const minutes = matches[2] ? matches[2].slice(0, -1).padStart(2, '0') : '00';
  const seconds = matches[3] ? matches[3].slice(0, -1).padStart(2, '0') : '00';
  return hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};
</script>

<style scoped>
/* Mobil görünüm için yatay scroll stilini düzenle */
@media (max-width: 768px) {
  .overflow-x-auto::-webkit-scrollbar {
    height: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .overflow-x-auto::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* Badge'ler arası boşluk */
  .badge {
    margin-right: 8px;
  }
}
</style>
