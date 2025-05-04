<template>
  <Head>
    <!-- Basic SEO metadata -->
    <title>{{ computedTitle }}</title>
    <meta name="description" :content="computedDescription" />
    <meta v-if="keywords" name="keywords" :content="keywords" />

    <!-- Open Graph metadata for social sharing -->
    <meta property="og:title" :content="computedTitle" />
    <meta property="og:description" :content="computedDescription" />
    <meta property="og:type" :content="type" />
    <meta property="og:url" :content="url" />
    <meta v-if="image" property="og:image" :content="image" />
    <meta property="og:site_name" :content="siteName" />

    <!-- Twitter Card metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" :content="computedTitle" />
    <meta name="twitter:description" :content="computedDescription" />
    <meta v-if="image" name="twitter:image" :content="image" />

    <!-- Canonical URL -->
    <link v-if="canonical" rel="canonical" :href="canonical" />
  </Head>
</template>

<script setup>
import { computed } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';

/**
 * PageMeta component for SEO optimization
 * Controls how the page appears in search results and social sharing
 */
defineOptions({
  name: 'PageMeta',
});

const props = defineProps({
  /**
   * Page title (without site name)
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * Page description (max 160 characters recommended)
   */
  description: {
    type: String,
    default: '',
  },

  /**
   * Comma-separated keywords
   */
  keywords: {
    type: String,
    default: '',
  },

  /**
   * Site name to append to title
   */
  siteName: {
    type: String,
    default: 'Yazı Platformu',
  },

  /**
   * Page type for Open Graph
   */
  type: {
    type: String,
    default: 'website',
  },

  /**
   * Image URL for social sharing
   */
  image: {
    type: String,
    default: '',
  },

  /**
   * Current page URL
   */
  url: {
    type: String,
    default: '',
  },

  /**
   * Canonical URL
   */
  canonical: {
    type: String,
    default: '',
  },

  /**
   * Whether to include site name in title
   */
  appendSiteName: {
    type: Boolean,
    default: true,
  },
});

/**
 * Get current URL if not provided
 */
const page = usePage();
const currentUrl = computed(() => {
  return props.url || window.location.href;
});

/**
 * Generate full title with site name if needed
 */
const computedTitle = computed(() => {
  if (!props.title) {
    return props.siteName;
  }

  return props.appendSiteName ? `${props.title} - ${props.siteName}` : props.title;
});

/**
 * Ensure description doesn't exceed recommended length
 */
const computedDescription = computed(() => {
  const description = props.description || '';
  return description.length > 160 ? `${description.substring(0, 157)}...` : description;
});
</script>
