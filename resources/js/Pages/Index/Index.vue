<template>
  <div class="min-h-screen bg-gray-100">
    <header class="flex h-screen items-center justify-center bg-gray-100 text-black">
      <div class="text-center">
        <h2 class="animate__animated animate__fadeInDown mb-4 text-4xl font-bold">Check-up Codes</h2>
        <p class="animate__animated animate__fadeInUp mb-6 text-lg">
          Yolculuğumu Takip Edin, En Güncel İçeriklerle Güncel Kalın.
        </p>
      </div>
    </header>
  </div>
</template>

<script setup></script>

<style scoped></style>

<!-- <template>
  <div class="container mx-auto py-8">
    <h2 class="mb-6 text-center text-3xl font-bold">My YouTube Playlist</h2>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="video in videos"
        :key="video.id"
        class="animate__animated animate__fadeInUp m-4 w-full max-w-sm overflow-hidden rounded-lg shadow-md lg:flex lg:max-w-full"
      >
        <div
          class="flex-none bg-cover bg-center"
          :style="{ backgroundImage: `url(${video.snippet.thumbnails.medium.url})` }"
          style="width: 200px; height: 150px"
        ></div>
        <div class="flex flex-col justify-between bg-white p-4 leading-normal">
          <div class="mb-8">
            <p class="flex items-center text-sm text-gray-600">
              {{ video.snippet.channelTitle }}
            </p>
            <div class="mb-2 text-xl font-bold text-gray-900">
              {{ video.snippet.title }}
            </div>
            <p class="text-base text-gray-700"></p>
          </div>
          <div class="flex items-center">
            <button
              @click="openVideo(video.id)"
              class="rounded-md bg-blue-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-700"
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const playlistId = ref('PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l');
const videos = ref([]);
const loading = ref(false);

const fetchVideos = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId.value}&maxResults=10&key=${API_KEY}`
    );
    const data = await response.json();
    videos.value = data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
  } finally {
    loading.value = false;
  }
};

const openVideo = (videoId) => {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
};

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.container {
  padding: 1rem;
}
</style> -->
