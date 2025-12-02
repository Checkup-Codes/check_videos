<template>
  <Modal :show="isOpen" :max-width="'sm'" @close="handleClose">
    <div class="p-4 sm:p-5">
      <!-- Title -->
      <h3 class="mb-1.5 text-center text-sm font-semibold text-foreground sm:text-base">
        {{ title }}
      </h3>

      <!-- Message -->
      <p class="mb-3 text-center text-xs text-muted-foreground sm:text-sm">
        {{ message }}
      </p>

      <!-- Warning Text (if provided) -->
      <p v-if="warning" class="mb-4 rounded border border-border bg-muted/30 p-2 text-center text-xs text-muted-foreground">
        {{ warning }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <Button
          @click="handleClose"
          variant="outline"
          size="sm"
          class="h-8 flex-1 border-input bg-background text-xs text-foreground hover:bg-accent hover:text-accent-foreground sm:h-9 sm:text-sm"
          :disabled="isDeleting"
        >
          İptal
        </Button>
        <Button
          @click="handleConfirm"
          variant="outline"
          size="sm"
          class="h-8 flex-1 border-foreground bg-foreground text-xs text-background hover:bg-foreground/90 sm:h-9 sm:text-sm"
          :loading="isDeleting"
          :disabled="isDeleting"
        >
          {{ isDeleting ? 'Siliniyor...' : 'Sil' }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import Button from '@/Components/UI/Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Silmeyi Onayla',
  },
  message: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
    default: '',
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'confirm']);

const handleClose = () => {
  if (!props.isDeleting) {
    emit('close');
  }
};

const handleConfirm = () => {
  if (!props.isDeleting) {
    emit('confirm');
  }
};
</script>

