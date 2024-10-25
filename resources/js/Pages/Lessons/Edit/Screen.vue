<template>
  <div class="container mx-auto bg-screen-bg p-6">
    <h1 class="mb-4 text-2xl font-bold">Dersi Güncelle</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="title" :class="linkedStyle">İsim:</label>
        <input v-model="form.title" type="text" id="title" :class="linkedStyle2" />
        <p v-if="form.errors.title" class="text-sm text-red-500">{{ form.errors.title }}</p>
      </div>
      <div class="mb-4">
        <label for="slug" :class="linkedStyle">Slug:</label>
        <input v-model="form.slug" type="text" id="slug" :class="linkedStyle2" />
        <p v-if="form.errors.slug" class="text-sm text-red-500">{{ form.errors.slug }}</p>
      </div>
      <div class="mb-4">
        <label for="playlist_id" :class="linkedStyle">Play List ID:</label>
        <input v-model="form.playlist_id" type="text" id="playlist_id" :class="linkedStyle2" />
        <p v-if="form.errors.playlist_id" class="text-sm text-red-500">{{ form.errors.playlist_id }}</p>
      </div>
      <div class="mb-4">
        <button type="submit" class="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">Dersi Güncelle</button>
      </div>
    </form>
    <!-- Dersi silmek için buton -->
    <div class="mt-4">
      <Link href="#" @click.prevent="deleteLesson" class="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
        >Dersi Sil</Link
      >
    </div>
  </div>
</template>

<script setup>
import { useForm, usePage, Link } from '@inertiajs/vue3';

const { props } = usePage();
const linkedStyle = 'block font-bold mb-1 text-sm rounded';
const linkedStyle2 = 'mt-1 block w-full rounded';

const form = useForm({
  title: props.lesson.title,
  slug: props.lesson.slug,
  playlist_id: props.lesson.playlist_id,
});

const submit = () => {
  form.put(route('lessons.update', { lesson: props.lesson.slug }));
};

// Dersi silme işlevi
const deleteLesson = () => {
  if (confirm('Bu dersi silmek istediğinize emin misiniz?')) {
    form.delete(route('lessons.destroy', { lesson: props.lesson.id }), {
      onSuccess: () => {
        // Başarıyla silindikten sonra kullanıcıyı dersler sayfasına yönlendirebiliriz
        window.location.href = route('lessons.index');
      },
      onError: () => {
        alert('Ders silinirken bir hata oluştu.');
      },
    });
  }
};
</script>
