<template>
  <div class="grid grid-cols-1 p-5 leading-loose">
    <div>
      <div class="rounded-lg bg-white p-3 shadow-lg">
        <!-- Skeleton Loader -->
        <div v-if="loading" class="space-y-4">
          <div v-for="n in 10" :key="n" class="flex animate-pulse items-center space-x-4">
            <div class="h-28 w-40 flex-shrink-0 rounded-lg bg-gray-200 md:w-52"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 w-3/4 rounded bg-gray-200"></div>
              <div class="h-4 w-1/2 rounded bg-gray-200"></div>
              <div class="h-4 w-1/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <!-- Video List -->
        <ul v-else class="mt-6 space-y-4">
          <li
            v-for="video in videos"
            :key="video.id"
            class="flex flex-col items-start rounded-lg bg-gray-100 p-4 shadow-sm md:flex-row md:items-center"
          >
            <div class="mb-4 h-28 w-full flex-shrink-0 md:mb-0 md:w-40 lg:w-52">
              <img
                :src="video.thumbnail"
                alt="Video Thumbnail"
                class="h-full w-full rounded-lg object-cover shadow-sm"
              />
            </div>
            <div class="w-full md:px-12">
              <a
                :href="`https://www.youtube.com/watch?v=${video.id}`"
                target="_blank"
                class="text-md font-semibold text-gray-800 hover:underline md:text-lg"
              >
                {{ video.title }}
              </a>
              <p class="text-sm text-gray-500">Süre: {{ video.duration }}</p>
              <p class="text-sm text-gray-500">Görüntülenme: {{ video.viewCount }}</p>
              <p class="text-sm text-gray-500">Beğeniler: {{ video.likeCount }}</p>
            </div>
          </li>
        </ul>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-center space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(1)"
            class="rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"
            :class="currentPage === 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'"
          >
            1
          </button>

          <span v-if="currentPage > 3">...</span>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"
            :class="currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'"
          >
            {{ page }}
          </button>

          <span v-if="currentPage < totalPages - 2">...</span>

          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)"
            class="rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"
            :class="currentPage === totalPages ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'"
          >
            {{ totalPages }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';

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

onMounted(() => {
  fetchVideos();
});

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
      thumbnail: item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount.toLocaleString(),
      likeCount: item.statistics.likeCount.toLocaleString(),
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
  const minutes = matches[2] ? matches[2].slice(0, -1) : '00';
  const seconds = matches[3] ? matches[3].slice(0, -1) : '00';
  return `${hours}:${minutes}:${seconds}`;
};
</script>
