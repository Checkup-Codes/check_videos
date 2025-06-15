import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function useFlashMessage() {
  const { props } = usePage();
  const flashMessage = ref(props.flash?.success || '');

  watch(
    () => props.flash?.success,
    (newVal) => {
      if (newVal) {
        flashMessage.value = newVal;
        setTimeout(() => {
          flashMessage.value = '';
        }, 3000);
      }
    }
  );

  return {
    flashMessage,
  };
}
