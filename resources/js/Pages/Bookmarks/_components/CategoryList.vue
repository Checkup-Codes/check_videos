<template>
  <div class="space-y-1 p-2">
    <Link
      v-for="category in categories"
      :key="category.id"
      :href="`/bookmarks?category=${category.id}`"
      :class="[
        'block rounded-lg p-3',
        isActive(category) ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:bg-accent',
      ]"
    >
      <h4
        class="text-[11px] font-medium leading-tight"
        :class="isActive(category) ? 'text-primary-foreground' : 'text-foreground'"
      >
        {{ category.name }}
      </h4>
      <div
        class="flex items-center gap-3 text-[10px]"
        :class="isActive(category) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
      >
        <span class="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span class="truncate">{{ category.bookmarks?.length || 0 }} yer imi</span>
        </span>
      </div>
    </Link>

    <!-- Empty state -->
    <div
      v-if="categories && categories.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground"
    >
      <div>Henüz kategori bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineOptions({ name: 'CategoryList' });

const props = defineProps({
  categories: { type: Array, required: true },
  currentUrl: { type: String, required: true },
});

const isActive = (category) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('category') === category.id;
};
</script>

