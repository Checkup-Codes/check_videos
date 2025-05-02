<template>
  <CheckScreen>
    <div class="mb-5">
      <!-- Mobil tasarım için düzenlenmiş başlık bölümü -->
      <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <GoBackButton href="/lessons" />
        <div class="w-full sm:w-auto">
          <h2 class="text-primary truncate text-xl font-bold sm:text-2xl">
            {{ form.title }} <span class="text-base opacity-70">Düzenle</span>
          </h2>
        </div>
      </div>

      <Card class="card-compact mt-5 w-full shadow-md">
        <form @submit.prevent="form.put(`/lessons/${lesson.id}`)" class="p-4">
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

          <!-- Mobil ekranlarda butonların düzeni -->
          <div class="mt-8 grid grid-cols-1 gap-3 sm:flex sm:justify-between">
            <button
              @click.prevent="confirmDelete"
              type="button"
              class="btn btn-error order-last w-full sm:order-first sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-5 w-5"
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
              Sil
            </button>

            <div class="flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0">
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
          </div>
        </form>
      </Card>
    </div>

    <!-- Delete Confirmation Modal -->
    <dialog :open="showDeleteModal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Dersi Sil</h3>
        <p class="py-4">Bu dersi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
        <div class="modal-action flex flex-col-reverse space-y-3 space-y-reverse sm:flex-row sm:space-x-2 sm:space-y-0">
          <button @click="showDeleteModal = false" class="btn w-full sm:w-auto">İptal</button>
          <button @click="deleteLesson" class="btn btn-error w-full sm:w-auto">
            <svg
              v-if="deleting"
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
            Sil
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>kapat</button>
      </form>
    </dialog>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import GoBackButton from '@/Components/molecules/GoBackButton.vue';
import CheckScreen from '@/Components/templates/CheckScreen.vue';
import Card from '@/Components/molecules/Card.vue';

const { props } = usePage();
const lesson = props.lesson;

const form = useForm({
  title: lesson.title,
  slug: lesson.slug,
  playlist_id: lesson.playlist_id,
});

const showDeleteModal = ref(false);
const deleting = ref(false);

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

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deleteLesson = () => {
  deleting.value = true;
  router.delete(`/lessons/${lesson.id}`, {
    onSuccess: () => {
      showDeleteModal.value = false;
      deleting.value = false;
    },
    onError: () => {
      deleting.value = false;
    },
  });
};
</script>
