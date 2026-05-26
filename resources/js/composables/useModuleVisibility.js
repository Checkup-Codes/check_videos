import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const HIDDEN_FEATURE_MAP = {
  tests: 'tests',
  words: 'words',
  services: 'services',
  projects: 'projects',
  certificates: 'certificates',
  bookmarks: 'bookmarks',
  workspace: 'workspaces',
  customers: 'customers',
  versions: 'versions',
};

const LOCKED_FOR_GUESTS = ['customers', 'versions'];

/**
 * Modül sidebar / menüde görünür mü?
 * - Giriş yapmış: domain hidden_features dışındakiler görünür
 * - Ziyaretçi: guestVisibility ayarı açık modüller görünür
 */
export function useModuleVisibility(moduleKey) {
  const page = usePage();

  const isLoggedIn = computed(() => !!page.props.auth?.user);
  const guestVisibility = computed(() => page.props.guestVisibility ?? {});
  const hiddenFeatures = computed(() => page.props.hiddenFeatures ?? []);

  return computed(() => {
    const featureKey = HIDDEN_FEATURE_MAP[moduleKey] ?? moduleKey;

    if (hiddenFeatures.value.includes(featureKey)) {
      return false;
    }

    if (isLoggedIn.value) {
      return true;
    }

    if (LOCKED_FOR_GUESTS.includes(moduleKey)) {
      return false;
    }

    return !!guestVisibility.value[moduleKey];
  });
}

export function useIsLoggedIn() {
  const page = usePage();
  return computed(() => !!page.props.auth?.user);
}
