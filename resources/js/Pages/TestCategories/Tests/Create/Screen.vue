<template>
  <CheckScreen>
    <TestCreateForm />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TestCreateForm from '@/Pages/TestCategories/Tests/Create/TestCreateForm.vue';

defineOptions({
  name: 'CreateTestScreen',
});
</script>
