<script setup lang="ts">
import { computed } from 'vue';

interface FeedItem {
  id?: string;
  title?: string;
  caption?: string;
  text?: string;
  description?: string;
  thumbnail?: string;
  media_url?: string;
  url: string;
  published_at?: string;
  type?: string;
}

interface Feed {
  platform: string;
  items: FeedItem[];
  count: number;
  last_updated: string;
}

interface Props {
  feeds: Record<string, Feed>;
}

const props = defineProps<Props>();

const platformIcons: Record<string, string> = {
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  medium: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z',
};

const platformColors: Record<string, string> = {
  youtube: 'from-red-500 to-red-600',
  instagram: 'from-pink-500 via-purple-500 to-orange-500',
  twitter: 'from-blue-400 to-blue-500',
  github: 'from-gray-700 to-gray-900',
  medium: 'from-green-600 to-green-700',
};

const platformNames: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  twitter: 'Twitter',
  github: 'GitHub',
  medium: 'Medium',
};

const activeFeedsCount = computed(() => {
  return Object.values(props.feeds).filter(feed => feed.count > 0).length;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Bugün';
  if (days === 1) return 'Dün';
  if (days < 7) return `${days} gün önce`;
  if (days < 30) return `${Math.floor(days / 7)} hafta önce`;
  return `${Math.floor(days / 30)} ay önce`;
};
</script>

<template>
  <div v-if="activeFeedsCount > 0" class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-semibold">Son Aktiviteler</h2>
      <p class="mt-2 text-sm text-muted-foreground">Sosyal medya hesaplarımdaki son paylaşımlar</p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="(feed, platform) in feeds" :key="platform">
        <div v-if="feed.count > 0" class="group rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg">
          <!-- Platform Header -->
          <div :class="['flex items-center gap-3 rounded-t-xl bg-gradient-to-r p-4', platformColors[platform]]">
            <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path :d="platformIcons[platform]" />
            </svg>
            <h3 class="font-semibold text-white">{{ platformNames[platform] }}</h3>
            <span class="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
              {{ feed.count }}
            </span>
          </div>

          <!-- Feed Items -->
          <div class="divide-y p-4">
            <template v-for="(item, idx) in feed.items.slice(0, 3)" :key="item.id || idx">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block py-3 first:pt-0 last:pb-0 transition-colors hover:bg-accent"
              >
                <div class="flex gap-3">
                  <!-- Thumbnail -->
                  <div
                    v-if="item.thumbnail || item.media_url"
                    class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
                  >
                    <img
                      :src="item.thumbnail || item.media_url"
                      :alt="item.title || item.caption || 'Thumbnail'"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-1 space-y-1">
                    <p class="line-clamp-2 text-sm font-medium">
                      {{ item.title || item.caption || item.text || 'Başlık yok' }}
                    </p>
                    <p v-if="item.published_at" class="text-xs text-muted-foreground">
                      {{ formatDate(item.published_at) }}
                    </p>
                  </div>
                </div>
              </a>
            </template>
          </div>

          <!-- Footer -->
          <div class="border-t bg-muted/50 px-4 py-3 text-center">
            <a
              :href="feed.items[0]?.url.split('/').slice(0, 3).join('/')"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-medium text-primary hover:underline"
            >
              Tümünü Gör →
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
