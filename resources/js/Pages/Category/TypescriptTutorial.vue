<template>
  <h1 class="p-5 text-2xl">Aktif Kategori: Typescript Tutorial</h1>
  <div class="grid grid-cols-2 p-5 leading-loose">
    <div>
      <h3 class="text-xl">Adımlar</h3>
      <div class="my-3 w-11/12 rounded bg-gray-50 p-3">
        <div class="rounded p-2">
          <h4 class="py-1">Adım 1</h4>
          <div class="w-full bg-white p-2">Video İsmi</div>
          <h4 class="py-1">Uzun Açıklama</h4>
          <div class="w-full bg-white p-2">
            Array nedir ve ts'de yeri nedir bu video bunlardan bahsettik.
            <br /><br />
            ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br />
            Merhaba! Kanalıma hoş geldiniz! Bu eğitim serisinde amacımız, sıfırdan TypeScript öğrenmek ve birlikte
            gerçek dünya projeleri geliştirmek. Ben bir profesyonel eğitimci olmayabilirim, ancak öğreterek öğrenme
            metoduyla kendimi geliştiriyorum ve bu süreçte sizlere de yardımcı olabilmek beni mutlu ediyor. Bu eğitim
            serisinde, TypeScript'in temellerinden başlayarak adım adım ilerleyeceğiz. TypeScript'i neden kullanmanız
            gerektiğini anlatacak, nasıl kurulacağını ve temel özelliklerini öğreneceğiz. Ardından, gerçek dünya
            projeleri üzerinde birlikte çalışarak, Mobil, Masaüstü, Web ve Mobil Uygulamalar geliştireceğiz. Eğer web
            geliştirmeye yeni başlıyorsanız veya TypeScript'i daha iyi anlamak istiyorsanız, bu eğitim serisi tam size
            göre! Sadece öğreterek öğrenme metoduyla ilerleyeceğiz, böylece birlikte projeler geliştirirken hem siz
            öğrenecek hem de ben kendimi geliştireceğim. Bu seriyi izledikten sonra, TypeScript'i kullanarak gerçek
            dünya projelerine başlayabilecek, farklı platformlarda uygulamalar geliştirebilecek ve kendinizi geliştirme
            yolculuğunuzda önemli bir adım atmış olacaksınız. Videoları beğenmeyi ve kanalıma abone olmayı unutmayın,
            böylece yeni videolarımdan haberdar olabilirsiniz. Sizlere yardımcı olabilmek ve birlikte öğrenmek için
            sabırsızlanıyorum! Haydi, hemen başlayalım ve birlikte TypeScript'in büyülü dünyasına adım atalım!
            <br /><br />
            ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br />
            Laravel Oynatma Listemiz : • Laravel Bootcamp Ekranda yazdığım kodların kaynak dosyası :
            <br /><br />
            ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br />
            ⭐️ Timestamps ⭐️ 00:00 | İntro 00:03 | Neden kullanırız 01:10 | Konuya Giriş 05:40 | Örnek verelim 09:30 |
            Son
            <br /><br />
            ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br />
            💙💙💙<br />
            ⭐ Discord: / discord <br />
            📝LinkedIn: / cekap 🌎 Website:
            <br />

            💙💙💙 Cekap <br />
            📸 Instagram : / cekapykp <br />
            📱 Twitter: / cekapykp <br />
            📂 GitHub: https://github.com/cekapykp <br />
            <br /><br />
            ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ <br />
            ⭐️ Tags ⭐️ <br />
            -TypeScript -TypeScript nedir -TypeScript avantajları -TypeScript kurulumu -TypeScript öğreniyoruz
            -TypeScript tutorial -TypeScript bootcamp -TypeScript framework
            <br /><br />
            ⭐️ Hashtags⭐️ <br />
            #typescript #typescripttutorial #typescriptbootcamp
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- Keywords Girişi -->
      <div class="mb-6 rounded-lg bg-white p-6 shadow-lg">
        <h2 class="mb-4 text-2xl font-semibold">Keywords</h2>
        <div>
          <textarea
            v-model="keywords"
            class="h-40 w-full rounded border bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Keywordleri virgülle ayrılmış şekilde girin"
            rows="4"
          ></textarea>
          <div class="flex justify-end">
            <button
              @click="copyToClipboard"
              class="mt-3 w-1/3 rounded bg-indigo-600 py-2 text-white transition-all hover:bg-indigo-500"
            >
              Kopyala
            </button>
          </div>
        </div>
      </div>

      <!-- YouTube Playlist Videos -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h1 class="mb-4 text-2xl font-semibold">YouTube Playlist Videos</h1>
        <input
          v-model="playlistId"
          class="mb-4 w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="YouTube Playlist ID girin"
        />
        <div class="flex justify-end">
          <button
            @click="fetchVideos"
            class="w-1/3 rounded bg-indigo-600 py-2 text-white transition-all hover:bg-indigo-500"
          >
            Fetch Videos
          </button>
        </div>
        <div v-if="loading" class="text-indigo-500">Yükleniyor...</div>
        <ul class="video-list mt-6 space-y-4">
          <li v-for="video in videos" :key="video.id" class="flex items-center rounded-lg bg-gray-50 p-4 shadow-sm">
            <img
              :src="video.thumbnail"
              alt="Video Thumbnail"
              class="mr-4 h-20 w-36 rounded-lg object-cover shadow-sm"
            />
            <div>
              <a
                :href="`https://www.youtube.com/watch?v=${video.id}`"
                target="_blank"
                class="text-lg font-semibold text-indigo-600 hover:underline"
              >
                {{ video.title }}
              </a>
              <p class="text-sm text-gray-500">Süre: {{ video.duration }}</p>
              <p class="text-sm text-gray-500">Görüntülenme: {{ video.viewCount }}</p>
              <p class="text-sm text-gray-500">Beğeniler: {{ video.likeCount }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const playlistId = ref('PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l');
const videos = ref([]);
const loading = ref(false);

const fetchVideos = async () => {
  if (!playlistId.value) {
    alert('Lütfen Playlist ID girin');
    return;
  }

  loading.value = true;
  videos.value = [];

  try {
    let nextPageToken = '';
    const videoIds = [];
    // Fetch video IDs from playlist
    do {
      const response = await axios.get(`${BASE_URL}/playlistItems`, {
        params: {
          part: 'snippet',
          playlistId: playlistId.value,
          maxResults: 50,
          pageToken: nextPageToken,
          key: API_KEY,
        },
      });

      response.data.items.forEach((item) => {
        videoIds.push(item.snippet.resourceId.videoId);
      });

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    // Fetch video details, including statistics for view count and like count
    const videoDetails = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    });

    videos.value = videoDetails.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      duration: parseDuration(item.contentDetails.duration),
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    alert('Error fetching videos');
  } finally {
    loading.value = false;
  }
};

// Parse ISO 8601 duration format to human-readable format
const parseDuration = (isoDuration) => {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = isoDuration.match(regex);
  const hours = matches[1] ? matches[1].slice(0, -1) : '00';
  const minutes = matches[2] ? matches[2].slice(0, -1) : '00';
  const seconds = matches[3] ? matches[3].slice(0, -1) : '00';
  return `${hours}:${minutes}:${seconds}`;
};

const keywords = ref(
  'yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım öğrenme kitapları, yazılım öğrenme videoları, yazılım öğrenme uygulamaları, yazılım öğrenme yolları, yazılım öğrenme siteleri, yazılım öğrenme platformları, yazılım'
);

const copyToClipboard = () => {
  navigator.clipboard.writeText(keywords.value);
  alert('Keywordler kopyalandı!');
};
</script>

<style>
textarea {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
}
.video-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.video-list img {
  margin-right: 1rem;
  width: 100px;
  height: 75px;
  object-fit: cover;
}
.video-list a {
  font-weight: bold;
}
.video-list p {
  margin: 0.25rem 0;
}
</style>
