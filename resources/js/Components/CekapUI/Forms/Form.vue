<template>
  <form @submit.prevent="handleSubmit" class="mx-auto w-[90%]">
    <slot />
  </form>
</template>

<script setup>
const props = defineProps({
  onSubmit: Function,
});

const emit = defineEmits(['submit']);

const handleSubmit = () => {
  if (props.onSubmit) {
    props.onSubmit();
  } else {
    emit('submit');
  }
};
</script>
