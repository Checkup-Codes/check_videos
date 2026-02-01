<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg">
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-foreground">Mevcut Kelimeler Bulundu</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ duplicates.length }} kelime zaten sistemde mevcut. Bu kelimeleri seçilen paketlere eklemek ister misiniz?
        </p>
      </div>

      <!-- Selected Packs Info -->
      <div class="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div class="flex items-start gap-3">
          <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <h3 class="font-medium text-foreground">Seçilen Paketler</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="pack in packNames"
                :key="pack"
                class="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
              >
                {{ pack }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Duplicate Words List -->
      <div class="mb-6 max-h-96 space-y-2 overflow-y-auto">
        <div
          v-for="(duplicate, index) in duplicates"
          :key="index"
          class="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
        >
          <div class="flex-1">
            <div class="font-medium text-foreground">{{ duplicate.word }}</div>
            <div v-if="duplicate.current_packs.length > 0" class="mt-1 text-xs text-muted-foreground">
              Mevcut paketler: {{ duplicate.current_packs.join(', ') }}
            </div>
            <div v-else class="mt-1 text-xs text-muted-foreground">
              Henüz hiçbir pakette değil
            </div>
          </div>
          <div class="ml-4">
            <input
              type="checkbox"
              :id="`word-${index}`"
              v-model="selectedWords"
              :value="duplicate.id"
              class="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
        </div>
      </div>

      <!-- Select All -->
      <div class="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="select-all"
          :checked="selectedWords.length === duplicates.length"
          @change="toggleSelectAll"
          class="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
        <label for="select-all" class="text-sm font-medium text-foreground">
          Tümünü Seç ({{ selectedWords.length }}/{{ duplicates.length }})
        </label>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <button
          @click="$emit('close')"
          class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          İptal
        </button>
        <button
          @click="addToPacks"
          :disabled="selectedWords.length === 0 || processing"
          class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {{ processing ? 'Ekleniyor...' : `${selectedWords.length} Kelimeyi Paketlere Ekle` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  show: Boolean,
  duplicates: { type: Array, default: () => [] },
  packIds: { type: Array, default: () => [] },
  packNames: { type: Array, default: () => [] },
});

const emit = defineEmits(['close']);

const selectedWords = ref([]);
const processing = ref(false);

// Auto-select all on mount
watch(() => props.show, (newVal) => {
  if (newVal) {
    selectedWords.value = props.duplicates.map(d => d.id);
  }
});

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedWords.value = props.duplicates.map(d => d.id);
  } else {
    selectedWords.value = [];
  }
};

const addToPacks = () => {
  if (selectedWords.value.length === 0) return;

  processing.value = true;

  router.post(
    route('rendition.words.bulk-add-to-packs'),
    {
      word_ids: selectedWords.value,
      pack_ids: props.packIds,
    },
    {
      onSuccess: () => {
        processing.value = false;
        emit('close');
      },
      onError: () => {
        processing.value = false;
      },
    }
  );
};
</script>
