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

  <PageActionToolbar
    v-if="pageActionConfig"
    :variant="variant"
    :edit-href="pageActionConfig.editHref || ''"
    :show-delete="pageActionConfig.showDelete !== false"
    :on-link-click="onLinkClick"
    @delete="handlePageDelete"
  >
    <template v-if="pageActionConfig.onPdf" #leading>
      <button
        type="button"
        :title="'PDF indir'"
        :class="pdfButtonClass"
        @click="pageActionConfig.onPdf()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 shrink-0"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <span :class="pdfLabelClass">PDF</span>
      </button>
    </template>
  </PageActionToolbar>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import DeleteConfirmationModal from '@/Components/CekapUI/Dialog/DeleteConfirmationModal.vue';
import PageActionToolbar from '@/Components/CekapUI/Layout/PageActionToolbar.vue';
import { triggerProjectPdfExport } from '@/composables/useProjectPdfExport';

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

const isJourneyShowPage = computed(() => {
  const url = page.url;
  return (
    url.startsWith('/journey/') && url !== '/journey' && url !== '/journey/create' && !url.includes('/journey/edit')
  );
});

const isJourneyEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/journey/') && url.includes('/edit');
});

const isServiceShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/services/') && url !== '/services' && url !== '/services/create' && !url.includes('/edit');
});

const isServiceEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/services/') && url.includes('/edit');
});

const isProjectShowPage = computed(() => {
  const url = page.url;
  if (!url.startsWith('/projects/') || url.includes('/edit') || url === '/projects/create') {
    return false;
  }
  const parts = url.split('/').filter((part) => part.length > 0);
  return parts.length === 2 && parts[0] === 'projects';
});

const isProjectEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/projects/') && url.includes('/edit');
});

const isCustomerShowPage = computed(() => {
  const url = page.url;
  if (!url.startsWith('/customers/') || url.includes('/edit') || url === '/customers/create') {
    return false;
  }
  const parts = url.split('/').filter((part) => part.length > 0);
  return parts.length === 2 && parts[0] === 'customers';
});

const isCustomerEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/customers/') && url.includes('/edit');
});

const isWorkspaceShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/workspace/') && url !== '/workspace' && url !== '/workspace/create' && !url.includes('/edit');
});

const isWorkspaceEditPage = computed(() => {
  const url = page.url;
  return url.startsWith('/workspace/') && url.includes('/edit');
});

const isCertificateShowPage = computed(() => {
  const url = page.url;
  return url.startsWith('/certificates/') && url !== '/certificates' && url !== '/certificates/create' && !url.includes('/edit');
});

