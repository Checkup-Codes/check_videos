<template>
  <!-- Delete Confirmation Modal -->
  <DeleteConfirmationModal
    :is-open="showDeleteModal"
    :title="deleteModalTitle"
    :message="deleteModalMessage"
    :warning="deleteModalWarning"
    :is-deleting="isDeleting"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />

  <!-- Write Show Page Actions -->
  <template v-if="isWriteShowPage && !isWriteEditPage && isLoggedIn && write">
    <div :class="containerClass">
      <Link
        :href="route('writes.edit', write.id)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteWrite(write.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Write Edit Page Actions - Only Delete Button -->
  <template v-else-if="isWriteEditPage && isLoggedIn && write">
    <Button
      @click="deleteWrite(write.id)"
      variant="outline"
      size="sm"
      class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-1.5 h-3.5 w-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      Sil
    </Button>
  </template>

  <!-- Category Show Page Actions -->
  <template v-else-if="isCategoryShowPage && !isCategoryEditPage && isLoggedIn && category">
    <div :class="containerClass">
      <Link
        :href="route('categories.edit', category.id)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteCategory(category.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Category Edit Page Actions - Only Delete Button -->
  <template v-else-if="isCategoryEditPage && isLoggedIn && category">
    <Button
      @click="deleteCategory(category.id)"
      variant="outline"
      size="sm"
      class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-1.5 h-3.5 w-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      Sil
    </Button>
  </template>

  <!-- Word Show Page Actions -->
  <template v-else-if="isWordShowPage && isLoggedIn && word">
    <div :class="containerClass">
      <Link
        :href="route('rendition.words.edit', word.id)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteWord(word.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Version Show Page Actions -->
  <template v-else-if="isVersionShowPage && isLoggedIn && version">
    <div :class="containerClass">
      <Link
        :href="route('versions.edit', version.id)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteVersion(version.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Test Category Show Page Actions -->
  <template v-else-if="isTestCategoryShowPage && !isTestCategoryEditPage && isLoggedIn && testCategory">
    <div :class="containerClass">
      <Link
        :href="route('test-categories.edit', testCategory.slug)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteTestCategory(testCategory.slug || testCategory.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Test Category Edit Page Actions - Only Delete Button -->
  <template v-else-if="isTestCategoryEditPage && isLoggedIn && testCategory">
    <Button
      @click="deleteTestCategory(testCategory.slug || testCategory.id)"
      variant="outline"
      size="sm"
      class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-1.5 h-3.5 w-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      Sil
    </Button>
  </template>

  <!-- Test Show Page Actions -->
  <template v-else-if="isTestShowPage && !isTestEditPage && isLoggedIn && test">
    <div :class="containerClass">
      <Link
        :href="route('tests.edit', test.slug)"
        @click="onLinkClick"
        class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Düzenle
      </Link>
      <Button
        @click="deleteTest(test.slug || test.id)"
        variant="outline"
        size="sm"
        class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1.5 h-3.5 w-3.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </Button>
    </div>
  </template>

  <!-- Test Edit Page Actions - Only Delete Button -->
  <template v-else-if="isTestEditPage && isLoggedIn && test">
    <Button
      @click="deleteTest(test.slug || test.id)"
      variant="outline"
      size="sm"
      class="h-8 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-1.5 h-3.5 w-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      Sil
    </Button>
  </template>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import Button from '@/Components/UI/Button.vue';
import DeleteConfirmationModal from '@/Components/CekapUI/Dialog/DeleteConfirmationModal.vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'desktop', // 'desktop' or 'mobile'
  },
  onLinkClick: {
    type: Function,
    default: () => {},
  },
});

const page = usePage();

// Computed properties for page detection
const isWriteShowPage = computed(() => {
  const url = page.url;
  if (url.startsWith('/writes/') && url !== '/writes' && url !== '/writes/create') {
    return true;
  }
  const categoryWritePattern = /^\/categories\/[^/]+\/[^/]+$/;
  if (
    categoryWritePattern.test(url) &&
    !url.includes('/create') &&
    !url.includes('/edit') &&
    url.split('/').length === 4
  ) {
    return true;
  }
  return false;
});

const isWriteEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/writes/') && url.includes('/edit');
});

const isCategoryShowPage = computed(() => {
  const url = page.url;
  if (url.startsWith('/categories/') && url !== '/categories' && url !== '/categories/create') {
    const parts = url.split('/').filter((part) => part.length > 0);
    if (parts.length === 2 && parts[0] === 'categories' && !parts[1].includes('edit')) {
      return true;
    }
  }
  return false;
});

const isCategoryEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/categories/') && url.includes('/edit');
});

const isWordShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/rendition/words/') && url !== '/rendition/words' && url !== '/rendition/words/create';
});

const isVersionShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/versions/') && url !== '/versions' && url !== '/versions/create';
});

const isTestCategoryShowPage = computed(() => {
  const url = page.url;
  if (url.startsWith('/test-categories/') && url !== '/test-categories' && url !== '/test-categories/create') {
    const parts = url.split('/').filter((part) => part.length > 0);
    if (parts.length === 2 && parts[0] === 'test-categories' && !parts[1].includes('edit')) {
      return true;
    }
  }
  return false;
});

const isTestCategoryEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/test-categories/') && url.includes('/edit');
});

const isTestShowPage = computed(() => {
  const url = page.url;
  return (
    url.startsWith('/tests/') &&
    url !== '/tests' &&
    url !== '/tests/create' &&
    !url.includes('/take') &&
    !url.includes('/edit')
  );
});

const isTestEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/tests/') && url.includes('/edit');
});

const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

const write = computed(() => page.props.write || null);
const category = computed(() => page.props.category || null);
const word = computed(() => page.props.word || null);
const version = computed(() => page.props.version || null);
const testCategory = computed(() => page.props.category || null);
const test = computed(() => page.props.test || null);

// Dynamic classes based on variant
const containerClass = computed(() => {
  return props.variant === 'mobile' ? 'flex flex-col gap-2' : 'flex items-center gap-2';
});

const editButtonClass = computed(() => {
  const base =
    props.variant === 'mobile'
      ? 'flex w-full items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
      : 'inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  return base;
});

const deleteButtonClass = computed(() => {
  const base =
    props.variant === 'mobile'
      ? 'flex w-full items-center gap-3 rounded-md border border-destructive bg-background px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground'
      : 'inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-destructive bg-background px-3 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  return base;
});

const iconClass = computed(() => {
  return props.variant === 'mobile' ? 'h-4 w-4' : 'h-3.5 w-3.5';
});

// Delete modal state
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const deleteModalTitle = ref('');
const deleteModalMessage = ref('');
const deleteModalWarning = ref('');
const pendingDeleteAction = ref(null);

const openDeleteModal = (title, message, warning = '', action) => {
  deleteModalTitle.value = title;
  deleteModalMessage.value = message;
  deleteModalWarning.value = warning;
  pendingDeleteAction.value = action;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (!isDeleting.value) {
    showDeleteModal.value = false;
    pendingDeleteAction.value = null;
    deleteModalTitle.value = '';
    deleteModalMessage.value = '';
    deleteModalWarning.value = '';
  }
};

const confirmDelete = async () => {
  if (pendingDeleteAction.value) {
    isDeleting.value = true;
    try {
      await pendingDeleteAction.value();
      // Silme başarılı olduğunda modal'ı kapat
      showDeleteModal.value = false;
      pendingDeleteAction.value = null;
      deleteModalTitle.value = '';
      deleteModalMessage.value = '';
      deleteModalWarning.value = '';
    } catch (error) {
      console.error('Error during delete:', error);
    } finally {
      isDeleting.value = false;
    }
  }
};

// Delete functions
const deleteWrite = async (id) => {
  const currentUrl = page.url;
  const isCategoryWritePage = /^\/categories\/[^/]+\/[^/]+$/.test(currentUrl);

  const performDelete = async () => {
    await router.delete(route('writes.destroy', { write: id }), {
      onSuccess: () => {
        if (isCategoryWritePage) {
          const urlParts = currentUrl.split('/').filter((part) => part.length > 0);
          if (urlParts.length >= 2 && urlParts[0] === 'categories') {
            const categorySlug = urlParts[1];
            router.visit(route('categories.show', { category: categorySlug }));
          } else {
            router.visit(route('writes.index'));
          }
        } else {
          router.visit(route('writes.index'));
        }
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting write:', errors);
        alert('Yazı silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Yazıyı Sil',
    'Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteCategory = async (id) => {
  const performDelete = async () => {
    await router.delete(route('categories.destroy', id), {
      onSuccess: () => {
        router.visit(route('categories.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting category:', errors);
        alert('Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Kategoriyi Sil',
    'Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteWord = async (id) => {
  const performDelete = async () => {
    await router.delete(route('rendition.words.destroy', id), {
      onSuccess: () => {
        router.visit(route('rendition.words.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting word:', errors);
        alert('Kelime silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Kelimeyi Sil',
    'Bu kelimeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteVersion = async (id) => {
  const performDelete = async () => {
    await router.delete(route('versions.destroy', id), {
      onSuccess: () => {
        router.visit(route('versions.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting version:', errors);
        alert('Versiyon silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Versiyonu Sil',
    'Bu versiyonu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteTestCategory = async (slugOrId) => {
  const performDelete = async () => {
    // Use slug for route model binding
    const slug = testCategory.value?.slug || slugOrId;
    await router.delete(route('test-categories.destroy', { category: slug }), {
      onSuccess: () => {
        router.visit(route('test-categories.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting test category:', errors);
        alert('Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Test Kategorisini Sil',
    'Bu test kategorisini silmek istediğinizden emin misiniz?',
    'Altındaki tüm testler ve alt kategoriler de silinecektir. Bu işlem geri alınamaz.',
    performDelete
  );
};

const deleteTest = async (slugOrId) => {
  const performDelete = async () => {
    // Use slug for route model binding
    const slug = test.value?.slug || slugOrId;
    await router.delete(route('tests.destroy', { test: slug }), {
      onSuccess: () => {
        router.visit(route('tests.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting test:', errors);
        alert('Test silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Testi Sil',
    'Bu testi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};
</script>
