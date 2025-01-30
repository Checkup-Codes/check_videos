<template>
  <CheckScreen>
    <TopScreen :title="write.title" @click="navigateToWriteWithDraw" />

    <WriteContent :content="write.content" :summary="write.summary" :id="write.id" :user="auth.user" />
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import WriteContent from '@/Components/CekapUI/Typography/TextScreen.vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';

const { props } = usePage();
const write = ref(props.write);
const auth = props.auth;

// Yazıya draw parametresiyle gitme
const navigateToWriteWithDraw = () => {
  const slug = write.value.slug;
  const url = `/writes/${slug}?draw=1`;
  Inertia.visit(url); // Inertia ile yeni sayfaya git
};

// Yazıyı silme fonksiyonu
const deleteWrite = (id) => {
  if (confirm('Are you sure you want to delete this write?')) {
    Inertia.delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};
</script>
