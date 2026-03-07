<template>
  <div class="group rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm">
    <div class="flex items-center justify-between gap-3 p-4">
      <div class="flex flex-1 items-center gap-3 min-w-0" :class="{ 'cursor-pointer': hasChildren }" @click="toggle">
        <!-- Icon -->
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 transition-all group-hover:from-primary/30 group-hover:to-primary/10">
          <svg class="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{{ service.name }}</h3>
            <button
              v-if="hasChildren"
              @click.stop="toggle"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              :title="isOpen ? 'Daralt' : 'Genişlet'"
            >
              <svg
                class="h-3.5 w-3.5 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <p v-if="service.description" class="mt-1 line-clamp-1 text-xs text-muted-foreground">
            {{ stripHtml(service.description) }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Price Badge -->
        <div
          v-if="service.price"
          class="hidden items-center rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 text-xs font-semibold text-primary sm:flex"
        >
          {{ formatPrice(service.price) }}
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-0.5">
          <Link
            :href="`/services/${service.id}`"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title="Görüntüle"
            @click.stop
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>

          <Link
            :href="`/services/${service.id}/edit`"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title="Düzenle"
            @click.stop
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>

    <!-- Children - Minimal List Style -->
    <div v-if="isOpen && children.length" class="border-t border-border bg-muted/10 px-4 py-2">
      <ul class="space-y-0.5">
        <li
          v-for="child in children"
          :key="child.id"
          class="group/child flex items-center justify-between gap-2 rounded-md px-3 py-2 transition-colors hover:bg-accent/50"
        >
          <Link
            :href="`/services/${child.id}`"
            class="flex min-w-0 flex-1 items-center gap-2"
          >
            <svg class="h-3 w-3 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="truncate text-xs font-medium text-foreground group-hover/child:text-primary transition-colors">{{ child.name }}</span>
          </Link>
          <div class="flex items-center gap-2 shrink-0">
            <span v-if="child.price" class="text-xs font-medium text-primary">{{ formatPrice(child.price) }}</span>
            <Link
              :href="`/services/${child.id}/edit`"
              class="opacity-0 transition-opacity group-hover/child:opacity-100"
              @click.stop
            >
              <svg class="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
  allServices: {
    type: Array,
    required: true,
  },
});

const hasChildren = computed(() => {
  return props.allServices.some((child) => child.sub_category_id === props.service.id);
});

const children = computed(() => {
  return props.allServices.filter((child) => child.sub_category_id === props.service.id);
});

const isOpen = ref(false);

const toggle = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
};

const formatPrice = (price) => {
  if (!price) return '₺0';
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(price);
};

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
</script>
