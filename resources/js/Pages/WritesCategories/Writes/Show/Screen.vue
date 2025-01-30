<template>
  <CheckScreen>
    <TopScreen :title="write.title" @click="toggleContent" />
    <ExcalidrawComponent :write v-if="showDraw" />
    <WriteContent v-else :content="write.content" :summary="write.summary" :id="write.id" :user="auth.user" />
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import WriteContent from '@/Components/CekapUI/Typography/TextScreen.vue';

const { props } = usePage();
const write = ref(props.write);
const auth = props.auth;

const showDraw = ref(false);

onMounted(() => {
  if (window.location.pathname.includes('categories')) {
    showDraw.value = true;
  } else {
    showDraw.value = props.showDraw || false;
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');
});

const toggleContent = () => {
  showDraw.value = !showDraw.value;
  const url = new URL(window.location.href);

  if (showDraw.value) {
    url.searchParams.set('draw', '1');
  } else {
    url.searchParams.delete('draw');
  }

  window.history.pushState({}, '', url);
};
</script>
