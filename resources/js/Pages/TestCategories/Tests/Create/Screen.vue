<template>
  <CheckScreen>
    <div class="space-y-6 py-6">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-foreground">Yeni Test Oluştur</h1>
        <p class="mt-2 text-sm text-muted-foreground">Test bilgilerini ve sorularını ekleyin</p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-border">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            @click="activeTab = 'manual'"
            :class="[
              activeTab === 'manual'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
            ]"
          >
            Manuel Ekleme
          </button>
          <button
            @click="activeTab = 'bulk'"
            :class="[
              activeTab === 'bulk'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
            ]"
          >
            <span class="flex items-center gap-2">
              Toplu Ekleme (JSON)
              <span class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Yeni</span>
            </span>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="mt-6">
        <TestCreateForm v-if="activeTab === 'manual'" />
        <BulkImportTab v-else-if="activeTab === 'bulk'" @cancel="activeTab = 'manual'" />
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref } from 'vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TestCreateForm from '@/Pages/TestCategories/Tests/Create/TestCreateForm.vue';
import BulkImportTab from '@/Pages/TestCategories/Tests/Create/BulkImportTab.vue';

defineOptions({
  name: 'CreateTestScreen',
});

const activeTab = ref('manual');
</script>
