<template>
  <div ref="scrollContainer" class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]">
    <div class="min-h-full">
      <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-10">
        <div class="text-center">
          <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p class="text-base-content/70">{{ emptyMessage }}</p>
        </div>
      </div>

      <div v-else class="menu w-full">
        <Link
          v-for="item in items"
          :key="item.id"
          :href="generateRoute(item)"
          :class="[
            'hover:bg-base-200 flex flex-col p-4 transition-colors duration-200',
            { 'bg-base-200 border-primary border-l-4': isActive(item) },
          ]"
        >
          <div class="font-medium">{{ item.title || item.name }}</div>
          <div class="text-base-content/70 mt-1 flex items-center justify-between text-xs">
            <span>{{ formatDate(item.created_at) }}</span>
            <div class="flex items-center gap-2">
              <slot name="meta" :item="item">
                <span v-if="item.views_count !== undefined" class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="h-3.5 w-3.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {{ item.views_count }}
                </span>
              </slot>
              <badge v-if="showBadges && item.badge" :variant="item.badgeVariant || 'primary'" size="xs">
                {{ item.badge }}
              </badge>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  routeName: {
    type: String,
    required: true,
  },
  routeParam: {
    type: String,
    default: 'id',
  },
  emptyMessage: {
    type: String,
    default: 'Gösterilecek öğe bulunamadı.',
  },
  showBadges: {
    type: Boolean,
    default: false,
  },
});

const scrollContainer = ref(null);

const handleScroll = (event) => {
  const container = event.target;
  const maxScroll = container.scrollHeight - container.clientHeight;

  if (container.scrollTop < 0) {
    container.scrollTop = 0;
  } else if (container.scrollTop > maxScroll) {
    container.scrollTop = maxScroll;
  }

  localStorage.setItem(`scrollPosition_${props.routeName}`, container.scrollTop);
};

onMounted(() => {
  const savedScrollPosition = localStorage.getItem(`scrollPosition_${props.routeName}`);
  if (savedScrollPosition && scrollContainer.value) {
    scrollContainer.value.scrollTop = savedScrollPosition;
  }

  scrollContainer.value?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

const generateRoute = (item) => {
  const params = {};
  params[props.routeParam] = item.id || item.slug;
  return route(props.routeName, params);
};

const isActive = (item) => {
  const params = {};
  params[props.routeParam] = item.id || item.slug;
  const url = route(props.routeName, params);
  return window.location.pathname === url;
};
</script>
