<template>
  <CheckScreen>
    <div class="mb-5">
      <!-- Mobil ekranlarda başlık ve geri düğmesi düzenlemesi -->
      <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <GoBackButton href="/lessons" />
        <div class="w-full sm:w-auto">
          <h2 class="text-primary truncate text-xl font-bold sm:text-2xl">{{ lesson.title }}</h2>
        </div>
      </div>

      <Card class="card-compact mt-5 w-full shadow-md">
        <div v-if="loading" class="space-y-4 p-4">
          <div v-for="n in 3" :key="n" class="flex animate-pulse items-center space-x-4">
            <div class="bg-base-200 h-28 w-40 flex-shrink-0 rounded-lg md:w-52"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="bg-base-200 h-4 w-3/4 rounded"></div>
              <div class="bg-base-200 h-4 w-1/2 rounded"></div>
            </div>
          </div>
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

          <ul v-else class="divide-base-200 divide-y">
            <li v-for="video in videos" :key="video.id" class="hover:bg-base-100 p-4">
              <!-- Mobil ekranlarda video kartı tasarımı -->
              <div class="flex flex-col md:flex-row md:items-center">
                <div class="mb-3 h-auto w-full md:mb-0 md:h-28 md:w-40 lg:w-52">
                  <img
                    :src="video.thumbnail"
                    alt="Video Thumbnail"
                    class="h-full w-full rounded-lg object-cover shadow-sm"
                  />
                </div>
                <div class="w-full md:px-6">
                  <a
                    :href="`https://www.youtube.com/watch?v=${video.id}`"
                    target="_blank"
                    class="link link-hover link-primary text-base font-medium md:text-lg"
                  >
                    {{ video.title }}
                  </a>

                  <!-- Mobil için badge'ler yatay scroll ile -->
                  <div
                    class="mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0"
                  >
                    <span class="badge badge-neutral whitespace-nowrap">{{ video.duration }}</span>
                    <span class="badge badge-neutral whitespace-nowrap"
                      >{{ formatNumber(video.viewCount) }} görüntülenme</span
                    >
                    <span class="badge badge-neutral whitespace-nowrap"
                      >{{ formatNumber(video.likeCount) }} beğeni</span
                    >
                  </div>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <a
                      :href="`https://www.youtube.com/watch?v=${video.id}`"
                      target="_blank"
                      class="btn btn-sm btn-primary"
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
                    <button class="btn btn-sm btn-outline" @click="toggleChecked(video)">
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
                class="join-item btn btn-sm"
                :class="currentPage === 1 ? 'btn-active' : ''"
              >
                1
              </button>

              <span v-if="currentPage > 3" class="join-item btn btn-sm btn-disabled">...</span>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                class="join-item btn btn-sm"
                :class="currentPage === page ? 'btn-active' : ''"
              >
                {{ page }}
              </button>

              <span v-if="currentPage < totalPages - 2" class="join-item btn btn-sm btn-disabled">...</span>

              <button
                v-if="totalPages > 1"
                :disabled="currentPage === totalPages"
                @click="goToPage(totalPages)"
                class="join-item btn btn-sm"
                :class="currentPage === totalPages ? 'btn-active' : ''"
              >
                {{ totalPages }}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </CheckScreen>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';
import GoBackButton from '@/Components/GoBackButton.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import Card from '@/Pages/WritesCategories/_components/Card.vue';

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
