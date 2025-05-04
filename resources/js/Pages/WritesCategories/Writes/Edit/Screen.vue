<template>
  <CheckScreen>
    <WriteUpdateForm />
  </CheckScreen>
</template>

<script setup>
import WriteUpdateForm from '@/Pages/WritesCategories/Writes/Edit/WriteUpdateForm.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

/**
 * Component for write editing screen
 * Provides write update form with needed layout
 */
defineOptions({
  name: 'EditWriteScreen',
});
</script>
