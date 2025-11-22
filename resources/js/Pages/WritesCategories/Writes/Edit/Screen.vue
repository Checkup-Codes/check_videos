<template>
  <CheckScreen>
    <WriteUpdateForm />
  </CheckScreen>
</template>

<script setup>
import WriteUpdateForm from '@/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

defineOptions({
  name: 'EditWriteScreen',
});
</script>
