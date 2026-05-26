<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl px-1 py-4 sm:px-2">
      <div class="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <h1 class="text-lg font-semibold text-foreground">Projeler</h1>
          <p class="text-xs text-muted-foreground">{{ projects.length }} kayıt</p>
        </div>
      </div>

      <div
        v-if="projects.length === 0"
        class="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
      >
        Henüz proje yok.
      </div>

      <div v-else class="divide-y divide-border rounded-md border border-border">
        <Link
          v-for="project in projects"
          :key="project.id"
          :href="`/projects/${project.id}`"
          class="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40"
        >
          <div class="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30" @click.stop>
            <ZoomableImage
              v-if="coverImage(project)"
              :src="coverImage(project)"
              :alt="project.project_name"
              :gallery="project.images || []"
              wrapper-class="h-full w-full"
              img-class="h-full w-full object-cover"
            />
            <div v-else class="flex h-full w-full items-center justify-center text-muted-foreground">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-foreground">{{ project.project_name }}</p>
            <p v-if="!isGuestView && project.customer" class="truncate text-xs text-muted-foreground">
              {{ project.customer.first_name }} {{ project.customer.last_name }}
            </p>
          </div>

          <span v-if="project.services?.length" class="shrink-0 text-xs text-muted-foreground">
            {{ project.services.length }} hizmet
          </span>
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import ZoomableImage from '@/Components/CekapUI/Image/ZoomableImage.vue';

const page = usePage();
const projects = computed(() => page.props.projects || []);
const isGuestView = computed(() => !!page.props.isGuestView);

const coverImage = (project) => project.images?.[0]?.image_path || null;
</script>
