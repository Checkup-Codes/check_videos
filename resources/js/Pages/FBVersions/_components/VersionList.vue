<template>
  <div class="space-y-1 p-2">
    <Link
      v-for="version in versions"
      :key="version.id"
      :href="`/versions/${version.version}`"
      :class="[
        'block rounded-lg p-3',
        isActive(version) ? 'bg-primary text-primary-foreground' : 'border border-border bg-card hover:bg-accent',
      ]"
    >
      <h3
        class="text-sm font-medium leading-tight"
        :class="isActive(version) ? 'text-primary-foreground' : 'text-foreground'"
      >
        {{ version.version }}
      </h3>
      <div
        class="flex items-center gap-3 text-xs"
        :class="isActive(version) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="truncate">{{ formatDate(version.release_date) }}</span>
        </span>
      </div>
    </Link>

    <!-- Empty state -->
    <div
      v-if="versions && versions.length === 0"
      class="flex h-32 items-center justify-center text-center text-muted-foreground"
    >
      <div>Henüz versiyon bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineOptions({ name: 'VersionList' });

const props = defineProps({
  versions: { type: Array, required: true },
  currentUrl: { type: String, required: true },
});

const isActive = (version) => {
  const href = `/versions/${version.version}`;
  return props.currentUrl === href || props.currentUrl.startsWith(href + '/');
};

const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Yok';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
};
</script>
