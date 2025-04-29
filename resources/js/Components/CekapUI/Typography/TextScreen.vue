<template>
  <div class="bg-white text-gray-800 container p-5">
    <div class="prose-lg ql-container-custom prose-custom prose mb-8" v-html="content"></div>
    <div class="rounded-md border-gray-200 bg-white p-3 shadow-inner">
      <h2 class="text-gray-800-light mb-3 text-xl font-semibold">Özet</h2>
      <div class="rounded-md bg-white break-words p-4">
        {{ summary }}
      </div>
    </div>
    <div v-if="user" class="mt-4 flex justify-end space-x-3">
      <Link :href="`/writes/${id}/edit`">
        <Button class="rounded-md"> Yazıyı Düzenle </Button>
      </Link>
      <Button class="rounded-md" @click="onDelete"> Yazıyı Sil </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import Button from '@/Components/CekapUI/Buttons/Button.vue';

const props = defineProps({
  content: String,
  summary: String,
  id: Number,
  user: Object,
});

const onDelete = () => {
  if (confirm('Are you sure you want to delete this write?')) {
    router
      .delete(route('writes.destroy', id))
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting write:', error);
      });
  }
};
</script>

<style>
/* Global styles for v-html content */
.prose-custom {
  color: var(--color-text);
  border-color: var(--color-border);
  background-color: var(--color-background);
}

.prose-custom h1,
.prose-custom h2,
.prose-custom h3,
.prose-custom h4,
.prose-custom h5,
.prose-custom h6 {
  color: var(--color-text-dark);
  border-bottom: var(--border-width) solid var(--color-border-light);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.prose-custom p,
.prose-custom ul,
.prose-custom ol {
  color: var(--color-text);
}

.prose-custom a {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: var(--border-width) solid var(--color-primary);
  transition: all 0.2s ease;
}

.prose-custom a:hover {
  color: var(--color-primary-600);
  border-bottom-color: var(--color-primary-600);
}

.prose-custom blockquote {
  color: var(--color-text-light);
  border-left: calc(var(--border-width) * 4) solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: var(--color-border-light);
  padding: 1rem;
  margin: 1.5rem 0;
}

.prose-custom code {
  background-color: var(--color-border-light);
  color: var(--color-text);
  padding: 0.2rem 0.4rem;
  border-radius: calc(var(--border-radius) * 0.5);
  font-size: 0.875em;
}

.prose-custom pre {
  background-color: var(--color-border-light);
  color: var(--color-text);
  padding: 1rem;
  border-radius: var(--border-radius);
  border: var(--border-width) solid var(--color-border);
  overflow-x: auto;
}

.prose-custom hr {
  border: none;
  border-top: var(--border-width) solid var(--color-border);
  margin: 2rem 0;
}

.prose-custom strong {
  color: var(--color-text-dark);
}

.prose-custom table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5rem 0;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.prose-custom th {
  color: var(--color-text-dark);
  background-color: var(--color-border-light);
  padding: 0.75rem;
  text-align: left;
  border-bottom: calc(var(--border-width) * 2) solid var(--color-border);
}

.prose-custom td {
  color: var(--color-text);
  padding: 0.75rem;
  border: var(--border-width) solid var(--color-border);
}

.prose-custom img {
  border-radius: var(--border-radius);
  border: var(--border-width) solid var(--color-border-light);
  max-width: 100%;
  height: auto;
}

.prose-custom figure {
  margin: 1.5rem 0;
}

.prose-custom figure figcaption {
  color: var(--color-text-light);
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875em;
}

/* Lists */
.prose-custom ul,
.prose-custom ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.prose-custom li {
  margin: 0.5rem 0;
}

.prose-custom ul > li::before {
  content: '•';
  color: var(--color-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.prose-custom ol {
  list-style-type: decimal;
  list-style-position: inside;
}

/* Özel Quill Stilleri */
.ql-container-custom {
  font-family: var(--font-family) !important;
}

.ql-container-custom .ql-editor {
  padding: 0;
}

.ql-container-custom .ql-editor pre.ql-syntax {
  background-color: var(--color-border-light);
  color: var(--color-text);
  border-radius: var(--border-radius);
  border: var(--border-width) solid var(--color-border);
}
</style>
