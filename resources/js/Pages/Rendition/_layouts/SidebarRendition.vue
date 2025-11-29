<template>
  <CheckSubsidebar :isNarrow="isNarrow" :class="currentTheme">
    <SubSidebarScreen ref="scrollableRef" class="sidebar-content-embedded">
      <div class="w-full overflow-y-auto">
        <div class="min-h-full space-y-1 p-3">
          <div
            v-for="languagePack in languagePacks"
            :key="languagePack.id"
            class="rounded-lg bg-background p-3 transition-all duration-200"
            :class="
              getLinkClasses(`/rendition/words/${languagePack.slug}`)
                ? 'bg-primary text-primary-foreground'
                : 'border border-border hover:bg-muted'
            "
          >
            <Link
              :href="route('rendition.words.show', { word: languagePack.slug })"
              class="flex w-full items-center justify-between"
            >
              <div class="flex-1">
                <div
                  class="text-sm font-medium leading-tight"
                  :class="
                    getLinkClasses(`/rendition/words/${languagePack.slug}`) ? 'text-primary-foreground' : 'text-foreground'
                  "
                >
                  {{ languagePack.name }}
                </div>
                <div
                  class="text-xs uppercase"
                  :class="
                    getLinkClasses(`/rendition/words/${languagePack.slug}`)
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  "
                >
                  {{ languagePack.language }}
                </div>
              </div>
              <div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {{ languagePack.word_count || 0 }}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

const { props, url } = usePage();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

const languagePacks = computed(() => {
  const packs = props.languagePacks || [];
  // Kelime sayısına göre azalan sıralama (en fazla kelime en üstte)
  return packs.sort((a, b) => (b.word_count || 0) - (a.word_count || 0));
});

const isNarrow = ref(false);
const scrollableRef = ref(null);

const getLinkClasses = (href) => {
  return url === href ? 'active' : '';
};
</script>

<style scoped>
/* Embedded sidebar content design - subtle recessed effect */
:deep(.sidebar-content-embedded) {
  background: hsl(var(--background) / 0.7) !important;
  position: relative;
}

:deep(.sidebar-content-embedded)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--muted) / 0.3), transparent);
  pointer-events: none;
}
</style>
