<template>
  <CheckScreen>
    <div class="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-primary mb-3 text-xl font-bold sm:mb-0">DERSLER</h2>
      <Link href="/lessons/create" class="btn btn-primary btn-sm self-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Yeni Ders
      </Link>
    </div>

    <div class="mb-5 w-full">
      <Card class="card-compact w-full shadow-md">
        <div v-if="lessons.length === 0" class="p-4">
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
            <span>Henüz ders bulunamadı.</span>
          </div>
        </div>

        <div v-else>
          <!-- Masaüstü görünümü için tablo -->
          <div class="hidden overflow-x-auto md:block">
            <table class="table-zebra table">
              <thead>
                <tr>
                  <th class="text-left">Ders Adı</th>
                  <th class="text-center">Slug</th>
                  <th class="text-center">Playlist ID</th>
                  <th class="text-center">Oluşturma Tarihi</th>
                  <th class="text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lesson in lessons" :key="lesson.id" class="hover">
                  <td>{{ lesson.title }}</td>
                  <td class="text-center">{{ lesson.slug }}</td>
                  <td class="text-center">
                    <div class="badge badge-neutral max-w-xs truncate">{{ lesson.playlist_id }}</div>
                  </td>
                  <td class="text-center">{{ formatDate(lesson.created_at) }}</td>
                  <td class="text-center">
                    <div class="flex justify-center space-x-1">
                      <Link :href="`/lessons/${lesson.slug}`" class="btn btn-xs btn-ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
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
                      </Link>
                      <Link :href="`/lessons/${lesson.slug}/edit`" class="btn btn-xs btn-ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobil görünümü için kartlar -->
          <div class="divide-base-200 divide-y md:hidden">
            <div v-for="lesson in lessons" :key="lesson.id" class="hover:bg-base-100 p-4">
              <div class="mb-2">
                <h3 class="text-primary font-medium">{{ lesson.title }}</h3>
                <p class="truncate text-sm opacity-70">{{ lesson.slug }}</p>
              </div>

              <div class="my-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="block font-semibold">Playlist:</span>
                  <div class="badge badge-neutral badge-sm max-w-full truncate">{{ lesson.playlist_id }}</div>
                </div>
                <div>
                  <span class="block font-semibold">Tarih:</span>
                  <span>{{ formatDate(lesson.created_at) }}</span>
                </div>
              </div>

              <div class="mt-3 flex justify-end space-x-2">
                <Link :href="`/lessons/${lesson.slug}`" class="btn btn-sm btn-outline">
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
                  Göster
                </Link>
                <Link :href="`/lessons/${lesson.slug}/edit`" class="btn btn-sm">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Düzenle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import Card from '@/Pages/WritesCategories/_components/Card.vue';

const { props } = usePage();

const lessons = computed(() => {
  return props.lessons || [];
});

const formatDate = (date) => {
  if (!date) return '-';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('tr-TR', options);
};
</script>
