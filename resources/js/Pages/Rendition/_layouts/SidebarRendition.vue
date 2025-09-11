<template>
  <CheckSubsidebar :class="currentTheme">
    <TopSubsidebar title="DİL PAKETLERİ" :href="route('rendition.language-packs.create')" />
    <SubSidebarScreen>
      <div class="w-full overflow-y-auto">
        <div class="min-h-full space-y-1 p-3">
          <div
            v-for="languagePack in languagePacks"
            :key="languagePack.id"
            class="rounded-lg bg-base-100 p-3 transition-all duration-200 hover:shadow-sm"
            :class="
              getLinkClasses(`/rendition/words/${languagePack.slug}`)
                ? 'bg-primary/10 border-primary/20 border text-primary'
                : 'hover:bg-base-200'
            "
          >
            <Link
              :href="route('rendition.words.show', { word: languagePack.slug })"
              class="flex w-full items-center justify-between"
            >
              <div class="flex-1">
                <div class="text-sm font-medium text-base-content">{{ languagePack.name }}</div>
                <div class="text-base-content/60 text-xs uppercase">{{ languagePack.language }}</div>
              </div>
              <div class="badge badge-sm">{{ languagePack.word_count || 0 }}</div>
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
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
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
const auth = props.auth;

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const getLinkClasses = (href) => {
  return url === href ? 'active' : '';
};
</script>

<style scoped>
/* Sade tasarım için minimal stiller */
</style>
