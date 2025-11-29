<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:checked']);

const props = defineProps<{
  checked: boolean;
  value?: any;
  name?: string;
}>();

const proxyChecked = computed({
  get() {
    return props.checked;
  },

  set(val) {
    emit('update:checked', val);
  },
});
</script>

<template>
  <input
    type="checkbox"
    :name="name"
    :value="value"
    v-model="proxyChecked"
    class="h-4 w-4 rounded border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
</template>
