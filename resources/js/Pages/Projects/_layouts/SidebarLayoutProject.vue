<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <SubSidebarHeader>
      <ProjectsModuleTabs compact embedded :show-labels="!isNarrow" />
    </SubSidebarHeader>
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <SubSidebarContent>
        <!-- Services List -->
        <div v-if="currentView === 'services'" class="space-y-1">
          <div v-if="!services || services.length === 0" class="p-2 text-[10px] text-muted-foreground">
            Henüz hizmet bulunmamaktadır.
          </div>
          <Link
            v-for="service in services"
            :key="service.id"
            :href="`/services/${service.id}`"
            :class="[
              'block rounded-lg p-3 transition-colors',
              getLinkClasses(`/services/${service.id}`)
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card hover:bg-accent',
            ]"
          >
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30" @click.stop>
                <ZoomableImage
                  v-if="service.images?.[0]?.image_path"
                  :src="service.images[0].image_path"
                  :alt="service.name"
                  :gallery="service.images"
                  wrapper-class="h-full w-full"
                  img-class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full w-full items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <span class="truncate text-[11px] font-medium leading-tight">{{ service.name }}</span>
            </div>
            <span
              v-if="!isNarrow && service.description"
              class="mt-1 block truncate text-[10px]"
              :class="getLinkClasses(`/services/${service.id}`) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
            >
              {{ stripHtml(service.description) }}
            </span>
          </Link>
        </div>

        <!-- Projects List -->
        <div v-if="currentView === 'projects'" class="space-y-1">
          <div v-if="!projects || projects.length === 0" class="p-2 text-[10px] text-muted-foreground">
            Henüz proje bulunmamaktadır.
          </div>
          <Link
            v-for="project in projects"
            :key="project.id"
            :href="`/projects/${project.id}`"
            :class="[
              'block rounded-lg p-3 transition-colors',
              getLinkClasses(`/projects/${project.id}`)
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card hover:bg-accent',
            ]"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 shrink-0"
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
              <span class="truncate text-[11px] font-medium leading-tight">{{ project.project_name }}</span>
            </div>
            <span
              v-if="!isNarrow && project.customer"
              class="mt-1 block truncate text-[10px]"
              :class="getLinkClasses(`/projects/${project.id}`) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
            >
              {{ project.customer.first_name }} {{ project.customer.last_name }}
            </span>
          </Link>
        </div>

        <!-- Customers List -->
        <div v-if="currentView === 'customers' && showCustomers" class="space-y-1">
          <div v-if="!customers || customers.length === 0" class="p-2 text-[10px] text-muted-foreground">
            Henüz müşteri bulunmamaktadır.
          </div>
          <Link
            v-for="customer in customers"
            :key="customer.id"
            :href="`/customers/${customer.id}`"
            :class="[
              'block rounded-lg p-3 transition-colors',
              getLinkClasses(`/customers/${customer.id}`)
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card hover:bg-accent',
            ]"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 shrink-0"
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
              <span class="truncate text-[11px] font-medium leading-tight">{{ customer.first_name }} {{ customer.last_name }}</span>
            </div>
            <span
              v-if="!isNarrow"
              class="mt-1 block truncate text-[10px]"
              :class="getLinkClasses(`/customers/${customer.id}`) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
            >
              {{ customer.email }}
            </span>
          </Link>
        </div>
      </SubSidebarContent>
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
import ProjectsModuleTabs from '../_components/ProjectsModuleTabs.vue';
import SubSidebarHeader from '@/Components/CekapUI/Layout/SubSidebarHeader.vue';
import SubSidebarContent from '@/Components/CekapUI/Layout/SubSidebarContent.vue';
import { stripHtml } from '@/utils/stripHtml';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';
import { useModuleVisibility } from '@/composables/useModuleVisibility';

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

// Get data from props
const services = computed(() => page.props.services || []);
const projects = computed(() => page.props.projects || []);
const customers = computed(() => page.props.customers || []);
const showCustomers = useModuleVisibility('customers');

const currentView = computed(() => {
  const url = page.url || '';

  if (url.startsWith('/projects')) {
    return 'projects';
  }

  if (url.startsWith('/customers')) {
    return 'customers';
  }

  return 'services';
});

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
