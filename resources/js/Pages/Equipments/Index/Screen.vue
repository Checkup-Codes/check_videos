<template>
  <div v-if="flashSuccess" class="fixed right-4 top-4 z-50">
    <div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
      <strong class="font-bold">Başarılı! </strong>
      <span class="block sm:inline">{{ flashSuccess }}</span>
    </div>
  </div>
  <div class="mx-auto min-h-screen p-8">
    <div>
      <div class="flex justify-between">
        <h1 class="mb-4 text-2xl font-bold">Ekipmanlarım</h1>
        <Link
          href="/equipments/create"
          v-if="auth.user"
          class="mx-2 rounded p-1 text-center font-bold text-black underline"
          >Ekipman Ekle</Link
        >
      </div>
      <table class="mx-auto w-11/12 border border-gray-300 bg-white">
        <thead>
          <tr>
            <th class="border-b px-6 py-3 text-left">İsim</th>
            <th class="border-b px-6 py-3 text-left">Özellikleri</th>
            <th class="border-b px-6 py-3 text-left">Link</th>
            <th v-if="auth.user" class="border-b px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="equipment in equipments" :key="equipment.id" class="hover:bg-gray-100">
            <td class="border-b px-6 py-4">
              <Link :href="`/equipments/${equipment.id}`" class="text-blue-600 hover:underline">
                {{ equipment.name }}
              </Link>
            </td>
            <td class="border-b px-6 py-4">{{ equipment.specs }}</td>
            <td class="border-b px-6 py-4">
              <a :href="equipment.link" class="text-blue-600 hover:underline" target="_blank">Ziyaret Et</a>
            </td>
            <td v-if="auth.user" class="border-b px-6 py-4">
              <Link :href="`/equipments/${equipment.id}/edit`" class="text-blue-600 hover:underline">
                <span>Düzenle</span>
              </Link>
              <button @click="deleteEquipment(equipment.id)" class="ml-4 text-red-600 hover:underline">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { usePage, router, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const { props } = usePage();
const auth = ref(props.auth);
const equipments = ref(props.equipments);

const flashSuccess = ref(props.flash.success);

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});

const editEquipment = (id) => {
  router.get(route('equipments.edit', id));
};

const deleteEquipment = (id) => {
  router.delete(route('equipments.destroy', id), {
    onSuccess: () => {
      flashSuccess.value = 'Ekipman başarıyla silindi.';

      equipments.value = equipments.value.filter((equipment) => equipment.id !== id);

      setTimeout(() => {
        flashSuccess.value = null;
      }, 3000);
    },
    onError: (error) => {
      console.error('Ekipman silme hatası:', error);
    },
  });
};
</script>
