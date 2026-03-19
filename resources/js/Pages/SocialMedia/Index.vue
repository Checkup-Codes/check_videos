<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  is_active: boolean;
  order: number;
}

interface Props {
  socialMedia: SocialMedia[];
}

const props = defineProps<Props>();

const availablePlatforms = {
  Instagram: 'instagram',
  Youtube: 'youtube',
  Github: 'github',
  Linkedin: 'linkedin',
  Medium: 'medium',
  Twitter: 'twitter',
  X: 'x-twitter',
  Facebook: 'facebook',
  Tiktok: 'tiktok',
  Pinterest: 'pinterest',
};

const platformIcons: Record<string, string> = {
  Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  Youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  Github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  Twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  X: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  Medium: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z',
  Linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  Tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  Pinterest: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z',
};

const editingId = ref<number | null>(null);

const form = useForm({
  platform: '',
  url: '',
  is_active: true,
  order: 0,
});

const submitForm = () => {
  if (editingId.value) {
    form.put(`/social-media/${editingId.value}`, {
      preserveScroll: true,
      onSuccess: () => {
        editingId.value = null;
        form.reset();
      },
    });
  } else {
    form.post('/social-media', {
      preserveScroll: true,
      onSuccess: () => form.reset(),
    });
  }
};

const startEdit = (link: SocialMedia) => {
  editingId.value = link.id;
  form.platform = link.platform;
  form.url = link.url;
  form.is_active = link.is_active;
  form.order = link.order;
};

const cancelEdit = () => {
  editingId.value = null;
  form.reset();
};

const toggleStatus = (link: SocialMedia) => {
  useForm({
    platform: link.platform,
    url: link.url,
    is_active: !link.is_active,
    order: link.order,
  }).put(`/social-media/${link.id}`, {
    preserveScroll: true,
  });
};

const deleteLink = (link: SocialMedia) => {
  if (confirm('Bu sosyal medya linkini silmek istediğinizden emin misiniz?')) {
    useForm({}).delete(`/social-media/${link.id}`, {
      preserveScroll: true,
    });
  }
};
</script>

<template>
  <Head title="Sosyal Medya Yönetimi" />

  <AuthenticatedLayout>
    <div class="container mx-auto max-w-7xl space-y-8 p-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Sosyal Medya</h1>
        <p class="mt-1 text-sm text-muted-foreground">Sosyal medya hesaplarınızı yönetin</p>
      </div>

      <!-- Add/Edit Form -->
      <div class="rounded-lg border bg-card p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">{{ editingId ? 'Düzenle' : 'Yeni Ekle' }}</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <InputLabel for="platform" value="Platform" />
              <select
                id="platform"
                v-model="form.platform"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Platform Seçin</option>
                <option v-for="(icon, platform) in availablePlatforms" :key="platform" :value="platform">
                  {{ platform }}
                </option>
              </select>
              <InputError :message="form.errors.platform" />
            </div>

            <div class="space-y-2">
              <InputLabel for="url" value="URL" />
              <TextInput id="url" v-model="form.url" type="url" class="w-full" required />
              <InputError :message="form.errors.url" />
            </div>
          </div>

          <div class="flex gap-2">
            <PrimaryButton :disabled="form.processing">
              {{ editingId ? 'Güncelle' : 'Ekle' }}
            </PrimaryButton>
            <SecondaryButton v-if="editingId" @click="cancelEdit" type="button">İptal</SecondaryButton>
          </div>
        </form>
      </div>

      <!-- Social Media Links Grid -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="link in socialMedia"
          :key="link.id"
          class="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
        >
          <div class="p-6">
            <!-- Platform Icon & Name -->
            <div class="mb-4 flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="rounded-lg bg-primary/10 p-2.5">
                  <svg class="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="platformIcons[link.platform]" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold">{{ link.platform }}</p>
                  <button
                    @click="toggleStatus(link)"
                    :class="[
                      'mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                      link.is_active
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
                    ]"
                  >
                    {{ link.is_active ? 'Aktif' : 'Pasif' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- URL -->
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mb-4 block truncate text-sm text-muted-foreground hover:text-primary"
            >
              {{ link.url }}
            </a>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="startEdit(link)"
                class="flex-1 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                Düzenle
              </button>
              <button
                @click="deleteLink(link)"
                class="rounded-md border border-destructive bg-background px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
              >
                Sil
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="socialMedia.length === 0"
          class="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12"
        >
          <svg class="mb-4 h-12 w-12 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <p class="text-sm text-muted-foreground">Henüz sosyal medya hesabı eklenmemiş</p>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
