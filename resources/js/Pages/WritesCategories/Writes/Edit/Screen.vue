<template>
  <CheckScreen>
    <h1
      :class="[
        'group flex h-16 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-4 text-xl font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md',
      ]"
    >
      <span class="">Yazıyı Güncelle</span>
    </h1>
    <WriteUpdateForm />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import WriteUpdateForm from '@/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue';
</script>
