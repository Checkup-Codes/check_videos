<template>
  <div ref="scrollContainer" class="space-y-1 p-3">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="route('writes.show', { write: write.slug })"
      :class="[
        'block items-center justify-between rounded-lg border px-1 py-2 backdrop-blur-md transition-all duration-200',
        activeWrite === `/writes/${write.slug}`
          ? 'border-primary bg-primary text-primary-content shadow-md'
          : 'border-base-200 bg-base-200 text-base-content hover:bg-base-300',
      ]"
      @click="saveScrollPosition"
    >
      <!-- Başlık + Kilit -->
      <div class="mb-1 flex items-center gap-2">
        <span v-if="write.status === 'private'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span
          v-if="write.status === 'link_only'"
          :class="[activeWrite === `/writes/${write.slug}` ? 'text-primary-content' : 'text-primary']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span>{{ write.title }}</span>
      </div>

      <!-- Tarih ve view bilgisi -->
      <div class="text-base-content/70 flex justify-between text-xs">
        <span>{{ formatDate(write.created_at) }}</span>
        <span class="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[14px] w-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {{ write.views_count }}
        </span>
      </div>
    </Link>

    <!-- Boş durum -->
    <div v-if="filteredWrites.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz yazı bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch, onActivated, onDeactivated } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

defineOptions({ name: 'WriteList' });

const props = defineProps({
  writes: Array,
  route: Function,
});

const page = usePage();
const isAdmin = page.props.isAdmin || false;
const scrollContainer = ref(null);
const STORAGE_KEY = 'writeList_scrollPosition';
let isActive = false;
const activeWrite = ref('');

const filteredWrites = computed(() => {
  return isAdmin ? props.writes : props.writes.filter((write) => write.status !== 'private');
});

defineExpose({ filteredWrites, scrollContainer });

const saveScrollPosition = () => {
  if (scrollContainer.value) {
    localStorage.setItem(STORAGE_KEY, scrollContainer.value.scrollTop.toString());
  }
};

const restoreScrollPosition = () => {
  if (!scrollContainer.value) return;
  const saved = parseInt(localStorage.getItem(STORAGE_KEY));
  if (!isNaN(saved)) scrollContainer.value.scrollTop = saved;
};

onActivated(() => {
  isActive = true;
  nextTick(() => {
    restoreScrollPosition();
    updateActiveWrite();
  });
});

onDeactivated(() => {
  isActive = false;
  saveScrollPosition();
});

watch(
  () => props.writes,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      nextTick(restoreScrollPosition);
    }
  },
  { deep: true }
);

const updateActiveWrite = () => {
  activeWrite.value = window.location.pathname;
};

onMounted(() => {
  isActive = true;
  updateActiveWrite();
  nextTick(restoreScrollPosition);

  scrollContainer.value?.addEventListener('scroll', saveScrollPosition);

  const handlePopState = () => {
    if (isActive) {
      nextTick(() => {
        restoreScrollPosition();
        updateActiveWrite();
      });
    }
  };

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('inertia:success', updateActiveWrite);

  onUnmounted(() => {
    isActive = false;
    scrollContainer.value?.removeEventListener('scroll', saveScrollPosition);
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('inertia:success', updateActiveWrite);
    saveScrollPosition();
  });
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>
