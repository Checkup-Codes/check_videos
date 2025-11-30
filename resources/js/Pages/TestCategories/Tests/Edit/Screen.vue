<template>
  <CheckScreen>
    <TestUpdateForm />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TestUpdateForm from '@/Pages/TestCategories/Tests/Edit/TestUpdateForm.vue';

defineOptions({
  name: 'EditTestScreen',
});
</script>
