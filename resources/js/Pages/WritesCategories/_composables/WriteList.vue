<template>
  <div class="space-y-1 p-2">
    <Link
      v-for="write in filteredWrites"
      :key="write.id"
      :href="getWriteRoute(write)"
      :class="[
        'block rounded-lg p-3',
        activeWrite === getActiveWritePath(write)
          ? 'bg-primary text-primary-foreground'
          : 'border border-border bg-card hover:bg-accent',
      ]"
    >
      <h3
        class="line-clamp-2 text-sm font-medium leading-tight"
        :class="activeWrite === getActiveWritePath(write) ? 'text-primary-foreground' : 'text-foreground'"
      >
        {{ write.title }}
      </h3>

      <div
        class="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"
        :class="activeWrite === getActiveWritePath(write) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
      >
        <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span class="flex items-center gap-1">
            <IconCalendar class="h-3 w-3 flex-shrink-0" />
            <span class="truncate">{{ formatDate(write.created_at) }}</span>
          </span>

          <span class="flex items-center gap-1">
            <IconEye class="h-3 w-3 flex-shrink-0" />
            <span class="truncate">{{ formatNumber(write.views_count) }} görüntülenme</span>
          </span>
        </div>

        <div class="flex items-center gap-1 self-start sm:self-center">
          <span v-if="write.status === 'private'" class="text-yellow-500 dark:text-yellow-400" title="Gizli yazı">
            <IconLock class="h-3 w-3" />
          </span>
          <span v-if="write.status === 'link_only'" class="text-blue-500 dark:text-blue-400" title="Sadece link">
            <IconLink class="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>

    <div
      v-if="filteredWrites.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground"
    >
      <div>Henüz yazı bulunmuyor</div>
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
