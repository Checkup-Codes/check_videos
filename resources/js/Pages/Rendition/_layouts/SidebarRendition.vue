<template>
  <CheckSubsidebar :class="currentTheme">
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="DİL PAKETLERİ" :href="route('rendition.language-packs.create')" />
    <SubSidebarScreen>
      <div class="w-full overflow-y-auto">
        <div class="min-h-full">
          <ul class="menu w-full rounded-box bg-base-100">
            <li v-for="languagePack in languagePacks" :key="languagePack.id" class="mb-1">
              <div class="flex w-full items-center">
                <Link
                  :href="route('rendition.words.show', { word: languagePack.slug })"
                  :class="[
                    getLinkClasses(`/rendition/words/${languagePack.slug}`),
                    'flex flex-grow items-center font-medium',
                  ]"
                >
                  <span class="text-base">{{ languagePack.name }}</span>
                  <span class="text-base-content/70 ml-2 text-xs uppercase">{{ languagePack.language }}</span>
                </Link>
                <div class="badge badge-outline badge-sm">{{ languagePack.word_count || 0 }}</div>
              </div>
            </li>
          </ul>
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
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

const { props, url } = usePage();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

const languagePacks = props.languagePacks || [];
const auth = props.auth;

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};

const getLinkClasses = (href) => {
  return url === href ? 'active' : '';
};
</script>

<style scoped>
.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)):not(.active):focus,
.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)):not(.active):hover {
  background-color: hsl(var(--bc) / 0.05);
}

.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)).active {
  background-color: hsl(var(--bc) / 0.1);
  color: hsl(var(--bc));
  font-weight: 600;
  border-left: 3px solid hsl(var(--p));
}

.badge-outline {
  background-color: transparent;
  border-color: hsl(var(--bc) / 0.2);
  color: hsl(var(--bc) / 0.7);
  font-size: 0.65rem;
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
