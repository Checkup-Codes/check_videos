<template>
  <div class="border-color-one overflow-hidden border-b-2 lg:relative">
    <div class="flex h-12 items-center justify-between px-5 text-sm font-semibold">
      <span class="">{{ title }}</span>
      <Link v-if="userName" :href="href" class="text-primary-500">
        <Button :title="title" size="xsmall"> + </Button>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { usePage } from '@inertiajs/vue3';
import Button from '@/Components/CekapUI/Buttons/Button.vue';
import { Link } from '@inertiajs/vue3';
const { props } = usePage();

const userName = props.auth.user?.name;
const vueProps = defineProps({
  title: String,
  href: String,
});
</script>
