<template>
  <div class="border-r-2 border-color-one">
    <FlashMessage :message="flashSuccess" />
    <CategoryMenu :categories="categories" :route="route" />
    <WriteList :writes="writes" :route="route" />
  </div>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import CategoryMenu from '@/Pages/WritesCategories/_components/CategoryMenu.vue';
import WriteList from '@/Pages/WritesCategories/_components/WriteList.vue';
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const flashSuccess = ref(props.flash.success);
const auth = props.auth;
const writes = ref(props.writes);
const categories = ref(props.categories);
</script>
