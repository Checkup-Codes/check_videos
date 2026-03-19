<template>
  <div class="space-y-1.5 p-3">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="getWriteRoute(write)"
      class="group relative block overflow-hidden rounded-xl border transition-all duration-200"
      :class="[
        activeWrite === getActiveWritePath(write)
          ? 'border-primary/50 bg-primary shadow-sm shadow-primary/10'
          : 'border-border/50 bg-card/50 hover:border-border hover:bg-accent/50 hover:shadow-sm',
      ]"
    >
      <!-- Active indicator -->
      <div
        v-if="activeWrite === getActiveWritePath(write)"
        class="absolute left-0 top-0 h-full w-1 bg-primary"
      ></div>

      <div class="p-3.5" :class="{ 'pl-4': activeWrite === getActiveWritePath(write) }">
        <!-- Title with status icons -->
        <div class="mb-2 flex items-start gap-2">
          <h4
            class="line-clamp-2 flex-1 text-xs font-semibold leading-snug tracking-tight"
            :class="activeWrite === getActiveWritePath(write) ? 'text-primary-foreground' : 'text-foreground'"
          >
            {{ write.title }}
          </h4>
          <div class="flex shrink-0 items-center gap-1">
            <span
              v-if="write.status === 'private'"
              class="flex h-5 w-5 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
              title="Gizli yazı"
            >
              <IconLock class="h-3 w-3" />
            </span>
            <span
              v-if="write.status === 'link_only'"
              class="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400"
              title="Sadece link"
            >
              <IconLink class="h-3 w-3" />
            </span>
          </div>
        </div>

        <!-- Meta information -->
        <div
          class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium"
          :class="activeWrite === getActiveWritePath(write) ? 'text-primary-foreground/80' : 'text-muted-foreground'"
        >
          <span class="flex items-center gap-1.5">
            <IconCalendar class="h-3 w-3 flex-shrink-0 opacity-70" />
            <span>{{ formatDate(write.created_at) }}</span>
          </span>

          <span class="flex items-center gap-1.5">
            <IconEye class="h-3 w-3 flex-shrink-0 opacity-70" />
            <span>{{ formatNumber(write.views_count) }}</span>
          </span>
        </div>
      </div>

      <!-- Hover effect overlay -->
      <div
        class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        :class="activeWrite === getActiveWritePath(write) ? 'bg-primary/5' : 'bg-accent/30'"
      ></div>
    </Link>

    <!-- Empty state -->
    <div
      v-if="filteredWrites.length === 0"
      class="flex h-40 flex-col items-center justify-center gap-2 text-center"
    >
      <div class="rounded-full bg-muted/50 p-3">
        <svg class="h-6 w-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p class="text-xs font-medium text-muted-foreground">Henüz yazı bulunmuyor</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, onActivated, onDeactivated, inject, nextTick } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import IconCalendar from '../_components/icons/IconCalendar.vue';
import IconEye from '../_components/icons/IconEye.vue';
import IconLock from '../_components/icons/IconLock.vue';
import IconLink from '../_components/icons/IconLink.vue';

defineOptions({ name: 'WriteList' });

const store = useStore();

const props = defineProps({
  writes: { type: Array, default: () => [] },
  route: { type: Function, default: null },
  isCollapsed: { type: Boolean, default: false },
});

// Inject writes - can be a computed ref or array
const injectedWrites = inject('writes', []);

const writes = computed(() => {
  if (props.writes && props.writes.length > 0) {
    return props.writes;
  }
  // Handle both computed ref and plain array
  const writesValue = injectedWrites?.value ?? injectedWrites;
  if (writesValue && Array.isArray(writesValue) && writesValue.length > 0) {
    return writesValue;
  }
  return [];
});

const page = usePage();
const isAdmin = page.props.isAdmin || false;
let isActive = false;
const activeWrite = ref('');

// Get filter from store
const adminFilter = computed(() => store.getters['Writes/filter']);

// Check if we're on list view (writes) or category view
const isListView = computed(() => {
  const url = page.url;
  return url.startsWith('/writes') && !url.startsWith('/categories');
});

const getWriteRoute = (write) => {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/categories/')) {
    const pathParts = currentPath.split('/').filter((part) => part.length > 0);
    if (pathParts.length >= 2 && pathParts[0] === 'categories') {
      const categorySlug = pathParts[1];
      if (categorySlug && categorySlug !== 'create' && categorySlug !== 'edit') {
        return route('categories.showByCategory', { category: categorySlug, slug: write.slug });
      }
    }
  }
  return route('writes.show', { write: write.slug });
};

const getActiveWritePath = (write) => {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/categories/')) {
    const pathParts = currentPath.split('/').filter((part) => part.length > 0);
    if (pathParts.length >= 2 && pathParts[0] === 'categories') {
      const categorySlug = pathParts[1];
      if (categorySlug && categorySlug !== 'create' && categorySlug !== 'edit') {
        return `/categories/${categorySlug}/${write.slug}`;
      }
    }
  }
  return `/writes/${write.slug}`;
};

const filteredWrites = computed(() => {
  let result = writes.value;
  if (!isAdmin) {
    result = result.filter((write) => write.status !== 'private');
    return result;
  } else {
    if (adminFilter.value === 'published') {
      result = result.filter((write) => write.status === 'published');
    } else if (adminFilter.value === 'link_only') {
      result = result.filter((write) => write.status === 'link_only');
    } else if (adminFilter.value === 'private') {
      result = result.filter((write) => write.status === 'private');
    }
    return result;
  }
});

defineExpose({ filteredWrites });

onActivated(() => {
  isActive = true;
  updateActiveWrite();
});

onDeactivated(() => {
  isActive = false;
});

watch(
  () => page.url,
  () => {
    nextTick(() => {
      updateActiveWrite();
    });
  }
);

const updateActiveWrite = () => {
  activeWrite.value = window.location.pathname;
};

onMounted(() => {
  isActive = true;
  updateActiveWrite();

  const handlePopState = () => {
    if (isActive) {
      updateActiveWrite();
    }
  };
  const handleNavigationEnd = () => {
    if (isActive) {
      updateActiveWrite();
    }
  };

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('inertia:finish', handleNavigationEnd);

  onUnmounted(() => {
    isActive = false;
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('inertia:finish', handleNavigationEnd);
  });
});

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'tr-TR',
  };

  const dateObj = new Date(date);
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('tr-TR').format(num);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

button {
  transition: none;
}

button:hover {
  transition:
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}

a {
  transition: none;
}

a:hover {
  transition:
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}
</style>
