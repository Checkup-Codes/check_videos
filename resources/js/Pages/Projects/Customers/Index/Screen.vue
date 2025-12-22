<template>
  <CheckScreen>
    <IntroScreen title="Müşteriler" />

    <!-- Card component directly implemented -->
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import IntroScreen from '@/Components/CekapUI/Typography/IntroScreen.vue';

const { props } = usePage();
const customers = computed(() => props.customers || []);

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Tarih formatı hatası:', error);
    return dateString;
  }
};
</script>

<style scoped>
.table-header {
  padding: 0.75rem 1.5rem;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  color: #6b7280;
}

.table-cell {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  white-space: nowrap;
}

.ellipsis-cell {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
