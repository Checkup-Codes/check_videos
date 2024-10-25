<template>
  <div class="container mx-auto bg-screen-bg p-6">
    <h1 class="mb-4 text-2xl font-bold">Yeni Ders oluştur</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="title" :class="linkedStyle">İsim:</label>
        <input v-model="form.title" type="text" id="title" :class="linkedStyle2" />
        <p v-if="form.errors.title" class="text-sm text-red-500">İsmi unuttun !</p>
      </div>
      <div class="mb-4">
        <label for="slug" :class="linkedStyle">Slug:</label>
        <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" />
        <p v-if="form.errors.slug" class="text-sm text-red-500">Slug deriz biz Türkçesi meçhul.</p>
      </div>
      <div class="mb-4">
        <label for="playlist_id" :class="linkedStyle">Play List ID:</label>
        <input v-model="form.playlist_id" type="text" id="playlist_id" :class="linkedStyle2" />
        <p v-if="form.errors.playlist_id" class="text-sm text-red-500">
          Millet doğru girerken hata yapmamalı sen yazmıyon!
        </p>
      </div>
      <div class="mb-4">
        <button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Dersi oluştur</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

const linkedStyle = 'block font-bold mb-1 text-sm rounded';
const linkedStyle2 = 'mt-1 block w-full rounded';

const form = useForm({
  title: '',
  slug: '',
  playlist_id: '',
});

const submit = () => {
  form.post(route('lessons.store'));
};
</script>
