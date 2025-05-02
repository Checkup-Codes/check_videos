<template>
  <CheckScreen>
    <div class="mb-5">
      <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <GoBackButton href="/lessons" />
        <div class="w-full sm:w-auto">
          <h2 class="text-primary truncate text-xl font-bold sm:text-2xl">Yeni Ders Ekle</h2>
        </div>
      </div>

      <Card class="card-compact mt-5 w-full shadow-md">
        <form @submit.prevent="form.post('/lessons')" class="p-4">
          <div class="form-control mb-4 w-full">
            <label for="title" class="label">
              <span class="label-text font-medium">Ders Başlığı</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              id="title"
              placeholder="Ders başlığını girin"
              class="input input-bordered w-full"
              :class="{ 'input-error': form.errors.title }"
            />
            <label v-if="form.errors.title" class="label">
              <span class="label-text-alt text-error">{{ form.errors.title }}</span>
            </label>
          </div>

          <div class="form-control mb-4 w-full">
            <label for="slug" class="label">
              <span class="label-text font-medium">Slug</span>
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="form.slug"
                type="text"
                id="slug"
                placeholder="Slug girin (slug-format)"
                class="input input-bordered w-full"
                :class="{ 'input-error': form.errors.slug }"
              />
              <button type="button" @click="generateSlug" class="btn btn-square btn-outline shrink-0">
                <svg
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <label v-if="form.errors.slug" class="label">
              <span class="label-text-alt text-error">{{ form.errors.slug }}</span>
            </label>
          </div>

          <div class="form-control mb-4 w-full">
            <label for="playlist_id" class="label">
              <span class="label-text font-medium">YouTube Playlist ID</span>
            </label>
            <input
              v-model="form.playlist_id"
              type="text"
              id="playlist_id"
              placeholder="YouTube Playlist ID girin"
              class="input input-bordered w-full"
              :class="{ 'input-error': form.errors.playlist_id }"
            />
            <label v-if="form.errors.playlist_id" class="label">
              <span class="label-text-alt text-error">{{ form.errors.playlist_id }}</span>
            </label>
            <div class="mt-1 text-sm opacity-70">
              <p class="break-words">
                Örnek: https://www.youtube.com/playlist?list=<span class="font-bold"
                  >PLXcQxEjxyk31WyqhATafLwZoTm7whKh_l</span
                >
              </p>
              <p>Koyu renkli bölümü girin.</p>
            </div>
          </div>

          <div
            class="mt-8 flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0"
          >
            <Link href="/lessons" class="btn w-full sm:w-auto">İptal</Link>
            <button type="submit" class="btn btn-primary w-full sm:w-auto" :disabled="form.processing">
              <svg
                v-if="form.processing"
                class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Kaydet
            </button>
          </div>
        </form>
      </Card>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import GoBackButton from '@/Components/molecules/GoBackButton.vue';
import CheckScreen from '@/Components/templates/CheckScreen.vue';
import Card from '@/Components/molecules/Card.vue';

const form = useForm({
  title: '',
  slug: '',
  playlist_id: '',
});

const generateSlug = () => {
  if (!form.title) return;

  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
</script>
