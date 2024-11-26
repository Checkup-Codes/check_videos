<template>
  <Screen>
    <GoBackButton url="/writes" />
    <WriteUpdateForm />
  </Screen>
</template>

<script setup>
import Screen from '@/Components/CekapUI/Modals/Screen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import WriteUpdateForm from '@/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue';
</script>
