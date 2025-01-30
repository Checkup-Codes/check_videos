<template>
  <div>
    <h1
      :class="[
        'group mb-4 flex h-[50px] cursor-pointer select-none items-center justify-between border-b pl-3 font-extrabold text-theme-text lg:text-2xl',
      ]"
    >
      <span
        :class="[title.length > 30 ? 'sm:text-md text-sm md:text-lg lg:text-xl' : 'text-2xl sm:text-3xl md:text-4xl']"
      >
        {{ title }}
      </span>
    </h1>
  </div>
</template>

<script setup>
const vueProps = defineProps({
  title: String,
});
</script>
