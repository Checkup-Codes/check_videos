<template>
  <div class="mx-auto w-full max-w-full overflow-auto bg-screen-bg px-5 lg:mt-0">
    <div class="container mx-auto min-h-screen p-4">
      <div class="hidden md:flex">
        <div v-if="auth.user">
          <Link :href="`/categories/${category.slug}/edit`">
            <div class="mx-2 rounded p-1 text-center font-bold text-black underline">Kategori İsmini Düzenle</div>
          </Link>
        </div>

        <header class="h-screen items-center justify-center bg-screen-bg text-black">
          <div class="text-center">
            <h2 class="mb-4 text-4xl font-bold">Kategoriler : {{ category.name }}</h2>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const { props, url } = usePage();
const writes = ref(props.writes);
const categories = ref(props.categories);
const category = ref(props.category);

const flashSuccess = ref(props.flash.success);
const auth = props.auth;

onMounted(() => {
  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
});
</script>
