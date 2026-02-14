<template>
  <CheckSubsidebar :isNarrow="isNarrow">
    <!-- Header -->
    <div class="relative z-10 shrink-0 border-b border-border bg-background p-3">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sertifikalar</span>
        <Link v-if="isLoggedIn" :href="route('certificates.create')" class="inline-flex items-center justify-center rounded-md bg-primary p-1.5 text-primary-foreground hover:bg-primary/90">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
      </div>
    </div>
    
    <!-- Scrollable Content - Certificate List -->
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded min-h-0 flex-1" :infoClass="'flex-1 min-h-0'">
      <div class="space-y-1 p-2">
        <Link
          v-for="certificate in certificates"
          :key="certificate.id"
          :href="route('certificates.show', certificate.slug)"
          class="group block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-accent"
          :class="{ 'border-primary bg-primary/5': isActiveCertificate(certificate.slug) }"
        >
          <div class="flex items-start gap-3">
            <!-- Thumbnail -->
            <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <img v-if="certificate.image" :src="certificate.image" :alt="certificate.title" class="h-full w-full object-cover" />
              <div v-else class="flex h-full items-center justify-center">
                <svg class="h-6 w-6 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            <!-- Info -->
            <div class="min-w-0 flex-1">
              <h4 class="truncate text-[11px] font-medium text-foreground group-hover:text-primary" :class="{ 'text-primary': isActiveCertificate(certificate.slug) }">
                {{ certificate.title }}
              </h4>
              <p class="mt-0.5 truncate text-[10px] text-muted-foreground">{{ certificate.issuer }}</p>
              <p class="mt-1 text-[10px] text-muted-foreground">{{ formatDate(certificate.issue_date) }}</p>
            </div>
          </div>
        </Link>
        
        <!-- Empty State -->
        <div v-if="certificates.length === 0" class="py-8 text-center">
          <svg class="mx-auto h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-2 text-xs text-muted-foreground">Henüz sertifika yok</p>
        </div>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';
import { useStore } from 'vuex';

defineOptions({
  name: 'SidebarLayoutCertificate',
});

const page = usePage();
const store = useStore();

const certificates = computed(() => page.props.certificates || []);
const isLoggedIn = computed(() => page.props.auth?.user);

const isNarrow = ref(store.getters['Writes/isCollapsed']);
const scrollableRef = ref(null);

const emit = defineEmits(['update:isNarrow']);

const isActiveCertificate = (slug) => {
  return route().current('certificates.show', slug);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
};

// Scroll handling
let scrollHandler = null;

const getScrollElement = () => {
  if (scrollableRef.value?.$el?.value) return scrollableRef.value.$el.value;
  if (scrollableRef.value?.$el) return scrollableRef.value.$el;
  return scrollableRef.value;
};

const saveScrollPosition = () => {
  const scrollElement = getScrollElement();
  if (scrollElement) {
    const scrollTop = scrollElement.scrollTop || 0;
    store.dispatch('Certificates/setScrollPosition', scrollTop);
  }
};

const restoreScrollPosition = () => {
  nextTick(() => {
    const scrollElement = getScrollElement();
    if (scrollElement) {
      const savedPosition = store.getters['Certificates/scrollPosition'];
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
.shrink-0.border-b {
  background: hsl(var(--background)) !important;
}

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
