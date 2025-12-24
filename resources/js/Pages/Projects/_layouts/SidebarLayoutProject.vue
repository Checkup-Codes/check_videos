<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- View Toggle - Always visible -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-2">
      <div class="flex items-center justify-between gap-2">
        <!-- View Toggle (Left) -->
        <div class="flex items-center gap-1">
          <Link
            :href="route('services.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              currentView === 'services'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Servisler"
          >
            <IconBolt class="h-3 w-3" />
            <span v-if="!isNarrow">Servisler</span>
          </Link>
          <Link
            :href="route('projects.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              currentView === 'projects'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Projeler"
          >
            <IconFolder class="h-3 w-3" />
            <span v-if="!isNarrow">Projeler</span>
          </Link>
          <Link
            :href="route('customers.index')"
            class="inline-flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors"
            :class="
              currentView === 'customers'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            "
            title="Müşteriler"
          >
            <IconUsers class="h-3 w-3" />
            <span v-if="!isNarrow">Müşteriler</span>
          </Link>
        </div>
      </div>
    </div>
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <div class="space-y-1 p-2">
        <!-- Services List -->
        <div v-if="currentView === 'services'" class="space-y-1">
          <div v-if="!services || services.length === 0" class="p-2 text-xs text-muted-foreground">
            Henüz servis bulunmamaktadır.
          </div>
          <Link
            v-for="service in services"
            :key="service.id"
            :href="`/services/${service.id}`"
            :class="[
              'flex flex-col rounded-md p-2 text-sm transition-colors',
              getLinkClasses(`/services/${service.id}`)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span class="truncate font-medium">{{ service.name }}</span>
            </div>
            <span v-if="!isNarrow && service.description" class="mt-0.5 truncate text-xs opacity-70">
              {{ service.description }}
            </span>
          </Link>
        </div>

        <!-- Projects List -->
        <div v-if="currentView === 'projects'" class="space-y-1">
          <div v-if="!projects || projects.length === 0" class="p-2 text-xs text-muted-foreground">
            Henüz proje bulunmamaktadır.
          </div>
          <Link
            v-for="project in projects"
            :key="project.id"
            :href="`/projects/${project.id}`"
            :class="[
              'flex flex-col rounded-md p-2 text-sm transition-colors',
              getLinkClasses(`/projects/${project.id}`)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span class="truncate font-medium">{{ project.project_name }}</span>
            </div>
            <span v-if="!isNarrow && project.customer" class="mt-0.5 truncate text-xs opacity-70">
              {{ project.customer.first_name }} {{ project.customer.last_name }}
            </span>
          </Link>
        </div>

        <!-- Customers List -->
        <div v-if="currentView === 'customers'" class="space-y-1">
          <div v-if="!customers || customers.length === 0" class="p-2 text-xs text-muted-foreground">
            Henüz müşteri bulunmamaktadır.
          </div>
          <Link
            v-for="customer in customers"
            :key="customer.id"
            :href="`/customers/${customer.id}`"
            :class="[
              'flex flex-col rounded-md p-2 text-sm transition-colors',
              getLinkClasses(`/customers/${customer.id}`)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="truncate font-medium">{{ customer.first_name }} {{ customer.last_name }}</span>
            </div>
            <span v-if="!isNarrow" class="mt-0.5 truncate text-xs opacity-70">
              {{ customer.email }}
            </span>
          </Link>
        </div>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useStore } from 'vuex';
import IconBolt from '../_components/icons/IconBolt.vue';
import IconFolder from '../_components/icons/IconFolder.vue';
import IconUsers from '../_components/icons/IconUsers.vue';

// Component name definition for dev tools
defineOptions({
  name: 'SidebarLayoutProject',
});

// Composables
const { isCollapsed, toggleSidebar } = useSidebar();
const page = usePage();
const store = useStore();

// Local state
const scrollableRef = ref(null);
const isNarrow = ref(store.getters['Writes/isCollapsed']);
const currentView = ref('services'); // 'services', 'projects', 'customers'

// Get data from props
const services = computed(() => page.props.services || []);
const projects = computed(() => page.props.projects || []);
const customers = computed(() => page.props.customers || []);

// Determine current view based on URL
const url = computed(() => page.url || '');
watch(
  url,
  (newUrl) => {
    if (newUrl.startsWith('/services')) {
      currentView.value = 'services';
    } else if (newUrl.startsWith('/projects')) {
      currentView.value = 'projects';
    } else if (newUrl.startsWith('/customers')) {
      currentView.value = 'customers';
    }
  },
  { immediate: true }
);

const emit = defineEmits(['update:isNarrow']);

// Watch for isNarrow changes and emit to parent
watch(isNarrow, (newValue) => {
  emit('update:isNarrow', newValue);
});

const getLinkClasses = (href) => {
  const url = page.url;
  return url === href || url.startsWith(href + '/');
};

// Scroll handling with Vuex store
let scrollHandler = null;

const getScrollElement = () => {
  if (scrollableRef.value?.$el?.value) {
    return scrollableRef.value.$el.value;
  }
  if (scrollableRef.value?.$el) {
    return scrollableRef.value.$el;
  }
  return scrollableRef.value;
};

const saveScrollPosition = () => {
  const scrollElement = getScrollElement();
  if (scrollElement) {
    const scrollTop = scrollElement.scrollTop || 0;
    store.dispatch('Projects/setScrollPosition', scrollTop);
  }
};

const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Projects/scrollPosition'];
      if (savedPosition > 0) {
        scrollElement.scrollTop = savedPosition;
      }
    }
  });
};

const setupScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && !scrollHandler) {
    scrollHandler = () => saveScrollPosition();
    scrollElement.addEventListener('scroll', scrollHandler, { passive: true });
  }
};

const removeScrollListener = () => {
  const scrollElement = getScrollElement();
  if (scrollElement && scrollHandler) {
    scrollElement.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
};

onMounted(() => {
  isNarrow.value = store.getters['Writes/isCollapsed'];
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
});

onActivated(() => {
  nextTick(() => {
    setupScrollListener();
    restoreScrollPosition();
  });
});

onDeactivated(() => {
  saveScrollPosition();
  removeScrollListener();
});

onBeforeUnmount(() => {
  saveScrollPosition();
  removeScrollListener();
});
</script>

<style scoped>
:deep(.border-color-one) {
  border-color: hsl(var(--border)) !important;
}

/* Ensure header background is not affected by parent bg-muted */
.shrink-0.border-b {
  background: hsl(var(--background)) !important;
}

/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--muted) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--border) / 0.3), transparent);
  pointer-events: none;
}
</style>