const isLanguagePackShowPage = computed(() => {
  return isWordShowPage.value && !word.value && page.props.pack;
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
const journey = computed(() => page.props.entry || null);
const service = computed(() => page.props.service || null);
const workspace = computed(() => page.props.workspace || null);
const certificate = computed(() => page.props.certificate || null);
const pack = computed(() => page.props.pack || null);
const project = computed(() => page.props.project || null);
const customer = computed(() => page.props.customer || null);
const isGuestProjectView = computed(() => !!page.props.isGuestView);

const pdfButtonClass = computed(() => {
  if (props.variant === 'mobile') {
    return 'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-foreground transition-colors hover:bg-accent';
  }
  return 'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
});

const pdfLabelClass = computed(() => (props.variant === 'mobile' ? 'text-sm font-medium' : 'sr-only'));

const pageActionConfig = computed(() => {
  if (!isLoggedIn.value) {
    return null;
  }

  if (isWriteShowPage.value && !isWriteEditPage.value && write.value) {
    return {
      editHref: route('writes.edit', write.value.id),
      onDelete: () => deleteWrite(write.value.id),
    };
  }
  if (isWriteEditPage.value && write.value) {
    return { onDelete: () => deleteWrite(write.value.id) };
  }

  if (isCategoryShowPage.value && !isCategoryEditPage.value && category.value) {
    return {
      editHref: route('categories.edit', category.value.id),
      onDelete: () => deleteCategory(category.value.id),
    };
  }
  if (isCategoryEditPage.value && category.value) {
    return { onDelete: () => deleteCategory(category.value.id) };
  }

  if (isWordShowPage.value && word.value) {
    return {
      editHref: route('rendition.words.edit', word.value.id),
      onDelete: () => deleteWord(word.value.id),
    };
  }
  if (isLanguagePackShowPage.value && pack.value) {
    return {
      editHref: route('rendition.language-packs.edit', pack.value.id),
      onDelete: () => deleteLanguagePack(pack.value.id),
    };
  }

  if (isVersionShowPage.value && version.value) {
    return {
      editHref: route('versions.edit', version.value.id),
      onDelete: () => deleteVersion(version.value.id),
    };
  }

  if (isTestCategoryShowPage.value && !isTestCategoryEditPage.value && testCategory.value) {
    return {
      editHref: route('test-categories.edit', testCategory.value.slug),
      onDelete: () => deleteTestCategory(testCategory.value.slug),
    };
  }
  if (isTestCategoryEditPage.value && testCategory.value) {
    return { onDelete: () => deleteTestCategory(testCategory.value.slug) };
  }

  if (isTestShowPage.value && !isTestEditPage.value && test.value) {
    return {
      editHref: route('tests.edit', test.value.slug),
      onDelete: () => deleteTest(test.value.slug),
    };
  }
  if (isTestEditPage.value && test.value) {
    return { onDelete: () => deleteTest(test.value.slug) };
  }

  if (isJourneyShowPage.value && !isJourneyEditPage.value && journey.value) {
    return {
      editHref: route('journey.edit', journey.value.id),
      onDelete: () => deleteJourney(journey.value.id),
    };
  }
  if (isJourneyEditPage.value && journey.value) {
    return { onDelete: () => deleteJourney(journey.value.id) };
  }

  if (isServiceShowPage.value && !isServiceEditPage.value && service.value) {
    return {
      editHref: `/services/${service.value.id}/edit`,
      onDelete: () => deleteService(service.value.id),
    };
  }
  if (isServiceEditPage.value && service.value) {
    return { onDelete: () => deleteService(service.value.id) };
  }

  if (isProjectShowPage.value && !isProjectEditPage.value && project.value?.id && !isGuestProjectView.value) {
    return {
      editHref: route('projects.edit', project.value.id),
      onDelete: () => deleteProject(project.value.id),
      onPdf: triggerProjectPdfExport,
    };
  }
  if (isProjectEditPage.value && project.value?.id) {
    return { onDelete: () => deleteProject(project.value.id) };
  }

  if (isCustomerShowPage.value && !isCustomerEditPage.value && customer.value?.id) {
    return {
      editHref: route('customers.edit', customer.value.id),
      onDelete: () => deleteCustomer(customer.value.id),
    };
  }
  if (isCustomerEditPage.value && customer.value?.id) {
    return { onDelete: () => deleteCustomer(customer.value.id) };
  }

  if (isWorkspaceShowPage.value && !isWorkspaceEditPage.value && workspace.value) {
    return {
      editHref: `/workspace/${workspace.value.id}/edit`,
      onDelete: () => deleteWorkspace(workspace.value.id),
    };
  }
  if (isWorkspaceEditPage.value && workspace.value) {
    return { onDelete: () => deleteWorkspace(workspace.value.id) };
  }

  if (isCertificateShowPage.value && certificate.value) {
    return {
      editHref: route('certificates.edit', certificate.value.id),
      onDelete: () => deleteCertificate(certificate.value.id),
    };
  }

  return null;
});

const handlePageDelete = () => {
  pageActionConfig.value?.onDelete?.();
};

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

const deleteJourney = async (id) => {
  const performDelete = async () => {
    await router.delete(route('journey.destroy', id), {
      onSuccess: () => {
        router.visit(route('journey.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting journey:', errors);
        alert('Yolculuk kaydı silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Yolculuk Kaydını Sil',
    'Bu yolculuk kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteLanguagePack = async (id) => {
  const performDelete = async () => {
    await router.delete(route('rendition.language-packs.destroy', id), {
      onSuccess: () => {
        router.visit(route('rendition.language-packs.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting language pack:', errors);
        alert('Kelime paketi silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Kelime Paketini Sil',
    'Bu kelime paketini silmek istediğinizden emin misiniz?',
    'Paket içindeki tüm kelimeler de silinecektir. Bu işlem geri alınamaz.',
    performDelete
  );
};

const deleteProject = async (id) => {
  const performDelete = async () => {
    await router.delete(route('projects.destroy', id), {
      onSuccess: () => {
        router.visit(route('projects.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting project:', errors);
        alert('Proje silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Projeyi Sil',
    'Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteCustomer = async (id) => {
  const performDelete = async () => {
    await router.delete(route('customers.destroy', id), {
      onSuccess: () => {
        router.visit(route('customers.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting customer:', errors);
        alert('Müşteri silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Müşteriyi Sil',
    'Bu müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteService = async (id) => {
  const performDelete = async () => {
    await router.delete(`/services/${id}`, {
      onSuccess: () => {
        router.visit('/services');
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting service:', errors);
        alert('Hizmet silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Hizmeti Sil',
    'Bu hizmeti silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};

const deleteWorkspace = async (id) => {
  const performDelete = async () => {
    await router.delete(`/workspace/${id}`, {
      onSuccess: () => {
        router.visit('/workspace');
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting workspace:', errors);
        alert('Çalışma alanı silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Çalışma Alanını Sil',
    'Bu çalışma alanını silmek istediğinizden emin misiniz?',
    'Çalışma alanına ait tüm ürünler de silinecektir. Bu işlem geri alınamaz.',
    performDelete
  );
};

const deleteCertificate = async (id) => {
  const performDelete = async () => {
    await router.delete(route('certificates.destroy', id), {
      onSuccess: () => {
        router.visit(route('certificates.index'));
        if (props.variant === 'mobile' && props.onLinkClick) {
          props.onLinkClick();
        }
      },
      onError: (errors) => {
        console.error('Error deleting certificate:', errors);
        alert('Sertifika silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  };

  openDeleteModal(
    'Sertifikayı Sil',
    'Bu sertifikayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    '',
    performDelete
  );
};
</script>
