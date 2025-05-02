<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="DİL PAKETLERİ" :href="route('rendition.language-packs.create')" />
    <SubSidebarScreen>
      <div class="w-full overflow-y-auto">
        <div class="min-h-full">
          <ul class="menu bg-base-100 rounded-box w-full">
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
                <div class="badge badge-sm badge-outline">{{ languagePack.word_count || 0 }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </SubSidebarScreen>
  </CheckSubsidebar>
</template>

<script setup>
import { ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';
import SubSidebarScreen from '@/Components/CekapUI/Slots/SubSidebarScreen.vue';

const { props, url } = usePage();
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
  background-color: rgba(0, 0, 0, 0.05);
}

.menu :where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)).active {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  border-left: 3px solid #000;
}

.badge-outline {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.65rem;
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
