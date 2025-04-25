<template>
  <CheckSubsidebar>
    <ToggleSubSidebarButtonClose :isCollapsed="false" :toggle="collapseSidebar" />
    <TopSubsidebar title="PAKETLER" :href="route('rendition.language-packs.create')" />
    <div ref="scrollContainer" class="h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain lg:h-[calc(100vh-5rem)]">
      <div class="min-h-full">
        <Link
          v-for="languagePack in languagePacks"
          :key="languagePack.slug"
          :href="route('rendition.words.show', { word: languagePack.slug })"
          class="block border-b px-4 py-2 transition-all hover:bg-gray-100"
        >
          <div class="text-base font-semibold">{{ languagePack.name }}</div>
          <div class="mt-1 flex items-center justify-between text-sm text-gray-600">
            <span>Words: {{ languagePack.word_count }}</span>
            <span class="uppercase tracking-wide text-gray-500">{{ languagePack.language }}</span>
          </div>
        </Link>
      </div>
    </div>
  </CheckSubsidebar>
</template>

<script setup>
import { ref } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Modals/CheckSubsidebar.vue';
import ToggleSubSidebarButtonClose from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import TopSubsidebar from '@/Components/CekapUI/Typography/TopSubsidebar.vue';

const { props, url } = usePage();
const languagePacks = props.languagePacks;
const auth = props.auth;

const isCollapsed = ref(true);
const emit = defineEmits(['update:isCollapsed']);

const collapseSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:isCollapsed', isCollapsed.value);
};
</script>
