<template>
  <div class="mx-auto min-h-screen p-8">
    <div class="mx-auto max-w-4xl">
      <!-- Back Button -->
      <div class="mb-6">
        <Link href="/equipments" class="flex items-center text-blue-600 hover:underline">
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Ekipmanlara Dön
        </Link>
      </div>

      <!-- Equipment Details -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <div class="mb-6 flex items-start justify-between">
          <h1 class="text-3xl font-bold text-gray-900">{{ equipment.name }}</h1>

          <!-- Action Buttons (Only for authenticated users) -->
          <div v-if="auth.user" class="flex space-x-3">
            <Link
              :href="`/equipments/${equipment.id}/edit`"
              class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Düzenle
            </Link>
            <button
              @click="deleteEquipment(equipment.id)"
              class="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Sil
            </button>
          </div>
        </div>

        <!-- Equipment Information -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-semibold text-gray-700">Özellikler</h3>
            <div class="rounded-lg bg-gray-50 p-4">
              <p class="whitespace-pre-wrap text-gray-800">{{ equipment.specs }}</p>
            </div>
          </div>

          <div>
            <h3 class="mb-2 text-lg font-semibold text-gray-700">Link</h3>
            <div class="rounded-lg bg-gray-50 p-4">
              <a
                :href="equipment.link"
                target="_blank"
                class="break-all text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ equipment.link }}
              </a>
            </div>
          </div>
        </div>

        <!-- Visit Button -->
        <div class="mt-6 text-center">
          <a
            :href="equipment.link"
            target="_blank"
            class="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
          >
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            Ekipmanı Ziyaret Et
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePage, router, Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();
const auth = ref(props.auth);
const equipment = ref(props.equipment);

const deleteEquipment = (id) => {
  if (confirm('Bu ekipmanı silmek istediğinizden emin misiniz?')) {
    router.delete(route('equipments.destroy', id), {
      onSuccess: () => {
        router.visit('/equipments');
      },
      onError: (error) => {
        console.error('Ekipman silme hatası:', error);
      },
    });
  }
};
</script>
