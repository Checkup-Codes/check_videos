<template>
  <Head>
    <title>{{ pageTitle }}</title>
    <meta v-if="pageMeta.description" name="description" :content="pageMeta.description" />
    <meta v-if="pageMeta.keywords" name="keywords" :content="pageMeta.keywords" />
  </Head>
  <FlashMessage :message="flashSuccess" />
  <ToggleSubSidebarButtonOpen v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <template #sidebar>
      <KeepAlive :max="5" :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']">
        <component
          :is="sidebarComponent"
          :key="screenName"
          @update:isCollapsed="handleSidebarCollapse"
          :class="sidebarStyle"
        />
      </KeepAlive>
    </template>
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { usePage, Head, router } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutWritesCategories',
});

// Get page props
const { props } = usePage();
const isMobile = props.screen.isMobileSidebar;
const sidebarStyle = isMobile ? '' : 'hidden lg:block';
const screenName = props.screen.name;

// Generate SEO-friendly title with site name
const siteName = 'Yazı Platformu';
const pageTitle = computed(() => {
  if (props.write) {
    // If we're viewing a specific write, use its title
    return `${props.write.title} - ${siteName}`;
  } else if (props.category) {
    // If we're viewing a specific category
    return `${props.category.name} - ${siteName}`;
  } else {
    // Default title based on screen name
    return `${screenName.charAt(0).toUpperCase() + screenName.slice(1)} - ${siteName}`;
  }
});

// Generate meta description and keywords
const pageMeta = computed(() => {
  const meta = {
    description: '',
    keywords: '',
  };

  if (props.write) {
    // Use meta_description if available, otherwise fall back to summary or truncated content
    meta.description =
      props.write.meta_description ||
      props.write.summary ||
      truncateText(props.write.content?.replace(/<[^>]*>?/gm, ''), 160);
    meta.keywords = props.write.seo_keywords || '';
  } else if (props.category) {
    // Use category description for meta description
    meta.description = props.category.description || `${props.category.name} kategorisindeki yazılar`;
  } else {
    // Default description based on screen name
    if (screenName === 'writes') {
      meta.description = 'Yazı platformunda paylaşılan tüm içerikler';
    } else if (screenName === 'categories') {
      meta.description = 'Yazı platformundaki tüm kategoriler';
    }
  }

  return meta;
});

// Helper function to truncate text to a specific length
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const flashSuccess = ref(props.flash.success);
const isSidebarCollapsed = ref(true);

// Sidebar component mapping
const sidebarComponents = {
  writes: SidebarLayoutWrite,
  categories: SidebarLayoutCategory,
};

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isSidebarCollapsed.value && screenName) {
    return sidebarComponents[screenName] || null;
  }
  return null;
});

// Setup default navigation behavior when component is mounted
onMounted(() => {
  // Preserve scroll and state when navigating between writes and categories
  if (window.Inertia) {
    window.Inertia.visit = Object.assign(window.Inertia.visit, {
      preserveScroll: true,
      preserveState: true,
    });
  }
});

// Event handlers for sidebar collapse state
const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
