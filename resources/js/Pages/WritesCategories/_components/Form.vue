<template>
  <Card :title="title" :elevated="true" class="mx-auto max-w-4xl">
    <template #icon>
      <slot name="icon"></slot>
    </template>

    <template #action>
      <slot name="action"></slot>
    </template>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <slot></slot>

      <div class="divider"></div>

      <div class="flex justify-end space-x-3">
        <Button v-if="showCancel" type="button" variant="ghost" @click="$emit('cancel')"> İptal </Button>

        <Button type="submit" :variant="submitVariant" :loading="loading" :disabled="loading">
          {{ submitText }}
        </Button>
      </div>
    </form>
  </Card>
</template>

<script setup>
import Card from './Card.vue';
import Button from './Button.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Form',
  },
  submitText: {
    type: String,
    default: 'Kaydet',
  },
  submitVariant: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['submit', 'cancel']);

const onSubmit = () => {
  emit('submit');
};
</script>
