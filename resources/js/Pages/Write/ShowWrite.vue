<template>
  <div class="mx-auto max-w-[97%] rounded-lg bg-white p-6 shadow-md">
    <div class="flex justify-between">
      <div class="mb-4 text-sm text-gray-500">ID: {{ write.id }}</div>
      <a :href="`/writes/${write.id}/edit`">
        <div class="m-2 rounded p-2 text-center font-bold text-black underline">Edit Write</div>
      </a>
    </div>
    <h1 class="mb-6 text-3xl font-bold">{{ write.title }}</h1>
    <div class="prose mb-6" v-html="write.content"></div>
    <div class="rounded-lg bg-gray-100 p-4">
      <h2 class="mb-2 text-xl font-semibold">Summary</h2>
      <p>{{ write.summary }}</p>
    </div>
    <div class="flex">
      <button
        @click="deleteWrite(write.id)"
        class="m-2 ml-auto flex rounded p-2 text-right font-bold text-black underline"
      >
        Delete Write
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import { useStore } from 'vuex';

const { props } = usePage();
const write = ref(props.write);
const store = useStore();

const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};

onMounted(() => {
  store.dispatch('ActiveMenu/setActiveMenu', 'writes');
});
</script>
